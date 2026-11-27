/* 응용편 제2장 동사 약기법 1~2 (교재 53~59쪽): 기본(현재)형 8개와 어미 붙이기. 개념 id 접두어 vb:.
   동사 기본형 = 가로선·호·사선의 길이(1:2:4)로 정해지고, 어미(~ㅂ니다·~는·~다는·~는 것·~다는 것)는
   그 선의 끝에 붙는 작은 획으로 정한다. 그림은 교재 그림의 모양·위치를 보고 어림해 직접 그린 약식이다(1mm = 3단위).
   「않으면 안된다」는 「안된다」와 같은 모양이라 따로 그리지 않는다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const sv=(inner,w=96,h=56)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});

/* ---------- 기본형 8개: 모양(fam: h 가로선 · a 호 · s 사선), 끝점 E, 끝에서 나가는 방향 t ---------- */
const ST={
 ga:{v:'간다',  fam:'h',d:'M8 28H20',E:[20,28],t:[1,0],w:'가장 짧은 가로선(4mm)'},
 go:{v:'일으킨다',fam:'h',d:'M8 28H32',E:[32,28],t:[1,0],w:'가로선(「가」의 2배, 8mm)'},
 geu:{v:'나간다',fam:'h',d:'M8 28H56',E:[56,28],t:[1,0],w:'긴 가로선(「가」의 4배, 16mm)'},
 na:{v:'지킨다',fam:'a',d:'M8 24Q14 30 20 24',E:[20,24],t:[.7,-.7],w:'작은 호(ᴗ)'},
 no:{v:'된다',  fam:'a',d:'M8 22Q20 32 32 22',E:[32,22],t:[.77,-.64],w:'가운데 크기 호(「나」의 2배)'},
 neu:{v:'모른다',fam:'a',d:'M8 20Q32 36 56 20',E:[56,20],t:[.83,-.55],w:'큰 호(「나」의 4배)'},
 da:{v:'안된다',fam:'s',d:'M10 32L16 18',E:[10,32],t:[-.42,.91],w:'짧은 사선(/)'},
 du:{v:'둔다',  fam:'s',d:'M8 48L22 14',E:[8,48],t:[-.38,.92],w:'긴 사선(/, 「다」의 2배 남짓)'},
 /* 기본형 (2): 그 밖의 12개 */
 ra:{v:'밝힌다',fam:'x',d:'M13 14Q12 24 7 30',E:[7,30],t:[-.5,.85],w:'짧게 비스듬히 휜 곡선(丿)'},
 ro:{v:'나온다',fam:'x',d:'M15 8Q14 28 7 40',E:[7,40],t:[-.5,.85],w:'길게 비스듬히 휜 곡선(「라」의 2배)'},
 ma:{v:'했다',  fam:'x',d:'M8 28Q14 22 20 28',E:[20,28],t:[.7,.7],w:'작은 아치(⌒)'},
 mo:{v:'나아간다',fam:'x',d:'M8 28Q20 18 32 28',E:[32,28],t:[.75,.66],w:'가운데 크기 아치(「마」의 2배)'},
 meu:{v:'믿는다',fam:'x',d:'M8 30Q32 12 56 30',E:[56,30],t:[.8,.6],w:'큰 아치(「마」의 4배)'},
 ba:{v:'바란다',fam:'x',d:'M8 16L12 28Q13.5 32 18 31',E:[18,31],t:[1,0],w:'짧은 내림선(\\) 끝이 오른쪽으로 휜 모양'},
 beo:{v:'버린다',fam:'x',d:'M8 22Q9 31 17 31',E:[17,31],t:[1,0],w:'내려가다 바로 오른쪽으로 꺾이는 작은 곡선'},
 bo:{v:'본다',  fam:'x',d:'M8 14L22 31Q24 33 30 31',E:[30,31],t:[1,0],w:'긴 내림선(\\) 끝이 오른쪽으로 휜 모양'},
 sa:{v:'시킨다',fam:'x',d:'M13 14Q7 20 8 28',E:[8,28],t:[0,1],w:'작은 「(」꼴 곡선'},
 su:{v:'받는다',fam:'x',d:'M18 8Q8 16 9 34',E:[9,34],t:[0,1],w:'긴 「(」꼴 곡선(「사」의 2배)'},
 a:{v:'안다',  fam:'x',d:'M8 24Q11 31 15 28Q17 27 19 23',E:[19,23],t:[.5,-.85],w:'작게 내려갔다 위로 오르는 곡선'},
 o:{v:'온다',  fam:'x',d:'M8 28Q15 36 24 31Q31 27 35 20',E:[35,20],t:[.6,-.8],w:'길게 내려갔다 위로 오르는 곡선(「아」의 2배)'},
 /* 기본형 (3): 마지막 10개 */
 ja:{v:'잡는다',fam:'x',d:'M8 28Q12 23 18 22',E:[18,22],t:[.95,-.3],w:'짧게 오르는 곡선'},
 ju:{v:'준다',  fam:'x',d:'M8 34Q18 20 32 16',E:[32,16],t:[.9,-.4],w:'길게 오르는 곡선(「자」의 2배)'},
 cha:{v:'드린다',fam:'x',d:'M8 28L18 24',E:[18,24],t:[.93,-.37],w:'짧은 오름선(↗)'},
 cho:{v:'오른다',fam:'x',d:'M8 34L42 22',E:[42,22],t:[.94,-.34],w:'긴 오름선(↗, 「차」의 3~4배)'},
 ka:{v:'아니다',fam:'x',d:'M9 16Q13 22 9 28',E:[9,28],t:[-.4,.9],w:'짧은 「)」꼴 곡선(세워 쓴 것)'},
 ko:{v:'판다',  fam:'x',d:'M9 10Q17 22 9 36',E:[9,36],t:[-.4,.9],w:'긴 「)」꼴 곡선(「카」의 2배 남짓)'},
 pa:{v:'없다',  fam:'x',d:'M13 14Q6 22 13 30',E:[13,30],t:[.4,.9],w:'짧은 「(」꼴 곡선(세워 쓴 것)'},
 po:{v:'아니하',fam:'x',d:'M13 8Q4 22 13 38',E:[13,38],t:[.4,.9],w:'긴 「(」꼴 곡선(「파」의 2배 남짓)'},
 ha:{v:'한다',  fam:'x',d:'M8 20L16 30',E:[16,30],t:[.62,.78],w:'짧은 내림선(\\)'},
 i:{v:'있다',   fam:'x',d:'M10 14V30',E:[10,30],t:[0,1],w:'짧은 세로선(|)'}
};
const SK=['ga','go','geu','na','no','neu','da','du'];
const HK=['ra','ro','ma','mo','meu','ba','beo','bo','sa','su','a','o'];
const KK=['ja','ju','cha','cho','ka','ko','pa','po','ha','i'];
const ALL=SK.concat(HK).concat(KK);
const SYL={ja:'자',ju:'주',cha:'차',cho:'초',ka:'카',ko:'코',pa:'파',po:'포',ha:'하',i:'이',ga:'가',go:'고',geu:'그',na:'나',no:'노',neu:'느',da:'다',du:'두',ra:'라',ro:'로',ma:'마',mo:'모',meu:'므',ba:'바',beo:'버',bo:'보',sa:'사',su:'수',a:'아',o:'오'};
/* 「~가지고」 앞의 말 */
const GJ={ga:'가',go:'일으켜',geu:'나가',na:'지켜',no:'되어',neu:'몰라',da:'안되어',du:'두어',ra:'밝혀',ro:'나와',mo:'나아가',meu:'믿어',ba:'바라',beo:'버려',bo:'보아',sa:'시켜',su:'받아',a:'알아',o:'와'};
/* 어미 변화 글(기본형 → ㅂ니다형, 는형, 다는형, 는 것) */
const FORM={ga:['갑니다','가는','간다는','가는 것'],go:['일으킵니다','일으키는','일으킨다는','일으키는 것'],geu:['나갑니다','나가는','나간다는','나가는 것'],
 na:['지킵니다','지키는','지킨다는','지키는 것'],no:['됩니다','되는','된다는','되는 것'],neu:['모릅니다','모르는','모른다는','모르는 것'],
 da:['안됩니다','안되는','안된다는','안되는 것'],du:['둡니다','두는','둔다는','두는 것']};
