(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const toast=$('[data-toast]'); let timer;
 window.stacklyToast=msg=>{if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2500)};
 const mt=$('[data-mobile-toggle]'), mn=$('[data-mobile-nav]'), header=$('#siteHeader');
 const setMobileMenu=(open)=>{if(!mt||!mn)return;mn.hidden=!open;mt.setAttribute('aria-expanded',String(open));mt.setAttribute('aria-label',open?'Close navigation':'Open navigation');mt.innerHTML=open?'<i data-lucide="x"></i>':'<i data-lucide="menu"></i>';window.lucide?.createIcons()};
 if(mt&&mn){mt.addEventListener('click',()=>setMobileMenu(mt.getAttribute('aria-expanded')!=='true'));mn.addEventListener('click',e=>{if(e.target.closest('a[href]'))setMobileMenu(false)});document.addEventListener('click',e=>{if(mt.getAttribute('aria-expanded')==='true'&&!(header&&e.composedPath().includes(header)))setMobileMenu(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mt.getAttribute('aria-expanded')==='true'){setMobileMenu(false);mt.focus()}});addEventListener('resize',()=>{if(innerWidth>1024&&mt.getAttribute('aria-expanded')==='true')setMobileMenu(false)},{passive:true})} 
 const top=$('[data-back-top]');const scroll=()=>{header?.classList.toggle('scrolled',scrollY>10);top?.classList.toggle('visible',scrollY>400)};addEventListener('scroll',scroll,{passive:true});scroll();top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 const reviews=$$('.review');let ri=0;function showReview(n){if(!reviews.length)return;ri=(n+reviews.length)%reviews.length;reviews.forEach((r,i)=>r.classList.toggle('active',i===ri));const c=$('[data-testimonial-count]');if(c)c.textContent=`${String(ri+1).padStart(2,'0')} / ${String(reviews.length).padStart(2,'0')}`} $('[data-testimonial-prev]')?.addEventListener('click',()=>showReview(ri-1));$('[data-testimonial-next]')?.addEventListener('click',()=>showReview(ri+1));
 const options={all:['THE HAPPY ACCIDENTS','Unexpectedly<br><em>worth it.</em>','Some flavours are made to surprise you. This is your invitation to try the thing you can’t quite pronounce.', 'assets/images/index/filter-all.jpg'],fruity:['BRIGHT & FRUITY','A little sunshine<br><em>in every bite.</em>','Fresh fruit notes, bright ripples, and flavours that taste like the best part of the season.', 'assets/images/index/filter-fruity.jpg'],chocolate:['RICH & CHOCOLATEY','For the love<br><em>of cocoa.</em>','Deep chocolate, soft brownie pieces, and the kind of richness worth taking your time over.', 'assets/images/index/filter-chocolate.jpg'],classic:['THE COMFORT CLUB','Some things<br><em>never miss.</em>','Vanilla, familiar favourites, and cosy notes that keep you coming back.', 'assets/images/index/filter-classic.jpg']};
 $$('[data-craving]').forEach(b=>b.addEventListener('click',()=>{ $$('[data-craving]').forEach(x=>x.classList.toggle('active',x===b));let a=options[b.dataset.craving]||options.all; let k=$('[data-discovery-kicker]'),ti=$('[data-discovery-title]'),de=$('[data-discovery-desc]'),im=$('[data-discovery-image]');if(k)k.textContent=a[0];if(ti)ti.innerHTML=a[1];if(de)de.textContent=a[2];if(im)im.src=a[3]}));
 $$('[data-current-year]').forEach(x=>x.textContent=new Date().getFullYear());const cd=$('[data-countdown]');if(cd){const target=new Date(cd.dataset.target).getTime();const tick=()=>{let s=Math.max(0,Math.floor((target-Date.now())/1000)),d=Math.floor(s/86400);s%=86400;let h=Math.floor(s/3600);s%=3600;let m=Math.floor(s/60);s%=60;[['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([k,v])=>{let e=$(`[data-${k}]`,cd);if(e)e.textContent=String(v).padStart(2,'0')})};tick();setInterval(tick,1000)}
 $$('[data-password-toggle]').forEach(b=>b.addEventListener('click',()=>{let i=document.getElementById(b.dataset.passwordToggle);if(i)i.type=i.type==='password'?'text':'password'}));
 $('[data-copy-page]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);stacklyToast('Page link copied.')}catch{stacklyToast('Copy is unavailable in this browser context.')}});
 if(window.lucide)lucide.createIcons();
})();

/* Header dropdowns (Home 1 / Home 2) — click, hover (CSS), keyboard, outside-click, Escape. */
(() => {
  const dds = document.querySelectorAll('[data-dropdown]');
  if (!dds.length) return;
  const close = (dd) => { dd.classList.remove('open'); dd.querySelector('[data-dropdown-toggle]')?.setAttribute('aria-expanded', 'false'); };
  const open = (dd) => { dds.forEach((o) => o !== dd && close(o)); dd.classList.add('open'); dd.querySelector('[data-dropdown-toggle]')?.setAttribute('aria-expanded', 'true'); };
  dds.forEach((dd) => {
    const t = dd.querySelector('[data-dropdown-toggle]');
    t?.addEventListener('click', (e) => { e.stopPropagation(); dd.classList.contains('open') ? close(dd) : open(dd); });
    dd.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(dd); t?.focus(); } });
    dd.addEventListener('focusout', (e) => { if (!dd.contains(e.relatedTarget)) close(dd); });
  });
  document.addEventListener('click', (e) => dds.forEach((dd) => !dd.contains(e.target) && close(dd)));
})();
