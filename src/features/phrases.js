/* 어구(띄어쓰기) 영역. 교재 40쪽: "속기에서도 적당한 띄어쓰기를 하며 문장부호는 사용하지 않는다." 41쪽 정답 그림처럼
   띄어쓰는 곳에서는 펜을 떼고 다음 단어를 이어서 쓰지 않고 따로 옆에 씁니다. 그 모양만 그립니다(단어 사이 간격은 임의의 고정값).
   구성 단어가 모두 열려야 나오고, 단어는 drawsClean 검사를 통과한 것만 씁니다. */
(function(){
const PH=['모두 가자','다시 가자','자주 가자','바다 가자','나무 가지','포도 하나','호두 하나','고기 하나','두부 하나','모자 하나','지도 하나','다시 하자','모두 하자','가자 모두','다시 보자','하루 하나'];
const okW=w=>okWord(w)&&(WORDS.includes(w)||drawsClean(w));
const PHR=PH.filter(p=>p.split(' ').every(okW));
const GAP=14;
function phraseLayout(ws){let x=0,y0=1e9,y1=-1e9;const parts=ws.map(w=>{const b=wordBox(w),tx=x-b.x0;x+=b.w+GAP;y0=Math.min(y0,b.y0);y1=Math.max(y1,b.y0+b.h);return {d:wordPath(w).d,tx}});return {parts,w:x-GAP,y0,h:y1-y0}}
function phraseSVG(ph,h=90,S){const L=phraseLayout(ph.split(' '));S=Math.min(S||1e9,RS());
  const size=S?`width:${(L.w*S).toFixed(0)}px;height:${(L.h*S).toFixed(0)}px;max-width:100%`:`width:100%;max-width:300px;height:${h}px`;
  return `<svg viewBox="0 ${L.y0.toFixed(1)} ${L.w.toFixed(1)} ${L.h.toFixed(1)}" style="${size}" aria-hidden="true"><g fill="none" stroke="var(--stroke)" stroke-width="${S?penW(S).toFixed(2):2.6}" stroke-linecap="round" stroke-linejoin="round">${L.parts.map(p=>`<path transform="translate(${p.tx.toFixed(1)} 0)" d="${p.d}"/>`).join('')}</g></svg>`}
const kcsP=p=>['p:1',...new Set(p.split(' ').flatMap(wordKcs))];
const why=p=>{const ws=p.split(' ');return `<span style="display:flex;align-items:flex-start;gap:10px"><span style="width:96px;flex:none;border:1px solid var(--line);border-radius:10px;background:var(--card);padding:4px">${phraseSVG(p,44)}</span><span>그림에서 <b>끊어진 덩어리가 ${ws.length}개</b>이고, 덩어리마다 한 단어를 이어 쓴 것입니다: ${ws.map(w=>`「${w}」`).join(' + ')}. 띄어쓰는 자리에서 펜을 떼고 옆에 따로 쓰기 때문에 덩어리 수와 단어 수가 같아요.</span></span>`};
const others=p=>pickDistractors(p,PHR,3,x=>kcsP(x).slice(1),x=>phraseLayout(x.split(' ')).parts);
window.phraseSVG=phraseSVG;
(window.WORDSIG=window.WORDSIG||{}).p=x=>phraseLayout(x.split(' ')).parts;
(window.FEATURES=window.FEATURES||[]).push({
  name:'어구',curr:['p:1'],info:['p:1'],after:'c:이',names:{'p:1':'띄어쓰기(어구)'},
  intro:{'p:1':()=>({prompt:phraseSVG(PHR[0]||'가자',110),text:'<b>띄어쓰기</b><br>속기에서도 적당히 띄어 쓰고, 문장부호는 쓰지 않습니다(교재 40쪽). 띄어쓰는 곳에서는 펜을 떼고 다음 단어를 옆에 따로 씁니다.<br><small>단어 사이 간격은 정해진 길이가 없어서 이 연습장에서는 일정하게 그려요.</small>'})},
  questions:{},
  section:{title:'어구',kcs:['p:1']},
  types:{
    psym:{kcs:(k)=>kcsP(k),ids:()=>PHR.map(p=>'psym:'+p),
      build:(k,id)=>{const ws=shuf([k,...others(k)]);return {id,prompt:phraseSVG(k,120),q:'이 속기 어구는 무엇일까요?',opts:ws.map(w=>({k:w,h:`<span class="big" style="font-size:22px">${w}</span>`})),ans:k,why:why(k)}}},
    ppick:{kcs:(k)=>kcsP(k),ids:()=>PHR.map(p=>'ppick:'+p),
      build:(k,id)=>{const ws=shuf([k,...others(k)]),bx=ws.map(w=>phraseLayout(w.split(' '))),sc=Math.min(RS(),150/Math.max(...bx.map(b=>b.w)),70/Math.max(...bx.map(b=>b.h)));
        return {id,prompt:`<span class="big" style="font-size:40px">${k}</span>`,q:`「${k}」을(를) 띄어 쓴 모양을 고르세요`,opts:ws.map(w=>({k:w,h:phraseSVG(w,0,sc)})),ans:k,why:why(k)}}}
  }
});
})();
