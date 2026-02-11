// Main JavaScript - Core interactions, theme toggle, typing effect, smooth scroll

document.addEventListener('DOMContentLoaded', () => {
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===== INTERSECTION OBSERVER FOR SCROLL REVEALS =====
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .skill-row, .project-card, .viz-card').forEach(el => {
    observer.observe(el);
  });

  // ===== TYPING EFFECT =====
  const typedElement = document.getElementById('typed');
  if(typedElement) {
    const phrases = [
      'Data Analyst',
      'Python Expert',
      'SQL Developer',
      'Excel Specialist',
      'Data Visualization'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if(!isDeleting) {
        // Typing
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if(charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 1500); // Pause before deleting
          return;
        }
      } else {
        // Deleting
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if(charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
  }

  // ===== DARK/LIGHT THEME TOGGLE =====
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Set initial theme
  if(savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if(scrollTop > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  // ===== ANIMATE SKILL BARS ON SCROLL =====
  const skillBars = document.querySelectorAll('.bar .fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const level = entry.target.dataset.level;
        entry.target.style.width = level + '%';
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.5});

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ===== VISITOR COUNTER (localStorage) =====
  const visitKey = 'portfolio_visits_v1';
  let visits = parseInt(localStorage.getItem(visitKey) || '0', 10);
  visits += 1;
  localStorage.setItem(visitKey, visits);
  console.log(`You have visited ${visits} time(s)`);

  // ===== SET FOOTER YEAR =====
  const yearElement = document.getElementById('year');
  if(yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ===== MOBILE MENU TOGGLE (if needed) =====
  // This can be expanded if you add a hamburger menu for mobile

  // ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
  // Ensure all interactive elements are properly focused
  document.addEventListener('keydown', (e) => {
    // Handle Escape key for modals (if any)
    if(e.key === 'Escape') {
      // Close modal logic here if modals are added
    }
    
    // Handle Tab key for proper focus management
    if(e.key === 'Tab') {
      // Focus management is handled by browser by default
    }
  });

  // ===== PREVENT LAYOUT SHIFT =====
  // Ensure scrollbar is always visible to prevent layout shift on navigation
  document.documentElement.style.scrollbarGutter = 'stable';
});

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', () => {
  if(document.hidden) {
    console.log('Page is hidden');
  } else {
    console.log('Page is visible');
  }
});
