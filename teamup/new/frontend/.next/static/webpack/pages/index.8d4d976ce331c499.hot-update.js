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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToFowrad: function() { return /* binding */ ToFowrad; },\n/* harmony export */   Wrap: function() { return /* binding */ Wrap; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: relative;\\n  margin: 30px 0px;\\n  .body {\\n    overflow-x: scroll;\\n    width: 1200px;\\n    white-space: nowrap; /* 防止内容换行 */\\n    scrollbar-width: none;\\n    .title {\\n      display: inline-flex;\\n      vertical-align: top;\\n      justify-content: center;\\n      align-items: center;\\n\\n      margin-bottom: 20px;\\n      background-image: linear-gradient(\\n        to right,\\n        #eb3329,\\n        #962626\\n      ); /* 渐变颜色设置 */\\n      -webkit-background-clip: text; /* 将文字作为背景图像剪切 */\\n      color: transparent; /* 隐藏文字本身的颜色 */\\n      cursor: pointer;\\n      user-select: none;\\n    }\\n    .item {\\n      display: inline-block;\\n      width: 220px;\\n      padding: 20px;\\n      border-radius: 10px;\\n      .top {\\n        display: flex;\\n      }\\n      .logo {\\n        width: 20px;\\n        height: 20px;\\n      }\\n      .price {\\n        font-size: 30px;\\n        font-weight: bolder;\\n        margin: 10px 0px;\\n      }\\n      .choose {\\n        cursor: pointer;\\n        user-select: none;\\n        color: white;\\n        height: 30px;\\n        text-align: center;\\n        line-height: 30px;\\n        border-radius: 5px;\\n        background: linear-gradient(to right, #eb3329, #962626);\\n      }\\n      .feature {\\n        cursor: pointer;\\n        user-select: none;\\n        margin: 10px 0px;\\n        > div {\\n          margin-bottom: 5px;\\n        }\\n        .support {\\n          color: #eb3329;\\n          font-weight: bolder;\\n          background-image: linear-gradient(\\n            to right,\\n            #eb3329,\\n            #962626\\n          ); /* 渐变颜色设置 */\\n          -webkit-background-clip: text; /* 将文字作为背景图像剪切 */\\n          color: transparent; /* 隐藏文字本身的颜色 */\\n        }\\n        .nosupport {\\n          color: #838383;\\n          font-weight: bolder;\\n        }\\n      }\\n    }\\n    .item:hover {\\n      background-color: #e8e8e8c5;\\n    }\\n  }\\n  .body::-webkit-scrollbar {\\n    width: 0.5rem; /* 设置滚动条宽度，可以根据需要调整 */\\n  }\\n  /* 隐藏滚动条滑块 */\\n  .body::-webkit-scrollbar-thumb {\\n    background: transparent;\\n  }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject1() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: absolute;\\n  right: \",\n        \";\\n  left: \",\n        \";\\n  bottom: 20px;\\n  display: inline-flex;\\n  vertical-align: top;\\n  justify-content: center;\\n  align-items: center;\\n  top: 0px;\\n  cursor: pointer;\\n  user-select: none;\\n  animation: \",\n        \";\\n  @keyframes moveRight {\\n    from {\\n      right: -30px;\\n    }\\n    to {\\n      right: -40px;\\n    }\\n  }\\n\\n  @keyframes moveLeft {\\n    from {\\n      left: -30px;\\n    }\\n    to {\\n      left: -40px;\\n    }\\n  }\\n\"\n    ]);\n    _templateObject1 = function() {\n        return data;\n    };\n    return data;\n}\n\nconst Wrap = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject());\nconst ToFowrad = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject1(), (props)=>props.$orientations === 1 ? \"-30px\" : \"\", (props)=>props.$orientations === 0 ? \"-30px\" : \"\", (props)=>props.$orientations === 1 ? \"infinite 0.8s moveRight\" : \"infinite 0.8s moveLeft\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFFaEMsTUFBTUMsT0FBT0QsNkRBQVUsb0JBdUY1QjtBQUVLLE1BQU1HLFdBQVdILDZEQUFVLHFCQUV2QixDQUFDSSxRQUFXQSxNQUFNQyxhQUFhLEtBQUssSUFBSSxVQUFVLElBQ25ELENBQUNELFFBQVdBLE1BQU1DLGFBQWEsS0FBSyxJQUFJLFVBQVUsSUFTN0MsQ0FBQ0QsUUFDWkEsTUFBTUMsYUFBYSxLQUFLLElBQ3BCLDRCQUNBLDBCQWtCTiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3g/NWQ0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuXG5leHBvcnQgY29uc3QgV3JhcCA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAzMHB4IDBweDtcbiAgLmJvZHkge1xuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgICB3aWR0aDogMTIwMHB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IC8qIOmYsuatouWGheWuueaNouihjCAqL1xuICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICAudGl0bGUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byByaWdodCxcbiAgICAgICAgI2ViMzMyOSxcbiAgICAgICAgIzk2MjYyNlxuICAgICAgKTsgLyog5riQ5Y+Y6aKc6Imy6K6+572uICovXG4gICAgICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDsgLyog5bCG5paH5a2X5L2c5Li66IOM5pmv5Zu+5YOP5Ymq5YiHICovXG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7IC8qIOmakOiXj+aWh+Wtl+acrOi6q+eahOminOiJsiAqL1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIC5pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgLnRvcCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB9XG4gICAgICAubG9nbyB7XG4gICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICB9XG4gICAgICAucHJpY2Uge1xuICAgICAgICBmb250LXNpemU6IDMwcHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gICAgICAgIG1hcmdpbjogMTBweCAwcHg7XG4gICAgICB9XG4gICAgICAuY2hvb3NlIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZWIzMzI5LCAjOTYyNjI2KTtcbiAgICAgIH1cbiAgICAgIC5mZWF0dXJlIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDBweDtcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICAgICAgfVxuICAgICAgICAuc3VwcG9ydCB7XG4gICAgICAgICAgY29sb3I6ICNlYjMzMjk7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgICAgICB0byByaWdodCxcbiAgICAgICAgICAgICNlYjMzMjksXG4gICAgICAgICAgICAjOTYyNjI2XG4gICAgICAgICAgKTsgLyog5riQ5Y+Y6aKc6Imy6K6+572uICovXG4gICAgICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7IC8qIOWwhuaWh+Wtl+S9nOS4uuiDjOaZr+WbvuWDj+WJquWIhyAqL1xuICAgICAgICAgIGNvbG9yOiB0cmFuc3BhcmVudDsgLyog6ZqQ6JeP5paH5a2X5pys6Lqr55qE6aKc6ImyICovXG4gICAgICAgIH1cbiAgICAgICAgLm5vc3VwcG9ydCB7XG4gICAgICAgICAgY29sb3I6ICM4MzgzODM7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAuaXRlbTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4YzU7XG4gICAgfVxuICB9XG4gIC5ib2R5Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgd2lkdGg6IDAuNXJlbTsgLyog6K6+572u5rua5Yqo5p2h5a695bqm77yM5Y+v5Lul5qC55o2u6ZyA6KaB6LCD5pW0ICovXG4gIH1cbiAgLyog6ZqQ6JeP5rua5Yqo5p2h5ruR5Z2XICovXG4gIC5ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUb0Zvd3JhZCA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6ICR7KHByb3BzKSA9PiAocHJvcHMuJG9yaWVudGF0aW9ucyA9PT0gMSA/IFwiLTMwcHhcIiA6IFwiXCIpfTtcbiAgbGVmdDogJHsocHJvcHMpID0+IChwcm9wcy4kb3JpZW50YXRpb25zID09PSAwID8gXCItMzBweFwiIDogXCJcIil9O1xuICBib3R0b206IDIwcHg7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdG9wOiAwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGFuaW1hdGlvbjogJHsocHJvcHMpID0+XG4gICAgcHJvcHMuJG9yaWVudGF0aW9ucyA9PT0gMVxuICAgICAgPyBcImluZmluaXRlIDAuOHMgbW92ZVJpZ2h0XCJcbiAgICAgIDogXCJpbmZpbml0ZSAwLjhzIG1vdmVMZWZ0XCJ9O1xuICBAa2V5ZnJhbWVzIG1vdmVSaWdodCB7XG4gICAgZnJvbSB7XG4gICAgICByaWdodDogLTMwcHg7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIHJpZ2h0OiAtNDBweDtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIG1vdmVMZWZ0IHtcbiAgICBmcm9tIHtcbiAgICAgIGxlZnQ6IC0zMHB4O1xuICAgIH1cbiAgICB0byB7XG4gICAgICBsZWZ0OiAtNDBweDtcbiAgICB9XG4gIH1cbmA7XG4iXSwibmFtZXMiOlsic3R5bGVkIiwiV3JhcCIsImRpdiIsIlRvRm93cmFkIiwicHJvcHMiLCIkb3JpZW50YXRpb25zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Commodity/style.jsx\n"));

/***/ })

});