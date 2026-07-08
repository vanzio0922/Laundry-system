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
