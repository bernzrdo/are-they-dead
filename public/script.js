/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/js-confetti/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/js-confetti/dist/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JSConfetti)
/* harmony export */ });
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function normalizeComputedStyleValue(string) {
  // "250px" --> 250
  return +string.replace(/px/, '');
}
function fixDPR(canvas) {
  var dpr = window.devicePixelRatio;
  var computedStyles = getComputedStyle(canvas);
  var width = normalizeComputedStyleValue(computedStyles.getPropertyValue('width'));
  var height = normalizeComputedStyleValue(computedStyles.getPropertyValue('height'));
  canvas.setAttribute('width', (width * dpr).toString());
  canvas.setAttribute('height', (height * dpr).toString());
}

function generateRandomNumber(min, max) {
  var fractionDigits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
}

function generateRandomArrayElement(arr) {
  return arr[generateRandomNumber(0, arr.length)];
}

var FREE_FALLING_OBJECT_ACCELERATION = 0.00125;
var MIN_DRAG_FORCE_COEFFICIENT = 0.0005;
var MAX_DRAG_FORCE_COEFFICIENT = 0.0009;
var ROTATION_SLOWDOWN_ACCELERATION = 0.00001;
var INITIAL_SHAPE_RADIUS = 6;
var INITIAL_EMOJI_SIZE = 80;
var MIN_INITIAL_CONFETTI_SPEED = 0.9;
var MAX_INITIAL_CONFETTI_SPEED = 1.7;
var MIN_FINAL_X_CONFETTI_SPEED = 0.2;
var MAX_FINAL_X_CONFETTI_SPEED = 0.6;
var MIN_INITIAL_ROTATION_SPEED = 0.03;
var MAX_INITIAL_ROTATION_SPEED = 0.07;
var MIN_CONFETTI_ANGLE_IN_DEGREES = 15;
var MAX_CONFETTI_ANGLE_IN_DEGREES = 82;
var MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES = 150;
var SHAPE_VISIBILITY_TRESHOLD = 100;
var DEFAULT_CONFETTI_NUMBER = 250;
var DEFAULT_EMOJIS_NUMBER = 40;
var DEFAULT_CONFETTI_COLORS = ['#fcf403', '#62fc03', '#f4fc03', '#03e7fc', '#03fca5', '#a503fc', '#fc03ad', '#fc03c2'];

