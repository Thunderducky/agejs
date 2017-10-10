/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

// This might be split up into multiple types

var SceneNode = function () {
  function SceneNode(parent) {
    var translation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
    var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { x: 1, y: 1 };
    var texture = arguments[4];
    var zIndex = arguments[5];
    var offset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : { x: 0.5, y: 0.5 };
    var visible = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
    var onclick = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;

    _classCallCheck(this, SceneNode);

    // fairly straightforward mapping of nodes
    this.translation = translation;
    this.rotation = rotation;
    this.scale = scale;
    this.texture = texture;
    this.zIndex = zIndex;

    // Don't allocate arrays until we need to
    this.children = null;
    this.parent = parent;
    this.visible = visible;
    if (this.parent != null) {
      this.parent.addChild(this);
    }

    this.offset = offset;

    // define this later if I need to
    this.text = undefined;
    this.onclick = onclick;
  }

  _createClass(SceneNode, [{
    key: "addChild",
    value: function addChild(node) {
      if (this.children == null) {
        this.children = [];
      }
      node.parent = this;
      this.children.push(node);

      // assign a default zIndex, relatively naive :)
      if (node.zIndex == null) {
        node.zIndex = this.children.length;
      } else {
        // Maybe we need to sort our children?
        this.children.sort(function (a, b) {
          return a.zIndex - b.zIndex;
        });
      }
    }
  }]);

  return SceneNode;
}();

// SceneNodes can HAVE Clickable, Texture, Text, etc

function traverseGraph(node) {
  var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  // we can tell it to stop
  if (before(node) && node.children) {
    node.children.forEach(function (child) {
      return traverseGraph(child, before, after);
    });
  }
  after(node);
}

exports.SceneNode = SceneNode;
exports.traverseGraph = traverseGraph;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var between = function between(a, b, c) {
  return a >= b && a <= c || a <= b && a >= c;
};
var last = function last(arr) {
  return arr[arr.length - 1];
};

var noop = function noop() {};

exports.between = between;
exports.last = last;
exports.noop = noop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Really understand matrix transforms
var Transform = function () {
  function Transform() {
    _classCallCheck(this, Transform);

    this.reset();
  }

  _createClass(Transform, [{
    key: "reset",
    value: function reset() {
      this.m = [1, 0, // m11, m12 0,1 // Scale and rotation
      0, 1, // m21, m22 2,3
      0, 0]; // dx, dy, 4,5  // Offset
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(matrix) {
      var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
      var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

      var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
      var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

      var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
      var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      this.m[4] = dx;
      this.m[5] = dy;

      return this;
    }
  }, {
    key: "invert",
    value: function invert() {
      var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
      var m0 = this.m[3] * d;
      var m1 = -this.m[1] * d;
      var m2 = -this.m[2] * d;
      var m3 = this.m[0] * d;
      var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
      var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      this.m[0] = m0;
      this.m[1] = m1;
      this.m[2] = m2;
      this.m[3] = m3;
      this.m[4] = m4;
      this.m[5] = m5;

      return this;
    }
    // Transformation is in radians

  }, {
    key: "rotate",
    value: function rotate(rad) {
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m11 = this.m[0] * c + this.m[2] * s;
      var m12 = this.m[1] * c + this.m[3] * s;
      var m21 = this.m[0] * -s + this.m[2] * c;
      var m22 = this.m[1] * -s + this.m[3] * c;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;

      return this;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this.m[4] += this.m[0] * x + this.m[2] * y;
      this.m[5] += this.m[1] * x + this.m[3] * y;

      return this;
    }
  }, {
    key: "scale",
    value: function scale(sx, sy) {
      this.m[0] *= sx;
      this.m[1] *= sx;
      this.m[2] *= sy;
      this.m[3] *= sy;

      return this;
    }
  }, {
    key: "set",
    value: function set(matrix) {
      for (var i = 0; i < 6; i++) {
        this.m[i] = matrix.m[i];
      }
      return this;
    }

    // Transform coordinate into current coordinate space

  }, {
    key: "transformPoint",
    value: function transformPoint(px, py) {
      var x = px;
      var y = py;
      px = x * this.m[0] + y * this.m[2] + this.m[4];
      py = x * this.m[1] + y * this.m[3] + this.m[5];

      return { x: px, y: py };
    }
  }, {
    key: "zeroPoint",
    value: function zeroPoint() {
      return this.transformPoint(0, 0);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Transform().set(this);
    }
  }]);

  return Transform;
}();

var approx = function approx(number) {
  return number.toFixed(2);
  // return Math.abs(number) < 0.0000000001
  //   ? "~0"
  //   : number
};

function printTransform(t) {
  console.log("\n    [ " + approx(t.m[0]) + ", " + approx(t.m[1]) + "\n      " + approx(t.m[2]) + ", " + approx(t.m[3]) + "\n      " + approx(t.m[4]) + ", " + approx(t.m[5]) + " ]\n  ");
  return this;
}

var nodeTransform = function nodeTransform(node) {
  var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Transform();

  return transform.copy().translate(node.translation.x, node.translation.y).rotate(node.rotation).scale(node.scale.x, node.scale.y);
};

exports.Transform = Transform;
exports.nodeTransform = nodeTransform;
exports.printTransform = printTransform;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function Texture(name, srcImage, x, y, width, height) {
  _classCallCheck(this, Texture);

  this.name = name, this.srcImage = srcImage;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

// Origin is currently hardcoded to center


var drawTexture = function drawTexture(ctx, texture) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0.5, y: 0.5 };

  ctx.drawImage(texture.srcImage, texture.x, texture.y, texture.width, texture.height,
  // we'll mess with this part next :)
  -offset.x * texture.width, -offset.y * texture.height, texture.width, texture.height);
};

