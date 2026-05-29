'use strict';

// ── i18n ───────────────────────────────────────────────────
let currentLang = localStorage.getItem('imaj-lang') || 'en';

const STRINGS = {
  en: {
    'hdr-bg': 'BG', 'hdr-add-text': '+ Text', 'hdr-add-image': '+ Image',
    'hdr-ai': 'AI Art', 'hdr-panel': 'Panel', 'zoom-fit': 'Fit',
    'hdr-export': 'Export', 'save-image': 'Save Image', 'share': 'Share',
    'copy-clipboard': 'Copy to Clipboard',
    'tab-bg': 'Background', 'tab-bg-short': 'BG',
    'sub-templates': 'Templates', 'sub-color': 'Color',
    'prop-content': 'Content', 'insert-verse': 'Insert Bible Verse',
    'prop-font': 'Font', 'prop-color': 'Color',
    'close-panel': 'Close', 'prop-back': 'Canvas', 'advanced': 'Advanced',
    'layers-title': 'Layers', 'add-layer': 'Add layer',
    'layer-text': 'Text', 'layer-rect': 'Rectangle', 'layer-circle': 'Circle',
    'layer-tri': 'Triangle', 'layer-line': 'Line', 'layer-image': 'Image',
    'action-change-bg': 'Change Background', 'action-add-text': 'Add Text',
    'action-reset': 'Reset', 'action-edit-text': 'Edit Text', 'action-delete': 'Delete',
    'fab-save': 'Save',
    'verse-modal-title': 'Bible Verse',
    'verse-search-ph': 'e.g. John 3:16, Psalm 23, or a keyword…',
    'verse-hint-text': 'Type a reference (John 3:16) to look up any verse in the Bible, or search by keyword.',
    'popular-verses': 'Popular Verses', 'verse-results': 'Results',
    'verse-not-found': 'Verse not found. Try a format like "John 3:16" or "Psalm 23:1-3".',
    'verse-looking-up': 'Looking up…',
    'verse-no-api': 'Reference lookup is not available in Kreyol. Browse popular verses or switch to EN / FR.',
    'export-quality': 'Quality', 'export-scale': 'Scale', 'export-filename': 'Filename',
    'export-transparent': 'Transparent bg', 'export-history': 'Save history',
    'export-recent': 'Recent exports', 'export-clear': 'Clear all',
  },
  fr: {
    'hdr-bg': 'Fond', 'hdr-add-text': '+ Texte', 'hdr-add-image': '+ Image',
    'hdr-ai': 'IA Art', 'hdr-panel': 'Panneau', 'zoom-fit': 'Adapter',
    'hdr-export': 'Exporter', 'save-image': 'Enregistrer', 'share': 'Partager',
    'copy-clipboard': 'Copier',
    'tab-bg': 'Arrière-plan', 'tab-bg-short': 'Fond',
    'sub-templates': 'Modèles', 'sub-color': 'Couleur',
    'prop-content': 'Contenu', 'insert-verse': 'Insérer un Verset',
    'prop-font': 'Police', 'prop-color': 'Couleur',
    'close-panel': 'Fermer', 'prop-back': 'Canevas', 'advanced': 'Avancé',
    'layers-title': 'Calques', 'add-layer': 'Ajouter calque',
    'layer-text': 'Texte', 'layer-rect': 'Rectangle', 'layer-circle': 'Cercle',
    'layer-tri': 'Triangle', 'layer-line': 'Ligne', 'layer-image': 'Image',
    'action-change-bg': 'Changer le fond', 'action-add-text': 'Ajouter texte',
    'action-reset': 'Réinitialiser', 'action-edit-text': 'Modifier texte', 'action-delete': 'Supprimer',
    'fab-save': 'Enregistrer',
    'verse-modal-title': 'Verset Biblique',
    'verse-search-ph': 'ex. Jean 3:16, Psaume 23, ou un mot-clé…',
    'verse-hint-text': 'Entrez une référence (Jean 3:16) pour chercher dans toute la Bible, ou par mot-clé.',
    'popular-verses': 'Versets Populaires', 'verse-results': 'Résultats',
    'verse-not-found': 'Verset non trouvé. Essayez "Jean 3:16" ou "Psaume 23:1-3".',
    'verse-looking-up': 'Recherche…',
    'verse-no-api': 'La recherche par référence n\'est pas disponible en Kreyol. Consultez les versets populaires ou passez en EN / FR.',
    'export-quality': 'Qualité', 'export-scale': 'Échelle', 'export-filename': 'Nom du fichier',
    'export-transparent': 'Fond transparent', 'export-history': 'Historique',
    'export-recent': 'Exportations récentes', 'export-clear': 'Tout effacer',
  },
  ht: {
    'hdr-bg': 'Fon', 'hdr-add-text': '+ Tèks', 'hdr-add-image': '+ Imaj',
    'hdr-ai': 'AI Atizay', 'hdr-panel': 'Panèl', 'zoom-fit': 'Adapte',
    'hdr-export': 'Ekspòte', 'save-image': 'Sove Imaj', 'share': 'Pataje',
    'copy-clipboard': 'Kopye',
    'tab-bg': 'Fon', 'tab-bg-short': 'Fon',
    'sub-templates': 'Modèl', 'sub-color': 'Koulè',
    'prop-content': 'Kontni', 'insert-verse': 'Mete Vèsè Bib',
    'prop-font': 'Polis', 'prop-color': 'Koulè',
    'close-panel': 'Fèmen', 'prop-back': 'Kanvas', 'advanced': 'Avanse',
    'layers-title': 'Kouch', 'add-layer': 'Ajoute Kouch',
    'layer-text': 'Tèks', 'layer-rect': 'Rektang', 'layer-circle': 'Sèk',
    'layer-tri': 'Triyang', 'layer-line': 'Liy', 'layer-image': 'Imaj',
    'action-change-bg': 'Chanje Fon', 'action-add-text': 'Ajoute Tèks',
    'action-reset': 'Reyinisyalize', 'action-edit-text': 'Modifye Tèks', 'action-delete': 'Efase',
    'fab-save': 'Sove',
    'verse-modal-title': 'Vèsè Bib',
    'verse-search-ph': 'egz. Jan 3:16, Sòm 23, oswa yon mo-kle…',
    'verse-hint-text': 'Tape yon referans (Jan 3:16) pou chèche nan tout Bib la, oswa chèche pa mo-kle.',
    'popular-verses': 'Vèsè Popilè', 'verse-results': 'Rezilta',
    'verse-not-found': 'Vèsè pa jwenn. Eseye "Jan 3:16" oswa "Sòm 23:1-3".',
    'verse-looking-up': 'Ap chèche…',
    'verse-no-api': 'Rechèch pa disponib nan Kreyòl. Gade vèsè popilè yo oswa chanje pou EN / FR.',
    'export-quality': 'Kalite', 'export-scale': 'Echèl', 'export-filename': 'Non Fichye',
    'export-transparent': 'Fon transparan', 'export-history': 'Sove Istwa',
    'export-recent': 'Dènye Ekspòtasyon', 'export-clear': 'Efase Tout',
  },
};

function getStr(key) {
  return (STRINGS[currentLang] || STRINGS.en)[key] ?? STRINGS.en[key] ?? key;
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('imaj-lang', lang);
  const S = STRINGS[lang] || STRINGS.en;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = S[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = S[el.dataset.i18nPh];
    if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n-preset]').forEach(el => {
    const t = PRESET_TRANSLATIONS[el.dataset.i18nPreset];
    if (t) el.textContent = t[lang] || t.en;
  });
}

function setupLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
  applyLanguage(currentLang);
}

