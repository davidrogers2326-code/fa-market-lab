/* ===== Week 41 · HOLO layer: chart HUD (full screen, save image, measure, series toggles), reveal animations, ambient field ===== */
var HOLO=(function(){'use strict';
var D=document,R=D.documentElement;
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function isPrint(){return R.classList.contains('pdfdark')||!!(window.matchMedia&&matchMedia('print').matches)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
function toast(m){var t=D.getElementById('fxToast');if(!t){t=D.createElement('div');t.id='fxToast';t.setAttribute('role','status');D.body.appendChild(t)}t.textContent=m;t.className='noprint on';clearTimeout(t._h);t._h=setTimeout(function(){t.className='noprint'},3200)}
var IC={
 fs:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 png:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
 ms:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></svg>'};

/* ---------- shared gradients (referenced by CSS: fill:url(#hgUp)) ---------- */
function defs(){if(D.getElementById('holoDefs'))return;var d=D.createElement('div');
 d.innerHTML='<svg id="holoDefs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>'+
 '<linearGradient id="hgUp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--hg-up1,#62E8AE)"/><stop offset="1" style="stop-color:var(--hg-up2,#169A62)"/></linearGradient>'+
 '<linearGradient id="hgDn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--hg-dn1,#FF7B83)"/><stop offset="1" style="stop-color:var(--hg-dn2,#C2303B)"/></linearGradient>'+
 '<linearGradient id="hgGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:#F7E39A"/><stop offset=".55" style="stop-color:#D4AF37"/><stop offset="1" style="stop-color:#A8841E"/></linearGradient>'+
 '</defs></svg>';D.body.insertBefore(d.firstChild,D.body.firstChild)}

/* ---------- reveal on first view ---------- */
var io=null;
function observe(el){if(RM||!('IntersectionObserver' in window)||isPrint()||el._hseen)return;el._hseen=1;
 if(!io)io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;io.unobserve(en.target);var t=en.target;t.classList.add('vxanim');setTimeout(function(){t.classList.remove('vxanim')},2000)})},{rootMargin:'0px 0px -10% 0px',threshold:0.12});
 io.observe(el)}

/* ---------- toolbar on every chart ---------- */
function tools(el,type){var old=null;for(var i=0;i<el.children.length;i++)if(el.children[i].classList.contains('vxtb'))old=el.children[i];if(old)return;
 var t=D.createElement('div');t.className='vxtb noprint';
 t.innerHTML=(type==='candles'?'<button type="button" data-vxa="ms" class="'+(el.classList.contains('vxmeasure')?'on':'')+'" title="Measure: drag across the chart (or hold Shift and drag)" aria-label="Measure tool" aria-pressed="'+(el.classList.contains('vxmeasure')?'true':'false')+'">'+IC.ms+'</button>':'')+
  '<button type="button" data-vxa="png" title="Save this chart as an image" aria-label="Save chart as image">'+IC.png+'</button>'+
  '<button type="button" data-vxa="fs" title="Full screen (F)" aria-label="Open chart full screen">'+IC.fs+'</button>';
 el.appendChild(t)}
function post(el,type){try{el.classList.add('vxhost');el.setAttribute('data-vxt',type);tools(el,type);observe(el)}catch(e){if(window.console)console.warn('[HOLO] post',e)}}

/* ---------- full-screen chart view ---------- */
var FS=null;
function redraw(){try{CORE.redrawAll()}catch(e){}}
function openFs(host){if(!host)return;if(FS)closeFs();var tgt=host.closest('.dx')||host.closest('.fig')||host;var ph=D.createComment('vxfs');tgt.parentNode.insertBefore(ph,tgt);
 var m=D.getElementById('vxFs');if(!m){m=D.createElement('div');m.id='vxFs';m.className='noprint';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Chart full screen');
  m.innerHTML='<div class="vxfsw"><div class="vxfsh"><span class="vxfsk"><i></i>CHART VIEW · WK41</span><b id="vxFsT"></b><span class="vxfshint" id="vxFsH"></span><button type="button" id="vxFsX" aria-label="Close full screen">✕</button></div><div class="vxfs" id="vxFsB"></div></div>';D.body.appendChild(m)}
 var tt=tgt.querySelector('.ft,.dxsym,.tph,h3,h4');D.getElementById('vxFsT').textContent=(tt&&tt.textContent)||host.getAttribute('aria-label')||'Chart';
 D.getElementById('vxFsH').textContent=host.getAttribute('data-vxt')==='candles'?'Drag to scroll · Ctrl or Shift + wheel to zoom · Shift + drag to measure · double-click to reset · Esc to close':'Hover for exact values · Esc to close';
 D.getElementById('vxFsB').appendChild(tgt);m.hidden=false;D.body.style.overflow='hidden';FS={tgt:tgt,ph:ph,host:host};
 requestAnimationFrame(function(){m.classList.add('on');redraw()});setTimeout(function(){var x=D.getElementById('vxFsX');if(x)x.focus()},40)}
