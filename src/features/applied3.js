/* 응용편 제5장 운필 응용약자 (교재 315쪽 「운필에 의한 약자(1)」): 특별문자화된 글자 하나짜리 약자.
   경·권·민(첫글자)·해는 모양이 서로 뚜렷하고, 리·업·민(뒷글자)은 작은 갈고리라 비슷해서 따로 묶는다.
   개념 id 접두어 p:y.  그림은 교재 모양을 어림해 직접 그린 약식이다(교재의 2mm 크기 규정은 그림에 반영하지 않았다).
   교재 321·330쪽의 낱말별 흘림 약자(금리·어디·조국 등)는 모양이 제각각이라 문제로 만들지 않았다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const sv=inner=>`<svg viewBox="0 0 40 40" style="width:${(40*PXMM/3*1.1).toFixed(0)}px;height:${(40*PXMM/3*1.1).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 8px">${h}<small style="color:var(--mute);font-size:12px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});
/* 특별문자: syl 글자, pos 쓰이는 자리, g 묶음(1·2), d 그림, desc 모양 설명, words 교재 예시 단어 */
const S={
 gyeong:{syl:'경',pos:'첫',g:1,desc:'위가 짧고 아래로 크게 휘어 오른쪽으로 뻗는 반소원(ㄴ자 곡선)',d:'<path d="M10 10C4 12 4 25 14 25C20 25 26 24 30 21"/>',words:['경우','경주','경기','경험']},
 gwon:{syl:'권',pos:'첫',g:1,desc:'작은 고리 오른쪽에 가로선이 붙은 모양',d:'<path d="M13 17.5C13 14 6 14 6 19C6 23.5 13 23 13 18L31 17"/>',words:['권한','권력']},
 min1:{syl:'민',pos:'첫',g:1,desc:'뾰족한 산(∧) 모양',d:'<path d="M9 29L20 10L31 29"/>',words:['민사','민영','민첩','민생','민주','민주공화국']},
 hae:{syl:'해',pos:'끝',g:1,desc:'왼쪽으로 볼록한 호 「(」에 위쪽이 살짝 꺾인 모양',d:'<path d="M26 7C19 7 14 13 16 20C18 27 22 30 27 31"/>',words:['가해','노해','말해','반해','비해','저해','처해','통해','파해','이해']},
 ri:{syl:'리',pos:'끝',g:2,desc:'위에 작은 고리가 있고 왼쪽 아래로 비스듬히 내려오는 갈고리',d:'<path d="M25 6C29 5 29 12 24 14L17 30C16 33 12 33 10 31"/>',words:['관리','비리','논리']},
 eop:{syl:'업',pos:'끝',g:2,desc:'위에 작은 고리가 있고 곧게 내려오는 세로 갈고리',d:'<path d="M19 8C25 6 26 13 19 14V32"/>',words:['공업','농업','이업','기업','취업','상업']},
 min2:{syl:'민',pos:'끝',g:2,desc:'작은 고리에서 오른쪽 아래로 꼬리가 빠지는 갈고리',d:'<path d="M16 11C10 10 9 18 15 18L27 29"/>',words:['국민','시민','농민','농어민','주민','빈민']}
};
const K=Object.keys(S),G1=K.filter(k=>S[k].g===1),G2=K.filter(k=>S[k].g===2);
/* 비슷한 모양: 한 문제의 보기에는 이 중 하나만 */
const LOOK=['ri','eop','min2'];
const nm=k=>S[k].syl+'('+S[k].pos+'글자)';
const shape=k=>sv(S[k].d);
const under=(w,s)=>{const i=w.indexOf(s);return w.slice(0,i)+`<u style="text-decoration-thickness:3px;text-underline-offset:5px">${s}</u>`+w.slice(i+1)};
const kcOf=k=>[S[k].g===1?'p:y1':'p:y2'];
const learned=kcs=>kcs.indexOf('p:y2')>=0?K:G1;
/* 보기 모양 고르기: 같은 글자의 다른 모양은 민 문제의 함정으로만 쓴다 */
const pickShapes=(k,pool,trap)=>{
 for(let t=0;t<50;t++){
  const o=[k];if(trap)o.push(trap);
  shuf(pool.filter(x=>x!==k&&x!==trap&&S[x].syl!==S[k].syl)).forEach(x=>{if(o.length<4&&!(LOOK.includes(x)&&o.some(y=>LOOK.includes(y))))o.push(x)});
  if(o.length===4)return shuf(o)}
 return null};