// ── State ──────────────────────────────────────────────────
let canvas;
let zoomLevel = 1;
let canvasW = 800;
let canvasH = 600;
let elemCounter = 0;
let suppressSheetOnce = false;

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

  // Prevent browser scroll/pan from stealing touch events on the Fabric canvas elements
  document.querySelectorAll('#canvas-wrapper canvas').forEach(el => {
    el.style.touchAction = 'none';
  });

  // Larger, touch-friendly selection handles
  fabric.Object.prototype.set({
    cornerSize:        22,
    cornerColor:       '#ffffff',
    cornerStrokeColor: '#6c63ff',
    cornerStyle:       'circle',
    borderColor:       '#6c63ff',
    borderScaleFactor: 2,
    transparentCorners: false,
    padding:           6,
  });

  setupCanvasSize();
  setupBackground();
  bgState.type = 'gradient';
  applyGradientBg();
  setupElements();
  setupProperties();
  setupAIGenerate();
  setupExport();
  setupZoom();
  setupKeyboard();
  setupDragOver();
  setupPanelTabs();
  setupPanelToggle();
  setupMobileSheet();
  setupAddLayer();
  setupShareModal();
  setupFilename();
  setupHistory();
  setupTransparentBg();
  setupBgTemplates();
  setupLangToggle();

  canvas.on('selection:created', (e) => { onSelection(e); maybeShowSelectHint(e); });
  canvas.on('selection:updated', onSelection);
  canvas.on('selection:cleared', () => {
    showTabsView();
    if (isMobile()) {
      const sidebar = document.querySelector('.sidebar-right');
      if (sidebar.classList.contains('sheet-open')) closeSheet();
    }
    updateLayers();
  });
  canvas.on('object:added',    updateLayers);
  canvas.on('object:removed',  updateLayers);
  canvas.on('object:modified', updateLayers);

  // Prevent mobile browser from scrolling when Fabric focuses its hidden textarea.
  // The CSS rule pins the textarea to fixed already; this JS call uses preventScroll
  // so the focus itself doesn't trigger a scroll jump.
  canvas.on('text:editing:entered', () => {
    if (!isMobile()) return;
    const ta = document.querySelector('#canvas-wrapper textarea');
    if (ta) ta.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  });

  fitToView();

  // Re-fit when window resizes (orientation change, etc.)
  window.addEventListener('resize', debounce(fitToView, 180));

  setupTemplateModal();
  setupVersePicker();
});

// ── Template picker ────────────────────────────────────────
const TEMPLATES = {
  blank: null,
  quote: {
    gradient: { type: 'linear', color1: '#1a1a3e', color2: '#3b2f7f', angle: 135 },
    text: { content: '"Your quote goes here"', fontSize: 42, fill: '#ffffff', fontStyle: 'italic', fontFamily: 'Playfair Display' },
  },
  announce: {
    gradient: { type: 'linear', color1: '#6c63ff', color2: '#c084fc', angle: 135 },
    text: { content: 'BIG ANNOUNCEMENT', fontSize: 52, fill: '#ffffff', fontWeight: 'bold', fontFamily: 'Montserrat' },
  },
  birthday: {
    gradient: { type: 'linear', color1: '#ff6584', color2: '#ffb347', angle: 135 },
    text: { content: '🎉 Happy Birthday!', fontSize: 48, fill: '#ffffff', fontWeight: 'bold', fontFamily: 'Lato' },
  },
};

function setupTemplateModal() {
  if (localStorage.getItem('imaj-tpl-seen')) return;
  const modal = document.getElementById('template-modal');
  if (!modal) return;
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');

  function dismiss() {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    localStorage.setItem('imaj-tpl-seen', '1');
  }

  modal.querySelectorAll('.template-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const tpl = TEMPLATES[btn.dataset.tpl];
      if (tpl) {
        bgState.gradient = { ...bgState.gradient, ...tpl.gradient };
        bgState.type = 'gradient';
        applyGradientBg();
        if (tpl.text) {
          const obj = new fabric.IText(tpl.text.content, {
            left: canvasW / 2, top: canvasH / 2,
            originX: 'center', originY: 'center',
            fontFamily: tpl.text.fontFamily ?? 'Arial',
            fontSize: tpl.text.fontSize ?? 48,
            fill: tpl.text.fill ?? '#ffffff',
            fontWeight: tpl.text.fontWeight ?? 'normal',
            fontStyle: tpl.text.fontStyle ?? 'normal',
            textAlign: 'center',
            data: { type: 'text', name: 'Text 1' },
          });
          add(obj);
        }
      }
      dismiss();
    });
  });

  document.getElementById('template-skip')?.addEventListener('click', dismiss);
}

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
  bgColor.addEventListener('change', () => { if (isMobile()) closeSheet(); });
  bgHex.addEventListener('change', () => {
    if (isValidHex(bgHex.value)) { bgColor.value = bgHex.value; bgState.color = bgHex.value; applyColorBg(bgHex.value); if (isMobile()) closeSheet(); }
  });

  // Quick swatches
  document.querySelectorAll('#bg-quick-colors .swatch').forEach(s => {
    s.addEventListener('click', () => {
      const c = s.dataset.color;
      bgColor.value = c; bgHex.value = c; bgState.color = c;
      applyColorBg(c);
      if (isMobile()) closeSheet();
    });
  });
}

function readBgImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    bgState.imageData = ev.target.result;
    bgState.type = 'image';
    applyImageBg(ev.target.result, bgState.imageFit);
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
    fontFamily: 'Arial', fontSize: 48, fill: '#ffffff',
    fontWeight: 'normal', fontStyle: 'normal', underline: false,
    textAlign: 'center', lineHeight: 1.2, charSpacing: 0,
    shadow: buildShadow(),
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
  hideTextActionBar();
  hideBgActionBar();
}
function showPropsView() {
  document.getElementById('tabs-view').style.display  = 'none';
  document.getElementById('props-view').style.display = 'block';
  if (isMobile() && !suppressSheetOnce) openSheet();
  suppressSheetOnce = false;
}