// For wide screens - fast confetti, for small screens - slow confetti
function getWindowWidthCoefficient(canvasWidth) {
  var HD_SCREEN_WIDTH = 1920;
  return Math.log(canvasWidth) / Math.log(HD_SCREEN_WIDTH);
}
var ConfettiShape = /*#__PURE__*/function () {
  function ConfettiShape(args) {
    _classCallCheck(this, ConfettiShape);
    var initialPosition = args.initialPosition,
      confettiRadius = args.confettiRadius,
      confettiColors = args.confettiColors,
      emojis = args.emojis,
      emojiSize = args.emojiSize,
      canvasWidth = args.canvasWidth,
      initialFlightAngle = args.initialFlightAngle,
      rotationAngle = args.rotationAngle,
      _args$shouldHideConfe = args.shouldHideConfettiInShiftedPosition,
      shouldHideConfettiInShiftedPosition = _args$shouldHideConfe === void 0 ? false : _args$shouldHideConfe;
    var randomConfettiSpeed = generateRandomNumber(MIN_INITIAL_CONFETTI_SPEED, MAX_INITIAL_CONFETTI_SPEED, 3);
    var initialSpeed = randomConfettiSpeed * getWindowWidthCoefficient(canvasWidth);
    this.confettiSpeed = {
      x: initialSpeed,
      y: initialSpeed
    };
    this.finalConfettiSpeedX = generateRandomNumber(MIN_FINAL_X_CONFETTI_SPEED, MAX_FINAL_X_CONFETTI_SPEED, 3);
    this.rotationSpeed = emojis.length ? 0.01 : generateRandomNumber(MIN_INITIAL_ROTATION_SPEED, MAX_INITIAL_ROTATION_SPEED, 3) * getWindowWidthCoefficient(canvasWidth);
    this.dragForceCoefficient = generateRandomNumber(MIN_DRAG_FORCE_COEFFICIENT, MAX_DRAG_FORCE_COEFFICIENT, 6);
    this.radius = {
      x: confettiRadius,
      y: confettiRadius
    };
    this.initialRadius = confettiRadius;
    this.rotationAngle = rotationAngle;
    this.emojiSize = emojiSize;
    this.emojiRotationAngle = generateRandomNumber(0, 2 * Math.PI);
    this.radiusYUpdateDirection = 'down';
    this.cos = Math.cos(initialFlightAngle);
    this.sin = Math.sin(initialFlightAngle);
    var positionShift = generateRandomNumber(-150, 0);
    this.positionOffset = {
      x: positionShift * this.sin,
      y: positionShift * this.cos
    };
    this.distanceTravelled = {
      x: 0,
      y: 0
    };
    var shiftedInitialPosition = {
      x: initialPosition.x + this.positionOffset.x,
      y: initialPosition.y - this.positionOffset.y
    };
    this.currentPosition = Object.assign({}, shiftedInitialPosition);
    this.initialPosition = Object.assign({}, shiftedInitialPosition);
    this.color = emojis.length ? null : generateRandomArrayElement(confettiColors);
    this.emoji = emojis.length ? generateRandomArrayElement(emojis) : null;
    this.createdAt = new Date().getTime();
    this.isVisible = !shouldHideConfettiInShiftedPosition;
  }
  return _createClass(ConfettiShape, [{
    key: "draw",
    value: function draw(canvasContext) {
      var currentPosition = this.currentPosition,
        radius = this.radius,
        color = this.color,
        emoji = this.emoji,
        rotationAngle = this.rotationAngle,
        emojiRotationAngle = this.emojiRotationAngle,
        emojiSize = this.emojiSize,
        isVisible = this.isVisible;
      if (!isVisible) return;
      var dpr = window.devicePixelRatio;
      if (color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.ellipse(currentPosition.x * dpr, currentPosition.y * dpr, radius.x * dpr, radius.y * dpr, rotationAngle, 0, 2 * Math.PI);
        canvasContext.fill();
      } else if (emoji) {
        canvasContext.font = "".concat(emojiSize, "px serif");
        canvasContext.save();
        canvasContext.translate(dpr * currentPosition.x, dpr * currentPosition.y);
        canvasContext.rotate(emojiRotationAngle);
        canvasContext.textAlign = 'center';
        canvasContext.fillText(emoji, 0, 0);
        canvasContext.restore();
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(iterationTimeDelta, currentTime) {
      var confettiSpeed = this.confettiSpeed,
        dragForceCoefficient = this.dragForceCoefficient,
        finalConfettiSpeedX = this.finalConfettiSpeedX,
        radiusYUpdateDirection = this.radiusYUpdateDirection,
        rotationSpeed = this.rotationSpeed,
        createdAt = this.createdAt;
      if (confettiSpeed.x > finalConfettiSpeedX) this.confettiSpeed.x -= dragForceCoefficient * iterationTimeDelta;
      var prevPositionY = this.currentPosition.y;
      var timeDeltaSinceCreation = currentTime - createdAt;
      this.currentPosition.y = this.initialPosition.y - confettiSpeed.y * this.cos * timeDeltaSinceCreation + FREE_FALLING_OBJECT_ACCELERATION * Math.pow(timeDeltaSinceCreation, 2) / 2;
      var positionUpdate = {
        x: confettiSpeed.x * this.sin * iterationTimeDelta,
        y: this.currentPosition.y - prevPositionY
      };
      this.currentPosition.x += positionUpdate.x;
      this.distanceTravelled.x += Math.abs(positionUpdate.x);
      this.distanceTravelled.y += Math.abs(positionUpdate.y);
      if (this.distanceTravelled.x >= Math.abs(this.positionOffset.x) && this.distanceTravelled.y >= Math.abs(this.positionOffset.y)) {
        this.isVisible = true;
      }
      this.rotationSpeed -= this.emoji ? 0.0001 : ROTATION_SLOWDOWN_ACCELERATION * iterationTimeDelta;
      if (this.rotationSpeed < 0) this.rotationSpeed = 0;
      // no need to update rotation radius for emoji
      if (this.emoji) {
        this.emojiRotationAngle += this.rotationSpeed * iterationTimeDelta % (2 * Math.PI);
        return;
      }
      if (radiusYUpdateDirection === 'down') {
        this.radius.y -= iterationTimeDelta * rotationSpeed;
        if (this.radius.y <= 0) {
          this.radius.y = 0;
          this.radiusYUpdateDirection = 'up';
        }
      } else {
        this.radius.y += iterationTimeDelta * rotationSpeed;
        if (this.radius.y >= this.initialRadius) {
          this.radius.y = this.initialRadius;
          this.radiusYUpdateDirection = 'down';
        }
      }
    }
  }, {
    key: "getIsVisibleOnCanvas",
    value: function getIsVisibleOnCanvas(canvasHeight) {
      return this.currentPosition.y < canvasHeight + SHAPE_VISIBILITY_TRESHOLD;
    }
  }]);
}();

function createCanvas() {
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1000';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  return canvas;
}

function normalizeConfettiConfig(confettiConfig) {
  var _confettiConfig$confe = confettiConfig.confettiRadius,
    confettiRadius = _confettiConfig$confe === void 0 ? INITIAL_SHAPE_RADIUS : _confettiConfig$confe,
    _confettiConfig$confe2 = confettiConfig.confettiNumber,
    confettiNumber = _confettiConfig$confe2 === void 0 ? confettiConfig.confettiesNumber || (confettiConfig.emojis ? DEFAULT_EMOJIS_NUMBER : DEFAULT_CONFETTI_NUMBER) : _confettiConfig$confe2,
    _confettiConfig$confe3 = confettiConfig.confettiColors,
    confettiColors = _confettiConfig$confe3 === void 0 ? DEFAULT_CONFETTI_COLORS : _confettiConfig$confe3,
    _confettiConfig$emoji = confettiConfig.emojis,
    emojis = _confettiConfig$emoji === void 0 ? confettiConfig.emojies || [] : _confettiConfig$emoji,
    _confettiConfig$emoji2 = confettiConfig.emojiSize,
    emojiSize = _confettiConfig$emoji2 === void 0 ? INITIAL_EMOJI_SIZE : _confettiConfig$emoji2,
    _confettiConfig$confe4 = confettiConfig.confettiDispatchPosition,
    confettiDispatchPosition = _confettiConfig$confe4 === void 0 ? null : _confettiConfig$confe4;
  // deprecate wrong plural forms, used in early releases
  if (confettiConfig.emojies) console.error("emojies argument is deprecated, please use emojis instead");
  if (confettiConfig.confettiesNumber) console.error("confettiesNumber argument is deprecated, please use confettiNumber instead");
  return {
    confettiRadius: confettiRadius,
    confettiNumber: confettiNumber,
    confettiColors: confettiColors,
    emojis: emojis,
    emojiSize: emojiSize,
    confettiDispatchPosition: confettiDispatchPosition
  };
}

function convertDegreesToRadians(degreesToRadians) {
  return degreesToRadians * Math.PI / 180;
}
/*
 * determine the angle at which confetti is being dispatched
 *
 * for confetti that are dispatched from the sides of the screen, there's a min and max angle at which they could fly
 * for confetti that are dispatched from the specific position (like mouse click), the angle ranges from -max to max
 *
 * the angle is stored in radians, but degrees are used in constants for convenience
 *
 * examples:
 * - 0 means that confetti would fly straight up
 * - 0.7 means that confetti would start flying approximately 40 degrees to the right
 */
function generateConfettiInitialFlightAngleFiredFromLeftSideOfTheScreen() {
  return convertDegreesToRadians(generateRandomNumber(MAX_CONFETTI_ANGLE_IN_DEGREES, MIN_CONFETTI_ANGLE_IN_DEGREES));
}
function generateConfettiInitialFlightAngleFiredFromRightSideOfTheScreen() {
  return convertDegreesToRadians(generateRandomNumber(-MIN_CONFETTI_ANGLE_IN_DEGREES, -MAX_CONFETTI_ANGLE_IN_DEGREES));
}
function generateConfettiInitialFlightAngleFiredFromSpecificPosition() {
  return convertDegreesToRadians(generateRandomNumber(-MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES, MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES));
}
/*
 * WHAT IS THIS?
 */
function generateConfettiRotationAngleFiredFromLeftSideOfTheScreen() {
  return generateRandomNumber(0, 0.2, 3);
}
function generateConfettiRotationAngleFiredFromRightSideOfTheScreen() {
  return generateRandomNumber(-0.2, 0, 3);
}

var ConfettiBatch = /*#__PURE__*/function () {
  function ConfettiBatch(canvasContext) {
    var _this = this;
    _classCallCheck(this, ConfettiBatch);
    this.canvasContext = canvasContext;
    this.shapes = [];
    this.promise = new Promise(function (completionCallback) {
      return _this.resolvePromise = completionCallback;
    });
  }
  return _createClass(ConfettiBatch, [{
    key: "getBatchCompletePromise",
    value: function getBatchCompletePromise() {
      return this.promise;
    }
  }, {
    key: "addShapes",
    value: function addShapes() {
      var _this$shapes;
      (_this$shapes = this.shapes).push.apply(_this$shapes, arguments);
    }
  }, {
    key: "complete",
    value: function complete() {
      var _a;
      if (this.shapes.length) {
        return false;
      }
      (_a = this.resolvePromise) === null || _a === void 0 ? void 0 : _a.call(this);
      return true;
    }
  }, {
    key: "processShapes",
    value: function processShapes(time, canvasHeight, cleanupInvisibleShapes) {
      var _this2 = this;
      var timeDelta = time.timeDelta,
        currentTime = time.currentTime;
      this.shapes = this.shapes.filter(function (shape) {
        // Render the shapes in this batch
        shape.updatePosition(timeDelta, currentTime);
        shape.draw(_this2.canvasContext);
        // Only cleanup the shapes if we're being asked to
        if (!cleanupInvisibleShapes) {
          return true;
        }
        return shape.getIsVisibleOnCanvas(canvasHeight);
      });
    }
  }]);
}();
var JSConfetti = /*#__PURE__*/function () {
  function JSConfetti() {
    var jsConfettiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, JSConfetti);
    this.activeConfettiBatches = [];
    this.canvas = jsConfettiConfig.canvas || createCanvas();
    this.canvasContext = this.canvas.getContext('2d');
    this.requestAnimationFrameRequested = false;
    this.lastUpdated = new Date().getTime();
    this.iterationIndex = 0;
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }
  return _createClass(JSConfetti, [{
    key: "loop",
    value: function loop() {
      this.requestAnimationFrameRequested = false;
      fixDPR(this.canvas);
      var currentTime = new Date().getTime();
      var timeDelta = currentTime - this.lastUpdated;
      var canvasHeight = this.canvas.offsetHeight;
      var cleanupInvisibleShapes = this.iterationIndex % 10 === 0;
      this.activeConfettiBatches = this.activeConfettiBatches.filter(function (batch) {
        batch.processShapes({
          timeDelta: timeDelta,
          currentTime: currentTime
        }, canvasHeight, cleanupInvisibleShapes);
        // Do not remove invisible shapes on every iteration
        if (!cleanupInvisibleShapes) {
          return true;
        }
        return !batch.complete();
      });
      this.iterationIndex++;
      this.queueAnimationFrameIfNeeded(currentTime);
    }
  }, {
    key: "queueAnimationFrameIfNeeded",
    value: function queueAnimationFrameIfNeeded(currentTime) {
      if (this.requestAnimationFrameRequested) {
        // We already have a pended animation frame, so there is no more work
        return;
      }
      if (this.activeConfettiBatches.length < 1) {
        // No shapes to animate, so don't queue another frame
        return;
      }
      this.requestAnimationFrameRequested = true;
      // Capture the last updated time for animation
      this.lastUpdated = currentTime || new Date().getTime();
      requestAnimationFrame(this.loop);
    }
  }, {
    key: "addConfettiAtPosition",
    value: function addConfettiAtPosition() {
      var confettiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _normalizeConfettiCon = normalizeConfettiConfig(confettiConfig),
        confettiRadius = _normalizeConfettiCon.confettiRadius,
        confettiNumber = _normalizeConfettiCon.confettiNumber,
        confettiColors = _normalizeConfettiCon.confettiColors,
        emojis = _normalizeConfettiCon.emojis,
        emojiSize = _normalizeConfettiCon.emojiSize,
        confettiDispatchPosition = _normalizeConfettiCon.confettiDispatchPosition;
      var _this$canvas$getBound = this.canvas.getBoundingClientRect(),
        canvasWidth = _this$canvas$getBound.width;
      var confettiGroup = new ConfettiBatch(this.canvasContext);
      for (var i = 0; i < confettiNumber; i++) {
        var confettiShape = new ConfettiShape({
          initialPosition: confettiDispatchPosition,
          confettiRadius: confettiRadius,
          confettiColors: confettiColors,
          confettiNumber: confettiNumber,
          emojis: emojis,
          emojiSize: emojiSize,
          canvasWidth: canvasWidth,
          rotationAngle: generateConfettiRotationAngleFiredFromLeftSideOfTheScreen(),
          initialFlightAngle: generateConfettiInitialFlightAngleFiredFromSpecificPosition(),
          shouldHideConfettiInShiftedPosition: true
        });
        confettiGroup.addShapes(confettiShape);
      }
      this.activeConfettiBatches.push(confettiGroup);
      this.queueAnimationFrameIfNeeded();
      return confettiGroup.getBatchCompletePromise();
    }
  }, {
    key: "addConfetti",
    value: function addConfetti() {
      var confettiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _normalizeConfettiCon2 = normalizeConfettiConfig(confettiConfig),
        confettiRadius = _normalizeConfettiCon2.confettiRadius,
        confettiNumber = _normalizeConfettiCon2.confettiNumber,
        confettiColors = _normalizeConfettiCon2.confettiColors,
        emojis = _normalizeConfettiCon2.emojis,
        emojiSize = _normalizeConfettiCon2.emojiSize;
      // Use the bounding rect rather tahn the canvas width / height, because
      // .width / .height are unset until a layout pass has been completed. Upon
      // confetti being immediately queued on a page load, this hasn't happened so
      // the default of 300x150 will be returned, causing an improper source point
      // for the confetti animation.
      var _this$canvas$getBound2 = this.canvas.getBoundingClientRect(),
        canvasWidth = _this$canvas$getBound2.width,
        canvasHeight = _this$canvas$getBound2.height;
      var yPosition = canvasHeight * 5 / 7;
      var leftConfettiPosition = {
        x: 0,
        y: yPosition
      };
      var rightConfettiPosition = {
        x: canvasWidth,
        y: yPosition
      };
      var confettiGroup = new ConfettiBatch(this.canvasContext);
      for (var i = 0; i < confettiNumber / 2; i++) {
        var confettiOnTheLeft = new ConfettiShape({
          initialPosition: leftConfettiPosition,
          confettiRadius: confettiRadius,
          confettiColors: confettiColors,
          confettiNumber: confettiNumber,
          emojis: emojis,
          emojiSize: emojiSize,
          canvasWidth: canvasWidth,
          rotationAngle: generateConfettiRotationAngleFiredFromLeftSideOfTheScreen(),
          initialFlightAngle: generateConfettiInitialFlightAngleFiredFromLeftSideOfTheScreen()
        });
        var confettiOnTheRight = new ConfettiShape({
          initialPosition: rightConfettiPosition,
          confettiRadius: confettiRadius,
          confettiColors: confettiColors,
          confettiNumber: confettiNumber,
          emojis: emojis,
          emojiSize: emojiSize,
          canvasWidth: canvasWidth,
          rotationAngle: generateConfettiRotationAngleFiredFromRightSideOfTheScreen(),
          initialFlightAngle: generateConfettiInitialFlightAngleFiredFromRightSideOfTheScreen()
        });
        confettiGroup.addShapes(confettiOnTheRight, confettiOnTheLeft);
      }
      this.activeConfettiBatches.push(confettiGroup);
      this.queueAnimationFrameIfNeeded();
      return confettiGroup.getBatchCompletePromise();
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      this.activeConfettiBatches = [];
    }
  }, {
    key: "destroyCanvas",
    value: function destroyCanvas() {
      this.canvas.remove();
    }
  }]);
}();




/***/ }),

