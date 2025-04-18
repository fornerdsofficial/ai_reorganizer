document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // 탭 활성화
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // 컨텐츠 활성화
        tabContents.forEach(content => {
          content.style.display = 'none';
        });
        document.getElementById(`${tabId}-tab`).style.display = 'block';
      });
    });
    
    // 업무량 슬라이더 값 표시
    const workloadSlider = document.getElementById('workloadLimit');
    const workloadValue = document.getElementById('workloadLimitValue');
    
    if (workloadSlider && workloadValue) {
      workloadSlider.addEventListener('input', function() {
        workloadValue.textContent = this.value + '%';
      });
    }
    
    // 정책 적용 대상 선택에 따른 부서 선택 영역 표시/숨김
    const allDepartmentsCheckbox = document.getElementById('allDepartments');
    const selectedDepartmentsCheckbox = document.getElementById('selectedDepartments');
    const selectedDepartmentsArea = document.querySelector('.selected-departments');
    
    if (allDepartmentsCheckbox && selectedDepartmentsCheckbox && selectedDepartmentsArea) {
      allDepartmentsCheckbox.addEventListener('change', function() {
        if (this.checked) {
          selectedDepartmentsCheckbox.checked = false;
          selectedDepartmentsArea.style.display = 'none';
        }
      });
      
      selectedDepartmentsCheckbox.addEventListener('change', function() {
        if (this.checked) {
          allDepartmentsCheckbox.checked = false;
          selectedDepartmentsArea.style.display = 'block';
        } else {
          selectedDepartmentsArea.style.display = 'none';
        }
      });
    }
    
    // 파일 업로드 기능
    const fileUpload = document.getElementById('fileUpload');
    const fileUploadArea = document.querySelector('.file-upload');
    const selectFileButton = document.getElementById('selectFileButton');
    const importButton = document.querySelector('.card-footer .btn-primary');
    
    if (fileUpload && fileUploadArea && selectFileButton && importButton) {
      // 파일 선택 버튼 클릭 시 파일 선택 창 열기
      selectFileButton.addEventListener('click', function(e) {
        e.preventDefault();
        fileUpload.click();
      });
      
      // 파일 업로드 영역 클릭 시 파일 선택 창 열기
      fileUploadArea.addEventListener('click', function() {
        fileUpload.click();
      });
      
      // 파일 선택 시 UI 업데이트
      fileUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
          const file = this.files[0];
          const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB 단위로 변환
          
          // 파일 업로드 영역 UI 업데이트
          fileUploadArea.innerHTML = `
            <i class="fas fa-file mb-3" style="font-size: 3rem;"></i>
            <h4>${file.name}</h4>
            <p class="text-muted">파일 크기: ${fileSize} MB</p>
            <button class="btn btn-outline-danger mt-3" id="removeFileButton">파일 제거</button>
          `;
          
          // 가져오기 버튼 활성화
          importButton.disabled = false;
          
          // 파일 제거 버튼에 이벤트 리스너 추가
          document.getElementById('removeFileButton').addEventListener('click', function(e) {
            e.stopPropagation(); // 파일 업로드 영역 클릭 이벤트 전파 방지
            resetFileUpload();
          });
        }
      });
      
      // 드래그 앤 드롭 기능
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, function(e) {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });
      
      fileUploadArea.addEventListener('dragenter', function() {
        this.classList.add('dragover');
      });
      
      fileUploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
      });
      
      fileUploadArea.addEventListener('drop', function(e) {
        this.classList.remove('dragover');
        fileUpload.files = e.dataTransfer.files;
        
        // 파일 변경 이벤트 수동 호출
        const event = new Event('change');
        fileUpload.dispatchEvent(event);
      });
      
      // 파일 업로드 리셋 함수
      function resetFileUpload() {
        fileUpload.value = ''; // 파일 선택 초기화
        
        // 파일 업로드 영역 UI 초기화
        fileUploadArea.innerHTML = `
          <div class="file-upload-placeholder">
            <i class="fas fa-file-upload mb-3" style="font-size: 3rem;"></i>
            <h4>파일을 드래그하거나 클릭하여 업로드하세요</h4>
            <p class="text-muted">최대 파일 크기: 10MB</p>
            <input type="file" id="fileUpload" style="display: none;">
            <button class="btn btn-outline-primary mt-3" id="selectFileButton">파일 선택</button>
          </div>
        `;
        
        // 가져오기 버튼 비활성화
        importButton.disabled = true;
        
        // 파일 선택 버튼에 이벤트 리스너 다시 추가
        document.getElementById('selectFileButton').addEventListener('click', function(e) {
          e.preventDefault();
          document.getElementById('fileUpload').click();
        });
      }
    }
    
    // 부서 추가 및 수정 버튼 이벤트 리스너
    const addDepartmentBtn = document.querySelector('#department-tab .btn-primary');
    const editDepartmentBtns = document.querySelectorAll('#department-tab .btn-outline-primary');
    
    if (addDepartmentBtn) {
      addDepartmentBtn.addEventListener('click', function() {
        // 모달 표시 로직 (실제 구현에서는 모달 컴포넌트 필요)
        alert('부서 추가 모달이 표시됩니다.');
      });
    }
    
    if (editDepartmentBtns) {
      editDepartmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // 해당 행의 부서 정보 가져오기
          const row = this.closest('tr');
          const deptCode = row.cells[0].textContent;
          const deptName = row.cells[1].textContent;
          
          // 모달 표시 로직 (실제 구현에서는 모달 컴포넌트 필요)
          alert(`부서 수정 모달이 표시됩니다. (${deptCode}: ${deptName})`);
        });
      });
    }
    
    // 구성원 추가 및 수정 버튼 이벤트 리스너
    const addMemberBtn = document.querySelector('#member-tab .btn-primary');
    const editMemberBtns = document.querySelectorAll('#member-tab .btn-outline-primary');
    
    if (addMemberBtn) {
      addMemberBtn.addEventListener('click', function() {
        // 모달 표시 로직 (실제 구현에서는 모달 컴포넌트 필요)
        alert('구성원 추가 모달이 표시됩니다.');
      });
    }
    
    if (editMemberBtns) {
      editMemberBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // 해당 행의 구성원 정보 가져오기
          const row = this.closest('tr');
          const empId = row.cells[0].textContent;
          const empName = row.cells[1].textContent;
          
          // 모달 표시 로직 (실제 구현에서는 모달 컴포넌트 필요)
          alert(`구성원 수정 모달이 표시됩니다. (${empId}: ${empName})`);
        });
      });
    }
    
    // 삭제 버튼 이벤트 리스너 (부서 및 구성원)
    const deleteBtns = document.querySelectorAll('.btn-outline-danger');
    
    if (deleteBtns) {
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // 해당 행의 정보 가져오기
          const row = this.closest('tr');
          const isInDepartmentTab = this.closest('#department-tab') !== null;
          
          let idCell, nameCell;
          if (isInDepartmentTab) {
            idCell = row.cells[0].textContent; // 부서 코드
            nameCell = row.cells[1].textContent; // 부서명
          } else {
            idCell = row.cells[0].textContent; // 사번
            nameCell = row.cells[1].textContent; // 이름
          }
          
          // 확인 대화상자
          if (confirm(`정말 '${nameCell}'${isInDepartmentTab ? ' 부서' : ''}를 삭제하시겠습니까?`)) {
            // 실제 삭제 로직 (API 호출 등)
            alert('삭제 요청이 완료되었습니다.');
            
            // UI에서 행 제거 (데모 목적)
            row.remove();
          }
        });
      });
    }
    
    // 정책 설정 저장 버튼 이벤트 리스너
    const policySubmitBtn = document.querySelector('#policy-tab .btn-primary');
    
    if (policySubmitBtn) {
      policySubmitBtn.addEventListener('click', function() {
        // 저장 로직 (API 호출 등)
        alert('정책 설정이 저장되었습니다.');
      });
    }
  });