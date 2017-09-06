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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _blue_sheet = __webpack_require__(1);

var _blue_sheet2 = _interopRequireDefault(_blue_sheet);

var _asset_loader = __webpack_require__(2);

var _asset_loader2 = _interopRequireDefault(_asset_loader);

var _scene_node = __webpack_require__(3);

var _scene_node2 = _interopRequireDefault(_scene_node);

var _texture = __webpack_require__(4);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("test"); // Let's draw a couple things from a scene graph

var ctx = canvas.getContext("2d");
var NONE = undefined;

var TL = { x: 0, y: 0 };
Object.freeze(TL);

var rootNode = new _scene_node2.default();

function renderGraph(node) {
  ctx.save();
  ctx.translate(node.translation.x, node.translation.y);
  ctx.rotate(node.rotation);
  ctx.scale(node.scale.x, node.scale.y);

  if (node.texture && node.visible) {
    (0, _texture.drawTexture)(ctx, node.texture, node.offset);
  }
  if (node.children) {
    node.children.forEach(function (child) {
      return renderGraph(child);
    });
  }
  ctx.restore();
}

// nodes will go in a dfs traversal
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderGraph(rootNode);
}

(0, _asset_loader2.default)(_blue_sheet2.default).then(function (atlas) {
  // let baseTexture = atlas.get("blue_panel")
  // we're going to build a special panel
  // we can give the size we want in order to use it
  rootNode.translation.x = 0;
  rootNode.translation.y = 0;

  var panel = new _panel2.default(atlas.get("blue_panel"), 500, 50);
  panel.panelNode.translation.x = 5;
  panel.panelNode.translation.y = 5;
  rootNode.addChild(panel.panelNode);

  draw();
  //setInterval(draw,1);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"TextureAtlas":{"imagePath":"./assets/ui_sheets/blueSheet.png","SubTexture":[{"name":"blue_boxCheckmark.png","x":"380","y":"36","width":"38","height":"36"},{"name":"blue_boxCross.png","x":"380","y":"0","width":"38","height":"36"},{"name":"blue_boxTick.png","x":"386","y":"210","width":"36","height":"36"},{"name":"blue_button00.png","x":"0","y":"94","width":"190","height":"49"},{"name":"blue_button01.png","x":"190","y":"49","width":"190","height":"45"},{"name":"blue_button02.png","x":"190","y":"0","width":"190","height":"49"},{"name":"blue_button03.png","x":"0","y":"49","width":"190","height":"45"},{"name":"blue_button04.png","x":"0","y":"0","width":"190","height":"49"},{"name":"blue_button05.png","x":"0","y":"192","width":"190","height":"45"},{"name":"blue_button06.png","x":"288","y":"194","width":"49","height":"49"},{"name":"blue_button07.png","x":"239","y":"194","width":"49","height":"49"},{"name":"blue_button08.png","x":"190","y":"194","width":"49","height":"45"},{"name":"blue_button09.png","x":"339","y":"94","width":"49","height":"49"},{"name":"blue_button10.png","x":"290","y":"94","width":"49","height":"45"},{"name":"blue_button11.png","x":"337","y":"184","width":"49","height":"49"},{"name":"blue_button12.png","x":"290","y":"139","width":"49","height":"45"},{"name":"blue_button13.png","x":"0","y":"143","width":"190","height":"49"},{"name":"blue_checkmark.png","x":"337","y":"233","width":"21","height":"20"},{"name":"blue_circle.png","x":"386","y":"174","width":"36","height":"36"},{"name":"blue_cross.png","x":"0","y":"237","width":"18","height":"18"},{"name":"blue_panel.png","x":"190","y":"94","width":"100","height":"100"},{"name":"blue_sliderDown.png","x":"416","y":"72","width":"28","height":"42"},{"name":"blue_sliderLeft.png","x":"339","y":"143","width":"39","height":"31"},{"name":"blue_sliderRight.png","x":"378","y":"143","width":"39","height":"31"},{"name":"blue_sliderUp.png","x":"388","y":"72","width":"28","height":"42"},{"name":"blue_tick.png","x":"18","y":"239","width":"17","height":"17"}]}}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _texture = __webpack_require__(4);

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
/* 3 */
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

exports.default = SceneNode;

/***/ }),
/* 4 */
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
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _texture = __webpack_require__(4);

var _scene_node = __webpack_require__(3);

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

  this.panelNode = new _scene_node2.default();
  this._width = width;
  this._height = height;

  var txOffset = {
    x: subtextures.northwest.x,
    y: subtextures.northwest.y
  };
  var nodes = {};
  for (var st in subtextures) {
    var node = new _scene_node2.default(this.panelNode);
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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map