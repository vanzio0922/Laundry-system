// ===================================
// ORDER LAUNDRY
// ===================================

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

let customerOption = "";

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

<label>Qty / Berat</label>

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

}
