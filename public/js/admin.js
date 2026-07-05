// =======================
// DASHBOARD
// =======================

function loadDashboard() {

    console.log("Dashboard dibuka");
    
    document.getElementById("content").innerHTML = `
        <h2>Dashboard Admin</h2>

        <div class="cards">

            <div class="card">
                <h3>Order Baru</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>Sedang Proses</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>Siap Kirim</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>Selesai</h3>
                <p>0</p>
            </div>

        </div>
    `;

}

// =======================
// ORDER
// =======================

function loadOrders() {

    console.log("Order Laundry dibuka");
    
    document.getElementById("content").innerHTML = `
        <h2>📦 Order Laundry</h2>
        <p>Coming Soon...</p>
    `;

}

// =======================
// MASTER LAYANAN
// =======================

function loadMasterLayanan() {

    console.log("Master Layanan dibuka");

    document.getElementById("content").innerHTML = `
        <h2>🧺 Master Layanan</h2>
        <p>Loading...</p>
    `;

}

// =======================
// PELANGGAN
// =======================

function loadCustomers() {
  
    console.log("Pelanggan dibuka");

    document.getElementById("content").innerHTML = `
        <h2>👤 Pelanggan</h2>
        <p>Coming Soon...</p>
    `;

}

// =======================
// PENGATURAN
// =======================

function loadSettings() {

    console.log("Pengaturan dibuka");

    document.getElementById("content").innerHTML = `
        <h2>⚙ Pengaturan</h2>
        <p>Coming Soon...</p>
    `;

}

// Halaman pertama
loadDashboard();

console.log("Dashboard Admin Ready");
