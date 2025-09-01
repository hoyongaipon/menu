const menu = [
  { nama: "Selai Nanas (Single)", harga: 10000 },
  { nama: "Selai Strawberry (Single)", harga: 10000 },
  { nama: "Selai Blueberry (Single)", harga: 10000 },
  { nama: "Selai Nanas (Double)", harga: 15000 },
  { nama: "Selai Strawberry (Double)", harga: 15000 },
  { nama: "Selai Blueberry (Double)", harga: 15000 },
  { nama: "Coklat (Single)", harga: 13000 },
  { nama: "Keju (Single)", harga: 13000 },
  { nama: "Kacang (Single)", harga: 13000 },
  { nama: "Coklat (Double)", harga: 20000 },
  { nama: "Keju (Double)", harga: 20000 },
  { nama: "Kacang (Double)", harga: 20000 },
  { nama: "Coklat Kacang (Double)", harga: 20000 },
  { nama: "Coklat Keju (Double)", harga: 20000 },
  { nama: "Full Keju (Single)", harga: 15000 },
  { nama: "Tiramisu (Single)", harga: 15000 },
  { nama: "Choco Spread (Single)", harga: 15000 },
  { nama: "Choco Crunchy (Double)", harga: 15000 },
  { nama: "Greentea (Single)", harga: 15000 },
  { nama: "Full Keju (Double)", harga: 30000 },
  { nama: "Tiramisu (Double)", harga: 30000 },
  { nama: "Choco Spread (Double)", harga: 30000 },
  { nama: "Choco Crunchy (Double)", harga: 30000 },
  { nama: "Greentea (Double)", harga: 30000 },
  { nama: "Roti Asin (Single)", harga: 10000 },
  { nama: "Roti Asin (Double)", harga: 20000 },
];

const menuTable = document.getElementById("menuTable");
const totalHargaEl = document.getElementById("totalHarga");
const pesanBtn = document.getElementById("pesanBtn");

menu.forEach((item, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="checkbox" class="menu-check" data-index="${index}"></td>
    <td>${item.nama}</td>
    <td>Rp${item.harga.toLocaleString("id-ID")}</td>
    <td><input type="number" class="menu-qty" data-index="${index}" value="1" min="1" disabled></td>
  `;
  menuTable.appendChild(row);
});

function hitungTotal() {
  let total = 0;
  document.querySelectorAll(".menu-check").forEach(check => {
    const index = check.dataset.index;
    const qtyInput = document.querySelector(`.menu-qty[data-index="${index}"]`);
    if (check.checked) {
      total += menu[index].harga * parseInt(qtyInput.value);
    }
  });
  totalHargaEl.textContent = total.toLocaleString("id-ID");
}

menuTable.addEventListener("change", (e) => {
  if (e.target.classList.contains("menu-check")) {
    const index = e.target.dataset.index;
    const qtyInput = document.querySelector(`.menu-qty[data-index="${index}"]`);
    qtyInput.disabled = !e.target.checked;
  }
  hitungTotal();
});

menuTable.addEventListener("input", (e) => {
  if (e.target.classList.contains("menu-qty")) {
    hitungTotal();
  }
});

pesanBtn.addEventListener("click", () => {
  let pesan = "Halo, saya mau pesan:%0A";
  document.querySelectorAll(".menu-check:checked").forEach(check => {
    const index = check.dataset.index;
    const qty = document.querySelector(`.menu-qty[data-index="${index}"]`).value;
    pesan += `- ${menu[index].nama} x${qty} (Rp${(menu[index].harga * qty).toLocaleString("id-ID")})%0A`;
  });
  pesan += `%0ATotal: Rp${totalHargaEl.textContent}`;
  window.open(`https://wa.me/6285171130091?text=${pesan}`, "_blank");
});
