/* 응용편 제3장 상선 응용 약기법 (교재 169~234쪽): 상선약자(2)~(6), 「~ㄹ 수 있다/없다」, 「~었을 것이다」.
   개념 id 접두어 q3:. 그림은 교재 그림을 보고 모양·위치를 어림해 직접 그린 약식이다(1mm = 3단위).
   상선약자는 앞문자 끝에서 차줄로 4mm 올린 자리에 한 획으로 쓴다. 모양이 서로 확실히 구별되는 것만 골랐고,
   비슷한 것(전국·전국적, 특별히·특히·특수, 최대·최선 등)과 손글씨 연습 문장은 문제로 만들지 않았다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const sv=(inner,w=100,h=60)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});
const big=t=>`<span class="big" style="font-size:28px">${t}</span>`;
const P=d=>`<path d="${d}"/>`;
const DOT=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.5" fill="var(--stroke)" stroke="none"/>`;
const PREV='<path d="M6 44H38"/>';
const OR=[38+12*Math.cos(Math.PI/6),44-12*Math.sin(Math.PI/6)];
/* 상선 자리(앞문자 끝에서 차줄 4mm)에 글쇠 그리기: d는 글쇠 좌표계(왼쪽 위 기준) */
const gShape=g=>sv(PREV+`<g transform="translate(${f1(OR[0])},${f1(OR[1]-8)})">${g.d}</g>`,100,60);

