import template from './index.html';
import styles from './index.less';
import { NODE_ENV } from '@root_egg/env';

export function sendTicketModalFactory(module) {
  module.component('sendTicketModal', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', function ($rootScope, $scope, $location, dsp, $element, utils) {
      $element.addClass([styles['send-ticket-modal'], 'send-ticket-box']);
      this.$onChanges = function () {
        sendTicketModalCrt.call(this, $rootScope, $scope, dsp, utils);
      };
    }],
    transclude: true,
    controllerAs: 'vm',
    bindings: {
      cancel: "&",      // 关闭弹窗
      visible: '<',     // 弹窗visible
      orderData: '<',   // 当前列表订单数据
      callback: "&",    // 刷新列表的回调
      openfun: "&",     // 打开提示弹窗
    }
  });
}

function sendTicketModalCrt($rootScope, $scope, dsp, utils) {
  console.log(this, "&&&&&&&&&&&&");
  $scope.visible = this.visible;
  $scope.orderData = this.orderData;
  $scope.isVip = $rootScope.userInfo.vip;
  $scope.questionList = []; // 问题列表
  $scope.checkedQuetion = {};
  $scope.questionDetail = '';
  $scope.showMore = false;
  $scope.isurgent = '0';  // 1:加急,0:不加急
  $scope.sourcingStatus = ""; // 搜品状态 3为搜品成功
  $scope.sku = ""; //列表sku
  this.$onChanges = (changes) => {
    console.log(changes);
    // 当visible为true即打开了弹窗
    const visible = changes.visible.currentValue;
    const records = changes.orderData.currentValue;
    $scope.orderData = records;
    $scope.sourcingStatus = records.status;
    $scope.sku = records.sku;
    console.log(records,"^^^^^^^^^^");
    $scope.visible = changes.visible.currentValue;
    if (visible) {
      getQuestionList(records.status,records.sourcetype);
    }
  };
  
  // 获取问题列表
  function getQuestionList(status,sourceType) {
    const params = {status,type:"Product Issue",sourceType};
    const url = 'pojo/issue/getIssueQuestion';
    dsp.postFun(url, params, function (res) {
      if (res.data.statusCode === '200') {
        $scope.questionList = JSON.parse(res.data.result);
      }
    });
  }
  
  // 选择问题
  $scope.getQuestion = (data) => {
    $scope.checkedQuetion = data;
  };
  // 显示更多问题
  $scope.showMoreQuestion = () => {
    $scope.showMore = true;
  };
  // 提交搜品工单
  $scope.submitTicket = () => {
    const checkedQuetion = $scope.checkedQuetion;
    const questionDetail = $scope.questionDetail;
    const isurgent = $scope.isurgent;
    // 判断类型是否存在
    if (!checkedQuetion.ID) return layer.msg('Please select the type of issue before submitting.');
    // 判断问题描述是否存在
    if (checkedQuetion.ID===1001 && !questionDetail) return layer.msg('Please enter 5 characters at least.');
    if (checkedQuetion.ID===1001 && questionDetail && questionDetail.length < 5) return layer.msg('Please enter 5 characters at least.');
    if (checkedQuetion.ID===1001 && questionDetail && questionDetail.length > 1000) return layer.msg('Please enter 1000 characters at most.');
    const url = 'cujia-message/issue/addBusinessIssue';
    const temp = $scope.orderData;
    layer.load();
    // 要判断是否选中的是其他，如果不是则问题描述是不存在的
    const params = {
      businessNum: temp.number,
      isUrgent: isurgent,
      businessType: checkedQuetion.businessType,
      questionDesc: checkedQuetion.ID === 1001 ? questionDetail.trim() :checkedQuetion.questionEn,
      type: "Product Issue",
      sourceType:temp.sourcetype,
      businessStatus: temp.status,
      skuNum:$scope.sourcingStatus==="3"?$scope.sku:""
    };
    dsp.postFun(url, params,  (res)=>{
      layer.closeAll("loading");
      if (res.data.statusCode === 200) {
        $scope.closeModal();
        this.openfun();
        if (isurgent === '1') {
          $scope.goChartRoom(res.data.result.id);
        } else {
          layer.msg('Submitted Successfully');
        }
        this.callback();
      }else {
        layer.msg(res.data.message);
      }
    },()=>{
      layer.closeAll("loading");
    });
  };
  // 关闭弹窗
  
  $scope.closeModal = () => {
    $scope.orderData = {};
    $scope.showMore = false;
    $scope.checkedQuetion = {};
    $scope.questionDetail = '';
    $scope.isurgent = '0';
    this.cancel();
  };
  
  // 加急工单跳转聊天室
  $scope.goChartRoom=(id)=> {
    const environment = NODE_ENV;
    // 判断是cn环境还是com环境
    const host = location.host;
    const hostArr = host.split('.');
    const lastHostName = hostArr[hostArr.length - 1];
    const isOnline = environment === 'production'||environment === 'production-cn';
    if (isOnline) {
      window.open(
        `https://chat.cjdropshipping.${lastHostName}/?cjorder=${id}#/newChat`,
      );
    }
    if (!isOnline) {
      window.open(`http://chat.test.com/?cjorder=${id}#/newChat`);
    }
  }
  
  $scope.chooseIsUrgent = (sign) => {
    $scope.isurgent = sign;
  };
}
