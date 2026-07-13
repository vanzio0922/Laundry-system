export async function handle(request, env){

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
    
return new Response("Not Found", {
      status: 404
    });

}