/***/ "./shared.ts":
/*!*******************!*\
  !*** ./shared.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.params = params;
function params(params) {
  return new URLSearchParams(params).toString();
}

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ts/controller.ts":
/*!******************************!*\
  !*** ./src/ts/controller.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.updatePage = updatePage;
var shared_1 = __webpack_require__(/*! ../../shared */ "./shared.ts");
var Error_1 = __importDefault(__webpack_require__(/*! ./page/Error */ "./src/ts/page/Error.ts"));
var Home_1 = __importDefault(__webpack_require__(/*! ./page/Home */ "./src/ts/page/Home.ts"));
var Loading_1 = __importDefault(__webpack_require__(/*! ./page/Loading */ "./src/ts/page/Loading.ts"));
var Person_1 = __importDefault(__webpack_require__(/*! ./page/Person */ "./src/ts/page/Person.ts"));
var Directory_1 = __importDefault(__webpack_require__(/*! ./page/Directory */ "./src/ts/page/Directory.ts"));
var NOT_FOUND_CODE = 404;
var NOT_FOUND_MSG = 'We couldn\'t find that person. Please try searching for someone else or refine your search.';
function updatePage() {
  return _updatePage.apply(this, arguments);
}
function _updatePage() {
  _updatePage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _DATA;
    var _ref,
      transform,
      initial,
      url,
      name,
      res,
      info,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, transform = _ref.transform, initial = _ref.initial;
          // update url if asked to
          url = new URL(location.href);
          if (transform) {
            transform(url);
            history.pushState({}, '', url);
          }
          // /directory/
          if (!(url.pathname.startsWith('/directory/') && ((_DATA = DATA) === null || _DATA === void 0 ? void 0 : _DATA.result) != 'not-found')) {
            _context.n = 1;
            break;
          }
          (0, Directory_1["default"])();
          return _context.a(2);
        case 1:
          if (!(url.pathname == '/')) {
            _context.n = 2;
            break;
          }
          document.title = 'Are They Dead?';
          (0, Home_1["default"])();
          return _context.a(2);
        case 2:
          if (!(initial && DATA)) {
            _context.n = 5;
            break;
          }
          if (!(DATA.result == 'not-found')) {
            _context.n = 3;
            break;
          }
          (0, Error_1["default"])(NOT_FOUND_CODE, NOT_FOUND_MSG);
          return _context.a(2);
        case 3:
          if (!(DATA.result == 'person')) {
            _context.n = 4;
            break;
          }
          (0, Person_1["default"])({
            person: DATA.person,
            image: DATA.image,
            isEvil: DATA.isEvil
          });
          return _context.a(2);
        case 4:
          throw new Error('Unexpected data!');
        case 5:
          // [person]
          document.title = 'Are They Dead?';
          (0, Loading_1["default"])();
          // request data
          name = decodeURIComponent(location.pathname.substring(1));
          _context.n = 6;
          return fetch("/api/person?".concat((0, shared_1.params)({
            name: name
          })));
        case 6:
          res = _context.v;
          if (res.ok) {
            _context.n = 7;
            break;
          }
          (0, Error_1["default"])(res.status, 'An error occured! Sorry about that.');
          return _context.a(2);
        case 7:
          _context.n = 8;
          return res.json();
        case 8:
          info = _context.v;
          if (!(info.result == 'not-found')) {
            _context.n = 9;
            break;
          }
          document.title = 'Not Found · Are They Dead?';
          (0, Error_1["default"])(NOT_FOUND_CODE, NOT_FOUND_MSG);
          return _context.a(2);
        case 9:
          document.title = "Is ".concat(info.person.name, " Dead?");
          (0, Person_1["default"])({
            person: info.person,
            image: info.image,
            isEvil: info.isEvil,
            death: info.death
          });
        case 10:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _updatePage.apply(this, arguments);
}

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var controller_1 = __webpack_require__(/*! ./controller */ "./src/ts/controller.ts");
(0, controller_1.updatePage)({
  initial: true
});

