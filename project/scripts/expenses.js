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
    loadExpenseCategories();
    loadExpensesData();
});

// Function to load categories into the select dropdown
function loadExpenseCategories() {
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
        saveExpenseData(dateInput, categorySelect, valueInput);
        updateTotalExpenses(valueInput);
        updateExpenseCategoryTotal(categorySelect, valueInput); // Update category total
        
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
function saveExpenseData(date, category, value) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ date, category, value });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpensesData() {
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
        updateExpenseCategoryTotal(expense.category, expense.value); // Update category total when loading
    });

    localStorage.setItem('totalExpenses', totalExpenses);
    printExpenseTotals(); // Print totals after loading expenses
}

// Function to update expense category total
function updateExpenseCategoryTotal(category, value) {
    let categoryTotals = JSON.parse(localStorage.getItem('categoryTotals')) || {};
    
    if (!categoryTotals[category]) {
        categoryTotals[category] = 0; // Initialize if category doesn't exist
    }
    
    categoryTotals[category] += parseFloat(value);
    localStorage.setItem('categoryTotals', JSON.stringify(categoryTotals));
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

    // Update category total when an expense is removed
    updateExpenseCategoryTotalOnRemove(category, value);
    printExpenseTotals(); // Print totals after removing an expense
}

// Function to update expense category total when removing an expense
function updateExpenseCategoryTotalOnRemove(category, value) {
    let categoryTotals = JSON.parse(localStorage.getItem('categoryTotals')) || {};
    
    if (categoryTotals[category]) {
        categoryTotals[category] -= parseFloat(value);
        if (categoryTotals[category] < 0) {
            categoryTotals[category] = 0; // Prevent negative totals
        }
        localStorage.setItem('categoryTotals', JSON.stringify(categoryTotals));
    }
}