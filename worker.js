export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ==========================
    // API MASTER LAYANAN
    // ==========================

    if (url.pathname === "/api/services") {

      // ================= GET =================
      if (request.method === "GET") {

        const { results } = await env.DB
          .prepare("SELECT * FROM services ORDER BY id DESC")
          .all();

        return Response.json(results);

      }

      // ================= POST =================
      if (request.method === "POST") {

        try {

          const body = await request.json();

          const result = await env.DB.prepare(`
            INSERT INTO services
            (nama,satuan,harga,kategori,estimasi,estimasi_satuan,aktif)
            VALUES (?,?,?,?,?,?,1)
          `)
          .bind(
            body.nama,
            body.satuan,
            body.harga,
            body.kategori,
            body.estimasi,
            body.estimasi_satuan
          )
          .run();

          return Response.json({
            success: true,
            result
          });

        } catch (err) {

          return Response.json({
            success: false,
            error: err.message
          }, {
            status: 500
          });

        }

      }

      // ================= PUT =================
      if (request.method === "PUT") {

        const body = await request.json();
      if(body.action === "toggle"){

        const result = await env.DB.prepare(`
            UPDATE services
            SET aktif=?
            WHERE id=?
        `)
        .bind(
            body.aktif,
            body.id
        )
        .run();

        return Response.json({
            success:true,
            result
        });

    }
      
        const result = await env.DB.prepare(`
          UPDATE services
          SET
            nama=?,
            satuan=?,
            harga=?,
            kategori=?,
            estimasi=?,
            estimasi_satuan=?
          WHERE id=?
        `)
        .bind(
          body.nama,
          body.satuan,
          body.harga,
          body.kategori,
          body.estimasi,
          body.estimasi_satuan,
          body.id
        )
        .run();

        return Response.json({
          success: true,
          result
        });

      }
    
// ================= DELETE =================

      if(request.method==="DELETE"){

        const id = url.searchParams.get("id");

        const result = await env.DB.prepare(`
           DELETE FROM services
            WHERE id=?
        `)
        .bind(id)
        .run();

        return Response.json({
          success:true,
          result
        });

      }
      
    }
    
// ==========================================
// API MASTER PELANGGAN
// ==========================================

  if(url.pathname==="/api/customers"){

    // ---------- GET ----------
    if(request.method==="GET"){

        const {results}=await env.DB.prepare(`
            SELECT *
            FROM customers
            ORDER BY id DESC
        `).all();

        return Response.json(results);

    }

    // ---------- POST ----------
    if(request.method==="POST"){

        const body=await request.json();

        const result=await env.DB.prepare(`
            INSERT INTO customers
            (nama,telepon,alamat,member)
            VALUES(?,?,?,?)
        `)
        .bind(
            body.nama,
            body.telepon,
            body.alamat,
            body.member
        )
        .run();

        return Response.json({
            success:true,
            result
        });

    }

    // ---------- PUT ----------
    if(request.method==="PUT"){

        const body=await request.json();

        const result=await env.DB.prepare(`
            UPDATE customers
            SET
                nama=?,
                telepon=?,
                alamat=?,
                member=?
            WHERE id=?
        `)
        .bind(
            body.nama,
            body.telepon,
            body.alamat,
            body.member,
            body.id
        )
        .run();

        return Response.json({
            success:true,
            result
        });

    }

    // ---------- DELETE ----------
    if(request.method==="DELETE"){

        const id=url.searchParams.get("id");

        const result=await env.DB.prepare(`
            DELETE FROM customers
            WHERE id=?
        `)
        .bind(id)
        .run();

        return Response.json({
            success:true,
            result
        });

    }

}

// ==========================================
// API ORDER
// ==========================================

if (url.pathname === "/api/orders/new") {

    const now = new Date();

    const y = now.getFullYear();

    const m = String(now.getMonth()+1).padStart(2,"0");

    const d = String(now.getDate()).padStart(2,"0");

    const prefix = `VZ${y}${m}${d}`;

    const { results } = await env.DB.prepare(`
        SELECT invoice
        FROM orders
        WHERE invoice LIKE ?
        ORDER BY invoice DESC
        LIMIT 1
    `)
    .bind(prefix + "%")
    .all();

    let nomor = 1;

    if(results.length){

        nomor =
            parseInt(results[0].invoice.slice(-4)) + 1;

    }

    const invoice =
        prefix +
        String(nomor).padStart(4,"0");

    return Response.json({

        invoice

    });

}

    // ==========================
    // FILE HTML/CSS/JS
    // ==========================

    return env.ASSETS.fetch(request);

  }
}
