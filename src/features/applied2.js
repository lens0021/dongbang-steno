/* 응용편 제1장 8-1-3~8-1-4 (교재 32~38쪽): 「~을」 어쩌구, 「~(으)로」 어쩌구. 개념 id 접두어 p:(u·r).
   선 끝에 갈고리(을 = 짧은 사선, 로 = 작은 둥근 갈고리)를 쓰고, 갈고리 둘레 위치와 약부 모양으로 읽는다.
   applied.js 의 「~에」 어쩌구와 같은 방식이다. 그림은 교재 그림의 위치·모양을 어림해 직접 그린 약식이다(1mm = 3단위). */
(function(){
const SW='stroke="var(--stroke)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const f1=n=>(+n).toFixed(1);
const sv=(inner,w=110,h=60)=>`<svg viewBox="0 0 ${w} ${h}" style="width:${(w*PXMM/3).toFixed(0)}px;height:${(h*PXMM/3).toFixed(0)}px;max-width:100%" aria-hidden="true"><g ${SW}>${inner}</g></svg>`;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const lab=(h,t)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:2px 6px">${h}<small style="color:var(--mute);font-size:11px">${t}</small></span>`;
const row=a=>`<div style="display:flex;flex-wrap:wrap;justify-content:center">${a.join('')}</div>`;
const opt=(k,h)=>({k,h});
/* 약부 모양 (x,y = 놓는 자리) */
const MK={
 hayeo:{w:'점',d:(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.6" fill="var(--stroke)" stroke="none"/>`},
 haeseo:{w:'s자',d:(x,y)=>`<path d="M${f1(x+1.3)} ${f1(y-3.5)}C${f1(x-2.4)} ${f1(y-3.5)} ${f1(x-2.4)} ${f1(y-.4)} ${f1(x)} ${f1(y)}C${f1(x+2.4)} ${f1(y+.4)} ${f1(x+2.4)} ${f1(y+3.5)} ${f1(x-1.3)} ${f1(y+3.5)}"/>`},
 hae:{w:'「<」',d:(x,y)=>`<path d="M${f1(x+2.5)} ${f1(y-3)}L${f1(x-1.5)} ${f1(y)}L${f1(x+2.5)} ${f1(y+3)}"/>`},
 han:{w:'짧은 하줄(↘)',d:(x,y)=>`<path d="M${f1(x-2)} ${f1(y-3)}L${f1(x+2)} ${f1(y+3)}"/>`},
 do:{w:'짧은 사선(/)',d:(x,y)=>`<path d="M${f1(x-1.5)} ${f1(y+3)}L${f1(x+1.5)} ${f1(y-3)}"/>`},
 seo:{w:'작은 호 「(」',d:(x,y)=>`<path d="M${f1(x+1.5)} ${f1(y-3)}Q${f1(x-2.5)} ${f1(y)} ${f1(x+1.5)} ${f1(y+3)}"/>`},
 neun:{w:'작은 원(○)',d:(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="2"/>`},
 ida:{w:'짧은 세로선(|)',d:(x,y)=>`<path d="M${f1(x)} ${f1(y-3)}V${f1(y+3)}"/>`}
};
/* 갈고리와 위치 */
const FAM={
 u:{hook:'<path d="M84 34L88.5 28.5"/>',pn:'을',pos:{
   si:{n:'위시',p:[93,32],w:'사선 갈고리 끝 오른쪽'},
   wi:{n:'위',p:[81,26],w:'정측(선의 위쪽)'},
   mat:{n:'맞이',p:[81,41.5],w:'반측(선의 아래쪽)'}}},
 r:{hook:'<path d="M82 36L84 34C84.5 27.5 93 27 92.5 33.5"/>',pn:'로',pos:{
   mal:{n:'말미암',p:[97,31.5],w:'둥근 갈고리 오른쪽'},
   in:{n:'인',p:[84,24],w:'정측(둥근 갈고리 위쪽)'}}}
};
/* 위치+약부를 글로 */
const SUF={
 u:{hayeo:'하여',haeseo:'해서',hae:'해',han:'한',do:'하여도',seo:'하여서',neun:'하여는'},
 r:{mal:{hayeo:'아',haeseo:'아서',han:'은',ida:'다'},in:{hayeo:'하여',haeseo:'해서',han:'한',ida:'하다'}}
};
const text=(f,p,m)=>FAM[f].pn+' '+FAM[f].pos[p].n+(f==='u'?SUF.u[m]:SUF.r[p][m]);
const shapeFM=(f,p,m)=>sv('<path d="M6 34H84"/>'+FAM[f].hook+MK[m].d(...FAM[f].pos[p].p));
const whyFM=(f,p,m)=>`${text(f,p,m)}: 갈고리의 ${FAM[f].pos[p].w}에 ${MK[m].w}이(가) 있으므로 ${text(f,p,m)}입니다.`;
/* 개념별 (갈고리, 위치 목록, 약부 목록) */
const CS={
 u1:{f:'u',pos:['si','wi','mat'],mk:['hayeo'],kc:['p:u1']},
 u2:{f:'u',pos:['si'],mk:['hayeo','haeseo','hae','han'],kc:['p:u1','p:u2']},
 u3:{f:'u',pos:['si','wi','mat'],mk:['hayeo','haeseo','hae','han'],kc:['p:u1','p:u2']},
 u4:{f:'u',pos:['si','wi','mat'],mk:['do','seo','neun'],kc:['p:u1','p:u4']},
 r1:{f:'r',pos:['mal','in'],mk:['hayeo','haeseo','han','ida'],kc:['p:r1']}
};
const combos=c=>CS[c].pos.flatMap(p=>CS[c].mk.filter(m=>CS[c].f==='u'||SUF.r[p][m]).map(m=>p+'.'+m));
/* 그 밖의 짧은 획 (교재 32쪽 표 아래쪽) */
const X={
 wihada:{n:'을 위하다',d:'<path d="M80 22V28"/>',w:'정측(위쪽)에 짧은 세로선(이)'},
 garijji:{n:'을 가리지 않는',d:'<path d="M91.5 34H96"/>',w:'사선 갈고리 오른쪽에 짧은 가로선(가)'},
 mureup:{n:'을 무릅쓰고',d:'<path d="M90.5 36Q94 31 98 35"/>',w:'갈고리 오른쪽에 위로 볼록한 짧은 호(마)'},
 mosigo:{n:'을 모시고',d:'<path d="M77 28Q81 23 85 27"/>',w:'정측(위쪽)에 위로 볼록한 짧은 호(마)'},
 mangnon:{n:'을 막론하고',d:'<path d="M78 43Q82 39 86 43"/>',w:'반측(아래쪽)에 짧은 호(마)'},
 ttara:{n:'을 따라',d:'<path d="M79 38L83.5 30"/>',w:'선을 위아래로 가르는 사선(따)'}
};
const XK=Object.keys(X);
const xShape=k=>sv('<path d="M6 34H84"/>'+FAM.u.hook+X[k].d);
const xWhy=k=>`${X[k].n}: 사선 갈고리에 ${X[k].w}을(를) 더합니다.`;

const F={
 name:'응용편 (을·로)',
 curr:['p:u1','p:u2','p:u3','p:u4','p:u5','p:r1'],
 info:[],
 names:{'p:u1':'~을 위시·위·맞이 위치','p:u2':'~을 하여·해서·해·한 약부','p:u3':'~을 위치 + 약부 합치기','p:u4':'~을 하여도·하여서·하여는','p:u5':'~을 가리지 않는·무릅쓰고·따라 …','p:r1':'~(으)로 말미암·인 어쩌구'},
 intro:{
  'p:u1':()=>({prompt:row(CS.u1.pos.map(p=>lab(shapeFM('u',p,'hayeo'),text('u',p,'hayeo')))),
   text:'<b>「~을」 어쩌구: 위시·위·맞이</b><br>선 끝에 짧은 사선(↗) 갈고리를 쓰면 「~을」입니다. 그 자리에서 약부를 어디에 찍느냐로 읽습니다.<br>위시~ = 갈고리 끝 오른쪽 · 위~ = 정측(위쪽) · 맞이~ = 반측(아래쪽).<br>「위시 위 맞이」를 입에 붙도록 먼저 외우세요. 그림은 「하여」 약부(점)입니다.'}),
  'p:u2':()=>({prompt:row(CS.u2.mk.map(m=>lab(shapeFM('u','si',m),text('u','si',m)))),
   text:'<b>~을 하여·해서·해·한 약부</b><br>「~에」와 같은 약부를 씁니다: 하여 = 점 · 해서 = s자 · 해 = 「<」 · 한 = 짧은 하줄(↘).<br>위치는 갈고리 끝 오른쪽(위시)으로 두고 약부만 바꿔 읽어 보세요.'}),
  'p:u3':()=>({prompt:row(['wi','mat'].map(p=>lab(shapeFM('u',p,'haeseo'),text('u',p,'haeseo')))),
   text:'<b>위치 + 약부</b><br>위치로 위시·위·맞이를, 약부 모양으로 하여·해서·해·한을 정해 한 구절로 읽습니다.<br>예) 정측에 s자 = 을 위해서 · 반측에 「<」 = 을 맞이해.'}),
  'p:u4':()=>({prompt:row(CS.u4.mk.map(m=>lab(shapeFM('u','si',m),text('u','si',m)))),
   text:'<b>~을 하여도·하여서·하여는</b><br>하여도 = 짧은 사선(/) · 하여서 = 작은 호 「(」 · 하여는 = 작은 원(○).<br>위치 규칙(위시·위·맞이)은 그대로입니다.'}),
  'p:u5':()=>({prompt:row(XK.map(k=>lab(xShape(k),X[k].n))),
   text:'<b>「~을」 어쩌구의 그 밖의 획</b><br>'+XK.map(k=>`${X[k].n}: ${X[k].w}`).join('<br>')+'<br><small>을 비롯 등 모양이 복잡한 것은 교재 32쪽을 보세요.</small>'}),
  'p:r1':()=>({prompt:row(['mal','in'].map(p=>lab(shapeFM('r',p,'hayeo'),text('r',p,'hayeo')))),
   text:'<b>「~(으)로」 어쩌구</b><br>선 끝에 작은 둥근 갈고리를 쓰면 「~(으)로」입니다. 약부를 놓는 자리로 읽습니다.<br>갈고리 오른쪽 = 말미암~ (아·아서·은·다) · 갈고리 위쪽(정측) = 인~ (하여·해서·한·하다).<br>약부: 아/하여 = 점 · 아서/해서 = s자 · 은/한 = 짧은 하줄(↘) · 다/하다 = 짧은 세로선(|).<br><small>로부터·로 하여금·로부터는 등 갈고리 안에 점·원이 들어가는 꼴은 교재 38쪽을 보세요.</small>'})
 },
 questions:{
  'p:u1':()=>combos('u1').flatMap(k=>['pQ:u1|'+k,'pR:u1|'+k]),
  'p:u2':()=>combos('u2').flatMap(k=>['pQ:u2|'+k,'pR:u2|'+k]),
  'p:u3':()=>shuf(combos('u3')).slice(0,8).map((k,i)=>(i%2?'pR:u3|':'pQ:u3|')+k),
  'p:u4':()=>shuf(combos('u4')).slice(0,8).map((k,i)=>(i%2?'pR:u4|':'pQ:u4|')+k),
  'p:u5':()=>shuf(XK).flatMap(k=>['pX:'+k,'pY:'+k]),
  'p:r1':()=>combos('r1').flatMap(k=>['pQ:r1|'+k,'pR:r1|'+k])
 },
 types:{
  pQ:{kcs:k=>CS[k.split('|')[0]].kc,ids:()=>Object.keys(CS).flatMap(c=>combos(c).map(k=>'pQ:'+c+'|'+k)),build:(k,id)=>{
    const [c,pm]=k.split('|'),[p,m]=pm.split('.'),all=combos(c).map(x=>x.split('.'));
    /* 오답: 위치만 다르거나 약부만 다른 것을 먼저 */
    const near=all.filter(([a,b])=>(a===p)!==(b===m));
    const pool=shuf(near.length>=3?near:all.filter(([a,b])=>a!==p||b!==m)).slice(0,3);
    return {id,prompt:shapeFM(CS[c].f,p,m),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([[p,m],...pool].map(([a,b])=>opt(a+'.'+b,text(CS[c].f,a,b)))),ans:p+'.'+m,why:whyFM(CS[c].f,p,m)}}},
  pR:{kcs:k=>CS[k.split('|')[0]].kc,ids:()=>Object.keys(CS).flatMap(c=>combos(c).map(k=>'pR:'+c+'|'+k)),build:(k,id)=>{
    const [c,pm]=k.split('|'),[p,m]=pm.split('.'),all=combos(c).map(x=>x.split('.'));
    const near=all.filter(([a,b])=>(a===p)!==(b===m));
    const pool=shuf(near.length>=3?near:all.filter(([a,b])=>a!==p||b!==m)).slice(0,3);
    return {id,prompt:`<span class="big" style="font-size:28px">${text(CS[c].f,p,m)}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf([[p,m],...pool].map(([a,b])=>opt(a+'.'+b,shapeFM(CS[c].f,a,b)))),ans:p+'.'+m,why:whyFM(CS[c].f,p,m)}}},
  pX:{kcs:()=>['p:u1','p:u5'],ids:()=>XK.map(k=>'pX:'+k),build:(k,id)=>({id,prompt:xShape(k),q:'이 약기는 어떤 말일까요?',one:true,opts:shuf([k,...shuf(XK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,X[x].n))),ans:k,why:xWhy(k)})},
  pY:{kcs:()=>['p:u1','p:u5'],ids:()=>XK.map(k=>'pY:'+k),build:(k,id)=>({id,prompt:`<span class="big" style="font-size:28px">${X[k].n}</span>`,q:'어떤 약기로 쓸까요?',opts:shuf([k,...shuf(XK.filter(x=>x!==k)).slice(0,3)].map(x=>opt(x,xShape(x)))),ans:k,why:xWhy(k)})}
 },
 section:{title:'응용편 (제1장 32~38쪽 · ~을, ~(으)로)',kcs:['p:u1','p:u2','p:u3','p:u4','p:u5','p:r1']}
};
(window.FEATURES=window.FEATURES||[]).push(F);
})();
