/* 응용편 제4장 중간 응용 약기법 (교재 257~268쪽): 중간약자. 개념 id 접두어 p:m. 문제 유형 pM(모양→말)·pN(말→모양).
   중간약자 = 문자의 첫자만 쓰고 중간을 생략하는 약기법. 그림은 교재의 손글씨 모양을 보고 직접 어림해 그린 약식이다.
   모양이 서로 확실히 구별되는 항목만 골랐고, 비슷한 것(한시바삐·하루빨리·아무런 …)은 교재 257쪽을 보게 한다. */
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
 bappi:{n:'하루바삐',d:P('M6 6L18 13C10 15 12 20 20 21C14 23 16 26 22 29'),w:'오른쪽 아래로 내려가다 두 번 꼬이는 선(ㄹ 꼴)'},
 sokhi:{n:'하루속히',d:P('M5 34Q5 18 20 10L25 14L16 14'),w:'왼쪽 아래에서 오른쪽 위로 휘어 올라가 끝에 작은 꺾쇠(>)가 붙은 선'},
 achim:{n:'하루아침에',d:P('M4 8C5 16 8 20 12 20L48 5'),w:'작은 V자로 내려갔다가 오른쪽 위로 곧게 길게 뻗는 선'},
 jongil:{n:'하루종일',d:P('M4 8C5 16 8 20 12 20C20 8 30 6 42 8'),w:'작은 V자로 내려갔다가 오른쪽 위로 둥글게 휘어 올라가는 선'},
 daebubun:{n:'대부분',d:P('M14 4L10 10Q6 22 18 31Q24 34 32 30'),w:'위가 꺾인 채 왼쪽 아래로 둥글게 내려와 오른쪽으로 올라가는 호'},
 majimot:{n:'마지못해',d:P('M5 10C8 4 18 4 15 11L12 13L24 24'),w:'위로 둥글게 휘었다가 오른쪽 아래로 꺾여 내려가는 선'},
 hadamot:{n:'하다못해',d:P('M5 6L19 13L9 16L24 27'),w:'오른쪽 아래, 왼쪽으로 꺾음, 다시 오른쪽 아래로 가는 Z 꼴'},
 yeoreo:{n:'여러 가지',d:P('M4 10C4 18 12 18 12 12C13 18 20 18 22 16L38 16'),w:'작은 반원 모양 뒤에 오른쪽으로 평평하게 뻗는 선'},
 geuya:{n:'그야말로',d:P('M3 14H44C47 17 50 19 56 17'),w:'긴 가로선 끝에 작게 말려 내려가는 꼬리'},
 iya:{n:'이야말로',d:P('M5 4V24C10 26 14 22 26 22'),w:'세로로 내려와 오른쪽으로 둥글게 꺾이는 선'},
 chari:{n:'차라리',d:P('M18 3C23 2 23 9 17 10Q15 26 6 39'),w:'맨 위에 작은 갈고리가 있고 왼쪽 아래로 길게 내려오는 선'},
 song:{n:'송두리째',d:P('M26 8C22 2 16 4 16 10C16 18 8 22 8 30C8 35 14 35 19 32'),w:'위에 작은 고리가 있고 왼쪽 아래로 내려오다 끝이 오른쪽으로 말리는 선'},
 yokeon:{n:'요컨대',d:P('M4 20C4 27 14 28 21 18C25 12 31 14 27 20C26 24 25 27 30 29'),w:'둥글게 올라가다 오른쪽 끝이 3 꼴로 말리는 선'},
 hoego:{n:'회고컨대',d:P('M5 4C8 8 14 14 28 21C34 25 30 29 25 36'),w:'왼쪽 위에서 오른쪽 아래로 길게 내려가 끝이 작게 말리는 선'},
 ppun:{n:'뿐 아니라',d:P('M6 6C6 20 14 26 24 20'),w:'왼쪽 위에서 U자로 내려와 오른쪽으로 올라가는 선(고리 없음)'},
 ppunman:{n:'뿐만 아니라',d:P('M6 6C6 20 12 27 21 24C28 21 26 14 20 17'),w:'U자 끝에 작은 고리가 하나 붙은 선'},
 ppunmani:{n:'뿐만이 아니라',d:P('M6 6C6 20 12 28 20 26C30 23 27 13 20 17C17 20 21 24 26 21'),w:'U자 끝에 고리가 크게 말려 한 번 더 돌아 나오는 선'},
 maeum:{n:'마음대로',d:P('M4 16C6 6 18 6 26 10L20 30'),w:'위로 둥글게 휘다가 오른쪽에서 아래로 꺾여 내려오는 선'},
 nareum:{n:'나름대로',d:P('M3 8C6 16 10 16 12 11C16 6 22 6 27 9L21 30'),w:'앞에 작은 홈(ㅅ자 오목)이 있고 오른쪽에서 아래로 꺾여 내려오는 선'},
 munja:{n:'문자 그대로',d:P('M3 15A2.4 2.4 0 1 1 8 15C10 8 20 6 28 10L22 30'),w:'앞에 작은 동그라미가 달린 호 뒤에 아래로 내려오는 선'},
 geulja:{n:'글자 그대로',d:P('M3 8C3 5 8 5 8 8C8 11 4 11 8 13H40L35 28'),w:'앞에 작은 고리가 달린 긴 가로선 끝에서 아래로 꺾이는 선'},
 geudae:{n:'그대로',d:P('M4 12H42L37 26'),w:'긴 가로선 끝에서 아래로 짧게 꺾이는 선(앞고리 없음)'},
 gosa:{n:'고사하고',d:P('M3 10H28C31 12 35 13 37 20'),w:'가로선 끝이 꼬리처럼 아래로 꺾이는 선'},
 mwoni:{n:'뭐니뭐니해도',d:P('M3 18C6 12 14 10 24 10C32 10 36 12 38 18L46 26'),w:'앞이 말린 둥근 곡선이 오른쪽 아래로 꺾여 끝나는 선'},
 baya:{n:'바야흐로',d:P('M4 4L10 14L6 17L34 36'),w:'위에서 짧게 꺾인 뒤 긴 사선이 오른쪽 아래로 내려가는 선'},
 dera0:{n:'~더라도',d:P('M6 36L28 4'),w:'아래에서 위로 오르는 긴 사선 하나(2cm 이상)'},
 eopdeo:{n:'없더라도',d:P('M6 36L28 4M28 4Q34 0 32 8'),w:'긴 사선의 위쪽 끝에 작은 갈고리가 붙음'},
 doen:{n:'된다고 하더라도',d:P('M2 10Q14 18 26 8M10 36L30 8'),w:'긴 사선 위쪽에 앞말을 나타내는 둥근 호가 얹힘'},
 deuri:{n:'드리지 않더라도',d:P('M6 36L28 8L35 3'),w:'긴 사선 위쪽 끝이 짧게 꺾임'}
};
const CS={
 m1:['bappi','sokhi','achim','jongil','daebubun','majimot','hadamot'],
 m2:['yeoreo','geuya','iya','chari','song','yokeon','hoego'],
 m3:['ppun','ppunman','ppunmani','maeum','nareum','munja','geulja','geudae','gosa','mwoni','baya'],
 m4:['dera0','eopdeo','doen','deuri']
};
const NAMES={m1:'중간약자 (1) 하루~·대부분 …',m2:'중간약자 (1) 그야말로·차라리 …',m3:'중간약자 (2) 뿐 아니라·그대로 …',m4:'~더라도'};
const KC=Object.keys(CS).map(c=>'p:'+c);
const cof=k=>Object.keys(CS).find(c=>CS[c].includes(k));
const sh=k=>sv(G[k].d);
const why=k=>`${G[k].n}: ${G[k].w}입니다.`;
const pick=k=>{const pool=CS[cof(k)].filter(x=>x!==k);return shuf([k,...shuf(pool).slice(0,3)])};
const intro=(c,t)=>()=>({prompt:row(CS[c].slice(0,6).map(k=>lab(sh(k),G[k].n))),text:t+'<br><small>그림은 교재 손글씨를 보고 어림해 그린 약식입니다. 교재 257·262쪽의 모양과 비교해 보세요.</small>'});
const F={
 name:'응용편 (중간약자)',
 curr:KC,info:[],
 names:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,NAMES[c]])),
 intro:{
  'p:m1':intro('m1','<b>중간약자 (1)</b>: 문자의 첫자만 쓰고 중간을 생략하는 약기법입니다. 「하루~」 같은 말은 「하루」를 쓰지 않고 뒤에 오는 말의 특징을 한 획에 담습니다. 종선(가운데 줄)에 씁니다.<br>'+CS.m1.map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')),
  'p:m2':intro('m2','<b>중간약자 (1) 계속</b><br>'+CS.m2.map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')),
  'p:m3':intro('m3','<b>중간약자 (2)</b>: 「뿐 아니라」는 고리 수로, 「~대로」는 머리 모양으로 구별합니다.<br>'+CS.m3.map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')+'<br><small>이른바·이를테면 등 작은 약자는 교재 262쪽을 보세요.</small>'),
  'p:m4':intro('m4','<b>어미 「~더라도」</b>: 「나」 위치에서 출발해 길이 2cm 이상의 사선으로 씁니다. 앞말에 따라 꼬리가 달라집니다.<br>'+CS.m4.map(k=>`${G[k].n}: ${G[k].w}`).join('<br>'))
 },
 questions:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,()=>CS[c].flatMap(k=>['pM:'+k,'pN:'+k])])),
 types:{
  pM:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pM:'+k),build:(k,id)=>({id,prompt:sh(k),q:'이 약기는 어떤 말일까요?',one:true,opts:pick(k).map(x=>opt(x,G[x].n)),ans:k,why:why(k)})},
  pN:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pN:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${G[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:pick(k).map(x=>opt(x,sh(x))),ans:k,why:why(k)})}
 },
 section:{title:'응용편 (제4장 257~268쪽 · 중간약자)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