/***/ }),

/***/ "./src/ts/page/Directory.ts":
/*!**********************************!*\
  !*** ./src/ts/page/Directory.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var Footer_1 = __importDefault(__webpack_require__(/*! ../ui/Footer */ "./src/ts/ui/Footer.ts"));
var Header_1 = __importDefault(__webpack_require__(/*! ../ui/Header */ "./src/ts/ui/Header.ts"));
var elements_1 = __webpack_require__(/*! ../util/elements */ "./src/ts/util/elements.ts");
function default_1() {
  var html = elements_1.$root.innerHTML;
  elements_1.$root.innerHTML = '';
  elements_1.$root.className = 'directory';
  elements_1.$root.appendChild((0, Header_1["default"])());
  var $main = document.createElement('main');
  $main.innerHTML = html;
  elements_1.$root.appendChild($main);
  elements_1.$root.appendChild((0, Footer_1["default"])());
}

/***/ }),

/***/ "./src/ts/page/Error.ts":
/*!******************************!*\
  !*** ./src/ts/page/Error.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var Footer_1 = __importDefault(__webpack_require__(/*! ../ui/Footer */ "./src/ts/ui/Footer.ts"));
var Header_1 = __importDefault(__webpack_require__(/*! ../ui/Header */ "./src/ts/ui/Header.ts"));
var Search_1 = __importDefault(__webpack_require__(/*! ../ui/Search */ "./src/ts/ui/Search.ts"));
var elements_1 = __webpack_require__(/*! ../util/elements */ "./src/ts/util/elements.ts");
function default_1(code, message) {
  elements_1.$root.innerHTML = '';
  elements_1.$root.className = 'error';
  elements_1.$root.appendChild((0, Header_1["default"])());
  var $main = document.createElement('main');
  var $code = document.createElement('h1');
  $code.textContent = code.toString();
  $main.appendChild($code);
  var $message = document.createElement('p');
  $message.textContent = message;
  $main.appendChild($message);
  $main.appendChild((0, Search_1["default"])());
  elements_1.$root.appendChild($main);
  elements_1.$root.appendChild((0, Footer_1["default"])());
}

