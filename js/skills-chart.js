// Skills Chart - Radar chart using Chart.js

document.addEventListener('DOMContentLoaded', () => {
  const skillsRadarCanvas = document.getElementById('skillsRadar');
  
  if(!skillsRadarCanvas) return;

  // Get the canvas context
  const ctx = skillsRadarCanvas.getContext('2d');

  // Skills data
  const skillsData = {
    labels: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Power BI'],
    datasets: [
      {
        label: 'Technical Skills',
        data: [90, 85, 88, 84, 78],
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.15)',
        pointBackgroundColor: '#1a237e',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#0277bd',
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2
      },
      {
        label: 'Mastery Level',
        data: [85, 80, 85, 82, 75],
        borderColor: '#0277bd',
        backgroundColor: 'rgba(2, 119, 189, 0.1)',
        pointBackgroundColor: '#0277bd',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#ff6f00',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  // Create radar chart
  const radarChart = new Chart(ctx, {
    type: 'radar',
    data: skillsData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: {
              size: 13,
              family: "'Open Sans', sans-serif",
              weight: 600
            },
            color: '#0b1724',
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.r + '%';
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 20,
            font: {
              size: 11,
              family: "'Open Sans', sans-serif"
            },
            color: '#9aa6b2',
            backdropColor: 'transparent'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          pointLabels: {
            font: {
              size: 12,
              weight: 600,
              family: "'Open Sans', sans-serif"
            },
            color: '#0b1724',
            padding: 12
          }
        }
      }
    }
  });

  // Update chart theme on theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    
    if(theme === 'dark') {
      radarChart.options.plugins.legend.labels.color = '#e6eef8';
      radarChart.options.scales.r.ticks.color = '#9aa6b2';
      radarChart.options.scales.r.pointLabels.color = '#e6eef8';
    } else {
      radarChart.options.plugins.legend.labels.color = '#0b1724';
      radarChart.options.scales.r.ticks.color = '#9aa6b2';
      radarChart.options.scales.r.pointLabels.color = '#0b1724';
    }
    
    radarChart.update();
  });
});
