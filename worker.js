export default {
  async fetch(request, env, ctx) {

    const url = new URL(request.url);

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
padding:50px;
}

.card{

background:white;
padding:25px;
border-radius:15px;
max-width:400px;
margin:auto;
box-shadow:0 0 15px rgba(0,0,0,.15);

}

h1{

color:#1e88e5;

}

button{

padding:15px 25px;
font-size:18px;
border:none;
border-radius:10px;
background:#1e88e5;
color:white;
cursor:pointer;

}

</style>

</head>

<body>

<div class="card">

<h1>🧺 Vanzio Laundry</h1>

<p>Versi 1.0</p>

<p>Cloudflare Workers</p>

<button>System Ready</button>

</div>

</body>

</html>

`,{

headers:{
"content-type":"text/html;charset=UTF-8"
}

});

    }

    return new Response("404");
  }
}
