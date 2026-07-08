// =============================
// DASHBOARD
// =============================

async function loadDashboard(){

    console.log("Dashboard dibuka");

    document.getElementById("content").innerHTML = `
    
        <div class="cards">

            <div class="card">
                <h3>📦 Order Baru</h3>
                <p id="orderBaru">0</p>
            </div>

            <div class="card">
                <h3>🧺 Sedang Diproses</h3>
                <p id="diproses">0</p>
            </div>

            <div class="card">
                <h3>✅ Order Selesai</h3>
                <p id="selesai">0</p>
            </div>

            <div class="card">
                <h3>💰 Pendapatan Hari Ini</h3>
                <p id="pendapatan">Rp 0</p>
            </div>

        </div>

        <br>

        <div class="card">

            <h2>Selamat Datang</h2>

            <br>

            <p>
                Selamat datang di Dashboard Admin Vanzio Laundry.
            </p>

            <br>

            <p>
                Pilih menu di sebelah kiri untuk mulai mengelola aplikasi.
            </p>

        </div>

    `;

    loadDashboardSummary();

}

// =============================
// SUMMARY DASHBOARD
// =============================

async function loadDashboardSummary(){

    try{

        const res = await fetch("/api/dashboard");

        if(!res.ok){

            console.log("Dashboard API belum tersedia");

            return;

        }

        const data = await res.json();

        document.getElementById("orderBaru").innerHTML=data.orderBaru;

        document.getElementById("diproses").innerHTML=data.diproses;

        document.getElementById("selesai").innerHTML=data.selesai;

        document.getElementById("pendapatan").innerHTML=
            "Rp "+Number(data.pendapatan).toLocaleString("id-ID");

    }

    catch(err){

        console.log("Dashboard menggunakan data dummy.");

    }

}
