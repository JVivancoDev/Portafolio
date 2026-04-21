// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: .12 });
reveals.forEach(r => obs.observe(r));

// ── MODAL ──
const modalData = {
  kolenka: {
    title: '// Kolenka Lashes — Galería Técnica',
    slides: [
      { label: 'Vista principal — Formulario de agendamiento', emoji: '📅' },
      { label: 'Vista móvil — Responsive completo', emoji: '📱' },
      { label: 'Panel de administración privado', emoji: '🔒' },
      { label: 'Flujo de confirmación automática por email', emoji: '📧' },
      { label: 'Integración Google Calendar en tiempo real', emoji: '🗓️' },
    ]
  },
  jardin: {
    title: '// Jardín Oasis — Galería Técnica',
    slides: [
      { label: 'Catálogo de productos con filtros dinámicos', emoji: '🌿' },
      { label: 'Vista móvil del catálogo', emoji: '📱' },
      { label: 'Formulario de cotización automática', emoji: '📋' },
      { label: 'Backend en Google Sheets — Gestión de inventario', emoji: '📊' },
      { label: 'Panel de control del administrador', emoji: '⚙️' },
    ]
  }
};

function openModal(key) {
  const data = modalData[key];
  document.getElementById('modal-title').textContent = data.title;
  let html = '<div class="modal-grid">';
  data.slides.forEach(s => {
    html += `<div>
      <div class="modal-img-wrap">
        <div class="modal-placeholder">${s.emoji}<br><span style="margin-top:.4rem;display:block;font-size:.65rem;">${s.label}</span></div>
      </div>
      <p class="modal-caption">${s.label}</p>
    </div>`;
  });
  html += '</div>';
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });