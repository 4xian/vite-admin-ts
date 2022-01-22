import{A as e,aA as t,w as n,ak as o,P as r,l as a,o as i,j as s,L as c,D as l,b5 as h,am as d,s as u,k as f,E as p,r as v,J as g}from"./index.a9d370ef.js";import{s as b,E as y,l as k,c as D,u as T}from"./vue.c50f9232.js";var x={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"}}]},name:"file",theme:"outlined"};function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(t,n){var o=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){C(e,t,n[t])}))}return e}({},t,n.attrs);return b(e,y(o,{icon:x}),null)};m.displayName="FileOutlined",m.inheritAttrs=!1;var N=m;function E(e,n){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=t(e))||n&&e&&"number"==typeof e.length){o&&(e=o);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return s=e.done,e},e:function(e){c=!0,i=e},f:function(){try{s||null==o.return||o.return()}finally{if(c)throw i}}}}function O(){}var w=k({name:"TreeNode",mixins:[n],inheritAttrs:!1,__ANT_TREE_NODE:!0,props:o({eventKey:r.oneOfType([r.string,r.number]),prefixCls:r.string,root:r.object,expanded:r.looseBool,selected:r.looseBool,checked:r.looseBool,loaded:r.looseBool,loading:r.looseBool,halfChecked:r.looseBool,title:r.any,pos:r.string,dragOver:r.looseBool,dragOverGapTop:r.looseBool,dragOverGapBottom:r.looseBool,isLeaf:r.looseBool,checkable:r.looseBool,selectable:r.looseBool,disabled:r.looseBool,disableCheckbox:r.looseBool,icon:r.any,dataRef:r.object,switcherIcon:r.any,label:r.any,value:r.any},{}),setup:function(){return{vcTree:D("vcTree",{}),vcTreeNode:D("vcTreeNode",{})}},data:function(){return this.children=null,{dragNodeHighlight:!1}},created:function(){T("vcTreeNode",this)},mounted:function(){var e=this.eventKey,t=this.vcTree.registerTreeNode;this.syncLoadData(this.$props),t&&t(e,this)},updated:function(){this.syncLoadData(this.$props)},beforeUnmount:function(){var e=this.eventKey,t=this.vcTree.registerTreeNode;t&&t(e,null)},methods:{onSelectorClick:function(e){(0,this.vcTree.onNodeClick)(e,this),this.isSelectable()?this.onSelect(e):this.onCheck(e)},onSelectorDoubleClick:function(e){(0,this.vcTree.onNodeDoubleClick)(e,this)},onSelect:function(e){if(!this.isDisabled()){var t=this.vcTree.onNodeSelect;e.preventDefault(),t(e,this)}},onCheck:function(e){if(!this.isDisabled()){var t=this.disableCheckbox,n=this.checked,o=this.vcTree.onNodeCheck;if(this.isCheckable()&&!t)e.preventDefault(),o(e,this,!n)}},onMouseEnter:function(e){(0,this.vcTree.onNodeMouseEnter)(e,this)},onMouseLeave:function(e){(0,this.vcTree.onNodeMouseLeave)(e,this)},onContextMenu:function(e){(0,this.vcTree.onNodeContextMenu)(e,this)},onDragStart:function(e){var t=this.vcTree.onNodeDragStart;e.stopPropagation(),this.setState({dragNodeHighlight:!0}),t(e,this);try{e.dataTransfer.setData("text/plain","")}catch(n){}},onDragEnter:function(e){var t=this.vcTree.onNodeDragEnter;e.preventDefault(),e.stopPropagation(),t(e,this)},onDragOver:function(e){var t=this.vcTree.onNodeDragOver;e.preventDefault(),e.stopPropagation(),t(e,this)},onDragLeave:function(e){var t=this.vcTree.onNodeDragLeave;e.stopPropagation(),t(e,this)},onDragEnd:function(e){var t=this.vcTree.onNodeDragEnd;e.stopPropagation(),this.setState({dragNodeHighlight:!1}),t(e,this)},onDrop:function(e){var t=this.vcTree.onNodeDrop;e.preventDefault(),e.stopPropagation(),this.setState({dragNodeHighlight:!1}),t(e,this)},onExpand:function(e){(0,this.vcTree.onNodeExpand)(e,this)},setSelectHandle:function(e){this.selectHandle=e},getNodeChildren:function(){var e=this.children,t=$(e);return e.length,t.length,t},getNodeState:function(){var e=this.expanded;return this.isLeaf2()?null:e?"open":"close"},isLeaf2:function(){var e=this.isLeaf,t=this.loaded,n=this.vcTree.loadData,o=0!==this.getNodeChildren().length;return!1!==e&&(e||!n&&!o||n&&t&&!o)},isDisabled:function(){var e=this.disabled,t=this.vcTree.disabled;return!1!==e&&!(!t&&!e)},isCheckable:function(){var e=this.$props.checkable,t=this.vcTree.checkable;return!(!t||!1===e)&&t},syncLoadData:function(e){var t=e.expanded,n=e.loading,o=e.loaded,r=this.vcTree,a=r.loadData,i=r.onNodeLoad;n||a&&t&&!this.isLeaf2()&&(0!==this.getNodeChildren().length||o||i(this))},isSelectable:function(){var e=this.selectable,t=this.vcTree.selectable;return"boolean"==typeof e?e:t},renderSwitcher:function(){var e=this.expanded,t=this.vcTree.prefixCls,n=a(this,"switcherIcon",{},!1)||a(this.vcTree,"switcherIcon",{},!1);if(this.isLeaf2())return b("span",{key:"switcher",class:s("".concat(t,"-switcher"),"".concat(t,"-switcher-noop"))},["function"==typeof n?n(i(i(i({},this.$props),this.$props.dataRef),{isLeaf:!0})):n]);var o=s("".concat(t,"-switcher"),"".concat(t,"-switcher_").concat(e?"open":"close"));return b("span",{key:"switcher",onClick:this.onExpand,class:o},["function"==typeof n?n(i(i(i({},this.$props),this.$props.dataRef),{isLeaf:!1})):n])},renderCheckbox:function(){var e=this.checked,t=this.halfChecked,n=this.disableCheckbox,o=this.vcTree.prefixCls,r=this.isDisabled(),a=this.isCheckable();if(!a)return null;var i="boolean"!=typeof a?a:null;return b("span",{key:"checkbox",class:s("".concat(o,"-checkbox"),e&&"".concat(o,"-checkbox-checked"),!e&&t&&"".concat(o,"-checkbox-indeterminate"),(r||n)&&"".concat(o,"-checkbox-disabled")),onClick:this.onCheck},[i])},renderIcon:function(){var e=this.loading,t=this.vcTree.prefixCls;return b("span",{key:"icon",class:s("".concat(t,"-iconEle"),"".concat(t,"-icon__").concat(this.getNodeState()||"docu"),e&&"".concat(t,"-icon_loading"))},null)},renderSelector:function(){var e,t=this.selected,n=this.loading,o=this.dragNodeHighlight,r=a(this,"icon",{},!1),c=this.vcTree,l=c.prefixCls,h=c.showIcon,d=c.icon,u=c.draggable,f=c.loadData,p=this.isDisabled(),v=a(this,"title",{},!1),g="".concat(l,"-node-content-wrapper");if(h){var y=r||d;e=y?b("span",{class:s("".concat(l,"-iconEle"),"".concat(l,"-icon__customize"))},["function"==typeof y?y(i(i({},this.$props),this.$props.dataRef)):y]):this.renderIcon()}else f&&n&&(e=this.renderIcon());var k=v,D=b("span",{class:"".concat(l,"-title")},k?["function"==typeof k?k(i(i({},this.$props),this.$props.dataRef)):k]:["---"]);return b("span",{key:"selector",ref:this.setSelectHandle,title:"string"==typeof v?v:"",class:s("".concat(g),"".concat(g,"-").concat(this.getNodeState()||"normal"),!p&&(t||o)&&"".concat(l,"-node-selected"),!p&&u&&"draggable"),draggable:!p&&u||void 0,"aria-grabbed":!p&&u||void 0,onMouseenter:this.onMouseEnter,onMouseleave:this.onMouseLeave,onContextmenu:this.onContextMenu,onClick:this.onSelectorClick,onDblclick:this.onSelectorDoubleClick,onDragstart:u?this.onDragStart:O},[e,D])},renderChildren:function(){var e=this.expanded,t=this.pos,n=this.vcTree,o=n.prefixCls,r=n.openTransitionName,a=n.openAnimation,d=n.renderTreeNode,u={};r?u=c(r):"object"===l(a)&&(u=i(i(i({},a),{css:!1}),u));var f,p=this.getNodeChildren();return 0===p.length?null:(e&&(f=b("ul",{class:s("".concat(o,"-child-tree"),e&&"".concat(o,"-child-tree-open")),"data-expanded":e,role:"group"},[K(p,(function(e,n){return d(e,n,t)}))])),b(h,u,{default:function(){return[f]}}))}},render:function(){var e;this.children=d(this);var t=this.$props,n=t.dragOver,o=t.dragOverGapTop,r=t.dragOverGapBottom,a=t.isLeaf,s=t.expanded,c=t.selected,l=t.checked,h=t.halfChecked,p=t.loading,v=this.vcTree,g=v.prefixCls,y=v.filterTreeNode,k=v.draggable,D=this.isDisabled(),T=W(i(i({},this.$props),this.$attrs)),x=this.$attrs,C=x.class,m=x.style;return b("li",u({class:(e={},f(e,C,C),f(e,"".concat(g,"-treenode-disabled"),D),f(e,"".concat(g,"-treenode-switcher-").concat(s?"open":"close"),!a),f(e,"".concat(g,"-treenode-checkbox-checked"),l),f(e,"".concat(g,"-treenode-checkbox-indeterminate"),h),f(e,"".concat(g,"-treenode-selected"),c),f(e,"".concat(g,"-treenode-loading"),p),f(e,"drag-over",!D&&n),f(e,"drag-over-gap-top",!D&&o),f(e,"drag-over-gap-bottom",!D&&r),f(e,"filter-node",y&&y(this)),e),style:m,role:"treeitem",onDragenter:k?this.onDragEnter:O,onDragover:k?this.onDragOver:O,onDragleave:k?this.onDragLeave:O,onDrop:k?this.onDrop:O,onDragend:k?this.onDragEnd:O},T),[this.renderSwitcher(),this.renderCheckbox(),this.renderSelector(),this.renderChildren()])}});w.isTreeNode=1;var S=w;function L(e,t){var n=e.slice(),o=n.indexOf(t);return o>=0&&n.splice(o,1),n}function j(e,t){var n=e.slice();return-1===n.indexOf(t)&&n.push(t),n}function M(e){return e.split("-")}function B(e,t){return"".concat(e,"-").concat(t)}function P(e){return e.type&&e.type.isTreeNode}function $(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.filter(P)}function A(e){var t=v(e)||{},n=t.disabled,o=t.disableCheckbox,r=t.checkable;return!(!n&&!o)||!1===r}function H(e,t){!function n(o,r,a){var i=o?d(o):e,s=o?B(a.pos,r):0,c=$(i);if(o){var l=o.key;l||null!=l||(l=s);var h={node:o,index:r,pos:s,key:l,parentPos:a.node?a.pos:null};t(h)}c.forEach((function(e,t){n(e,t,{node:o,pos:s})}))}(null)}function K(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=e.map(t);return 1===n.length?n[0]:n}function _(e,t){var n=v(t),o=n.eventKey,r=n.pos,a=[];return H(e,(function(e){var t=e.key;a.push(t)})),a.push(o||r),a}function I(e,t){var n=e.clientY,o=t.selectHandle.getBoundingClientRect(),r=o.top,a=o.bottom,i=o.height,s=Math.max(.25*i,2);return n<=r+s?-1:n>=a-s?1:0}function R(e,t){if(e)return t.multiple?e.slice():e.length?[e[0]]:e}var z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(i({},e),{class:e.class||e.className,style:e.style,key:e.key})};function G(e,t){if(!e)return[];var n=(t||{}).processProps,o=void 0===n?z:n;return(Array.isArray(e)?e:[e]).map((function(e){var n=e.children,r=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n}(e,["children"]),a=G(n,t);return b(S,o(r),{default:function(){return[a]}})}))}function F(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.initWrapper,o=t.processEntity,r=t.onProcessFinished,a=new Map,i=new Map,s={posEntities:a,keyEntities:i};return n&&(s=n(s)||s),H(e,(function(e){var t=e.node,n=e.index,r=e.pos,c=e.key,l=e.parentPos,h={node:t,index:n,key:c,pos:r};a.set(r,h),i.set(c,h),h.parent=a.get(l),h.parent&&(h.parent.children=h.parent.children||[],h.parent.children.push(h)),o&&o(h,s)})),r&&r(s),s}function V(e){if(!e)return null;var t;if(Array.isArray(e))t={checkedKeys:e,halfCheckedKeys:void 0};else{if("object"!==l(e))return null;t={checkedKeys:e.checked||void 0,halfCheckedKeys:e.halfChecked||void 0}}return t}function J(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},r=new Map,a=new Map;function i(e){if(r.get(e)!==t){var o=n.get(e);if(o){var s=o.children,c=o.parent;if(!A(o.node)){var l=!0,h=!1;(s||[]).filter((function(e){return!A(e.node)})).forEach((function(e){var t=e.key,n=r.get(t),o=a.get(t);(n||o)&&(h=!0),n||(l=!1)})),t?r.set(e,l):r.set(e,!1),a.set(e,h),c&&i(c.key)}}}}function s(e){if(r.get(e)!==t){var o=n.get(e);if(o){var a=o.children;A(o.node)||(r.set(e,t),(a||[]).forEach((function(e){s(e.key)})))}}}function c(e){var o=n.get(e);if(o){var a=o.children,c=o.parent,l=o.node;r.set(e,t),A(l)||((a||[]).filter((function(e){return!A(e.node)})).forEach((function(e){s(e.key)})),c&&i(c.key))}}(o.checkedKeys||[]).forEach((function(e){r.set(e,!0)})),(o.halfCheckedKeys||[]).forEach((function(e){a.set(e,!0)})),(e||[]).forEach((function(e){c(e)}));var l,h=[],d=[],u=E(r);try{for(u.s();!(l=u.n()).done;){var f=g(l.value,2),p=f[0],v=f[1];v&&h.push(p)}}catch(x){u.e(x)}finally{u.f()}var b,y=E(a);try{for(y.s();!(b=y.n()).done;){var k=g(b.value,2),D=k[0],T=k[1];!r.get(D)&&T&&d.push(D)}}catch(x){y.e(x)}finally{y.f()}return{checkedKeys:h,halfCheckedKeys:d}}function U(e,t){var n=new Map;function o(e){if(!n.get(e)){var r=t.get(e);if(r){n.set(e,!0);var a=r.parent,i=r.node,s=v(i);s&&s.disabled||a&&o(a.key)}}}return(e||[]).forEach((function(e){o(e)})),p(n.keys())}function W(e){return Object.keys(e).reduce((function(t,n){return"data-"!==n.substr(0,5)&&"aria-"!==n.substr(0,5)||(t[n]=e[n]),t}),{})}export{N as F,S as T,E as _,F as a,U as b,G as c,R as d,J as e,L as f,_ as g,I as h,j as i,M as j,W as k,B as l,K as m,$ as n,V as p};
