/* 응용편 제2장 동사 약기법: 위치(어미) 변화 (교재 115~123·131·148~153쪽). 개념 id 접두어 vp:.
   기본형 선(가로선·호)에 짧은 표(삐침 /·\, 가로 획 ―, 작은 고리 ○, 「(」 「<」)를 선의 앞·가운데·끝, 선의 위·아래에 붙여
   어미를 구별한다. 표의 위치는 교재 위치 도표(115·131·148쪽)를 보고 그렸다.
   위: 선 위쪽, 아래: 선 아래쪽. 시제(~었다·~겠다)와 ~는 것이 어쩌구는 모양이 복잡해 이 파일에서 다루지 않는다. */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const sv=(inner,w=96,h=56)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});

/* 기본형 선(가로선·호): 점 P0,P1(제어),P2 — 직선은 P1 = 중점 */
const STM={
 ga:{v:'간다',  d:'M8 28H20', P:[[8,28],[14,28],[20,28]],X:'가',  PA:'간',  L:'갈'},
 go:{v:'일으킨다',d:'M8 28H32',P:[[8,28],[20,28],[32,28]],X:'일으키',PA:'일으킨',L:'일으킬'},
 geu:{v:'나간다',d:'M8 28H56',P:[[8,28],[32,28],[56,28]],X:'나가',PA:'나간',L:'나갈'},
 na:{v:'지킨다',d:'M8 24Q14 30 20 24',P:[[8,24],[14,30],[20,24]],X:'지키',PA:'지킨',L:'지킬'},
 no:{v:'된다',  d:'M8 22Q20 32 32 22',P:[[8,22],[20,32],[32,22]],X:'되',PA:'된',L:'될'},
 neu:{v:'모른다',d:'M8 20Q32 36 56 20',P:[[8,20],[32,36],[56,20]],X:'모르',PA:'모른',L:'모를'}
};
const SK=Object.keys(STM);
const at=(s,u)=>{const [a,b,c]=STM[s].P;const w=[(1-u)*(1-u),2*u*(1-u),u*u];return [a[0]*w[0]+b[0]*w[1]+c[0]*w[2],a[1]*w[0]+b[1]*w[1]+c[1]*w[2]]};
/* 위치: s 앞 · m 가운데 · e 끝, 방향: u 위 · d 아래 */
const UP={s:.12,m:.5,e:.9};
const POSN={s:'앞',m:'가운데',e:'끝'},SIDEN={u:'선 위',d:'선 아래'};
function mark(kind,x,y){
 switch(kind){
  case '/': return `<path d="M${f1(x-2)} ${f1(y+3)}L${f1(x+2)} ${f1(y-3)}"/>`;
  case '\\':return `<path d="M${f1(x-2)} ${f1(y-3)}L${f1(x+2)} ${f1(y+3)}"/>`;
  case '-': return `<path d="M${f1(x-3.5)} ${f1(y)}L${f1(x+3.5)} ${f1(y)}"/>`;
  case 'o': return `<circle cx="${f1(x)}" cy="${f1(y)}" r="2.2"/>`;
  case '(': return `<path d="M${f1(x+1.8)} ${f1(y-3.5)}Q${f1(x-1.8)} ${f1(y)} ${f1(x+1.8)} ${f1(y+3.5)}"/>`;
  case '<': return `<path d="M${f1(x+2.8)} ${f1(y-3)}L${f1(x-1)} ${f1(y)}L${f1(x+2.8)} ${f1(y+3)}"/>`;
 }
}
const shape=(s,kind,pos,side)=>{const [x,y]=at(s,UP[pos]);const my=y+(side==='u'?-6:6);return sv(`<path d="${STM[s].d}"/>`+mark(kind,x,my))};
const stemShape=s=>sv(`<path d="${STM[s].d}"/>`);

