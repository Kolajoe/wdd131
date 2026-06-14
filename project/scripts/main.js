// ============================================
// GREEN ENERGY DRC - MAIN JAVASCRIPT
// Contains: Functions, DOM manipulation, Events
// Conditional branching, Objects, Arrays, 
// Array methods, Template literals, localStorage
// ============================================

// ========== ENERGY SOURCES DATA (OBJECTS & ARRAYS) ==========
const energySources = [
  { name: "Hydroelectric", icon: "💧", capacity: "100,000+ MW", co2Saved: 0, color: "#2E7D32", description: "The Congo River offers unparalleled hydro potential." },
  { name: "Solar", icon: "☀️", capacity: "5-6 kWh/m²/day", co2Saved: 0.5, color: "#FFC107", description: "Year-round sunshine for reliable power generation." },
  { name: "Biomass", icon: "🌿", capacity: "1,000+ MW", co2Saved: 0.3, color: "#8D6E63", description: "Sustainable energy from agricultural waste." }
];

// Array method: .map() to generate HTML cards
function generateEnergyCards() {
  const container = document.getElementById('energy-cards-container');
  if (!container) return;
  
  // Using template literals exclusively
  const cardsHTML = energySources.map(source => `
    <div class="energy-card" style="border-top: 4px solid ${source.color}">
      <div style="font-size: 3rem;">${source.icon}</div>
      <h3>${source.name}</h3>
      <p><strong>Potential:</strong> ${source.capacity}</p>
      <p>${source.description}</p>
    </div>
  `).join('');
  
  container.innerHTML = cardsHTML;
}

// ========== BENEFITS DATA (OBJECTS & ARRAYS) ==========
const benefitsData = [
  {
    icon: "🌍",
    title: "Environmental Benefits",
    benefits: [
      "Reduces greenhouse gas emissions by up to 80%",
      "Improves air quality and public health",
      "Protects forests and biodiversity",
      "Reduces water pollution from fossil fuels"
    ]
  },
  {
    icon: "💰",
    title: "Economic Benefits",
    benefits: [
      "Creates local jobs in installation and maintenance",
      "Reduces dependence on imported fuels",
      "Stable and predictable energy costs",
      "Attracts foreign investment"
    ]
  },
  {
    icon: "🏠",
    title: "Social Benefits",
    benefits: [
      "Provides electricity to rural communities",
      "Powers schools, hospitals, and businesses",
      "Improves quality of life",
      "Reduces energy poverty"
    ]
  }
];

// Function to generate benefits cards dynamically
function generateBenefitsCards() {
  const container = document.getElementById('benefits-container');
  if (!container) return;
  
  // Using .map() array method with template literals
  const benefitsHTML = benefitsData.map(benefit => `
    <div class="benefit-card">
      <div class="benefit-icon">${benefit.icon}</div>
      <h3>${benefit.title}</h3>
      <ul>
        ${benefit.benefits.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  
  container.innerHTML = benefitsHTML;
}

// ========== CO2 CALCULATOR (FUNCTIONS, CONDITIONALS, TEMPLATE LITERALS) ==========
// Emission factors (kg CO2 per kWh)
const emissionFactors = {
  diesel: 0.267,
  gasoline: 0.249,
  grid: 0.95
};

function calculateCO2Savings(kwh, sourceType) {
  // CONDITIONAL BRANCHING
  if (kwh <= 0 || isNaN(kwh)) {
    return { error: "Please enter a valid positive number for kWh." };
  }
  
  const factor = emissionFactors[sourceType];
  if (!factor) {
    return { error: "Invalid energy source selected." };
  }
  
  const monthlyEmissions = kwh * factor;
  const yearlyEmissions = monthlyEmissions * 12;
  const savings = yearlyEmissions; // Switching to renewable = 100% savings
  
  return {
    monthly: monthlyEmissions,
    yearly: yearlyEmissions,
    savings: savings
  };
}

function displayCO2Result() {
  const kwhInput = document.getElementById('kwh-usage');
  const sourceSelect = document.getElementById('energy-source');
  const resultDiv = document.getElementById('calculator-result');
  
  if (!kwhInput || !sourceSelect || !resultDiv) return;
  
  const kwh = parseFloat(kwhInput.value);
  const source = sourceSelect.value;
  
  const result = calculateCO2Savings(kwh, source);
  
  // TEMPLATE LITERALS used exclusively for all string output
  if (result.error) {
    resultDiv.innerHTML = `<span style="color: #ffcc00;">⚠️ ${result.error}</span>`;
  } else {
    resultDiv.innerHTML = `
      <strong>🌍 Your CO₂ Savings Potential:</strong><br>
      📊 Monthly emissions: <strong>${result.monthly.toFixed(2)} kg CO₂</strong><br>
      📅 Yearly emissions: <strong>${result.yearly.toFixed(2)} kg CO₂</strong><br>
      💚 By switching to renewables, you save <strong>${result.savings.toFixed(2)} kg CO₂ per year!</strong>
    `;
    
    // Save to localStorage
    saveCalculatorData(kwh, source, result);
  }
  
  resultDiv.classList.add('show');
}

// ========== LOCALSTORAGE FUNCTIONS ==========
function saveCalculatorData(kwh, source, result) {
  const calculatorData = {
    lastKwh: kwh,
    lastSource: source,
    lastSavings: result.savings,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('greenEnergyCalculator', JSON.stringify(calculatorData));
}

function loadCalculatorData() {
  const savedData = localStorage.getItem('greenEnergyCalculator');
  if (savedData) {
    const data = JSON.parse(savedData);
    const kwhInput = document.getElementById('kwh-usage');
    const sourceSelect = document.getElementById('energy-source');
    const kwhSlider = document.getElementById('kwh-slider');
    
    if (kwhInput && sourceSelect) {
      kwhInput.value = data.lastKwh;
      sourceSelect.value = data.lastSource;
    }
    
    // Also update slider if it exists
    if (kwhSlider) {
      kwhSlider.value = data.lastKwh;
    }
  }
}

// ========== SLIDER AND NUMBER INPUT SYNCHRONIZATION ==========
function initCalculatorInputs() {
  const slider = document.getElementById('kwh-slider');
  const numberInput = document.getElementById('kwh-usage');
  
  if (slider && numberInput) {
    // Update number input when slider changes
    slider.addEventListener('input', function() {
      numberInput.value = this.value;
      displayCO2Result();
    });
    
    // Update slider when number input changes
    numberInput.addEventListener('input', function() {
      slider.value = this.value;
      displayCO2Result();
    });
  }
}

// ========== FORM HANDLER (with localStorage) ==========
function handleNewsletterForm(event) {
  event.preventDefault();
  
  // DOM SELECTION
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const interest = document.getElementById('interest');
  const message = document.getElementById('message');
  
  // CONDITIONAL BRANCHING for validation
  if (!name.value.trim()) {
    showFormMessage('Please enter your name.', 'error');
    return;
  }
  
  if (!email.value.trim() || !email.value.includes('@')) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  if (!interest.value) {
    showFormMessage('Please select an area of interest.', 'error');
    return;
  }
  
  // Create user data object
  const userData = {
    name: name.value.trim(),
    email: email.value.trim(),
    interest: interest.value,
    message: message.value.trim(),
    date: new Date().toISOString()
  };
  
  // Save to localStorage (using TEMPLATE LITERAL for key)
  const existingSubscribers = JSON.parse(localStorage.getItem('greenEnergySubscribers') || '[]');
  existingSubscribers.push(userData);
  localStorage.setItem('greenEnergySubscribers', JSON.stringify(existingSubscribers));
  
  // TEMPLATE LITERAL for success message
  showFormMessage(`Thank you ${userData.name}! You've successfully subscribed to our ${userData.interest} updates.`, 'success');
  
  // Reset form
  event.target.reset();
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById('form-message');
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 5000);
  }
}

