// Function to HomeTab
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

// Load categories from local storage
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
});

// Function to add a expense category
function addExpenseCategory() {
    const expenseInput = document.getElementById("expenseName");
    const expenseValue = expenseInput.value.trim();

    if (expenseValue) {
        const expenseList = document.getElementById("expensesList");
        const li = createListItem(expenseValue, 'expense');
        expenseList.appendChild(li);
        saveCategory(expenseValue, 'expense');
        expenseInput.value = '';
    }
}

// Function to add a income category
function addIncomeCategory() {
    const incomeInput = document.getElementById("incomeName");
    const incomeValue = incomeInput.value.trim();

    if (incomeValue) {
        const incomeList = document.getElementById("incomesList");
        const li = createListItem(incomeValue, 'income');
        incomeList.appendChild(li);
        saveCategory(incomeValue, 'income');
        incomeInput.value = ''
    }
}

// Function to create a list item with a remove button
function createListItem(value, type) {
    const li = document.createElement("li");
    li.textContent = value;

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.className = "remove-button";
    removeButton.onclick = () => {
        li.remove();
        removeCategoryFromStorage(value, type);
    };

    li.appendChild(removeButton);
    return li;
}

// Function to save categories
function saveCategory(value, type) {
    const categories = JSON.parse(localStorage.getItem(`${type}Categories`)) || [];
    categories.push(value);
    localStorage.setItem(`${type}Categories`, JSON.stringify(categories));
}

// Function to remove a category
function removeCategoryFromStorage(value, type) {
    let categories = JSON.parse(localStorage.getItem(`${type}Categories`)) || [];
    categories = categories.filter(category => category !== value);
    localStorage.setItem(`${type}Categories`, JSON.stringify(categories));
}

// Function to load categories
function loadCategories() {
    const expenses = JSON.parse(localStorage.getItem('expenseCategories')) || [];
    const incomes = JSON.parse(localStorage.getItem('incomeCategories')) || [];

    expenses.forEach(expense => {
        const li = createListItem(expense, 'expense');
        document.getElementById("expensesList").appendChild(li);
    });

    incomes.forEach(income => {
        const li = createListItem(income, 'income');
        document.getElementById("incomesList").appendChild(li);
    });
}

function showMobileItems() {
    const mobileItems = document.getElementById('mobileItems');

    if (mobileItems.classList.contains('hidden')) {
        mobileItems.classList.remove('hidden');
    } else {
        mobileItems.classList.add('hidden');
    }
}