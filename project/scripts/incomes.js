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

// Load categories and incomes from local storage when the apge is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadIncomeCategories();
    loadIncomes();
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
        saveIncome(dateInput, categorySelect, valueInput);
        updateTotalIncome(valueInput);
        
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
    console.log(`Total Income: ${totalIncome}`);
}

// Function to save the income to local storage
function saveIncome(date, category, value) {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push({ date, category, value });
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Function to load incomes from local storage
function loadIncomes() {
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
    });

    localStorage.setItem('totalIncome', totalIncome)
    console.log(`Total Income: ${totalIncome}`);
}

// Function to remove an income
function removeIncome(button) {
    const row = button.closest("tr");
    const date = row.cells[0].textContent;
    const category = row.cells[1].textContent;
    const value = row.cells[2].textContent;

    // Remove from the table
    row.remove();

    // Remove from local storage
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes = incomes.filter(inc => !(inc.date === date && inc.category === category && inc.value === value));
    localStorage.setItem('incomes', JSON.stringify(incomes));
    
    // Update total income after removal
    totalIncome -= parseFloat(value); // Subtract the removed income from total
    localStorage.setItem('totalIncome', totalIncome); // Update total in local storage
    console.log(`Total Income: ${totalIncome}`); // Print updated total to console
}
