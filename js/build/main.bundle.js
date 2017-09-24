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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SceneNode = function () {
  function SceneNode(parent) {
    var translation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
    var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { x: 1, y: 1 };
    var texture = arguments[4];
    var zIndex = arguments[5];
    var offset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : { x: 0.5, y: 0.5 };
    var visible = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

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
    this.textStyle = undefined;
    this.text = undefined;
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
// Click tester that keeps up with rotations etc
// Check if our source image has pixels there?
// function renderGraph(ctx, node){
//   ctx.save();
//   ctx.translate(node.translation.x, node.translation.y);
//   ctx.rotate(node.rotation);
//   ctx.scale(node.scale.x, node.scale.y);
//
//   if(node.texture && node.visible){
//     drawTexture(ctx, node.texture, node.offset);
//   }
//   if(node.text && node.visible){
//     drawText(ctx, node.text, node.textStyle)
//   }
//   if(node.children && node.visible){
//     node.children.forEach(child => renderGraph(ctx, child));
//   }
//   ctx.restore();
// }

var noop = function noop() {};
function traverseGraph(node) {
  var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  // we can tell it to stop
  if (before(node) && node.children) {
    node.children.forEach(function (child) {
      return traverseGraph(child, cb);
    });
  }
  after(node);
}

exports.SceneNode = SceneNode;
exports.traverseGraph = traverseGraph;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _blue_sheet = __webpack_require__(3);

var _blue_sheet2 = _interopRequireDefault(_blue_sheet);

var _asset_loader = __webpack_require__(4);

var _asset_loader2 = _interopRequireDefault(_asset_loader);

var _scene_node = __webpack_require__(1);

var _texture = __webpack_require__(0);

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _button = __webpack_require__(6);

var _button2 = _interopRequireDefault(_button);

var _utils = __webpack_require__(8);

var _transform = __webpack_require__(7);

var _bounds = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("test"); // Let's draw a couple things from a scene graph

var ctx = canvas.getContext("2d");

var lastClick = { x: 0, y: 0, handled: true };

function draw() {
  // RENDER AND PROCESS UI EVENTS
  var buttonClicked = false;
  var transformStack = [new _transform.Transform()];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  (0, _scene_node.traverseGraph)(rootNode, function (node) {
    ctx.save();
    ctx.translate(node.translation.x, node.translation.y);
    ctx.rotate(node.rotation);
    ctx.scale(node.scale.x, node.scale.y);
    // Update our current transform and push it onto the list
    var currentTransform = (0, _utils.last)(transformStack).multiply((0, _transform.nodeTransform)(node));
    transformStack.push(currentTransform);

    var transferred = currentTransform.invert().transformPoint(lastClick.x, lastClick.y);
    // I don't think we've handled offset
    //last(transformStack).print();
    if (!lastClick.handled) {
      if (node.bounds && node.bounds.contains(transferred)) {
        buttonClicked = true;
      }
    }

    if (node.texture && node.visible) {
      (0, _texture.drawTexture)(ctx, node.texture, node.offset);
    }

    return true;
  }, function (node) {
    ctx.restore();
    transformStack.pop();
  });

  if (buttonClicked) {
    console.log("You clicked the button!");
    buttonClicked = false;
  }

  lastClick.handled = true;
}

var rootNode = new _scene_node.SceneNode();
(0, _asset_loader2.default)(_blue_sheet2.default).then(function (atlas) {
  rootNode.translation.x = 400;
  rootNode.translation.y = 80;
  rootNode.rotation = Math.PI / 8;
  var texture = atlas.get("blue_button00");
  rootNode.offset = { x: 1, y: 0 };
  rootNode.bounds = new _bounds.RectangleBounds(texture.width, texture.height, rootNode.offset);
  rootNode.texture = texture;
  setInterval(draw, 1);
});

canvas.onclick = function (e) {
  var rect = canvas.getBoundingClientRect();
  lastClick.x = e.clientX - rect.left;
  lastClick.y = e.clientY - rect.top;
  lastClick.handled = false;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"TextureAtlas":{"imagePath":"./assets/ui_sheets/blueSheet.png","SubTexture":[{"name":"blue_boxCheckmark.png","x":"380","y":"36","width":"38","height":"36"},{"name":"blue_boxCross.png","x":"380","y":"0","width":"38","height":"36"},{"name":"blue_boxTick.png","x":"386","y":"210","width":"36","height":"36"},{"name":"blue_button00.png","x":"0","y":"94","width":"190","height":"49"},{"name":"blue_button01.png","x":"190","y":"49","width":"190","height":"45"},{"name":"blue_button02.png","x":"190","y":"0","width":"190","height":"49"},{"name":"blue_button03.png","x":"0","y":"49","width":"190","height":"45"},{"name":"blue_button04.png","x":"0","y":"0","width":"190","height":"49"},{"name":"blue_button05.png","x":"0","y":"192","width":"190","height":"45"},{"name":"blue_button06.png","x":"288","y":"194","width":"49","height":"49"},{"name":"blue_button07.png","x":"239","y":"194","width":"49","height":"49"},{"name":"blue_button08.png","x":"190","y":"194","width":"49","height":"45"},{"name":"blue_button09.png","x":"339","y":"94","width":"49","height":"49"},{"name":"blue_button10.png","x":"290","y":"94","width":"49","height":"45"},{"name":"blue_button11.png","x":"337","y":"184","width":"49","height":"49"},{"name":"blue_button12.png","x":"290","y":"139","width":"49","height":"45"},{"name":"blue_button13.png","x":"0","y":"143","width":"190","height":"49"},{"name":"blue_checkmark.png","x":"337","y":"233","width":"21","height":"20"},{"name":"blue_circle.png","x":"386","y":"174","width":"36","height":"36"},{"name":"blue_cross.png","x":"0","y":"237","width":"18","height":"18"},{"name":"blue_panel.png","x":"190","y":"94","width":"100","height":"100"},{"name":"blue_sliderDown.png","x":"416","y":"72","width":"28","height":"42"},{"name":"blue_sliderLeft.png","x":"339","y":"143","width":"39","height":"31"},{"name":"blue_sliderRight.png","x":"378","y":"143","width":"39","height":"31"},{"name":"blue_sliderUp.png","x":"388","y":"72","width":"28","height":"42"},{"name":"blue_tick.png","x":"18","y":"239","width":"17","height":"17"}]}}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texture = __webpack_require__(0);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _texture = __webpack_require__(0);

var _scene_node = __webpack_require__(1);

var _scene_node2 = _interopRequireDefault(_scene_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // const NORTH = 0, MID = 1, SOUTH = 2,
//       WEST = 0,           EAST  = 2;
//
// class Panel {
//   constructor(texture, x,y, width = 100, height = 100,offset = 10){
//     this.texture = texture;
//     this.x = x;
//     this.y = y;
//     this.height = height;
//     this.width = width;
//     this.split = []
//     this.offset = offset;
//     for(let i = 0; i < 3; i++){
//       for(let j = 0; j < 3; j++){
//         const side = Object.assign({}, texture)
//
//         switch(i){
//           case NORTH:
//             side.height = offset;
//             break;
//           case MID:
//             side.y = side.y + offset;
//             side.height = 1;
//             break;
//           case SOUTH:
//             side.y = side.y + side.height - offset;
//             side.height = offset;
//             break;
//         }
//         switch(j){
//           case WEST:
//             side.width = offset;
//             break;
//           case MID:
//             side.x = side.x + offset;
//             side.width = 1;
//             break;
//           case EAST:
//             side.x = side.x + side.width - offset;
//             side.width = offset;
//             break;
//         }
//         this.split.push(side);
//       }
//     }
//
//   }
//   draw(drawTexture){
//     const [nw,n,ne, w,m,e,sw,s,se] = this.split;
//     let x = this.x, y = this.y;
//     drawTexture(nw,x,y);
//
//     x = this.x + this.offset;
//     drawTexture(n,x,y,(this.width - this.offset*2), 1);
//
//     x = this.x + this.width - this.offset;
//     drawTexture(ne,x,y);
//
//     x = this.x;
//     y = this.y + this.offset;
//     drawTexture(w,x,y,1,this.height - this.offset * 2);
//
//     x = this.x + this.offset;
//     drawTexture(m,x,y,this.width - this.offset*2,this.height - this.offset * 2);
//
//     x = this.x + this.width - this.offset;
//     drawTexture(e,x,y,1,this.height - this.offset * 2);
//
//     x = this.x;
//     y = this.y + this.height - this.offset;
//     drawTexture(sw,x,y);
//
//     x = this.x + this.offset;
//     drawTexture(s,x,y,this.width - this.offset*2,1);
//
//     x = this.x + this.width - this.offset;
//     drawTexture(se,x,y);
//   }
// }
//
// export default Panel;


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

  this.node = new _scene_node2.default();
  this._width = width;
  this._height = height;

  var txOffset = {
    x: subtextures.northwest.x,
    y: subtextures.northwest.y
  };
  var nodes = {};
  for (var st in subtextures) {
    var node = new _scene_node2.default(this.node);
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

exports.default = Panel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scene_node = __webpack_require__(1);

var _scene_node2 = _interopRequireDefault(_scene_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(textures, width, height, onclick) {
    _classCallCheck(this, Button);

    this.node = new _scene_node2.default();
    this.upNode = new _scene_node2.default(this.node); // Button Released
    this.upNode.texture = textures[0];
    this.downNode = new _scene_node2.default(this.node); // Button Pressed
    this.downNode.texture = textures[1];
    this.downNode.visible = false;

    this.width = width;
    this.height = height;

    this.textNode = new _scene_node2.default(this.node);
    this.textNode.text = "test";
    this.textNode.textStyle = "white";
    this.textNode.translation.x = -30;
    this.textNode.translation.y = 10;
  }

  _createClass(Button, [{
    key: "toggle",
    value: function toggle() {
      this.upNode.visible = this.downNode.visible;
      this.downNode.visible = !this.downNode.visible;
      if (this.upNode.visible) {
        this.textNode.translation.y = 10;
      } else {
        this.textNode.translation.y = 12;
      }
    }
  }]);

  return Button;
}();

exports.default = Button;

/***/ }),
/* 7 */
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
  }, {
    key: "print",
    value: function print() {
      console.log("");
      console.log(this.m[0] + ", " + this.m[1]);
      console.log(this.m[2] + ", " + this.m[3]);
      console.log(this.m[4] + ", " + this.m[5]);
      return this;
    }
  }]);

  return Transform;
}();

var nodeTransform = function nodeTransform(node) {
  return new Transform().translate(node.translation.x, node.translation.y).rotate(node.rotation).scale(node.scale.x, node.scale.y);
};

exports.Transform = Transform;
exports.nodeTransform = nodeTransform;

/***/ }),
/* 8 */
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

exports.between = between;
exports.last = last;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectangleBounds = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(8);

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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map