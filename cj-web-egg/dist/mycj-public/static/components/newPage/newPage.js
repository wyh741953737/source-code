(function (angular) {

  /**
   * 解决一个页面无法使用多个page的问题
   * changePageId 与 getPageId 这两个参数为广播参数
   * 建议命名为newPage_change_yourname 诸如这种方式 默认为 page-data 与 pagedata-fa
   */
  angular.module('cjCompnentModule')
    .component('newPage', {
      templateUrl: '/static/components/newPage/newPage.html',
      controller: pageCtrl,
      controllerAs: 'vm',
      bindings: {
        changePageId: "=",
        getPageId:"=",
        pageObj:'<',
        callback:'<'
      }
    })

  function pageCtrl($scope, dsp) {
    let vm = this;
    this.$onInit = ()=>{
      $scope.callback = this.callback;
    }
    this.$onChanges=(data)=>{
      const {pageObj={}} = data;
      if(pageObj.currentValue){
        $scope.pageObj = pageObj.currentValue;
        totalNum = $scope.pageObj.totalNum;
        setTimeout(()=>{
          pageFun();
        },0)
      }
    }

    $scope.pagesizeList = ['10', '20', '50']
    $scope.numberInput = function () {
      $scope.pageObj.pageNum = $scope.pageObj.pageNum.replace(/[^\d]/, "");
    }
    $scope.changeFun = function (type) {
      if ($scope.pageObj.pageNum > totalNum || $scope.pageObj.pageNum == 0) {
        $scope.pageObj.pageNum = totalNum;
      }
      if (type == 'size') {
        $scope.pageObj.pageNum = '1';
      }
      // $scope.$emit(`${vm.getPageId}`, $scope.pageObj);
      $scope.callback($scope.pageObj);
    }

    function pageFun() {
      $(`#${vm.changePageId}`).jqPaginator({
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
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') {
            return;
          };
          console.log(n)
          $scope.pageObj.pageNum = n.toString();
          $scope.callback($scope.pageObj)
        }
      });
    }
  }
})(angular);