/* 상선약자 모음: 개념 id → {글쇠 id: {n, d, w}} */
const SET={
 s2:{ // 교재 169쪽 상선약자(2)
  dodae:{n:'도대체',d:P('M8 0L3 12')+'<circle cx="2" cy="14" r="2"/>',w:'가파른 사선(/) 아래 끝에 작은 고리'},
  gaunde:{n:'가운데',d:P('M0 2H10')+P('M7 -1C11 -3 13 3 8 3L3 14'),w:'짧은 가로선 끝에서 아래로 내려오며 위에 작은 고리'},
  gutae:{n:'구태여',d:P('M0 3H14Q16 3 15 8'),w:'가로선 끝이 아래로 말리는 선'},
  saram:{n:'사람',d:P('M8 0Q1 3 0 11'),w:'왼쪽 위로 휘어 올라가는 짧은 호'},
  ibeon:{n:'이번',d:P('M0 0V9Q2 13 10 12'),w:'세로로 내려와 오른쪽으로 둥글게 꺾이는 선'},
  deouk:{n:'더욱이',d:P('M7 0L2 14')+P('M0 6L8 6'),w:'가파른 사선을 짧은 가로선이 가르는 모양'},
  naega:{n:'내가',d:P('M0 8Q4 12 8 7Q11 3 15 8'),w:'골짜기(⌣) 뒤에 산(⌒)이 이어지는 물결'},
  jega:{n:'제가',d:P('M0 12Q6 2 12 4Q14 5 15 8'),w:'왼쪽 아래에서 위로 휘어 올라가 끝이 꺾이는 호'}
 },
 s3:{ // 183쪽 상선약자(3)
  gyegi:{n:'계기',d:P('M16 4H4Q0 4 1 8'),w:'가로선 왼쪽 끝이 아래로 말리는 선'},
  daechaek:{n:'대책',d:P('M0 12L8 2Q12 0 11 5'),w:'위로 뻗는 사선 끝이 오른쪽으로 꺾이는 갈고리'},
  dongsi:{n:'동시',d:P('M6 6C6 1 0 1 1 5C2 8 6 7 6 6L2 17'),w:'위에 작은 고리, 아래로 왼쪽으로 내려가는 선(9 꼴)'},
  munje:{n:'문제',d:P('M0 6Q8 -1 16 6'),w:'위로 볼록한 호(⌒)'},
  jeongchi:{n:'정치',d:P('M14 2Q4 0 1 8'),w:'오른쪽 위에서 왼쪽 아래로 휘는 c 꼴 호'},
  beoban:{n:'법안',d:P('M0 0Q0 6 6 9'),w:'세로로 시작해 오른쪽 아래로 둥글게 꺾이는 짧은 호'},
  chamga:{n:'참가',d:P('M0 8L8 3H16'),w:'오른쪽 위로 올라가다 수평으로 꺾이는 선'},
  choecho:{n:'최초',d:P('M0 10L16 3')+'<circle cx="7.5" cy="6.2" r="1.7"/>',w:'사선 가운데에 작은 고리'},
  choejeo:{n:'최저',d:P('M0 11L9 6')+P('M9 6C5 4 5 10 10 9C13 8 15 3 17 2'),w:'사선 끝에서 작은 고리를 지나 위로 올라가는 선'},
  hyeongmyeong:{n:'혁명',d:P('M0 1L7 9Q11 3 16 7'),w:'아래로 꺾였다가 완만하게 올라가는 V 꼴'}
 },
 s4:{ // 194쪽 상선약자(4)
  nugu:{n:'누구',d:P('M0 2Q8 12 16 3'),w:'작은 ⌣ 모양 호'},
  nugunaga:{n:'누구나가',d:P('M0 2Q8 12 16 3')+P('M6 3L11 6'),w:'⌣ 호 안쪽에 작은 사선'},
  nugunga:{n:'누군가',d:P('M0 2Q5 10 11 5H20'),w:'⌣ 호 끝에서 오른쪽으로 평평하게 뻗는 선'},
  nugubo:{n:'누구보다',d:P('M0 3Q6 9 12 4Q16 3 18 8Q22 14 28 14'),w:'⌣ 호 뒤에 오른쪽 아래로 길게 휘어 내려가는 선'},
  neomu:{n:'너무',d:P('M5 0C0 2 2 8 7 6L14 2'),w:'작은 고리에서 시작해 오른쪽 위로 올라가는 선'},
  majimak:{n:'마지막',d:P('M0 6Q6 0 12 5'),w:'아주 작은 위로 볼록한 호(⌒)'},
  budeugi:{n:'부득이',d:P('M0 0Q2 12 14 14'),w:'위에서 아래로 내려오다 오른쪽으로 휘는 큰 호'},
  ajik:{n:'아직',d:P('M14 1Q8 5 2 6')+P('M2 6L5 3'),w:'오른쪽 위에서 왼쪽 아래로 내려오며 끝에 작은 갈고리'},
  imi:{n:'이미',d:P('M4 4V16')+'<circle cx="4" cy="2" r="2"/>',w:'세로선 위에 작은 원이 얹힌 모양'},
  jagi:{n:'자기',d:P('M0 8L4 4Q7 2 11 2'),w:'왼쪽 아래에서 오른쪽 위로 올라가며 끝이 꺾이는 짧은 선'},
  jasin:{n:'자신',d:P('M10 2C4 2 0 6 5 7C10 8 10 12 3 12'),w:'두 번 말려 8자에 가까운 선'},
  igeot:{n:'이것',d:P('M2 0V12'),w:'짧은 세로선(|) 하나'},
  museun:{n:'무슨',d:P('M2 9A2 2 0 1 1 6 9Q10 2 15 9'),w:'왼쪽에 작은 원이 달린 위로 볼록한 호'}
 },
 s5:{ // 212쪽 상선약자(5)
  daepyo:{n:'대표',d:P('M0 10L6 0L12 10'),w:'뾰족한 산 모양(∧)'},
  gyeolgwa:{n:'결과',d:P('M0 0L10 10M10 0L0 10'),w:'서로 엇갈린 X자'},
  gyeolguk:{n:'결국',d:P('M0 0L14 14')+P('M-1 6L5 1'),w:'긴 하줄(↘)을 짧은 획이 가르는 모양'},
  olsida:{n:'올시다',d:'<circle cx="4" cy="4" r="3"/>',w:'작은 원(○) 하나'},
  jari:{n:'이 자리에서',d:P('M4 0V9C1 10 2 12 5 12C8 13 4 16 2 15'),w:'세로선 아래에 s자가 이어지는 모양'},
  deobul:{n:'더불어',d:P('M8 0C0 1 2 5 5 7C9 9 8 14 0 15'),w:'큰 s자'}
 }
};
/* 얼마·언제 계열: 고리 하나 + 점/꼬리 */
const LP={
 eolma:'M7 0C2 2 3 8 5 11C3 15 -1 12 2 10C5 8 8 10 9 12',
 eonje:'M0 0C3 5 6 8 4 12C2 15 -2 12 1 10C4 8 7 5 9 0'
};
SET.s6={
 eolma:{n:'얼마',d:P(LP.eolma),w:'점 없는 ℓ 모양 고리'},
 eolmana:{n:'얼마나',d:P(LP.eolma)+DOT(-2,6),w:'ℓ 고리 왼쪽에 점'},
 eolmaji:{n:'얼마지',d:P(LP.eolma)+DOT(11,14),w:'ℓ 고리 오른쪽 아래에 점'},
 eonje:{n:'언제',d:P(LP.eonje),w:'점 없는 γ 모양 고리'},
 eonjena:{n:'언제나',d:P(LP.eonje)+DOT(-2,13),w:'γ 고리 왼쪽 아래에 점'},
 eonjenga:{n:'언젠가',d:P(LP.eonje)+P('M5 8C8 6 12 8 16 7'),w:'γ 고리에서 오른쪽으로 뻗는 꼬리'}
};
const CK=Object.keys(SET);
const gof=k=>CK.find(c=>SET[c][k]);
const sh=(c,k)=>gShape(SET[c][k]);
const why=(c,k)=>`${SET[c][k].n}: 앞문자 끝에서 차줄로 4mm 올라간 상선 자리에 ${SET[c][k].w}이(가) 있으므로 ${SET[c][k].n}입니다.`;
const NAMES={s2:'상선약자(2) 도대체·가운데·사람 …',s3:'상선약자(3) 계기·대책·문제 …',s4:'상선약자(4) 누구·너무·자기 …',s5:'상선약자(5) 대표·결과·올시다 …',s6:'상선약자 얼마·언제 계열(점 위치)'};
const TXT={
 s2:'<b>상선약자(2)</b>: 모양과 방향이 곧 단어입니다. 앞문자 끝에서 차줄(↗)로 4mm 올린 자리에 씁니다.<br>',
 s3:'<b>상선약자(3)</b>: 계기·대책·동시·문제·정치 …<br>',
 s4:'<b>상선약자(4)</b>: 누구·너무·자기·이것 …. 「누구」 계열은 ⌣ 호에 무엇이 붙었는지로 구별합니다.<br>',
 s5:'<b>상선약자(5)</b>: 대표·결과·결국·올시다 …<br>',
 s6:'<b>얼마·언제 계열</b>: 고리 모양이 같고, <b>점의 위치</b>나 꼬리로 구별합니다. 얼마 = ℓ 고리(점 없음) · 얼마나 = 왼쪽 점 · 얼마지 = 오른쪽 아래 점 / 언제 = γ 고리 · 언제나 = 왼쪽 아래 점 · 언젠가 = 오른쪽 꼬리.<br>'
};
const pickOpts=(c,k)=>{const pool=Object.keys(SET[c]).filter(x=>x!==k);return shuf([k,...shuf(pool).slice(0,3)])};