exports.Texture = Texture;
exports.drawTexture = drawTexture;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

var State = function State(manager) {
  _classCallCheck(this, State);

  this.manager = manager;
  this.onEnter = noop;
  this.onUpdate = noop; // Function to run during the state
  this.onExit = noop;
};

var StateManager = function () {
  function StateManager(systems) {
    _classCallCheck(this, StateManager);

    this.systems = systems;
    this._currentState = new State();
    this._nextState = null;
  }

  _createClass(StateManager, [{
    key: "setNext",
    value: function setNext(state) {
      state.manager = this;
      this._nextState = state;
    }
  }, {
    key: "update",
    value: function update() {
      if (this._nextState) {
        this._currentState.onExit();
        this._nextState.onEnter();
        this._currentState = this._nextState;
        this._nextState = null;
      }
      this._currentState.onUpdate();
    }
  }]);

  return StateManager;
}();

exports.State = State;
exports.StateManager = StateManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameText = function GameText(text, style, font) {
  _classCallCheck(this, GameText);

  this.text = text;
  this.style = style;
  this.font = font;
};

var drawText = function drawText(ctx, gameText) {
  ctx.save();
  ctx.font = gameText.font || ctx.font;
  ctx.fillStyle = gameText.style || ctx.fillStyle;
  ctx.fillText(gameText.text, 0, 0);
  ctx.restore();
};

exports.GameText = GameText;
exports.drawText = drawText;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectangleBounds = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RectangleBounds = function () {
  function RectangleBounds(width, height, offset) {
    var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, RectangleBounds);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    if (offset) {
      this.x = this.x - offset.x * this.width, this.y = this.y - offset.y * this.height;
    }
  }

  _createClass(RectangleBounds, [{
    key: "contains",
    value: function contains(point) {
      return (0, _utils.between)(point.x, this.x, this.x + this.width) && (0, _utils.between)(point.y, this.y, this.y + this.height);
    }
  }]);

  return RectangleBounds;
}();

exports.RectangleBounds = RectangleBounds;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _grey_sheet = __webpack_require__(9);

var _grey_sheet2 = _interopRequireDefault(_grey_sheet);

var _blue_sheet = __webpack_require__(10);

var _blue_sheet2 = _interopRequireDefault(_blue_sheet);

var _asset_loader = __webpack_require__(11);

var _asset_loader2 = _interopRequireDefault(_asset_loader);

var _scene_node = __webpack_require__(0);

var _engine = __webpack_require__(12);

var _engine2 = _interopRequireDefault(_engine);

var _state_management = __webpack_require__(4);

var _bounds = __webpack_require__(6);

var _panel = __webpack_require__(16);

var _button = __webpack_require__(17);

var _game_text = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("test");
var engine = new _engine2.default(canvas);