/***/ }),

/***/ "./src/ts/page/Home.ts":
/*!*****************************!*\
  !*** ./src/ts/page/Home.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var Footer_1 = __importDefault(__webpack_require__(/*! ../ui/Footer */ "./src/ts/ui/Footer.ts"));
var Search_1 = __importDefault(__webpack_require__(/*! ../ui/Search */ "./src/ts/ui/Search.ts"));
var elements_1 = __webpack_require__(/*! ../util/elements */ "./src/ts/util/elements.ts");
function default_1(title) {
  elements_1.$root.innerHTML = '';
  elements_1.$root.className = 'home';
  var $main = document.createElement('main');
  var $icon = new Image();
  $icon.src = '/img/icon.svg';
  $icon.alt = 'Grave';
  $main.appendChild($icon);
  var $title = document.createElement('h1');
  $title.textContent = title !== null && title !== void 0 ? title : 'Are They Dead?';
  $main.appendChild($title);
  var $subtitle = document.createElement('p');
  $subtitle.textContent = 'Find out instantly if someone is alive or dead. Updated in real time.';
  $main.appendChild($subtitle);
  $main.appendChild((0, Search_1["default"])());
  elements_1.$root.appendChild($main);
  elements_1.$root.appendChild((0, Footer_1["default"])());
}

