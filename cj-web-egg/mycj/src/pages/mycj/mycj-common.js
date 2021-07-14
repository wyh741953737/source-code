
//分页
export function pageFun($scope, changeCb = () => {}) {
  if (typeof $scope !== 'object') {
    console.error('参数 $scope 错误', $scope);
    return;
  }
  $(".page-index").jqPaginator({
    totalCounts: $scope.totalPageNum,
    pageSize: $scope.pageSize * 1,
    visiblePages: 5,
    currentPage: $scope.pageNum * 1,
    activeClass: 'current',
    prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
    next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
    page: '<a href="javascript:void(0);">{{page}}<\/a>',
    first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
    last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
    onPageChange: function (n, type) {
      if (type == 'init') return;
      changeCb(n);
    }
  });
};

//分页
export function pageFunWithParams(node, totalnum = 1, pagesize = 10, currentnum = 1, change = () => {}) {
  console.log(totalnum, pagesize, currentnum);
  node.jqPaginator({
    totalCounts: +totalnum,
    pageSize: +pagesize,
    visiblePages: 5,
    currentPage: +currentnum,
    activeClass: 'current',
    first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
    prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
    next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
    last: '<a class="prev" href="javascript:void(0);">&gt;&gt;<\/a>',
    page: '<a href="javascript:void(0);">{{page}}<\/a><\/li>',
    onPageChange: change,
  });
}