/* ---------- 「~ㄹ 수 있다/없다」 (교재 175쪽): 앞문자 끝에 있다 |, 없다 ( 를 붙인다 ---------- */
const U={
 yi:{n:'드릴 수 있다',d:'<path d="M6 30L34 24"/><path d="M38 14V42"/>',w:'앞 글자 끝에 「있다」의 세로선(|)'},
 yn:{n:'드릴 수는 있는',d:'<path d="M6 30L32 25"/><circle cx="34.5" cy="24.2" r="2.2"/><path d="M40 14V42"/>',w:'앞 글자 끝의 작은 원(는) 뒤에 「있다」의 세로선(|)'},
 yd:{n:'드릴 수도 있고',d:'<path d="M6 30L32 25"/><path d="M35 22L37 17"/><path d="M42 14V42"/>'+DOT(39,40),w:'앞 글자 끝에 짧은 사선(도)과 「있다」의 세로선(|), 아래에 점(고)'},
 ei:{n:'드릴 수 없다',d:'<path d="M6 30L34 24"/><path d="M40 16Q34 28 40 40"/>',w:'앞 글자 끝에 「없다」의 작은 호 「(」'},
 en:{n:'드릴 수는 없는',d:'<path d="M6 30L32 25"/><circle cx="34.5" cy="24.2" r="2.2"/><path d="M42 16Q36 28 42 38"/><circle cx="42" cy="40" r="2"/>',w:'앞 글자 끝의 작은 원(는) 뒤에 「없다」의 호 「(」, 아래에 작은 고리'}
};
const UK=Object.keys(U);
const uShape=k=>sv(U[k].d);
const uWhy=k=>`${U[k].n}: ${U[k].w}이(가) 보입니다. 있다는 세로선(|), 없다는 호 「(」입니다.`;

