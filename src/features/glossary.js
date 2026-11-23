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

/* ---------- 용어 문제: 속기 그림을 보고 어떤 용어에 해당하는지 고른다 ----------
   한글만 보고 풀리는 문제는 만들지 않는다. 받침이 붙은 글자가 하나뿐인 단어의 속기 그림(받침 영역의 BW 단어)만 쓰고,
   모음 계열과 받침 종류는 글자 구조에서 계산한다. */
(function(){
const B=window.BATCHIM;if(!B)return;
const AEJ=new Set([1,5,9,10,11,14,15,16]),YAJ=new Set([2,6,12,17,20]);
const JKM={1:'g',4:'n',8:'l',16:'m',17:'m',19:'s',21:'ng'};
const KN={n:'ㄴ',ng:'ㅇ',l:'ㄹ',s:'ㅅ',m:'ㅁ·ㅂ',g:'ㄱ'};
const FN={a:'ㅏ계열',ae:'ㅐ계열'};
const KC={a:{n:'b:1',ng:'b:2',l:'b:3',s:'b:5',m:'b:7',g:'b:8'},ae:{n:'b:11',ng:'b:12',l:'b:13',s:'b:15',m:'b:17',g:'b:18'}};
const parse=ch=>{const n=ch.charCodeAt(0)-0xAC00,jung=Math.floor(n%588/28),jong=n%28;return {ch,fam:AEJ.has(jung)?'ae':YAJ.has(jung)?'ya':'a',kind:JKM[jong]||null}};
const info=w=>{const s=[...w].map(parse),b=s.map((p,i)=>p.kind?i:-1).filter(i=>i>=0);
  if(b.length!==1||b[0]===0||s[b[0]].fam==='ya')return null;return {w,ch:s[b[0]].ch,fam:s[b[0]].fam,kind:s[b[0]].kind}};
const POOL=B.BW.map(info).filter(Boolean).filter(x=>KC[x.fam][x.kind]);
const lab=(f,k)=>`${FN[f]} 모음 글자 + ${KN[k]}받침`;
function gp(w,id){
  const x=POOL.find(p=>p.w===w),fo=x.fam==='a'?'ae':'a',ko=Object.keys(KN).filter(k=>k!==x.kind)[Math.random()*5|0];
  const combos=[[x.fam,x.kind],[fo,x.kind],[x.fam,ko],[fo,ko]];
  return {id,prompt:B.bSVG(w,130),q:'이 속기 그림에서 받침이 붙은 글자는 어떤 용어에 해당할까요?',
   opts:shuf(combos).map(([f,k])=>({k:f+'|'+k,h:`<span style="font-size:16px;font-weight:600">${lab(f,k)}</span>`})),ans:x.fam+'|'+x.kind,
   why:`${w}에서 받침이 붙은 글자는 ${x.ch}이고, <b>${lab(x.fam,x.kind)}</b>입니다. 모음 반소원이 반측에 있으면 ㅐ계열이에요.`+(window.BATCHIM&&B.bKcs?'':'')}}
const types={gp:{kcs:w=>B.bKcs(w),build:gp,ids:()=>POOL.map(x=>'gp:'+x.w)}};
const b=(window.FEATURES||[]).find(f=>f.name==='batchim');
if(b&&b.questions)Object.keys(KC).forEach(f=>Object.keys(KC[f]).forEach(k=>{const c=KC[f][k],old=b.questions[c];if(!old)return;
  b.questions[c]=()=>[...old(),...shuf(POOL.filter(x=>x.fam===f&&x.kind===k)).slice(0,2).map(x=>'gp:'+x.w)]}));
(window.FEATURES=window.FEATURES||[]).push({name:'glossary',types});
})();
