parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"kuOY":[function(require,module,exports) {
var define;
var t;!function(s,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof t&&t.amd?t(["exports"],i):i((s=s||self).tornis={})}(this,function(t){"use strict";function s(t,s){let i=0;return function(...e){const h=(new Date).getTime();if(!(h-i<t))return i=h,s(...e)}}function i(t){return Math.floor(t.reduce((t,s)=>t+s,0)/t.length)}const e="undefined"==typeof window;const h=new class{constructor(){e||(this.lastX=0,this.lastY=0,this.lastWidth=window.innerWidth,this.lastHeight=window.innerHeight,this.lastMouseX=0,this.lastMouseY=0,this.scrollHeight=document.body.scrollHeight,this.scrollChange=!1,this.sizeChange=!1,this.mouseChange=!1,this.currX=0,this.currY=0,this.currWidth=window.innerWidth,this.currHeight=window.innerHeight,this.currMouseX=0,this.currMouseY=0,this.mouseXVelocity=[],this.mouseYVelocity=[],this.lastMouseXVelocity=0,this.lastMouseYVelocity=0,this.updating=!1,this.callbacks=[],this.update=this.update.bind(this),this.handleResize=this.handleResize.bind(this),this.handleMouse=this.handleMouse.bind(this),this.formatData=this.formatData.bind(this),this.watch=this.watch.bind(this),this.unwatch=this.unwatch.bind(this),this.handleResize=s(110,this.handleResize),this.handleMouse=s(75,this.handleMouse),window.addEventListener("resize",this.handleResize),window.addEventListener("mousemove",this.handleMouse),requestAnimationFrame(this.update))}handleResize(t){this.currWidth=window.innerWidth,this.currHeight=window.innerHeight}handleMouse(t){this.currMouseX=t.clientX,this.currMouseY=t.clientY}formatData(){return{scroll:{changed:this.scrollChange,left:Math.floor(this.lastX),right:Math.floor(this.lastX+this.lastWidth),top:Math.floor(this.lastY),bottom:Math.floor(this.lastY+this.lastHeight),velocity:{x:Math.floor(this.scrollXVelocity)||0,y:Math.floor(this.scrollYVelocity)||0}},size:{changed:this.sizeChange,x:Math.floor(this.lastWidth),y:Math.floor(this.lastHeight),docY:Math.floor(this.scrollHeight)},mouse:{changed:this.mouseChange,x:Math.floor(this.lastMouseX),y:Math.floor(this.lastMouseY),velocity:{x:Math.floor(this.lastMouseXVelocity)||0,y:Math.floor(this.lastMouseYVelocity)||0}}}}update(){const{currWidth:t,currHeight:s,currMouseX:e,currMouseY:h}=this;if(this.updating)return!1;this.scrollChange=this.sizeChange=this.mouseChange=!1,window.pageXOffset==this.lastX&&0!=this.scrollXVelocity&&(this.scrollXVelocity=0,this.scrollChange=!0),window.pageYOffset==this.lastY&&0!=this.scrollYVelocity&&(this.scrollYVelocity=0,this.scrollChange=!0),window.pageXOffset!=this.lastX&&(this.scrollChange=!0,this.scrollXVelocity=Math.floor(window.pageXOffset-this.lastX),this.lastX=window.pageXOffset),window.pageYOffset!=this.lastY&&(this.scrollChange=!0,this.scrollYVelocity=Math.floor(window.pageYOffset-this.lastY),this.lastY=window.pageYOffset),t!=this.lastWidth&&(this.lastWidth=t,this.scrollHeight=document.body.scrollHeight,this.sizeChange=!0),s!=this.lastHeight&&(this.lastHeight=s,this.sizeChange=!0),this.mouseXVelocity.length>5&&this.mouseXVelocity.shift(),this.mouseXVelocity.push(e-this.lastMouseX),i(this.mouseXVelocity)!=this.lastMouseXVelocity&&(this.lastMouseXVelocity=i(this.mouseXVelocity),this.mouseChange=!0),e!=this.lastMouseX&&(this.lastMouseX=e,this.mouseChange=!0),this.mouseYVelocity.length>5&&this.mouseYVelocity.shift(),this.mouseYVelocity.push(h-this.lastMouseY),i(this.mouseYVelocity)!=this.lastMouseYVelocity&&(this.lastMouseYVelocity=i(this.mouseYVelocity),this.mouseChange=!0),h==this.lastMouseY&&0==i(this.mouseYVelocity)||(this.lastMouseY=h,this.mouseChange=!0),(this.scrollChange||this.sizeChange||this.mouseChange)&&this.callbacks.forEach(t=>t(this.formatData())),this.updating=!1,requestAnimationFrame(this.update)}watch(t,s=!0){if("function"!=typeof t)throw new Error("Value passed to Watch is not a function");if(!e){if(s){const s=this.formatData();s.scroll.changed=!0,s.mouse.changed=!0,s.size.changed=!0,t(s)}this.callbacks.push(t)}}unwatch(t){if("function"!=typeof t)throw new Error("The value passed to unwatch is not a function");e||(this.callbacks=this.callbacks.filter(s=>s!==t))}};e||(window.__TORNIS={watchViewport:h.watch,unwatchViewport:h.unwatch,getViewportState:h.formatData});const o=h.watch,a=h.unwatch,l=h.formatData;t.getViewportState=l,t.unwatchViewport=a,t.watchViewport=o,Object.defineProperty(t,"__esModule",{value:!0})});
},{}],"iJA9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Position=exports.Direction=exports.Easing=void 0;var e={EASE_OUT_SINE:"cubic-bezier(0.39, 0.575, 0.565, 1)",EASE_OUT_CUBIC:"cubic-bezier(0.215, 0.61, 0.355, 1)",EASE_OUT_QUINT:"cubic-bezier(0.23, 1, 0.32, 1)",EASE_OUT_CIRC:"cubic-bezier(0.075, 0.82, 0.165, 1)",EASE_OUT_QUAD:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",EASE_OUT_QUART:"cubic-bezier(0.165, 0.84, 0.44, 1)",EASE_OUT_EXPO:"cubic-bezier(0.19, 1, 0.22, 1)",EASE_OUT_BACK:"cubic-bezier(0.175, 0.885, 0.32, 1.275)"};exports.Easing=e;var i={VERTICAL:"vertical",HORIZONTAL:"horizontal"};exports.Direction=i;var r={TOP:"TOP",CENTER:"CENTER",BOTTOM:"BOTTOM"};exports.Position=r;
},{}],"FO+Z":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.css=exports.getPageOffset=exports.horizontalToVertical=exports.verticalToHorizontal=exports.isChildOf=exports.next=exports.later=exports.onInit=void 0;var t=require("./constants"),e=function(t){return document.addEventListener("DOMContentLoaded",t)};exports.onInit=e;var n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;0===e?t():setTimeout(t,e)};exports.later=n;var o=function(t){return requestAnimationFrame(t)};exports.next=o;var r=function(t,e){for(var n=t;n;){if(n===e)return!0;n=n.parentElement}return!1};exports.isChildOf=r;var i=function(t){var e=t.spacer,n=t.top,o=t.size,r=e.getBoundingClientRect().height,i=n/(r-o.y);return(r-o.x)*i};exports.verticalToHorizontal=i;var s=function(e){var n=e.offset,o=e.position,r=e.spacer,i=e.content,s=e.target,l=r.getBoundingClientRect().height,a=i.getBoundingClientRect().left,d=s.getBoundingClientRect(),c=d.left,u=d.width,h=Math.floor(c+Math.abs(a)),p=h-(window.innerWidth/2-u/2),w=h-window.innerWidth+u;return(function(e){switch(o){case t.Position.TOP:return h;case t.Position.CENTER:return p;case t.Position.BOTTOM:return w;default:return p}}()+(n||0))/(l-window.innerWidth)*(l-window.innerHeight)};exports.horizontalToVertical=s;var l=function(t){var e=t.getBoundingClientRect(),n=e.left,o=e.top,r=e.width,i=e.height;return{left:n+window.scrollY,top:o+window.scrollY,centerLeft:n+window.scrollY-(window.innerWidth-r)/2,centerTop:o+window.scrollY-(window.innerHeight-i)/2,bottomLeft:n+window.scrollY-window.innerWidth+r,bottomTop:o+window.scrollY-window.innerHeight+i,width:r,height:i}};exports.getPageOffset=l;var a=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];if(!document.getElementById("smoothvp-styles")){var r=document.createElement("style"),i=t.map(function(t,e){return t+n[e]}).join("");r.setAttribute("type","text/css"),r.setAttribute("id","smoothvp-styles"),document.head.appendChild(r),r.styleSheet?r.styleSheet.cssText=i:r.appendChild(document.createTextNode(i));return{style:r,uninstall:function(){return r.parentElement.removeChild(r)}}}};exports.css=a;
},{"./constants":"iJA9"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("tornis"),e=require("./constants"),n=require("./utils");function o(){var t=r(["\n      html,\n      body,\n      .smoothvp-container {\n        overscroll-behavior: none;\n      }\n\n      .smoothvp-container {\n        overflow: visible;\n        position: fixed;\n        top: 0;\n      }\n\n      .smoothvp-content.smoothvp-horizontal {\n        width: 100vh;\n        transform-origin: left top;\n      }\n\n      .smoothvp-content.smoothvp-horizontal .smoothvp-rotate {\n        transform-origin: center center;\n        transform: rotate(90deg);\n      }\n    "]);return o=function(){return t},t}function r(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function i(t,e){var n=Object.keys(t);return Object.getOwnPropertySymbols&&n.push.apply(n,Object.getOwnPropertySymbols(t)),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(n,!0).forEach(function(e){s(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var l=function(r,i){var s,l,u=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).direction,p=void 0===u?e.Direction.VERTICAL:u,f={update:[]},d=function(t){var n=Math.floor(t);return p===e.Direction.HORIZONTAL?"translate3D(".concat(-n,"px, 100vh, 0) rotate(-90deg)"):"translate3D(0, ".concat(-n,"px, 0)")},v=function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{offset:void 0,position:e.Position.CENTER},r=o.offset,l=o.position;if((0,n.isChildOf)(t,i))if(p===e.Direction.VERTICAL){var u=(0,n.getPageOffset)(t),f=u.top,d=u.centerTop,v=u.bottomTop,h=function(t){switch(l){case e.Position.TOP:return f;case e.Position.CENTER:return d;case e.Position.BOTTOM:return v;default:return d}}();"undefined"===a(r)?window.scrollTo(0,h):window.scrollTo(0,h+r)}else{var m=(0,n.horizontalToVertical)(c({},o,{spacer:s,content:i,target:t}));window.scrollTo(0,m)}},h=function(t){var o=t.scroll,c=t.size;if(c.changed){var a=s.getBoundingClientRect().width,l=i.getBoundingClientRect(),u=l.width,v=l.height,h=p===e.Direction.VERTICAL?v:u;s.style.height="".concat(h,"px"),r.style.width="".concat(a,"px"),p===e.Direction.HORIZONTAL&&(r.style.height="".concat(v,"px"))}if(o.changed){var m=new Event("update"),y=o.top;if(p===e.Direction.VERTICAL)i.style.transform=d(y),m.top=y;else{var w=(0,n.verticalToHorizontal)({spacer:s,top:y,size:c});i.style.transform=d(w),m.top=y}!function(t){f[t.type].forEach(function(e){return e(t)})}(m)}},m=function(t){var e=t.code||t.which;9!==e&&"Tab"!==e||(0,n.next)(function(){return v(document.activeElement)})},y=function(c){var u=c.duration,f=void 0===u?500:u,v=c.timingFunction,y=void 0===v?e.Easing.EASE_OUT_QUINT:v;"undefined"===a(window.orientation)&&-1===navigator.userAgent.indexOf("IEMobile")&&(l=(0,n.css)(o()),document.addEventListener("keydown",m),(0,n.later)(function(){var o,c=i.getBoundingClientRect(),a=c.height,l=c.width,u=window.scrollY;o=p===e.Direction.VERTICAL?a:l,(s=document.createElement("div")).classList.add("smoothvp-spacer"),s.style.height="".concat(o,"px"),r.parentElement.appendChild(s),r.classList.add("smoothvp-container"),r.style.height=p===e.Direction.VERTICAL?"100vh":"".concat(a,"px"),r.style.width=p===e.Direction.VERTICAL?"".concat(l,"px"):"",i.classList.add("smoothvp-content"),i.classList.add("smoothvp-".concat(p)),i.style.transform=d(u),(0,n.later)(function(){i.style.transition="transform ".concat(f,"ms ").concat(y)},10),(0,t.watchViewport)(h)}))},w=function(){"undefined"===a(window.orientation)&&-1===navigator.userAgent.indexOf("IEMobile")&&(l.uninstall(),document.removeEventListener("keydown",m),(0,n.later)(function(){s.parentElement.removeChild(s),r.classList.remove("smoothvp-container"),r.style.height="",r.style.width="",i.classList.remove("smoothvp-content","smoothvp-".concat(p)),i.style.transition="",i.style.transform="",(0,t.unwatchViewport)(h)}))};return{smooth:y,start:y,unsmooth:w,stop:w,scrollTo:function(t){var n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{offset:void 0,position:e.Position.CENTER};if(t instanceof HTMLElement)return v(t,o);n=t,window.scrollTo(0,n)},addEventListener:function(t,e){if(!Object.prototype.hasOwnProperty.call(f,t))throw new Error("Event '".concat(t,"' is not supported"));f[t].push(e)},removeEventListener:function(t,e){if(!Object.prototype.hasOwnProperty.call(f,t))throw new Error("Event '".concat(t,"' is not supported"));var n=f[t].indexOf(e);-1!==n&&f[t].splice(n,1)}}};l.Easing=e.Easing,l.Direction=e.Direction,l.Position=e.Position,window.Smoothvp=l;var u=l;exports.default=u;
},{"tornis":"kuOY","./constants":"iJA9","./utils":"FO+Z"}]},{},["Focm"], null)
//# sourceMappingURL=/smoothvp.js.map