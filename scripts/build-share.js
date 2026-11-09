// Собирает 6 страниц сайта в одну страницу с хеш-навигацией для публикации ссылкой.
const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\takura\\Desktop\\poultry-site';
const OUT_DIR = path.join(ROOT, 'share');

const PAGES = [
  { file: 'index.html',    id: 'home' },
  { file: 'catalog.html',  id: 'catalog' },
  { file: 'company.html',  id: 'company' },
  { file: 'quality.html',  id: 'quality' },
  { file: 'delivery.html', id: 'delivery' },
  { file: 'contacts.html', id: 'contacts' }
];

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

function rewriteLinks(html) {
  return html
    .replace(/href="index\.html"/g, 'href="#home"')
    .replace(/href="catalog\.html\?cat=([a-z]+)"/g, 'href="#catalog/$1"')
    .replace(/href="catalog\.html"/g, 'href="#catalog"')
    .replace(/href="company\.html"/g, 'href="#company"')
    .replace(/href="quality\.html"/g, 'href="#quality"')
    .replace(/href="delivery\.html"/g, 'href="#delivery"')
    .replace(/href="contacts\.html"/g, 'href="#contacts"');
}

function slice(html, startMark, endMark, includeStart, includeEnd) {
  const s = html.indexOf(startMark);
  const e = html.indexOf(endMark);
  if (s < 0 || e < 0) throw new Error('Не найдены маркеры: ' + startMark + ' / ' + endMark);
  return html.slice(includeStart ? s : s + startMark.length, includeEnd ? e + endMark.length : e);
}

const index = read('index.html');

// Шапка: топбар + header (общие для всех страниц)
const header = slice(index, '<div class="topbar">', '</header>', true, true);

// Подвал + панель заявки + мобильное меню
const tail = slice(index, '<footer class="footer">', '<script src="assets/js/app.js">', true, false);

// Содержимое каждой страницы — между </header> и <footer>
const sections = PAGES.map(p => {
  const html = read(p.file);
  const body = slice(html, '</header>', '<footer class="footer">', false, false).trim();
  return `<div class="route" data-page="${p.id}"${p.id === 'home' ? '' : ' hidden'}>\n${body}\n</div>`;
}).join('\n\n');

const out = `<meta charset="utf-8">
<title>ПТИЦА.ПРО</title>
<meta name="description" content="Оптовые поставки куриного сырья: тушка ЦБ, разделка, филе, субпродукты, ММО. Каталог, производство, качество, логистика.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<style>
  .route[hidden]{display:none !important}
  @media (prefers-reduced-motion:reduce){
    .reveal{opacity:1 !important;transform:none !important}
    *{animation-duration:.01ms !important;transition-duration:.01ms !important}
  }
</style>

${rewriteLinks(header)}

<main>
${rewriteLinks(sections)}
</main>

${rewriteLinks(tail)}

<script src="assets/js/app.js"></script>
<script>
(function(){
  var PAGES = ${JSON.stringify(PAGES.map(p => p.id))};

  function setFilter(cat){
    document.querySelectorAll('.js-filter-cat').forEach(function(i){ i.checked = false; });
    if (!cat) { document.querySelector('.js-filter-cat') && document.querySelector('.js-filter-cat').dispatchEvent(new Event('change', {bubbles:true})); return; }
    var box = document.querySelector('.js-filter-cat[value="' + cat + '"]');
    if (box){ box.checked = true; box.dispatchEvent(new Event('change', {bubbles:true})); }
  }

  function reveal(){
    document.querySelectorAll('.route:not([hidden]) .reveal:not(.is-in)').forEach(function(el){
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    });
  }

  function route(){
    var raw = (location.hash || '#home').slice(1);
    var parts = raw.split('/');
    var name = parts[0];
    if (PAGES.indexOf(name) === -1) return; // якорь внутри страницы — не трогаем маршрут

    document.querySelectorAll('.route').forEach(function(el){
      el.hidden = el.dataset.page !== name;
    });
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(function(a){
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + name);
    });
    document.getElementById('mobileNav') && document.getElementById('mobileNav').classList.remove('is-open');
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    if (name === 'catalog') setFilter(parts[1]);
    setTimeout(reveal, 60);
    setTimeout(reveal, 700);
  }

  window.addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route);
  else route();
})();
</script>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'index.html'), out, 'utf8');
console.log('OK: share/index.html, ' + out.length + ' символов, страниц: ' + PAGES.length);
