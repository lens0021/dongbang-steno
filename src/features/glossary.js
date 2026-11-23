/* 교재 용어 풀이. 용어는 교재 그대로 두고, 화면에 나온 용어만 골라 예시와 함께 설명한다.
   설명은 앱의 다른 개념 카드(교재 1장 3~6절 내용)에서 확인된 것만 쓴다. GLOSS(html, open)은 풀이 상자 HTML을 돌려준다(없으면 ''). */
const GL=[
 {t:/[ㅏㅐㅑ]계열/,n:'ㅏ계열 · ㅑ계열 · ㅐ계열 (모음 계열)',s:'모음 계열',h:
  '모음 글자에 <b>반소원(작은 원의 반쪽)</b>이 있는지, 어느 쪽에 있는지로 나눈 묶음이에요.<br>'
 +'· <b>ㅏ계열</b>: 반소원이 <b>없는</b> 모음 ㅏ ㅓ ㅗ ㅜ ㅡ → 나·너·노·누·느<br>'
 +'· <b>ㅑ계열</b>: <b>정측</b>에 반소원이 있는 모음 ㅑ ㅕ ㅛ ㅠ ㅣ → 냐·녀·뇨·뉴·니<br>'
 +'· <b>ㅐ계열</b>(개모음): <b>반측</b>에 반소원이 있는 모음 ㅐ ㅔ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ → 내·네·과·괴·귀<br>'
 +'「ㅐ계열 모음의 ㅁ받침」은 보냄의 <b>냄</b>, 도마뱀의 <b>뱀</b>처럼 ㅐ계열 모음 글자에 ㅁ받침이 붙은 경우예요.'},
 {t:/받침/,n:'받침',h:
  '글자 아래에 붙는 자음이에요. 간·강·갈·갓·감·각의 ㄴ·ㅇ·ㄹ·ㅅ·ㅁ·ㄱ.<br>'
 +'속기에서는 받침을 따로 쓰지 않고, <b>받침이 붙은 글자(뒤 글자)</b>를 앞 글자에 어떻게 이어 쓰느냐로 나타내요. 예) 모든 = 모 + <b>든</b>(ㄴ받침이 붙은 글자), 보람 = 보 + <b>람</b>(ㅁ받침).<br>'
 +'「ㅁㅂ받침」은 ㅁ·ㅂ을 한 모양으로 쓰는 받침이에요(감·밥).'},
 {t:/이어쓰기|이어 쓰/,n:'이어쓰기',h:'앞 글자 끝에서 <b>연필을 떼지 않고</b> 다음 글자를 이어 쓰는 방법이에요. 예) 고기, 가기. 받침이 있으면 이어 쓰는 자리·모양이 달라져서 받침을 구별해요.'},
 {t:/정측|반측/,n:'정측 · 반측',h:'선의 어느 쪽인지를 말해요. <b>반측은 정측의 반대쪽</b>입니다. 곡선문자는 곡선의 안쪽이 정측이에요. 그래서 ㅑ계열은 정측, ㅐ계열은 반측에 반소원이 붙습니다(예: 뎌=정측, 대=반측).'},
 {t:/반소원|소원|큰 원|극소원|작은 원/,n:'반소원 · 소원 · 큰 원',h:'<b>반소원</b>은 작은 원을 반만 그린 모양이에요. 받침에서는 이 반소원이나 원의 <b>크기</b>가 받침 종류의 표시가 됩니다. 예) ㅐ계열에서 <b>작은 원 = ㄴ</b>, 그보다 <b>2배 이상 큰 원 = ㅇ</b>. 정확한 크기는 이 앱 그림에서 추정한 값이에요.'},
 {t:/머리|허리|꼬리/,n:'머리 · 허리 · 꼬리',h:'받침을 이어 쓸 때 <b>앞 글자 선의 어느 자리인지</b>를 가리키는 교재 용어예요. <b>머리</b>는 선의 시작 부분, <b>허리</b>는 가운데, <b>꼬리</b>는 끝 부분입니다. 예) ㅏ계열 ㄹ받침은 앞 글자의 허리(가운데)에 걸치고, ㅅ받침은 꼬리(끝 부분)에 걸쳐 써요.'},
 {t:/갈고리/,n:'갈고리',h:'선 끝을 날카롭게 꺾은 모양이에요. ㄱ받침에서 같은 방향의 글자가 이어질 때 Z 모양 갈고리를 만들어요. 예) 가각, 고국.'},
 {t:/같은 방향/,n:'같은 방향',h:'앞 글자와 뒤 글자가 같은 방향의 곧은 선이라 걸치거나 내밀어 구별하기 어려운 경우예요. 이때 원칙 대신 <b>예외</b> 모양(반소원·큰 반소원·갈고리)을 써요. 예) 그걸, 가각.'}
];
const GLOSS=(src,open)=>{
  const txt=String(src||'').replace(/<[^>]*>/g,' ');
  const hit=GL.filter(g=>g.t.test(txt)).slice(0,4);
  if(!hit.length)return '';
  return `<details class="gloss"${open?' open':''}><summary>용어 풀이 (${hit.map(g=>g.s||g.n.split(' ')[0]).join('·')})</summary>${hit.map(g=>`<div class="gli"><b>${g.n}</b><br>${g.h}</div>`).join('')}</details>`};

