
// Gallery Page Specific Scripts
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Show all items by default
  filterGallery('all');
  
  // Add click event to filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter gallery
      filterGallery(filterValue);
    });
  });
  
  function filterGallery(category) {
    galleryItems.forEach(item => {
      const itemCategories = item.getAttribute('data-category');
      
      // Show all items if category is 'all'
      if (category === 'all') {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            item.classList.remove('hidden');
          }
        });
      } 
      // Show only items that match the selected category
      else if (itemCategories.includes(category)) {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            item.classList.remove('hidden');
          }
        });
      } 
      // Hide items that don't match the selected category
      else {
        gsap.to(item, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            item.classList.add('hidden');
          }
        });
      }
    });
    
    // Animate the gallery grid to adjust layout after filtering
    gsap.from('.gallery-grid', {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
  
  // Initialize before-after sliders
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const beforeAfterWrapper = slider.querySelector('.before-after-wrapper');
    const afterImage = slider.querySelector('.after-image');
    const sliderHandle = slider.querySelector('.slider-handle');
    
    // Initial position
    let sliderPosition = 50;
    
    // Helper function to update slider position
    function updateSliderPosition(position) {
      sliderPosition = position;
      afterImage.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
    }
    
    // Handle mouse/touch events for dragging
    let isDragging = false;
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', () => {
      isDragging = true;
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    beforeAfterWrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const rect = beforeAfterWrapper.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      
      // Limit position between 0% and 100%
      if (position >= 0 && position <= 100) {
        updateSliderPosition(position);
      }
    });
    
    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', () => {
      isDragging = true;
    });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    beforeAfterWrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      // Prevent scrolling while dragging
      e.preventDefault();
      
      const rect = beforeAfterWrapper.getBoundingClientRect();
      const touch = e.touches[0];
      const position = ((touch.clientX - rect.left) / rect.width) * 100;
      
      // Limit position between 0% and 100%
      if (position >= 0 && position <= 100) {
        updateSliderPosition(position);
      }
    });
    
    // Click/tap anywhere on the wrapper to move the slider
    beforeAfterWrapper.addEventListener('click', (e) => {
      const rect = beforeAfterWrapper.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      
      // Animate the slider movement
      gsap.to(afterImage, {
        width: `${position}%`,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(sliderHandle, {
        left: `${position}%`,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      sliderPosition = position;
    });
  });
  
  // Gallery animation with GSAP
  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });
  
  gsap.from('.comparison-slider', {
    scrollTrigger: {
      trigger: '.comparison-container',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  gsap.from('.coming-soon', {
    scrollTrigger: {
      trigger: '.future-projects',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
  });
});
