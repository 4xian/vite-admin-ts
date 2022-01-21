import{s as S,E as Ce,l as ce,a as q,I as e,f as O,r,w as Se,a8 as De,a9 as Pe,O as p,Q as m,F as z,R as v,aa as D,P as Q,U as x,S as Ee,z as $e,A as ke,V as ve,n as He,M as U,W as We,Z as Ie}from"./vue.c50f9232.js";import{A as je,b7 as Le,G as Ne,f as Ue,H as Ve,b8 as Me,_ as de,b9 as Fe,aH as Ge}from"./index.267000c6.js";import{c as Re}from"./_createAssigner.0d6d4ce6.js";import{i as qe}from"./_baseRest.b7937cc4.js";import{D as ze}from"./index.6bf7c750.js";import"./_baseIsEqual.0a62afd2.js";var Qe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"}}]},name:"up",theme:"outlined"},Ze=Qe;function Je(a){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},d=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(d=d.concat(Object.getOwnPropertySymbols(n).filter(function(f){return Object.getOwnPropertyDescriptor(n,f).enumerable}))),d.forEach(function(f){Xe(a,f,n[f])})}return a}function Xe(a,t,n){return t in a?Object.defineProperty(a,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[t]=n,a}var Z=function(t,n){var d=Je({},t,n.attrs);return S(je,Ce(d,{icon:Ze}),null)};Z.displayName="UpOutlined";Z.inheritAttrs=!1;var Ye=Z,Ke=Object.prototype,et=Ke.hasOwnProperty,tt=Re(function(a,t){if(Le(t)||Ne(t)){Ue(t,Ve(t),a);return}for(var n in t)et.call(t,n)&&Me(a,n,t[n])}),lt=tt,h;(function(a){a.UP="up",a.DOWN="down",a.LEFT="left",a.RIGHT="right"})(h||(h={}));const st=["innerHTML"],at={key:3,class:"scroll-empty flex-center"},ot=["src"],nt=ce({props:{width:{type:Number,default:200},height:{type:Number,default:220},data:{type:Array,required:!0,default:()=>[]},options:Object},emits:["activeIndex"],setup(a,{emit:t}){const n=a,{width:d,height:f,options:J}=n,P=q({scrollType:0,direction:h.UP,speed:1,autoPlay:!0,hoverStop:!0,step:0,interval:0,controls:!0,controlsPadding:[0,0],animateTime:.4,emptyImg:"",emptyText:"\u6682\u65E0\u6570\u636E",emptyWidth:"30%",marginBias:0}),fe=e(O(()=>lt({},P,J))),{emptyImg:X,autoPlay:E,speed:y,interval:$,step:g,hoverStop:Y,emptyText:pe,emptyWidth:me,direction:u,animateTime:k,marginBias:he,scrollType:T,controls:ye,controlsPadding:K}=fe,V=r(null),_=r(null),ee=r(null),M=r(null),s=r(0),l=r(0),A=r(0),B=r(0),b=r(0),w=r(0),H=r(0),c=r(0),F=r(!1),te=r(null),W=r(null),I=r(!1),ge=O(()=>({width:`${d}px`,height:`${f}px`,padding:`${K[0]}px ${K[1]}px`})),_e=O(()=>({height:"100%",overflow:"hidden"})),Ae=O(()=>({transform:`translate(${-e(s)}px,${-e(l)}px)`,transition:`all ${c.value}s ease-in`})),le=O(()=>u===h.UP||u===h.DOWN),se=O(()=>le.value?{overflow:"hidden"}:{display:"flex"}),j=O(()=>G()||R()),ae=O(()=>ye&&$&&n.data.length);Se(n.data,(o,i)=>{qe(o,i)||He(()=>{L(),oe()})},{immediate:!0});const G=()=>{const o=e(V),i=e(_);return(i==null?void 0:i.offsetHeight)>(o==null?void 0:o.offsetHeight)&&i.offsetWidth<=o.offsetWidth},R=()=>{const o=e(V),i=e(_);return(i==null?void 0:i.offsetHeight)<=(o==null?void 0:o.offsetHeight)&&i.scrollWidth>o.offsetWidth+he},L=()=>{N(),s.value=0,l.value=0,I.value=T===0&&j.value},N=()=>{cancelAnimationFrame(Number(te)),clearTimeout(Number(W.value))},C=()=>{N(),!F.value&&(te.value=requestAnimationFrame(()=>{c.value=0,G()?u===h.UP?T===1?l.value>=e(B)-e(w)?l.value=0:l.value+=y:(l.value+=y,l.value>=e(B)&&(l.value=0)):u===h.DOWN&&(T===1?l.value<=0?l.value=e(B)-e(w):l.value-=y:(l.value-=y,l.value<=e(B)-e(w)&&(l.value=e(B)*2-e(w)))):R()&&(u===h.LEFT?T===1?s.value>=e(A)-e(b)?s.value=0:s.value+=y:(s.value+=y,s.value>=e(A)&&(s.value=0)):u===h.RIGHT&&(T===1?s.value<=0?s.value=e(A)-e(b):s.value-=y:(s.value-=y,s.value<=e(A)-e(b)&&(s.value=e(A)*2-e(b))))),W.value&&clearTimeout(Number(W.value)),$?(G()?H.value=l.value:R()&&(H.value=s.value),H.value%g==0?(t("activeIndex",H.value/g),W.value=setTimeout(()=>{C()},$)):C()):C()}))},Be=()=>{Y&&E&&e(j)&&(F.value=!0,N())},Oe=()=>{Y&&E&&e(j)&&(F.value=!1,C())},be=()=>{c.value=k,s.value<=0?(c.value=0,s.value=e(A)-e(b)):s.value-=g},we=()=>{c.value=k,s.value>=e(A)-e(b)?(c.value=0,s.value=0):s.value+=g},xe=()=>{console.log("up",g),c.value=k,l.value<=0?(c.value=0,l.value=e(B)-e(w)):l.value-=g},Te=()=>{console.log("down",g,l.value),c.value=k,l.value>=e(B)-e(w)?(c.value=0,l.value=0):l.value+=g},oe=()=>{var o,i,ne,re,ie,ue;B.value=((o=e(_))==null?void 0:o.offsetHeight)||0,A.value=((i=e(_))==null?void 0:i.scrollWidth)||0,b.value=((ne=e(_))==null?void 0:ne.offsetWidth)||0,w.value=((re=e(ee))==null?void 0:re.offsetHeight)||0,E&&e(j)?(e(I)&&(M.value=(ie=e(_))==null?void 0:ie.innerHTML),C()):!E&&$?e(I)&&(M.value=(ue=e(_))==null?void 0:ue.innerHTML):N()};return Fe(()=>{L()}),De(()=>{L()}),Pe(()=>{L(),oe()}),(o,i)=>(p(),m("div",{ref_key:"scrollWrap",ref:V,class:"min-gapless-wrap",style:x(e(ge))},[e(ae)&&(e(u)==="left"||e(u)==="right")?(p(),m(z,{key:0},[v("div",{class:"scroll-controls left-controls",onClick:be},[D(o.$slots,"left",{},void 0,!0)]),v("div",{class:"scroll-controls right-controls",onClick:we},[D(o.$slots,"right",{},void 0,!0)])],64)):Q("",!0),e(ae)&&(e(u)==="up"||e(u)==="down")?(p(),m(z,{key:1},[v("div",{class:"scroll-controls up-controls",onClick:xe},[D(o.$slots,"up",{},void 0,!0)]),v("div",{class:"scroll-controls down-controls",onClick:Te},[D(o.$slots,"down",{},void 0,!0)])],64)):Q("",!0),a.data.length>0?(p(),m("div",{key:2,ref_key:"visualArea",ref:ee,style:x(e(_e))},[v("div",{ref_key:"scrollContent",ref:_,class:Ee({"gapless-scroll-content":!e(le)}),style:x(e(Ae)),onMouseenter:Be,onMouseleave:Oe},[v("div",{ref:"scrollItem",style:x(e(se))},[D(o.$slots,"default",{},void 0,!0)],4),I.value?(p(),m("div",{key:0,style:x(e(se)),innerHTML:M.value},null,12,st)):Q("",!0)],38)],4)):(p(),m("div",at,[$e(v("img",{src:e(X),style:x({width:e(me)})},null,12,ot),[[ke,e(X)]]),v("p",null,ve(e(pe)),1)]))],4))}});var rt=de(nt,[["__scopeId","data-v-641d3f0d"]]);const it={class:"demo-gapless-scroll"},ut={class:"scroll-title"},ct=Ie("\u65E0\u7F1D\u6EDA\u52A8demo"),vt={class:"scroll flex-center"},dt=ce({setup(a){const t=q(["\u6EDA\u52A8\u5185\u5BB9\u7B2C\u56DB\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u4E94\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u516D\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u4E03\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u516B\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u4E5D\u6761","\u6EDA\u52A8\u5185\u5BB9\u7B2C\u5341\u6761"]),n=q({speed:1,autoPlay:!1,direction:"up",scrollType:1,interval:3e3,step:44,animateTime:.5,controlsPadding:[30,0]}),d=f=>{console.log(f)};return(f,J)=>(p(),m("div",it,[v("div",ut,[S(e(ze),{"content-position":"center"},{default:U(()=>[ct]),_:1})]),v("div",vt,[S(rt,{width:200,height:236,options:e(n),data:e(t),onActiveIndex:d},{up:U(()=>[S(e(Ye))]),down:U(()=>[S(e(Ge))]),default:U(()=>[(p(!0),m(z,null,We(e(t),P=>(p(),m("div",{key:P,class:"scroll-item"},ve(P),1))),128))]),_:1},8,["options","data"])])]))}});var _t=de(dt,[["__scopeId","data-v-29a2cc90"]]);export{_t as default};
