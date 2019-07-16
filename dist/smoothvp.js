// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/tornis/dist/tornis.js":[function(require,module,exports) {
var define;
!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?s(exports):"function"==typeof define&&define.amd?define(["exports"],s):(t=t||self,s(t.tornis={}))}(this,function(t){"use strict";function s(t,s){let i=0;return function(...e){const h=(new Date).getTime();if(!(h-i<t))return i=h,s(...e)}}function i(t){return Math.floor(t.reduce((t,s)=>t+s,0)/t.length)}const e="undefined"==typeof window;class h{constructor(){e||(this.lastX=0,this.lastY=0,this.lastWidth=window.innerWidth,this.lastHeight=window.innerHeight,this.lastMouseX=0,this.lastMouseY=0,this.scrollHeight=document.body.scrollHeight,this.scrollChange=!1,this.sizeChange=!1,this.mouseChange=!1,this.currX=0,this.currY=0,this.currWidth=window.innerWidth,this.currHeight=window.innerHeight,this.currMouseX=0,this.currMouseY=0,this.mouseXVelocity=[],this.mouseYVelocity=[],this.lastMouseXVelocity=0,this.lastMouseYVelocity=0,this.updating=!1,this.callbacks=[],this.update=this.update.bind(this),this.handleResize=this.handleResize.bind(this),this.handleMouse=this.handleMouse.bind(this),this.formatData=this.formatData.bind(this),this.watch=this.watch.bind(this),this.unwatch=this.unwatch.bind(this),this.handleResize=s(110,this.handleResize),this.handleMouse=s(75,this.handleMouse),window.addEventListener("resize",this.handleResize),window.addEventListener("mousemove",this.handleMouse),requestAnimationFrame(this.update))}handleResize(t){this.currWidth=window.innerWidth,this.currHeight=window.innerHeight}handleMouse(t){this.currMouseX=t.clientX,this.currMouseY=t.clientY}formatData(){return{scroll:{changed:this.scrollChange,left:Math.floor(this.lastX),right:Math.floor(this.lastX+this.lastWidth),top:Math.floor(this.lastY),bottom:Math.floor(this.lastY+this.lastHeight),velocity:{x:Math.floor(this.scrollXVelocity)||0,y:Math.floor(this.scrollYVelocity)||0}},size:{changed:this.sizeChange,x:Math.floor(this.lastWidth),y:Math.floor(this.lastHeight),docY:Math.floor(this.scrollHeight)},mouse:{changed:this.mouseChange,x:Math.floor(this.lastMouseX),y:Math.floor(this.lastMouseY),velocity:{x:Math.floor(this.lastMouseXVelocity)||0,y:Math.floor(this.lastMouseYVelocity)||0}}}}update(){const{currWidth:currWidth,currHeight:currHeight,currMouseX:currMouseX,currMouseY:currMouseY}=this;if(this.updating)return!1;this.scrollChange=this.sizeChange=this.mouseChange=!1,window.pageXOffset==this.lastX&&0!=this.scrollXVelocity&&(this.scrollXVelocity=0,this.scrollChange=!0),window.pageYOffset==this.lastY&&0!=this.scrollYVelocity&&(this.scrollYVelocity=0,this.scrollChange=!0),window.pageXOffset!=this.lastX&&(this.scrollChange=!0,this.scrollXVelocity=Math.floor(window.pageXOffset-this.lastX),this.lastX=window.pageXOffset),window.pageYOffset!=this.lastY&&(this.scrollChange=!0,this.scrollYVelocity=Math.floor(window.pageYOffset-this.lastY),this.lastY=window.pageYOffset),currWidth!=this.lastWidth&&(this.lastWidth=currWidth,this.scrollHeight=document.body.scrollHeight,this.sizeChange=!0),currHeight!=this.lastHeight&&(this.lastHeight=currHeight,this.sizeChange=!0),this.mouseXVelocity.length>5&&this.mouseXVelocity.shift(),this.mouseXVelocity.push(currMouseX-this.lastMouseX),i(this.mouseXVelocity)!=this.lastMouseXVelocity&&(this.lastMouseXVelocity=i(this.mouseXVelocity),this.mouseChange=!0),currMouseX!=this.lastMouseX&&(this.lastMouseX=currMouseX,this.mouseChange=!0),this.mouseYVelocity.length>5&&this.mouseYVelocity.shift(),this.mouseYVelocity.push(currMouseY-this.lastMouseY),i(this.mouseYVelocity)!=this.lastMouseYVelocity&&(this.lastMouseYVelocity=i(this.mouseYVelocity),this.mouseChange=!0),currMouseY==this.lastMouseY&&0==i(this.mouseYVelocity)||(this.lastMouseY=currMouseY,this.mouseChange=!0),(this.scrollChange||this.sizeChange||this.mouseChange)&&this.callbacks.forEach(t=>t(this.formatData())),this.updating=!1,requestAnimationFrame(this.update)}watch(t,s=!0){if("function"!=typeof t)throw new Error("Value passed to Watch is not a function");if(!e){if(s){const s=this.formatData();s.scroll.changed=!0,s.mouse.changed=!0,s.size.changed=!0,t(s)}this.callbacks.push(t)}}unwatch(t){if("function"!=typeof t)throw new Error("The value passed to unwatch is not a function");e||(this.callbacks=this.callbacks.filter(s=>s!==t))}}const o=new h;e||(window.__TORNIS={watchViewport:o.watch,unwatchViewport:o.unwatch,getViewportState:o.formatData});const a=o.watch,l=o.unwatch,n=o.formatData;t.getViewportState=n,t.unwatchViewport=l,t.watchViewport=a,Object.defineProperty(t,"__esModule",{value:!0})});

},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.later = exports.onInit = void 0;

