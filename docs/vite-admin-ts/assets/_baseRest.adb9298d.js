import{i as r,b as a}from"./_baseIsEqual.0613a73a.js";import{a3 as n}from"./index.a9d370ef.js";function t(r,a,n){switch(n.length){case 0:return r.call(a);case 1:return r.call(a,n[0]);case 2:return r.call(a,n[0],n[1]);case 3:return r.call(a,n[0],n[1],n[2])}return r.apply(a,n)}var e=Math.max;function u(r,a,n){return a=e(void 0===a?r.length-1:a,0),function(){for(var u=arguments,i=-1,o=e(u.length-a,0),l=Array(o);++i<o;)l[i]=u[a+i];i=-1;for(var s=Array(a+1);++i<a;)s[i]=u[i];return s[a]=n(l),t(r,this,s)}}var i=n?function(r,a){return n(r,"toString",{configurable:!0,enumerable:!1,value:(t=a,function(){return t}),writable:!0});var t}:r,o=i,l=Date.now;var s,c,f,v=(s=o,c=0,f=0,function(){var r=l(),a=16-(r-f);if(f=r,a>0){if(++c>=800)return arguments[0]}else c=0;return s.apply(void 0,arguments)});function p(r,n){return a(r,n)}function b(a,n){return v(u(a,n,r),a+"")}export{b,p as i,u as o,v as s};