/***/ }),

/***/ "./src/ts/page/Loading.ts":
/*!********************************!*\
  !*** ./src/ts/page/Loading.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var Footer_1 = __importDefault(__webpack_require__(/*! ../ui/Footer */ "./src/ts/ui/Footer.ts"));
var Header_1 = __importDefault(__webpack_require__(/*! ../ui/Header */ "./src/ts/ui/Header.ts"));
var elements_1 = __webpack_require__(/*! ../util/elements */ "./src/ts/util/elements.ts");
function default_1() {
  elements_1.$root.innerHTML = '';
  elements_1.$root.className = 'loading';
  elements_1.$root.appendChild((0, Header_1["default"])());
  var $main = document.createElement('main');
  var $icon = document.createElement('div');
  $icon.className = 'icon';
  $main.appendChild($icon);
  elements_1.$root.appendChild($main);
  elements_1.$root.appendChild((0, Footer_1["default"])());
}

/***/ }),

/***/ "./src/ts/page/Person.ts":
/*!*******************************!*\
  !*** ./src/ts/page/Person.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var shared_1 = __webpack_require__(/*! ../../../shared */ "./shared.ts");
var Footer_1 = __importDefault(__webpack_require__(/*! ../ui/Footer */ "./src/ts/ui/Footer.ts"));
var Header_1 = __importDefault(__webpack_require__(/*! ../ui/Header */ "./src/ts/ui/Header.ts"));
var confetti_1 = __webpack_require__(/*! ../util/confetti */ "./src/ts/util/confetti.ts");
var elements_1 = __webpack_require__(/*! ../util/elements */ "./src/ts/util/elements.ts");
function status(name, death, isEvil) {
  return isEvil ? death.died ? "".concat(name, " is dead!") : "Unfortunately, ".concat(name, " is still alive.") : death.died ? "".concat(name, " has passed away.") : "".concat(name, " is still alive.");
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}
function details(death) {
  var _death$cause;
  if (!death.died) return '';
  var res = '';
  if (death.date) res += " on ".concat(formatDate(death.date));
  if (death.place) res += " in ".concat(death.place);
  if (death.cause && death.manner) res += " by ".concat(death.cause, " (").concat(death.manner, ")");else if (death.cause || death.manner) res += " by ".concat((_death$cause = death.cause) !== null && _death$cause !== void 0 ? _death$cause : death.manner);
  if (!res) return '';
  return "Died ".concat(res, ".");
}
function default_1(_ref) {
  var person = _ref.person,
    image = _ref.image,
    death = _ref.death,
    isEvil = _ref.isEvil;
  elements_1.$root.innerHTML = '';
  elements_1.$root.className = 'person';
  elements_1.$root.appendChild((0, Header_1["default"])({
    title: "Is ".concat(person.name, " Dead?")
  }));
  var $main = document.createElement('main');
  $main.className = 'loading';
  var $status = document.createElement('h1');
  $status.textContent = '\xa0';
  $main.appendChild($status);
  var $details = document.createElement('p');
  $details.className = 'details';
  $details.textContent = '\xa0';
  $main.appendChild($details);
  var $img;
  if (image) {
    $img = new Image();
    $img.src = image;
    $main.appendChild($img);
  }
  var $about = document.createElement('div');
  $about.className = 'about';
  var $name = document.createElement('h3');
  $name.textContent = person.name;
  $about.appendChild($name);
  var $description = document.createElement('p');
  $description.textContent = person.description;
  $about.appendChild($description);
  $main.appendChild($about);
  elements_1.$root.appendChild($main);
  elements_1.$root.appendChild((0, Footer_1["default"])());
  function render(death) {
    // update status
    $status.textContent = status(person.name, death, isEvil);
    $details.textContent = details(death);
    // update image
    if ($img) $img.classList.toggle('bw', death.died);
    // evil confetti
    if (isEvil && death.died) {
      confetti_1.confetti.addConfetti({
        confettiColors: ['#ff383c', '#ff8d28', '#ffcc00', '#34c759', '#00c8b3', '#00c3d0', '#00c0e8', '#0088ff', '#6155f5', '#cb30e0', '#ff2d55']
      });
    }
    $main.classList.remove('loading');
  }
  if (death) render(death);
  function refresh() {
    return _refresh.apply(this, arguments);
  }
  function _refresh() {
    _refresh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var res, _death, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            $main.classList.add('loading');
            _context.n = 1;
            return fetch("/api/death?".concat((0, shared_1.params)({
              id: person.id
            })));
          case 1:
            res = _context.v;
            _context.n = 2;
            return res.json();
          case 2:
            _death = _context.v;
            if (!_death) {
              _context.n = 3;
              break;
            }
            render(_death);
            _context.n = 4;
            break;
          case 3:
            throw new Error('No death info given.');
          case 4:
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            $status.textContent = 'An error occurred.';
            $details.textContent = '';
            $main.classList.remove('loading');
            console.error(_t);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 5]]);
    }));
    return _refresh.apply(this, arguments);
  }
  if (!death) refresh();
}

