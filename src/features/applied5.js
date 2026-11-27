/* 응용편 제4장 중간약자(3)(4) (교재 276·282쪽): ~바와 같이, 미루어~, ~마지 않는다. 개념 id p:m9·m10, 문제 유형 pT(모양→말)·pU(말→모양).
   그림은 교재 손글씨를 보고 어림해 그린 약식이다. 비슷한 것(주지하는~ 등 작은 말림)은 뺐다. */
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
 mi1:{n:'미루어(~다)',d:P('M4 18Q16 6 32 11C37 13 41 14 46 19'),w:'위로 볼록한 긴 호가 오른쪽 끝에서 아래로 꺾이는 선'},
 mi2:{n:'미루어서',d:P('M4 18Q16 6 30 10C37 10 42 14 38 20L36 24'),w:'위로 볼록한 긴 호 끝이 안으로 말려 짧게 내려오는 선'},
 mi3:{n:'미루어보다',d:P('M4 14Q16 4 30 8C36 10 38 14 46 24'),w:'위로 볼록한 호 뒤에 긴 사선이 오른쪽 아래로 내려가는 선'},
 mi4:{n:'미루어보건대',d:P('M4 14Q16 4 28 8L38 15L43 18M38 17L41 25'),w:'호 뒤 사선 끝에 작은 갈고리와 아래로 짧은 획이 붙는 선'},
 mi5:{n:'미루어볼 때',d:P('M4 14Q16 4 28 8L36 16L46 19M40 16L41 26'),w:'호 뒤 사선 끝에 「ㅜ」 꼴로 아래로 내려가는 획이 붙는 선'},
 ma1:{n:'빌어마지 않는다',d:P('M6 4C8 16 18 26 30 28C34 29 36 25 32 25L36 32'),w:'위에서 오른쪽 아래로 길게 내려가 끝이 작게 말리는 선'},
 ma2:{n:'바라마지 않는다',d:P('M6 22C10 22 16 25 20 28C24 24 30 24 34 29'),w:'아주 작은 물결 모양(S 꼴)이 낮게 이어지는 선'},
 ma3:{n:'믿어마지 않는다',d:P('M4 24Q18 14 38 19C43 21 40 26 36 23'),w:'낮게 누운 긴 호 끝에 작은 고리가 붙는 선'},
 ba1:{n:'아는 바와 같이',d:P('M4 22C8 18 14 20 16 24C20 18 28 22 30 28'),w:'작은 물결 두 개가 낮게 이어지는 선'},
 ba2:{n:'본 바와 같이',d:P('M6 6C2 8 6 14 10 12C14 14 20 22 24 30C26 34 30 34 36 32'),w:'위가 작게 말리고 오른쪽 아래로 내려오다 끝이 구부러지는 선'},
 ba3:{n:'아시는 바와 같이',d:P('M28 4L20 14L14 32C12 38 18 38 20 34'),w:'위에서 왼쪽 아래로 길게 내려오다 끝이 작게 말리는 선(위가 꺾임)'},
 ba4:{n:'보신 바와 같이',d:P('M4 8Q14 8 22 12M20 12L10 30C9 36 14 38 18 34'),w:'위에 호가 있고 거기서 왼쪽 아래로 길게 내려오는 선'},
 ba5:{n:'계시는 바와 같이',d:P('M10 6H24L12 28C10 34 12 38 16 36'),w:'위가 「ㄱ」으로 꺾인 뒤 왼쪽 아래로 길게 내려오는 선'}
};
const CS={
 m9:['mi1','mi2','mi3','mi4','mi5','ma1','ma2','ma3'],
 m10:['ba1','ba2','ba3','ba4','ba5']
};
const NAMES={m9:'중간약자 (4) 미루어~·~마지 않는다',m10:'중간약자 (3) ~바와 같이'};
const KC=Object.keys(CS).map(c=>'p:'+c);
const cof=k=>Object.keys(CS).find(c=>CS[c].includes(k));
const sh=k=>sv(G[k].d);
const why=k=>`${G[k].n}: ${G[k].w}입니다.`;
const pick=k=>{const pool=CS[cof(k)].filter(x=>x!==k);return shuf([k,...shuf(pool).slice(0,3)])};
const intro=(c,t)=>()=>({prompt:row(CS[c].map(k=>lab(sh(k),G[k].n))),text:t+'<br>'+CS[c].map(k=>`${G[k].n}: ${G[k].w}`).join('<br>')+'<br><small>그림은 교재 손글씨를 보고 어림해 그린 약식입니다. 교재 276·282쪽과 비교해 보세요.</small>'});
const F={
 name:'응용편 (중간약자 3·4)',
 curr:KC,info:[],
 names:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,NAMES[c]])),
 intro:{
  'p:m9':intro('m9','<b>미루어~ · ~마지 않는다</b>: 「미루어」는 위로 볼록한 긴 호로 시작하고, 뒤에 붙는 꼬리로 서서·보다·보건대·볼 때를 구별합니다. 「~마지 않는다」는 낮게 이어지는 작은 선들입니다.'),
  'p:m10':intro('m10','<b>~바와 같이</b>: 앞말(아는·본·아시는·보신·계시는)에 따라 모양이 달라집니다. 높임말(~시는)은 위에서 왼쪽 아래로 길게 내려오는 선입니다.')
 },
 questions:Object.fromEntries(Object.keys(CS).map(c=>['p:'+c,()=>CS[c].flatMap(k=>['pT:'+k,'pU:'+k])])),
 types:{
  pT:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pT:'+k),build:(k,id)=>({id,prompt:sh(k),q:'이 약기는 어떤 말일까요?',one:true,opts:pick(k).map(x=>opt(x,G[x].n)),ans:k,why:why(k)})},
  pU:{kcs:k=>['p:'+cof(k)],ids:()=>Object.keys(G).map(k=>'pU:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${G[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:pick(k).map(x=>opt(x,sh(x))),ans:k,why:why(k)})}
 },
 section:{title:'응용편 (제4장 276·282쪽 · 미루어~·~바와 같이)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