/* 어미 표: 키 → [모양 종류, 위치, 방향, 만드는 글(기본형 말줄기 X·받침 활용 PA·ㄹ활용 L), 세트] */
const E={
 /* 위치(2) 교재 115쪽 */
 nikka:['/', 's','u',x=>x.X+'니까','p1'],  neunya:['/','m','u',x=>x.X+'느냐','p1'],  dago:['/','e','u',x=>x.PA+'다고','p1'],
 myeon:['/','s','d',x=>x.X+'면','p1'],     neunji:['/','m','d',x=>x.X+'는지','p1'],  daneunde:['/','e','d',x=>x.PA+'다는데','p1'],
 /* 하줄 삐침(\) 115쪽 */
 rago:['\\','e','u',x=>x.X+'라고','pb'],    raneunde:['\\','e','d',x=>x.X+'라는데','pb'],  reulji:['\\','m','d',x=>x.L+'지','pb'],
 /* 위치(3) 가 2mm 131쪽 */
 nikkan:['-','s','u',x=>x.X+'니깐','p2'],  neunyago:['-','m','u',x=>x.X+'느냐고','p2'],  rirago:['-','e','u',x=>x.X+'리라고','p2'],
 myeonseo:['-','s','d',x=>x.X+'면서','p2'], jiman:['-','m','d',x=>x.X+'지만','p2'],  rineunde:['-','e','d',x=>x.X+'리라는데','p2'],
 /* 위치(4) 148쪽 */
 neurago:['o','m','u',x=>x.X+'느라고','p3'], damyeon:['o','s','d',x=>x.PA+'다면','p3'],
 goseo:['(','e','u',x=>x.X+'고서','p3'],     neundeseo:['(','e','d',x=>x.X+'는데서','p3'],   ramyeon:['<','s','d',x=>x.X+'라면','p3']
};
const SETS={p1:['nikka','neunya','dago','myeon','neunji','daneunde'],pb:['rago','raneunde','reulji'],p2:['nikkan','neunyago','rirago','myeonseo','jiman','rineunde'],p3:['neurago','damyeon','goseo','neundeseo','ramyeon']};
const PREV={p1:[],pb:['p1'],p2:['p1'],p3:['p2']};   /* 보기 후보에 섞는 앞 세트 */
const KC=['vp:p1','vp:pb','vp:p2','vp:p3'];
const SETOF=e=>E[e][4];
const text=(s,e)=>E[e][3](STM[s]);
const draw=(s,e)=>shape(s,E[e][0],E[e][1],E[e][2]);
const KCS={p1:['vb:b1','vb:b2','vp:p1'],pb:['vb:b1','vb:b2','vp:p1','vp:pb'],p2:['vb:b1','vb:b2','vp:p1','vp:p2'],p3:['vb:b1','vb:b2','vp:p1','vp:p2','vp:p3']};
const where=e=>`${POSN[E[e][1]]}·${SIDEN[E[e][2]]}`;
const why=(s,e)=>`${text(s,e)}: ${STM[s].v}의 선에서 ${SIDEN[E[e][2]]}쪽, ${POSN[E[e][1]]}에 ${{'/':'짧은 삐침(/)','\\':'짧은 삐침(\\)','-':'짧은 가로 획(―)','o':'작은 고리(○)','(':'작은 「(」','<':'작은 「<」'}[E[e][0]]}이 있으므로 ${text(s,e)}입니다.`;
/* 보기: 같은 기본형 + 같은 세트의 다른 어미(+앞 세트) 3개 */
function choices(s,e){
 const set=SETOF(e),same=SETS[set].filter(x=>x!==e);
 const prev=PREV[set].flatMap(p=>SETS[p]);
 let pool=shuf(same).slice(0,3);
 if(pool.length<3)pool=pool.concat(shuf(prev).slice(0,3-pool.length));
 return shuf([e,...pool]);
}
const combos=set=>SETS[set].flatMap(e=>SK.map(s=>set+'|'+s+'.'+e));

