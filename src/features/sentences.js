/* 문장 영역. 교재 종합연습문제(1장 끝)의 정답 그림처럼, 문장은 어구(띄어 쓰는 단위)를 한 줄로 늘어놓고
   띄어 쓰는 곳에서는 펜을 떼고 옆에 따로 씁니다. 줄이 차면 다음 줄로 넘어갑니다. 문장은 직접 지은 짧은 문장이며,
   구성 단어가 모두 열리고(어구 영역을 배운 뒤) 선이 겹치지 않는 것만 나옵니다. 단어 사이 간격은 어구 영역과 같은 고정값입니다. */
(function(){
const SN=['모두 다시 가자','모두 다시 보자','모두 다시 하자','모두 바다 가자','모두 바다 보자','다시 바다 가자','다시 바다 보자','모두 지도 보자','다시 지도 보자',
 '모두 두부 사자','다시 두부 사자','다시 포도 사자','모두 포도 사자','모두 고기 사자','나무 하나 포도 하나','나무 하나 모자 하나','고기 하나 포도 하나','고기 하나 두부 하나','모자 하나 지도 하나','나비 하나 모자 하나'];
const okW=w=>okWord(w)&&(WORDS.includes(w)||drawsClean(w));
const SENT=SN.filter(s=>s.split(' ').every(okW));
const GAP=14;
const wordsOf=s=>s.split(' ');
const wLay=w=>{const b=wordBox(w);return {d:wordPath(w).d,w:b.w,y0:b.y0,y1:b.y0+b.h,x0:b.x0}};
function lines(s,maxU){const ws=wordsOf(s),tot=ws.reduce((a,w,i)=>a+wLay(w).w+(i?GAP:0),0);
  if(tot<=maxU)return [ws];const h=Math.ceil(ws.length/2);return [ws.slice(0,h),ws.slice(h)]}
/* 문장 그림. maxPx 안에 줄바꿈하며, 모든 줄은 같은 배율로 그린다 */
function sentSVG(s,maxPx,sc){sc=Math.min(sc||1e9,RS());const L=lines(s,maxPx/sc);
  return `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;max-width:100%">${L.map(l=>window.phraseSVG(l.join(' '),0,sc)).join('')}</div>`}
const maxLineW=s=>Math.max(...lines(s,1e9).map(l=>l.reduce((a,w,i)=>a+wLay(w).w+(i?GAP:0),0)));
const kcsS=s=>['s:1',...new Set(wordsOf(s).flatMap(wordKcs))];
const why=s=>`${s} = ${wordsOf(s).join(' / ')}. 문장도 띄어 쓰는 곳마다 펜을 떼고 옆에 따로 씁니다.`;
const shared=(a,b)=>{const x=new Set(wordsOf(a));return wordsOf(b).filter(w=>x.has(w)).length};
/* 오답은 정답과 단어를 가장 많이 공유하는 문장 위주로 골라, 앞뒤만 훑어서는 못 풀고 모양을 하나하나 읽어야 한다 */
function others(s){const sig=x=>wordsOf(x).map(w=>wordPath(w).d).join('|');
  const cand=SENT.filter(x=>x!==s&&wordsOf(x).length===wordsOf(s).length&&sig(x)!==sig(s)).map(x=>[x,shared(s,x)+Math.random()*.9]).sort((a,b)=>b[1]-a[1]);
  const ok=cand.filter(([x])=>kcsS(x).every(learned)),pick=(ok.length>=3?ok:cand);
  return pick.slice(0,3).map(p=>p[0])}
(window.WORDSIG=window.WORDSIG||{}).s=x=>wordsOf(x).map(w=>({d:wordPath(w).d,tx:0}));
(window.FEATURES=window.FEATURES||[]).push({
  name:'문장',curr:['s:1'],info:['s:1'],after:'p:1',names:{'s:1':'문장 쓰기'},
  intro:{'s:1':()=>({prompt:sentSVG(SENT[0]||'모두 다시 가자',300),text:'<b>문장</b><br>문장은 어구를 한 줄로 늘어놓고, 띄어 쓰는 곳마다 펜을 떼고 다음 어구를 옆에 따로 씁니다. 문장부호는 쓰지 않아요. 줄이 차면 다음 줄에서 이어 씁니다.<br><small>교재 종합연습문제 정답 그림도 이렇게 어구마다 간격을 두고 씁니다. 간격은 정해진 길이가 없어서 이 연습장에서는 일정하게 그려요.</small>'})},
  questions:{},
  section:{title:'문장',kcs:['s:1']},
  types:{
    ssym:{kcs:k=>kcsS(k),ids:()=>SENT.map(s=>'ssym:'+s),
      build:(k,id)=>{const ws=shuf([k,...others(k)]);return {id,prompt:sentSVG(k,300),q:'이 속기 문장은 무엇일까요?',one:true,opts:ws.map(w=>({k:w,h:`<span class="big" style="font-size:22px">${w}</span>`})),ans:k,why:why(k)}}},
    spick:{kcs:k=>kcsS(k),ids:()=>SENT.map(s=>'spick:'+s),
      build:(k,id)=>{const ws=shuf([k,...others(k)]),sc=Math.min(RS(),230/Math.max(...ws.map(maxLineW))*1.6);
        return {id,prompt:`<span class="big" style="font-size:30px">${k}</span>`,q:`「${k}」을(를) 쓴 모양을 고르세요`,one:true,opts:ws.map(w=>({k:w,h:sentSVG(w,250,sc)})),ans:k,why:why(k)}}}
  }
});
})();
