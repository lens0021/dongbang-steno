/* 받침 이어쓰기 영역 (교재 1장 5절 받침 이어쓰기, 6절 받침이 앞에 나올 때). 개념 id 접두어 b:.
   ㅏ·ㅓ·ㅗ·ㅜ·ㅡ 모음, ㅑ모음(ㅑㅕㅛㅠㅣ, 반소원 모음)과 ㅐ모음(개모음)이 붙은 받침을 다룬다. ㄹ·ㅅ이 앞에 오는 경우는 다루지 않는다.
   ㅑ모음은 교재 5절 제목대로 ㅏ모음 규칙(「ㅏ·ㅑ 원칙」)으로 자리를 잡고 제 반소원을 정측에 단다(b:24).
   등록 형식은 src/app.js 의 "기능 확장 등록" 주석 참고. 그림은 교재 규칙에서 계산해 다시 그린 것이며 반소원·원·갈고리의 크기는 추정치다. */
(function(){
window.FEATURES=window.FEATURES||[];
const U=3.75; /* 1mm 를 화면 단위로 */
const JK={1:'g',2:'g',3:'g',9:'g',24:'g',4:'n',5:'n',6:'n',8:'l',12:'l',13:'l',15:'l',16:'m',17:'m',10:'m',11:'m',14:'m',18:'m',26:'m',19:'s',20:'s',7:'s',22:'s',23:'s',25:'s',27:'s',21:'ng'};   /* 받침 번호 → 받침군(교재 5-4~5-6 제목의 군) */
const KNAME={n:'ㄴ',ng:'ㅇ',l:'ㄹ',s:'ㅅ',m:'ㅁㅂ',g:'ㄱ'};
const AEMM={1:4,5:4,9:8,10:8,11:8,15:8,14:16,16:16};   /* ㅐ모음 길이(ㅐ=1 ㅔ=5 ㅘ=9 ㅙ=10 ㅚ=11 ㅝ=14 ㅞ=15 ㅟ=16) */
const BSYL=ch=>{const n=ch.charCodeAt(0)-0xAC00,s=syl(ch);s.kind=JK[n%28]||null;s.jong=n%28;if(s.jung===3||s.jung===7)s.jung-=2; /* ㅒ·ㅖ는 ㅐ·ㅔ와 같이 */s.ae=s.jung in AEMM;if(s.ae)s.mm=AEMM[s.jung];
  /* ㅇ+ㅘㅚㅟㅝ…(와·외·위·워)는 교재 30쪽 특별문자(이(의)와 같은 세로선, 8mm·4mm). 받침이 붙을 때도 같은 글자로 ㅐ모음 규칙(교재 43·51쪽 수원·의원·호황)을 따른다. */
  if(s.ae&&s.mm>4&&n>=0&&Math.floor(n/588)===11){s.c='이';s.mm=s.mm===8?8:4;s.spc=true}
  return s};
const grp=c=>ALL.find(a=>a.c===c);
/* 개념 id: 1~9 ㅏ모음(ㄴ·ㅇ·ㄹ원칙·ㄹ예외·ㅅ원칙·ㅅ예외·ㅁㅂ·ㄱ원칙·ㄱ예외), 10 총정리, 11~19 ㅐ모음(같은 순서),
   20 ㄴ·ㅇ 머리 원, 21 ㅁㅂ 머리 타원, 22 ㄱ 머리 갈고리, 23 ㄱ 곡선 주의 */
const BASE={n:'1',ng:'2',l:'3',s:'5',m:'7',g:'8'};
function conceptOf(kind,par,ae){const o=ae?10:0;
  if(kind==='n')return 'b:'+(1+o);if(kind==='ng')return 'b:'+(2+o);if(kind==='m')return 'b:'+(7+o);
  const b=+BASE[kind];return 'b:'+(b+(par?1:0)+o)}
const CNAME={'b:1':'ㄴ받침','b:2':'ㅇ받침','b:3':'ㄹ받침: 원칙(허리에 걸치기)','b:4':'ㄹ받침: 예외(반소원)','b:5':'ㅅ받침: 원칙(꼬리에 걸치기)','b:6':'ㅅ받침: 예외(큰 반소원)','b:7':'ㅁㅂ받침','b:8':'ㄱ받침: 원칙(머리 내밀기)','b:9':'ㄱ받침: 예외(갈고리)','b:10':'받침 이어쓰기 총정리',
 'b:11':'ㅐ모음 ㄴ받침(소원)','b:12':'ㅐ모음 ㅇ받침(큰 원)','b:13':'ㅐ모음 ㄹ받침: 원칙(머리에 걸치기)','b:14':'ㅐ모음 ㄹ받침: 예외(반측 반소원)','b:15':'ㅐ모음 ㅅ받침: 원칙(허리에 붙이기)','b:16':'ㅐ모음 ㅅ받침: 예외(반측 큰 반소원)','b:17':'ㅐ모음 ㅁㅂ받침','b:18':'ㅐ모음 ㄱ받침: 원칙','b:19':'ㅐ모음 ㄱ받침: 예외(반측 갈고리)',
 'b:24':'ㅑ모음 위의 받침(ㅏ모음 규칙 + 반소원)','b:20':'받침이 앞에: ㄴ·ㅇ 머리 원','b:21':'받침이 앞에: ㅁㅂ 머리 타원','b:22':'받침이 앞에: ㄱ 머리 갈고리','b:23':'ㄱ받침 곡선문자는 반대'};

/* ---------- 그리기 ---------- */
const fx=n=>n.toFixed(1);
const SIDE={};
/* 직선·곡선의 정측(교재 도해에서 반소원이 붙는 쪽의 기준): 직선은 jeong(), 곡선은 안쪽 */
function jside(it){const g=it.g,a=g.a*Math.PI/180;if(it.b)return [-Math.sign(it.b)*Math.sin(a),-Math.sign(it.b)*Math.cos(a)];return jeong(g.a)}
function bPath(word){
  let x=0,y=0,pts=[[0,0]],d='M0 0',prev=null,ps=null,idx=-1;
  const mv=(a,b)=>{x=a;y=b;d+=`M${fx(x)} ${fx(y)}`;pts.push([x,y])};
  const circle=(r,s,sw=1)=>{const tx=x+s[0]*2*r,ty=y+s[1]*2*r;d+=`A${r} ${r} 0 1 ${sw} ${fx(tx)} ${fx(ty)}A${r} ${r} 0 1 ${sw} ${fx(x)} ${fx(y)}`;pts.push([tx,ty],[x+s[0]*r+s[1]*r,y+s[1]*r+s[0]*r],[x+s[0]*r-s[1]*r,y+s[1]*r-s[0]*r])};
  const aeHook=(it,v,a,flip)=>{
    let nx=-Math.sin(a)*Math.sign(it.b),ny=-Math.cos(a)*Math.sign(it.b);
    if(!it.b){nx=Math.sin(a);ny=Math.cos(a);if(nx+ny>0){nx=-nx;ny=-ny}}
    if(flip){nx=-nx;ny=-ny}
    const D=4,ex=x-nx*D,ey=y-ny*D,bx=-v[0],by=-v[1],dx=-nx,dy=-ny,sweep=(dx*by-dy*bx)<0?1:0;
    d+=`A${D/2} ${D/2} 0 0 ${sweep} ${fx(ex)} ${fx(ey)}`;pts.push([ex,ey],[(x+ex)/2+bx*D/2,(y+ey)/2+by*D/2]);x=ex;y=ey};
  /* H: 혹의 깊이. 교재의 ㅅ받침 큰 반소원은 반원보다 깊은 U자(깊이≈너비)라서 H를 따로 받는다 */
  const bump=(u,sd,D,H=D/2)=>{const qx=ps.x1+u[0]*D,qy=ps.y1+u[1]*D,sw=(u[0]*sd[1]-u[1]*sd[0])>0?0:1,rot=Math.atan2(u[1],u[0])*180/Math.PI;
    d+=`A${D/2} ${H} ${fx(rot)} 0 ${sw} ${fx(qx)} ${fx(qy)}`;pts.push([qx,qy],[(ps.x1+qx)/2+sd[0]*H,(ps.y1+qy)/2+sd[1]*H]);x=qx;y=qy};
  for(const ch of word){
    idx++;
    const sy=BSYL(ch),it=grp(sy.c),g=it.g,v=DIR[g.id],L=LEN[sy.mm],a=g.a*Math.PI/180;
    let hook=sy.ae&&!sy.kind;              /* 받침 없는 ㅐ모음: 반측 반소원 */
    let afterHook=false;                   /* 받침 글자가 ㅁㅂ·ㄱ이면 제 모음 표시(ㅐ는 반측 반소원)를 그대로 한다 */
    let loop=null;
    if(sy.kind&&ps){
      const pg=ps.g,u=DIR[pg.id],[jx,jy]=jeong(pg.a),sd=[-jx,-jy],par=pg.id===g.id,sg=(v[0]*sd[0]+v[1]*sd[1])>=0?1:-1,[mx,my]=ps.mid,k=sy.kind,ae=sy.ae;
      /* sd: 앞 글자 선에서 반소원이 아래·오른쪽으로 붙는 쪽(교재 도해 그림 기준). ㅐ모음은 반대쪽 */
      const bs=ae?[-sd[0],-sd[1]]:sd;
      if(k==='n'){if(ae){circle(2.3,[-sd[0],-sd[1]])}else mv(ps.x1-u[0]*U+sd[0]*.7*U,ps.y1-u[1]*U+sd[1]*.7*U)}
      else if(k==='ng'){if(ae){circle(5.5,[-sd[0],-sd[1]])}else mv(mx+sd[0]*.7*U,my+sd[1]*.7*U)}
      else if(k==='m'){mv(ps.x1+u[0]*1.2*U,ps.y1+u[1]*1.2*U);if(ae)afterHook=true}
      else if(k==='l'||k==='s'){
        if(par)bump(u,bs,k==='l'?6:12,k==='l'?3:11);
        else if(k==='l')mv(ae?ps.x0-sg*sd[0]*U:mx-sg*sd[0]*U,ae?ps.y0-sg*sd[1]*U:my-sg*sd[1]*U);
        else if(ae)mv(mx,my);
        else mv(ps.x1-u[0]*.3*U-sg*sd[0]*U,ps.y1-u[1]*.3*U-sg*sd[1]*U)}   /* 교재 그듯·비교ㄹ: 꼬리(끝)에 걸침 — 선 끝에서 약 0.3mm 안쪽. ㄹ은 허리(중앙) */
      else if(k==='g'){
        if(par){const D=5,ax=ps.x1-u[0]*D*.5+bs[0]*D*.85,ay=ps.y1-u[1]*D*.5+bs[1]*D*.85;   /* 교재 그림의 갈고리는 선 위의 작은 홈(약 1.5mm). 4mm짜리 차(ㅊ)와 혼동되지 않게 작게 그린다 */
         
          d+=`L${fx(ax)} ${fx(ay)}`;pts.push([ax,ay]);x=ax;y=ay}
        else{mv(ps.x1+u[0]*.6*U-sg*sd[0]*1.2*U,ps.y1+u[1]*.6*U-sg*sd[1]*1.2*U);if(ae)afterHook=true}}
    }else if(sy.kind&&!ps){loop=sy.kind}   /* 받침이 앞에 나올 때: 머리에 원·타원·갈고리 */
    else if(needsOffset(prev,sy)){const [nx,ny]=jeong(g.a);mv(x+nx*4-v[0]*2.5,y+ny*4-v[1]*2.5)}
    if(loop){
      /* 6절: ㅏ모음은 정측, ㅐ모음은 반측에 붙인다. ㄱ받침 곡선문자만 반대(E20) */
      let s=jside(it);if(sy.ae)s=[-s[0],-s[1]];
      if(loop==='g'&&it.b)s=[-s[0],-s[1]];
      if(loop==='n')circle(2.3,s);
      else if(loop==='ng')circle(5.5,s);
      else if(loop==='m'){const ang=Math.atan2(v[1],v[0])*180/Math.PI,r=2.6,T=[x+s[0]*2*r,y+s[1]*2*r],sw=(v[0]*s[1]-v[1]*s[0])>0?0:1;
        d+=`L${fx(x-v[0]*3.5+s[0]*1.2)} ${fx(y-v[1]*3.5+s[1]*1.2)}M${fx(x)} ${fx(y)}`;
        d+=`A7 ${r} ${fx(ang)} 0 ${sw} ${fx(T[0])} ${fx(T[1])}A7 ${r} ${fx(ang)} 0 ${sw} ${fx(x)} ${fx(y)}`;pts.push(T,[x+v[0]*7,y+v[1]*7],[x-v[0]*7,y-v[1]*7])}
      else if(loop==='l'||loop==='s'){circle(loop==='l'?3:7,s)}
      else if(loop==='g'){const hx=x+s[0]*5.5-v[0]*1.5,hy=y+s[1]*5.5-v[1]*1.5;d+=`L${fx(hx)} ${fx(hy)}L${fx(x)} ${fx(y)}`;pts.push([hx,hy])}
    }
    if(hook||afterHook)aeHook(it,v,a,true);
    else if(isHook(sy)){
      aeHook(it,v,a,false)}   /* ㅑ모음: 받침이 붙어도 ㅏ모음 규칙으로 자리를 잡은 뒤 제 반소원을 정측에 단다(교재 5절 「ㅏ·ㅑ 원칙」) */
    const sx=x,sy0=y,x1=x+v[0]*L,y1=y+v[1]*L,kk=it.b*L*WCURVE,cx=(x+x1)/2+Math.sin(a)*kk,cy=(y+y1)/2+Math.cos(a)*kk;
    d+=it.b?`Q${fx(cx)} ${fx(cy)} ${fx(x1)} ${fx(y1)}`:`L${fx(x1)} ${fx(y1)}`;
    pts.push([x1,y1],[0.25*x+0.5*cx+0.25*x1,0.25*y+0.5*cy+0.25*y1]);
    ps={g,x0:sx,y0:sy0,x1,y1,mid:it.b?[.25*sx+.5*cx+.25*x1,.25*sy0+.5*cy+.25*y1]:[(sx+x1)/2,(sy0+y1)/2]};
    x=x1;y=y1;prev=sy}
  return {d,pts};
}
function bBox(word){const {pts}=bPath(word);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs)-8,y0=Math.min(...ys)-8;return {x0,y0,w:Math.max(...xs)-x0+8,h:Math.max(...ys)-y0+8}}
function bSVG(word,h=90,S){
  S=Math.min(S||1e9,RS());
  const {d}=bPath(word),b=bBox(word);
  const size=S?`width:${(b.w*S).toFixed(0)}px;height:${(b.h*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:${Math.max(110,Math.min(300,b.w*2.2))}px;height:${h}px`;
  return `<svg viewBox="${fx(b.x0)} ${fx(b.y0)} ${fx(b.w)} ${fx(b.h)}" style="${size}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${S?penW(S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
/* 규칙 시연용 글자: 한글로 보여 주지 않는 그림용 음절. 앞 글자 구(8mm 가로선) 뒤에 이어 쓴다. */
const KJ={n:4,ng:21,l:8,s:19,m:16,g:1};
const mk=(cho,jung,jong)=>String.fromCharCode(0xAC00+CHO.indexOf(cho)*588+jung*28+jong);
const demoWord=(kind,par,ae,front)=>(front||'구')+mk(par?'ㄱ':'ㄷ',ae?11:8,KJ[kind]);
const headWord=(kind,ae)=>mk('ㄷ',ae?11:8,KJ[kind]);

/* ---------- 단어 목록(실제 단어만) ---------- */
const BOK=new Set([0,4,8,13,18]);        /* 받침 글자의 모음: ㅏㅓㅗㅜㅡ */
const OKF=new Set([0,4,8,13,18,20,2,6,12,17]);
const HEADK=new Set(['n','ng','m','g']);
const BWORDS=['하룻밤','마룻바닥','모든','그간','시간','차분한','가난','구분','사건','고난','노동','고궁','고향','고충','차창','가장','도장','소망','그들','수출','소홀','추출','도달','그걸','고갈','두돌','차출','가을','하늘','가감','고급','소감','차츰','보람','마음','사람','구름','바람','소금','다섯','이웃','가각','고국','도둑','차축','고독','다목적','호박죽',
 /* ㅐ모음 */'고된','사관','주된','나뇐','이권','고관','가관','교황','로댕','비행장','투쟁','고갱','호황','후생','보낼','사활','부활','대궐','초과될','하겠다','오랬다','노랫말','어쨌든','헤맸다','되겠다','보냄','도마뱀','스냅','보탬','대책','시책','수확','구획','어획','주객','가객','고객','과객','개국',
 /* 받침이 앞에 올 때 */'간장','강당','건강','감자','각도','남자','당근','반도','상자','장갑','박수'];
const okB=w=>[...w].every((ch,i)=>{const n=ch.charCodeAt(0)-0xAC00;if(n<0||n>=11172)return false;const s=BSYL(ch);if(!s.c)return false;const j=Math.floor(n%588/28),jg=n%28;
  if(jg===0){if(s.ae)return s.c!=='아';return OKF.has(j)||(j===19&&!!s.sp)}
  if(!(jg in JK))return false;if(!(BOK.has(j)||s.ae||HALF.has(j)))return false;
  if(i===0)return HEADK.has(JK[jg]);return true});
const hasB=w=>[...w].some(ch=>(ch.charCodeAt(0)-0xAC00)%28);
/* 원(소원·큰 원·머리 원)은 스스로 닿는 모양이 규칙이라 겹침 검사(drawsClean)에서 뺀다. 그 밖의 단어는 검사를 통과해야 한다. */
const hasLoop=w=>[...w].some((ch,i)=>{const s=BSYL(ch);return s.kind&&((i===0)||(s.ae&&(s.kind==='n'||s.kind==='ng')))});
/* 교재 그림이 있는 단어(보기·응용)는 겹침 검사를 면제한다. 나머지 실제 단어는 검사를 통과해야 한다. */
const TB=new Set('모든 그간 시간 차분한 노동 고궁 고향 고충 차창 그들 수출 소홀 추출 도달 그걸 고갈 두돌 차출 가감 고급 소감 차츰 보람 가각 고국 도둑 차축 고독 다목적 호박죽 고된 사관 주된 나뇐 이권 고관 가관 교황 로댕 비행장 투쟁 고갱 호황 후생 보낼 사활 부활 대궐 초과될 하겠다 오랬다 노랫말 어쨌든 헤맸다 되겠다 보냄 도마뱀 스냅 보탬 대책 시책 수확 구획 어획 주객 가객 고객 과객 개국'.split(' '));
/* ㅅ받침 원칙은 앞 글자 꼬리에 걸쳐 쓰므로 한 곳에서 선이 만나는 것이 규칙이다(그 외 겹침은 계속 막는다) */
/* ㅑ모음 받침 글자는 제 반소원이 앞 선 곁에 붙는 것이 교재 그림에서도 정상이라, 작게 닿는 것(닿은 점 30개 이하)은 허용한다 */
const hasHalfB=w=>[...w].some((ch,i)=>{const s=BSYL(ch);return s.kind&&i>0&&isHook(s)&&!s.sp});
const touchOk=w=>{const t=pathSelfTouch(bPath(w).d),n=t.length;return n===0||(n<=2&&bKcs(w).includes('b:5'))||(hasHalfB(w)&&t[0]<=30)};
const BW0=BWORDS.filter(okB).filter(w=>hasB(w)&&(TB.has(w)||hasLoop(w)||typeof pathSelfTouch!=='function'||touchOk(w)));
/* 교재에서 모은 단어(BOOKCAND)는 받침 규칙으로 그릴 수 있고 선이 겹치지 않을 때만 쓴다(원 모양은 규칙이라 예외) */
/* 특별문자(이·히)에 받침을 붙이는 방법은 확인하지 못해 제외한다 */
const bOkNew=w=>okB(w)&&hasB(w)&&![...w].some(ch=>syl(ch).sp&&(ch.charCodeAt(0)-0xAC00)%28)&&(hasLoop(w)||typeof pathSelfTouch!=='function'||touchOk(w));
(window.WORDCHECK=window.WORDCHECK||{}).b=bOkNew;
(window.WORDSIG=window.WORDSIG||{}).b=w=>bPath(w).d;
const BW=[...new Set([...BW0,...(typeof BOOKCAND!=='undefined'?BOOKCAND:[]).filter(bOkNew)])];
/* 단어가 쓰는 개념 */
function bKcs(w){const set=new Set(),cs=[...w].map(BSYL);if(hasDD(w))set.add('r:5');
  cs.forEach((s,i)=>{set.add('c:'+s.c);if(s.spc)set.add('e:sp');if(s.ae){set.add('e:'+s.mm);set.add('e:hook')}else if(s.mm>4)set.add('v:'+s.mm);if(isHook(s)&&!s.sp)set.add('r:3');
    if(s.kind&&i===0){set.add(s.kind==='m'?'b:21':s.kind==='g'?'b:22':'b:20');if(s.kind==='g'&&grp(s.c).b)set.add('b:23')}
    else if(s.kind){const pg=grp(cs[i-1].c).g,par=pg.id===grp(s.c).g.id;set.add(conceptOf(s.kind,par,s.ae))}
    if(s.kind&&!s.ae&&isHook(s)&&!s.sp)set.add('b:24');
    else if(i>0&&!cs[i-1].kind&&needsOffset(cs[i-1],s))set.add('r:11')});
  return [...set]}
const bWhy=w=>{const cs=[...w].map(BSYL);const parts=[];
  cs.forEach((s,i)=>{if(!s.kind)return;const c=i===0?(s.kind==='m'?'b:21':s.kind==='g'?'b:22':'b:20'):conceptOf(s.kind,grp(cs[i-1].c).g.id===grp(s.c).g.id,s.ae);parts.push(`${[...w][i]}: ${CNAME[c]}`)});
  return w+' → '+parts.join(', ')};

/* ---------- 설명 카드 ---------- */
const demo=(k,par,ae,S=0,front)=>bSVG(demoWord(k,par,ae,front),0,S);
/* 같은 개념 연습이 똑같아 보이지 않도록, 앞 글자의 길이를 바꿔 가며 보여 준다(겹침 검사를 통과한 것만 쓴다) */
const FRONTS=['가','고','구'];
const touchN=(k,par,ae,f)=>{try{return pathSelfTouch(bPath(demoWord(k,par,ae,f)).d).length}catch(e){return 99}};
/* 기본 앞 글자('구')와 같은 정도(설계상 걸쳐 쓰는 접촉 포함)로만 겹치는 앞 글자만 쓴다 */
const frontOk=(k,par,ae,f)=>touchN(k,par,ae,f)<=touchN(k,par,ae,'구');
const pickFront=(k,par,ae)=>{const ok=FRONTS.filter(f=>frontOk(k,par,ae,f)&&!(f==='가'&&(k==='l'||k==='s')));  /* ㄹ(허리)·ㅅ(꼬리) 걸침 자리는 짧은 선(4mm)에서 구분이 안 돼 8mm 선만 쓴다 */return ok.length?ok[Math.random()*ok.length|0]:'구'};
const hd=(k,ae,S=0)=>bSVG(headWord(k,ae),0,S);
const NOTE='<br><small>그림은 규칙대로 다시 그린 것이고 크기는 추정입니다.</small>';
const INTRO={
 'b:1':()=>({prompt:demo('n',false),text:`<b>ㄴ받침 (ㅏ·ㅓ 모음)</b><br>ㄴ은 따로 그리지 않고 <b>앞 글자 끝에서 안쪽으로 1mm쯤 들어가 연필을 떼고</b>, 그 글자의 방향·길이대로 씁니다. 앞 글자와 떨어져 있는 것이 ㄴ받침의 표시예요. 예) 모든, 그간${NOTE}`}),
 'b:2':()=>({prompt:demo('ng',false),text:`<b>ㅇ받침</b><br>앞 글자의 <b>허리(가운데)</b>에서 연필을 떼고 띄어 씁니다. 끝에서 쓰는 ㄴ받침과 시작 위치가 달라요. 예) 노동, 고궁`}),
 'b:3':()=>({prompt:demo('l',false),text:`<b>ㄹ받침 원칙</b><br>새 글자가 앞 글자의 <b>허리(가운데)를 가로질러 걸치게</b> 씁니다. 예) 그들, 수출, 소홀`}),
 'b:4':()=>({prompt:demo('l',true),text:`<b>ㄹ받침 예외 (이어쓰기가 어려울 때)</b><br>새 글자가 앞 글자와 <b>같은 방향</b>이라 걸쳐 쓸 수 없으면, 앞 글자 끝에 작은 <b>반소원</b>을 붙이고 이어 씁니다. 예) 그걸, 도달, 두돌${NOTE}`}),
 'b:5':()=>({prompt:demo('s',false),text:`<b>ㅅ받침 원칙</b><br>앞 글자의 <b>꼬리(끝)</b>에 걸쳐 씁니다. 허리에 걸치는 ㄹ받침과 걸치는 자리가 달라요.`}),
 'b:6':()=>({prompt:demo('s',true),text:`<b>ㅅ받침 예외</b><br>앞 글자와 같은 방향이라 걸칠 수 없으면, 앞 글자 끝에 ㄹ받침 때보다 <b>2배 이상 큰 반소원</b>을 붙이고 이어 씁니다.${NOTE}`}),
 'b:7':()=>({prompt:demo('m',false),text:`<b>ㅁ·ㅂ받침</b><br>받침을 따로 그리지 않고 <b>자기 글자 그대로</b>, 앞 글자 끝에서 <b>살짝 띄어</b> 씁니다. 예외가 없어요. 띄어 쓴 글자의 모음은 반소원이 있나 없나로 확인합니다. 예) 가감, 고급, 보람<br><small>ㅁ과 ㅂ은 모양이 같아요.</small>`}),
 'b:8':()=>({prompt:demo('g',false),text:`<b>ㄱ받침 원칙</b><br>앞 글자 끝에서, 이어 쓸 글자의 <b>머리를 살짝 내밀어</b> 시작합니다. 예) 호박죽, 다목적, 고독`}),
 'b:9':()=>({prompt:demo('g',true),text:`<b>ㄱ받침 예외</b><br>앞 글자와 같은 방향이라 머리를 내밀기 어려우면, 앞 글자 끝에서 <b>날카로운 갈고리(Z 모양)</b>를 만들며 제 글자를 씁니다. 예) 가각, 고국, 도둑, 차축${NOTE}`}),
 'b:10':()=>({prompt:`<div class="txt"><b>받침 이어쓰기 판별 순서</b></div>`,text:`<b>받침 이어쓰기 총정리</b><br>① 받침이 어느 군인가: ㄴ · ㅇ · ㄹ · ㅅ · ㅁㅂ · ㄱ<br>② 모음이 ㅏ모음인가 ㅐ모음인가 (반소원이 없으면 ㅏ모음, 정측에 있으면 ㅑ모음, 반측에 있으면 ㅐ모음)<br>③ 앞 글자와 <b>같은 방향</b>이라 이어쓰기가 어려운가(예외)<br>ㅏ모음: ㄴ 끝에서 안쪽 1mm · ㅇ 허리 · ㄹ 허리에 걸침 · ㅅ 꼬리에 걸침 · ㅁㅂ 끝에서 살짝 띄움 · ㄱ 머리 내밀기<br>ㅐ모음: ㄴ 작은 원 · ㅇ 큰 원 · ㄹ 머리에 걸침 · ㅅ 허리에 붙임 · ㅁㅂ ㅏ모음과 같음 · ㄱ ㅏ모음과 같음<br>예외는 ㄹ·ㅅ·ㄱ 셋뿐입니다.<br>ㅑ모음(반소원 모음) 위의 받침은 ㅏ모음과 같은 규칙입니다.`}),
 'b:11':()=>({prompt:demo('n',false,true),text:`<b>ㅐ모음 ㄴ받침</b><br>앞 글자 끝에서 <b>작은 원(소원)</b>을 그리며 그 글자의 방향·길이대로 씁니다. 원이 반소원 자리를 대신하므로 반소원은 따로 붙이지 않아요. 예) 고된, 사관, 주된${NOTE}`}),
 'b:12':()=>({prompt:demo('ng',false,true),text:`<b>ㅐ모음 ㅇ받침</b><br>앞 글자 끝에서 ㄴ받침의 <b>2배 이상 큰 원</b>을 그리며 씁니다. 작은 원이면 ㄴ, 큰 원이면 ㅇ이에요. 예) 교황, 로댕, 비행장${NOTE}`}),
 'b:13':()=>({prompt:demo('l',false,true),text:`<b>ㅐ모음 ㄹ받침 원칙</b><br>앞 글자의 <b>머리(시작 쪽)</b>에 걸쳐 씁니다. ㅏ모음은 허리에 걸치는 것과 달라요. 예) 보낼, 사활, 부활`}),
 'b:14':()=>({prompt:demo('l',true,true),text:`<b>ㅐ모음 ㄹ받침 예외</b><br>앞 글자와 같은 방향이면 앞 글자 끝에서 <b>반측</b>(ㅏ모음의 반대쪽)에 반소원을 붙입니다.${NOTE}`}),
 'b:15':()=>({prompt:demo('s',false,true),text:`<b>ㅐ모음 ㅅ받침 원칙</b><br>앞 글자의 <b>허리에 반소원 없이 붙여</b> 씁니다. 예) 하겠다, 오랬다, 헤맸다`}),
 'b:16':()=>({prompt:demo('s',true,true),text:`<b>ㅐ모음 ㅅ받침 예외</b><br>앞 글자와 같은 방향이면 앞 글자 끝에서 <b>반측</b>에 큰 반소원을 붙입니다.${NOTE}`}),
 'b:17':()=>({prompt:demo('m',false,true),text:`<b>ㅐ모음 ㅁㅂ받침</b><br>ㅏ모음과 같이 자기 글자 그대로 앞 글자 끝에서 <b>살짝 띄어</b> 씁니다. 띄어 쓴 글자에 <b>반측 반소원</b>이 있으면 ㅐ모음이에요. 예) 보냄, 도마뱀, 스냅`}),
 'b:18':()=>({prompt:demo('g',false,true),text:`<b>ㅐ모음 ㄱ받침 원칙</b><br>ㅏ모음과 같이 앞 글자 끝에서 이어 쓸 글자의 <b>머리를 내밀어</b> 씁니다. 글자의 모음 표시(반측 반소원)는 그대로 합니다. 예) 대책, 시책, 수확, 주객`}),
 'b:19':()=>({prompt:demo('g',true,true),text:`<b>ㅐ모음 ㄱ받침 예외</b><br>같은 방향이면 앞 글자 끝에서 <b>반측</b>에 날카로운 갈고리를 만들며 씁니다. ㅏ모음은 정측, ㅐ모음은 반측이에요. 예) 가객, 고객, 과객${NOTE}`}),
 'b:24':()=>({prompt:`<span style="display:flex;gap:14px;align-items:flex-end">${['n','ng','m'].map(k=>`<span style="text-align:center">${bSVG('구'+mk('ㄷ',12,KJ[k]),0,2.4)}<small>${KNAME[k]}</small></span>`).join('')}</span>`,text:`<b>ㅑ모음 위의 받침</b><br>교재는 「ㅏ·ㅑ 모음」을 한 묶음으로 다룹니다. 받침 자리 규칙은 ㅏ모음과 똑같이 정하고(ㄴ 끝에서 안쪽, ㅇ 허리, ㅁㅂ 끝에서 살짝 띄움, ㄹ 허리에 걸침, ㅅ 꼬리에 걸침, ㄱ 머리 내밀기), 그 자리에서 글자의 <b>반소원을 정측에 달고</b> 제 방향·길이대로 씁니다. 받침이 맨 앞이면 머리 원 안쪽에 반소원이 이어집니다. 예) 자연, 과열, 지녔던${NOTE}`}),
 'b:20':()=>({prompt:`<span style="display:flex;gap:14px;align-items:flex-end"><span style="text-align:center">${hd('n',false)}<small>ㄴ</small></span><span style="text-align:center">${hd('ng',false)}<small>ㅇ</small></span></span>`,text:`<b>받침이 맨 앞에 올 때: ㄴ·ㅇ</b><br>앞 글자가 없으면 받침을 <b>글자의 머리에 원</b>으로 붙입니다. <b>ㄴ은 아주 작은 원(극소원), ㅇ은 ㄴ보다 2배 이상 큰 원</b>이에요. ㅏ모음은 정측, ㅐ모음은 반측에 붙입니다. 예) 간장, 강당${NOTE}`}),
 'b:21':()=>({prompt:`<span style="text-align:center">${hd('m',false)}</span>`,text:`<b>받침이 맨 앞에 올 때: ㅁㅂ</b><br>글자의 머리에 <b>머리카락이 달린 긴 타원</b>을 붙입니다. 예) 감자, 남자, 상자<br><small>ㅁ과 ㅂ은 같은 모양이지만 발음이 달라 따로 연습합니다.</small>${NOTE}`}),
 'b:22':()=>({prompt:`<span style="text-align:center">${hd('g',false)}</span>`,text:`<b>받침이 맨 앞에 올 때: ㄱ</b><br>글자의 머리에 <b>날카로운 갈고리</b>를 붙입니다. 예) 각도, 박수${NOTE}`}),
 'b:23':()=>({prompt:`<span style="display:flex;gap:14px;align-items:flex-end"><span style="text-align:center">${bSVG(mk('ㄴ',0,1),0,3)}<small>곡선 ㅏ</small></span><span style="text-align:center">${bSVG(mk('ㄴ',1,1),0,3)}<small>곡선 ㅐ</small></span></span>`,text:`<b>ㄱ받침 곡선문자 주의</b><br>다른 받침은 ㅏ모음이 정측, ㅐ모음이 반측이지만, <b>ㄱ받침이 붙은 곡선문자만 반대</b>입니다(ㅏ모음은 반측, ㅐ모음은 정측). 직선문자는 평소 원칙대로예요.${NOTE}`})};

/* ---------- 문제 ---------- */
const KORD=['n','ng','l','s','m','g'];
const BJINFO={'b:1':['n',false,false],'b:2':['ng',false,false],'b:3':['l',false,false],'b:4':['l',true,false],'b:5':['s',false,false],'b:6':['s',true,false],'b:7':['m',false,false],'b:8':['g',false,false],'b:9':['g',true,false],
 'b:11':['n',false,true],'b:12':['ng',false,true],'b:13':['l',false,true],'b:14':['l',true,true],'b:15':['s',false,true],'b:16':['s',true,true],'b:17':['m',false,true],'b:18':['g',false,true],'b:19':['g',true,true]};
function bjBuild(key,id){
  const kk='b:'+key,okw=w=>{try{const k=bKcs(w);return k.includes(kk)&&k.every(c=>c===kk||(typeof learned==='function'&&learned(c)))}catch(e){return false}};
  const cw=BW.filter(okw),one=cw.filter(w=>bKcs(w).length===1),pool=one.length?one:cw;
  if(pool.length)return bwBuild('bpick',pool[Math.random()*pool.length|0],id);   /* 실제 단어로 묻는다: 「가각」은? */
  const c='b:'+key,[kind,par,ae]=BJINFO[c],others=shuf(KORD.filter(k=>k!==kind)).slice(0,3);
  const fr='구',ws=shuf([kind,...others]).map(k=>({k,h:demo(k,par,ae,2.2,fr)}));   /* 보기마다 앞 글자 길이가 다르면 걸치는 자리를 비교할 수 없으므로 모두 같은 앞 글자로 */
  const prefix=par?'앞 글자와 방향이 같은 글자':'앞 글자와 방향이 다른 글자';
  return {id,prompt:`<span class="big" style="font-size:30px">${KNAME[kind]}받침${ae?' · ㅐ모음':''}</span>`,q:`앞 글자(가로선) 뒤에 ${ae?'ㅐ모음 붙은 ':''}${KNAME[kind]}받침이 오는, ${prefix}를 이어 쓴 모양은?`,opts:ws,ans:kind,why:INTRO[c]().text};
}
/* 받침이 앞에 올 때: 머리 모양(받침군 × 정측/반측) */
const HK={n:'b:20',ng:'b:20',m:'b:21',g:'b:22'};
function bhBuild(key,id){
  const [kind,aes]=key.split('|'),ae=aes==='1',all=[];
  ['n','ng','m','g'].forEach(k=>[0,1].forEach(e=>all.push([k,e===1])));
  const cand=all.filter(([k,e])=>!(k===kind&&e===ae)),pick=shuf(cand.filter(([k])=>k!==kind)).slice(0,2);
  const same=cand.find(([k,e])=>k===kind&&e!==ae);
  const opts=shuf([[kind,ae],same,...pick].filter(Boolean)).map(([k,e])=>({k:k+'|'+(e?1:0),h:hd(k,e,2.4)}));
  return {id,prompt:`<span class="big" style="font-size:30px">${KNAME[kind]}받침 · ${ae?'ㅐ모음':'ㅏ모음'}</span>`,q:`맨 앞 글자에 ${KNAME[kind]}받침이 붙을 때(${ae?'ㅐ모음':'ㅏ모음'}) 글자 머리 모양은?`,opts,ans:kind+'|'+(ae?1:0),why:INTRO[HK[kind]]().text};
}
function bwBuild(t,w,id){
  const ws=shuf([w,...pickDistractors(w,BW,3,x=>bKcs(x),x=>bPath(x).d)]);
  const why=bWhy(w);
  if(t==='bsym')return {id,prompt:bSVG(w,130),q:'이 속기 단어는 무엇일까요?',opts:ws.map(x=>({k:x,h:`<span class="big" style="font-size:24px">${x}</span>`})),ans:w,why};
  const bx=ws.map(bBox),sc=Math.min(RS(),150/Math.max(...bx.map(b=>b.w)),80/Math.max(...bx.map(b=>b.h)));
  return {id,prompt:`<span class="big" style="font-size:48px">${w}</span>`,q:`다음 중 「${w}」${(w.charCodeAt(w.length-1)-0xAC00)%28?'은':'는'}?`,opts:ws.map(x=>({k:x,h:bSVG(x,0,sc)})),ans:w,why};
}
const CURR=['b:1','b:2','b:7','b:3','b:4','b:8','b:9','b:5','b:6','b:11','b:12','b:17','b:13','b:14','b:18','b:19','b:15','b:16','b:10','b:20','b:21','b:22','b:23','b:24'];
const BJKEYS=Object.keys(BJINFO).map(c=>c.slice(2));
const BHKEYS=[];['n','ng','m','g'].forEach(k=>[0,1].forEach(e=>BHKEYS.push(k+'|'+e)));
const types={
 bj:{kcs:k=>['b:'+k],build:bjBuild,ids:()=>BJKEYS.map(k=>'bj:'+k)},
 bh:{kcs:k=>[HK[k.split('|')[0]]],build:bhBuild,ids:()=>BHKEYS.map(k=>'bh:'+k)},
 bsym:{kcs:k=>bKcs(k),build:(k,id)=>bwBuild('bsym',k,id),ids:()=>BW.map(w=>'bsym:'+w)},
 bpick:{kcs:k=>bKcs(k),build:(k,id)=>bwBuild('bpick',k,id),ids:()=>BW.map(w=>'bpick:'+w)}
};
const intro={};CURR.forEach(c=>intro[c]=INTRO[c]);
const questions={};BJKEYS.forEach(k=>questions['b:'+k]=()=>['bj:'+k]);
['n','ng'].forEach(k=>{});
questions['b:20']=()=>['bh:n|0','bh:n|1','bh:ng|0','bh:ng|1'];
questions['b:21']=()=>['bh:m|0','bh:m|1'];
questions['b:22']=()=>['bh:g|0','bh:g|1'];
window.FEATURES.push({name:'batchim',curr:CURR,info:['b:10','b:23','b:24'],names:CNAME,intro,questions,types,
  section:{title:'받침 이어쓰기',kcs:CURR},
  wordKcs:()=>{}});
window.BATCHIM={bPath,bSVG,BW,bKcs,demoWord,headWord};
})();