const wordsOf=k=>S[k].words;
const allWords=pool=>pool.flatMap(k=>wordsOf(k).map(w=>[k,w]));
const gOf={y1:G1,y2:K,y3:K};

const F={
 name:'응용편 (운필 약자)',
 curr:['p:y1','p:y2','p:y3'],
 info:[],
 names:{'p:y1':'운필 특별문자: 경·권·민(첫)·해','p:y2':'운필 특별문자: 리·업·민(끝)','p:y3':'민의 두 모양: 첫글자와 끝글자'},
 intro:{
  'p:y1':()=>({prompt:row(G1.map(k=>lab(shape(k),nm(k)))),
   text:'<b>운필에 의한 약자: 특별문자</b><br>운필 약자는 빨리 쓰다가 생긴 작은 흘림 모양을 글자 하나의 약자로 정해 둔 것입니다. 낱말에서 해당 글자 자리를 이 작은 모양으로 씁니다.<br>'+
    G1.map(k=>`<b>${S[k].syl}</b>(${S[k].pos}글자): ${S[k].desc} — ${S[k].words.slice(0,4).join('·')}`).join('<br>')+
    '<br><small>교재는 「특별문자화된 것 외에는 운필 약자를 쓰지 않는 것이 좋다」고 합니다. 「기본」과 「근본」처럼 비슷한 말이 섞이기 때문입니다.</small>'}),
  'p:y2':()=>({prompt:row(G2.map(k=>lab(shape(k),nm(k)))),
   text:'<b>리·업·민(끝글자)은 작은 갈고리</b><br>셋 다 작은 고리가 달린 갈고리라 비슷해 보입니다. 꼬리 방향으로 가릅니다.<br>'+
    G2.map(k=>`<b>${S[k].syl}</b>(${S[k].pos}글자): ${S[k].desc} — ${S[k].words.slice(0,4).join('·')}`).join('<br>')+
    '<br><small>그림은 교재 모양을 어림한 것입니다. 실제 크기와 기울기는 교재 315쪽을 보세요.</small>'}),
  'p:y3':()=>({prompt:row(['min1','min2'].map(k=>lab(shape(k),nm(k)))),
   text:'<b>민은 자리에 따라 모양이 둘</b><br>첫글자 「민」은 산 모양(∧), 끝글자 「민」은 작은 고리 갈고리입니다.<br>민사·민영·민주처럼 낱말 맨 앞이면 ∧, 국민·시민·주민처럼 낱말 끝이면 갈고리입니다.'})
 },
 questions:{
  'p:y1':()=>shuf(G1.map(k=>'yQ:'+k).concat(G1.filter(k=>k!=='min1').flatMap(k=>['yR:'+k+'|'+shuf(wordsOf(k))[0],'yP:'+k+'|'+shuf(wordsOf(k))[0]]))),
  'p:y2':()=>shuf(G2.map(k=>'yQ:'+k).concat(['ri','eop'].flatMap(k=>['yR:'+k+'|'+shuf(wordsOf(k))[0],'yP:'+k+'|'+shuf(wordsOf(k))[0]]))),
  'p:y3':()=>shuf(['min1','min2'].flatMap(k=>[0,1].flatMap(i=>['yR:'+k+'|'+shuf(wordsOf(k))[i],'yP:'+k+'|'+shuf(wordsOf(k))[i]])))
 },
 types:{
  yQ:{kcs:k=>kcOf(k),ids:()=>K.map(k=>'yQ:'+k),build:(k,id)=>{
    const pool=K.filter(x=>S[x].syl!==S[k].syl&&(!LOOK.includes(k)||!LOOK.includes(x)));
    const sy=[...new Set(pool.filter(x=>S[k].g===1?S[x].g===1:true).map(x=>S[x].syl))].filter(s=>S[k].g===1||!['민','리','업'].includes(s)||S[k].syl===s);
    const wrong=shuf(sy.filter(s=>s!==S[k].syl)).slice(0,3);
    return {id,prompt:shape(k),q:'이 특별문자는 어느 글자일까요?',one:true,opts:shuf([S[k].syl,...wrong].map(s=>opt(s,s))),ans:S[k].syl,
     why:`${S[k].syl}: ${S[k].desc}은(는) ${S[k].pos}글자 「${S[k].syl}」의 특별문자입니다.`}}},
  yR:{kcs:(key)=>{const k=key.split('|')[0];return k.startsWith('min')?['p:y1','p:y2','p:y3']:kcOf(k)},ids:()=>allWords(K).map(([k,w])=>'yR:'+k+'|'+w),build:(key,id)=>{
    const [k,w]=key.split('|'),isMin=S[k].syl==='민';
    const pool=isMin?K:(S[k].g===1?G1:K),trap=isMin?(k==='min1'?'min2':'min1'):null;
    const o=pickShapes(k,pool,trap)||pickShapes(k,K,trap);
    return {id,prompt:`<span class="big" style="font-size:30px">${under(w,S[k].syl)}</span>`,q:'밑줄 친 글자를 쓰는 특별문자는?',opts:o.map(x=>opt(x,shape(x))),ans:k,
     why:`${w}의 「${S[k].syl}」은 ${S[k].pos}글자 자리이므로 ${S[k].desc}(으)로 씁니다.`}}},
  yP:{kcs:(key)=>{const k=key.split('|')[0];return k.startsWith('min')?['p:y1','p:y2','p:y3']:kcOf(k)},ids:()=>allWords(K).map(([k,w])=>'yP:'+k+'|'+w),build:(key,id)=>{
    const [k,w]=key.split('|'),isMin=S[k].syl==='민';
    const basePool=isMin?K:(S[k].g===1?G1:K.filter(x=>!LOOK.includes(x)||x===k));
    const ban=x=>(isMin?false:S[x].syl===S[k].syl)||(!isMin&&LOOK.includes(x)&&x!==k);
    const cand=allWords(basePool).filter(([x,ww])=>!ban(x)&&ww!==w&&!(!isMin&&ww.indexOf(S[k].syl)>=0)&&x!==k&&(isMin?S[x].syl!=='민':true)&&!(LOOK.includes(x)));
    /* 같은 글자 함정(민): 다른 쪽 모양의 낱말 하나 */
    const trap=isMin?shuf(wordsOf(k==='min1'?'min2':'min1'))[0]:null;
    const others=shuf(cand.map(c=>c[1]).filter((v,i,a)=>a.indexOf(v)===i)).slice(0,isMin?2:3);
    const opts=[w,...(trap?[trap]:[]),...others];
    return {id,prompt:shape(k),q:'이 특별문자를 쓰는 곳은 어느 낱말일까요?',one:true,opts:shuf(opts).map(x=>opt(x,x)),ans:w,
     why:`${S[k].desc}은(는) ${S[k].pos}글자 「${S[k].syl}」이므로 「${w}」입니다.`+(trap?` 「${trap}」의 「민」은 ${S[k==='min1'?'min2':'min1'].pos}글자 자리라 다른 모양을 씁니다.`:'')}}}
 },
 section:{title:'응용편 (제5장 운필 약자 315쪽)',kcs:['p:y1','p:y2','p:y3']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
