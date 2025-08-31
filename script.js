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

// tampilkan daftar menu
function tampilkanDaftarMenu() {
  const daftarMenuContainer = document.getElementById("daftar-menu");
  daftarMenuContainer.innerHTML = "";

  menu.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
      <span class="menu-name">${item.nama}</span>
      <span class="menu-price">Rp${item.harga.toLocaleString("id-ID")}</span>
    `;

    daftarMenuContainer.appendChild(menuItem);
  });
}

// tampilkan form pesan sekarang
function tampilkanOrderMenu() {
  const orderMenuContainer = document.getElementById("order-menu");
  orderMenuContainer.innerHTML = "";

  menu.forEach((item, index) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    orderItem.innerHTML = `
      <label for="menu-${index}">${item.nama}</label>
      <input type="checkbox" id="menu-${index}" data-index="${index}">
      <input type="number" id="qty-${index}" min="1" value="1" data-index="${index}">
    `;

    orderMenuContainer.appendChild(orderItem);
  });

  // pasang event listener untuk checkbox & jumlah
  document.querySelectorAll("#order-menu input").forEach(input => {
    input.addEventListener("change", hitungTotal);
  });
}

// hitung total harga
function hitungTotal() {
  let total = 0;
  menu.forEach((item, index) => {
    const checkbox = document.getElementById(`menu-${index}`);
    const qty = document.getElementById(`qty-${index}`);
    if (checkbox && checkbox.checked) {
      total += item.harga * parseInt(qty.value || 1);
    }
  });

  document.getElementById("total-harga").textContent = 
    "Rp" + total.toLocaleString("id-ID");
}

document.addEventListener("DOMContentLoaded", () => {
  tampilkanDaftarMenu();
  tampilkanOrderMenu();
});
