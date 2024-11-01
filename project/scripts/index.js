// Navigation Functions
function homeTab() {
    window.location.href = 'index.html';
}

function expensesTab() {
    window.location.href = 'expenses.html';
}

function incomesTab() {
    window.location.href = 'incomes.html';
}

function settingsTab() {
    window.location.href = 'settings.html';
}

// Load data from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadIncomeCategories();
    loadIncomes();
    loadExpenses();
    updateFinancialData();
});

// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Display expenses or perform other operations as needed
    return expenses;
}

// Function to load incomes from local storage
function loadIncomes() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    // Display incomes or perform other operations as needed
    return incomes;
}

// Function to load income categories from local storage
function loadIncomeCategories() {
    const incomeCategories = JSON.parse(localStorage.getItem('incomeCategories')) || [];
    // Display income categories or perform other operations as needed
    return incomeCategories;
}

// Function to retrieve total expenses
function getTotalExpenses() {
    const expenses = loadExpenses();
    return expenses.reduce((total, expense) => total + parseFloat(expense.value), 0);
}

// Function to retrieve total incomes
function getTotalIncomes() {
    const incomes = loadIncomes();
    return incomes.reduce((total, income) => total + parseFloat(income.value), 0);
}

// Function to update financial data on the page
function updateFinancialData() {
    const totalExpenses = getTotalExpenses();
    const totalIncomes = getTotalIncomes();
    const budgetLeft = totalIncomes - totalExpenses;

    // Display the totals in the respective elements
    document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("totalIncomes").textContent = totalIncomes.toFixed(2);
    document.getElementById("budgetLeft").textContent = budgetLeft.toFixed(2);

    updateChart(totalExpenses, totalIncomes); // Update the chart with new data
}

// Function to create the chart
function updateChart(totalExpenses, totalIncomes) {
    const budgetLeftPercentage = totalIncomes ? ((totalIncomes - totalExpenses) / totalIncomes) * 100 : 0;

    // Update the percentage display
    const chartPercentageElement = document.getElementById('chart-percentage');
    chartPercentageElement.textContent = `${budgetLeftPercentage.toFixed(2)}%`;

    // Get the canvas context and create the chart
    const ctx = document.getElementById('chartContainer').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [totalExpenses, totalIncomes - totalExpenses],
                backgroundColor: ['#b4b4b4', '#34a853'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