function closeFs(){if(!FS)return;var f=FS;FS=null;f.ph.parentNode.insertBefore(f.tgt,f.ph);f.ph.parentNode.removeChild(f.ph);var m=D.getElementById('vxFs');m.classList.remove('on');m.hidden=true;D.body.style.overflow='';redraw();setTimeout(function(){try{f.host.scrollIntoView({block:'center'})}catch(e){}},40)}

/* ---------- save chart as PNG ---------- */
var PROPS=['stop-color','stop-opacity','fill','fill-opacity','stroke','stroke-width','stroke-opacity','stroke-dasharray','stroke-linecap','stroke-linejoin','opacity','font-family','font-size','font-weight','letter-spacing','text-anchor','visibility'];
function inline(a,b){var cs=getComputedStyle(a),st='';PROPS.forEach(function(p){var v=cs.getPropertyValue(p);if(v)st+=p+':'+v+';'});b.setAttribute('style',st)}
function slug(s){return String(s||'chart').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,48)||'chart'}
function png(host){var sv=host&&host.querySelector('svg.vxs');if(!sv)return;try{
 var vb=sv.viewBox&&sv.viewBox.baseVal,W=(vb&&vb.width)||sv.clientWidth,H=(vb&&vb.height)||sv.clientHeight,cl=sv.cloneNode(true),a=sv.querySelectorAll('*'),b=cl.querySelectorAll('*');
 for(var i=0;i<a.length;i++)inline(a[i],b[i]);
 $$('.vxhit,.vxch,.vxhd,.vxcx,.vxlive',cl).forEach(function(n){n.parentNode.removeChild(n)});
 var hd=D.getElementById('holoDefs');if(hd){var dd=hd.querySelector('defs').cloneNode(true),sa=hd.querySelectorAll('stop'),sb=dd.querySelectorAll('stop');for(var k=0;k<sa.length;k++)sb[k].setAttribute('style','stop-color:'+getComputedStyle(sa[k]).getPropertyValue('stop-color'));cl.insertBefore(dd,cl.firstChild)}
 cl.setAttribute('xmlns','http://www.w3.org/2000/svg');cl.setAttribute('width',W);cl.setAttribute('height',H);cl.removeAttribute('class');
 var rs=getComputedStyle(R),bg=(rs.getPropertyValue('--card')||'#0F1116').trim(),gold=(rs.getPropertyValue('--gold')||'#D4AF37').trim(),mut=(rs.getPropertyValue('--mut')||'#8E8A7E').trim();
 var host2=host.closest('.dx')||host.closest('.fig')||host,tt=host2.querySelector('.ft,.dxsym,.tph,h3,h4'),title=(tt&&tt.textContent)||'Chart';
 var xml=new XMLSerializer().serializeToString(cl),img=new Image(),sc=2,top=40,foot=34;
 img.onload=function(){var c=D.createElement('canvas');c.width=W*sc;c.height=(H+top+foot)*sc;var x=c.getContext('2d');x.scale(sc,sc);x.fillStyle=bg;x.fillRect(0,0,W,H+top+foot);
  x.fillStyle=gold;x.fillRect(0,0,W,2);x.font='700 15px Poppins, Arial, sans-serif';x.fillText(title.slice(0,90),14,26);x.drawImage(img,0,top,W,H);
  x.fillStyle=mut;x.font='600 11px Poppins, Arial, sans-serif';x.fillText('FAHMY’S VAULT · WEEK 41 · WK41 · education only, not advice',14,H+top+22);
  try{c.toBlob(function(bl){if(!bl){toast('Saving images is blocked in this window. Open the brief in a full browser tab.');return}var u=URL.createObjectURL(bl),l=D.createElement('a');l.href=u;l.download='FAHMYS_VAULT_WK41_'+slug(title)+'.png';D.body.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(u);l.remove()},1500);toast('Chart saved as an image.')},'image/png')}catch(e){toast('Saving images is blocked in this window. Open the brief in a full browser tab.')}};
 img.onerror=function(){toast('Could not save this chart here. Try a full browser tab.')};
 img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml)}catch(e){toast('Could not save this chart here. Try a full browser tab.')}}

/* ---------- events ---------- */
D.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;var b=t.closest('[data-vxa]');
 if(b){var host=b.closest('.vxhost'),k=b.getAttribute('data-vxa');if(!host)return;
  if(k==='fs'){if(FS&&FS.host===host)closeFs();else openFs(host)}else if(k==='png')png(host);
  else if(k==='ms'){var on=!host.classList.contains('vxmeasure');host.classList.toggle('vxmeasure',on);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false');toast(on?'Measure on: drag across the chart to read the % move and bars.':'Measure off: drag scrolls the chart again.')}
  return}
 var lg=t.closest('.vxlg [data-sj]');if(lg){var h2=lg.closest('.vxhost'),o=h2&&h2._vxl;if(!o)return;var se=o.series[+lg.getAttribute('data-sj')];if(!se)return;var live=o.series.filter(function(s){return !s._off}).length;if(!se._off&&live<=1){toast('At least one line stays on.');return}se._off=!se._off;try{VX.line(h2,o)}catch(x){}return}
 if(t.closest('#vxFsX')||t.id==='vxFs'){closeFs();return}});
