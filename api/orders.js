export async function handle(request, env){

    const url = new URL(request.url);


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

// ==========================================
// SIMPAN ORDER
// ==========================================

if (url.pathname === "/api/orders" && request.method === "POST") {

    const body = await request.json();

    try {

        // Simpan ke tabel orders
        const order = await env.DB.prepare(`
            INSERT INTO orders(
                invoice,
                tanggal,
                customer_id,
                subtotal,
                diskon,
                total,
                dibayar,
                sisa,
                status
            )
            VALUES(?,?,?,?,?,?,?,?,?)
        `)
        .bind(
            body.invoice,
            body.tanggal,
            body.customer_id,
            body.subtotal,
            body.diskon,
            body.total,
            0,              // dibayar
            body.total,     // sisa
            "Masuk"
        )
        .run();

        const orderId = order.meta.last_row_id;

        // Simpan setiap item
        for (const item of body.items) {

            await env.DB.prepare(`
                INSERT INTO order_items(
                    order_id,
                    service_id,
                    qty,
                    harga,
                    subtotal
                )
                VALUES(?,?,?,?,?)
            `)
            .bind(
                orderId,
                item.service_id,
                item.qty,
                item.harga,
                item.subtotal
            )
            .run();

        }

        return Response.json({
            success: true,
            order_id: orderId
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

if (url.pathname.startsWith("/api/orders/") &&
    request.method === "GET") {

    const id = url.pathname.split("/").pop();

    const order = await env.DB.prepare(`
        SELECT
            o.*,
            c.nama,
            c.telepon,
            c.alamat
        FROM orders o
        JOIN customers c
        ON c.id=o.customer_id
        WHERE o.id=?
    `)
    .bind(id)
    .first();

    const { results } = await env.DB.prepare(`
        SELECT
            oi.*,
            s.nama as layanan,
            s.satuan
        FROM order_items oi
        JOIN services s
        ON s.id=oi.service_id
        WHERE oi.order_id=?
    `)
    .bind(id)
    .all();

    return Response.json({

        order,

        items:results

    });

}

if (url.pathname==="/api/orders/status"
    &&
    request.method==="PUT"){

    const body=await request.json();

    await env.DB.prepare(`
        UPDATE orders
        SET status=?
        WHERE id=?
    `)
    .bind(
        body.status,
        body.id
    )
    .run();

    return Response.json({

        success:true

    });

}

// ==========================================
// DAFTAR ORDER
// ==========================================

if (url.pathname === "/api/orders" && request.method === "GET") {

    const { results } = await env.DB.prepare(`
        SELECT
            o.id,
            o.invoice,
            o.tanggal,
            o.total,
            o.status,
            c.nama AS customer
        FROM orders o
        JOIN customers c
        ON c.id = o.customer_id
        ORDER BY o.id DESC
    `).all();

    return Response.json(results);

}

return new Response("Not Found", {
      status: 404
    });

}
