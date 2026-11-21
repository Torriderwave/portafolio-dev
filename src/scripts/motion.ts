// Pipeline de build/deploy: solo transform, opacity, clip-path y el trazo del diagrama.
// Sin JS o con reduced-motion el HTML ya muestra el estado final (no se añade .armed).
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

const GLYPHS = '░▒▓█▄▀#@$%&*+=/<>';

function bootHero() {
  const title = document.getElementById('hero-title');
  const real = title?.querySelector<HTMLElement>('.real');
  const cmd = document.querySelector<HTMLElement>('.cmd');
  const out = cmd?.querySelector<HTMLElement>('.cmd-out');
  if (cmd && out) {
    const text = 'build portafolio --prod';
    let i = 0;
    const caret = cmd.querySelector<HTMLElement>('.caret');
    const place = () => {
      if (!caret) return;
      caret.style.transform = `translateX(${out.offsetLeft + out.offsetWidth}px)`;
    };
    const step = () => {
      i += 1;
      out.textContent = text.slice(0, i);
      place();
      if (i < text.length) {
        window.setTimeout(step, 18);
        return;
      }
      const ok = document.createElement('span');
      ok.className = 'ok';
      ok.textContent = ' ok';
      out.after(ok);
      place();
      cmd.classList.add('end');
    };
    window.setTimeout(step, 60);
  }
  if (!title || !real) return;

  const start = () => {
    if (title.classList.contains('on')) return;
    const overlay = document.createElement('span');
    overlay.className = 'decode';
    overlay.setAttribute('aria-hidden', 'true');
    const origin = title.getBoundingClientRect();
    const range = document.createRange();
    const cells: HTMLSpanElement[] = [];
    const walker = document.createTreeWalker(real, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    let current = walker.nextNode();
    while (current) {
      nodes.push(current as Text);
      current = walker.nextNode();
    }
    nodes.forEach((node) => {
      const grad = node.parentElement?.classList.contains('grad') ?? false;
      for (let i = 0; i < node.data.length; i += 1) {
        const ch = node.data[i];
        if (ch.trim() === '') continue;
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const r = range.getBoundingClientRect();
        if (r.width < 0.5) continue;
        const cell = document.createElement('span');
        cell.className = grad ? 'dc g gradc' : 'dc g';
        cell.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        cell.style.left = `${(r.left - origin.left).toFixed(2)}px`;
        cell.style.top = `${(r.top - origin.top).toFixed(2)}px`;
        cell.style.width = `${r.width.toFixed(2)}px`;
        cell.style.height = `${Math.max(r.height, 1).toFixed(2)}px`;
        cell.dataset.ch = ch;
        overlay.append(cell);
        cells.push(cell);
      }
    });
    if (!cells.length) {
      title.classList.add('on');
      return;
    }
    title.classList.add('decoding');
    title.append(overlay);
    const t0 = performance.now();
    const dur = 900;
    let raf = 0;
    const finish = () => {
      if (raf) cancelAnimationFrame(raf);
      overlay.remove();
      title.classList.remove('decoding');
      title.classList.add('on');
      removeEventListener('resize', onResize);
    };
    let width = innerWidth;
    const onResize = () => {
      if (Math.abs(innerWidth - width) > 8) finish();
    };
    addEventListener('resize', onResize, { passive: true });
    const tick = (now: number) => {
      if (document.hidden) {
        finish();
        return;
      }
      const t = now - t0;
      let done = true;
      cells.forEach((cell, i) => {
        const lock = 70 + (i / Math.max(1, cells.length - 1)) * (dur - 140);
        if (t >= lock) {
          if (!cell.classList.contains('lock')) {
            cell.textContent = cell.dataset.ch ?? '';
            cell.classList.add('lock');
            cell.classList.remove('g');
          }
        } else {
          done = false;
          if ((i + Math.floor(t / 45)) % 2 === 0) {
            cell.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
      });
      if (done || t > dur + 80) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };

  const fonts = document.fonts?.ready ?? Promise.resolve();
  void Promise.race([fonts, new Promise((r) => window.setTimeout(r, 500))]).then(start);
}

function bootFlaps() {
  const flaps = [...document.querySelectorAll<HTMLElement>('.fl')];
  if (!flaps.length) return;
  let started = false;
  const run = () => {
    if (started) return;
    started = true;
    flaps.forEach((fl, i) => window.setTimeout(() => runFlap(fl), 980 + i * 80));
  };
  const host = flaps[0].closest('dl');
  if (!host || !hasIO) {
    run();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      run();
    }
  }, { threshold: 0.35 });
  io.observe(host);
}

function runFlap(fl: HTMLElement) {
  const final = (fl.dataset.n || fl.textContent || '0').trim().slice(0, 1);
  const n = Number(final);
  const seq = [String((n + 7) % 10), String((n + 3) % 10), String((n + 1) % 10), final];
  const steps = seq.filter((d, i) => i === seq.length - 1 || d !== seq[i + 1]);
  const wrap = document.createElement('span');
  wrap.setAttribute('aria-hidden', 'true');
  ['h t f1', 'h b f1', 'h t f2', 'h b f2'].forEach((cls) => {
    const half = document.createElement('span');
    half.className = cls;
    const glyph = document.createElement('b');
    half.append(glyph);
    wrap.append(half);
  });
  fl.append(wrap);
  const q = (sel: string) => fl.querySelector(sel) as HTMLElement | null;
  const text = (sel: string, value: string) => {
    const node = fl.querySelector(sel);
    if (node) node.textContent = value;
  };
  const park = (digit: string) => {
    text('.t.f1 b', digit);
    text('.b.f1 b', digit);
    const top = q('.t.f2');
    const bot = q('.b.f2');
    if (top) top.style.transform = 'rotateX(90deg)';
    if (bot) bot.style.transform = 'rotateX(90deg)';
  };
  const clear = () => {
    fl.classList.remove('run');
    wrap.remove();
  };
  fl.classList.add('run');
  park(steps[0]);
  let i = 1;
  const next = () => {
    if (i >= steps.length) {
      clear();
      return;
    }
    const to = steps[i];
    i += 1;
    const from = q('.t.f1 b')?.textContent || to;
    text('.t.f1 b', to);
    text('.b.f1 b', from);
    text('.t.f2 b', from);
    text('.b.f2 b', to);
    const top = q('.t.f2');
    const bot = q('.b.f2');
    if (!top || !bot) {
      clear();
      return;
    }
    top.style.transform = '';
    bot.style.transform = '';
    const dur = 80;
    top.animate(
      [{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }],
      { duration: dur, easing: 'ease-in', fill: 'forwards' },
    );
    bot.animate(
      [{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(0deg)' }],
      { duration: dur, delay: dur, easing: 'ease-out', fill: 'forwards' },
    ).finished.then(() => {
      park(to);
      window.setTimeout(next, 36);
    }).catch(clear);
  };
  window.setTimeout(next, 30);
}

function bootNarrator() {
  const outs = [...document.querySelectorAll<HTMLElement>('.narr .out')];
  if (!outs.length) return;
  let active = '';
  let timer = 0;
  const hosts = () => outs.map((o) => o.closest('.narr'));
  const paint = (msg: string) => {
    window.clearInterval(timer);
    hosts().forEach((h) => h?.classList.remove('idle'));
    let i = 0;
    const place = (o: HTMLElement) => {
      const caret = o.parentElement?.querySelector<HTMLElement>('.c');
      if (caret) caret.style.transform = `translateX(${o.offsetLeft + o.offsetWidth}px)`;
    };
    outs.forEach((o) => { o.textContent = ''; place(o); });
    timer = window.setInterval(() => {
      i += 1;
      const slice = msg.slice(0, i);
      outs.forEach((o) => { o.textContent = slice; place(o); });
      if (i >= msg.length) {
        window.clearInterval(timer);
        hosts().forEach((h) => h?.classList.add('idle'));
      }
    }, 16);
  };
  const pick = () => {
    const mid = innerHeight * 0.46;
    let msg = '';
    let bestScore = Infinity;
    for (const el of document.querySelectorAll<HTMLElement>('[data-narr]')) {
      const r = el.getBoundingClientRect();
      if (r.bottom < innerHeight * 0.08 || r.top > innerHeight * 0.86) continue;
      const depth = el.tagName === 'ARTICLE' ? 0 : 1;
      const center = (Math.max(r.top, 0) + Math.min(r.bottom, innerHeight)) / 2;
      const score = Math.abs(center - mid) + depth * 520;
      const line = el.dataset.narr ?? '';
      if (line && score < bestScore) {
        msg = line;
        bestScore = score;
      }
    }
    if (!msg || msg === active) return;
    active = msg;
    paint(msg);
  };
  let debounce = 0;
  addEventListener('scroll', () => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(pick, 80);
  }, { passive: true });
  pick();
}

function bootSend() {
  const fit = () => {
    document.querySelectorAll<HTMLElement>('a.btn[data-contact="whatsapp"]').forEach((a) => {
      a.style.setProperty('--travel', `${Math.max(28, a.clientWidth - 34)}px`);
    });
  };
  fit();
  addEventListener('resize', fit, { passive: true });
  document.querySelectorAll<HTMLElement>('a.btn[data-contact="whatsapp"]').forEach((a) => {
    let lock = false;
    const go = () => {
      if (lock) return;
      lock = true;
      const bits = a.querySelectorAll<HTMLElement>('.pkt, .ticks');
      bits.forEach((el) => { el.style.animation = 'none'; });
      void a.offsetWidth;
      bits.forEach((el) => { el.style.animation = ''; });
      window.setTimeout(() => { lock = false; }, 720);
    };
    a.addEventListener('pointerenter', go);
    a.addEventListener('focus', go);
    a.addEventListener('click', go);
  });
}

function bootProgress() {
  const bar = document.querySelector<HTMLElement>('#progress > i');
  if (!bar || CSS.supports('animation-timeline: scroll()')) return;
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

function bootReveals() {
  if (!hasIO) return;
  const items = [...document.querySelectorAll<HTMLElement>('[data-wipe], [data-print], [data-lines], [data-assemble], .arch')];
  document.querySelectorAll<HTMLElement>('[data-print], [data-lines]').forEach((group) => {
    [...group.children].forEach((child, i) => {
      (child as HTMLElement).style.setProperty('--i', String(Math.min(i, 12)));
    });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px 18% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
  const sweep = () => {
    const vh = innerHeight * 1.02;
    items.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > innerHeight * -0.05) {
        el.classList.add('is-in');
        io.unobserve(el);
      }
    });
  };
  document.documentElement.classList.add('armed');
  sweep();
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      sweep();
    });
  }, { passive: true });
  addEventListener('resize', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      sweep();
    });
  }, { passive: true });
}

if (!reduced) {
  bootHero();
  bootFlaps();
  bootNarrator();
  bootSend();
  bootProgress();
  bootReveals();
}
