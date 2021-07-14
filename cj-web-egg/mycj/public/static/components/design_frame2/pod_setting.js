(function (angular) {

  angular.module('cjCompnentModule')
    .component('podSetting', {
      templateUrl: 'static/components/design_frame2/pod_setting.html',
      controller: ['$scope', 'dsp', "$window", function ($scope, dsp, $window) {
        this.$onInit = function () {
          podSettingCtrl.call(this, $scope, dsp, $window);
        };
      }],
      bindings: {
        parentctrl: '=',
        onLog: '&'
      }
    })
  function podSettingCtrl($scope, dsp, $window) {
    // $scope.podSetType = 1;
    $scope.marginList=[
      {name:'left',val:'10px 0'},
      {name:'center',val:'10px auto'},
      {name:'right',val:'10px 0 10px auto'}
    ]
    $scope.marginObj = {name:$scope.marginList[1].name,show:false}
    let defaultObj = {
      frameSize: '1',
      frameColor: '#000000',
      width: '80',
      height: '50',
      fillet: '50',
      textSize: '16',
      backColor: '#ff7700',
      textColor: '#ffffff',
      language: 'English',
      filletUnit: 'px',
      margin:$scope.marginList[1].val
    }
    $scope.podObj = JSON.parse(JSON.stringify(defaultObj));
    $scope.languageList = ['English', 'Germany', 'French', 'Holland'];
    $scope.unitList = ['px', '%'];
    $scope.openFlag = false; // pod开关
    $scope.$on('showpodsetting', function (d, data) {
      console.log(data)
      $scope.updateStore = data;
      $scope.showPodSetting = true;
      $scope.id = data.id;
      if(data.individuationNum && data.status == 1) {
        $scope.openFlag = true;
      } else {
        $scope.openFlag = false;
      }
      if (data.shopifyPodSettings) {
        let setArr = Object.keys(data.shopifyPodSettings);
        if(~setArr.indexOf('margin')){
          $scope.marginList.filter(item=>{
              if(item.val==data.shopifyPodSettings.margin) $scope.marginObj.name=item.name;
          })
        }else{
          $scope.marginObj.name='center';
          $scope.podObj.margin = $scope.marginList[1].val;
        }
        for (let key in data.shopifyPodSettings) {
          $scope.podObj[key] = data.shopifyPodSettings[key];
        }
      } else {
        $scope.podObj = JSON.parse(JSON.stringify(defaultObj));
        $scope.marginObj.name='center';
        $scope.podObj.margin = $scope.marginList[1].val;
      }
      console.log($scope.podObj)
    })
    if (localStorage.getItem('vip') == 1) {
      $scope.isVip = true;
    } else {
      $scope.isVip = false;
    }
    const b = new Base64();
    $scope.userId = b.decode($window.localStorage.getItem("userId"));
    $scope.token = b.decode($window.localStorage.getItem("token"));
    const isNotErpAdmin = b.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
    const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
    $scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
      // $scope.userEmail = b.decode($window.localStorage.getItem("email"))
      // $scope.subAccountName = b.decode($window.localStorage.getItem('subAccountLoginName') || '') || ''
    $scope.chooseLanguage = function (item) {
      $scope.podObj.language = item;
    }
    $scope.chooseUnit = function (item) {
      $scope.podObj.filletUnit = item;
      $scope.unitShow = false;
    }
    $scope.frameSizeChange = function () {
      $scope.podObj.frameSize = ($scope.podObj.frameSize).replace(/[^\d]/g, '');
      if (parseFloat($scope.podObj.frameSize) < 0) {
        $scope.podObj.frameSize = 0;
      }
    }
    $scope.widthChange = function () {
      $scope.podObj.width = ($scope.podObj.width).replace(/[^\d]/g, '');
      if (parseFloat($scope.podObj.width) < 0) {
        $scope.podObj.width = 0;
      } else if (parseFloat($scope.podObj.width) > 100) {
        $scope.podObj.width = 100;
      }
    }
    $scope.heightChange = function () {
      $scope.podObj.height = ($scope.podObj.height).replace(/[^\d]/g, '');
      if (parseFloat($scope.podObj.height) < 0) {
        $scope.podObj.height = 0;
      } else if (parseFloat($scope.podObj.height) > 100) {
        $scope.podObj.height = 100;
      }
    }
    $scope.filletChange = function () {
      $scope.podObj.fillet = ($scope.podObj.fillet).replace(/[^\d]/g, '');
      if (parseFloat($scope.podObj.fillet) < 0) {
        $scope.podObj.fillet = 0;
      }
    }
    $scope.textSizeChange = function () {
      $scope.podObj.textSize = ($scope.podObj.textSize).replace(/[^\d]/g, '');
    }
    $scope.textSizeBlur = function () {
      if (parseFloat($scope.podObj.textSize) < 12) {
        $scope.podObj.textSize = 12;
      } else if (parseFloat($scope.podObj.textSize) > 100) {
        $scope.podObj.textSize = 100;
      }
    }
    $scope.changeMargin = item =>{
      $scope.marginObj.name = item.name;
      $scope.marginObj.show = false;
      $scope.podObj.margin =item.val;
    } 
    $scope.comfirmFun = function () {
      if (!$scope.podObj.frameSize) {
        layer.msg('Please Input Frame Size');
        return false;
      } else if (!$scope.podObj.width) {
        layer.msg('Please Input Frame Width');
        return false;
      } else if (!$scope.podObj.height) {
        layer.msg('Please Input Frame Height');
        return false;
      } else if (!$scope.podObj.fillet) {
        layer.msg('Please Input Frame Fillet');
        return false;
      } else if (!$scope.podObj.textSize) {
        layer.msg('Please Input Frame Text Size');
        return false;
      }
      let sendData = {
        id: $scope.id,
        PodSettings: JSON.stringify($scope.podObj)
      }
      layer.load(2)
      dsp.postFun('cj/Shop/shopifyPodSettings', sendData, function (data) {
        layer.closeAll();
        if (data.status == 200) {
          layer.msg('Setting successfully');
          $scope.showPodSetting = false;
          $scope.$emit('podsetting-succ', true);
        } else {
          layer.msg(data.message)
        }
      })
    }

    $scope.handleClose = () => {
      $scope.showPodSetting = false;
    }

    $scope.handleReauthorize = () => {
      const msgLoading = cjMessage.loading({ isFixed: true });
      const reAddStoreData = {};
        reAddStoreData.userId = $scope.userId;
        reAddStoreData.token = $scope.token;
        reAddStoreData.data = JSON.stringify({
          noWriteThemes: "1",
          id: $scope.updateStore.id,
          name: $scope.updateStore.name,
          type: $scope.updateStore.type
        });
        dsp.postFun("app/shop/update", JSON.stringify(reAddStoreData), (response) => {
          msgLoading.hide();
          const { data, statusCode, result} = response.data;
          if (statusCode != 200) {
            return layer.msg("The server is busy now, please try again later.");
          }
          // 跳转到返回的网址
          $window.location = result;
        }, function() {
          msgLoading.hide();
        });
    }

    $scope.handleSwitch = () => {
      if($scope.fromErpNotAdmin) {
        return layer.msg('You cannot edit it.');
      }
      if(!$scope.openFlag) {
        addPODFeature();
      } else {
        removePODFeature();
      }
    }

    function addPODFeature() {
      const msgLoading = cjMessage.loading({ isFixed: true });
      dsp.postFun(
        "app/shop/upShopIndividuationNum",
        { ID: $scope.updateStore.id },
        function(data) {
          msgLoading.hide();
          var data = data.data;
          console.log(data);
          if (data.statusCode != 200) {
            // layer.msg('Added failed');
            $scope.addPODFail = true;
          } else {
            layer.msg("Added successfully");
            // add成功时改为true
            $scope.openFlag = true;
            $scope.$emit('podsetting-succ', true);
          }
        },function() {
          msgLoading.hide();
        }
      );
    }

    function removePODFeature() {
      const msgLoading = cjMessage.loading({ isFixed: true });
        dsp.postFun(
          "app/shop/delectShopIndividuationNum",
          { ID: $scope.updateStore.id },
          function(data) {
            msgLoading.hide();
            var data = data.data;
            if (data.statusCode != 200) {
              layer.msg("Remove failed");
            } else {
              layer.msg("Remove successfully");
              // remove成功时改为true
              $scope.openFlag = false;
              $scope.$emit('podsetting-succ', true);
            }
          },function() {
            msgLoading.hide();
          }
        );
    }

    $scope.ReauthAfterAddFail = function() {
      var reAddStoreData = {};
      reAddStoreData.userId = $scope.userId;
      reAddStoreData.token = $scope.token;
      reAddStoreData.data = JSON.stringify({
        id: $scope.updateStore.id,
        name: $scope.updateStore.name,
        type: $scope.updateStore.type
      });
      layer.load(2);
      dsp.postFun(
        "app/shop/update",
        JSON.stringify(reAddStoreData),
        function(data) {
          layer.closeAll("loading");
          var data = data.data;
          var code = data.statusCode;
          if (code != 200) {
            layer.msg("The server is busy now, please try again later.");
            return false;
          }
          // 跳转到返回的网址
          $window.location = data.result;
        },
        function() {
          layer.closeAll("loading");
          layer.msg("The server is busy now, please try again later.");
        }
      );
    };

  }

})(angular);