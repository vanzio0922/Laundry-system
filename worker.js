export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ==========================
    // API MASTER LAYANAN
    // ==========================

    if (url.pathname === "/api/services") {

      if (request.method === "GET") {

        const { results } = await env.DB
          .prepare("SELECT * FROM services ORDER BY id DESC")
          .all();

        return Response.json(results);

      }

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

    }

    // ==========================
    // SEMUA FILE HTML/CSS/JS
    // ==========================

    return env.ASSETS.fetch(request);

  }
}
