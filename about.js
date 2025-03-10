
// Init map when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Leaflet map
  const map = L.map('service-map').setView([11.5176, 79.3275], 9); // Centered near Virudhachalam

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Service locations with coordinates
  const locations = [
    {
      name: 'Virudhachalam (HQ)',
      coords: [11.5176, 79.3275],
      primary: true
    },
    {
      name: 'Pondicherry',
      coords: [11.9416, 79.8083]
    },
    {
      name: 'Villupuram',
      coords: [11.9401, 79.4861]
    },
    {
      name: 'Cuddalore',
      coords: [11.7639, 79.7686]
    },
    {
      name: 'Kallakurichi',
      coords: [11.7383, 78.9571]
    },
    {
      name: 'Chidambaram',
      coords: [11.3992, 79.6912]
    }
  ];

  // Store markers to access them later
  const markers = {};

  // Add markers for each location
  locations.forEach(location => {
    const markerOptions = location.primary 
      ? { 
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #4F46E5; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [20, 20]
          })
        }
      : {};
    
    const marker = L.marker(location.coords, markerOptions)
      .addTo(map)
      .bindPopup(`<b>${location.name}</b>`);
    
    markers[location.name] = marker;
  });

  // Draw service area polygon
  const serviceAreaPoints = [
    [11.9416, 79.8083], // Pondicherry
    [11.9401, 79.4861], // Villupuram
    [11.7383, 78.9571], // Kallakurichi
    [11.3992, 79.6912], // Chidambaram
    [11.7639, 79.7686]  // Cuddalore
  ];
  
  L.polygon(serviceAreaPoints, {
    color: '#4F46E5',
    fillColor: '#4F46E5',
    fillOpacity: 0.2,
    weight: 2
  }).addTo(map);

  // Make location items interactive
  const locationItems = document.querySelectorAll('.location-item');
  
  locationItems.forEach(item => {
    item.addEventListener('click', function() {
      const locationName = this.querySelector('span').textContent;
      const location = locations.find(loc => loc.name === locationName);
      
      if (location) {
        map.setView(location.coords, 12);
        markers[locationName].openPopup();
        
        // Toggle active class
        locationItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Set Virudhachalam as active by default
  locationItems[0].classList.add('active');
});

// Timeline scroll animations with GSAP
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      ease: 'power2.out',
      delay: i * 0.1
    });
  });
  
  // Animate team cards
  gsap.from('.team-card', {
    scrollTrigger: {
      trigger: '.team-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Animate certification cards
  gsap.from('.cert-card', {
    scrollTrigger: {
      trigger: '.certs-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power2.out'
  });
});

// Team bio hover effect
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
  const bio = card.querySelector('.bio');
  const originalText = bio.textContent;
  const expandedText = originalText + ' Specialized in cutting-edge technology solutions with a focus on customer satisfaction and technical excellence.';
  
  card.addEventListener('mouseenter', () => {
    bio.textContent = expandedText;
  });
  
  card.addEventListener('mouseleave', () => {
    bio.textContent = originalText;
  });
});
