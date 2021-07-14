(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[66],{

/***/ "../src/pages/mycj/vip-level-description/vip-level-description.js":
/*!************************************************************************!*\
  !*** ../src/pages/mycj/vip-level-description/vip-level-description.js ***!
  \************************************************************************/
/*! exports provided: vipLevelDescFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vipLevelDescFactory\", function() { return vipLevelDescFactory; });\nfunction vipLevelDescFactory(angular) {\n  var app = angular.module('vip-level-desc.module', ['service']);\n  app.controller('vip-level-desc.ctrl', ['$scope', '$rootScope', 'dsp', '$stateParams', 'utils', function ($scope, $rootScope, dsp, $stateParams, utils) {\n    var userId = $rootScope.userInfo.userId; //获取用户信息\n\n    function getUserInfo() {\n      layer.load(2);\n      dsp.postFun('app/info/userinfo', {\n        data: JSON.stringify({\n          userId: userId\n        })\n      }, function (res) {\n        layer.closeAll('loading');\n\n        if (res.data.statusCode === '200') {\n          $scope.userData = JSON.parse(res.data.result)[0] || {};\n          $scope.userData.img = $scope.userData.img === 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/ba627238-87d7-41a9-86f1-960b4cc07ebf.png' ? '' : $scope.userData.img;\n          console.log($scope.userData);\n          $scope.userLevel = $scope.userData.vip === 1 ? 'VIP' : $scope.userData.moneyLevel;\n          $scope.growthVal = $scope.userData.moneyLevelScore || 0;\n          calcGrowth();\n        }\n      }, function (err) {\n        console.log('获取数据失败！');\n      });\n    }\n\n    getUserInfo(); // 计算进度\n\n    function calcGrowth() {\n      var growthLevelData = {\n        1: 501,\n        2: 2001,\n        3: 100001,\n        4: 2000001\n      };\n      var growthLevelWidthData = {\n        1: 70,\n        2: 195,\n        3: 320,\n        4: 445,\n        5: 570,\n        'VIP': 750\n      };\n      $scope.totalVal = growthLevelData[$scope.userLevel];\n      $scope.growthLevelWidth = growthLevelWidthData[$scope.userLevel];\n      $scope.growthRate = $scope.totalVal !== undefined ? $scope.growthVal / $scope.totalVal * 100 : 100;\n    } // vip 权益数据\n\n\n    var arr = [{\n      name: 'Daily Sourcing',\n      icon: 'pages/mycj/vip-level-description/img/icon-1.svg'\n    }, {\n      name: 'Inventory Pre-Stock',\n      icon: 'pages/mycj/vip-level-description/img/icon-2.svg'\n    }, {\n      name: 'Order Processing Priority',\n      icon: 'pages/mycj/vip-level-description/img/icon-3.svg'\n    }, {\n      name: 'Optimization Proposal',\n      icon: 'pages/mycj/vip-level-description/img/icon-4.svg'\n    }, {\n      name: 'COD Pre-Approved',\n      icon: 'pages/mycj/vip-level-description/img/icon-5.svg'\n    }, {\n      name: 'Dedicated Agent',\n      icon: 'pages/mycj/vip-level-description/img/icon-6.svg'\n    }, {\n      name: 'Luxury Dashboard Interface',\n      icon: 'pages/mycj/vip-level-description/img/icon-7.svg'\n    }, {\n      name: 'CJ Gift and Limited Edition Plate',\n      icon: 'pages/mycj/vip-level-description/img/icon-8.svg'\n    }, {\n      name: 'Potential Business Partnership',\n      icon: 'pages/mycj/vip-level-description/img/icon-9.svg'\n    }];\n    $scope.vipEquityData = arr.slice(0, 8); // 问题数据\n\n    $scope.faqData = [{\n      q: '1. How can I upgrade to the next level?',\n      a: 'You can increase the level when your orders amount reaches the requirement.'\n    }, {\n      q: '2. I have already placed so many orders and paid so much money, why the membership level doesn’t have any change?',\n      a: 'The amount of disputed orders won’t be included in the cumulative amount.'\n    }, {\n      q: '3. How can I upgrade to the next level in a faster way?',\n      a: 'There’s only one solution to upgrade your membership level—place more orders to increase your sales.'\n    }, {\n      q: '4. Why the level of the user registered on the same date is higher than me?',\n      a: 'Because the user placed orders more than you did.'\n    }, {\n      q: '5. How can I benefit from upgrading my level?',\n      a: 'You can get more privileges, such as using overseas warehouse with less limits, more daily sourcing requests, order processing priority, dedicated agent and so on.'\n    }, {\n      q: '6. How can I enjoy VIP privileges?',\n      a: 'You can upgrade your level by placing more orders. When your order amount reaches the requirement, you will become the VIP.'\n    }, {\n      q: '7. How can I be your VIP?',\n      a: 'You need to keep long-term cooperation with us and contact your agent for application when you have regular orders.'\n    }]; // 权益切换\n\n    $scope.handleTargetPage = function () {\n      $scope.targetPage = !$scope.targetPage;\n      $scope.vipEquityData = $scope.targetPage ? arr.slice(8, 9) : arr.slice(0, 8);\n    }; // 问题答案\n\n\n    $scope.handleTarget = function (item) {\n      return item.isShow = !item.isShow;\n    };\n  }]);\n  return app;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vc3JjL3BhZ2VzL215Y2ovdmlwLWxldmVsLWRlc2NyaXB0aW9uL3ZpcC1sZXZlbC1kZXNjcmlwdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9zcmMvcGFnZXMvbXljai92aXAtbGV2ZWwtZGVzY3JpcHRpb24vdmlwLWxldmVsLWRlc2NyaXB0aW9uLmpzPzA1NmIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHZpcExldmVsRGVzY0ZhY3RvcnkoYW5ndWxhcikge1xyXG4gIGNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd2aXAtbGV2ZWwtZGVzYy5tb2R1bGUnLCBbJ3NlcnZpY2UnXSk7XHJcbiAgYXBwLmNvbnRyb2xsZXIoJ3ZpcC1sZXZlbC1kZXNjLmN0cmwnLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJ2RzcCcsICckc3RhdGVQYXJhbXMnLCAndXRpbHMnLFxyXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCBkc3AsICRzdGF0ZVBhcmFtcywgdXRpbHMpIHtcclxuICAgICAgY29uc3QgdXNlcklkID0gJHJvb3RTY29wZS51c2VySW5mby51c2VySWQ7XHJcbiAgXHJcbiAgICAgIC8v6I635Y+W55So5oi35L+h5oGvXHJcbiAgICAgIGZ1bmN0aW9uIGdldFVzZXJJbmZvKCkge1xyXG4gICAgICAgIGxheWVyLmxvYWQoMik7XHJcbiAgICAgICAgZHNwLnBvc3RGdW4oJ2FwcC9pbmZvL3VzZXJpbmZvJywgeyBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHVzZXJJZCB9KSB9LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCdsb2FkaW5nJyk7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzQ29kZSA9PT0gJzIwMCcpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJEYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YS5yZXN1bHQpWzBdIHx8IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlckRhdGEuaW1nID0gJHNjb3BlLnVzZXJEYXRhLmltZyA9PT0gJ2h0dHBzOi8vY2Mtd2VzdC11c2Eub3NzLXVzLXdlc3QtMS5hbGl5dW5jcy5jb20vYmE2MjcyMzgtODdkNy00MWE5LTg2ZjEtOTYwYjRjYzA3ZWJmLnBuZycgPyAnJyA6ICRzY29wZS51c2VyRGF0YS5pbWdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnVzZXJEYXRhKTtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJMZXZlbCA9ICRzY29wZS51c2VyRGF0YS52aXAgPT09IDEgPyAnVklQJyA6ICRzY29wZS51c2VyRGF0YS5tb25leUxldmVsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZ3Jvd3RoVmFsID0gJHNjb3BlLnVzZXJEYXRhLm1vbmV5TGV2ZWxTY29yZSB8fCAwO1xyXG4gICAgICAgICAgICBjYWxjR3Jvd3RoKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5pWw5o2u5aSx6LSl77yBJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgZ2V0VXNlckluZm8oKTtcclxuICBcclxuICAgICAgLy8g6K6h566X6L+b5bqmXHJcbiAgICAgIGZ1bmN0aW9uIGNhbGNHcm93dGgoKSB7XHJcbiAgICAgICAgY29uc3QgZ3Jvd3RoTGV2ZWxEYXRhID0ge1xyXG4gICAgICAgICAgMTogNTAxLFxyXG4gICAgICAgICAgMjogMjAwMSxcclxuICAgICAgICAgIDM6IDEwMDAwMSxcclxuICAgICAgICAgIDQ6IDIwMDAwMDFcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGdyb3d0aExldmVsV2lkdGhEYXRhID0ge1xyXG4gICAgICAgICAgMTogNzAsXHJcbiAgICAgICAgICAyOiAxOTUsXHJcbiAgICAgICAgICAzOiAzMjAsXHJcbiAgICAgICAgICA0OiA0NDUsXHJcbiAgICAgICAgICA1OiA1NzAsXHJcbiAgICAgICAgICAnVklQJzogNzUwLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLnRvdGFsVmFsID0gZ3Jvd3RoTGV2ZWxEYXRhWyRzY29wZS51c2VyTGV2ZWxdO1xyXG4gICAgICAgICRzY29wZS5ncm93dGhMZXZlbFdpZHRoID0gZ3Jvd3RoTGV2ZWxXaWR0aERhdGFbJHNjb3BlLnVzZXJMZXZlbF1cclxuICAgICAgICAkc2NvcGUuZ3Jvd3RoUmF0ZSA9ICRzY29wZS50b3RhbFZhbCAhPT0gdW5kZWZpbmVkID8gKCRzY29wZS5ncm93dGhWYWwgLyAkc2NvcGUudG90YWxWYWwpICogMTAwIDogMTAwO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIHZpcCDmnYPnm4rmlbDmja5cclxuICAgICAgY29uc3QgYXJyID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdEYWlseSBTb3VyY2luZycsXHJcbiAgICAgICAgICBpY29uOiAncGFnZXMvbXljai92aXAtbGV2ZWwtZGVzY3JpcHRpb24vaW1nL2ljb24tMS5zdmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnSW52ZW50b3J5IFByZS1TdG9jaycsXHJcbiAgICAgICAgICBpY29uOiAncGFnZXMvbXljai92aXAtbGV2ZWwtZGVzY3JpcHRpb24vaW1nL2ljb24tMi5zdmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnT3JkZXIgUHJvY2Vzc2luZyBQcmlvcml0eScsXHJcbiAgICAgICAgICBpY29uOiAncGFnZXMvbXljai92aXAtbGV2ZWwtZGVzY3JpcHRpb24vaW1nL2ljb24tMy5zdmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnT3B0aW1pemF0aW9uIFByb3Bvc2FsJyxcclxuICAgICAgICAgIGljb246ICdwYWdlcy9teWNqL3ZpcC1sZXZlbC1kZXNjcmlwdGlvbi9pbWcvaWNvbi00LnN2ZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdDT0QgUHJlLUFwcHJvdmVkJyxcclxuICAgICAgICAgIGljb246ICdwYWdlcy9teWNqL3ZpcC1sZXZlbC1kZXNjcmlwdGlvbi9pbWcvaWNvbi01LnN2ZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdEZWRpY2F0ZWQgQWdlbnQnLFxyXG4gICAgICAgICAgaWNvbjogJ3BhZ2VzL215Y2ovdmlwLWxldmVsLWRlc2NyaXB0aW9uL2ltZy9pY29uLTYuc3ZnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ0x1eHVyeSBEYXNoYm9hcmQgSW50ZXJmYWNlJyxcclxuICAgICAgICAgIGljb246ICdwYWdlcy9teWNqL3ZpcC1sZXZlbC1kZXNjcmlwdGlvbi9pbWcvaWNvbi03LnN2ZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdDSiBHaWZ0IGFuZCBMaW1pdGVkIEVkaXRpb24gUGxhdGUnLFxyXG4gICAgICAgICAgaWNvbjogJ3BhZ2VzL215Y2ovdmlwLWxldmVsLWRlc2NyaXB0aW9uL2ltZy9pY29uLTguc3ZnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ1BvdGVudGlhbCBCdXNpbmVzcyBQYXJ0bmVyc2hpcCcsXHJcbiAgICAgICAgICBpY29uOiAncGFnZXMvbXljai92aXAtbGV2ZWwtZGVzY3JpcHRpb24vaW1nL2ljb24tOS5zdmcnXHJcbiAgICAgICAgfVxyXG4gICAgICBdO1xyXG4gICAgICAkc2NvcGUudmlwRXF1aXR5RGF0YSA9IGFyci5zbGljZSgwLCA4KTtcclxuICBcclxuICAgICAgLy8g6Zeu6aKY5pWw5o2uXHJcbiAgICAgICRzY29wZS5mYXFEYXRhID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6ICcxLiBIb3cgY2FuIEkgdXBncmFkZSB0byB0aGUgbmV4dCBsZXZlbD8nLFxyXG4gICAgICAgICAgYTogJ1lvdSBjYW4gaW5jcmVhc2UgdGhlIGxldmVsIHdoZW4geW91ciBvcmRlcnMgYW1vdW50IHJlYWNoZXMgdGhlIHJlcXVpcmVtZW50LidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6ICcyLiBJIGhhdmUgYWxyZWFkeSBwbGFjZWQgc28gbWFueSBvcmRlcnMgYW5kIHBhaWQgc28gbXVjaCBtb25leSwgd2h5IHRoZSBtZW1iZXJzaGlwIGxldmVsIGRvZXNu4oCZdCBoYXZlIGFueSBjaGFuZ2U/JyxcclxuICAgICAgICAgIGE6ICdUaGUgYW1vdW50IG9mIGRpc3B1dGVkIG9yZGVycyB3b27igJl0IGJlIGluY2x1ZGVkIGluIHRoZSBjdW11bGF0aXZlIGFtb3VudC4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiAnMy4gSG93IGNhbiBJIHVwZ3JhZGUgdG8gdGhlIG5leHQgbGV2ZWwgaW4gYSBmYXN0ZXIgd2F5PycsXHJcbiAgICAgICAgICBhOiAnVGhlcmXigJlzIG9ubHkgb25lIHNvbHV0aW9uIHRvIHVwZ3JhZGUgeW91ciBtZW1iZXJzaGlwIGxldmVs4oCUcGxhY2UgbW9yZSBvcmRlcnMgdG8gaW5jcmVhc2UgeW91ciBzYWxlcy4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiAnNC4gV2h5IHRoZSBsZXZlbCBvZiB0aGUgdXNlciByZWdpc3RlcmVkIG9uIHRoZSBzYW1lIGRhdGUgaXMgaGlnaGVyIHRoYW4gbWU/JyxcclxuICAgICAgICAgIGE6ICdCZWNhdXNlIHRoZSB1c2VyIHBsYWNlZCBvcmRlcnMgbW9yZSB0aGFuIHlvdSBkaWQuJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcTogJzUuIEhvdyBjYW4gSSBiZW5lZml0IGZyb20gdXBncmFkaW5nIG15IGxldmVsPycsXHJcbiAgICAgICAgICBhOiAnWW91IGNhbiBnZXQgbW9yZSBwcml2aWxlZ2VzLCBzdWNoIGFzIHVzaW5nIG92ZXJzZWFzIHdhcmVob3VzZSB3aXRoIGxlc3MgbGltaXRzLCBtb3JlIGRhaWx5IHNvdXJjaW5nIHJlcXVlc3RzLCBvcmRlciBwcm9jZXNzaW5nIHByaW9yaXR5LCBkZWRpY2F0ZWQgYWdlbnQgYW5kIHNvIG9uLidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHE6ICc2LiBIb3cgY2FuIEkgZW5qb3kgVklQIHByaXZpbGVnZXM/JyxcclxuICAgICAgICAgIGE6ICdZb3UgY2FuIHVwZ3JhZGUgeW91ciBsZXZlbCBieSBwbGFjaW5nIG1vcmUgb3JkZXJzLiBXaGVuIHlvdXIgb3JkZXIgYW1vdW50IHJlYWNoZXMgdGhlIHJlcXVpcmVtZW50LCB5b3Ugd2lsbCBiZWNvbWUgdGhlIFZJUC4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxOiAnNy4gSG93IGNhbiBJIGJlIHlvdXIgVklQPycsXHJcbiAgICAgICAgICBhOiAnWW91IG5lZWQgdG8ga2VlcCBsb25nLXRlcm0gY29vcGVyYXRpb24gd2l0aCB1cyBhbmQgY29udGFjdCB5b3VyIGFnZW50IGZvciBhcHBsaWNhdGlvbiB3aGVuIHlvdSBoYXZlIHJlZ3VsYXIgb3JkZXJzLidcclxuICAgICAgICB9XHJcbiAgICAgIF07XHJcbiAgXHJcbiAgICAgIC8vIOadg+ebiuWIh+aNolxyXG4gICAgICAkc2NvcGUuaGFuZGxlVGFyZ2V0UGFnZSA9ICgpID0+IHtcclxuICAgICAgICAkc2NvcGUudGFyZ2V0UGFnZSA9ICEkc2NvcGUudGFyZ2V0UGFnZTtcclxuICAgICAgICAkc2NvcGUudmlwRXF1aXR5RGF0YSA9ICRzY29wZS50YXJnZXRQYWdlID8gYXJyLnNsaWNlKDgsIDkpIDogYXJyLnNsaWNlKDAsIDgpO1xyXG4gICAgICB9O1xyXG4gIFxyXG4gICAgICAvLyDpl67popjnrZTmoYhcclxuICAgICAgJHNjb3BlLmhhbmRsZVRhcmdldCA9IGl0ZW0gPT4gaXRlbS5pc1Nob3cgPSAhaXRlbS5pc1Nob3c7XHJcbiAgXHJcbiAgICB9XSk7XHJcbiAgcmV0dXJuIGFwcDtcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../src/pages/mycj/vip-level-description/vip-level-description.js\n");

/***/ })

}]);