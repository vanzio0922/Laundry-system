export async function handle(request, env) {

    if (request.method !== "POST") {

        return Response.json(
            { error: "Method Not Allowed" },
            { status: 405 }
        );

    }

    try {

        const form = await request.formData();

        const file = form.get("file");

        if (!file) {

            return Response.json(
                { error: "File tidak ditemukan" },
                { status: 400 }
            );

        }

        return Response.json({
            success: true,
            message: "Endpoint upload sudah aktif"
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
