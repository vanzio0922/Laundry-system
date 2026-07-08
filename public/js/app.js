// ==========================
// VANZIO LAUNDRY
// APP.JS
// ==========================

console.log("Vanzio Laundry Started");

// Mengubah judul halaman
function setPageTitle(title){

    const page = document.getElementById("pageTitle");

    if(page){
        page.innerText = title;
    }

}

// ==========================
// DASHBOARD
// ==========================

function openDashboard(){

    setPageTitle("Dashboard");

    loadDashboard();

}

// ==========================
// ORDER
// ==========================

function openOrders(){

    setPageTitle("Order Laundry");

    loadOrders();

}

// ==========================
// MASTER LAYANAN
// ==========================

function openServices(){

    setPageTitle("Master Layanan");

    loadMasterLayanan();

}

// ==========================
// PELANGGAN
// ==========================

function openCustomers(){

    setPageTitle("Pelanggan");

    loadCustomers();

}

// ==========================
// PENGATURAN
// ==========================

function openSettings(){

    setPageTitle("Pengaturan");

    loadSettings();

}

// ==========================
// HALAMAN PERTAMA
// ==========================

window.onload = () => {

    openDashboard();

};
