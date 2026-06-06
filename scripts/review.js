function updateReviewCount() {
  let reviewCount = localStorage.getItem('reviewCount');
  
  if (reviewCount === null) {
    reviewCount = 0;
  } else {
    reviewCount = parseInt(reviewCount);
  }
  
  reviewCount++;
  
  localStorage.setItem('reviewCount', reviewCount);
  
  const countSpan = document.getElementById('review-count');
  if (countSpan) {
    countSpan.textContent = reviewCount;
  }
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
  updateReviewCount();
  setFooterInfo();
}

document.addEventListener('DOMContentLoaded', init);