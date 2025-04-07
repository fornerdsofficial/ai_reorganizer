document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Show selected tab content
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
    
    // Navigation buttons
    const nextStepBtn = document.getElementById('next-step');
    const exportAnalysisBtn = document.getElementById('export-analysis');
    
    nextStepBtn.addEventListener('click', () => {
      window.location.href = 'scenario.html';
    });
    
    exportAnalysisBtn.addEventListener('click', () => {
      showNotification('분석 결과가 다운로드되었습니다.', 'success');
    });
    
    // Initialize charts
    initializeEfficiencyChart();
    initializeSkillRadarChart();
    initializeJobFitChart();
    initializeCostCharts();
    initializeTalentGapChart();
    initializeCollaborationNetwork();
    
    // Function to initialize the Efficiency Chart
    function initializeEfficiencyChart() {
      const ctx = document.getElementById('efficiencyChart').getContext('2d');
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
          datasets: [
            {
              label: '조직 효율성',
              data: [52, 55, 59, 62, 65, 68],
              borderColor: '#4c8c6a',
              backgroundColor: 'rgba(76, 140, 106, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: '산업 평균',
              data: [58, 59, 60, 60, 61, 62],
              borderColor: '#b0b0b0',
              borderDash: [5, 5],
              tension: 0.3,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              min: 40,
              max: 80,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          }
        }
      });
    }
    
    // Function to initialize the Skill Radar Chart
    function initializeSkillRadarChart() {
      const ctx = document.getElementById('skillRadarChart').getContext('2d');
      
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['기획', '개발', '디자인', '데이터분석', '마케팅', '영업', '관리'],
          datasets: [
            {
              label: '현재 역량',
              data: [75, 82, 68, 62, 78, 80, 74],
              borderColor: '#4c8c6a',
              backgroundColor: 'rgba(76, 140, 106, 0.2)',
            },
            {
              label: '목표 역량',
              data: [80, 90, 75, 85, 80, 80, 78],
              borderColor: '#f9c74f',
              backgroundColor: 'rgba(249, 199, 79, 0.2)',
              borderDash: [5, 5],
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 50,
              suggestedMax: 100
            }
          }
        }
      });
    }
    
    // Function to initialize the Job Fit Chart
    function initializeJobFitChart() {
      const ctx = document.getElementById('jobFitChart').getContext('2d');
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['매우 적합 (90-100%)', '적합 (75-90%)', '보통 (60-75%)', '약간 부적합 (40-60%)', '부적합 (0-40%)'],
          datasets: [
            {
              data: [25, 40, 20, 10, 5],
              backgroundColor: [
                '#4c8c6a',  // Primary
                '#6aa989',  // Primary Light
                '#f9c74f',  // Warning
                '#f8961e',  // Warning Darker
                '#d64545',  // Danger
              ],
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });
    }
    
    // Function to initialize the Cost Charts
    function initializeCostCharts() {
      // Cost by Department
      const deptCtx = document.getElementById('costByDepartmentChart').getContext('2d');
      new Chart(deptCtx, {
        type: 'bar',
        data: {
          labels: ['개발팀', '마케팅팀', '영업팀', '인사팀', '재무팀'],
          datasets: [
            {
              label: '인건비 (백만원)',
              data: [320, 180, 240, 120, 140],
              backgroundColor: '#4c8c6a',
            },
            {
              label: '운영비 (백만원)',
              data: [80, 120, 60, 30, 40],
              backgroundColor: '#f9c74f',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      });
      
      // Cost by Position
      const posCtx = document.getElementById('costByPositionChart').getContext('2d');
      new Chart(posCtx, {
        type: 'bar',
        data: {
          labels: ['사원', '대리', '과장', '차장', '부장'],
          datasets: [
            {
              label: '인원수',
              data: [40, 30, 20, 15, 10],
              yAxisID: 'y1',
              backgroundColor: '#f9c74f',
              type: 'line',
              order: 0
            },
            {
              label: '인건비 (백만원)',
              data: [160, 180, 180, 180, 200],
              yAxisID: 'y',
              backgroundColor: '#4c8c6a',
              order: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          },
          scales: {
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: '인건비 (백만원)'
              }
            },
            y1: {
              type: 'linear',
              position: 'right',
              grid: {
                drawOnChartArea: false
              },
              title: {
                display: true,
                text: '인원수'
              }
            }
          }
        }
      });
      
      // Cost Trend
      const trendCtx = document.getElementById('costTrendChart').getContext('2d');
      new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
          datasets: [
            {
              label: '실제 비용',
              data: [720, 750, 780, 800, 830, 850],
              borderColor: '#4c8c6a',
              backgroundColor: 'rgba(76, 140, 106, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: '예상 비용',
              data: [720, 760, 800, 840, 880, 920],
              borderColor: '#f9c74f',
              borderDash: [5, 5],
              tension: 0.3
            },
            {
              label: '최적화 비용',
              data: [720, 740, 760, 750, 740, 730],
              borderColor: '#d64545',
              borderDash: [3, 3],
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          }
        }
      });
    }
    
    // Function to initialize the Talent Gap Chart
    function initializeTalentGapChart() {
      const ctx = document.getElementById('talentGapChart').getContext('2d');
      
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['개발(프론트엔드)', '개발(백엔드)', '데이터 분석', '마케팅', '영업'],
          datasets: [
            {
              label: '현재 인력',
              data: [8, 10, 4, 7, 12],
              backgroundColor: '#4c8c6a',
            },
            {
              label: '필요 인력',
              data: [12, 8, 10, 5, 15],
              backgroundColor: '#f9c74f',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
    
    // Function to initialize the Collaboration Network
    function initializeCollaborationNetwork() {
      const network = document.getElementById('collaborationNetwork');
      
      // In a real implementation, this would be a D3.js or similar visualization
      // For this mockup, we'll just create a placeholder with a message
      
      network.innerHTML = `
        <div class="network-placeholder">
          <div class="network-message">
            <i class="fas fa-project-diagram"></i>
            <p>협업 네트워크 시각화가 여기에 표시됩니다.</p>
            <p class="network-submessage">실제 구현 시 D3.js 또는 유사한 라이브러리를 사용하여 조직 내 협업 패턴을 시각화합니다.</p>
          </div>
        </div>
      `;
      
      // Add some basic styling to the placeholder
      const style = document.createElement('style');
      style.textContent = `
        .network-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .network-message {
          text-align: center;
          color: var(--gray-medium);
          padding: 40px;
        }
        
        .network-message i {
          font-size: 48px;
          margin-bottom: 20px;
          color: var(--primary-color);
        }
        
        .network-message p {
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .network-submessage {
          font-size: 14px !important;
          opacity: 0.7;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Notification function (same as in data-collection.js)
    function showNotification(message, type = 'info') {
      // Check if a notification container exists, create if not
      let notificationContainer = document.querySelector('.notification-container');
      if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles to the notification container
        Object.assign(notificationContainer.style, {
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: '9999',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        });
      }
      
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      
      // Set notification icon based on type
      let icon = 'info-circle';
      if (type === 'success') icon = 'check-circle';
      if (type === 'error') icon = 'times-circle';
      if (type === 'warning') icon = 'exclamation-triangle';
      
      notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      // Add styles to the notification
      Object.assign(notification.style, {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
        transition: 'all 0.3s ease',
        opacity: '0',
        transform: 'translateX(50px)',
        borderLeft: '3px solid #4c8c6a'
    });
    
    // Style based on type
    if (type === 'error') {
      notification.style.borderLeftColor = '#d64545';
    } else if (type === 'warning') {
      notification.style.borderLeftColor = '#f9c74f';
    } else if (type === 'success') {
      notification.style.borderLeftColor = '#3d9970';
    }
    
    // Style notification icon
    const notificationIcon = notification.querySelector('i:first-child');
    Object.assign(notificationIcon.style, {
      marginRight: '10px',
      fontSize: '20px',
      color: notification.style.borderLeftColor
    });
    
    // Style close button
    const closeButton = notification.querySelector('.notification-close');
    Object.assign(closeButton.style, {
      background: 'none',
      border: 'none',
      marginLeft: '20px',
      cursor: 'pointer',
      color: '#999',
      padding: '0',
      fontSize: '14px'
    });
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button event
    closeButton.addEventListener('click', () => {
      closeNotification(notification);
    });
    
    // Auto close after 4 seconds
    setTimeout(() => {
      closeNotification(notification);
    }, 4000);
  }
  
  function closeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
});

