/* 응용편(교재 2권: 약기법 응용) 영역. 개념 id 접두어 p. 등록 형식은 src/app.js 의 "기능 확장 등록" 주석 참고.
   이 파일은 응용편을 앞에서부터 조금씩 읽어 가며 늘린다. 지금까지: 제1장 기본 약기법 11~20쪽
   (약기법의 정의·용어, 접속사 약기, 「~에」 어쩌구 (1): 대·의·관 + 하여·해서·해·한).
   그림은 교재 그림을 보고 위치·모양을 어림해 직접 계산해 그린 약식 모양이다(1mm = 3단위, 엔진·조사 영역과 같은 배율). */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const sv=(inner,w=120,h=60)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const dot=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.6" fill="var(--stroke)" stroke="none"/>`;

/* ---------- 용어: 상선·하선 (앞문자 끝에서 차줄/하줄로 4mm = 12단위) ---------- */
const TE=[60,34];   /* 앞문자 끝 */
const TLINE=`<path d="M10 34H${TE[0]}"/>`;
const TPOS={
 sang:{n:'상선',p:[TE[0]+12*Math.cos(Math.PI/6),TE[1]-12*Math.sin(Math.PI/6)],w:'앞문자 끝에서 차줄(↗)로 4mm 가량 떨어진 자리'},
 ha:{n:'하선',p:[TE[0]+12*Math.SQRT1_2,TE[1]+12*Math.SQRT1_2],w:'앞문자 끝에서 하줄(↘)로 4mm 가량 떨어진 자리'},
 up:{n:'앞 글자 바로 위',p:[TE[0],TE[1]-12],w:'끝에서 곧바로 위로 4mm'},
 dn:{n:'앞 글자 바로 아래',p:[TE[0],TE[1]+12],w:'끝에서 곧바로 아래로 4mm'}
};
const tShape=k=>sv(TLINE+dot(...TPOS[k].p),100,60);

/* ---------- 접속사 (최장선: 길이 20~25mm 이상의 긴 가로선) ---------- */
const CONJ={
 go:{n:'그리고',d:'<path d="M6 34H92"/>'+dot(90,27.5),w:'긴 가로선 끝 바로 위에 점을 찍습니다.'},
 hayeo:{n:'그리하여',d:'<path d="M6 34H92"/>'+dot(98.5,33),w:'긴 가로선 끝에서 오른쪽 옆에 점을 찍습니다.'},
 hada:{n:'그리하다',d:'<path d="M6 34H90L97 46"/>',w:'긴 가로선 끝에서 아래로 ↘ 꺾어 내립니다.'}
};
const CK=Object.keys(CONJ);
const cShape=k=>sv(CONJ[k].d,110,60);

/* ---------- 「~에」 어쩌구: 선 끝의 「에」 갈고리 + 약부 ---------- */
const EE=[84,34];   /* 선 끝 */
const HOOK='<path d="M84 34A2.5 2.5 0 0 0 84 29"/>';   /* 정측(위)으로 올라가는 작은 갈고리 */
const EPOS={
 dae:{n:'대',p:[91,34],w:'갈고리 끝 오른쪽(선 끝)',s:'끝 오른쪽'},
 ui:{n:'의',p:[82,23.5],w:'정측(선의 위쪽)',s:'정측(위)'},
 gwan:{n:'관',p:[82,40.5],w:'반측(선의 아래쪽)',s:'반측(아래)'}
};
const MARK={
 hayeo:{n:'하여',w:'점',d:(x,y)=>dot(x,y)},
 haeseo:{n:'해서',w:'s자',d:(x,y)=>`<path d="M${f1(x+1.3)} ${f1(y-3.5)}C${f1(x-2.4)} ${f1(y-3.5)} ${f1(x-2.4)} ${f1(y-.4)} ${f1(x)} ${f1(y)}C${f1(x+2.4)} ${f1(y+.4)} ${f1(x+2.4)} ${f1(y+3.5)} ${f1(x-1.3)} ${f1(y+3.5)}"/>`},
 hae:{n:'해',w:'「<」',d:(x,y)=>`<path d="M${f1(x+2.5)} ${f1(y-3)}L${f1(x-1.5)} ${f1(y)}L${f1(x+2.5)} ${f1(y+3)}"/>`},
 han:{n:'한',w:'짧은 하줄(↘)',d:(x,y)=>`<path d="M${f1(x-2)} ${f1(y-3)}L${f1(x+2)} ${f1(y+3)}"/>`}
};
const EK=Object.keys(EPOS),MK=Object.keys(MARK);
const PH={dae:'대',ui:'의',gwan:'관'};
const phrase=(p,m)=>`에 ${PH[p]}${{hayeo:'하여',haeseo:'해서',hae:'해',han:'한'}[m]}`;
const phrase2=(p,m)=>({hayeo:`에 ${PH[p]}하여`,haeseo:`에 ${PH[p]}해서`,hae:`에 ${PH[p]}해`,han:`에 ${PH[p]}한`})[m];
const eShape=(p,m)=>sv('<path d="M6 34H84"/>'+HOOK+MARK[m].d(...EPOS[p].p),110,60);
const eWhy=(p,m)=>`${phrase2(p,m)}: 선 끝의 「에」 갈고리에서 ${EPOS[p].w}에 ${MARK[m].w}이(가) 있습니다. ${PH[p]}=${EPOS[p].s}, ${MARK[m].n}=${MARK[m].w}.`;
const opt=(k,h)=>({k,h});

