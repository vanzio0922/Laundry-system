// =====================================
// VANZIO API
// =====================================

const API = {

    // =========================
    // GET
    // =========================

    async get(url){

        const res = await fetch(url);

        if(!res.ok){

            throw new Error("GET " + url);

        }

        return await res.json();

    },

    // =========================
    // POST
    // =========================

    async post(url,data){

        const res = await fetch(url,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        if(!res.ok){

            throw new Error("POST " + url);

        }

        return await res.json();

    },

    // =========================
    // PUT
    // =========================

    async put(url,data){

        const res = await fetch(url,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        if(!res.ok){

            throw new Error("PUT " + url);

        }

        return await res.json();

    },

    // =========================
    // DELETE
    // =========================

    async delete(url){

        const res = await fetch(url,{

            method:"DELETE"

        });

        if(!res.ok){

            throw new Error("DELETE " + url);

        }

        return await res.json();

    }

};

console.log("API Ready");
