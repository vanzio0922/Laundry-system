export async function handle(request, env){

    const url = new URL(request.url);

    if(
        url.pathname === "/api/dashboard" &&
        request.method === "GET"
    ){

        // Order Baru
        const orderBaru = await env.DB.prepare(`
            SELECT COUNT(*) total
            FROM orders
            WHERE status='Masuk'
        `).first();

        // Diproses
        const diproses = await env.DB.prepare(`
            SELECT COUNT(*) total
            FROM orders
            WHERE status='Diproses'
        `).first();

        // Selesai
        const selesai = await env.DB.prepare(`
            SELECT COUNT(*) total
            FROM orders
            WHERE status='Selesai'
        `).first();

        // Pendapatan
        const pendapatan = await env.DB.prepare(`
            SELECT
                IFNULL(SUM(total),0) total
            FROM orders
            WHERE
                status='Selesai'
                AND tanggal=date('now','localtime')
        `).first();

        return Response.json({

            orderBaru: orderBaru.total,

            diproses: diproses.total,

            selesai: selesai.total,

            pendapatan: pendapatan.total

        });

    }

    return new Response("Not Found",{
        status:404
    });

}