const F={
 name:'응용편',
 curr:['p:def','p:term','p:conj','p:e1','p:e2','p:e3'],
 info:['p:def'],
 names:{'p:def':'약기법의 정의와 용어','p:term':'상선·하선','p:conj':'접속사 약기(그리고·그리하여·그리하다)','p:e1':'~에 대·의·관 위치','p:e2':'~하여·해서·해·한 약부','p:e3':'~에 대·의·관 + 하여·해서·해·한'},
 intro:{
  'p:def':()=>({prompt:'<div class="txt">약자 · 약부 · 중선 · 상선 · 하선 · 최장선</div>',
   text:'<b>약기법의 정의와 용어</b><br>약자 = 속기문자를 그대로 줄이거나 더 길게 써서 글자 수를 줄이는 약기법.<br>약부 = 일반 부호 모양을 속기에 응용하는 약기법.<br>약기가 만들어지는 말 = ① 너무 자주 나와 기본문자로 쓰기 귀찮은 말 ② 기본문자만으로는 번문에 문제가 있는 말 ③ 이어쓰기에 불편하거나 규칙적인 모양이 되는 말. 빈도가 드문 말은 문법 규칙이 있어도 약기를 만들지 않고 기본문자로 씁니다.<br>약기법의 형태 = 품사(조사·동사·형용사) 약기법, 상선 약기법(앞문자 끝에서 올려 씀), 하선 약기법(내려 씀), 중간 약기법(중간자 생략), 최장선 약기법, 부호 약기법.<br>용어: <b>중선</b>=문자의 중심선(보통 필기하는 선), <b>상선</b>=앞문자 끝에서 차줄로 4mm 가량 떨어진 위치, <b>하선</b>=앞문자 끝에서 하줄로 4mm 가량 떨어진 위치, <b>최장선</b>=길이 20~25mm 이상의 문자, <b>어쩌구</b>=「어쩌구 저쩌구 여러 가지 말로 변한다」를 줄인 말, <b>같이 쓴다</b>=혼동될 염려가 없는 말을 골라 두 가지 이상 같이 쓰는 것.<br>기본문자가 먼저이고 약기법은 이를 돕는 것입니다. 약기가 생각나지 않으면 기본문자로 쓰세요.'}),
  'p:term':()=>({prompt:row([lab(tShape('sang'),'상선'),lab(tShape('ha'),'하선')]),
   text:'<b>상선·하선</b><br>앞문자 끝에서 <b>차줄(↗, 30° 방향)</b>로 4mm 가량 떨어진 곳이 <b>상선</b>, <b>하줄(↘, 45° 방향)</b>로 4mm 가량 떨어진 곳이 <b>하선</b>입니다. 상선·하선 약기법은 앞문자 끝에서 이 자리로 올려 쓰거나 내려 씁니다.<br><small>그림의 점은 약기가 놓이는 자리를 보여 주는 표시입니다.</small>'}),
  'p:conj':()=>({prompt:row(CK.map(k=>lab(cShape(k),CONJ[k].n))),
   text:'<b>접속사 약기</b><br>길이 20~25mm 이상의 긴 가로선(최장선)으로 씁니다.<br>'+CK.map(k=>`${CONJ[k].n}: ${CONJ[k].w}`).join('<br>')+'<br><small>점의 높이와 위치, 끝의 꺾임으로 구별합니다.</small>'}),
  'p:e1':()=>({prompt:row(EK.map(p=>lab(eShape(p,'hayeo'),phrase2(p,'hayeo')))),
   text:'<b>「~에」 어쩌구 (1): 대·의·관</b><br>선 끝에 「에」 갈고리를 쓰고, 그 자리에서 <b>어디에 약부를 찍느냐</b>로 「대~·의~·관~」을 구별합니다.<br>대~ = 갈고리 끝 오른쪽 · 의~ = 정측(선의 위쪽) · 관~ = 반측(선의 아래쪽).<br>입에 붙도록 「대의관」으로 먼저 외우세요. 그림은 「하여」 약부(점)를 찍은 것입니다.<br><small>정측은 가로선의 위쪽, 반측은 그 반대(아래쪽)입니다.</small>'}),
  'p:e2':()=>({prompt:row(MK.map(m=>lab(eShape('dae',m),phrase2('dae',m)))),
   text:'<b>「~하여·해서·해·한」 약부</b><br>위치(대·의·관)에 붙이는 약부의 모양이 끝맺음을 정합니다.<br>하여 = 점 · 해서 = s자 · 해 = 「<」 · 한 = 짧은 하줄(↘).<br>위치 규칙은 그대로이고, 약부만 바뀝니다. 예) 에 대해서 = 갈고리 끝 오른쪽에 s자.'}),
  'p:e3':()=>({prompt:row(EK.map(p=>lab(eShape(p,'haeseo'),phrase2(p,'haeseo')))),
   text:'<b>위치 + 약부 합치기</b><br>위치로 <b>대·의·관</b>을, 약부 모양으로 <b>하여·해서·해·한</b>을 읽습니다. 두 가지를 모두 보고 한 구절로 읽어 보세요.<br>예) 정측(위)에 「<」 = 에 의해 · 반측(아래)에 짧은 ↘ = 에 관한.'})
 },
 questions:{
  'p:term':()=>[...shuf(Object.keys(TPOS)).map(k=>'pTq:'+k),'pTr:sang','pTr:ha'],
  'p:conj':()=>[...shuf(CK).flatMap(k=>['pCq:'+k,'pCr:'+k])],
  'p:e1':()=>shuf(EK).flatMap(p=>['pAq:'+p,'pAr:'+p]),
  'p:e2':()=>shuf(MK).flatMap(m=>['pBq:'+m,'pBr:'+m]),
  'p:e3':()=>shuf(EK.flatMap(p=>MK.map(m=>p+'.'+m))).slice(0,8).flatMap(k=>['pEq:'+k])
 },
 types:{
  pTq:{kcs:()=>['p:term'],ids:()=>Object.keys(TPOS).map(k=>'pTq:'+k),build:(k,id)=>({id,prompt:tShape(k),q:'점은 앞문자 끝에서 어느 자리에 있나요?',one:true,opts:shuf(Object.keys(TPOS).map(x=>opt(x,TPOS[x].n))),ans:k,
    why:k==='sang'||k==='ha'?`점이 앞문자 끝에서 ${k==='sang'?'차줄(↗)':'하줄(↘)'} 방향으로 4mm 가량 떨어져 있으므로 ${TPOS[k].n}입니다.`:`점이 끝에서 곧바로 ${k==='up'?'위':'아래'}에 있어 차줄·하줄 방향이 아니므로 상선도 하선도 아닙니다.`})},
  pTr:{kcs:()=>['p:term'],ids:()=>['pTr:sang','pTr:ha'],build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${TPOS[k].n}</span>`,q:'점이 이 자리에 있는 그림은?',opts:shuf(Object.keys(TPOS).map(x=>opt(x,tShape(x)))),ans:k,
    why:`${TPOS[k].n}은(는) ${TPOS[k].w}입니다. 그림에서 점이 앞문자 끝의 ${k==='sang'?'오른쪽 위(↗)':'오른쪽 아래(↘)'}에 있는 것이 정답입니다.`})},
  pCq:{kcs:()=>['p:conj'],ids:()=>CK.map(k=>'pCq:'+k),build:(k,id)=>({id,prompt:cShape(k),q:'이 긴 가로선 약기는 어떤 접속사일까요?',one:true,opts:shuf(CK.map(x=>opt(x,CONJ[x].n))),ans:k,why:`${CONJ[k].n}: ${CONJ[k].w}`})},
  pCr:{kcs:()=>['p:conj'],ids:()=>CK.map(k=>'pCr:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:30px">${CONJ[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(CK.map(x=>opt(x,cShape(x)))),ans:k,why:`${CONJ[k].n}: ${CONJ[k].w}`})},
  pAq:{kcs:()=>['p:e1'],ids:()=>EK.map(p=>'pAq:'+p),build:(k,id)=>({id,prompt:eShape(k,'hayeo'),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf(EK.map(x=>opt(x,phrase2(x,'hayeo')))),ans:k,why:eWhy(k,'hayeo')})},
  pAr:{kcs:()=>['p:e1'],ids:()=>EK.map(p=>'pAr:'+p),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${phrase2(k,'hayeo')}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(EK.map(x=>opt(x,eShape(x,'hayeo')))),ans:k,why:eWhy(k,'hayeo')})},
  pBq:{kcs:()=>['p:e2'],ids:()=>MK.map(m=>'pBq:'+m),build:(k,id)=>({id,prompt:eShape('dae',k),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf(MK.map(x=>opt(x,phrase2('dae',x)))),ans:k,why:eWhy('dae',k)})},
  pBr:{kcs:()=>['p:e2'],ids:()=>MK.map(m=>'pBr:'+m),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${phrase2('dae',k)}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf(MK.map(x=>opt(x,eShape('dae',x)))),ans:k,why:eWhy('dae',k)})},
  /* 위치와 약부를 함께: 오답은 위치만 다르거나 약부만 다른 것 */
  pEq:{kcs:()=>['p:e1','p:e2'],ids:()=>EK.flatMap(p=>MK.map(m=>'pEq:'+p+'.'+m)),build:(k,id)=>{const [p,m]=k.split('.');
    const wrong=[...EK.filter(x=>x!==p).map(x=>[x,m]),...MK.filter(x=>x!==m).map(x=>[p,x])];
    const pick=shuf(wrong).slice(0,3);
    return {id,prompt:eShape(p,m),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([[p,m],...pick].map(([a,b])=>opt(a+'.'+b,phrase2(a,b)))),ans:k,why:eWhy(p,m)}}},
  pEr:{kcs:()=>['p:e1','p:e2'],ids:()=>EK.flatMap(p=>MK.map(m=>'pEr:'+p+'.'+m)),build:(k,id)=>{const [p,m]=k.split('.');
    const wrong=[...EK.filter(x=>x!==p).map(x=>[x,m]),...MK.filter(x=>x!==m).map(x=>[p,x])];
    const pick=shuf(wrong).slice(0,3);
    return {id,prompt:`<span class="big" style="font-size:28px">${phrase2(p,m)}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf([[p,m],...pick].map(([a,b])=>opt(a+'.'+b,eShape(a,b)))),ans:k,why:eWhy(p,m)}}}
 },
 section:{title:'응용편 (제1장 기본 약기법 11~20쪽)',kcs:['p:def','p:term','p:conj','p:e1','p:e2','p:e3']}
};
F.questions['p:e3']=()=>shuf(EK.flatMap(p=>MK.map(m=>p+'.'+m))).slice(0,8).flatMap((k,i)=>[(i%2?'pEr:':'pEq:')+k]);
(window.FEATURES=window.FEATURES||[]).push(F);
})();
