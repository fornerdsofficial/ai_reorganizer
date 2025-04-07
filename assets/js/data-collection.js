document.addEventListener('DOMContentLoaded', function() {
    // File Upload Functionality
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.getElementById('file-upload');
    const uploadList = document.getElementById('upload-list');
    const dataPreviewContainer = document.getElementById('data-preview-container');
    const dataGrid = document.getElementById('data-grid');
    
    // Add KPI Field Functionality
    const addKpiBtn = document.getElementById('add-kpi');
    const kpiList = document.getElementById('kpi-list');
    
    // Validation Modal
    const validateDataBtn = document.getElementById('validate-data');
    const validationModal = document.getElementById('validation-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const continueAnywayBtn = document.getElementById('continue-anyway');
    const fixErrorsBtn = document.getElementById('fix-errors');
    
    // Navigation Buttons
    const nextStepBtn = document.getElementById('next-step');
    const saveDraftBtn = document.getElementById('save-draft');
    const downloadTemplateBtn = document.getElementById('download-template');
    const resetDataBtn = document.getElementById('reset-data');
    const addIntegrationBtn = document.getElementById('add-integration');
    
    // File Upload Event Listeners
    uploadBox.addEventListener('click', () => fileInput.click());
    
    uploadBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadBox.classList.add('drag-over');
    });
    
    uploadBox.addEventListener('dragleave', () => {
      uploadBox.classList.remove('drag-over');
    });
    
    uploadBox.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadBox.classList.remove('drag-over');
      
      if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
    
    // Add KPI Event Listener
    addKpiBtn.addEventListener('click', addKpiField);
    
    // Handle removing KPI items
    kpiList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-kpi') || e.target.parentElement.classList.contains('remove-kpi')) {
        const kpiItem = e.target.closest('.kpi-item');
        if (kpiItem && kpiList.children.length > 1) {
          kpiItem.remove();
        }
      }
    });
    
    // Modal Event Listeners
    validateDataBtn.addEventListener('click', () => {
      validationModal.classList.add('show');
    });
    
    closeModalBtn.addEventListener('click', () => {
      validationModal.classList.remove('show');
    });
    
    continueAnywayBtn.addEventListener('click', () => {
      validationModal.classList.remove('show');
    });
    
    fixErrorsBtn.addEventListener('click', () => {
      validationModal.classList.remove('show');
    });
    
    // Navigation Button Event Listeners
    nextStepBtn.addEventListener('click', () => {
      // In a real application, this would save the data and navigate
      // For this mockup, we'll just navigate to the next page
      window.location.href = 'dashboard.html';
    });
    
    saveDraftBtn.addEventListener('click', () => {
      showNotification('데이터가 임시저장되었습니다.', 'success');
    });
    
    downloadTemplateBtn.addEventListener('click', () => {
      // In a real application, this would download a template file
      showNotification('템플릿 파일이 다운로드되었습니다.', 'success');
    });
    
    resetDataBtn.addEventListener('click', () => {
      if (confirm('데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        dataGrid.innerHTML = '';
        dataPreviewContainer.style.display = 'none';
        uploadList.innerHTML = '';
        showNotification('데이터가 초기화되었습니다.', 'info');
      }
    });
    
    addIntegrationBtn.addEventListener('click', () => {
      showNotification('이 기능은 아직 개발 중입니다.', 'warning');
    });
    
    // Handle File Upload
    function handleFileUpload(file) {
      // Check file type
      const validTypes = ['.csv', '.xlsx', '.xls'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExt)) {
        showNotification('지원하지 않는 파일 형식입니다. CSV 또는 Excel 파일을 업로드해주세요.', 'error');
        return;
      }
      
      // Create upload item
      const uploadItem = document.createElement('div');
      uploadItem.className = 'upload-item';
      
      // Determine icon based on file type
      let iconClass = 'fas fa-file-alt';
      if (fileExt === '.csv') {
        iconClass = 'fas fa-file-csv';
      } else if (fileExt === '.xlsx' || fileExt === '.xls') {
        iconClass = 'fas fa-file-excel';
      }
      
      // Format file size
      const formattedSize = formatFileSize(file.size);
      
      uploadItem.innerHTML = `
        <div class="upload-item-icon">
          <i class="${iconClass}"></i>
        </div>
        <div class="upload-item-details">
          <div class="upload-item-name">${file.name}</div>
          <div class="upload-item-size">${formattedSize}</div>
          <div class="upload-item-progress">
            <div class="upload-item-progress-bar" style="width: 0%"></div>
          </div>
        </div>
        <div class="upload-item-status uploading">
          <i class="fas fa-spinner fa-spin"></i> 업로드 중
        </div>
        <div class="upload-item-actions">
          <button class="btn-icon remove-upload">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      
      uploadList.innerHTML = ''; // Clear previous uploads
      uploadList.appendChild(uploadItem);
      
      // Simulate upload progress
      simulateFileUpload(uploadItem, file);
    }
    
    // Simulate File Upload
    function simulateFileUpload(uploadItem, file) {
      const progressBar = uploadItem.querySelector('.upload-item-progress-bar');
      const statusElement = uploadItem.querySelector('.upload-item-status');
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(interval);
          statusElement.className = 'upload-item-status success';
          statusElement.innerHTML = '<i class="fas fa-check-circle"></i> 완료';
          
          // Show data preview
          generateDataPreview(file);
        }
      }, 300);
      
      // Handle remove button
      const removeBtn = uploadItem.querySelector('.remove-upload');
      removeBtn.addEventListener('click', () => {
        clearInterval(interval);
        uploadItem.remove();
        dataPreviewContainer.style.display = 'none';
      });
    }
    
    // Generate Data Preview
    function generateDataPreview(file) {
      // In a real application, this would parse the actual file
      // For this mockup, we'll generate random data
      
      // Columns for our mock data
      const columns = [
        '직원번호', '이름', '부서', '직급', '입사일', '역량평가', '전문분야', '성과지표'
      ];
      
      // Create table header
      let tableHTML = '<thead><tr>';
      columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
      });
      tableHTML += '</tr></thead><tbody>';
      
      // Generate mock data rows
      const departments = ['영업부', 'IT개발팀', '마케팅', '인사', '재무'];
      const positions = ['사원', '대리', '과장', '차장', '부장'];
      const skills = ['기획', '개발', '디자인', '데이터분석', '영업', '마케팅', '인사관리'];
      
      for (let i = 1; i <= 15; i++) {
        tableHTML += '<tr>';
        
        // Employee ID
        tableHTML += `<td>EMP${String(i).padStart(4, '0')}</td>`;
        
        // Name (random Korean name)
        const lastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
        const firstNames = ['민준', '서연', '예준', '서현', '도윤', '지우', '지호', '은서', '지안', '하준'];
        const name = lastNames[Math.floor(Math.random() * lastNames.length)] + 
                    firstNames[Math.floor(Math.random() * firstNames.length)];
        tableHTML += `<td>${name}</td>`;
        
        // Department
        tableHTML += `<td>${departments[Math.floor(Math.random() * departments.length)]}</td>`;
        
        // Position
        tableHTML += `<td>${positions[Math.floor(Math.random() * positions.length)]}</td>`;
        
        // Hire Date (random date in last 10 years)
        const hireDate = new Date();
        hireDate.setFullYear(hireDate.getFullYear() - Math.floor(Math.random() * 10));
        hireDate.setMonth(Math.floor(Math.random() * 12));
        hireDate.setDate(Math.floor(Math.random() * 28) + 1);
        const formattedDate = `${hireDate.getFullYear()}-${String(hireDate.getMonth() + 1).padStart(2, '0')}-${String(hireDate.getDate()).padStart(2, '0')}`;
        tableHTML += `<td>${formattedDate}</td>`;
        
        // Skill Assessment (random score out of 5)
        const assessment = (Math.random() * 2 + 3).toFixed(1); // Between 3.0 and 5.0
        tableHTML += `<td>${assessment}</td>`;
        
        // Expertise (random skills)
        const expertise = [];
        const numSkills = Math.floor(Math.random() * 3) + 1; // 1-3 skills
        for (let j = 0; j < numSkills; j++) {
          const skill = skills[Math.floor(Math.random() * skills.length)];
          if (!expertise.includes(skill)) {
            expertise.push(skill);
          }
        }
        tableHTML += `<td>${expertise.join(', ')}</td>`;
        
        // Performance Indicator (random percentage)
        const performance = Math.floor(Math.random() * 40) + 60; // 60-100%
        tableHTML += `<td>${performance}%</td>`;
        
        tableHTML += '</tr>';
      }
      
      tableHTML += '</tbody>';
      dataGrid.innerHTML = tableHTML;
      dataPreviewContainer.style.display = 'block';
    }
    
    // Add KPI Field
    function addKpiField() {
      const kpiItem = document.createElement('div');
      kpiItem.className = 'kpi-item';
      kpiItem.innerHTML = `
        <div class="kpi-input">
          <input type="text" class="form-control" placeholder="KPI 항목">
        </div>
        <div class="kpi-input">
          <input type="text" class="form-control" placeholder="목표 수치">
        </div>
        <div class="kpi-actions">
          <button class="btn-icon remove-kpi">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      kpiList.appendChild(kpiItem);
    }
    
    // Utility Functions
    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
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
        }); // 이 부분이 누락되었던 DOMContentLoaded 이벤트 리스너의 닫는 괄호입니다
        