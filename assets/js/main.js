/**
 * KJ특허사무소 웹사이트 메인 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // 헤더 스크롤 효과
  const header = document.querySelector('.header');
  const scrollThreshold = 50;
  
  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // 모바일 메뉴 토글
  const menuToggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      // 아이콘 변경 (햄버거 <-> X)
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
  
  // 현재 페이지 메뉴 항목 활성화
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
    
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPath || currentPath.endsWith(href)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  setActiveMenuItem();
  
  // 스크롤 애니메이션
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.9) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // 초기 체크
  checkFade();
  
  // 스크롤 시 체크
  window.addEventListener('scroll', checkFade);
  
  // 부드러운 스크롤 (앵커 링크)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // 모바일 메뉴가 열려있으면 닫기
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });
});
