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

/***/ "./components/Login/index.jsx":
/*!************************************!*\
  !*** ./components/Login/index.jsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.jsx */ \"./components/Login/style.jsx\");\n/* harmony import */ var qrcode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode */ \"./node_modules/qrcode/lib/browser.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst index = ()=>{\n    _s();\n    const [qrCodeUrl, setQRCodeUrl] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(\"\");\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{\n        qrcode__WEBPACK_IMPORTED_MODULE_3__.toDataURL(\"http://192.168.31.69/#\").then((url)=>{\n            setQRCodeUrl(url);\n        }).catch((error)=>{});\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style_jsx__WEBPACK_IMPORTED_MODULE_2__.Wrap, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"body\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                src: qrCodeUrl,\n                width: 200,\n                height: 200,\n                alt: \"qr\"\n            }, void 0, false, {\n                fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Login/index.jsx\",\n                lineNumber: 18,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Login/index.jsx\",\n            lineNumber: 17,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/mnt/mydisk/teamup/teamup/new/frontend/components/Login/index.jsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n_s(index, \"25+qrBwHYX4rvHNzyEsQloo4cGU=\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (index);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xvZ2luL2luZGV4LmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwQjtBQUNTO0FBQ1A7QUFDRztBQUMvQixNQUFNSSxRQUFROztJQUNaLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHTixxREFBYyxDQUFDO0lBQ2pEQSxzREFBZSxDQUFDO1FBQ2RFLDZDQUFnQixDQUFDLDBCQUNkUSxJQUFJLENBQUMsQ0FBQ0M7WUFDTEwsYUFBYUs7UUFDZixHQUNDQyxLQUFLLENBQUMsQ0FBQ0MsU0FBVztJQUN2QixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ1osNENBQUlBO2tCQUNILDRFQUFDYTtZQUFJQyxXQUFVO3NCQUNiLDRFQUFDWixtREFBS0E7Z0JBQUNhLEtBQUtYO2dCQUFXWSxPQUFPO2dCQUFLQyxRQUFRO2dCQUFLQyxLQUFJOzs7Ozs7Ozs7Ozs7Ozs7O0FBSTVEO0dBakJNZjtBQW1CTiwrREFBZUEsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0xvZ2luL2luZGV4LmpzeD85Njc0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFdyYXAgfSBmcm9tIFwiLi9zdHlsZS5qc3hcIjtcbmltcG9ydCBRUkNvZGUgZnJvbSBcInFyY29kZVwiO1xuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5jb25zdCBpbmRleCA9ICgpID0+IHtcbiAgY29uc3QgW3FyQ29kZVVybCwgc2V0UVJDb2RlVXJsXSA9IFJlYWN0LnVzZVN0YXRlKFwiXCIpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIFFSQ29kZS50b0RhdGFVUkwoXCJodHRwOi8vMTkyLjE2OC4zMS42OS8jXCIpXG4gICAgICAudGhlbigodXJsKSA9PiB7XG4gICAgICAgIHNldFFSQ29kZVVybCh1cmwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPFdyYXA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgPEltYWdlIHNyYz17cXJDb2RlVXJsfSB3aWR0aD17MjAwfSBoZWlnaHQ9ezIwMH0gYWx0PVwicXJcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9XcmFwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJXcmFwIiwiUVJDb2RlIiwiSW1hZ2UiLCJpbmRleCIsInFyQ29kZVVybCIsInNldFFSQ29kZVVybCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidG9EYXRhVVJMIiwidGhlbiIsInVybCIsImNhdGNoIiwiZXJyb3IiLCJkaXYiLCJjbGFzc05hbWUiLCJzcmMiLCJ3aWR0aCIsImhlaWdodCIsImFsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Login/index.jsx\n"));

/***/ })

});