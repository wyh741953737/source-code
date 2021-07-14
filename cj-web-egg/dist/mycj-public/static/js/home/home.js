
(function (Base64) {
  var app = angular.module('homeApp', ['service', 'home-service', 'cjCompnentModule', 'cjDirectiveModule', 'CommonHeaderCom', 'CommonFooterCom', 'custom-filter', 'cjDotModule']);
  // 创建组件模块
  angular.module('cjCompnentModule', ['utils']);
  app.controller('homeController', ['$scope', '$timeout', '$window', 'dsp', 'cjhome', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, cjhome, $window, $sce, $rootScope, $location, $anchorScroll, utils) {
    try {
      /* 判断pc/phone端 */
      if (dsp.isPhone(true)) return;
      /*获取用户信息*/
      let bs = new Base64();
      $scope.userId = localStorage.getItem('userId') == undefined ? "" : bs.decode(localStorage.getItem('userId'));
      $scope.loginName = localStorage.getItem('firstName') == undefined ? "" : bs.decode(localStorage.getItem('firstName'));
      $scope.token = localStorage.getItem('token') == undefined ? "" : bs.decode(localStorage.getItem('token'));
      $scope.hasLogin = dsp.isInLoginState();//是否登录
      $scope.hasTempName = dsp.getCookie('asj_temchatname') ? true : false //是否含有临时账号
      $scope.fromCountry = dsp.getQueryString('from') || 'all'; // 国家类型：所有、China，us
      $scope.fromType = dsp.getQueryString('fromType') || 'all'; //商品类型：所有、list、source、video
      $scope.bannerList = [];
      $scope.currencySymbol = window.localStorage.getItem('rate_currency-symbol');
      $scope.$on('rate_currency-symbol', function (d, data) {
        $scope.currencySymbol = data;
      })
      $scope.subAccountName = localStorage.getItem('subAccountName')
       ? bs.decode(localStorage.getItem('subAccountName')) : ''

      //本页面公用方法------------------------------------------------------------------------
      //loading 加载动画
      function loadingShow(el) {
        $(el).busyLoad("show", {
          color: '#FF7700',
          background: 'transparent'
        });
      }

      function loadinghide(el) {
        $(el).busyLoad("hide")
      }

      $scope.range = function (start, end) {
        let ret = [];
        if (!end) {
          end = start;
          start = 0;
        }
        for (let i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;
      };

      //banner部分--------------------------------------------------------------------------
      // ------------------------------------------ 19-12-06 币种
      $rootScope.$on('calc-exchange-rate', function (ev, rate) {
        utils.forceRefresh({
          $scope,
          $timeout,
          keys: [
            'userInfo'
          ]
        });
      });
      // ------------------------------------------
      //获取类目数据
      dsp.getCateList((data) => {
        $rootScope.CategoryList = data;
        sessionStorage.setItem('CategoryList', JSON.stringify($rootScope.CategoryList));
        categoryNum();
        addLinkToCateOne();
      });
      //判断菜单栏数量
      function categoryNum() {
        if ($scope.fromCountry == 'all' && $scope.fromType == 'all' || $scope.fromType == 'listed' || $scope.fromType == 'sourcing') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.mixTotle + o.usaTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.mixTotle + k.usaTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.mixTotle + a.usaTotle;
              })
            })
          })
        } else if ($scope.fromCountry == 'all' && $scope.fromType == 'video') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.chinaVidTotle + o.usaVidTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.chinaVidTotle + k.usaVidTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.chinaVidTotle + a.usaVidTotle;
              })
            })
          })
        } else if ($scope.fromCountry == 'china' && $scope.fromType == 'all' || $scope.fromType == 'listed' || $scope.fromType == 'sourcing') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.mixTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.mixTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.mixTotle;
              })
            })
          })
        } else if ($scope.fromCountry == 'china' && $scope.fromType == 'video') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.chinaVidTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.chinaVidTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.chinaVidTotle;
              })
            })
          })
        } else if ($scope.fromCountry == 'us' && $scope.fromType == 'all') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.usaTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.usaTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.usaTotle;
              })
            })
          })
        } else if ($scope.fromCountry == 'us' && $scope.fromType == 'video') {
          $rootScope.CategoryList.forEach(function (o, i) {
            o.Num = o.usaVidTotle;
            o.children.forEach(function (k, j) {
              k.Num = k.usaVidTotle;
              k.children.forEach(function (a, b) {
                a.Num = a.usaVidTotle;
              })
            })
          })
        }
      }
    // }
    // 类目超链接
    function addLinkToCateOne () {
      // cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
      $rootScope.CategoryList.forEach(function (o, i) {
        var arr = [];
        arr.push({ id: o.id, name: o.nameEn })
        o.aLink = 'list-detail.html?id=' + o.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
      })
    }
    function addLinkToCateTAT() {
      // cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
      $scope.secondData.forEach(function (o2, i) {
        var itemArr = [$scope.firstItem, o2];
        var arr = [];
        itemArr.forEach(item => {
          arr.push({ id: item.id, name: item.nameEn })
        })
        o2.aLink = 'list-detail.html?id=' + o2.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
        o2.children.forEach(o3 => {
          var itemArr = [$scope.firstItem, o2, o3];
          var arr = [];
          itemArr.forEach(item => {
            arr.push({ id: item.id, name: item.nameEn })
          })
          o3.aLink = 'list-detail.html?id=' + o3.id + '&name=' + bs.encode(JSON.stringify(arr)) + '&from=' + $scope.fromCountry + '&fromType=' + $scope.fromType;
        })
      })
    }
    $scope.getSecondData = (item1, idx) => {
      $scope.secondData = item1.children;
      $scope.firstItem = item1;
      addLinkToCateTAT()
    };
    //类目点击
    $scope.toMerchList = (id, itemArr, item, type) => {
      var arr = [];
      itemArr.forEach(function (o, i) {
        arr.push({ id: o.id, name: o.nameEn })
      })
      cjhome.toMerchList(id, JSON.stringify(arr), $scope.fromCountry, $scope.fromType);
    };

      //获取用户信息
      function getUserInfo() {
        loadingShow('.banner .info');
        dsp.postFun('cj/homePage/chaXunYongHuXinXi', {}, function (res) {
          loadinghide('.banner .info');
          if (res.data.statusCode == 200) {
            $scope.userInfo = res.data.result;
            $scope.userLevel = $scope.userInfo.vip === 1 ? 'VIP' : `LV${$scope.userInfo.moneyLevel}`;
            let name = ($scope.userInfo.name).trim().split(/\s+/)[0];
            localStorage.setItem('firstName', bs.encode(name));
            localStorage.setItem('avatar', bs.encode($scope.userInfo.img || ''));
            $scope.$broadcast('userinfo', {
              firstName: name,
              avatar: $scope.userInfo.img
            });
          }
        }, function (err) {
          loadinghide('.banner .info');
          console.log('获取数据失败！')
        })
      }

      //标签信息点击
      $scope.infoClick = (type, val) => {
        // if (val > 0) {
        switch (type) {
          case 'Bulk':
            location.href = 'myCJ.html#/drop-proce?track=13';
            break;
          case 'Payment':
            location.href = 'myCJ.html#/dropshipping-orders?track=14';
            break;
          case 'wallet':
            location.href = 'myCJ.html#/myCJWallet?track=12';
            break;
          case 'Ready':
            location.href = 'myCJ.html#/myCJAssociatedStore?track=15';
            break;
          default:
            location.href = 'myCJ.html#/myCJAssociatedStore?track=16';
            break
        }
        // }
      };

      //问题数据处理
      $scope.problemPage = 1;
      $scope.problemSize = '5';

      function getProblem() {
        loadingShow('.user-info-problem');
        dsp.postFun('pojo/promotionContent/cjContents', {
          pageNum: $scope.problemPage.toString(),
          pageSize: $scope.problemSize
        }, function (res) {
          loadinghide('.user-info-problem');
          if (res.data.statusCode == 200) {
            $scope.problemTotal = JSON.parse(res.data.result).totle;
            $scope.problemData = JSON.parse(res.data.result).videos;
            $scope.problemData = $scope.problemData.map((o, i) => {
              o.idx = ($scope.problemPage - 1) * $scope.problemSize + i + 1
              return o
            });
            problemPageFun()
          }
        }, function (err) {
          loadinghide('.user-info-problem');
          console.log('获取数据失败！')
        })
      }

      function problemPageFun() {
        $('#problem-pages').jqPaginator({
          totalCounts: Number($scope.problemTotal) || 1,
          pageSize: Number($scope.problemSize),
          visiblePages: 5,
          currentPage: $scope.problemPage * 1,
          activeClass: 'active',
          prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
          next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
          page: '<a href="javascript:void(0);">{{page}}<\/a>',
          first: '',
          last: '',
          onPageChange: function (n, type) {
            if (type == 'init') {
              return;
            }
            $scope.problemPage = n
            getProblem()
          }
        });

      }

      //订阅
      $scope.subscribe = () => {
        window.postMessage({ flag: "openSubscribe", }, "*")
      };
      window.addEventListener('message', ev => {
        const { data } = ev
          , { flag } = data

        switch (flag) {
          case 'closeSubscribe':
            $scope.hasTempName = true
            break
          default:
            break
        }
      })
      $scope.subSubscribe = () => {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!$scope.subscribeName) {
          layer.msg('Please enter your name');
          return;
        }
        if (!$scope.subscribeEmail) {
          layer.msg('Please enter your email');
          return;
        }
        if (!reg.test($scope.subscribeEmail.trim())) {
          layer.msg('Please enter a correct email');
          return;
        }
        if (!$scope.subscribeSkype) {
          layer.msg('Please enter WhatsAPP/Skype');
          return;
        }
        $scope.isSubscribe = false;
      }
      let dataArr = null;
      function getData(type, size) {
        dataArr = null;
        let odata = {}
        let httpUrl;//不同的模块请求不同的接口
        if (type == 'super') {
          httpUrl = 'cj/superDeal/product/getTop5UnsoldProduct'
        }else {
          httpUrl = 'cj/homePage/selectNewProductList'
          odata.timeFlag = type;
          odata.pageSize = size;
        }
        dsp.postFun(httpUrl, odata, (res) => {
          loadinghideFun(type)
          if (res.data.statusCode == 200) {
            // 去重
            var json = {};
            if(Object.keys(res.data.result).length>0){//判断是否是空对象，只因后台数据不规范不得不这样做
              dataArr = res.data.result.filter(item => {
                if (json[item.productId] == undefined) {
                  json[item.productId] = 'exist';
                  return true;
                } else {
                  return false;
                }
              });
              dataArr.forEach(function (o, i) {
                o.bigImg = 'https://' + o.bigImg.replace('https://', '').replace('http://', '')
              })
            }else{
              dataArr=[];
            }
            pushData(type)
          }
        }, function (err) {
          loadinghideFun(type)
          console.log(type + '获取数据失败！')
        })
      }
      function getSuperList(){
        return new Promise(function(resolve,reject){
          dsp.postFun('cj/superDeal/product/getTop5UnsoldProduct', {}, (res) => {
            if (res.data.statusCode == 200) {
              // 去重
              var json = {};
              if(Object.keys(res.data.result).length>0){//判断是否是空对象，只因后台数据不规范不得不这样做
                dataArr = res.data.result.filter(item => {
                  if (json[item.productId] == undefined) {
                    json[item.productId] = 'exist';
                    return true;
                  } else {
                    return false;
                  }
                });
                dataArr.forEach(function (o, i) {
                  o.bigImg = 'https://' + o.bigImg.replace('https://', '').replace('http://', '')
                })

              }else{
                dataArr=[];
              }
              resolve(dataArr);
            }
          }, function (err) {
            console.log(type + '获取数据失败！')
          })
        })
      }
      function loadinghideFun(type) {
        if (type == 'Dropshipping') {
          loadinghide('#floor-1 .home-product-box');
        } else if (type == 'month') {
          loadinghide('#floor-2 .home-product-box');
        } else if (type == 'listed') {
          loadinghide('#floor-4 .home-product-box');
        } else if (type == 'video') {
          loadinghide('#floor-7 .home-product-two');
        } else if (type == 'source') {
          loadinghide('#floor-7 .home-product-box');
        } else if (type == 'th') {
          loadinghide('#floor-5 .home-product-two');
        } else if (type == 'POD') {
          loadinghide('#floor-6 .home-product-two');
        }
      }
      function pushData(type) {
        if (type == 'Dropshipping') {
          $scope.trdingData = dataArr;
        } else if (type == 'source') {
          $scope.sourceData = dataArr;
        } else if (type == 'month') {
          $scope.newProData = dataArr;
        } else if (type == 'listed') {
          $scope.listProData = dataArr;
        } else if (type == 'USAStorage') {
          $scope.usProData = dataArr;
        } else if (type == 'th') {
          $scope.thaiList = dataArr;
        } else if (type == 'video') {
          $scope.videoProData = dataArr;
        } else if (type == 'POD') {
          $scope.podProData = dataArr;
        } else if (type == 'super') {
          $scope.superProData = dataArr;
        }
      }

      loadingShow('#floor-1 .home-product-box');
      loadingShow('#floor-2 .home-product-box');
      loadingShow('#floor-4 .home-product-box');
      loadingShow('#floor-5 .home-product-two');
      loadingShow('#floor-6 .home-product-two');
      loadingShow('#floor-7 .home-product-box');
      //Trending Products & Sourcing Product ----------------------------------------------
      function getTrdingProData() {
        if (!$scope.trdingData || $scope.trdingData.length == 0) {
          getData('Dropshipping', 6)
        }
      }

      function getSourceProData() {
        if (!$scope.sourceData || $scope.sourceData.length == 0) {
          getData('source', 6)
        }
      }

      /*获取新商品数据*/
      function getNewProData() {
        if (!$scope.newProData || $scope.newProData.length == 0) {
          getData('month', 6)
        }
      }

      //Listable Product-------------------------------------------------------------------
      function getListProData() {
        if (!$scope.listProData || $scope.listProData.length == 0) {
          getData('listed', 6);
        }
      }
      //US Warehouse Product------------------------------------------------------------
      function getThaiProData() {
        if (!$scope.thaiList || $scope.thaiList.length == 0) {
          getData('th', 4)
        }
      }
      //US Warehouse Product------------------------------------------------------------
      function getUsProData() {
        if (!$scope.usProData || $scope.usProData.length == 0) {
          getData('USAStorage', 4)
        }
      }

      //Super Deal------------------------------------------------------------
      function getSuperProData() {
        if (!$scope.superProData || $scope.superProData.length == 0) {
          getData('super', 4)
        }
      }

      //White Label For Your Products ------------------------------------------------------------
      function getPodProData() {
        if (!$scope.podProData || $scope.podProData.length == 0) {
          getData('POD', 6)
        }
      }

      //Video Product----------------------------------------------------------------------
      function getVideoProData() {
        if (!$scope.videoProData || $scope.videoProData.length == 0) {
          getData('video', 4)
        }
      }

      $scope.hotCategoryTab = [
        { name: 'Kitchen/Dining & Bar', img: true, parms: 'category1'},
        { name: 'Pet Products', img: false, parms: 'category2' },
        { name: 'Fine Jewelry', img: false, parms: 'category3' },
        { name: 'Underwears', img: false, parms: 'category4' },
      ];
      function getHotTabs(count = 4, productsCount = 1) {
        const params = { count, productsCount }
        dsp.postFun('cj/homePage/getHotCategory', params, ({ data }) => {
          const { result, statusCode } = data
          if (statusCode === '200') {
            $scope.hotCategoryTab = result.map((item, idx) => {
              item.name = item.categoryNameEn
              item.img = item.products[0].bigImg
              item.parms = `category${idx + 1}`
              return item
            })
          }
        }, error => {
          console.log('Data acquisition failed')
        })
      }
      getHotTabs();

      //Recommended Products-----------------------------------------------------------------
      $scope.sugPageNum = 1;
      $scope.sugPageSize = 24;
      $scope.sugProData = [];
      $scope.sugMoreFalg = false;
      function getSugProData(type) {
        let parms = {
          pageNum: $scope.sugPageNum.toString(),
          pageSize: $scope.sugPageSize.toString(),
        };
        if (!type) loadingShow('#floor-7 .home-product-box');
        dsp.postFun('cj/homePage/getRecommendPage', parms, (res) => {
          loadinghide('#floor-8 .home-product-box');
          $scope.sugMoreFalg = false;
          if (res.data.statusCode == 200) {
            $scope.sugNum = parseInt(res.data.result.length / 6);
            let arr;
            arr = $scope.sugNum > 1 ? res.data.result.slice(0, $scope.sugNum * 6) : res.data.result;
            arr.forEach(o => {
              o.num = o.listedCount;
            });
            $scope.sugProData = [...$scope.sugProData, ...arr];
          }
        }, function (err) {
          loadinghide('#floor-8 .home-product-box');
          $scope.sugMoreFalg = false;
        })
      }

      //more
      $scope.more = () => {
        if ($scope.sugNum > 0) {
          $scope.sugPageNum++;
          $scope.sugMoreFalg = true;
          $scope.sugPageSize = 24;
          loadingShow('#floor-8 .loading-box-sugpro');
          getSugProData('more');
        }
      };


      //各模块数据方法调用--------------------------------------------------------------------
      setTimeout(() => {
        getTrdingProData();
        getSourceProData();
        getNewProData();
        getListProData();
        getUsProData();
        getThaiProData();
        getVideoProData();
        getSugProData();
        getProblem();
        // getSuperProData();
        getPodProData();
      }, 2000)

      if ($scope.hasLogin) {
        getUserInfo();
      }
      //ViewMore----------------------------------------------------------------------------
      $scope.viewMore = function (type) {
        switch (type) {
          case 'Trending':
            location.href = 'list-detail.html?dt=Trending Products';
            break;
          case 'Sourcing':
            location.href = 'list-detail.html?from=all&fromType=source';
            break;
          case 'List':
            location.href = 'list-detail.html?from=all&fromType=list';
            break;
          case 'Us':
            location.href = 'list-detail.html?from=US&fromType=all';
            break;
          case 'Video':
            location.href = 'list-detail.html?from=all&fromType=video';
            break;
          case 'New':
            location.href = 'list-detail.html?from=all&fromType=new';
            break;
          case 'th':
            location.href = 'list-detail.html?from=TH&fromType=all';
            break;
          case 'POD':
            location.href = 'PrintonDemand.html';
            break;
        }
      };

      $scope.jump = (id) => {
        let oindex = $scope.superProData.length>4?id:id+1;
        let st = document.getElementById(`floor-${oindex}`).offsetTop - 90;
        window.scrollTo({
          top: st,
          behavior: "smooth"
        });
      };
      let scollBar = function(){
        Promise.all([getSuperList()]).then(function(result){
          $scope.superProData = result[0];
          //页面滑动右测tab----------------------------------------------------------------------
          let scrollTab = function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let scrollNum = $scope.superProData.length<5?document.getElementById('floor-1').offsetTop:document.getElementById('floor-0').offsetTop;
            /*tab 显示隐藏和固定*/
            $scope.isShowFloortab = scrollTop >= (scrollNum - 110);
            $scope.isFixed = scrollTop >= scrollNum - 45;
            $scope.$broadcast('catagrate-show', $scope.isShowFloortab);
          }
          //页面滑动tab对应楼层
          let scrollFloor=function() {
            let scrollTop = (document.documentElement.scrollTop || document.body.scrollTop) + 111;
            let floorTop = [];
            for(let i=1;i<9;i++){
              let offsetTop = document.getElementById(`floor-${i}`).offsetTop;
              floorTop.push(offsetTop);
            }
            //tab 锚点跳转
            $scope.floorArr = [
              { name: 'Trending Products', flag: true,el:'trending' },
              { name: 'New Products', flag: false,el:'newpro' },
              { name: 'Hot Selling Categories', flag: false,el:'hotsell' },
              { name: 'Listable Products', flag: false,el:'listable' },
              { name: 'US Warehouse & Thai Warehouse', flag: false,el:'ware' },
              { name: 'Videos & Sourcing', flag: false ,el:'video'},
              { name: 'Print on Demand', flag: false,el:'print' },
              { name: 'Recommended Products', flag: false ,el:'recommend'},
            ];
            if($scope.superProData.length>4){
              floorTop.splice(0,0,document.getElementById('floor-0').offsetTop);
              $scope.floorArr.splice(0,0,{ name: 'CJ Super Deals', flag: true,el:'superdeal' })
              // $scope.$apply();
            }
            // console.log('滑动距离 =====》',scrollTop)
            // console.log(floorTop)
            floorTop.some((o, i) => {
              if (scrollTop < floorTop[1]) {
                $scope.floorNum = 0;
                return true;
              } else if (scrollTop <= floorTop[i + 1] && scrollTop > floorTop[i]) {
                $scope.floorNum = i;
                return true;
              } else if (scrollTop > floorTop[floorTop.length - 1]) {
                console.log('floorTop.length - 1')
                $scope.floorNum = $scope.floorArr.length - 1;
                return true;
              }
            });
            $scope.floorArr.forEach((o, i) => o.flag = false);
            //console.log(`目前处在${$scope.floorNum + 1} L`);
            $scope.floorArr[$scope.floorNum].flag = true;
          }

          document.documentElement.onscroll =
          document.body.onscroll = function (ev) {
            scrollTab();
            scrollFloor();
            $scope.$apply();
          }
        })
      }
      scollBar();
      //回到顶部
      $scope.backTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };


      //-----------------------------------------------------------------------------------
      // 从erp过来登录客户账户自动登录
      if (dsp.getQueryString('tempassword') && dsp.getQueryString('username')) {
        // 只登录，不加载聊天
        dsp.login({
          name: decodeURIComponent(dsp.getQueryString('username')),
          passwd: decodeURIComponent(dsp.getQueryString('tempassword')),
          chatType: "0",
          platform: 'pc',
          isTOCJ: 'true'
        }, function (data) {
          console.log(data);
          var data = data.data;
          var code = data.statusCode;
          if (code != 200) {
            layer.msg(data.message);
          } else { // 登录成功
            // 保存登录信息
            localStorage.setItem('loginfromerp', '1'); // 标记从erp过来的模拟登录
            dsp.saveDataAfterLogin(data.result);
            location.href = 'home.html';
          }
        })
      } else {
        // 如果不是erp过来的登录，加载聊天
        if (!localStorage.getItem('loginfromerp')) {
          dsp.addChatWindow();
          dsp.addGuidWindow();
        }
      }

      // 其他应用通过token登陆cj
      if (dsp.getQueryString('accessToken')) {
        let accessToken = bs.decode(dsp.getQueryString('accessToken'));
        let redirectUrl = decodeURI(dsp.getQueryString('redirectUrl') ? dsp.getQueryString('redirectUrl') : '') || '';
        dsp.postFun('app/platform/getAccountInfo', {}, function (data) {
          let rpdata = data.data;
          if (rpdata.statusCode && rpdata.statusCode == 200) {
            dsp.saveDataAfterLogin(rpdata.result);
            let goUrl = redirectUrl || 'home.html';
            console.log('goUrl', goUrl)
            location.href = goUrl;
          }
        }, function (error) {
        },
          {
            headers: {
              token: accessToken
            }
          });
      }
      
      //初始化密码
      var shop2 = sessionStorage.getItem('isInitial');
      $scope.newPwd = '';
      // $scope.isWix = false;
      $scope.storeName = '';
      if (shop2 == '' || shop2 == null || shop2 == undefined) {
      } else {
        // console.log(shop2)
        $scope.showzzc2 = true;
        setTimeout(() => {
          $('.zzc2').show();
        }, 0);
        $('.zzc2').attr('data-shop', shop2)
        shop2 === 'wix' ? $scope.isWix = true : $scope.isWix = false
      }
      $scope.surePwd = function () {
        let shopName
        const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
        const PwdReq = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W_]){1,})(?!.*\s).{8,15}$/

        shop2 === 'wix' ? shopName = $scope.storeName : shopName = shop2;
        if (!shopName) {
          layer.msg('Please set store name');
        } else if (shop2 === 'wix' && !reg.test(shopName)) {
          layer.msg('Please enter a URL starting with http:// or https://')
        } else if ($scope.newPwd == '' || $scope.newPwd == undefined || $scope.newPwd == null) {
          layer.msg('Please set password');
        } else if (!PwdReq.test($scope.newPwd)) {
          layer.msg('Password must be at least 8-15 characters long, including letters, numbers and special characters.')
        } else {
          let url
            , sendData = {
              "userId": $scope.userId,
              "password": $scope.newPwd
            };
          if (shop2 === 'wix') {
            url = 'app/account/wixUpdatePassword';
            sendData.storeName = shopName
          } else {
            url = 'app/account/initPassword';
            sendData.shopName = shopName
          }
          console.log(sendData)
          dsp.load();
          dsp.postFun(url, JSON.stringify(sendData), function (data) {
            dsp.closeLoad();
            if (data.data.statusCode == '200') {
              layer.msg('Password set successfully');
              $('.zzc2').hide();
              $scope.showzzc2 = false;
              sessionStorage.removeItem('isInitial');
              location.href = 'myCJ.html#/myCJAssociatedStore';
            }
          }, function () {
            dsp.closeLoad();
          });
        }
      };

      // 店铺授权（打开页面首先查看是否有code和state参数）
      var code = dsp.getQueryString('code');
      var state = dsp.getQueryString('state');
      var shop = dsp.getQueryString('shop');
      var shopToken = dsp.getQueryString('shopToken');
      var instanceId = dsp.getQueryString('instanceId');
      var wixToken = dsp.getQueryString('token')
      console.log('code=>', code, 'state=>', state, 'shop=>', shop, 'shopToken=>', shopToken, "instanceId=>", instanceId);
      //shopToken='761c4bf88b744eb49a3ae574f6c35c6d';

      if (code && state && shop) { // shopify授权
        var authoStoreData = {};
        authoStoreData.userId = $scope.userId;
        authoStoreData.data = JSON.stringify({
          state: state,
          code: code,
          shop: shop
        });
        // 已经通过cjapp授权，后面通过shopify登录-自动登录
        if (state == 'cjdropshipping') {
          dsp.postFun('app/account/automaticLogin', {
            "shopToken": shopToken
          }, function (data) {
            if (data.data.statusCode == '200') {
              // 保存登录信息
              dsp.saveDataAfterLogin(data.data.result);
              localStorage.setItem('isFirstLogin', '1');
              localStorage.setItem('isEmpower', '2');
              location.href = 'home.html';
            }
          });
        } else if (state == 'shopify') { // shopify主动授权cjapp
          dsp.postFun('app/shop/authorize', JSON.stringify(authoStoreData), function (data) {
            console.log(data);
            if (data.data.statusCode == '200') {
              // 保存登录信息
              dsp.saveDataAfterLogin(data.data.result);
              var a = dsp.isInLoginState();
              console.log(a);
              layer.msg('Authorization Successfully', function () {
                localStorage.setItem('isFirstLogin', '1');
                if (result.newUser == true) {
                  sessionStorage.setItem('isInitial', shop);
                  localStorage.setItem('isEmpower', '1');
                  localStorage.setItem('closeFlag', '');
                  location.href = 'home.html';
                } else {
                  localStorage.setItem('isEmpower', '2');
                  localStorage.setItem('closeFlag', '');
                  location.href = 'myCJ.html#/myCJAssociatedStore';
                }
              });
            }
          });
        } else { // cjapp主动授权shopify
          // 分销域名通过app授权店铺需要
          if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
            dsp.postFun('cj/account/getYm', {
              "name": shop.replace('.myshopify.com', ''),
              "type": "shopify"
            }, function (data) {
              console.log(data);
              if (data.data.isTz) {
                location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
              } else {
                shopifyAuth();
              }
            })
          } else {
            shopifyAuth();
          }
          // shopifyAuth();

          function shopifyAuth() {
            dsp.postFun('app/shop/authorize', JSON.stringify(authoStoreData), function (data) {
              console.log(data)
              var data = data.data;
              var code = data.statusCode;
              if (code == 200) {
                if (state == '11112222aaaaa') {
                  // 保存登录信息
                  dsp.saveDataAfterLogin(data.result);
                  layer.msg('Authorization Successfully', function () {
                    var isEmpower = localStorage.getItem('isEmpower');
                    if (isEmpower == '0') {
                      localStorage.setItem('isEmpower', '1');
                    } else if (isEmpower == '2') {
                      localStorage.setItem('isEmpower', '2');
                    }
                    location.href = 'myCJ.html#/myCJAssociatedStore';
                  });
                } else {
                  layer.open({
                    title: null,
                    type: 1,
                    area: ['480px', '300px'],
                    skin: 'autho-success',
                    success: function (layero, index) {
                      $timeout(function () {
                        layer.close(index);
                        location.href = 'myCJ.html#/authorize/Shopify';
                      }, 2000)
                    },
                    //time: 2000,
                    closeBtn: 0,
                    content: '<div class="AS-content"><img src="./static/image/login/iconsuccess.png" /><p>Authorization Successfully</p></div>'
                  });
                }
              } else {
                if (state == '11112222aaaaa') {
                  layer.msg('Authorization Failed')
                } else {
                  layer.msg('Authorization Failed', function () {
                    location.href = 'myCJ.html#/authorize/Shopify';
                  });
                }
              }
            });
          }
        }
      }
      // wix 授权
      if (code && state && instanceId) {
        let WixsendData = {
          userId: $scope.userId || '',
          token: $scope.token || '',
          data: JSON.stringify({
            code: code,
            state: decodeURIComponent(state),
            instanceId: instanceId
          })
        }
        if (state.includes('wix_cj')) {
          // 用户通过cjapp授权wix店铺回调
          // 分销域名通过app授权店铺需要
          if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
            dsp.postFun('cj/account/getYm', {
              "name": decodeURIComponent(state).replace('wix_cj', ''),
              "type": "wix"
            }, function (data) {
              console.log(data);
              if (data.data && data.data.isTz) {
                location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
              } else {
                wixAuth();
              }
            })
          } else {
            wixAuth();
          }
          // wixAuth();

          function wixAuth() {
            dsp.postFun('app/shop/wixAuthorize', JSON.stringify(WixsendData), function (data) {
              if (data.data.statusCode === '200') {
                layer.msg('Authorization Successfully', function () {
                  localStorage.setItem('isFirstLogin', '1');
                  localStorage.setItem('isEmpower', '2');
                  localStorage.setItem('closeFlag', '');
                  location.href = 'myCJ.html#/authorize/Wix';
                });
              } else {
                layer.msg('Authorization Failed', function () {
                  location.href = 'myCJ.html#/authorize/Wix';
                });
              }
            })
          }
        } else if (state.includes('wix_cj_app')) {
          // 用户从wixapp market添加cjapp，第二次回调
          dsp.postFun('app/shop/appwixAuthorize', JSON.stringify(WixsendData), function (data) {
            if (data.data.statusCode === '200') {
              // 保存登录信息
              dsp.saveDataAfterLogin(data.data.result);
              let result = JSON.parse(data.data.result);
              layer.msg('Authorization Successfully', function () {
                localStorage.setItem('isFirstLogin', '1');
                if (result.newUser) {
                  sessionStorage.setItem('isInitial', 'wix');
                  localStorage.setItem('isEmpower', '1');
                  localStorage.setItem('closeFlag', '');
                  location.href = 'home.html';
                } else {
                  localStorage.setItem('isEmpower', '2');
                  localStorage.setItem('closeFlag', '');
                  location.href = 'myCJ.html#/authorize/Wix';
                }
              });
            }
          });
        }
      }
      // 用户从wixapp market添加cjapp，第一次回调
      if (wixToken) {
        dsp.postFun('app/shop/appWix', { "token": wixToken }, function (data) {
          console.log(data);
          location.href = data.data.result
        });
      }
      // ebay授权
      var ebaytype = dsp.getQueryString('type');
      var ebayname = dsp.getQueryString('state');
      var eabyCode = dsp.getQueryString('code');
      if (ebaytype == 'ebay' && eabyCode) {
        // 分销域名通过app授权店铺需要
        if (window.location.host == 'app.cjdropshipping.com' || window.location.host == 'cjdropshipping.com') {
          dsp.postFun('cj/account/getYm', {
            "name": ebayname,
            "type": "ebay"
          }, function (data) {
            console.log(data);
            if (data.data.isTz) {
              location.href = 'http://' + data.data.domainName + '/home.html' + window.location.search;
            } else {
              ebayAuth();
            }
          })
        } else {
          ebayAuth();
        }
        // ebayAuth();

        function ebayAuth() {
          dsp.postFun('ebay/accredit', {
            type: ebaytype,
            name: ebayname,
            ebayCode: eabyCode
          }, function (data) {
            console.log(data)
            var data = data.data;
            var code = data.statusCode;
            if (code == 200) {
              layer.open({
                title: null,
                type: 1,
                area: ['480px', '300px'],
                skin: 'autho-success',
                success: function (layero, index) {
                  $timeout(function () {
                    layer.close(index);
                    location.href = 'myCJ.html#/authorize/Ebay';
                  }, 2000)
                },
                //time: 2000,
                closeBtn: 0,
                content: '<div class="AS-content"><img src="./static/image/login/iconsuccess.png" /><p>Authorization  Successfully</p></div>'
              });
            } else {
              $scope.authFailLayer = 1;
              $scope.authFailMes = data.message || 'Authorization Failed';
              // layer.msg(data.message ? data.message : 'Authorization Failed', function () {
              //   // location.href = 'myCJ.html#/authorize/Ebay';
              // });
            }
          });
        }
      }
      $scope.reAuthorize = function (shoptype) {
        if (shoptype == 'ebay') {
          location.href = 'myCJ.html#/authorize/Ebay';
        }
      }

      // lazada授权
      var shoptypeLazada = dsp.getQueryString('shoptype');
      var codeLazada = dsp.getQueryString('code');
      if (shoptypeLazada == 'Lazada' && codeLazada) {
        dsp.postFun('lazada/authorize', {
          userId: $scope.userId,
          data: `{\"type\":\"Lazada\",\"code\":\"${codeLazada}\"}`
        }, function (res) {
          // console.log(res)
          var data = res.data;
          var code = data.statusCode;
          if (code == 200) {
            layer.msg('Authorization success', function () {
              location.href = 'myCJ.html#/authorize/Lazada';
            });
          } else if (code === '209') {
            layer.msg(data.message);
          } else {
            layer.msg('Authorization Failed', function () {
              location.href = 'myCJ.html#/authorize/Lazada';
            });
          }
        });
      }

      // shopee授权
      var shopeeId = dsp.getQueryString('shop_id');
      if (shopeeId) {
        dsp.postFun('shopee/saveShop', { 'shop_id': shopeeId, 'userId': $scope.userId, "type": "shopee" },
          function (res) {
            // console.log(res);
            const code = res.data.statusCode
            if (code == 200) {
              layer.msg('Authorization success', function () {
                location.href = 'myCJ.html#/authorize/Shopee';
              });
            } else {
              layer.msg('Authorization Failed', function () {
                location.href = 'myCJ.html#/authorize/Shopee';
              });
            }
          });
      }

      $scope.toDetailPage = function (flag, id) {
        cjhome.toDetailPage(flag, id);
      }
      $scope.toDetailWithSource = function (id) {
        cjhome.toDetailWithSource(id)
      }
      $scope.toDetailWithList = function (id) {
        cjhome.toDetailWithList(id)
      }
      $scope.goTodetail = function (item) {
        let CategoryList = JSON.parse(sessionStorage.getItem('CategoryList'));
        let arr = [];
        let idx = null;
        CategoryList.forEach(function (o, i) {
          if (o.nameEn == item.categoryNameEn) {
            arr.push({
              id: o.id,
              name: o.nameEn
            });
            idx = 0;
          }
          o.children.forEach(function (k, j) {
            if (k.nameEn == item.categoryNameEn) {
              arr.push({
                id: o.id,
                name: o.nameEn
              }, {
                id: k.id,
                name: k.nameEn
              });
              idx = 1;
            }
            k.children.forEach(function (a, b) {
              if (a.nameEn == item.categoryNameEn) {
                arr.push({
                  id: o.id,
                  name: o.nameEn
                }, {
                  id: k.id,
                  name: k.nameEn
                }, {
                  id: a.id,
                  name: a.nameEn
                });
                idx = 2;
              }
            })
          })
        });
        arr = JSON.stringify(arr.slice(0, idx + 1));
        location.href = `list-detail.html?id=${item.categoryId}&name=${bs.encode(arr)}&from=all&fromType=all`
      }
      $scope.addStatisFun = (type) => {
        dsp.postFun('pojo/home/addStatisByType', {
          entryPage: type
        }, res => { console.log(res.data) })
      }
      if (dsp.getQueryString('source')) {
        localStorage.setItem('adsource', dsp.getQueryString('source'));
      }
    } catch (error) {
      console.warn(error)
      // location.href = 'error.html';
    }
    
  }]);
  app.filter('startFrom', function () {
    return function (input, start) {
      if (input) {
        start = +start; //parse to int
        return input.slice(start);
      }
      return [];
    }
  });
  //滚动指令
  app.directive('whenScrolled', function () {
    return function (scope, elm, attr) {

    };
  });
  app.factory('$exceptionHandler', function () {
    return function (exception, cause) {
      // location.href = 'error.html';
      exception.message += ' (caused by "' + cause + '")';
      throw exception;
    };
  });
})(Base64)