const FEXP={
 p1:()=>({prompt:row(['nikka','neunya','dago','myeon','neunji','daneunde'].map(e=>lab(draw('geu',e),text('geu',e)))),
  text:'<b>동사 어미 위치 변화 (2): 니까·느냐·다고·면·는지·다는데</b><br>어미는 기본형 선에 붙이는 <b>짧은 삐침(/)</b>의 <b>위치</b>로 구별합니다. 선을 앞·가운데·끝으로 나누고, 위와 아래를 씁니다.<br>선 <b>위</b>: 앞 = 니까, 가운데 = 느냐, 끝 = 다고.<br>선 <b>아래</b>: 앞 = 면, 가운데 = 는지, 끝 = 다는데.<br>이 말들을 입속으로 10번 이상 중얼거린 뒤 연습하라고 교재는 권합니다(115쪽). 호(지킨다·된다·모른다)에도 같은 자리에 붙입니다.<br><small>교재 116~118쪽의 표에서 다른 기본형으로도 확인하세요.</small>'}),
 pb:()=>({prompt:row(['rago','raneunde','reulji'].map(e=>lab(draw('geu',e),text('geu',e)))),
  text:'<b>하줄 삐침(\\): 라고·라는데·ㄹ지</b><br>같은 위치 방식인데 삐침이 <b>\\</b> 방향입니다.<br>선 위 끝 = 라고 · 선 아래 끝 = 라는데 · 선 아래 가운데 = ㄹ지(~할지).<br>다고/다는데(/ 삐침)와 짝이라고 외우세요: 간다고 ↔ 가라고, 간다는데 ↔ 가라는데.<br><small>참고: 「인지」는 선 끝 아래의 작은 세로 획으로 씁니다(115쪽).</small>'}),
 p2:()=>({prompt:row(['nikkan','neunyago','rirago','myeonseo','jiman','rineunde'].map(e=>lab(draw('geu',e),text('geu',e)))),
  text:'<b>동사 어미 위치 변화 (3): 가로 획(「가」 2mm)</b><br>삐침 대신 <b>짧은 가로 획(「가」, 2mm)</b>을 같은 6자리에 붙이면 또 다른 어미 6개가 됩니다.<br>선 위: 앞 = 니깐, 가운데 = 느냐고, 끝 = 리라고.<br>선 아래: 앞 = 면서, 가운데 = 지만, 끝 = 리라는데.<br>「~(으)니깐」「~었으니깐」「~다는 것이니깐」처럼 응용이 많으니 직접 해 보라고 교재(131쪽)는 권합니다.'}),
 p3:()=>({prompt:row(['neurago','damyeon','goseo','neundeseo','ramyeon'].map(e=>lab(draw('geu',e),text('geu',e)))),
  text:'<b>동사 어미 위치 변화 (4): ○ · 「(」 · 「<」</b><br>작은 고리(○): 선 위 가운데 = 느라고, 선 아래 앞 = 다면.<br>작은 「(」: 선 위 끝 = 고서, 선 아래 끝 = 는데서.<br>작은 「<」: 선 아래 앞 = 라면.<br><small>차줄 삐침(르테니까·자면·ㄹ는지·는데에·는데에는)과 「고도·고는·지도·지는·는데도·는데는」 참고 표는 148쪽을 보세요. 이 연습에서는 다루지 않습니다.</small>'})
};
const F={
 name:'응용편 (동사 어미 위치)',
 after:'vb:gj',
 curr:KC,
 info:[],
 names:{'vp:p1':'동사 어미 위치(2): 니까·느냐·다고·면·는지·다는데','vp:pb':'동사 어미 위치: 라고·라는데·ㄹ지 (\\ 삐침)','vp:p2':'동사 어미 위치(3): 니깐·느냐고·리라고·면서·지만·리라는데','vp:p3':'동사 어미 위치(4): 느라고·다면·고서·는데서·라면'},
 intro:{'vp:p1':FEXP.p1,'vp:pb':FEXP.pb,'vp:p2':FEXP.p2,'vp:p3':FEXP.p3},
 questions:Object.fromEntries(KC.map(k=>{const set=k.slice(3);return [k,()=>shuf(combos(set)).slice(0,set==='pb'?9:12).map((c,i)=>(i%2?'vpB:':'vpA:')+c)]})),
 types:{
  vpA:{kcs:k=>KCS[k.split('|')[0]],ids:()=>Object.keys(SETS).flatMap(c=>combos(c).map(k=>'vpA:'+k)),build:(k,id)=>{
    const [set,se]=k.split('|'),[s,e]=se.split('.');
    return {id,prompt:draw(s,e),q:'이 약기는 어떤 말일까요?',one:true,opts:choices(s,e).map(x=>opt(s+'.'+x,text(s,x))),ans:s+'.'+e,why:why(s,e)}}},
  vpB:{kcs:k=>KCS[k.split('|')[0]],ids:()=>Object.keys(SETS).flatMap(c=>combos(c).map(k=>'vpB:'+k)),build:(k,id)=>{
    const [set,se]=k.split('|'),[s,e]=se.split('.');
    return {id,prompt:`<span class="big" style="font-size:28px">${text(s,e)}</span>`,q:'어떤 약기로 쓸까요?',opts:choices(s,e).map(x=>opt(s+'.'+x,draw(s,x))),ans:s+'.'+e,why:why(s,e)}}}
 },
 section:{title:'응용편 (제2장 동사 어미 위치 변화 115~118쪽·131쪽·148쪽)',kcs:KC}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
