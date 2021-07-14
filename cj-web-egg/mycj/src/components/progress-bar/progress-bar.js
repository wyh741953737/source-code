import template from './progress-bar.html';
import styles from './progress-bar.less';

export function progressBarFactory(module) {
  module.component('progressBar', {
    template,
    controller: ['$rootScope', '$scope', '$location', 'dsp', '$element', 'utils', '$interval', '$timeout', function ($rootScope, $scope, $location, dsp, $element, utils, $interval, $timeout) {
      $element.addClass([styles.progressBarComponent, 'progressBar']);
      progressBarCtrl( $rootScope, $scope, dsp, utils, $interval, $timeout);
    }],
    transclude: true,
    bindings: {

    }
  });
}

function progressBarCtrl($rootScope, $scope, dsp, utils, $interval, $timeout) {
  const userInfo = $rootScope.userInfo;
  $scope.isVip = userInfo.vip;
  $scope.showProgress = false; // 进度条
  $scope.showCircleProgress = true; // 圆形进度条
  $scope.shopId = '';
  $scope.shopName = '';
  $scope.progressList = [];
  $scope.circleProgressList = []; // 目前展示的圆形进度条
  $scope.circleProgressListAll = []; // 所有的圆形进度条
  $scope.showCloseCircle = false; // 默认展示全部圆形进度条
  $scope.CircleTimer = null;

  const getCircleProgressList = () => {
    dsp.postFun('platform-product/pull/queryPullProgress', { shopId: '' }, (response) => {
      const { code, data, message } = response.data;
      if(code == 200) {
        $scope.circleProgressListAll = data;
        $scope.circleProgressList = $scope.circleProgressListAll[0] ? [].concat($scope.circleProgressListAll[0]) : [];
        $scope.progressList = data.filter(item => item.shopId == $scope.shopId);
        if($scope.showProgress) {
          // 显示长形进度条时
          const { percentage, finished } = $scope.progressList[0];
          synchronizing(percentage);
          if(finished) {
            $scope.circleProgressListAll = $scope.circleProgressListAll.filter(ele => ele.shopId != $scope.shopId);
            $scope.circleProgressList = $scope.circleProgressListAll[0] ? [].concat($scope.circleProgressListAll[0]) : [];
            synchronizing(100);
            layer.msg('Synced Successfully');
            $timeout(() => {
              $scope.showProgress = false; // 关闭长形进度条
              $scope.showCircleProgress = true; // 显示圆形进度条
            }, 1000)
          }
        } else if($scope.showCircleProgress){
          // 显示圆形进度条集合时
          $scope.progressList = [];
          synchronizing(0);
          if($scope.showCloseCircle) {
            // 展开集合时
            $scope.circleProgressList = $scope.circleProgressListAll;
          } else {
            // 关闭集合时
            $scope.circleProgressList = $scope.circleProgressListAll[0] ? [].concat($scope.circleProgressListAll[0]) : [];
          }
        }
        if(data.length != 0) {
          $timeout(() => {
            getCircleProgressList();
          }, 5000)
        }
      } else {
        layer.msg(message);
      }
    })
  }
  getCircleProgressList();

  const synchronizing = (percent) => {
    const dom = document.getElementById('progressInner');
    const percentDom = document.getElementById('progressText');
    dom.style.width = percent + '%';
    percentDom.innerHTML = percent + '%';
  }
  synchronizing(0);

  $scope.$on('$showProgressBar', (d, data) => {
    const { selectshopinfo: { ID, NAME } } = data;
    $scope.shopId = ID;
    $scope.shopName = NAME ? NAME.split('-')[0] : '';
    $scope.showProgress = true; // 展示进度条
    $scope.showCircleProgress = false; // 圆形进度条
    $scope.showCloseCircle = false; // 展开按钮显示关闭
    $timeout.cancel($scope.CircleTimer);
    if($scope.circleProgressListAll.length == 0) {
      getCircleProgressList();
    }
  })


  $scope.handleHide = () => {
    $scope.showProgress = false;
    $scope.showCircleProgress = true;
    $scope.progressList = [];
    synchronizing(0);
    $scope.$emit('hideProgress');
    // $timeout.cancel($scope.CircleTimer);
  }

  $scope.handleCloseCircle = (bool) => {
    $scope.showCloseCircle = bool;
    if($scope.showCloseCircle) {
      $scope.circleProgressList = $scope.circleProgressListAll;
    } else {
      $scope.circleProgressList = $scope.circleProgressListAll[0] ? [].concat($scope.circleProgressListAll[0]) : [];
    }
  }

  // 进度条拖拽
  // 获取DOM元素  
  let dragDiv = document.getElementById('circleProgressDrag');
  // 鼠标按下事件 处理程序
  let putDown = function (event) {
    dragDiv.style.cursor = "pointer";
    let offsetX = parseInt(dragDiv.style.right); // 获取当前的x轴距离
    let offsetY = parseInt(dragDiv.style.bottom); // 获取当前的y轴距离
    let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
    let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距
    let w = document.body.clientWidth;
    let h = document.body.clientHeight;
    // 鼠标移动的时候不停的修改div的left和top值
    document.onmousemove = function (event) {
      // dragDiv.style.right = event.clientX - innerX + "px";
      // dragDiv.style.bottom = event.clientY - innerY + "px";
      dragDiv.style.right = `${w - event.clientX - 50}px`;
      dragDiv.style.bottom = `${h - event.clientY - 50}px`;
      // 边界判断
      if (parseInt(dragDiv.style.right) <= 0) {
        dragDiv.style.right = "0px";
      }
      if (parseInt(dragDiv.style.bottom) <= 0) {
        dragDiv.style.bottom = "0px";
      }
    }
    // 鼠标抬起时，清除绑定在文档上的mousemove和mouseup事件
    // 否则鼠标抬起后还可以继续拖拽方块
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
  // 绑定鼠标按下事件
  dragDiv.addEventListener("mousedown", putDown, false);

}