export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ==========================
    // MASTER LAYANAN
    // ==========================

    if (url.pathname === "/api/services") {

      // ================= GET =================

      if (request.method === "GET") {

        const { results } = await env.DB.prepare(
          "SELECT * FROM services ORDER BY id DESC"
        ).all();

        return Response.json(results);

      }

      // ================= POST =================

      if (request.method === "POST") {

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
            success:true,
            id:result.meta.last_row_id
        });

      }

      // ================= PUT =================

      if (request.method === "PUT") {

        return Response.json({
          success:false,
          message:"Belum dibuat"
        });

      }

      // ================= DELETE =================

      if (request.method === "DELETE") {

        return Response.json({
          success:false,
          message:"Belum dibuat"
        });

      }

    }

    return new Response("404 Not Found",{
      status:404
    });

  }
}
