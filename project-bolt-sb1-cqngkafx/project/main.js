// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Initialize theme icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = contactForm.querySelector('.btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');
  
  // Show loading state
  btn.classList.add('loading');
  btn.disabled = true;
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  try {
    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
    
  } catch (error) {
    // Show error message
    showNotification('Failed to send message. Please try again.', 'error');
  } finally {
    // Reset button state
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;
  
  // Add notification styles
  const notificationStyles = `
    .notification {
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 1001;
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-heavy);
      display: flex;
      align-items: center;
      gap: 1rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      border-left: 4px solid var(--primary-color);
    }
    
    .notification-success {
      border-left-color: var(--success-color);
    }
    
    .notification-error {
      border-left-color: var(--error-color);
    }
    
    .notification-warning {
      border-left-color: var(--warning-color);
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--text-secondary);
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-close:hover {
      color: var(--text-primary);
    }
  `;
  
  // Add styles if not already added
  if (!document.querySelector('#notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Auto hide after 5 seconds
  const autoHideTimer = setTimeout(() => {
    hideNotification(notification);
  }, 5000);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(autoHideTimer);
    hideNotification(notification);
  });
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 300);
}

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
});

// Scroll to Top Button
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  
  const scrollBtnStyles = `
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      transition: all 0.3s ease;
      box-shadow: var(--shadow-medium);
    }
    
    .scroll-to-top.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    
    .scroll-to-top:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-heavy);
    }
  `;
  
  // Add styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = scrollBtnStyles;
  document.head.appendChild(styleSheet);
  
  // Add to DOM
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  // Scroll to top functionality
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Resume Download Analytics (Optional)
document.addEventListener('DOMContentLoaded', () => {
  const resumeLinks = document.querySelectorAll('a[download*="Resume"]');
  
  resumeLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Track resume downloads (you can integrate with analytics)
      console.log('Resume downloaded');
      
      // Show success notification
      showNotification('Resume download started!', 'success');
    });
  });
});

// Form Input Animation Enhancement
document.addEventListener('DOMContentLoaded', () => {
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (input.value.trim() !== '') {
        input.parentElement.classList.add('has-value');
      } else {
        input.parentElement.classList.remove('has-value');
      }
    });
    
    // Check initial value
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('has-value');
    }
  });
  
  // Add enhanced form styles
  const formStyles = `
    .form-group.focused input,
    .form-group.focused textarea {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }
    
    .form-group.has-value label,
    .form-group.focused label {
      top: -10px;
      left: 0.75rem;
      font-size: 0.8rem;
      color: var(--primary-color);
      background: var(--bg-primary);
      padding: 0 0.5rem;
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = formStyles;
  document.head.appendChild(styleSheet);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Existing scroll handlers are already optimized
}, 16)); // ~60fps