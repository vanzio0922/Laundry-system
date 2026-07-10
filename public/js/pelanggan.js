// ===================================
// MASTER PELANGGAN
// ===================================

async function loadCustomers(){

    try{

        const data=await API.get("/api/customers");

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

    let html=`

    <h2>👤 Master Pelanggan</h2>

    <button class="btn-primary"
        onclick="showTambahCustomer()">

        ➕ Tambah Pelanggan

    </button>

    <br><br>

    <table class="table">

        <tr>

            <th>Nama</th>

            <th>Telepon</th>

            <th>Alamat</th>

            <th>Member</th>

            <th>Aksi</th>

        </tr>

    `;

    data.forEach(item=>{

        html+=`

        <tr>

            <td>${item.nama}</td>

            <td>${item.telepon}</td>

            <td>${item.alamat}</td>

            <td>

                ${item.member
                    ? "⭐ Member"
                    : "👤 Umum"}

            </td>

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

    html+="</table>";

    document.getElementById("content").innerHTML=html;

}
