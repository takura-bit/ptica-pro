// Собирает share/index.html в ОДИН самодостаточный .html: стили, скрипт и картинки внутри.
const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\takura\\Desktop\\poultry-site';
const SHARE = path.join(ROOT, 'share');
const OUT = path.join(ROOT, 'ptica-pro.html');

const read = p => fs.readFileSync(p, 'utf8');
const dataUri = name =>
  'data:image/svg+xml;base64,' +
  fs.readFileSync(path.join(SHARE, 'assets/img', name + '.svg')).toString('base64');

const IMG_NAMES = ['whole', 'breast', 'drumstick', 'thigh', 'wing', 'leg', 'giblets', 'mdm', 'favicon'];
const IMG = Object.fromEntries(IMG_NAMES.map(n => [n, dataUri(n)]));

let page = read(path.join(SHARE, 'index.html'));
const css = read(path.join(SHARE, 'assets/css/style.css'));

// В app.js пути к картинкам строятся динамически — подменяем на словарь data-URI
let js = read(path.join(SHARE, 'assets/js/app.js'))
  .split('assets/img/${p.img}.svg').join('${IMG[p.img]}');
js = 'const IMG = ' + JSON.stringify(IMG) + ';\n' + js;

// Вырезаем из страницы head-часть (её соберём заново) и внешние подключения
page = page
  .replace(/<meta charset="utf-8">\s*/, '')
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<meta name="description"[\s\S]*?>\s*/, '')
  .replace(/<link rel="preconnect"[\s\S]*?>\s*/g, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com[\s\S]*?>\s*/, '')
  .replace(/<link rel="stylesheet" href="assets\/css\/style\.css">\s*/, '')
  // app.js вставляем ровно на его место — до скрипта-роутера
  .replace(/<script src="assets\/js\/app\.js"><\/script>/, () => '<script>\n' + js + '\n</script>')
  // статические картинки в разметке
  .replace(/assets\/img\/([a-z]+)\.svg/g, (m, n) => IMG[n] || m);

// Инлайн-<style> из сборки share уже внутри page — оставляем как есть,
// общий style.css вставляем перед ним.
const out = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ПТИЦА.ПРО — куриное сырьё оптом от производителя</title>
<meta name="description" content="Оптовые поставки куриного сырья: тушка ЦБ, разделка, филе, субпродукты, ММО. Каталог, производство, качество, логистика.">
<link rel="icon" href="${IMG.favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
${page.trim()}
</body>
</html>
`;

fs.writeFileSync(OUT, out, 'utf8');
console.log('OK: ' + OUT + ', ' + Math.round(out.length / 1024) + ' КБ');
console.log('осталось внешних ссылок на assets/: ' + (out.match(/assets\//g) || []).length);
