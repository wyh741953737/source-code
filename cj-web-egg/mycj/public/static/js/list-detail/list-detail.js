
// import {warehouseList,typeList,bannerList} from '@root/public/static/js/list-detail/list-data';
(function () {
  var app = angular.module('ld-app', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'commonRelatedLinks', 'CommonFooterCom', 'custom-filter', 'cjDotModule']);
  // 创建组件模块
  angular.module('cjCompnentModule', []);
  app.controller('ld-controller', ['$scope', '$http', '$window', 'dsp', 'cjhome', '$sce', '$rootScope', '$timeout', 'utils', function ($scope, $http, $window, dsp, cjhome, $sce, $rootScope, $timeout, utils) {
    var bs = new Base64();
    $scope.userId = localStorage.getItem('userId') == null ? '' : bs.decode(localStorage.getItem('userId'));
    $scope.loginName = localStorage.getItem('firstName') == null ? '' : bs.decode(localStorage.getItem('firstName'));
    $scope.token = bs.decode(localStorage.getItem('token') == null ? '' : localStorage.getItem('token'));
    $scope.hasLogin = dsp.isInLoginState();
    let isFirstGetWarehouse = true

    $scope.fromType = dsp.getQueryString('fromType') || 'all';
    $scope.cateId = dsp.getQueryString('id') || '';
    // 判断从产品推荐过来的是否登录
    if($scope.fromType == 'CommentList' && !$scope.hasLogin) {
      location.href = 'login.html?target=' + bs.encode('list-detail.html?id=' + $scope.cateId + '&fromType=CommentList')
    } else if($scope.fromType == 'CommentList' && $scope.hasLogin) {
      dsp.postFun('push/center/hasPushRecord', { pushId: $scope.cateId }, function(res) {
        const { code, success } = res.data;
        if(code == 200) {
          if(success == false) {
            location.href = 'home.html'
          }
        } 
        // else {
        //   location.href = 'home.html'
        // }
      })
    }

    $scope.$on('warearea-list',function(d,data){
      $scope.warehouseList = data.map(item=>{
        item.val = item.countryCode;
        item.name = item.areaEn;
        return item;
      });
      $scope.warehouseList.unshift({val: '', name: 'Ship from All Warehouses'})
      isFirstGetWarehouse = false
      if ($scope.fromCountry && $scope.fromCountry !== 'all') {
        const old = document.title
        const t = $scope.getFilterName($scope.fromCountry,$scope.warehouseList)
        document.title = old ? `${old} > ${t}` : t
      }
    })
    $scope.typeList = [
      { name: 'Sort All Types', val: 'all', isShow: true, flag: 0 },
      { name: 'Product Videos', val: 'video', isShow: true, flag: 0 },
      { name: 'Listable Products', val: 'list', isShow: true, flag: 2 },
      { name: 'Source Products', val: 'source', isShow: true, flag: 1 },
      { name: 'New Products', val: 'new', isShow: true, flag: 3 }
    ];
    $scope.bannerList = [
      { img_url: 'static/image/list-detail/banner-1.png', link: 'https://youtu.be/SZGGdrjL7ng', skipType: '2' },
      { img_url: 'static/image/list-detail/banner-2.jpg', link: 'https://app.cjdropshipping.com/productReport/list', skipType: '2' },
      { img_url: 'static/image/list-detail/banner-3.png', link: 'https://app.cjdropshipping.com/blog/post/how-to-choose-the-best-shipping-method-delivery-time-shipping-costs-comparison-under-the-quarantine?fromUrl=http%3A%2F%2Fapp.cjdropshipping.cn%2Fblog%2Flist%2F1', skipType: '2' },
    ];



    // 设置最小高度
    let queryType = dsp.getQueryString('type'); // 推荐商品
    
    $scope.cateName = dsp.getQueryString('name') || '';
    // console.log(bs.decode($scope.cateName))
    $scope.searchStr = dsp.getQueryString('search') || '';
    $scope.fromCountry = dsp.getQueryString('from') || 'all';//us:美国，th:泰国
    $rootScope.fromWhere = dsp.getQueryString('fromWhere') || ''
    $rootScope.fromCountry = $scope.fromCountry
    $scope.store = dsp.getQueryString('store') || '0';//0:默认；1：供应商
    $scope.storeid = dsp.getQueryString('storeid') || '0';//0:默认；1：供应商
    $scope.storeName = dsp.getQueryString('storeName') || '';
    $scope.isSearchImg = dsp.getQueryString('searchImg'); // 以图搜图页面 标记
    $scope.cateThirdId = dsp.getQueryString('cateId') || '' //前一次是关键词搜索后点击三级类目过来
    $scope.cateArr = dsp.getQueryString('cateArr') || '' //前一次是关键词搜索后点击三级类目过来后的三级类目集合
    $scope.commendId = dsp.getQueryString('commendId'); // 推荐商品

    document.title = $scope.storeName;

    $scope.isSearchList = false;
    $scope.pageNum = '1';
    $scope.pageSize = '60';
    $scope.goodList = [];
    $scope.startPrice = '';
    $scope.endPrice = '';
    $scope.categoryList = [] //根据关键词搜索的时候获取相关三级类目列表
    $scope.firstFromCountry = $scope.fromCountry === 'all'   //区别第一次进来，仓库为all 展示Shipping from 而不是 all
    $scope.firstFromType = $scope.fromType === 'all'
    $scope.isShowMoreBtn = false //是否展示更多按钮
    $scope.isMore = false  //下拉展示关键三级类目
    $scope.isShowAllCategory = false  //全部类目情况下 下拉展示所有一级类目
    $scope.noDataView = false // 是否有数据状态
    $scope.isShowBackTop = false // 是否有数据状态
    $scope.backTop = function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // 设置无数据状态
    function setNoDataStatus (flag) {
      $scope.noDataView = flag
    }

    $scope.goSourcing = function() { 
      // let url = hasLogin ? '/myCJ.html#/add-sourcing////' : '/cus-sourcing.html'
      location.href = '/myCJ.html#/add-sourcing////'
    }

     // 是否跳转到手机端
     if (dsp.isPhone()) {
      // 处理 url 参数
      var jsonArgs = dsp.href2json(window.location.href);

      if (jsonArgs.name) {
        try {
          jsonArgs.name = JSON.parse(bs.decode(jsonArgs.name));
        } catch (e) {
          console.error(e);
          jsonArgs.name = '';
        }
      }
      jsonArgs.page = 'category-list';
      // 当前页面的数组
      jsonArgs.cateNameArr = JSON.parse(bs.decode($scope.cateName)) || [];
      dsp.skipToMobile(jsonArgs);

      return;
    }

    if ($scope.store == '1') {
      dsp.addSupplerChatWindow();
    } else {
      // 如果不是erp过来的登录，加载聊天
      if (!localStorage.getItem('loginfromerp')) {
        dsp.addChatWindow();
        dsp.addGuidWindow();
      }
    }
    /** 2019-12-16 搜索框优化 */
    /*类目 -- 点击类目*/
    $scope.cateClick = (id, idx) => {
      if ($scope.cateNameArr && idx !== $scope.cateNameArr.length - 1) { //点击不是当前处在的类目才有效
        const newArrName = bs.encode(JSON.stringify($scope.cateNameArr.slice(0, idx + 1)))
        location.href = `list-detail.html?id=${id}&name=${newArrName}&${$rootScope.fromWhere === 'warehouses' ? `from=${$rootScope.fromCountry}` : ''}&fromWhere=${$rootScope.fromWhere}`
      }
    }
    //面包屑 -- 类目 划入
    $scope.categoryMouseEnter = (item, idx) => {
      //当面包屑 类目存在时，鼠标划入最后一个类目且这个类目不是三级类目时触发
      if ($scope.cateNameArr && $scope.cateNameArr.length < 3 && idx === $scope.cateNameArr.length - 1) {
        $scope.cateNameArr = $scope.cateNameArr.map(cate => {
          if (item.id === cate.id) {
            if (idx === 0) { //当前为一级类目需要获取其下的二级类目
              $scope.categoryMap.forEach(_ => {
                if (_.id === cate.id) cate.selectList = _.children
              })
            } else if (idx === 1) { //当前为二级类目需要获取其下的三级类目
              const parentId = $scope.cateNameArr[idx - 1] ? $scope.cateNameArr[idx - 1].id : ''
              $scope.categoryMap.forEach(_ => {
                if (_.id === parentId) {
                  _.children.forEach(child => {
                    if (child.id === cate.id) cate.selectList = child.children
                  })
                }
              })
            }
          }
          return cate
        })
      }
    }
    //查看更多
    $scope.showMoreFn = () => $scope.isMore = !$scope.isMore
    //根据地址参数获取相应的仓库地址和sort类型
    $scope.getFilterName = (val, list) => {
      let name = ''
      list && list.forEach(item => {
        if (item.val === val) name = item.name
      })
      return name
    }
    //点击三级筛选类目查询
    $scope.clickCategory = (id, list) => {
      const arr = list.map(_ => {
        return { categoryId: _.categoryId, categoryNameEn: _.categoryNameEn }
      })
      const newArrName = bs.encode(JSON.stringify(arr))
      location.href = `list-detail.html?${$rootScope.fromWhere === 'warehouses' ? `from=${$rootScope.fromCountry}` : ''}&cateId=${id}&cateArr=${newArrName}&fromWhere=${$rootScope.fromWhere}&search=${$scope.searchStr || ''}`
    }
    //下拉点击类目
    $scope.clickCategoryBySelect = item => {
      const arr = $scope.cateNameArr || []
      const newArr = [...arr, { id: item.id, name: item.nameEn }].map(_ => {
        return { id: _.id, name: _.name }
      })
      const newArrName = bs.encode(JSON.stringify(newArr))
      location.href = `list-detail.html?id=${item.id}&name=${newArrName}&from=${$scope.fromCountry}&fromWhere=${$rootScope.fromWhere}`
    }
    //美国仓泰国仓只展示all和video
    disposeFromType()
    function disposeFromType() {
      const needOptList = ['list', 'source', 'new']
      $scope.typeList = $scope.typeList.map(item => {
        item.isShow = !(needOptList.includes(item.val) && ($scope.fromCountry === 'US' || $scope.fromCountry === 'TH'))
        return item
      })
    }
    //仓库筛选
    $scope.changefilter1 = value => {
      if(!value) {
        $scope.getData1(true);
        $scope.firstFromCountry = true;
        return;
      }
      $scope.fromCountry = value
      $rootScope.fromCountry = $scope.fromCountry
      $scope.firstFromCountry = false
      $scope.fromType = 'all'
      $scope.firstFromType = true
      $scope.pageNum = '1'
      disposeFromType()
      initialization()
    }
    //商品类型筛选
    $scope.changefilter2 = value => {
      $scope.fromType = value
      $scope.pageNum = '1'
      $scope.firstFromType = false
      initialization()
    }
    //价格筛选
    $scope.filterConfirm = function () {
      if (+$scope.startPrice > +$scope.endPrice) {
        layer.msg('Please enter the correct plus interval');
        return
      }
      if (/[^\d]/g.test(+$scope.startPrice) || /[^\d]/g.test(+$scope.endPrice)) {
        layer.msg('Prices can only be entered in Numbers')
        return
      }
      $scope.pageNum = '1'
      initialization()
    }

    $scope.postSourcing = function() {
      location.href = `myCJ.html#/add-sourcing///${$scope.supplierId}/${$scope.supplierName}`
    }
    $scope.getData1 = (firstSearch) => {
      $scope.goodList = [];
      $scope.categoryList = [];
      const params = {
        pageNum: $scope.pageNum,
        pageSize: $scope.pageSize,
        flag: $scope.flag,
        // dataType: 'list',
        categoryId: $scope.cateId || $scope.cateThirdId,
        inputStr: $scope.searchStr,
        startPrice: $scope.startPrice,
        endPrice: $scope.endPrice,
        getCategories: $scope.searchStr ? true : false,
        firstSearch: $scope.searchStr && firstSearch ? true : false,
        categoryCount: 10
      }
      setNoDataStatus(false)
      dsp.loadPercent($('.product-box'), 600)
      dsp.postFun('app/web/cjList', JSON.stringify(params), ({ data }) => {
        const { statusCode, result } = data
        dsp.closeLoadPercent($('.product-box'))
        if (statusCode === '200') {
          const resData = JSON.parse(result)
          $scope.goodList = setData(resData, $scope.flag);
          $scope.totalNum=resData.all;
          $scope.pageData =  {
            pageNum: $scope.pageNum,
            totalNum: Math.ceil(resData.all / $scope.pageSize),
            totalCounts: resData.all,
            pageSize: $scope.pageSize,
            pagesizeList: ['60']
          }
          $scope.categoryList = resData.categories || []

        } else {
          layer.msg('Get the product data error')
        }
        $scope.goodList.length === 0 && setNoDataStatus(true)
      }, _ => _)
    };
    $scope.getData2 = (firstSearch) => {
      $scope.goodList = [];
      $scope.categoryList = [];
      let parms = {
        pageNum: $scope.pageNum,
        pageSize: $scope.pageSize,
        categoryId: $scope.cateId || $scope.cateThirdId,
        inputStr: $scope.searchStr,
        startPrice: $scope.startPrice,
        endPrice: $scope.endPrice,
        nationType: $scope.nationType,
        productType: $scope.productType,
        getCategories: $scope.searchStr ? true : false,
        firstSearch: $scope.searchStr && firstSearch ? true : false,
        categoryCount: 10
      }
      setNoDataStatus(false)
      dsp.loadPercent($('.product-box'), 600);
      dsp.postFun('app/web/getProductsFromUSAStorage', JSON.stringify(parms), (res) => {
        dsp.closeLoadPercent($('.product-box'));
        if (res.data.statusCode === '200') {
          let resData = JSON.parse(res.data.result)
          console.log(resData)
          $scope.totalNum = resData.total;
          $scope.goodList = resData.list.map(v => {
            return Object.assign(v, { flag: '1' })
          });
          $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.categoryList = resData.categories || []
          $scope.pageData = {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalPageNum,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
            pagesizeList: ['60']
          }
        } else {
          layer.msg('Get the product data error');
        }
        if ($scope.goodList.length === 0) {
          setNoDataStatus(true);
        }
      }, (err) => {

      });
    };
    $scope.getData3 = function () {
      $scope.$on('shop_data',function(d,data){
        document.title=data.name;
        $scope.supplierId = data.supplierId;
        $scope.supplierName = data.name;
      })
      $scope.goodList = [];
      let param = {
        pageNum: Number($scope.pageNum),
        pageSize: 24,
        shopId: $scope.storeid,
        inputStr: $scope.searchMerchName,
        startPrice: $scope.startPrice,
        endPrice: $scope.endPrice
      }
      dsp.postFun('app/web/cjListByShopId', param, (res) => {
        if (res.data.statusCode === '200') {
          let resData = JSON.parse(res.data.result)
          $scope.totalNum = resData.total;
          $scope.goodList = resData.list.map(v => {
            return v;
          });
          $scope.pageSize = "24"
          $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.pageData = {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalPageNum,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
            pagesizeList: [param.pageSize]
          }
        } else {
          layer.msg('Get the product data error');
        }
        if ($scope.goodList.length === 0) {
          setNoDataStatus(true);
        }
      }, (err) => {
      });

    }
    $scope.getData4PageNum = 1;
    $scope.getData4 = function (firstSearch) {
      if (firstSearch) return
      let param = {
        "pageNum": $scope.getData4PageNum,
        "pageSize": "24",
        "reType": "web",
        "push_id": $scope.cateId
      }
      // dsp.loadPercent($('.product-box'), 600);
      dsp.postFun('cj/appPush/getproductList', param, (res) => {
        console.log(res)
        dsp.closeLoadPercent($('.product-box'));
        if (res.data.statusCode === '200') {
          let resData = res.data.result
          $scope.totalNum = resData.total;
          $scope.goodList = [...$scope.goodList, ...resData.productManual]
          console.log($scope.goodList)
          $scope.totalPageNum = Math.ceil($scope.totalNum / 24);
          CJMsg && CJMsg.refresh()
        } else {
          layer.msg('Get the product data error');
        }
        if ($scope.goodList.length === 0) {
          setNoDataStatus(true);
        }
      }, (err) => {
        dsp.closeLoadPercent($('.product-box'));
      });

    }
    $scope.viewMoreClick = function () {
      $scope.getData4PageNum = $scope.getData4PageNum + 1
      $scope.getData4()
    }

    $scope.getData5 = function () {
      $scope.goodList = [];
      $scope.pageSize = '96';
      let param = {
        pageNum: $scope.pageNum,
        pageSize: $scope.pageSize,
        categoryId: '',
        inputStr: $scope.searchMerchName,
        startPrice: $scope.startPrice,
        endPrice: $scope.endPrice,
        nationType:$scope.nationType
      }
      dsp.loadPercent($('.product-box'), 600);
      dsp.postFun('cj/superDeal/product/getAllUnsoldProducts', param, ({data}) => {
        console.log(data)
        dsp.closeLoadPercent($('.product-box'));
        if (data.statusCode === '200') {
          let resData = data.result;
          $scope.totalNum = resData.listCount;
          $scope.goodList = resData.list.map(v => {
            return { ...v,flag:'1' }
          });
          console.log($scope.goodList)
          $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
          $scope.pageData = {
            pageNum: $scope.pageNum,
            totalNum: $scope.totalPageNum,
            totalCounts: $scope.totalNum,
            pageSize: $scope.pageSize,
            pagesizeList: [param.pageSize]
          }
        } else {
          layer.msg('Get the product data error');
        }
        if ($scope.goodList.length === 0) {
          setNoDataStatus(true);
        }
      }, (err) => {
        dsp.closeLoadPercent($('.product-box'));
      });

    }
    /**
       * ===================================
       * ========== 以图搜图功能 =============
       * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
       */
    // 初始化 图片数据
    function getSearchImg() {
      const imgData = JSON.parse(localStorage.getItem('_search_pic_'));
      if (!imgData) return;
      const { dataURL, fileName } = imgData;
      $scope.imgArr = dataURL;
      fetch(dataURL)
        .then(img => img.blob())
        .then(blob => {
          const formData = new FormData();
          formData.append('uploadimg', blob, fileName);
          uploadImg(formData, dataURL);
        });
    }

    // 图片搜索
    function uploadImg(formData) {
      dsp.loadPercent($('.product-box'), 600);
      return dsp.postFun(
        'app/picture/searchUpload',
        formData,
        res => {
          dsp.closeLoadPercent($('.product-box'));
          if (res.data.statusCode != 200) {
            setNoDataStatus(true);
            return layer.msg('Get the product data error');
          } else {
            const resData = JSON.parse(res.data.result)
            console.log(resData)
            $scope.disposeImgCategory(resData.categorys)
            $scope.goodList = resData.location.map(_ => {
              _.flag = _.isSource.toString() === '0' ? '1' : '0'
              return _
            });
            // 无数据展示
            if (resData.all === 0) {
              setNoDataStatus(true);
            }
          }
        },
        err => { },
        {
          headers: { 'Content-Type': undefined },
          // layer2: true
        }
      );
    }
    //对以图搜图类目数据进行处理
    $scope.disposeImgCategory = list => {
      $scope.categoryList = utils.uniqueArr(list, 'categoryId').map(item => {//去重
        const arr = item.categoryName.split(' / ')
        return { categoryId: item.categoryId, categoryNameEn: arr[arr.length - 1] }
      })
      // console.log($scope.categoryList)
    }
    /** ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 以图搜图功能  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  */
    let initialization = (firstSearch) => {
      $scope.typeList.filter(item => {
        if (item.val == $scope.fromType) {
          $scope.flag = String(item.flag);
        }
      })
      $scope.nationType = $scope.fromCountry;
      $scope.productType = $scope.fromType;
      if(queryType=='superdeal'){
        $scope.getData5();
      }else if ($scope.store == '1') {
        $scope.getData3();
      } else if ($scope.fromCountry == 'TH' || $scope.fromCountry == 'US' || $scope.fromType == 'video') {
        $scope.getData2(firstSearch);
      } else if ($scope.fromType == 'CommentList') {
        $scope.goodList = [];
        $scope.getData4(firstSearch);
      } else if ($scope.fromCountry != 'all') {
        $scope.getData2(firstSearch);
      } else if ($scope.isSearchImg) {
        // 搜图处理与其他请求分开处理
        dsp.getCateList(data => {
          $scope.categoryMap = data;
            document.title = 'Search by Image';
            getSearchImg()
        })
      } else {
        $scope.getData1(firstSearch);
      }
      domTitle()
    }
    initialization();

    //页签标题
    function domTitle() {
      let documentTitle = dsp.getQueryString('dt') || ''
      if ($scope.cateId) {
        try {
          $scope.isSearchList = true;
          $scope.isCateList = true;
          $scope.cateNameArr = $scope.cateName ? JSON.parse(bs.decode($scope.cateName)) : [];
        } catch (e) {
          console.log(e, '携带的参数被破坏导致页面无法加载')
          $scope.cateNameArr = [];
        }
        let title = '';
        $scope.cateNameArr.forEach(function (o, i) {
          title += o.name  + ' > '
        });
        documentTitle = title + $scope.searchStr;
      } else if ($scope.cateThirdId) {
        try {
          $scope.categoryThirdList = $scope.cateArr ? JSON.parse(bs.decode($scope.cateArr)) : []
        } catch (e) {
          $scope.categoryThirdList = []
        }
        $scope.isMore = true
        $scope.categoryThirdList = $scope.categoryThirdList.map(item => {
          item.isActive = item.categoryId === $scope.cateThirdId
          if (item.categoryId === $scope.cateThirdId) documentTitle = item.categoryNameEn + ` > `
          return item
        })
      }
      console.log($scope.fromCountry)
      if ($scope.fromCountry && $scope.fromCountry !== 'all') {
        if (!isFirstGetWarehouse) {
          documentTitle += $scope.getFilterName($scope.fromCountry,$scope.warehouseList)
        }
        /* 在仓库数据返回时处理*/
      }
      if ($scope.fromType && $scope.fromType !== 'all') {
        switch ($scope.fromType) {
          case 'video':
            documentTitle += `${$scope.fromCountry && $scope.fromCountry !== 'all' ? ' > ' : ''}Product Videos`
            break
          case 'list':
            documentTitle += `${$scope.fromCountry && $scope.fromCountry !== 'all' ? ' > ' : ''}Listable Products`
            break
          case 'source':
            documentTitle += `${$scope.fromCountry && $scope.fromCountry !== 'all' ? ' > ' : ''}Source Products`
            break
          case 'new':
            documentTitle += `${$scope.fromCountry && $scope.fromCountry !== 'all' ? ' > ' : ''}New Products`
            break
          case 'CommentList':
            documentTitle += `${$scope.fromCountry && $scope.fromCountry !== 'all' ? ' > ' : ''}Recommend Products`
            break
        }
      }
      if (documentTitle.lastIndexOf(' > ') === documentTitle.length - 3) {
        documentTitle = documentTitle.slice(0, documentTitle.lastIndexOf(' > '))
      }
      if(queryType=='superdeal'){
        documentTitle = 'Super Deal';
      }
      if($scope.storeName){
        documentTitle = $scope.storeName || 'Search on CJdropshipping';
      }
      if ($scope.isSearchImg){
        documentTitle = 'Search by Image';
      }
      document.title = $scope.searchStr ? `Dropship ${$scope.searchStr} and get fast shipping on CJ`:documentTitle;
    }
    /** 推荐商品start*/
    if ($scope.fromType == 'CommentList') {
      $scope.isSearchImg = true
      if (window.pageYOffset <= window.innerHeight) {
        $scope.isShowBackTop = false
      } else {
        $scope.isShowBackTop = true
      }
    }
    /**推荐商品end */

    //cj list 接口数据处理下
    let setData = (data, flag) => {
      let dataArr = [];
      if (flag === '0') {
        $scope.totalNum = data.all;
        let arr1 = data.location.map(v => {
          v.flag = '1';
          return v;
          //return {...v, flag: '1'}
        });
        let arr2 = data.reptile.map(v => {
          v.flag = '0';
          return v;
          //return {...v, flag: '0'}
        });
        dataArr = [...arr1, ...arr2]
      } else if (flag === '1') {
        $scope.totalNum = data.reptileAll;
        dataArr = data.reptile.map(v => {
          v.flag = '0';
          return v;
          //return {...v, flag: '0'}
        });
      } else if (flag === '2') {
        $scope.totalNum = data.locationAll;
        dataArr = data.location.map(v => {
          v.flag = '1';
          return v;
          //return {...v, flag: '1'}
        });
      } else if (flag === '3') {
        $scope.totalNum = data.all;
        dataArr = data.location.map(v => {
          v.flag = '1';
          return v;
          //return {...v, flag: '1'}
        });
      }
      $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
      return dataArr;
    };
    //
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop();
      var scrollHeight = $(document).height();
      var windowHeight = $(this).height();
      var x = scrollHeight - (scrollTop + windowHeight);
      if (x <= 711) {
        // $('.asj-page-box').css({ bottom: '60px' });
        $('.asj-page-box').css({ position: 'initial' });
      } else {
        $('.asj-page-box').css({ bottom: '0px', position:'fixed' });
      }

      if (window.pageYOffset <= window.innerHeight) {
        $scope.isShowBackTop = false
      } else {
        $scope.isShowBackTop = true
      }
    });
    // $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    //   $timeout(function () {
    //     var wh = $(window).height();
    //     var h = $('.content-box').height();
    //     if (h > wh) {
    //       $('.asj-page-box').css({ bottom: '0px' });
    //     } else {
    //       $('.asj-page-box').css({ bottom: '60px' });
    //     }
    //   }, 200)
    // });
    $scope.$on('ngRepeatFinishedByKeyword', _ => {
      $timeout(_ => {
        console.log($('#ld-keyword-content').height())
        $scope.isShowMoreBtn = $('#ld-keyword-content').height() > 60
      }, 200)
    })
    $scope.$on('pagedata-fa', function (d, data) {//分页切换数据监听
      $scope.pageNum = data.pageNum;
      $scope.pageSize = data.pageSize;
      window.scrollTo({
        top: 650
      });
      initialization()
    })
    $scope.chanPageNum = function () {
      if (!isNaN($scope.pageNum * 1) && $scope.pageNum * 1 > 0 && $scope.pageNum * 1 <= $scope.totalPageNum) {
        initialization()
      } else {
        $scope.pageNum = '1';
      }
    }
    $scope.$on('store-search', function (d, data) {
      $scope.searchMerchName = data;
      $scope.getData3();
    })
    /* 头部菜单进入埋点 */
    function trackFun() {
      dsp.postFun('pojo/home/addStatisByType', {
        entryPage: +dsp.getQueryString('track')
      }, res => { console.log(res.data) })
    }
    if (+dsp.getQueryString('track') == 3) {
      trackFun();
    }
  }])
  app.directive('onFinishRenderFilters', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            console.log(attr.class)
            if (attr.class.includes('list-product-card')) {
              scope.$emit('ngRepeatFinished')
            } else if (attr.class.includes('ld-keyword')) {
              scope.$emit('ngRepeatFinishedByKeyword')
            }
          });
        }
      }
    };
  });

})()
