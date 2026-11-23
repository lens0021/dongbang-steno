/* 조사약기법 영역 (교재 1장 조사약기법(1)~(4): 어간 단어 끝에 약기 표시를 붙인다). 개념 id 접두어 a:s.
   (1) ~에서·~에게서 = 끝에 s자 모양을 붙여 쓴다 / ~해서·~께서 = 끝에 s자 모양을 걸쳐 쓴다.
   (2) ~의 = 다줄(↙) 2mm 삐침 / ~을·~를 = 차줄(↗) 2mm 삐침.
   (3) ~은·~가 = 하줄(↘) 2mm 삐침 / ~는·~이 = 정측 끝에 소원 / ~에는 = 반측 끝에 소원.
   (4) ~에·~께 = 정측에 반소원 / ~에게 = 반측에 반소원.
   어간(단어)은 기본·ㅐ모음·받침 영역이 각자 그리고, 이 파일은 그 경로의 끝점과 끝 방향을 읽어 표시를 덧붙인다.
   s자의 정확한 크기는 교재 그림에서 어림한 값이고, 모양은 교재 그림과 대조해 맞췄다. */
(function(){
window.FEATURES=window.FEATURES||[];
/* SAFE: 어떤 단어에든 조사로 보는 꼴. LISTED: ~이·~가·~에처럼 낱말 끝에도 흔한 꼴은 교재 목록(JOSAWORDS)에 든 단어에서만 조사로 본다 */
const SAFE=[['에게서','S2'],['에서','S2'],['해서','S1'],['께서','S1'],['에게','HB'],['에는','CB'],['께','H'],['은','N'],['는','C'],['의','E'],['를','L'],['을','L']];
const LISTED=[['이','C'],['가','N'],['에','H']];
/* 문장 연습용으로 직접 지은 단어(교재 목록에 없는 조사 붙은 꼴) */
const OWNJ=['바다에','시장에','가게에','사람이','나무가','하늘이','구름이'];
const LSET=new Set([...(typeof JOSAWORDS!=='undefined'?JOSAWORDS:[]),...OWNJ]);
const splitJ=w=>{for(const [s,k] of SAFE.concat(LSET.has(w)?LISTED:[]))if(w.length>s.length+1&&w.endsWith(s))return {stem:w.slice(0,-s.length),s,k};return null};
const fx=n=>n.toFixed(1);
const hasB=w=>[...w].some(ch=>(ch.charCodeAt(0)-0xAC00)%28);
/* ---------- 어간 그리기: 영역별 규칙 ---------- */
const engOf=st=>{const WC=window.WORDCHECK||{};
  if(hasB(st))return WC.b&&WC.b(st)?'b':null;
  if(WC.ae&&WC.ae(st))return 'ae';
  return okWord(st)&&(WORDS.includes(st)||drawsClean(st))?'base':null};
const stemD=(st,e)=>e==='b'?BATCHIM.bPath(st).d:e==='ae'?WORDSIG.ae(st):wordPath(st).d;
const stemKcs=(st,e)=>e==='b'?BATCHIM.bKcs(st):e==='ae'?featType('ewsym').kcs(st):wordKcs(st);
/* ---------- 경로 끝점·끝 방향 ---------- */
function endInfo(d){
  let cx=0,cy=0,tx=1,ty=0,off=null,chord=null;const re=/([MLQA])([^MLQA]*)/g;let m;
  while((m=re.exec(d))){const n=m[2].trim().split(/[ ,]+/).map(Number);let ex,ey,dx,dy;off=null;
    if(m[1]==='M'){cx=n[0];cy=n[1];continue}
    if(m[1]==='L'){ex=n[0];ey=n[1];dx=ex-cx;dy=ey-cy}
    else if(m[1]==='Q'){ex=n[2];ey=n[3];dx=ex-n[0];dy=ey-n[1];if(Math.hypot(dx,dy)<1e-3){dx=ex-cx;dy=ey-cy}
      chord=[ex-cx,ey-cy];off=[n[0]-(cx+ex)/2,n[1]-(cy+ey)/2]}
    else{ex=n[5];ey=n[6];dx=ex-cx;dy=ey-cy}
    const l=Math.hypot(dx,dy);if(l>1e-3){tx=dx/l;ty=dy/l}
    cx=ex;cy=ey}
  /* 정측: 곧은 선은 교재 도해(수평은 위, 그 밖은 왼쪽), 곡선은 안쪽(오목한 쪽) */
  let side=jeong(Math.atan2(-ty,tx)*180/Math.PI);
  if(off&&chord){const cl=Math.hypot(chord[0],chord[1])||1,pp=[-chord[1]/cl,chord[0]/cl],o=off[0]*pp[0]+off[1]*pp[1];
    if(Math.abs(o)>.3)side=o>0?[-pp[0],-pp[1]]:pp}
  return {p:[cx,cy],t:[tx,ty],side}}
/* ---------- 약기 표시 ---------- */
const TICK=6;   /* 2mm = 6단위(엔진은 3단위 = 1mm) */
const SL=7,SW=1.7;   /* s자: 길이 약 2.3mm, 폭 약 1.1mm */
/* 선의 끝 방향 t에 수직인 법선 n. 항상 아래쪽(y>0)을 향하게 한다 */
function normalOf(t){let n=[-t[1],t[0]];if(n[1]<-0.2||(Math.abs(n[1])<=0.2&&n[0]<0))n=[-n[0],-n[1]];return n}
function sShape(P,t,mode){
  const n=normalOf(t),a0=mode==='S1'?-SL/2:0;
  const pt=(a,b)=>[P[0]+n[0]*(a0+a*SL)+t[0]*b*SW,P[1]+n[1]*(a0+a*SL)+t[1]*b*SW];
  const p0=pt(0,.9),c1=pt(0,-.9),c2=pt(.5,-1.1),p1=pt(.5,0),c3=pt(.5,1.1),c4=pt(1,.9),p2=pt(1,-.9);
  const f=p=>fx(p[0])+' '+fx(p[1]);
  return `M${f(p0)}C${f(c1)} ${f(c2)} ${f(p1)}C${f(c3)} ${f(c4)} ${f(p2)}`}
const CR=1.8,HD=5;   /* 소원 반지름, 반소원 지름 */
function markD(P,t,k,side){
  if(k==='S1'||k==='S2')return sShape(P,t,k);
  if(k==='E'||k==='L'||k==='N'){const v=k==='E'?[-.5,.866]:k==='L'?[.866,-.5]:[.707,.707];
    return `M${fx(P[0])} ${fx(P[1])}L${fx(P[0]+v[0]*TICK)} ${fx(P[1]+v[1]*TICK)}`}
  const s=(k==='C'||k==='H')?side:[-side[0],-side[1]];
  if(k==='C'||k==='CB'){const Q=[P[0]+s[0]*2*CR,P[1]+s[1]*2*CR];
    return `M${fx(P[0])} ${fx(P[1])}A${CR} ${CR} 0 1 1 ${fx(Q[0])} ${fx(Q[1])}A${CR} ${CR} 0 1 1 ${fx(P[0])} ${fx(P[1])}`}
  const Q=[P[0]+s[0]*HD,P[1]+s[1]*HD],b=[s[1],-s[0]],sw=(b[0]*t[0]+b[1]*t[1])>0?1:0;   /* 앞(진행 방향)으로 볼록한 반원 */
  return `M${fx(P[0])} ${fx(P[1])}A${HD/2} ${HD/2} 0 0 ${sw} ${fx(Q[0])} ${fx(Q[1])}`}
/* ---------- 조사 단어 ---------- */
const CACHE=new Map();
function info(w){if(CACHE.has(w))return CACHE.get(w);
  let r=null;const sp=splitJ(w);
  if(sp){const e=engOf(sp.stem);
    if(e){const d0=stemD(sp.stem,e),ei=endInfo(d0),mk=markD(ei.p,ei.t,sp.k,ei.side);
      r={stem:sp.stem,s:sp.s,k:sp.k,e,d0,mk,d:d0+mk,P:ei.p,t:ei.t,side:ei.side}}}
  CACHE.set(w,r);return r}
/* 표시가 어간의 앞쪽 선과 닿으면(끝 근처 8단위 밖의 선과 2.2 이내) 흐려지므로 쓰지 않는다 */
function markClear(r){
  if(typeof document==='undefined'||!document.createElementNS)return true;
  const mk=(d)=>{const el=document.createElementNS('http://www.w3.org/2000/svg','path');el.setAttribute('d',d);return el};
  const pts=(d,step)=>{const o=[];let off=0;for(const sub of d.split(/(?=M)/).filter(Boolean)){const el=mk(sub);const L=el.getTotalLength();for(let s=0;s<=L;s+=step){const p=el.getPointAtLength(s);o.push([p.x,p.y,L-s])}off+=L}return o};
  const A=pts(r.d0,.8),B=pts(r.mk,.5);
  const sub=r.d0.split(/(?=M)/).filter(Boolean),last=mk(sub[sub.length-1]);
  /* 어간에서 끝점까지 거리가 10 넘는 점(=표시와 떨어진 앞쪽 선)만 비교 */
  const tail=A.filter(p=>Math.hypot(p[0]-r.P[0],p[1]-r.P[1])>10);
  for(const b of B)for(const a of tail)if(Math.hypot(a[0]-b[0],a[1]-b[1])<2.2)return false;
  return true}
const okJ=w=>{const r=info(w);if(!r)return false;if(r.chk===undefined)r.chk=markClear(r);return r.chk};
const KEYG={S2:'a:s1',S1:'a:s1',E:'a:s2',L:'a:s2',N:'a:s3',C:'a:s3',CB:'a:s3',H:'a:s4',HB:'a:s4'};
const kcsJ=w=>{const r=info(w);return [...new Set([...stemKcs(r.stem,r.e),KEYG[r.k]])]};
const dJ=w=>info(w).d;
(window.WORDCHECK=window.WORDCHECK||{}).j=okJ;
(window.WORDCHECK=window.WORDCHECK||{}).jk=kcsJ;
(window.WORDSIG=window.WORDSIG||{}).j=dJ;
/* ---------- 그림 ---------- */
const bbox=d=>{const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('style','position:absolute;visibility:hidden;width:0;height:0');
  const pa=document.createElementNS('http://www.w3.org/2000/svg','path');pa.setAttribute('d',d);sv.appendChild(pa);document.body.appendChild(sv);
  const b=pa.getBBox();document.body.removeChild(sv);return {x0:b.x-8,y0:b.y-8,w:b.width+16,h:b.height+16}};
const BB=new Map();const boxOf=d=>{if(!BB.has(d))BB.set(d,bbox(d));return BB.get(d)};
function dSVG(d,h=90,S){
  S=Math.min(S||1e9,RS());const b=boxOf(d);
  const size=S?`width:${(b.w*S).toFixed(0)}px;height:${(b.h*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:${Math.max(110,Math.min(300,b.w*2.2))}px;height:${h}px`;
  return `<svg viewBox="${fx(b.x0)} ${fx(b.y0)} ${fx(b.w)} ${fx(b.h)}" style="${size}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${S?(3.4/S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
const jSVG=(w,h,S)=>dSVG(dJ(w),h,S);
/* 표시만 보여 주는 그림: 8mm 가로 선 끝에 표시를 붙인다(정측은 위쪽) */
const LINE='M0 0L24 0';
/* 표시가 작아(2mm) 보기 어려우므로 설명 그림은 실제 길이 배율(RS)의 약 2.4배로 확대해 그린다 */
const markDemo=(k)=>{const d=LINE+markD([24,0],[1,0],k,[0,-1]),b=boxOf(d),S=RS()*2.4;
  return `<svg viewBox="${fx(b.x0)} ${fx(b.y0)} ${fx(b.w)} ${fx(b.h)}" style="width:${(b.w*S).toFixed(0)}px;height:${(b.h*S).toFixed(0)}px;max-width:100%" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${(3.4/S).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
const NAMES={S2:'~에서 · ~에게서',S1:'~해서 · ~께서',E:'~의',L:'~을 · ~를',N:'~은 · ~가',C:'~는 · ~이',CB:'~에는',H:'~에 · ~께',HB:'~에게'};
const GROUPK={'a:s1':['S2','S1'],'a:s2':['E','L'],'a:s3':['N','C','CB'],'a:s4':['H','HB']};
const KEYS=Object.values(GROUPK).flat();
const shuf2=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const hasJong=st=>!!((st.charCodeAt(st.length-1)-0xAC00)%28);
/* 어간에 이 표시를 붙인 단어(보기용): 어색한 꼴(~해서)은 목록에 있을 때만 */
const sufOf=(st,k)=>({S2:'에서',E:'의',L:hasJong(st)?'을':'를',N:hasJong(st)?'은':'가',C:hasJong(st)?'이':'는',CB:'에는',H:'에',HB:'에게'}[k]||null);
const WHYK={S2:'어간 끝에 s자를 붙여(끝에서 이어) 씁니다.',S1:'어간 끝에 s자를 걸쳐 씁니다.',E:'어간 끝에서 다줄(↙) 방향으로 2mm 삐칩니다.',L:'어간 끝에서 차줄(↗) 방향으로 2mm 삐칩니다.',
 N:'어간 끝에서 하줄(↘) 방향으로 2mm 삐칩니다.',C:'어간 끝 정측(곡선은 안쪽)에 작은 원을 붙입니다.',CB:'어간 끝 반측에 작은 원을 붙입니다.',H:'어간 끝 정측에 반소원을 붙입니다.',HB:'어간 끝 반측에 반소원을 붙입니다.'};
const chip=w=>`<span class="big" style="font-size:22px">${w}</span>`;
const why=w=>{const r=info(w);return `${w} = ${r.stem} + ~${r.s}. ${r.stem}을(를) 먼저 쓰고, ~${r.s}는 ${WHYK[r.k]}`};
/* 보기 하나 = {w:글자, d:경로}. 정답 단어와 어간이 같고 표시만 다른 보기(그림이 다르다) + 다른 단어 */
const optOf=w=>({w,d:dJ(w)});
function variantOf(r,k){const s=sufOf(r.stem,k);if(!s)return null;
  const w=r.stem+s;return {w,d:r.d0+markD(r.P,r.t,k,r.side)}}
function opts4(w){
  const r=info(w),out=[optOf(w)];
  const same=(a,b)=>window.sigNear?sigNear(a.d,b.d):a.d===b.d;
  const add=o=>{if(o&&out.length<4&&!out.some(x=>same(x,o)))out.push(o)};
  const grpOf=KEYG[r.k];
  /* 같은 묶음의 표시를 먼저, 그다음 다른 묶음 */
  shuf2(KEYS.filter(k=>k!==r.k&&KEYG[k]===grpOf)).forEach(k=>add(variantOf(r,k)));
  shuf2(KEYS.filter(k=>KEYG[k]!==grpOf)).forEach(k=>{if(k!=='S1'||JW.includes(r.stem+'해서'))add(variantOf(r,k))});
  if(out.length<4){pickDistractors(w,JW,3,x=>kcsJ(x).filter(c=>!/^a:s/.test(c)),dJ).forEach(x=>add(optOf(x)))}
  return shuf2(out)}
const jwBuild=(t,w,id)=>{const os=opts4(w);
  if(t==='jsym')return {id,prompt:jSVG(w,130),q:'이 속기 단어는 무엇일까요?',opts:os.map(o=>({k:o.w,h:chip(o.w)})),ans:w,why:why(w)};
  const bx=os.map(o=>boxOf(o.d)),sc=Math.min(RS(),150/Math.max(...bx.map(b=>b.w)),80/Math.max(...bx.map(b=>b.h)));
  return {id,prompt:`<span class="big" style="font-size:44px">${w}</span>`,q:`「${w}」을(를) 쓴 모양을 고르세요`,opts:os.map(o=>({k:o.w,h:dSVG(o.d,0,sc)})),ans:w,why:why(w)}};
const markBuild=(t,k,id)=>{
  const g=KEYG2(k),pool=KEYS.filter(x=>x!==k),dist=shuf2(pool.filter(x=>KEYG[x]===g)).concat(shuf2(pool.filter(x=>KEYG[x]!==g))).slice(0,3);
  const all=shuf2([k,...dist]);
  if(t==='jm')return {id,prompt:markDemo(k,RS()*1.6),q:'어간 끝에 붙은 이 표시는 어떤 조사일까요?',one:true,opts:all.map(x=>({k:x,h:`<span class="big" style="font-size:20px">${NAMES[x]}</span>`})),ans:k,why:`${NAMES[k]}: ${WHYK[k]}`};
  return {id,prompt:`<span class="big" style="font-size:28px">${NAMES[k]}</span>`,q:'어간 끝에 어떤 표시를 붙일까요?',opts:all.map(x=>({k:x,h:markDemo(x,RS()*1.2)})),ans:k,why:`${NAMES[k]}: ${WHYK[k]}`}};
const KEYG2=k=>KEYG[k];
const JW=[...new Set(typeof JOSAWORDS!=='undefined'?JOSAWORDS:[])].filter(okJ);
window.JOSA={info,JW,splitJ,okJ,kcsJ,dJ,markD,endInfo};
const ex=w=>info(w)?`<span style="display:inline-block;margin:2px 6px;text-align:center">${jSVG(w,0,RS()*1.4)}<small style="display:block">${w}</small></span>`:'';
const exs=(...ws)=>ws.filter(w=>JW.includes(w)||info(w)).slice(0,3).map(ex).join('');
const row=ks=>`<span style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px">${ks.map(k=>`<span style="text-align:center">${markDemo(k,RS()*1.3)}<small style="display:block">${NAMES[k]}</small></span>`).join('')}</span>`;
const F={name:'조사 약기(단어에 붙이기)',
 curr:['a:s1','a:s2','a:s3','a:s4'],
 info:[],
 names:{'a:s1':'조사약기법(1) ~에서·~해서','a:s2':'조사약기법(2) ~의·~을·~를','a:s3':'조사약기법(3) ~은·~가·~는·~이·~에는','a:s4':'조사약기법(4) ~에·~께·~에게'},
 intro:{
  'a:s1':()=>({prompt:row(['S2','S1']),
   text:'<b>조사약기법(1)</b><br>조사는 빈도가 높아 기본문자로 계속 반복하지 않고 간단히 씁니다. 어간(앞 단어)을 쓰고 끝에 표시를 덧붙여요.<br>~에서, ~에게서 = 끝에 <b>s자 모양을 붙여</b> 씁니다.<br>~해서, ~께서 = 끝에 <b>s자 모양을 걸쳐</b> 씁니다.<br>예) 대화해서 = 대화 + s자(걸침)<div style="margin-top:6px">'+exs('대화해서','이천에서','매매해서')+'</div>'}),
  'a:s2':()=>({prompt:row(['E','L']),
   text:'<b>조사약기법(2)</b><br>~의 = 어간 끝에서 <b>다줄(↙)</b>로 2mm 삐칩니다.<br>~을, ~를 = 어간 끝에서 <b>차줄(↗)</b>로 2mm 삐칩니다.<div style="margin-top:6px">'+exs('재난의','재해를','조간신문을')+'</div>'}),
  'a:s3':()=>({prompt:row(['N','C','CB']),
   text:'<b>조사약기법(3)</b><br>~은, ~가 = 어간 끝에서 <b>하줄(↘)</b>로 2mm 삐칩니다.<br>~는, ~이 = 어간 끝 <b>정측에 소원</b>(작은 원)을 붙입니다.<br>~에는 = 어간 끝 <b>반측에 소원</b>을 붙입니다.<div style="margin-top:6px">'+exs('사채가','사절단은','여울에는')+'</div>'}),
  'a:s4':()=>({prompt:row(['H','HB']),
   text:'<b>조사약기법(4)</b><br>~에, ~께 = 어간 끝 <b>정측에 반소원</b>을 붙입니다.<br>~에게 = 어간 끝 <b>반측에 반소원</b>을 붙입니다.<div style="margin-top:6px">'+exs('새샘에','세금에','소금에')+'</div>'})},
 questions:{
  'a:s1':()=>['jm:S2','jm:S1','jp:S2','jp:S1'],
  'a:s2':()=>['jm:E','jm:L','jp:E','jp:L'],
  'a:s3':()=>['jm:N','jm:C','jm:CB','jp:N','jp:C','jp:CB'],
  'a:s4':()=>['jm:H','jm:HB','jp:H','jp:HB']},
 types:{
  jm:{kcs:k=>[KEYG[k]],ids:()=>KEYS.map(k=>'jm:'+k),build:(k,id)=>markBuild('jm',k,id)},
  jp:{kcs:k=>[KEYG[k]],ids:()=>KEYS.map(k=>'jp:'+k),build:(k,id)=>markBuild('jp',k,id)},
  jsym:{kcs:k=>kcsJ(k),ids:()=>JW.map(w=>'jsym:'+w),build:(k,id)=>jwBuild('jsym',k,id)},
  jpick:{kcs:k=>kcsJ(k),ids:()=>JW.map(w=>'jpick:'+w),build:(k,id)=>jwBuild('jpick',k,id)}},
 section:{title:'조사 약기 (단어에 붙이기)',kcs:['a:s1','a:s2','a:s3','a:s4']}};
F.after='e:sep';
window.FEATURES.push(F);
})();
