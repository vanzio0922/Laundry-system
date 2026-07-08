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

async function loadMasterLayanan() {

    console.log("Master Layanan dibuka");

    try {

        const res = await fetch("/api/services");
        const data = await res.json();

        let html = `
        <h2>🧺 Master Layanan</h2>

        <button id="btnTambah" onclick="showTambahLayanan()">
    ➕ Tambah Layanan
</button>

        <table class="table">

            <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Satuan</th>
                <th>Kategori</th>
                <th>Estimasi</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
  `;

        data.forEach(item => {

    html += `
    <tr>

        <td>${item.nama}</td>

        <td>Rp ${item.harga}</td>

        <td>${item.satuan}</td>

        <td>${item.kategori}</td>

        <td>${item.estimasi} ${item.estimasi_satuan}</td>

        <td>${item.aktif ? "🟢 Aktif" : "⚫ Nonaktif"}</td>

        <td>

            <button onclick="editService(${item.id})">
                ✏️ Edit
            </button>

            <button onclick="toggleService(${item.id}, ${item.aktif})">
                ${item.aktif ? "🟢 Aktifkan" : "⛔ Nonaktifkan"}
            </button>
             </td>
             
    </tr>

    `;
            
  });

        html += "</table>";

        document.getElementById("content").innerHTML = html;

    } catch (err) {

        console.error(err);

        document.getElementById("content").innerHTML = `
            <h2>🧺 Master Layanan</h2>
            <p>❌ Gagal mengambil data layanan.</p>
    `;
  }

}

function showTambahLayanan() {

    document.getElementById("content").innerHTML = `

    <h2>🧺 Tambah Layanan</h2>

    <div class="form">

        <label>Nama Layanan</label>
        <input type="text" id="nama">

        <label>Harga</label>
        <input type="number" id="harga">

        <label>Satuan</label>

        <select id="satuan">
            <option>Kg</option>
            <option>Pcs</option>
            <option>Pasang</option>
        </select>

        <label>Kategori</label>

        <select id="kategori">
            <option>Reguler</option>
            <option>Special</option>
        </select>

        <label>Estimasi</label>

        <input type="number" id="estimasi" value="2">

        <label>Satuan Estimasi</label>

        <select id="estimasi_satuan">
            <option>Hari</option>
            <option>Jam</option>
        </select>

        <br><br>

        <button type="button" onclick="simpanLayanan()">
            💾 Simpan
        </button>

        <button onclick="loadMasterLayanan()">
            ❌ Batal
        </button>

    </div>

    `;

}

async function simpanLayanan(){
    
    alert(simpan ditekan)
    console.log("Tombol Simpan ditekan");
    
    const data = {
        nama: document.getElementById("nama").value,
        harga: Number(document.getElementById("harga").value),
        satuan: document.getElementById("satuan").value,
        kategori: document.getElementById("kategori").value,
        estimasi: Number(document.getElementById("estimasi").value),
        estimasi_satuan: document.getElementById("estimasi_satuan").value
    };

    if(data.nama === ""){
    alert("Nama layanan wajib diisi");
    return;
}

    if(data.harga <= 0){
    alert("Harga harus lebih dari 0");
    return;
}

    console.log(data);

    const res = await fetch("/api/services",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });

    const json = await res.json();
    
    console.log(json);

    if(json.success){
        alert("Layanan berhasil ditambahkan");
        document.getElementById("nama").value = "";
        document.getElementById("harga").value = "";
        document.getElementById("satuan").value = "Kg";
        document.getElementById("kategori").value = "Reguler";
        document.getElementById("estimasi").value = "2";
        document.getElementById("estimasi_satuan").value = "Hari";
        loadMasterLayanan();
    }else{
        alert("Gagal menyimpan");
    }

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

function editService(id){

    console.log("Edit layanan :", id);

}

function toggleService(id, aktif){

    console.log("Ubah status :", id, aktif);

}


// Halaman pertama
loadDashboard();

console.log("Dashboard Admin Ready");

alert("admin.js berhasil dimuat");
