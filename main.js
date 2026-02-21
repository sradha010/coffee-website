import './style.css'

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

const animateElements = document.querySelectorAll('.product-card, .featured-card, .testimonial-card');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  const submitButton = contactForm.querySelector('.submit-button');
  const originalText = submitButton.innerHTML;

  submitButton.innerHTML = '<span>Booking...</span>';
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.innerHTML = '<span>Reservation Confirmed!</span>';
    submitButton.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

    setTimeout(() => {
      contactForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';

      alert(`Thank you for your reservation, ${data.name}! We'll contact you at ${data.email} to confirm your booking for ${data.guests} guest(s) on ${data.date} at ${data.time}.`);
    }, 2000);
  }, 1500);
});

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  const viewDetailsBtn = card.querySelector('.view-details');

  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productName = card.querySelector('h3').textContent;
      const productPrice = card.querySelector('.price').textContent;
      alert(`${productName}\nPrice: ${productPrice}\n\nThis feature would typically open a detailed product modal with more information, ingredients, and customization options.`);
    });
  }
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

window.addEventListener('load', () => {
  document.body.style.overflow = 'visible';
});