/* heat map: row and column crosshair */
var hsv=null;function hclear(){if(hsv){$$('.vxcell[data-hl]',hsv).forEach(function(k){k.removeAttribute('data-hl')});hsv=null}}
D.addEventListener('pointerover',function(e){var c=e.target&&e.target.closest&&e.target.closest('.vxcell');hclear();if(!c)return;var sv=c.ownerSVGElement,i=c.getAttribute('data-i'),j=c.getAttribute('data-j');if(i==null)return;hsv=sv;$$('.vxcell',sv).forEach(function(k){if(k===c)k.setAttribute('data-hl','x');else if(k.getAttribute('data-i')===i||k.getAttribute('data-j')===j)k.setAttribute('data-hl','1')})},{passive:true});
var hov=null;D.addEventListener('pointerover',function(e){var h=e.target&&e.target.closest&&e.target.closest('.vxhost');if(h)hov=h},{passive:true});
D.addEventListener('keydown',function(e){if(e.key==='Escape'&&FS){closeFs();return}
 if((e.key==='f'||e.key==='F')&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName||'')&&!e.target.isContentEditable){var s=D.getElementById('sk');if(s&&!s.hidden)return;if(FS){e.preventDefault();closeFs();return}if(hov&&hov.matches&&hov.matches(':hover')){e.preventDefault();openFs(hov)}}});

/* ---------- ambient: HUD corners, cursor spotlight, perspective grid, particle field ---------- */
function hud(){$$('section.mod,.dx,.term,.part').forEach(function(s){for(var i=0;i<s.children.length;i++)if(s.children[i].classList.contains('hfx'))return;var f=D.createElement('span');f.className='hfx noprint';f.setAttribute('aria-hidden','true');s.insertBefore(f,s.firstChild)});
 var hero=D.querySelector('.hero');if(hero&&!hero.querySelector('.hgrid')){var g=D.createElement('div');g.className='hgrid noprint';g.setAttribute('aria-hidden','true');g.innerHTML='<i></i><b></b>';hero.insertBefore(g,hero.firstChild)}
 var raf=0,last=null;D.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;last=e;if(raf)return;raf=requestAnimationFrame(function(){raf=0;var t=last.target&&last.target.closest&&last.target.closest('.dx,.term,section.mod');if(!t)return;var r=t.getBoundingClientRect();t.style.setProperty('--mx',Math.round(last.clientX-r.left)+'px');t.style.setProperty('--my',Math.round(last.clientY-r.top)+'px')})},{passive:true})}
function field(){if(RM||isPrint()||D.getElementById('holoBg'))return;var c=D.createElement('canvas');c.id='holoBg';c.className='noprint';c.setAttribute('aria-hidden','true');D.body.insertBefore(c,D.body.firstChild);
 var x=c.getContext('2d');if(!x)return;var P=[],w=0,h=0,dpr=Math.min(2,window.devicePixelRatio||1),mx=-999,my=-999,run=true;
 function size(){w=innerWidth;h=innerHeight;c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);c.style.width=w+'px';c.style.height=h+'px';x.setTransform(dpr,0,0,dpr,0,0)}size();addEventListener('resize',size);
 var n=Math.round(Math.max(24,Math.min(64,w*h/24000)));for(var i=0;i<n;i++)P.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16-.04,r:Math.random()*1.3+.4,t:Math.random()*6.28});
 addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY},{passive:true});
 D.addEventListener('visibilitychange',function(){var was=run;run=!D.hidden;if(run&&!was)requestAnimationFrame(tick)});
 function tick(){if(!run)return;x.clearRect(0,0,w,h);var light=R.getAttribute('data-theme')==='light',col=light?'154,118,20':'212,175,55',L=12000;
  for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;p.t+=0.02;if(p.x<-5)p.x=w+5;if(p.x>w+5)p.x=-5;if(p.y<-5)p.y=h+5;if(p.y>h+5)p.y=-5;
   x.fillStyle='rgba('+col+','+((light?.28:.42)+Math.sin(p.t)*.15).toFixed(3)+')';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
   for(var j=i+1;j<P.length;j++){var q=P[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;if(d<L){x.strokeStyle='rgba('+col+','+((1-d/L)*(light?.08:.12)).toFixed(3)+')';x.lineWidth=.6;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
   var ex=p.x-mx,ey=p.y-my,ed=ex*ex+ey*ey;if(ed<24000){x.strokeStyle='rgba(47,213,201,'+((1-ed/24000)*.2).toFixed(3)+')';x.lineWidth=.7;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(mx,my);x.stroke()}}
  requestAnimationFrame(tick)}
 requestAnimationFrame(tick)}

/* ---------- print safety ---------- */
function strip(){if(FS)closeFs();$$('.vxanim').forEach(function(e){e.classList.remove('vxanim')})}
addEventListener('beforeprint',strip);
var op=window.W40print;window.W40print=function(){strip();if(op)op()};

defs();
function start(){try{hud()}catch(e){}try{field()}catch(e){}}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
return {post:post,fs:openFs,close:closeFs,png:png};
})();
