export function messageListCtrl($rootScope, $scope, dsp, $stateParams, $timeout, $location, $sce) {
  const base64 = $rootScope.base64;
  $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
  const noticeid = $stateParams.mid

  $('.cj-am-wrap').css('min-height', ($(window).height() - 171) + 'px');


  //标记为已读
  function setIsRead(noticeId) {
    const params = {
      userId: $scope.userId,
      noticeId
    }
    dsp.postFun('messageCenterCj/notification/updateRead', params, ({ data }) => { 
      const { code } = data
      if (+code === 200) {
        CJMsg && CJMsg.refresh()
      }
    })
  }

  //获取通知i详情
  function getNoticeInfo() {
    const params = {
      userId: $scope.userId,
      id: noticeid
    }
    dsp.postFun('messageCenterCj/notification/queryDetails', params, ({ data }) => {
      const { code, data: result = {} } = data
      if (+code !== 200) return;
      const { notification: { html, sendDate, notificationType, notificationchId, info} } = result
      $scope.mestitle = notificationType
      $scope.mesInfo = info;
      $scope.mestime = sendDate
      $scope.mesdetail = $sce.trustAsHtml(html)
      $scope.noticeId = notificationchId
      setIsRead(notificationchId)
      $rootScope.$emit('updateNotReadMsg', {updateNotReadMsg: true})
    })
  }

  //删除
  $scope.deleteMes = () => {
    const params = {
      deleteId: $scope.noticeId,
      userId: $scope.userId
    }
    dsp.postFun('messageCenterCj/notification/deleteNotification', params, ({ data }) => {
      const { code } = data
      if (+code !== 200) {
        layer.msg('Delete failed');
        return;
      }
      layer.msg('Delete successfully', { time: 1000 });
      $timeout(function () {
        $location.path('/all-message/1');
      }, 1000);
    })
  }

  // setIsRead()
  getNoticeInfo()

}