var onInit = function onInit(callback) {
  return document.addEventListener('DOMContentLoaded', callback);
};

exports.onInit = onInit;

var later = function later(callback) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  if (timeout === 0) {
    callback();
  } else {
    setTimeout(callback, timeout);
  }
};

exports.later = later;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Easing = void 0;

var _tornis = require("tornis");

var _utils = require("./utils");

var Easing = {
  EASE_OUT_SINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  EASE_OUT_QUINT: 'cubic-bezier(0.23, 1, 0.32, 1)',
  EASE_OUT_CIRC: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  EASE_OUT_QUAD: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  EASE_OUT_EXPO: 'cubic-bezier(0.19, 1, 0.22, 1)',
  EASE_OUT_BACK: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};
exports.Easing = Easing;

var Smoothvp = function Smoothvp(container, content) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'vertical' : _ref$direction;

  var handlers = {
    update: []
  };
  var spacer;

  var addEventListener = function addEventListener(event, handler) {
    if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
      throw new Error("Event '".concat(event, "' is not supported"));
    }

    handlers[event].push(handler);
  };

  var removeEventListener = function removeEventListener(event, handler) {
    if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
      throw new Error("Event '".concat(event, "' is not supported"));
    }

    var index = handlers[event].indexOf(handler);

    if (index !== -1) {
      handlers[event].splice(index, 1);
    }
  };

  var dispatch = function dispatch(event) {
    return handlers[event.type].forEach(function (handler) {
      return handler(event);
    });
  };

  var getTranslation = function getTranslation(y) {
    if (direction === 'horizontal') {
      return "translate3D(".concat(-y, "px, 100vh, 0) rotate(-90deg)");
    }

    return "translate3D(0, ".concat(-y, "px, 0)");
  };

  var createSpacer = function createSpacer(height) {
    spacer = document.createElement('div');
    spacer.classList.add('smoothvp-spacer');
    spacer.style.height = "".concat(height, "px");
    container.parentElement.appendChild(spacer);
  };

  var handleViewportUpdate = function handleViewportUpdate(_ref2) {
    var scroll = _ref2.scroll,
        size = _ref2.size;

    if (scroll.changed) {
      var event = new Event('update');
      var top = scroll.top;

      if (direction === 'vertical') {
        content.style.transform = getTranslation(top);
        event.top = top;
      } else {
        var _spacer$getBoundingCl = spacer.getBoundingClientRect(),
            spacerHeight = _spacer$getBoundingCl.height;

        var percent = top / (spacerHeight - size.y);
        var diff = window.innerHeight - window.innerWidth;
        content.style.transform = getTranslation(top + diff * percent);
        event.top = top;
      }

      dispatch(event);
    }

    if (size.changed) {
      var _spacer$getBoundingCl2 = spacer.getBoundingClientRect(),
          width = _spacer$getBoundingCl2.width;

      var _content$getBoundingC = content.getBoundingClientRect(),
          x = _content$getBoundingC.width,
          y = _content$getBoundingC.height;

      var spacerSize = direction === 'vertical' ? y : x;
      spacer.style.height = "".concat(spacerSize, "px");
      container.style.width = "".concat(width, "px");
    }
  };

  var applyTabFix = function applyTabFix() {
    document.addEventListener('keydown', function (event) {
      var key = event.code || event.which;

      if (key === 9 || key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });
  };

  var smooth = function smooth(_ref3) {
    var _ref3$duration = _ref3.duration,
        duration = _ref3$duration === void 0 ? 500 : _ref3$duration,
        _ref3$timingFunction = _ref3.timingFunction,
        timingFunction = _ref3$timingFunction === void 0 ? Easing.EASE_OUT_QUINT : _ref3$timingFunction;
    applyTabFix();
    (0, _utils.later)(function () {
      var _content$getBoundingC2 = content.getBoundingClientRect(),
          contentHeight = _content$getBoundingC2.height,
          contentWidth = _content$getBoundingC2.width;

      var _window = window,
          scrollY = _window.scrollY;
      createSpacer(direction === 'vertical' ? contentHeight : contentWidth);
      container.style.overflow = 'hidden';
      container.style.position = 'fixed';
      container.style.height = direction === 'vertical' ? '100vh' : "".concat(contentHeight, "px");
      container.style.width = direction === 'vertical' ? "".concat(contentWidth, "px") : '';

      if (direction === 'horizontal') {
        content.style.transformOrigin = 'left top';
        content.style.width = '100vh';
        var children = Array.from(content.querySelectorAll('*'));
        children.forEach(function (child) {
          if (child.classList.contains('smoothvp-rotate')) {
            child.style.transformOrigin = 'center';
            child.style.transform = 'rotate(90deg)';
          }
        });
      }

      content.style.transform = getTranslation(scrollY);
      (0, _utils.later)(function () {
        content.style.transition = "transform ".concat(duration, "ms ").concat(timingFunction);
      }, 10);
      (0, _tornis.watchViewport)(handleViewportUpdate);
    });
  };

  var unsmooth = function unsmooth() {
    (0, _utils.later)(function () {
      spacer.parentElement.removeChild(spacer);
      container.style.overflow = '';
      container.style.position = '';
      container.style.height = '';
      container.style.width = '';
      content.style.transform = '';
      content.style.transition = '';
      (0, _tornis.unwatchViewport)(handleViewportUpdate);
    });
  };

  return {
    smooth: smooth,
    unsmooth: unsmooth,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  };
};

Smoothvp.Easing = {
  EASE_OUT_SINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  EASE_OUT_QUINT: 'cubic-bezier(0.23, 1, 0.32, 1)',
  EASE_OUT_CIRC: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  EASE_OUT_QUAD: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  EASE_OUT_EXPO: 'cubic-bezier(0.19, 1, 0.22, 1)',
  EASE_OUT_BACK: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};
window.Smoothvp = Smoothvp;
var _default = Smoothvp;
exports.default = _default;
},{"tornis":"../node_modules/tornis/dist/tornis.js","./utils":"utils.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37719" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/smoothvp.js.map