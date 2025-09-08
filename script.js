const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');


function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    updateThemeIcons('🌞');
  } else {
    updateThemeIcons('🌙');
  }
}

function updateThemeIcons(icon) {
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.textContent = icon;
  });
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark ? '🌞' : '🌙');
}


function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');


  const hamburger = document.querySelector('.hamburger');
  if (mobileMenu.classList.contains('active')) {
    hamburger.style.background = 'transparent';
    hamburger.style.transform = 'rotate(45deg)';
  } else {
    hamburger.style.background = 'var(--text-primary)';
    hamburger.style.transform = 'rotate(0deg)';
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  const hamburger = document.querySelector('.hamburger');
  hamburger.style.background = 'var(--text-primary)';
  hamburger.style.transform = 'rotate(0deg)';
}


function smoothScrollTo(element) {
  const targetElement = document.querySelector(element);
  if (targetElement) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}


function handleContactForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');


  const mailtoLink = `mailto:yasmeentaj.6041@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hi Yasmeen,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
  )}`;

  window.location.href = mailtoLink;

  showNotification('Thank you for your message! Your email client should open now.');


  event.target.reset();
}


function showNotification(message, type = 'success') {

  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }


  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">×</button>
        </div>
    `;


  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-left: 4px solid var(--primary);
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  const content = notification.querySelector('.notification-content');
  content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        color: var(--text-primary);
        font-size: 0.875rem;
        line-height: 1.4;
    `;

  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0;
        line-height: 1;
    `;

  document.body.appendChild(notification);


  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}


const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Scroll Animation Observer
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .certificate-card, .stat-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
}


function handleNavbarScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    if (document.body.classList.contains('dark-mode')) {
      header.style.background = 'rgba(15, 23, 42, 0.98)';
    }
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    if (document.body.classList.contains('dark-mode')) {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
  }
}


function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}


const activeNavStyles = document.createElement('style');
activeNavStyles.textContent = `
    .nav-link.active {
        color: var(--primary) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(activeNavStyles);


function initSkillsAnimation() {
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });
}


function initLoadingAnimation() {

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease';
  }
}


document.addEventListener('DOMContentLoaded', function () {

  initTheme();


  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);


  menuToggle.addEventListener('click', toggleMobileMenu);


  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScrollTo(target);
      closeMobileMenu();
    });
  });


  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }


  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  heroButtons.forEach(btn => {
    if (btn.getAttribute('href').startsWith('#')) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
      });
    }
  });

  // Scroll events
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    updateActiveNavLink();
  });


  initScrollAnimations();
  initSkillsAnimation();
  initLoadingAnimation();


  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav') && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });


  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});

function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}


window.addEventListener('scroll', throttle(function () {
  handleNavbarScroll();
  updateActiveNavLink();
}, 16));