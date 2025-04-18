document.addEventListener('DOMContentLoaded', function () {
    // 조직도 비교 토글 기능
    const compareToggle = document.getElementById('compareToggle');
    const orgChart = document.getElementById('orgChart');

    if (compareToggle && orgChart) {
        compareToggle.addEventListener('change', function () {
            if (this.checked) {
                // 신규 조직도로 변경
                showNewOrgChart();
            } else {
                // 기존 조직도로 복원
                showCurrentOrgChart();
            }
        });
    }

    // 변경사항 보기 버튼
    const showDiffBtn = document.getElementById('showDiffBtn');

    if (showDiffBtn) {
        showDiffBtn.addEventListener('click', function () {
            showDifferences();
        });
    }

    // 새 조직도 생성 버튼
    const generateOrgBtn = document.getElementById('generateOrgBtn');

    if (generateOrgBtn) {
        generateOrgBtn.addEventListener('click', function () {
            // 로딩 상태 표시
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> 생성 중...';

            // 실제 구현에서는 API 호출 등을 통해 생성
            // 여기서는 setTimeout으로 시뮬레이션
            setTimeout(() => {
                // 생성 완료 후 상태 복원
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-magic mr-1"></i> 새 조직도 생성';

                // 결과 표시 (예시)
                showGenerationResult();
            }, 2000);
        });
    }

    // 변경사항 적용 버튼
    const applyChangesBtn = document.getElementById('applyChangesBtn');

    if (applyChangesBtn) {
        applyChangesBtn.addEventListener('click', function () {
            if (confirm('변경사항을 실제 조직도에 적용하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                // 적용 로직 (실제 구현에서는 API 호출 등)
                alert('변경사항이 성공적으로 적용되었습니다.');
            }
        });
    }

    // 시뮬레이션 요청 버튼
    const requestSimulation = document.getElementById('requestSimulation');

    if (requestSimulation) {
        requestSimulation.addEventListener('click', function () {
            // 시뮬레이션 페이지로 이동
            window.location.href = 'simulation.html';
        });
    }

    // 드롭다운 토글 (모바일용)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('show');

            // 드롭다운 메뉴 표시/숨김
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                if (dropdown.classList.contains('show')) {
                    dropdownMenu.style.display = 'block';
                } else {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
    });

    // 조직도 노드 호버 이벤트 (툴팁 표시)
    const orgNodes = document.querySelectorAll('.org-node');

    orgNodes.forEach(node => {
        node.addEventListener('mouseenter', function () {
            // 노드에 대한 상세 정보 팝업/툴팁 표시
            showNodeDetails(this);
        });

        node.addEventListener('mouseleave', function () {
            // 팝업/툴팁 숨김
            hideNodeDetails();
        });

        // 노드 클릭 이벤트 (상세 정보 표시)
        node.addEventListener('click', function () {
            showNodeDetailsModal(this);
        });
    });

    // 기존 조직도 표시 함수
    function showCurrentOrgChart() {
        // 기존 조직도 데이터로 UI 업데이트
        // 실제 구현에서는 서버에서 데이터를 가져와 처리

        // 예시 UI 업데이트: 배경색 변경
        orgNodes.forEach(node => {
            node.classList.remove('new-node', 'modified-node', 'removed-node');
            node.style.backgroundColor = '';
        });
    }

    // 신규 조직도 표시 함수
    function showNewOrgChart() {
        // 신규 조직도 데이터로 UI 업데이트
        // 실제 구현에서는 서버에서 데이터를 가져와 처리

        // 예시 UI 업데이트: 새로운 노드 스타일 적용
        // 실제 구현에서는 데이터 기반으로 노드를 동적 생성하거나 수정

        // 예시: 일부 노드의 배경색 변경
        const nodes = document.querySelectorAll('.org-node');

        // 개발팀 분할 예시
        nodes[5].querySelector('.org-node-title').textContent = '프론트엔드팀';
        nodes[5].querySelector('.org-node-subtitle').textContent = '32명';
        nodes[5].classList.add('modified-node');

        // 신규 노드는 실제 구현에서 동적 생성
        // 여기서는 스타일 변경으로 시뮬레이션
    }

    // 변경사항 강조 표시 함수
    function showDifferences() {
        // 변경된 노드들을 시각적으로 강조
        const nodes = document.querySelectorAll('.org-node');

        // 시각적 효과 초기화
        nodes.forEach(node => {
            node.classList.remove('new-node', 'modified-node', 'removed-node');
        });

        // 예시 변경사항 (실제 구현에서는 데이터 기반으로 처리)
        // 개발팀 분할 예시
        nodes[5].classList.add('modified-node');

        // 애니메이션 효과로 변경사항 강조
        nodes.forEach(node => {
            if (node.classList.contains('new-node') ||
                node.classList.contains('modified-node') ||
                node.classList.contains('removed-node')) {
                node.classList.add('highlight-animation');

                // 애니메이션 제거 (일시적 효과)
                setTimeout(() => {
                    node.classList.remove('highlight-animation');
                }, 3000);
            }
        });

        // 추가 정보 알림
        alert('변경된 부분이 강조 표시되었습니다. 수정된 항목은 노란색, 추가된 항목은 녹색, 삭제된 항목은 빨간색으로 표시됩니다.');
    }

    // 노드 상세 정보 툴팁 표시 함수
    function showNodeDetails(node) {
        // 이미 툴팁이 있으면 제거
        hideNodeDetails();

        // 노드 정보 가져오기
        const title = node.querySelector('.org-node-title').textContent;
        const subtitle = node.querySelector('.org-node-subtitle').textContent;

        // 추가 정보 (실제 구현에서는 데이터에서 가져옴)
        let extraInfo = '';
        if (title === 'CEO') {
            extraInfo = `
          <div>직책: 최고경영자</div>
          <div>담당: 전체 경영</div>
          <div>경력: 15년</div>
        `;
        } else if (title === '개발팀') {
            extraInfo = `
          <div>부서장: 박철수</div>
          <div>인원: 78명</div>
          <div>주요업무: 소프트웨어 개발, 서버 관리</div>
          <div>위치: 본사 3층</div>
        `;
        } else {
            extraInfo = `
          <div>부서 정보를 불러오는 중...</div>
        `;
        }

        // 툴팁 생성
        const tooltip = document.createElement('div');
        tooltip.className = 'node-tooltip';
        tooltip.innerHTML = `
        <div class="tooltip-header">
          <strong>${title}</strong>
        </div>
        <div class="tooltip-body">
          ${extraInfo}
        </div>
      `;

        // 툴팁 위치 설정
        const rect = node.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
        tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - 100}px`;
        tooltip.style.width = '200px';
        tooltip.style.zIndex = '1000';
        tooltip.style.backgroundColor = 'white';
        tooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        tooltip.style.borderRadius = '4px';
        tooltip.style.padding = '10px';
        tooltip.id = 'nodeTooltip';

        // 툴팁 추가
        document.body.appendChild(tooltip);
    }

    // 노드 상세 정보 툴팁 숨김 함수
    function hideNodeDetails() {
        const tooltip = document.getElementById('nodeTooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // 노드 상세 정보 모달 표시 함수 수정
    function showNodeDetailsModal(node) {
        // 노드 정보 가져오기
        const title = node.querySelector('.org-node-title').textContent;
        const subtitle = node.querySelector('.org-node-subtitle').textContent;

        // 이미 모달이 있으면 제거
        const existingModal = document.getElementById('nodeDetailsModal');
        if (existingModal) {
            existingModal.remove();
        }

        // 모달 생성
        const modalHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title} 상세 정보</h5>
            <button type="button" class="modal-close" onclick="closeNodeDetailsModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="node-details">
              <div class="node-details-item">
                <div class="detail-label">부서명</div>
                <div class="detail-value">${title}</div>
              </div>
              <div class="node-details-item">
                <div class="detail-label">인원</div>
                <div class="detail-value">${subtitle}</div>
              </div>
              <div class="node-details-item">
                <div class="detail-label">상위 부서</div>
                <div class="detail-value">CEO</div>
              </div>
              <div class="node-details-item">
                <div class="detail-label">부서장</div>
                <div class="detail-value">박철수 (차장)</div>
              </div>
              <div class="node-details-item">
                <div class="detail-label">업무량</div>
                <div class="detail-value">
                  <div class="progress">
                    <div class="progress-bar" style="width: 85%;"></div>
                  </div>
                  85%
                </div>
              </div>
              <div class="node-details-item">
                <div class="detail-label">주요 업무</div>
                <div class="detail-value">
                  소프트웨어 개발, 시스템 유지보수, 서버 관리, 기술 지원
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="viewDepartmentDetails()">상세 보기</button>
            <button type="button" class="btn btn-secondary" onclick="closeNodeDetailsModal()">닫기</button>
          </div>
        </div>
      </div>
    `;

        // 모달 컨테이너 생성 및 추가
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal show';
        modalContainer.id = 'nodeDetailsModal';
        modalContainer.innerHTML = modalHTML;

        // 모달 추가
        document.body.appendChild(modalContainer);

        // 모달 닫기 함수를 전역 스코프에 추가
        window.closeNodeDetailsModal = function () {
            const modal = document.getElementById('nodeDetailsModal');
            if (modal) {
                modal.remove();
            }
        };

        // 상세 보기 함수 전역 스코프에 추가
        window.viewDepartmentDetails = function () {
            alert('부서 상세 정보 페이지로 이동합니다. (구현 예정)');
            closeNodeDetailsModal();
        };

        // 모달 외부 클릭 시 닫기
        const backdrop = modalContainer.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeNodeDetailsModal);
        }
    }


    // 생성 결과 표시 함수
    function showGenerationResult() {
        // 새로운 조직도 결과를 표시
        // 실제 구현에서는 서버에서 받은 데이터로 처리

        // 예시: 성공 메시지 표시
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        새로운 조직도가 성공적으로 생성되었습니다. 결과를 확인하세요.
      `;
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.left = '50%';
        alert.style.transform = 'translateX(-50%)';
        alert.style.zIndex = '2000';
        alert.style.padding = '1rem 2rem';
        alert.style.borderRadius = '4px';
        alert.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

        document.body.appendChild(alert);

        // 알림 자동 제거
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s';

            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 3000);

        // 비교 토글 자동 체크 (새 조직도 표시)
        if (compareToggle) {
            compareToggle.checked = true;
            showNewOrgChart();
        }
    }
});
