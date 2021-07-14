
// 消息中心 ---- CJ 系统消息
export function getMessageCJ({ $scope, dsp }) {
  var getTopMesData = {
    pageSize: 5,
    start: 1,
    isread: 0,
    type: 1
  }
  dsp.postFun('app/notification/getCjnotification', getTopMesData, function (data) {
    var data = data.data;
    if (data.statusCode == 200) {
      var result = JSON.parse(data.result);
      console.log(result)
      $scope.messagePre = result.list;
      for (let i = 0; i < $scope.messagePre.length; i++) {
        let ind = $scope.messagePre[i].notificationType.indexOf('html:');
        if (ind > -1) {
          $scope.messagePre[i].url = $scope.messagePre[i].notificationType.slice(ind + 5);
          $scope.messagePre[i].notificationType = $scope.messagePre[i].notificationType.slice(0, ind)
        }
        let isReadArr = []
        isReadArr.push($scope.messagePre[i].is_read)
        isReadArr.push($scope.messagePre[i].isread)
        if (isReadArr.includes('0')) {
          $scope.isMark = false;
        }
      }
    }
  });
}

// 消息中心 ---- 论坛消息
export function getMessageElites({ $scope, dsp }) {
  var getTopMesData = {
    "pageNum": "1",
    "pageSize": "5"
  }
  var url = 'cujia-message/cj/notification/getInformList'
  dsp.postFun(url, getTopMesData, function (data) {
    console.log(data.data)
    var data = data.data;
    if (data.statusCode == 200) {
      var result = data.result;
      console.log(result)
      $scope.messagePre = result.list;
      let isReadArr = []
      for (let i = 0; i < $scope.messagePre.length; i++) {
        isReadArr.push($scope.messagePre[i].read_status)
        if (isReadArr.includes(2)) {
          $scope.isMark = false
        }
      }
    }
  });
}

// 消息中心 ---- 推荐商品
export function getMessageComment({ $scope, dsp }) {
  var getTopMesData = {
    "pageNum": "1",
    "pageSize": "5"
  }
  dsp.postFun('cj/appPush/getCJPushInfoListByUserId', getTopMesData, function (data) {
    console.log(data.data)
    var data = data.data;
    if (data.statusCode == 200) {
      var result = data.result;
      console.log(result)
      $scope.messagePre = result.list;
      let isReadArr = []
      for (let i = 0; i < $scope.messagePre.length; i++) {
        isReadArr.push($scope.messagePre[i].is_read)
        if (isReadArr.includes(2)) {
          $scope.isMark = false
        }
      }
    }
  });
}
