'use strict';

// ── State ──────────────────────────────────────────────────
let canvas;
let zoomLevel = 1;
let canvasW = 800;
let canvasH = 600;
let elemCounter = 0;

const bgState = {
  type: 'color',
  color: '#ffffff',
  gradient: { type: 'linear', color1: '#6c63ff', color2: '#ff6584', angle: 135 },
  imageData: null,
  imageFit: 'cover',
};

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  canvas = new fabric.Canvas('canvas', {
    width: canvasW,
    height: canvasH,
    backgroundColor: '#ffffff',
    preserveObjectStacking: true,
    selection: true,
  });

  setupCanvasSize();
  setupBackground();
  setupElements();
  setupProperties();
  setupAIGenerate();
  setupExport();
  setupZoom();
  setupKeyboard();
  setupDragOver();
  setupPanelTabs();
  setupMobileSheet();
  setupAddLayer();
  setupShareModal();
  setupFilename();
  setupHistory();
  setupTransparentBg();
  setupBgTemplates();

  canvas.on('selection:created', onSelection);
  canvas.on('selection:updated', onSelection);
  canvas.on('selection:cleared', () => {
    showTabsView();
    if (isMobile()) closeSheet();
    updateLayers();
  });
  canvas.on('object:added',    updateLayers);
  canvas.on('object:removed',  updateLayers);
  canvas.on('object:modified', updateLayers);

  fitToView();

  // Re-fit when window resizes (orientation change, etc.)
  window.addEventListener('resize', debounce(fitToView, 180));
});

// ── Canvas Size ────────────────────────────────────────────
function setupCanvasSize() {
  // Preset buttons in the Setup tab
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const w = +btn.dataset.w, h = +btn.dataset.h;
      document.getElementById('canvas-width').value  = w;
      document.getElementById('canvas-height').value = h;
      applySize(w, h);
    });
  });

  // Preset dropdown in the header
  const presetSel = document.getElementById('canvas-preset');
  if (presetSel) {
    presetSel.addEventListener('change', e => {
      if (!e.target.value) return;
      const [w, h] = e.target.value.split('x').map(Number);
      document.getElementById('canvas-width').value  = w;
      document.getElementById('canvas-height').value = h;
      applySize(w, h);
      e.target.value = '';
    });
  }

  // Header inputs: apply on Enter or blur
  function applyFromInputs() {
    const w = clamp(+document.getElementById('canvas-width').value,  1, 8000);
    const h = clamp(+document.getElementById('canvas-height').value, 1, 8000);
    applySize(w, h);
  }
  ['canvas-width', 'canvas-height'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('keydown', e => { if (e.key === 'Enter') applyFromInputs(); });
    el.addEventListener('blur', applyFromInputs);
  });
}

function applySize(w, h) {
  canvasW = w; canvasH = h;
  canvas.setWidth(w);
  canvas.setHeight(h);
  canvas.renderAll();
  reapplyBackground();
  fitToView();
}

// ── Background ─────────────────────────────────────────────
function setupBackground() {
  // Tabs
  document.querySelectorAll('#bg-tabs .sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#bg-tabs .sub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`bg-${tab.dataset.tab}-panel`).classList.add('active');
      if (tab.dataset.tab !== 'templates') {
        bgState.type = tab.dataset.tab;
        if (bgState.type !== 'image' || bgState.imageData) reapplyBackground();
      }
    });
  });

  // Color
  const bgColor = document.getElementById('bg-color');
  const bgHex   = document.getElementById('bg-color-hex');
  bgColor.addEventListener('input', () => { bgHex.value = bgColor.value; bgState.color = bgColor.value; applyColorBg(bgColor.value); });
  bgHex.addEventListener('change', () => {
    if (isValidHex(bgHex.value)) { bgColor.value = bgHex.value; bgState.color = bgHex.value; applyColorBg(bgHex.value); }
  });

  // Quick swatches
  document.querySelectorAll('#bg-quick-colors .swatch').forEach(s => {
    s.addEventListener('click', () => {
      const c = s.dataset.color;
      bgColor.value = c; bgHex.value = c; bgState.color = c;
      document.querySelectorAll('#bg-tabs .tab')[0].click();
      applyColorBg(c);
    });
  });

  // Gradient
  syncColorPair('gradient-color1', 'gradient-hex1', v => { bgState.gradient.color1 = v; });
  syncColorPair('gradient-color2', 'gradient-hex2', v => { bgState.gradient.color2 = v; });

  const gType  = document.getElementById('gradient-type');
  const gAngle = document.getElementById('gradient-angle');
  gType.addEventListener('change', () => {
    bgState.gradient.type = gType.value;
    document.getElementById('gradient-angle-row').style.display = gType.value === 'linear' ? 'flex' : 'none';
  });
  gAngle.addEventListener('input', () => {
    bgState.gradient.angle = +gAngle.value;
    document.getElementById('gradient-angle-val').textContent = gAngle.value + '°';
  });
  document.getElementById('apply-gradient').addEventListener('click', applyGradientBg);

  // Image upload
  const bgFile   = document.getElementById('bg-image-file');
  const uploadEl = document.getElementById('bg-upload-zone');
  uploadEl.addEventListener('click', () => bgFile.click());
  bgFile.addEventListener('change', e => readBgImage(e.target.files[0]));

  document.getElementById('bg-image-fit').addEventListener('change', e => {
    bgState.imageFit = e.target.value;
    if (bgState.imageData) applyImageBg(bgState.imageData, bgState.imageFit);
  });

  document.getElementById('remove-bg-image').addEventListener('click', () => {
    bgState.imageData = null;
    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    document.getElementById('bg-fit-row').style.display      = 'none';
    document.getElementById('remove-bg-image').style.display = 'none';
    bgFile.value = '';
  });
}

function readBgImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    bgState.imageData = ev.target.result;
    bgState.type = 'image';
    applyImageBg(ev.target.result, bgState.imageFit);
    document.getElementById('bg-fit-row').style.display      = 'flex';
    document.getElementById('remove-bg-image').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function applyColorBg(color) {
  canvas.setBackgroundImage(null);
  canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
}

function applyGradientBg() {
  const { type, color1, color2, angle } = bgState.gradient;
  let coords;

  if (type === 'linear') {
    const rad  = (angle - 90) * (Math.PI / 180);
    const len  = Math.sqrt(canvasW * canvasW + canvasH * canvasH);
    coords = {
      x1: canvasW / 2 - Math.cos(rad) * len / 2,
      y1: canvasH / 2 - Math.sin(rad) * len / 2,
      x2: canvasW / 2 + Math.cos(rad) * len / 2,
      y2: canvasH / 2 + Math.sin(rad) * len / 2,
    };
  } else {
    const r = Math.max(canvasW, canvasH) / 2;
    coords = { r1: 0, x1: canvasW / 2, y1: canvasH / 2, r2: r, x2: canvasW / 2, y2: canvasH / 2 };
  }

  const gradient = new fabric.Gradient({
    type,
    gradientUnits: 'pixels',
    coords,
    colorStops: [{ offset: 0, color: color1 }, { offset: 1, color: color2 }],
  });

  canvas.setBackgroundImage(null);
  canvas.setBackgroundColor(gradient, canvas.renderAll.bind(canvas));
}

