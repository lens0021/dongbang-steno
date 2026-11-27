/* 응용편 제3장 상선 응용 약기법 (교재 157~168쪽): 상선약자(1) 일부, 「~ㄹ 것이다」(동사 어미 삐침), 「~ㄹ 것」+조사.
   개념 id 접두어 q3:. 그림은 교재 그림을 보고 모양·위치를 어림해 직접 그린 약식이다(1mm = 3단위, 엔진·응용편 다른 영역과 같은 배율).
   손글씨 연습 문장(157~162쪽)과 어미별 큰 표(164~166쪽의 점 위치 차이)는 문제로 만들지 않았다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const sv=(inner,w=100,h=60)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});
const dot=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.6" fill="var(--stroke)" stroke="none"/>`;
const big=t=>`<span class="big" style="font-size:28px">${t}</span>`;

/* ---------- 상선약자(1): 앞문자 끝에서 차줄로 4mm 올려 쓰는 한 획짜리 약기 ---------- */
const PREV='<path d="M6 42H38"/>';           /* 앞문자(짧은 가로선), 끝 (38,42) */
const OR=[38+12*Math.cos(Math.PI/6),42-12*Math.sin(Math.PI/6)];   /* 상선 자리 */
const SS={
 mueot:{n:'무엇',d:'M0 0L8 10',w:'짧은 하줄(↘) 하나'},
 daeum:{n:'다음',d:'M0 11L5 0',w:'가파른 짧은 사선(/)'},
 jeong:{n:'정책',d:'M0 5L13 0',w:'완만한 짧은 차줄(↗)'},
 kkadak:{n:'까닭에',d:'M0 0H30',w:'긴 가로선(—)'},
 eotteon:{n:'어떤',d:'M0 0Q6 5 0 11',w:'작은 호 「)」'},
 uri:{n:'우리',d:'M0 1Q3 11 12 2',w:'아래로 둥글게 내려갔다 오른쪽 위로 올라오는 짧은 곡선'}
};
const SK=Object.keys(SS);
const sShape=k=>{const s=SS[k];return sv(PREV+`<g transform="translate(${f1(OR[0])},${f1(OR[1]-5)})"><path d="${s.d}"/></g>`)};
const sWhy=k=>`${SS[k].n}: 앞문자 끝에서 차줄로 4mm 올라간 상선 자리에 ${SS[k].w}이(가) 있으므로 ${SS[k].n}입니다.`;

/* ---------- 「~ㄹ 것이다」: 동사 기본형 끝에 삐침(위로 튀는 획) ---------- */
const ST={
 gan:{n:'간다',m:'갈',d:'M10 40H34',e:'Q38 40 40 33',s:[10,40]},
 nagan:{n:'나간다',m:'나갈',d:'M10 40H58',e:'Q62 40 64 33',s:[10,40]},
 moreun:{n:'모른다',m:'모를',d:'M10 28Q34 52 58 30',e:'Q61 27 64 20',s:[10,28]}
};
const STK=Object.keys(ST);
const FM={
 base:{n:(s)=>ST[s].n,w:'삐침이 없는 기본형'},
 da:{n:(s)=>ST[s].m+' 것이다',w:'기본형 끝에 삐침(위로 튀는 획)'},
 ni:{n:(s)=>ST[s].m+' 것이니',w:'끝에 삐침, 머리 위쪽에 점'}
};
const FK=Object.keys(FM);
const tShape=(s,f)=>{const S=ST[s];return sv(`<path d="${S.d}${f==='base'?'':S.e}"/>`+(f==='ni'?dot(S.s[0]+3,S.s[1]-9):''))};
const tName=(s,f)=>FM[f].n(s);
const tWhy=(s,f)=>`${tName(s,f)}: 그림은 ${ST[s].n}의 선 모양이고, ${FM[f].w}입니다.${f==='base'?'':' 「~ㄹ 것이다」는 기본형 끝에 삐침을 붙입니다.'}`;
const tCombos=()=>STK.flatMap(s=>FK.map(f=>s+'.'+f));

/* ---------- 「~ㄹ 것」 + 조사: 위로 뻗는 차줄(↗) 끝에 붙는 작은 표시 ---------- */
const JB='M8 44L70 22';
const JJ={
 eu:{n:'~ㄹ 것으로',d:'<path d="M70 22C75 20 79 14 75 11C71 9 66 18 71 24"/>',w:'끝에 선을 가로지르는 작은 고리'},
 do:{n:'~ㄹ 것도',d:'<path d="M75 21L77.5 14"/>',w:'끝 위쪽에 떨어진 짧은 사선(/)'},
 gwa:{n:'~ㄹ 것과',d:'<path d="M70 14L72.5 28"/>',w:'끝에서 선을 가로지르는 짧은 십자 획'},
 i:{n:'~ㄹ 것이',d:'<circle cx="72.5" cy="20.2" r="2.4"/>',w:'끝에 붙은 작은 고리(○)'},
 eun:{n:'~ㄹ 것은',d:'<path d="M70 22Q74.5 16 79 21"/>',w:'끝에서 위로 휘어 올라가는 작은 호(⌒)'},
 eul:{n:'~ㄹ 것을',d:'',w:'아무 표시 없는 차줄(↗) 하나'}
};
const JK=Object.keys(JJ);
const jShape=k=>sv(`<path d="${JB}"/>`+JJ[k].d);
const jWhy=k=>`${JJ[k].n}: 위로 뻗는 차줄에서 ${JJ[k].w}이(가) 보이므로 ${JJ[k].n}입니다.`;

