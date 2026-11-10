/* Part I check: "Build-your-box prices equal the D4 formula to the shilling for three test baskets."
   The expected values are worked out by hand below, independently of d4.js. Run: node tools/test-d4.js */
const D4=require('../shell/d4.js');
const cases=[
 /* 1. R3 table, mama stage b: shelf 161,770 → 1 m 156,916.9 → 157,000; 6 m 152,063.8 → 152,000; 12 m 147,210.7 → 147,000 */
 {name:'R3 mama stage b',shelf:161770,svc:[],want:{m1:157000,m6:152000,m12:147000}},
 /* 2. Rounding would exceed shelf: shelf 10,100; 1 m 9,797 → 10,000 (≤ 10,100 ok); once: 10,100 → nearest 10,000 */
 {name:'small basket',shelf:10100,svc:[],want:{m1:10000,m6:9500,m12:9000,once:10000}},
 /* 3. With one included service of 40,000 (fee 50,000): shelf 167,798 → 12 m 152,696.2 → 152,500 + 50,000 = 202,500 */
 {name:'R3 mama stage a + midwife visit',shelf:167798,svc:[40000],want:{m12:202500,m1:213000}},
 /* 4. Cap: nearest 500 would round 1,950 up to 2,000 above a 1,950 shelf on the once plan → capped to 1,500 */
 {name:'cap above shelf',shelf:1950,svc:[],want:{once:1500}}
];
let fail=0;
for(const c of cases)for(const [plan,want] of Object.entries(c.want)){const got=D4.price(c.shelf,plan,c.svc).total;
 const ok=got===want;if(!ok)fail++;console.log(`${ok?'PASS':'FAIL'}  ${c.name.padEnd(32)} ${plan.padEnd(5)} want ${want}  got ${got}`)}
/* line cost: 240 nappies a month from packs of 80 at 26,000 = 78,000 */
const lc=D4.lineCost({price_tsh:26000,pack_units:80},240);console.log(`${lc===78000?'PASS':'FAIL'}  line cost 240 from packs of 80 at 26,000 = ${lc}`);if(lc!==78000)fail++;
console.log(fail?`${fail} FAILED`:'all D4 checks pass');process.exit(fail?1:0);
