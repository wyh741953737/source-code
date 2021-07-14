(function (Base64) {
  var app = angular.module("evalute", [
    "service",
    "home-service",
    "cjCompnentModule",
    "cjDirectiveModule",
    "CommonHeaderCom",
    "CommonFooterCom",
    "custom-filter",
    'cjDotModule'
  ]);
  // // 创建组件模块
  angular.module("cjCompnentModule", ["utils"]);
  app.directive("dynamicScrollbar", function () {
    return function (scope, element, attrs) {
      element.bind("DOMMouseScroll mousewheel onmousewheel", function (event) {
        console.log(element[0], event);
        if (timer) {
          claerTimeout(timer);
        }
        element[0].classList.add("dynamic-scroll");
        var timer = setTimeout(() => {
          element[0].classList.remove("dynamic-scroll");
        }, 1000);
      });
    };
  });
  app.controller("evaluteCtrl", [
    "$scope",
    "$document",
    "$timeout",
    "$window",
    "dsp",
    "$window",
    "$sce",
    "$rootScope",
    "$location",
    "$anchorScroll",
    "utils",
    function (
      $scope,
      $document,
      $timeout,
      $watch,
      dsp,
      $window,
      $sce,
      $rootScope,
      $location,
      $anchorScroll,
      utils
    ) {
      if(!(dsp.isInLoginState())) {
        window.location.href = '/home.html';
      }
      let bs = new Base64();
      $scope.avatar = localStorage.getItem("avatar")
        ? bs.decode(localStorage.getItem("avatar"))
        : ""; // 取当前用户头像
      $scope.supplierList = [];
      $scope.currentType = 0; /* 当前菜单 */
      $scope.isModify = 1; // 用来判断是否可以评价
      $scope.currentSupplier = null; // 当前聊天的供应商
      $scope.currentEvalute = null; // 当前聊天的详情
      $scope.currentEvaluteNumberArray = [];
      /* 评价菜单种类  未回复 已回复 传值 分别为0、1 */
      $scope.evaluateType = [
        {
          name: "Unvalued",
          value: 0,
          iconfont: "icongyspj",
          style: {
            "font-size": "20px",
          },
        },
        {
          name: "Rated",
          value: 1,
          iconfont: "yipingjia",
        },
      ];
      $scope.evaluteDescList = [
        [
          "Feel quite irritated with it. The product does not match the description.",
          "Not satisfied. Product is partially broken, not good as described.",
          "The quality is poor, not as good as description.",
          "High quality product. I’m very satisfied with the product.",
          "Perfect! Very happy with product and it’s exactly what I want.",
        ],
        [
          "The supplier even scolds others and don’t take customers seriously.",
          "A little impatient and the service they promised could not be fulfilled.",
          "Answer very late, and it’s a difficult communication.",
          "Good! The supplier replies very quick.",
          "Wonderful! They are very thoughtful, better than expected. I will recommend it.",
        ],
        [
          "Waited for shipping so long! You’re ruining my time. The packaging is too bad.",
          "Shipping delayed! You will send it out only after expediting many times.",
          "The delivery speed is average.",
          "Item arrives on time with reasonable shipping cost.",
          "Fast delivery! The product is well packed.",
        ],
      ];

      $scope.evaluteTypeClick = function (i) {
        /* 评价菜单点击事件 */
        $scope.currentType = i;
        $scope.evaluteContent = '';
        getSupplierList(i);
      };

      $scope.evaluateList = [
        /* 评价列表 */
        {
          key: 0,
          title: "Item as Described",
          value: 5,
          desc: "Satified. The quality is the same as the description.",
        },
        {
          key: 1,
          title: "Communication",
          value: 5,
          desc: "Service is awesome, better than expected.",
        },
        {
          key: 2,
          title: "Shipping Speed",
          value: 5,
          desc:
            "Upset, shipping delayed!!! After several times expediting and shipped finally.",
        },
      ];

      /* 获取供应商列表 */

      function getSupplierList(isEvaluate) {
        dsp.postFun(
          "cjEvaluation/getSupplierInfoByUserId",
          {
            isEvaluate: isEvaluate,
          },
          function (res) {
            if (res.status === 200 && res.data.code === 200) {
              $scope.supplierList = res.data.data;
              $scope.isModify = isEvaluate;
              if (res.data.data.length > 0) {
                $scope.currentSupplier = res.data.data[0];
                getEvaluteDetail(res.data.data[0].id);
              }
            }
            console.log("供应商列表", res);
          },
          function (data) {}
        );
      }
      /* 通过评价id获取评价详情 */
      function getEvaluteDetail(id) {
        dsp.postFun(
          "cjEvaluation/getSupplierInfoById",
          { id: id },
          function (res) {
            if (res.status === 200 && res.data.code === 200) {
              $scope.currentEvalute = res.data.data;
              $scope.currentEvaluteNumberArray = [
                res.data.data.goodsMatch,
                res.data.data.answerSpeed,
                res.data.data.deliverySpeed,
              ];
            }
            console.log("评价详情", res);
          },
          function (data) {}
        );
      }
      getSupplierList(0);

      $scope.submitEvalute = function () {
        if ($scope.currentEvalute.isEvaluate === 0) {
          // 如果三个选项都未填并且内容也未填，需要提示 必须填一项
          if (
            !$scope.currentEvaluteNumberArray.some((i) => i) &&
            !$scope.evaluteContent
          ) {
            layer.msg("Please comment.");
            return;
          }
         
          
          var params = {
            id: $scope.currentEvalute.id,
            goodsMatch: $scope.currentEvaluteNumberArray[0] || null,
            answerSpeed: $scope.currentEvaluteNumberArray[1] || null,
            deliverySpeed: $scope.currentEvaluteNumberArray[2] || null,
            content: $scope.evaluteContent,
          };
          dsp.postFun(
            "cjEvaluation/insertEvaluationGradeAndContent",
            params,
            function (res) {
              console.log("提交结果", res);
              if (res.status === 200 && res.data.code === 200) {
                layer.msg("Thank you for your review.");
                $scope.evaluteContent = "";
                getSupplierList($scope.currentType);
              }
            },
            function (data) {}
          );
        } else {
          if (!$scope.evaluteContent) {
            layer.msg("Please comment.");
            return;
          }
          if($scope.currentEvalute.talks && $scope.currentEvalute.talks.length > 1 && $scope.currentEvalute.talks[$scope.currentEvalute.talks.length -1].messageSource === 1) {
            layer.msg("Please wait for the supplier to reply.");
            return;
          } 
          var params = {
            evalId: $scope.currentEvalute.id,
            id: $scope.currentEvalute.talks
              ? $scope.currentEvalute.talks[
                  $scope.currentEvalute.talks.length - 1
                ].id
              : "",
            content: $scope.evaluteContent,
          };
          dsp.postFun(
            "cjEvaluation/replyEvaluation",
            params,
            function (res) {
              console.log("提交结果", res);
              if (res.status === 200 && res.data.code === 200) {
                layer.msg("Thank you for your review.");
                $scope.evaluteContent = "";
                getEvaluteDetail($scope.currentEvalute.id);
              }
            },
            function (data) {}
          );
        }
      };

      $scope.confirmModify = function () {
        var params = {
          id: $scope.currentEvalute.id,
          goodsMatch: parseInt($scope.currentEvaluteNumberArray[0]) || null,
          answerSpeed: parseInt($scope.currentEvaluteNumberArray[1]) || null,
          deliverySpeed: parseInt($scope.currentEvaluteNumberArray[2]) || null,
        };
        dsp.postFun(
          "cjEvaluation/insertEvaluationGradeAndContent",
          params,
          function (res) {
            console.log("提交结果", res);
            if (res.status === 200 && res.data.code === 200) {
              layer.msg("Thank you for your review.");
              getEvaluteDetail($scope.currentEvalute.id);
              $scope.isModify = !$scope.isModify;
            } else if (res.data.code === 5000023 && res.data.error === '评价时间在一月内不允许再次评价') {
              layer.msg("Evaluation time is not allowed to re-evaluate within one month.");
              $scope.isModify = !$scope.isModify;
            }  else {
              layer.msg(res.data.error);
            }
          },
          function (data) {}
        );
      };

      $scope.changeSupplier = function (id) {
        $scope.evaluteContent = '';
        getEvaluteDetail(id);
      };

      $scope.changeModifyStatus = function () {
        $scope.isModify = !$scope.isModify;
      };
    },
  ]);
})(Base64);
