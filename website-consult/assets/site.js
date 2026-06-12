const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$('#year') && ($('#year').textContent = new Date().getFullYear());

const menu = $('.menu'), links = $('.links');
if (menu && links) menu.onclick = () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
};

const animated = $$('.section, .card, .panel, .price, .review, .flow > *');
animated.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: .12 });
  animated.forEach(el => io.observe(el));
} else animated.forEach(el => el.classList.add('show'));

const form = $('#reviewForm'), list = $('#reviewList'), count = $('#reviewCount');
const clean = text => String(text || '').replace(/[<>]/g, '');
const updateCount = () => {
  if (list && count) count.textContent = `${list.querySelectorAll('[data-review]').length} review${list.querySelectorAll('[data-review]').length === 1 ? '' : 's'}`;
};
updateCount();
if (form && list) form.onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  $('.empty', list)?.remove();
  list.insertAdjacentHTML('afterbegin', `<article class="review show" data-review><blockquote>“${clean(data.message)}”</blockquote><p><strong>${clean(data.name)}</strong> · ${clean(data.domain)} · ${clean(data.service)}</p><p class="muted">Local preview. Add approved reviews into the page HTML.</p></article>`);
  updateCount();
  location.href = `mailto:you@example.com?subject=${encodeURIComponent('Navigating Uncertainty review submission')}&body=${encodeURIComponent(`Name: ${data.name}\nDomain: ${data.domain}\nService: ${data.service}\nReview:\n${data.message}`)}`;
  form.reset();
};
