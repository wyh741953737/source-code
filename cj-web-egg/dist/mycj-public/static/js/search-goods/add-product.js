(function() {
  var app = angular.module('addproduct-app', ['service']);
  var winHeight = $(window).height() * 1;
  var rightBarHeight = winHeight -191;
  var nodataHeight = winHeight - 311;
  app.controller('addproduct-ctrl', ['$scope', '$routeParams', '$http', 'dsp', '$location', 'cjhome', function($scope, $routeParams, $http, dsp, $location, cjhome) {
    // var bs = new Base64();

    var base64 = new Base64();
    var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
    var username = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('name'));
    var salesmanid = base64.decode(localStorage.getItem('salesmanId') == undefined ? "" : localStorage.getItem('salesmanId'));
    var relateSalesman = base64.decode(localStorage.getItem('relateSalesman') == undefined ? "" : localStorage.getItem('relateSalesman'));
    console.log(salesmanid);
    console.log(relateSalesman);
    if ($routeParams.spName == undefined) {
      $scope.spname == ''
    } else {
      $scope.spname = base64.decode($routeParams.spName);
    }
    if ($routeParams.storeId == undefined) {
      $scope.storeId == '';
    } else {
      $scope.storeId = $routeParams.storeId;
    }
    console.log($scope.spname)
    console.log($scope.storeId)
    function err(name) {
      // layer.closeAll("loading");
      dsp.closeLoad();
      console.log(name);
    }


    $('.header-nav > ul > li').eq(0).addClass('active');

    // dsp.load();

    console.log($scope.spname);
    // console.log('addproduct-ctrl')
    // 商品描述 富文本编辑器用户输入值
    var editor = new wangEditor('editor-trigger');
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

    // 按enter搜索
    $(document).keyup(function(event) {
      if (event.keyCode == 13) {
        $("#searchbtn").trigger("click");
      }
    });

    $scope.$on('syncstoresuccess', function () {
      location.reload();
    })

    $scope.purchasingType='1';
    if ($scope.spname) {
      $scope.commoditytype = 'store';
      $scope.producname = $scope.spname;
      //下拉框选项 store
      dsp.postFun('app/shop/getshop', {
        "data": "{'userId':'" + userId + "'}"
      }, getshop, err);

      function getshop(n) {
        // alert(1)
        var obj = JSON.parse(n.data.result);
        console.log('下拉', obj.shoplist)
        $scope.shopselectlist = obj.shoplist;
        $scope.selectshopinfo = "";
        $scope.likeImgArr = []
        console.log($scope.likeImgArr)
        // $scope.searchshopcommodity();
      };

      function err(n) {
        $scope.noDataFound = true;
      }




      var obj = {
        "data": "{'pageNum':'1','pageSize':'6','userId':'" + userId + "','shopId':'','productName':'" + $scope.producname + "'}"
      };
      dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
              pageNum: '1',
              pageSize: '6',
              userId: userId,
              shopId: '',
              productName: $scope.producname
      })}, shopcon, function(err) {
          layer.msg('The server is busy now, please try again later.');
      });
      // layer.closeAll("loading");
      dsp.closeLoad();
      // alert(1);
      function shopcon(data) {
        // alert(3);
        // layer.closeAll("loading");
        dsp.closeLoad();
        var data = data.data;
        if (data.statusCode != 200) {
          layer.msg('The server is busy now, please try again later.');
          return false;
        }
        var result = JSON.parse(data.result);
        console.log(result);
        $scope.sourceobj = result;
        for (var i = 0; i < result.shopProduct.length; i++) {
          result.shopProduct[i].flag = false;
        }
        $scope.goodList1 = result.shopProduct;
        console.log('goodlist>>>>',$scope.goodList1);
        $scope.noDataFound = result.count == 0;
        pageFun($("#page7"), result.count, 8, $scope.pagenum, function(n, type) {
          if (type == 'init') {
            return;
          }

          var obj = {
            "data": "{'pageNum':'" + n + "','pageSize':'6','userId':'" + userId + "','':'','productName':'" + $scope.producname + "'}"
          }

          dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
              pageNum: n,
              pageSize: '6',
              userId: userId,
              // shopId: $scope.selectshopinfo,
              productName: $scope.producname
          })}, function(data) {
            var data = data.data;
            if (data.statusCode != 200) {
              layer.msg('The server is busy now, please try again later.');
              return false;
            }
            var result = JSON.parse(data.result);
            // console.log(result);

            for (var i = 0; i < result.shopProduct.length; i++) {
              result.shopProduct[i].flag = false;
            }
            $scope.goodList1 = result.shopProduct;
          });
        })

      }

      //获取店铺 store
      $scope.searchshopcommodity = function(n) {
          // alert(2);
          
          console.log($scope.selectshopinfo);
          // $('#product-name').val("");
          var obj = {
            "data": "{'pageNum':'1','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "'}"
          }
          dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
              pageNum: '1',
              pageSize: '6',
              userId: userId,
              shopId: $scope.selectshopinfo.ID,
              productName: $scope.producname
          })}, function(data) {

            var data = data.data;
            if (data.statusCode != 200) {
              layer.msg('The server is busy now, please try again later.');
              return false;
            }
            $scope.likeImgArr = []
            var result = JSON.parse(data.result);
            console.log(result);
            $scope.sourceobj = result;
            $scope.goodList1 = result.shopProduct;
            console.log($scope.goodList1)
            $scope.noDataFound = result.count == 0;
            pageFun($("#page7"), result.count, 8, $scope.pagenum, function(n, type) {
              if (type == 'init') {
                return;
              }
              var obj = {
                "data": "{'pageNum':'" + n + "','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "','productName':'" + $scope.producname + "'}"
              }
              dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
                pageNum: n,
                pageSize: '6',
                userId: userId,
                shopId: $scope.selectshopinfo.ID,
                productName: $scope.producname
              })}, function(data) {
                var data = data.data;
                if (data.statusCode != 200) {
                  layer.msg('The server is busy now, please try again later.');
                  return false;
                }
                var result = JSON.parse(data.result);
                $scope.likeImgArr = []
                for (var i = 0; i < result.shopProduct.length; i++) {
                  result.shopProduct[i].flag = false;
                }
                $scope.goodList1 = result.shopProduct;
              });

            })
          });
          // 告诉synn组件当前店铺id
          $scope.storeinfo = $scope.selectshopinfo;
          $scope.$broadcast('currStoreId', $scope.storeinfo);
      }
        // return;
    } else {
      //下拉框选项 store
      dsp.postFun('app/shop/getshop', {
        "data": "{'userId':'" + userId + "'}"
      }, getshop, err);

      function getshop(n) {
        $('#product-name').val("");
        // layer.closeAll("loading")
        dsp.closeLoad();
        var obj = JSON.parse(n.data.result);
        console.log('下拉', obj.shoplist)
        $scope.shopselectlist = obj.shoplist;
        $scope.selectshopinfo = $scope.shopselectlist[0];
        console.log($scope.selectshopinfo);
        $scope.searchshopcommodity();
      };

      function err(n) {
        // layer.closeAll("loading");
        dsp.closeLoad();
        $scope.noDataFound = true;
      }
      //获取店铺 store
      $scope.searchshopcommodity = function(n) {
        console.log($scope.selectshopinfo, n);
        /** 修复如果没有店铺就获取不到店铺信息然后报错一直loding的bug */
        if (!$scope.selectshopinfo) {
          return;
        }
        /** 修复如果没有店铺就获取不到店铺信息然后报错一直loding的bug end */
        layer.load()
          $scope.itemarr = [];
          $scope.likeImgArr = [];
          var obj = {
            "data": "{'pageNum':'1','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "'}"
          }
          dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
              pageNum: '1',
              pageSize: '6',
              userId: userId,
              shopId: $scope.selectshopinfo.ID,
              productName: $scope.producname
            })}, shopcon);
          // 告诉synn组件当前店铺id
        $scope.storeinfo = $scope.selectshopinfo;
          $scope.$broadcast('currStoreId', $scope.storeinfo);
        }
        //获取商品信息 store search

      $scope.shopselect = function() {
        console.log($scope.producname);
        console.log($scope.aa);
        // $scope.producname=
        var obj = {
          "data": "{'pageNum':'1','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "','productName':'" + $scope.producname + "'}"
        }
        if (!$scope.selectshopinfo) {
          layer.msg('Please select store first.');
          return;
        }
        if ($scope.producname == undefined) {
          obj = {
            "data": "{'pageNum':'1','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "'}"
          }
        }
        $scope.pagenum = '1';
        dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
          pageNum: $scope.pagenum,
          pageSize: '6',
          userId: userId,
          shopId: $scope.selectshopinfo.ID,
          productName: $scope.producname
        })}, shopcon);
      }

      function shopcon(data) {
        // layer.closeAll("loading");
        dsp.closeLoad();
        var data = data.data;
        if (data.statusCode != 200) {
          layer.msg('The server is busy now, please try again later.');
          return false;
        }
        var result = JSON.parse(data.result);
        console.log(result);
        $scope.totalNumber=result.count;
        $scope.sourceobj = result;
        for (var i = 0; i < result.shopProduct.length; i++) {
          result.shopProduct[i].flag = false;
        }
        $scope.goodList1 = result.shopProduct;
        console.log('goodlist>>>>',$scope.goodList1);
        $scope.noDataFound = result.count == 0;
        $scope.pagenum = '1';
        pageFun($("#page7"), result.count, 8, $scope.pagenum, function(n,type) {
          if (type == 'init') {
            return;
          }
          // $scope.pagenum = n;
          console.log(n);
          console.log($scope.pagenum);
          // var aa = $(this).currentPage;
          // console.log(n);
          if ($scope.itemarr.length != 0) {
            $('.tankuang').show();
            $scope.yesFun = function() {
              $('.tankuang').hide();
              $scope.itemarr = [];
              $scope.likeImgArr = []
              changePageFun();

            }
            $scope.noFun = function() {
            $('.tankuang').hide();
             console.log($scope.pagenum);
            var aa = $("#page7 > a[jp-role$='page']");
            console.log(aa);
            $("#page7 > a[jp-role$='page']").each(function(){
              console.log($(this).attr('jp-data'))
              if($(this).attr('jp-data') == $scope.pagenum) {
                $(this).addClass('current');
              } else {
                $(this).removeClass('current');
              }
            })

            }

          } else {
            changePageFun();
          }

          function changePageFun(){
            $scope.pagenum=n;
            console.log($scope.pagenum);
            var obj = {
              "data": "{'pageNum':'" + $scope.pagenum + "','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "','productName':'" + $scope.producname + "'}"
            }
            if (!$scope.selectshopinfo) {
              layer.msg('Please select store first.');
              return;
            }
            if ($scope.producname == undefined) {
              obj = {
                "data": "{'pageNum':'" + $scope.pagenum + "','pageSize':'6','userId':'" + userId + "','shopId':'" + $scope.selectshopinfo.ID + "'}"
              }
            }

            dsp.postFun('app/sourcing/shopproduct', {"data": JSON.stringify({
              pageNum: $scope.pagenum,
              pageSize: '6',
              userId: userId,
              shopId: $scope.selectshopinfo.ID,
              productName: $scope.producname
            })}, function(data) {
              // $scope.pagenum=n;
              var data = data.data;
              if (data.statusCode != 200) {
                layer.msg('The server is busy now, please try again later.');
                return false;
              }
              var result = JSON.parse(data.result);
              for (var i = 0; i < result.shopProduct.length; i++) {
                result.shopProduct[i].flag = false;
              }
              $scope.goodList1 = result.shopProduct;
              console.log('goodlist>>>>',$scope.goodList1);
            }, function(err) {
                layer.msg('The server is busy now, please try again later.');
            });

          }

        })

      }
    }

    //查看单选框
    // window.location( $scope.commoditytype='shop');
    $scope.commoditytype = 'store';
    $scope.radioFun1 = function() {
      $scope.commoditytype = 'store';

    }
    $scope.radioFun2 = function() {
      $scope.commoditytype = 'individual';
      console.log($scope.commoditytype);
    }
    $scope.commodityname = '';
    $scope.uploadImgs = []; // 待上传图片列表

    //城市列表 individual
    // dsp.postFun('app/connection/getcountry', null, country, err);
    dsp.getFun('app/account/countrylist',country,err);
    function country(n) {
      console.log(n);
      var obj = JSON.parse(n.data.result);
      console.log('chengshi', obj)
      $scope.countrylist = obj;
    }

    dsp.getFun('source/sourcing/daySourceCount', function (data) {
      layer.closeAll('loading');
      var data = data.data;
      console.log(data);
      // var result = JSON.parse(data.result).count * 1;
      // console.log(result);
      // result = 0;
      $scope.sourceNum = data.count;
      if (data.count == 0) {
        layer.msg('Please note you can send us only '+data.dayNum+' daily. <br />Currently available '+data.count+'. ');
        $('.sub-btn').css({
          'opacity': '0.5',
          'cursor': 'not-allowed'
        });
        return;
      }
    });


    //添加商品信息 store
    $scope.itemarr = [];
    $scope.likeImgArr = []
    $scope.addsubmit = function(item, index) {
        
        if (item.flag == false) {
          if ($scope.itemarr.length < $scope.sourceNum) {
            $scope.itemarr.push(item);
            $scope.goodList1[index].flag = true;
            console.log($scope.itemarr);
          } else {
            layer.msg('Please note you can send us only 20 daily. <br />Currently available '+$scope.sourceNum+'. ');
          }
        } else {
          $scope.goodList1[index].flag = false;
          console.log($scope.itemarr.indexOf(item));
          $scope.itemarr.splice($scope.itemarr.indexOf(item), 1);
          console.log($scope.itemarr);
        }
        console.log('goodlist>>>>',$scope.goodList1);
        let image ;
        // console.log(item.image)
        if(item.image.includes('?')){
            image = item.image.substring(0, item.image.indexOf("?"));
        }else{
            image = item.image
        }
        // console.log(image)
        // console.log($scope.likeImgArr[index])
        if(!$scope.likeImgArr[index]){
          // alert('13123')
          layer.load()
          const formData = new FormData();
          let likeObj = {}
          formData.append('imgUrl', image);
          dsp.postFun(
            'app/picture/searchImg',
            formData,
            res => {
              if (res.data.statusCode == 200) {
                layer.closeAll('loading');
                const resData = JSON.parse(res.data.result);
                likeObj['likes'] = resData;
                likeObj['flag'] = true
                $scope.likeImgArr[index] = likeObj
                $scope.flagLike = $scope.likeImgArr[index].flag
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
              // layer2: true
            }
          );
        }
      }

      /**
       * 上传图片相关
       */
     
      $scope.upLoadImg4 = function(files) {
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
        dsp.ossUploadFile($('#file')[0].files, function(data) {
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
          $scope.$apply();
        });
        // 查找相似图片  -  以图搜图
        function getSearchImg(file) {
          layer.load()
          const formData = new FormData();
          formData.append('uploadimg', file);
          dsp.postFun(
            'app/picture/searchUpload',
            formData,
            res => {
              layer.close()
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
        getSearchImg(file);
        $scope.uploadImgs.push(current);
      };
      // 跳转到搜图列表
      $scope.targetToSearchImgList = ({ file }, _url) => {
        if (!file && !_url) return;
        let fileName;
        let url;
        // file 处理
        if (file) {
          fileName = file.name;
          url = URL.createObjectURL(file) // 获取图片暂时性链接
          fetch(url, {mode: 'no-cors'})
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
          image.onload = function() {
            layer.close(loading)
            const canvas = document.createElement('canvas');
            canvas.width = image.width
            canvas.height = image.height
            canvas.getContext('2d').drawImage(image, 0,0);
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
        console.log(e)
        if (!nums[i]) {
          nums[i] = 0
        }
        let bedImgs = e.target.nextElementSibling.children[0];
        nums[i]--;
        if (nums[i] < 0) {
          nums[i] = len - 3;
        }
        bedImgs.style.transform = `translateX(-${105 * nums[i]}px)`;
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
        bedImgs.style.transform = `translateX(-${105 * nums[i]}px)`;
      };


    // 验证价格是否为数字
    $scope.isNumber=function(){
      if(isNaN($scope.price-0)){
        $scope.priceTip='Please input the number.';
      }else{
        $scope.priceTip=false;
      }
    }
    //提交商品信息
    $scope.sourcesubmit = function() {
      if ($scope.sourceNum == 0) {
        return;
      }
      console.log($scope.itemarr);
      if ($scope.commoditytype == "store") {
        if ($scope.itemarr.length != 0) {
          //    店铺商品
          console.log('店铺商品');
          var type = 0;
          //提交
          var arr = [];
          var temObj = {};
          for (var i = 0; i < $scope.itemarr.length; i++) {
            if ($scope.spname) {
              temObj.productName = $scope.itemarr[i].title.replace(/('|"|“|”|‘|’)/g,'');
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
              temObj.productName = $scope.itemarr[i].title.replace(/('|"|“|”|‘|’)/g,'');
              temObj.pid = $scope.itemarr[i].pid;
              temObj.price = $scope.itemarr[i].prices;
              temObj.imageUrl = $scope.itemarr[i].image;
              temObj.userId = userId;
              temObj.name = username;
              temObj.sourcetype = type;
              temObj.shopId = $scope.itemarr[i].shopId;
              temObj.shopName = $scope.itemarr[i].shopName;
              temObj.salesmanid = salesmanid;
              temObj.relateSalesman = relateSalesman;

            }
            temObj.searchSource="cj-web"
            // console.log(str);
            arr.push(JSON.stringify(temObj));
            // arr.push(temObj);
            temObj = {};
            // arr.push(str);
          }
          var str2 = arr.join(",");
          console.log(str2);
          // JSON.stringify([str2])
          cjhome.goActSource($scope.itemarr.length, 'priv', function () {
            layer.load(2)
            dsp.postFun('source/sourcing/addSource', {
              "data": "["+str2.replace(/"/g, "'")+"]"
            }, function(data) {
              layer.closeAll('loading');
              if (data.data.statusCode == 200) {
                layer.msg('Added Success.');
                $location.path('sourcing');
              } else if (data.data.statusCode == '1001')  {
                layer.msg(data.data.message);
              } else {
                layer.msg('Added failure.');
              }
            }, function(n) {
              console.log(n)
            });
          });


        } else {
          layer.msg('Please select the sourcing.');
        }
      } else if ($scope.commoditytype == "individual") {
        console.log($scope.producname1);
          let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if ($scope.producname1 == undefined) {
          layer.msg('Please input Product Title.');
        } else if ($scope.price == undefined) {
          layer.msg('Please input price.');
        } else if (isNaN($scope.price-0)) {
          layer.msg('Please input the number.');
        } else if ($scope.country == undefined) {
          layer.msg('please select country.');
        } else if ($scope.sourceUrl == undefined) {
          layer.msg('Please input product link.');
        } else if (!reg.test($scope.sourceUrl)) {
          layer.msg('Please input correct product link.');
        } else if ($scope.purchasingType == '1'&&!$scope.estimatedQuntity) {
          layer.msg('Please input estimated quantity.');
        } else {
          var type = 1;
          console.log($scope.producname1, $scope.price, $scope.sourceUrl, $scope.uploadImgs, editor.$txt.text());
          var arr = [];
          var obj = {};

          obj.productName = $scope.producname1.replace(/('|"|“|”|‘|’)/g,'');
          obj.price = $scope.price;
          obj.sourceUrl = $scope.sourceUrl;
          obj.imageUrl = $scope.uploadImgs.map(_ => _.url).join(',');
          obj.description = editor.$txt.text().trim();
          obj.userId = userId;
          obj.name = username;
          obj.relateSalesman = relateSalesman;
          obj.salesmanid = salesmanid;
          obj.sourcetype = type;
          obj.country = $scope.country;
          obj.purchasingType = $scope.purchasingType;
          obj.estimatedQuntity = $scope.estimatedQuntity;
          obj.searchSource="cj-web"
          // obj.country = $scope.country.NAME_EN;
          arr.push(obj);
          console.log(arr);
          // obj.country=$scope.country.NAME_EN;
          // console.log($scope.country);
          console.log({
            "data": JSON.stringify(arr)
          });
          cjhome.goActSource(1, 'priv', function () {
            dsp.postFun('source/sourcing/addSource', {
              "data": JSON.stringify(arr)
            }, function(data) {
              console.log(data)
                // alert('添加成功')
              if (data.data.statusCode == 200) {
                layer.msg('Added Success.');
                $location.path('sourcing');
              } else if (data.data.statusCode == '1001') {
                layer.msg(data.data.message);
              } else {
                layer.msg('Added failure.');
              }

            }, function(n) {
              console.log(n.data);
            })
          });

        }
      }
    }

    //分页相关
    $scope.pagesize = 8;
    $scope.pagenum = 1;
    $scope.pagenumarr = [1, 3, 5, 10];
    //计算总页数
    $scope.totalpage = function(x, y) {
        return Math.ceil(x / y)
      }
      //分页
    function pageFun(node, totalnum, pagesize, currentnum, change) {

      console.log(totalnum,pagesize,currentnum);
      node.jqPaginator({
        totalCounts: totalnum * 1 || 1,
        pageSize: pagesize * 1,
        visiblePages: 5,
        currentPage: currentnum * 1,
        activeClass: 'current',
        first: '<a class="prev" href="javascript:void(0);">&lt;&lt;<\/a>',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt;&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a><\/li>',
        onPageChange: change
      });
    }
    //store 店铺搜品 取消按钮
    $scope.scancelFun = function() {
        // $location.path('sourcing');
        $scope.itemarr=[];
        $('.top-drop-pro > div').removeClass('top-list-item2')
      }
    //individual 个性搜品 取消按钮
    $scope.icancelFun = function() {
      console.log($scope.producname1, $scope.price, $scope.sourceUrl, $scope.uploadImgs, editor.$txt.text().trim());
      $scope.price='';
      $scope.producname1='';
      $scope.sourceUrl='';
      $scope.uploadImgs=[];
      editor.clear();
      // $scope.countrylist='';
      $scope.country = '';

    }
    $scope.onlyNumber=()=>{
      $scope.estimatedQuntity = $scope.estimatedQuntity.replace(/[^\d]/g,'');
    }

  }])
})()
