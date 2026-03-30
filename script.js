const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

let barChart = null;

function formatCurrency(value) {
  return parseFloat(value || 0).toFixed(2);
}

function getInputValue(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function updateTotalsAndNet() {
  let totalIncome = 0;
  let totalExpense = 0;

  MONTHS.forEach((_, i) => {
    const income = getInputValue(`income-${i}`);
    const expense = getInputValue(`expense-${i}`);
    const net = income - expense;

    const netCell = document.getElementById(`net-${i}`);
    netCell.textContent = formatCurrency(net);
    netCell.className = net >= 0 ? 'text-success' : 'text-danger';

    totalIncome += income;
    totalExpense += expense;
  });

  const totalNet = totalIncome - totalExpense;
  document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
  document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);

  const totalNetEl = document.getElementById('totalNet');
  totalNetEl.textContent = formatCurrency(totalNet);
  totalNetEl.className = totalNet >= 0 ? 'text-success' : 'text-danger';
}

function buildChart() {
  const incomes = MONTHS.map((_, i) => getInputValue(`income-${i}`));
  const expenses = MONTHS.map((_, i) => getInputValue(`expense-${i}`));
  const labels = MONTHS.map(m => m.substring(0, 3));

  if (barChart) {
    barChart.data.datasets[0].data = incomes;
    barChart.data.datasets[1].data = expenses;
    barChart.update();
    return;
  }

  const ctx = document.getElementById('barChart').getContext('2d');
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomes,
          backgroundColor: 'rgba(25, 135, 84, 0.75)',
          borderColor: 'rgba(25, 135, 84, 1)',
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: expenses,
          backgroundColor: 'rgba(220, 53, 69, 0.75)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => ` £${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `£${value}`
          }
        }
      }
    }
  });
}

function randBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function buildTable() {
  const tbody = document.getElementById('monthTableBody');
  tbody.innerHTML = '';

  MONTHS.forEach((month, i) => {
    const defaultIncome = randBetween(50, 1000);
    const defaultExpense = randBetween(50, 1000);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-semibold">${month}</td>
      <td>
        <input
          type="number"
          id="income-${i}"
          class="form-control input-income"
          value="${defaultIncome}"
          min="0"
          step="0.01"
        />
      </td>
      <td>
        <input
          type="number"
          id="expense-${i}"
          class="form-control input-expense"
          value="${defaultExpense}"
          min="0"
          step="0.01"
        />
      </td>
      <td id="net-${i}">0.00</td>
    `;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('input', updateTotalsAndNet);
  updateTotalsAndNet();
}

window.addEventListener('DOMContentLoaded', () => {
  buildTable();

  // Build/update chart each time the Chart tab becomes visible
  const chartTabBtn = document.getElementById('chart-tab');
  chartTabBtn.addEventListener('click', () => {
    // Use setTimeout to allow the tab pane to become visible
    // before Chart.js measures the canvas dimensions
    setTimeout(buildChart, 50);
  });

  // Download chart as PNG
  document.getElementById('downloadChart').addEventListener('click', () => {
    if (!barChart) {
      alert('Please open the Chart tab first to generate the chart.');
      return;
    }
    const canvas = document.getElementById('barChart');
    const link = document.createElement('a');
    link.download = 'bucks2bar-chart.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});