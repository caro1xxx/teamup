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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToFowrad: function() { return /* binding */ ToFowrad; },\n/* harmony export */   Wrap: function() { return /* binding */ Wrap; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_tagged_template_literal */ \"./node_modules/@swc/helpers/esm/_tagged_template_literal.js\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nfunction _templateObject() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: relative;\\n  .title {\\n    margin-top: 70px;\\n    display: flex;\\n    vertical-align: top;\\n    justify-content: center;\\n    align-items: center;\\n    margin-bottom: 20px;\\n    color: #fff;\\n    cursor: pointer;\\n    user-select: none;\\n  }\\n  .body {\\n    cursor: pointer;\\n    user-select: none;\\n    overflow-x: scroll;\\n    width: 1200px;\\n    white-space: nowrap; /* 防止内容换行 */\\n    scrollbar-width: none;\\n    .item {\\n      margin-right: 20px;\\n      background-color: #cce4e3c5;\\n      position: relative;\\n      display: inline-block;\\n      width: 220px;\\n      padding: 20px;\\n      border-radius: 10px;\\n      .toright {\\n        position: absolute;\\n        right: 0px;\\n      }\\n      .toleft {\\n        position: absolute;\\n        left: 0px;\\n      }\\n      .stock {\\n        font-size: 10px;\\n        position: absolute;\\n        right: 10px;\\n      }\\n      .top {\\n        display: flex;\\n      }\\n      .logo {\\n        width: 20px;\\n        height: 20px;\\n      }\\n      .price {\\n        font-size: 30px;\\n        font-weight: bolder;\\n        margin: 10px 0px;\\n      }\\n      .choose {\\n        color: white;\\n        height: 30px;\\n        width: 100%;\\n        text-align: center;\\n        border-radius: 5px;\\n        background: linear-gradient(to right, #eb3329, #962626);\\n      }\\n      .feature {\\n        cursor: pointer;\\n        user-select: none;\\n        margin: 10px 0px;\\n        > div {\\n          margin-bottom: 5px;\\n        }\\n        .support {\\n          color: #eb3329;\\n          font-weight: bolder;\\n          background-image: linear-gradient(\\n            to right,\\n            #eb3329,\\n            #962626\\n          ); /* 渐变颜色设置 */\\n          -webkit-background-clip: text; /* 将文字作为背景图像剪切 */\\n          color: transparent; /* 隐藏文字本身的颜色 */\\n        }\\n        .nosupport {\\n          color: #838383;\\n          font-weight: bolder;\\n        }\\n      }\\n    }\\n    .choose:hover {\\n      color: #000;\\n      background: #fff;\\n    }\\n  }\\n  .body::-webkit-scrollbar {\\n    width: 0.5rem; /* 设置滚动条宽度，可以根据需要调整 */\\n  }\\n  /* 隐藏滚动条滑块 */\\n  .body::-webkit-scrollbar-thumb {\\n    background: transparent;\\n  }\\n\"\n    ]);\n    _templateObject = function() {\n        return data;\n    };\n    return data;\n}\nfunction _templateObject1() {\n    const data = (0,_swc_helpers_tagged_template_literal__WEBPACK_IMPORTED_MODULE_0__._)([\n        \"\\n  position: absolute;\\n  right: \",\n        \";\\n  left: \",\n        \";\\n  bottom: 20px;\\n  display: inline-flex;\\n  vertical-align: top;\\n  justify-content: center;\\n  align-items: center;\\n  top: 0px;\\n  cursor: pointer;\\n  user-select: none;\\n  animation: \",\n        \";\\n  @keyframes moveRight {\\n    from {\\n      right: -30px;\\n    }\\n    to {\\n      right: -40px;\\n    }\\n  }\\n\\n  @keyframes moveLeft {\\n    from {\\n      left: -30px;\\n    }\\n    to {\\n      left: -40px;\\n    }\\n  }\\n\"\n    ]);\n    _templateObject1 = function() {\n        return data;\n    };\n    return data;\n}\n\nconst Wrap = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject());\nconst ToFowrad = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div(_templateObject1(), (props)=>props.$orientations === 1 ? \"-30px\" : \"\", (props)=>props.$orientations === 0 ? \"-30px\" : \"\", (props)=>props.$orientations === 1 ? \"infinite 0.8s moveRight\" : \"infinite 0.8s moveLeft\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFFaEMsTUFBTUMsT0FBT0QsNkRBQVUsb0JBaUc1QjtBQUVLLE1BQU1HLFdBQVdILDZEQUFVLHFCQUV2QixDQUFDSSxRQUFXQSxNQUFNQyxhQUFhLEtBQUssSUFBSSxVQUFVLElBQ25ELENBQUNELFFBQVdBLE1BQU1DLGFBQWEsS0FBSyxJQUFJLFVBQVUsSUFTN0MsQ0FBQ0QsUUFDWkEsTUFBTUMsYUFBYSxLQUFLLElBQ3BCLDRCQUNBLDBCQWtCTiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0NvbW1vZGl0eS9zdHlsZS5qc3g/NWQ0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuXG5leHBvcnQgY29uc3QgV3JhcCA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLnRpdGxlIHtcbiAgICBtYXJnaW4tdG9wOiA3MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICB9XG4gIC5ib2R5IHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAgIHdpZHRoOiAxMjAwcHg7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgLyog6Ziy5q2i5YaF5a655o2i6KGMICovXG4gICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAgIC5pdGVtIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2U0ZTNjNTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgLnRvcmlnaHQge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAwcHg7XG4gICAgICB9XG4gICAgICAudG9sZWZ0IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICB9XG4gICAgICAuc3RvY2sge1xuICAgICAgICBmb250LXNpemU6IDEwcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDEwcHg7XG4gICAgICB9XG4gICAgICAudG9wIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cbiAgICAgIC5sb2dvIHtcbiAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIH1cbiAgICAgIC5wcmljZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDBweDtcbiAgICAgIH1cbiAgICAgIC5jaG9vc2Uge1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNlYjMzMjksICM5NjI2MjYpO1xuICAgICAgfVxuICAgICAgLmZlYXR1cmUge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICBtYXJnaW46IDEwcHggMHB4O1xuICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgICAgICB9XG4gICAgICAgIC5zdXBwb3J0IHtcbiAgICAgICAgICBjb2xvcjogI2ViMzMyOTtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZGVyO1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgICAgIHRvIHJpZ2h0LFxuICAgICAgICAgICAgI2ViMzMyOSxcbiAgICAgICAgICAgICM5NjI2MjZcbiAgICAgICAgICApOyAvKiDmuJDlj5jpopzoibLorr7nva4gKi9cbiAgICAgICAgICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDsgLyog5bCG5paH5a2X5L2c5Li66IOM5pmv5Zu+5YOP5Ymq5YiHICovXG4gICAgICAgICAgY29sb3I6IHRyYW5zcGFyZW50OyAvKiDpmpDol4/mloflrZfmnKzouqvnmoTpopzoibIgKi9cbiAgICAgICAgfVxuICAgICAgICAubm9zdXBwb3J0IHtcbiAgICAgICAgICBjb2xvcjogIzgzODM4MztcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC5jaG9vc2U6aG92ZXIge1xuICAgICAgY29sb3I6ICMwMDA7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIH1cbiAgfVxuICAuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiAwLjVyZW07IC8qIOiuvue9rua7muWKqOadoeWuveW6pu+8jOWPr+S7peagueaNrumcgOimgeiwg+aVtCAqL1xuICB9XG4gIC8qIOmakOiXj+a7muWKqOadoea7keWdlyAqL1xuICAuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVG9Gb3dyYWQgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAkeyhwcm9wcykgPT4gKHByb3BzLiRvcmllbnRhdGlvbnMgPT09IDEgPyBcIi0zMHB4XCIgOiBcIlwiKX07XG4gIGxlZnQ6ICR7KHByb3BzKSA9PiAocHJvcHMuJG9yaWVudGF0aW9ucyA9PT0gMCA/IFwiLTMwcHhcIiA6IFwiXCIpfTtcbiAgYm90dG9tOiAyMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRvcDogMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBhbmltYXRpb246ICR7KHByb3BzKSA9PlxuICAgIHByb3BzLiRvcmllbnRhdGlvbnMgPT09IDFcbiAgICAgID8gXCJpbmZpbml0ZSAwLjhzIG1vdmVSaWdodFwiXG4gICAgICA6IFwiaW5maW5pdGUgMC44cyBtb3ZlTGVmdFwifTtcbiAgQGtleWZyYW1lcyBtb3ZlUmlnaHQge1xuICAgIGZyb20ge1xuICAgICAgcmlnaHQ6IC0zMHB4O1xuICAgIH1cbiAgICB0byB7XG4gICAgICByaWdodDogLTQwcHg7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBtb3ZlTGVmdCB7XG4gICAgZnJvbSB7XG4gICAgICBsZWZ0OiAtMzBweDtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgbGVmdDogLTQwcHg7XG4gICAgfVxuICB9XG5gO1xuIl0sIm5hbWVzIjpbInN0eWxlZCIsIldyYXAiLCJkaXYiLCJUb0Zvd3JhZCIsInByb3BzIiwiJG9yaWVudGF0aW9ucyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Commodity/style.jsx\n"));

/***/ })

});