const F={
 name:'응용편 (상선 응용)',
 curr:['q3:s1','q3:t1','q3:j1'],
 info:[],
 names:{'q3:s1':'상선약자 무엇·다음·정책·까닭에·어떤·우리','q3:t1':'~ㄹ 것이다 (기본형 + 삐침)','q3:j1':'~ㄹ 것 + 조사(으로·도·과·이·은·을)'},
 intro:{
  'q3:s1':()=>({prompt:row(SK.map(k=>lab(sShape(k),SS[k].n))),
   text:'<b>상선약자(1)</b><br>상선약자는 <b>앞문자 끝에서 차줄(↗)로 4mm 가량 올린 자리</b>에 한 획으로 씁니다. 모양과 방향·길이가 곧 단어입니다.<br>'+SK.map(k=>`${SS[k].n} = ${SS[k].w}`).join('<br>')+'<br>상선약자끼리는 나란히 씁니다. 그림의 아래쪽 짧은 선은 앞문자이고, 약자는 그 끝에서 올려 쓴 자리에 있습니다.<br><small>우리나라·무엇보다·어떻게 등 모양이 복잡한 약자는 교재 157쪽을 보세요.</small>'}),
  'q3:t1':()=>({prompt:row(['base','da','ni'].map(f=>lab(tShape('moreun',f),tName('moreun',f)))),
   text:'<b>~ㄹ 것이다</b><br>동사 기본형(간다·나간다·모른다 …)의 선 끝에 <b>삐침(위로 튀는 작은 획)</b>을 붙이면 「~ㄹ 것이다」(간다 → 갈 것이다)입니다. 끝에 삐침을 붙이고 <b>머리 위쪽에 점</b>을 찍으면 「~ㄹ 것이니」입니다.<br>기본형의 선 모양(길이·굽은 정도)은 그대로이므로 먼저 어떤 동사인지 읽고, 끝의 삐침으로 어미를 읽으세요.<br><small>~것이나·것이고·것인데·것이지·것이며·것입니다는 점의 위치·획이 더 미세하게 달라 교재 165~166쪽을 보세요.</small>'}),
  'q3:j1':()=>({prompt:row(JK.map(k=>lab(jShape(k),JJ[k].n))),
   text:'<b>「~ㄹ 것」 + 조사</b><br>「~ㄹ 것」은 위로 뻗는 차줄(↗) 하나입니다. 삐치지 않고 쓰면서 그 끝에 조사를 표시합니다.<br>'+JK.map(k=>`${JJ[k].n} = ${JJ[k].w}`).join('<br>')+'<br><small>앞에서 ~ㄹ 것이다를 쓸 때는 삐치고, 조사가 이어지면 그 끝에 위 표시를 붙입니다(교재 167쪽).</small>'})
 },
 questions:{
  'q3:s1':()=>shuf(SK).flatMap(k=>['q3sQ:'+k,'q3sR:'+k]),
  'q3:t1':()=>shuf(tCombos()).slice(0,6).map((k,i)=>(i%2?'q3tR:':'q3tQ:')+k),
  'q3:j1':()=>shuf(JK).flatMap(k=>['q3jQ:'+k,'q3jR:'+k])
 },
 types:{
  q3sQ:{kcs:()=>['q3:s1'],ids:()=>SK.map(k=>'q3sQ:'+k),build:(k,id)=>({id,prompt:sShape(k),q:'이 상선약자는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(SK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,SS[x].n))),ans:k,why:sWhy(k)})},
  q3sR:{kcs:()=>['q3:s1'],ids:()=>SK.map(k=>'q3sR:'+k),build:(k,id)=>({id,prompt:big(SS[k].n),q:'상선 자리에 어떤 약자로 쓸까요?',opts:shuf([k,...shuf(SK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,sShape(x)))),ans:k,why:sWhy(k)})},
  q3tQ:{kcs:()=>['q3:t1'],ids:()=>tCombos().map(k=>'q3tQ:'+k),build:(k,id)=>{const [s,f]=k.split('.');
    const near=tCombos().filter(x=>{const [a,b]=x.split('.');return x!==k&&((a===s)!==(b===f))});
    return {id,prompt:tShape(s,f),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(near).slice(0,3)].map(x=>{const [a,b]=x.split('.');return opt(x,tName(a,b))})),ans:k,why:tWhy(s,f)}}},
  q3tR:{kcs:()=>['q3:t1'],ids:()=>tCombos().map(k=>'q3tR:'+k),build:(k,id)=>{const [s,f]=k.split('.');
    const near=tCombos().filter(x=>{const [a,b]=x.split('.');return x!==k&&((a===s)!==(b===f))});
    return {id,prompt:big(tName(s,f)),q:'어떤 약기로 쓸까요?',opts:shuf([k,...shuf(near).slice(0,3)].map(x=>{const [a,b]=x.split('.');return opt(x,tShape(a,b))})),ans:k,why:tWhy(s,f)}}},
  q3jQ:{kcs:()=>['q3:j1'],ids:()=>JK.map(k=>'q3jQ:'+k),build:(k,id)=>({id,prompt:jShape(k),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(JK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,JJ[x].n))),ans:k,why:jWhy(k)})},
  q3jR:{kcs:()=>['q3:j1'],ids:()=>JK.map(k=>'q3jR:'+k),build:(k,id)=>({id,prompt:big(JJ[k].n),q:'어떤 약기로 쓸까요?',opts:shuf([k,...shuf(JK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,jShape(x)))),ans:k,why:jWhy(k)})}
 },
 section:{title:'응용편 (제3장 상선 응용 157~168쪽)',kcs:['q3:s1','q3:t1','q3:j1']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
