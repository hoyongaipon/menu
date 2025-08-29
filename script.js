// Daftar menu
const menu = [
  { nama: "Nanas (Single)", harga: 10000 },
  { nama: "Strawberry (Single)", harga: 10000 },
  { nama: "Blueberry (Single)", harga: 10000 },
  { nama: "Coklat (Single)", harga: 13000 },
  { nama: "Nanas (Double)", harga: 15000 },
  { nama: "Strawberry (Double)", harga: 15000 },
  { nama: "Blueberry (Double)", harga: 15000 },
  { nama: "Coklat (Double)", harga: 20000 },
  { nama: "Keju (Single)", harga: 13000 },
  { nama: "Coklat Kacang (Single)", harga: 13000 },
  { nama: "Coklat Keju (Single)", harga: 13000 },
  { nama: "Keju (Double)", harga: 22000 },
  { nama: "Coklat Kacang (Double)", harga: 22000 },
  { nama: "Coklat Keju (Double)", harga: 22000 },
  { nama: "Full Keju (Single)", harga: 15000 },
  { nama: "Tiramisu Chrunchy (Single)", harga: 15000 },
  { nama: "Choco Spread (Single)", harga: 15000 },
  { nama: "Choco Chrunchy (Single)", harga: 15000 },
  { nama: "Greentea Chrunchy (Single)", harga: 15000 },
  { nama: "Full Keju (Double)", harga: 27000 },
  { nama: "Tiramisu Chrunchy (Double)", harga: 27000 },
  { nama: "Choco Spread (Double)", harga: 27000 },
  { nama: "Choco Chrunchy (Double)", harga: 30000 },
  { nama: "Greentea Chrunchy (Double)", harga: 30000 }
];

// Render daftar menu
const menuList = document.getElementById("menu-list");
const pesananSelect = document.getElementById("pesanan");

menu.forEach(item => {
  // Tambah ke daftar menu
  let div = document.createElement("div");
  div.classList.add("menu-item");
  div.innerHTML = `<span>${item.nama}</span><span>Rp${item.harga.toLocaleString("id-ID")}</span>`;
  menuList.appendChild(div);

  // Tambah ke dropdown
  let option = document.createElement("option");
  option.value = item.nama;
  option.textContent = item.nama;
  pesananSelect.appendChild(option);
});

// Fungsi pesan WA
function pesan() {
  let nama = document.getElementById('nama').value;
  let pesanan = document.getElementById('pesanan').value;
  let jumlah = document.getElementById('jumlah').value;
  
  if (nama === "" || pesanan === "") {
    alert("Harap isi nama dan pilih menu!");
    return;
  }
  
  let pesanWA = `Halo, saya ${nama}. Saya ingin memesan:\n${pesanan} x${jumlah}`;
  let nomorWA = "6285171130091"; // Ganti dengan nomor WhatsApp penjual
  let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;
  
  window.open(url, '_blank');
}
