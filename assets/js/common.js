document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile sidebar toggle
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header').prepend(sidebarToggle);
    
    // Add styles to the sidebar toggle button
    Object.assign(sidebarToggle.style, {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      marginRight: '15px',
      cursor: 'pointer',
      display: 'none',
      color: 'var(--text-color)'
    });
    
    // Check if the window width is less than 768px
    if (window.innerWidth < 768) {
      sidebarToggle.style.display = 'block';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth < 768) {
        sidebarToggle.style.display = 'block';
      } else {
        sidebarToggle.style.display = 'none';
        document.querySelector('.sidebar').classList.remove('show');
      }
    });
    
    // Handle sidebar toggle click
    sidebarToggle.addEventListener('click', function() {
      document.querySelector('.sidebar').classList.toggle('show');
    });
    
    // Add 'show' class styles for mobile sidebar
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .sidebar.show {
          transform: translateX(0);
        }
        
        .main-content {
          margin-left: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Handle notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
      notificationBell.addEventListener('click', function() {
        alert('알림 기능은 아직 개발 중입니다.');
      });
    }
    
    // Handle document clicks to close the sidebar on mobile
    document.addEventListener('click', function(e) {
      if (
        window.innerWidth < 768 &&
        document.querySelector('.sidebar').classList.contains('show') &&
        !e.target.closest('.sidebar') &&
        !e.target.closest('.sidebar-toggle')
      ) {
        document.querySelector('.sidebar').classList.remove('show');
      }
    });
    
    // Add a box-shadow to the header when scrolling
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
      }
    });
  });