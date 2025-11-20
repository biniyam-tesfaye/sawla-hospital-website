// Sticky navbar & parallax hero background
const navbar = document.getElementById('navbar');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 10);
  }
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
});

// Mobile navigation toggling
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
const themeLabel = themeToggle ? themeToggle.querySelector('.theme-label') : null;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
    }
  });
}

// Theme switching
const userStoredTheme = localStorage.getItem('sawla-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = userStoredTheme || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  if (themeIcon && themeLabel) {
    if (theme === 'dark') {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark';
    } else {
      themeIcon.textContent = '🌞';
      themeLabel.textContent = 'Light';
    }
  }
  localStorage.setItem('sawla-theme', theme);
}

applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Intersection Observer for scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

// Animated counters on hero
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute('data-target')) || 0;
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      current = Math.floor(target * progress);
      counter.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  });
}

window.addEventListener('load', animateCounters);

// Testimonials slider
const slider = document.getElementById('testimonialSlider');
if (slider) {
  const cards = slider.querySelectorAll('.testimonial-card');
  const dots = slider.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  let intervalId;

  function showSlide(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % cards.length;
    showSlide(nextIndex);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = Number(dot.getAttribute('data-slide')) || 0;
      showSlide(slide);
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(nextSlide, 7000);
    });
  });

  intervalId = setInterval(nextSlide, 7000);
}

// Accordion behaviour on Services page
document.querySelectorAll('.accordion-card').forEach((card) => {
  const header = card.querySelector('.accordion-header');
  const body = card.querySelector('.accordion-body');
  if (!header || !body) return;

  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('.accordion-card.open').forEach((other) => {
      other.classList.remove('open');
      const otherBody = other.querySelector('.accordion-body');
      if (otherBody) otherBody.style.maxHeight = null;
    });
    if (!isOpen) {
      card.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Contact form submission with basic validation
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactMessage.textContent = '';
    contactMessage.className = 'form-message';

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.name || !payload.email || !payload.message) {
      contactMessage.textContent = 'Please fill in all required fields.';
      contactMessage.classList.add('error');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        contactMessage.textContent = data.message || 'Message sent successfully.';
        contactMessage.classList.add('success');
        contactForm.reset();
      } else {
        contactMessage.textContent = data.message || 'Something went wrong. Please try again.';
        contactMessage.classList.add('error');
      }
    } catch (err) {
      contactMessage.textContent = 'Unable to send message at this time. Please try again later.';
      contactMessage.classList.add('error');
    }
  });
}

// Appointment form submission
const appointmentForm = document.getElementById('appointmentForm');
const appointmentMessage = document.getElementById('appointmentMessage');

if (appointmentForm && appointmentMessage) {
  appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    appointmentMessage.textContent = '';
    appointmentMessage.className = 'form-message';

    const formData = new FormData(appointmentForm);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.name || !payload.phone || !payload.date || !payload.department) {
      appointmentMessage.textContent = 'Please fill in all required fields.';
      appointmentMessage.classList.add('error');
      return;
    }

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        appointmentMessage.textContent = data.message || 'Appointment request submitted.';
        appointmentMessage.classList.add('success');
        appointmentForm.reset();
      } else {
        appointmentMessage.textContent = data.message || 'Unable to submit appointment.';
        appointmentMessage.classList.add('error');
      }
    } catch (err) {
      appointmentMessage.textContent = 'Unable to submit appointment at this time.';
      appointmentMessage.classList.add('error');
    }
  });
}

// Load doctors into About page grid and appointment select
async function loadDoctors() {
  try {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data)) return;

    const doctors = data.data;
    const doctorGrid = document.getElementById('doctorGrid');
    const apDoctorSelect = document.getElementById('apDoctor');

    if (doctorGrid) {
      doctorGrid.innerHTML = '';
      doctors.forEach((doc) => {
        const photo = doc.photo || '/images/doctors/placeholder.svg';
        const card = document.createElement('article');
        card.className = 'card doctor-card fade-in-up';
        card.innerHTML = `
          <div class="doctor-photo">
            <img src="${photo}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null;this.src='/images/doctors/placeholder.jpg';" />
          </div>
          <div class="doctor-body">
            <h3>${doc.name}</h3>
            <p class="doctor-meta">${doc.specialty} • ${doc.department}</p>
            <p>${doc.bio}</p>
            <p class="doctor-meta">Experience: ${doc.experience}</p>
          </div>
        `;
        doctorGrid.appendChild(card);
        observer.observe(card);
      });
    }

    if (apDoctorSelect) {
      doctors.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.name;
        option.textContent = doc.name;
        apDoctorSelect.appendChild(option);
      });
    }
  } catch (err) {
    // Silent fail to keep UI smooth
  }
}

window.addEventListener('load', loadDoctors);

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


