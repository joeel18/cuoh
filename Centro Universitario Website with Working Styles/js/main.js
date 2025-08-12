// Main JavaScript for Centro Universitario Website

document.addEventListener('DOMContentLoaded', function() {
// Filter functionality for news/events cards
const filterButtons = document.querySelectorAll('[id^="prog-"]');
const cardItems = document.querySelectorAll('.card-item');

filterButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();

    // Remove active class from all buttons and set outline-primary
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.classList.add('btn-outline-primary');
      btn.classList.remove('btn-primary');
    });

    // Add active class and primary style to clicked button
    this.classList.add('active');
    this.classList.remove('btn-outline-primary');
    this.classList.add('btn-primary');

    // Get filter type
    const filterId = this.id;
    let filterClass = '';

    switch(filterId) {
      case 'prog-not':
        filterClass = 'd-not';
        break;
      case 'prog-con':
        filterClass = 'd-con';
        break;
      case 'prog-eve':
        filterClass = 'd-eve';
        break;
      case 'prog-all':
      default:
        filterClass = 'all';
        break;
    }

    // Filter cards
    cardItems.forEach(card => {
      if (filterClass === 'all' || card.classList.contains(filterClass)) {
        card.style.display = 'block';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  });
});


  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('#header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero slider auto-play (simple version)
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function nextSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }

  // Auto-play every 5 seconds
  if (heroSlides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // Gallery image click handler
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() {
      // Simple modal or lightbox functionality could be added here
      console.log('Gallery image clicked:', this.src);
    });
  });

 // Video play button
const video = document.querySelector('#cu-video'); // ID del video
const playButton = document.querySelector('#cu-play'); // ID del botón

if (video && playButton) {
  playButton.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      video.closest('.video-container').classList.add('playing');
    } else {
      video.pause();
      video.closest('.video-container').classList.remove('playing');
    }
  });

  // Opcional: ocultar botón cuando el video termine
  video.addEventListener('ended', function() {
    video.closest('.video-container').classList.remove('playing');
  });
}


  // Mobile menu toggle (basic implementation)
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuToggle.className = 'mobile-menu-toggle d-md-none';
  mobileMenuToggle.style.cssText = `
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--primary-color);
    cursor: pointer;
  `;

  const navContainer = document.querySelector('#nav-menu-container');
  const header = document.querySelector('#header .container');
  
  if (window.innerWidth <= 768) {
    header.appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
      navContainer.style.display = navContainer.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Form validation (if forms are added later)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Counter animation for statistics (if added)
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 20);
  }

  // Search functionality (basic)
  const searchInputs = document.querySelectorAll('input[type="search"]');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const searchableElements = document.querySelectorAll('.card-title, .card-text');
      
      searchableElements.forEach(element => {
        const card = element.closest('.card-item');
        if (element.textContent.toLowerCase().includes(searchTerm)) {
          card.style.display = 'block';
        } else if (searchTerm !== '') {
          card.style.display = 'none';
        }
      });
    });
  });

  console.log('Centro Universitario website initialized successfully');
});

// Utility functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 100px; right: 20px; z-index: 1050; min-width: 300px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Export functions for global use
window.CentroUniversitario = {
  showNotification,
  formatDate
};
