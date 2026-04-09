/* ============================================
   UNKNOWN FC — MAIN JAVASCRIPT
   ============================================ */

// ============================================
// DYNAMIC CONTENT — fetched from JSONBin cloud
// Changes made via admin.html reflect for ALL visitors
// ============================================
const BIN_URL = 'https://api.jsonbin.io/v3/b/69d79ea4856a682189157ecc';
const API_KEY = '$2a$10$mFthzZ19pT0VhpeaTHHuyunfhhSVek9Pl8rigpyH7tlCiSSkaGhl.';

const DEFAULT_NEWS = [
  { id:1, date:'2026-03-28', title:'Unknown FC Dominates in Latest 5-A-Side Tournament', excerpt:'The squad showed incredible form, with outstanding performances from multiple players across the pitch.' },
  { id:2, date:'2026-03-15', title:'New Training Regime Kicks Off This Season', excerpt:'Coaching staff unveil new tactical approaches ahead of the upcoming fixtures and competitions.' },
  { id:3, date:'2026-03-02', title:'Squad Photo Shoot — Behind The Scenes', excerpt:'Check out exclusive behind-the-scenes moments from our latest team photoshoot.' },
  { id:4, date:'2026-02-18', title:'Unknown FC Officially on Instagram & TikTok', excerpt:'Follow us @unknownfcboys for exclusive content, match highlights and more.' },
];
const DEFAULT_FIXTURES = [
  { id:1, day:'15', month:'APR', homeTeam:'Unknown FC', awayTeam:'Rivals XI',    time:'15:00 GMT', venue:'Home Ground', status:'upcoming', score:'' },
  { id:2, day:'22', month:'APR', homeTeam:'City United', awayTeam:'Unknown FC',  time:'16:00 GMT', venue:'Away',        status:'upcoming', score:'' },
  { id:3, day:'29', month:'APR', homeTeam:'Unknown FC', awayTeam:'Thunder Boys', time:'14:30 GMT', venue:'Home Ground', status:'upcoming', score:'' },
  { id:4, day:'28', month:'MAR', homeTeam:'Unknown FC', awayTeam:'East Side FC', time:'Full Time', venue:'Home Ground', status:'win',      score:'3 - 1' },
];
const DEFAULT_SQUAD = [
  { id:1,  number:'01', name:'Andy Johnfiah',        position:'Player', photo:'' },
  { id:2,  number:'02', name:'Lord Ayamga',           position:'Player', photo:'' },
  { id:3,  number:'03', name:'Thomas Partey',         position:'Player', photo:'' },
  { id:4,  number:'04', name:'Prince Bonney',         position:'Player', photo:'' },
  { id:5,  number:'05', name:'Gilbert Selasi',        position:'Player', photo:'' },
  { id:6,  number:'06', name:'André Lamar Ayebo',     position:'Player', photo:'' },
  { id:7,  number:'07', name:'Asiedu Samuel',         position:'Player', photo:'' },
  { id:8,  number:'08', name:'Divassa Amartey',       position:'Player', photo:'' },
  { id:9,  number:'09', name:'Agala Derick Kwame',    position:'Player', photo:'' },
  { id:10, number:'10', name:'Luqman Said',           position:'Player', photo:'' },
  { id:11, number:'11', name:'Frank Arhin Issachar',  position:'Player', photo:'' },
  { id:12, number:'12', name:'Abdul Sadat Smart',     position:'Player', photo:'' },
  { id:13, number:'13', name:'Ahmed Saleem',          position:'Player', photo:'' },
  { id:14, number:'14', name:'Godson Emmanuel',       position:'Player', photo:'' },
  { id:15, number:'15', name:'Benjamin Nii Odai',     position:'Player', photo:'' },
  { id:16, number:'16', name:'Kumi Francis',          position:'Player', photo:'' },
  { id:17, number:'17', name:'Jakes Kyei',            position:'Player', photo:'' },
  { id:18, number:'18', name:'Abdul Majeed Idrissa',  position:'Player', photo:'' },
  { id:19, number:'19', name:'Lumor Drachma',         position:'Player', photo:'' },
];
const DEFAULT_GALLERY = [
  'photo1.jpeg','photo2.jpeg','photo3.jpeg','photo12.jpeg','photo13.jpeg',
  'photo14.jpeg','photo4.jpeg','photo15.jpeg','photo16.jpeg','photo5.jpeg',
  'photo17.jpeg','photo18.jpeg','photo6.jpeg','photo19.jpeg','photo20.jpeg',
  'photo7.jpeg','photo21.jpeg','photo8.jpeg','photo22.jpeg','photo9.jpeg',
  'photo10.jpeg','photo23.jpeg','photo11.jpeg'
].map((src, i) => ({ id: i + 1, src }));
const DEFAULT_SETTINGS = {
  phone1:'020 912 6842', phone2:'053 774 8210',
  email:'unknownfootballclub7@gmail.com',
  instagram:'unknownfcboys', tiktok:'unknownfcboys'
};
const DEFAULT_SPONSORS = [
  { id:1, name:'Kenniz Travel & Tour' },
  { id:2, name:'The 13th' },
  { id:3, name:'Accra by Air' },
];