const EN={
 base:{n:'기본형',w:'어미 없이 선만 씀'},
 mn:{n:'~ㅂ니다',w:'끝에 갈고리(ㅂ니다)'},
 nn:{n:'~는',w:'끝에 작은 고리(○)'},
 dn:{n:'~다는',w:'끝을 가로지르는 짧은 획(+)'},
 ge:{n:'~는 것이다',w:'끝에 고리와 짧은 꼬리(「e」꼴)'},
 gm:{n:'~는 것입니다',w:'끝에 고리와 길게 늘어진 꼬리'},
 dg:{n:'~다는 것이다',w:'끝을 가로지르는 길쭉한 획'},
 dm:{n:'~다는 것입니다',w:'끝을 가로지르는 아주 긴 획(아래로 길게 내려감)'},
 gi:{n:'~기 전에',w:'끝에서 아래로 8mm 내려와 끝이 말려 올라가는 갈고리(「이」 8mm)'},
 gd:{n:'~기 전에도',w:'~기 전에 갈고리에 작은 고리가 하나 더 있음'},
 do:{n:'~도',w:'끝에 붙은 짧은 꼬리(,)'},
 tj:{n:'~든지',w:'끝 아래쪽에 작은 「V」'},
 tg:{n:'~든가',w:'끝 아래쪽에 작은 「<」'},
 dj:{n:'~다든지',w:'끝 오른쪽에 작은 「V」'},
 dk:{n:'~다든가',w:'끝 오른쪽에 작은 「<」'},
 gj:{n:'~가지고',w:'끝에 「ㄴ」꼴 짧은 갈고리(내려갔다 오른쪽으로 꺾음)'}
};
const text=(s,e)=>{if(e==='gj')return GJ[s]+' 가지고';if(e==='base')return ST[s].v;const F=FORM[s];
 const st=F[1].replace(/는$/,'');
 if(e==='gi')return st+'기 전에';if(e==='gd')return st+'기 전에도';if(e==='do')return GJ[s]+'도';
 if(e==='tj')return st+'든지';if(e==='tg')return st+'든가';if(e==='dj')return ST[s].v+'든지';if(e==='dk')return ST[s].v+'든가';return {base:ST[s].v,mn:F[0],nn:F[1],dn:F[2],ge:F[3]+'이다',gm:F[3]+'입니다',dg:F[2]+' 것이다',dm:F[2]+' 것입니다'}[e]};
