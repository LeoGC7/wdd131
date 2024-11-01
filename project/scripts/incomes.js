// Function to Home Tab
function homeTab() {
    window.location.href = 'index.html';
}

// Function to Expenses Tab
function expensesTab() {
    window.location.href = 'expenses.html';
}

// Function to Income Tab
function incomesTab() {
    window.location.href = 'incomes.html';
}

// Function to Settings Tab
function settingsTab() {
    window.location.href = 'settings.html';
}

// Total income initial value
let totalIncome = 0;

// Load categories and incomes from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadIncomeCategories();
    loadIncomesData();
});

// Function to load income categories into the select dropdown
function loadIncomeCategories() {
    const incomeSelect = document.getElementById("income-select");
    const categories = JSON.parse(localStorage.getItem('incomeCategories')) || [];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        incomeSelect.appendChild(option);
    });
}

// Function to add an income
function addIncome() {
    const dateInput = document.getElementById("date").value;
    const categorySelect = document.getElementById("income-select").value;
    const valueInput = document.getElementById("value").value.trim();

    if (dateInput && categorySelect && valueInput) {
        const tbody = document.querySelector(".income-table tbody");
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${dateInput}</td>
            <td>${categorySelect}</td>
            <td>${valueInput}</td>
            <td><button class="remove-button" onclick="removeIncome(this)">X</button></td>
        `;

        tbody.appendChild(tr);
        saveIncomeData(dateInput, categorySelect, valueInput);
        updateTotalIncome(valueInput);
        updateIncomeCategoryTotal(categorySelect, valueInput); // Update category total

        printIncomeTotals(); // Print totals after adding an income
        
        document.getElementById("date").value = '';
        document.getElementById("value").value = '';
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to update total income
function updateTotalIncome(value) {
    totalIncome += parseFloat(value);
    localStorage.setItem('totalIncome', totalIncome);
}

// Function to save the income to local storage
function saveIncomeData(date, category, value) {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push({ date, category, value });
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Function to load incomes from local storage
function loadIncomesData() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const tbody = document.querySelector(".income-table tbody");
    
    totalIncome = 0; 

    incomes.forEach(income => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${income.date}</td>
            <td>${income.category}</td>
            <td>${income.value}</td>
            <td><button class="remove-button" onclick="removeIncome(this)">X</button></td>
        `;
        tbody.appendChild(tr);
        totalIncome += parseFloat(income.value);
        updateIncomeCategoryTotal(income.category, income.value); // Update category total when loading
    });

    localStorage.setItem('totalIncome', totalIncome);
    printIncomeTotals(); // Print totals after loading incomes
}

// Function to update income category total
function updateIncomeCategoryTotal(category, value) {
    let categoryTotals = JSON.parse(localStorage.getItem('categoryTotals')) || {};
    
    if (!categoryTotals[category]) {
        categoryTotals[category] = 0; // Initialize if category doesn't exist
    }
    
    categoryTotals[category] += parseFloat(value);
    localStorage.setItem('categoryTotals', JSON.stringify(categoryTotals));
}

// Function to remove an income
function removeIncome(button) {
    const row = button.closest("tr");
    const date = row.cells[0].textContent;
    const category = row.cells[1].textContent;
    const value = row.cells[2].textContent;

    row.remove();

    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes = incomes.filter(inc => !(inc.date === date && inc.category === category && inc.value === value));
    localStorage.setItem('incomes', JSON.stringify(incomes));

    totalIncome -= parseFloat(value);
    localStorage.setItem('totalIncome', totalIncome);

    // Update category total when an income is removed
    updateIncomeCategoryTotalOnRemove(category, value);
    printIncomeTotals(); // Print totals after removing an income
}

// Function to update income category total when removing an income
function updateIncomeCategoryTotalOnRemove(category, value) {
    let categoryTotals = JSON.parse(localStorage.getItem('categoryTotals')) || {};
    
    if (categoryTotals[category]) {
        categoryTotals[category] -= parseFloat(value);
        if (categoryTotals[category] < 0) {
            categoryTotals[category] = 0; // Prevent negative totals
        }
        localStorage.setItem('categoryTotals', JSON.stringify(categoryTotals));
    }
}
