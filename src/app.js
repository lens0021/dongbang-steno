
/* ---------- 지식 요소(개념) ----------
   c:문자  v:모음 길이  r:규칙.  문제는 필요한 개념 목록(kcs)을 가진다. 단어 문제는 그 단어의 문자들(+8·16mm 모음)을 모두 익혀야 나온다. */
const CURR=['c:가','c:나','c:마','v:4','c:다','c:사','c:라','r:6','r:11','c:차','c:자','c:아','v:8','c:하','c:바','c:타','r:7','r:5','c:이','c:파','c:카','r:12','r:13','v:16','r:3','r:4','r:8','r:9','r:10'];
/* 문제로 확인하기 어려운 설명형 규칙: 카드를 읽으면 익힌 것으로 본다 */
const INFO=new Set(['r:12','r:13','r:11','r:3','r:4','r:6','r:7','r:8','r:9','r:10']);
/* ---------- 기능 확장 등록 ----------
   새 학습 영역(받침, ㅐ모음, 약기법 등)은 src/features/<이름>.js 에서 아래 모양의 객체를 FEATURES에 push 한다.
   {name, curr:[개념 id...], info:[읽기만 하는 개념 id], names:{id:표시 이름},
    intro:{id:()=>({prompt,text})}, questions:{id:()=>[문제 id...]},
    types:{종류:{kcs:(key,id)=>[개념...], build:(key,id)=>문제 객체, ids:()=>[문제 id...]}},
    section:{title,kcs:[...]}, wordKcs:(word,set)=>void}
   개념 id는 영역마다 겹치지 않게 접두어를 쓴다(받침 b:, ㅐ모음 e:, 약기법 a:). */
const FEATURES=window.FEATURES||[];
FEATURES.forEach(f=>{const at=f.after?CURR.indexOf(f.after):-1;if(at>=0)CURR.splice(at+1,0,...(f.curr||[]));else CURR.push(...(f.curr||[]));(f.info||[]).forEach(k=>INFO.add(k))});
/* 문제 보기들이 모두 같은 길이로 그려질 때 붙이는 안내(길이가 서로 다르면 붙이지 않는다). 새 영역의 문제도 이 함수를 쓴다. */
/* 기준 막대: 보기 그림(.opt svg는 viewBox 80 → 64px, 즉 0.8px/단위)과 같은 배율로 4·8·16mm 길이를 직접 그려 보여 준다.
   lenNote가 붙은 문제는 itemQ가 자동으로 q.ref에 이것을 넣는다. */
const lenRef=mm=>`<div class="lenref" aria-hidden="true"><small>실제 길이 기준 (화면 길이 보정 기준)</small>${[4,8,16].map(m=>`<div class="lr${m===mm?' on':''}"><i style="width:${mmPx(m).toFixed(0)}px"></i><span>${m}mm</span></div>`).join('')}</div>`;
const lenNote=mm=>` <small class="lennote">(모든 보기는 ${mm}mm)</small>`;
const featType=t=>{for(const f of FEATURES){if(f.types&&f.types[t])return f.types[t]}};
const DD={'까':'가','따':'다','빠':'바','싸':'사','짜':'자'};
const RNAME={11:'이어쓰기가 곤란할 때',3:'반소원(ㅑ계열)',4:'ㅑㅕ·ㅛㅠ 길이',5:'된소리',6:'이어쓰기',7:'정측·반측',8:'연습 방법',9:'획순',10:'창안자·연도',12:'각도는 재량이 있다',13:'ㅏ와 ㅓ, ㅗ와 ㅜ 구별'};
const VNAME={4:'ㅏㅓ 4mm',8:'ㅗㅜ 8mm',16:'ㅡㅣ 16mm'};
const kcName=k=>{const fn=FEATURES.find(f=>f.names&&f.names[k]);if(fn)return fn.names[k];const [t,v]=k.split(':');return t==='w'?'이어쓰기 단어':t==='c'?v:t==='v'?VNAME[v]:RNAME[v]};
const LEARNED=3;
let S={xp:0,streak:0,last:'',k:{},recent:[]};
try{const o=JSON.parse(localStorage.getItem('steno2')||'{}');Object.assign(S,o)}catch(e){}
if(!S.k)S.k={};if(!S.recent)S.recent=[];
const save=()=>{try{localStorage.setItem('steno2',JSON.stringify(S))}catch(e){}};
const strength=k=>(S.k[k]&&S.k[k].s)||0;
const seen=k=>!!S.k[k];
const learned=k=>strength(k)>=LEARNED;
function markSeen(k){if(!S.k[k])S.k[k]={s:INFO.has(k)?3:1,n:1,w:0,t:Date.now()}}
function recordKcs(kcs,ok){kcs.forEach(k=>{const m=S.k[k]||(S.k[k]={s:0,n:0,w:0,t:0});m.n++;m.t=Date.now();if(ok)m.s=Math.min(5,m.s+1);else{m.w++;m.s=Math.max(0,m.s-(kcs.length>1?1:2))}})}
const wordKcs=w=>{const set=new Set();[...w].forEach(ch=>{const s=syl(ch);set.add('c:'+s.c);if(s.mm>4)set.add('v:'+s.mm);if(isHook(s)&&!s.sp)set.add('r:3')});FEATURES.forEach(f=>f.wordKcs&&f.wordKcs(w,set));if(wordOffsets(w).some(Boolean))set.add('r:11');return [...set]};
function kcsOf(id){const [t,key]=id.split(':');const ft=featType(t);if(ft)return ft.kcs(key,id);
  if(t==='dd')return ['r:5','c:'+DD[key]];
  if(t==='ddd')return ['r:5','r:7','c:'+DD[key]];
  if(t==='sym'||t==='pick')return ['c:'+key];
  if(t==='len')return ['v:'+key];
  if(t==='txt')return [+key<3?'v:'+[4,8,16][+key]:'r:'+key];
  return wordKcs(key);}
