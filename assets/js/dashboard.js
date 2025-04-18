document.addEventListener('DOMContentLoaded', function() {
    // 부서별 인원 차트
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');
    const departmentChart = new Chart(departmentCtx, {
      type: 'bar',
      data: {
        labels: ['경영기획', '인사', '개발', '마케팅', '영업', '재무', '연구', '지원'],
        datasets: [{
          label: '인원 수',
          data: [45, 32, 78, 53, 67, 25, 15, 10],
          backgroundColor: [
            'rgba(74, 159, 123, 0.7)',
            'rgba(74, 159, 123, 0.6)',
            'rgba(74, 159, 123, 0.8)',
            'rgba(74, 159, 123, 0.65)',
            'rgba(74, 159, 123, 0.75)',
            'rgba(74, 159, 123, 0.55)',
            'rgba(74, 159, 123, 0.5)',
            'rgba(74, 159, 123, 0.45)'
          ],
          borderColor: [
            'rgba(74, 159, 123, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#343a40',
            bodyColor: '#343a40',
            borderColor: 'rgba(74, 159, 123, 0.5)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `인원 수: ${context.raw}명`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return value + '명';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  
    // 업무량 추이 차트
    const workloadCtx = document.getElementById('workloadChart').getContext('2d');
    const workloadChart = new Chart(workloadCtx, {
      type: 'line',
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
          {
            label: '전체 업무량',
            data: [68, 72, 78, 83, 85, 87],
            borderColor: 'rgba(74, 159, 123, 1)',
            backgroundColor: 'rgba(74, 159, 123, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: '개발팀',
            data: [65, 78, 80, 82, 90, 95],
            borderColor: 'rgba(23, 162, 184, 1)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
          },
          {
            label: '마케팅팀',
            data: [70, 75, 72, 78, 82, 85],
            borderColor: 'rgba(255, 193, 7, 1)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#343a40',
            bodyColor: '#343a40',
            borderColor: 'rgba(74, 159, 123, 0.5)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  
    // 알림 및 활동 아이템에 호버 효과
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--gray-100)';
        this.style.cursor = 'pointer';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
        this.style.cursor = '';
      });
    });
  
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--gray-100)';
        this.style.cursor = 'pointer';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
        this.style.cursor = '';
      });
    });
  
    // 시뮬레이션 아이템에 호버 효과
    const simulationItems = document.querySelectorAll('.simulation-item');
    simulationItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--gray-100)';
        this.style.cursor = 'pointer';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
        this.style.cursor = '';
      });
    });
  
    // 사이드바 토글 (모바일용)
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar.style.width === '240px' || sidebar.style.width === '') {
          sidebar.style.width = '0';
          mainContent.style.marginLeft = '0';
        } else {
          sidebar.style.width = '240px';
          mainContent.style.marginLeft = '240px';
        }
      });
    }
  
    // 반응형을 위한 윈도우 리사이즈 이벤트
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        sidebar.style.width = '0';
        mainContent.style.marginLeft = '0';
      } else {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        sidebar.style.width = '240px';
        mainContent.style.marginLeft = '240px';
      }
    });
  });