// Movimiento ligero: solo transform/opacity, listeners pasivos, rAF y IntersectionObserver.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

// ── Pausar animaciones ambientales fuera de pantalla ──
if (hasIO) {
  const amb = new IntersectionObserver((es) => es.forEach((e) => ((e.target as HTMLElement).dataset.offscreen = String(!e.isIntersecting))), { rootMargin: '80px' });
  document.querySelectorAll('.clip').forEach((el) => amb.observe(el));
}

// ── Progreso de scroll (respaldo cuando no hay scroll-driven animations o con reduced-motion) ──
const bar = document.getElementById('progress');
if (bar && (reduced || !CSS.supports('animation-timeline: scroll()'))) {
  let raf = 0;
  const paint = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  };
  paint();
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
  addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
}

// ── Contadores del hero: el valor final ya está en el HTML y el ancho reservado (ch + tabular-nums) ──
if (!reduced && hasIO) {
  const nums = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  const run = (el: HTMLElement, delay: number) => {
    const to = Number(el.dataset.count);
    const dur = 1300;
    let t0 = 0, last = -1;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.round(to * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)));
      if (v !== last) { el.textContent = String(v); last = v; }
      if (p < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), delay);
  };
  const started = new Set<Element>();
  nums.forEach((n) => (n.textContent = '0'));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    started.add(e.target);
    const el = e.target as HTMLElement;
    run(el, Math.max(0, 650 - performance.now()) + nums.indexOf(el) * 110);
  }), { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
  // Seguridad: lo que no haya entrado en vista muestra el valor final.
  setTimeout(() => nums.forEach((n) => { if (!started.has(n)) n.textContent = n.dataset.count!; }), 5000);
}

// ── Tilt suave en tarjetas (solo ratón/lápiz con hover real) ──
if (!reduced && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const MAX = 4.5; // grados
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    let raf = 0, x = 0, y = 0;
    const apply = () => {
      raf = 0;
      const r = card.getBoundingClientRect();
      const px = (x - r.left) / r.width - 0.5;
      const py = (y - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${(px * 2 * MAX).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-py * 2 * MAX).toFixed(2)}deg`);
      card.style.setProperty('--gx', `${Math.round(x - r.left - 144)}px`);
      card.style.setProperty('--gy', `${Math.round(y - r.top - 144)}px`);
    };
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
    }, { passive: true });
  });
}
