// Form Validation - Validate contact form and handle submission

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const saveDraftBtn = document.getElementById('saveDraft');
  const formMessage = document.getElementById('formMessage');
  const draftKey = 'contact_form_draft_v1';

  if(!contactForm) return;

  // Load saved draft on page load
  const savedDraft = JSON.parse(localStorage.getItem(draftKey) || '{}');
  if(savedDraft.name) document.getElementById('name').value = savedDraft.name;
  if(savedDraft.email) document.getElementById('email').value = savedDraft.email;
  if(savedDraft.message) document.getElementById('message').value = savedDraft.message;

  // Save draft functionality
  saveDraftBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const draft = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
    showMessage('Draft saved locally!', 'success');
  });

  // Form validation
  function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Name validation
    if(!name.value.trim()) {
      showError('name', 'Name is required');
      isValid = false;
    } else if(name.value.trim().length < 2) {
      showError('name', 'Name must be at least 2 characters');
      isValid = false;
    }

    // Email validation
    if(!email.value.trim()) {
      showError('email', 'Email is required');
      isValid = false;
    } else if(!isValidEmail(email.value)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Message validation
    if(!message.value.trim()) {
      showError('message', 'Message is required');
      isValid = false;
    } else if(message.value.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    return isValid;
  }

  // Email validation regex
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show error message
  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if(errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      errorElement.setAttribute('aria-hidden', 'false');
    }

    const field = document.getElementById(fieldId);
    if(field) {
      field.classList.add('error-field');
    }
  }

  // Clear all errors
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('input, textarea').forEach(el => {
      el.classList.remove('error-field');
    });
  }

  // Show form message
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message show ' + type;
    formMessage.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      formMessage.classList.remove('show');
      formMessage.setAttribute('aria-hidden', 'true');
    }, 4000);
  }

  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    if(!validateForm()) {
      showMessage('Please correct the errors above.', 'error');
      return;
    }

    // Prepare form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    // For now, we'll show a success message
    // In production, you would send this to a backend service or use a service like Formspree
    showMessage('✓ Thank you! Your message has been received. I will get back to you within 24 hours.', 'success');

    // Save to localStorage for demonstration
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));

    // Clear draft
    localStorage.removeItem(draftKey);

    // Reset form
    contactForm.reset();
    clearErrors();

    // Log for debugging
    console.log('Form submitted:', formData);

    // Optional: Send to backend
    // await sendToBackend(formData);
  });

  // Real-time validation
  document.getElementById('name').addEventListener('blur', () => {
    const name = document.getElementById('name').value;
    if(name && name.trim().length < 2) {
      showError('name', 'Name must be at least 2 characters');
    } else {
      clearFieldError('name');
    }
  });

  document.getElementById('email').addEventListener('blur', () => {
    const email = document.getElementById('email').value;
    if(email && !isValidEmail(email)) {
      showError('email', 'Please enter a valid email address');
    } else {
      clearFieldError('email');
    }
  });

  document.getElementById('message').addEventListener('blur', () => {
    const message = document.getElementById('message').value;
    if(message && message.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters');
    } else {
      clearFieldError('message');
    }
  });

  // Clear single field error
  function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    if(errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      errorElement.setAttribute('aria-hidden', 'true');
    }

    const field = document.getElementById(fieldId);
    if(field) {
      field.classList.remove('error-field');
    }
  }

  // Optional: Send data to a backend service
  async function sendToBackend(data) {
    try {
      // Replace with your actual backend endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if(response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch(error) {
      console.error('Error submitting form:', error);
    }
  }
});
