import template from './index.html';
import styles from './index.less';

export function ticketDetailModalFactory(module) {
  module.component('ticketDetailModal', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function ($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles['ticket-detail-modal'], 'ticket-detail-box']);
      this.$onChanges = function () {
        ticketDetailModalCtrl.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    controllerAs: 'vm',
    bindings: {
      cancel: "&", // 关闭弹窗
      visible: '<',  // 弹窗visible
      listData: '<', // 当前搜品数据
      callback: "&",    // 刷新列表的回调
    }
  });
}

function ticketDetailModalCtrl($rootScope, $scope, dsp, utils) {
  console.log(this.listData, '55555555');
  $scope.visible = false;
  $scope.callback = this.callback;
  $scope.status = "";
  $scope.replyBtnShow = true;
  $scope.listData = {};
  $scope.detailData = [];
  $scope.confirmClose = false;
  $scope.replyComfirmVisible = false;
  $scope.closeContent = '';
  
  function successFun(res) {
    const detailData = JSON.parse(res.data.result);
    $scope.detailData = detailData;
    // $scope.imgName = $scope.detailData[0].OPERATOREN.slice(0, 1).toUpperCase();
    // for (var i = 0; i < $scope.detailData.length; i++) {
    //   if ($scope.detailData[i].STATUS == '1') {
    //     $scope.ywyName = $scope.detailData[i].OPERATOREN ? $scope.detailData[i].OPERATOREN.slice(0, 1).toUpperCase() : null;
    //   }
    //   if ($scope.detailData[i].ATTACHMENT) {
    //     $scope.detailData[i].ATTACHMENT = $scope.detailData[i].ATTACHMENT.split(',');
    //   }
    // }
  }
  
  this.$onChanges = (changes) => {
    // console.log(changes);
    // 当visible为true即打开了弹窗
    const newData = changes.listData.currentValue;
    const visible = changes.visible.currentValue;
    $scope.listData = newData;
    // issueStatus 工单状态 ; businessNum 订单编号 ; issueId 工单id ; subject 标题 ;issueType 类型(订单/搜品) ; serial 工单编号
    $scope.status = newData.issueStatus;
    $scope.subject = newData.SUBJECT;
    $scope.serial = newData.SERIAL;
    $scope.visible = visible;
    console.log(newData,"*********");
    if (visible) {
      dsp.getFun('pojo/issue/getIssueMessageCj?id=' + newData.issueId, successFun);
    }
  };
  // submit form 上传图片
  $scope.imgArr = [];
  $scope.imgArrType = [];
  $scope.upLoadImg4 = function (files) {
    dsp.ossUploadFile(files, function (data) {
      // console.log(data, files, "&&&&&&&&");
      if (data.code === 0) {
        layer.msg('Images Upload Failed');
        return;
      }
      if (data.code === 2) {
        layer.msg('Images Upload Incomplete');
      }
      $("#workorder-file").val('');
      var obj = data.succssLinks;
      if (files[0].size / (1024 * 1024) > 5) {
       return  layer.msg('5M a file at most');
      }
      for (var j = 0; j < obj.length; j++) {
        var srcList = obj[j].split('.');
        var type = srcList[srcList.length - 1].toUpperCase();
        var typeList = ['PNG', 'JPG', 'JPEG', 'GIF'];
        if (typeList.indexOf(type) !== -1) {
          if($scope.imgArr.length===10){
            return layer.msg("You can only upload up to 10 images.");
          }
          $scope.imgArr.push(obj[j]);
          $('#file').val("");
          // $scope.imgArr.slice(10);
          // $scope.submitTipMessage = 'You can only upload up to 10 images.';
          // $('.hnj-form .hnj-tankuang').css({'display': 'block'});
          // $scope.okFun = function () {
          //   $('.hnj-form .hnj-tankuang').css({'display': 'none'});
          // };
        } else {
          layer.msg('Please upload the correct format.');
          // $('.gderr-loadsrc').show(); //判断如果不是图片的弹框  显示
          // $('.hnj-form .hnj-tankuang').css({'display': 'block'});
          // $scope.submitTipMessage = 'Please upload the correct format.';
          // $scope.okFun = function () {
          //   $('.hnj-form .hnj-tankuang').css({'display': 'none'});
          // };
        }
      }
      $scope.$apply();
    });
  };
  
  $scope.deleteImg = function (idx) {
    $scope.imgArr.splice(idx, 1);
    // console.log($scope.imgArr)
  };
  
  // 下载图片
  $scope.downloadImgs = function (img) {
    window.open(img);
  };
  // 关闭弹窗
  $scope.closeModal = () => {
    $('#kmessage').val('');
    $scope.imgArr = [];
    $scope.kreplyMessage='';
    // $('#documentupload2').val('');
    this.cancel();
  };
  // 点击完成工单
  $scope.endFun = () => {
    // $scope.closeWord=complete;
    const str = 'Are you sure to Finished this ticket?';
    $scope.closeContent = str;
    $scope.confirmClose = true;
  };
  $scope.closeConfirm = () => {
    $scope.closeContent = '';
    $scope.confirmClose = false;
  };
  //  回复
  $scope.replyFun = () => {
    $scope.newimgArr = $scope.imgArr.toString();
    $scope.kreplyMessage = $('#kmessage').val();
    if(!$scope.kreplyMessage){
      return layer.msg('Please enter 5 characters at least.');
    }
    if($scope.kreplyMessage.length < 5){
      return layer.msg('Please enter 5 characters at least.');
    }
    if($scope.kreplyMessage.length > 1000){
      return layer.msg('Please enter 1000 characters at most.');
    }
    layer.load();
    const con= (res) => {
      // console.log(res.data.result);
      layer.closeAll("loading");
      if (res.data.statusCode === 200) {
        layer.msg('Replied Successfully!');
        this.cancel();
        this.callback();
        $('#kmessage').val('');
        $scope.imgArr = []; //清空要发送的图片
      } else {
        layer.msg(res.data.message);
      }
    };
    function err() {
      layer.closeAll("loading");
    }
    dsp.postFun('cujia-message/issue/cjReply', {
      "id": $scope.listData.issueId,
      "message": $scope.kreplyMessage,
      "attachment": $scope.newimgArr
    }, (res)=>con(res), err);
  };
  // 完成该工单
  $scope.finishThis = () => {
    const  con = (res) => {
      if(res.data.statusCode === "200"){
        this.callback();
        $scope.closeConfirm();
        $scope.closeModal();
        // this.cancel();
      }else {
        layer.msg('Server error!');
      }
    }
    function err() {
    }
    dsp.getFun('pojo/issue/complete?id=' + $scope.listData.issueId, (res)=>con(res), err);
  };
}