function applyImageBg(dataUrl, fit = 'cover') {
  fabric.Image.fromURL(dataUrl, img => {
    let scaleX, scaleY, left = 0, top = 0;
    if (fit === 'stretch') {
      scaleX = canvasW / img.width;
      scaleY = canvasH / img.height;
    } else if (fit === 'cover') {
      const s = Math.max(canvasW / img.width, canvasH / img.height);
      scaleX = scaleY = s;
      left = (canvasW - img.width  * s) / 2;
      top  = (canvasH - img.height * s) / 2;
    } else {
      const s = Math.min(canvasW / img.width, canvasH / img.height);
      scaleX = scaleY = s;
      left = (canvasW - img.width  * s) / 2;
      top  = (canvasH - img.height * s) / 2;
    }
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), { scaleX, scaleY, left, top });
  });
}

function reapplyBackground() {
  if (bgState.type === 'color')    applyColorBg(bgState.color);
  if (bgState.type === 'gradient') applyGradientBg();
  if (bgState.type === 'image' && bgState.imageData) applyImageBg(bgState.imageData, bgState.imageFit);
}

// ── Elements ───────────────────────────────────────────────
function setupElements() {
  on('add-text',     'click', addText);
  on('add-rect',     'click', addRect);
  on('add-circle',   'click', addCircle);
  on('add-triangle', 'click', addTriangle);
  on('add-line',     'click', addLine);

  on('add-image', 'click', () => {
    document.getElementById('image-file').click();
  });
  document.getElementById('image-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => addImageEl(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  });
}

function cx() { return canvasW / 2; }
function cy() { return canvasH / 2; }
function nextName(prefix) { return `${prefix} ${++elemCounter}`; }

function addText() {
  const obj = new fabric.IText('Edit this text', {
    left: cx(), top: cy(), originX: 'center', originY: 'center',
    fontFamily: 'Arial', fontSize: 48, fill: '#000000',
    fontWeight: 'normal', fontStyle: 'normal', underline: false,
    textAlign: 'center', lineHeight: 1.2, charSpacing: 0,
    data: { type: 'text', name: nextName('Text') },
  });
  add(obj);
}

function addRect() {
  const obj = new fabric.Rect({
    left: cx(), top: cy(), originX: 'center', originY: 'center',
    width: 220, height: 140,
    fill: '#6c63ff', stroke: null, strokeWidth: 0, rx: 0, ry: 0,
    data: { type: 'rect', name: nextName('Rectangle') },
  });
  add(obj);
}

function addCircle() {
  const obj = new fabric.Ellipse({
    left: cx(), top: cy(), originX: 'center', originY: 'center',
    rx: 80, ry: 80,
    fill: '#ff6584', stroke: null, strokeWidth: 0,
    data: { type: 'circle', name: nextName('Circle') },
  });
  add(obj);
}

function addTriangle() {
  const obj = new fabric.Triangle({
    left: cx(), top: cy(), originX: 'center', originY: 'center',
    width: 160, height: 140,
    fill: '#2dd4bf', stroke: null, strokeWidth: 0,
    data: { type: 'triangle', name: nextName('Triangle') },
  });
  add(obj);
}

function addLine() {
  const obj = new fabric.Line([0, 0, 200, 0], {
    left: cx(), top: cy(), originX: 'center', originY: 'center',
    stroke: '#000000', strokeWidth: 4, strokeLineCap: 'round',
    data: { type: 'line', name: nextName('Line') },
  });
  add(obj);
}

function addImageEl(dataUrl, onAdded) {
  fabric.Image.fromURL(dataUrl, img => {
    const maxDim = Math.min(canvasW, canvasH) * 0.55;
    if (img.width > maxDim || img.height > maxDim) {
      img.scale(maxDim / Math.max(img.width, img.height));
    }
    img.set({
      left: cx(), top: cy(), originX: 'center', originY: 'center',
      data: { type: 'image', name: nextName('Image') },
    });
    add(img);
    if (onAdded) onAdded();
  });
}

function add(obj) {
  canvas.add(obj);
  canvas.setActiveObject(obj);
  canvas.renderAll();
}

// ── Panel view switching ───────────────────────────────────
function showTabsView() {
  document.getElementById('tabs-view').style.display  = 'block';
  document.getElementById('props-view').style.display = 'none';
}
function showPropsView() {
  document.getElementById('tabs-view').style.display  = 'none';
  document.getElementById('props-view').style.display = 'block';
  if (isMobile()) openSheet();
}

// ── Panel Tab switching ────────────────────────────────────
function setupPanelTabs() {
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => switchPanelTab(tab.dataset.tab));
  });
  // AI toolbar button switches right-panel to the AI tab
  on('ai-tool-btn', 'click', () => {
    showTabsView();
    switchPanelTab('ai');
  });
  // Back button deselects, returns to tabs
  on('props-back', 'click', () => {
    canvas.discardActiveObject();
    canvas.renderAll();
  });
}

function switchPanelTab(tabName) {
  document.querySelectorAll('.ptab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  document.querySelectorAll('.ptab-pane').forEach(p => p.classList.toggle('active', p.dataset.tab === tabName));
}

// ── Selection & Properties ─────────────────────────────────
function onSelection() {
  const obj = canvas.getActiveObject();
  if (!obj || obj.type === 'activeSelection') {
    showTabsView();
    return;
  }
  showPropsView();
  const t = objType(obj);
  document.getElementById('prop-type-badge').textContent = t;

  document.getElementById('text-props').style.display   = t === 'text'  ? 'block' : 'none';
  document.getElementById('shape-props').style.display  = isShape(t)    ? 'block' : 'none';
  document.getElementById('image-props').style.display  = t === 'image' ? 'block' : 'none';
  document.getElementById('corner-radius-row').style.display = t === 'rect' ? 'flex' : 'none';

  // For text: common-props is revealed via the Advanced toggle; for other types always show it
  document.getElementById('common-props').style.display = t === 'text' ? 'none' : 'block';

  // Collapse the text advanced section whenever a new element is selected
  if (t === 'text') {
    const advBtn  = document.getElementById('text-advanced-toggle');
    const advBody = document.getElementById('text-advanced-body');
    if (advBtn)  advBtn.setAttribute('aria-expanded', 'false');
    if (advBody) advBody.style.display = 'none';
  }

  populateProps(obj, t);
  updateLayers();
}

function populateProps(obj, t) {
  // Common
  set('elem-opacity', Math.round((obj.opacity ?? 1) * 100));
  setTxt('elem-opacity-val', Math.round((obj.opacity ?? 1) * 100) + '%');
  set('elem-rotation', Math.round(obj.angle ?? 0));
  setTxt('elem-rotation-val', Math.round(obj.angle ?? 0) + '°');

  if (t === 'text') {
    set('text-content', obj.text ?? '');
    const font = obj.fontFamily ?? 'Arial';
    set('text-font', font);
    document.querySelectorAll('#font-chip-grid .font-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.font === font);
    });
    const sz = obj.fontSize ?? 40;
    set('text-size', sz);
    set('text-size-slider', Math.min(sz, 200));
    setTxt('text-line-height-val', (obj.lineHeight ?? 1.2).toFixed(2));
    set('text-line-height', obj.lineHeight ?? 1.2);
    setTxt('text-char-spacing-val', obj.charSpacing ?? 0);
    set('text-char-spacing', obj.charSpacing ?? 0);

    tog('text-bold',      obj.fontWeight === 'bold');
    tog('text-italic',    obj.fontStyle  === 'italic');
    tog('text-underline', obj.underline  === true);
    tog('text-align-left',   obj.textAlign === 'left');
    tog('text-align-center', obj.textAlign === 'center' || !obj.textAlign);
    tog('text-align-right',  obj.textAlign === 'right');

    const fc = typeof obj.fill === 'string' ? obj.fill : '#000000';
    safeColor('text-color', fc);
    set('text-color-hex', fc);
    document.querySelectorAll('.txt-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.color.toLowerCase() === fc.toLowerCase());
    });

    const hasShadow = !!obj.shadow;
    document.getElementById('text-shadow').checked = hasShadow;
    document.getElementById('text-shadow-opts').style.display = hasShadow ? 'block' : 'none';
  }

  if (isShape(t)) {
    const fill    = obj.fill;
    const hasFill = fill && fill !== 'transparent';
    document.getElementById('shape-fill-on').checked = !!hasFill;
    if (typeof fill === 'string' && fill.startsWith('#')) {
      safeColor('shape-fill', fill);
      set('shape-fill-hex', fill);
    }

    const hasStroke = !!(obj.stroke) && obj.strokeWidth > 0;
    document.getElementById('shape-stroke-on').checked = hasStroke;
    document.getElementById('stroke-width-row').style.display = hasStroke ? 'flex' : 'none';
    if (hasStroke) {
      safeColor('shape-stroke', obj.stroke);
      set('shape-stroke-width', obj.strokeWidth ?? 2);
      setTxt('stroke-width-val', obj.strokeWidth ?? 2);
    }
    if (t === 'rect') {
      set('shape-radius', obj.rx ?? 0);
      setTxt('shape-radius-val', obj.rx ?? 0);
    }
  }
}