/* ---------- 「~었을 것이다」 (교재 218쪽): 기본형 끝에 차줄 4~8mm를 걸쳐 쓴다 ---------- */
const OS={
 eop:{n:'없다',m:'없었을 것이다',d:'M12 10Q4 24 12 38',x:[2,38,34,32]},
 iss:{n:'있다',m:'있었을 것이다',d:'M12 10V36',x:[2,38,34,32]}
};
const OK=Object.keys(OS);
const oShape=(s,on)=>sv(`<path d="${OS[s].d}"/>`+(on?`<path d="M2 38L36 32"/>`:''));
const oWhy=(s,on)=>on?`${OS[s].m}: 「${OS[s].n}」 기본형 끝에 차줄(↗) 하나를 걸쳐 쓰면 「~었을 것이다」입니다.`:`${OS[s].n}: 걸쳐 쓰는 차줄이 없는 기본형입니다.`;
const oCombos=()=>OK.flatMap(s=>[s+'.0',s+'.1']);
const oName=(s,on)=>on?OS[s].m:OS[s].n;

/* ---------- 상선약자(6) 그렇다·이렇다·저렇다 (교재 232쪽) ---------- */
const KS={
 g:{n:'그',d:'M9 4C4 3 3 8 7 8H26',e:[26,8],lab:'그'},
 i:{n:'이',d:'M2 3C2 -2 8 -2 8 3V16',e:[8,16],lab:'이'},
 j:{n:'저',d:'M3 13C-1 12 2 8 5 7C8 5 12 3 16 3',e:[16,3],lab:'저'}
};
const KE={
 da:{t:s=>KS[s].lab+'렇다',w:'기본 모양 그대로',x:()=>''},
 ge:{t:s=>KS[s].lab+'렇게',w:'끝에 짧은 꼬리',x:(e)=>P(`M${e[0]} ${e[1]}q3 0 5 4`)},
 han:{t:s=>KS[s].lab+(s==='g'?'러':'러')+'한',w:'끝에서 떨어진 짧은 하줄(↘)',x:(e)=>P(`M${e[0]+2} ${e[1]+2}l5 6`)},
 ttae:{t:s=>KS[s].lab+'렇기 때문에',w:'끝에서 아래로 내려갔다 크게 위로 휘어 올라가는 곡선',x:(e)=>P(`M${e[0]} ${e[1]}Q${e[0]+8} ${e[1]+10} ${e[0]+22} ${e[1]-8}`)}
};
const KEK=Object.keys(KE),KSK=Object.keys(KS);
const kShape=(s,e)=>gShape({d:P(KS[s].d)+KE[e].x(KS[s].e)});
const kCombos=()=>KSK.flatMap(s=>KEK.map(e=>s+'.'+e));
const kWhy=(s,e)=>`${KE[e].t(s)}: 앞부분 모양이 「${KS[s].n}」(${s==='g'?'왼쪽 끝이 말린 가로선':s==='i'?'위가 말린 세로선':'왼쪽 아래가 말린 위로 휘는 호'})이고, ${KE[e].w}이므로 ${KE[e].t(s)}입니다.`;