/***/ }),

/***/ "./src/ts/ui/Footer.ts":
/*!*****************************!*\
  !*** ./src/ts/ui/Footer.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var html = document.querySelector('noscript').innerHTML.match(/<footer>([^]*)<\/footer>/)[1];
function default_1() {
  var $footer = document.createElement('footer');
  $footer.innerHTML = html;
  return $footer;
}

/***/ }),

/***/ "./src/ts/ui/Header.ts":
/*!*****************************!*\
  !*** ./src/ts/ui/Header.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var controller_1 = __webpack_require__(/*! ../controller */ "./src/ts/controller.ts");
var Search_1 = __importDefault(__webpack_require__(/*! ./Search */ "./src/ts/ui/Search.ts"));
function default_1(options) {
  var _options$title;
  var $header = document.createElement('header');
  var $home = document.createElement('a');
  $home.href = '/';
  $home.addEventListener('click', function (e) {
    e.preventDefault();
    (0, controller_1.updatePage)({
      transform: function transform(url) {
        return url.pathname = '/';
      }
    });
  });
  var $icon = new Image();
  $icon.src = '/img/icon.svg';
  $icon.alt = 'Grave';
  $home.appendChild($icon);
  $home.appendChild(document.createTextNode((_options$title = options === null || options === void 0 ? void 0 : options.title) !== null && _options$title !== void 0 ? _options$title : 'Are They Dead?'));
  $header.appendChild($home);
  $header.appendChild((0, Search_1["default"])(options === null || options === void 0 ? void 0 : options.search));
  return $header;
}

