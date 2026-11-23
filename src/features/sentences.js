/* 문장 영역. 교재 종합연습문제(1장 끝)의 정답 그림처럼, 문장은 어구(띄어 쓰는 단위)를 한 줄로 늘어놓고
   띄어 쓰는 곳에서는 펜을 떼고 옆에 따로 씁니다. 줄이 차면 다음 줄로 넘어갑니다. 문장은 직접 지은 짧은 문장이며,
   구성 단어가 모두 열리고(어구 영역을 배운 뒤) 선이 겹치지 않는 것만 나옵니다. 받침·ㅐ모음이 든 단어는 각 영역의 그리기 규칙으로 그리며, 그 규칙 개념도 모두 익혀야 나옵니다. 단어 사이 간격은 어구 영역과 같은 고정값입니다. */
(function(){
const SN=['모두 다시 가자','모두 다시 보자','모두 다시 하자','모두 바다 가자','모두 바다 보자','다시 바다 가자','다시 바다 보자','모두 지도 보자','다시 지도 보자',
 '모두 두부 사자','다시 두부 사자','다시 포도 사자','모두 포도 사자','모두 고기 사자','나무 하나 포도 하나','나무 하나 모자 하나','고기 하나 포도 하나','고기 하나 두부 하나','모자 하나 지도 하나','나비 하나 모자 하나',
 /* 받침이 든 문장(받침 이어쓰기 규칙) */
 '감자 하나 당근 하나','소금 하나 간장 하나','상자 하나 장갑 하나','사람 모두 가자','모두 고향 가자','사람 모두 고향 가자','모두 하늘 보자','다시 하늘 보자','모두 구름 보자','다시 구름 보자','다시 바람 보자','시간 다시 보자','모두 감자 사자','다시 당근 사자',
 /* ㅐ모음이 든 문장(ㅐ모음 규칙) */
 '고래 하나 해마 하나','나비 하나 매미 하나','배추 하나 채소 하나','모두 가게 가자','다시 가게 가자','모두 고래 보자','다시 해마 보자','모두 개나리 보자','다시 개나리 보자','모두 배구 하자','다시 배구 하자','모두 배추 사자','다시 배추 사자',
 /* 받침과 ㅐ모음이 함께 든 문장 */
 '사람 모두 가게 가자','사람 모두 고래 보자','감자 배추 다시 사자','소금 배추 다시 사자'];
/* 단어마다 그리기 규칙이 영역별로 다르다: 받침 단어는 받침 영역, ㅐ모음 단어는 ㅐ모음 영역, 그 밖은 기본 엔진 */
const hasB=w=>[...w].some(ch=>(ch.charCodeAt(0)-0xAC00)%28);
const WC=window.WORDCHECK||{};
const engineOf=w=>hasB(w)?(WC.b&&WC.b(w)?'b':null):(WC.ae&&WC.ae(w)?'ae':(okWord(w)&&(WORDS.includes(w)||drawsClean(w))?'base':null));
const dOf=(w,e)=>e==='b'?BATCHIM.bPath(w).d:e==='ae'?WORDSIG.ae(w):wordPath(w).d;
const kcsW=(w,e)=>e==='b'?BATCHIM.bKcs(w):e==='ae'?featType('ewsym').kcs(w):wordKcs(w);
const EN=new Map(),engine=w=>{if(!EN.has(w))EN.set(w,engineOf(w));return EN.get(w)};
const SENT=SN.filter(s=>s.split(' ').every(w=>engine(w)));
const GAP=14;
const wordsOf=s=>s.split(' ');
const LC=new Map();
function wLay(w){if(LC.has(w))return LC.get(w);const e=engine(w),d=dOf(w,e);
  const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('style','position:absolute;visibility:hidden;width:0;height:0');
  const pa=document.createElementNS('http://www.w3.org/2000/svg','path');pa.setAttribute('d',d);sv.appendChild(pa);document.body.appendChild(sv);
  const bb=pa.getBBox();document.body.removeChild(sv);
  const r={d,x0:bb.x-8,w:bb.width+16,y0:bb.y-8,y1:bb.y+bb.height+8};LC.set(w,r);return r}
function lineSVG(ws,S){let x=0,y0=1e9,y1=-1e9;const parts=ws.map(w=>{const b=wLay(w),tx=x-b.x0;x+=b.w+GAP;y0=Math.min(y0,b.y0);y1=Math.max(y1,b.y1);return {d:b.d,tx}});
  const W=x-GAP,H=y1-y0;
  return `<svg viewBox="0 ${y0.toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}" style="width:${(W*S).toFixed(0)}px;height:${(H*S).toFixed(0)}px;max-width:100%" aria-hidden="true"><g fill="none" stroke="var(--stroke)" stroke-width="${(3.4/S).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">${parts.map(p=>`<path transform="translate(${p.tx.toFixed(1)} 0)" d="${p.d}"/>`).join('')}</g></svg>`}
function lines(s,maxU){const ws=wordsOf(s),tot=ws.reduce((a,w,i)=>a+wLay(w).w+(i?GAP:0),0);
  if(tot<=maxU)return [ws];const h=Math.ceil(ws.length/2);return [ws.slice(0,h),ws.slice(h)]}
/* 문장 그림. maxPx 안에 줄바꿈하며, 모든 줄은 같은 배율로 그린다 */
function sentSVG(s,maxPx,sc){sc=Math.min(sc||1e9,RS());const L=lines(s,maxPx/sc);
  return `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;max-width:100%">${L.map(l=>lineSVG(l,sc)).join('')}</div>`}
const maxLineW=s=>Math.max(...lines(s,1e9).map(l=>l.reduce((a,w,i)=>a+wLay(w).w+(i?GAP:0),0)));
const kcsS=s=>['s:1',...new Set(wordsOf(s).flatMap(w=>kcsW(w,engine(w))))];
const why=s=>`${s} = ${wordsOf(s).join(' / ')}. 문장도 띄어 쓰는 곳마다 펜을 떼고 옆에 따로 씁니다.`;
const shared=(a,b)=>{const x=new Set(wordsOf(a));return wordsOf(b).filter(w=>x.has(w)).length};
/* 오답은 정답과 단어를 가장 많이 공유하는 문장 위주로 골라, 앞뒤만 훑어서는 못 풀고 모양을 하나하나 읽어야 한다 */
function others(s){const sig=x=>wordsOf(x).map(w=>wLay(w).d).join('|');
  const cand=SENT.filter(x=>x!==s&&wordsOf(x).length===wordsOf(s).length&&sig(x)!==sig(s)).map(x=>[x,shared(s,x)+Math.random()*.9]).sort((a,b)=>b[1]-a[1]);
  const ok=cand.filter(([x])=>kcsS(x).every(learned)),pick=(ok.length>=3?ok:cand);
  return pick.slice(0,3).map(p=>p[0])}
(window.WORDSIG=window.WORDSIG||{}).s=x=>wordsOf(x).map(w=>({d:dOf(w,engine(w)),tx:0}));
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