const P=(x,y)=>f1(x)+' '+f1(y);
/* 끝 장식 */
function deco(s,e){
 if(e==='base')return '';
 const S0=ST[s],[x1,y1]=S0.E;
 if(e==='gi'||e==='gd'){const jx=x1+.5,top=y1,bot=y1+22;return `<path d="M${P(jx,top)}L${P(jx,bot)}Q${P(jx,bot+6)} ${P(jx-5,bot+2)}"/>`+(e==='gd'?`<circle cx="${f1(jx-1)}" cy="${f1(bot-4)}" r="1.9"/>`:'')}
 if(e==='do'){return S0.fam==='s'?`<path d="M${P(x1-.5,y1+3)}L${P(x1+1.8,y1+6.5)}"/>`:`<path d="M${P(x1+2.5,y1+1.8)}L${P(x1+5.8,y1-2)}"/>`}
 if(e==='tj'||e==='dj'||e==='tg'||e==='dk'){const afterE=e==='dj'||e==='dk',cx=afterE?x1+5:x1-.5,cy=afterE?y1+2:y1+7;return e==='tj'||e==='dj'?`<path d="M${P(cx-3,cy-4)}L${P(cx,cy)}L${P(cx+3,cy-4)}"/>`:`<path d="M${P(cx+3,cy-3)}L${P(cx-1,cy)}L${P(cx+3,cy+3)}"/>`}
 if(e==='gj'){const [x0,y0]=ST[s].E;return `<path d="M${P(x0+1.5,y0-1)}L${P(x0+1.5,y0+6)}L${P(x0+9,y0+6)}"/>`}
 const S=ST[s],[x,y]=S.E,[tx,ty]=S.t,nx=-ty,ny=tx;   /* n = t를 시계 방향으로 90° */
 const circ=(cx,cy,r)=>`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}"/>`;
 if(e==='mn'){
  if(S.fam==='h')return `<path d="M${P(x,y)}L${P(x-3.2,y+3.6)}"/>`;
  if(S.fam==='a')return `<path d="M${P(x,y)}C${P(x+3.5,y-2)} ${P(x+3.5,y-7)} ${P(x+.5,y-6.5)}"/>`;
  return `<path d="M${P(x,y)}L${P(x-3.6,y-3.4)}"/>`;
 }
 if(e==='nn')return circ(x+tx*2.1,y+ty*2.1,2.1);
 if(e==='ge'||e==='gm'){
  const cx=x+tx*2.1,cy=y+ty*2.1,ex=cx+tx*2.1,ey=cy+ty*2.1,m=S.fam==='s'?-1:1;
  const tail=S.fam==='s'
   ?(e==='ge'?`M${P(ex,ey)}L${P(ex-3.4,ey+1.2)}`:`M${P(ex,ey)}C${P(ex-1,ey+3)} ${P(ex-3,ey+5.5)} ${P(ex-2,ey+9)}`)
   :(e==='ge'?`M${P(ex,ey)}L${P(ex+2.6,ey-3.4)}`:`M${P(ex,ey)}C${P(ex+3,ey-1)} ${P(ex+5.5,ey+3)} ${P(ex+9,ey+2)}`);
  return circ(cx,cy,2.1)+`<path d="${tail}"/>`;
 }
 /* 다는 / 다는 것이다 / 다는 것입니다: 끝을 가로지르는 획(길이로 구별) */
 let cx=x,cy=y;
 if(S.fam==='s'){const m=S.d.match(/L([\d.]+) ([\d.]+)/);cx=x+(m[1]-x)*.28;cy=y+(m[2]-y)*.28}
 else if(S.fam==='h')cx=x-1;
 let ux=nx-.35*tx,uy=ny-.35*ty;const ul=Math.hypot(ux,uy);ux/=ul;uy/=ul;
 const [lo,hi]=e==='dn'?[-4,4]:e==='dg'?[-7,7]:[-3,13];
 return `<path d="M${P(cx+ux*lo,cy+uy*lo)}L${P(cx+ux*hi,cy+uy*hi)}"/>`;
}
const shape=(s,e)=>sv(`<path d="${ST[s].d}"/>`+deco(s,e),96,e==='gi'||e==='gd'?84:56);
const stemShape=s=>sv(`<path d="${ST[s].d}"/>`);
const LSHAPE=sv('<path d="M18 20V30H28"/>',48,48);
const whyS=s=>`${ST[s].v}: ${ST[s].w}이므로 「${ST[s].v}」입니다. (${SYL[s]})`;
const whySE=(s,e)=>`${text(s,e)}: ${ST[s].w}(${ST[s].v})에 ${EN[e].w}이 붙어 있으므로 ${text(s,e)}입니다.`;

