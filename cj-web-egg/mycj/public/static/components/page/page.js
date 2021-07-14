(function (angular) {

    angular.module('cjCompnentModule')
        .component('page', {
            templateUrl: '/static/components/page/page.html',
            controller: pageCtrl,
            bindings: {
                totalnum: '=',
                totalcounts: '=',
                onLog: '&',
                pageData:'<'
            }
        })

    function pageCtrl($scope, dsp) {
        let totalNum;

        //推荐使用此法传值，单项数据流
        this.$onChanges = (data)=>{
            if(data.pageData && data.pageData.currentValue){
                $scope.pageObj = data.pageData.currentValue
                totalNum = $scope.pageObj.totalNum;
                pageFun();
            }
        }

        //太多广播监听可能会导致脏检查失效并且效率低，会出现监听不到的情况
        $scope.$on('page-data', function (d, data) {
            $scope.pageObj = {
                pageSize: data.pageSize,//当前页数
                pageNum: data.pageNum,//页码
                totalNum: data.totalNum,//总页数
                totalCounts: data.totalCounts,//总条数
                pagesizeList:data.pagesizeList?data.pagesizeList:['10', '20', '50']//页数列表
            }
            totalNum = data.totalNum;
            pageFun();
        })

        $scope.pagesizeList = ['10', '20', '50']
        $scope.numberInput = function () {
            $scope.pageObj.pageNum = $scope.pageObj.pageNum.replace(/[^\d]/, "");
        }
        $scope.changeFun = function (type) {
            if($scope.pageObj.pageNum>totalNum || $scope.pageObj.pageNum==0){
                $scope.pageObj.pageNum = totalNum;
            }
            if(type=='size'){
                $scope.pageObj.pageNum='1';
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
                page: '<a href="javascript:void(0);">{{page}}<\/a>',
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
})(angular);