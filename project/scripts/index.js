// Function to Home Tab
function homeTab() {
    window.location.href = 'index.html'
}

// Function to Expenses Tab
function expensesTab() {
    window.location.href = 'expenses.html'
}

// Function to Income Tab
function incomesTab() {
    window.location.href = 'incomes.html'
}

// Function to create the chart
function updateChart(totalExpenses, totalIncomes) {
    const budgetLeftPercentage = totalIncomes ? ((totalIncomes - totalExpenses) / totalIncomes) * 100 : 0;
    const chartPercentageElement = document.getElementById('chart-percentage');
    chartPercentageElement.textContent = `${budgetLeftPercentage.toFixed(2)}%`;

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

// // Function to calculate totals
// function updateFinancialData() {
//     const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
//     const totalIncomes = incomes.reduce((acc, curr) => acc + curr, 0);
//     const budgetLeft = totalIncomes - totalExpenses;

//     // Update the DOM elements with the calculated values
//     document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
//     document.getElementById('totalIncomes').textContent = totalIncomes.toFixed(2);
//     document.getElementById('budgetLeft').textContent = budgetLeft.toFixed(2);

//     // Update the chart with the new data
//     updateChart(totalExpenses, totalIncomes);
// }

// // Call the function to initialize the data on page load
// document.addEventListener('DOMContentLoaded', updateFinancialData);
// console.log(`Total Expenses: $${expenses.toFixed(2)}`);