/* ---------- 개념 ---------- */
const ES={m:['base','mn'],n:['base','mn','nn'],d:['base','mn','nn','dn'],g:['base','mn','nn','dn','ge','gm'],dg:['base','mn','nn','dn','ge','gm','dg','dm']};
ES.gi=['base','gi','gd'];ES.do=['base','do'];ES.tj=['base','tj','tg'];ES.dj=['base','tj','tg','dj','dk'];
const NEW={gi:['gi','gd'],do:['do'],tj:['tj','tg'],dj:['dj','dk'],m:['mn'],n:['nn'],d:['dn'],g:['ge','gm'],dg:['dg','dm']};
const SPOOL={b1:['ga','go','geu'],b2:['ga','go','geu','na','no','neu'],b3:SK};
const BNEW={b1:['ga','go','geu'],b2:['na','no','neu'],b3:['da','du']};
const KC=['vb:b1','vb:b2','vb:b3','vb:m','vb:n','vb:d','vb:g','vb:dg','vb:h1','vb:h2','vb:h3','vb:gj','vb:k1','vb:k2','vb:gi','vb:do','vb:tj','vb:dj'];
const HG={h1:['ra','ro','ma','mo','meu'],h2:['ba','beo','bo'],h3:['sa','su','a','o'],k1:['ja','ju','cha','cho'],k2:['ka','ko','pa','po','ha','i']};
const STC={};[['b1',BNEW.b1],['b2',BNEW.b2],['b3',BNEW.b3],['h1',HG.h1],['h2',HG.h2],['h3',HG.h3],['k1',HG.k1],['k2',HG.k2]].forEach(([c,a])=>a.forEach(x=>STC[x]=c));
const STK={b1:['vb:b1'],b2:['vb:b1','vb:b2'],b3:['vb:b1','vb:b2','vb:b3'],h1:['vb:h1'],h2:['vb:h1','vb:h2'],h3:['vb:h1','vb:h2','vb:h3'],k1:['vb:k1'],k2:['vb:k1','vb:k2']};
/* 기본형 문제의 보기 후보: 그 개념까지 배운 기본형 (위 8개 또는 12개 + 8개) */
const poolOfStem=k=>{const c=STC[k];if(c[0]==='b')return SPOOL[c];return c==='h1'?HG.h1:c==='h2'?HG.h1.concat(HG.h2):c==='h3'?HK:c==='k1'?HK.concat(HG.k1):ALL};
const GJS=SK.concat(HK).filter(x=>x!=='ma');
const ckey=c=>'vb:'+c;
const kcsOf=k=>{if(k.startsWith('gj'))return ['vb:gj'];const c=k.split('|')[0],ord=['m','n','d','g','dg'];
 if(ord.includes(c))return [...KC.slice(0,3),...ord.slice(0,ord.indexOf(c)+1).map(ckey)];
 return [...KC.slice(0,3),ckey(c)]};