function setupProperties() {
  // Font chips
  document.querySelectorAll('#font-chip-grid .font-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#font-chip-grid .font-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      set('text-font', chip.dataset.font);
      upd({ fontFamily: chip.dataset.font });
    });
  });

  // Size slider ↔ number input
  on('text-size-slider', 'input', () => {
    const v = +val('text-size-slider');
    set('text-size', v);
    upd({ fontSize: v });
  });

  // Text color swatches
  document.querySelectorAll('.txt-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      const c = sw.dataset.color;
      document.querySelectorAll('.txt-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      safeColor('text-color', c);
      set('text-color-hex', c);
      upd({ fill: c });
    });
  });

  // Text advanced toggle — reveals Line Ht / Spacing / Shadow + Opacity / Rotation / order
  on('text-advanced-toggle', 'click', () => {
    const btn    = document.getElementById('text-advanced-toggle');
    const body   = document.getElementById('text-advanced-body');
    const common = document.getElementById('common-props');
    const open   = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    body.style.display   = open ? 'none' : 'block';
    common.style.display = open ? 'none' : 'block';
  });

  // Text
  on('text-content', 'input', () => {
    const o = activeObj();
    if (o && o instanceof fabric.IText) { o.set('text', val('text-content')); canvas.renderAll(); }
  });
  on('text-font', 'change', () => upd({ fontFamily: val('text-font') }));
  on('text-size', 'input', () => {
    const v = +val('text-size');
    set('text-size-slider', Math.min(v, 200));
    upd({ fontSize: v });
  });

  toggleStyle('text-bold',      'fontWeight', 'bold',   'normal');
  toggleStyle('text-italic',    'fontStyle',  'italic',  'normal');
  toggleStyle('text-underline', 'underline',  true,      false);

  ['left', 'center', 'right'].forEach(align => {
    on(`text-align-${align}`, 'click', () => {
      upd({ textAlign: align });
      ['left','center','right'].forEach(a => tog(`text-align-${a}`, a === align));
    });
  });

  syncColorPair('text-color', 'text-color-hex', v => upd({ fill: v }));

  on('text-line-height',  'input', () => { upd({ lineHeight: +val('text-line-height') }); setTxt('text-line-height-val',  (+val('text-line-height')).toFixed(2)); });
  on('text-char-spacing', 'input', () => { upd({ charSpacing: +val('text-char-spacing') }); setTxt('text-char-spacing-val', val('text-char-spacing')); });

  on('text-shadow', 'change', () => {
    const o = activeObj(); if (!o) return;
    const on_ = document.getElementById('text-shadow').checked;
    document.getElementById('text-shadow-opts').style.display = on_ ? 'block' : 'none';
    o.set('shadow', on_ ? buildShadow() : null);
    canvas.renderAll();
  });
  ['text-shadow-color','text-shadow-blur','text-shadow-ox','text-shadow-oy'].forEach(id => {
    on(id, 'input', () => {
      const o = activeObj();
      if (o && o.shadow) { Object.assign(o.shadow, buildShadow()); canvas.renderAll(); }
      setTxt('text-shadow-blur-val', val('text-shadow-blur'));
      setTxt('text-shadow-ox-val',   val('text-shadow-ox'));
      setTxt('text-shadow-oy-val',   val('text-shadow-oy'));
    });
  });

  // Shape
  on('shape-fill-on', 'change', () => {
    const checked = document.getElementById('shape-fill-on').checked;
    upd({ fill: checked ? val('shape-fill') : 'transparent' });
  });
  syncColorPair('shape-fill', 'shape-fill-hex', v => {
    if (document.getElementById('shape-fill-on').checked) upd({ fill: v });
  });
  on('shape-stroke-on', 'change', () => {
    const checked = document.getElementById('shape-stroke-on').checked;
    document.getElementById('stroke-width-row').style.display = checked ? 'flex' : 'none';
    upd(checked ? { stroke: val('shape-stroke'), strokeWidth: +val('shape-stroke-width') } : { stroke: null, strokeWidth: 0 });
  });
  on('shape-stroke',       'input', () => upd({ stroke: val('shape-stroke') }));
  on('shape-stroke-width', 'input', () => { upd({ strokeWidth: +val('shape-stroke-width') }); setTxt('stroke-width-val', val('shape-stroke-width')); });
  on('shape-radius', 'input', () => {
    const r = +val('shape-radius');
    upd({ rx: r, ry: r });
    setTxt('shape-radius-val', r);
  });

  // Image filters
  ['brightness', 'contrast', 'saturation'].forEach(f => {
    const fCap = f.charAt(0).toUpperCase() + f.slice(1);
    on(`img-${f}`, 'input', () => {
      const v = +val(`img-${f}`);
      setTxt(`img-${f}-val`, v.toFixed(2));
      applyFilter(fCap, f, v);
    });
  });

  // Common
  on('elem-opacity', 'input', () => {
    const v = +val('elem-opacity');
    setTxt('elem-opacity-val', v + '%');
    upd({ opacity: v / 100 });
  });
  on('elem-rotation', 'input', () => {
    const v = +val('elem-rotation');
    setTxt('elem-rotation-val', v + '°');
    upd({ angle: v });
  });

  on('bring-front',   'click', () => { const o = activeObj(); if (o) { canvas.bringToFront(o);   updateLayers(); } });
  on('bring-forward', 'click', () => { const o = activeObj(); if (o) { canvas.bringForward(o);   updateLayers(); } });
  on('send-backward', 'click', () => { const o = activeObj(); if (o) { canvas.sendBackwards(o);  updateLayers(); } });
  on('send-back',     'click', () => { const o = activeObj(); if (o) { canvas.sendToBack(o);     updateLayers(); } });

  on('duplicate-elem', 'click', () => {
    const o = activeObj();
    if (!o) return;
    o.clone(cloned => {
      cloned.set({
        left: (o.left ?? 0) + 20, top: (o.top ?? 0) + 20,
        data: { ...(o.data ?? {}), name: (o.data?.name ?? 'Element') + ' copy' },
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  });

  on('delete-elem', 'click', () => {
    const o = activeObj();
    if (o) { canvas.remove(o); showTabsView(); }
  });
}

function buildShadow() {
  return new fabric.Shadow({
    color:   val('text-shadow-color'),
    blur:    +val('text-shadow-blur'),
    offsetX: +val('text-shadow-ox'),
    offsetY: +val('text-shadow-oy'),
  });
}

function applyFilter(FilterClass, propKey, value) {
  const o = activeObj();
  if (!o || !(o instanceof fabric.Image)) return;
  o.filters = (o.filters || []).filter(f => !(f instanceof fabric.Image.filters[FilterClass]));
  if (value !== 0) {
    o.filters.push(new fabric.Image.filters[FilterClass]({ [propKey]: value }));
  }
  o.applyFilters();
  canvas.renderAll();
}

// ── Layers Panel ───────────────────────────────────────────
function updateLayers() {
  const list = document.getElementById('layers-list');
  const objs = canvas.getObjects();
  const countEl = document.getElementById('layer-count');
  if (countEl) countEl.textContent = objs.length;
  if (!objs.length) {
    list.innerHTML = '<p class="empty-note">No elements yet.</p>';
    return;
  }

  const activeObj_ = canvas.getActiveObject();
  list.innerHTML = '';

  [...objs].reverse().forEach(obj => {
    const name = obj.data?.name ?? objType(obj);
    const item = document.createElement('div');
    item.className = 'layer-item' + (obj === activeObj_ ? ' selected' : '');

    item.innerHTML = `
      <span class="layer-icon">${layerIcon(obj)}</span>
      <span class="layer-name">${esc(name)}</span>
      <div class="layer-actions">
        <button class="layer-vis-btn" title="Toggle visibility">${obj.visible === false ? '🙈' : '👁'}</button>
        <button class="layer-del-btn" title="Delete">✕</button>
      </div>
    `;

    item.querySelector('.layer-vis-btn').addEventListener('click', e => {
      e.stopPropagation();
      obj.set('visible', obj.visible === false);
      canvas.renderAll();
      updateLayers();
    });
    item.querySelector('.layer-del-btn').addEventListener('click', e => {
      e.stopPropagation();
      canvas.remove(obj);
      if (obj === activeObj_) showTabsView();
    });
    item.addEventListener('click', () => {
      canvas.setActiveObject(obj);
      canvas.renderAll();
      updateLayers();
      onSelection();
    });

    list.appendChild(item);
  });
}

function layerIcon(obj) {
  const t = obj.data?.type ?? objType(obj);
  return { text: 'T', rect: '▬', circle: '●', triangle: '▲', line: '—', image: '🖼' }[t] ?? '◆';
}

// ── Export ─────────────────────────────────────────────────
function setupExport() {
  on('export-quality', 'input', () => setTxt('quality-val', val('export-quality') + '%'));

  // Header dropdown toggle
  const hdrBtn  = document.getElementById('export-btn-header');
  const hdrMenu = document.getElementById('export-hdr-menu');
  function openExportMenu()  { hdrMenu.classList.add('open'); hdrBtn.classList.add('open'); hdrMenu.setAttribute('aria-hidden', 'false'); }
  function closeExportMenu() { hdrMenu.classList.remove('open'); hdrBtn.classList.remove('open'); hdrMenu.setAttribute('aria-hidden', 'true'); }
  hdrBtn.addEventListener('click', e => { e.stopPropagation(); hdrMenu.classList.contains('open') ? closeExportMenu() : openExportMenu(); });
  document.addEventListener('click', e => { if (!hdrMenu.contains(e.target) && e.target !== hdrBtn) closeExportMenu(); });

  // Wire all download / share / copy triggers
  on('export-hdr-download', 'click', () => { closeExportMenu(); exportImage(); });
  on('export-hdr-share',    'click', () => { closeExportMenu(); openShareModal(); });
  on('export-hdr-copy',     'click', () => { closeExportMenu(); copyClipboard(); });
  on('export-btn-bottom',   'click', exportImage);
  on('share-btn',           'click', openShareModal);
  on('copy-clipboard-btn',  'click', copyClipboard);
}

function setupFilename() {
  const hdr = document.getElementById('hdr-filename-input');
  const exp = document.getElementById('export-filename');
  if (!hdr || !exp) return;
  hdr.addEventListener('input', () => { exp.value = hdr.value; });
  hdr.addEventListener('keydown', e => { if (e.key === 'Enter') hdr.blur(); });
  exp.addEventListener('input', () => { hdr.value = exp.value; });
}

function getCanvasBlob() {
  const quality     = +val('export-quality') / 100;
  const scale       = +val('export-scale');
  const transparent = document.getElementById('transparent-bg-toggle')?.checked;

  canvas.discardActiveObject();

  if (transparent) {
    const savedColor = canvas.backgroundColor;
    const savedImage = canvas.backgroundImage;
    canvas.backgroundColor = '';
    canvas.backgroundImage = null;
    canvas.renderAll();
    const dataUrl = canvas.toDataURL({ format: 'png', multiplier: scale });
    canvas.backgroundColor = savedColor;
    canvas.backgroundImage = savedImage;
    canvas.renderAll();
    return { dataUrl, filename: (val('export-filename').trim() || 'image') + '.png' };
  }

  canvas.renderAll();
  const dataUrl = canvas.toDataURL({ format: 'jpeg', quality, multiplier: scale });
  return { dataUrl, filename: (val('export-filename').trim() || 'image') + '.jpg' };
}

function exportImage() {
  const { dataUrl, filename } = getCanvasBlob();
  const a = document.createElement('a');
  a.download = filename;
  a.href = dataUrl;
  a.click();
  toast('Image downloaded!', 'success');
  saveToHistory(dataUrl, filename);
}

function dataURLToBlob(dataUrl) {
  const [header, b64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

async function shareImage() {
  const { dataUrl, filename } = getCanvasBlob();
  try {
    const blob = dataURLToBlob(dataUrl);
    const file = new File([blob], filename, { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: filename });
      return;
    }
    const burl = URL.createObjectURL(blob);
    await navigator.share({ url: burl, title: filename });
    URL.revokeObjectURL(burl);
  } catch (err) {
    if (err?.name === 'AbortError') return;
    try {
      const blob = dataURLToBlob(dataUrl);
      await navigator.clipboard.write([new ClipboardItem({ 'image/jpeg': blob })]);
      toast('Image copied to clipboard!', 'success');
    } catch {
      toast('Sharing not supported — try Download instead.', 'error');
    }
  }
}

async function copyClipboard() {
  canvas.discardActiveObject();
  canvas.renderAll();
  try {
    const dataUrl = canvas.toDataURL({ format: 'png' });
    const blob = dataURLToBlob(dataUrl);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    toast('Copied to clipboard!', 'success');
  } catch {
    toast('Clipboard failed — try downloading instead.', 'error');
  }
}

// ── Zoom ───────────────────────────────────────────────────
function setupZoom() {
  on('zoom-in',  'click', () => setZoom(zoomLevel * 1.25));
  on('zoom-out', 'click', () => setZoom(zoomLevel / 1.25));
  on('zoom-fit', 'click', fitToView);

  document.getElementById('canvas-area').addEventListener('wheel', e => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom(e.deltaY < 0 ? zoomLevel * 1.1 : zoomLevel / 1.1);
  }, { passive: false });
}

function setZoom(level) {
  zoomLevel = clamp(level, 0.05, 4);
  const wrapper = document.getElementById('canvas-wrapper');
  wrapper.style.transform = `scale(${zoomLevel})`;

  const space = document.getElementById('canvas-scroll-space');
  space.style.width  = Math.max(canvasW * zoomLevel, 1) + 'px';
  space.style.height = Math.max(canvasH * zoomLevel, 1) + 'px';

  document.getElementById('zoom-level').textContent = Math.round(zoomLevel * 100) + '%';
}

function fitToView() {
  const area = document.getElementById('canvas-area');
  const aw = area.clientWidth  - 48;
  const ah = area.clientHeight - 48;
  const scale = Math.min(aw / canvasW, ah / canvasH, 1);
  setZoom(scale);
}

// ── Keyboard Shortcuts ─────────────────────────────────────
function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (inputFocused()) return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const o = canvas.getActiveObject();
      if (o) { canvas.remove(o); showTabsView(); }
    }
    if (e.key === 'Escape') { canvas.discardActiveObject(); canvas.renderAll(); }

    if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.getElementById('duplicate-elem').click();
    }

    const step = e.shiftKey ? 10 : 1;
    const arrows = { ArrowLeft: { left: -step }, ArrowRight: { left: step }, ArrowUp: { top: -step }, ArrowDown: { top: step } };
    if (arrows[e.key]) {
      e.preventDefault();
      const o = canvas.getActiveObject();
      if (o) { o.set(arrows[e.key]); canvas.renderAll(); }
    }
  });
}

