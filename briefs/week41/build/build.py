#!/usr/bin/env python3
"""Week 41 HOLO upgrade: patch the VX chart engine and append the HOLO layer."""
import sys, pathlib
S = pathlib.Path(__file__).parent
src = (S / 'source_Week41_Brief.html').read_text(encoding='utf-8')
holo_css = (S / 'holo.css').read_text(encoding='utf-8')
holo_js = (S / 'holo.js').read_text(encoding='utf-8')

def rep(old, new, count=1):
    global src
    n = src.count(old)
    if n != count:
        sys.exit(f'patch expected {count} got {n}: {old[:90]!r}')
    src = src.replace(old, new)

# ---------- candles: unique ids for clip paths (several desk hosts had none) ----------
rep("function candles(el,o){\n var st=", "function candles(el,o){\n if(!el.id)el.id='vxc'+Math.random().toString(36).slice(2,8);var st=")
# ---------- candles: taller in full screen ----------
rep("var w=W(el),narrow=w<560,h=o.height||(narrow?360:470),pr=narrow?64:84",
    "var w=W(el),narrow=w<560,fsH=el.closest&&el.closest('.vxfs')?Math.max(470,innerHeight-300):0,h=o.height||fsH||(narrow?360:470),pr=narrow?64:84")
# crosshair: add a time tag on the x axis, plus a measure group and a live pulse
rep("""<text class="vxcytt" x="'+(x1+8)+'" y="0"></text></g>';""",
    """<text class="vxcytt" x="'+(x1+8)+'" y="0"></text><rect class="vxcxb" x="0" y="'+(m.t+ph+3)+'" width="150" height="20" rx="4"/><text class="vxcxbt" x="0" y="'+(m.t+ph+17)+'" text-anchor="middle"></text></g>';
 s+='<g class="vxms" opacity="0"><rect class="vxmsr"/><line class="vxmsl"/><rect class="vxmsb" rx="7"/><text class="vxmst" text-anchor="middle"></text><text class="vxmst2" text-anchor="middle"></text></g>';
 if(st.off===0){var lb2=vis[vis.length-1];s+='<circle class="vxlive '+(lb2[4]>=lb2[1]?'u':'d')+'" cx="'+X(vis.length-1)+'" cy="'+Y(lb2[4])+'" r="3.5"/>'}""")
old_handlers = """ var hit=sv.querySelector('.vxhit'),drag=null;
 function pt(e){var r=sv.getBoundingClientRect();return {x:(e.clientX-r.left)*(w/r.width),y:(e.clientY-r.top)*(h/r.height)}}
 hit.addEventListener('pointermove',function(e){var p=pt(e);if(drag!=null){var di=Math.round((p.x-drag.x)/cw);if(di!==0){st.off=Math.max(0,Math.min(N-view,drag.off+di));candles(el,o);return}}var i=Math.round((p.x-m.l)/cw-0.5);if(i<0||i>=vis.length){ch.setAttribute('opacity',0);return}ch.setAttribute('opacity',1);cx.setAttribute('x1',X(i));cx.setAttribute('x2',X(i));cy.setAttribute('y1',p.y);cy.setAttribute('y2',p.y);cyt.setAttribute('y',p.y-10);cytt.setAttribute('y',p.y+4);cytt.textContent=nf(hi-(p.y-m.t)/ph*(hi-lo),dec);show(vis[i])});
 hit.addEventListener('pointerleave',function(){ch.setAttribute('opacity',0);show(vis[vis.length-1]);drag=null});
 hit.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'){drag={x:pt(e).x,off:st.off};hit.setPointerCapture(e.pointerId)}});
 hit.addEventListener('pointerup',function(){drag=null});"""
new_handlers = """ var hit=sv.querySelector('.vxhit'),drag=null,ms=null,msg=sv.querySelector('.vxms'),cxb=sv.querySelector('.vxcxb'),cxbt=sv.querySelector('.vxcxbt');
 function pt(e){var r=sv.getBoundingClientRect();return {x:(e.clientX-r.left)*(w/r.width),y:(e.clientY-r.top)*(h/r.height)}}
 function ix(x){return Math.max(0,Math.min(vis.length-1,Math.round((x-m.l)/cw-0.5)))}
 function yv(y){return hi-(Math.max(m.t,Math.min(m.t+ph,y))-m.t)/ph*(hi-lo)}
 function measure(a,b){var i1=ix(b.x),v1=yv(b.y),xa=X(a.i),xb=X(i1),ya=Y(a.v),yb=Y(v1),up=v1>=a.v,k=up?'u':'d',bars=Math.abs(i1-a.i);
  var r=msg.querySelector('.vxmsr');r.setAttribute('x',Math.min(xa,xb));r.setAttribute('y',Math.min(ya,yb));r.setAttribute('width',Math.max(1,Math.abs(xb-xa)));r.setAttribute('height',Math.max(1,Math.abs(yb-ya)));r.setAttribute('class','vxmsr '+k);
  var l=msg.querySelector('.vxmsl');l.setAttribute('x1',xa);l.setAttribute('y1',ya);l.setAttribute('x2',xb);l.setAttribute('y2',yb);l.setAttribute('class','vxmsl '+k);
  var t1=sg((v1/a.v-1)*100,2),t2=(up?'+':'−')+nf(Math.abs(v1-a.v),dec)+' · '+bars+' bar'+(bars===1?'':'s'),bw2=Math.max(t1.length*8.4,t2.length*6.6)+22,bx=Math.max(m.l+2,Math.min(x1-bw2-2,(xa+xb)/2-bw2/2)),by=up?Math.min(ya,yb)-48:Math.max(ya,yb)+8;by=Math.max(m.t+2,Math.min(m.t+ph-44,by));
  var bb=msg.querySelector('.vxmsb');bb.setAttribute('x',bx);bb.setAttribute('y',by);bb.setAttribute('width',bw2);bb.setAttribute('height',40);bb.setAttribute('class','vxmsb '+k);
  var ts=msg.querySelectorAll('text');ts[0].setAttribute('x',bx+bw2/2);ts[0].setAttribute('y',by+17);ts[0].textContent=t1;ts[1].setAttribute('x',bx+bw2/2);ts[1].setAttribute('y',by+32);ts[1].textContent=t2;msg.setAttribute('opacity',1)}
 hit.addEventListener('pointermove',function(e){var p=pt(e);if(ms){measure(ms,p)}else if(drag!=null){var di=Math.round((p.x-drag.x)/cw);if(di!==0){st.off=Math.max(0,Math.min(N-view,drag.off+di));candles(el,o);return}}var i=Math.round((p.x-m.l)/cw-0.5);if(i<0||i>=vis.length){ch.setAttribute('opacity',0);return}ch.setAttribute('opacity',1);cx.setAttribute('x1',X(i));cx.setAttribute('x2',X(i));cy.setAttribute('y1',p.y);cy.setAttribute('y2',p.y);cyt.setAttribute('y',p.y-10);cytt.setAttribute('y',p.y+4);cytt.textContent=nf(hi-(p.y-m.t)/ph*(hi-lo),dec);cxb.setAttribute('x',Math.max(m.l,Math.min(x1-150,X(i)-75)));cxbt.setAttribute('x',Math.max(m.l+75,Math.min(x1-75,X(i))));cxbt.textContent=tlab(vis[i][0],tf,1);show(vis[i])});
 hit.addEventListener('pointerleave',function(){ch.setAttribute('opacity',0);show(vis[vis.length-1]);drag=null});
 hit.addEventListener('pointerdown',function(e){var p=pt(e);if(e.shiftKey||el.classList.contains('vxmeasure')){e.preventDefault();ms={i:ix(p.x),v:yv(p.y)};msg.setAttribute('opacity',0);try{hit.setPointerCapture(e.pointerId)}catch(x){}return}drag={x:p.x,off:st.off};try{hit.setPointerCapture(e.pointerId)}catch(x){}});
 hit.addEventListener('pointerup',function(){drag=null;ms=null});hit.addEventListener('pointercancel',function(){drag=null;ms=null});
 hit.addEventListener('dblclick',function(){zoom(el,0)});
 sv.addEventListener('wheel',function(e){if(!(e.ctrlKey||e.metaKey||e.shiftKey))return;e.preventDefault();zoom(el,e.deltaY>0?1.18:0.85)},{passive:false});"""
rep(old_handlers, new_handlers)
rep(" el._vxo=o}\nfunction zoom(", " el._vxo=o;if(window.HOLO)HOLO.post(el,'candles')}\nfunction zoom(")
# allow touch dragging to pan horizontally
rep(".vxs{display:block;font-family:var(--hf);touch-action:pan-y}", ".vxs{display:block;font-family:var(--hf);touch-action:pan-y}\n.vxmeasure .vxs{touch-action:none}")

# ---------- line: draw-in class, toggleable series, hover dots ----------
rep("o.series.forEach(function(se,j){var col=se.c||C.p[j],d='';", "o.series.forEach(function(se,j){if(se._off)return;var col=se.c||C.p[j],d='';")
rep("""  s+='<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+(se.w||2.2)+'\"""",
    """  s+='<path class="vxln'+(se.dash?' dsh':'')+'"'+(se.dash?'':' pathLength="1000"')+' d="'+d+'" fill="none" stroke="'+col+'" stroke-width="'+(se.w||2.2)+'\"""")
rep("""s+='<line class="vxcx" x1="0" x2="0" y1="'+m.t+'" y2="'+(h-m.b)+'" opacity="0"/><rect class="vxhit\"""",
    """s+='<line class="vxcx" x1="0" x2="0" y1="'+m.t+'" y2="'+(h-m.b)+'" opacity="0"/><g class="vxhd">'+o.series.map(function(se,j){return se._off?'':'<circle data-j="'+j+'" r="5" cx="0" cy="0" fill="'+(se.c||C.p[j])+'" stroke="var(--card)" stroke-width="2" opacity="0"/>'}).join('')+'</g><rect class="vxhit\"""")
rep("""'<div class="vxlg">'+o.series.map(function(se,j){return '<span><i""",
    """'<div class="vxlg">'+o.series.map(function(se,j){return '<span data-sj="'+j+'" class="'+(se._off?'off':'')+'" title="Show or hide this line"><i""")
rep("""cx.setAttribute('x1',X(i));cx.setAttribute('x2',X(i));cx.setAttribute('opacity',1);tip(e,""",
    """cx.setAttribute('x1',X(i));cx.setAttribute('x2',X(i));cx.setAttribute('opacity',1);$$('.vxhd circle',sv).forEach(function(c){var v=o.series[+c.getAttribute('data-j')].data[i];if(v==null){c.setAttribute('opacity',0);return}c.setAttribute('cx',X(i));c.setAttribute('cy',Y(v));c.setAttribute('opacity',1)});tip(e,""")
rep(""" sv.querySelector('.vxhit').addEventListener('pointerleave',function(){cx.setAttribute('opacity',0);tip(null,'')})}""",
    """ sv.querySelector('.vxhit').addEventListener('pointerleave',function(){cx.setAttribute('opacity',0);$$('.vxhd circle',sv).forEach(function(c){c.setAttribute('opacity',0)});tip(null,'')});
 el._vxl=o;if(window.HOLO)HOLO.post(el,'line')}""")

# ---------- hbars ----------
rep("""rx="4" fill="'+c+'" class="vxbar" data-t=""", """rx="4" fill="'+c+'" class="vxbar'+(r.v<0?' neg':'')+'" data-t=""")
rep("""el.innerHTML=svg(w,h,s);$$('.vxbar',el).forEach(function(b){b.addEventListener('pointermove',function(e){var t=b.getAttribute('data-t');if(t)tip(e,t)});b.addEventListener('pointerleave',function(){tip(null,'')})})}""",
    """el.innerHTML=svg(w,h,s);$$('.vxbar',el).forEach(function(b){b.addEventListener('pointermove',function(e){var t=b.getAttribute('data-t');if(t)tip(e,t)});b.addEventListener('pointerleave',function(){tip(null,'')})});if(window.HOLO)HOLO.post(el,'hbars')}""")

# ---------- waterfall ----------
rep("""s+='<rect x="'+x+'" y="'+y1+'" width="'+ww+'" height="'+Math.max(1.5,y2-y1)+'" rx="3" fill="'+c+'\"""",
    """s+='<rect class="vxwf" x="'+x+'" y="'+y1+'" width="'+ww+'" height="'+Math.max(1.5,y2-y1)+'" rx="3" fill="'+c+'\"""")
rep(""" el.innerHTML=svg(w,h,s)}

/* ---------------- gauge""", """ el.innerHTML=svg(w,h,s);if(window.HOLO)HOLO.post(el,'waterfall')}

/* ---------------- gauge""")

# ---------- gauge: track, glow, sweeping needle ----------
rep("""o.bands.forEach(function(b){s+='<path d="'+arc(f(b[0]),f(b[1]),R)+'" fill="none" stroke="'+b[2]+'" stroke-width="'+th+'" opacity=".92"/>'});""",
    """s+='<path d="'+arc(Math.PI,0,R+th*0.9)+'" fill="none" class="vxgtrk" stroke-width="1.2" stroke-dasharray="2 5"/>';o.bands.forEach(function(b){s+='<path class="vxgb2" d="'+arc(f(b[0]),f(b[1]),R)+'" fill="none" stroke="'+b[2]+'" stroke-width="'+th+'" opacity=".92"/>'});""")
rep("""s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+nx+'" y2="'+ny+'" stroke="var(--gold)" stroke-width="'+(w*0.016)+'" stroke-linecap="round"/>""",
    """s+='<line class="vxnd" style="transform-origin:'+cx+'px '+cy+'px;--nr:'+(-(Math.PI-a2)*180/Math.PI).toFixed(1)+'deg" x1="'+cx+'" y1="'+cy+'" x2="'+nx+'" y2="'+ny+'" stroke="var(--gold)" stroke-width="'+(w*0.016)+'" stroke-linecap="round"/>""")
rep(""" el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h+18,s)+'</div>'}""",
    """ el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h+18,s)+'</div>';if(window.HOLO)HOLO.post(el,'gauge')}""")

# ---------- donut ----------
rep("""s+='<path d="M'+p(R,a+g)+'A'+R+','+R+' 0 '+lg+' 1 '+p(R,a1-g)+'L'+p(r,a1-g)+'A'+r+','+r+' 0 '+lg+' 0 '+p(r,a+g)+'Z" fill="'+it.c+'"/>';""",
    """s+='<path class="vxseg" style="transform-origin:'+cx+'px '+cy+'px" d="M'+p(R,a+g)+'A'+R+','+R+' 0 '+lg+' 1 '+p(R,a1-g)+'L'+p(r,a1-g)+'A'+r+','+r+' 0 '+lg+' 0 '+p(r,a+g)+'Z" fill="'+it.c+'"><title>'+esc((it.l||'')+' '+it.v+'%')+'</title></path>';""")
rep(""" el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h,s)+'</div>'}

/* ---------------- heatmap""", """ el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h,s)+'</div>';if(window.HOLO)HOLO.post(el,'donut')}

/* ---------------- heatmap""")

# ---------- heat: row/column crosshair ----------
rep("""rx="5" fill="'+(i===j?'var(--card3)':col(v))+'" class="vxcell" data-t=""", """rx="5" fill="'+(i===j?'var(--card3)':col(v))+'" class="vxcell" data-i="'+i+'" data-j="'+j+'" data-t=""")
rep("""el.innerHTML=svg(lw+cs*n+6,h,s);$$('.vxcell',el).forEach(function(c){c.addEventListener('pointermove',function(e){tip(e,c.getAttribute('data-t'))});c.addEventListener('pointerleave',function(){tip(null,'')})})}""",
    """el.innerHTML=svg(lw+cs*n+6,h,s);$$('.vxcell',el).forEach(function(c){c.addEventListener('pointermove',function(e){tip(e,c.getAttribute('data-t'))});c.addEventListener('pointerleave',function(){tip(null,'')})});if(window.HOLO)HOLO.post(el,'heat')}""")

# ---------- scatter, hist, radar, flow ----------
rep("""el.innerHTML=svg(w,h,s);$$('.vxpt',el).forEach(function(c){c.addEventListener('pointermove',function(e){tip(e,c.getAttribute('data-t'))});c.addEventListener('pointerleave',function(){tip(null,'')})})}""",
    """el.innerHTML=svg(w,h,s);$$('.vxpt',el).forEach(function(c){c.addEventListener('pointermove',function(e){tip(e,c.getAttribute('data-t'))});c.addEventListener('pointerleave',function(){tip(null,'')})});if(window.HOLO)HOLO.post(el,'scatter')}""")
rep("""s+='<rect x="'+(x+1)+'" y="'+(h-m.b-hh)+'" width="'+Math.max(1,ww-2)+'" height="'+hh+'" rx="3\"""",
    """s+='<rect class="vxwf" x="'+(x+1)+'" y="'+(h-m.b-hh)+'" width="'+Math.max(1,ww-2)+'" height="'+hh+'" rx="3\"""")
rep(""" el.innerHTML=svg(w,h,s)}

/* ---------------- radar""", """ el.innerHTML=svg(w,h,s);if(window.HOLO)HOLO.post(el,'hist')}

/* ---------------- radar""")
rep("""s+='<polygon points="'+pts+'" fill="'+st.c+'" fill-opacity=".22" stroke="'+st.c+'" stroke-width="2.2"/>';""",
    """s+='<polygon class="vxrp" style="transform-origin:'+cx+'px '+cy+'px" points="'+pts+'" fill="'+st.c+'" fill-opacity=".22" stroke="'+st.c+'" stroke-width="2.2"/>';""")
rep(""" el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h,s)+'</div>'}

/* ---------------- flow""", """ el.innerHTML='<div style="max-width:'+w+'px;margin:0 auto">'+svg(w,h,s)+'</div>';if(window.HOLO)HOLO.post(el,'radar')}

/* ---------------- flow""")
rep(""" el.innerHTML=svg(w,h,s)}

return {candles:""", """ el.innerHTML=svg(w,h,s);if(window.HOLO)HOLO.post(el,'flow')}

return {candles:""")

# ---------- title + inject layer ----------
rep("</style>\n<script>document.documentElement.className+=' js';</script>",
    "</style>\n<style id=\"holoCss\">\n" + holo_css + "\n</style>\n<script>document.documentElement.className+=' js';</script>")
# HOLO must exist before the chart layers draw on DOMContentLoaded: define it right after VX
rep("""return {candles:candles,zoom:zoom,""", """return {candles:candles,zoom:zoom,""")
marker = "</script>\n<script>/* ===== Week 41 layer: Vault chart engine"
rep(marker, "</script>\n<script>\n" + holo_js + "\n</script>\n<script>/* ===== Week 41 layer: Vault chart engine")

out = S / 'out/FAHMYS_VAULT_Week41_Brief.html'
out.parent.mkdir(exist_ok=True)
out.write_text(src, encoding='utf-8')
print('wrote', out, len(src))
