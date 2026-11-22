/* 동방속기 그리기 엔진: 문자 선, 단어 이어쓰기 경로, SVG 출력 */
const ICON={
 flame:'<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 2 3 4 1-3 1-6 1-9z" fill="#f08a1c"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z" fill="#e5484d"/></svg>',
 xp:'<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="#d99200"/></svg>'};

/* ---------- 문자 그리기 (책 p.11 방향별 5묶음) ---------- */
function stroke(a,bulge,len=44,w=4){
  const r=a*Math.PI/180,dx=Math.cos(r),dy=-Math.sin(r),px=Math.sin(r),py=Math.cos(r);
  const c=40,x1=c-dx*len/2,y1=c-dy*len/2,x2=c+dx*len/2,y2=c+dy*len/2;
  const k=bulge*len*0.22,cx=c+px*k*2,cy=c+py*k*2;
  const d=bulge?`M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`:`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  return `<svg viewBox="0 0 80 80" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${w}" stroke-linecap="round"/></svg>`;
}
function ratioSVG(mult,showAll){
  const U=22,rows=showAll?[[1,'ㅏㅓ'],[2,'ㅗㅜ'],[4,'ㅡ']]:[[1,'기준 (ㅏㅓ)'],[mult,'?']];
  const h=rows.length*26+8;
  return `<svg viewBox="0 0 200 ${h}" style="width:100%;max-width:300px;height:${h*1.5}px" aria-hidden="true">${rows.map((r,i)=>`<line x1="80" y1="${18+i*26}" x2="${80+U*r[0]}" y2="${18+i*26}" stroke="var(--stroke)" stroke-width="4" stroke-linecap="round"/><text x="2" y="${21+i*26}" font-size="9" fill="var(--mute)">${r[1]}</text>`).join('')}</svg>`;
}
function strokeDot(it,len=44,side='in'){
  const a=it.g.a,bulge=it.b,r=a*Math.PI/180,px=Math.sin(r),py=Math.cos(r),k=bulge*len*0.22;
  let dx,dy;
  if(bulge){const sg=Math.sign(bulge)*(side==='in'?-1:1);dx=40+px*k+px*sg*10;dy=40+py*k+py*sg*10}
  else{const [nx,ny]=jeong(it.g.a);const sg=side==='in'?1:-1;dx=40+nx*sg*10;dy=40+ny*sg*10}
  return stroke(a,bulge,len).replace('</svg>',`<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="3.2" fill="var(--stroke)"/></svg>`);
}
function ruler(mm){const px=mm*5;return `<svg viewBox="0 0 120 40" aria-hidden="true"><line x1="${60-px/2}" y1="20" x2="${60+px/2}" y2="20" stroke="var(--stroke)" stroke-width="4" stroke-linecap="round"/></svg>`}
const GROUPS=[
 {id:'g1',title:'가 나 마',deg:'180° (수평)',a:0,chars:[['가',0],['나',1],['마',-1]]},
 {id:'g2',title:'다 사 라',deg:'60° 기준',a:60,chars:[['다',0],['사',-1],['라',1]]},
 {id:'g3',title:'차 자 아',deg:'30° 기준',a:30,chars:[['차',0],['자',-1],['아',1]]},
 {id:'g4',title:'하 바 타',deg:'45° 기준',a:135,chars:[['하',0],['바',-1],['타',1]]},
 {id:'g5',title:'이 파 카',deg:'90° (수직)',a:90,chars:[['이',0],['파',-1],['카',1]]}
];
const ALL=[];GROUPS.forEach(g=>g.chars.forEach(([c,b])=>ALL.push({c,b,g})));
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const sv=(it,len)=>stroke(it.g.a,it.b,len);

