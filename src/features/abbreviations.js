/* 약기법(교재 2장) 영역 기능. 이 파일만 수정해 (window.FEATURES||=[]) 에 등록한다. 등록 형식은 src/app.js 의 "기능 확장 등록" 주석 참고.
   교재 글 설명(줄 방향·길이·위치)에 근거한 모양만 그린다. 손글씨 약부 중 모양을 글로 알 수 없는 것은 그리지 않고 설명 카드에만 둔다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const svg=(inner)=>`<svg viewBox="0 0 80 60" style="width:${(80*PXMM/3.6).toFixed(0)}px;height:${(60*PXMM/3.6).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const BASE='<path d="M6 30H44"/>';
const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="2.2" fill="var(--stroke)" stroke="none"/>`;
const tx=(s,x,y,sz=13)=>`<text x="${x}" y="${y}" font-size="${sz}" font-weight="700" fill="var(--stroke)" stroke="none" font-family="sans-serif">${s}</text>`;
/* 어미·조사 약기: 앞 글자 끝(기준선 끝)에 붙는 표시. 길이는 2mm≈7, 4mm≈15 단위(엔진 LEN과 같은 비율) */
const MARKS={
 bnida:{g:'end',n:'~ㅂ니다 (~습니다·~합니다·~입니다)',d:BASE+'<path d="M44 30l-5.7-5.7"/>',w:'하줄(↘) 역방향(↖)으로 삐칩니다.'},
 gett:{g:'end',n:'~겠다 (~게·~케·~겠)',d:BASE+'<path d="M44 30l-6 10.4"/>',w:'다줄(↙) 방향으로 2~8mm 삐치거나 씁니다.'},
 bnikka:{g:'end',n:'~ㅂ니까?',d:BASE+dot(50,30),w:'끝에서 살짝 띄어 점을 찍습니다.'},
 sipnikka:{g:'end',n:'~십니까?',d:BASE+tx('2',49,36),w:'끝에 「2」자를 띄어 씁니다.'},
 nga:{g:'end',n:'~ㄴ가 (~는가·~인가)',d:BASE+'<path d="M51 30l8.7-5"/>',w:'차줄(↗)로 2mm를 띄어서 삐칩니다.'},
 lka:{g:'end',n:'~ㄹ까 (~을까·~일까)',d:BASE+'<path d="M51 30l7 7"/>',w:'하줄(↘)로 2mm를 띄어서 삐칩니다.'},
 wa:{g:'jo',n:'~와 · ~과',d:BASE+'<path d="M44 26v8"/>',w:'이줄(수직)을 2mm 걸칩니다.'},
 do:{g:'jo',n:'~도',d:BASE+'<path d="M44 30l-3.5 6"/>',w:'다줄(↙)로 2mm 삐칩니다.'},
 hi:{g:'jo',n:'~히 · ~기',d:BASE+'<path d="M44 30v7"/>',w:'「이」자를 2mm 씁니다.'},
 eops:{g:'jo',n:'~없이',d:BASE+tx('2',39,36,11),w:'「2」자를 걸칩니다.'},
 rado:{g:'jo',n:'~(이)라도',d:BASE+'<path d="M53 16L38 44"/>',w:'「도」자(다줄)를 길게 걸칩니다.'}
};
const GROUP={end:Object.keys(MARKS).filter(k=>MARKS[k].g==='end'),jo:Object.keys(MARKS).filter(k=>MARKS[k].g==='jo')};
/* 간이약부(2) 중 모양이 단순한 것만: 글자 L·V·∧·작은 원 */
const GAN={
 kkaji:{n:'~까지 · 가지',d:'<path d="M26 14V44H54"/>'},
 mit:{n:'~및 · 몇~ · 토록',d:'<path d="M22 16L40 46L58 16"/>'},
 jeok:{n:'~적인 · 반대어',d:'<path d="M22 46L40 14L58 46"/>'},
 buteo:{n:'~부터',d:'<circle cx="40" cy="30" r="7"/>'}
};
/* 수사 단위: 숫자 뒤에 가·차·마·아·자 문자의 선을 붙인다 (교재 백(가) 천(차) 만(마) 억(아) 조(자)) */
const UNITS={'백':'가','천':'차','만':'마','억':'아','조':'자'};
const unitStroke=u=>{const it=ALL.find(x=>x.c===UNITS[u]);return stroke(it.g.a,it.b,44,4).replace('<svg ','<svg style="width:52px;height:52px" ')};
const numShape=(n,u)=>`<span style="display:inline-flex;align-items:center"><span style="font:italic 700 28px sans-serif;color:var(--stroke)">${n}</span>${unitStroke(u)}</span>`;
const NUMS=[3,5,12,25,40,60,90],UNIT_KEYS=Object.keys(UNITS);
/* 약·%·할 */
const SPEC={
 '약':{n:'약 (대략)',d:dot(40,10),w:'숫자 위에 점을 찍습니다.',t:n=>'약 '+n},
 '%':{n:'%',d:'<path d="M28 56L52 4"/>',w:'숫자 위로 기울어진 선(60°)을 걸쳐 씁니다.',t:n=>n+'%'},
 '할':{n:'할',d:'<path d="M22 8L58 52"/>',w:'숫자에 하줄(↘) 선을 걸쳐 씁니다.',t:n=>n+'할'}
};
const specShape=(n,d)=>svg(tx(n,33,44,34)+d);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;

