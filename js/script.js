document.querySelectorAll('.panel').forEach(panel => {
  panel.addEventListener('click', () => {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
  });
});

// ── CURSOR OPTIMIZADO ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let rx = 0, ry = 0;
let rafId = null;

document.addEventListener('mousemove', e => {
  const { clientX, clientY } = e;

  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    // cursor principal (sin interpolación)
    cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;

    // cursor secundario (suavizado)
    rx += (clientX - rx) * 0.12;
    ry += (clientY - ry) * 0.12;

    ring.style.transform = `translate(${rx}px, ${ry}px)`;
  });
});

// // ── CURSOR ──
// const cursor = document.getElementById('cursor');
// const ring = document.getElementById('cursorRing');
// let mx = 0, my = 0, rx = 0, ry = 0;

// let isMoving = false;

// document.addEventListener('mousemove', e => {
//   mx = e.clientX;
//   my = e.clientY;
//   isMoving = true;
// });

// function animCursor() {
//   if (isMoving) {
//     cursor.style.left = mx + 'px';
//     cursor.style.top = my + 'px';

//     rx += (mx - rx) * .12;
//     ry += (my - ry) * .12;

//     ring.style.left = rx + 'px';
//     ring.style.top = ry + 'px';

//     isMoving = false;
//   }
//   requestAnimationFrame(animCursor);
// }
// animCursor();

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
  },
  lienza: {
    title: '// Lienza Estudio — Portafolio Arquitectura',
    slides: [
      { label: 'Vista principal — Portafolio Arquitectura', emoji: '🏘️' },
      { label: 'Vista móvil — Responsive completo', emoji: '📱' },
      { label: 'Panel de administración privado', emoji: '🔒' },
      { label: 'Backend en Google Sheets — Gestión de proyectos', emoji: '📊' },
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

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

async function loadSkills() {
  try {
    const res = await fetch('data/skills.json');
    const skills = await res.json();

    const container = document.getElementById('skills-container');

    skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = `skill-card ${skill.type}`;

      div.innerHTML = `
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-sub">${skill.sub}</div>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error('Error cargando skills:', error);
  }
}

async function loadProjects() {
  try {
    const res = await fetch('/data/projects.json');
    const projects = await res.json();

    const container = document.getElementById('projects-container');

    projects.forEach(p => {
      const div = document.createElement('div');
      div.className = 'project-card';

      div.innerHTML = `
        <div class="project-mockup">
          <div class="mockup-bar">
            <div class="mockup-dot r"></div>
            <div class="mockup-dot y"></div>
            <div class="mockup-dot g"></div>
            <div class="mockup-url">${p.domain}</div>
          </div>
          <div class="mockup-placeholder">
            <span style="font-size:2rem;">${p.icon}</span>
            <span>${p.name}</span>
          </div>
        </div>

        <div class="project-body">
          <h3 class="project-title"><span>${p.name.split(" ")[0]}</span> ${p.name.split(" ").slice(1).join(" ")}</h3>

          <p class="project-desc">${p.description}</p>

          <ul class="project-features">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div class="project-actions">
            <a href="${p.live}" class="btn-sm cyan" target="_blank">Ver sitio</a>
            <button class="btn-sm outline-mag" onclick="openModal('${p.id}')">Galería técnica</button>
          </div>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error('Error cargando proyectos:', err);
  }
}

loadProjects();

// Ejecutar
loadSkills();