/* ---------- 이어쓰기: 방향은 책 도해의 화살표, 길이는 모음(4·8·16mm) ---------- */
const DIR={g1:[1,0,'→'],g2:[-.5,.866,'↙'],g3:[.866,-.5,'↗'],g4:[.707,.707,'↘'],g5:[0,1,'↓']};
const INIT={'ㅇ':'아','ㄱ':'가','ㄴ':'나','ㄷ':'다','ㄹ':'라','ㅁ':'마','ㅂ':'바','ㅅ':'사','ㅈ':'자','ㅊ':'차','ㅋ':'카','ㅌ':'타','ㅍ':'파','ㅎ':'하'};
const REV=Object.fromEntries(Object.entries(INIT).map(([k,v])=>[v,k]));
const CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const HALF=new Set([2,6,12,17,20]);
const MM={0:4,4:4,2:4,6:4,8:8,13:8,12:8,17:8,18:16,20:16};
/* 단위 3개 = 1mm (4mm=12, 8mm=24, 16mm=48). 화면 배율은 RS() */
const LEN={4:12,8:24,16:48};
/* 교재 19쪽 특별문자(4mm): 「이(의)」=세로선, 「히(희)」=머리에 작은 갈고리가 달린 세로선. ㅇ+ㅣ, ㅎ+ㅣ는 일반 규칙(16mm 반소원)이 아니라 이 글자를 쓴다. */
function syl(ch){const n=ch.charCodeAt(0)-0xAC00,cho=Math.floor(n/588),jung=Math.floor(n%588/28);
  if(jung===20&&(CHO[cho]==='ㅇ'||CHO[cho]==='ㅎ'))return {c:'이',mm:4,jung,ch,sp:CHO[cho]==='ㅇ'?'i':'hi',nohook:CHO[cho]==='ㅇ'};
  return {c:INIT[CHO[cho]],mm:MM[jung],jung,ch}}