const F={
 name:'응용편 (상선 응용 2)',
 curr:['q3:s2','q3:s3','q3:s4','q3:s5','q3:s6','q3:u1','q3:o1','q3:k1'],
 info:[],
 names:Object.assign({},...Object.keys(NAMES).map(c=>({['q3:'+c]:NAMES[c]})),{'q3:u1':'~ㄹ 수 있다/없다 (있다 | · 없다 ()','q3:o1':'~었을 것이다 (차줄을 걸쳐 쓰기)','q3:k1':'그렇다·이렇다·저렇다 + 어미'}),
 intro:Object.assign({},...Object.keys(SET).map(c=>({['q3:'+c]:()=>({prompt:row(Object.keys(SET[c]).slice(0,6).map(k=>lab(sh(c,k),SET[c][k].n))),
   text:TXT[c]+Object.keys(SET[c]).map(k=>`${SET[c][k].n} = ${SET[c][k].w}`).join('<br>')+'<br><small>그림은 교재 그림을 보고 어림해 그린 약식입니다. 교재의 같은 쪽과 견주어 보세요.</small>'})})),{
  'q3:u1':()=>({prompt:row(UK.slice(0,3).map(k=>lab(uShape(k),U[k].n))),
   text:'<b>~ㄹ 수 있다 / ~ㄹ 수 없다</b><br>「있다」 기본형(세로선 |)이나 「없다」 기본형(호 「(」)을 4~8mm 길이로 <b>앞 글자 끝에</b> 붙여 씁니다.<br>'+UK.map(k=>`${U[k].n} = ${U[k].w}`).join('<br>')+'<br><small>수가·수밖에 등 다른 꼴은 교재 175쪽을 보세요.</small>'}),
  'q3:o1':()=>({prompt:row([lab(oShape('eop',0),'없다'),lab(oShape('eop',1),'없었을 것이다'),lab(oShape('iss',1),'있었을 것이다')]),
   text:'<b>~었을 것이다</b><br>기본형 끝에 <b>차줄(↗) 4~8mm 하나를 걸쳐</b> 쓰면(또는 삐치면) 「~었을 것이다」입니다. 없다(「(」), 있다(|)처럼 기본형 모양으로 어떤 동사인지 읽고, 걸친 차줄이 있으면 ~었을 것이다로 읽으세요.<br><small>~었던 것이다·~었겠다는 교재 218쪽을 보세요.</small>'}),
  'q3:k1':()=>({prompt:row(['g','i','j'].map(s=>lab(kShape(s,'da'),KS[s].lab+'렇다'))),
   text:'<b>그렇다·이렇다·저렇다 계열</b><br>앞부분 모양으로 그/이/저를 가립니다: 그 = 왼쪽 끝이 말린 가로선 · 이 = 위가 말린 세로선 · 저 = 왼쪽 아래가 말린 위로 휘는 호.<br>끝 모양으로 어미를 가립니다: 기본 모양 = ~렇다 · 짧은 꼬리 = ~렇게 · 떨어진 짧은 하줄(↘) = ~러한 · 크게 휘어 오르는 곡선 = ~렇기 때문에.'})
 }),
 questions:Object.assign({},...Object.keys(SET).map(c=>({['q3:'+c]:()=>shuf(Object.keys(SET[c])).flatMap(k=>['q3gQ:'+k,'q3gR:'+k])})),{
  'q3:u1':()=>shuf(UK).flatMap(k=>['q3uQ:'+k,'q3uR:'+k]),
  'q3:o1':()=>shuf(oCombos()).map((k,i)=>(i%2?'q3oR:':'q3oQ:')+k),
  'q3:k1':()=>shuf(kCombos()).slice(0,8).map((k,i)=>(i%2?'q3kR:':'q3kQ:')+k)
 }),
 types:{
  q3gQ:{kcs:k=>['q3:'+gof(k)],ids:()=>CK.flatMap(c=>Object.keys(SET[c]).map(k=>'q3gQ:'+k)),build:(k,id)=>{const c=gof(k);return {id,prompt:sh(c,k),q:'이 상선약자는 어떤 말일까요?',one:true,opts:pickOpts(c,k).map(x=>opt(x,SET[c][x].n)),ans:k,why:why(c,k)}}},
  q3gR:{kcs:k=>['q3:'+gof(k)],ids:()=>CK.flatMap(c=>Object.keys(SET[c]).map(k=>'q3gR:'+k)),build:(k,id)=>{const c=gof(k);return {id,prompt:big(SET[c][k].n),q:'상선 자리에 어떤 약자로 쓸까요?',opts:pickOpts(c,k).map(x=>opt(x,sh(c,x))),ans:k,why:why(c,k)}}},
  q3uQ:{kcs:()=>['q3:u1'],ids:()=>UK.map(k=>'q3uQ:'+k),build:(k,id)=>({id,prompt:uShape(k),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(UK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,U[x].n))),ans:k,why:uWhy(k)})},
  q3uR:{kcs:()=>['q3:u1'],ids:()=>UK.map(k=>'q3uR:'+k),build:(k,id)=>({id,prompt:big(U[k].n),q:'어떤 약기로 쓸까요?',opts:shuf([k,...shuf(UK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,uShape(x)))),ans:k,why:uWhy(k)})},
  q3oQ:{kcs:()=>['q3:o1'],ids:()=>oCombos().map(k=>'q3oQ:'+k),build:(k,id)=>{const [s,o]=k.split('.');return {id,prompt:oShape(s,+o),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf(oCombos().map(x=>{const [a,b]=x.split('.');return opt(x,oName(a,+b))})),ans:k,why:oWhy(s,+o)}}},
  q3oR:{kcs:()=>['q3:o1'],ids:()=>oCombos().map(k=>'q3oR:'+k),build:(k,id)=>{const [s,o]=k.split('.');return {id,prompt:big(oName(s,+o)),q:'어떤 약기로 쓸까요?',opts:shuf(oCombos().map(x=>{const [a,b]=x.split('.');return opt(x,oShape(a,+b))})),ans:k,why:oWhy(s,+o)}}},
  q3kQ:{kcs:()=>['q3:k1'],ids:()=>kCombos().map(k=>'q3kQ:'+k),build:(k,id)=>{const [s,e]=k.split('.');const near=kCombos().filter(x=>{const [a,b]=x.split('.');return x!==k&&((a===s)!==(b===e))});
    return {id,prompt:kShape(s,e),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(near).slice(0,3)].map(x=>{const [a,b]=x.split('.');return opt(x,KE[b].t(a))})),ans:k,why:kWhy(s,e)}}},
  q3kR:{kcs:()=>['q3:k1'],ids:()=>kCombos().map(k=>'q3kR:'+k),build:(k,id)=>{const [s,e]=k.split('.');const near=kCombos().filter(x=>{const [a,b]=x.split('.');return x!==k&&((a===s)!==(b===e))});
    return {id,prompt:big(KE[e].t(s)),q:'어떤 약기로 쓸까요?',opts:shuf([k,...shuf(near).slice(0,3)].map(x=>{const [a,b]=x.split('.');return opt(x,kShape(a,b))})),ans:k,why:kWhy(s,e)}}}
 },
 section:{title:'응용편 (제3장 상선 응용 169~234쪽)',kcs:['q3:s2','q3:s3','q3:s4','q3:s5','q3:s6','q3:u1','q3:o1','q3:k1']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