// ── Text action bar (mobile) ───────────────────────────────
function showTextActionBar() {
  hideBgActionBar();
  const bar = document.getElementById('text-action-bar');
  bar.style.display = 'flex';
  bar.setAttribute('aria-hidden', 'false');
}
function hideTextActionBar() {
  const bar = document.getElementById('text-action-bar');
  bar.style.display = 'none';
  bar.setAttribute('aria-hidden', 'true');
}
function showBgActionBar() {
  hideTextActionBar();
  const bar = document.getElementById('bg-action-bar');
  bar.style.display = 'flex';
  bar.setAttribute('aria-hidden', 'false');
}
function hideBgActionBar() {
  const bar = document.getElementById('bg-action-bar');
  bar.style.display = 'none';
  bar.setAttribute('aria-hidden', 'true');
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
  // BG toolbar button → jump to BG tab + Templates sub-tab
  on('bg-tool-btn', 'click', () => {
    showTabsView();
    switchPanelTab('bg');
    const tplTab = document.querySelector('#bg-tabs .sub-tab[data-tab="templates"]');
    if (tplTab) tplTab.click();
    if (isMobile()) openSheet();
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
  const t = objType(obj);

  hideBgActionBar();

  // On mobile, text selection shows the Edit/Delete action bar instead of auto-opening sidebar
  if (isMobile() && t === 'text') {
    suppressSheetOnce = true;
    showTextActionBar();
  } else {
    hideTextActionBar();
  }

  showPropsView();
  document.getElementById('prop-type-badge').textContent = t;

  document.getElementById('text-props').style.display   = t === 'text'  ? 'block' : 'none';
  document.getElementById('shape-props').style.display  = isShape(t)    ? 'block' : 'none';
  document.getElementById('image-props').style.display  = t === 'image' ? 'block' : 'none';
  document.getElementById('corner-radius-row').style.display = t === 'rect' ? 'flex' : 'none';

  document.getElementById('common-props').style.display = 'block';

  // Collapse advanced section and show/hide text-only fields
  const cadv = document.getElementById('common-advanced-toggle');
  const cadb = document.getElementById('common-advanced-body');
  if (cadv) cadv.setAttribute('aria-expanded', 'false');
  if (cadb) cadb.classList.remove('open');
  document.querySelectorAll('.text-adv-only').forEach(el => {
    el.style.display = (t === 'text') ? '' : 'none';
  });

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
    const sz = obj.fontSize ?? 40;
    set('text-size', sz);
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
  // Size stepper buttons
  on('text-size-dec', 'click', () => {
    const v = Math.max(4, (+val('text-size') || 48) - 2);
    set('text-size', v); upd({ fontSize: v });
  });
  on('text-size-inc', 'click', () => {
    const v = Math.min(800, (+val('text-size') || 48) + 2);
    set('text-size', v); upd({ fontSize: v });
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

  // Text advanced toggle — reveals Line Ht / Spacing / Shadow only
  on('common-advanced-toggle', 'click', () => {
    const btn  = document.getElementById('common-advanced-toggle');
    const body = document.getElementById('common-advanced-body');
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    body.classList.toggle('open', !open);
  });

  // Text
  on('text-content', 'input', () => {
    const o = activeObj();
    if (o && o instanceof fabric.IText) { o.set('text', val('text-content')); canvas.renderAll(); }
  });
  on('text-font', 'change', () => upd({ fontFamily: val('text-font') }));
  on('text-size', 'input', () => { upd({ fontSize: +val('text-size') }); });

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

  withConfirm(document.getElementById('delete-elem'), () => {
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
  const hint = document.getElementById('canvas-empty-hint');
  if (hint) hint.classList.toggle('hidden', objs.length > 0);
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

    // Printable key + nothing selected → create text box with that character
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !canvas.getActiveObject()) {
      e.preventDefault();
      suppressSheetOnce = true;
      const obj = new fabric.IText(e.key, {
        left: cx(), top: cy(), originX: 'center', originY: 'center',
        fontFamily: 'Arial', fontSize: 48, fill: '#ffffff',
        fontWeight: 'normal', fontStyle: 'normal', underline: false,
        textAlign: 'center', lineHeight: 1.2, charSpacing: 0,
        shadow: buildShadow(),
        data: { type: 'text', name: nextName('Text') },
      });
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.renderAll();
      obj.enterEditing();
      obj.setSelectionStart(e.key.length);
      obj.setSelectionEnd(e.key.length);
      return;
    }

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

  // ── Randomize prompt ──
  const RANDOM_PROMPTS = [
    'A serene lake at dawn reflecting snow-capped mountains, mist rising from the water',
    'A lone lighthouse on a rocky cliff during a dramatic storm, waves crashing below',
    'An ancient forest with enormous glowing mushrooms and fireflies at twilight',
    'A futuristic city skyline at night with flying cars and neon-lit skyscrapers',
    'A cozy cabin in the woods during a heavy snowfall, warm light glowing from the windows',
    'A vast desert at sunset with towering red sandstone formations casting long shadows',
    'An underwater coral reef teeming with colorful tropical fish and sea turtles',
    'A majestic eagle soaring above clouds with golden sunlight breaking through',
    'A medieval castle on a hilltop surrounded by autumn forests and a river below',
    'A peaceful Japanese garden with cherry blossoms, a koi pond, and a stone lantern',
    'A galaxy swirling above an open field on a clear night, Milky Way visible',
    'A field of lavender in Provence at golden hour with a rustic farmhouse in the distance',
    'A roaring waterfall hidden deep in a lush tropical jungle with rainbow mist',
    'An African savanna at sunset with silhouettes of giraffes and acacia trees',
    'A vintage hot air balloon floating over rolling green hills at sunrise',
    'A dramatic thunderstorm over the ocean with lightning striking the water',
    'A sunflower field stretching to the horizon under a bright blue summer sky',
    'A foggy cobblestone street in an old European city lit by gas lamps at night',
    'A polar bear on a vast arctic ice sheet under shimmering northern lights',
    'A stunning autumn forest path carpeted in red and gold fallen leaves',
    'A coastal village perched on white limestone cliffs overlooking a turquoise sea',
    'A hummingbird hovering beside a vibrant tropical flower in lush rainforest',
    'A row of colorful tulips in full bloom with a windmill in the Dutch countryside',
    'A mountain stream rushing over smooth boulders through a pine forest',
    'A peaceful monastery on a Himalayan peak above the clouds at sunrise',
    'A black panther prowling through a dark jungle with bioluminescent plants',
    'A canoe on a glassy river at dusk with fireflies reflecting on the water',
    'A sprawling vineyard in Tuscany with golden rolling hills and cypress trees',
    'A pod of dolphins leaping through waves at sunrise in the open ocean',
    'A child running through a sunlit meadow filled with wildflowers and butterflies',
    'An old lighthouse at the end of a foggy wooden pier on a calm morning',
    'A red barn surrounded by snow in a quiet countryside at dawn',
    'A city park in spring with blossoming cherry trees lining a winding path',
    'A lone wolf howling at the full moon on a snow-covered mountain ridge',
    'A bamboo forest with shafts of light filtering through in the early morning',
    'An ancient Roman temple ruins at sunset bathed in warm amber light',
    'A crystal-clear alpine lake surrounded by wildflowers and snowy peaks',
    'A sea of clouds below a mountain summit at golden hour',
    'A lighthouse beam cutting through thick coastal fog on a stormy evening',
    'A treehouse deep in the woods lit up at night with fairy lights',
  ];

  on('prompt-random-btn', 'click', () => {
    const current = val('ai-prompt').trim();
    let pick;
    do { pick = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)]; }
    while (pick === current && RANDOM_PROMPTS.length > 1);
    set('ai-prompt', pick);
    // Trigger resize on textarea if needed
    const ta = document.getElementById('ai-prompt');
    if (ta) ta.dispatchEvent(new Event('input'));
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

    setGenerating(true);
    openModal();
    showModalLoading();

    // Pollinations path
    const model = val('ai-model');
    const params = new URLSearchParams({ width: w, height: h, seed, nologo: true, model });
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?${params}`;

    const img = new Image();
    img.onload = () => {
      lastDirectUrl = imageUrl;
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
  const maxWidth  = canvasW * 0.88;
  const minSize   = Math.round(Math.min(canvasW, canvasH) * 0.04);
  let   fontSize  = Math.round(Math.min(canvasW, canvasH) * 0.1);
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
  // Scale font down so text stays within the canvas width
  if (obj.width > maxWidth) {
    fontSize = Math.max(minSize, Math.floor(fontSize * maxWidth / obj.width));
    obj.set('fontSize', fontSize);
    obj.setCoords();
  }
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

const _dataUrlCache = new Map();

// Wraps a button so the first tap shows "Tap again to confirm", second tap executes.
function withConfirm(btn, action) {
  if (!btn) return;
  let pending = false;
  let timer = null;
  const origHTML = btn.innerHTML;
  const origClass = btn.className;
  btn.addEventListener('click', () => {
    if (!pending) {
      pending = true;
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5a5 5 0 100 10 5 5 0 000-10zm0 3v2.5l1.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg> Tap again';
      btn.classList.add('confirm-pending');
      timer = setTimeout(() => {
        pending = false;
        btn.innerHTML = origHTML;
        btn.className = origClass;
      }, 3000);
    } else {
      clearTimeout(timer);
      pending = false;
      btn.innerHTML = origHTML;
      btn.className = origClass;
      action();
    }
  });
}

async function fetchAsDataUrl(url) {
  if (_dataUrlCache.has(url)) return _dataUrlCache.get(url);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    img.onload  = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const tmp = document.createElement('canvas');
  tmp.width  = img.naturalWidth;
  tmp.height = img.naturalHeight;
  tmp.getContext('2d').drawImage(img, 0, 0);
  const dataUrl = tmp.toDataURL('image/png');
  _dataUrlCache.set(url, dataUrl);
  return dataUrl;
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

let _selectHintTimer = null;
function maybeShowSelectHint(e) {
  if (localStorage.getItem('imaj-select-hint-seen')) return;
  const obj = e?.selected?.[0];
  if (!obj) return;
  localStorage.setItem('imaj-select-hint-seen', '1');
  const hint = document.getElementById('select-hint');
  if (!hint) return;
  hint.classList.add('visible');
  hint.setAttribute('aria-hidden', 'false');
  clearTimeout(_selectHintTimer);
  _selectHintTimer = setTimeout(() => {
    hint.classList.remove('visible');
    hint.setAttribute('aria-hidden', 'true');
  }, 3000);
}

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

function setupPanelToggle() {
  const btn     = document.getElementById('panel-toggle-btn');
  const appBody = document.querySelector('.app-body');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (isMobile()) {
      const sidebar = document.querySelector('.sidebar-right');
      if (sidebar.classList.contains('sheet-open')) {
        closeSheet();
      } else {
        showTabsView();
        openSheet();
      }
    } else {
      const hidden = appBody.classList.toggle('sidebar-hidden');
      btn.setAttribute('aria-expanded', String(!hidden));
      btn.classList.toggle('panel-collapsed', hidden);
    }
  });
}

function setupMobileSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  const sidebar  = document.querySelector('.sidebar-right');

  // Backdrop tap → close sidebar
  backdrop.addEventListener('click', () => {
    closeSheet();
    canvas.discardActiveObject();
    canvas.renderAll();
  });

  // Mobile panel open button (toolbar)
  on('mobile-panel-btn', 'click', () => { showTabsView(); openSheet(); });

  // Mobile drawer close button
  on('mobile-drawer-close', 'click', closeSheet);

  // AI toolbar button → open sidebar to AI tab
  on('ai-tool-btn', 'click', () => { if (isMobile()) openSheet(); });

  // Tapping on canvas area — defer so Fabric has processed the touch first
  document.getElementById('canvas-area').addEventListener('touchend', () => {
    if (!isMobile()) return;
    setTimeout(() => {
      if (canvas.getActiveObject()) return; // object selected — leave it to onSelection
      if (sidebar.classList.contains('sheet-open')) {
        closeSheet();
      } else {
        showBgActionBar();
      }
    }, 0);
  }, { passive: true });

  // BG action bar
  on('bg-action-edit', 'click', () => {
    hideBgActionBar();
    showTabsView();
    switchPanelTab('bg');
    openSheet();
  });
  on('bg-action-add-text', 'click', () => {
    hideBgActionBar();
    addText();
  });
  withConfirm(document.getElementById('bg-action-remove'), () => {
    bgState.type = 'gradient';
    applyGradientBg();
    hideBgActionBar();
  });

  // Text action bar
  on('text-action-edit', 'click', () => {
    hideTextActionBar();
    openSheet();
  });
  withConfirm(document.getElementById('text-action-delete'), () => {
    const o = canvas.getActiveObject();
    if (o) { canvas.remove(o); canvas.renderAll(); }
    hideTextActionBar();
    showTabsView();
    updateLayers();
  });

  // Mobile FABs
  on('fab-export-btn', 'click', exportImage);
  on('fab-share-btn',  'click', shareViaOSSheet);
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
const IMG_PRESETS = [
  // ── Biblical / Holy Land ──────────────────────────────────
  { category: 'Biblical',   name: 'Empty Tomb',      photo: 'biblical_00' },
  { category: 'Biblical',   name: 'Fishing Boat',    photo: 'biblical_01' },
  { category: 'Biblical',   name: 'Shepherd',        photo: 'biblical_02' },
  { category: 'Biblical',   name: 'Three Crosses',   photo: 'biblical_03' },
  { category: 'Biblical',   name: 'Cave Overlook',   photo: 'biblical_04' },
  { category: 'Biblical',   name: 'Holy Waterfall',  photo: 'biblical_05' },
  { category: 'Biblical',   name: 'Desert Tree',     photo: 'biblical_06' },
  { category: 'Biblical',   name: 'Night Sky',       photo: 'biblical_07' },
  { category: 'Biblical',   name: 'Still Waters',    photo: 'biblical_08' },
  { category: 'Biblical',   name: 'Ancient Room',    photo: 'biblical_09' },
  // ── Church ───────────────────────────────────────────────
  { category: 'Church',     name: 'Country Church',  photo: 'church_00' },
  { category: 'Church',     name: 'Cathedral',       photo: 'church_01' },
  { category: 'Church',     name: 'Wooden Cross',    photo: 'church_02' },
  { category: 'Church',     name: 'Stone Church',    photo: 'church_03' },
  { category: 'Church',     name: 'Stained Glass',   photo: 'church_04' },
  { category: 'Church',     name: 'Forest Chapel',   photo: 'church_05' },
  { category: 'Church',     name: 'Gothic Columns',  photo: 'church_06' },
  { category: 'Church',     name: 'Cross & Bible',   photo: 'church_07' },
  { category: 'Church',     name: 'Altar & Candles', photo: 'church_08' },
  { category: 'Church',     name: 'Spring Church',   photo: 'church_09' },
  // ── Nature ───────────────────────────────────────────────
  { category: 'Nature',     name: 'Sunlit Forest',   photo: 'nature_00' },
  { category: 'Nature',     name: 'Mountain Lake',   photo: 'nature_01' },
  { category: 'Nature',     name: 'Green Leaves',    photo: 'nature_02' },
  { category: 'Nature',     name: 'Ocean Sunset',    photo: 'nature_03' },
  { category: 'Nature',     name: 'Waterfall',       photo: 'nature_04' },
  { category: 'Nature',     name: 'Mountain Sunset', photo: 'nature_05' },
  { category: 'Nature',     name: 'Dew Drops',       photo: 'nature_06' },
  { category: 'Nature',     name: 'Forest Stream',   photo: 'nature_07' },
  { category: 'Nature',     name: 'Radiant Clouds',  photo: 'nature_08' },
  { category: 'Nature',     name: 'Milky Way',       photo: 'nature_09' },
  // ── Caribbean / Tropical ─────────────────────────────────
  { category: 'Caribbean',  name: 'Cross & Ocean',   photo: 'caribbean_00' },
  { category: 'Caribbean',  name: 'Tropical Church', photo: 'caribbean_01' },
  { category: 'Caribbean',  name: 'Rocky Cross',     photo: 'caribbean_02' },
  { category: 'Caribbean',  name: 'Coastal Village', photo: 'caribbean_03' },
  { category: 'Caribbean',  name: 'Bible & Palms',   photo: 'caribbean_04' },
  { category: 'Caribbean',  name: 'Sunset Cross',    photo: 'caribbean_05' },
  { category: 'Caribbean',  name: 'Jungle Falls',    photo: 'caribbean_06' },
  { category: 'Caribbean',  name: 'Worship Sunset',  photo: 'caribbean_07' },
  { category: 'Caribbean',  name: 'Island Church',   photo: 'caribbean_08' },
  { category: 'Caribbean',  name: 'Palm Beach',      photo: 'caribbean_09' },

  // ── Rubrics / FGB Programs ────────────────────────────────
  { category: 'Rubrics', name: 'Au Cœur des Proverbes', photo: 'rubrics_00' },
  { category: 'Rubrics', name: 'Jeudi Tabou',            photo: 'rubrics_01' },
  { category: 'Rubrics', name: 'Bible Study',            photo: 'rubrics_02' },
  { category: 'Rubrics', name: 'Midi sur Haïti',         photo: 'rubrics_03' },
  { category: 'Rubrics', name: 'Méditation Quotidienne', photo: 'rubrics_04' },
  { category: 'Rubrics', name: 'Ti Moso Labib',          photo: 'rubrics_05' },
  { category: 'Rubrics', name: 'Bon Sabbat Haïti',       photo: 'rubrics_06' },
  { category: 'Rubrics', name: 'Douce Nuit Bénie',       photo: 'rubrics_07' },
  { category: 'Rubrics', name: 'Leve Bonè Leve Beni',   photo: 'rubrics_08' },
  { category: 'Rubrics', name: 'Leson Lekòl Saba',       photo: 'rubrics_09' },
];

const PRESET_TRANSLATIONS = {
  'cat-Biblical':  { en: 'Biblical',   fr: 'Biblique',   ht: 'Biblik'   },
  'cat-Church':    { en: 'Church',     fr: 'Église',     ht: 'Legliz'   },
  'cat-Nature':    { en: 'Nature',     fr: 'Nature',     ht: 'Nati'     },
  'cat-Caribbean': { en: 'Caribbean',  fr: 'Caraïbes',   ht: 'Karayib'  },
  'cat-Rubrics':   { en: 'Rubrics',    fr: 'Rubriques',  ht: 'Ribrik'   },

  'biblical_00': { en: 'Empty Tomb',     fr: 'Tombeau Vide',        ht: 'Kavo Vid'      },
  'biblical_01': { en: 'Fishing Boat',   fr: 'Barque de Pêcheur',   ht: 'Bato Pechè'    },
  'biblical_02': { en: 'Shepherd',       fr: 'Le Berger',           ht: 'Gadò Mouton'   },
  'biblical_03': { en: 'Three Crosses',  fr: 'Trois Croix',         ht: 'Twa Kwa'       },
  'biblical_04': { en: 'Cave Overlook',  fr: 'Vue de la Grotte',    ht: 'Wè Gròt'       },
  'biblical_05': { en: 'Holy Waterfall', fr: 'Cascade Sacrée',      ht: 'Kaskad Sakre'  },
  'biblical_06': { en: 'Desert Tree',    fr: 'Arbre du Désert',     ht: 'Pye Bwa Dezè'  },
  'biblical_07': { en: 'Night Sky',      fr: 'Ciel Nocturne',       ht: 'Syèl Lannuit'  },
  'biblical_08': { en: 'Still Waters',   fr: 'Eaux Paisibles',      ht: 'Dlo Poze'      },
  'biblical_09': { en: 'Ancient Room',   fr: 'Salle Ancienne',      ht: 'Chanm Ansyen'  },

  'church_00': { en: 'Country Church',  fr: 'Église Rurale',       ht: 'Legliz Riral'   },
  'church_01': { en: 'Cathedral',       fr: 'Cathédrale',          ht: 'Katedràl'       },
  'church_02': { en: 'Wooden Cross',    fr: 'Croix en Bois',       ht: 'Kwa Bwa'        },
  'church_03': { en: 'Stone Church',    fr: 'Église de Pierre',    ht: 'Legliz Wòch'    },
  'church_04': { en: 'Stained Glass',   fr: 'Vitrail',             ht: 'Vit Koulè'      },
  'church_05': { en: 'Forest Chapel',   fr: 'Chapelle Forestière', ht: 'Chapèl Forè'    },
  'church_06': { en: 'Gothic Columns',  fr: 'Colonnes Gothiques',  ht: 'Kolon Gotik'    },
  'church_07': { en: 'Cross & Bible',   fr: 'Croix et Bible',      ht: 'Kwa ak Bib'     },
  'church_08': { en: 'Altar & Candles', fr: 'Autel et Cierges',    ht: 'Lotèl ak Bouji' },
  'church_09': { en: 'Spring Church',   fr: 'Église Printanière',  ht: 'Legliz Prentan' },

  'nature_00': { en: 'Sunlit Forest',   fr: 'Forêt Ensoleillée',    ht: 'Forè Solèy'         },
  'nature_01': { en: 'Mountain Lake',   fr: 'Lac de Montagne',      ht: 'Lak Mòn'            },
  'nature_02': { en: 'Green Leaves',    fr: 'Feuilles Vertes',      ht: 'Fèy Vèt'            },
  'nature_03': { en: 'Ocean Sunset',    fr: "Coucher sur l'Océan",  ht: 'Solèy Kouche Lanmè' },
  'nature_04': { en: 'Waterfall',       fr: 'Cascade',              ht: 'Kaskad'             },
  'nature_05': { en: 'Mountain Sunset', fr: 'Coucher en Montagne',  ht: 'Solèy Kouche Mòn'   },
  'nature_06': { en: 'Dew Drops',       fr: 'Gouttes de Rosée',     ht: 'Rosye'              },
  'nature_07': { en: 'Forest Stream',   fr: 'Ruisseau Forestier',   ht: 'Rivyè Forè'         },
  'nature_08': { en: 'Radiant Clouds',  fr: 'Nuages Radieux',       ht: 'Nyaj Briyan'        },
  'nature_09': { en: 'Milky Way',       fr: 'Voie Lactée',          ht: 'Vwa Lakte'          },

  'caribbean_00': { en: 'Cross & Ocean',    fr: 'Croix et Océan',        ht: 'Kwa ak Lanmè'          },
  'caribbean_01': { en: 'Tropical Church',  fr: 'Église Tropicale',      ht: 'Legliz Twopikal'       },
  'caribbean_02': { en: 'Rocky Cross',      fr: 'Croix Rocheuse',        ht: 'Kwa Wòch'              },
  'caribbean_03': { en: 'Coastal Village',  fr: 'Village Côtier',        ht: 'Vilaj Kòt'             },
  'caribbean_04': { en: 'Bible & Palms',    fr: 'Bible et Palmiers',     ht: 'Bib ak Pye Kokoye'     },
  'caribbean_05': { en: 'Sunset Cross',     fr: 'Croix au Coucher',      ht: 'Kwa Solèy Kouche'      },
  'caribbean_06': { en: 'Jungle Falls',     fr: 'Cascade Tropicale',     ht: 'Kaskad Twopikal'       },
  'caribbean_07': { en: 'Worship Sunset',   fr: 'Adoration au Coucher',  ht: 'Adorasyon Solèy Kouche' },
  'caribbean_08': { en: 'Island Church',    fr: 'Église Insulaire',      ht: 'Legliz Zile'           },
  'caribbean_09': { en: 'Palm Beach',       fr: 'Plage de Palmiers',     ht: 'Plaj Pye Kokoye'       },

  'rubrics_00': { en: 'Au Cœur des Proverbes', fr: 'Au Cœur des Proverbes', ht: 'Kè Pwovèb'         },
  'rubrics_01': { en: 'Jeudi Tabou',            fr: 'Jeudi Tabou',           ht: 'Jedi Tabou'         },
  'rubrics_02': { en: 'Bible Study',            fr: 'Étude Biblique',        ht: 'Etid Biblik'        },
  'rubrics_03': { en: 'Midi sur Haïti',         fr: 'Midi sur Haïti',        ht: 'Midi sou Ayiti'     },
  'rubrics_04': { en: 'Daily Meditation',       fr: 'Méditation Quotidienne',ht: 'Meditasyon Chak Jou'},
  'rubrics_05': { en: 'Ti Moso Labib',          fr: 'Petit Bout de Bible',   ht: 'Ti Moso Labib'      },
  'rubrics_06': { en: 'Bon Sabbat Haïti',       fr: 'Bon Sabbat Haïti',      ht: 'Bon Saba Ayiti'     },
  'rubrics_07': { en: 'Douce Nuit Bénie',       fr: 'Douce Nuit Bénie',      ht: 'Bon Nwit Beni'      },
  'rubrics_08': { en: 'Leve Bonè Leve Beni',   fr: 'Lève-toi Tôt Béni',    ht: 'Leve Bonè Leve Beni'},
  'rubrics_09': { en: 'Leson Lekòl Saba',       fr: 'École du Sabbat',       ht: 'Leson Lekòl Saba'   },
};

const PRESET_BASE = 'https://imaj.gwoupbousol.org/presets';

function presetThumbUrl(photo) {
  return `${PRESET_BASE}/${photo}.jpg`;
}
function presetFullUrl(photo) {
  return `${PRESET_BASE}/${photo}.jpg`;
}

function setupBgTemplates() {
  const grid = document.getElementById('template-grid');
  if (!grid) return;

  // Group by category
  const categories = [...new Set(IMG_PRESETS.map(p => p.category))];
  categories.forEach(cat => {
    const catKey = 'cat-' + cat;
    const label = document.createElement('p');
    label.className = 'bg-cat-label';
    label.dataset.i18nPreset = catKey;
    label.textContent = PRESET_TRANSLATIONS[catKey]?.[currentLang] || cat;
    grid.appendChild(label);

    const row = document.createElement('div');
    row.className = 'bg-cat-row';

    IMG_PRESETS.filter(p => p.category === cat).forEach(preset => {
      const btn = document.createElement('button');
      btn.className = 'bg-template-btn';
      btn.title = preset.name;
      const thumb = presetThumbUrl(preset.photo);
      btn.style.cssText = `background-image:url(${thumb});background-size:cover;background-position:center`;
      const nameSpan = document.createElement('span');
      nameSpan.className = 'bg-tpl-name';
      nameSpan.dataset.i18nPreset = preset.photo;
      nameSpan.textContent = PRESET_TRANSLATIONS[preset.photo]?.[currentLang] || preset.name;
      btn.appendChild(nameSpan);
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-template-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyPresetImage(preset, btn);
      });
      row.appendChild(btn);
    });
    grid.appendChild(row);
  });

  // Preload all thumbnails in the background
  setTimeout(() => {
    IMG_PRESETS.forEach(preset => {
      fetchAsDataUrl(presetFullUrl(preset.photo)).catch(() => {});
    });
  }, 2000);
}

async function applyPresetImage(preset, btn) {
  btn?.classList.add('loading');
  const url = presetFullUrl(preset.photo);
  try {
    const dataUrl = await fetchAsDataUrl(url);
    bgState.imageData = dataUrl;
    bgState.imageFit  = 'cover';
    bgState.type      = 'image';
    applyImageBg(dataUrl, 'cover');
    if (isMobile()) closeSheet();
  } catch {
    toast('Failed to load preset', 'error');
  } finally {
    btn?.classList.remove('loading');
  }
}

// ── Bible Verse Picker ─────────────────────────────────────
const BIBLE_VERSES = [
  { ref: 'John 3:16',          text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
  { ref: 'Jeremiah 29:11',     text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."' },
  { ref: 'Philippians 4:13',   text: 'I can do all this through him who gives me strength.' },
  { ref: 'Romans 8:28',        text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
  { ref: 'Proverbs 3:5-6',     text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
  { ref: 'Isaiah 40:31',       text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.' },
  { ref: 'Psalm 23:1',         text: 'The Lord is my shepherd, I lack nothing.' },
  { ref: 'Matthew 6:33',       text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
  { ref: 'Romans 12:2',        text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.' },
  { ref: 'Psalm 46:10',        text: 'He says, "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."' },
  { ref: 'Galatians 5:22-23',  text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.' },
  { ref: '1 Corinthians 13:4', text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.' },
  { ref: 'Psalm 119:105',      text: 'Your word is a lamp for my feet, a light on my path.' },
  { ref: 'Isaiah 41:10',       text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.' },
  { ref: 'Matthew 5:16',       text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.' },
  { ref: 'Joshua 1:9',         text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' },
  { ref: 'Psalm 28:7',         text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.' },
  { ref: 'John 14:6',          text: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."' },
  { ref: 'Romans 5:8',         text: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.' },
  { ref: 'Ephesians 2:8-9',    text: 'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.' },
  { ref: 'Psalm 91:1',         text: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.' },
  { ref: '2 Timothy 1:7',      text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.' },
  { ref: 'Matthew 11:28',      text: '"Come to me, all you who are weary and burdened, and I will give you rest."' },
  { ref: 'Psalm 27:1',         text: 'The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?' },
  { ref: 'Philippians 4:6-7',  text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' },
  { ref: 'John 16:33',         text: '"I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world."' },
  { ref: 'Proverbs 31:25',     text: 'She is clothed with strength and dignity; she can laugh at the days to come.' },
  { ref: 'Psalm 34:18',        text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
  { ref: 'Lamentations 3:22-23', text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.' },
  { ref: 'Romans 15:13',       text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.' },
  { ref: 'Psalm 37:4',         text: 'Take delight in the Lord, and he will give you the desires of your heart.' },
  { ref: 'Genesis 1:1',        text: 'In the beginning God created the heavens and the earth.' },
  { ref: 'John 1:1',           text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
  { ref: 'Micah 6:8',          text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.' },
  { ref: '1 Peter 5:7',        text: 'Cast all your anxiety on him because he cares for you.' },
  { ref: 'Hebrews 11:1',       text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
  { ref: 'James 1:2-3',        text: 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.' },
  { ref: 'Psalm 103:12',       text: 'As far as the east is from the west, so far has he removed our transgressions from us.' },
  { ref: 'John 10:10',         text: '"The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full."' },
  { ref: 'Ephesians 3:20',     text: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.' },
  { ref: '2 Chronicles 7:14',  text: 'If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven.' },
  { ref: 'Psalm 139:14',       text: 'I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.' },
  { ref: 'Proverbs 22:6',      text: 'Start children off on the way they should go, and even when they are old they will not turn from it.' },
  { ref: 'Isaiah 43:2',        text: 'When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.' },
  { ref: 'Revelation 21:4',    text: '"He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away."' },
  { ref: 'Colossians 3:23',    text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.' },
  { ref: 'Psalm 23:4',         text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
  { ref: 'Matthew 28:19',      text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' },
  { ref: 'Psalm 16:8',         text: 'I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.' },
  { ref: '1 John 4:19',        text: 'We love because he first loved us.' },
];

const BIBLE_VERSES_FR = [
  { ref: 'Jean 3:16',            text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.' },
  { ref: 'Jérémie 29:11',        text: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et une espérance.' },
  { ref: 'Philippiens 4:13',     text: 'Je puis tout par celui qui me fortifie.' },
  { ref: 'Romains 8:28',         text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.' },
  { ref: 'Proverbes 3:5-6',      text: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.' },
  { ref: 'Ésaïe 40:31',          text: 'Mais ceux qui se confient en l\'Éternel renouvellent leurs forces; ils s\'élèvent avec des ailes comme des aigles; ils courent, et ne se lassent point; ils marchent, et ne se fatiguent point.' },
  { ref: 'Psaumes 23:1',         text: 'L\'Éternel est mon berger: je ne manquerai de rien.' },
  { ref: 'Matthieu 6:33',        text: 'Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.' },
  { ref: 'Romains 12:2',         text: 'Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l\'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.' },
  { ref: 'Psaumes 46:10',        text: 'Arrêtez, et sachez que je suis Dieu! Je domine sur les nations, je domine sur la terre.' },
  { ref: 'Galates 5:22-23',      text: 'Mais le fruit de l\'Esprit, c\'est l\'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance.' },
  { ref: '1 Corinthiens 13:4',   text: 'La charité est patiente, elle est pleine de bonté; la charité n\'est point envieuse; la charité ne se vante point, elle ne s\'enfle point d\'orgueil.' },
  { ref: 'Psaumes 119:105',      text: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.' },
  { ref: 'Ésaïe 41:10',          text: 'Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.' },
  { ref: 'Matthieu 5:16',        text: 'Que votre lumière luise ainsi devant les hommes, afin qu\'ils voient vos bonnes œuvres, et qu\'ils glorifient votre Père qui est dans les cieux.' },
  { ref: 'Josué 1:9',            text: 'Ne t\'ai-je pas donné cet ordre: Sois fort et courageux? Ne t\'effraie point et ne t\'épouvante point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.' },
  { ref: 'Jean 14:6',            text: 'Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.' },
  { ref: 'Éphésiens 2:8-9',      text: 'Car c\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de Dieu. Ce n\'est point par les œuvres, afin que personne ne se glorifie.' },
  { ref: '2 Timothée 1:7',       text: 'Car ce n\'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d\'amour et de sagesse.' },
  { ref: 'Matthieu 11:28',       text: 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.' },
  { ref: 'Psaumes 27:1',         text: 'L\'Éternel est ma lumière et mon salut: de qui aurais-je crainte? L\'Éternel est le soutien de ma vie: de qui aurais-je peur?' },
  { ref: 'Hébreux 11:1',         text: 'Or la foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit pas.' },
  { ref: '1 Pierre 5:7',         text: 'Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.' },
  { ref: 'Jean 16:33',           text: 'Je vous ai dit ces choses, afin que vous ayez la paix en moi. Vous aurez des tribulations dans le monde; mais prenez courage, j\'ai vaincu le monde.' },
  { ref: 'Psaumes 23:4',         text: 'Quand je marche dans la vallée de l\'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent.' },
  { ref: 'Romains 5:8',          text: 'Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.' },
  { ref: 'Lamentations 3:22-23', text: 'Les bontés de l\'Éternel ne sont pas épuisées, ses compassions ne sont pas à leur terme; elles se renouvellent chaque matin. Ta fidélité est grande!' },
  { ref: 'Jean 1:1',             text: 'Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.' },
  { ref: '1 Jean 4:19',          text: 'Pour nous, nous l\'aimons, parce qu\'il nous a aimés le premier.' },
  { ref: 'Genèse 1:1',           text: 'Au commencement, Dieu créa les cieux et la terre.' },
];

const BIBLE_VERSES_HT = [
  { ref: 'Jan 3:16',             text: 'Paske, Bondye sitèlman renmen lèzòm, li bay sèl Pitit li a pou yo. Tout moun ki va mete konfyans yo nan li p ap peri, men y a gen lavi ki p ap janm fini an.' },
  { ref: 'Jeremi 29:11',         text: 'Paske, mwen konnen sa m ap fè pou nou, se mwen menm, Seyè a, ki di sa. M ap fè nou jwenn sa nou bezwen. Mwen gen bon pwojè pou nou, mwen pa gen move pwojè pou nou. M ap ba nou yon espwa, yon avni.' },
  { ref: 'Filipyen 4:13',        text: 'Mwen kapab fè tout bagay nan Kris ki ban mwen fòs la.' },
  { ref: 'Women 8:28',           text: 'Nou konnen tou, pou moun ki renmen Bondye yo, tout bagay ap travay ansanm pou yo jwenn sa ki bon, se moun Bondye rele pou l fè sa li vle a nou pale la.' },
  { ref: 'Pwovèb 3:5-6',        text: 'Mete tout konfyans ou nan Seyè a, pa konte sou konprann pa ou. Mete Seyè a devan ou nan tout sa ou fè, li menm k ap moutre ou chemen w ap pran.' },
  { ref: 'Ezayi 40:31',          text: 'Men sa k ap rive moun ki konte sou Seyè a: y ap jwenn fòs yo renouvle. Y ap vole tankou malfini, y ap kouri san yo pa bouke, y ap mache san yo pa fatige.' },
  { ref: 'Som 23:1',             text: 'Seyè a se gadò mwen, mwen p ap manke anyen.' },
  { ref: 'Matye 6:33',           text: 'Men anvan tout bagay, chache wè Bondye wa, chache viv jan Bondye vle. Tout lòt bagay sa yo, Bondye a p ba ou yo an plis.' },
  { ref: 'Women 12:2',           text: 'Pa kite monn sa a mete ou nan monn pa li. Kite Bondye chanje ou nèt, ba ou yon lòt fason pou panse. Lè sa a, w a kapab rekonèt sa Bondye vle a, sa ki bon, sa ki fè li plezi, sa ki pafè.' },
  { ref: 'Som 46:10',            text: 'Rete trankil! Rekonèt se mwen menm ki Bondye. M ap pran desann sou tout nasyon yo, m ap pran desann sou tout latè a.' },
  { ref: 'Galat 5:22-23',        text: 'Men, lè Lespri Bondye a ap travay nan ou, li pote jan pou ou renmen moun, pou ou kontan, pou ou viv ak kè poze, pou ou pran pasyans, pou ou janti ak moun, pou ou fè sa ki bon, pou ou rete fidèl, pou ou dous.' },
  { ref: '1 Korentyen 13:4',     text: 'Renmen an pran pasyans, renmen an gen kè sansib. Renmen pa jalou. Renmen pa fè baka, li pa vante tèt li.' },
  { ref: 'Som 119:105',          text: 'Pawòl ou se yon lanp ki klere chemen m, yon limyè k ap moutre m wout la.' },
  { ref: 'Ezayi 41:10',          text: 'Pa pè, paske mwen avèk ou. Pa dekouraje, paske mwen menm ki Bondye ou a. Mwen ban ou fòs, mwen ede ou, mwen kenbe ou ak men dwat mwen ki pare pou delivre ou.' },
  { ref: 'Matye 5:16',           text: 'Konsa tou, kite tout moun wè limyè ou a briye. Lè y a wè tout bon bagay ou fè yo, y a wa louye Papa nou ki nan syèl la.' },
  { ref: 'Jozye 1:9',            text: 'Se mwen menm ki ba ou kòmand sa, pa vre? Mete gason sou ou! Fò ou vanyan! Pa dekouraje, pa pè. Paske Seyè a, Bondye ou a, ap avèk ou kèlkeswa kote ou ale.' },
  { ref: 'Jan 14:6',             text: 'Jezi reponn li: Se mwen menm ki chemen an, laverite a ak lavi a. Pesonn pa ka al jwenn Papa a si se pa pa mwen.' },
  { ref: 'Efezyen 2:8-9',        text: 'Paske, se pa travay nou ki sove nou. Se yon favè Bondye ban nou, nou sove paske nou kwè nan Jezi Kris. Sa se kado Bondye ban nou. Sa pa soti nan tèt pa nou.' },
  { ref: '2 Timote 1:7',         text: 'Paske Bondye pa ban nou yon lespri ki fè nou pè. Men li ban nou yon lespri ki ban nou fòs, ki ban nou renmen youn lòt, ki ban nou kontwòl sou tèt nou.' },
  { ref: 'Matye 11:28',          text: 'Touswit Jezi di: Nou menm ki bouke, ki dekouraje, ki chaje ak gwo chay, vin jwenn mwen, mwen va fè nou poze.' },
  { ref: 'Som 27:1',             text: 'Seyè a se limyè mwen ak delivrans mwen; kisa m ta pè? Seyè a se kè solid lavi mwen; kisa m ta tranble?' },
  { ref: 'Ebre 11:1',            text: 'Lafwa se yon asirans pou bagay nou espere yo, se yon prèv reyalite bagay nou pa ka wè yo.' },
  { ref: '1 Pyè 5:7',            text: 'Lage tout traka nou sou li, paske li menm li renmen nou.' },
  { ref: 'Jan 16:33',            text: 'Mwen di nou sa pou nou ka gen kè poze nan mwen. Nan lemonn nou gen pou soufri. Men fò nou, paske mwen gentan kraze pouvwa lemonn.' },
  { ref: 'Som 23:4',             text: 'Menmsi mwen pran wout ki pase nan mitan fènwa lanmò, mwen p ap pè anyen paske ou avèk mwen; baton ou pou korije m, baton ou pou pote m, se yo k ap ankouraje m.' },
  { ref: 'Women 5:8',            text: 'Men Bondye montre nou jan li renmen nou: Kris te mouri pou nou lè nou te toujou nan peche nou.' },
  { ref: 'Jeremi 3:22-23 (Lam)', text: 'Bondye toujou gen pitye pou nou, li pa janm sispann renmen nou. Chak maten li renouvle yo; ou vrèman fidèl!' },
  { ref: 'Jan 1:1',              text: 'Nan konmansman, Pawòl la te la. Pawòl la te avèk Bondye. Pawòl la te Bondye.' },
  { ref: '1 Jan 4:19',           text: 'Nou renmen Bondye, paske li te renmen nou anvan.' },
  { ref: 'Jenèz 1:1',            text: 'Nan konmansman, Bondye kreye syèl la ak latè a.' },
];

function setupVersePicker() {
  const openBtn  = document.getElementById('verse-pick-btn');
  const modal    = document.getElementById('verse-modal');
  const closeBtn = document.getElementById('verse-modal-close');
  const search   = document.getElementById('verse-search');
  const list     = document.getElementById('verse-list');
  if (!openBtn || !modal) return;

  let apiTimer       = null;
  let bibleVerseLang = currentLang;
  let htBible        = null;

  const VERSE_LISTS = { en: BIBLE_VERSES, fr: BIBLE_VERSES_FR, ht: BIBLE_VERSES_HT };
  function getVerseList() { return VERSE_LISTS[bibleVerseLang] ?? BIBLE_VERSES; }

  async function loadHtBible() {
    if (htBible) return htBible;
    try {
      const res = await fetch('https://imaj.gwoupbousol.org/bible_ht.json');
      htBible = await res.json();
    } catch {
      htBible = { aliases: {}, verses: {} };
    }
    return htBible;
  }

  async function lookupHt(query) {
    list.innerHTML = `<p class="verse-loading">${getStr('verse-looking-up')}</p>`;
    const bible = await loadHtBible();

    const match = query.trim().match(
      /^((?:[123]\s+)?[a-zA-ZÀ-ÿ]+(?:[\s.-][a-zA-ZÀ-ÿ]+)*)\s+(\d+)(?::(\d+)(?:\s*-\s*(\d+))?)?$/i
    );
    if (!match) {
      list.innerHTML = `<p class="verse-empty">${getStr('verse-not-found')}</p>`;
      return;
    }

    const [, rawBook, chapter, verseStartStr, verseEndStr] = match;
    const bookLower = rawBook.toLowerCase();
    const canonical = bible.aliases[bookLower] || bible.aliases[bookLower.replace(/[\s.]/g, '')];

    if (!canonical) {
      list.innerHTML = `<p class="verse-empty">${getStr('verse-not-found')}</p>`;
      return;
    }

    const verses = [];
    if (verseStartStr) {
      const start = parseInt(verseStartStr, 10);
      const end   = verseEndStr ? parseInt(verseEndStr, 10) : start;
      for (let v = start; v <= end; v++) {
        const text = bible.verses[`${canonical} ${chapter}:${v}`];
        if (text) verses.push({ ref: `${canonical} ${chapter}:${v}`, text: text.trim() });
      }
    } else {
      const prefix  = `${canonical} ${chapter}:`;
      const chVerse = [];
      for (const [key, text] of Object.entries(bible.verses)) {
        if (key.startsWith(prefix)) {
          chVerse.push({ ref: key, text: text.trim(), v: parseInt(key.split(':')[1], 10) });
        }
      }
      chVerse.sort((a, b) => a.v - b.v);
      verses.push(...chVerse.map(({ ref, text }) => ({ ref, text })));
    }

    if (!verses.length) {
      list.innerHTML = `<p class="verse-empty">${getStr('verse-not-found')}</p>`;
      return;
    }
    renderList(verses, verses.length === 1 ? verses[0].ref : `${canonical} ${chapter}`);
  }

  function syncBibleLangButtons() {
    modal.querySelectorAll('.verse-bible-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.blang === bibleVerseLang);
    });
  }

  function insertVerse(verse) {
    const obj = activeObj();
    if (!obj) return;
    const verseText = `"${verse.text}"\n— ${verse.ref}`;
    const tboxWidth = Math.min(canvasW * 0.85, 680);
    const tbox = new fabric.Textbox(verseText, {
      left:       obj.left,
      top:        obj.top,
      originX:    obj.originX,
      originY:    obj.originY,
      width:      tboxWidth,
      fontFamily: obj.fontFamily ?? 'Playfair Display',
      fontSize:   Math.min(obj.fontSize ?? 36, 28),
      fill:       obj.fill ?? '#ffffff',
      fontWeight: obj.fontWeight ?? 'normal',
      fontStyle:  obj.fontStyle ?? 'normal',
      textAlign:  'center',
      lineHeight: 1.4,
      shadow:     obj.shadow ?? buildShadow(),
      data:       obj.data,
    });
    canvas.remove(obj);
    canvas.add(tbox);
    canvas.setActiveObject(tbox);
    canvas.renderAll();
    const ta = document.getElementById('text-content');
    if (ta) ta.value = verseText;
    onSelection({ selected: [tbox] });
    closeVerseModal();
  }

  function renderList(verses, header) {
    if (!verses.length) {
      list.innerHTML = '<p class="verse-empty">No verses found.</p>';
      return;
    }
    list.innerHTML =
      (header ? `<p class="verse-section-label">${header}</p>` : '') +
      verses.map((v, i) => `
        <div class="verse-item" data-i="${i}">
          <span class="verse-ref">${v.ref}</span>
          <span class="verse-text">${v.text}</span>
        </div>`).join('');
    list.querySelectorAll('.verse-item').forEach(item => {
      const i = +item.dataset.i;
      item.addEventListener('click', () => insertVerse(verses[i]));
    });
  }

  async function lookupRef(query) {
    list.innerHTML = `<p class="verse-loading">${getStr('verse-looking-up')}</p>`;
    try {
      const translationParam = bibleVerseLang === 'fr' ? '?translation=lsg' : '';
      const res  = await fetch(`https://bible-api.com/${encodeURIComponent(query.trim())}${translationParam}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || 'not found');
      const verses = (json.verses || []).map(v => ({
        ref:  `${v.book_name} ${v.chapter}:${v.verse}`,
        text: v.text.trim().replace(/\n/g, ' '),
      }));
      if (!verses.length && json.text) verses.push({ ref: json.reference, text: json.text.trim() });
      renderList(verses, json.reference || query);
    } catch {
      list.innerHTML = `<p class="verse-empty">${getStr('verse-not-found')}</p>`;
    }
  }

  function renderVerses(query) {
    const q = query.trim();
    clearTimeout(apiTimer);
    if (!q) {
      renderList(getVerseList(), getStr('popular-verses'));
      return;
    }
    if (/\d/.test(q)) {
      list.innerHTML = `<p class="verse-loading">${getStr('verse-looking-up')}</p>`;
      if (bibleVerseLang === 'ht') {
        apiTimer = setTimeout(() => lookupHt(q), 450);
      } else {
        apiTimer = setTimeout(() => lookupRef(q), 450);
      }
    } else {
      const ql = q.toLowerCase();
      const filtered = getVerseList().filter(v =>
        v.ref.toLowerCase().includes(ql) || v.text.toLowerCase().includes(ql)
      );
      renderList(filtered, getStr('verse-results'));
    }
  }

  function openVerseModal() {
    bibleVerseLang = currentLang;
    syncBibleLangButtons();
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    search.value = '';
    renderVerses('');
    setTimeout(() => search.focus(), 100);
  }

  function closeVerseModal() {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
  }

  modal.querySelectorAll('.verse-bible-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bibleVerseLang = btn.dataset.blang;
      syncBibleLangButtons();
      renderVerses(search.value);
    });
  });

  openBtn.addEventListener('click', openVerseModal);
  closeBtn.addEventListener('click', closeVerseModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeVerseModal(); });
  search.addEventListener('input', () => renderVerses(search.value));
}

// ── Transparent background ─────────────────────────────────
function setupTransparentBg() {
  const toggle = document.getElementById('transparent-bg-toggle');
  if (!toggle) return;
  const saved = localStorage.getItem('jpeg-gen-transparent-bg');
  toggle.checked = saved === null ? false : saved === 'true';
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

