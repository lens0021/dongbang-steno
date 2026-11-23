/* 교재 용어 풀이. 용어는 교재 그대로 두고, 화면에 나온 용어만 골라 예시와 함께 설명한다.
   설명은 앱의 다른 개념 카드(교재 1장 3~6절 내용)에서 확인된 것만 쓴다. GLOSS(html, open)은 풀이 상자 HTML을 돌려준다(없으면 ''). */
const GL=[
 {t:/[ㅏㅑㅐ]계열|[ㅏㅑㅐ]모음/,n:'ㅏ모음 · ㅑ모음 · ㅐ모음 (앱에서는 ㅏ계열·ㅑ계열·ㅐ계열)',s:'모음 계열',h:
  '교재는 모음을 반소원이 있는지, 어느 쪽에 있는지로 나누어 부릅니다. 앱의 「계열」은 같은 뜻으로 쓴 앱의 표현이에요.<br>'
 +'· <b>ㅏ모음</b>: 반소원이 <b>없는</b> ㅏ ㅓ ㅗ ㅜ ㅡ → 나·너·노·누·느<br>'
 +'· <b>ㅑ모음</b>: 시작할 때 <b>정측</b>에 반소원을 붙이는 ㅑ ㅕ ㅛ ㅠ ㅣ → 냐·녀·뇨·뉴·니<br>'
 +'· <b>ㅐ모음</b>: 시작할 때 <b>반측</b>에 반소원을 붙이는 ㅐ ㅘ ㅚ ㅟ ㅝ(ㅔ·ㅙ·ㅞ도 같은 길이로 같이 씀) → 내·과·괴·귀<br>'
 +'받침 이어쓰기에서 교재는 「ㅏ·ㅑ모음」과 「ㅐ모음」 두 가지로 나누어 규칙을 줍니다. 이 앱은 그중 ㅏ·ㅓ·ㅗ·ㅜ·ㅡ(ㅏ계열)와 ㅐ계열만 다루고, ㅑ계열이 붙은 받침은 아직 다루지 않아요.<br>'
 +'「ㅐ계열 모음의 ㅁ받침」은 보냄의 <b>냄</b>, 도마뱀의 <b>뱀</b>처럼 ㅐ모음 글자에 ㅁ받침이 붙은 경우예요.'},
 {t:/받침/,n:'받침',h:
  '글자 아래에 붙는 자음이에요. 간·강·갈·갓·감·각의 ㄴ·ㅇ·ㄹ·ㅅ·ㅁ·ㄱ. 교재는 ㄵ·ㄶ처럼 겹받침도 ㄴ받침에 함께 묶어 다룹니다.<br>'
 +'속기에서는 받침을 따로 쓰지 않고, <b>받침이 붙은 글자(뒤 글자)</b>를 앞 글자에 어떻게 이어 쓰느냐로 나타내요. 예) 모든 = 모 + <b>든</b>(ㄴ받침이 붙은 글자), 보람 = 보 + <b>람</b>(ㅁ받침).<br>'
 +'「ㅁㅂ받침」은 ㅁ과 ㅂ을 함께 묶어 부르는 교재 용어예요(감·밥).'},
 {t:/이어쓰기|이어 쓰/,n:'이어쓰기',h:'단어를 잘 읽히게 하고 속도를 높이는 방법으로, 앞 글자의 끝에서 <b>연필을 떼지 않고</b> 다음 글자를 시작하는 것이에요. 예) 고기, 가기. 받침이 있으면 이어 쓰는 자리·모양이 달라져서 받침을 구별해요.'},
 {t:/정측|반측/,n:'정측 · 반측',h:'선의 어느 쪽인지를 말해요. <b>곡선문자는 곡선의 안쪽</b>이 정측이고, <b>직선문자는 화살표 쪽, 즉 위쪽이나 왼쪽</b>이 정측입니다. <b>반측은 정측의 반대쪽</b>이에요. 그래서 ㅑ모음은 정측, ㅐ모음은 반측에 반소원이 붙습니다(예: 뎌=정측, 대=반측).'},
 {t:/반소원|소원|큰 원|극소원|작은 원/,n:'반소원 · 소원 · 큰 원',h:'<b>반소원</b>은 작은 원의 반을 글자 머리에 붙인 모양이에요. 받침에서는 원의 <b>크기</b>가 받침 종류의 표시가 됩니다. 교재에서 ㅐ모음 뒤 <b>소원(작은 원) = ㄴ받침</b>, <b>ㄴ받침의 2배 이상 큰 원 = ㅇ받침</b>이에요. 정확한 크기는 이 앱 그림에서 추정한 값입니다.'},
 {t:/머리|허리|꼬리/,n:'머리 · 허리 · 꼬리',h:'받침을 이어 쓸 때 <b>앞 글자 선의 어느 자리인지</b>를 가리키는 교재 용어예요. <b>머리</b>는 선의 시작 부분, <b>허리</b>는 가운데, <b>꼬리</b>는 끝 부분입니다. 교재에 정의 문장은 없고 규칙과 그림에서 이 뜻으로 쓰여요. 예) ㄹ받침은 앞 글자의 허리에 걸치고(ㅐ모음은 머리에), ㅅ받침은 꼬리에 걸쳐 써요.'},
 {t:/갈고리/,n:'갈고리',h:'ㄱ받침에서 이어쓰기가 어려울 때 앞 글자 끝에서 <b>날카로운 갈고리 형태</b>로 제 글자를 쓰는 것이에요. ㅏ모음은 정측에, ㅐ모음은 반측에 만듭니다. 예) 가각, 고국, 가객, 고객.'},
 {t:/같은 방향|이어쓰기가 (어려|곤란)/,n:'이어쓰기가 어려울 때 (예외)',h:'앞 글자와 뒤 글자가 같은 방향이라 원칙대로 걸치거나 내밀기 어려운 경우예요. 교재는 이때 쓰는 모양을 <b>예외</b>로 따로 줍니다(반소원·큰 반소원·갈고리). 예) ㄱ받침의 가각, 고국.'}
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
