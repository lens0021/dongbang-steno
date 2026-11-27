/* 응용편 제4장 어미(2) (교재 287·290쪽): ~ㄹ 것 같으면·~ㄹ지라도·~ㄹ지언정·~치더라도·~손 치더라도. 개념 id p:m5~m7, 문제 유형 pP(모양→말)·pS(말→모양).
   긴 선(2cm 이상) 앞의 작은 표시로 구별한다.
   그림은 교재의 손글씨 모양을 보고 직접 어림해 그린 약식이다.
   서로 거의 같은 것(~지 않을 것 같으면 등)은 뺐다. */
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
 gat0:{n:'없을 것 같으면',d:P('M9 10C3 14 3 24 9 28M3 19H48'),w:'긴 가로선 앞에 「(」가 가로선에 꿰뚫려 있음'},
 gat1:{n:'없다고 할 것 같으면',d:P('M8 10C3 14 3 24 8 28M10 27L13 24M15 29H48'),w:'「(」 뒤에 짧은 점획이 있고 긴 가로선은 그 아래에서 따로 시작함'},
 gat3:{n:'그에 의할 것 같으면',d:P('M3 31H22C27 31 27 25 22 25M14 25H52'),w:'아래 짧은 선 끝이 말려 올라가 위의 긴 가로선과 겹침'},
 gat4:{n:'왜냐 할 것 같으면',d:P('M7 40V14C7 8 13 8 13 13M7 24H46'),w:'세로선 위가 작게 말리고 가운데서 긴 가로선이 나감'},
 gat5:{n:'왜 그러냐 할 것 같으면',d:P('M6 6C3 6 3 12 6 12V34H20M16 36H52'),w:'ㄴ자 꼴 세로선 위에 말림이 있고 아래에 긴 가로선이 이어짐'},
 ji0:{n:'드릴지라도',d:P('M30 6V40M25 12L33 4'),w:'긴 세로선 위끝을 짧은 사선이 가로지름'},
 ji1:{n:'드린다고 할지라도',d:P('M30 12V40M22 13L27 8'),w:'긴 세로선에서 떨어진 위쪽 왼편에 짧은 사선이 따로 있음'},
 ji2:{n:'드리지 않을지라도',d:P('M30 8V40M23 11Q30 4 36 8'),w:'긴 세로선 위끝에 모자 꼴 호가 얹힘'},
 eon0:{n:'될지언정',d:P('M5 30C7 37 15 37 17 31C23 18 35 12 50 10'),w:'작은 그릇(◡)에서 오른쪽 위로 길게 휘어 올라감'},
 eon1:{n:'된다고 할지언정',d:P('M4 32C6 38 12 38 15 34M17 32L20 29M20 31C28 20 38 13 52 10'),w:'작은 그릇 뒤에 짧은 점획이 따로 있고 긴 호가 떨어져 시작함'},
 eon2:{n:'되지 않을지언정',d:P('M3 28C7 37 17 37 22 32M17 38C27 22 38 13 52 10'),w:'작은 그릇을 긴 호가 아래에서 가로지름'},
 chi1:{n:'밝힌다 치더라도',d:P('M8 12C12 15 12 21 8 24M5 27L46 13'),w:'「)」 아래 끝에서 긴 사선이 오른쪽 위로 시작함'},
 chi2:{n:'밝히지 않는다 치더라도',d:P('M8 16C12 19 12 25 8 28M10 22L48 11'),w:'「)」 가운데에서 긴 사선이 오른쪽 위로 시작함'},
 son1:{n:'없다손 치더라도',d:P('M9 12C3 14 3 24 9 26C11 26 12 24 11 22M8 26L50 14'),w:'「(」 아래에 작은 고리가 있고 긴 사선이 그 아래 끝에서 시작함'},
 son2:{n:'없지 않다손 치더라도',d:P('M9 10C3 14 3 24 9 28M3 20L48 10'),w:'「(」를 긴 사선이 가운데에서 꿰뚫음'}
};
const CS={
 m5:['gat0','gat1','gat3','gat4','gat5'],
 m6:['ji0','ji1','ji2','eon0','eon1','eon2'],
 m7:['chi1','chi2','son1','son2']
};
const NAMES={m5:'어미 ~ㄹ 것 같으면',m6:'어미 ~ㄹ지라도·~ㄹ지언정',m7:'어미 ~치더라도·~손 치더라도'};
const KC=Object.keys(CS).map(c=>'p:'+c);
const cof=k=>Object.keys(CS).find(c=>CS[c].includes(k));
const sh=k=>sv(G[k].d);
const why=k=>`${G[k].n}: ${G[k].w}입니다.`;
const pick=k=>{const pool=CS[cof(k)].filter(x=>x!==k);return shuf([k,...shuf(pool).slice(0,3)])};
const intro=(c,t)=>()=>({prompt:row(CS[c].map(k=>lab(sh(k),G[k].n))),text:t+'<br>'+CS[c].map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')+'<br><small>그림은 교재 손글씨를 보고 어림해 그린 약식입니다. 교재 287·290쪽과 비교해 보세요.</small>'});
const F={
 name:'응용편 (어미 2)',
 curr:KC,info:[],
 names:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,NAMES[c]])),
 intro:{
  'p:m5':intro('m5','<b>~ㄹ 것 같으면(같다)</b>: 「나」 위치에서 시작하는 길이 2cm 이상의 가로선입니다. 앞에 붙는 작은 표시로 앞말을 구별합니다.'),
  'p:m6':intro('m6','<b>~ㄹ지라도·~ㄹ지언정</b>: ~지라도는 긴 세로선, ~지언정은 긴 호(◡로 시작)입니다. 앞말이 「~다고 할」이면 위 표시가 선에서 떨어지고, 「~지 않을」이면 표시가 선과 겹칩니다.'),
  'p:m7':intro('m7','<b>~치더라도·~손 치더라도</b>: 차줄(오른쪽 위로 오르는 선) 2cm 이상으로 씁니다. 앞에 「)」가 있으면 ~치더라도, 「(」가 있으면 ~손 치더라도입니다.')
 },
 questions:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,()=>CS[c].flatMap(k=>['pP:'+k,'pS:'+k])])),
 types:{
  pP:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pP:'+k),build:(k,id)=>({id,prompt:sh(k),q:'이 약기는 어떤 말일까요?',one:true,opts:pick(k).map(x=>opt(x,G[x].n)),ans:k,why:why(k)})},
  pS:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pS:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${G[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:pick(k).map(x=>opt(x,sh(x))),ans:k,why:why(k)})}
 },
 section:{title:'응용편 (제4장 287~290쪽 · 어미 ~ㄹ 것 같으면·~지라도·~치더라도)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
