/* 받침 이어쓰기 영역 (교재 1장 5절). 개념 id 접두어 b:.
   이 파일은 ㅏ·ㅓ·ㅗ·ㅜ·ㅡ 계열(ㅐ계열이 아닌 모음)이 붙은 받침만 다룬다. 등록 형식은 src/app.js 의 "기능 확장 등록" 주석 참고.
   그림은 교재 규칙(앞 글자의 어디에서, 어떻게 이어 쓰는가)에서 계산해 다시 그린 것이며, 반소원·갈고리의 크기는 추정치다. */
(function(){
window.FEATURES=window.FEATURES||[];
const U=3.75; /* 1mm 를 화면 단위로 */
const JK={1:'g',4:'n',8:'l',16:'m',17:'m',19:'s',21:'ng'};   /* 받침 번호 → 받침군 */
const KNAME={n:'ㄴ',ng:'ㅇ',l:'ㄹ',s:'ㅅ',m:'ㅁㅂ',g:'ㄱ'};
const BSYL=ch=>{const n=ch.charCodeAt(0)-0xAC00,s=syl(ch);s.kind=JK[n%28]||null;s.jong=n%28;return s};
const grp=c=>ALL.find(a=>a.c===c);
/* 개념: b:1 ㄴ, b:2 ㅇ, b:3 ㄹ 원칙, b:4 ㄹ 예외, b:5 ㅅ 원칙, b:6 ㅅ 예외, b:7 ㅁㅂ, b:8 ㄱ 원칙, b:9 ㄱ 예외, b:10 총정리 */
const conceptOf=(kind,par)=>kind==='n'?'b:1':kind==='ng'?'b:2':kind==='m'?'b:7':kind==='l'?(par?'b:4':'b:3'):kind==='s'?(par?'b:6':'b:5'):(par?'b:9':'b:8');
const CNAME={'b:1':'ㄴ받침','b:2':'ㅇ받침','b:3':'ㄹ받침: 원칙(걸치기)','b:4':'ㄹ받침: 예외(반소원)','b:5':'ㅅ받침: 원칙(걸치기)','b:6':'ㅅ받침: 예외(큰 반소원)','b:7':'ㅁㅂ받침','b:8':'ㄱ받침: 원칙(머리 내밀기)','b:9':'ㄱ받침: 예외(갈고리)','b:10':'받침 이어쓰기 총정리'};

/* ---------- 그리기 ---------- */
const fx=n=>n.toFixed(1);
function bPath(word){
  let x=0,y=0,pts=[[0,0]],d='M0 0',prev=null,ps=null;
  const mv=(a,b)=>{x=a;y=b;d+=`M${fx(x)} ${fx(y)}`;pts.push([x,y])};
  for(const ch of word){
    const sy=BSYL(ch),it=grp(sy.c),g=it.g,v=DIR[g.id],L=LEN[sy.mm],a=g.a*Math.PI/180;
    if(sy.kind&&ps){
      const pg=ps.g,u=DIR[pg.id],[jx,jy]=jeong(pg.a),sd=[-jx,-jy],par=pg.id===g.id,sg=(v[0]*sd[0]+v[1]*sd[1])>=0?1:-1,[mx,my]=ps.mid;
      /* sd: 앞 글자 선의 오른쪽·아래쪽(반소원이 붙는 쪽). sg: 새 선이 향하는 쪽의 반대쪽으로 시작해야 가로지른다 */
      const k=sy.kind;
      if(k==='n')mv(ps.x1-u[0]*U+sd[0]*.7*U,ps.y1-u[1]*U+sd[1]*.7*U);
      else if(k==='ng')mv(mx+sd[0]*.7*U,my+sd[1]*.7*U);
      else if(k==='m')mv(ps.x1+u[0]*1.2*U,ps.y1+u[1]*1.2*U);
      else if(k==='l'||k==='s'){
        if(par){const D=k==='l'?6:12,qx=ps.x1+u[0]*D,qy=ps.y1+u[1]*D,sw=(u[0]*sd[1]-u[1]*sd[0])>0?0:1;
          d+=`A${D/2} ${D/2} 0 0 ${sw} ${fx(qx)} ${fx(qy)}`;pts.push([qx,qy],[(ps.x1+qx)/2+sd[0]*D/2,(ps.y1+qy)/2+sd[1]*D/2]);x=qx;y=qy}
        else if(k==='l')mv(mx-sg*sd[0]*U,my-sg*sd[1]*U);
        else mv(ps.x1-u[0]*1.2*U-sg*sd[0]*U,ps.y1-u[1]*1.2*U-sg*sd[1]*U)}
      else if(k==='g'){
        if(par){const D=7,ax=ps.x1-u[0]*D*.9+sd[0]*D*.8,ay=ps.y1-u[1]*D*.9+sd[1]*D*.8;
          d+=`L${fx(ax)} ${fx(ay)}`;pts.push([ax,ay]);x=ax;y=ay}
        else mv(ps.x1+u[0]*.6*U-sg*sd[0]*1.2*U,ps.y1+u[1]*.6*U-sg*sd[1]*1.2*U)}
    }else if(needsOffset(prev,sy)){const [nx,ny]=jeong(g.a);mv(x+nx*5-v[0]*3,y+ny*5-v[1]*3)}
    const x0=x,y0=y;
    if(HALF.has(sy.jung)&&!sy.kind){
      let nx=-Math.sin(a)*Math.sign(it.b),ny=-Math.cos(a)*Math.sign(it.b);
      if(!it.b){nx=Math.sin(a);ny=Math.cos(a);if(nx+ny>0){nx=-nx;ny=-ny}}
      const D=4,ex=x-nx*D,ey=y-ny*D,bx=-v[0],by=-v[1],dx=-nx,dy=-ny,sweep=(dx*by-dy*bx)<0?1:0;
      d+=`A${D/2} ${D/2} 0 0 ${sweep} ${fx(ex)} ${fx(ey)}`;pts.push([ex,ey],[(x+ex)/2+bx*D/2,(y+ey)/2+by*D/2]);x=ex;y=ey}
    const sx=x,sy0=y,x1=x+v[0]*L,y1=y+v[1]*L,kk=it.b*L*0.44,cx=(x+x1)/2+Math.sin(a)*kk,cy=(y+y1)/2+Math.cos(a)*kk;
    d+=it.b?`Q${fx(cx)} ${fx(cy)} ${fx(x1)} ${fx(y1)}`:`L${fx(x1)} ${fx(y1)}`;
    pts.push([x1,y1],[0.25*x+0.5*cx+0.25*x1,0.25*y+0.5*cy+0.25*y1]);
    ps={g,x1,y1,mid:it.b?[.25*sx+.5*cx+.25*x1,.25*sy0+.5*cy+.25*y1]:[(sx+x1)/2,(sy0+y1)/2]};
    x=x1;y=y1;prev=sy}
  return {d,pts};
}
function bBox(word){const {pts}=bPath(word);const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs)-8,y0=Math.min(...ys)-8;return {x0,y0,w:Math.max(...xs)-x0+8,h:Math.max(...ys)-y0+8}}
function bSVG(word,h=90,S){
  const {d}=bPath(word),b=bBox(word);
  const size=S?`width:${(b.w*S).toFixed(0)}px;height:${(b.h*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:${Math.max(110,Math.min(300,b.w*2.2))}px;height:${h}px`;
  return `<svg viewBox="${fx(b.x0)} ${fx(b.y0)} ${fx(b.w)} ${fx(b.h)}" style="${size}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${S?(3.4/S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
/* 규칙 시연용 두 글자: 앞 글자(구, 8mm 가로선) 뒤에 받침군 k 가 붙은 글자를 이어 쓴 모양. 한글로 보여 주지 않는 그림용 음절이다. */
const KJ={n:4,ng:21,l:8,s:19,m:16,g:1};
const demoWord=(kind,par)=>'구'+String.fromCharCode((par?'고':'도').charCodeAt(0)+KJ[kind]);

/* ---------- 단어 목록(실제 단어만) ---------- */
const BOK=new Set([0,4,8,13,18]);        /* 받침 글자의 모음: ㅏㅓㅗㅜㅡ */
const OKF=new Set([0,4,8,13,18,20,2,6,12,17]);
const BWORDS=['모든','그간','시간','차분한','가난','구분','사건','고난','노동','고궁','고향','고충','차창','가장','도장','소망','그들','수출','소홀','추출','도달','그걸','고갈','두돌','차출','가을','하늘','가감','고급','소감','차츰','보람','마음','사람','구름','바람','소금','다섯','이웃','가각','고국','도둑','차축','고독','다목적','호박죽'];
const okB=w=>[...w].every((ch,i)=>{const n=ch.charCodeAt(0)-0xAC00;if(n<0||n>=11172)return false;const s=syl(ch);if(!s.c)return false;const j=Math.floor(n%588/28),jg=n%28;
  if(jg===0)return OKF.has(j);if(i===0||!(jg in JK))return false;return BOK.has(j)});
const hasB=w=>[...w].some(ch=>(ch.charCodeAt(0)-0xAC00)%28);
const BW=BWORDS.filter(okB).filter(w=>hasB(w)&&(typeof drawsClean!=='function'||(pathSelfTouch(bPath(w).d).length===0)));
/* 단어가 쓰는 개념: 글자·모음 길이·반소원, 그리고 받침마다 앞 글자와의 관계(같은 방향이면 예외) */
function bKcs(w){const set=new Set(),cs=[...w].map(BSYL);
  cs.forEach((s,i)=>{set.add('c:'+s.c);if(s.mm>4)set.add('v:'+s.mm);if(HALF.has(s.jung))set.add('r:3');
    if(s.kind){const pg=grp(cs[i-1].c).g,par=pg.id===grp(s.c).g.id;set.add(conceptOf(s.kind,par))}
    else if(i>0&&!cs[i-1].kind&&needsOffset(cs[i-1],s))set.add('r:11')});
  return [...set]}
const bWhy=w=>{const cs=[...w].map(BSYL);const parts=[];
  cs.forEach((s,i)=>{if(!s.kind)return;const par=grp(cs[i-1].c).g.id===grp(s.c).g.id,c=conceptOf(s.kind,par);parts.push(`${[...w][i]}: ${CNAME[c]}`)});
  return w+' → '+parts.join(', ')};

/* ---------- 설명 카드 ---------- */
const demo=(k,par,S=2.4)=>bSVG(demoWord(k,par),0,S);
const INTRO={
 'b:1':()=>({prompt:demo('n',false),text:`<b>ㄴ받침 (ㅏ·ㅓ 계열 모음)</b><br>받침 ㄴ은 따로 그리지 않고 <b>앞 글자 끝에서 안쪽으로 1mm쯤 들어가 연필을 떼고</b>, 그 글자의 방향·길이대로 씁니다.<br>앞 글자 끝에서 이어지지 않고 떨어져 있는 것이 ㄴ받침의 표시예요. 예) 모든, 그간<br><small>그림은 규칙대로 다시 그린 것입니다.</small>`}),
 'b:2':()=>({prompt:demo('ng',false),text:`<b>ㅇ받침</b><br>앞 글자의 <b>허리(가운데)</b>에서 연필을 떼고 띄어 씁니다. 앞 글자 끝에서 쓰는 ㄴ받침과 시작 위치가 달라요.<br>예) 노동, 고궁`}),
 'b:3':()=>({prompt:demo('l',false),text:`<b>ㄹ받침 원칙</b><br>새 글자가 앞 글자의 <b>허리(가운데)를 가로질러 걸치게</b> 씁니다. 예) 그들, 수출, 소홀`}),
 'b:4':()=>({prompt:demo('l',true),text:`<b>ㄹ받침 예외 (이어쓰기가 어려울 때)</b><br>새 글자가 앞 글자와 <b>같은 방향</b>이라 걸쳐 쓸 수 없으면, 앞 글자 끝에 작은 <b>반소원</b>을 붙이고 이어 씁니다. 예) 그걸, 도달, 두돌<br><small>반소원 크기는 그림에서 추정했습니다.</small>`}),
 'b:5':()=>({prompt:demo('s',false),text:`<b>ㅅ받침 원칙</b><br>앞 글자의 <b>꼬리(끝)</b>에 걸쳐 씁니다. 허리에 걸치는 ㄹ받침과 걸치는 자리가 달라요.`}),
 'b:6':()=>({prompt:demo('s',true),text:`<b>ㅅ받침 예외</b><br>앞 글자와 같은 방향이라 걸칠 수 없으면, 앞 글자 끝에 ㄹ받침 때보다 <b>2배 이상 큰 반소원</b>을 붙이고 이어 씁니다.`}),
 'b:7':()=>({prompt:demo('m',false),text:`<b>ㅁ·ㅂ받침</b><br>받침을 따로 그리지 않고 <b>자기 글자 그대로</b>, 앞 글자 끝에서 <b>살짝 띄어</b> 씁니다. 예외가 없어요. (ㄴ받침은 안쪽으로 들어가고, ㅁㅂ받침은 끝에서 살짝 떨어집니다.)<br>예) 가감, 고급, 보람<br><small>ㅁ과 ㅂ은 모양이 같아요.</small>`}),
 'b:8':()=>({prompt:demo('g',false),text:`<b>ㄱ받침 원칙</b><br>앞 글자 끝에서, 이어 쓸 글자의 <b>머리를 살짝 내밀어</b> 시작합니다. 예) 호박죽, 다목적, 고독`}),
 'b:9':()=>({prompt:demo('g',true),text:`<b>ㄱ받침 예외</b><br>앞 글자와 같은 방향이라 머리를 내밀기 어려우면, 앞 글자 끝에서 <b>날카로운 갈고리(Z 모양)</b>를 만들며 제 글자를 씁니다. 예) 가각, 고국, 도둑, 차축<br><small>다른 받침은 ㅏ계열이 정측이지만 ㄱ받침 곡선문자는 사정이 다르니 교재 설명을 확인하세요.</small>`}),
 'b:10':()=>({prompt:`<div class="txt"><b>받침 이어쓰기 판별 순서</b></div>`,text:`<b>받침 이어쓰기 총정리</b><br>① 받침이 어느 군인가: ㄴ · ㅇ · ㄹ · ㅅ · ㅁㅂ · ㄱ<br>② 모음이 ㅏ계열(이 연습의 범위)인가, ㅐ계열인가<br>③ 앞 글자와 <b>같은 방향</b>이라 이어쓰기가 어려운가(예외)<br>ㄴ: 끝에서 안쪽 1mm · ㅇ: 허리 · ㄹ: 허리에 걸침 · ㅅ: 꼬리에 걸침 · ㅁㅂ: 끝에서 살짝 띄움 · ㄱ: 머리 내밀기<br>예외는 ㄹ(반소원)·ㅅ(큰 반소원)·ㄱ(갈고리) 셋뿐입니다.<br><small>이 연습에서는 ㅐ계열 받침은 아직 다루지 않습니다.</small>`})};

/* ---------- 문제 ---------- */
const KORD=['n','ng','l','s','m','g'];
function bjBuild(key,id){
  const c='b:'+key,info={'b:1':['n',false],'b:2':['ng',false],'b:3':['l',false],'b:4':['l',true],'b:5':['s',false],'b:6':['s',true],'b:7':['m',false],'b:8':['g',false],'b:9':['g',true]}[c];
  const [kind,par]=info,others=shuf(KORD.filter(k=>k!==kind)).slice(0,3);
  const ws=shuf([kind,...others]).map(k=>({k,h:demo(k,par,2.2)}));
  const prefix=par?'앞 글자와 방향이 같은 글자':'앞 글자와 방향이 다른 글자';
  return {id,prompt:`<span class="big" style="font-size:30px">${KNAME[kind]}받침</span>`,q:`앞 글자(가로선) 뒤에 ${KNAME[kind]}받침이 붙은, ${prefix}를 이어 쓴 모양은?`,opts:ws,ans:kind,why:INTRO[c]().text};
}
function bwBuild(t,w,id){
  const dist=x=>Math.abs(x.length-w.length)*2+Math.random();
  const ws=shuf([w,...BW.filter(x=>x!==w).sort((a,b)=>dist(a)-dist(b)).slice(0,3)]);
  const why=bWhy(w);
  if(t==='bsym')return {id,prompt:bSVG(w,130),q:'이 속기 단어는 무엇일까요?',opts:ws.map(x=>({k:x,h:`<span class="big" style="font-size:24px">${x}</span>`})),ans:w,why};
  const bx=ws.map(bBox),sc=Math.min(1.5,150/Math.max(...bx.map(b=>b.w)),80/Math.max(...bx.map(b=>b.h)));
  return {id,prompt:`<span class="big" style="font-size:48px">${w}</span>`,q:`「${w}」을(를) 이어 쓴 모양을 고르세요`,opts:ws.map(x=>({k:x,h:bSVG(x,0,sc)})),ans:w,why};
}
const CURR=['b:1','b:2','b:7','b:3','b:4','b:8','b:9','b:5','b:6','b:10'];
const types={
 bj:{kcs:k=>['b:'+k],build:bjBuild,ids:()=>['1','2','3','4','5','6','7','8','9'].map(k=>'bj:'+k)},
 bsym:{kcs:k=>bKcs(k),build:(k,id)=>bwBuild('bsym',k,id),ids:()=>BW.map(w=>'bsym:'+w)},
 bpick:{kcs:k=>bKcs(k),build:(k,id)=>bwBuild('bpick',k,id),ids:()=>BW.map(w=>'bpick:'+w)}
};
const intro={};CURR.forEach(c=>intro[c]=INTRO[c]);
const questions={};['1','2','3','4','5','6','7','8','9'].forEach(k=>questions['b:'+k]=()=>['bj:'+k]);
window.FEATURES.push({name:'batchim',curr:CURR,info:['b:10'],names:CNAME,intro,questions,types,
  section:{title:'받침 이어쓰기 (ㅏ계열)',kcs:CURR},
  wordKcs:()=>{}});
window.BATCHIM={bPath,bSVG,BW,bKcs,demoWord};
})();
