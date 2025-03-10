<!DOCTYPE html>
<html>
<head>
  <title>Services Page</title>
  <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
    }

    .service-detail {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }

    .service-detail.active {
      max-height: 2000px; /* Adjust as needed */
    }

    .service-content {
      padding: 20px;
    }

    .other-location {
      display: none;
    }

    .result-available {
      color: green;
    }

    .result-unavailable {
      color: red;
    }
  </style>
</head>
<body>
  <div class="services-page">
    <!--Add your services page content here-->
    <div class="detailed-services">
      <div class="service-detail">
        <div class="service-header">Service 1</div>
        <div class="service-content">
          <!--Add service 1 details here-->
        </div>
      </div>
      <div class="service-detail">
        <div class="service-header">Service 2</div>
        <div class="service-content">
          <!--Add service 2 details here-->
        </div>
      </div>
      <!--Add other services-->
    </div>

    <div class="calculator-section">
      <div class="calculator-container">
        <label for="location">Select Your Location:</label>
        <select id="location">
          <option value="">Select</option>
          <option value="inside">Inside Service Area</option>
          <option value="outside">Outside Service Area</option>
          <option value="other">Other</option>
        </select>
        <input type="text" id="other-location" class="other-location" placeholder="Enter your location">
        <button id="check-availability">Check Availability</button>
        <div id="result-message"></div>
      </div>
    </div>
    
    <div class="rfp-section">
      <form id="rfp-form">
        <h2>Request for Proposal (RFP)</h2>
        <label for="company-name">Company Name:</label>
        <input type="text" id="company-name" required><br><br>

        <label for="contact-person">Contact Person:</label>
        <input type="text" id="contact-person" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" required><br><br>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" required><br><br>

        <label for="business-type">Business Type:</label>
        <input type="text" id="business-type" required><br><br>

        <label>Services of Interest:</label><br>
        <input type="checkbox" name="service-interest" value="Service 1">Service 1<br>
        <input type="checkbox" name="service-interest" value="Service 2">Service 2<br>
        <!--Add other services-->
        <br>

        <label for="project-details">Project Details:</label><br>
        <textarea id="project-details" rows="4" cols="50" required></textarea><br><br>

        <label for="timeline">Timeline:</label>
        <input type="text" id="timeline" required><br><br>

        <label for="budget-range">Budget:</label>
        <input type="text" id="budget-range" required><br><br>

        <button type="submit">Submit RFP</button>
      </form>
    </div>
  </div>


  <script>
    // Services Page Specific Scripts
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize emailjs
      emailjs.init("user_AJN8xP4WwmNIplcnGJKrl"); // Replace with your actual EmailJS user ID

      // Toggle service detail sections
      const serviceDetails = document.querySelectorAll('.service-detail');

      serviceDetails.forEach(detail => {
        const header = detail.querySelector('.service-header');

        header.addEventListener('click', () => {
          // Toggle active class
          detail.classList.toggle('active');

          // Animate content
          const content = detail.querySelector('.service-content');
          if (detail.classList.contains('active')) {
            gsap.to(content, {
              maxHeight: 2000,
              duration: 0.5,
              ease: 'power2.out'
            });
          } else {
            gsap.to(content, {
              maxHeight: 0,
              duration: 0.5,
              ease: 'power2.in'
            });
          }
        });
      });

      // Location calculator
      const locationSelect = document.getElementById('location');
      const otherLocation = document.querySelector('.other-location');
      const checkAvailability = document.getElementById('check-availability');
      const resultMessage = document.getElementById('result-message');

      locationSelect.addEventListener('change', function() {
        if (this.value === 'other') {
          otherLocation.style.display = 'block';
        } else {
          otherLocation.style.display = 'none';
        }
      });

      checkAvailability.addEventListener('click', function() {
        const selectedValue = locationSelect.value;

        if (selectedValue === '') {
          resultMessage.innerHTML = '<p>Please select your location to check service availability.</p>';
          return;
        }

        if (selectedValue === 'inside') {
          resultMessage.innerHTML = '<p><span class="result-available">Service Available!</span> We provide IT support services in your area. Contact us for details.</p>';
        } else if (selectedValue === 'outside') {
          resultMessage.innerHTML = '<p><span class="result-unavailable">Outside Service Area</span> Your location is outside our primary service area, but we may still be able to help. Please contact us for special arrangements.</p>';
        } else if (selectedValue === 'other') {
          const location = document.getElementById('other-location').value;
          if (location === '') {
            resultMessage.innerHTML = '<p>Please enter your location.</p>';
          } else {
            resultMessage.innerHTML = '<p>We will check if we can provide service in <strong>' + location + '</strong>. Please contact our team for confirmation.</p>';
          }
        }

        // Animate the result
        gsap.from(resultMessage, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // RFP Form Submission
      const rfpForm = document.getElementById('rfp-form');

      rfpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = rfpForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Get form data
        const company = document.getElementById('company-name').value;
        const contact = document.getElementById('contact-person').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const businessType = document.getElementById('business-type').value;
        const services = Array.from(rfpForm.querySelectorAll('input[name="service-interest"]:checked'))
          .map(checkbox => checkbox.value)
          .join(', ');
        const details = document.getElementById('project-details').value;
        const timeline = document.getElementById('timeline').value;
        const budget = document.getElementById('budget-range').value;

        // Send form data to Google Sheets using Google Apps Script
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzVZhVYsxHQqUmigghQxm4A4uu-1k5P6KYPR6fYAkkWCvIz_lNkxcn2olZXdnRHC7XT/exec';
        
        const formData = new FormData();
        formData.append('name', company);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('business_type', businessType);
        formData.append('services', services);
        formData.append('details', details);
        formData.append('timeline', timeline);
        formData.append('budget', budget);
        formData.append('source', 'RFP Form');
        formData.append('recipient', 'esevai1996@gmail.com');
        
        fetch(scriptURL, { method: 'POST', body: formData })
          .then(response => {
            // Show success message
            const formSuccess = document.getElementById('rfp-success');
            formSuccess.style.display = 'flex';
            
            // Use GSAP for animation
            gsap.to(formSuccess, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
            
            // Reset form
            rfpForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          })
          .catch(error => {
            console.error('Error!', error.message);
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show error alert
            alert('Something went wrong. Please try again later.');
          });

        const formData = new FormData();
        formData.append('company', company);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('businessType', businessType);
        formData.append('services', services);
        formData.append('details', details);
        formData.append('timeline', timeline);
        formData.append('budget', budget);
        formData.append('source', 'RFP Form');
        formData.append('recipient', 'esevai1996@gmail.com');

        fetch(scriptURL, { method: 'POST', body: formData })
          .then(response => {
            // Show success message
            alert('Your RFP has been submitted successfully! We will review your requirements and get back to you shortly.');

            // Reset form
            rfpForm.reset();

            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          })
          .catch(error => {
            console.error('Error!', error.message);

            // Show error alert
            alert('Something went wrong. Please try again later.');

            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          });

        // Fallback: also send via EmailJS for reliability
        const templateParams = {
          company_name: company,
          contact_person: contact,
          reply_to: email,
          phone_number: phone,
          business_type: businessType,
          services_interest: services,
          project_details: details,
          timeline: timeline,
          budget: budget
        };

        emailjs.send('service_gg1dfyx', 'template_e3yk898', templateParams)
          .then(function(response) {
            console.log('EmailJS SUCCESS!', response.status, response.text);
          }, function(error) {
            console.log('EmailJS FAILED...', error);
          });
      });

      // GSAP animations for the page
      gsap.registerPlugin(ScrollTrigger);

      // Animate service details
      gsap.from('.service-detail', {
        scrollTrigger: {
          trigger: '.detailed-services',
          start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Animate comparison table
      gsap.from('.comparison-table tr', {
        scrollTrigger: {
          trigger: '.comparison-table',
          start: 'top 80%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Animate calculator section
      gsap.from('.calculator-container', {
        scrollTrigger: {
          trigger: '.calculator-section',
          start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Animate RFP form
      gsap.from('.rfp-form', {
        scrollTrigger: {
          trigger: '.rfp-section',
          start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  </script>
</body>
</html>