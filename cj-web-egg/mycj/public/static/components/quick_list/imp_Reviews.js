;
(function (angular) {

  angular.module('cjCompnentModule')
    .component('impReview', {
      templateUrl: './static/components/quick_list/imp_Reviews.html',
      controller: impReviewsCtrl,
      controllerAs: 'vm',
      bindings: {
        isImport: '=',
        starPool: '=',
        productId: '='
      },
    })

  function impReviewsCtrl($scope, $timeout, dsp, cjhome, utils, $filter, $window) {
    const API = {
      listUrl: "platform-product/comment/getCrawlerCommentPageList", // 列表接口
    }

    let vm
    /* var */
    $scope.reviewList = []
    $scope.pageState = {
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
    $scope.bigImg = ""
    $scope.bigImgVisible = false

    /* global Fn */
    $scope.changeImported = handleIsImport
    $scope.handleStar = handleStar
    $scope.handleImg = showBigImg
    $scope.handleClose = closeImg

    this.$onInit = function () {
      vm = this
      init()
    };

    /* init */
    function init() {
      initPullLoad("pull-review", getList)
    }

    function initPage() {
      $scope.pageState = {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
      $scope.reviewList = []
    }

    // 传入元素id与加载函数实现下拉加载 
    function initPullLoad(tarDomId, loadFn) {
      const pullDom = document.querySelector(`#${tarDomId}`)
      const pullCallback = utils.debounce(() => {
        loadFn()
      }, 100)
      pullDom.addEventListener('scroll', function () {
        // 滚轮距离顶部距离
        const scrollTop = pullDom.scrollTop || 0
        // 滚轮的总体高度
        const scrollH = pullDom.scrollHeight || 0
        // 当前滚轮的容器高度
        const clientH = pullDom.clientHeight || 0
        const arrEnd = (scrollH - scrollTop) <= clientH + 50
        const canLoadData = $scope.pageState.total > $scope.reviewList.length
        if (arrEnd && canLoadData) {
          pullCallback()
        }
      })
    }

    /* List */
    function getList() {
      const scoreList = getStarList()
      const params = {
        pageNum: $scope.pageState.pageNum,
        pageSize: $scope.pageState.pageSize,
        data: {
          scoreList: scoreList,
          productId: vm.productId
        }
      }
      const url = API.listUrl
      dsp.postFun(url, params, (res) => {
        const {
          data: result
        } = res
        if (result.code == 200) {
          $scope.reviewList = $scope.reviewList.concat(result.data.list || [])
          $scope.pageState.total = result.data.total || 0
        }
        handleImg()
      }, (err) => {});
    }


    /* handle event */

    // 切换是否引用评论
    function handleIsImport() {
      console.log("this is import reviews", vm.isImport);
      clearStar()
      initPage()
      if (vm.isImport == '0') {
        getList()
      }
    }

    // 点击选中评价星级 
    function handleStar(level) {
      vm.starPool[`${level}`] = !vm.starPool[`${level}`]
      initPage()
      getList()
    }

    function showBigImg(img) {

      $scope.bigImg = img
      $scope.bigImgVisible = true
    }

    function closeImg() {
      $scope.bigImg = ""
      $scope.bigImgVisible = false
    }

    /* utils */

    // 根据本地的星级列表得到传参的星级列表
    getStarList = () => {
      const starList = vm.starPool
      const paramList = [] 
      !starList.five || paramList.push(5); 
      !starList.four || paramList.push(4);
      !starList.three || paramList.push(3); 
      !starList.two || paramList.push(2); 
      !starList.one || paramList.push(1);
      if (paramList.length > 0) {
        return paramList
      }
      return null
    }

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

    clearStar = () => {
      const starList = vm.starPool
      starList.five = false
      starList.four = false
      starList.three = false
      starList.two = false
      starList.one = false
    }

  }
})(angular)