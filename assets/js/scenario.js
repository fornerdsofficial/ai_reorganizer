document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const generateScenariosBtn = document.getElementById('generate-scenarios');
    const loadingSpinner = document.getElementById('loading-spinner');
    const scenariosSection = document.getElementById('scenarios-section');
    const nextActions = document.getElementById('next-actions');
    const nextStepBtn = document.getElementById('next-step');
    const regenerateScenariosBtn = document.getElementById('regenerate-scenarios');
    const compareScenariosBtn = document.getElementById('compare-scenarios');
    const sortScenariosSelect = document.getElementById('sort-scenarios');
    
    // Scenario card actions
    const scenarioCards = document.querySelectorAll('.scenario-card');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const selectScenarioButtons = document.querySelectorAll('.select-scenario');
    
    // Modal elements
    const scenarioDetailModal = document.getElementById('scenario-detail-modal');
    const closeDetailModalBtn = document.getElementById('close-detail-modal');
    const selectFromDetailBtn = document.getElementById('select-from-detail');
    const exportDetailBtn = document.getElementById('export-detail');
    
    const comparisonModal = document.getElementById('comparison-modal');
    const closeComparisonModalBtn = document.getElementById('close-comparison-modal');
    const closeComparisonBtn = document.getElementById('close-comparison');
    const exportComparisonBtn = document.getElementById('export-comparison');
    
    // Variables to track state
    let selectedScenarioId = null;
    
    // Event Listeners
    generateScenariosBtn.addEventListener('click', generateScenarios);
    regenerateScenariosBtn.addEventListener('click', regenerateScenarios);
    compareScenariosBtn.addEventListener('click', compareScenarios);
    nextStepBtn.addEventListener('click', goToNextStep);
    sortScenariosSelect.addEventListener('change', sortScenarios);
    
    // Scenario card buttons
    viewDetailsButtons.forEach(button => {
      button.addEventListener('click', function() {
        const scenarioId = this.getAttribute('data-id');
        showScenarioDetails(scenarioId);
      });
    });
    
    selectScenarioButtons.forEach(button => {
      button.addEventListener('click', function() {
        const scenarioId = this.getAttribute('data-id');
        selectScenario(scenarioId);
      });
    });
    
    // Modal event listeners
    closeDetailModalBtn.addEventListener('click', () => {
      scenarioDetailModal.classList.remove('show');
    });
    
    selectFromDetailBtn.addEventListener('click', () => {
      const scenarioId = document.querySelector('.modal-title').innerText.split(' ')[1];
      selectScenario(scenarioId.charAt(0));
      scenarioDetailModal.classList.remove('show');
    });
    
    exportDetailBtn.addEventListener('click', () => {
      showNotification('시나리오 상세 정보가 다운로드되었습니다.', 'success');
    });
    
    closeComparisonModalBtn.addEventListener('click', () => {
      comparisonModal.classList.remove('show');
    });
    
    closeComparisonBtn.addEventListener('click', () => {
      comparisonModal.classList.remove('show');
    });
    
    exportComparisonBtn.addEventListener('click', () => {
      showNotification('비교 결과가 다운로드되었습니다.', 'success');
    });
    
    // Generate Scenarios function
    function generateScenarios() {
      // Show loading spinner
      loadingSpinner.style.display = 'flex';
      
      // Simulate API delay
      setTimeout(() => {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        
        // Show scenarios section and next actions
        scenariosSection.style.display = 'block';
        nextActions.style.display = 'flex';
        
        // Scroll to scenarios section
        scenariosSection.scrollIntoView({ behavior: 'smooth' });
      }, 2500);
    }
    
    // Regenerate Scenarios function
    function regenerateScenarios() {
      // Show loading spinner
      loadingSpinner.style.display = 'flex';
      
      // Hide scenarios section and next actions
      scenariosSection.style.display = 'none';
      nextActions.style.display = 'none';
      
      // Reset selected scenario
      selectedScenarioId = null;
      nextStepBtn.disabled = true;
      
      // Remove selected class from all cards
      scenarioCards.forEach(card => {
        card.classList.remove('selected');
      });
      
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Simulate API delay
      setTimeout(() => {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        
        // Show scenarios section and next actions
        scenariosSection.style.display = 'block';
        nextActions.style.display = 'flex';
        
        // Scroll to scenarios section
        scenariosSection.scrollIntoView({ behavior: 'smooth' });
      }, 2500);
    }
    
    // Compare Scenarios function
    function compareScenarios() {
      // Show comparison modal
      comparisonModal.classList.add('show');
      
      // Initialize radar chart for comparison
      initializeComparisonChart();
    }
    
    // Go to next step function
    function goToNextStep() {
      if (selectedScenarioId) {
        window.location.href = 'implementation.html';
      }
    }
    
    // Sort Scenarios function
    function sortScenarios() {
      const sortValue = sortScenariosSelect.value;
      const scenarioCardsContainer = document.querySelector('.scenario-cards');
      const cards = Array.from(scenarioCardsContainer.children);
      
      // Sort cards based on selected criteria
      cards.sort((a, b) => {
        if (sortValue === 'recommended') {
          // Put recommended card first
          const aHasRecommended = a.querySelector('.scenario-badge.recommended') !== null;
          const bHasRecommended = b.querySelector('.scenario-badge.recommended') !== null;
          return bHasRecommended - aHasRecommended;
        } else if (sortValue === 'efficiency') {
          // Sort by efficiency value
          const aValue = parseFloat(a.querySelector('.metric-value').innerText);
          const bValue = parseFloat(b.querySelector('.metric-value').innerText);
          return bValue - aValue;
        } else if (sortValue === 'cost') {
          // Sort by cost value (lower is better)
          const aValue = parseFloat(a.querySelectorAll('.metric-value')[1].innerText);
          const bValue = parseFloat(b.querySelectorAll('.metric-value')[1].innerText);
          return aValue - bValue;
        } else if (sortValue === 'risk') {
          // Sort by risk level (convert text to numeric value)
          const riskMap = { '낮음': 1, '중간': 2, '높음': 3 };
          const aRisk = riskMap[a.querySelectorAll('.metric-value')[2].innerText];
          const bRisk = riskMap[b.querySelectorAll('.metric-value')[2].innerText];
          return aRisk - bRisk;
        }
        return 0;
      });
      
      // Reorder cards in the DOM
      cards.forEach(card => {
        scenarioCardsContainer.appendChild(card);
      });
    }
    
    // Show Scenario Details function
    function showScenarioDetails(scenarioId) {
      // Update modal title based on scenario ID
      document.querySelector('.modal-title').innerText = `시나리오 ${String.fromCharCode(64 + parseInt(scenarioId))} 상세 정보`;
      
      // Show scenario detail modal
      scenarioDetailModal.classList.add('show');
    }
    
    // Select Scenario function
    function selectScenario(scenarioId) {
      // Update selected scenario ID
      selectedScenarioId = scenarioId;
      
      // Remove selected class from all cards
      scenarioCards.forEach(card => {
        card.classList.remove('selected');
      });
      
      // Add selected class to the chosen card
      const selectedCard = document.querySelector(`.scenario-card[data-id="${scenarioId}"]`);
      selectedCard.classList.add('selected');
      
      // Enable next step button
      nextStepBtn.disabled = false;
      
      // Show notification
      showNotification(`시나리오 ${String.fromCharCode(64 + parseInt(scenarioId))}가 선택되었습니다.`, 'success');
    }
    
    // Initialize Comparison Chart
    function initializeComparisonChart() {
      const ctx = document.getElementById('comparisonRadarChart').getContext('2d');
      
      // Destroy existing chart if it exists
      if (window.comparisonChart) {
        window.comparisonChart.destroy();
      }
      
      window.comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['효율성', '비용 효율', '변화 관리 용이성', '인력 배치 적합도', '의사결정 속도', '조직 간 협업'],
          datasets: [
            {
              label: '시나리오 A',
              data: [75, 80, 60, 70, 85, 65],
              borderColor: '#4c8c6a',
              backgroundColor: 'rgba(76, 140, 106, 0.2)',
            },
            {
              label: '시나리오 B',
              data: [65, 70, 85, 60, 60, 70],
              borderColor: '#f9c74f',
              backgroundColor: 'rgba(249, 199, 79, 0.2)',
            },
            {
              label: '시나리오 C',
              data: [90, 85, 40, 75, 90, 60],
              borderColor: '#d64545',
              backgroundColor: 'rgba(214, 69, 69, 0.2)',
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
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      });
    }
    
    // Notification function (same as in other JS files)
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