/* 글로 된 규칙 문제 */
const TXT=[
 {k:'end',q:'논설체 문장의 종결 어미는 어떻게 쓰라고 하나요?',o:['「는다·이다」와 같이 쓴다','반드시 「ㅂ니다」로 쓴다','모두 생략한다','점 두 개로 쓴다'],a:0,w:'논설체 문장에서는 「는다, 이다」와 같이 씁니다. 문장 안에서 「이」, 「하」는 혼동이 없는 한 생략합니다.'},
 {k:'end',q:'문장 안의 「이」·「하」는 어떻게 하나요?',o:['혼동이 없는 한 생략한다','항상 크게 쓴다','반드시 반소원을 붙인다','항상 2mm 띄운다'],a:0,w:'문장 안에서 「이」, 「하」는 혼동이 없는 한 생략합니다.'},
 {k:'jo2',q:'조사가 연이어 나올 때(복합조사)는 어떻게 쓰나요?',o:['그대로 이어 쓴다','조사마다 띄어 쓴다','맨 앞 조사만 쓴다','맨 뒤 조사만 쓴다'],a:0,w:'조사가 연이어 나올 때에는 그대로 이어 씁니다. 예) 에로, 에게는, 에서가, 와도.'},
 {k:'jo2',q:'복합조사가 삐치기 어려울 때는 어떻게 하나요?',o:['「에」에서 빛이 반사되듯이 삐친다','생략한다','두 번 겹쳐 쓴다','다음 줄에 쓴다'],a:0,w:'삐치기 어려울 때는 「에」에서 빛이 반사되듯이 삐칩니다.'},
 {k:'jo2',q:'「으로선·해선·에선·에겐」은 어떻게 다루나요?',o:['주의를 요하는 복합조사로 따로 익힌다','「에」와 똑같이 쓴다','쓰지 않는다','점으로 대신한다'],a:0,w:'교재는 으로선·해선·에선·에겐을 「주의를 요하는」 복합조사로 따로 보입니다.'},
 {k:'jo1',q:'「~에도」에서 ㅁㅂ받침(작은 고리)은 어느 쪽에 쓰나요?',o:['반측','정측','선의 한가운데','쓰지 않는다'],a:0,w:'~(으)로는 정측에, ~에도는 반측에 ㅁㅂ받침을 씁니다.'},
 {k:'jo1',q:'「~(으)로」에서 ㅁㅂ받침(작은 고리)은 어느 쪽에 쓰나요?',o:['정측','반측','선의 한가운데','쓰지 않는다'],a:0,w:'~(으)로는 정측에, ~에도는 반측에 ㅁㅂ받침을 씁니다.'},
 {k:'gan1',q:'간이약부가 앞 글자에 접속될 때는 어디에 쓰나요?',o:['앞 글자 끝에서 오른쪽에 띄어','중선','앞 글자 머리 위','앞 글자 밑줄'],a:0,w:'접속될 때는 앞 글자 끝에서 오른쪽에 띄어 씁니다.'},
 {k:'gan1',q:'간이약부가 독립적일 때는 어디에 쓰나요?',o:['중선(문자의 중심선)','정측 끝','반측 꼬리','줄 맨 위'],a:0,w:'독립적일 때는 중선(문자의 중심선)에 씁니다.'},
 {k:'gan3',q:'「~하여」약부는 어디에 쓰나요?',o:['끝나는 자리에서 살짝 띄어','반측 한가운데','반측 꼬리','글자 머리'],a:0,w:'~하여는 끝나는 자리에서 살짝 띄어 씁니다. 「하여」와 「~ㅂ니까」는 같이 쓰고 문장에서 구분합니다.'},
 {k:'gan3',q:'「~도록」·「~ㄹ수록」약부는 어디에 쓰나요?',o:['반측 한가운데','끝나는 자리에서 살짝 띄어','반측 꼬리','정측 한가운데'],a:0,w:'~도록, ~ㄹ수록은 반측 한가운데에 씁니다.'},
 {k:'gan3',q:'「~ㄴ대로」는 어디에 무엇을 쓰나요?',o:['반측 꼬리에 「2」자','반측 한가운데에 V','끝에서 띄어 점','정측 한가운데에 선'],a:0,w:'~ㄴ대로는 반측 꼬리에 「2」자를 씁니다.'}
];
const KC={end:'a:end',jo1:'a:jo',jo2:'a:jo2',gan1:'a:gan1',gan3:'a:gan3'};
const textSet=k=>TXT.map((t,i)=>({t,i})).filter(x=>x.t.k===k).map(x=>'aT:'+x.i);

