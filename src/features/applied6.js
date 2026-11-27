/* 응용편 제4장 중간약자(5)(6) (교재 296·304쪽): ~뿐 아니라, ~주시다. 개념 id p:m11·m12, 문제 유형 pV(모양→말)·pW(말→모양).
   그림은 교재 손글씨를 보고 어림해 그린 약식이다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const sv=(d,w=60,h=42)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*2.4).toFixed(0)}px;height:${(h*2.4).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${d}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});
const P=d=>`<path d="${d}"/>`;
/* 모양: n 말, d 경로, w 눈에 띄는 특징 */
const G={
 a0:{n:'아니라',d:P('M8 8C18 10 24 18 26 30'),w:'8mm 가량의 짧은 사선 호(↘) 하나'},
 a1:{n:'드릴 뿐 아니라',d:P('M5 9L22 19M13 6C13 16 18 24 27 31'),w:'호 위쪽에 짧은 사선이 엇갈려 가위표(×)를 이룸'},
 a2:{n:'드릴 뿐만 아니라',d:P('M5 26Q16 12 28 26L30 34M15 16A1.5 1.5 0 1 0 15 16.1'),w:'위로 볼록한 호의 왼쪽 위에 작은 동그라미가 있음'},
 a3:{n:'그뿐만 아니라',d:P('M3 16H34C38 16 41 21 43 31'),w:'긴 가로선 끝이 아래로 꺾여 내려감'},
 a4:{n:'일터에서 뿐 아니라',d:P('M10 4A1.5 1.5 0 1 0 10 4.1M10 6C10 10 15 10 14 14C20 13 25 19 29 27L31 34'),w:'위에 작은 동그라미가 있고 지그재그로 내려오다 호로 마침'},
 a5:{n:'수출뿐이 아니라',d:P('M5 24L18 10M9 16L24 24C29 28 31 32 27 35'),w:'왼쪽에 「K」 꼴로 사선이 갈라지고 끝이 아래로 말림'},
 j1:{n:'말씀해 주시다',d:P('M7 8C15 2 20 10 10 12L36 36'),w:'위에 고리(ᘐ)가 있고 긴 사선이 오른쪽 아래로 이어지며 끝에 꼬리가 없음'},
 j2:{n:'말씀해 주시기',d:P('M7 8C15 2 20 10 10 12L34 34L34 38'),w:'위에 고리가 있고 긴 사선 끝에 아래로 짧은 꼬리가 붙음'},
 j3:{n:'밝혀 주시다',d:P('M4 16L13 6L38 36'),w:'위가 뾰족한 「ㅅ」 꼴로 올라갔다 긴 사선이 내려가며 꼬리가 없음'},
 j4:{n:'밝혀 주시기',d:P('M4 16L13 6L36 34L36 38'),w:'위가 뾰족한 「ㅅ」 꼴이고 긴 사선 끝에 아래로 짧은 꼬리가 붙음'},
 j5:{n:'말씀해 주다',d:P('M9 8C17 2 21 10 12 12L16 22'),w:'위에 고리가 있고 짧은 획(4mm)만 아래로 이어짐'}
};
const CS={
 m11:['a0','a1','a2','a3','a4','a5'],
 m12:['j1','j2','j3','j4','j5']
};
const NAMES={m11:'중간약자 (5) ~뿐 아니라',m12:'중간약자 (6) ~주시다'};
const KC=Object.keys(CS).map(c=>'p:'+c);
const cof=k=>Object.keys(CS).find(c=>CS[c].includes(k));
const sh=k=>sv(G[k].d);
const why=k=>`${G[k].n}: ${G[k].w}입니다.`;
const pick=k=>{const pool=CS[cof(k)].filter(x=>x!==k);return shuf([k,...shuf(pool).slice(0,3)])};
const intro=(c,t)=>()=>({prompt:row(CS[c].map(k=>lab(sh(k),G[k].n))),text:t+'<br>'+CS[c].map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')+'<br><small>그림은 교재 손글씨를 보고 어림해 그린 약식입니다. 교재 296·304쪽과 비교해 보세요.</small>'});
const F={
 name:'응용편 (중간약자 5·6)',
 curr:KC,info:[],
 names:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,NAMES[c]])),
 intro:{
  'p:m11':intro('m11','<b>~뿐 아니라</b>: 「아니라」는 8mm 가량의 짧은 사선 호입니다. 앞에 붙는 표시(가위표, 동그라미, 긴 가로선 …)로 뿐/뿐만과 앞말을 구별합니다.'),
  'p:m12':intro('m12','<b>~주시다</b>: 「말씀해」는 위의 고리, 「밝혀」는 위가 뾰족한 ㅅ 꼴로 시작하고, 긴 사선(16mm 이상)이 「주시다」입니다. 사선 끝에 꼬리가 붙으면 「주시기」, 사선이 짧으면(4mm) 「주다」입니다.')
 },
 questions:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,()=>CS[c].flatMap(k=>['pV:'+k,'pW:'+k])])),
 types:{
  pV:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pV:'+k),build:(k,id)=>({id,prompt:sh(k),q:'이 약기는 어떤 말일까요?',one:true,opts:pick(k).map(x=>opt(x,G[x].n)),ans:k,why:why(k)})},
  pW:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pW:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${G[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:pick(k).map(x=>opt(x,sh(x))),ans:k,why:why(k)})}
 },
 section:{title:'응용편 (제4장 296·304쪽 · ~뿐 아니라·~주시다)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
