document.addEventListener('DOMContentLoaded', function () {
    // 인력 재배치 슬라이더
    const reassignSlider = document.getElementById('reassignSlider');
    const reassignValue = document.getElementById('reassignValue');

    if (reassignSlider && reassignValue) {
        reassignSlider.addEventListener('input', function () {
            reassignValue.textContent = this.value + '%';
        });
    }

    // 고급 옵션 토글
    const advancedOptionsToggle = document.querySelector('[data-toggle="collapse"]');
    const advancedOptions = document.getElementById('advancedOptions');

    if (advancedOptionsToggle && advancedOptions) {
        advancedOptionsToggle.addEventListener('click', function () {
            advancedOptions.classList.toggle('show');
        });
    }

    // 시나리오 선택에 따른 기본값 설정
    const scenarioSelect = document.getElementById('scenarioSelect');
    const deptSliders = document.querySelectorAll('.dept-slider');
    const costReductionGoal = document.getElementById('costReductionGoal');
    const efficiencyGoal = document.getElementById('efficiencyGoal');

    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', function () {
            const scenario = this.value;

            switch (scenario) {
                case 'reduction':
                    // 인원 감축 시나리오 기본값
                    reassignSlider.value = 25;
                    reassignValue.textContent = '25%';
                    costReductionGoal.value = 15;
                    efficiencyGoal.value = 8;
                    // 부서별 우선순위 조정
                    setDepartmentPriorities([4, 3, 5, 4, 2]);
                    break;

                case 'newDept':
                    // 신규 부서 추가 시나리오 기본값
                    reassignSlider.value = 30;
                    reassignValue.textContent = '30%';
                    costReductionGoal.value = 0;
                    efficiencyGoal.value = 12;
                    // 부서별 우선순위 조정
                    setDepartmentPriorities([3, 5, 4, 3, 2]);
                    break;

                case 'policy':
                    // 정책 변경 시나리오 기본값
                    reassignSlider.value = 15;
                    reassignValue.textContent = '15%';
                    costReductionGoal.value = 5;
                    efficiencyGoal.value = 10;
                    // 부서별 우선순위 조정
                    setDepartmentPriorities([5, 4, 3, 3, 3]);
                    break;

                case 'skillBased':
                    // 역량 중심 재배치 시나리오 기본값
                    reassignSlider.value = 35;
                    reassignValue.textContent = '35%';
                    costReductionGoal.value = 2;
                    efficiencyGoal.value = 15;
                    // 부서별 우선순위 조정
                    setDepartmentPriorities([3, 5, 4, 4, 3]);
                    break;

                default:
                    // 사용자 정의 시나리오 기본값
                    reassignSlider.value = 10;
                    reassignValue.textContent = '10%';
                    costReductionGoal.value = 5;
                    efficiencyGoal.value = 10;
                    // 부서별 우선순위 조정
                    setDepartmentPriorities([4, 5, 3, 4, 3]);
                    break;
            }
        });
    }

    // 부서별 우선순위 설정 함수
    function setDepartmentPriorities(values) {
        if (deptSliders.length === values.length) {
            deptSliders.forEach((slider, index) => {
                slider.value = values[index];
            });
        }
    }

    // 초기화 버튼
    const resetBtn = document.getElementById('resetBtn');

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            document.getElementById('simulationForm').reset();
            reassignValue.textContent = '10%';

            // 기본 우선순위로 초기화
            setDepartmentPriorities([4, 5, 3, 4, 3]);
        });
    }

    // 시뮬레이션 실행 버튼
    const runSimulationBtn = document.getElementById('runSimulationBtn');
    const simulationLoading = document.getElementById('simulationLoading');
    const simulationResults = document.getElementById('simulationResults');

    if (runSimulationBtn && simulationLoading && simulationResults) {
        runSimulationBtn.addEventListener('click', function () {
            // 로딩 표시
            simulationResults.style.display = 'none';
            simulationLoading.style.display = 'block';

            // 진행 상태 애니메이션 (실제 구현에서는 API 통신 상태 반영)
            const progressBar = simulationLoading.querySelector('.progress-bar');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);

                    // 결과 표시 (2초 후)
                    setTimeout(() => {
                        simulationLoading.style.display = 'none';
                        simulationResults.style.display = 'block';

                        // 차트 업데이트
                        updateEfficiencyChart();
                    }, 500);
                } else {
                    width += 5;
                    progressBar.style.width = width + '%';
                }
            }, 100);
        });
    }

    // 효율성 차트 초기화 및 업데이트
    function updateEfficiencyChart() {
        console.log('Initializing efficiency chart...');
        const ctx = document.getElementById('efficiencyChart');

        if (!ctx) {
            console.error('Chart canvas element not found!');
            return;
        }

        console.log('Getting 2D context for chart');

        // 기존 차트 제거 (업데이트 시)
        if (window.efficiencyChart instanceof Chart) {
            console.log('Destroying existing chart');
            window.efficiencyChart.destroy();
        }

        // 새 차트 생성
        console.log('Creating new chart');
        try {
            window.efficiencyChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['경영기획', '인사', '개발', '마케팅', '영업', '전체'],
                    datasets: [
                        {
                            label: '현재 효율성',
                            data: [68, 71, 65, 70, 72, 69],
                            backgroundColor: 'rgba(108, 117, 125, 0.5)',
                            borderColor: 'rgba(108, 117, 125, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '예상 효율성',
                            data: [76, 76, 80, 77, 78, 78],
                            backgroundColor: 'rgba(74, 159, 123, 0.5)',
                            borderColor: 'rgba(74, 159, 123, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
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
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            console.log('Chart created successfully:', window.efficiencyChart);
        } catch (error) {
            console.error('Error creating chart:', error);
        }
    }

    // 비교 추가 버튼
    const addScenarioBtn = document.getElementById('addScenarioBtn');

    if (addScenarioBtn) {
        addScenarioBtn.addEventListener('click', function () {
            // 시나리오 선택 모달 표시 (실제 구현에서는 모달 컴포넌트 사용)
            const scenarios = [
                '인력 재배치 시나리오 #1',
                '신규 부서 추가 시나리오',
                '역량 중심 재배치 시나리오',
                '비용 절감 시나리오'
            ];

            const selectedScenario = prompt('비교할 시나리오를 선택하세요 (1-4):\n1. ' + scenarios[0] + '\n2. ' + scenarios[1] + '\n3. ' + scenarios[2] + '\n4. ' + scenarios[3]);

            if (selectedScenario && !isNaN(selectedScenario) && selectedScenario >= 1 && selectedScenario <= 4) {
                alert(scenarios[parseInt(selectedScenario) - 1] + '가 비교 목록에 추가되었습니다.');
            }
        });
    }

    // 시뮬레이션 히스토리 항목 클릭 이벤트
    const historyItems = document.querySelectorAll('.history-item');

    if (historyItems) {
        historyItems.forEach(item => {
            const viewBtn = item.querySelector('.fas.fa-eye')?.closest('.btn');
            const deleteBtn = item.querySelector('.fas.fa-trash-alt')?.closest('.btn');

            if (!viewBtn || !deleteBtn) return;

            const scenarioName = item.querySelector('.history-name').textContent;

            // 조회 버튼
            viewBtn.addEventListener('click', function () {
                alert(`'${scenarioName}' 시뮬레이션을 불러옵니다.`);

                // 실제 구현에서는 해당 시뮬레이션 데이터를 불러와 UI 업데이트

                // 로딩 표시
                if (simulationResults && simulationLoading) {
                    simulationResults.style.display = 'none';
                    simulationLoading.style.display = 'block';

                    // 데이터 로딩 후 결과 표시 (시뮬레이션)
                    setTimeout(() => {
                        simulationLoading.style.display = 'none';
                        simulationResults.style.display = 'block';

                        // 차트 업데이트
                        updateEfficiencyChart();
                    }, 1000);
                }
            });

            // 삭제 버튼
            deleteBtn.addEventListener('click', function () {
                if (confirm(`'${scenarioName}' 시뮬레이션을 삭제하시겠습니까?`)) {
                    // 실제 구현에서는 API 호출로 데이터 삭제
                    item.remove();
                }
            });
        });
    }

    // 시나리오 비교 행 클릭 이벤트
    const comparisonRows = document.querySelectorAll('.comparison-row');

    if (comparisonRows) {
        comparisonRows.forEach(row => {
            row.addEventListener('click', function () {
                // 활성화 상태 토글
                document.querySelectorAll('.comparison-row').forEach(r => {
                    r.classList.remove('active');
                });

                // 현재 조직 구조는 항상 현재 상태 유지
                if (!this.classList.contains('current')) {
                    this.classList.add('active');
                }
            });

            // 차트 보기 버튼
            const chartBtn = row.querySelector('.fas.fa-chart-line')?.closest('.btn');
            if (chartBtn) {
                chartBtn.addEventListener('click', function (e) {
                    e.stopPropagation(); // 행 클릭 이벤트 전파 방지

                    const scenarioName = row.querySelector('.scenario-col div:last-child').textContent;
                    alert(`'${scenarioName}'의 상세 차트를 표시합니다.`);

                    // 실제 구현에서는 차트 모달이나 새 페이지로 이동
                });
            }
        });
    }

    // 적용 버튼 이벤트
    const applyBtn = document.querySelector('#simulationResults .card-footer .btn-primary');

    if (applyBtn) {
        applyBtn.addEventListener('click', function () {
            if (confirm('시뮬레이션 결과를 실제 조직도에 적용하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                alert('변경사항이 성공적으로 적용되었습니다.');

                // 실제 구현에서는 API 호출로 데이터 적용
                window.location.href = 'org-generation.html';
            }
        });
    }

    // 저장 버튼 이벤트
    const saveBtn = document.querySelector('#simulationResults .card-footer .btn-outline-secondary');

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const scenarioName = prompt('저장할 시나리오 이름을 입력하세요:', '새 시뮬레이션 시나리오');

            if (scenarioName) {
                // 실제 구현에서는 API 호출로 데이터 저장
                alert(`'${scenarioName}' 시나리오가 저장되었습니다.`);

                // 히스토리 목록에 추가 (실제 구현에서는 서버에서 받은 데이터로 업데이트)
                const historyList = document.querySelector('.history-list');
                if (historyList) {
                    const currentDate = new Date().toLocaleDateString('ko-KR');

                    const newHistoryItem = document.createElement('div');
                    newHistoryItem.className = 'history-item';
                    newHistoryItem.innerHTML = `
                        <div class="history-name">${scenarioName}</div>
                        <div class="history-date">${currentDate}</div>
                        <div class="history-actions">
                            <button class="btn btn-sm btn-link">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-link">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    `;

                    historyList.prepend(newHistoryItem);

                    // 새로 추가된 항목에 이벤트 리스너 추가
                    const viewBtn = newHistoryItem.querySelector('.fas.fa-eye').closest('.btn');
                    const deleteBtn = newHistoryItem.querySelector('.fas.fa-trash-alt').closest('.btn');

                    viewBtn.addEventListener('click', function () {
                        alert(`'${scenarioName}' 시뮬레이션을 불러옵니다.`);

                        // 로딩 표시
                        if (simulationResults && simulationLoading) {
                            simulationResults.style.display = 'none';
                            simulationLoading.style.display = 'block';

                            // 데이터 로딩 후 결과 표시 (시뮬레이션)
                            setTimeout(() => {
                                simulationLoading.style.display = 'none';
                                simulationResults.style.display = 'block';

                                // 차트 업데이트
                                updateEfficiencyChart();
                            }, 1000);
                        }
                    });

                    deleteBtn.addEventListener('click', function () {
                        if (confirm(`'${scenarioName}' 시뮬레이션을 삭제하시겠습니까?`)) {
                            // 실제 구현에서는 API 호출로 데이터 삭제
                            newHistoryItem.remove();
                        }
                    });
                }
            }
        });
    }

    // 내보내기 버튼 이벤트
    const exportBtn = document.querySelector('#simulationResults .card-footer .btn-outline-primary');

    if (exportBtn) {
        exportBtn.addEventListener('click', function () {
            alert('시뮬레이션 결과를 Excel 파일로 내보냅니다.');
            // 실제 구현에서는 API 호출로 엑셀 파일 생성 및 다운로드
        });
    }

    // 시뮬레이션 결과 탭 전환
    const resultTabs = document.querySelectorAll('.result-tab');
    const resultPanels = document.querySelectorAll('.result-panel');

    if (resultTabs && resultPanels) {
        resultTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetPanel = this.getAttribute('data-target');

                // 탭 활성화 상태 변경
                resultTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 패널 표시 상태 변경
                resultPanels.forEach(panel => {
                    panel.style.display = panel.id === targetPanel ? 'block' : 'none';
                });

                // 차트 업데이트 (필요한 경우)
                if (targetPanel === 'efficiencyPanel') {
                    updateEfficiencyChart();
                } else if (targetPanel === 'costPanel') {
                    updateCostChart();
                } else if (targetPanel === 'workloadPanel') {
                    updateWorkloadChart();
                }
            });
        });
    }

    // 비용 차트 업데이트 함수
    function updateCostChart() {
        const ctx = document.getElementById('costChart');

        if (!ctx) {
            console.error('Cost chart canvas element not found!');
            return;
        }

        const context2D = ctx.getContext('2d');

        // 기존 차트 제거 (업데이트 시)
        if (window.costChart) {
            window.costChart.destroy();
        }

        // 새 차트 생성
        window.costChart = new Chart(context2D, {
            type: 'bar',
            data: {
                labels: ['인건비', '운영비', '교육비', '복리후생', '기타', '총 비용'],
                datasets: [
                    {
                        label: '현재 비용',
                        data: [450, 120, 80, 95, 40, 785],
                        backgroundColor: 'rgba(108, 117, 125, 0.5)',
                        borderColor: 'rgba(108, 117, 125, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '예상 비용',
                        data: [420, 115, 95, 90, 35, 755],
                        backgroundColor: 'rgba(74, 159, 123, 0.5)',
                        borderColor: 'rgba(74, 159, 123, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.raw + '백만원';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value + '백만원';
                            }
                        }
                    }
                }
            }
        });
    }

    // 업무량 차트 업데이트 함수
    function updateWorkloadChart() {
        const ctx = document.getElementById('workloadChart');

        if (!ctx) {
            console.error('Workload chart canvas element not found!');
            return;
        }

        const context2D = ctx.getContext('2d');

        // 기존 차트 제거 (업데이트 시)
        if (window.workloadChart) {
            window.workloadChart.destroy();
        }

        // 새 차트 생성
        window.workloadChart = new Chart(context2D, {
            type: 'radar',
            data: {
                labels: ['경영기획', '인사', '개발', '마케팅', '영업'],
                datasets: [
                    {
                        label: '현재 업무량',
                        data: [85, 78, 92, 80, 87],
                        backgroundColor: 'rgba(108, 117, 125, 0.2)',
                        borderColor: 'rgba(108, 117, 125, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(108, 117, 125, 1)'
                    },
                    {
                        label: '예상 업무량',
                        data: [80, 75, 85, 78, 82],
                        backgroundColor: 'rgba(74, 159, 123, 0.2)',
                        borderColor: 'rgba(74, 159, 123, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(74, 159, 123, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function (value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // 페이지 로드 시 초기 차트 렌더링 부분 수정
    if (document.getElementById('efficiencyChart')) {
        console.log('Found efficiency chart element, initializing chart...');
        // Chart.js가 로드되었는지 확인
        if (typeof Chart !== 'undefined') {
            updateEfficiencyChart();
        } else {
            console.error('Chart.js library not loaded!');
        }
    } else {
        console.error('Efficiency chart element not found!');
        console.log('Available canvas elements:', document.querySelectorAll('canvas'));
    }
});