/* ---------- 용어 문제: 용어가 가리키는 것을 실제 단어·글자에서 찾게 한다 ----------
   모음 계열(ㅏ·ㅑ·ㅐ)과 받침 종류를 글자 구조에서 계산하므로 목록의 단어만 맞으면 정답이 틀릴 수 없다. */
(function(){
const AEJ=new Set([1,5,9,10,11,14,15,16]),YAJ=new Set([2,6,12,17,20]);
const JKM={1:'g',4:'n',8:'l',16:'m',17:'m',19:'s',21:'ng'};
const KN={n:'ㄴ',ng:'ㅇ',l:'ㄹ',s:'ㅅ',m:'ㅁ·ㅂ',g:'ㄱ'};
const KC={a:{n:'b:1',ng:'b:2',l:'b:3',s:'b:5',m:'b:7',g:'b:8'},ae:{n:'b:11',ng:'b:12',l:'b:13',s:'b:15',m:'b:17',g:'b:18'}};
const parse=ch=>{const n=ch.charCodeAt(0)-0xAC00,jung=Math.floor(n%588/28),jong=n%28;return {ch,fam:AEJ.has(jung)?'ae':YAJ.has(jung)?'ya':'a',kind:JKM[jong]||null}};
const WORDS=['보냄','도마뱀','스냅','고된','사관','주된','교황','로댕','비행장','대책','시책','수확','주객','보낼','사활','부활','하겠다','오랬다','헤맸다',
 '모든','그간','노동','고궁','그들','수출','소홀','가감','고급','보람','호박죽','다목적','고독','가각','고국'];
const INF=WORDS.map(w=>({w,s:[...w].map(parse)})).filter(x=>x.s.every(p=>!(p.kind&&p.fam==='ya')));
const has=(x,fam,kind)=>x.s.some(p=>p.kind===kind&&p.fam===fam);
const FN={a:'ㅏ계열',ae:'ㅐ계열'};
const lab=x=>x.s.filter(p=>p.kind).map(p=>`${p.ch}(${FN[p.fam]} 모음 + ${KN[p.kind]}받침)`).join(', ');
const pickN=(a,n)=>shuf(a).slice(0,n);
const PAIRS=[];['a','ae'].forEach(f=>Object.keys(KN).forEach(k=>{if(INF.some(x=>has(x,f,k))&&INF.filter(x=>!has(x,f,k)).length>=3)PAIRS.push(f+'|'+k)}));
function gw(key,id){
  const [f,k]=key.split('|'),good=pickN(INF.filter(x=>has(x,f,k)),1)[0];
  const near=INF.filter(x=>!has(x,f,k)&&x.s.some(p=>p.kind&&(p.kind===k||p.fam===f)));
  const rest=INF.filter(x=>!has(x,f,k)&&!near.includes(x));
  const bad=[...pickN(near,2),...pickN(rest,3)].slice(0,3);
  const all=shuf([good,...bad]);
  return {id,prompt:`<div class="txt"><b>${FN[f]} 모음 글자에 ${KN[k]}받침이 붙은 글자</b>가 있는 단어는?</div>`,q:'용어에 맞는 단어를 고르세요',
   opts:all.map(x=>({k:x.w,h:`<span class="big" style="font-size:24px">${x.w}</span>`})),ans:good.w,
   why:all.map(x=>`${x.w}: ${lab(x)||'받침 글자 없음'}`).join('<br>')};
}
/* 글자 하나: 모음 계열 */
const SYL={a:['나','너','노','누','느','가','도','무'],ya:['냐','녀','뇨','뉴','니','갸','료','유'],ae:['내','네','과','괴','귀','개','대','뇌']};
function gc(key,id){
  const t=key,good=pickN(SYL[t],1)[0],others=Object.keys(SYL).filter(x=>x!==t);
  const bad=[...pickN(SYL[others[0]],1),...pickN(SYL[others[1]],1),...pickN(SYL[others[Math.random()*2|0]],1)];
  const all=shuf([good,...bad]);
  return {id,prompt:`<div class="txt"><b>${FN[t]||'ㅑ계열'} 모음</b>이 들어 있는 글자는?</div>`,q:'용어에 맞는 글자를 고르세요',
   opts:all.map(c=>({k:c,h:`<span class="big" style="font-size:30px">${c}</span>`})),ans:good,
   why:all.map(c=>`${c}: ${({a:'ㅏ계열',ya:'ㅑ계열',ae:'ㅐ계열'})[parse(c).fam]}`).join(' · ')};
}
const SB={n:['간','문','돈','산'],ng:['강','공','동','방'],l:['갈','달','물','불'],s:['갓','옷','낫','빗'],m:['감','밤','집','숨'],g:['각','박','목','국']};
function gb(key,id){
  const good=pickN(SB[key],1)[0],ks=Object.keys(SB).filter(x=>x!==key);
  const bad=pickN(ks,3).map(k=>pickN(SB[k],1)[0]),all=shuf([good,...bad]);
  const nm=c=>KN[parse(c).kind]+'받침';
  return {id,prompt:`<div class="txt"><b>${KN[key]}받침</b>이 붙은 글자는?</div>`,q:'용어에 맞는 글자를 고르세요',
   opts:all.map(c=>({k:c,h:`<span class="big" style="font-size:30px">${c}</span>`})),ans:good,why:all.map(c=>`${c}: ${nm(c)}`).join(' · ')};
}
const types={
 gw:{kcs:k=>{const [f,x]=k.split('|');return [KC[f][x]]},build:gw,ids:()=>PAIRS.map(k=>'gw:'+k)},
 gc:{kcs:k=>[k==='ae'?'b:11':k==='a'?'b:1':'r:3'],build:gc,ids:()=>['gc:a','gc:ae']},
 gb:{kcs:k=>[KC.a[k]],build:gb,ids:()=>Object.keys(SB).map(k=>'gb:'+k)}
};
const add=(bk,id)=>{const b=(window.FEATURES||[]).find(f=>f.name==='batchim');if(!b||!b.questions||!b.questions[bk])return;const old=b.questions[bk];b.questions[bk]=()=>[...old(),id]};
PAIRS.forEach(k=>{const [f,x]=k.split('|');add(KC[f][x],'gw:'+k)});
Object.keys(SB).forEach(k=>add(KC.a[k],'gb:'+k));
add('b:11','gc:ae');add('b:1','gc:a');
(window.FEATURES=window.FEATURES||[]).push({name:'glossary',types});
})();