// ========== STATS DATA (ARRAY with .map method) ==========
const statsData = [
  { label: "People without electricity", value: "70M", description: "70 million Congolese lack access" },
  { label: "Hydro potential", value: "100,000 MW", description: "One of Africa's largest potentials" },
  { label: "Solar hours/year", value: "2,800h", description: "Year-round sunshine" },
  { label: "CO₂ reduction potential", value: "50M tons", description: "Annual reduction possible" }
];

function generateStats() {
  const container = document.getElementById('stats-container');
  if (!container) return;
  
  // Using .map() array method with template literals
  const statsHTML = statsData.map(stat => `
    <div class="stat-card">
      <div class="stat-number">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
      <p>${stat.description}</p>
    </div>
  `).join('');
  
  container.innerHTML = statsHTML;
}

// ========== EVENT LISTENERS (DOM interaction) ==========
function initEventListeners() {
  // Calculator button
  const calcBtn = document.getElementById('calculate-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', displayCO2Result);
  }
  
  // Newsletter form
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', handleNewsletterForm);
  }
  
  // Auto-calculate on input change
  const kwhInput = document.getElementById('kwh-usage');
  const sourceSelect = document.getElementById('energy-source');
  if (kwhInput && sourceSelect) {
    kwhInput.addEventListener('input', displayCO2Result);
    sourceSelect.addEventListener('change', displayCO2Result);
  }
}


// ========== FOOTER INFORMATION ==========
function updateFooterInfo() {
  const currentYear = document.getElementById('current-year');
  const lastModified = document.getElementById('last-modified');

  // Current year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Last modified date
  if (lastModified) {
    const modifiedDate = new Date(document.lastModified);

    lastModified.textContent =
      `${modifiedDate.toLocaleDateString()} ${modifiedDate.toLocaleTimeString()}`;
  }
}

// ========== PAGE INITIALIZATION ==========
function init() {
  // Generate dynamic content
  generateEnergyCards();
  generateBenefitsCards();  // <-- ADDED: Generates benefits cards dynamically
  generateStats();
  
  // Footer
  updateFooterInfo();
  
  // Load saved calculator data
  loadCalculatorData();
  
  // Initialize event listeners
  initEventListeners();
  
  // Initialize slider synchronization
  initCalculatorInputs();
  
  // Auto-run calculator if on homepage
  if (document.getElementById('calculator-result')) {
    setTimeout(displayCO2Result, 100);
  }
  
  console.log('Green Energy DRC - Initialized successfully');
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);