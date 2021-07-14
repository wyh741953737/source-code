import template from './page.html';

export function paginationFactory(module) {
  module.component('page', {
    template,
    controller: ['$scope', function ($scope) {
      this.$onInit = () => pageCtrl($scope);
    }],
    bindings: {
      totalnum: '=',
      totalcounts: '=',
      onLog: '&'
    }
  });

  function pageCtrl($scope) {
    let totalNum;
    $scope.$on('page-data', function (d, data) {
      $scope.pageObj = {
        pageSize: data.pageSize,//当前页数
        pageNum: data.pageNum,//页码
        totalNum: data.totalNum,//总页数
        totalCounts: data.totalCounts,//总条数
        pagesizeList: data.pagesizeList ? data.pagesizeList : ['10', '20', '50'],//页数列表
        totalText: data.totalCounts > 1 ? 'Records':'Record', //显示记录文字 (解决翻译显示问题)
      }
      totalNum = data.totalNum;
      console.log('pageObj',$scope.pageObj)
      pageFun();
    })

    $scope.pagesizeList = ['10', '20', '50']
    $scope.numberInput = function () {
      $scope.pageObj.pageNum = $scope.pageObj.pageNum.replace(/[^\d]/g, "");
    }
    $scope.changeFun = function (type) {
      if ($scope.pageObj.pageNum > totalNum || $scope.pageObj.pageNum == 0) {
        $scope.pageObj.pageNum = totalNum;
      }
      if (type == 'size') {
        $scope.pageObj.pageNum = '1';
      }
      $scope.$emit('pagedata-fa', $scope.pageObj);
    }

    function pageFun() {
      $(".page-index").jqPaginator({
        totalCounts: Number($scope.pageObj.totalCounts) || 1,
        totalNum: Number($scope.pageObj.totalNum) || 1,
        pageSize: Number($scope.pageObj.pageSize),
        visiblePages: 5,
        currentPage: Number($scope.pageObj.pageNum),
        activeClass: 'current',
        first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        last: '<a class="next" href="javascript:void(0);">&gt;&gt;<\/a>',
        page: '<a class="notranslate" href="javascript:void(0);">{{page}}<\/a>', //页数不翻译
        onPageChange: function (n, type) {
          if (type == 'init') {
            return;
          };
          console.log(n)
          $scope.pageObj.pageNum = n.toString();
          $scope.$emit('pagedata-fa', $scope.pageObj);
        }
      });
    }
  }
}