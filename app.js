/*
  app.js
  - Staggered reveal (with small delay per element)
  - Skill bars animate
  - Portfolio filter
  - Lightbox
  - Button ripple
  - Parallax on profile photo
  - Tilt effect on portfolio items (mousemove)
  - Scrollspy and mobile nav
*/

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // close mobile nav on link click
  document.querySelectorAll('.nav-list a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('show');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Staggered reveal using IntersectionObserver
  const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // find index among siblings to compute delay for a nicer stagger
        const node = entry.target;
        const group = node.closest('.container') || document;
        const groupReveals = Array.from(group.querySelectorAll('[data-reveal]'));
        const idx = groupReveals.indexOf(node);
        const baseDelay = Math.min(0.06 * idx, 0.45); // cap delay
        node.style.transitionDelay = `${baseDelay}s`;
        node.classList.add('visible');
        revealObserver.unobserve(node);
      }
    });
  }, { threshold: 0.12 });

  revealNodes.forEach(n => revealObserver.observe(n));

  // Skill bars
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const level = parseInt(bar.dataset.level || '0', 10);
    const fill = bar.querySelector('.fill');
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          fill.style.width = `${level}%`;
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });
    barObs.observe(bar);
  });

  // Portfolio filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(it => {
      if (filter === 'all' || it.dataset.category === filter) {
        it.style.display = '';
        requestAnimationFrame(() => it.classList.remove('hidden'));
      } else {
        it.classList.add('hidden');
        setTimeout(() => it.style.display = 'none', 300);
      }
    });
  }));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbContent = lightbox?.querySelector('.lb-content');
  const lbClose = document.querySelector('.lb-close');

  function openLightbox(type, src, alt='') {
    if (!lightbox || !lbContent) return;
    lbContent.innerHTML = '';
    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src; img.alt = alt; img.style.width = '100%'; img.style.height = 'auto'; img.style.borderRadius = '12px';
      lbContent.appendChild(img);
    } else if (type === 'video') {
      const video = document.createElement('video');
      video.src = src; video.controls = true; video.autoplay = true; video.style.width = '100%';
      lbContent.appendChild(video);
    }
    lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox || !lbContent) return;
    lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden', 'true'); lbContent.innerHTML = ''; document.body.style.overflow = '';
  }

  document.querySelectorAll('.media-btn').forEach(btn => btn.addEventListener('click', () => {
    openLightbox(btn.dataset.type, btn.dataset.src, btn.getAttribute('aria-label') || '');
  }));
  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.classList.contains('show')) closeLightbox(); });

  // Button ripple effect
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      button.appendChild(ripple);
      ripple.animate([{ transform: 'scale(0)', opacity: 0.6 }, { transform: 'scale(1)', opacity: 0 }], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' });
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Parallax on profile photo (subtle) based on mouse move
  const profileParallax = document.getElementById('profileParallax');
  if (profileParallax) {
    profileParallax.addEventListener('mousemove', (e) => {
      const rect = profileParallax.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      profileParallax.style.transform = `translate3d(${px * 6}px, ${py * -6}px, 0) rotate(${px * 1.2}deg)`;
    });
    profileParallax.addEventListener('mouseleave', () => { profileParallax.style.transform = ''; });
  }

  // Tilt effect for portfolio items (mouse)
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      item.style.transform = `perspective(800px) rotateX(${(-y * 6)}deg) rotateY(${(x * 6)}deg) translateZ(6px)`;
      const img = item.querySelector('img');
      if (img) img.style.transform = `scale(1.05) translateZ(0) rotate(${x * 0.6}deg)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      const img = item.querySelector('img'); if (img) img.style.transform = '';
    });
  });

  // Contact form (placeholder AJAX)
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsg.textContent = '';
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true; submitBtn.querySelector('.btn-label')?.replaceWith(document.createTextNode('Mengirim...'));
    const data = { name: contactForm.name.value.trim(), email: contactForm.email.value.trim(), message: contactForm.message.value.trim() };
    if (!data.name || !data.email || !data.message) {
      formMsg.textContent = 'Harap isi semua kolom.'; submitBtn.disabled = false; submitBtn.innerHTML = '<span class="btn-label">Kirim Pesan</span>'; return;
    }
    const endpoint = 'https://example.com/your-form-endpoint';
    try {
      const resp = await fetch(endpoint, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      if (resp.ok) { formMsg.style.color = ''; formMsg.textContent = 'Pesan berhasil dikirim.'; contactForm.reset(); }
      else throw new Error('Failed');
    } catch (err) {
      formMsg.style.color = 'var(--accent-2)'; formMsg.innerHTML = 'Form demo tidak aktif. Kirim email ke <a href="mailto:ana@example.com">ana@example.com</a>';
    } finally {
      submitBtn.disabled = false; submitBtn.innerHTML = '<span class="btn-label">Kirim Pesan</span>';
    }
  });

  // Accessibility: keyboard focus ring
  function handleFirstTab(e) { if (e.key === 'Tab') { document.documentElement.classList.add('user-is-tabbing'); window.removeEventListener('keydown', handleFirstTab); } }
  window.addEventListener('keydown', handleFirstTab);

  // Scrollspy
  const sectionIds = ['hero','about','skills','portfolio','services','contact'];
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.nav-list a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
  sectionIds.forEach(id => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });

});