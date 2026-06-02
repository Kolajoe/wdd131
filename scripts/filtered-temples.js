const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Copenhagen Denmark",
    location: "Copenhagen, Denmark",
    dedicated: "2004, May, 23",
    area: 22000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/copenhagen-denmark-temple/copenhagen-denmark-temple-16169-main.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 27300,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
  }
];

const templeContainer = document.getElementById('temple-container');
const templeCount = document.getElementById('temple-count');
const homeBtn = document.getElementById('home-btn');
const oldBtn = document.getElementById('old-btn');
const newBtn = document.getElementById('new-btn');
const largeBtn = document.getElementById('large-btn');
const smallBtn = document.getElementById('small-btn');

function getDedicatedYear(dedicatedStr) {
  const parts = dedicatedStr.split(',');
  return parseInt(parts[0].trim());
}

function filterTemples(filterType) {
  let filteredTemples = [];
  
  switch(filterType) {
    case 'old':
      filteredTemples = temples.filter(temple => getDedicatedYear(temple.dedicated) < 1900);
      break;
    case 'new':
      filteredTemples = temples.filter(temple => getDedicatedYear(temple.dedicated) > 2000);
      break;
    case 'large':
      filteredTemples = temples.filter(temple => temple.area > 90000);
      break;
    case 'small':
      filteredTemples = temples.filter(temple => temple.area < 10000);
      break;
    default:
      filteredTemples = [...temples];
  }
  
  return filteredTemples;
}

function displayTemples(templeArray) {
  templeContainer.innerHTML = '';
  
  if (templeArray.length === 0) {
    templeContainer.innerHTML = '<p class="no-results">No temples match this filter.</p>';
    templeCount.textContent = `0 temples found`;
    return;
  }
  
  templeArray.forEach(temple => {
    const card = document.createElement('div');
    card.classList.add('temple-card');
    
    const dedicatedDisplay = temple.dedicated;
    
    const formattedArea = temple.area.toLocaleString();
    
    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName} temple" loading="lazy">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${dedicatedDisplay}</p>
      <p><strong>Area:</strong> ${formattedArea} sq ft</p>
    `;
    
    templeContainer.appendChild(card);
  });
  
  templeCount.textContent = `${templeArray.length} temple${templeArray.length !== 1 ? 's' : ''} found`;
}

function setActiveButton(activeButtonId) {
  const buttons = [homeBtn, oldBtn, newBtn, largeBtn, smallBtn];
  buttons.forEach(btn => {
    if (btn && btn.id === activeButtonId) {
      btn.classList.add('active');
    } else if (btn) {
      btn.classList.remove('active');
    }
  });
}

function handleHomeFilter() {
  const filtered = filterTemples('home');
  displayTemples(filtered);
  setActiveButton('home-btn');
}

function handleOldFilter() {
  const filtered = filterTemples('old');
  displayTemples(filtered);
  setActiveButton('old-btn');
}

function handleNewFilter() {
  const filtered = filterTemples('new');
  displayTemples(filtered);
  setActiveButton('new-btn');
}

function handleLargeFilter() {
  const filtered = filterTemples('large');
  displayTemples(filtered);
  setActiveButton('large-btn');
}

function handleSmallFilter() {
  const filtered = filterTemples('small');
  displayTemples(filtered);
  setActiveButton('small-btn');
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

homeBtn.addEventListener('click', handleHomeFilter);
oldBtn.addEventListener('click', handleOldFilter);
newBtn.addEventListener('click', handleNewFilter);
largeBtn.addEventListener('click', handleLargeFilter);
smallBtn.addEventListener('click', handleSmallFilter);

function init() {
  setFooterInfo();
  displayTemples(temples);
}

document.addEventListener('DOMContentLoaded', init);