// ===================================
// ORDER LAUNDRY
// ===================================
// ===================================
// DATA ORDER
// ===================================

let orderItems = [];

async function openOrders(){

    document.getElementById("pageTitle").innerText = "Order Laundry";

    loadOrder();

}

async function loadOrder(){

    try{

        const invoiceData = await API.get("/api/orders/new");

        const customers = await API.get("/api/customers");

        const services = await API.get("/api/services");

        renderOrder(invoiceData.invoice, customers, services);

    }catch(err){

        console.error(err);

        alert("Gagal membuka Order");

    }

}

function renderOrder(invoice, customers, services){

orderItems = [];

let customerOption = `
<option value="">
-- Pilih Pelanggan --
</option>
`;

customers.forEach(c=>{

    customerOption += `
        <option value="${c.id}">
            ${c.nama}
        </option>
    `;

});

let serviceOption = "";

services
.filter(s=>s.aktif==1)
.forEach(s=>{

    serviceOption += `
        <option
            value="${s.id}"
            data-harga="${s.harga}"
            data-satuan="${s.satuan}">

            ${s.nama} -
            Rp${Number(s.harga).toLocaleString("id-ID")}

        </option>
    `;

});

document.getElementById("content").innerHTML=`

<h2>📦 Order Laundry</h2>

<div class="form">

<label>Invoice</label>

<input
id="invoice"
value="${invoice}"
readonly>

<label>Tanggal</label>

<input
id="tanggal"
type="date"
value="${new Date().toISOString().slice(0,10)}">

<label>Pelanggan</label>

<select id="customer">

${customerOption}

</select>

<hr>

<label>Layanan</label>

<select id="service">

${serviceOption}

</select>

<label>📷 Foto Cucian</label>

<input
id="foto"
type="file"
accept="image/*">

<div id="previewFoto"></div>

<br>

<label>⚖ Berat Cucian (Kg)</label>

<input
id="berat"
type="number"
step="0.1"
value="0">

<br>

<label>Qty Layanan</label>

<input
id="qty"
type="number"
value="1"
step="0.1">

<br><br>

<button onclick="tambahItem()">
➕ Tambah
</button>


<hr>

<div id="listItem">

Belum ada layanan.

</div>

<hr>

<h3>

Total :
Rp<span id="grandTotal">0</span>

</h3>

<br>

<button onclick="simpanOrder()">

💾 Simpan Order

</button>

</div>

`;

document.getElementById("foto").addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        document.getElementById("previewFoto").innerHTML = `
            <img
                src="${reader.result}"
                style="
                    width:180px;
                    border-radius:10px;
                    margin-top:10px;
                ">
        `;

    };

    reader.readAsDataURL(file);

});

}

function tambahItem(){

    const service = document.getElementById("service");

    const option = service.options[service.selectedIndex];

    const id = Number(option.value);

    const nama = option.text.split("-")[0].trim();

    const harga = Number(option.dataset.harga);

    const satuan = option.dataset.satuan;

    const qty = Number(document.getElementById("qty").value);

    if(qty <= 0){

        alert("Qty harus lebih dari 0");

        return;

    }

    orderItems.push({

        service_id:id,

        nama,

        harga,

        qty,

        satuan,

        subtotal:harga*qty

    });

    renderItems();

}

function renderItems(){

    let html="";

    let total=0;

    orderItems.forEach((item,index)=>{

        total += item.subtotal;

        html += `

        <div class="card-item">

            <b>${item.nama}</b><br>

            ${item.qty} ${item.satuan}

            × Rp${item.harga.toLocaleString("id-ID")}

            <br>

            <b>

            Rp${item.subtotal.toLocaleString("id-ID")}

            </b>

            <br>

            <button onclick="hapusItem(${index})">

                🗑 Hapus

            </button>

            <hr>

        </div>

        `;

    });

    if(orderItems.length==0){

        html="Belum ada layanan.";

    }

    document.getElementById("listItem").innerHTML=html;

    document.getElementById("grandTotal").innerText=

        total.toLocaleString("id-ID");

}

function hapusItem(index){

    orderItems.splice(index,1);

    renderItems();

}

