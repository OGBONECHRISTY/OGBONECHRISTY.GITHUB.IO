// Visualizations - Create interactive charts using Chart.js

document.addEventListener('DOMContentLoaded', () => {
  // Sales Trend Chart
  const salesChartCanvas = document.getElementById('salesChart');
  if(salesChartCanvas) {
    const salesCtx = salesChartCanvas.getContext('2d');
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Sales ($)',
          data: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 68000, 74000, 81000, 85000, 92000],
          borderColor: '#1a237e',
          backgroundColor: 'rgba(26, 35, 126, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#ff6f00',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {size: 12, weight: 'bold'},
              color: '#0b1724',
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {size: 13, weight: 'bold'},
            bodyFont: {size: 12},
            callbacks: {
              label: (context) => '$' + context.parsed.y.toLocaleString()
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => '$' + (value/1000).toFixed(0) + 'k',
              color: '#6b7280'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {color: '#6b7280'},
            grid: {display: false}
          }
        }
      }
    });
  }

  // Category Performance Chart
  const categoryChartCanvas = document.getElementById('categoryChart');
  if(categoryChartCanvas) {
    const categoryCtx = categoryChartCanvas.getContext('2d');
    new Chart(categoryCtx, {
      type: 'bar',
      data: {
        labels: ['Analytics', 'Automation', 'Visualization', 'Reporting', 'Optimization'],
        datasets: [{
          label: 'Performance Score',
          data: [92, 87, 94, 89, 86],
          backgroundColor: [
            '#1a237e',
            '#0277bd',
            '#ff6f00',
            '#ffd6e0',
            '#00796b'
          ],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        response: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {display: false},
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => context.parsed.x + '/100'
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => value + '%',
              color: '#6b7280'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          y: {
            ticks: {color: '#0b1724', font: {weight: 'bold'}},
            grid: {display: false}
          }
        }
      }
    });
  }

  // Customer Satisfaction Chart
  const satisfactionChartCanvas = document.getElementById('satisfactionChart');
  if(satisfactionChartCanvas) {
    const satisfactionCtx = satisfactionChartCanvas.getContext('2d');
    new Chart(satisfactionCtx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Customer Satisfaction (%)',
            data: [78, 82, 85, 89],
            borderColor: '#0277bd',
            backgroundColor: 'rgba(2, 119, 189, 0.1)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#0277bd',
            pointBorderColor: '#fff',
            pointRadius: 6,
            borderWidth: 3
          },
          {
            label: 'Retention Rate (%)',
            data: [72, 76, 80, 86],
            borderColor: '#ff6f00',
            backgroundColor: 'rgba(255, 111, 0, 0.05)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#ff6f00',
            pointBorderColor: '#fff',
            pointRadius: 6,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {size: 12, weight: 'bold'},
              color: '#0b1724',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => context.dataset.label + ': ' + context.parsed.y + '%'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => value + '%',
              color: '#6b7280'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {color: '#6b7280'},
            grid: {display: false}
          }
        }
      }
    });
  }

  // Revenue Distribution Pie Chart
  const revenueChartCanvas = document.getElementById('revenueChart');
  if(revenueChartCanvas) {
    const revenueCtx = revenueChartCanvas.getContext('2d');
    new Chart(revenueCtx, {
      type: 'doughnut',
      data: {
        labels: ['Data Analysis', 'Reporting', 'Visualization', 'Automation', 'Consulting'],
        datasets: [{
          data: [28, 22, 25, 15, 10],
          backgroundColor: [
            '#1a237e',
            '#0277bd',
            '#ff6f00',
            '#ffd6e0',
            '#00796b'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {size: 12, weight: 'bold'},
              color: '#0b1724',
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => context.label + ': ' + context.parsed + '%'
            }
          }
        }
      }
    });
  }

  // Update chart colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    // Charts will automatically update their text colors based on CSS
    // For now, reload charts on theme change if needed
    setTimeout(() => {
      window.dispatchEvent(new Event('chartThemeChange'));
    }, 100);
  });
});
