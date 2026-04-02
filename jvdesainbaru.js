// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "123") {
        localStorage.setItem("login", "true");
        window.location.href = "dasboardesainbaru.html";
    } else {
        alert("Login gagal!");
    }
}

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "logindesainbaru.html";
}

// MENU
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// LOAD GAMBAR SAAT REFRESH
window.onload = function() {
    let data = JSON.parse(localStorage.getItem("images")) || [];
    let gallery = document.getElementById("gallery");

    data.forEach(src => {
        createCard(src);
    });
}

// UPLOAD MULTIPLE + SIMPAN
function uploadImage() {
    let input = document.getElementById("upload");

    if(input.files.length === 0) {
        alert("Pilih gambar!");
        return;
    }

    let data = JSON.parse(localStorage.getItem("images")) || [];

    Array.from(input.files).forEach(file => {
        let reader = new FileReader();

        reader.onload = function(e) {
            data.push(e.target.result);
            localStorage.setItem("images", JSON.stringify(data));
            createCard(e.target.result);
        }

        reader.readAsDataURL(file);
    });
}

// BUAT CARD
function createCard(src) {
    let gallery = document.getElementById("gallery");

    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = src;

    // klik = preview
    img.onclick = function() {
        showPreview(src);
    }

    // tombol hapus
    let del = document.createElement("button");
    del.innerText = "Hapus";
    del.onclick = function() {
        deleteImage(src, card);
    }

    card.appendChild(img);
    card.appendChild(del);
    gallery.appendChild(card);
}

// HAPUS GAMBAR
function deleteImage(src, card) {
    let data = JSON.parse(localStorage.getItem("images")) || [];
    data = data.filter(img => img !== src);

    localStorage.setItem("images", JSON.stringify(data));
    card.remove();
}

// PREVIEW GAMBAR
function showPreview(src) {
    let preview = document.createElement("div");
    preview.className = "preview";

    let img = document.createElement("img");
    img.src = src;

    preview.appendChild(img);

    preview.onclick = function() {
        preview.remove();
    }

    document.body.appendChild(preview);
}

// CHAT AI LEBIH PINTAR
function sendMessage() {
    let input = document.getElementById("chatInput");
    let chatBox = document.getElementById("chatBox");

    let msg = input.value.toLowerCase();

    chatBox.innerHTML += "perkataan bebas";

    let reply = "tunggu ya...";

    if(msg.includes("halo")) reply = "Halo! 👋";
    else if(msg.includes("nama")) reply = "Saya AI buatan kamu 😎";
    else if(msg.includes("hari")) {
        let hari = new Date().toLocaleDateString("id-ID", { weekday: 'long' });
        reply = "Hari ini " + hari;
    }
    else if(msg.includes("jam")) {
        let jam = new Date().toLocaleTimeString();
        reply = "Sekarang jam " + jam;
    }
    else if(msg.includes("terima kasih")) reply = "Sama-sama 😊";

    chatBox.innerHTML += "<p><b>AI:</b> " + reply + "</p>";

    input.value = "";

    let dropArea = document.getElementById("dropArea");

if(dropArea){
    dropArea.addEventListener("dragover", e => {
        e.preventDefault();
        dropArea.style.background = "#ddd";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.style.background = "";
    });

    dropArea.addEventListener("drop", e => {
        e.preventDefault();
        let files = e.dataTransfer.files;

        Array.from(files).forEach(file => {
            let reader = new FileReader();

            reader.onload = function(e) {
                createCard(e.target.result);
            }

            reader.readAsDataURL(file);
        });
    });
}

async function sendMessage() {
    let input = document.getElementById("chatInput");
    let chatBox = document.getElementById("chatBox");

    let msg = input.value;

    chatBox.innerHTML += `<p><b>Kamu:</b> ${msg}</p>`;

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer API_KEY_KAMU"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: msg }]
        })
    });

    let data = await response.json();
    let reply = data.choices[0].message.content;

    chatBox.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
    input.value = "";
}

// PINDAH MENU
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// LOGOUT
function logout() {
    window.location.href = "logindesainbaru.html";
}

// UPLOAD BUTTON
function uploadImage() {
    let input = document.getElementById("upload");

    Array.from(input.files).forEach(file => {
        let reader = new FileReader();

        reader.onload = function(e) {
            createCard(e.target.result);
        }

        reader.readAsDataURL(file);
    });
}

// DRAG DROP
let = document.getElementById("dropArea");

if (dropArea) {
    dropArea.addEventListener("dragover", e => {
        e.preventDefault();
        dropArea.style.background = "#ddd";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.style.background = "";
    });

    dropArea.addEventListener("drop", e => {
        e.preventDefault();
        let files = e.dataTransfer.files;

        Array.from(files).forEach(file => {
            let reader = new FileReader();

            reader.onload = function(e) {
                createCard(e.target.result);
            }

            reader.readAsDataURL(file);
        });
    });
}

