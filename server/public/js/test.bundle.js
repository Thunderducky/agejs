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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scene_node = __webpack_require__(0);

var _transform = __webpack_require__(2);

var _utils = __webpack_require__(1);

var root = new _scene_node.SceneNode(); /*
                                          Our traversal, transform seems to be running into issues, so we're going to iron out the kinks
                                          we're going to start with translation and work on it from there
                                        */

root.id = "root";
root.translation.x = 100;
root.translation.y = 100;
root.rotation = Math.PI / 2;
//root.scale.x = 2;
//root.scale.y = 2;
// const child = new SceneNode(root);
// child.id = "child";
// child.translation.x = 10;
// child.translation.y = 10;
// const child2 = new SceneNode(root);
// child2.id = "child2";
// const grandchild = new SceneNode(child);
// grandchild.id = "grandchild";

// Let's build our transformation network, woo!

var transformStack = [];
transformStack.push(new _transform.Transform());

function graph() {
  (0, _scene_node.traverseGraph)(root, function (node) {
    // printNode(node);
    var t = (0, _transform.nodeTransform)(node, (0, _utils.last)(transformStack));
    // printTransform(t);
    // console.log("inverse");
    // printTransform(t.invert())
    transformStack.push(t);
    if (node.id == "root") {
      var inv = t.invert();
      var point = inv.transformPoint(x, y);
      console.log("\n        Inverse of " + x + "," + y + ":\n        " + point.x + ", " + point.y + "\n      ");
      (0, _transform.printTransform)(inv);
    }
    return true;
  }, function (node) {
    //printNode(node);
    transformStack.pop();
  });
}

var transform = new _transform.Transform();

function printNode(node) {
  console.log("\n      node: " + node.id + "\n      translation: " + node.translation.x + ", " + node.translation.y + "\n      rotation: " + node.rotation + " radians\n      scale: " + node.scale.x + ", " + node.scale.y + "\n    ");
}
var x = 0;
var y = 0;
var canvas = document.getElementById("test");
canvas.onmousemove = function (e) {
  x = e.x;
  y = e.y;
};

canvas.onclick = function (e) {
  console.log(x, y);
  graph();
};

/***/ })
/******/ ]);
//# sourceMappingURL=test.bundle.js.map