// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate skill bars
      if (entry.target.classList.contains('skills')) {
        animateSkillBars();
      }
      
      // Animate counters
      if (entry.target.classList.contains('about')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 200);
  });
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Typing animation for hero section
function typeWriter() {
  const texts = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;
  
  const typedElement = document.getElementById('typed-text');
  
  function type() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, pauseTime);
      }
    } else {
      typedElement.textContent = currentText.substring(0, charIndex);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }
    
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, speed);
  }
  
  // Start typing animation
  type();
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', typeWriter);

// Smooth scroll for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
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

// Parallax effect for hero section
function parallaxEffect() {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${rate}px)`;
  }
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  
  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    updateActiveNavLink();
    parallaxEffect();
  });
  
  // Add scroll class to navbar
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
  .section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .section.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-light);
  }
  
  [data-theme="dark"] .navbar.scrolled {
    background: rgba(17, 24, 39, 0.98);
  }
`;
document.head.appendChild(style);