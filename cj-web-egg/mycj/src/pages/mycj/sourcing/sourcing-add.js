import lottie from 'lottie-web'

export function sourcingAddFactory(angular) {
  const module = angular.module('sourcing-add.module', ['service', 'home-service']);

  module.directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse){
    return {
      restrict:'A',
      link: function(scope, element, attr){
        if(scope.$last === true){
          $timeout(function(){
            scope.$eval(attr.onFinishRender)
          })
        }
      }
    }
  }])

  module.controller('sourcing-add.ctrl',
    ['$scope', '$rootScope', '$stateParams', 'dsp', '$location', 'cjhome', '$sce',
      function ($scope, $rootScope, $stateParams, dsp, $location, cjhome, $sce) {
        const userInfo = $rootScope.userInfo;
        var base64 = $rootScope.base64;
        var userId = userInfo.userInfo;
        var username = userInfo.name;
        var salesmanid = userInfo.salesmanId;
        var relateSalesman = userInfo.relateSalesman;
        $scope.isVip = userInfo.vip;
        $scope.pageNum = '1';
        $scope.pageSize = '6';
        
        if ($stateParams.spName == undefined) {
          $scope.spname == ''
        } else {
          $scope.spname = base64.decode($stateParams.spName);
        }
        if ($stateParams.storeId == undefined) {
          $scope.storeId == '';
        } else {
          $scope.storeId = $stateParams.storeId;
        }
        $scope.supplierId = $stateParams.supplierId
        $scope.supplierName = $stateParams.supplierName
        
        function err(name) {
          // layer.closeAll("loading");
          dsp.closeLoad();
          
        }

        var editor
        
        const initEditor = () => {
          // 商品描述 富文本编辑器用户输入值
          editor = new wangEditor('editor-trigger');
          editor.config.menus = [
            // '|',     // '|' 是菜单组的分割线
            'fontsize',
            'bold',
            'italic',
            'underline',
            'alignleft',
            'aligncenter',
            'alignright',
            'forecolor',
            'link',
          ];
          editor.config.lang = wangEditor.langs['en'];
          editor.create();
        };

        if (typeof wangEditor === 'undefined') {
          window.addEventListener('load-script', ev => {
            if (ev.detail.name === 'wangEditor.min.js') {
              initEditor();
            }
          })
        } else {
          initEditor();
        }

        $scope.$on('syncstoresuccess', function () {
          location.reload();
        })

        function getCategory () {
          dsp.postFun('erpSupplierSourceProduct/list', {}, function(res) {
            $scope.categoryList = res.data.data;
          }, err);
        }

        getCategory();

        $scope.purchasingType = '1';
        $scope.commoditytype = 'store';
        $scope.producname = $scope.spname || '';
        
        function getShop() {
          const params = {
            data: JSON.stringify({
              userId
            })
          }
          dsp.postFun('app/shop/getshop', params, ({data}) =>{
            dsp.closeLoad();
            $scope.producname = ''
            const obj = JSON.parse(data.result);
            $scope.shopselectlist = obj.shoplist;
            $scope.selectshopinfo = $scope.shopselectlist[0];
            $scope.storeinfo = $scope.selectshopinfo;
            $scope.$broadcast('currStoreId', $scope.storeinfo);
            getProData ()
          }, err =>{
            dsp.closeLoad();
            console.log(err);
          });
        }
  
        getShop()
        
        // 查询商品
        function getProData () {
          const params = {
            data: JSON.stringify({
              pageNum: $scope.pageNum,
              pageSize: $scope.pageSize,
              userId: userId,
              shopId: $scope.selectshopinfo.ID || '',
              productName: $scope.producname
            })
          }
          layer.load()
          dsp.postFun('app/sourcing/shopproduct', params, ({data}) =>{
            dsp.closeLoad();
            if (data.statusCode != 200) {
              layer.msg('The server is busy now, please try again later.');
              return false;
            }
            const result = JSON.parse(data.result);
            
            $scope.totalNum = result.count;
            $scope.sourceobj = result;
            for (var i = 0; i < result.shopProduct.length; i++) {
              result.shopProduct[i].flag = false;
            }
            $scope.goodList1 = result.shopProduct;
            
            $scope.totalCounts = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalCounts,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize,
              pagesizeList: []
            });
          }, function (err) {
            layer.msg('The server is busy now, please try again later.');
          });
        }

        $scope.handleShopChange = function (n) {
          
          /** 修复如果没有店铺就获取不到店铺信息然后报错一直loding的bug */
          if (!$scope.selectshopinfo) {
            return;
          }
          /** 修复如果没有店铺就获取不到店铺信息然后报错一直loding的bug end */
          $scope.itemarr = [];
          $scope.likeImgArr = [];
          $scope.pageNum = '1';
          getProData ()
          // 告诉synn组件当前店铺id
          $scope.storeinfo = $scope.selectshopinfo;
          $scope.$broadcast('currStoreId', $scope.storeinfo);
        }
  
        $scope.handleProSearch = function () {
          
          if (!$scope.selectshopinfo) {
            layer.msg('Please select store first.');
            return;
          }
          $scope.pageNum = '1';
          getProData ()
        }
  
        // 按enter搜索
        $(document).keyup(function (event) {
          if (event.keyCode == 13) {
            $scope.pageNum = '1'
            $scope.handleProSearch()
          }
        });
        
        
        //查看单选框
        $scope.radioFun1 = function () {
          $scope.commoditytype = 'store';

        }
        $scope.radioFun2 = function () {
          $scope.commoditytype = 'individual';
        }
        $scope.commodityname = '';
        $scope.uploadImgs = []; // 待上传图片列表

        //城市列表 individual
        dsp.getFun('app/account/countrylist', ({data}) =>{
          $scope.countrylist = JSON.parse(data.result);
        }, err =>{
          console.log(err);
        });

        dsp.getFun('source/sourcing/daySourceCount', function (data) {
          layer.closeAll('loading');
          var data = data.data;
          
          // var result = JSON.parse(data.result).count * 1;
          $scope.sourceNum = data.count;
          if (data.count == 0) {
            layer.msg('Please note you can send us only ' + data.dayNum + ' daily. <br />Currently available ' + data.count + '. ');
            // layer.msg('Note: The maximum sourcing requests per day are '+ data.dayNum +'. You have '+ data.count +' remaining.')
            $('.sub-btn').css({
              'opacity': '0.5',
              'cursor': 'not-allowed'
            });
          }
        });


        //添加商品信息 store
        $scope.itemarr = []
        $scope.likeImgArr = []
        $scope.openProductBox = false
        $scope.addsubmit = function (item, index) {
          
          if (item.flag == false) {
            if ($scope.itemarr.length < $scope.sourceNum) {
              $scope.itemarr.push(item);
              $scope.goodList1[index].flag = true;
              
            } else {
              layer.msg('Please note you can send us only 20 daily. <br />Currently available ' + $scope.sourceNum + '. ');
            }
          } else {
            $scope.goodList1[index].flag = false;
            $scope.itemarr.splice($scope.itemarr.indexOf(item), 1);
          }
          let image;
          
          if (item.image.includes('?')) {
            image = item.image.substring(0, item.image.indexOf("?"));
          } else {
            image = item.image
          }
          const key = `${item.id}`
          if (!$scope.likeImgArr[key]) {
            
            // layer.load()
            const formData = new FormData();
            let likeObj = {}
            formData.append('imgUrl', image);
            item.loading = true
            dsp.postFun(
              'app/picture/searchImg',
              formData,
              res => {
                item.loading = false
                if (res.data.statusCode == 200) {
                  // layer.closeAll('loading');
                  const resData = JSON.parse(res.data.result);
                  likeObj['likes'] = resData;
                  likeObj['flag'] = true
                  $scope.likeImgArr[key] = likeObj
                  $scope.flagLike = $scope.likeImgArr[key].flag
                } else {
                  layer.closeAll('loading');
                  // return layer.msg('Get the product data error');
                }
              },
              err => console.error(error),
              {
                headers: {
                  'Content-Type': undefined
                },
                // layer2: false
              }
            );
          }
        }

        /**
         * 上传图片相关
         */

        $scope.upLoadImg4 = function (files) {
          const file = files[0];
          const fileName = file.name;
          // 图片格式 allow: *.jpg/*.png/*.png/*.JPG
          if (!/.png|.jpg|.PNG|.JPG$/.test(fileName)) {
            return layer.msg('Invalid image. Only JPG and PNG supported.');
          }
          // 当前数据容器
          const current = {};
          current.file = file;
          // 如果上传的图片已在待上传列表直接 return
          if (
            $scope.uploadImgs.some(
              f => f.file.name === file.name && f.file.size === file.size
            )
          ) {
            return;
          }
          // 上传阿里云
          dsp.ossUploadFile($('#file')[0].files, function (data) {
            $('#file').val('');
            if (data.code == 0) {
              layer.msg('Images Upload Failed');
              return;
            }
            if (data.code == 2) {
              layer.msg('Images Upload Incomplete');
            }
            const resUrl = data.succssLinks[0];
            current.url = resUrl;
            $scope.uploadImgs.push(current);
            getSearchImg(file);
          }, true);
          // 查找相似图片  -  以图搜图
          function getSearchImg(file) {
            current.loading = true
            const formData = new FormData();
            formData.append('uploadimg', file);
            dsp.postFun(
              'app/picture/searchUpload',
              formData,
              res => {
                current.loading = false
                if (res.data.statusCode != 200) {
                  // return layer.msg('Get the product data error');
                } else {
                  const resData = JSON.parse(res.data.result);
                  // flag: 1 => list 0 => source
                  current.likes = resData.location;
                  current.likes.length =
                    current.likes.length > 10 ? 10 : current.likes.length;
                }
              },
              err => console.error(error),
              {
                headers: {
                  'Content-Type': undefined
                },
                // layer2: true
              }
            );
          }
        };

        // lottie
        function createLottieAnimation(id){
          const dom = document.getElementById(id)
          
          if(!dom) return 
          lottie.loadAnimation({
            container: dom, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/egg/image/cj_lottie.json'// the path to the animation json
          });
        }

        $scope.loadingCjLottie = function(){
          createLottieAnimation('loading-animation' + ($scope.uploadImgs.length - 1)) // 渲染cj-lottie动画
        }

        $scope.goodListloadingCjLottie = function(){
          const list = $scope.goodList1
          list.forEach((item, index) => {
            createLottieAnimation('loading-animation-list' + index)
          })
        }

        // 跳转到搜图列表
        $scope.targetToSearchImgList = ({ file }, _url) => {
          if (!file && !_url) return;
          let fileName;
          let url;
          // file 处理
          if (file) {
            fileName = file.name;
            url = URL.createObjectURL(file) // 获取图片暂时性链接
            fetch(url, { mode: 'no-cors' })
              .then(pic => pic.blob()) // 通过 fetch 将图片转 blob
              .then(pic => {
                const fr = new FileReader(); // 通过fileReader 转 dataURL
                fr.onload = () => {
                  const dataURL = fr.result;
                  // 将 图片信息 存进 localStorage
                  localStorage['_search_pic_'] = JSON.stringify({
                    dataURL,
                    fileName
                  });
                };
                fr.readAsDataURL(pic);
              })
              .then(() => window.open('list-detail.html?searchImg=1'));
          } else { // url 处理
            url = _url
            fileName = _url.split('?')[0];
            const loading = layer.load()
            /**
             * 这里需要先用 canvas生成图片再转base64 存进local
             */
            const image = new Image();
            image.src = _url + '&time=' + new Date().valueOf() // 加时间戳解决跨域拦截？cdn缓存？
            image.crossOrigin = '*'; // 解决浏览器权限限制
            image.onload = function () {
              layer.close(loading)
              const canvas = document.createElement('canvas');
              canvas.width = image.width
              canvas.height = image.height
              canvas.getContext('2d').drawImage(image, 0, 0);
              const dataURL = canvas.toDataURL('image/png')
              // 将 图片信息 存进 localStorage
              localStorage['_search_pic_'] = JSON.stringify({
                dataURL,
                fileName
              });
              window.open('list-detail.html?searchImg=1')
            }
          }
          // const fileName = file.name;
          // const url = _url || ;
        };
        //删除图片
        $scope.deleteImgFun = function (index) {
          $scope.uploadImgs.splice(index, 1);
        }

        /**
         * 相似图片
         */
        let nums = []; // 临时长度=10， 记录相似图片的展示index
        $scope.prev = (i, len, e) => {
          
          if (!nums[i]) {
            nums[i] = 0
          }
          let bedImgs = e.target.nextElementSibling.children[0];
          nums[i]--;
          if (nums[i] < 0) {
            nums[i] = len - 3;
          }
          bedImgs.style.transform = `translateX(-${78 * nums[i]}px)`;
        };

        $scope.next = (i, len, e) => {
          if (!nums[i]) {
            nums[i] = 0
          }
          let bedImgs = e.target.previousElementSibling.children[0];
          nums[i]++;
          if (nums[i] > len - 3) {
            nums[i] = 0;
          }
          bedImgs.style.transform = `translateX(-${78 * nums[i]}px)`;
        };


        // 验证价格是否为数字
        $scope.isNumber = function () {
          if (isNaN($scope.price) || $scope.price*1<=0) {
            $scope.priceTip = 'Please enter the amount.';
            $scope.price="0"
          } else {
            $scope.priceTip = false;
          }
        }
        //提交商品信息
        $scope.sourcesubmit = newSourcesubmit
        function newSourcesubmit(params) {
          if($stateParams.supplierId){
            checkFreeze($stateParams.supplierId)
            .then(result => {
              if(result){
                return
              }
              sourcesubmit()
            })
            .catch((error) => {
            console.log(error);
            })
          }else{
            sourcesubmit()
          }
        } 

        function sourcesubmit() {
          if ($scope.sourceNum == 0) {
            return;
          }
          if ($scope.commoditytype == "store") {
            if ($scope.productTag == undefined) {
              layer.msg('Please select a product tag.');
              return;
            }
            if ($scope.itemarr.length != 0) {
              //    店铺商品
            
              var type = 0;
              //提交
              var arr = [];
              var temObj = {};
              for (var i = 0; i < $scope.itemarr.length; i++) {
                
                if ($scope.spname) {
                  temObj.productName = $scope.itemarr[i].title.replace(/('|"|“|”|‘|’)/g, '');
                  temObj.price = $scope.itemarr[i].prices;
                  temObj.imageUrl = $scope.itemarr[i].image;
                  temObj.userId = userId;
                  temObj.pid = $scope.itemarr[i].pid;
                  temObj.name = username;
                  temObj.sourcetype = type;
                  temObj.shopId = $scope.storeId;
                  temObj.shopName = $scope.itemarr[i].shopName;
                  temObj.salesmanid = salesmanid;
                  temObj.relateSalesman = relateSalesman;
                } else {
                  temObj.productName = $scope.itemarr[i].title.replace(/('|"|“|”|‘|’)/g, '');
                  temObj.price = $scope.itemarr[i].prices;
                  temObj.imageUrl = $scope.itemarr[i].image;
                  temObj.userId = userId;
                  temObj.pid = $scope.itemarr[i].pid;
                  temObj.name = username;
                  temObj.sourcetype = type;
                  temObj.shopId = $scope.itemarr[i].shopId;
                  temObj.shopName = $scope.itemarr[i].shopName;
                  temObj.salesmanid = salesmanid;
                  temObj.relateSalesman = relateSalesman;
                }
                if($stateParams.supplierId) {
                  temObj.supplierId = $stateParams.supplierId === 'undefined' ? null : $stateParams.supplierId;
                }
                temObj.sourceCategory = $scope.productTag.id;
                temObj.categoryName = $scope.productTag.name;
                temObj.searchSource = "cj-web"
                
                arr.push(JSON.stringify(temObj));
                // arr.push(temObj);
                temObj = {};
                // arr.push(str);
              }
              
              var str2 = arr.join(",");
              goActSource($scope.itemarr.length, 'priv', function (index) {
                layer.load(2)
                dsp.postFun('source/sourcing/addSource', {
                  "data": "[" + str2.replace(/"/g, "'") + "]"
                }, function (data) {
                  layer.closeAll('loading');
                  let result = JSON.parse(data.data.result)
                  $scope.reData = result.repeatList

                  if (data.data.statusCode == 200) {
                    layer.msg('Submitted Successfully');
                    $location.path('sourcing');
                  } else if (data.data.statusCode == '1001') {
                    layer.msg(data.data.message);
                  } else if(data.data.statusCode == '1104') {
                    layer.open({
                      area: ['480px', 'auto'],
                      title: ['Note', 'padding-left: 25px'],
                      type: 1,
                      shadeClose: true,
                      move:false,
                      skin: 'center-layer',
                      content: '<p>You have already submitted the same request(s). Please select a new product for sourcing.</p>',
                      btn: ['Cancel', 'OK'],
                      btnAlign: 'c',   
                      btn2: function (index, layero) {
                        layer.close(index);
                      },
                    })
                  } else if(data.data.statusCode == '1105') {
                    layer.open({
                      area: ['580px','430px'],
                      title: ['Note', 'padding-left: 25px'],  
                      type: 1,
                      shadeClose: true,
                      move:false,
                      skin: 'center-layer',
                      content: $('#openProductBox'),
                      btn: ['Cancel', 'Remove and Proceed'],
                      btnAlign: 'c',
                      yes: function (index, layero) {
                        layer.close(index);
                      },
                      btn2: function (index, layero) {
                        for( let i = 0; i < $scope.itemarr.length; i++) {
                          for(let j = 0; j < $scope.reData.length; j++) {
                            if($scope.itemarr[i].pid === $scope.reData[j].pid) {
                              $scope.itemarr.splice(i, 1)
                            }
                          }
                        }

                        let proceArr = []
                        let proceObj = {}
                        for(let i = 0; i < $scope.itemarr.length; i++) {
                          proceObj.productName = $scope.itemarr[i].title.replace(/('|"|“|”|‘|’)/g, '');
                          proceObj.price = $scope.itemarr[i].prices;
                          proceObj.imageUrl = $scope.itemarr[i].image;
                          proceObj.userId = userId;
                          proceObj.pid = $scope.itemarr[i].pid;
                          proceObj.name = username;
                          proceObj.sourcetype = type;
                          proceObj.shopId = $scope.itemarr[i].shopId;
                          proceObj.shopName = $scope.itemarr[i].shopName;
                          proceObj.salesmanid = salesmanid;
                          proceObj.relateSalesman = relateSalesman;
                          if($stateParams.supplierId) {
                            proceObj.supplierId = $stateParams.supplierId === 'undefined' ? null : $stateParams.supplierId;
                          }
                          proceObj.sourceCategory = $scope.productTag.id;
                          proceObj.categoryName = $scope.productTag.name;
                          proceObj.searchSource = "cj-web"

                          proceArr.push(JSON.stringify(proceObj))
                          proceObj = {}
                        }

                        let proceStr = proceArr.join(",")

                        goActSource1($scope.itemarr.length, 'priv', function() {
                          dsp.postFun('source/sourcing/addSource', {
                            "data": "[" + proceStr.replace(/"/g, "'") + "]"
                          }, function(data) {
                            if(data.data.statusCode == 200) {
                              layer.msg('Added Success');
                              $location.path('sourcing');
                            } else if(data.data.statusCode == '1203') {
                              layer.msg(data.data.message)
                            }
                          }, function(n) {
                            console.log(n)
                          })
                        })

                      },
                      success: function() {
                        $scope.openProductBox = true
                      }
                    })
                  } else if(data.data.statusCode == '1203') {
                    layer.msg(data.data.message)
                  }
                  layer.close(index);
                }, function (n) {
                  console.log(n)
                });
              });


            } else {
              layer.msg('Please select the sourcing product.');
            }
          } else if ($scope.commoditytype == "individual") {
            let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            if (!$scope.producname1) {
              layer.msg('Please enter the product title.');
            } else if ($scope.productTag == undefined) {
              layer.msg('Please select a product tag.');
            } else if ($scope.price == undefined) {
              layer.msg('Please enter the target price.');
            } else if (isNaN($scope.price - 0)) {
              layer.msg('Please input the number.');
            } else if ($scope.country == undefined) {
              layer.msg('Please select the destination country.');
            } else if ($scope.sourceUrl == undefined) {
              layer.msg('Please input product link.');
            } else if (!reg.test($scope.sourceUrl)) {
              layer.msg('Please input correct product link.');
            } else if ($scope.purchasingType == '1' && !$scope.estimatedQuntity) {
              layer.msg('Please input estimated quantity.');
            } else {
              var type = 1;
              // console.log($scope.producname1, $scope.price, $scope.sourceUrl, $scope.uploadImgs, editor.$txt.text());
              var arr = [];
              var obj = {};

              obj.productName = $scope.producname1.replace(/('|"|“|”|‘|’)/g, '');
              obj.price = $scope.price;
              obj.sourceUrl = $scope.sourceUrl;
              obj.imageUrl = $scope.uploadImgs.map(_ => _.url).join(',');
              obj.description = typeof editor === 'undefined' ? '' : editor.$txt.text().trim();
              obj.userId = userId;
              obj.name = username;
              obj.relateSalesman = relateSalesman;
              obj.salesmanid = salesmanid;
              obj.sourcetype = type;
              obj.country = $scope.country;
              obj.purchasingType = $scope.purchasingType;
              obj.estimatedQuntity = $scope.estimatedQuntity;
              obj.sourceCategory = $scope.productTag.id;
              obj.categoryName = $scope.productTag.name;
              if($stateParams.supplierId) {
                  obj.supplierId = $stateParams.supplierId === 'undefined' ? null : $stateParams.supplierId;
              }
              obj.searchSource = "cj-web"
              // obj.country = $scope.country.NAME_EN;
              arr.push(obj);
              // obj.country=$scope.country.NAME_EN;
              console.log({
                "data": JSON.stringify(arr)
              });
              goActSource(1, 'priv', function (index) {
                layer.load(2)
                dsp.postFun('source/sourcing/addSource', {
                  "data": JSON.stringify(arr)
                }, function (data) {
                  layer.closeAll('loading');
                  if (data.data.statusCode == 200) {
                    layer.msg('Submitted Successfully');
                    $location.path('sourcing');
                  } else if (data.data.statusCode == '1001')  {
                    layer.msg(data.data.message);
                  } else if(data.data.statusCode == '1203') {
                    layer.msg(data.data.message)
                  } else {
                    layer.msg('Added failure.');
                  }
                  layer.close(index);
                }, function (n) {
                  console.log(n.data);
                })
              });

            }
          }
        }

        function goActSource(id, flag, cb) {
          layer.load(2);
          dsp.getFun('source/sourcing/daySourceCount', function (data) {
              layer.closeAll('loading');
              var data = data.data;
              if (data.count == 0) {
                  // layer.msg('Please note you can send us only ' + data.dayNum + ' daily. <br />Currently available ' + data.count + '. ');
                  layer.msg('Note: You can post '+ data.dayNum +' sourcing requests per day at most. You have '+ data.count +' remaining.')
                  return;
              }
              if (flag == 'priv' && id > data.count) {
                  // layer.msg('Please note you can send us only ' + data.dayNum + ' daily. <br />Currently available ' + data.count + '. ');
                  layer.msg('Note: You can post '+ data.dayNum +' sourcing requests per day at most. You have '+ data.count +' remaining.')
                  return;
              }
              layer.open({
                  area: ['480px', '240px'],
                  title: ['Note', 'padding-left: 25px'],
                  type: 1,
                  closeBtn: 1,
                  btn: ['Cancel', 'Confirm'],
                  btnAlign: 'c',
                  shadeClose: true,
                  skin: 'center-layer',
                  content: '<p style="margin-top:36px">You can post ' + data.dayNum + ' sourcing requests per day at most. <br />' +
                  'You have ' + data.count + ' remaining.<br /></p>',
                  yes: function (index, layero) {
                      layer.close(index);
                  },
                  btn2: function (index, layero) {
                      // layero[0].children[2].lastElementChild.style['pointer-events'] = "none";
                      if (flag == 'priv') {
                          cb(index);
                          return false;
                      }
                      layer.load(2);
                      dsp.postFun('source/sourcing/sourceProduct', {'pid': id + '','searchSource':'cj-web'}, function (data) {
                          layer.closeAll('loading');
                          var data = data.data;
                          if (data.statusCode != 200) {
                              if (data.statusCode == 806) {
                                  layer.msg('Note: The maximum sourcing requests per day are ' + data.dayNum + '. ', {time: 2000}, function () {
                                      layer.close(index);
                                  });
                              } else if (data.statusCode == 807) {
                                  layer.msg('The sourcing request already existed. ', {time: 2000}, function () {
                                      layer.close(index);
                                  });
                              }
                              return false;
                          }
                          layer.msg('Source success.', {time: 2000}, function () {
                              layer.close(index);
                          });
                          // location.href="home.html";
                      })
                      return false
                  },
              });
          }, err);
      }

      // Remove and Proceed按钮的请求函数
        function goActSource1(id, flag, cb) {
          layer.load(2);
          dsp.getFun('source/sourcing/daySourceCount', function (data) {
              layer.closeAll('loading');
              var data1 = data.data;
              if (data1.count == 0) {
                  layer.msg('Note: You can post '+ data1.dayNum +' sourcing requests per day at most. You have '+ data1.count +' remaining.')
                  return;
              }
              if (flag == 'priv' && id > data1.count) {
                  layer.msg('Note: You can post '+ data1.dayNum +' sourcing requests per day at most. You have '+ data1.count +' remaining.')
                  return;
              }
              if (flag == 'priv') {
                cb();
                return false;
              }
          }, err);
        }

        // 检查该供应商是否被冻结
        function checkFreeze(supplierId) {
          const arr = [supplierId]
          const params = {
            supplierIds: arr
          }
          
          return new Promise((resolve,reject)=>{
            dsp.postFun('supplier/supplierShopFreeze/checkShopIsFreeze',params , function (res) {
              const { data } = res
              if(data.code == 7000004){
                resolve(true)
                layer.msg("Store closed now, please submit later.")
              }else{
                resolve(false)
              }
            })
          })
        }
        
        //分页
        $scope.$on('pagedata-fa', function (d, data) {
          
          $scope.pageNum = data.pageNum;
          $scope.pageSize = data.pageSize;
          getProData();
        });
        
        //store 店铺搜品 取消按钮
        $scope.scancelFun = function () {
          $location.path('/sourcing');
          $scope.itemarr = [];
          $('.top-drop-pro > div').removeClass('top-list-item2')
        }
        //individual 个性搜品 取消按钮
        $scope.icancelFun = function () {
          // console.log($scope.producname1, $scope.price, $scope.sourceUrl, $scope.uploadImgs, editor.$txt.text().trim());
          $scope.price = '';
          $scope.producname1 = '';
          $scope.sourceUrl = '';
          $scope.uploadImgs = [];
          editor && editor.clear();
          // $scope.countrylist='';
          $scope.country = '';

        }
        $scope.onlyNumber = () => {
          $scope.estimatedQuntity = $scope.estimatedQuntity.replace(/[^\d]/g, '');
        }

        /* 去1688/taobao/插件处理 */
        $rootScope.isSwitch = false;
        $scope.isCJPub = false;
        $scope.isInstall = false;
        var isCrx = document
          .getElementsByTagName('body')[0]
          .getAttribute('data-cjcrx');
        var isInstallCJPub = sessionStorage.getItem('isInstallCJPub');
        $scope.CJPubTitle = 'Install CJ Chrome Extension';
        $scope.CJPubtxt =
          'We found you have not installed CJ Chrome Extension, do you want to install it?';
        $scope.isCJPub = isInstallCJPub == '1' && !isCrx;
        $scope.backFlag = false;
        $scope.yaoliuFlag = true;
        $scope.taobaoFlag = true;
        $scope.goTo1688 = () => {
          $scope.addStatisFun(9);
          if (isCrx) {
            $scope.SwitchURL = $sce.trustAsResourceUrl('https://www.1688.com/');
            window.open('https://www.1688.com/')
          } else {
            $scope.isCJPub = true;
          }
        };
        $scope.goToTaobao = () => {
          $scope.addStatisFun(9);
          if (isCrx) {
            window.open('https://www.taobao.com/')
          } else {
            $scope.isCJPub = true;
          }
        };
        $scope.goToAliExpress = () => {
          $scope.addStatisFun(9);
          if (isCrx) {
            window.open('https://alitems.com/g/1e8d11449400282ca80416525dc3e8/');
          } else {
            $scope.isCJPub = true;
          }
        };
        $scope.backCJ = () => {
          $scope.addStatisFun(9);
          $rootScope.isSwitch = false;
          $scope.backFlag = false;
          $scope.yaoliuFlag = true;
          $scope.taobaoFlag = true;
        };

        /* 菜单埋点 */
        $scope.addStatisFun = (type, ev) => {
          dsp.postFun('pojo/home/addStatisByType', {
            entryPage: type
          }, res => { console.log(res.data) })
        }

        $scope.Install = () => {
          $scope.isInstall = true;
          $scope.CJPubTitle = 'Refresh Page Required:';
          $scope.CJPubtxt =
            'If you had installed the extension, please click Refresh button.';
          window.open(
            'https://chrome.google.com/webstore/detail/cjdropshipping/mbndljkgaoailfnpeodnlejigmkdpokb?utm_source=chrome-ntp-icon'
          );
        };

        $scope.Cancel = () => {
          sessionStorage.removeItem('isInstallCJPub');
          $scope.isCJPub = false;
        };

        $scope.Refresh = () => {
          $scope.isCJPub = false;
          location.reload();
          sessionStorage.removeItem('isInstallCJPub');
        };

        $scope.backPage = () =>{
          window.history.go(-1);
        }

        /* End */ 

      }])

  return module;
}
