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
