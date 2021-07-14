import template from './securityRoute.html';
import css from './securityRoute.less';
export function profileSecurityRouteFactory(module) {
    module.component('profileSecurity', {
      template,
      controller: ['$scope', '$element','dsp','$location', function ($scope,$element, dsp,$location) {
        $element.addClass([css.securityRoute, 'switchBlock']);
        this.$onInit = function () {
          controllerFn.call(this, $scope,$element, dsp,$location);
        };
      }],
      bindings: {
      },
    });
  }

 function controllerFn($scope, $element, dsp,$location){
     let bs = new Base64();
     const isNotErpAdmin = bs.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
     const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
     $scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
     
     $scope.promtTitle = 'Disable MFA Verification'
     $scope.promtContent = 'MFA verification will not be avaliable for you. Are you sure to disable? Please re-link when you need it.'

     getLoginCheckList();

     //查询是否需要验证
     function getLoginCheckList() {
         layer.load(2);
         dsp.postFun('app/accountVerification/queryAccountAuthentication', {}, function (data) {
             layer.closeAll('loading');
             if (data.data.statusCode == '200') {
                 var result = data.data.result;
                 $scope.checkList = result;
                 $scope.checkList.forEach(ele => {
                     if (ele.type ==1){ //MFA验证
                         $scope.mfaStatus =ele.status;
                     }
                 })

             }
         }, function () {
             layer.closeAll('loading');
         });
     }


     //查询邮箱是否需要验证 获取  MFA密钥
     function getSecretKeyMFA() {
         layer.load(2);
         dsp.postFun('app/accountVerification/getSecretKey', {}, function (data) {
             layer.closeAll('loading');
             if (data.data.statusCode == '200') {
                 if(localStorage.getItem('emailVerifyStatus') == '3'){
                     showEmailTip();
                 }else{
                     $scope.isMailVerified =true;
                     location.href = `bind.html?target=${bs.encode(location.href)}`
                 }
             }else if(data.data.statusCode == '208') {
                 showEmailTip();
             }
         }, function () {
             $scope.isMailVerified =false;
             layer.closeAll('loading');
         });
     }
     function showEmailTip() {
         $scope.isMailVerified =false;
         $scope.promtTitle = 'Email Verification'
         $scope.promtContent = 'You cannot enable MFA as you didn\'t verify your email. Do you want to verify now?'
         $scope.promptFlag = true
     }



    /**
     * TODO: 点击enable按钮后发生的操作
     */
    $scope.enableMFA =()=>{
        if($scope.fromErpNotAdmin) {
            layer.msg('You cannot edit it.')
            return
        }
        //点击后判断邮箱是否验证
       getSecretKeyMFA();
    }
    /**
     * TODO: 点击Edit按钮发生的操作
     * 切换到password组件
     */
    $scope.passwordFlag = false
    $scope.resetPasswd = () => {
        if($scope.fromErpNotAdmin) {
            layer.msg('You cannot edit it.')
            return
        }
        $scope.passwordFlag = !$scope.passwordFlag
    }
     //关闭MFA验证
    $scope.disableMFA = () =>{
        if($scope.fromErpNotAdmin) {
            layer.msg('You cannot edit it.')
            return
        }
        $scope.promptFlag = true;
    }
    $scope.sureDisableFun = function(){
        var params = {};
        params.type =1;
        if(!$scope.isMailVerified && $scope.mfaStatus == 0){
            location.href = `verify_email.html?target=${bs.encode(location.href)}`
        }else{
            //弹窗开关
            dsp.postFun('app/accountVerification/accountClose', params, function (data) {
                layer.closeAll('loading');
                $scope.promptFlag = false;
                if (data.data.statusCode == '200') {
                    $scope.mfaStatus =0;
                    layer.msg('MFA verification disabled')
                }else {
                    layer.msg('Disable Failed')
                }
            }, function () {
                layer.closeAll('loading');
            });
        }
    }



  }
  