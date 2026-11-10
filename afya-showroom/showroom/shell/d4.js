/* D4 · the single pricing formula (brief D4, corrected 10 Nov 2026). Used by every package page and Build-your-box.
   Core price  = shelf value of the box goods × (1 − saving by plan 3/6/9%) → nearest 500, never above shelf value
                 (packing and delivery are included, not added)
   Service fee = Σ included partner services at partner price × 1.25, each to the nearest 500
   Price       = Core price + Service fee
   Medicines (kind "medicine") and the luxury item are excluded from shelf value and from the saving. */
(function(root){
'use strict';
const D4={
 SAVING:{m1:0.03,m6:0.06,m12:0.09,once:0},
 PACKING:{S:3500,M:5000,L:6500}, DELIVERY:3500, SERVICE_MARKUP:1.25, ROUND:500,
 r500(n){return Math.round(n/500)*500},
 /* nearest 500, but never above the cap */
 r500cap(n,cap){let v=Math.round(n/500)*500;if(cap!=null&&v>cap)v=Math.floor(cap/500)*500;return v},
 /* monthly cost of one item line with a chosen brand: price × units ÷ pack units (one pack when units unknown) */
 lineCost(brand,units){if(!brand||brand.price_tsh==null)return null;const pu=brand.pack_units||0;return pu&&units?brand.price_tsh*units/pu:brand.price_tsh},
 shelfValue(lines){return lines.reduce((t,l)=>t+(l.cost||0),0)},
 core(shelf,plan){const s=D4.SAVING[plan]==null?D4.SAVING.m1:D4.SAVING[plan];return D4.r500cap(shelf*(1-s),shelf)},
 serviceFee(partnerPrices){return (partnerPrices||[]).reduce((t,p)=>t+D4.r500(p*D4.SERVICE_MARKUP),0)},
 price(shelf,plan,partnerPrices){const c=D4.core(shelf,plan),f=D4.serviceFee(partnerPrices);return {shelf,core:c,service:f,total:c+f,saving:shelf-c}}
};
root.AFYA_D4=D4;
if(typeof module!=='undefined')module.exports=D4;
})(typeof window!=='undefined'?window:globalThis);