async function loadDynamicContent() {
  let d = {};
  try {
    const res = await fetch(BIN_URL, { headers: { 'X-Access-Key': API_KEY } });
    if (res.ok) d = (await res.json()).record || {};
  } catch (e) { /* use defaults */ }

  const news     = d.news     || DEFAULT_NEWS;
  const squad    = d.squad    || DEFAULT_SQUAD;
  const fixtures = d.fixtures || DEFAULT_FIXTURES;
  const sponsors = d.sponsors || DEFAULT_SPONSORS;
  const gallery  = d.gallery  || DEFAULT_GALLERY;
  const s        = d.settings || DEFAULT_SETTINGS;

  // --- NEWS ---
  const newsEl = document.getElementById('dynamic-news');
  if (newsEl && news.length > 0) {
    newsEl.innerHTML = news.slice(0, 4).map(n => {
      const dt = new Date(n.date);
      const dateStr = isNaN(dt) ? n.date : dt.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
      return `<div class="news-item">
        <div class="news-date"><i class="fas fa-calendar-alt"></i> ${dateStr}</div>
        <h4><a href="#">${n.title}</a></h4>
        <p>${n.excerpt}</p>
      </div>`;
    }).join('');
  }

  // --- SQUAD ---
  const squadEl = document.getElementById('dynamic-squad');
  if (squadEl && squad.length > 0) {
    squadEl.innerHTML = squad.map((p, i) => {
      const num = p.number || String(i + 1).padStart(2, '0');
      const hasPhoto = p.photo && p.photo.trim() !== '';
      return `<div class="player-card reveal">
        <div class="player-num-badge">${num}</div>
        <div class="player-avatar-wrap">
          ${hasPhoto
            ? `<img src="${p.photo}" alt="${p.name}" class="player-avatar-img" />`
            : `<div class="player-avatar-placeholder"><i class="fas fa-user"></i></div>`
          }
        </div>
        <div class="player-info">
          <h4>${p.name}</h4>
          <span class="player-pos">${p.position || 'Player'}</span>
        </div>
      </div>`;
    }).join('');
  }

  // --- FIXTURES ---
  const fixEl = document.getElementById('dynamic-fixtures');
  if (fixEl && fixtures.length > 0) {
    fixEl.innerHTML = fixtures.map(f => {
      const isPast = f.status !== 'upcoming';
      const vsContent = isPast && f.score ? f.score : 'VS';
      const statusLabel = f.status === 'upcoming' ? 'Upcoming' : f.status.charAt(0).toUpperCase() + f.status.slice(1);
      return `<div class="fixture-item ${isPast ? 'past' : ''} reveal">
        <div class="fixture-date">
          <span class="fix-day">${f.day}</span>
          <span class="fix-month">${f.month}</span>
        </div>
        <div class="fixture-teams">
          <span class="home-team">${f.homeTeam}</span>
          <div class="fixture-vs${isPast ? ' score' : ''}"><span>${vsContent}</span></div>
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

  // --- SPONSORS ---
  const sponsorsEl = document.getElementById('dynamic-sponsors');
  if (sponsorsEl && sponsors.length > 0) {
    const doubled = [...sponsors, ...sponsors];
    sponsorsEl.innerHTML = doubled.map(sp =>
      `<div class="swiper-slide sponsor-slide"><div class="sponsor-logo">${sp.name}</div></div>`
    ).join('');
  }

  // --- GALLERY ---
  const galleryEl = document.getElementById('dynamic-gallery');
  if (galleryEl && gallery.length > 0) {
    galleryEl.innerHTML = gallery.map((item, i) => {
      const large = i % 3 === 1 ? ' gallery-large' : '';
      return `<div class="gallery-item${large} reveal">
        <img src="${item.src}" alt="Unknown FC" />
        <div class="gallery-overlay"><i class="fas fa-expand"></i></div>
      </div>`;
    }).join('');
    // Rebind lightbox after gallery renders
    bindGallery();
  }

  // --- CONTACT ---
  const contactEl = document.getElementById('dynamic-contact');
  if (contactEl) {
    contactEl.innerHTML = `
      <h3>Reach Us Directly</h3>
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-phone"></i></div>
        <div><strong>Phone Numbers</strong><p>${s.phone1||''}</p><p>${s.phone2||''}</p></div>
      </div>
      ${s.email ? `<div class="contact-item">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <div><strong>Email</strong><p><a href="mailto:${s.email}">${s.email}</a></p></div>
      </div>` : ''}
      <div class="contact-item">
        <div class="contact-icon"><i class="fab fa-instagram"></i></div>
        <div><strong>Instagram</strong><p><a href="https://www.instagram.com/${s.instagram}" target="_blank">@${s.instagram}</a></p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon"><i class="fab fa-tiktok"></i></div>
        <div><strong>TikTok</strong><p><a href="https://www.tiktok.com/@${s.tiktok}" target="_blank">@${s.tiktok}</a></p></div>
      </div>
      <div class="contact-socials">
        <a href="https://www.instagram.com/${s.instagram}" target="_blank" class="social-btn"><i class="fab fa-instagram"></i></a>
        <a href="https://www.tiktok.com/@${s.tiktok}" target="_blank" class="social-btn"><i class="fab fa-tiktok"></i></a>
        <a href="mailto:${s.email||''}" class="social-btn"><i class="fas fa-envelope"></i></a>
        <a href="tel:${(s.phone1||'').replace(/\s/g,'')}" class="social-btn"><i class="fas fa-phone"></i></a>
      </div>`;
    const footerInfo = document.getElementById('footer-contact-info');
    if (footerInfo) {
      footerInfo.innerHTML = `
        <p><i class="fas fa-phone"></i> ${s.phone1||''}</p>
        <p><i class="fas fa-phone"></i> ${s.phone2||''}</p>
        ${s.email ? `<p><i class="fas fa-envelope"></i> ${s.email}</p>` : ''}
        <p><i class="fab fa-instagram"></i> @${s.instagram}</p>
        <p><i class="fab fa-tiktok"></i> @${s.tiktok}</p>`;
    }
  }

  // Re-run reveal observer on dynamically injected elements
  observeReveal();
}

loadDynamicContent();

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
function makeVisible(el) {
  el.style.opacity = '';
  el.style.transform = '';
  el.classList.add('visible');
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, i) => {
        setTimeout(() => makeVisible(el), i * 80);
      });
      makeVisible(entry.target);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

observeReveal();

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
let galleryImages = [];

function bindGallery() {
  galleryImages = [];
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) galleryImages.push({ src: img.src, alt: img.alt });
    item.addEventListener('click', () => {
      currentGalleryIndex = i;
      openLightbox(i);
    });
  });
}

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
