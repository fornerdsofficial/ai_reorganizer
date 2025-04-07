document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const changeScenarioBtn = document.getElementById('change-scenario');
    const exportTimelineBtn = document.getElementById('export-timeline');
    const editTimelineBtn = document.getElementById('edit-timeline');
    const addTaskBtn = document.getElementById('add-task');
    const saveAddTaskBtn = document.getElementById('save-add-task');
    const cancelAddTaskBtn = document.getElementById('cancel-add-task');
    const closeAddTaskModalBtn = document.getElementById('close-add-task-modal');
    const addTaskModal = document.getElementById('add-task-modal');
    const addDocumentBtn = document.getElementById('add-document');
    const savePlanBtn = document.getElementById('save-plan');
    const finalizePlanBtn = document.getElementById('finalize-plan');
    
    // View Options
    const viewOptions = document.querySelectorAll('.view-option');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    // Event Listeners
    changeScenarioBtn.addEventListener('click', () => {
      window.location.href = 'scenario.html';
    });
    
    exportTimelineBtn.addEventListener('click', () => {
      showNotification('일정 계획이 다운로드되었습니다.', 'success');
    });
    
    editTimelineBtn.addEventListener('click', () => {
      showNotification('일정 계획 수정 기능은 아직 개발 중입니다.', 'info');
    });
    
    addTaskBtn.addEventListener('click', () => {
      addTaskModal.classList.add('show');
    });
    
    closeAddTaskModalBtn.addEventListener('click', () => {
      addTaskModal.classList.remove('show');
    });
    
    cancelAddTaskBtn.addEventListener('click', () => {
      addTaskModal.classList.remove('show');
    });
    
    saveAddTaskBtn.addEventListener('click', () => {
      addNewTask();
      addTaskModal.classList.remove('show');
    });
    
    addDocumentBtn.addEventListener('click', () => {
      showNotification('문서 추가 기능은 아직 개발 중입니다.', 'info');
    });
    
    savePlanBtn.addEventListener('click', () => {
      showNotification('실행 계획이 저장되었습니다.', 'success');
    });
    
    finalizePlanBtn.addEventListener('click', () => {
      showConfirmDialog('실행 계획을 확정하시겠습니까?', () => {
        showNotification('실행 계획이 확정되었습니다.', 'success');
      });
    });
    
    // Timeline View Options
    viewOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove active class from all options
        viewOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update timeline view
        updateTimelineView(option.getAttribute('data-view'));
      });
    });
    
    // Zoom Controls
    zoomInBtn.addEventListener('click', () => {
      zoomTimeline('in');
    });
    
    zoomOutBtn.addEventListener('click', () => {
      zoomTimeline('out');
    });
    
    // Task Edit and Delete Buttons
    document.querySelectorAll('.task-actions .btn-icon').forEach(button => {
      button.addEventListener('click', function() {
        const action = this.getAttribute('title');
        const taskItem = this.closest('.task-item');
        const taskTitle = taskItem.querySelector('.task-title').innerText;
        
        if (action === '수정') {
          showNotification(`'${taskTitle}' 수정 기능은 아직 개발 중입니다.`, 'info');
        } else if (action === '삭제') {
          showConfirmDialog(`'${taskTitle}' 작업을 삭제하시겠습니까?`, () => {
            taskItem.remove();
            showNotification(`'${taskTitle}' 작업이 삭제되었습니다.`, 'success');
          });
        }
      });
    });
    
    // Document Download Buttons
    document.querySelectorAll('.document-item .btn-icon').forEach(button => {
      button.addEventListener('click', function() {
        const documentName = this.previousElementSibling.innerText;
        showNotification(`'${documentName}' 파일이 다운로드되었습니다.`, 'success');
      });
    });
    
    // Assignee Dropdown
    const assigneeInput = document.querySelector('.assignee-dropdown input');
    const assigneeDropdownContent = document.querySelector('.assignee-dropdown-content');
    const assigneeOptions = document.querySelectorAll('.assignee-option');
    const selectedAssignees = document.getElementById('selected-assignees');
    
    assigneeInput.addEventListener('focus', () => {
      assigneeDropdownContent.classList.add('show');
    });
    
    assigneeInput.addEventListener('blur', () => {
      setTimeout(() => {
        assigneeDropdownContent.classList.remove('show');
      }, 200);
    });
    
    assigneeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const img = option.querySelector('img').cloneNode(true);
        const name = option.querySelector('span').innerText;
        
        // Check if assignee is already selected
        if (!document.querySelector(`.selected-assignee[data-name="${name}"]`)) {
          addAssignee(img, name);
        }
        
        assigneeInput.value = '';
        assigneeDropdownContent.classList.remove('show');
      });
    });
    
    // Functions
    function updateTimelineView(view) {
      // In a real implementation, this would update the timeline chart
      // For this mockup, we'll just show a notification
      showNotification(`일정이 ${view === 'months' ? '월별' : view === 'weeks' ? '주별' : '일별'} 보기로 변경되었습니다.`, 'info');
    }
    
    function zoomTimeline(direction) {
      // In a real implementation, this would zoom the timeline in or out
      // For this mockup, we'll just show a notification
      showNotification(`일정이 ${direction === 'in' ? '확대' : '축소'}되었습니다.`, 'info');
    }
    
    function addNewTask() {
      // Get form values
      const title = document.querySelector('#add-task-form .form-control').value || '새 작업';
      
      // Create new task element
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      taskItem.innerHTML = `
        <div class="task-status not-started">
          <i class="fas fa-clock"></i>
        </div>
        <div class="task-details">
          <h3 class="task-title">${title}</h3>
          <div class="task-meta">
            <span class="task-phase">계획 및 준비</span>
            <span class="task-deadline">마감: ${new Date().toISOString().split('T')[0]}</span>
          </div>
          <div class="task-description">
            <p>새롭게 추가된 작업입니다.</p>
          </div>
          <div class="task-footer">
            <div class="task-assignees">
              <div class="assignee-avatar" title="홍길동">홍</div>
            </div>
            <div class="task-progress">
              <div class="progress-label">0%</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 0%;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-icon" title="수정">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon" title="삭제">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      
      // Add event listeners to new task buttons
      const editButton = taskItem.querySelector('.btn-icon[title="수정"]');
      const deleteButton = taskItem.querySelector('.btn-icon[title="삭제"]');
      
      editButton.addEventListener('click', () => {
        showNotification(`'${title}' 수정 기능은 아직 개발 중입니다.`, 'info');
      });
      
      deleteButton.addEventListener('click', () => {
        showConfirmDialog(`'${title}' 작업을 삭제하시겠습니까?`, () => {
          taskItem.remove();
          showNotification(`'${title}' 작업이 삭제되었습니다.`, 'success');
        });
      });
      
      // Add task to the container
      document.querySelector('.tasks-container').appendChild(taskItem);
      
      // Show success notification
      showNotification('새 작업이 추가되었습니다.', 'success');
    }
    
    function addAssignee(img, name) {
      const assigneeElement = document.createElement('div');
      assigneeElement.className = 'selected-assignee';
      assigneeElement.setAttribute('data-name', name);
      
      assigneeElement.innerHTML = `
        ${img.outerHTML}
        <span>${name}</span>
        <button type="button">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      // Add event listener to remove button
      assigneeElement.querySelector('button').addEventListener('click', () => {
        assigneeElement.remove();
      });
      
      // Add to selected assignees container
      selectedAssignees.appendChild(assigneeElement);
    }
    
    function showConfirmDialog(message, callback) {
      if (confirm(message)) {
        callback();
      }
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