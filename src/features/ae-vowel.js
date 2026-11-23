/* ㅐ모음(개모음: ㅐㅔㅘㅚㅟㅝ 등) 영역. 교재 1장 4절(4-1 반측 반소원, 4-2 거모음 이어쓰기, 4-3 이어쓰기가 곤란할 때).
   등록 형식은 src/app.js 의 "기능 확장 등록" 주석 참고. 공용 엔진은 수정하지 않고 이 파일에 그리기 함수를 따로 둔다.
   교재에 ㅇ+개모음(애·와·외·위·워)은 「특별문자」로 따로 있어 이 영역에서는 다루지 않는다. */
(function(){
window.FEATURES=window.FEATURES||[];
/* 개모음 중성 번호 → 길이(mm). ㅐ=1 ㅔ=5 ㅘ=9 ㅙ=10 ㅚ=11 ㅝ=14 ㅞ=15 ㅟ=16 */
const AEMM={1:4,5:4,9:8,10:8,11:8,15:8,14:16,16:16};
const PLAIN={4:0,8:8,16:18},HOOK={4:6,8:12,16:20};   /* 같은 길이의 ㅏ·ㅗ·ㅡ, ㅕ·ㅛ·ㅣ */
const AEREP={4:1,8:11,16:16};
const KC={4:'e:4',8:'e:8',16:'e:16'};
const AE_NAME={'e:hook':'개모음: 반측 반소원','e:4':'ㅐㅔ 4mm','e:8':'ㅘㅚ 8mm','e:16':'ㅟㅝ 16mm','e:link':'개모음 이어쓰기','e:sep':'이어쓰기가 곤란할 때(개모음)'};
const isAE=ch=>{const n=ch.charCodeAt(0)-0xAC00;return n>=0&&n%28===0&&(Math.floor(n%588/28) in AEMM)};
const okAE=w=>[...w].every(ch=>{const n=ch.charCodeAt(0)-0xAC00;if(!(n>=0&&n%28===0))return false;const j=Math.floor(n%588/28),ci=CHO[Math.floor(n/588)];
  if(!INIT[ci])return false;if(j in AEMM)return ci!=='ㅇ';return j in MM});
const item=(ch)=>{const s=syl(ch),j=s.jung;if(j in AEMM)return {c:s.c,mm:AEMM[j],kind:'ae'};return {c:s.c,mm:MM[j],kind:isHook(s)?'hook':'plain'}};
const grp=c=>ALL.find(x=>x.c===c);
const straight=c=>grp(c).b===0;
/* 그리기: 책 4-1(반측 반소원), 4-2(연필을 떼고 1mm 들어가 반소원 없이), 4-3(앞 글자 끝에서 제 문자 그대로) */
function aePath(items){
  let x=0,y=0,pts=[[0,0]],d='M0 0',prev=null;const fl={link:false,sep:false,off:false};
  for(const cur of items){const it=grp(cur.c),g=it.g,v=DIR[g.id],L=LEN[cur.mm],a=g.a*Math.PI/180;
    const sameStraight=prev&&grp(prev.c).g===g&&straight(prev.c)&&straight(cur.c);
    let hook=cur.kind==='hook'||cur.kind==='ae';
    if(cur.kind==='ae'&&prev){if(sameStraight){fl.sep=true}else{fl.link=true;hook=false}}
    const jump=prev&&((cur.kind==='ae'&&!sameStraight)||(cur.kind==='plain'&&sameStraight));
    if(cur.kind==='plain'&&sameStraight)fl.off=true;
    if(jump){const [nx,ny]=jeong(g.a);x=x+nx*4-v[0]*2.5;y=y+ny*4-v[1]*2.5;d+=`M${x.toFixed(1)} ${y.toFixed(1)}`;pts.push([x,y])}
    if(hook){
      let nx=-Math.sin(a)*Math.sign(it.b),ny=-Math.cos(a)*Math.sign(it.b);
      if(!it.b){nx=Math.sin(a);ny=Math.cos(a);if(nx+ny>0){nx=-nx;ny=-ny}}
      if(cur.kind==='ae'){nx=-nx;ny=-ny}   /* 개모음은 정측의 반대쪽(반측) */
      const D=4,ex=x-nx*D,ey=y-ny*D,bx=-v[0],by=-v[1],dx=-nx,dy=-ny,sweep=(dx*by-dy*bx)<0?1:0;
      d+=`A${D/2} ${D/2} 0 0 ${sweep} ${ex.toFixed(1)} ${ey.toFixed(1)}`;pts.push([ex,ey],[(x+ex)/2+bx*D/2,(y+ey)/2+by*D/2]);x=ex;y=ey}
    const x1=x+v[0]*L,y1=y+v[1]*L,k=it.b*L*0.44,cx=(x+x1)/2+Math.sin(a)*k,cy=(y+y1)/2+Math.cos(a)*k;
    d+=it.b?`Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`:`L${x1.toFixed(1)} ${y1.toFixed(1)}`;
    pts.push([x1,y1],[0.25*x+0.5*cx+0.25*x1,0.25*y+0.5*cy+0.25*y1]);x=x1;y=y1;prev=cur}
  return {d,pts,fl};
}
const itemsOf=w=>[...w].map(item);
function svgOf(items,h,S){
  S=Math.min(S||1e9,RS());
  const {d,pts}=aePath(items),xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs)-8,y0=Math.min(...ys)-8,w=Math.max(...xs)-x0+8,hh=Math.max(...ys)-y0+8;
  const size=S?`width:${(w*S).toFixed(0)}px;height:${(hh*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:${Math.max(110,Math.min(300,w*2.2))}px;height:${h}px`;
  return `<svg viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${w.toFixed(1)} ${hh.toFixed(1)}" style="${size}" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--stroke)" stroke-width="${S?penW(S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
const wordSvg=(w,h,S)=>svgOf(itemsOf(w),h,S);
const glyph=(c,mm,kind,S=0)=>svgOf([{c,mm,kind}],0,S);
const shapeKey=w=>aePath(itemsOf(w)).d;
const letterShape=(c,mm,kind)=>aePath([{c,mm,kind}]).d;
const flagsOf=w=>aePath(itemsOf(w)).fl;

/* 연습 단어. 앞쪽은 교재 응용·보기에 나오는 단어, 뒤쪽은 직접 고른 실제 단어 */
const BOOKW=['가내','가로채다','개재되어','개최해','개회사','게다가','개교해','고뇌','고래','과대해','궤도','괴리','괴테','교재대','구두쇠','구제해야','구좌','가게','고개','교과서','기개로','기과해서','대대로'];
const OWNW=['매미','배구','대구','개나리','쇠고기','회사','해마','최고','재고','채소','세모','네모','제기','배추','나래','되도록','하나'];
/* 교재에 그림이 있는 단어는 그대로, 직접 고른 단어는 선이 겹쳐 잎사귀가 되지 않는 것만(공용 pathSelfTouch를 개모음 경로에 적용) */
const AEW0=[...new Set([...BOOKW,...OWNW])].filter(w=>okAE(w)&&[...w].some(isAE)).filter(w=>BOOKW.includes(w)||pathSelfTouch(aePath(itemsOf(w)).d).length===0);
/* 교재에서 모은 단어(BOOKCAND, src/data/book-words.js)는 개모음 그리기 규칙으로 그릴 수 있고 선이 겹치지 않을 때만 쓴다 */
const aeOk=w=>okAE(w)&&[...w].some(isAE)&&pathSelfTouch(aePath(itemsOf(w)).d).length===0;
(window.WORDCHECK=window.WORDCHECK||{}).ae=aeOk;
(window.WORDSIG=window.WORDSIG||{}).ae=shapeKey;
const AEW=[...new Set([...AEW0,...(typeof BOOKCAND!=='undefined'?BOOKCAND:[]).filter(aeOk)])];
const wordKcsAE=w=>{const set=new Set(),fl=flagsOf(w);if(hasDD(w))set.add('r:5');
  [...w].forEach(ch=>{const s=syl(ch),j=s.jung;set.add('c:'+s.c);
    if(j in AEMM){set.add('e:hook');set.add(KC[AEMM[j]])}else{if(MM[j]>4)set.add('v:'+MM[j]);if(isHook(s)&&!s.sp)set.add('r:3')}});
  if(fl.link)set.add('e:link');if(fl.sep)set.add('e:sep');if(fl.off)set.add('r:11');
  return [...set]};
const wordWhyAE=w=>{const fl=flagsOf(w);
  return w+' = '+itemsOf(w).map((t,i)=>{const ch=[...w][i],g=grp(t.c).g;return `${ch}(${t.c} ${DIR[g.id][2]} ${t.mm}mm${t.kind==='ae'?', 반측 반소원':t.kind==='hook'?', 정측 반소원':''})`}).join(' + ')+'.'
   +(fl.link?' 앞 글자 끝에서 연필을 떼고 안으로 1mm 가량 들어가 반소원 없이 붙여 씁니다.':'')
   +(fl.sep?' 같은 방향의 곧은 선이 이어지므로 앞 글자 끝에서 개모음 글자를 반소원까지 그대로 시작합니다.':'')};
const chip=(ch)=>`<span class="big" style="font-size:24px">${ch}</span>`;
const ex=(svg,label)=>`<span style="display:inline-block;width:96px;text-align:center">${svg}<small style="display:block">${label}</small></span>`;
const withWhy=(why,w)=>`<span style="display:flex;align-items:center;gap:10px"><span style="width:96px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:4px">${wordSvg(w,44)}</span><span>${why}</span></span>`;
const CONS=[...new Set(Object.values(INIT))].filter(c=>c!=='아');
const ccLetter=(c,j)=>compose(c,j);
const letters=js=>CONS.flatMap(c=>js.map(j=>compose(c,j)));
const mmName={4:'ㅐ·ㅔ',8:'ㅘ·ㅚ',16:'ㅟ·ㅝ'};

const F={name:'ㅐ모음',
 curr:['e:hook','e:4','e:8','e:16','e:link','e:sep'],
 info:['e:link','e:sep'],
 names:AE_NAME,
 intro:{
  'e:hook':()=>({prompt:`<span style="display:flex;gap:12px;align-items:flex-end">${ex(glyph('다',4,'ae'),'대 (반측)')}${ex(glyph('다',4,'hook'),'뎌 (정측)')}</span>`,
    text:'<b>개모음: ㅐ ㅘ ㅚ ㅟ ㅝ …</b><br>시작할 때 <b>반측</b>에 반소원을 붙입니다. ㅑㅕㅛㅠㅣ는 정측, 개모음은 그 반대쪽이에요.<br>길이는 ㅐ 4mm, ㅘ·ㅚ 8mm, ㅟ·ㅝ 16mm입니다.'}),
  'e:4':()=>({prompt:`<span style="display:flex;gap:12px">${ex(glyph('가',4,'ae'),'개')}${ex(glyph('나',4,'ae'),'내')}${ex(glyph('다',4,'ae'),'대')}</span>`,
    text:'<b>ㅐ·ㅔ는 4mm</b><br>ㅏ·ㅓ와 같은 길이에 반측 반소원을 붙여 씁니다. ㅐ와 ㅔ는 같이 씁니다(내·네, 대·데).'}),
  'e:8':()=>({prompt:`<span style="display:flex;gap:12px">${ex(glyph('가',8,'ae'),'과')}${ex(glyph('나',8,'ae'),'놔')}${ex(glyph('다',8,'ae'),'돠')}</span>`,
    text:'<b>ㅘ·ㅚ는 8mm</b><br>ㅗ·ㅜ와 같은 길이에 반측 반소원을 붙입니다. ㅙ·ㅞ도 같은 모양으로 씁니다(과·괴, 놔·뇌).'}),
  'e:16':()=>({prompt:`<span style="display:flex;gap:12px">${ex(glyph('가',16,'ae'),'귀')}${ex(glyph('나',16,'ae'),'뉘')}${ex(glyph('다',16,'ae'),'뒤')}</span>`,
    text:'<b>ㅟ·ㅝ는 16mm</b><br>ㅡ와 같은 길이에 반측 반소원을 붙입니다(귀=궈, 뉘=눠, 뒤=둬).'}),
  'e:link':()=>({prompt:`<span style="display:flex;gap:12px">${ex(wordSvg('가내',0,2.4),'가내')}${ex(wordSvg('고래',0,2.4),'고래')}</span>`,
    text:'<b>개모음 이어쓰기</b><br>앞 글자 끝에서 연필을 떼고, 안으로 1mm 가량 들어가 <b>반소원 없이</b> 붙여 씁니다. 예) 가내, 고래, 고뇌.'}),
  'e:sep':()=>({prompt:`<span style="display:flex;gap:12px">${ex(wordSvg('가게',0,2.4),'가게')}${ex(wordSvg('고개',0,2.4),'고개')}${ex(wordSvg('대대로',0,1.6),'대대로')}</span>`,
    text:'<b>이어쓰기가 곤란할 때</b><br>이어쓰기대로 하면 안 될 때는 앞 글자 끝에서 제 문자를 그대로(반소원까지) 시작합니다. 교재 보기(가게·고개·교과서·기개로·대대로)는 같은 방향의 곧은 선이 이어지는 경우입니다.'})},
 questions:{
  'e:hook':()=>shuf(letters([1])).slice(0,3).map(l=>'eside:'+l).concat(shuf(letters([1,11,16])).slice(0,2).map(l=>'esym:'+l)),
  'e:4':()=>shuf(letters([1,5])).slice(0,3).map(l=>'elen:'+l),
  'e:8':()=>shuf(letters([9,11])).slice(0,3).map(l=>'elen:'+l),
  'e:16':()=>shuf(letters([14,16])).slice(0,3).map(l=>'elen:'+l),
  'e:link':()=>AEW.filter(w=>flagsOf(w).link).flatMap(w=>['ewsym:'+w,'ewpick:'+w]),
  'e:sep':()=>AEW.filter(w=>flagsOf(w).sep).flatMap(w=>['ewsym:'+w,'ewpick:'+w])},
 types:{
  /* 반측이냐 정측이냐: 같은 글자(ㅐ)의 모양 4개, 길이는 모두 같다 */
  eside:{kcs:(k)=>['c:'+syl(k).c,'e:hook','r:3'],
    ids:()=>letters([1]).map(l=>'eside:'+l),
    build:(k,id)=>{const c=syl(k).c,L=4,o=shuf(CONS.filter(x=>x!==c&&grp(x).g!==grp(c).g))[0];
      const opts=shuf([{k:'ok',h:glyph(c,L,'ae')},{k:'x1',h:glyph(c,L,'hook')},{k:'x2',h:glyph(c,L,'plain')},{k:'x3',h:glyph(o,L,'ae')}]);
      return {id,prompt:`<span class="big">${k}</span>`,q:`「${k}」에 해당하는 모양을 고르세요${lenNote(L)}`,opts,ans:'ok',
        why:`${k}은(는) ${c} 문자에 모음 ㅐ(4mm)를 쓰고, 시작할 때 <b>반측</b>에 반소원을 붙입니다. 정측에 붙이면 ㅑㅕ 모음이에요.`}}},
  /* 길이 고르기: 4·8·16mm 중 글자의 모음 길이에 맞는 모양 */
  elen:{kcs:(k)=>{const j=syl(k).jung;return ['c:'+syl(k).c,'e:hook',KC[AEMM[j]],'r:3']},
    ids:()=>letters([1,9,11,14,16]).map(l=>'elen:'+l),
    build:(k,id)=>{const s=syl(k),mm=AEMM[s.jung],c=s.c;
      const opts=shuf([4,8,16].map(m=>({k:m,h:glyph(c,m,'ae',1.6)})).concat([{k:'h',h:glyph(c,mm,'hook',1.6)}]));
      return {id,prompt:`<span class="big">${k}</span>`,q:`「${k}」에 해당하는 모양을 고르세요`,opts,ans:mm,
        why:`${k}의 모음 ${mmName[mm]}는 ${mm}mm이고 반측에 반소원을 붙입니다. 정측에 붙인 모양은 ㅑ모음이에요.`}}},
  /* 모양 → 글자 */
  esym:{kcs:(k)=>{const j=syl(k).jung;return ['c:'+syl(k).c,'e:hook',KC[AEMM[j]],'r:3']},
    ids:()=>letters([1,5,9,11,14,16]).map(l=>'esym:'+l),
    build:(k,id)=>{const s=syl(k),mm=AEMM[s.jung],c=s.c,other=[4,8,16].filter(m=>m!==mm)[0];
      const opts=shuf([k,compose(c,PLAIN[mm]),compose(c,HOOK[mm]),compose(c,AEREP[other])]);
      return {id,prompt:glyph(c,mm,'ae',2),q:'이 속기 글자는 무엇일까요?',opts:opts.map(w=>({k:w,h:chip(w)})),ans:k,
        why:`${k}은(는) ${c} 문자에 ${mm}mm 길이로 쓰고 반측에 반소원이 붙어 있습니다.`}}},
  /* 단어 */
  ewsym:{kcs:(k)=>wordKcsAE(k),ids:()=>AEW.map(w=>'ewsym:'+w),
    build:(k,id)=>{const key=shapeKey(k),pool=[...AEW,...ALLW].filter(w=>w!==k&&shapeKey(w)!==key);
      const real=pickDistractors(k,pool,3,wordKcsAE,shapeKey);
      return {id,prompt:wordSvg(k,130),q:'이 속기 단어는 무엇일까요?',opts:shuf([k,...real]).map(w=>({k:w,h:chip(w)})),ans:k,why:withWhy(wordWhyAE(k),k)}}},
  ewpick:{kcs:(k)=>wordKcsAE(k),ids:()=>AEW.map(w=>'ewpick:'+w),
    build:(k,id)=>{const key=shapeKey(k),pool=[...AEW,...ALLW].filter(w=>w!==k&&shapeKey(w)!==key);
      const real=pickDistractors(k,pool,3,wordKcsAE,shapeKey);
      const ws=shuf([k,...real]),sc=Math.min(RS(),150/Math.max(...ws.map(w=>{const p=aePath(itemsOf(w)).pts;return Math.max(...p.map(q=>q[0]))-Math.min(...p.map(q=>q[0]))+16})),80/Math.max(...ws.map(w=>{const p=aePath(itemsOf(w)).pts;return Math.max(...p.map(q=>q[1]))-Math.min(...p.map(q=>q[1]))+16})));
      return {id,prompt:`<span class="big" style="font-size:48px">${k}</span>`,q:`「${k}」을(를) 이어 쓴 모양을 고르세요`,opts:ws.map(w=>({k:w,h:wordSvg(w,0,sc)})),ans:k,why:withWhy(wordWhyAE(k),k)}}}},
 section:{title:'ㅐ모음(개모음)',kcs:['e:hook','e:4','e:8','e:16','e:link','e:sep']}};
F.after="b:6";window.FEATURES.push(F);
})();
