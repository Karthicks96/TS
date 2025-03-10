
// DOM Elements
const loader = document.getElementById('loader-wrapper');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const scrollToTop = document.querySelector('.scroll-to-top');
const statCounters = document.querySelectorAll('.counter');

// Load event
window.addEventListener('load', () => {
  // Hide loader after page load
  setTimeout(() => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
    
    // Start animations
    initScrollAnimations();
    animateCounters();
  }, 1000);
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  if (window.scrollY > 300) {
    scrollToTop.classList.add('active');
  } else {
    scrollToTop.classList.remove('active');
  }
});

// Scroll to top functionality
scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Client logo carousel clone for infinite scroll
const cloneLogos = () => {
  const clientLogos = document.querySelector('.client-logos');
  const logos = document.querySelectorAll('.client-logo');
  
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    clientLogos.appendChild(clone);
  });
};

// Animate counters with progress bars
function animateCounters() {
  statCounters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2500; // 2.5 seconds
    const stepTime = Math.abs(Math.floor(duration / target));
    const progressBar = counter.closest('.digital-counter').querySelector('.progress-bar');
    
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current;
      
      // Animate progress bar with counter
      if (progressBar) {
        const progress = (current / target) * 100;
        progressBar.style.width = `${progress}%`;
      }
      
      if (current === target) {
        clearInterval(timer);
        
        // Add completion effect when counter reaches target
        gsap.to(counter, {
          scale: 1.2,
          duration: 0.3,
          ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to(counter, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
        
        // Add glow effect to the progress bar when complete
        if (progressBar) {
          gsap.to(progressBar, {
            boxShadow: '0 0 20px rgba(212, 175, 55, 1)',
            duration: 0.5,
            repeat: 1,
            yoyo: true
          });
        }
      }
    }, stepTime);
  });
}

// Initialize GSAP animations
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate geometric shapes
  gsap.to('.shape-1', {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: 'none'
  });
  
  gsap.to('.shape-2', {
    rotation: -360,
    duration: 25,
    repeat: -1,
    ease: 'none'
  });
  
  gsap.to('.shape-3', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  });
  
  // Create animated particles in the hero section
  function createParticles() {
    const particlesContainer = document.querySelector('.digital-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${Math.random() * 5 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(212, 175, 55, 0.7)';
      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      particlesContainer.appendChild(particle);
      
      gsap.to(particle, {
        x: `${(Math.random() - 0.5) * 200}`,
        y: `${(Math.random() - 0.5) * 200}`,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: Math.random() * 2
      });
    }
  }
  
  // Enhanced hero animations
  const heroTl = gsap.timeline();
  
  heroTl.from('.hero-backdrop', {
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out'
  })
  .from('.floating-server', {
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    ease: 'back.out(1.7)'
  }, '-=1')
  .from('.floating-devices', {
    opacity: 0,
    scale: 0,
    rotation: -180,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.8')
  .from('.code-line', {
    scaleX: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.inOut'
  }, '-=1.2')
  .from('.binary-orbit', {
    opacity: 0,
    scale: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  }, '-=0.8')
  .from('.hero-content', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  }, '-=1.5')
  .from('.hero-content p', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.hero-buttons .btn', {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: 'elastic.out(1.2, 0.7)',
    scale: 0.9
  }, '-=0.6');
  
  // Add 3D tilt effect to the server
  const server = document.querySelector('.floating-server');
  if (server) {
    document.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      gsap.to('.floating-server', {
        rotationY: xAxis,
        rotationX: yAxis,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
  }
  
  // Add pulse animation to hero buttons with royal gold shadow
  gsap.to('.hero-buttons .btn-primary', {
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Create blinking lights effect for the server
  const createServerLights = () => {
    const serverLights = document.querySelector('.server-lights');
    if (!serverLights) return;
    
    for (let i = 0; i < 8; i++) {
      const light = document.createElement('div');
      light.className = 'server-light';
      light.style.width = '5px';
      light.style.height = '5px';
      light.style.borderRadius = '50%';
      light.style.margin = '5px';
      light.style.backgroundColor = i % 3 === 0 ? '#e74c3c' : i % 3 === 1 ? '#2ecc71' : '#3498db';
      
      serverLights.appendChild(light);
      
      gsap.to(light, {
        opacity: 0.2,
        duration: 0.5 + (i * 0.2),
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.1
      });
    }
  };
  
  // Call the functions to create particles and server lights
  window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createServerLights();
  });
  
  // Animate stats cards with counter effect
  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      // Add a subtle pulse animation to stats
      gsap.to('.stat-counter', {
        scale: 1.05,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  });
  
  // Enhanced service cards animation
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-preview',
      start: 'top 70%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Create a hover effect for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Animate the icon
      const icon = card.querySelector('.service-icon');
      gsap.to(icon, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Reset the icon
      const icon = card.querySelector('.service-icon');
      gsap.to(icon, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Animate client logos
  gsap.from('.client-logo', {
    scrollTrigger: {
      trigger: '.clients',
      start: 'top 80%'
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });
  
  // Create hover effect for client logos
  const clientLogos = document.querySelectorAll('.client-logo');
  clientLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.1,
        filter: 'grayscale(0%)',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        filter: 'grayscale(100%)',
        opacity: 0.7,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Animate CTA section with a more dynamic effect
  gsap.from('.cta-content', {
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 80%'
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Add a subtle background animation to CTA
  gsap.to('.cta', {
    backgroundPosition: '100% 100%',
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// Initialize client logos
cloneLogos();

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const parallaxBg = document.querySelector('.parallax-bg');
  const scrollPosition = window.pageYOffset;
  parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = location.href;
  const navItems = document.querySelectorAll('.nav-links li a');
  
  navItems.forEach(item => {
    if (item.href === currentLocation) {
      item.classList.add('active');
    }
  });
});
