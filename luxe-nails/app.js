// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Scroll top ──
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Counter animation ──
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-n').forEach(el => counterObserver.observe(el));

// ── Reveal on scroll ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Gallery filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const galItems = document.querySelectorAll('.gal-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

// ── Testimonials slider ──
const track = document.getElementById('testiTrack');
const dotsContainer = document.getElementById('testiDots');
const cards = track.querySelectorAll('.testi-card');
let activeDot = 0;

cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => scrollToCard(i));
  dotsContainer.appendChild(dot);
});

function scrollToCard(index) {
  const card = cards[index];
  track.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
  dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
  activeDot = index;
}

track.addEventListener('scroll', () => {
  const scrollLeft = track.scrollLeft;
  let closest = 0;
  cards.forEach((card, i) => {
    if (Math.abs(card.offsetLeft - scrollLeft - 16) < Math.abs(cards[closest].offsetLeft - scrollLeft - 16)) closest = i;
  });
  if (closest !== activeDot) {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === closest));
    activeDot = closest;
  }
});

// Auto-scroll testimonials
let autoSlide = setInterval(() => {
  const next = (activeDot + 1) % cards.length;
  scrollToCard(next);
}, 4000);
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    scrollToCard((activeDot + 1) % cards.length);
  }, 4000);
});

// ── Booking form ──
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Confirm Booking ✦';
    btn.disabled = false;
    success.classList.add('show');
    this.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
});

// ── Set min date on date input ──
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}