var loadState = new _state_management.State();
var renderState = new _state_management.State();

var newNode = new _scene_node.SceneNode();
var panel = null;
var text = null;
var button = null;
loadState.onEnter = function () {
  var me = this;
  var systems = me.manager.systems;
  var root = systems.scene_graph;
  Promise.all([(0, _asset_loader2.default)(_grey_sheet2.default), (0, _asset_loader2.default)(_blue_sheet2.default)]).then(function (atlases) {
    var _atlases = _slicedToArray(atlases, 2),
        greyAtlas = _atlases[0],
        blueAtlas = _atlases[1];

    var panelTexture = greyAtlas.get("grey_panel");
    panel = new _panel.Panel(panelTexture, 600, 600);

    var btnTexture = blueAtlas.get("blue_button00");
    button = new _button.Button({
      up: btnTexture,
      down: blueAtlas.get("blue_button01")
    }, {
      width: 190,
      height: 49
    }, new _game_text.GameText("Click me!"), function () {
      console.log("WOO");
    });

    button.node.translation.x = 100;
    button.node.translation.y = 100;

    // root.node.translation.x = 10;
    // root.node.translation.y = 10;
    root.translation.x = 100;
    root.translation.y = 100;
    root.addChild(panel.node);
    panel.node.translation.x = 10;
    panel.node.translation.y = 10;

    root.addChild(button.node);
    button.node.id = "btntest";
    var newNode = new _scene_node.SceneNode();
    newNode.text = new _game_text.GameText("test", "blue", "30px Arial");
    root.addChild(newNode);

    me.manager.setNext(renderState);
  });
};

loadState.onUpdate = function () {
  console.log("loading");
};

renderState.onEnter = function () {
  console.log("drawing");
};

renderState.onUpdate = function () {};

engine.stateManager.setNext(loadState);

