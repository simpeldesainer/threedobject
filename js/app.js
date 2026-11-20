(function () {
  const S = window.SITE || {};
  const ALL = (window.MODELS || []).slice(0, 12);          // hard limit: 12
  const $ = (s, el = document) => el.querySelector(s);
  const esc = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  document.title = S.name + ' — 3D Gallery';
  $('#logo').textContent = S.name;
  $('#tagline').textContent = S.tagline || '';
  $('#intro').textContent = S.intro || '';
  $('#foot').textContent = '© ' + new Date().getFullYear() + ' ' + S.name;

  function enquireHref(m) {
    const msg = `Hi, I'm interested in "${m.title}". Could you share more details?`;
    if (S.whatsapp) return `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
    return `mailto:${S.email || ''}?subject=${encodeURIComponent('Enquiry: ' + m.title)}&body=${encodeURIComponent(msg)}`;
  }
  $('#topcta').href = enquireHref({ title: 'your 3D designs' });

  // ---- filters ----
  const cats = ['All', ...new Set(ALL.map(m => m.category).filter(Boolean))];
  let current = 'All';
  const fEl = $('#filters');
  cats.forEach(c => {
    const b = document.createElement('button');
    b.textContent = c; if (c === 'All') b.className = 'on';
    b.onclick = () => { current = c; [...fEl.children].forEach(x => x.classList.toggle('on', x === b)); render(); };
    fEl.appendChild(b);
  });
  if (cats.length <= 2) fEl.style.display = 'none';

  // ---- grid ----
  let list = [];
  function render() {
    list = ALL.filter(m => current === 'All' || m.category === current);
    const g = $('#grid');
    if (!list.length) { g.innerHTML = '<div class="empty">No pieces yet.</div>'; return; }
    g.innerHTML = list.map((m, i) => `
      <article class="card" data-i="${i}" tabindex="0">
        <div class="view">
          <span class="tag">${esc(m.category)}</span>
          <model-viewer src="${esc(m.file)}" ${m.poster ? `poster="${esc(m.poster)}"` : ''}
            loading="lazy" reveal="auto" interaction-prompt="none" disable-zoom
            environment-image="neutral" exposure="1" shadow-intensity="1" shadow-softness="1"
            rotation-per-second="25deg" camera-orbit="30deg 75deg auto" alt="${esc(m.title)}"></model-viewer>
          <span class="hint">Click to view 3D</span>
        </div>
        <div class="meta"><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p>
          ${m.dimensions ? `<div class="dim">${esc(m.dimensions)}</div>` : ''}</div>
      </article>`).join('');
    g.querySelectorAll('.card').forEach(c => {
      const v = c.querySelector('model-viewer');
      v.addEventListener('error', () => v.insertAdjacentHTML('afterend', '<div class="err">Model file not found<br>check path in js/models.js</div>'));
      c.onmouseenter = () => v.autoRotate = true;
      c.onmouseleave = () => v.autoRotate = false;
      c.onclick = () => open(+c.dataset.i);
      c.onkeydown = e => { if (e.key === 'Enter') open(+c.dataset.i); };
    });
  }

  // ---- modal ----
  const modal = $('#modal'), mv = $('#bigmv');
  let idx = 0;
  function open(i) {
    idx = (i + list.length) % list.length;
    const m = list[idx];
    mv.src = m.file; mv.alt = m.title;
    mv.cameraOrbit = '30deg 75deg auto'; mv.autoRotate = true; $('#t-rot').classList.add('on');
    $('#m-cat').textContent = m.category || '';
    $('#m-title').textContent = m.title;
    $('#m-desc').textContent = m.description || '';
    $('#m-dl').innerHTML = (m.dimensions ? `<dt>Dimensions</dt><dd>${esc(m.dimensions)}</dd>` : '') +
                           (m.materials ? `<dt>Materials</dt><dd>${esc(m.materials)}</dd>` : '');
    $('#m-enq').href = enquireHref(m);
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function close() { modal.classList.remove('open'); document.body.style.overflow = ''; mv.removeAttribute('src'); }
  $('#close').onclick = close;
  modal.onclick = e => { if (e.target === modal) close(); };
  $('#prev').onclick = () => open(idx - 1);
  $('#next').onclick = () => open(idx + 1);
  addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(idx - 1);
    if (e.key === 'ArrowRight') open(idx + 1);
  });
  $('#t-rot').onclick = e => { mv.autoRotate = !mv.autoRotate; e.target.classList.toggle('on', mv.autoRotate); };
  $('#t-light').onclick = e => { const b = e.target; const on = b.classList.toggle('on');
    mv.exposure = on ? 1.5 : 1; mv.shadowIntensity = on ? 0.6 : 1; };
  $('#t-reset').onclick = () => { mv.cameraOrbit = '30deg 75deg auto'; mv.fieldOfView = 'auto'; };

  render();
})();
