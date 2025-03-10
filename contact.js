
// Contact Page Specific Scripts
document.addEventListener('DOMContentLoaded', function() {
  // Initialize emailjs
  emailjs.init("user_AJN8xP4WwmNIplcnGJKrl"); // Replace with your actual EmailJS user ID
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate info cards
  gsap.from('.info-card', {
    scrollTrigger: {
      trigger: '.info-cards',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Animate form container
  gsap.from('.form-container', {
    scrollTrigger: {
      trigger: '.form-container',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Initialize the map
  const map = L.map('contact-map').setView([11.5175, 79.3268], 13); // Virudhachalam coordinates
  
  // Add a custom styled map layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add office marker
  const officeIcon = L.divIcon({
    className: 'custom-marker office-marker',
    html: '<i class="fas fa-building"></i>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
  
  const officeMarker = L.marker([11.5175, 79.3268], {icon: officeIcon}).addTo(map)
    .bindPopup('<strong>EService IT Solutions</strong><br>Virudhachalam, Tamil Nadu 606001<br><a href="https://goo.gl/maps/3JXq5Z7Z7Z7Z7Z7Z7" target="_blank">Get Directions</a>');
  
  // Add service area circle
  const serviceArea = L.circle([11.5175, 79.3268], {
    color: '#4F46E5',
    fillColor: '#4F46E5',
    fillOpacity: 0.1,
    radius: 50000 // 50km radius
  }).addTo(map);
  
  // Add service area locations
  const locations = [
    { name: 'Pondicherry', coords: [11.9139, 79.8145] },
    { name: 'Villupuram', coords: [11.9401, 79.4861] },
    { name: 'Cuddalore', coords: [11.7509, 79.7714] },
    { name: 'Kallakurichi', coords: [11.7383, 78.9571] },
    { name: 'Chidambaram', coords: [11.3992, 79.6963] }
  ];
  
  const locationIcon = L.divIcon({
    className: 'custom-marker location-marker',
    html: '<i class="fas fa-map-marker-alt"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
  
  locations.forEach(location => {
    L.marker(location.coords, {icon: locationIcon}).addTo(map)
      .bindPopup(`<strong>${location.name}</strong><br>Service Available`);
  });
  
  // Add 3D effect with map tilt on mouse move
  const mapContainer = document.getElementById('contact-map');
  
  mapContainer.addEventListener('mousemove', (e) => {
    const rect = mapContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    mapContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  mapContainer.addEventListener('mouseleave', () => {
    mapContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const btnIcon = document.querySelector('.btn-icon');
  const btnLoading = document.querySelector('.btn-loading');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    btnText.textContent = 'Sending...';
    btnIcon.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Send form data to Google Sheets using Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzVZhVYsxHQqUmigghQxm4A4uu-1k5P6KYPR6fYAkkWCvIz_lNkxcn2olZXdnRHC7XT/exec';
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('service', service);
    formData.append('message', message);
    formData.append('source', 'Contact Form');
    formData.append('recipient', 'esevai1996@gmail.com');
    
    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => {
        // Show success message
        formSuccess.style.display = 'flex';
        
        // Use GSAP for animation
        gsap.to(formSuccess, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Reset form
        contactForm.reset();
        
        // Reset button state after 2 seconds
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          btnIcon.style.display = 'inline-block';
          btnLoading.style.display = 'none';
          submitBtn.disabled = false;
        }, 2000);
      })
      .catch(error => {
        console.error('Error!', error.message);
        
        // Reset button state
        btnText.textContent = 'Send Message';
        btnIcon.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show error alert
        alert('Something went wrong. Please try again later.');
      });
    
    // Fallback: also send via EmailJS for reliability
    const templateParams = {
      from_name: name,
      reply_to: email,
      phone_number: phone,
      service_interest: service,
      message: message
    };
    
    emailjs.send('service_gg1dfyx', 'template_e3yk898', templateParams)
      .then(function(response) {
        console.log('EmailJS SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('EmailJS FAILED...', error);
      });
  });
  
  // Live chat widget
  const chatToggle = document.querySelector('.chat-toggle');
  const chatContainer = document.querySelector('.chat-container');
  const chatClose = document.querySelector('.chat-close');
  const chatInput = document.querySelector('.chat-input input');
  const chatSend = document.querySelector('.chat-send');
  const chatBody = document.querySelector('.chat-body');
  const chatBadge = document.querySelector('.chat-badge');
  
  // Toggle chat widget
  chatToggle.addEventListener('click', () => {
    chatContainer.classList.add('active');
    chatBadge.style.display = 'none';
    
    // Add entry animation
    gsap.fromTo(chatContainer, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  // Close chat widget
  chatClose.addEventListener('click', () => {
    gsap.to(chatContainer, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        chatContainer.classList.remove('active');
      }
    });
  });
  
  // Send message
  function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message !== '') {
      // Create user message
      const userMessage = document.createElement('div');
      userMessage.className = 'chat-message user';
      userMessage.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
          <p>${message}</p>
          <span class="message-time">Just now</span>
        </div>
      `;
      
      chatBody.appendChild(userMessage);
      chatInput.value = '';
      
      // Auto scroll to bottom
      chatBody.scrollTop = chatBody.scrollHeight;
      
      // Simulate agent response after 1 second
      setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'chat-message agent';
        agentMessage.innerHTML = `
          <div class="message-avatar">
            <i class="fas fa-headset"></i>
          </div>
          <div class="message-content">
            <p>Thank you for reaching out! Our support team will contact you shortly. For immediate assistance, please call our support line at +91 6382583636.</p>
            <span class="message-time">Just now</span>
          </div>
        `;
        
        chatBody.appendChild(agentMessage);
        
        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1000);
    }
  }
  
  chatSend.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add custom CSS for map markers
  const customCSS = `
    .custom-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .office-marker {
      background: #4F46E5;
      border-radius: 50%;
      width: 40px !important;
      height: 40px !important;
      box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
    }
    
    .location-marker {
      background: #10B981;
      border-radius: 50%;
      width: 30px !important;
      height: 30px !important;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }
    
    .custom-marker i {
      font-size: 16px;
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = customCSS;
  document.head.appendChild(styleElement);
});