engine.start();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"TextureAtlas":{"imagePath":"../assets/ui_sheets/greySheet.png","SubTexture":[{"name":"grey_arrowDownGrey.png","x":"78","y":"498","width":"15","height":"10"},{"name":"grey_arrowDownWhite.png","x":"123","y":"496","width":"15","height":"10"},{"name":"grey_arrowUpGrey.png","x":"108","y":"498","width":"15","height":"10"},{"name":"grey_arrowUpWhite.png","x":"93","y":"498","width":"15","height":"10"},{"name":"grey_box.png","x":"147","y":"433","width":"38","height":"36"},{"name":"grey_boxCheckmark.png","x":"147","y":"469","width":"38","height":"36"},{"name":"grey_boxCross.png","x":"185","y":"433","width":"38","height":"36"},{"name":"grey_boxTick.png","x":"190","y":"198","width":"36","height":"36"},{"name":"grey_button00.png","x":"0","y":"143","width":"190","height":"45"},{"name":"grey_button01.png","x":"0","y":"188","width":"190","height":"49"},{"name":"grey_button02.png","x":"0","y":"98","width":"190","height":"45"},{"name":"grey_button03.png","x":"0","y":"331","width":"190","height":"49"},{"name":"grey_button04.png","x":"0","y":"286","width":"190","height":"45"},{"name":"grey_button05.png","x":"0","y":"0","width":"195","height":"49"},{"name":"grey_button06.png","x":"0","y":"49","width":"191","height":"49"},{"name":"grey_button07.png","x":"195","y":"0","width":"49","height":"49"},{"name":"grey_button08.png","x":"240","y":"49","width":"49","height":"49"},{"name":"grey_button09.png","x":"98","y":"433","width":"49","height":"45"},{"name":"grey_button10.png","x":"191","y":"49","width":"49","height":"49"},{"name":"grey_button11.png","x":"0","y":"433","width":"49","height":"45"},{"name":"grey_button12.png","x":"244","y":"0","width":"49","height":"49"},{"name":"grey_button13.png","x":"49","y":"433","width":"49","height":"45"},{"name":"grey_button14.png","x":"0","y":"384","width":"190","height":"49"},{"name":"grey_button15.png","x":"0","y":"237","width":"190","height":"49"},{"name":"grey_checkmarkGrey.png","x":"99","y":"478","width":"21","height":"20"},{"name":"grey_checkmarkWhite.png","x":"78","y":"478","width":"21","height":"20"},{"name":"grey_circle.png","x":"185","y":"469","width":"36","height":"36"},{"name":"grey_crossGrey.png","x":"120","y":"478","width":"18","height":"18"},{"name":"grey_crossWhite.png","x":"190","y":"318","width":"18","height":"18"},{"name":"grey_panel.png","x":"190","y":"98","width":"100","height":"100"},{"name":"grey_sliderDown.png","x":"190","y":"234","width":"28","height":"42"},{"name":"grey_sliderEnd.png","x":"138","y":"478","width":"8","height":"10"},{"name":"grey_sliderHorizontal.png","x":"0","y":"380","width":"190","height":"4"},{"name":"grey_sliderLeft.png","x":"0","y":"478","width":"39","height":"31"},{"name":"grey_sliderRight.png","x":"39","y":"478","width":"39","height":"31"},{"name":"grey_sliderUp.png","x":"190","y":"276","width":"28","height":"42"},{"name":"grey_sliderVertical.png","x":"208","y":"318","width":"4","height":"100"},{"name":"grey_tickGrey.png","x":"190","y":"336","width":"17","height":"17"},{"name":"grey_tickWhite.png","x":"190","y":"353","width":"17","height":"17"}]}}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"TextureAtlas":{"imagePath":"../assets/ui_sheets/blueSheet.png","SubTexture":[{"name":"blue_boxCheckmark.png","x":"380","y":"36","width":"38","height":"36"},{"name":"blue_boxCross.png","x":"380","y":"0","width":"38","height":"36"},{"name":"blue_boxTick.png","x":"386","y":"210","width":"36","height":"36"},{"name":"blue_button00.png","x":"0","y":"94","width":"190","height":"49"},{"name":"blue_button01.png","x":"190","y":"49","width":"190","height":"45"},{"name":"blue_button02.png","x":"190","y":"0","width":"190","height":"49"},{"name":"blue_button03.png","x":"0","y":"49","width":"190","height":"45"},{"name":"blue_button04.png","x":"0","y":"0","width":"190","height":"49"},{"name":"blue_button05.png","x":"0","y":"192","width":"190","height":"45"},{"name":"blue_button06.png","x":"288","y":"194","width":"49","height":"49"},{"name":"blue_button07.png","x":"239","y":"194","width":"49","height":"49"},{"name":"blue_button08.png","x":"190","y":"194","width":"49","height":"45"},{"name":"blue_button09.png","x":"339","y":"94","width":"49","height":"49"},{"name":"blue_button10.png","x":"290","y":"94","width":"49","height":"45"},{"name":"blue_button11.png","x":"337","y":"184","width":"49","height":"49"},{"name":"blue_button12.png","x":"290","y":"139","width":"49","height":"45"},{"name":"blue_button13.png","x":"0","y":"143","width":"190","height":"49"},{"name":"blue_checkmark.png","x":"337","y":"233","width":"21","height":"20"},{"name":"blue_circle.png","x":"386","y":"174","width":"36","height":"36"},{"name":"blue_cross.png","x":"0","y":"237","width":"18","height":"18"},{"name":"blue_panel.png","x":"190","y":"94","width":"100","height":"100"},{"name":"blue_sliderDown.png","x":"416","y":"72","width":"28","height":"42"},{"name":"blue_sliderLeft.png","x":"339","y":"143","width":"39","height":"31"},{"name":"blue_sliderRight.png","x":"378","y":"143","width":"39","height":"31"},{"name":"blue_sliderUp.png","x":"388","y":"72","width":"28","height":"42"},{"name":"blue_tick.png","x":"18","y":"239","width":"17","height":"17"}]}}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texture = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextureAtlas = function () {
  function TextureAtlas(image, data) {
    _classCallCheck(this, TextureAtlas);

    this.image = image;
    this.data = data.TextureAtlas.SubTexture;
    // TODO: Initialize image references to all of them?

    // Convert each item string value to numbers
    this.data.forEach(function (item) {
      item.x = +item.x;
      item.y = +item.y;
      item.width = +item.width;
      item.height = +item.height;
    });
  }

  _createClass(TextureAtlas, [{
    key: "get",
    value: function get(name) {
      // var texture = {};
      var refTexture = this.data.find(function (item) {
        return item.name.split(".")[0] === name;
      });
      console.log(refTexture);
      var texture = new _texture.Texture(refTexture.name, this.image, +refTexture.x, +refTexture.y, +refTexture.width, +refTexture.height);
      console.log(texture);
      return texture;
    }
  }]);

  return TextureAtlas;
}();