/***/ }),

/***/ "./src/ts/ui/Search.ts":
/*!*****************************!*\
  !*** ./src/ts/ui/Search.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = default_1;
var controller_1 = __webpack_require__(/*! ../controller */ "./src/ts/controller.ts");
function default_1(value) {
  var $search = document.createElement('div');
  $search.className = 'search';
  function search() {
    var query = $input.value.trim();
    if (!query) return;
    (0, controller_1.updatePage)({
      transform: function transform(url) {
        return url.pathname = "/".concat(encodeURIComponent(query));
      }
    });
  }
  var $input = document.createElement('input');
  $input.placeholder = 'Search for someone...';
  $input.addEventListener('keydown', function (e) {
    return e.key == 'Enter' && search();
  });
  if (value) $input.value = value;
  $search.appendChild($input);
  var $button = document.createElement('button');
  $button.textContent = 'Check';
  $button.addEventListener('click', function () {
    return search();
  });
  $search.appendChild($button);
  return $search;
}

/***/ }),

/***/ "./src/ts/util/confetti.ts":
/*!*********************************!*\
  !*** ./src/ts/util/confetti.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.confetti = void 0;
var js_confetti_1 = __importDefault(__webpack_require__(/*! js-confetti */ "./node_modules/js-confetti/dist/es/index.js"));
exports.confetti = new js_confetti_1["default"]();

/***/ }),

/***/ "./src/ts/util/elements.ts":
/*!*********************************!*\
  !*** ./src/ts/util/elements.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.$root = void 0;
exports.$root = document.querySelector('#root');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/script": 0,
/******/ 			"style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/ts/main.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style"], () => (__webpack_require__("./src/scss/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;