// ── Drag-and-Drop on Canvas Area ───────────────────────────
function setupDragOver() {
  const area = document.getElementById('canvas-area');
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast('Please drop an image file.', 'error'); return; }
    const reader = new FileReader();
    reader.onload = ev => addImageEl(ev.target.result);
    reader.readAsDataURL(file);
  });

  const bgUpload = document.getElementById('bg-upload-zone');
  bgUpload.addEventListener('dragover', e => { e.preventDefault(); bgUpload.classList.add('drag-over'); });
  bgUpload.addEventListener('dragleave', () => bgUpload.classList.remove('drag-over'));
  bgUpload.addEventListener('drop', e => {
    e.preventDefault();
    bgUpload.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) readBgImage(file);
  });
}

// ── AI Generate ────────────────────────────────────────────
function setupAIGenerate() {
  let selectedStyle    = '';
  let selectedBg       = '';
  let selectedFontStyle = 'bold';
  let selectedFontColor = '#ffffff';
  let textMode         = 'layer'; // 'layer' | 'prompt'
  let lastDirectUrl    = null;
  let lastPromptText   = '';
  let lastOverlayText  = '';

  // ── Style chips ──
  document.querySelectorAll('#style-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#style-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedStyle = chip.dataset.style;
    });
  });

  // ── Background preset chips ──
  document.querySelectorAll('#bg-preset-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#bg-preset-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedBg = chip.dataset.bg;
    });
  });

  // ── Font style chips ──
  document.querySelectorAll('#ai-font-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#ai-font-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedFontStyle = chip.dataset.fontstyle;
    });
  });

  // ── Font color swatches ──
  document.querySelectorAll('#ai-color-swatches .ai-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('#ai-color-swatches .ai-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      selectedFontColor = sw.dataset.color;
    });
  });

  // ── Render mode toggle ──
  document.querySelectorAll('.ai-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ai-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      textMode = btn.dataset.mode;
      document.getElementById('ai-mode-tip-layer').style.display  = textMode === 'layer'  ? 'flex' : 'none';
      document.getElementById('ai-mode-tip-prompt').style.display = textMode === 'prompt' ? 'flex' : 'none';
    });
  });

  // ── Enable/disable text extras based on input ──
  const textOverlayEl  = document.getElementById('ai-text-overlay');
  const textExtrasEl   = document.getElementById('ai-text-extras');
  function syncTextExtras() {
    const hasText = !!textOverlayEl?.value.trim();
    textExtrasEl?.classList.toggle('active', hasText);
  }
  textOverlayEl?.addEventListener('input', syncTextExtras);
  syncTextExtras();

  // ── Advanced toggle ──
  const advBtn  = document.getElementById('ai-advanced-toggle');
  const advBody = document.getElementById('ai-advanced-body');
  advBtn?.addEventListener('click', () => {
    const open = advBtn.getAttribute('aria-expanded') === 'true';
    advBtn.setAttribute('aria-expanded', String(!open));
    advBody.style.display = open ? 'none' : 'flex';
  });

  // ── Random seed button ──
  on('ai-rand-seed', 'click', () => {
    set('ai-seed', Math.floor(Math.random() * 999999));
  });

  // ── Generate button ──
  on('ai-generate-btn', 'click', () => runGenerate());

  // ── Modal helpers ──
  function openModal() {
    document.getElementById('ai-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('ai-modal').style.display = 'none';
    document.body.style.overflow = '';
  }

  function showModalLoading() {
    document.getElementById('ai-modal-img').style.display     = 'none';
    document.getElementById('ai-modal-loading').style.display = 'flex';
    document.getElementById('ai-modal-err').style.display     = 'none';
    document.getElementById('ai-modal-prompt-text').style.display = 'none';
    document.getElementById('ai-modal-actions').style.display = 'none';
    document.getElementById('ai-modal-regen').style.display   = 'none';
  }

  function showModalResult(directUrl, promptText) {
    const imgEl = document.getElementById('ai-modal-img');
    imgEl.src = directUrl;
    imgEl.style.display = 'block';
    document.getElementById('ai-modal-loading').style.display = 'none';
    document.getElementById('ai-modal-err').style.display     = 'none';
    document.getElementById('ai-modal-prompt-text').textContent = promptText;
    document.getElementById('ai-modal-prompt-text').style.display = 'block';
    document.getElementById('ai-modal-actions').style.display = 'flex';
    document.getElementById('ai-modal-regen').style.display   = 'flex';
    // Note and primary-button emphasis depend on mode + whether text was entered
    const noteEl      = document.getElementById('ai-text-note');
    const addBtn      = document.getElementById('ai-modal-add-canvas');
    const addTextBtn  = document.getElementById('ai-modal-add-text-layer');

    if (lastOverlayText && textMode === 'layer') {
      noteEl.innerHTML = '<svg width="13" height="13" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#059669" stroke-width="1.2"/><path d="M4 6l1.5 1.5L8.5 4" stroke="#059669" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg> Text will be added as a crisp, editable canvas layer.';
      noteEl.className = 'ai-text-note good';
      noteEl.style.display = 'flex';
      addTextBtn.className = 'ai-action-btn primary';
      addBtn.className     = 'ai-action-btn primary-alt';
    } else if (lastOverlayText && textMode === 'prompt') {
      noteEl.innerHTML = '<svg width="13" height="13" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#d97706" stroke-width="1.2"/><path d="M6 5v3M6 3.5v.5" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/></svg> AI may have misspelled or garbled the text. Use <strong>Add with Text Layer</strong> for accurate results.';
      noteEl.className = 'ai-text-note';
      noteEl.style.display = 'flex';
      addBtn.className     = 'ai-action-btn primary';
      addTextBtn.className = 'ai-action-btn primary-alt';
    } else {
      noteEl.style.display = 'none';
      addBtn.className     = 'ai-action-btn primary';
      addTextBtn.className = 'ai-action-btn primary-alt';
    }
  }

  function showModalError(msg) {
    document.getElementById('ai-modal-img').style.display     = 'none';
    document.getElementById('ai-modal-loading').style.display = 'none';
    document.getElementById('ai-modal-err').style.display     = 'block';
    document.getElementById('ai-modal-err').querySelector('p').textContent = msg;
    document.getElementById('ai-modal-prompt-text').style.display = 'none';
    document.getElementById('ai-modal-actions').style.display = 'none';
    document.getElementById('ai-modal-regen').style.display   = 'flex';
  }

  // ── Core generation ──
  async function runGenerate() {
    const prompt = val('ai-prompt').trim();
    if (!prompt) { toast('Enter a prompt first.', 'error'); return; }

    let fullPrompt = prompt;
    if (selectedStyle) fullPrompt += `, ${selectedStyle}`;
    if (selectedBg)    fullPrompt += `, ${selectedBg}`;

    // Text — only bake into prompt when mode is 'prompt'; 'layer' mode skips this
    const overlayText = val('ai-text-overlay').trim();
    lastOverlayText = overlayText;
    if (overlayText && textMode === 'prompt') {
      const pos = val('ai-text-position');
      const posMap = { center: 'centered', top: 'at the top', bottom: 'at the bottom' };
      const fontStylePromptMap = {
        bold: 'bold legible sans-serif', outlined: 'bold outlined with white stroke',
        handwritten: 'handwritten cursive', minimal: 'clean minimal thin',
        serif: 'elegant serif', script: 'flowing script cursive',
        graffiti: 'bold graffiti street art', neon: 'neon glowing',
        gothic: 'gothic blackletter', retro: 'retro vintage bold italic',
      };
      const colorName = document.querySelector('#ai-color-swatches .ai-swatch.active')?.title || '';
      fullPrompt += `, with the text "${overlayText}" clearly rendered ${posMap[pos] || 'centered'} in ${fontStylePromptMap[selectedFontStyle] || 'bold legible'} ${colorName} typography`;
    }

    const negative = val('ai-negative').trim();
    if (negative) fullPrompt += ` | avoid: ${negative}`;
    lastPromptText = fullPrompt;

    let w = canvasW, h = canvasH;
    const sizeVal = val('ai-size');
    if (sizeVal !== 'canvas') {
      const [sw, sh] = sizeVal.split('x').map(Number);
      w = sw; h = sh;
    }
    w = clamp(w, 64, 2048);
    h = clamp(h, 64, 2048);

    const seedEl = document.getElementById('ai-seed');
    const seed   = seedEl.value ? +seedEl.value : Math.floor(Math.random() * 999999);
    if (!seedEl.value) seedEl.value = seed;

    const model = val('ai-model');
    const params = new URLSearchParams({ width: w, height: h, seed, nologo: true, model });
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?${params}`;

    setGenerating(true);
    openModal();
    showModalLoading();

    // Load the image directly — no crossOrigin attribute so it always displays
    const img = new Image();
    img.onload = () => {
      lastDirectUrl = imageUrl;
      // Update panel thumbnail
      document.getElementById('ai-preview-img').src = imageUrl;
      document.getElementById('ai-result').style.display = 'block';
      document.getElementById('ai-error').style.display  = 'none';

      showModalResult(imageUrl, fullPrompt);
      setGenerating(false);
      toast('Image generated!', 'success');
    };
    img.onerror = () => {
      lastDirectUrl = null;
      document.getElementById('ai-result').style.display = 'none';
      document.getElementById('ai-error').textContent = 'Generation failed — the service may be busy.';
      document.getElementById('ai-error').style.display = 'block';

      showModalError('Generation failed — the service may be busy. Try again or adjust your prompt.');
      setGenerating(false);
    };
    img.src = imageUrl;
  }

  // ── Modal close ──
  on('ai-modal-close',   'click', closeModal);
  on('ai-modal-overlay', 'click', closeModal);

  // ── Regen inside modal ──
  on('ai-modal-regen', 'click', () => runGenerate());

  // ── Re-open modal from panel thumbnail ──
  on('ai-view-result', 'click', () => {
    if (!lastDirectUrl) return;
    openModal();
    showModalResult(lastDirectUrl, lastPromptText);
  });

  // ── Add to canvas ──
  on('ai-modal-add-canvas', 'click', async () => {
    if (!lastDirectUrl) return;
    try {
      const dataUrl = await fetchAsDataUrl(lastDirectUrl);
      addImageEl(dataUrl);
    } catch {
      // CORS fallback: load directly via fabric (won't be exportable, but visible)
      addImageEl(lastDirectUrl);
    }
    closeModal();
    toast('Added to canvas!', 'success');
  });

  // ── Set as background ──
  on('ai-modal-set-bg', 'click', async () => {
    if (!lastDirectUrl) return;
    let dataUrl = lastDirectUrl;
    try { dataUrl = await fetchAsDataUrl(lastDirectUrl); } catch { /* use direct URL */ }

    bgState.imageData = dataUrl;
    bgState.type = 'image';
    applyImageBg(dataUrl, 'cover');
    document.querySelectorAll('#bg-tabs .sub-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'image'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('bg-image-panel').classList.add('active');
    document.getElementById('bg-fit-row').style.display      = 'flex';
    document.getElementById('remove-bg-image').style.display = 'block';
    switchPanelTab('bg');
    closeModal();
    toast('Set as background!', 'success');
  });

  // ── Download ──
  on('ai-modal-download', 'click', async () => {
    if (!lastDirectUrl) return;
    try {
      const res  = await fetch(lastDirectUrl);
      const blob = await res.blob();
      const burl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = burl;
      a.download = 'ai-image.jpg';
      a.click();
      URL.revokeObjectURL(burl);
      toast('Downloading…', 'success');
    } catch {
      // Fallback: open in new tab
      window.open(lastDirectUrl, '_blank');
    }
  });

  // ── Share ──
  on('ai-modal-share', 'click', async () => {
    if (!lastDirectUrl) return;
    // Try sharing as a file (mobile), then as URL, then clipboard
    try {
      const res  = await fetch(lastDirectUrl);
      const blob = await res.blob();
      const file = new File([blob], 'ai-image.jpg', { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'AI Generated Image', text: lastPromptText });
        return;
      }
    } catch { /* fall through */ }

    try {
      await navigator.share({ url: lastDirectUrl, title: 'AI Generated Image', text: lastPromptText });
      return;
    } catch { /* fall through */ }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(lastDirectUrl);
      toast('Link copied to clipboard!', 'success');
    } catch {
      toast('Sharing not available on this device.', 'error');
    }
  });

  // ── Add with Text Layer ──
  on('ai-modal-add-text-layer', 'click', async () => {
    if (!lastDirectUrl) return;
    let dataUrl = lastDirectUrl;
    try { dataUrl = await fetchAsDataUrl(lastDirectUrl); } catch { /* use direct url */ }
    const textToAdd = lastOverlayText || 'Your Text Here';
    const pos = val('ai-text-position') || 'center';
    // Add text inside the fromURL callback so it lands on top of the image
    addImageEl(dataUrl, () => {
      addTextWithStyle(textToAdd, selectedFontColor, selectedFontStyle, pos);
    });
    closeModal();
    toast('Added image + text layer!', 'success');
  });
}

function addTextWithStyle(text, color, fontStyleKey, position = 'center') {
  const styleMap = {
    bold:        { fontFamily: 'Oswald, Arial Black, Arial', fontWeight: 'bold' },
    outlined:    { fontFamily: 'Montserrat, Arial', fontWeight: 'bold', fill: 'transparent', stroke: color, strokeWidth: 3 },
    handwritten: { fontFamily: 'cursive', fontStyle: 'italic' },
    minimal:     { fontFamily: 'Lato, Helvetica Neue, Arial', fontWeight: '300' },
    serif:       { fontFamily: 'Playfair Display, Georgia, serif' },
    script:      { fontFamily: 'cursive', fontStyle: 'italic' },
    graffiti:    { fontFamily: 'Impact, Arial Black', fontWeight: 'bold', fontStyle: 'italic' },
    neon:        { fontFamily: 'Montserrat, Arial', fontWeight: 'bold', shadow: new fabric.Shadow({ color, blur: 18, offsetX: 0, offsetY: 0 }) },
    gothic:      { fontFamily: 'Palatino, Times New Roman, serif', fontWeight: 'bold' },
    retro:       { fontFamily: 'Oswald, Impact, Arial', fontWeight: 'bold', fontStyle: 'italic' },
  };
  const styleProps = { ...(styleMap[fontStyleKey] || styleMap.bold) };
  const fontSize = Math.round(Math.min(canvasW, canvasH) * 0.08);
  const topPos = position === 'top'    ? fontSize * 1.2
               : position === 'bottom' ? canvasH - fontSize * 1.8
               : cy();
  const obj = new fabric.IText(text, {
    left: cx(), top: topPos, originX: 'center', originY: 'center',
    fontSize,
    fill: styleProps.fill !== undefined ? styleProps.fill : color,
    textAlign: 'center',
    data: { type: 'text', name: nextName('Text') },
    ...styleProps,
  });
  add(obj);
}

function setGenerating(isOn) {
  const btn    = document.getElementById('ai-generate-btn');
  const text   = document.getElementById('ai-btn-text');
  const spin   = document.getElementById('ai-spinner');
  const icon   = document.getElementById('ai-icon');
  btn.disabled = isOn;
  text.style.display = isOn ? 'none' : 'inline';
  icon.style.display = isOn ? 'none' : 'inline';
  spin.style.display = isOn ? 'inline-block' : 'none';
}

async function fetchAsDataUrl(url) {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    img.onload  = resolve;
    img.onerror = reject;
    // Cache-bust to avoid browser serving a tainted cached copy
    img.src = url + '&_cb=' + Date.now();
  });

  const tmp = document.createElement('canvas');
  tmp.width  = img.naturalWidth;
  tmp.height = img.naturalHeight;
  tmp.getContext('2d').drawImage(img, 0, 0);
  return tmp.toDataURL('image/png');
}

// ── Toast ──────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.getElementById('toast-container').appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 320);
  }, 2600);
}

// ── Mobile bottom sheet ────────────────────────────────────
function isMobile() { return window.innerWidth < 640; }

function openSheet() {
  document.querySelector('.sidebar-right').classList.add('sheet-open');
  document.getElementById('sheet-backdrop').classList.add('visible');
  document.getElementById('mobile-fab-row')?.classList.add('sheet-open');
}

function closeSheet() {
  document.querySelector('.sidebar-right').classList.remove('sheet-open');
  document.getElementById('sheet-backdrop').classList.remove('visible');
  document.getElementById('mobile-fab-row')?.classList.remove('sheet-open');
}

function setupMobileSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  const sidebar  = document.querySelector('.sidebar-right');

  // Backdrop tap → close sheet
  backdrop.addEventListener('click', () => {
    closeSheet();
    canvas.discardActiveObject();
    canvas.renderAll();
  });

  // Tab bar tap → always open the sheet on mobile.
  // (Close is handled by backdrop tap, swipe-down, and canvas tap.)
  document.querySelectorAll('.ptab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (!isMobile()) return;
      openSheet();
    });
  });

  // AI toolbar button → open sheet to AI tab on mobile too
  on('ai-tool-btn', 'click', () => { if (isMobile()) openSheet(); });

  // Swipe-down on the drag handle → close sheet
  const handle = document.getElementById('sheet-drag-handle');
  let touchStartY = 0;
  handle.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  handle.addEventListener('touchend',   e => {
    if (e.changedTouches[0].clientY - touchStartY > 40) closeSheet();
  }, { passive: true });

  // Swipe-down anywhere on the sheet tab bar also closes it
  const ptabBar = document.querySelector('.ptab-bar');
  ptabBar.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  ptabBar.addEventListener('touchend',   e => {
    if (e.changedTouches[0].clientY - touchStartY > 50) closeSheet();
  }, { passive: true });

  // Tapping on canvas while sheet is open → close sheet + deselect
  document.getElementById('canvas-area').addEventListener('touchend', () => {
    if (isMobile() && sidebar.classList.contains('sheet-open')) {
      closeSheet();
    }
  }, { passive: true });

  // Mobile FABs
  on('fab-export-btn', 'click', exportImage);
  on('fab-share-btn',  'click', openShareModal);
}

// ── Share Modal ────────────────────────────────────────────
function openShareModal() {
  document.getElementById('share-modal-sub').textContent = `${canvasW} × ${canvasH} · JPEG`;
  document.getElementById('share-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  document.getElementById('share-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function setupShareModal() {
  on('share-modal-close',   'click', closeShareModal);
  on('share-modal-overlay', 'click', closeShareModal);

  // Copy image to clipboard (big CTA button)
  on('share-copy-img-btn', 'click', async () => {
    await copyClipboard();
    const btn = document.getElementById('share-copy-img-btn');
    btn.classList.add('copied');
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M10 3.5H5A1.5 1.5 0 003.5 5v7A1.5 1.5 0 005 13.5h7A1.5 1.5 0 0013.5 12V7M10 3.5l3.5 3.5M10 3.5V7h3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Copy image to clipboard';
    }, 2000);
  });

  // "See all" toggle
  const seeAllBtn = document.getElementById('shr-see-all');
  if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => {
      const extras = document.querySelectorAll('.share-extra');
      const expanded = seeAllBtn.dataset.expanded === 'true';
      extras.forEach(el => el.classList.toggle('visible', !expanded));
      seeAllBtn.dataset.expanded = String(!expanded);
      const label = document.getElementById('shr-see-all-label');
      if (label) label.textContent = expanded ? 'See all' : 'Show less';
    });
  }

  // Platform grid — event delegation via data-shr
  const platformUrls = {
    instagram: 'https://www.instagram.com/',
    twitter:   'https://twitter.com/intent/tweet',
    facebook:  'https://www.facebook.com/',
    whatsapp:  'https://wa.me/',
    email:     'mailto:?subject=My%20Image&body=See%20the%20attached%20image.',
    tiktok:    'https://www.tiktok.com/',
    pinterest: 'https://www.pinterest.com/',
    linkedin:  'https://www.linkedin.com/',
    telegram:  'https://web.telegram.org/',
    reddit:    'https://www.reddit.com/submit',
    snapchat:  'https://www.snapchat.com/',
    discord:   'https://discord.com/',
  };
  const platformNames = {
    instagram: 'Instagram', twitter: 'X (Twitter)', facebook: 'Facebook',
    whatsapp: 'WhatsApp', email: 'Email', tiktok: 'TikTok',
    pinterest: 'Pinterest', linkedin: 'LinkedIn', telegram: 'Telegram',
    reddit: 'Reddit', snapchat: 'Snapchat', discord: 'Discord',
  };

  const grid = document.getElementById('share-platform-grid');
  if (grid) {
    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-shr]');
      if (!btn) return;
      const shr = btn.dataset.shr;
      if (shr === 'download') { exportImage(); closeShareModal(); return; }
      if (shr === 'native')   { shareViaOSSheet(); return; }
      if (shr === 'whatsapp') { shareViaWhatsApp(); return; }
      if (platformUrls[shr]) window.open(platformUrls[shr], '_blank');
      closeShareModal();
    });
  }
}

async function shareViaOSSheet() {
  const { dataUrl, filename } = getCanvasBlob();
  try {
    const blob = dataURLToBlob(dataUrl);
    const file = new File([blob], filename, { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: filename });
      closeShareModal();
      return;
    }
    exportImage();
    toast('Image saved — share the file on your preferred platform.', 'success');
    closeShareModal();
  } catch (err) {
    if (err?.name === 'AbortError') return;
    exportImage();
    closeShareModal();
  }
}

function shareViaWhatsApp() {
  window.open('whatsapp://', '_blank');
  closeShareModal();
}

// ── Add Layer ──────────────────────────────────────────────
function setupAddLayer() {
  const btn  = document.getElementById('add-layer-btn');
  const menu = document.getElementById('add-layer-menu');

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  }
  function toggleMenu() {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  }

  btn.addEventListener('click', e => { e.stopPropagation(); toggleMenu(); });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && e.target !== btn) closeMenu();
  });

  // Wire each item
  menu.querySelectorAll('.add-layer-item').forEach(item => {
    item.addEventListener('click', () => {
      closeMenu();
      switch (item.dataset.layer) {
        case 'text':     addText();     break;
        case 'rect':     addRect();     break;
        case 'circle':   addCircle();   break;
        case 'triangle': addTriangle(); break;
        case 'line':     addLine();     break;
        case 'image':    document.getElementById('image-file').click(); break;
      }
    });
  });
}

// ── Helpers ────────────────────────────────────────────────
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function activeObj()  { return canvas.getActiveObject(); }
function inputFocused() { return ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName); }
function isValidHex(s) { return /^#[0-9a-fA-F]{6}$/.test(s); }
function isShape(t) { return ['rect','circle','triangle','line'].includes(t); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

function objType(obj) {
  if (obj.data?.type) return obj.data.type;
  if (obj instanceof fabric.IText || obj instanceof fabric.Text) return 'text';
  if (obj instanceof fabric.Rect)     return 'rect';
  if (obj instanceof fabric.Ellipse)  return 'circle';
  if (obj instanceof fabric.Triangle) return 'triangle';
  if (obj instanceof fabric.Line)     return 'line';
  if (obj instanceof fabric.Image)    return 'image';
  return 'shape';
}

function on(id, event, fn) { document.getElementById(id)?.addEventListener(event, fn); }
function val(id) { return document.getElementById(id)?.value ?? ''; }
function set(id, v) { const el = document.getElementById(id); if (el) el.value = v; }
function setTxt(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function tog(id, active) { document.getElementById(id)?.classList.toggle('active', active); }

function safeColor(id, v) {
  if (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) set(id, v);
}

function upd(props) {
  const o = activeObj();
  if (!o) return;
  o.set(props);
  canvas.renderAll();
}

function syncColorPair(colorId, hexId, cb) {
  const colorEl = document.getElementById(colorId);
  const hexEl   = document.getElementById(hexId);
  if (!colorEl || !hexEl) return;
  colorEl.addEventListener('input', () => { hexEl.value = colorEl.value; cb(colorEl.value); });
  hexEl.addEventListener('change', () => {
    if (isValidHex(hexEl.value)) { colorEl.value = hexEl.value; cb(hexEl.value); }
  });
}

function toggleStyle(btnId, prop, onVal, offVal) {
  on(btnId, 'click', () => {
    const o = activeObj(); if (!o) return;
    const current = o[prop];
    const next    = current === onVal ? offVal : onVal;
    upd({ [prop]: next });
    tog(btnId, next === onVal);
  });
}

// ── Background Templates ───────────────────────────────────
const BG_TEMPLATES = [
  { name: 'Midnight', gradType: 'linear', color1: '#1a1a2e', color2: '#4a4e69', angle: 135 },
  { name: 'Sunset',   gradType: 'linear', color1: '#f7567c', color2: '#ffbe0b', angle: 135 },
  { name: 'Ocean',    gradType: 'linear', color1: '#0077b6', color2: '#00b4d8', angle: 180 },
  { name: 'Forest',   gradType: 'linear', color1: '#134e5e', color2: '#71b280', angle: 135 },
  { name: 'Lavender', gradType: 'linear', color1: '#7b2ff7', color2: '#f107a3', angle: 135 },
  { name: 'Golden',   gradType: 'linear', color1: '#f7971e', color2: '#ffd200', angle: 135 },
  { name: 'Aurora',   gradType: 'linear', color1: '#00d2ff', color2: '#3a47d5', angle: 135 },
  { name: 'Blush',    gradType: 'linear', color1: '#fccb90', color2: '#d57eeb', angle: 135 },
  { name: 'Ember',    gradType: 'linear', color1: '#e96c1e', color2: '#c0392b', angle: 135 },
  { name: 'Mint',     gradType: 'linear', color1: '#11998e', color2: '#38ef7d', angle: 135 },
];

function setupBgTemplates() {
  const grid = document.getElementById('template-grid');
  if (!grid) return;

  BG_TEMPLATES.forEach(tpl => {
    const btn = document.createElement('button');
    btn.className = 'bg-template-btn';
    btn.title = tpl.name;
    btn.style.background = `linear-gradient(${tpl.angle}deg, ${tpl.color1}, ${tpl.color2})`;
    btn.innerHTML = `<span class="bg-tpl-name">${tpl.name}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bg-template-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyBgTemplate(tpl);
    });
    grid.appendChild(btn);
  });
}

