// ===================================
// MASTER LAYANAN
// ===================================

async function loadMasterLayanan(){

    console.log("Load Master Layanan");

    try{

        const data = await API.get("/api/services");

        renderMasterLayanan(data);

    }catch(err){

        console.error(err);

        document.getElementById("content").innerHTML=`
            <h2>🧺 Master Layanan</h2>
            <p>❌ Gagal mengambil data.</p>
        `;

    }

}

function renderMasterLayanan(data){

    let html=`

    <h2>🧺 Master Layanan</h2>

    <button class="btn-primary"
        onclick="showTambahLayanan()">

        ➕ Tambah Layanan

    </button>

    <br><br>

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

    data.forEach(item=>{

        html+=`

        <tr>

            <td>${item.nama}</td>

            <td>Rp ${Number(item.harga).toLocaleString("id-ID")}</td>

            <td>${item.satuan}</td>

            <td>${item.kategori}</td>

            <td>${item.estimasi} ${item.estimasi_satuan}</td>

            <td>

                ${item.aktif
                    ? "🟢 Aktif"
                    : "⚫ Nonaktif"}

            </td>

            <td>

                <button onclick="editService(${item.id})">

                    ✏️

                </button>

                <button onclick="toggleService(${item.id})">

                    ⛔

                </button>

            </td>

        </tr>

        `;

    });

    html+="</table>";

    document.getElementById("content").innerHTML=html;

}

function showTambahLayanan(){

    document.getElementById("content").innerHTML=`

    <h2>Tambah Layanan</h2>

    <div class="form">

        <label>Nama</label>

        <input id="nama">

        <label>Harga</label>

        <input id="harga" type="number">

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

        <input id="estimasi"
               value="2"
               type="number">

        <label>Satuan Estimasi</label>

        <select id="estimasi_satuan">

            <option>Hari</option>

            <option>Jam</option>

        </select>

        <br><br>

        <button
            type="button"
            onclick="simpanLayanan()">

            💾 Simpan

        </button>

        <button
            type="button"
            onclick="loadMasterLayanan()">

            Batal

        </button>

    </div>

    `;

}

// ===================================
// SIMPAN LAYANAN
// ===================================

async function simpanLayanan(){

    try{

        const data = {

            nama: document.getElementById("nama").value.trim(),

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

        const hasil = await API.post("/api/services", data);

        console.log(hasil);

        alert("Layanan berhasil disimpan");

        loadMasterLayanan();

    }catch(err){

        console.error(err);

        alert("Gagal menyimpan layanan");

    }

}

async function updateLayanan(id){

    const data = {

        id:id,

        nama:document.getElementById("nama").value,

        harga:Number(document.getElementById("harga").value),

        satuan:document.getElementById("satuan").value,

        kategori:document.getElementById("kategori").value,

        estimasi:Number(document.getElementById("estimasi").value),

        estimasi_satuan:document.getElementById("estimasi_satuan").value

    };

    const hasil = await API.put("/api/services",data);

    if(hasil.success){

        alert("Berhasil diupdate");

        loadMasterLayanan();

    }else{

        alert("Gagal update");

    }

}

async function editService(id){

    const data = await API.get("/api/services");

    const item = data.find(x => x.id == id);

    if(!item) return;

    document.getElementById("content").innerHTML = `

<h2>Edit Layanan</h2>

<div class="form">

<label>Nama</label>
<input id="nama" value="${item.nama}">

<label>Harga</label>
<input id="harga" type="number" value="${item.harga}">

<label>Satuan</label>

<select id="satuan">

<option ${item.satuan=="Kg"?"selected":""}>Kg</option>

<option ${item.satuan=="Pcs"?"selected":""}>Pcs</option>

<option ${item.satuan=="Pasang"?"selected":""}>Pasang</option>

</select>

<label>Kategori</label>

<select id="kategori">

<option ${item.kategori=="Reguler"?"selected":""}>Reguler</option>

<option ${item.kategori=="Special"?"selected":""}>Special</option>

</select>

<label>Estimasi</label>

<input id="estimasi" type="number" value="${item.estimasi}">

<label>Satuan Estimasi</label>

<select id="estimasi_satuan">

<option ${item.estimasi_satuan=="Hari"?"selected":""}>Hari</option>

<option ${item.estimasi_satuan=="Jam"?"selected":""}>Jam</option>

</select>

<br><br>

<button onclick="updateLayanan(${item.id})">

💾 Update

</button>

<button onclick="loadMasterLayanan()">

Batal

</button>

</div>

`;

}
