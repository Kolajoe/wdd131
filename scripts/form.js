const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

function populateProductSelect() {
  const selectElement = document.getElementById('product-name');
  
  if (!selectElement) return;
  
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    selectElement.appendChild(option);
  });
}

function setFooterInfo() {
  const currentYearSpan = document.getElementById('current-year');
  const lastModifiedSpan = document.getElementById('last-modified');
  
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
}

function init() {
  populateProductSelect();
  setFooterInfo();
}

document.addEventListener('DOMContentLoaded', init);