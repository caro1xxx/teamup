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

/***/ "./components/Commodity/style.jsx":
/*!****************************************!*\
  !*** ./components/Commodity/style.jsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToFowrad: function() { return /* binding */ ToFowrad; },\n/* harmony export */   Wrap: function() { return /* binding */ Wrap; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: relative;\\n  margin: 30px 0px;\\n  .body {\\n    overflow-x: scroll;\\n    width: 1200px;\\n    white-space: nowrap; /* 防止内容换行 */\\n    scrollbar-width: none;\\n    .item {\\n      display: inline-block;\\n      width: 220px;\\n      padding: 20px;\\n      border-radius: 10px;\\n      .top {\\n        display: flex;\\n      }\\n      .logo {\\n        width: 20px;\\n        height: 20px;\\n      }\\n      .price {\\n        font-size: 30px;\\n        font-weight: bolder;\\n        margin: 10px 0px;\\n      }\\n      .choose {\\n        cursor: pointer;\\n        user-select: none;\\n        color: white;\\n        height: 30px;\\n        text-align: center;\\n        line-height: 30px;\\n        border-radius: 5px;\\n        background: linear-gradient(to right, #eb3329, #962626);\\n      }\\n      .feature {\\n        cursor: pointer;\\n        user-select: none;\\n        margin: 10px 0px;\\n        > div {\\n          margin-bottom: 5px;\\n        }\\n        .support {\\n          color: #eb3329;\\n          font-weight: bolder;\\n          background-image: linear-gradient(\\n            to right,\\n            #eb3329,\\n            #962626\\n          ); /* 渐变颜色设置 */\\n          -webkit-background-clip: text; /* 将文字作为背景图像剪切 */\\n          color: transparent; /* 隐藏文字本身的颜色 */\\n        }\\n        .nosupport {\\n          color: #838383;\\n          font-weight: bolder;\\n        }\\n      }\\n    }\\n    .item:hover {\\n      background-color: #e8e8e8c5;\\n    }\\n  }\\n  .body::-webkit-scrollbar {\\n    width: 0.5rem; /* 设置滚动条宽度，可以根据需要调整 */\\n  }\\n  /* 隐藏滚动条滑块 */\\n  .body::-webkit-scrollbar-thumb {\\n    background: transparent;\\n  }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject1() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: absolute;\\n  right: \",\n        \";\\n  left: \",\n        \";\\n  bottom: 20px;\\n  display: inline-flex;\\n  vertical-align: top;\\n  justify-content: center;\\n  align-items: center;\\n  top: 0px;\\n  cursor: pointer;\\n  user-select: none;\\n  animation: \",\n        \";\\n  @keyframes moveRight {\\n    from {\\n      right: -30px;\\n    }\\n    to {\\n      right: -40px;\\n    }\\n  }\\n\\n  @keyframes moveLeft {\\n    from {\\n      left: -30px;\\n    }\\n    to {\\n      left: -40px;\\n    }\\n  }\\n\"\n    ]);\n    _templateObject1 = function() {\n        return data;\n    };\n    return data;\n}\n\nconst Wrap = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject());\nconst ToFowrad = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject1(), (props)=>props.$orientations === 1 ? \"-30px\" : \"\", (props)=>props.$orientations === 0 ? \"-30px\" : \"\", (props)=>props.$orientations === 1 ? \"-infinite 0.8s moveRight\" : \"infinite 0.8s moveLeft\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFFaEMsTUFBTUMsT0FBT0QsNkRBQVUsb0JBc0U1QjtBQUVLLE1BQU1HLFdBQVdILDZEQUFVLHFCQUV2QixDQUFDSSxRQUFXQSxNQUFNQyxhQUFhLEtBQUssSUFBSSxVQUFVLElBQ25ELENBQUNELFFBQVdBLE1BQU1DLGFBQWEsS0FBSyxJQUFJLFVBQVUsSUFTN0MsQ0FBQ0QsUUFDWkEsTUFBTUMsYUFBYSxLQUFLLElBQ3BCLDZCQUNBLDBCQWtCTiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3g/NWQ0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuXG5leHBvcnQgY29uc3QgV3JhcCA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAzMHB4IDBweDtcbiAgLmJvZHkge1xuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgICB3aWR0aDogMTIwMHB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IC8qIOmYsuatouWGheWuueaNouihjCAqL1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICAuaXRlbSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogMjIwcHg7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIC50b3Age1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgLmxvZ28ge1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgfVxuICAgICAgLnByaWNlIHtcbiAgICAgICAgZm9udC1zaXplOiAzMHB4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZGVyO1xuICAgICAgICBtYXJnaW46IDEwcHggMHB4O1xuICAgICAgfVxuICAgICAgLmNob29zZSB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ViMzMyOSwgIzk2MjYyNik7XG4gICAgICB9XG4gICAgICAuZmVhdHVyZSB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIG1hcmdpbjogMTBweCAwcHg7XG4gICAgICAgID4gZGl2IHtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnN1cHBvcnQge1xuICAgICAgICAgIGNvbG9yOiAjZWIzMzI5O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgICAgdG8gcmlnaHQsXG4gICAgICAgICAgICAjZWIzMzI5LFxuICAgICAgICAgICAgIzk2MjYyNlxuICAgICAgICAgICk7IC8qIOa4kOWPmOminOiJsuiuvue9riAqL1xuICAgICAgICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0OyAvKiDlsIbmloflrZfkvZzkuLrog4zmma/lm77lg4/liarliIcgKi9cbiAgICAgICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7IC8qIOmakOiXj+aWh+Wtl+acrOi6q+eahOminOiJsiAqL1xuICAgICAgICB9XG4gICAgICAgIC5ub3N1cHBvcnQge1xuICAgICAgICAgIGNvbG9yOiAjODM4MzgzO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLml0ZW06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlOGM1O1xuICAgIH1cbiAgfVxuICAuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiAwLjVyZW07IC8qIOiuvue9rua7muWKqOadoeWuveW6pu+8jOWPr+S7peagueaNrumcgOimgeiwg+aVtCAqL1xuICB9XG4gIC8qIOmakOiXj+a7muWKqOadoea7keWdlyAqL1xuICAuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVG9Gb3dyYWQgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAkeyhwcm9wcykgPT4gKHByb3BzLiRvcmllbnRhdGlvbnMgPT09IDEgPyBcIi0zMHB4XCIgOiBcIlwiKX07XG4gIGxlZnQ6ICR7KHByb3BzKSA9PiAocHJvcHMuJG9yaWVudGF0aW9ucyA9PT0gMCA/IFwiLTMwcHhcIiA6IFwiXCIpfTtcbiAgYm90dG9tOiAyMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRvcDogMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBhbmltYXRpb246ICR7KHByb3BzKSA9PlxuICAgIHByb3BzLiRvcmllbnRhdGlvbnMgPT09IDFcbiAgICAgID8gXCItaW5maW5pdGUgMC44cyBtb3ZlUmlnaHRcIlxuICAgICAgOiBcImluZmluaXRlIDAuOHMgbW92ZUxlZnRcIn07XG4gIEBrZXlmcmFtZXMgbW92ZVJpZ2h0IHtcbiAgICBmcm9tIHtcbiAgICAgIHJpZ2h0OiAtMzBweDtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgcmlnaHQ6IC00MHB4O1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgbW92ZUxlZnQge1xuICAgIGZyb20ge1xuICAgICAgbGVmdDogLTMwcHg7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIGxlZnQ6IC00MHB4O1xuICAgIH1cbiAgfVxuYDtcbiJdLCJuYW1lcyI6WyJzdHlsZWQiLCJXcmFwIiwiZGl2IiwiVG9Gb3dyYWQiLCJwcm9wcyIsIiRvcmllbnRhdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Commodity/style.jsx\n"));

/***/ })

});