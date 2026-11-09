/* ============================================================
   ПТИЦА.ПРО — общий скрипт сайта
   ============================================================ */

/* ---------- 1. Номенклатура ---------- */
const PRODUCTS = [
  // Тушка ЦБ
  { id:'CB-101', name:'Тушка ЦБ 1 сорт, потрошёная', cat:'tushka', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'1,2–1,6 кг', pack:'Гофролоток, 15 кг',
    shelf:'5 суток', temp:'0…+2 °C', price:189, min:'1 т', img:'whole' },
  { id:'CB-102', name:'Тушка ЦБ 1 сорт, замороженная', cat:'tushka', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'1,3–1,7 кг', pack:'Пакет ПЭ / короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:172, min:'1 т', img:'whole' },
  { id:'CB-103', name:'Тушка ЦБ калиброванная «Гриль»', cat:'tushka', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,9–1,1 кг', pack:'Гофролоток, 15 кг',
    shelf:'5 суток', temp:'0…+2 °C', price:195, min:'0,5 т', img:'whole' },

  // Разделка
  { id:'RZ-201', name:'Грудка ЦБ на кости', cat:'razdelka', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,45–0,70 кг', pack:'Гофролоток, 12 кг',
    shelf:'5 суток', temp:'0…+2 °C', price:232, min:'0,5 т', img:'breast' },
  { id:'RZ-202', name:'Окорочок ЦБ', cat:'razdelka', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'0,28–0,40 кг', pack:'Короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:165, min:'1 т', img:'leg' },
  { id:'RZ-203', name:'Бедро ЦБ', cat:'razdelka', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,15–0,22 кг', pack:'Гофролоток, 12 кг',
    shelf:'5 суток', temp:'0…+2 °C', price:214, min:'0,5 т', img:'thigh' },
  { id:'RZ-204', name:'Голень ЦБ', cat:'razdelka', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,09–0,13 кг', pack:'Гофролоток, 12 кг',
    shelf:'5 суток', temp:'0…+2 °C', price:208, min:'0,5 т', img:'drumstick' },
  { id:'RZ-205', name:'Крыло ЦБ', cat:'razdelka', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'0,08–0,12 кг', pack:'Короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:178, min:'1 т', img:'wing' },
  { id:'RZ-206', name:'Спинно-лопаточная часть', cat:'razdelka', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'0,20–0,30 кг', pack:'Короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:78, min:'2 т', img:'whole' },

  // Филе
  { id:'FL-301', name:'Филе грудки ЦБ, без кожи', cat:'file', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,17–0,26 кг', pack:'Лоток в МГС / короб, 10 кг',
    shelf:'7 суток', temp:'0…+2 °C', price:348, min:'0,3 т', img:'breast' },
  { id:'FL-302', name:'Филе грудки ЦБ, шоковая заморозка', cat:'file', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'0,17–0,26 кг', pack:'Пакет / короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:312, min:'0,5 т', img:'breast' },
  { id:'FL-303', name:'Филе бедра ЦБ, без кости', cat:'file', state:'chilled',
    gost:'ГОСТ 31962-2013', calibre:'0,08–0,14 кг', pack:'Лоток в МГС / короб, 10 кг',
    shelf:'7 суток', temp:'0…+2 °C', price:336, min:'0,3 т', img:'thigh' },

  // Субпродукты
  { id:'SP-401', name:'Печень куриная', cat:'subprod', state:'frozen',
    gost:'ГОСТ 31657-2012', calibre:'блок 1 кг', pack:'Короб, 14 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:186, min:'0,5 т', img:'giblets' },
  { id:'SP-402', name:'Сердце куриное', cat:'subprod', state:'frozen',
    gost:'ГОСТ 31657-2012', calibre:'блок 1 кг', pack:'Короб, 14 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:232, min:'0,3 т', img:'giblets' },
  { id:'SP-403', name:'Желудки куриные, очищенные', cat:'subprod', state:'frozen',
    gost:'ГОСТ 31657-2012', calibre:'блок 1 кг', pack:'Короб, 14 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:168, min:'0,3 т', img:'giblets' },
  { id:'SP-404', name:'Суповой набор из ЦБ', cat:'subprod', state:'frozen',
    gost:'ГОСТ 31962-2013', calibre:'—', pack:'Короб, 15 кг',
    shelf:'12 месяцев', temp:'−18 °C', price:62, min:'2 т', img:'giblets' },
  { id:'SP-405', name:'Шеи куриные', cat:'subprod', state:'frozen',
    gost:'ГОСТ 31657-2012', calibre:'—', pack:'Короб, 15 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:74, min:'1 т', img:'giblets' },

  // ММО и фарш
  { id:'MM-501', name:'ММО птицы, сорт 1', cat:'mmo', state:'frozen',
    gost:'ГОСТ 31490-2012', calibre:'блок 20 кг', pack:'Блок в п/э, 20 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:128, min:'3 т', img:'mdm' },
  { id:'MM-502', name:'Фарш куриный крупноизмельчённый', cat:'mmo', state:'frozen',
    gost:'ТУ 10.13.14',  calibre:'блок 10 кг', pack:'Блок в п/э, 10 кг',
    shelf:'6 месяцев', temp:'−18 °C', price:149, min:'1 т', img:'mdm' }
];

const CAT_NAMES = {
  tushka:'Тушка ЦБ', razdelka:'Разделка', file:'Филе',
  subprod:'Субпродукты', mmo:'ММО и фарш'
};

/* ---------- 2. Утилиты ---------- */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const fmt = n => n.toLocaleString('ru-RU');

/* ---------- 3. Заявка (корзина) ---------- */
const CART_KEY = 'ptp_request_v1';

const Cart = {
  items: [],
  load(){
    try { this.items = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ this.items = []; }
  },
  save(){
    try { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); } catch(e){}
    this.render();
  },
  add(id){
    const found = this.items.find(i => i.id === id);
    if (found) found.qty += 1; else this.items.push({ id, qty: 1 });
    this.save();
    openDrawer();
  },
  setQty(id, qty){
    const it = this.items.find(i => i.id === id);
    if (!it) return;
    it.qty = Math.max(0.5, Math.round(qty * 2) / 2);
    this.save();
  },
  remove(id){
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },
  clear(){ this.items = []; this.save(); },
  total(){
    return this.items.reduce((sum, i) => {
      const p = PRODUCTS.find(p => p.id === i.id);
      return sum + (p ? p.price * 1000 * i.qty : 0);
    }, 0);
  },
  render(){
    const count = this.items.length;
    $$('.js-cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count ? 'grid' : 'none';
    });

    const body = $('#drawerBody');
    if (!body) return;

    if (!count){
      body.innerHTML = '<div class="empty" style="margin-top:8px">Заявка пока пуста.<br>Добавьте позиции из каталога — мы пришлём коммерческое предложение с ценой под ваш объём.</div>';
      $('#drawerTotal').textContent = '—';
      return;
    }

    body.innerHTML = this.items.map(i => {
      const p = PRODUCTS.find(p => p.id === i.id);
      if (!p) return '';
      return `<div class="ditem">
        <img src="assets/img/${p.img}.svg" alt="">
        <div style="flex:1">
          <b>${p.name}</b>
          <small>${p.id} · ${p.state === 'frozen' ? 'заморож.' : 'охлажд.'} · ${fmt(p.price)} ₽/кг</small>
          <div class="qty">
            <button type="button" data-minus="${p.id}">−</button>
            <input type="text" value="${i.qty}" data-qty="${p.id}" inputmode="decimal">
            <button type="button" data-plus="${p.id}">+</button>
          </div>
          <small style="display:inline-block;margin-left:8px">тонн</small>
        </div>
        <button class="ditem__rm" type="button" data-rm="${p.id}">убрать</button>
      </div>`;
    }).join('');

    $('#drawerTotal').textContent = '≈ ' + fmt(Math.round(this.total())) + ' ₽';

    $$('[data-plus]', body).forEach(b => b.onclick = () => this.setQty(b.dataset.plus, this.items.find(i => i.id === b.dataset.plus).qty + 0.5));
    $$('[data-minus]', body).forEach(b => b.onclick = () => this.setQty(b.dataset.minus, this.items.find(i => i.id === b.dataset.minus).qty - 0.5));
    $$('[data-rm]', body).forEach(b => b.onclick = () => this.remove(b.dataset.rm));
    $$('[data-qty]', body).forEach(inp => inp.onchange = () => {
      const v = parseFloat(inp.value.replace(',', '.'));
      this.setQty(inp.dataset.qty, isNaN(v) ? 1 : v);
    });
  }
};

function openDrawer(){
  $('#drawer')?.classList.add('is-open');
  $('#drawerBackdrop')?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer(){
  $('#drawer')?.classList.remove('is-open');
  $('#drawerBackdrop')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ---------- 4. Каталог ---------- */
function initCatalog(){
  const list = $('#productList');
  if (!list) return;

  const params = new URLSearchParams(location.search);
  const preCat = params.get('cat');
  if (preCat) {
    const box = $(`.js-filter-cat[value="${preCat}"]`);
    if (box) box.checked = true;
  }

  function draw(){
    const cats   = $$('.js-filter-cat:checked').map(i => i.value);
    const states = $$('.js-filter-state:checked').map(i => i.value);
    const q      = ($('#catalogSearch')?.value || '').trim().toLowerCase();

    const rows = PRODUCTS.filter(p =>
      (!cats.length   || cats.includes(p.cat)) &&
      (!states.length || states.includes(p.state)) &&
      (!q || (p.name + ' ' + p.id + ' ' + p.gost).toLowerCase().includes(q))
    );

    $('#catalogCount').textContent = rows.length
      ? `${rows.length} ${plural(rows.length, 'позиция', 'позиции', 'позиций')} в наличии`
      : 'Ничего не найдено';

    list.innerHTML = rows.length ? rows.map(cardHTML).join('')
      : '<div class="empty" style="grid-column:1/-1">По заданным фильтрам ничего не найдено. Сбросьте фильтры или напишите нам — подберём аналог.</div>';

    $$('[data-add]', list).forEach(b => b.onclick = () => Cart.add(b.dataset.add));
  }

  $$('.js-filter-cat, .js-filter-state').forEach(i => i.addEventListener('change', draw));
  $('#catalogSearch')?.addEventListener('input', draw);
  $('#filterReset')?.addEventListener('click', () => {
    $$('.js-filter-cat, .js-filter-state').forEach(i => i.checked = false);
    if ($('#catalogSearch')) $('#catalogSearch').value = '';
    draw();
  });

  draw();
}

function cardHTML(p){
  return `<article class="product">
    <div class="product__media">
      <span class="tag ${p.state === 'frozen' ? 'tag--frozen' : 'tag--chilled'}">${p.state === 'frozen' ? 'Замороженное' : 'Охлаждённое'}</span>
      <img src="assets/img/${p.img}.svg" alt="${p.name}" loading="lazy">
    </div>
    <div class="product__body">
      <div>
        <div class="product__title">${p.name}</div>
        <div class="product__art">Артикул ${p.id} · ${CAT_NAMES[p.cat]}</div>
      </div>
      <div class="specs">
        <div><span>Стандарт</span><span>${p.gost}</span></div>
        <div><span>Калибр</span><span>${p.calibre}</span></div>
        <div><span>Упаковка</span><span>${p.pack}</span></div>
        <div><span>Срок / темп.</span><span>${p.shelf}, ${p.temp}</span></div>
        <div><span>Мин. партия</span><span>${p.min}</span></div>
      </div>
      <div class="product__foot">
        <div class="price">от ${fmt(p.price)} ₽<small>/кг</small><em>с НДС 10%</em></div>
        <button class="btn btn--primary btn--sm" type="button" data-add="${p.id}">В заявку</button>
      </div>
    </div>
  </article>`;
}

function plural(n, one, few, many){
  const n10 = n % 10, n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
  return many;
}

/* ---------- 5. Интерфейс ---------- */
function initUI(){
  // мобильное меню
  const mnav = $('#mobileNav');
  $('#burger')?.addEventListener('click', () => { mnav.classList.add('is-open'); document.body.style.overflow = 'hidden'; });
  $('#mobileClose')?.addEventListener('click', () => { mnav.classList.remove('is-open'); document.body.style.overflow = ''; });

  // панель заявки
  $$('.js-open-cart').forEach(b => b.addEventListener('click', openDrawer));
  $('#drawerClose')?.addEventListener('click', closeDrawer);
  $('#drawerBackdrop')?.addEventListener('click', closeDrawer);
  $('#drawerClear')?.addEventListener('click', () => Cart.clear());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  // активный пункт меню
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.nav a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('is-active');
  });

  // FAQ
  $$('.faq__q').forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement;
    const open = item.classList.contains('is-open');
    $$('.faq__item').forEach(i => { i.classList.remove('is-open'); $('.faq__a', i).style.maxHeight = null; });
    if (!open){
      item.classList.add('is-open');
      $('.faq__a', item).style.maxHeight = $('.faq__a', item).scrollHeight + 'px';
    }
  }));

  // появление блоков
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting){
          setTimeout(() => e.target.classList.add('is-in'), idx * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // счётчики
  $$('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    if ('IntersectionObserver' in window){
      const io = new IntersectionObserver(e => {
        if (e[0].isIntersecting){ animateCount(el, target); io.disconnect(); }
      }, { threshold:.4 });
      io.observe(el);
    } else { el.textContent = fmt(target); }
  });

  // формы
  $$('form[data-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = f.querySelector('.form-ok');
    const btn = f.querySelector('button[type="submit"]');
    if (btn){ btn.disabled = true; btn.textContent = 'Отправляем…'; }
    setTimeout(() => {
      if (ok) ok.classList.add('is-visible');
      f.reset();
      if (btn){ btn.disabled = false; btn.textContent = btn.dataset.label || 'Отправить'; }
      if (f.dataset.form === 'request') Cart.clear();
    }, 700);
  }));

  // год в подвале
  $$('.js-year').forEach(el => el.textContent = new Date().getFullYear());
}

function animateCount(el, target){
  const dur = 1100, start = performance.now();
  const dec = target % 1 !== 0 ? 1 : 0;
  function tick(now){
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = dec ? val.toFixed(1).replace('.', ',') : fmt(Math.round(val));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- 6. Запуск ---------- */
document.addEventListener('DOMContentLoaded', () => {
  Cart.load();
  Cart.render();
  initCatalog();
  initUI();
});
