export default {
  async fetch(request, env, ctx) {

    const url = new URL(request.url);

    // ==========================
    // API DAFTAR HARGA
    // ==========================
    if (url.pathname === "/api/services") {

      const { results } = await env.DB.prepare(
        "SELECT * FROM services ORDER BY id"
      ).all();

      return Response.json(results);

    }
    if (url.pathname === "/admin") {
    return env.ASSETS.fetch(
        new Request(new URL("/admin.html", request.url))
    );
   }

    // ==========================
    // DASHBOARD
    // ==========================
    if (url.pathname === "/") {

      return new Response(`

<!DOCTYPE html>
<html>

<head>

<title>Vanzio Laundry</title>

<style>

body{
font-family:Arial;
background:#f4f4f4;
text-align:center;
padding:40px;
}

.card{
background:white;
padding:25px;
border-radius:15px;
max-width:700px;
margin:auto;
box-shadow:0 0 15px rgba(0,0,0,.15);
}

button{
padding:12px 20px;
border:none;
border-radius:8px;
background:#1e88e5;
color:white;
cursor:pointer;
margin-bottom:20px;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #ddd;
padding:10px;
}

th{
background:#1e88e5;
color:white;
}

</style>

</head>

<body>

<div class="card">

<h1>🧺 Vanzio Laundry</h1>

<p>Versi 1.0</p>

<button onclick="loadHarga()">
Lihat Daftar Harga
</button>

<div id="harga"></div>

</div>

<script>

async function loadHarga(){

const res = await fetch("/api/services");

const data = await res.json();

let html = "<table>";

html += "<tr>";
html += "<th>Layanan</th>";
html += "<th>Satuan</th>";
html += "<th>Harga</th>";
html += "</tr>";

data.forEach(item=> {


html += "<tr>";
html += "<td>" + item.nama + "</td>";
html += "<td>" + item.satuan + "</td>";
html += "<td>Rp " + item.harga + "</td>";
html += "</tr>";

});

html += "</table>";

document.getElementById("harga").innerHTML = html;

}

</script>

</body>

</html>

      `,{
        headers:{
          "content-type":"text/html;charset=UTF-8"
        }
      });

    }

    // ==========================
    // 404
    // ==========================

    return new Response("404 Not Found",{
      status:404
    });

  }
}
