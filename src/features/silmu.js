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

/* 도량형(실무편 12쪽, 일부): 킬로 = 4mm 길이의 「)」. 약기법보다 기본문자가 편하면 기본문자를 쓴다. */
const MEAS={
 'kg':{d:'<path d="M20 22C30 8 40 18 32 30C28 36 22 42 20 46H50"/>'},
 'kl':{d:'<path d="M32 10Q50 22 42 36Q40 44 30 52"/>'},
 'm':{d:'<path d="M26 20Q40 22 44 40"/>'},
 'cm':{d:'<path d="M46 20Q30 12 28 30Q30 44 46 40"/>'},
 'mm':{d:'<path d="M14 44Q14 22 26 26Q22 36 28 44Q28 26 42 26Q48 28 44 44Q50 28 62 28"/>'},
 'm²':{d:'<path d="M48 14Q22 10 28 26Q34 36 46 38Q40 52 20 46"/>'},
 'ha':{d:'<path d="M30 16L36 22L48 42"/>'},
 'g':{d:'<path d="M12 32C22 26 34 30 28 35C22 38 16 33 22 33H66"/>'},
 'inch':{d:'<path d="M28 38L36 22M40 38L48 22"/>'},
 'o(도)':{d:'<path d="M46 10L30 52"/>'},
 'ppm':{d:'<path d="M24 52V14Q46 10 44 26Q42 36 26 34"/>'},
 'yd':{d:'<path d="M26 14Q38 10 40 22Q34 30 30 22M40 22L24 54"/>'}
};
const MK=Object.keys(MEAS);
const REL={
 '~가지고':{d:'<path d="M26 12V46H56"/>',w:'「L」 모양의 약부입니다.'},
 '~합니다':{d:'<path d="M10 12L66 48"/>',w:'앞 글자 끝에서 하줄(↘)로 떼어 쓰는 긴 사선입니다.'},
 '~합니다마는':{d:'<path d="M10 12L62 46"/><circle cx="64.5" cy="48" r="3"/>',w:'「~합니다」의 ↘ 사선 끝에 작은 고리를 단 것입니다(~만/~마는은 구별하지 않고 ~마는으로 통일).'}
};
const RK=Object.keys(REL);
const TXT=[
 {k:'s:meas',q:'킬로(k) 단위 약기의 길이는?',o:['4mm','8mm','16mm','2mm'],a:0,w:'킬로(k)는 4mm 길이로 씁니다.'},
 {k:'s:meas',q:'약기법보다 기본문자가 더 편한 경우에는?',o:['기본문자로 쓴다','반드시 약기법을 쓴다','쓰지 않고 생략한다','점으로 대신한다'],a:0,w:'약기법보다 기본문자가 더 편한 경우에는 기본문자로 씁니다. 약기법은 절대적인 것이 아닙니다.'},
 {k:'s:rel',q:'「~합니다」 같은 특별어미는 어떻게 쓰나요?',o:['앞 글자 끝에서 하줄(↘)로 떼어 쓴다','앞 글자 위에 겹쳐 쓴다','앞 글자 머리에 쓴다','점 두 개로 쓴다'],a:0,w:'특별어미는 앞 글자 끝에서 하줄(↘)로 떼어 씁니다. 조사 다음에 나올 때 활용하면 편리합니다.'}
];