async function simpanOrder(){

const berat =
parseFloat(
document.getElementById("berat").value
);

const foto =
document.getElementById("foto").files[0];

let fotoUrl = "";

    if(foto){

        fotoUrl =
            await uploadFotoCloudinary(foto);
    }
    // Cek apakah ada layanan
    if(orderItems.length==0){

        alert("Belum ada layanan.");

        return;

    }

    // Cek pelanggan
    const customerId =
        Number(document.getElementById("customer").value);

    if(!customerId){

        alert("Pilih pelanggan.");

        return;

    }

    // Hitung subtotal
    const subtotal =
        orderItems.reduce((a,b)=>a+b.subtotal,0);

    const data={

        invoice:
        document.getElementById("invoice").value,

        tanggal:
        document.getElementById("tanggal").value,

        customer_id:
        customerId,

        berat: berat,

        foto: fotoUrl,

        subtotal,

        diskon:0,

        total:subtotal,

        bayar:0,

        kembali:0,

        items:orderItems

    };

    try{

        const result =
            await API.post("/api/orders",data);

        if(result.success){

            alert("Order berhasil disimpan");

          orderItems = [];

          renderItems();

          document.getElementById("previewFoto").innerHTML = "";

          document.getElementById("foto").value = "";

          document.getElementById("berat").value = "0";

          await loadOrder();

    }

    }catch(err){

        console.error(err);

        alert("Gagal menyimpan order");

    }

}

async function uploadFotoCloudinary(file){

    const fd = new FormData();

    fd.append("file", file);

    const res =
    await fetch("/api/upload",{

        method:"POST",

        body:fd

    });

    const data =
    await res.json();

    return data.url;

}

async function detailOrder(id){

    const data =
        await API.get("/api/orders/"+id);

    renderDetailOrder(data);

}

function renderDetailOrder(data){

    let html = `
        <h2>📄 Detail Order</h2>

        <p><b>Invoice :</b> ${data.order.invoice}</p>

        <p><b>Customer :</b> ${data.order.nama}</p>

        <p><b>Tanggal :</b> ${data.order.tanggal}</p>

        <p><b>Berat :</b> ${data.order.berat ?? 0} Kg</p>

        <hr>
    `;

    if(data.order.foto){

        html += `
            <img
                src="${data.order.foto}"
                style="
                    width:220px;
                    border-radius:12px;
                    margin-bottom:15px;
                    border:1px solid #ddd;
                ">
            <hr>
        `;

    }

    data.items.forEach(item=>{

        html += `
            <div class="card">

                <b>${item.layanan}</b><br>

                Qty :
                ${item.qty} ${item.satuan}<br>

                Harga :
                Rp${Number(item.harga).toLocaleString("id-ID")}<br>

                Subtotal :
                Rp${Number(item.subtotal).toLocaleString("id-ID")}

            </div>

            <br>
        `;

    });

    html += `

        <h3>
            Total :
            Rp${Number(data.order.total).toLocaleString("id-ID")}
        </h3>

        <p>
            <b>Status :</b>
            ${data.order.status}
        </p>

        <button onclick="openOrderList()">

            ⬅ Kembali

        </button>

    `;

    document.getElementById("content").innerHTML = html;

}

async function openOrderList(){

    document.getElementById("pageTitle").innerText =
        "Daftar Order";

    const data = await API.get("/api/orders");

    renderOrderList(data);

}

function renderOrderList(data){

    let html = `
        <h2>📋 Daftar Order</h2>

        <button onclick="openOrders()">
            ➕ Order Baru
        </button>

        <br><br>
    `;

    data.forEach(o=>{

        html += `
            <div class="card">

                <b>${o.invoice}</b><br>

                ${o.customer}<br>

                ${o.tanggal}<br>

                Rp${Number(o.total).toLocaleString("id-ID")}<br>

                Status :
                <b>${o.status}</b>

                <br><br>

                <button onclick="detailOrder(${o.id})">
                    📄 Detail
                </button>

            </div>

            <br>
        `;

    });

    document.getElementById("content").innerHTML = html;

        }
