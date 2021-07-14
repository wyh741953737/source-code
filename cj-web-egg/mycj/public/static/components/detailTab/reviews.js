;
(function (angular) {

  angular.module('cjCompnentModule')
    .component('productReviews', {
      templateUrl: './static/components/detailTab/reviews.html',
      controller: reviewsCtrl,
      controllerAs: 'vm',
      bindings: {
        productId: '='
      },
    })

  function reviewsCtrl($scope, $timeout, dsp, cjhome, utils, $filter, $window) {
    const API = {
      // listUrl: "cj/crawlerComment/commentPage", // 列表接口
      listUrl: "cj/crawlerComment/commentPageV201", // 列表接口
      downUrl: "cj/crawlerComment/exportCrawlerComment",  // 下载文件
    }

    $scope.reviewList = [];
    $scope.pageNum = 1;
    $scope.pageSize = 10;
    $scope.total = 10;

    // 分页器请求id
    $scope.changePageId = "pagation_reviews_change"
    $scope.getPageId = "pagation_reviews_get"

    // 大图展示
    $scope.currentImgIndex = 0
    $scope.showBigImg = showBigImg 
    $scope.handleClose = handleClose
    $scope.changeLeftImg = changeLeftImg
    $scope.changeRightImg = changeRightImg
    $scope.chooseReviewId = ""

    // 展示指引
    $scope.tutorialVisible = false
    $scope.showTutorial = showTutorial
    $scope.hideTutorial = hideTutorial

    // 下载评论
    $scope.downReviewCsv = downReviewCsv

    this.$onInit = function () {
      vm = this
      init()
    };

    /* init */
    function init() {
      getList()
    }

    /* getList */
    function getList(){
      const params = {
        pageNumber: $scope.pageNum,
        pageSize: $scope.pageSize,
        productId: vm.productId,
        score: 3 // 获取三分及以上的列表
      }
      const url = API.listUrl
      dsp.postFun(url, params, (res) => {
        console.log(res);
        const {
          data
        } = res
        if (data.statusCode == "200") {
          $scope.reviewList = data.result.list || []
          $scope.total = data.result.total || 0
          initChangePage()
        }
        handleImg()
      }, (err) => {});
    }

    /* 下载评论 */
    function downReviewCsv() {
      const params = {
        productId: vm.productId,
      }
      const url = API.downUrl
      if($scope.reviewList.length<=0){
        return;
      }
      dsp.postFun(url, params, (res) => {
        console.log(res);
        const {
          data
        } = res
        const aLink = document.createElement('a')
        const blob = new Blob([data])
        const link = window.URL.createObjectURL(blob)
        aLink.href = link
        document.body.appendChild(aLink)
        aLink.style.display = 'none'
        aLink.download = `reviews.csv`
        aLink.click()
        document.body.removeChild(aLink)
      }, (err) => {});

    }

    /* pagation */

    /** 请求后重新渲染分页器 */ 
    function initChangePage(){
      const totalPageNum =  Math.ceil($scope.total/$scope.pageSize);
      $scope.pageObj = {
        pageNum:$scope.pageNum,
        pageSize: $scope.pageSize + "",
        totalNum: totalPageNum,
        totalCounts: $scope.total+"",
        pagesizeList: ["5", "10", "15"]
      }
    }
    $scope.pageCallback = (data)=>{
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      location.href = "#reviewsTop";
      getList()
    }
    /* img show */
    function showBigImg(id,index){
      $scope.currentImgIndex = index
      $scope.chooseReviewId = id
      $(`#reviewImg_${id}`).css({"height":"334px","marginBottom":"10px"})
    } 

    function handleClose(id){
      $scope.chooseReviewId = ""
      $(`#reviewImg_${id}`).css({"height":"0px","marginBottom":"0px"})
    }

    function changeLeftImg(){
      if($scope.currentImgIndex>0){
        $scope.currentImgIndex = $scope.currentImgIndex-1
      }
    } 

    function changeRightImg(list){
      const limitNum = list.length-1
      if($scope.currentImgIndex<limitNum){
        $scope.currentImgIndex = $scope.currentImgIndex+1
      }
    }

    /* 处理data的方法 */
    handleImg = () => {
      const list = $scope.reviewList.map((item) => {
        if (item.images) {
          const imglist = item.images.split(",")
          item.imglist = imglist
        }
        return item
      })
      $scope.reviewList = list
    }

    /* 操作指引 */
    function showTutorial(){
      $scope.tutorialVisible = true;
      forbidScroll()
    } 

    function hideTutorial(){
      $scope.tutorialVisible = false;
      permitScroll()
    }

    function forbidScroll () { // 禁止滚动
      document.body.addEventListener('touchmove', bodyScroll, false);
      angular.element('body').css({ 'position': 'fixed', "width": "100%" });
      angular.element('.pd-con-wrap').css({ 'position': 'relative', 'zIndex': 101 });
    }
    function permitScroll () { // 放开滚动
        document.body.removeEventListener('touchmove', bodyScroll, false);
        angular.element("body").css({ "position": "initial", "height": "auto" });
        angular.element('.pd-con-wrap').css({ 'position': 'static', 'zIndex': 101 });
    }
    function bodyScroll(event) {
      event.preventDefault();
    }
  }
})(angular)