// BUAT CARD
function createCard(src) {
    let gallery = document.getElementById("gallery");

    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = src;

    img.onclick = () => showPreview(src);

    let del = document.createElement("button");
    del.innerText = "Hapus";
    del.onclick = () => {
        deleteImage(src, card);
    };

    card.appendChild(img);
    card.appendChild(del);
    gallery.appendChild(card);
}
}

// CHAT SEDERHANA
function sendMessage() {
    let input = document.getElementById("chatInput");
    let chatBox = document.getElementById("chatBox");

    let msg = input.value.toLowerCase();

    chatBox.innerHTML += "<p><b>Kamu:</b> " + msg + "</p>";

    let reply = "Saya tidak mengerti 😅";

    if(msg.includes("halo")) reply = "Halo juga!";
    else if(msg.includes("nama")) reply = "Saya AI sederhana";
    else if(msg.includes("hari")) reply = new Date().toLocaleDateString();

    chatBox.innerHTML += "<p><b>AI:</b> " + reply + "</p>";

    input.value = "";
}
window.onload = function() {
    let name = localStorage.getItem("username") || "User";
    document.getElementById("welcome").innerText = 
        "Selamat datang, " + name;

    loadImages();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function loadImages() {
    let data = JSON.parse(localStorage.getItem("images")) || [];
    data.forEach(src => createCard(src));
}

function saveImage(src) {
    let data = JSON.parse(localStorage.getItem("images")) || [];
    data.push(src);
    localStorage.setItem("images", JSON.stringify(data));
}

function deleteImage(src, card) {
    let data = JSON.parse(localStorage.getItem("images")) || [];
    data = data.filter(img => img !== src);
    localStorage.setItem("images", JSON.stringify(data));
    card.remove();
}

function showPreview(src) {
    let div = document.createElement("div");
    div.className = "preview";

    let img = document.createElement("img");
    img.src = src;

    div.appendChild(img);

    div.onclick = () => div.remove();

    document.body.appendChild(div);
}

function uploadImage() {
    let input = document.getElementById("upload");

    Array.from(input.files).forEach(file => {
        let reader = new FileReader();

        reader.onload = function(e) {
            createCard(e.target.result);
            saveImage(e.target.result);
        }

        reader.readAsDataURL(file);
    });
}

function sendMessage() {
    let input = document.getElementById("chatInput");
    let chatBox = document.getElementById("chatBox");

    let msg = input.value.toLowerCase();

    chatBox.innerHTML += "<p><b>Kamu:</b> " + msg + "</p>";

    let reply = "Saya belum paham 😅";

    if(msg.includes("halo")) reply = "Halo! 👋";
    else if(msg.includes("nama")) reply = "Nama saya AI kamu 😎";
    else if(msg.includes("hari")) {
        reply = new Date().toLocaleDateString("id-ID",{weekday:'long'});
    }
    else if(msg.includes("jam")) {
        reply = new Date().toLocaleTimeString();
    }
    else if(msg.includes("siapa kamu")) {
        reply = "Saya AI sederhana buatan kamu 🔥";
    }

    chatBox.innerHTML += "<p><b>AI:</b> " + reply + "</p>";

    input.value = "";

    function searchImage() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function simpanAbout() {
    let nama = document.getElementById("nama").value;
    let kampus = document.getElementById("kampus").value;
    let jurusan = document.getElementById("jurusan").value;

    localStorage.setItem("nama", nama);
    localStorage.setItem("kampus", kampus);
    localStorage.setItem("jurusan", jurusan);

    tampilAbout();
}

function tampilAbout() {
    document.getElementById("outNama").innerText = localStorage.getItem("nama") || "-";
    document.getElementById("outKampus").innerText = localStorage.getItem("kampus") || "-";
    document.getElementById("outJurusan").innerText = localStorage.getItem("jurusan") || "-";
}

// panggil saat load
window.onload = function() {
    tampilAbout();
}

function updateTotal() {
    let total = document.querySelectorAll(".card").length;
    document.getElementById("totalKarya").innerText = total;
}

function createCard(src) {
    let gallery = document.getElementById("gallery");

    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = src;

    card.appendChild(img);
    gallery.appendChild(card);

    updateTotal(); // 🔥 update jumlah
}

let text = "Selamat Datang di Website Saya 👋";
let i = 0;

function typingEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typingEffect, 50);
    }
}

typingEffect();

function uploadImage() {
    let input = document.getElementById("upload");

    if (input.files.length === 0) {
        alert("Pilih gambar dulu!");
        return;
    }

    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let gallery = document.getElementById("gallery");

        let div = document.createElement("div");
        div.className = "card";

        let img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100%";

        div.appendChild(img);
        gallery.appendChild(div);

        updateTotal();
    };

    reader.readAsDataURL(file);
}

function updateTotal() {
    let total = document.querySelectorAll("#gallery .card").length;
    document.getElementById("totalKarya").innerText = total;
}

}
