(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[60],{

/***/ "../src/pages/mycj/todo-list/todo-list.js":
/*!************************************************!*\
  !*** ../src/pages/mycj/todo-list/todo-list.js ***!
  \************************************************/
/*! exports provided: todoListFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoListFactory\", function() { return todoListFactory; });\nfunction todoListFactory(angular) {\n  var app = angular.module('todo-list.module', ['service', 'home-service']);\n  app.controller('todo-list.ctrl', ['$scope', 'dsp', '$location', '$stateParams', function ($scope, dsp, $location, $stateParams) {\n    console.log('todo-list.ctrl');\n    dsp.setRightMinHeight();\n\n    if (!localStorage.getItem('token')) {\n      window.location.assign('login.html');\n    }\n\n    $scope.hasLogin = dsp.isInLoginState();\n    var base64 = new Base64();\n    var userId = base64.decode(localStorage.getItem('userId') == undefined ? \"\" : localStorage.getItem('userId'));\n    var vip = localStorage.getItem('vip') == undefined ? \"\" : localStorage.getItem('vip');\n    $scope.vip = vip;\n    $scope.admin = base64.decode(localStorage.getItem('name') ? localStorage.getItem('name') : localStorage.getItem('loginName'));\n    var width = $(\".block-title\").width();\n\n    if (vip == '1') {\n      //vipFlag\n      $('.header-nav').addClass('vipFlag');\n      $('.mycj-right-bar').addClass('vip');\n      $('.mycj-right-wrap').css('background', '#F0EDE7');\n    } else {\n      $('.header-nav').removeClass('vipFlag');\n      $('.mycj-right-bar').removeClass('vip');\n      $('.mycj-right-wrap').css('background', '#f2f3f5');\n    }\n\n    $('.header-nav li').eq(0).addClass('active');\n    var todoTypeObj = {\n      'zombie': {\n        val: '1',\n        txt: '僵尸订单'\n      },\n      'synErr': {\n        val: '2',\n        txt: '同步失败'\n      }\n    };\n    $scope.todoType = $stateParams.type; //待办事项种类    1。僵尸订单  2.同步失败\n\n    $scope.pageNum = '1'; //分页当前页码\n\n    $scope.pageSize = '20'; //分页每页展示条数\n\n    $scope.options1 = {\n      //僵尸订单 操作明细\n      // 1：全额退款，2：部分退款，3：部分已配齐的发货，未配齐的继续等待，4：继续等待\n      '1': {\n        val: '1',\n        ch: '退款',\n        en: 'Refund'\n      },\n      '2': {\n        val: '2',\n        ch: '继续等待',\n        en: 'Keep waiting'\n      },\n      '3': {\n        val: '3',\n        ch: '拆分订单发货',\n        en: 'Split order shipment'\n      }\n    };\n    $scope.isShowPaging = true; //是否展示分页\n\n    $scope.synErrAllChecked = false; //同步失败订单全选flag\n\n    /** 根据 todoType 加载不同数据 */\n\n    switchAjaxByTodoType();\n\n    function switchAjaxByTodoType() {\n      switch ($scope.todoType) {\n        case todoTypeObj.zombie.val:\n          queryOrderobserver();\n          break;\n\n        case todoTypeObj.synErr.val:\n          fulfillmentFaild();\n          break;\n\n        default:\n          break;\n      }\n    } // tab 选择\n\n\n    $scope.toduTabClick = function (todoType) {\n      $scope.todoType = todoType;\n      $scope.pageNum = '1';\n      $scope.pageSize = '20';\n      switchAjaxByTodoType();\n    };\n    /** goback */\n\n\n    $scope.goback = function () {\n      window.history.back();\n    };\n    /** 僵尸订单 开始 */\n    // queryOrderobserver();\n\n\n    function queryOrderobserver() {\n      //僵尸订单 列表\n      var sendData = {\n        userId: userId,\n        sousuo: '1',\n        sku: '1',\n        pageNum: ($scope.pageNum - 1) * ($scope.pageSize - 0),\n        pageSize: $scope.pageSize\n      };\n      dsp.loadPercent($('.todolistWrap'), $(window).height() - 171, 47, 0);\n      dsp.postFun('erp/observer/queryOrderobserver', JSON.stringify(sendData), function (data) {\n        console.log(data.data);\n        dsp.closeLoadPercent($('.todolistWrap'));\n\n        if (data.data.statusCode == '200') {\n          $scope.zombieList = data.data.result;\n          $.each($scope.zombieList, function (i, v) {\n            v.isSelect = false; // v.decisionMaking = '';\n\n            v.decisionMaking2 = '';\n            v.isShowRemark = false;\n            var arr = typeof v.decisionMaking === 'string' ? v.decisionMaking.split(',') : [];\n            var newArr = [];\n            $.each(arr, function (i, v) {\n              var obj = $scope.options1[v];\n              newArr.push(obj);\n            });\n            v.decisionMaking = newArr;\n          });\n          console.log($scope.zombieList);\n          $scope.zombieList.length === 0 ? $scope.isShowPaging = false : $scope.isShowPaging = true;\n          queryBycount();\n        }\n      }, function () {\n        dsp.closeLoadPercent($('.todolistWrap'));\n      }, {\n        layer: true\n      });\n    }\n\n    function queryBycount() {\n      //僵尸订单 总条数\n      var sendData = {\n        userId: userId\n      };\n      dsp.postFun('erp/observer/queryBycount', JSON.stringify(sendData), function (data) {\n        console.log(data.data);\n        $scope.totalCounts = data.data.result[0].num * 1;\n        importFun();\n      }, function () {});\n    }\n\n    $scope.openSelect = function (item) {\n      //僵尸订单  分单代开关闭\n      if (item.isSelect) {\n        item.isSelect = false;\n      } else {\n        item.isSelect = true;\n      }\n    };\n\n    $scope.checkSelect = function (val, item) {\n      item.decisionMaking2 = val;\n    }; //保存\n\n\n    $scope.confirmFun = function () {\n      console.log($scope.zombieList);\n      var arr = [];\n      $.each($scope.zombieList, function (i, v) {\n        if (!(v.decisionMaking2 == '')) {\n          var data = {\n            orderId: v.orderId,\n            orderProductId: v.orderProductId,\n            decisionMaking: v.decisionMaking2,\n            sku: v.sku,\n            quehuo: v.quehuo\n          };\n          arr.push(data);\n        }\n      });\n\n      if (arr.length == 0) {\n        layer.msg('Please operate a piece of data first');\n        return;\n      }\n\n      console.log(arr);\n      var sendData = {\n        account: '0',\n        userId: userId,\n        data: JSON.stringify(arr)\n      }; // layer.load(2)\n\n      dsp.load();\n      dsp.postFun('erp/observer/updateAccountOrderob', JSON.stringify(sendData), function (data) {\n        dsp.closeLoad();\n        layer.msg(data.data.message);\n        queryOrderobserver();\n      }, function () {\n        dsp.closeLoad();\n      }, {\n        layer: true\n      });\n    };\n\n    $scope.openRemark = function (item, boolen) {\n      item.isShowRemark = boolen;\n    };\n\n    $scope.navToDetail = function (id, isRead) {\n      //查看订单详情\n      if (id) {\n        var navUrl = \"/order-detail/\".concat(id, \"/1\");\n\n        if (!isRead) {\n          layer.load(2);\n          dsp.mypost('cj/fbaOrder/readfulfillmentFail', {\n            ids: id + ''\n          }).then(function (res) {\n            console.log('navToDetail res => ', res);\n          });\n        }\n\n        $location.path(navUrl);\n      } else layer.msg('id is not found');\n    };\n\n    $scope.msgboxShow = false;\n\n    $scope.clearAllconfirm = function () {\n      // console.log('clearAllconfirm')\n      $scope.ignoreIds = $scope.synErrList && $scope.synErrList.map(function (_ref) {\n        var ID = _ref.ID;\n        return ID;\n      }).join(',');\n      $scope.msgboxShow = true;\n    };\n\n    $scope.clearAll = function () {\n      $scope.msgboxShow = false;\n      var ids = $scope.ignoreIds;\n\n      if (ids) {\n        layer.load(2);\n        dsp.mypost('cj/fbaOrder/removefulfillmentFail', {\n          ids: ids\n        }).then(function (res) {\n          console.log('clearAll res => ', res); // layer.msg('success')\n\n          switchAjaxByTodoType(); //重新获取数据\n        }).catch(function () {\n          layer.msg('Ignore Failed');\n        });\n      }\n    };\n    /** 僵尸订单结束 */\n\n    /** 同步失败订单 开始*/\n\n\n    function fulfillmentFaild() {\n      //获取同步失败订单\n      var sendData = {\n        offset: $scope.pageNum,\n        count: $scope.pageSize\n      };\n      dsp.loadPercent($('.todolistWrap'), $(window).height() - 171, 47, 0);\n      dsp.postFun('cj/fbaOrder/fulfillmentFaild', JSON.stringify(sendData), function (res) {\n        console.log(res.data);\n        dsp.closeLoadPercent($('.todolistWrap'));\n\n        if (res.data.statusCode === '200') {\n          $scope.synErrList = res.data.result.list.map(function (item) {\n            item.isChecked = false;\n            return item;\n          });\n          $scope.notRead = $scope.synErrList.filter(function (_ref2) {\n            var isRead = _ref2.isRead;\n            return isRead == 0;\n          }).length;\n          $scope.totalCounts = res.data.result.total;\n          $scope.synErrList.length === 0 ? $scope.isShowPaging = false : $scope.isShowPaging = true;\n          importFun();\n          console.log($scope.synErrList);\n        }\n      }, function () {\n        dsp.closeLoadPercent($('.todolistWrap'));\n      }, {\n        layer: true\n      });\n    }\n\n    $scope.timeFormat = function (timestamp) {\n      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      if (!timestamp) return '';\n      var time = new Date(timestamp);\n\n      function fix(t) {\n        t += '';\n        return t.length === 1 ? '0' + t : t;\n      }\n\n      var year = time.getFullYear();\n      var month = time.getMonth() + 1;\n      var date = time.getDate();\n      var hours = fix(time.getHours());\n      var minutes = fix(time.getMinutes());\n      var seconds = fix(time.getSeconds());\n      var type = option.type;\n      if (!type) return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;\n    }; //全选\n\n\n    $scope.clickAllChecked = function () {\n      $scope.synErrAllChecked = !$scope.synErrAllChecked;\n      $scope.synErrList = $scope.synErrList.map(function (item) {\n        item.isChecked = $scope.synErrAllChecked;\n        return item;\n      });\n    }; //单击checkbox\n\n\n    $scope.clickOneChecked = function (_ref3) {\n      var ID = _ref3.ID;\n      $scope.synErrList = $scope.synErrList.map(function (item) {\n        if (item.ID === ID) item.isChecked = !item.isChecked;\n        return item;\n      });\n      var checkedLen = $scope.synErrList.filter(function (item) {\n        return item.isChecked;\n      }).length;\n      $scope.synErrAllChecked = checkedLen === $scope.synErrList.length;\n    }; //ignore选中订单\n\n\n    $scope.ignoreOrder = function () {\n      var list = $scope.synErrList && $scope.synErrList.filter(function (item) {\n        return item.isChecked;\n      }) || [];\n\n      if (list.length < 1) {\n        layer.msg('Please checked orders');\n      } else {\n        $scope.ignoreIds = list.map(function (_ref4) {\n          var ID = _ref4.ID;\n          return ID;\n        }).join(',');\n        $scope.msgboxShow = true;\n      }\n    };\n    /** 同步失败订单 结束 */\n\n\n    function importFun() {\n      $(\".pagination-demo1\").jqPaginator({\n        totalCounts: $scope.totalCounts || 1,\n        //设置分页的总条目数\n        pageSize: $scope.pageSize - 0,\n        //设置每一页的条目数\n        visiblePages: 5,\n        currentPage: $scope.pageNum * 1,\n        activeClass: 'active',\n        first: '<li class=\"first\"><a class=\"prev\" href=\"javascript:void(0);\">&lt&lt;<\\/a><\\/li>',\n        prev: '<li class=\"prev\"><a class=\"prev\" href=\"javascript:void(0);\">&lt;<\\/a><\\/li>',\n        next: '<li class=\"next\"><a class=\"next\" href=\"javascript:void(0);\">&gt;<\\/a><\\/li>',\n        last: '<li class=\"last\"><a class=\"prev\" href=\"javascript:void(0);\">&gt&gt;<\\/a><\\/li>',\n        page: '<li class=\"page\"><a href=\"javascript:void(0);\">{{page}}<\\/a><\\/li>',\n        onPageChange: function onPageChange(n, type) {\n          // console.log(n)\n          // console.log(type)\n          if (type == 'init') {\n            return;\n          }\n\n          $scope.pageNum = n + '';\n          $scope.zombieList = [];\n          switchAjaxByTodoType(); // $scope.ordersList = [];\n          // ;\n        }\n      });\n    }\n\n    $scope.pagechange = function () {\n      $scope.pageNum = '1';\n      switchAjaxByTodoType();\n    };\n\n    $scope.gotoPage = function () {\n      var pagenum = Number($scope.pageNum);\n      console.log(pagenum);\n      var totalpage = Math.ceil($scope.totalCounts / $scope.pageSize);\n\n      if (pagenum > totalpage) {\n        layer.msg('Error page');\n        $scope.pageNum = '1';\n      } else {\n        switchAjaxByTodoType();\n      }\n    };\n  }]);\n  return app;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vc3JjL3BhZ2VzL215Y2ovdG9kby1saXN0L3RvZG8tbGlzdC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9zcmMvcGFnZXMvbXljai90b2RvLWxpc3QvdG9kby1saXN0LmpzPzZhZjciXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHRvZG9MaXN0RmFjdG9yeShhbmd1bGFyKSB7XHJcbiAgY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3RvZG8tbGlzdC5tb2R1bGUnLCBbJ3NlcnZpY2UnLCAnaG9tZS1zZXJ2aWNlJ10pO1xyXG5cclxuICBhcHAuY29udHJvbGxlcigndG9kby1saXN0LmN0cmwnLCBbJyRzY29wZScsICdkc3AnLCAnJGxvY2F0aW9uJywgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICBmdW5jdGlvbiAoJHNjb3BlLCBkc3AsICRsb2NhdGlvbiwgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0b2RvLWxpc3QuY3RybCcpO1xyXG4gICAgICBkc3Auc2V0UmlnaHRNaW5IZWlnaHQoKTtcclxuICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJ2xvZ2luLmh0bWwnKVxyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5oYXNMb2dpbiA9IGRzcC5pc0luTG9naW5TdGF0ZSgpO1xyXG4gICAgICB2YXIgYmFzZTY0ID0gbmV3IEJhc2U2NCgpO1xyXG4gICAgICB2YXIgdXNlcklkID0gYmFzZTY0LmRlY29kZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJykgPT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKSk7XHJcbiAgICAgIHZhciB2aXAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmlwJykgPT0gdW5kZWZpbmVkID8gXCJcIiA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2aXAnKTtcclxuXHJcbiAgICAgICRzY29wZS52aXAgPSB2aXA7XHJcbiAgICAgICRzY29wZS5hZG1pbiA9IGJhc2U2NC5kZWNvZGUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWUnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJykgOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5OYW1lJykpO1xyXG4gICAgICB2YXIgd2lkdGggPSAkKFwiLmJsb2NrLXRpdGxlXCIpLndpZHRoKCk7XHJcbiAgICAgIGlmICh2aXAgPT0gJzEnKSB7IC8vdmlwRmxhZ1xyXG4gICAgICAgICQoJy5oZWFkZXItbmF2JykuYWRkQ2xhc3MoJ3ZpcEZsYWcnKTtcclxuICAgICAgICAkKCcubXljai1yaWdodC1iYXInKS5hZGRDbGFzcygndmlwJyk7XHJcbiAgICAgICAgJCgnLm15Y2otcmlnaHQtd3JhcCcpLmNzcygnYmFja2dyb3VuZCcsICcjRjBFREU3Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLmhlYWRlci1uYXYnKS5yZW1vdmVDbGFzcygndmlwRmxhZycpO1xyXG4gICAgICAgICQoJy5teWNqLXJpZ2h0LWJhcicpLnJlbW92ZUNsYXNzKCd2aXAnKTtcclxuICAgICAgICAkKCcubXljai1yaWdodC13cmFwJykuY3NzKCdiYWNrZ3JvdW5kJywgJyNmMmYzZjUnKTtcclxuICAgICAgfVxyXG4gICAgICAkKCcuaGVhZGVyLW5hdiBsaScpLmVxKDApLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvZG9UeXBlT2JqID0ge1xyXG4gICAgICAgICd6b21iaWUnOiB7IHZhbDogJzEnLCB0eHQ6ICflg7XlsLjorqLljZUnIH0sXHJcbiAgICAgICAgJ3N5bkVycic6IHsgdmFsOiAnMicsIHR4dDogJ+WQjOatpeWksei0pScgfSxcclxuICAgICAgfVxyXG5cclxuICAgICAgJHNjb3BlLnRvZG9UeXBlID0gJHN0YXRlUGFyYW1zLnR5cGU7IC8v5b6F5Yqe5LqL6aG556eN57G7ICAgIDHjgILlg7XlsLjorqLljZUgIDIu5ZCM5q2l5aSx6LSlXHJcblxyXG4gICAgICAkc2NvcGUucGFnZU51bSA9ICcxJzsgLy/liIbpobXlvZPliY3pobXnoIFcclxuICAgICAgJHNjb3BlLnBhZ2VTaXplID0gJzIwJzsgLy/liIbpobXmr4/pobXlsZXnpLrmnaHmlbBcclxuICAgICAgJHNjb3BlLm9wdGlvbnMxID0geyAvL+WDteWwuOiuouWNlSDmk43kvZzmmI7nu4ZcclxuICAgICAgICAvLyAx77ya5YWo6aKd6YCA5qy+77yMMu+8mumDqOWIhumAgOasvu+8jDPvvJrpg6jliIblt7LphY3pvZDnmoTlj5HotKfvvIzmnKrphY3pvZDnmoTnu6fnu63nrYnlvoXvvIw077ya57un57ut562J5b6FXHJcbiAgICAgICAgJzEnOiB7IHZhbDogJzEnLCBjaDogJ+mAgOasvicsIGVuOiAnUmVmdW5kJyB9LFxyXG4gICAgICAgICcyJzogeyB2YWw6ICcyJywgY2g6ICfnu6fnu63nrYnlvoUnLCBlbjogJ0tlZXAgd2FpdGluZycgfSxcclxuICAgICAgICAnMyc6IHsgdmFsOiAnMycsIGNoOiAn5ouG5YiG6K6i5Y2V5Y+R6LSnJywgZW46ICdTcGxpdCBvcmRlciBzaGlwbWVudCcgfVxyXG4gICAgICB9O1xyXG4gICAgICAkc2NvcGUuaXNTaG93UGFnaW5nID0gdHJ1ZSAvL+aYr+WQpuWxleekuuWIhumhtVxyXG4gICAgICAkc2NvcGUuc3luRXJyQWxsQ2hlY2tlZCA9IGZhbHNlIC8v5ZCM5q2l5aSx6LSl6K6i5Y2V5YWo6YCJZmxhZ1xyXG5cclxuICAgICAgLyoqIOagueaNriB0b2RvVHlwZSDliqDovb3kuI3lkIzmlbDmja4gKi9cclxuICAgICAgc3dpdGNoQWpheEJ5VG9kb1R5cGUoKVxyXG5cclxuICAgICAgZnVuY3Rpb24gc3dpdGNoQWpheEJ5VG9kb1R5cGUoKSB7XHJcbiAgICAgICAgc3dpdGNoICgkc2NvcGUudG9kb1R5cGUpIHtcclxuICAgICAgICAgIGNhc2UgdG9kb1R5cGVPYmouem9tYmllLnZhbDpcclxuICAgICAgICAgICAgcXVlcnlPcmRlcm9ic2VydmVyKClcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgdG9kb1R5cGVPYmouc3luRXJyLnZhbDpcclxuICAgICAgICAgICAgZnVsZmlsbG1lbnRGYWlsZCgpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyB0YWIg6YCJ5oupXHJcbiAgICAgICRzY29wZS50b2R1VGFiQ2xpY2sgPSBmdW5jdGlvbiAodG9kb1R5cGUpIHtcclxuICAgICAgICAkc2NvcGUudG9kb1R5cGUgPSB0b2RvVHlwZVxyXG4gICAgICAgICRzY29wZS5wYWdlTnVtID0gJzEnXHJcbiAgICAgICAgJHNjb3BlLnBhZ2VTaXplID0gJzIwJ1xyXG5cclxuICAgICAgICBzd2l0Y2hBamF4QnlUb2RvVHlwZSgpXHJcbiAgICAgIH1cclxuICAgICAgLyoqIGdvYmFjayAqL1xyXG4gICAgICAkc2NvcGUuZ29iYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqIOWDteWwuOiuouWNlSDlvIDlp4sgKi9cclxuICAgICAgLy8gcXVlcnlPcmRlcm9ic2VydmVyKCk7XHJcbiAgICAgIGZ1bmN0aW9uIHF1ZXJ5T3JkZXJvYnNlcnZlcigpIHsgLy/lg7XlsLjorqLljZUg5YiX6KGoXHJcbiAgICAgICAgdmFyIHNlbmREYXRhID0ge1xyXG4gICAgICAgICAgdXNlcklkOiB1c2VySWQsXHJcbiAgICAgICAgICBzb3VzdW86ICcxJyxcclxuICAgICAgICAgIHNrdTogJzEnLFxyXG4gICAgICAgICAgcGFnZU51bTogKCRzY29wZS5wYWdlTnVtIC0gMSkgKiAoJHNjb3BlLnBhZ2VTaXplIC0gMCksXHJcbiAgICAgICAgICBwYWdlU2l6ZTogJHNjb3BlLnBhZ2VTaXplXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRzcC5sb2FkUGVyY2VudCgkKCcudG9kb2xpc3RXcmFwJyksICQod2luZG93KS5oZWlnaHQoKSAtIDE3MSwgNDcsIDApO1xyXG4gICAgICAgIGRzcC5wb3N0RnVuKCdlcnAvb2JzZXJ2ZXIvcXVlcnlPcmRlcm9ic2VydmVyJywgSlNPTi5zdHJpbmdpZnkoc2VuZERhdGEpLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YS5kYXRhKTtcclxuICAgICAgICAgIGRzcC5jbG9zZUxvYWRQZXJjZW50KCQoJy50b2RvbGlzdFdyYXAnKSk7XHJcbiAgICAgICAgICBpZiAoZGF0YS5kYXRhLnN0YXR1c0NvZGUgPT0gJzIwMCcpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnpvbWJpZUxpc3QgPSBkYXRhLmRhdGEucmVzdWx0O1xyXG4gICAgICAgICAgICAkLmVhY2goJHNjb3BlLnpvbWJpZUxpc3QsIGZ1bmN0aW9uIChpLCB2KSB7XHJcbiAgICAgICAgICAgICAgdi5pc1NlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIC8vIHYuZGVjaXNpb25NYWtpbmcgPSAnJztcclxuICAgICAgICAgICAgICB2LmRlY2lzaW9uTWFraW5nMiA9ICcnO1xyXG4gICAgICAgICAgICAgIHYuaXNTaG93UmVtYXJrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdmFyIGFyciA9IHR5cGVvZiB2LmRlY2lzaW9uTWFraW5nID09PSAnc3RyaW5nJyA/IHYuZGVjaXNpb25NYWtpbmcuc3BsaXQoJywnKSA6IFtdO1xyXG4gICAgICAgICAgICAgIHZhciBuZXdBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAkLmVhY2goYXJyLCBmdW5jdGlvbiAoaSwgdikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9ICRzY29wZS5vcHRpb25zMVt2XTtcclxuICAgICAgICAgICAgICAgIG5ld0Fyci5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB2LmRlY2lzaW9uTWFraW5nID0gbmV3QXJyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuem9tYmllTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuem9tYmllTGlzdC5sZW5ndGggPT09IDAgPyAkc2NvcGUuaXNTaG93UGFnaW5nID0gZmFsc2UgOiAkc2NvcGUuaXNTaG93UGFnaW5nID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgcXVlcnlCeWNvdW50KCk7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgZHNwLmNsb3NlTG9hZFBlcmNlbnQoJCgnLnRvZG9saXN0V3JhcCcpKSB9LCB7IGxheWVyOiB0cnVlIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHF1ZXJ5Qnljb3VudCgpIHsgLy/lg7XlsLjorqLljZUg5oC75p2h5pWwXHJcbiAgICAgICAgdmFyIHNlbmREYXRhID0ge1xyXG4gICAgICAgICAgdXNlcklkOiB1c2VySWRcclxuICAgICAgICB9XHJcbiAgICAgICAgZHNwLnBvc3RGdW4oJ2VycC9vYnNlcnZlci9xdWVyeUJ5Y291bnQnLCBKU09OLnN0cmluZ2lmeShzZW5kRGF0YSksIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgJHNjb3BlLnRvdGFsQ291bnRzID0gZGF0YS5kYXRhLnJlc3VsdFswXS5udW0gKiAxO1xyXG4gICAgICAgICAgaW1wb3J0RnVuKCk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5vcGVuU2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHsgLy/lg7XlsLjorqLljZUgIOWIhuWNleS7o+W8gOWFs+mXrVxyXG4gICAgICAgIGlmIChpdGVtLmlzU2VsZWN0KSB7XHJcbiAgICAgICAgICBpdGVtLmlzU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAkc2NvcGUuY2hlY2tTZWxlY3QgPSBmdW5jdGlvbiAodmFsLCBpdGVtKSB7XHJcbiAgICAgICAgaXRlbS5kZWNpc2lvbk1ha2luZzIgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICAgLy/kv53lrZhcclxuICAgICAgJHNjb3BlLmNvbmZpcm1GdW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnpvbWJpZUxpc3QpO1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAkLmVhY2goJHNjb3BlLnpvbWJpZUxpc3QsIGZ1bmN0aW9uIChpLCB2KSB7XHJcbiAgICAgICAgICBpZiAoISh2LmRlY2lzaW9uTWFraW5nMiA9PSAnJykpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgb3JkZXJJZDogdi5vcmRlcklkLFxyXG4gICAgICAgICAgICAgIG9yZGVyUHJvZHVjdElkOiB2Lm9yZGVyUHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIGRlY2lzaW9uTWFraW5nOiB2LmRlY2lzaW9uTWFraW5nMixcclxuICAgICAgICAgICAgICBza3U6IHYuc2t1LFxyXG4gICAgICAgICAgICAgIHF1ZWh1bzogdi5xdWVodW9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnIucHVzaChkYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIGxheWVyLm1zZygnUGxlYXNlIG9wZXJhdGUgYSBwaWVjZSBvZiBkYXRhIGZpcnN0Jyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGFycik7XHJcbiAgICAgICAgdmFyIHNlbmREYXRhID0ge1xyXG4gICAgICAgICAgYWNjb3VudDogJzAnLFxyXG4gICAgICAgICAgdXNlcklkOiB1c2VySWQsXHJcbiAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShhcnIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxheWVyLmxvYWQoMilcclxuICAgICAgICBkc3AubG9hZCgpXHJcbiAgICAgICAgZHNwLnBvc3RGdW4oJ2VycC9vYnNlcnZlci91cGRhdGVBY2NvdW50T3JkZXJvYicsIEpTT04uc3RyaW5naWZ5KHNlbmREYXRhKSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgIGRzcC5jbG9zZUxvYWQoKVxyXG4gICAgICAgICAgbGF5ZXIubXNnKGRhdGEuZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgIHF1ZXJ5T3JkZXJvYnNlcnZlcigpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgZHNwLmNsb3NlTG9hZCgpIH0sIHsgbGF5ZXI6IHRydWUgfSlcclxuICAgICAgfVxyXG4gICAgICAkc2NvcGUub3BlblJlbWFyayA9IGZ1bmN0aW9uIChpdGVtLCBib29sZW4pIHtcclxuICAgICAgICBpdGVtLmlzU2hvd1JlbWFyayA9IGJvb2xlbjtcclxuICAgICAgfVxyXG4gICAgICAkc2NvcGUubmF2VG9EZXRhaWwgPSBmdW5jdGlvbiAoaWQsIGlzUmVhZCkgey8v5p+l55yL6K6i5Y2V6K+m5oOFXHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICBjb25zdCBuYXZVcmwgPSBgL29yZGVyLWRldGFpbC8ke2lkfS8xYDtcclxuICAgICAgICAgIGlmICghaXNSZWFkKSB7XHJcbiAgICAgICAgICAgIGxheWVyLmxvYWQoMilcclxuICAgICAgICAgICAgZHNwLm15cG9zdCgnY2ovZmJhT3JkZXIvcmVhZGZ1bGZpbGxtZW50RmFpbCcsIHsgaWRzOiBpZCArICcnIH0pLnRoZW4ocmVzID0+IHsgY29uc29sZS5sb2coJ25hdlRvRGV0YWlsIHJlcyA9PiAnLCByZXMpIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aChuYXZVcmwpO1xyXG4gICAgICAgIH0gZWxzZSBsYXllci5tc2coJ2lkIGlzIG5vdCBmb3VuZCcpXHJcbiAgICAgIH1cclxuICAgICAgJHNjb3BlLm1zZ2JveFNob3cgPSBmYWxzZTtcclxuICAgICAgJHNjb3BlLmNsZWFyQWxsY29uZmlybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xlYXJBbGxjb25maXJtJylcclxuICAgICAgICAkc2NvcGUuaWdub3JlSWRzID0gJHNjb3BlLnN5bkVyckxpc3QgJiYgJHNjb3BlLnN5bkVyckxpc3QubWFwKCh7IElEIH0pID0+IElEKS5qb2luKCcsJyk7XHJcbiAgICAgICAgJHNjb3BlLm1zZ2JveFNob3cgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5jbGVhckFsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc2NvcGUubXNnYm94U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGlkcyA9ICRzY29wZS5pZ25vcmVJZHNcclxuICAgICAgICBpZiAoaWRzKSB7XHJcbiAgICAgICAgICBsYXllci5sb2FkKDIpXHJcbiAgICAgICAgICBkc3AubXlwb3N0KCdjai9mYmFPcmRlci9yZW1vdmVmdWxmaWxsbWVudEZhaWwnLCB7IGlkcyB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGVhckFsbCByZXMgPT4gJywgcmVzKVxyXG4gICAgICAgICAgICAvLyBsYXllci5tc2coJ3N1Y2Nlc3MnKVxyXG4gICAgICAgICAgICBzd2l0Y2hBamF4QnlUb2RvVHlwZSgpLy/ph43mlrDojrflj5bmlbDmja5cclxuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgbGF5ZXIubXNnKCdJZ25vcmUgRmFpbGVkJylcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8qKiDlg7XlsLjorqLljZXnu5PmnZ8gKi9cclxuXHJcbiAgICAgIC8qKiDlkIzmraXlpLHotKXorqLljZUg5byA5aeLKi9cclxuICAgICAgZnVuY3Rpb24gZnVsZmlsbG1lbnRGYWlsZCgpIHsgICAvL+iOt+WPluWQjOatpeWksei0peiuouWNlVxyXG4gICAgICAgIGxldCBzZW5kRGF0YSA9IHtcclxuICAgICAgICAgIG9mZnNldDogJHNjb3BlLnBhZ2VOdW0sXHJcbiAgICAgICAgICBjb3VudDogJHNjb3BlLnBhZ2VTaXplXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRzcC5sb2FkUGVyY2VudCgkKCcudG9kb2xpc3RXcmFwJyksICQod2luZG93KS5oZWlnaHQoKSAtIDE3MSwgNDcsIDApO1xyXG4gICAgICAgIGRzcC5wb3N0RnVuKCdjai9mYmFPcmRlci9mdWxmaWxsbWVudEZhaWxkJywgSlNPTi5zdHJpbmdpZnkoc2VuZERhdGEpLCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICBkc3AuY2xvc2VMb2FkUGVyY2VudCgkKCcudG9kb2xpc3RXcmFwJykpO1xyXG5cclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXNDb2RlID09PSAnMjAwJykge1xyXG4gICAgICAgICAgICAkc2NvcGUuc3luRXJyTGlzdCA9IHJlcy5kYXRhLnJlc3VsdC5saXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICBpdGVtLmlzQ2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJHNjb3BlLm5vdFJlYWQgPSAkc2NvcGUuc3luRXJyTGlzdC5maWx0ZXIoKHsgaXNSZWFkIH0pID0+IGlzUmVhZCA9PSAwKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbENvdW50cyA9IHJlcy5kYXRhLnJlc3VsdC50b3RhbFxyXG4gICAgICAgICAgICAkc2NvcGUuc3luRXJyTGlzdC5sZW5ndGggPT09IDAgPyAkc2NvcGUuaXNTaG93UGFnaW5nID0gZmFsc2UgOiAkc2NvcGUuaXNTaG93UGFnaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICBpbXBvcnRGdW4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnN5bkVyckxpc3QpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyBkc3AuY2xvc2VMb2FkUGVyY2VudCgkKCcudG9kb2xpc3RXcmFwJykpIH0sIHsgbGF5ZXI6IHRydWUgfSlcclxuICAgICAgfVxyXG4gICAgICAkc2NvcGUudGltZUZvcm1hdCA9IGZ1bmN0aW9uICh0aW1lc3RhbXAsIG9wdGlvbiA9IHt9KSB7XHJcbiAgICAgICAgaWYgKCF0aW1lc3RhbXApIHJldHVybiAnJztcclxuICAgICAgICB2YXIgdGltZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XHJcbiAgICAgICAgZnVuY3Rpb24gZml4KHQpIHtcclxuICAgICAgICAgIHQgKz0gJyc7XHJcbiAgICAgICAgICByZXR1cm4gdC5sZW5ndGggPT09IDEgPyAnMCcgKyB0IDogdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHllYXIgPSB0aW1lLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gdGltZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICB2YXIgZGF0ZSA9IHRpbWUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBob3VycyA9IGZpeCh0aW1lLmdldEhvdXJzKCkpO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gZml4KHRpbWUuZ2V0TWludXRlcygpKTtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IGZpeCh0aW1lLmdldFNlY29uZHMoKSk7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBvcHRpb247XHJcbiAgICAgICAgaWYgKCF0eXBlKSByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF0ZSArICcgJyArIGhvdXJzICsgJzonICsgbWludXRlcyArICc6JyArIHNlY29uZHM7XHJcbiAgICAgIH1cclxuICAgICAgLy/lhajpgIlcclxuICAgICAgJHNjb3BlLmNsaWNrQWxsQ2hlY2tlZCA9ICgpID0+IHtcclxuICAgICAgICAkc2NvcGUuc3luRXJyQWxsQ2hlY2tlZCA9ICEkc2NvcGUuc3luRXJyQWxsQ2hlY2tlZFxyXG4gICAgICAgICRzY29wZS5zeW5FcnJMaXN0ID0gJHNjb3BlLnN5bkVyckxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaXRlbS5pc0NoZWNrZWQgPSAkc2NvcGUuc3luRXJyQWxsQ2hlY2tlZFxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8v5Y2V5Ye7Y2hlY2tib3hcclxuICAgICAgJHNjb3BlLmNsaWNrT25lQ2hlY2tlZCA9ICh7IElEIH0pID0+IHtcclxuICAgICAgICAkc2NvcGUuc3luRXJyTGlzdCA9ICRzY29wZS5zeW5FcnJMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgIGlmKGl0ZW0uSUQgPT09IElEKSBpdGVtLmlzQ2hlY2tlZCA9ICFpdGVtLmlzQ2hlY2tlZFxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IGNoZWNrZWRMZW4gPSAkc2NvcGUuc3luRXJyTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzQ2hlY2tlZCkubGVuZ3RoXHJcbiAgICAgICAgJHNjb3BlLnN5bkVyckFsbENoZWNrZWQgPSBjaGVja2VkTGVuID09PSAkc2NvcGUuc3luRXJyTGlzdC5sZW5ndGhcclxuICAgICAgfVxyXG4gICAgICAvL2lnbm9yZemAieS4reiuouWNlVxyXG4gICAgICAkc2NvcGUuaWdub3JlT3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9ICRzY29wZS5zeW5FcnJMaXN0ICYmICRzY29wZS5zeW5FcnJMaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uaXNDaGVja2VkKSB8fCBbXVxyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgIGxheWVyLm1zZygnUGxlYXNlIGNoZWNrZWQgb3JkZXJzJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJHNjb3BlLmlnbm9yZUlkcyA9IGxpc3QubWFwKCh7IElEIH0pID0+IElEKS5qb2luKCcsJyk7XHJcbiAgICAgICAgICAkc2NvcGUubXNnYm94U2hvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAvKiog5ZCM5q2l5aSx6LSl6K6i5Y2VIOe7k+adnyAqL1xyXG5cclxuICAgICAgZnVuY3Rpb24gaW1wb3J0RnVuKCkge1xyXG4gICAgICAgICQoXCIucGFnaW5hdGlvbi1kZW1vMVwiKS5qcVBhZ2luYXRvcih7XHJcbiAgICAgICAgICB0b3RhbENvdW50czogJHNjb3BlLnRvdGFsQ291bnRzIHx8IDEsIC8v6K6+572u5YiG6aG155qE5oC75p2h55uu5pWwXHJcbiAgICAgICAgICBwYWdlU2l6ZTogJHNjb3BlLnBhZ2VTaXplIC0gMCwgLy/orr7nva7mr4/kuIDpobXnmoTmnaHnm67mlbBcclxuICAgICAgICAgIHZpc2libGVQYWdlczogNSxcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAkc2NvcGUucGFnZU51bSAqIDEsXHJcbiAgICAgICAgICBhY3RpdmVDbGFzczogJ2FjdGl2ZScsXHJcbiAgICAgICAgICBmaXJzdDogJzxsaSBjbGFzcz1cImZpcnN0XCI+PGEgY2xhc3M9XCJwcmV2XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj4mbHQmbHQ7PFxcL2E+PFxcL2xpPicsXHJcbiAgICAgICAgICBwcmV2OiAnPGxpIGNsYXNzPVwicHJldlwiPjxhIGNsYXNzPVwicHJldlwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+Jmx0OzxcXC9hPjxcXC9saT4nLFxyXG4gICAgICAgICAgbmV4dDogJzxsaSBjbGFzcz1cIm5leHRcIj48YSBjbGFzcz1cIm5leHRcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiPiZndDs8XFwvYT48XFwvbGk+JyxcclxuICAgICAgICAgIGxhc3Q6ICc8bGkgY2xhc3M9XCJsYXN0XCI+PGEgY2xhc3M9XCJwcmV2XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIj4mZ3QmZ3Q7PFxcL2E+PFxcL2xpPicsXHJcbiAgICAgICAgICBwYWdlOiAnPGxpIGNsYXNzPVwicGFnZVwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCI+e3twYWdlfX08XFwvYT48XFwvbGk+JyxcclxuICAgICAgICAgIG9uUGFnZUNoYW5nZTogZnVuY3Rpb24gKG4sIHR5cGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobilcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codHlwZSlcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2luaXQnKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5wYWdlTnVtID0gbiArICcnO1xyXG4gICAgICAgICAgICAkc2NvcGUuem9tYmllTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBzd2l0Y2hBamF4QnlUb2RvVHlwZSgpO1xyXG4gICAgICAgICAgICAvLyAkc2NvcGUub3JkZXJzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAvLyA7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgICRzY29wZS5wYWdlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzY29wZS5wYWdlTnVtID0gJzEnO1xyXG4gICAgICAgIHN3aXRjaEFqYXhCeVRvZG9UeXBlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRzY29wZS5nb3RvUGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcGFnZW51bSA9IE51bWJlcigkc2NvcGUucGFnZU51bSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFnZW51bSk7XHJcbiAgICAgICAgdmFyIHRvdGFscGFnZSA9IE1hdGguY2VpbCgkc2NvcGUudG90YWxDb3VudHMgLyAkc2NvcGUucGFnZVNpemUpO1xyXG4gICAgICAgIGlmIChwYWdlbnVtID4gdG90YWxwYWdlKSB7XHJcbiAgICAgICAgICBsYXllci5tc2coJ0Vycm9yIHBhZ2UnKTtcclxuICAgICAgICAgICRzY29wZS5wYWdlTnVtID0gJzEnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2l0Y2hBamF4QnlUb2RvVHlwZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH1dKTtcclxuXHJcbiAgcmV0dXJuIGFwcDtcclxuXHJcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQXZCQTtBQXlCQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../src/pages/mycj/todo-list/todo-list.js\n");

/***/ })

}]);