var loadAsset = function loadAsset(loadData) {
  return new Promise(function (resolve, reject) {
    // Load base image
    var url = loadData.TextureAtlas.imagePath;
    var img = new Image();
    img.onload = function () {
      resolve(new TextureAtlas(img, loadData));
    };
    img.onerror = function () {
      reject();
    };
    img.src = url;
  });
};

exports.default = loadAsset;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state_management = __webpack_require__(4);

var _scene_node = __webpack_require__(0);

var _game_loop = __webpack_require__(13);

var _render_management = __webpack_require__(14);

var _input_management = __webpack_require__(15);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO, introduce loops and register any draws and hits
var Engine = function () {
  function Engine(canvas) {
    var _this = this;

    _classCallCheck(this, Engine);

    // We might be able to pluck rendering off of this list
    this.systems = {
      input_manager: new _input_management.InputManager(canvas),
      render_manager: new _render_management.RenderManager(canvas.getContext("2d")),
      scene_graph: new _scene_node.SceneNode(), // ROOT
      loop: new _game_loop.Loop()
    };
    this.stateManager = new _state_management.StateManager(this.systems);
    this.systems.loop.onLoop = function (stepTime, totalTime) {
      // run our traverseGraph rendering algorithm
      (0, _scene_node.traverseGraph)(_this.systems.scene_graph, function (node) {
        //debugger;
        _this.systems.input_manager.onNode(node);
        _this.systems.render_manager.onNode(node);
        return true;
      }, function (node) {
        _this.systems.render_manager.afterNode(node);
        _this.systems.input_manager.afterNode(node);
      });

      // Process given user input
      _this.systems.input_manager.processInput();
      _this.stateManager.update(stepTime, totalTime);

      _this.systems.input_manager.reset();
    };
  }

  _createClass(Engine, [{
    key: "start",
    value: function start() {
      this.systems.loop.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.systems.loop.stop();
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Create LogicLoop and Animation Loop

function getTime() {
  return window.performance.now();
}
var noop = function noop() {};
// uses request animation frame, might split out another loop if necessary

var Loop = function () {
  function Loop() {
    var onLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _classCallCheck(this, Loop);

    this.onLoop = onLoop;
    this.breakLoop = false;
    this.startTime = getTime();
    this.lastTime = getTime();
    this._loop = this._loop.bind(this);
  }

  _createClass(Loop, [{
    key: "_loop",
    value: function _loop() {
      // Loop is broken, we are done
      if (this.breakLoop) {
        return;
      }
      var currentTime = getTime();
      // time since last frame and time since start
      this.onLoop(currentTime - this.lastTime, currentTime - this.startTime);
      window.requestAnimationFrame(this._loop);
      this.lastTime = currentTime;
    }
  }, {
    key: "start",
    value: function start() {
      this.breakLoop = false;
      this._loop();
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.breakLoop = true;
      return this;
    }
  }]);

  return Loop;
}();
// Maybe add an animation control loop or something, i dunno

exports.Loop = Loop;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texture = __webpack_require__(3);

var _game_text = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderManager = function () {
  function RenderManager(ctx) {
    _classCallCheck(this, RenderManager);

    this.ctx = ctx; // Canvas 2D context
  }

  _createClass(RenderManager, [{
    key: "onNode",
    value: function onNode(node) {
      this.ctx.save();
      this.ctx.translate(node.translation.x, node.translation.y);
      this.ctx.rotate(node.rotation);
      this.ctx.scale(node.scale.x, node.scale.y);

      if (node.visible) {
        if (node.texture) {
          (0, _texture.drawTexture)(this.ctx, node.texture, node.offset);
        }
        if (node.text) {
          (0, _game_text.drawText)(this.ctx, node.text);
        }
      }
    }
  }, {
    key: "afterNode",
    value: function afterNode(node) {
      this.ctx.restore();
    }
  }]);

  return RenderManager;
}();

exports.RenderManager = RenderManager;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transform = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputManager = function () {
  function InputManager(canvas) {
    var _this = this;

    _classCallCheck(this, InputManager);

    this.lastClick = {
      x: 0,
      y: 0,
      handled: true
    };
    this.clickedItems = [];
    this._transformStack = [new _transform.Transform()];

    canvas.onclick = function (e) {
      var rect = canvas.getBoundingClientRect();
      _this.lastClick.x = e.clientX - rect.left;
      _this.lastClick.y = e.clientY - rect.top;
      _this.lastClick.handled = false;
    };

    // We are listening on the canvas
    this.canvas = canvas;
    console.log(this._transformStack);
  }

  _createClass(InputManager, [{
    key: "onNode",
    value: function onNode(node) {
      if (this.lastClick.handled) {
        return;
      }
      var nodeMatrix = (0, _transform.nodeTransform)(node);
      var matrix = (0, _utils.last)(this._transformStack);

      var nextMatrix = matrix.multiply(nodeMatrix);

      var mouseToPoint = nextMatrix.invert();
      var transferred = mouseToPoint.transformPoint(this.lastClick.x, this.lastClick.y);
      //console.log(`You clicked at ${transferred.x}, ${transferred.y}`);
      if (node.id == "btntest") {
        console.log(this.lastClick);
        console.log(transferred);
        console.log(node.bounds);
      }

      if (node.bounds && node.bounds.contains(transferred)) {
        this.clickedItems.push(node);
        console.log(this.clickedItems);
      }

      this._transformStack.push(nextMatrix);
    }
  }, {
    key: "afterNode",
    value: function afterNode(node) {
      if (this.lastClick.handled) {
        return;
      }
      this._transformStack.pop();
    }
  }, {
    key: "processInput",
    value: function processInput() {
      while (this.clickedItems.length > 0) {
        console.log("OH NO ROBOTS");
        var item = this.clickedItems.pop();
        if (item.onclick && !item.onclick()) {
          break;
        }
      }
      this.clickedItems.length = 0;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.lastClick.handled = true;
      this.clickedItems.length = 0;
      this._transformStack.length = 0; // remove all except the first
      this._transformStack.push(new _transform.Transform());
    }
  }]);

  return InputManager;
}();

exports.InputManager = InputManager;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = undefined;

var _texture = __webpack_require__(3);

var _scene_node = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TL = {
  x: 0,
  y: 0
};
Object.freeze(TL);

var splitTextures = function splitTextures(texture, cornerLength) {
  var st = {
    northwest: {},
    north: {},
    northeast: {},
    west: {},
    center: {},
    east: {},
    southwest: {},
    south: {},
    southeast: {}
  };

  var panel_center_w = texture.width - cornerLength * 2;
  var panel_center_h = texture.height - cornerLength * 2;

  console.log(panel_center_w);
  console.log(panel_center_h);

  for (var sub in st) {
    Object.assign(st[sub], texture);
  }
  console.log(st);

  // North Row
  st.northwest.name += "_NW";
  st.northwest.width = cornerLength;
  st.northwest.height = cornerLength;

  st.north.name += "_N";
  st.north.width = panel_center_w;
  st.north.height = cornerLength;
  st.north.x += cornerLength;

  st.northeast.name += "_NE";
  st.northeast.width = cornerLength;
  st.northeast.height = cornerLength;
  st.northeast.x += cornerLength + panel_center_w;

  // Center Row
  st.west.name += "_W";
  st.west.width = cornerLength;
  st.west.height = panel_center_h;
  st.west.y += cornerLength;

  st.center.name += "_C";
  st.center.width = panel_center_w;
  st.center.height = panel_center_h;
  st.center.x += cornerLength;
  st.center.y += cornerLength;

  st.east.name += "_E";
  st.east.width = cornerLength;
  st.east.height = panel_center_h;
  st.east.x += cornerLength + panel_center_w;
  st.east.y += cornerLength;

  st.southwest.name += "_SW";
  st.southwest.width = cornerLength;
  st.southwest.height = cornerLength;

  st.southwest.y += cornerLength + panel_center_h;

  st.south.name += "_S";
  st.south.width = panel_center_w;
  st.south.height = cornerLength;
  st.south.x += cornerLength;
  st.south.y += cornerLength + panel_center_h;

  st.southeast.name += "_SE";
  st.southeast.width = cornerLength;
  st.southeast.height = cornerLength;
  st.southeast.x += cornerLength + panel_center_w;
  st.southeast.y += cornerLength + panel_center_h;

  return st;
};

var Panel = function Panel(texture, width, height) {
  var cornerLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

  _classCallCheck(this, Panel);

  // we have a terrible error
  if (texture == null) {
    throw new Error("Panel must have a texture");
  }

  this.texture = texture;;
  this.cornerLength = cornerLength;
  var subtextures = splitTextures(this.texture, this.cornerLength);

  this.node = new _scene_node.SceneNode();
  this._width = width;
  this._height = height;

  var txOffset = {
    x: subtextures.northwest.x,
    y: subtextures.northwest.y
  };
  var nodes = {};
  for (var st in subtextures) {
    var node = new _scene_node.SceneNode(this.node);
    var tex = subtextures[st];
    node.texture = tex;
    node.offset = TL;
    nodes[st] = node;
    node.visible = false;
  }

  var centerScaleW = (this._width - cornerLength * 2) / (this.texture.width - cornerLength * 2);
  var centerScaleH = (this._height - cornerLength * 2) / (this.texture.height - cornerLength * 2);

  nodes.northwest.visible = true;

  nodes.north.visible = true;
  nodes.north.translation.x += cornerLength;
  nodes.north.scale.x = centerScaleW;

  nodes.northeast.visible = true;
  nodes.northeast.translation.x += this._width - cornerLength;

  nodes.west.visible = true;
  nodes.west.translation.y += cornerLength;
  nodes.west.scale.y = centerScaleH;

  nodes.center.visible = true;
  nodes.center.translation.x += cornerLength;
  nodes.center.translation.y += cornerLength;
  nodes.center.scale.x = centerScaleW;
  nodes.center.scale.y = centerScaleH;

  nodes.east.visible = true;
  nodes.east.translation.x += this._width - cornerLength;
  nodes.east.translation.y += cornerLength;
  nodes.east.scale.y = centerScaleH;

  nodes.southwest.visible = true;
  nodes.southwest.translation.y += this._height - cornerLength;

  nodes.south.visible = true;
  nodes.south.translation.x += cornerLength;
  nodes.south.translation.y += this._height - cornerLength;
  nodes.south.scale.x = centerScaleW;

  nodes.southeast.visible = true;
  nodes.southeast.translation.x += this._width - cornerLength;
  nodes.southeast.translation.y += this._height - cornerLength;
};

exports.Panel = Panel;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scene_node = __webpack_require__(0);

var _bounds = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: While being clicked, shouldn't allow it to be triggered
// TODO: Make more robust (clicked button respects mousedown, mousemove, etc)
var BUTTON_CLICK_TIME = 1000; // take a second

var Button = function () {
  function Button(textures, dimensions, gameText, onClientClick) {
    _classCallCheck(this, Button);

    this.node = new _scene_node.SceneNode();
    this._clickable = true;
    this.countdownTime = 0;
    this.upNode = new _scene_node.SceneNode(this.node);
    this.upNode.texture = textures.up;

    this.downNode = new _scene_node.SceneNode(this.node);
    this.downNode.texture = textures.down;
    this.downNode.visible = false;

    this.node.bounds = new _bounds.RectangleBounds(dimensions.width, dimensions.height);

    this.textNode = new _scene_node.SceneNode(this.node);
    // TODO: rename this terrible thing
    this.onclientclick = onClientClick;
    this.onclick = function () {
      if (!this._clickable) {
        return false; // stop early
      }
      this._clickable = false;
      this.countdownTime = BUTTON_CLICK_TIME;
      this.upNode.visible = false;
      this.downNode.visible = true;
      this.onclientclick();

      return false;
    };
  }
  // TODO: Abstract this into timers, so we're not doing it custom


  _createClass(Button, [{
    key: 'update',
    value: function update(frameTime, totalTime) {
      if (!this._clickable && this.countdownTime > 0) {
        this.countdownTime -= frameTime;
        if (this.countdownTime < 0) {
          this._clickable = true;
          this.upNode.visible = true;
          this.downNode.visible = false;
        }
      }
    }
  }]);

  return Button;
}();

exports.Button = Button;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map