const F={
 name:'실무편 1장 보충약기법',
 curr:['s:su1','s:su2','s:meas','s:rel'],
 info:[],
 names:{'s:su1':'수·몇 + 백천만억','s:su2':'수·몇 + 십·만 고리','s:meas':'도량형 약기','s:rel':'~가지고·특별어미'},
 intro:{
  's:su1':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${['수백','수천','수만','수억','몇백','몇천'].map(w=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${GL(w[0],w.slice(1))}<small style="color:var(--mute);font-size:11px">${w}</small></span>`).join('')}</div>`,
   text:'<b>수사 약기 (실무편 1장 1절)</b><br>「수」는 ∧, 「몇」은 V로 씁니다. 그 뒤에 단위를 이어 붙입니다.<br>백 = 가로선 · 천 = 오른쪽 위로 뻗는 선 · 만 = 위로 볼록한 호 · 억 = 오른쪽 위로 휘어 오르는 곡선.<br>예) 수백 = ∧ + 가로선, 몇천 = V + 오른쪽 위 선.<br><small>그림은 교재의 약부를 보고 직접 다시 그린 약식 모양입니다.</small>'}),
  's:su2':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${['수십','몇십','수백만','수천만','몇백만','몇억만'].map(w=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${GL(w[0],w.slice(1))}<small style="color:var(--mute);font-size:11px">${w}</small></span>`).join('')}</div>`,
   text:'<b>십 · 만 고리</b><br>수십은 ∧의 끝을 아래로 말아 내리고, 몇십은 V 옆에 작은 원을 씁니다.<br>백·천·억에 「만」이 더 붙으면(백만·천만·억만) ∧나 V 끝, 단위 선이 시작되는 자리에 작은 고리를 넣고 단위 선을 잇습니다.<br>예) 수백만 = ∧ + 고리 + 가로선.'})
,
  's:meas':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${MK.map(k=>((h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`)(svg(MEAS[k].d),k)).join('')}</div>`,
   text:'<b>도량형 약기 (실무편 1장 1-4)</b><br>킬로(k)는 4mm 길이의 「)」로 씁니다. 길이·넓이·무게·농도 등 단위마다 정해진 약부가 있습니다.<br>참고: 약기법보다 기본문자가 더 편한 경우에는 기본문자로 씁니다. 약기법은 절대적인 것이 아닙니다.<br><small>그림은 교재를 보고 다시 그린 약식 모양이라 필체는 다릅니다. kg·km·kw·kcal·cal·t·평 등은 교재 12쪽에서 확인하세요.</small>'}),
  's:rel':()=>({prompt:`<div style="display:flex;flex-wrap:wrap;justify-content:center">${RK.map(k=>((h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`)(svg(REL[k].d),k)).join('')}</div>`,
   text:'<b>관계조사 약기법 (실무편 1장 2절)</b><br>~가지고 = 「L」. 특별어미는 앞 글자 끝에서 하줄(↘)로 떼어 씁니다: ~합니다 = 긴 ↘ 사선, ~합니다마는 = 사선 끝에 작은 고리.'})
 },
 questions:{
  's:su1':()=>shuf(poolOf('1')).slice(0,6).flatMap((w,i)=>[(i%2?'sP:':'sM:')+w]),
  's:su2':()=>shuf(poolOf('2')).slice(0,6).flatMap((w,i)=>[(i%2?'sP:':'sM:')+w]),
  's:meas':()=>[...shuf(MK).slice(0,5).flatMap((k,i)=>[(i%2?'sQ:':'sU:')+k]),...TXT.map((t,i)=>({t,i})).filter(x=>x.t.k==='s:meas').map(x=>'sT:'+x.i)],
  's:rel':()=>[...shuf(RK).flatMap(k=>['sR:'+k,'sS:'+k]),'sT:2']
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
,
  sU:{kcs:()=>['s:meas'],ids:()=>MK.map(k=>'sU:'+k),build:(k,id)=>({id,prompt:svg(MEAS[k].d).replace('<svg ','<svg style="width:140px;height:105px" '),q:'이 약기는 어떤 단위일까요?',one:true,opts:shuf(shuf(MK.filter(x=>x!==k)).slice(0,3).concat(k)).map(x=>({k:x,h:x})),ans:k,why:`이 모양이 「${k}」의 약기입니다.`})},
  sQ:{kcs:()=>['s:meas'],ids:()=>MK.map(k=>'sQ:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:32px">${k}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(shuf(MK.filter(x=>x!==k)).slice(0,3).concat(k)).map(x=>({k:x,h:svg(MEAS[x].d)})),ans:k,why:`「${k}」의 약기는 그림의 모양입니다.`})},
  sR:{kcs:()=>['s:rel'],ids:()=>RK.map(k=>'sR:'+k),build:(k,id)=>({id,prompt:svg(REL[k].d).replace('<svg ','<svg style="width:140px;height:105px" '),q:'이 약기는 무엇일까요?',one:true,opts:shuf(RK.map(x=>({k:x,h:x}))),ans:k,why:`${k}: ${REL[k].w}`})},
  sS:{kcs:()=>['s:rel'],ids:()=>RK.map(k=>'sS:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:30px">${k}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(RK.map(x=>({k:x,h:svg(REL[x].d)}))),ans:k,why:`${k}: ${REL[k].w}`})},
  sT:{kcs:k=>[TXT[+k].k],ids:()=>TXT.map((_,i)=>'sT:'+i),build:(k,id)=>{const t=TXT[+k];return {id,prompt:`<div class="txt">${t.q}</div>`,q:'책의 내용을 떠올려 보세요',one:true,opts:shuf(t.o.map(x=>({k:x,h:x}))),ans:t.o[t.a],why:t.w}}}
 },
 section:{title:'실무편 1장 보충약기법',kcs:['s:su1','s:su2','s:meas','s:rel']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