const F={
 name:'약기법',
 curr:['a:end','a:jo','a:jo2','a:gan1','a:gan2','a:gan3','a:num','a:pct'],
 info:[],
 names:{'a:end':'종결·의문 어미','a:jo':'조사 약기','a:jo2':'복합조사','a:gan1':'간이약부(1) 쓰는 위치','a:gan2':'간이약부(2) 약부','a:gan3':'간이약부(3) 위치별 규칙','a:num':'수사 단위(백천만억조)','a:pct':'약·%·할'},
 intro:{
  'a:end':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${GROUP.end.map(k=>lab(svg(MARKS[k].d),MARKS[k].n.split(' ')[0])).join('')}</div>`,
   text:`<b>종결·의문 어미</b><br>${GROUP.end.map(k=>`${MARKS[k].n}: ${MARKS[k].w}`).join('<br>')}<br><small>그림은 교재의 글 설명(줄 방향·길이)대로 다시 그린 약식 모양이고, 앞 글자는 곧은 선으로 줄였습니다.</small>`}),
  'a:jo':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${GROUP.jo.map(k=>lab(svg(MARKS[k].d),MARKS[k].n.split(' ')[0])).join('')}</div>`,
   text:`<b>조사 약기</b><br>${GROUP.jo.map(k=>`${MARKS[k].n}: ${MARKS[k].w}`).join('<br>')}<br>~(으)로는 정측에, ~에도는 반측에 ㅁㅂ받침을 쓰고, ~(으)로서(써)는 정측에 「으로」를 삐칩니다.`}),
  'a:jo2':()=>({prompt:'<div class="txt">에로 · 에게는 · 에서가 · 와도 · 으로는 · 으로의</div>',text:'<b>복합조사</b><br>조사가 연이어 나올 때에는 그대로 이어 씁니다.<br>다음은 주의를 요합니다: 으로선, 해선, 에선, 에겐.<br>삐치기 어려울 때는 「에」에서 빛이 반사되듯이 삐칩니다.'}),
  'a:gan1':()=>({prompt:'<div class="txt">~에(데)다 · ~한테 · ~처럼 · ~만큼 · ~커녕 · ~조차 · ~마저 · 같이 · 같은</div>',text:'<b>간이약부(1)</b><br>1) 접속될 때는 앞 글자 끝에서 오른쪽에 띄어 씁니다.<br>2) 독립적일 때는 중선(문자의 중심선)에 씁니다.<br><small>~에(데)다, ~한테, ~처럼 등의 약부 글자 모양은 교재 243쪽을 보세요. 이 앱은 글로 설명되는 규칙만 연습합니다.</small>'}),
  'a:gan2':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${Object.keys(GAN).map(k=>lab(svg(GAN[k].d),GAN[k].n.split(' ')[0])).join('')}</div>`,
   text:'<b>간이약부(2)</b><br>~부터 = 작은 원 · ~까지(가지) = L · ~및(몇~, 토록) = V · ~적인(반대어) = ∧<br><small>이 밖에 ~부터는·~부터도·~부턴·~때문에·때문이다 약부도 있으나 모양이 복잡해 여기서는 다루지 않았습니다. 교재 252쪽을 보세요.</small>'}),
  'a:gan3':()=>({prompt:'<div class="txt">~하여 · ~도록 · ~ㄹ수록 · ~ㄴ대로</div>',text:'<b>간이약부(3)</b><br>끝나는 자리에서 살짝 띄어 씁니다 → ~하여(서·도).<br>반측 한가운데에 씁니다 → ~도록, ~ㄹ수록.<br>반측 꼬리에 「2」자를 씁니다 → ~ㄴ대로.<br>「하여」와 「~ㅂ니까」는 같이 쓰고 문장에서 구분합니다.'}),
  'a:num':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${UNIT_KEYS.map(u=>lab(numShape(3,u),'3'+u)).join('')}</div>`,
   text:'<b>수사 단위</b><br>1~99는 아라비아 숫자를 그대로 씁니다.<br>단위는 숫자 뒤에 문자 선을 붙입니다: 백=가 · 천=차 · 만=마 · 억=아 · 조=자 (길이 8mm 이상).<br>예) 3만 4,000 = 34 + 천. 번문의 편의를 위해 가능한 한 「만, 억, 조」 단위를 씁니다.<br><small>그림의 숫자는 글꼴이라 손글씨와 다릅니다.</small>'}),
  'a:pct':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${Object.keys(SPEC).map(k=>lab(specShape(5,SPEC[k].d),SPEC[k].n)).join('')}</div>`,
   text:'<b>약 · % · 할</b><br>약: 숫자 위에 점 · %: 기울어진 선(8mm 이상) · 할: 하줄(↘) 선을 숫자에 걸칩니다.<br><small>분수·연월일·시분초·서수·요일·첩음 생략은 교재 272~273쪽을 보세요.</small>'})
 },
 questions:{
  'a:end':()=>[...shuf(GROUP.end).slice(0,3).map(k=>'aM:'+k),...shuf(GROUP.end).slice(0,2).map(k=>'aP:'+k)],
  'a:jo':()=>[...shuf(GROUP.jo).slice(0,3).map(k=>'aM:'+k),...shuf(GROUP.jo).slice(0,2).map(k=>'aP:'+k)],
  'a:jo2':()=>textSet('jo2'),'a:gan1':()=>textSet('gan1'),'a:gan3':()=>textSet('gan3'),
  'a:gan2':()=>shuf(Object.keys(GAN)).flatMap(k=>['aG:'+k,'aH:'+k]),
  'a:num':()=>shuf(UNIT_KEYS).flatMap(u=>['aN:'+NUMS[Math.random()*NUMS.length|0]+u,'aR:'+NUMS[Math.random()*NUMS.length|0]+u]),
  'a:pct':()=>Object.keys(SPEC).flatMap(k=>['aS:'+k])
 },
 types:{
  aM:{kcs:k=>[MARKS[k].g==='end'?'a:end':'a:jo'],ids:()=>Object.keys(MARKS).map(k=>'aM:'+k),build:(k,id)=>{
    const m=MARKS[k],pool=GROUP[m.g];
    return {id,prompt:svg(m.d,120,90),q:'이 약기는 어느 표현일까요?',one:true,opts:shuf(shuf(pool.filter(x=>x!==k)).slice(0,3).concat(k)).map(x=>({k:x,h:MARKS[x].n})),ans:k,why:`${m.n}: ${m.w}`}}},
  aP:{kcs:k=>[MARKS[k].g==='end'?'a:end':'a:jo'],ids:()=>Object.keys(MARKS).map(k=>'aP:'+k),build:(k,id)=>{
    const m=MARKS[k],pool=shuf(GROUP[m.g].filter(x=>x!==k)).slice(0,3);
    return {id,prompt:`<span class="big" style="font-size:30px">${m.n.split(' ')[0]}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf([k,...pool]).map(x=>({k:x,h:svg(MARKS[x].d)})),ans:k,why:`${m.n}: ${m.w}`}}},
  aT:{kcs:k=>[KC[TXT[+k].k]],ids:()=>TXT.map((_,i)=>'aT:'+i),build:(k,id)=>{const t=TXT[+k];
    return {id,prompt:`<div class="txt">${t.q}</div>`,q:'책의 내용을 떠올려 보세요',one:true,opts:shuf(t.o.map(x=>({k:x,h:x}))),ans:t.o[t.a],why:t.w}}},
  aG:{kcs:()=>['a:gan2'],ids:()=>Object.keys(GAN).map(k=>'aG:'+k),build:(k,id)=>({id,prompt:svg(GAN[k].d,110,82),q:'이 간이약부는 무엇일까요?',one:true,opts:shuf(Object.keys(GAN).map(x=>({k:x,h:GAN[x].n}))),ans:k,why:`${GAN[k].n}`})},
  aH:{kcs:()=>['a:gan2'],ids:()=>Object.keys(GAN).map(k=>'aH:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${GAN[k].n.split(' ')[0]}</span>`,q:'어떤 간이약부로 쓸까요?',opts:shuf(Object.keys(GAN).map(x=>({k:x,h:svg(GAN[x].d)}))),ans:k,why:`${GAN[k].n}의 약부입니다.`})},
  aN:{kcs:()=>['a:num'],ids:()=>NUMS.flatMap(n=>UNIT_KEYS.map(u=>'aN:'+n+u)),build:(k,id)=>{const u=k.slice(-1),n=k.slice(0,-1);
    return {id,prompt:`<span class="big" style="font-size:36px">${n}${u}</span>`,q:`「${n}${u}」을 속기로 쓰면?`,opts:shuf(shuf(UNIT_KEYS).filter(x=>x!==u).slice(0,3).concat(u)).map(x=>({k:x,h:numShape(n,x)})),ans:u,why:`${u}은(는) ${UNITS[u]} 문자의 선을 숫자 뒤에 붙여 씁니다. 숫자 1~99는 그대로 씁니다.`}}},
  aR:{kcs:()=>['a:num'],ids:()=>NUMS.flatMap(n=>UNIT_KEYS.map(u=>'aR:'+n+u)),build:(k,id)=>{const u=k.slice(-1),n=k.slice(0,-1);
    return {id,prompt:numShape(n,u),q:'이 숫자는 무엇일까요?',one:true,opts:shuf(shuf(UNIT_KEYS).filter(x=>x!==u).slice(0,3).concat(u)).map(x=>({k:x,h:n+x})),ans:u,why:`숫자 ${n} 뒤의 선이 ${UNITS[u]} 문자 모양이라 ${u}입니다.`}}},
  aS:{kcs:()=>['a:pct'],ids:()=>Object.keys(SPEC).map(k=>'aS:'+k),build:(k,id)=>{const n=[3,5,7,10][Math.random()*4|0],s=SPEC[k],all=Object.keys(SPEC),
    opts=[...all.map(x=>({k:x,h:specShape(n,SPEC[x].d)})),{k:'백',h:specShape(n,'<path d="M18 52H62"/>')}];
    return {id,prompt:`<span class="big" style="font-size:30px">${s.t(n)}</span>`,q:'어떤 모양으로 쓸까요?',opts:shuf(opts),ans:k,why:`${s.n}: ${s.w}`}}}
 },
 section:{title:'약기법 (교재 2장)',kcs:['a:end','a:jo','a:jo2','a:gan1','a:gan2','a:gan3','a:num','a:pct']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
