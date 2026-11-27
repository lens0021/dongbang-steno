/* 실무편 제1장 보충약기법 (교재 실무편 11쪽): 수사 약기 「수·몇 + 단위」.
   모양은 교재 그림을 보고 규칙(∧·V + 단위 선)으로 직접 다시 그린 약식 그림이다. 원본 이미지는 쓰지 않는다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const svg=(inner)=>`<svg viewBox="0 0 80 60" style="width:${(80*PXMM/3.6).toFixed(0)}px;height:${(60*PXMM/3.6).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* 수 = ∧ , 몇 = V. 단위: 백 = 가로선, 천 = 오른쪽 위로 뻗는 선, 만 = 호(⌒), 억 = 오른쪽 위로 휘는 곡선, 십 = 수는 끝을 말아 내림 / 몇은 V 옆에 작은 원 */
const BASE={'수':{leg:'M10 42L19 16L28 42',x:28,y:42,ring:[27,44]},'몇':{leg:'M10 18L20 44',x:20,y:44,ring:[20,46]}};
const UNIT={
 '백':(x,y)=>`M${x} ${y}H${x+38}`,
 '천':(x,y)=>`M${x} ${y}L${x+38} ${y-16}`,
 '만':(x,y)=>`M${x} ${y}Q${x+16} ${y-20} ${x+34} ${y-4}`,
 '억':(x,y)=>`M${x} ${y}C${x+6} ${y} ${x+22} ${y-6} ${x+32} ${y-30}`
};
function glyph(b,u){
 const B=BASE[b];
 if(u==='십'){return b==='수'?'<path d="M10 42L19 16L28 32Q31 41 22 52"/>':'<path d="M8 18L17 44L26 18"/><circle cx="39" cy="34" r="7"/>'}
 const man=u.length>1&&u.endsWith('만'),un=man?u[0]:u;
 if(!man)return `<path d="${B.leg}"/><path d="${UNIT[un](B.x,B.y)}"/>`;
 const [rx,ry]=B.ring;
 return `<path d="${B.leg}"/><circle cx="${rx}" cy="${ry}" r="3.4"/><path d="${UNIT[un](B.x+3.4,B.y+2)}"/>`;
}
const GL=(b,u)=>svg(glyph(b,u));
const BASIC=['백','천','만','억'];
const ADV=['십','백만','천만'];
const items=(set)=>['수','몇'].flatMap(b=>set.filter(u=>!(b==='수'&&u==='억만')).map(u=>b+u));
const ALLI={ '1':items(BASIC), '2':items(ADV).concat(['몇억만']) };
const poolOf=k=>ALLI[k];
const kcOf=w=>BASIC.includes(w.slice(1))?'s:su1':'s:su2';
const hanKey=w=>w;

const F={
 name:'실무편 1장 보충약기법',
 curr:['s:su1','s:su2'],
 info:[],
 names:{'s:su1':'수·몇 + 백천만억','s:su2':'수·몇 + 십·만 고리'},
 intro:{
  's:su1':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${['수백','수천','수만','수억','몇백','몇천'].map(w=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${GL(w[0],w.slice(1))}<small style="color:var(--mute);font-size:11px">${w}</small></span>`).join('')}</div>`,
   text:'<b>수사 약기 (실무편 1장 1절)</b><br>「수」는 ∧, 「몇」은 V로 씁니다. 그 뒤에 단위를 이어 붙입니다.<br>백 = 가로선 · 천 = 오른쪽 위로 뻗는 선 · 만 = 위로 볼록한 호 · 억 = 오른쪽 위로 휘어 오르는 곡선.<br>예) 수백 = ∧ + 가로선, 몇천 = V + 오른쪽 위 선.<br><small>그림은 교재의 약부를 보고 직접 다시 그린 약식 모양입니다.</small>'}),
  's:su2':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${['수십','몇십','수백만','수천만','몇백만','몇억만'].map(w=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${GL(w[0],w.slice(1))}<small style="color:var(--mute);font-size:11px">${w}</small></span>`).join('')}</div>`,
   text:'<b>십 · 만 고리</b><br>수십은 ∧의 끝을 아래로 말아 내리고, 몇십은 V 옆에 작은 원을 씁니다.<br>백·천·억에 「만」이 더 붙으면(백만·천만·억만) ∧나 V 끝, 단위 선이 시작되는 자리에 작은 고리를 넣고 단위 선을 잇습니다.<br>예) 수백만 = ∧ + 고리 + 가로선.'})
 },
 questions:{
  's:su1':()=>shuf(poolOf('1')).slice(0,6).flatMap((w,i)=>[(i%2?'sP:':'sM:')+w]),
  's:su2':()=>shuf(poolOf('2')).slice(0,6).flatMap((w,i)=>[(i%2?'sP:':'sM:')+w])
 },
 types:{
  sM:{kcs:k=>[kcOf(k)],ids:()=>[...poolOf('1'),...poolOf('2')].map(w=>'sM:'+w),build:(k,id)=>{
    const pool=poolOf(kcOf(k)==='s:su1'?'1':'2'),b=k[0],u=k.slice(1);
    /* 보기: 같은 단위의 수/몇 한 쌍을 꼭 넣어 ∧·V 구별도 묻는다 */
    const other=(b==='수'?'몇':'수')+u;
    const rest=shuf(pool.filter(x=>x!==k&&x!==other));
    const opts=shuf([k,...(pool.includes(other)?[other]:[]),...rest]).slice(0,4);
    const fin=opts.includes(k)?opts:shuf([k,...opts.slice(0,3)]);
    return {id,prompt:GL(b,u).replace('<svg ','<svg style="width:150px;height:112px" '),q:'이 약기는 무엇일까요?',one:true,opts:fin.map(x=>({k:x,h:x})),ans:k,
     why:`${b==='수'?'∧':'V'} 모양이라 「${b}」, 그 뒤 선이 「${u}」의 단위 선이라 「${k}」입니다.`}}},
  sP:{kcs:k=>[kcOf(k)],ids:()=>[...poolOf('1'),...poolOf('2')].map(w=>'sP:'+w),build:(k,id)=>{
    const pool=poolOf(kcOf(k)==='s:su1'?'1':'2'),b=k[0],u=k.slice(1);
    const other=(b==='수'?'몇':'수')+u;
    const rest=shuf(pool.filter(x=>x!==k&&x!==other));
    const opts=shuf([k,...(pool.includes(other)?[other]:[]),...rest]).slice(0,4);
    const fin=opts.includes(k)?opts:shuf([k,...opts.slice(0,3)]);
    return {id,prompt:`<span class="big" style="font-size:32px">${k}</span>`,q:'어떤 약기로 쓸까요?',opts:fin.map(x=>({k:x,h:GL(x[0],x.slice(1))})),ans:k,
     why:`「${b}」는 ${b==='수'?'∧':'V'}, 「${u}」는 ${u==='십'?(b==='수'?'끝을 말아 내림':'작은 원'):'단위 선'}으로 써서 그림처럼 됩니다.`}}}
 },
 section:{title:'실무편 1장 보충약기법',kcs:['s:su1','s:su2']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
