"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/Kefu/index.jsx":
/*!***********************************!*\
  !*** ./components/Kefu/index.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.jsx */ \"./components/Kefu/style.jsx\");\n/* harmony import */ var _assets_icon_kefu_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/icon/kefu.png */ \"./assets/icon/kefu.png\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst index = ()=>{\n    _s();\n    const [message, setMessage] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({\n        openBox: true\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: message.openBox ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style_jsx__WEBPACK_IMPORTED_MODULE_2__.Message, {\n            children: \"1\"\n        }, void 0, false, {\n            fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Kefu/index.jsx\",\n            lineNumber: 13,\n            columnNumber: 9\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style_jsx__WEBPACK_IMPORTED_MODULE_2__.Wrap, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                src: _assets_icon_kefu_png__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n                width: 20,\n                height: 20\n            }, void 0, false, {\n                fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Kefu/index.jsx\",\n                lineNumber: 16,\n                columnNumber: 11\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Kefu/index.jsx\",\n            lineNumber: 15,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false);\n};\n_s(index, \"/Wyy8ntkrQBQYaEXFyeUWKTYQAw=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (index);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0tlZnUvaW5kZXguanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ2tCO0FBQ007QUFDbkI7QUFDL0IsTUFBTUssUUFBUTs7SUFDWixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR1AscURBQWMsQ0FBQztRQUMzQ1MsU0FBUztJQUNYO0lBRUEscUJBQ0U7a0JBQ0dILFFBQVFHLE9BQU8saUJBQ2QsOERBQUNQLCtDQUFPQTtzQkFBQzs7Ozs7c0NBRVQsOERBQUNELDRDQUFJQTtzQkFDSCw0RUFBQ0csbURBQUtBO2dCQUFDTSxLQUFLUCw2REFBUUE7Z0JBQUVRLE9BQU87Z0JBQUlDLFFBQVE7Ozs7Ozs7Ozs7OztBQUtuRDtHQWhCTVA7QUFrQk4sK0RBQWVBLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9LZWZ1L2luZGV4LmpzeD9lMjczIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdyYXAsIE1lc3NhZ2UgfSBmcm9tIFwiLi9zdHlsZS5qc3hcIjtcbmltcG9ydCBLZWZ1SWNvbiBmcm9tIFwiLi4vLi4vYXNzZXRzL2ljb24va2VmdS5wbmdcIjtcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuY29uc3QgaW5kZXggPSAoKSA9PiB7XG4gIGNvbnN0IFttZXNzYWdlLCBzZXRNZXNzYWdlXSA9IFJlYWN0LnVzZVN0YXRlKHtcbiAgICBvcGVuQm94OiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7bWVzc2FnZS5vcGVuQm94ID8gKFxuICAgICAgICA8TWVzc2FnZT4xPC9NZXNzYWdlPlxuICAgICAgKSA6IChcbiAgICAgICAgPFdyYXA+XG4gICAgICAgICAgPEltYWdlIHNyYz17S2VmdUljb259IHdpZHRoPXsyMH0gaGVpZ2h0PXsyMH0gLz5cbiAgICAgICAgPC9XcmFwPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiV3JhcCIsIk1lc3NhZ2UiLCJLZWZ1SWNvbiIsIkltYWdlIiwiaW5kZXgiLCJtZXNzYWdlIiwic2V0TWVzc2FnZSIsInVzZVN0YXRlIiwib3BlbkJveCIsInNyYyIsIndpZHRoIiwiaGVpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Kefu/index.jsx\n"));

/***/ })

});