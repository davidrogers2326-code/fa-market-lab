/* 5.4 · pre-sale gate before store 1 (decision D-20, 10 Nov 2026).
   5.4 is still the legacy section (part5.js), rendered through the shell's secShell, which reads window.V3MODS['s5-4']
   and expects an array of [title, html] modules. This file wraps the existing module list (calls it, then appends one
   module): the gate of 300 founding-member deposits before opening, what each path means for store 1, the shared plan
   from store 2, and the downside risk with its three answers. Figures are read from MODEL and follow the funding switch;
   the cash low comes from the 6.1 cash path (AB_S6.cashPath). Token classes only. */
(function(){
'use strict';
const A=()=>window.AB,T=(e,s)=>A().T(e,s),E=s=>A().E(s),N=(k,v,f)=>A().numHTML(k,v,f);
const GATE_N=300;
const sw=()=>window.AFYA_LANG==='sw';
const tshM=n=>{const v=n/1e6,a=Math.abs(v),x=(v<0?'−':'')+String(parseFloat(a.toFixed(a>=100?0:1)));return sw()?'TSh '+x+' milioni':'TSh '+x+'M'};

function gateModule(){const M=window.MODEL;if(!M||!M.inputs)return null;
 const I=M.inputs,lean=A().isLean(),sd=I.seed,G=I.growth,b=M.get('base'),d=M.get('down');
 const Y=b.years||[],y12=Y[Y.length-1]||{stores:G.stores_by_year[G.stores_by_year.length-1]};
 const t0=sd.tranches[0]*sd.amount,area=I.store.area_m2;
 const other=(lean?M.flag&&M.flag.inputs:M.small&&M.small.inputs)||null,oArea=other?other.store.area_m2:null;
 const low=(()=>{try{return window.AB_S6.cashPath(I,d).low}catch(e){return null}})();
 const sc=(I.scenarios||{}).down||{demand:1,cost:1},dd=Math.round((1-sc.demand)*100),dc=Math.round((sc.cost-1)*100);
 const lowTxt=low?T(`${N('g54-low',low.v,'tshM')} in month ${N('g54-lowm',low.i,'int')}`,`${N('g54-low',low.v,'tshM')} mwezi ${N('g54-lowm',low.i,'int')}`):E(T('about −TSh 46M (flagship, downside)','takriban −TSh milioni 46 (duka kuu, hali mbaya)'));
 const html=`<div class="v3b">
  <p>${E(T(`Store 1 is not committed on a projection alone. Before it opens, Afya runs a pre-sale to founding members, each of whom reserves a membership with a refundable deposit. The founders’ rule: if at least ${GATE_N} founding-member deposits are in before opening, store 1 is the flagship; if fewer, the plan falls back to the start-small option (TSh 150M). The deposit amount is still to be set.`,`Duka la 1 haliamuliwi kwa makadirio pekee. Kabla halijafunguliwa, Afya inafanya mauzo ya awali kwa wanachama waanzilishi, kila mmoja akihifadhi uanachama kwa amana inayorejeshwa. Kanuni ya waanzilishi: amana za wanachama waanzilishi angalau ${GATE_N} zikipatikana kabla ya kufungua, duka la 1 ni duka kuu; zikiwa chache zaidi, mpango unarudi kwenye chaguo la kuanza kidogo (TSh 150M). Kiasi cha amana bado kinapangwa.`))}</p>
  <p class="ab-notice">${lean
   ?T(`<b>The option selected is the fallback path.</b> With fewer than ${GATE_N} deposits, store 1 opens as this ${N('g54-area',area,'int')} m² store on a good secondary street, on a seed of ${N('g54-seed',sd.amount,'tshM')}, with ${N('g54-t0',t0,'tshM')} released on signing. ${oArea?`With ${GATE_N} or more, store 1 would be the ${oArea} m² street-front flagship instead.`:''}`,`<b>Chaguo lililochaguliwa ni njia ya kurudi.</b> Amana zikiwa chini ya ${GATE_N}, duka la 1 linafunguliwa kama duka hili la m² ${N('g54-area',area,'int')} kwenye barabara nzuri ya pili, kwa mtaji wa awali wa ${N('g54-seed',sd.amount,'tshM')}, na ${N('g54-t0',t0,'tshM')} zikitolewa wakati wa kusaini. ${oArea?`Zikiwa ${GATE_N} au zaidi, duka la 1 lingekuwa duka kuu la m² ${oArea} la mbele ya barabara badala yake.`:''}`)
   :T(`<b>With ${GATE_N} deposits or more,</b> store 1 is the ${N('g54-area',area,'int')} m² street-front flagship, on a seed of ${N('g54-seed',sd.amount,'tshM')}, with ${N('g54-t0',t0,'tshM')} released on signing. <b>With fewer,</b> store 1 opens as the start-small store${oArea?` of about ${oArea} m² on a good secondary street`:''}, and the round follows the start-small plan.`,`<b>Amana ${GATE_N} au zaidi,</b> duka la 1 ni duka kuu la m² ${N('g54-area',area,'int')} la mbele ya barabara, kwa mtaji wa awali wa ${N('g54-seed',sd.amount,'tshM')}, na ${N('g54-t0',t0,'tshM')} zikitolewa wakati wa kusaini. <b>Zikiwa chache zaidi,</b> duka la 1 linafunguliwa kama duka la kuanza kidogo${oArea?` la takriban m² ${oArea} kwenye barabara nzuri ya pili`:''}, na awamu inafuata mpango wa kuanza kidogo.`)}</p>
  <p>${T(`From store 2 onwards the plan is the same on either path: each new store costs ${N('g54-capex',G.new_store_capex,'tshM')} to build and opens only after its growth gate is met, towards ${N('g54-st',y12.stores,'int')} stores in year 12. The pre-sale gate decides only how store 1 starts.`,`Kuanzia duka la 2 mpango ni uleule kwa njia yoyote: kila duka jipya linagharimu ${N('g54-capex',G.new_store_capex,'tshM')} kujenga na linafunguliwa tu baada ya kigezo chake cha ukuaji kufikiwa, kuelekea maduka ${N('g54-st',y12.stores,'int')} mwaka 12. Kigezo cha mauzo ya awali kinaamua tu jinsi duka la 1 linavyoanza.`)}</p>
  <p>${T(`The named risk behind the gate is the flagship downside case. With demand ${dd}% lower and running costs ${dc}% higher, the lowest bank balance in year 1 in the ${lean?'start-small':'flagship'} option is ${lowTxt}${low&&low.v>=0?', still above zero':''}. The founders hold three answers: more capital, through a founder or investor bridge agreed before signing; a bigger pre-sale, bringing more members and cash in before opening; and cost cuts, marketing first and then hiring delayed.`,`Hatari iliyotajwa nyuma ya kigezo hiki ni hali mbaya ya duka kuu. Mahitaji yakiwa chini kwa ${dd}% na gharama za uendeshaji juu kwa ${dc}%, salio la chini kabisa la benki mwaka 1 katika chaguo la ${lean?'kuanza kidogo':'duka kuu'} ni ${lowTxt}${low&&low.v>=0?', bado juu ya sifuri':''}. Waanzilishi wana majibu matatu: mtaji zaidi, kupitia mkopo wa muda kutoka kwa waanzilishi au mwekezaji uliokubaliwa kabla ya kusaini; mauzo makubwa zaidi ya awali, yakileta wanachama na fedha zaidi kabla ya kufungua; na kupunguza gharama, matangazo kwanza kisha kuchelewesha ajira.`)}</p>
  <p class="ab-mute" style="color:var(--mute);font-size:var(--fs-cap)">${E(T('Financial model v1.2, planning estimates; cash path as in section 6.1.','Modeli ya fedha v1.2, makadirio ya mipango; mtiririko wa fedha kama katika sehemu ya 6.1.'))} <a href="#s6-3">${E(T('The tranches and the gate in section 6.3 →','Awamu na kigezo katika sehemu ya 6.3 →'))}</a></p></div>`;
 return [['The pre-sale gate before store 1','Kigezo cha mauzo ya awali kabla ya duka la 1'],html]}

window.V3MODS=window.V3MODS||{};
const prev=window.V3MODS['s5-4'];
window.V3MODS['s5-4']=function(o){let mods=[];
 if(typeof prev==='function'){try{mods=prev.call(this,o)||[]}catch(e){mods=[]}}
 let m=null;try{m=gateModule()}catch(e){m=null}
 return m?mods.concat([m]):mods};
})();