/* 오답: 같은 어미 다른 기본형 / 같은 기본형 다른 어미를 섞는다 */
function choices(c,s,e){
 const sp=SK,es=ES[c];
 const same=es.filter(x=>x!==e).map(x=>[s,x]),other=sp.filter(x=>x!==s).map(x=>[x,e]);
 const mix=shuf(same).slice(0,2).concat(shuf(other).slice(0,2));
 const pool=[...new Map(mix.map(a=>[a.join('.'),a])).values()].slice(0,3);
 while(pool.length<3){const r=[sp[Math.random()*sp.length|0],es[Math.random()*es.length|0]];if(!(r[0]===s&&r[1]===e)&&!pool.some(a=>a[0]===r[0]&&a[1]===r[1]))pool.push(r)}
 return shuf([[s,e],...pool]);
}
/* ~가지고 보기: 기본형만(어미 빠짐) 1 + 다른 말 + 가지고 2 */
function gjOpts(k){const oth=shuf(GJS.filter(x=>x!==k)).slice(0,2).map(x=>[x,'gj']);return [[k,'gj'],[k,'base'],...oth]}
const combosOf=c=>NEW[c].flatMap(e=>SK.map(s=>c+'|'+s+'.'+e));

const F={
 name:'응용편 (동사 기본형·어미)',
 curr:KC,
 info:[],
 names:{'vb:b1':'동사 기본형: 가·고·그 (가로선 1:2:4)','vb:b2':'동사 기본형: 나·노·느 (호 1:2:4)','vb:b3':'동사 기본형: 다·두 (사선)','vb:m':'동사 + ~ㅂ니다','vb:n':'동사 + ~는','vb:d':'동사 + ~다는','vb:g':'동사 + ~는 것이다·~는 것입니다','vb:dg':'동사 + ~다는 것이다·~다는 것입니다','vb:h1':'동사 기본형: 라·로 · 마·모·므','vb:h2':'동사 기본형: 바·버·보','vb:h3':'동사 기본형: 사·수 · 아·오','vb:gj':'동사 + ~가지고','vb:k1':'동사 기본형: 자·주·차·초','vb:k2':'동사 기본형: 카·코·파·포·하·이','vb:gi':'동사 + ~기 전에','vb:do':'동사 + ~도','vb:tj':'동사 + ~든지·~든가','vb:dj':'동사 + ~다든지·~다든가'},
 intro:{
  'vb:b1':()=>({prompt:row(BNEW.b1.map(s=>lab(stemShape(s),ST[s].v+' = '+({ga:'가',go:'고',geu:'그'})[s]))),
   text:'<b>동사 약기법: 기본(현재)형</b><br>동사 약기법은 동방속기의 꽃입니다. 어렵게 따지지 말고 <b>기본형을 완전히 외우는 것</b>이 출발점입니다.<br>가로선의 길이로 정합니다: 간다 = 4mm 선(가) · 일으킨다 = 8mm 선(고) · 나간다 = 16mm 선(그). 길이는 1:2:4입니다.<br>앞문자 끝에서 하선(아래쪽)으로 4mm 가량 띄어 씁니다.'}),
  'vb:b2':()=>({prompt:row(BNEW.b2.map(s=>lab(stemShape(s),ST[s].v+' = '+({na:'나',no:'노',neu:'느'})[s]))),
   text:'<b>호로 쓰는 기본형</b><br>지킨다 = 작은 호(나) · 된다 = 가운데 호(노) · 모른다 = 큰 호(느). 호도 길이가 1:2:4입니다.<br>간다 = 가다, 된다 = 되다처럼 입으로는 줄여 읽는 것도 같은 모양입니다.'}),
  'vb:b3':()=>({prompt:row(BNEW.b3.map(s=>lab(stemShape(s),ST[s].v+' = '+({da:'다',du:'두'})[s]))),
   text:'<b>사선으로 쓰는 기본형</b><br>안된다 = 짧은 사선(다) · 둔다 = 긴 사선(두).<br>「않으면 안된다」도 「안된다」와 같은 짧은 사선 하나로 씁니다. 연습: 간다→가! 일으킨다→고! 나간다→그! 지킨다→나! 된다→노! 모른다→느! 안된다→다! 둔다→두!'}),
  'vb:m':()=>({prompt:row(['ga','na','da'].map(s=>lab(shape(s,'mn'),text(s,'mn')))),
   text:'<b>동사 + ~ㅂ니다</b><br>기본형 끝에 짧은 갈고리를 붙입니다. 가로선은 끝에서 아래로 짧게 꺾고, 호는 끝에서 위로 말아 올리고, 사선은 아래쪽 끝에 짧게 꺾습니다.<br>간다 → 갑니다 · 지킨다 → 지킵니다 · 안된다 → 안됩니다. 새로 배우는 것이 아니라 아는 말에 자연스럽게 응용하는 것입니다.'}),
  'vb:n':()=>({prompt:row(['ga','na','du'].map(s=>lab(shape(s,'nn'),text(s,'nn')))),
   text:'<b>동사 + ~는</b><br>기본형 끝에 작은 고리(○)를 붙이면 「~는」입니다.<br>간다 → 가는 · 지킨다 → 지키는 · 둔다 → 두는.'}),
  'vb:d':()=>({prompt:row(['ga','no','da'].map(s=>lab(shape(s,'dn'),text(s,'dn')))),
   text:'<b>동사 + ~다는</b><br>기본형의 끝을 짧은 획으로 가로지르면 「~다는」(= 는다는)입니다.<br>간다 → 간다는 · 된다 → 된다는 · 안된다 → 안된다는.'}),
  'vb:g':()=>({prompt:row(['ga','ga','na','na'].map((s,i)=>{const e=i%2?'gm':'ge';return lab(shape(s,e),text(s,e))})),
   text:'<b>동사 + ~는 것이다 · ~는 것입니다</b><br>끝에 고리를 쓰고 위로 짧은 꼬리를 달면 「~는 것(이다)」, 꼬리를 길게 늘어뜨리면 「~는 것입니다」입니다.<br>가는 것이다 · 가는 것입니다 · 지키는 것이다 · 지키는 것입니다.<br><small>뒤에 조사가 붙을 때(~는 것이/은/을/에서…)는 고리 안·옆의 작은 꼴이 바뀝니다. 교재 56~57쪽을 보세요.</small>'}),
  'vb:dg':()=>({prompt:row(['ga','ga','no','no'].map((s,i)=>{const e=i%2?'dm':'dg';return lab(shape(s,e),text(s,e))})),
   text:'<b>동사 + ~다는 것이다 · ~다는 것입니다</b><br>「~다는」을 긋는 가로지르는 획을 길쭉하게 하면 「~다는 것이다」, 아래로 더 길게 내리면 「~다는 것입니다」입니다.<br>간다는 것이다 · 간다는 것입니다 · 된다는 것이다 · 된다는 것입니다.<br><small>「~다는 점」, 「~다는 것에서」 등 뒤에 붙는 말은 교재 58~59쪽을 보세요.</small>'})
,
  'vb:h1':()=>({prompt:row(HG.h1.map(s=>lab(stemShape(s),ST[s].v+' = '+SYL[s]))),
   text:'<b>기본형 (2): 라·로, 마·모·므</b><br>동사 기본형은 모두 30개이고, 앞에서 8개를 배웠습니다. 이어서 12개입니다. 「철저히 암기하라!」<br>밝힌다 = 짧은 「)」(라) · 나온다 = 긴 「)」(로) · 했다 = 작은 아치(마) · 나아간다 = 가운데 아치(모) · 믿(는)다 = 큰 아치(므). 짧은 것 : 긴 것 = 1:2, 아치는 1:2:4입니다.'}),
  'vb:h2':()=>({prompt:row(HG.h2.map(s=>lab(stemShape(s),ST[s].v+' = '+SYL[s]))),
   text:'<b>기본형 (2): 바·버·보</b><br>바란다 = 짧은 내림선이 끝에서 오른쪽으로 휨(바) · 버린다 = 내려가다 바로 오른쪽으로 꺾임(버) · 본다 = 긴 내림선이 끝에서 오른쪽으로 휨(보).<br>그림은 교재 모양을 보고 어림한 약식이니 교재 62쪽도 함께 보세요.'}),
  'vb:h3':()=>({prompt:row(HG.h3.map(s=>lab(stemShape(s),ST[s].v+' = '+SYL[s]))),
   text:'<b>기본형 (2): 사·수, 아·오</b><br>시킨다 = 작은 「(」(사) · 받(는)다 = 긴 「(」(수) · 안다 = 작게 내려갔다 오르는 곡선(아) · 온다 = 길게 내려갔다 오르는 곡선(오).<br>짧은 것 : 긴 것 = 1:2입니다.'}),
  'vb:gj':()=>({prompt:row([lab(LSHAPE,'가지고')].concat(['ga','ro','bo'].map(s=>lab(shape(s,'gj'),text(s,'gj'))))),
   text:'<b>동사 + ~가지고</b><br>「가지고」는 짧은 「ㄴ」꼴 갈고리입니다. 앞말의 기본형 끝에 붙입니다. 앞말은 「~아/어」 꼴로 바뀐 말입니다.<br>간다 → 가 가지고 · 나온다 → 나와 가지고 · 본다 → 보아 가지고 · 지킨다 → 지켜 가지고.<br><small>「해 가지고」「그래 가지고」 등 특별한 꼴은 교재 62쪽을 보세요. 「되어/돼」, 「보아/봐」처럼 소리로 가르기 어려운 것은 같이 봅니다.</small>'})
,
  'vb:k1':()=>({prompt:row(HG.k1.map(s=>lab(stemShape(s),ST[s].v+' = '+SYL[s]))),
   text:'<b>기본형 (3): 자·주·차·초 (마지막 10개 중)</b><br>이것으로 30개를 모두 배웁니다. 「철저히 암기하라! 많아야 30개이다.」<br>잡(는)다 = 짧게 오르는 곡선(자) · 준다 = 긴 오르는 곡선(주) · 드린다·들이다 = 짧은 오름선(차) · 오른다 = 긴 오름선(초).'}),
  'vb:k2':()=>({prompt:row(HG.k2.map(s=>lab(stemShape(s),ST[s].v+' = '+SYL[s]))),
   text:'<b>기본형 (3): 카·코·파·포·하·이</b><br>아니다·않(는)다 = 짧은 「)」(카) · 판다 = 긴 「)」(코) · 없다 = 짧은 「(」(파) · 아니(하) = 긴 「(」(포) · 한다 = 짧은 내림선(하) · 있다 = 짧은 세로선(이).<br>「라·로」의 「)」는 비스듬히, 「카·코」의 「)」는 세워서 씁니다. 「사·수」의 「(」는 비스듬히, 「파·포」의 「(」는 세워서 씁니다.'}),
  'vb:gi':()=>({prompt:row(['ga','na','da'].flatMap(s=>[lab(shape(s,'gi'),text(s,'gi'))]).concat([lab(shape('ga','gd'),text('ga','gd'))])),
   text:'<b>동사 + ~기 전에</b><br>기본형 끝에서 아래로 8mm(「이」) 내려와 끝을 말아 올리면 「~기 전에」입니다. 끝에서 길이가 4mm인 「가」의 2배입니다.<br>갈고리에 작은 고리를 하나 더 달면 「~기 전에도」입니다.<br>가기 전에 · 지키기 전에 · 안되기 전에 · 가기 전에도.<br><small>「가기도 전에」처럼 「도」가 가운데 들어가는 꼴은 교재 67~68쪽을 보세요.</small>'}),
  'vb:do':()=>({prompt:row(['ga','na','da'].map(s=>lab(shape(s,'do'),text(s,'do')))),
   text:'<b>동사 + ~도 (~아도, ~어도)</b><br>기본형의 끝에 짧은 꼬리(,)를 붙이면 「~도」입니다. 앞말은 「~아/~어」로 바뀐 말입니다.<br>가도 · 지켜도 · 안되어도.<br><small>~게(보게, 드리게), ~게끔(하게끔), ~서(가서, 나와서), ~(으)므로(시키므로), ~(으)로써(밝힘으로써)는 모양이 복잡해 교재 68~69쪽을 보세요.</small>'}),
  'vb:tj':()=>({prompt:row(['ga','na','ga','na'].map((s,i)=>{const e=i<2?'tj':'tg';return lab(shape(s,e),text(s,e))})),
   text:'<b>동사 + ~든지 · ~든가</b><br>기본형 끝 아래쪽에 작은 「V」를 붙이면 「~든지」, 작은 「<」를 붙이면 「~든가」입니다(「가든지」「가든가」).<br>가든지 · 지키든지 · 가든가 · 지키든가.'}),
  'vb:dj':()=>({prompt:row(['ga','no','ga','no'].map((s,i)=>{const e=i<2?'dj':'dk';return lab(shape(s,e),text(s,e))})),
   text:'<b>동사 + ~다든지 · ~다든가</b><br>「~다든지」는 기본형 끝의 오른쪽에 작은 「V」, 「~다든가」는 작은 「<」를 붙입니다(「간다든지」「간다든가」). 「~든지」는 끝의 아래쪽, 「~다든지」는 끝의 오른쪽에 붙는 것으로 구별합니다.<br>간다든지 · 된다든지 · 간다든가 · 된다든가.'})
 },
 questions:{
  'vb:k1':()=>HG.k1.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:k2':()=>HG.k2.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:gi':()=>shuf(combosOf('gi')).slice(0,12).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:do':()=>shuf(combosOf('do')).slice(0,8).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:tj':()=>shuf(combosOf('tj')).slice(0,12).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:dj':()=>shuf(combosOf('dj')).slice(0,12).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:h1':()=>HG.h1.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:h2':()=>HG.h2.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:h3':()=>HG.h3.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:gj':()=>shuf(GJS).slice(0,10).map((s,i)=>(i%2?'vbF:':'vbE:')+s),
  'vb:b1':()=>SPOOL.b1.flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:b2':()=>SPOOL.b2.slice(3).flatMap(s=>['vbA:'+s,'vbB:'+s]),
  'vb:b3':()=>['da','du'].flatMap(s=>['vbA:'+s,'vbB:'+s]).concat(shuf(SPOOL.b2).slice(0,3).flatMap(s=>['vbA:'+s,'vbB:'+s])),
  'vb:m':()=>shuf(combosOf('m')).slice(0,10).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:n':()=>shuf(combosOf('n')).slice(0,10).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:d':()=>shuf(combosOf('d')).slice(0,10).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:g':()=>shuf(combosOf('g')).slice(0,12).map((k,i)=>(i%2?'vbD:':'vbC:')+k),
  'vb:dg':()=>shuf(combosOf('dg')).slice(0,12).map((k,i)=>(i%2?'vbD:':'vbC:')+k)
 },
 types:{
  /* 기본형 모양 → 동사 */
  vbA:{kcs:k=>STK[STC[k]],ids:()=>ALL.map(s=>'vbA:'+s),build:(k,id)=>{
    const pool=poolOfStem(k);
    const o=shuf([k,...shuf(pool.filter(x=>x!==k)).slice(0,3)]);
    return {id,prompt:stemShape(k),q:'이 모양은 어느 동사의 기본형일까요?',one:true,opts:o.map(x=>opt(x,ST[x].v)),ans:k,why:whyS(k)}}},
  /* 동사 → 기본형 모양 */
  vbB:{kcs:k=>STK[STC[k]],ids:()=>ALL.map(s=>'vbB:'+s),build:(k,id)=>{
    const pool=poolOfStem(k);
    const o=shuf([k,...shuf(pool.filter(x=>x!==k)).slice(0,3)]);
    return {id,prompt:`<span class="big" style="font-size:28px">${ST[k].v}</span>`,q:'어떤 모양으로 쓸까요?',opts:o.map(x=>opt(x,stemShape(x))),ans:k,why:whyS(k)}}},
  /* 어미 붙인 모양 → 말 */
  vbC:{kcs:k=>kcsOf(k),ids:()=>Object.keys(ES).flatMap(c=>combosOf(c).map(k=>'vbC:'+k)),build:(k,id)=>{
    const [c,se]=k.split('|'),[s,e]=se.split('.');
    return {id,prompt:shape(s,e),q:'이 약기는 어떤 말일까요?',one:true,opts:choices(c,s,e).map(([a,b])=>opt(a+'.'+b,text(a,b))),ans:s+'.'+e,why:whySE(s,e)}}},
  /* 말 → 어미 붙인 모양 */
  vbD:{kcs:k=>kcsOf(k),ids:()=>Object.keys(ES).flatMap(c=>combosOf(c).map(k=>'vbD:'+k)),build:(k,id)=>{
    const [c,se]=k.split('|'),[s,e]=se.split('.');
    return {id,prompt:`<span class="big" style="font-size:28px">${text(s,e)}</span>`,q:'어떤 약기로 쓸까요?',opts:choices(c,s,e).map(([a,b])=>opt(a+'.'+b,shape(a,b))),ans:s+'.'+e,why:whySE(s,e)}}},
  /* ~가지고: 모양 → 말, 말 → 모양 */
  vbE:{kcs:()=>['vb:gj'],ids:()=>GJS.map(s=>'vbE:'+s),build:(k,id)=>{
    const o=gjOpts(k);return {id,prompt:shape(k,'gj'),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf(o.map(([a,b])=>opt(a+'.'+b,text(a,b)))),ans:k+'.gj',why:whySE(k,'gj')}}},
  vbF:{kcs:()=>['vb:gj'],ids:()=>GJS.map(s=>'vbF:'+s),build:(k,id)=>{
    const o=gjOpts(k);return {id,prompt:`<span class="big" style="font-size:28px">${text(k,'gj')}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(o.map(([a,b])=>opt(a+'.'+b,shape(a,b)))),ans:k+'.gj',why:whySE(k,'gj')}}}
 },
 section:{title:'응용편 (제2장 동사 약기법 53~73쪽 · 기본형 30개와 어미)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
