const hamburger = document.getElementById('hamburgerBtn');
const nav = document.getElementById('primaryNav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
    
    const isOpen = nav.classList.contains('show');
    hamburger.textContent = isOpen ? '✕' :'☰';
});

const yearSpan = document.getElementById('currentYear');
const lastModifiedSpan = document.getElementById('lastModified');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;