const isHook=s=>HALF.has(s.jung)&&!s.nohook;
const compose=(c,jung)=>String.fromCharCode(0xAC00+CHO.indexOf(REV[c])*588+jung*28);
/* 책 3-3-1: 같은 방향의 곧은 선이 이어지면 구별이 안 되므로, 다음 글자를 앞 글자의 정측(위·왼쪽)으로 조금 들어가 띄어 쓴다 */
function needsOffset(prev,cur){if(!prev)return false;const a=ALL.find(x=>x.c===prev.c),b=ALL.find(x=>x.c===cur.c);return a.g===b.g&&a.b===0&&b.b===0&&!isHook(cur)}
/* 직선의 정측(위·왼쪽) 법선. 교재 27쪽 도해: 수평은 위, 그 밖은 왼쪽 (45° 기준 ↘는 왼쪽 아래) */
function jeong(a){const r=a*Math.PI/180;let nx=Math.sin(r),ny=Math.cos(r);if(Math.abs(nx)<1e-6)return [0,-1];return nx>0?[-nx,-ny]:[nx,ny]}
const wordOffsets=w=>[...w].map((ch,i,arr)=>i>0&&needsOffset(syl(arr[i-1]),syl(ch)));
function wordPath(word){
  let x=0,y=0,pts=[[0,0]],d='M0 0',prev=null;
  for(const ch of word){const sy=syl(ch),it=ALL.find(a=>a.c===sy.c),g=it.g,v=DIR[g.id],L=LEN[sy.mm];
    let hooked=false;
    if(needsOffset(prev,sy)){const [nx,ny]=jeong(g.a);
            x=x+nx*4-v[0]*2.5;y=y+ny*4-v[1]*2.5;d+=`M${x.toFixed(1)} ${y.toFixed(1)}`;pts.push([x,y])}
    const a=g.a*Math.PI/180;
    if(isHook(sy)){ /* ㅑㅕㅛㅠㅣ: 시작할 때 정측에 반소원. 책처럼 12시에서 반시계 방향으로 6시까지 그리고, 거기서 선이 이어진다 */
      let nx=-Math.sin(a)*Math.sign(it.b),ny=-Math.cos(a)*Math.sign(it.b);
      if(!it.b){nx=Math.sin(a);ny=Math.cos(a);if(nx+ny>0){nx=-nx;ny=-ny}}
      const D=4,ex=x-nx*D,ey=y-ny*D,bx=-v[0],by=-v[1],dx=-nx,dy=-ny,sweep=(dx*by-dy*bx)<0?1:0;
      d+=`A${D/2} ${D/2} 0 0 ${sweep} ${ex.toFixed(1)} ${ey.toFixed(1)}`;pts.push([ex,ey],[(x+ex)/2+bx*D/2,(y+ey)/2+by*D/2]);x=ex;y=ey}
    const x1=x+v[0]*L,y1=y+v[1]*L,k=it.b*L*0.44,cx=(x+x1)/2+Math.sin(a)*k,cy=(y+y1)/2+Math.cos(a)*k;
    d+=it.b?`Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`:`L${x1.toFixed(1)} ${y1.toFixed(1)}`;
    pts.push([x1,y1],[0.25*x+0.5*cx+0.25*x1,0.25*y+0.5*cy+0.25*y1]);x=x1;y=y1;prev=sy}
  return {d,pts};
}
function wordBox(word){const {pts}=wordPath(word);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs)-8,y0=Math.min(...ys)-8;return {x0,y0,w:Math.max(...xs)-x0+8,h:Math.max(...ys)-y0+8}}
/* S가 같으면 글자 길이·굵기가 같은 배율로 그려진다(길이 비교 문제용) */
function wordSVG(word,h=90,S){
  S=Math.min(S||1e9,RS());
  const {d}=wordPath(word),b=wordBox(word);
  const size=S?`width:${(b.w*S).toFixed(0)}px;height:${(b.h*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:${Math.max(110,Math.min(300,b.w*2.2))}px;height:${h}px`;
  return `<svg viewBox="${b.x0.toFixed(1)} ${b.y0.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}" style="${size}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${S?(3.4/S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
/* 받침·ㅇ 없이 쓸 수 있는 일반 단어(연습용). 교재 단어와 함께 문제로 나옵니다. */

/* 단어 경로 검사: 선이 스스로 겹치거나 닿아 고리·잎사귀 모양이 되는지 본다.
   모든 단어(새 영역에서 추가하는 단어 포함)는 목록에 넣기 전에 drawsClean(word)를 통과해야 한다.
   떨어진 구간(호 길이 8 이상 차이)의 두 점이 2.6 이내로 가까우면 겹친 것으로 본다. 반환값은 문제가 없으면 true. */
function pathSelfTouch(d){
  if(typeof document==='undefined'||!document.createElementNS)return [];
  const pts=[];let idx=0,off=0;
  for(const sub of d.split(/(?=M)/).filter(Boolean)){
    const el=document.createElementNS('http://www.w3.org/2000/svg','path');el.setAttribute('d',sub);
    if(!el.getTotalLength)return [];
    const L=el.getTotalLength();
    for(let s=0;s<=L;s+=0.8){const p=el.getPointAtLength(s);pts.push([p.x,p.y,off+s,idx])}
    off+=L+100;idx++}
  /* 날카롭게 꺾인 모서리는 꼭짓점 근처에서만 가깝다. 선이 일정 길이 이상 나란히 붙어 있으면 잎사귀·겹침으로 본다. */
  let n=0;
  for(let i=0;i<pts.length;i++){
    for(let j=0;j<pts.length;j++){
      const a=pts[i],b=pts[j];if(i===j||(a[3]===b[3]&&Math.abs(b[2]-a[2])<8))continue;
      if(Math.hypot(a[0]-b[0],a[1]-b[1])<2.0){n++;break}}}
  return n>=7?[n]:[];
}
const drawsClean=word=>pathSelfTouch(wordPath(word).d).length===0;

/* ---------- 실제 길이(mm) 배율 ----------
   화면에서 1mm가 몇 CSS px인지(PXMM). 안드로이드 웹뷰는 1 CSS px를 1/160인치로 다뤄 기본값을 6.3으로 두고, 그 밖은 96dpi 기준 3.78.
   기기마다 다르므로 홈 화면의 "화면 길이 보정"에서 카드(짧은 변 54mm)에 맞춰 조정하면 저장되어 모든 그림에 적용된다.
   mm 길이를 보여 주는 그림은 반드시 mmPx(mm) 또는 svMM을 쓴다(새 영역 파일도 같다). */
const DEFAULT_PXMM=(typeof navigator!=='undefined'&&/Android/i.test(navigator.userAgent))?6.3:3.78;
let PXMM=(()=>{try{const v=parseFloat(localStorage.getItem('dongbang-pxmm'));if(v>1&&v<20)return v}catch(e){}return DEFAULT_PXMM})();
function setPxmm(v){PXMM=v;try{localStorage.setItem('dongbang-pxmm',String(v))}catch(e){}}
const mmPx=mm=>mm*PXMM;
/* 그림 단위 1개가 몇 px인지(실제 길이 배율). 모든 그림 함수는 이 값 이하로만 그려 mm가 어디서나 같은 크기가 되게 한다. */
const RS=()=>PXMM/3;
/* 문자 하나를 실제 mm 길이로 그린다. 단위 3개 = 1mm, 그림 칸은 60단위(=20mm) 정사각형 */
function svMM(it,mm){const u=Math.min(60,3*mm+16),px=u*PXMM/3,o=40-u/2;  /* 칸 크기는 길이에 맞춰 줄여 화면을 덜 차지한다(배율은 그대로) */
  return stroke(it.g.a,it.b,3*mm,1.4).replace('viewBox="0 0 80 80"',`viewBox="${o} ${o} ${u} ${u}" style="width:${px.toFixed(0)}px;height:${px.toFixed(0)}px"`)}
