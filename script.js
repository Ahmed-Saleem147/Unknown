/* ============================================
   UNKNOWN FC — MAIN JAVASCRIPT
   ============================================ */

// ============================================
// DYNAMIC CONTENT — reads from localStorage
// (managed via admin.html)
// ============================================
(function loadDynamicContent() {
  function getData(key, fallback) {
    try { const r = localStorage.getItem('ufc_' + key); return r ? JSON.parse(r) : fallback; }
    catch { return fallback; }
  }

  // --- NEWS ---
  const newsEl = document.getElementById('dynamic-news');
  if (newsEl) {
    const news = getData('news', []);
    if (news.length > 0) {
      newsEl.innerHTML = news.slice(0, 4).map(n => {
        const d = new Date(n.date);
        const dateStr = isNaN(d) ? n.date : d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
        return `<div class="news-item">
          <div class="news-date"><i class="fas fa-calendar-alt"></i> ${dateStr}</div>
          <h4><a href="#">${n.title}</a></h4>
          <p>${n.excerpt}</p>
        </div>`;
      }).join('');
    }
  }

  // --- SQUAD ---
  const squadEl = document.getElementById('dynamic-squad');
  if (squadEl) {
    const DEFAULT_SQUAD = [
      { name: 'Andy Johnfiah',       photo: '' },
      { name: 'Lord Ayamga',         photo: '' },
      { name: 'Thomas Partey',       photo: '' },
      { name: 'Prince Bonney',       photo: '' },
      { name: 'Gilbert Selasi',      photo: '' },
      { name: 'André Lamar Ayebo',   photo: '' },
      { name: 'Asiedu Samuel',       photo: '' },
      { name: 'Divassa Amartey',     photo: '' },
      { name: 'Agala Derick Kwame',  photo: '' },
      { name: 'Luqman Said',         photo: '' },
      { name: 'Frank Arhin Issachar',photo: '' },
      { name: 'Abdul Sadat Smart',   photo: '' },
      { name: 'Ahmed Saleem',        photo: '' },
      { name: 'Godson Emmanuel',     photo: '' },
      { name: 'Benjamin Nii Odai',   photo: '' },
      { name: 'Kumi Francis',        photo: '' },
      { name: 'Jakes Kyei',          photo: '' },
      { name: 'Abdul Majeed Idrissa',photo: '' },
      { name: 'Lumor Drachma',       photo: '' },
    ];
    const squad = getData('squad', DEFAULT_SQUAD);
    if (squad.length > 0) {
      squadEl.innerHTML = squad.map((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        return `<div class="player-card reveal">
          <div class="player-number">${num}</div>
          <div class="player-info">
            <h4>${p.name}</h4>
            <span class="player-pos">Player</span>
          </div>
        </div>`;
      }).join('');
    }
  }

  // --- FIXTURES ---
  const fixEl = document.getElementById('dynamic-fixtures');
  if (fixEl) {
    const fixtures = getData('fixtures', []);
    if (fixtures.length > 0) {
      fixEl.innerHTML = fixtures.map(f => {
        const isPast = f.status !== 'upcoming';
        const vsClass = isPast ? 'fixture-vs score' : 'fixture-vs';
        const vsContent = isPast && f.score ? f.score : 'VS';
        const statusLabel = f.status === 'upcoming' ? 'Upcoming'
          : f.status.charAt(0).toUpperCase() + f.status.slice(1);
        return `<div class="fixture-item ${isPast ? 'past' : ''} reveal">
          <div class="fixture-date">
            <span class="fix-day">${f.day}</span>
            <span class="fix-month">${f.month}</span>
          </div>
          <div class="fixture-teams">
            <span class="home-team">${f.homeTeam}</span>
            <div class="${vsClass}"><span>${vsContent}</span></div>
            <span class="away-team">${f.awayTeam}</span>
          </div>
          <div class="fixture-info">
            <span><i class="fas fa-clock"></i> ${f.time}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${f.venue}</span>
          </div>
          <div class="fixture-status ${f.status}">${statusLabel}</div>
        </div>`;
      }).join('');
    }
  }

  // --- SPONSORS ---
  const sponsorsEl = document.getElementById('dynamic-sponsors');
  if (sponsorsEl) {
    const sponsors = getData('sponsors', []);
    if (sponsors.length > 0) {
      // Duplicate for seamless loop
      const doubled = [...sponsors, ...sponsors];
      sponsorsEl.innerHTML = doubled.map(s =>
        `<div class="swiper-slide sponsor-slide"><div class="sponsor-logo">${s.name}</div></div>`
      ).join('');
    }
  }

  // --- GALLERY ---
  const galleryEl = document.getElementById('dynamic-gallery');
  if (galleryEl) {
    const DEFAULT_GALLERY = [
      'photo1.jpeg','photo2.jpeg','photo3.jpeg','photo12.jpeg','photo13.jpeg',
      'photo14.jpeg','photo4.jpeg','photo15.jpeg','photo16.jpeg','photo5.jpeg',
      'photo17.jpeg','photo18.jpeg','photo6.jpeg','photo19.jpeg','photo20.jpeg',
      'photo7.jpeg','photo21.jpeg','photo8.jpeg','photo22.jpeg','photo9.jpeg',
      'photo10.jpeg','photo23.jpeg','photo11.jpeg'
    ].map((src, i) => ({ id: i + 1, src }));

    const gallery = getData('gallery', DEFAULT_GALLERY);
    galleryEl.innerHTML = gallery.map((item, i) => {
      const large = i % 3 === 1 ? ' gallery-large' : '';
      return `<div class="gallery-item${large} reveal">
        <img src="${item.src}" alt="Unknown FC" />
        <div class="gallery-overlay"><i class="fas fa-expand"></i></div>
      </div>`;
    }).join('');
  }

  // --- CONTACT ---
  const contactEl = document.getElementById('dynamic-contact');
  if (contactEl) {
    const s = getData('settings', {
      phone1: '020 912 6842', phone2: '053 774 8210',
      email: 'unknownfootballclub7@gmail.com',
      instagram: 'unknownfcboys', tiktok: 'unknownfcboys'
    });
    contactEl.innerHTML = `
      <h3>Reach Us Directly</h3>
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-phone"></i></div>
        <div>
          <strong>Phone Numbers</strong>
          <p>${s.phone1 || ''}</p>
          <p>${s.phone2 || ''}</p>
        </div>
      </div>
      ${s.email ? `<div class="contact-item">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <div>
          <strong>Email</strong>
          <p><a href="mailto:${s.email}">${s.email}</a></p>
        </div>
      </div>` : ''}
      <div class="contact-item">
        <div class="contact-icon"><i class="fab fa-instagram"></i></div>
        <div>
          <strong>Instagram</strong>
          <p><a href="https://www.instagram.com/${s.instagram}" target="_blank">@${s.instagram}</a></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon"><i class="fab fa-tiktok"></i></div>
        <div>
          <strong>TikTok</strong>
          <p><a href="https://www.tiktok.com/@${s.tiktok}" target="_blank">@${s.tiktok}</a></p>
        </div>
      </div>
      <div class="contact-socials">
        <a href="https://www.instagram.com/${s.instagram}" target="_blank" class="social-btn"><i class="fab fa-instagram"></i></a>
        <a href="https://www.tiktok.com/@${s.tiktok}" target="_blank" class="social-btn"><i class="fab fa-tiktok"></i></a>
        <a href="mailto:${s.email || ''}" class="social-btn"><i class="fas fa-envelope"></i></a>
        <a href="tel:${(s.phone1 || '').replace(/\s/g,'')}" class="social-btn"><i class="fas fa-phone"></i></a>
      </div>
    `;

    // Update footer contact info too
    const footerInfo = document.getElementById('footer-contact-info');
    if (footerInfo) {
      footerInfo.innerHTML = `
        <p><i class="fas fa-phone"></i> ${s.phone1 || ''}</p>
        <p><i class="fas fa-phone"></i> ${s.phone2 || ''}</p>
        ${s.email ? `<p><i class="fas fa-envelope"></i> ${s.email}</p>` : ''}
        <p><i class="fab fa-instagram"></i> @${s.instagram}</p>
        <p><i class="fab fa-tiktok"></i> @${s.tiktok}</p>
      `;
    }
  }
})();

