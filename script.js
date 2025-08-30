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

// Render daftar menu + checkbox
const menuList = document.getElementById("menu-list");
const pesananDiv = document.getElementById("pesanan");

menu.forEach((item, index) => {
  // daftar menu di atas
  let div = document.createElement("div");
  div.classList.add("menu-item");
  div.innerHTML = `<span>${item.nama}</span><span>Rp${item.harga.toLocaleString("id-ID")}</span>`;
  menuList.appendChild(div);

  // checkbox + jumlah untuk form
  let label = document.createElement("label");
  label.innerHTML = `
    <span>
      <input type="checkbox" value="${item.nama}" data-harga="${item.harga}" id="menu-${index}">
      ${item.nama}
    </span>
    <input type="number" id="jumlah-${index}" value="1" min="1" disabled>
  `;
  pesananDiv.appendChild(label);

  // Aktifkan input jumlah hanya jika checkbox dicentang
  label.querySelector("input[type=checkbox]").addEventListener("change", (e) => {
    const jumlahInput = document.getElementById(`jumlah-${index}`);
    jumlahInput.disabled = !e.target.checked;
  });
});

// Fungsi pesan WA
function pesan() {
  let nama = document.getElementById('nama').value.trim();
  let alamat = document.getElementById('alamat').value.trim();
  let checkboxes = document.querySelectorAll('#pesanan input[type=checkbox]:checked');

  if (nama === "" || alamat === "" || checkboxes.length === 0) {
    alert("Harap isi nama, alamat, dan pilih minimal 1 menu!");
    return;
  }

  let pesanan = [];
  let total = 0;

  checkboxes.forEach(cb => {
    let index = cb.id.split("-")[1];
    let jumlah = parseInt(document.getElementById(`jumlah-${index}`).value);
    let harga = parseInt(cb.getAttribute("data-harga"));
    pesanan.push(`${cb.value} x${jumlah} (Rp${(harga * jumlah).toLocaleString("id-ID")})`);
    total += harga * jumlah;
  });

  let pesanWA = `Halo, saya ${nama}.\nAlamat: ${alamat}\nSaya ingin memesan:\n\n${pesanan.join("\n")}\n\nTotal: Rp${total.toLocaleString("id-ID")}`;
  let nomorWA = "6285171130091"; // ganti nomor WA penjual
  let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;
  
  window.open(url, '_blank');
}
