const menu = [
  { nama: "Selai Nanas (Single)", harga: 10000, gambar: "img/nanas-single.jpg" },
  { nama: "Selai Strawberry (Single)", harga: 10000, gambar: "img/strawberry-single.jpg" },
  { nama: "Selai Blueberry (Single)", harga: 10000, gambar: "img/blueberry-single.jpg" },
  { nama: "Selai Nanas (Double)", harga: 15000, gambar: "img/nanas-double.jpg" },
  { nama: "Selai Strawberry (Double)", harga: 15000, gambar: "img/strawberry-double.jpg" },
  { nama: "Selai Blueberry (Double)", harga: 15000, gambar: "img/blueberry-double.jpg" },
  { nama: "Coklat (Single)", harga: 13000, gambar: "img/coklat-single.jpg" },
  { nama: "Keju (Single)", harga: 13000, gambar: "img/keju-single.jpg" },
  { nama: "Kacang (Single)", harga: 13000, gambar: "img/kacang-single.jpg" },
  { nama: "Coklat (Double)", harga: 20000, gambar: "img/coklat-double.jpg" },
  { nama: "Keju (Double)", harga: 20000, gambar: "img/keju-double.jpg" },
  { nama: "Kacang (Double)", harga: 20000, gambar: "img/kacang-double.jpg" },
  { nama: "Coklat Kacang (Double)", harga: 20000, gambar: "img/coklat-kacang.jpg" },
  { nama: "Coklat Keju (Double)", harga: 20000, gambar: "img/coklat-keju.jpg" },
  { nama: "Full Keju (Single)", harga: 15000, gambar: "img/full-keju-single.jpg" },
  { nama: "Tiramisu (Single)", harga: 15000, gambar: "img/tiramisu-single.jpg" },
  { nama: "Choco Spread (Single)", harga: 15000, gambar: "img/choco-spread-single.jpg" },
  { nama: "Choco Crunchy (Single)", harga: 15000, gambar: "img/choco-crunchy.jpg" },
  { nama: "Greentea (Single)", harga: 15000, gambar: "img/greentea-single.jpg" },
  { nama: "Full Keju (Double)", harga: 30000, gambar: "img/full-keju-double.jpg" },
  { nama: "Tiramisu (Double)", harga: 30000, gambar: "img/tiramisu-double.jpg" },
  { nama: "Choco Spread (Double)", harga: 30000, gambar: "img/choco-spread-double.jpg" },
  { nama: "Choco Crunchy (Double)", harga: 30000, gambar: "img/choco-crunchy-double.jpg" },
  { nama: "Greentea (Double)", harga: 30000, gambar: "img/greentea-double.jpg" },
  { nama: "Roti Asin (Single)", harga: 10000, gambar: "img/roti-asin-single.jpg" },
  { nama: "Roti Asin (Double)", harga: 20000, gambar: "img/roti-asin-double.jpg" }
];

const tbody = document.querySelector("#menuTable tbody");
const totalHargaEl = document.getElementById("totalHarga");
const pesanBtn = document.getElementById("pesanBtn");

function renderMenu() {
  menu.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="pilih" data-index="${index}"></td>
      <td>${item.nama}</td>
      <td><img src="${item.gambar}" alt="${item.nama}"></td>
      <td>Rp${item.harga.toLocaleString()}</td>
      <td><input type="number" class="jumlah" data-index="${index}" value="1" min="1" disabled></td>
    `;
    tbody.appendChild(row);
  });
}

function hitungTotal() {
  let total = 0;
  document.querySelectorAll(".pilih").forEach(cb => {
    if (cb.checked) {
      const index = cb.dataset.index;
      const jumlah = document.querySelector(`.jumlah[data-index="${index}"]`).value;
      total += menu[index].harga * jumlah;
    }
  });
  totalHargaEl.textContent = `Rp${total.toLocaleString()}`;
  cekPesanAktif();
}

function cekPesanAktif() {
  const adaPesanan = Array.from(document.querySelectorAll(".pilih")).some(cb => cb.checked);
  const nama = document.getElementById("nama").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  pesanBtn.disabled = !(adaPesanan && nama && alamat);
}

function buatPesan() {
  const nama = document.getElementById("nama").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  let pesan = `Halo, saya ingin pesan:\n\n`;
  document.querySelectorAll(".pilih").forEach(cb => {
    if (cb.checked) {
      const index = cb.dataset.index;
      const jumlah = document.querySelector(`.jumlah[data-index="${index}"]`).value;
      pesan += `- ${menu[index].nama} x${jumlah} (Rp${(menu[index].harga * jumlah).toLocaleString()})\n`;
    }
  });
  pesan += `\nAtas nama: ${nama}\nAlamat: ${alamat}`;
  const total = totalHargaEl.textContent;
  pesan += `\n\nTotal: ${total}`;
  return encodeURIComponent(pesan);
}

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("pilih")) {
    const index = e.target.dataset.index;
    const jumlahInput = document.querySelector(`.jumlah[data-index="${index}"]`);
    jumlahInput.disabled = !e.target.checked;
    hitungTotal();
  }
  if (e.target.classList.contains("jumlah")) {
    hitungTotal();
  }
  if (e.target.id === "nama" || e.target.id === "alamat") {
    cekPesanAktif();
  }
});

pesanBtn.addEventListener("click", () => {
  const pesan = buatPesan();
  window.open(`https://wa.me/6285171130091?text=${pesan}`, "_blank");
});

renderMenu();