function applyBgTemplate(tpl) {
  bgState.gradient.type   = tpl.gradType || 'linear';
  bgState.gradient.color1 = tpl.color1;
  bgState.gradient.color2 = tpl.color2;
  bgState.gradient.angle  = tpl.angle ?? 135;
  bgState.type = 'gradient';
  applyGradientBg();
}

// ── Transparent background ─────────────────────────────────
function setupTransparentBg() {
  const toggle = document.getElementById('transparent-bg-toggle');
  if (!toggle) return;
  const saved = localStorage.getItem('jpeg-gen-transparent-bg');
  toggle.checked = saved === null ? true : saved === 'true';
  toggle.addEventListener('change', () => {
    localStorage.setItem('jpeg-gen-transparent-bg', toggle.checked);
  });
}

// ── Image History ──────────────────────────────────────────
const HISTORY_KEY    = 'jpeg-gen-history';
const HISTORY_EN_KEY = 'jpeg-gen-history-enabled';
const HISTORY_MAX    = 8;

function setupHistory() {
  const toggle = document.getElementById('history-toggle');
  const panel  = document.getElementById('history-panel');
  if (!toggle || !panel) return;

  toggle.checked = localStorage.getItem(HISTORY_EN_KEY) === 'true';
  if (toggle.checked) { panel.style.display = 'block'; renderHistoryGrid(); }

  toggle.addEventListener('change', () => {
    localStorage.setItem(HISTORY_EN_KEY, toggle.checked);
    panel.style.display = toggle.checked ? 'block' : 'none';
    if (toggle.checked) renderHistoryGrid();
  });

  document.getElementById('history-clear-btn').addEventListener('click', () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistoryGrid();
  });
}

function isHistoryEnabled() {
  return localStorage.getItem(HISTORY_EN_KEY) === 'true';
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { return []; }
}

function saveToHistory(dataUrl, filename) {
  if (!isHistoryEnabled()) return;
  let items = getHistory();
  items.unshift({ id: Date.now(), filename, dataUrl });
  items = items.slice(0, HISTORY_MAX);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch {
    // localStorage full — drop oldest until it fits
    while (items.length > 1) {
      items.pop();
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(items)); break; }
      catch { /* continue */ }
    }
  }
  renderHistoryGrid();
}

function renderHistoryGrid() {
  const grid = document.getElementById('history-grid');
  if (!grid) return;
  const items = getHistory();
  if (items.length === 0) {
    grid.innerHTML = '<p class="history-empty">No exports yet.</p>';
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="history-item">
      <img src="${item.dataUrl}" alt="${item.filename}">
      <div class="history-item-name">${item.filename}</div>
      <a class="history-dl" href="${item.dataUrl}" download="${item.filename}" title="Download">↓</a>
    </div>
  `).join('');
}

