(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "../src/pages/mycj/profile/profile.js":
/*!********************************************!*\
  !*** ../src/pages/mycj/profile/profile.js ***!
  \********************************************/
/*! exports provided: profileFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"profileFactory\", function() { return profileFactory; });\nfunction profileFactory(angular) {\n  // 个人中心\n  var app = angular.module('mycj-profile.module', ['service']);\n  app.controller('mycj-profile.ctrl', ['$scope', 'dsp', '$stateParams', 'utils', function ($scope, dsp, $stateParams, utils) {\n    $scope.$on('$destroy', function () {\n      console.clear();\n      localStorage.removeItem('profileType');\n    });\n    var that = this;\n    dsp.domainData().then(function (res) {\n      // 请求成功的结果\n      $scope.iscj = res.iscj;\n      $scope.affModel = res.affModel;\n    });\n    var base64 = new Base64();\n    var userId = base64.decode(localStorage.getItem('userId') == undefined ? \"\" : localStorage.getItem('userId'));\n    var token = base64.decode(localStorage.getItem('token') == undefined ? \"\" : localStorage.getItem('token'));\n    var loginName = base64.decode(localStorage.getItem('loginName') || \"\");\n    $scope.tabList = [{\n      name: 'Registration Info',\n      type: 1,\n      active: true\n    }, {\n      name: 'Address Management',\n      type: 2\n    }, {\n      name: 'Consignee Management',\n      type: 3\n    }, {\n      name: 'Subscribed Email',\n      type: 4\n    }, {\n      name: 'Account Security',\n      type: 5\n    }, {\n      name: 'IOSS Setting',\n      type: 6\n    }];\n    $('.mycj-profile-wrap').css({\n      //当页面加载完成后动态生成展示内容的最小高度\n      'min-height': $(window).height() * 1 - 171 + 'px'\n    });\n\n    $scope.infoCallback = function (data) {\n      $scope.infoEdit = data.show;\n    }; //tab点击切换tab 注：只有在非编辑状态下才能切换 -- 全局\n\n\n    function changeTabFun(type) {\n      if ($scope.infoEdit) return;\n      $scope.tabList.forEach(function (item) {\n        item.active = false;\n      });\n      $scope.tabList[type - 1].active = true;\n      $scope.tabType = type;\n      localStorage.setItem('profileType', type);\n    }\n\n    if ($stateParams.type == 'SUBemail') {\n      changeTabFun(4);\n    } else if ($stateParams.type === 'address') {\n      changeTabFun(2);\n    } else {\n      var profileType = localStorage.getItem('profileType');\n      $scope.tabType = profileType ? profileType : 1;\n      changeTabFun($scope.tabType);\n    }\n\n    $scope.changeTab = function (item) {\n      changeTabFun(item.type);\n    };\n  }]);\n  return app;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vc3JjL3BhZ2VzL215Y2ovcHJvZmlsZS9wcm9maWxlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uL3NyYy9wYWdlcy9teWNqL3Byb2ZpbGUvcHJvZmlsZS5qcz8wNTBlIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBwcm9maWxlRmFjdG9yeShhbmd1bGFyKSB7XHJcbiAgLy8g5Liq5Lq65Lit5b+DXHJcbiAgY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ215Y2otcHJvZmlsZS5tb2R1bGUnLCBbJ3NlcnZpY2UnXSk7XHJcblxyXG4gIGFwcC5jb250cm9sbGVyKCdteWNqLXByb2ZpbGUuY3RybCcsIFsnJHNjb3BlJywgJ2RzcCcsICckc3RhdGVQYXJhbXMnLCAndXRpbHMnLFxyXG4gICAgZnVuY3Rpb24gKCRzY29wZSwgZHNwLCAkc3RhdGVQYXJhbXMsIHV0aWxzKSB7XHJcbiAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuY2xlYXIoKVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9maWxlVHlwZScpXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBkc3AuZG9tYWluRGF0YSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIC8vIOivt+axguaIkOWKn+eahOe7k+aenFxyXG4gICAgICAgICRzY29wZS5pc2NqID0gcmVzLmlzY2o7XHJcbiAgICAgICAgJHNjb3BlLmFmZk1vZGVsID0gcmVzLmFmZk1vZGVsO1xyXG4gICAgICB9KVxyXG4gICAgICB2YXIgYmFzZTY0ID0gbmV3IEJhc2U2NCgpO1xyXG4gICAgICB2YXIgdXNlcklkID0gYmFzZTY0LmRlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykgPT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKSk7XHJcbiAgICAgIHZhciB0b2tlbiA9IGJhc2U2NC5kZWNvZGUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgPT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKTtcclxuICAgICAgY29uc3QgbG9naW5OYW1lID0gYmFzZTY0LmRlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5OYW1lJykgfHwgXCJcIik7XHJcbiAgICAgICRzY29wZS50YWJMaXN0ID0gW1xyXG4gICAgICAgIHtuYW1lOidSZWdpc3RyYXRpb24gSW5mbycsdHlwZToxLGFjdGl2ZTp0cnVlfSxcclxuICAgICAgICB7bmFtZTonQWRkcmVzcyBNYW5hZ2VtZW50Jyx0eXBlOjJ9LFxyXG4gICAgICAgIHtuYW1lOidDb25zaWduZWUgTWFuYWdlbWVudCcsdHlwZTozfSwgXHJcbiAgICAgICAge25hbWU6J1N1YnNjcmliZWQgRW1haWwnLHR5cGU6NH0sXHJcbiAgICAgICAge25hbWU6J0FjY291bnQgU2VjdXJpdHknLHR5cGU6NX0sXHJcbiAgICAgICAge25hbWU6ICdJT1NTIFNldHRpbmcnLCB0eXBlOiA2IH0sXHJcbiAgICAgIF1cclxuICAgICAgXHJcbiAgICAgICQoJy5teWNqLXByb2ZpbGUtd3JhcCcpLmNzcyh7ICAgICAgICAgIC8v5b2T6aG16Z2i5Yqg6L295a6M5oiQ5ZCO5Yqo5oCB55Sf5oiQ5bGV56S65YaF5a6555qE5pyA5bCP6auY5bqmXHJcbiAgICAgICAgJ21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCkgKiAxIC0gMTcxICsgJ3B4J1xyXG4gICAgICB9KVxyXG4gICAgICAkc2NvcGUuaW5mb0NhbGxiYWNrPShkYXRhKT0+e1xyXG4gICAgICAgICRzY29wZS5pbmZvRWRpdCA9IGRhdGEuc2hvdztcclxuICAgICAgfVxyXG4gICAgICAvL3RhYueCueWHu+WIh+aNonRhYiDms6jvvJrlj6rmnInlnKjpnZ7nvJbovpHnirbmgIHkuIvmiY3og73liIfmjaIgLS0g5YWo5bGAXHJcbiAgICAgIGZ1bmN0aW9uIGNoYW5nZVRhYkZ1bih0eXBlKXtcclxuICAgICAgICBpZigkc2NvcGUuaW5mb0VkaXQpIHJldHVybjtcclxuICAgICAgICAkc2NvcGUudGFiTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgIGl0ZW0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJHNjb3BlLnRhYkxpc3RbdHlwZS0xXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAkc2NvcGUudGFiVHlwZT10eXBlO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9maWxlVHlwZScsdHlwZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCRzdGF0ZVBhcmFtcy50eXBlID09ICdTVUJlbWFpbCcpIHtcclxuICAgICAgICBjaGFuZ2VUYWJGdW4oNCk7XHJcbiAgICAgIH1lbHNlIGlmICgkc3RhdGVQYXJhbXMudHlwZSA9PT0gJ2FkZHJlc3MnKSB7XHJcbiAgICAgICAgY2hhbmdlVGFiRnVuKDIpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBjb25zdCBwcm9maWxlVHlwZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9maWxlVHlwZScpO1xyXG4gICAgICAgICRzY29wZS50YWJUeXBlPSBwcm9maWxlVHlwZSA/IHByb2ZpbGVUeXBlIDogMTtcclxuICAgICAgICBjaGFuZ2VUYWJGdW4oJHNjb3BlLnRhYlR5cGUpXHJcbiAgICAgIH1cclxuICAgICAgJHNjb3BlLmNoYW5nZVRhYiA9IGl0ZW09PntcclxuICAgICAgICBjaGFuZ2VUYWJGdW4oaXRlbS50eXBlKVxyXG4gICAgICB9XHJcblxyXG4gICAgfV0pO1xyXG5cclxuICByZXR1cm4gYXBwO1xyXG5cclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../src/pages/mycj/profile/profile.js\n");

/***/ })

}]);