// ---- NAVBAR: Solid on scroll ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link on scroll
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  // Back to top
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// Dropdown toggle on mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.querySelector('.nav-link').addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
});

// ---- HERO SLIDER (Swiper) ----
const heroSwiper = new Swiper('.hero-slider', {
  loop: true,
  speed: 900,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: 'fade',
  fadeEffect: { crossFade: true },
  pagination: {
    el: '.hero-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.hero-next',
    prevEl: '.hero-prev',
  },
});

// ---- SPONSORS SLIDER ----
new Swiper('.sponsors-slider', {
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  slidesPerView: 'auto',
  spaceBetween: 40,
  freeMode: true,
  breakpoints: {
    320:  { slidesPerView: 2 },
    640:  { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- BACK TO TOP ----
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- LIGHTBOX ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;
const galleryImages = [];

// Bind to dynamically rendered gallery items
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  const img = item.querySelector('img');
  if (img) galleryImages.push({ src: img.src, alt: img.alt });

  item.addEventListener('click', () => {
    currentGalleryIndex = i;
    openLightbox(i);
  });
});

function openLightbox(index) {
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

lightboxNext.addEventListener('click', () => {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  openLightbox(currentGalleryIndex);
});

lightboxPrev.addEventListener('click', () => {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentGalleryIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNext.click();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
});

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#39ff14';
    btn.style.color = '#000';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ---- PARALLAX on CTA section ----
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  window.addEventListener('scroll', () => {
    const rect = ctaSection.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.08;
    ctaSection.style.backgroundPositionY = `calc(50% + ${offset}px)`;
  });
}

// ---- TICKER duplicate for seamless loop ----
(function() {
  const ticker = document.querySelector('.ticker-inner');
  if (ticker) {
    const clone = ticker.cloneNode(true);
    ticker.parentElement.appendChild(clone);
  }
})();

console.log('%c⚽ UNKNOWN FC — We Live This Game', 'color:#ff6a00;font-size:18px;font-weight:bold;font-family:monospace;');
