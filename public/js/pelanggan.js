// ===================================
// MASTER PELANGGAN
// ===================================

async function openCustomers(){

    document.getElementById("pageTitle").innerText="Master Pelanggan";

    loadCustomers();

}

async function loadCustomers(){

    try{

        const data = await API.get("/api/customers");

        renderCustomers(data);

    }catch(err){

        console.error(err);

        document.getElementById("content").innerHTML=`
            <h2>👤 Master Pelanggan</h2>
            <p>❌ Gagal mengambil data.</p>
        `;

    }

}

function renderCustomers(data){

    let html = `

    <h2>👤 Master Pelanggan</h2>

    <button class="btn-primary"
        onclick="showTambahCustomer()">

        ➕ Tambah Pelanggan

    </button>

    <br><br>

    <table class="table">

        <tr>

            <th>Nama</th>

            <th>No HP</th>

            <th>Alamat</th>

            <th>Member</th>

            <th>Aksi</th>

        </tr>

    `;

    data.forEach(item=>{

        html += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.telepon}</td>

            <td>${item.alamat}</td>

            <td>${item.member}</td>

            <td>

                <button onclick="editCustomer(${item.id})">

                    ✏️

                </button>

                <button onclick="hapusCustomer(${item.id})">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

    html += "</table>";

    document.getElementById("content").innerHTML = html;

}

function showTambahCustomer(){

    document.getElementById("content").innerHTML = `
        <h2>Tambah Pelanggan</h2>

        <div class="form">

            <label>Nama</label>
            <input id="nama">

            <label>No HP</label>
            <input id="telepon">

            <label>Alamat</label>
            <textarea id="alamat"></textarea>

            <label>Member</label>
            <select id="member">
                <option>Reguler</option>
                <option>Member</option>
            </select>

            <br><br>

            <button onclick="simpanCustomer()">
                💾 Simpan
            </button>

            <button onclick="loadCustomers()">
                Batal
            </button>

        </div>
    `;

}

async function simpanCustomer(){
    try{

        const data = {

          nama: document.getElementById("nama").value.trim(),

          telepon: document.getElementById("telepon").value.trim(),

          alamat: document.getElementById("alamat").value.trim(),

          member: document.getElementById("member").value

    };
    
        if(data.nama === ""){

            alert("Nama layanan wajib diisi");

            return;

        }

        const hasil = await API.post("/api/customers", data);

        console.log(hasil);

        alert("pelanggan berhasil disimpan");

        loadCustomers();

    }catch(err){

        console.error(err);

        alert("Gagal menyimpan pelanggan");

    }

}

async function updateCustomer(id){
    
      const data = {
        
        id:id,
        
        nama: document.getElementById("nama").value.trim(),

          telepon: document.getElementById("telepon").value.trim(),

          alamat: document.getElementById("alamat").value.trim(),

          member: document.getElementById("member").value

    };
    
    const hasil = await API.put("/api/customers",data);

    if(hasil.success){

        alert("Berhasil diupdate");

        loadCustomers();

    }else{

        alert("Gagal update");

    }

}

async function editCustomer(id){

    const data = await API.get("/api/customers");

    const item = data.find(x => x.id == id);

    if(!item) return;

    document.getElementById("content").innerHTML = `

    <h2>Edit Pelanggan</h2>

    <div class="form">

        <label>Nama</label>
        <input id="nama" value="${item.nama}">

        <label>No HP</label>
        <input id="telepon" value="${item.telepon}">

        <label>Alamat</label>
        <textarea id="alamat">${item.alamat}</textarea>

        <label>Member</label>
        <select id="member">
            <option ${item.member=="Reguler"?"selected":""}>Reguler</option>
            <option ${item.member=="Member"?"selected":""}>Member</option>
        </select>

        <br><br>

        <button onclick="updateCustomer(${item.id})">
            💾 Update
        </button>

        <button onclick="loadCustomers()">
            Batal
        </button>

    </div>

    `;

}

async function hapusCustomer(id){

    if(!confirm("Yakin ingin menghapus pelanggan?")){
        return;
    }

    try{

        const hasil = await API.delete("/api/customers?id="+id);

        if(hasil.success){

            alert("Pelanggan berhasil dihapus");

            loadCustomers();

        }else{

            alert("Gagal menghapus");

        }

    }catch(err){

        console.error(err);

        alert("Terjadi kesalahan");

    }

}
