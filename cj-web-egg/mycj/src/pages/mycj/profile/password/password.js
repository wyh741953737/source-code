import template from './password.html';
import css from './password.less';

export function profilePasswordFactory(module) {
  module.component('profilePassword', {
    template,
    controller: ['$scope', '$element','dsp', function ($scope,$element, dsp) {
      $element.addClass([css.pssword, 'safe-manage']);
      this.$onInit = function () {
        controllerFn.call(this, $scope,$element, dsp);
      };
    }],
    bindings: {
    },
  });
}

function controllerFn($scope, $element, dsp) {
  const base64 = new Base64();
  const email = localStorage.getItem('email') ? base64.decode(localStorage.getItem('email')):'';
  $scope.email = `${email.substring(0,2)}****${email.substring(6,email.length)}`
  $scope.step = 1;
  $scope.waitNum = 60;
  let freeze = false,time;
  $scope.verifyCode = '';
  //发送验证码到邮箱
  $scope.sendEmail = ()=>{
    $scope.step=2;
    $scope.verifyCode='';
    $scope.verifyStatus='';
  }
  //倒计时
  let isSend = false;
  function countDown(){
    freeze = true;
    time = setTimeout(()=>{
      $scope.waitNum--;
      if($scope.waitNum>=0) {
        countDown();
      } else {
        isSend = false;
        $scope.waitNum = 60;
        $scope.verifySend = false;
        freeze = false;
        clearTimeout(time);
      }
      $scope.$apply();
    },1000)
  }
  //获取验证码
  $scope.getCode = ()=>{
    if($scope.waitNum==60 && !isSend){
      isSend=true;
      layer.load(2);
      dsp.postFun('cj/account/sendUpdateCode', {}, ({data})=> {
        layer.closeAll('loading');
        if (data.statusCode == '200') {
          clearTimeout(time);
          $scope.verifyStatus = 1;
          if(!freeze){
            $scope.verifySend = true;
            countDown();
          }
        }else{
          layer.msg('Send failed. Please try again');
        }
      }, ()=> {
        layer.closeAll('loading');
      });
    }
  }
  //提交验证码
  $scope.submitCode = ()=>{
    if(!$scope.verifyCode) return $scope.verifyStatus=2;
    layer.load(2);
    dsp.getFun(`cj/account/verifyUpdateCode?code=${$scope.verifyCode}`, ({data})=> {
      layer.closeAll('loading');
      if (data.statusCode == '200') {
        $scope.step=3;
        $scope.nextCode = data.result;
        $scope.password='';
        $scope.newPassword='';
      }else{
        $scope.verifyStatus=3;
      }
    }, ()=> {
      layer.closeAll('loading');
    });
  }
  function countDownSucc(){
    let time = setTimeout(()=>{
      $scope.succSecond--;
      console.log($scope.succSecond)
      if($scope.succSecond>0) {
        countDownSucc();
      } else{
        clearTimeout(time);
        $scope.step=1;
      }
      $scope.$apply();
    },1000)
  }
  $scope.passwordShow = false;
  $scope.passwordType='password';
  $scope.newPasswordType='password';
  const passReq = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[^\w\s]){1,})(?=(.*[\s]){0,}).{1,}$/;
  const passwordStatusMsg = {
    1:'Please input a password.',
    2:'Password must contain letters, numbers and special characters.',
    3:'Password can\'t contain any spaces.',
    4:'Password must be at least 8-15 characters long.',
    5:'Passwords do not match.'
  }
  $scope.passwordInput = ()=>{
    if(!$scope.password) return $scope.passErrMsg=passwordStatusMsg[1];
    if ($scope.password.includes(' '))  return $scope.passErrMsg=passwordStatusMsg[3];
    if ($scope.password.length < 8 || $scope.password.length > 15) return $scope.passErrMsg=passwordStatusMsg[4];
    if (!(passReq.test($scope.password))) return $scope.passErrMsg=passwordStatusMsg[2];
    if($scope.newPassword==$scope.password) $scope.newPassErrMsg='';
    $scope.passErrMsg='';
    
  }
  $scope.newPasswordInput = ()=>{
    if(!$scope.newPassword) return $scope.newPassErrMsg=passwordStatusMsg[1];
    if ($scope.newPassword.includes(' '))  return $scope.newPassErrMsg=passwordStatusMsg[3];
    if ($scope.newPassword.length < 8 || $scope.newPassword.length > 15) return $scope.newPassErrMsg=passwordStatusMsg[4];
    if (!(passReq.test($scope.newPassword))) return $scope.newPassErrMsg=passwordStatusMsg[2];
    if($scope.newPassword!=$scope.password) return $scope.newPassErrMsg=passwordStatusMsg[5];
    $scope.newPassErrMsg='';
  }
  $scope.passwordShowFun =()=>{
    $scope.passwordShow = !$scope.passwordShow;
    $scope.passwordType=$scope.passwordShow?'text':'password';
  }
  $scope.newPasswordShowFun =()=>{
    $scope.newPasswordShow = !$scope.newPasswordShow;
    $scope.newPasswordType=$scope.newPasswordShow?'text':'password';

  }
  //设置验证码
  $scope.setPassword = ()=>{
    if($scope.passErrMsg) return;
    if($scope.newPassErrMsg) return;
    if($scope.newPassword!=$scope.password) return $scope.newPassErrMsg=passwordStatusMsg[5];
    layer.load(2);
    let data = {
      nextCode:$scope.nextCode,
      passwd:dsp.encryptF($scope.password)
    }
    const param = {
      data:JSON.stringify(data)
    }
    dsp.postFun(`app/account/updatepwd`,param, ({data})=> {
      layer.closeAll('loading');
      if (data.statusCode == '200') {
        $scope.step=4;
        $scope.succSecond = 5;
        $scope.passStatus='';
        $scope.newpassStatus='';
        countDownSucc();
      }else if(data.statusCode == '607'){
        layer.msg('Your new password cannot be the same as any of your old passwords.');
      }else if(data.statusCode == '606'){
        layer.msg('Please verify your email address first');
      }else{
        layer.msg('Please enter a new password')
      }
    }, ()=> {
      layer.closeAll('loading');
    });
  }
}
