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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.App = void 0;\nconst React = __webpack_require__(/*! react */ \"react\");\nconst demo_component_1 = __webpack_require__(/*! ./demo_component */ \"./src/demo_component.tsx\");\nexports.App = () => {\n    return (React.createElement(\"div\", { className: \"container\" },\n        React.createElement(demo_component_1.default, null)));\n};\n\n\n//# sourceURL=webpack:///./src/app.tsx?");

/***/ }),

/***/ "./src/demo_component.tsx":
/*!********************************!*\
  !*** ./src/demo_component.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"react\");\nconst getMouseXPosInBoundingRect = event => event.clientX - event.currentTarget.getBoundingClientRect().left;\nconst ContentItemGenerator = ({ str }) => (React.createElement(\"div\", { className: \"content-item\" }, str));\nconst DemoComponent = () => {\n    const [mouseDownVal, setMouseDownVal] = React.useState();\n    const [mouseDownOnSlider, setMouseDownOnSlider] = React.useState(false);\n    const [contentScrollLeft, setContentScrollLeft] = React.useState(0);\n    const contentWidth = 1100; // this should be calculated from the individual content widths or retrieved from the width of the rendered content wrapper.\n    const contentViewWidth = 870; // may be set or retrieved from the rendered component\n    const sliderTrackLength = 900; // may be set or retrieved from the rendered component\n    const viewToWidthRatio = contentViewWidth / contentWidth;\n    const totalOverflow = contentWidth - contentViewWidth;\n    const sliderLength = sliderTrackLength * viewToWidthRatio; // width of slider to width of total bar is a ratio proportional to the ratio of the visible portion of the content bar over the entire width of the content bar\n    const maxSlideableDist = sliderTrackLength - sliderLength;\n    const halfSliderLength = sliderLength / 2;\n    const maxSliderVal = sliderTrackLength - halfSliderLength;\n    const adjSliderRange = maxSliderVal - halfSliderLength;\n    const sliderRangeToOverflow = adjSliderRange / totalOverflow;\n    const fractionScrolled = contentScrollLeft < totalOverflow ? contentScrollLeft / totalOverflow : 1;\n    const sliderPosition = Math.max(0, (fractionScrolled * maxSlideableDist)); // position of the scroll bar in its parent container is proportional to the position of the viewed portion of the content strip over the entire width of the content strip\n    const transformSliderBarVal = (num) => ((num <= halfSliderLength ? halfSliderLength : num >= maxSliderVal ? maxSliderVal : num) - halfSliderLength) / sliderRangeToOverflow;\n    const contentArr = [\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\",\n        \"Content\"\n    ];\n    return (React.createElement(React.Fragment, null,\n        React.createElement(\"h1\", null, \"Demo Fakebar\"),\n        React.createElement(\"br\", null),\n        React.createElement(\"br\", null),\n        React.createElement(\"br\", null),\n        React.createElement(\"br\", null),\n        React.createElement(\"h4\", null, \"Content container\"),\n        React.createElement(\"div\", { className: \"content-view-container\", onWheel: (e) => setContentScrollLeft(Math.max(0, Math.min(totalOverflow, contentScrollLeft + e.deltaX))), onMouseDown: (e) => setMouseDownVal(getMouseXPosInBoundingRect(e) + contentScrollLeft), onMouseUp: (e) => setMouseDownVal(undefined), onMouseMove: (e) => {\n                if (mouseDownVal >= 0) {\n                    const newLeftVal = Math.min(totalOverflow, mouseDownVal - getMouseXPosInBoundingRect(e));\n                    setContentScrollLeft(Math.max(0, newLeftVal));\n                }\n            }, style: { width: contentViewWidth } },\n            React.createElement(\"div\", { className: \"content-wrapper\" /* Content Wrapper */, style: {\n                    width: contentWidth,\n                    left: -contentScrollLeft\n                } }, contentArr.map((x, i) => React.createElement(ContentItemGenerator, { key: i, str: x })))),\n        React.createElement(\"h4\", null, \"fake scrollbar slider\"),\n        React.createElement(\"div\", { className: \"slider-track\", onMouseDown: (e) => {\n                setMouseDownOnSlider(true);\n                // set content scroll left such that the slider's midpoint will be where the user clicked, if possible\n                // the only time val will be something besides the min or max will be when the slider midpoint is able to where the user clicked.\n                // which means the mid point (i.e., the clicked point) should be on [sliderLength / 2, tracklength - (sliderlength / 2)]\n                setContentScrollLeft(transformSliderBarVal(getMouseXPosInBoundingRect(e)));\n            }, onMouseUp: (e) => setMouseDownOnSlider(false), onMouseMove: (e) => {\n                if (mouseDownOnSlider) {\n                    setContentScrollLeft(transformSliderBarVal(getMouseXPosInBoundingRect(e)));\n                }\n            }, style: {\n                width: sliderTrackLength\n            } },\n            React.createElement(\"div\", { className: \"slider\", style: {\n                    width: sliderLength,\n                    left: sliderPosition\n                } }))));\n};\nexports.default = DemoComponent;\n\n\n//# sourceURL=webpack:///./src/demo_component.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"react\");\nconst ReactDOM = __webpack_require__(/*! react-dom */ \"react-dom\");\nconst app_1 = __webpack_require__(/*! ./app */ \"./src/app.tsx\");\nReactDOM.render(React.createElement(app_1.App, null), document.getElementById(\"app\"));\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/stevelong/git/fakebar/src/index.tsx */\"./src/index.tsx\");\n\n\n//# sourceURL=webpack:///multi_./src/index.tsx?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });