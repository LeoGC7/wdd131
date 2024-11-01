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

// Total expenses initial value
let totalExpenses = 0;

// Load categories and expenses from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadExpenses();
});

// Function to load categories into the select dropdown
function loadCategories() {
    const expenseSelect = document.getElementById("expense-select");
    const categories = JSON.parse(localStorage.getItem('expenseCategories')) || [];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        expenseSelect.appendChild(option);
    });
}

// Function to add an expense
function addExpense() {
    const dateInput = document.getElementById("date").value;
    const categorySelect = document.getElementById("expense-select").value;
    const valueInput = document.getElementById("value").value.trim();

    if (dateInput && categorySelect && valueInput) {
        const tbody = document.querySelector(".expense-table tbody");
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${dateInput}</td>
            <td>${categorySelect}</td>
            <td>${valueInput}</td>
            <td><button class="remove-button" onclick="removeExpense(this)">X</button></td>
        `;

        tbody.appendChild(tr);
        saveExpense(dateInput, categorySelect, valueInput);
        updateTotalExpenses(valueInput);
        
        document.getElementById("date").value = '';
        document.getElementById("value").value = '';
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to update total expenses
function updateTotalExpenses(value) {
    totalExpenses += parseFloat(value);
    localStorage.setItem('totalExpenses', totalExpenses);
    console.log(`Total Expenses: ${totalExpenses}`);
}

// Function to save the expense to local storage
function saveExpense(date, category, value) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ date, category, value });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const tbody = document.querySelector(".expense-table tbody");
    
    totalExpenses = 0; 

    expenses.forEach(expense => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.value}</td>
            <td><button class="remove-button" onclick="removeExpense(this)">X</button></td>
        `;
        tbody.appendChild(tr);
        totalExpenses += parseFloat(expense.value);
    });

    localStorage.setItem('totalExpenses', totalExpenses)
    console.log(`Total Expenses: ${totalExpenses}`);
}

// Function to remove an expense
function removeExpense(button) {
    const row = button.closest("tr");
    const date = row.cells[0].textContent;
    const category = row.cells[1].textContent;
    const value = row.cells[2].textContent;

    row.remove();

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(exp => !(exp.date === date && exp.category === category && exp.value === value));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    totalExpenses -= parseFloat(value);
    localStorage.setItem('totalExpenses', totalExpenses);
    console.log(`Total Expenses: ${totalExpenses}`);
}
