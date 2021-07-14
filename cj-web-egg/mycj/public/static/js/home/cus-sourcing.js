(function() {
  var app = angular.module('aftersale-app', [
    'service',
    'CommonFooterCom',
    'commonHeaderGuestModl2',
    'cjDotModule'
  ]);

  app.directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse){
    return {
      restrict:'A',
      link: function(scope, element, attr){
        if(scope.$last === true){
          $timeout(function(){
            scope.$emit('ngRepeatFinished')
          })
        }
      }
    }
  }])

  app.controller('aftersale-resend-ctrl', [
    '$scope',
    'dsp',
    function($scope, dsp) {
      //---------------------------
      dsp.domainData().then(res => {
        // 请求成功的结果
        $scope.iscj = res.iscj;
        if ($scope.iscj == '1') {
          //cj
          $scope.icon = '/favicon.ico';
        } else {
          //客户
          $scope.icon = res.logo1 || '/favicon.ico';
          $('link[rel$=icon]').replaceWith('');
          $('head').append(
            $('<link rel="shortcut icon"/>').attr('href', $scope.icon)
          );
        }
        // 如果不是erp过来的登录，加载聊天
        if (!localStorage.getItem('loginfromerp')) {
          dsp.addChatWindow();
          dsp.addGuidWindow();
        }
      });
      //---------------------------

      $scope.isLoginFlag = dsp.isInLoginState();
      if ($scope.isLoginFlag) {
        // 检测到登录，跳转到注册用户的搜品页
        location.href = 'myCJ.html#/add-sourcing////';
        return;
      }
      console.log('sourcing');
      var href = location.href;
      console.log(href);
      if (href.indexOf('?') > -1) {
        var arr1 = href.split('?');
        var arr2 = arr1[1].split('=');
        if (arr2[1]) {
          var empName = arr2[1];
        }
      }
      console.log(empName);
      //验证邮箱
      $scope.emailFlag = false;
      $scope.emailBlurFun = function() {
        console.log($scope.addEmail);
        if ($scope.addEmail) {
          if (!dsp.isEmail($scope.addEmail)) {
            layer.msg('Please enter a correct email address');
            $scope.emailFlag = false;
          } else {
            $scope.emailFlag = true;
          }
        } else {
          $scope.emailFlag = false;
        }
      };
      function getCategory () {
        dsp.postFun('erpSupplierSourceProduct/list', {}, function(res) {
          $scope.categoryList = res.data.data;
        }, function() {});
      }

      getCategory();
      // dsp.postFun("app/logistic/getcountry",null,function(data){
      //     console.log(data.data);
      //     if(data.status == 200){
      //         var obj = JSON.parse(data.data.result);
      //         console.log(obj.countryList);
      //         $scope.nation = obj.countryList;
      //         $scope.country = "US"+'#United States of America (the)';
      //     }
      // },function(data){
      //     console.log("国家信息获取失败")
      // })
      dsp.getFun(
        'app/account/countrylist',
        function(data) {
          var data = data.data;
          if (data.statusCode != 200) {
            layer.msg('Get the country list error');
          } else {
            $scope.nation = JSON.parse(data.result);
            $scope.country = 'US' + '#United States of America (the)';
          }
        },
        function() {
          dsp.cjMesFun(1);
        }
      );
      /**
       * 上传图片相关
       */
      $scope.uploadImgs = []; // 待上传图片列表
      $scope.upLoadImg4 = function(files) {
        const file = files[0];
        const fileName = file.name;
        // 图片格式 allow: *.jpg/*.png/*.png/*.JPG
        if (!/.png|.jpg|.PNG|.JPG$/.test(fileName)) {
          return layer.msg('Invalid image. Only JPG and PNG supported.');
        }
        // 当前数据容器
        const current = { };
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
      function createLottieAnimation(index){
        const dom = document.getElementById('loading-animation' + index)
        console.log('loading-animation', dom)
        if(!dom) return 
        lottie.loadAnimation({
          container: dom, // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/egg/image/cj_lottie.json'// the path to the animation json
        });
      }

      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
        console.log('uploadImage', $scope.uploadImgs)
        createLottieAnimation($scope.uploadImgs.length - 1) // 渲染cj-lottie动画
      })

      // 跳转到搜图列表
      $scope.targetToSearchImgList = ({ file }) => {
        if (!file) return;
        const fileName = file.name;
        const url = URL.createObjectURL(file); // 获取图片暂时性链接
        fetch(url)
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
      };

      //删除图片
      $scope.deleteImgFun = function(index) {
        $scope.uploadImgs.splice(index, 1);
      };
      //失败订单
      $scope.errorOrdFlag = false;
      $scope.appType = 'Skype';
      //提交
      //$scope.uploadImgs = ["https://cc-west-usa.oss-us-west-1.aliyuncs.com/15105024/2746702897530.jpg","https://cc-west-usa.oss-us-west-1.aliyuncs.com/15105024/542804829840.jpg"]
      $scope.submitOrdFun = function() {
        var addupdata = {};
        if ($scope.emailFlag) {
          addupdata.email = $scope.addEmail;
        } else {
          layer.msg('Please enter a correct email address');
          return;
        }
        if ($scope.addName) {
          addupdata.sourceUser = $scope.addName;
        } else {
          layer.msg('Please enter name');
          return;
        }
        if ($scope.productName) {
          addupdata.productName = $scope.productName;
        } else {
          layer.msg('Please enter Product Title');
          return;
        }
        if (!$scope.productTag) {
          layer.msg('Please select a product tag.');
          return;
        }
        if (!$scope.sourceUrl) {
          layer.msg('Please enter Sourcing URL');
          return;
        }
        if (!$scope.appUser) {
          layer.msg('Please enter a correct Skype/Whatsapp/Wechat ID.');
          return;
        }
        if (!$scope.targetPrice || $scope.targetPrice < 0) {
          layer.msg('Please enter a correct target price');
          return;
        }
        if ($scope.uploadImgs.length < 1) {
          layer.msg('Please upload image');
          return;
        }
        if (!$scope.description) {
          layer.msg('Please enter description');
          return;
        }
        console.log($scope.country.split('#'));
        var counCode = $scope.country.split('#')[0];
        var counEnName = $scope.country.split('#')[1];
        addupdata.countryCode = counCode;
        addupdata.country = counEnName;
        addupdata.productUrl = $scope.sourceUrl;
        if ($scope.appType == 'Skype') {
          addupdata.skype = $scope.appUser;
        } else if ($scope.appType == 'Whatsapp') {
          addupdata.whatsapp = $scope.appUser;
        } else if ($scope.appType == 'WeChat') {
          // ------------------------------- 18-11-07 bug
          addupdata.wechat = $scope.appUser;
          // -------------------------------
        }
        addupdata.images = $scope.uploadImgs.map(i => i.url);
        addupdata.images = JSON.stringify(addupdata.images);
        addupdata.targetPrice = $scope.targetPrice;
        addupdata.description = $scope.description;
        addupdata.sourceCategory = $scope.productTag;
        if (empName) {
          addupdata.empName = empName;
        }
        console.log(JSON.stringify(addupdata));
        dsp.postFun(
          'pojo/touristSource/addTouristSource',
          JSON.stringify(addupdata),
          function(data) {
            console.log(data);
            layer.closeAll('loading');
            if (data.data.statusCode == 200) {
              layer.msg('Submit success');
              $scope.cancelFun();
            }else if(data.data.statusCode == '1203') {
              layer.msg(data.data.message)
            } else {
              layer.msg('Submit error');
            }
          },
          function(data) {
            console.log(data);
            layer.closeAll('loading');
          }
        );
      };
      //取消
      $scope.cancelFun = function() {
        $scope.addEmail = '';
        $scope.productName = '';
        $scope.sourceUrl = '';
        $scope.appUser = '';
        $scope.targetPrice = '';
        $scope.uploadImgs = [];
        $scope.description = '';
        $scope.addName = '';
        $scope.productTag = '';
      };
      $scope.showListFun = function() {
        $scope.phUserInfoFlag = !$scope.phUserInfoFlag;
      };

      $scope.bigImgUrl = '';

      /**
       * 相似图片
       */
      let nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 临时长度=10， 记录相似图片的展示index
      $scope.prev = (i, len) => {
        var bedImgs = document.getElementsByClassName('bed-imgs')[i];
        nums[i]--;
        if (nums[i] < 0) {
          nums[i] = len - 3;
        }
        bedImgs.style.transform = `translateX(-${105 * nums[i]}px)`;
      };

      $scope.next = (i, len) => {
        var bedImgs = document.getElementsByClassName('bed-imgs')[i];
        nums[i]++;
        if (nums[i] > len - 3) {
          nums[i] = 0;
        }
        bedImgs.style.transform = `translateX(-${105 * nums[i]}px)`;
      };
    }
  ]);
})();
