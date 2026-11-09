/* Compatibility for sections not yet rebuilt (deleted when the last section is rebuilt).
   1. Kiswahili dictionary: exact-text replacement after render (sw-dict.js), as before.
   2. Gradient-filled text from old section CSS is reset to plain text.
   3. Images that break B11/B12 (faces, red cross) are hidden until their replacements exist (AUDIT.md, appendix 00). */
(function(){
'use strict';
const swOn=()=>{try{return localStorage.getItem('afyaLang')==='sw'}catch(e){return false}};

/* ---- 1. Kiswahili layer ---- */
function swText(n){const raw=n.nodeValue;if(!raw||raw.length<2)return;const t=raw.replace(/\s+/g,' ').trim();if(!t)return;
 const D=window.AFYA_SWDICT||{},R=window.AFYA_SWRULES||[];let r=D[t];
 if(r==null)for(const [re,f] of R){if(re.test(t)){r=t.replace(re,f);break}}
 if(r!=null&&r!==t){n.nodeValue=raw.match(/^\s*/)[0]+r+raw.match(/\s*$/)[0]}}
function swfix(root){if(!swOn()||!window.AFYA_SWDICT||!root)return;if(root.nodeType===3){swText(root);return}if(root.nodeType!==1)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))swText(n)}

/* ---- 3. images on hold ---- */
const HOLD=new Set(['ac-clean','ac-cuff','ac-enter','ac-explain','ac-grips','ac-leave','ac-prick','ac-results','ac-tap','check','k-check','j-check',
 'cj-boxcounter','cj-boxhome','cj-cnt','cj-enter','cj-exit','cj-handheld','cj-home','cj-locker','cj-m-check','cj-member','cj-queue','cj-selfco','cj-walkout',
 'h-bd','h-cr','h-ds','h-mj','h-mm','h-rc','j-asubuhi','j-balcony','j-delivery','j-duka2','j-jioni','j-ofisi','j-usiku',
 'real-dental','real-family','real-man-phone','real-nurse-newborn','real-partner-clinic','real-recovery','real-p-mama-load','real-street-walk',
 'real-mother-back','real-p-crowd','real-queue','today1','today2','today3','team','c-care','c-inspect','c-factory','hub',
 'prod-kids','abox-hero','p-afya-check-2','p-afya-check-3','p-pay-demo-1','p-pay-demo-2','p-visit-film-1','p-visit-film-2','p-visit-film-3']);
const key=src=>{const m=String(src||'').match(/([^\/]+)\.(webp|png|jpe?g)(\?|$)/i);return m?m[1]:''};
const label=()=>swOn()?'Picha inaandaliwa':'Image in preparation';
function holdImgs(root){if(!root||root.nodeType!==1)return;
 root.querySelectorAll('img').forEach(im=>{if(im.dataset.abHold)return;const k=key(im.getAttribute('src'));if(!HOLD.has(k))return;
  im.dataset.abHold='1';const d=document.createElement('div');d.className='ab-img-out';d.textContent=label();
  const r=im.getBoundingClientRect();if(r.height>40)d.style.minHeight=Math.round(r.height)+'px';im.replaceWith(d)});
 root.querySelectorAll('[style*="url("]').forEach(el=>{const m=el.getAttribute('style').match(/url\(['"]?([^'")]+)/);if(!m||!HOLD.has(key(m[1])))return;
  el.style.backgroundImage='none';el.classList.add('ab-img-out');if(!el.textContent.trim())el.textContent=label()});
 root.querySelectorAll('video[poster]').forEach(v=>{if(HOLD.has(key(v.getAttribute('poster'))))v.removeAttribute('poster')})}

/* ---- 2. gradient text ---- */
function plainText(root){if(!root||root.nodeType!==1)return;root.querySelectorAll('*').forEach(el=>{const cs=getComputedStyle(el);
 if((cs.webkitBackgroundClip||cs.backgroundClip)==='text'){el.style.setProperty('background','none','important');el.style.setProperty('-webkit-text-fill-color','currentColor','important');el.style.setProperty('color','var(--ink)','important')}})}

function sweep(){const app=document.getElementById('app');if(!app)return;holdImgs(app);const L=app.querySelector('.ab-legacy');if(L)plainText(L);swfix(app)}
let q=0;const schedule=()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;sweep()})};
new MutationObserver(ms=>{if(swOn())for(const m of ms){if(m.type==='characterData')swText(m.target)}schedule()})
 .observe(document.documentElement,{childList:true,subtree:true,characterData:true});
addEventListener('afya:route',sweep);
})();
