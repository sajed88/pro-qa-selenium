// Function to fetch exchange rate data
const apiKey = 'b0dbd5b839dee1369b660edf';
function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}?apiKey=${apiKey}`;   
    
    return fetch(url)
      .then(response => response.json())
      .then(data => data.rates[toCurrency]);
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    getExchangeRate(fromCurrency, toCurrency)
      .then(rate => {
        const convertedAmount = amount * rate;
        document.getElementById('results').value = `${convertedAmount} ${toCurrency}`;
        document.getElementById('rateUseds').value = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
      })
      .catch(error => {
        document.getElementById('result').textContent = 'Error occurred while fetching exchange rates.';
      });
  }
  
  // Populate currency options
  function populateCurrencies() {
    const url = `https://api.exchangerate-api.com/v4/latest/USD`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const currencies = Object.keys(data.rates);
        const selectElements = document.querySelectorAll('select');
        
        currencies.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.textContent = currency;
          
          selectElements.forEach(select => {
            select.appendChild(option.cloneNode(true));
          });
        });
      })
      .catch(error => {
        document.getElementById('result').textContent = 'Error occurred while fetching currencies.';
      });
  }
  
  // Event listener for form submission
  document.getElementById('exchangeForm').addEventListener('submit', handleFormSubmit);
  
  // Load available currencies when the page is loaded
  window.addEventListener('DOMContentLoaded', populateCurrencies);