const today=()=>new Date().toISOString().slice(0,10);
function touchStreak(){const t=today();if(S.last===t)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last===y?S.streak+1:1;S.last=t;save()}

/* ---------- 문제 ---------- */
const degH=d=>{const x=GROUPS.find(y=>y.deg===d);return '<span class="big" style="font-size:26px">'+x.chars.map(c=>c[0]).join(' ')+'</span>'};
function fourGroups(g){return shuf([g,...shuf(GROUPS.filter(x=>x!==g)).slice(0,3)])}
function mutants(word,n=3){
  if(n<=0)return [];
  const learnedL=Object.values(INIT).filter(c=>learned('c:'+c)),poolAll=Object.values(INIT);
  const out=new Set();
  for(let t=0;t<60&&out.size<n;t++){
    const chars=[...word],i=Math.random()*chars.length|0,s=syl(chars[i]);
    const pool=(t<30&&learnedL.length>2?learnedL:poolAll).filter(c=>c!==s.c);
    chars[i]=compose(pool[Math.random()*pool.length|0],s.jung);
    const m=chars.join('');if(m!==word)out.add(m)}
  return [...out];
}
function itemQ0(id){{const ft=featType(id.split(':')[0]);if(ft)return ft.build(id.split(':')[1],id)}
  const [t,key]=id.split(':');
  if(t==='len'){const mm=+key,VN={4:'ㅏ·ㅓ',8:'ㅗ·ㅜ',16:'ㅡ(으)'};
    const ref=shuf([4,8,16].filter(m=>m!==mm))[0];
    const bar=m=>`<span style="display:block;width:${mmPx(m).toFixed(0)}px;height:4px;border-radius:3px;background:var(--stroke)"></span>`;
    const prompt=`<span style="display:flex;flex-direction:column;align-items:center;gap:8px"><small style="color:var(--mute)">기준선: ${ref}mm</small>${bar(ref)}</span>`;
    return {id,prompt,q:`위 선이 ${ref}mm일 때, ${VN[mm]} 모음에 맞는 선은?`,opts:shuf([4,8,16]).map(m=>({k:m,h:bar(m)})),ans:mm,why:`${VN[mm]}은(는) ${mm}mm입니다. ㅏㅓ : ㅗㅜ : ㅡ = 1 : 2 : 4 비율이에요. 화면 길이를 보정하면 실제 mm에 가깝게 보여요. 그래도 비율로 기억하세요.`}}
  if(t==='dd'){const base=ALL.find(x=>x.c===DD[key]),g=base.g;
    const pool=shuf([...g.chars.map(([c,b])=>({c,b,g})).filter(x=>x.c!==base.c),...shuf(ALL.filter(x=>x.g!==g)).slice(0,2)]).slice(0,3);
    return {id,prompt:`<span class="big">${key}</span>`,q:`된소리 「${key}」는 속기로 어떻게 쓸까요?`,opts:shuf([base,...pool]).map(o=>({k:o.c,h:sv(o,40)})),ans:base.c,why:`된소리는 정측 중앙에 점을 찍어 표기하나, 생략하는 것을 원칙으로 합니다. 그래서 ${key}=${base.c}처럼 평음과 같이 씁니다.`}}
  if(t==='ddd'){const base=ALL.find(x=>x.c===DD[key]),g=base.g,other=shuf(g.chars.map(([c,b])=>({c,b,g})).filter(x=>x.c!==base.c))[0];
    const opts=shuf([{k:'ok',h:strokeDot(base,40,'in')},{k:'x1',h:strokeDot(base,40,'out')},{k:'x2',h:strokeDot(other,40,'in')},{k:'x3',h:strokeDot(other,40,'out')}]);
    return {id,prompt:`<span class="big">${key}</span>`,q:`된소리 「${key}」를 점을 찍어 표기한다면?`,opts,ans:'ok',why:`${key}은(는) ${base.c}에 정측(곡선의 안쪽, 직선은 위·왼쪽) 중앙에 점을 찍습니다. 원칙은 점을 생략하고 ${base.c}와 같이 쓰는 것이에요.`}}
  if(t==='txt'){const c=CONCEPTS[+key];
    return {id,prompt:`<div class="txt">${c.q}</div>`,q:'책의 내용을 떠올려 보세요',one:true,opts:shuf(c.o.map(x=>({k:x,h:x}))),ans:c.o[c.a],why:c.w}}
  if(t==='wsym'||t==='wpick'){
    const real=pickDistractors(key,ALLW,3,wordKcs,w=>wordPath(w).d);
    const ws=shuf([key,...real]);
    const tag='';
    const bx=ws.map(wordBox),sc=Math.min(RS(),150/Math.max(...bx.map(b=>b.w)),80/Math.max(...bx.map(b=>b.h)));
    if(t==='wsym')return {id,prompt:wordSVG(key,130),q:'이 속기 단어는 무엇일까요?'+tag,opts:ws.map(w=>({k:w,h:`<span class="big" style="font-size:24px">${w}</span>`})),ans:key,why:wordWhy(key)};
    return {id,prompt:`<span class="big" style="font-size:48px">${key}</span>`,q:`「${key}」을(를) 이어 쓴 모양을 고르세요`+tag,opts:ws.map(w=>({k:w,h:wordSVG(w,0,sc)})),ans:key,why:wordWhy(key)}}
  const it=ALL.find(x=>x.c===key),g=it.g,mine=g.chars.map(([c,b])=>({c,b,g})),others=ALL.filter(x=>x.g!==g);
  /* 자음 문제: 이미 익힌 모음 중 하나를 골라 글자(자음+모음) 단위로 낸다. 안 배운 모음은 쓰지 않는다. */
  const VOWS=[[4,0],[4,4],[8,8],[8,13],[16,18]].filter(([mm])=>mm===4||learned('v:'+mm));
  const [vmm,vj]=VOWS[Math.floor(Math.random()*VOWS.length)],L=LEN[vmm],sy=o=>REV[o.c]?compose(o.c,vj):o.c,vn={4:'ㅏㅓ 4mm',8:'ㅗㅜ 8mm',16:'ㅡ 16mm'}[vmm];
  const lines=o=>`${o.b===0?'곧은 선':'굽은 선'}(${o.g.deg}) × ${vn}`;
  if(t==='sym')
    return {id,prompt:svMM(it,vmm),q:'이 속기 글자는 무엇일까요?',opts:shuf([it,...shuf(mine.filter(m=>m.c!==it.c)),...shuf(others).slice(0,1)]).map(o=>({k:o.c,h:`<span class="big">${sy(o)}</span>`})),ans:it.c,why:`${sy(it)}은(는) ${it.c} 문자(${g.deg} 방향)에 모음 ${vn} 길이로 씁니다.`};
  if(t==='pick'){const pool=shuf([...shuf(mine.filter(m=>m.c!==it.c)),...shuf(others).slice(0,2)]).slice(0,3);
    return {id,prompt:`<span class="big">${sy(it)}</span>`,q:`「${sy(it)}」에 해당하는 모양을 고르세요${lenNote(vmm)}`,opts:shuf([it,...pool]).map(o=>({k:o.c,h:svMM(o,vmm)})),ans:it.c,why:`${sy(it)}은(는) ${lines(it)}으로 씁니다.`}}
}
function itemQ(id){
  const q=itemQ0(id),t=id.split(':')[0];q.kcs=kcsOf(id);
  {const m=/lennote">\(모든 보기는 (\d+)mm/.exec(q.q||'');if(m)q.ref=lenRef(+m[1])}
  if(t==='wsym'||t==='wpick'){const w=id.split(':')[1];q.why=`<span style="display:flex;align-items:center;gap:10px"><span style="width:96px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:4px">${wordSVG(w,44)}</span><span>${q.why}</span></span>`}
  if(['sym','pick'].includes(t)){const it=ALL.find(x=>x.c===id.split(':')[1]);
    q.why=`<span style="display:flex;align-items:center;gap:10px"><span style="width:52px;height:52px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--card)">${sv(it,44)}</span><span>${q.why}</span></span>`}
  return q;
}
/* 새 개념을 처음 만날 때 보여 주는 설명 카드 */
function introQ(kc){
  for(const f of FEATURES){if(f.intro&&f.intro[kc]){const r=f.intro[kc]();return {intro:true,kc,q:'새로 배워요',opts:[],kcs:[kc],...r}}}
  const [t,v]=kc.split(':');let prompt,text;
  if(t==='c'){const it=ALL.find(x=>x.c===v),g=it.g;
    prompt=sv(it,56);
    text=`<b>새 문자 「${v}」</b><br>${it.b===0?'곧은 선':'굽은 선'} · ${g.deg} · 쓰는 방향 ${DIR[g.id][2]}<br>같은 묶음: ${g.title}`}
  else if(t==='w'){prompt=wordSVG('가사',110);text=`<b>단어 이어쓰기</b><br>앞 글자의 끝에서 연필을 떼지 않고 다음 글자를 이어 씁니다.<br>글자마다 쓰는 방향이 있어요: 가나마 →, 다사라 ↙, 차자아 ↗, 하바타 ↘, 이파카 ↓<br>길이는 모음이 정합니다: ㅏㅓ 4mm · ㅗㅜ 8mm · ㅡ 16mm<br>예) 가사 = 가(→ 4mm) + 사(↙ 4mm)`}
  else if(t==='v'){prompt=ratioSVG(1,true);text=`<b>모음 길이</b><br>ㅏㅓ 4mm · ㅗㅜ 8mm · ㅡ 16mm, 즉 <b>1 : 2 : 4</b> 비율로 씁니다.<br><small>책의 mm는 실제 종이 기준이라 화면마다 크기가 달라요. 비율로 기억하세요.</small>`}
  else{const c=CONCEPTS[+v];prompt=+v===6?wordSVG('가사',110):+v===3?wordSVG('고기',110):+v===5?`<span style="display:flex;gap:16px;align-items:center"><span style="width:96px;text-align:center">${sv(ALL[0],40)}<small>가</small></span><span style="width:96px;text-align:center">${strokeDot(ALL.find(x=>x.c==='가'),40,'in')}<small>까 (점 표기)</small></span></span>`:`<div class="txt"><b>${RNAME[v]}</b></div>`;text=`<b>${RNAME[v]}</b><br>${c.w}`}
  return {intro:true,kc,prompt,q:'새로 배워요',text,opts:[],kcs:[kc]};
}
const kcQuestions=kc=>{const [t,v]=kc.split(':');for(const f of FEATURES){if(f.questions&&f.questions[kc])return f.questions[kc]()}
  if(t==='c')return ['sym:'+v,'pick:'+v];
  if(t==='v')return ['len:'+v];
  return +v===5?Object.keys(DD).flatMap(k=>['dd:'+k,'ddd:'+k]):[]};

/* ---------- 맞춤 선택: 필요한 개념을 익혔다면 그 개념들로 만든 문제도 나온다 ---------- */
function candidates(){
  const ids=[];
  ALL.forEach(x=>['sym','pick'].forEach(t=>ids.push(t+':'+x.c)));
  [4,8,16].forEach(m=>ids.push('len:'+m));Object.keys(DD).forEach(k=>ids.push('dd:'+k,'ddd:'+k));
  ALLW.forEach(w=>ids.push('wsym:'+w,'wpick:'+w));
  FEATURES.forEach(f=>Object.values(f.types||{}).forEach(ft=>ids.push(...ft.ids())));
  return [...new Set(ids)];
}
const avgS=kcs=>kcs.reduce((a,k)=>a+strength(k),0)/kcs.length;
function eligible(id){const k=kcsOf(id);return k.every(seen)&&(k.length===1||k.every(learned))}
/* ---------- 단어 문제의 오답 보기 고르기 ----------
   배운 개념만 아는 학습자가 "이 글자가 없는 보기"를 지워서 푸는 일이 없도록, 오답은 정답과 닮은 것을 고른다:
   같은 자음·같은 방향 묶음의 자음·같은 모음 길이·같은 받침 유무·같은 글자 수. 그리고 이미 다 익힌 개념으로 쓸 수 있는 단어를 먼저 쓴다.
   (새 영역의 단어 문제도 이 함수를 쓴다.) distinct: 그림이 같아지는 보기를 막는 키 함수. */
function wordSim(a,b){
  const A=[...a],B=[...b];let s=-2*Math.abs(A.length-B.length);
  const dec=ch=>{const n=ch.charCodeAt(0)-0xAC00;return n<0?null:{cho:Math.floor(n/588),jung:Math.floor(n%588/28),jong:n%28}};
  const grp=d=>{const it=ALL.find(x=>x.c===INIT[CHO[d.cho]]);return it&&it.g};
  for(let i=0;i<Math.min(A.length,B.length);i++){const x=dec(A[i]),y=dec(B[i]);if(!x||!y)continue;
    if(x.cho===y.cho)s+=3;else if(grp(x)&&grp(x)===grp(y))s+=1.5;
    if(MM[x.jung]===MM[y.jung])s+=1;if(x.jung===y.jung)s+=.5;
    if(x.jong===y.jong)s+=1;else if((x.jong>0)===(y.jong>0))s+=.5}
  const sh=new Set(A.map(c=>c.charCodeAt(0)>=0xAC00?CHO[Math.floor((c.charCodeAt(0)-0xAC00)/588)]:c));B.forEach(c=>{if(sh.has(c.charCodeAt(0)>=0xAC00?CHO[Math.floor((c.charCodeAt(0)-0xAC00)/588)]:c))s+=.5});
  return s}
/* 그림이 같거나 거의 구별되지 않는 보기 쌍을 막는다. sig(w)는 경로 문자열 또는 [{d,tx}] 목록.
   두 그림을 일정 간격으로 찍은 점들 사이의 최대 거리(양방향)가 TOL(약 1.2mm) 미만이면 같은 그림으로 본다. */
const SIGPTS=new Map();
function sigPts(sig){const key=typeof sig==='string'?sig:JSON.stringify(sig);let r=SIGPTS.get(key);if(r)return r;
  r=[];const parts=typeof sig==='string'?[{d:sig,tx:0}]:sig;
  for(const {d,tx} of parts)for(const sub of d.split(/(?=M)/).filter(Boolean)){
    const el=document.createElementNS('http://www.w3.org/2000/svg','path');el.setAttribute('d',sub);const L=el.getTotalLength();
    for(let t=0;t<=L+.01;t+=1.5){const q=el.getPointAtLength(Math.min(t,L));r.push([q.x+(tx||0),q.y])}}
  SIGPTS.set(key,r);return r}
const SIGTOL=3.6;
function sigNear(a,b){const A=sigPts(a),B=sigPts(b);
  const far=(P,Q)=>{for(const p of P){let m=1e9;for(const q of Q){const d=Math.hypot(p[0]-q[0],p[1]-q[1]);if(d<m)m=d;if(m<SIGTOL)break}if(m>=SIGTOL)return true}return false};
  return !far(A,B)&&!far(B,A)}
window.sigNear=sigNear;
/* 단어의 겉모양 패턴: 글자마다 첫 자음의 방향 묶음을 처음 나온 순서대로 번호로 바꾼 것(서서=00, 가사=01). full이면 받침 유무도 붙인다. 공백은 무시 */
function wordPat(w,full){const m=new Map();return [...w].filter(c=>c.charCodeAt(0)>=0xAC00).map(c=>{const n=c.charCodeAt(0)-0xAC00,it=ALL.find(x=>x.c===INIT[CHO[Math.floor(n/588)]]),g=it?it.g.id:'?';if(!m.has(g))m.set(g,m.size);return m.get(g)+(full&&n%28?'b':'')}).join('')}
function pickDistractors(key,pool,n=3,kcsFn=wordKcs,distinct){
  const same=(x,y)=>distinct?sigNear(distinct(x),distinct(y)):x===y;
  const cand=[...new Set(pool)].filter(w=>w!==key&&!same(w,key));
  const sc=new Map(cand.map(w=>[w,wordSim(key,w)+Math.random()*.8]));
  const ok=w=>{try{return kcsFn(w).every(learned)}catch(e){return true}};
  const out=[],take=(list,lim)=>{for(const w of list){if(out.length>=(lim||n))break;if(out.some(o=>same(o,w)))continue;out.push(w)}};
  /* 구조 소거 방지: 같은 자음 묶음이 반복되는지·받침이 있는지 같은 "겉모양 패턴"이 정답과 같은 오답을 최소 2개 넣는다 */
  const pk=wordPat(key),pf=wordPat(key,1),byS=l=>l.sort((x,y)=>sc.get(y)-sc.get(x));
  take(byS(cand.filter(w=>ok(w)&&wordPat(w,1)===pf)),Math.min(2,n));
  take(byS(cand.filter(w=>wordPat(w,1)===pf)),Math.min(2,n));
  take(byS(cand.filter(w=>ok(w)&&wordPat(w)===pk)),Math.min(2,n));
  take(cand.filter(ok).sort((x,y)=>sc.get(y)-sc.get(x)));take(cand.filter(w=>!out.includes(w)).sort((x,y)=>sc.get(y)-sc.get(x)));
  return out}
/* 새 개념의 첫 연습 문제 4개(문제 종류가 적으면 되풀이한다) */
function practiceIds(k){const base=shuf(kcQuestions(k).filter(id=>kcsOf(id).every(x=>x===k||seen(x))));const out=[];while(base.length&&out.length<4)out.push(base[out.length%base.length]);return out}
function makeSession(focus){
  const recent=new Set(S.recent||[]);
  let pool=candidates().filter(eligible);
  if(focus)pool=pool.filter(id=>kcsOf(id).includes(focus));
  /* 진도 속도: 먼저 본 개념(읽기 전용 카드 제외)이 모두 익숙해져야(LEARNED 이상) 새 개념을 연다.
     익숙하지 않은 개념이 있으면 복습만 하는 세션이 된다(풀 수 있는 문제가 너무 적을 때만 예외로 1개). 한 번에 1개씩, 모두 탄탄할 때만 2개. */
  const unstable=CURR.filter(k=>seen(k)&&!INFO.has(k)&&strength(k)<LEARNED).length;
  const seenK=CURR.filter(k=>seen(k)&&!INFO.has(k)),solid=seenK.length&&seenK.every(k=>strength(k)>=4);
  const cap=focus?(seen(focus)?0:1):(unstable===0?(solid&&pool.length>=12?2:1):(pool.length<6?1:0));
  const newK=focus?(seen(focus)?[]:[focus]):CURR.filter(k=>!seen(k)).slice(0,cap);
  const target=(focus?8:10),N=Math.max(4,target-newK.length*4);
  const score=id=>avgS(kcsOf(id))+(recent.has(id)?0.8:0)+Math.random()*0.5;
  const hard=pool.filter(id=>avgS(kcsOf(id))<2.2).sort((a,b)=>score(a)-score(b));
  const mid=shuf(pool.filter(id=>{const a=avgS(kcsOf(id));return a>=2.2&&a<3.6}));
  const easy=pool.filter(id=>avgS(kcsOf(id))>=3.6).sort((a,b)=>score(a)-score(b));
  const used={},picked=[];
  const take=(list,n,ignoreCap)=>{for(const id of list){if(n<=0)break;if(picked.includes(id))continue;const ks=kcsOf(id);if(!ignoreCap&&ks.some(k=>(used[k]||0)>=3))continue;picked.push(id);ks.forEach(k=>used[k]=(used[k]||0)+1);n--}};
  const nh=Math.ceil(N*.4),nm=Math.round(N*.3);
  take(hard,nh);take(mid,nm);take(easy,N-nh-nm);
  take(hard,N-picked.length);take(mid,N-picked.length);take(easy,N-picked.length);
  take(shuf(pool),N-picked.length,true);
  const qs=picked.map(itemQ);
  const first=qs.findIndex(q=>avgS(q.kcs)>=3.6),lead=first>=0?qs.splice(first,1):[];
  const intro=newK.flatMap(k=>[introQ(k),...practiceIds(k).map(itemQ)]);
  const out=[...lead,...intro,...shuf(qs)];
  if(!seen('w:1')){const wi=out.findIndex(q=>q.id&&q.id[0]==='w');if(wi>=0)out.splice(wi,0,introQ('w:1'))}
  return out;
}

/* ---------- 화면 ---------- */
const app=document.getElementById('app');
const topbar=(extra)=>`<div class="top">${extra||''}<span class="sp"></span><span class="stat" title="연속 학습일">${ICON.flame}${S.streak}</span><span class="stat" title="경험치">${ICON.xp}${S.xp}</span></div>`;
const dots=s=>'<span class="dots" aria-label="숙련도 '+s+'/5">'+[1,2,3,4,5].map(i=>`<i class="${i<=s?'on':''}"></i>`).join('')+'</span>';
const tile=(kc,inner)=>{const s=strength(kc),sn=seen(kc);return `<button class="tl ${sn?(s>=LEARNED?'ok':'wk'):'new'}" data-kc="${kc}" title="${kcName(kc)}">${inner}<span class="nm">${sn?'':'<small>아직 안 배움</small>'}</span>${dots(s)}</button>`};

function home(){
  const total=CURR.length,lc=CURR.filter(learned).length,sc=CURR.filter(seen).length;
  const wUnlocked=WORDS.filter(w=>wordKcs(w).every(learned)),wLocked=WORDS.filter(w=>!wordKcs(w).every(learned));
  const hint=wLocked.map(w=>({w,need:wordKcs(w).filter(k=>!learned(k))})).sort((a,b)=>a.need.length-b.need.length).slice(0,3);
  const tried=CURR.filter(seen),tot=tried.reduce((a,k)=>a+S.k[k].n,0),wr=tried.reduce((a,k)=>a+S.k[k].w,0);
  const hard=tried.filter(k=>S.k[k].w).sort((a,b)=>S.k[b].w-S.k[a].w).slice(0,3);
  const rules=CURR.filter(k=>k[0]==='r');
  app.innerHTML=`${topbar('<b>동방속기</b>')}
  <div class="hero"><h1>동방속기 연습장</h1><p>외운 것과 헷갈리는 것을 섞어 풀어요. 배운 문자로 쓸 수 있는 단어는 저절로 열립니다.</p></div>
  <button class="go" id="adp">${sc===0?'맞춤 학습 시작':'맞춤 학습 계속하기'}</button>
  <div class="card"><h3>익힌 개념 ${lc} / ${total}</h3><div class="bar" style="height:12px"><i style="width:${lc/total*100}%"></i></div>
   <p class="sub">배운 개념 ${sc}개 · 정답률 ${tot?Math.round((tot-wr)/tot*100):0}% (${tot}회)${hard.length?` · 자주 틀림: ${hard.map(k=>kcName(k)).join(', ')}`:''}</p></div>
  <div class="card"><h3>기본 문자</h3><p class="sub">칸을 누르면 설명을 다시 보고 그 문자만 연습할 수 있어요.</p>
   ${GROUPS.map(g=>`<div class="grow"><span class="gl">${g.deg}</span><div class="tg">${g.chars.map(([c,b])=>tile('c:'+c,`<span class="gi">${stroke(g.a,b,44)}</span><b>${c}</b>`)).join('')}</div></div>`).join('')}</div>
  <div class="card"><h3>모음 길이</h3><div class="tg">${[4,8,16].map(m=>tile('v:'+m,`<span class="gi" style="width:72px">${ruler(m)}</span><b style="font-size:14px">${VNAME[m]}</b>`)).join('')}</div></div>
  <div class="card"><h3>단어 이어쓰기 <small>${wUnlocked.length}/${WORDS.length}개 열림</small></h3>
   <p class="sub">책 17·18쪽 단어 중 필요한 문자를 모두 익힌 것만 문제로 나옵니다. 배운 글자로 만든 연습 단어(예: 가가)도 나와요.</p>
   <button class="link" data-show="w:1" style="margin:6px 0 0">이어쓰기 설명 보기</button><div class="chips">${wUnlocked.slice(0,8).map(w=>`<span class="chip">${w}</span>`).join('')||'<span class="sub">아직 열린 단어가 없어요.</span>'}${wUnlocked.length>8?`<span class="chip mute">+${wUnlocked.length-8}</span>`:''}</div>
   ${hint.length?`<p class="sub" style="margin-top:10px">다음에 열릴 단어: ${hint.map(h=>`<b>${h.w}</b> (${h.need.map(kcName).join(', ')} 필요)`).join(' · ')}</p>`:''}</div>
  <button class="unit" id="galb" style="margin:14px 0"><span class="badge" style="font-size:18px">✎</span><span><b>속기 단어 그림 보기</b><span>교재 단어의 이어쓰기 모양만 모아 봅니다.</span></span></button>
  <details class="card"><summary><b>쓰기 규칙</b> <small>${rules.filter(learned).length}/${rules.length} 익힘</small></summary>
   <div style="margin-top:8px">${rules.map(k=>`<button class="rr" data-show="${k}"><span>${kcName(k)}</span>${seen(k)?(INFO.has(k)?'<small>✓ 읽음</small>':dots(strength(k))):'<small>아직 안 읽음</small>'}</button>`).join('')}</div></details>
  ${FEATURES.filter(f=>f.section).map(f=>`<details class="card"><summary><b>${f.section.title}</b> <small>${f.section.kcs.filter(learned).length}/${f.section.kcs.length} 익힘</small></summary><div style="margin-top:8px">${f.section.kcs.map(k=>`<button class="rr" data-show="${k}"><span>${kcName(k)}</span>${seen(k)?(INFO.has(k)?'<small>✓ 읽음</small>':dots(strength(k))):'<small>아직 안 배움</small>'}</button>`).join('')}</div></details>`).join('')}
  <details class="card" id="calib"><summary><b>화면 길이 보정</b> <small>${PXMM.toFixed(2)}px = 1mm</small></summary>
   <p class="sub">카드(신용·체크카드)를 화면에 대고, 아래 막대 길이가 <b id="calref">카드 짧은 변(54mm)</b>과 같아지도록 슬라이더를 움직이세요. 기기와 앱마다 화면 크기 단위가 달라 한 번만 맞춰 두면 됩니다.</p>
   <div style="margin:12px 0 6px"><span id="calbar" style="display:block;height:10px;border-radius:5px;background:var(--stroke);width:${(54*PXMM).toFixed(0)}px"></span></div>
   <input id="calsl" type="range" min="3" max="9" step="0.05" value="${PXMM}" style="width:100%"><p class="sub"><span id="calv">54mm</span> · <button class="link" id="calreset" style="margin:0">기본값으로</button></p></details>
  <p class="src">내용 출처: 「동방속기 기초편」(이동근, 크라운출판사) 제1장. 문자와 단어 그림은 책의 도해(방향 화살표, 4·8·16mm 길이)를 바탕으로 다시 그린 것이라 손글씨 곡선과는 다릅니다.</p>`;
  app.querySelector('#adp').onclick=()=>start();
  {const sl=app.querySelector('#calsl'),bar=app.querySelector('#calbar'),sm=app.querySelector('#calib summary small');
   const cr=app.querySelector('#calref'),cv=app.querySelector('#calv');
   const ap=v=>{setPxmm(v);const w=bar.parentElement.clientWidth||300,mm=54*v<=w?54:27;bar.style.width=(mm*v).toFixed(0)+'px';cr.textContent=mm===54?'카드 짧은 변(54mm)':'카드 짧은 변의 절반(27mm)';cv.textContent=mm+'mm';sm.textContent=v.toFixed(2)+'px = 1mm'};
   sl.oninput=()=>ap(+sl.value);app.querySelector('#calib').addEventListener('toggle',()=>ap(PXMM));
   app.querySelector('#calreset').onclick=()=>{try{localStorage.removeItem('dongbang-pxmm')}catch(e){}PXMM=DEFAULT_PXMM;sl.value=PXMM;ap(PXMM)}}
  app.querySelector('#galb').onclick=gallery;
  app.querySelectorAll('.tl').forEach(b=>b.onclick=()=>showConcept(b.dataset.kc));
  app.querySelectorAll('[data-show]').forEach(b=>b.onclick=()=>showConcept(b.dataset.show));
  window.scrollTo(0,0);
}

function showConcept(kc){
  const q=introQ(kc),sn=seen(kc);
  app.innerHTML=`${topbar('<button class="x" id="back" aria-label="돌아가기">←</button>')}<div class="q"><h2>${kcName(kc)}</h2><div class="prompt">${q.prompt}</div><div class="introtx">${q.text}</div></div><div class="fb"><div class="in"><button class="go" id="go">${sn?'이 개념 연습하기':'배우기'}</button></div></div>`;
  app.querySelector('#back').onclick=home;
  app.querySelector('#go').onclick=()=>start(kc==='w:1'?undefined:kc);
  window.scrollTo(0,0);
}
const GALLERY=['아라','라아','가라고','나가보라','다가서다','라오스'];
function gallery(){
  try{history.replaceState(null,'','#gallery')}catch(e){}
  app.innerHTML=`${topbar('<button class="x" id="back" aria-label="돌아가기">←</button><b>속기 단어 그림</b>')}
  <p class="sub" style="margin:14px 0">교재 18쪽 단어를 같은 규칙(글자별 방향, 모음 길이 1 : 2 : 4, 반소원, 들여 쓰기)으로 그렸습니다. 그림은 모두 같은 배율이에요.</p>
  <div class="gal">${GALLERY.map(w=>`<div class="gc"><b>${w}</b><div class="gi2">${wordSVG(w,0,3)}</div></div>`).join('')}</div>`;
  app.querySelector('#back').onclick=()=>{try{history.replaceState(null,'',location.pathname)}catch(e){}home()};
  window.scrollTo(0,0);
}
let R=null;
function start(focus){
  const qs=makeSession(focus);
  S.recent=qs.filter(q=>q.id).map(q=>q.id);save();
  R={focus:focus||null,qs,i:0,hearts:5,right:0,xp:0,sel:null,checked:false,step:0};
  R.total=qs.filter(q=>!q.intro).length;
  render();
}
function render(){
  const q=R.qs[R.i];
  if(!q)return finish(true);
  const pct=R.total?R.step/R.total*100:0;
  const head='<div class="top"><button class="x" id="quit" aria-label="나가기">×</button><div class="bar"><i style="width:'+pct+'%"></i></div><span class="stat">'+ICON.heart+R.hearts+'</span></div>';
  if(q.intro){
    app.innerHTML=`${head}<div class="q"><h2>${q.q}</h2><div class="prompt">${q.prompt}</div><div class="introtx">${q.text}</div></div><div class="fb"><div class="in"><button class="go" id="go">알겠어요</button></div></div>`;
    app.querySelector('#quit').onclick=home;
    app.querySelector('#go').onclick=()=>{markSeen(q.kc);save();R.i++;render()};
    window.scrollTo(0,0);return;
  }
  app.innerHTML=`${head}
  <div class="q"><h2>${q.q}</h2><div class="prompt">${q.prompt}</div>${q.ref||''}
  <div class="opts ${q.one?'one':''}">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">${o.h}</button>`).join('')}</div></div>
  <div class="fb" id="fb"><div class="in"><button class="go" id="go" disabled>확인</button></div></div>`;
  R.sel=null;R.checked=false;
  fitQuestion();
  app.querySelector('#quit').onclick=home;
  app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(R.checked){if(Date.now()-R.at>400)next();return}if(R.sel===+b.dataset.i)return check();R.sel=+b.dataset.i;app.querySelectorAll('.opt').forEach(x=>x.classList.toggle('sel',x===b));app.querySelector('#go').disabled=false});
  app.querySelector('#go').onclick=check;
  window.scrollTo(0,0);
}
/* 질문·그림·보기·확인 버튼이 한 화면에 들어오도록 여백과 글자만 단계적으로 줄인다(그림 배율은 그대로). 그래도 넘치면 그대로 둔다. */
function fitQuestion(){
  const need=()=>{const o=app.querySelector('.opts'),fb=document.getElementById('fb');if(!o)return 0;return o.getBoundingClientRect().bottom+window.scrollY+(fb?fb.offsetHeight:92)+10-window.innerHeight};
  app.classList.remove('compact','tight');
  if(need()>0){app.classList.add('compact');if(need()>0)app.classList.add('tight')}
}
window.addEventListener('resize',()=>{if(R&&R.qs&&R.qs[R.i]&&!R.qs[R.i].intro&&!R.checked)fitQuestion()});
function check(){
  const q=R.qs[R.i],fb=app.querySelector('#fb');
  if(R.checked)return next();
  R.checked=true;
  const ok=q.opts[R.sel].k===q.ans;
  R.at=Date.now();
  app.querySelectorAll('.opt').forEach((b,i)=>{b.classList.remove('sel');if(q.opts[i].k===q.ans)b.classList.add('right');else if(i===R.sel)b.classList.add('wrong')});
  const first=!q.retried;if(first){recordKcs(q.kcs,ok);save()}
  if(ok){R.right++;if(first){R.xp+=10}R.step++}
  else{R.hearts--;if(first){q.retried=true;R.qs.push({...q,opts:shuf(q.opts)});R.total++}R.step++}
  fb.className='fb '+(ok?'good':'bad');
  fb.innerHTML=`<div class="in"><div class="msg">${ok?'정답입니다!'+(first?' +10 XP':''):'아쉬워요. 다시 나올 거예요.'}<div class="why">${q.why}</div></div><button class="go" id="go">계속하기</button></div>`;
  app.querySelector('#go').onclick=next;
  app.querySelector('.bar i').style.width=(R.step/R.total*100)+'%';
  app.querySelector('.stat').innerHTML=ICON.heart+R.hearts;
}
function next(){
  if(R.hearts<=0)return finish(false);
  R.i++;render();
}
function finish(win){
  if(win){const bonus=R.hearts===5?10:0;R.xp+=bonus;S.xp+=R.xp;touchStreak();save()}
  app.innerHTML=`${topbar('<b>동방속기</b>')}<div class="end"><h2>${win?'학습 완료!':'하트를 모두 썼어요'}</h2>
  <p style="color:var(--mute)">${win?'개념별 숙련도가 갱신됐어요.':'틀린 문제를 다시 보고 도전해 보세요. XP는 끝까지 풀어야 쌓입니다.'}</p>
  <div class="tiles"><div class="tile"><b>${R.xp}</b><span>획득 XP${win&&R.hearts===5?' (만점 +10)':''}</span></div><div class="tile"><b>${R.hearts}</b><span>남은 하트</span></div><div class="tile"><b>${S.streak}</b><span>연속 학습일</span></div></div>
</div>
  <div class="fb"><div class="in"><button class="go big" id="again">${win?'한 번 더':'다시 도전'}</button><button class="link" id="h" style="margin:0;padding:8px">대시보드로</button></div></div>`;
  /* 끝난 뒤 가장 자주 하는 일은 바로 이어 하기라서, 엄지가 닿는 화면 아래 고정 영역에 큰 주 버튼으로 두고 대시보드는 보조로 둔다 */
  app.querySelector('#again').onclick=()=>start(R.focus||undefined);
  app.querySelector('#h').onclick=home;
  window.scrollTo(0,0);
}
window.claude?.hot?.snapshot(()=>({R,S}));
function boot(d){if(location.hash==='#gallery')return gallery();if(d&&d.S)S=d.S;if(d&&d.R&&d.R.qs&&d.R.qs[d.R.i]){R=d.R;render()}else home()}
window.claude?.hot?.ready?window.claude.hot.ready(boot):boot(window.claude?.hot?.data);
