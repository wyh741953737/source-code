
export function messageAllCtrl($rootScope, $scope, $timeout, $location, dsp, $stateParams) {
  var base64 = new Base64();
  var token = $rootScope.userInfo.token;
  $scope.vip = $rootScope.userInfo.vip;
  $scope.token = token
  $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
  $('.cj-am-wrap').css('min-height', ($(window).height() - 171) + 'px');
  //添加消息详情链接
  $('.cj-ul-p2').click(function () {
    location.href = '#/message-list';
  })
  $scope.pageSize = 10;
  $scope.pageNum = 1;
  // $scope.messageList = [];
  layer.load(2);
  // getMessageList();
  $scope.nodata = false;

  // tab栏
  $scope.tabVal = '1'
  $scope.messageTab = [
    { name: 'From CJ', val: "1", isActive: 'true' },
    { name: 'ELITES', val: "2", isActive: 'false' },
    { name: 'Recommendations', val: "3", isActive: 'false' },
  ]
  //切换tab
  console.log($stateParams.id)
  // for (var key in $stateParams.id) {
  //   if (key !== '') {
  //     $scope.type = key
  //   }
  // }
  // if ($scope.type) {
    // $scope.tabVal = $scope.type || '1'
  if ($stateParams.id) {
    $scope.tabVal = $stateParams.id || '1' // 默认高亮第一个
    console.log($scope.type, $scope.tabVal)
    for (let i = 0; i < $scope.messageTab.length; i++) {
      $scope.messageTab[i].isActive = 'false'
    }
      $scope.messageTab[$scope.tabVal - 1].isActive = 'true'
  }
  $scope.checkTab = function (item) {
    // window.location.href = "myCJ.html#/all-message?" + item.val
    window.location.href = "myCJ.html#/all-message/" + item.val
    for (let i = 0; i < $scope.messageTab.length; i++) {
      $scope.messageTab[i].isActive = 'false'
    }
    item.isActive = 'true'
    $scope.tabVal = item.val;
    $scope.pageNum = 1
    getMessage();

  }

  $scope.toMarkAll = function () {
    if ($scope.tabVal == '1') {
      dsp.postFun('messageCenterCj/notification/updateRead', { userId: $scope.userId }, function (data) {
        console.log(data)
        if (data.data.code == 200) {
          getMessage()
          // window.location.reload()
        }
      })
    } else if ($scope.tabVal == '2') {
      dsp.postFun('cujia-message/cj/notification/allRead', {}, function (data) {
        console.log(data)
        if (data.data.statusCode == 200) {
          getCount()
          getMessage()
          //  window.location.reload()
        }
      })
    } else if ($scope.tabVal == '3') {
      dsp.postFun('cj/appPush/updateAppPushIsRead', {}, function (data) {
        console.log(data)
        if (data.data.statusCode == 200) {
          getCount()
          getMessage()
          //  window.location.reload()
        }
      })
    }
  }

  $scope.toDetailPage = function (item) {
    const params = {
      userId: $scope.userId,
      noticeId: item.notificationchId
    }
    dsp.postFun('messageCenterCj/notification/updateRead', params, ({ data }) => {
      const { code } = data
      if (+code === 200) {
        getMessage();
        CJMsg && CJMsg.refresh()
      }
    })
    if(item.redirectType == '2') {// 0详情页1.商品页2.私有库存页
      location.href = 'myCJ.html#/my-inventory'
    } else if(item.redirectType == '1') {
      window.open(item.url + '&href');
    } else if(item.redirectType == '0') {
      location.href = 'myCJ.html#/message-list/' + item.id
    }
  }


  $scope.toElites = function (item) {
    let otime = new Date().getTime();
    console.log($scope.token)
    dsp.postFun('cujia-message/cj/notification/informRead', JSON.stringify({ id: item.id }), function (data) {
      if (data.data.statusCode == '200') {
        getMessage();
        CJMsg && CJMsg.refresh()
      }
    })
    const token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
    if (item.operation_type == '1') {
      window.open(`https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`)           //关注
    }
    if (item.operation_type == '4' || item.operation_type == '6' || item.operation_type == '9' || item.operation_type == '10') {
      window.open(`https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`)           //问题
    }
    if (item.operation_type == '3' || item.operation_type == '7') {
      window.open(`https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.question_id}`)           //问题
    }
    if (item.operation_type == '2' || item.operation_type == '5' || item.operation_type == '8') {
      window.open(`https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`)   //文章详情      
    }

  }

  $scope.toCommentDetail = function (item) {
    console.log(item)
    CJMsg && CJMsg.refresh()
    location.href = 'list-detail.html?id=' + item.push_id + '&fromType=CommentList'
  }

  // 最后一条删除成功时, 页数减1, 再请求接口
  function beforeDelLastItem(){
    if($scope.messageList.length <= 1 && $scope.pageNum > 1) {
      $scope.pageNum--
    }
  }

  $scope.deleteMes = function (item, index1, $event) {
    $event.stopPropagation();
    const params = {
      deleteId: item.notificationchId,
      userId: $scope.userId
    }
    dsp.postFun('messageCenterCj/notification/deleteNotification', params, ({ data }) => {
      const { code } = data
      if (+code !== 200 ) {
        layer.msg('Delete failed');
        return
      }
      layer.msg('Delete successfully', { time: 1000 });
      // $timeout(function () {
      //   $scope.messageList.splice(index1, 1);
      //   $('.cj-list-ul li').eq(index1).remove();
      // }, 1000);

      beforeDelLastItem()
      getMessage();
    })
  }
  $scope.deleteRecommend = function (item, index1, $event) {
    $event.stopPropagation();
    console.log(item)
    var deleteDate = {};
    deleteDate.push_id = item.push_id;
    dsp.postFun('cj/appPush/delectAppPushById', JSON.stringify(deleteDate), function (data) {
      var data = data.data;
      console.log(data);
      if (data.statusCode != 200) {
        layer.msg('Delete failed');
        return false;
      }
      layer.msg('Delete successfully', { time: 1000 });
      // $timeout(function () {
      //   $scope.messageList.splice(index1, 1);
      //   $('.cj-list-ul li').eq(index1).remove();
      // }, 1000);
      delgetReconed(dsp, $rootScope);
      beforeDelLastItem()
      getMessage();
    }, err);
  }
  $scope.totalPage = ''
  function getMessage() {
    if ($scope.tabVal == '1') {
      $scope.messageList = []
      getMessageCJ()
    } else if ($scope.tabVal == '2') {
      $scope.messageList = []
      getMessageElites()
    } else if ($scope.tabVal == '3') {
      $scope.messageList = []
      getCommentList()
    }
  }

  getMessage();
  function getMessageCJ(isFy) {
    $scope.nodata = false;
    const getTopMesData = {
      pageSize: $scope.pageSize * 1,
      pageNum: $scope.pageNum * 1,
      data: {
        userId: $scope.userId
      }
    }
    // dsp.postFun('messageCenterCj/notification/queryGetCjnotification', getTopMesData, ({ data }) => {
    dsp.postFun('messageCenterCj/notification/queryNotificationList', getTopMesData, ({ data }) => {
      const { code, data: result = {} } = data
      layer.closeAll('loading');
      if (+code !== 200) {
        $scope.nodata = true;
        return ;
      };

      const { list, total } = result
      $scope.messageList = list.map(v => {
        const ind = v.notificationType.indexOf('html:')
        if ( ind > -1) {
          v.url = v.notificationType.slice(ind + 5);
          v.notificationType = v.notificationType.slice(0, ind)
        }
        return v
      })
      if($scope.messageList.length == 0) {
        $scope.nodata = true;
      }
      $scope.totalPage = +total
      !isFy && $("#ld-pages").jqPaginator({
        // totalPages: 20,//分页的总页数
        totalCounts: $scope.totalPage,
        pageSize: $scope.pageSize,
        visiblePages: 5,//显示多少页
        currentPage: $scope.pageNum,//当钱第几页
        activeClass: $scope.vip == '1' ? 'pageActiveVip' : 'active',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') return;
          $scope.pageNum = n;
          getMessageCJ(true)
        }
      });
    })
  }

  function getMessageElites() {
    $scope.nodata = false;
    const getTopMesData = {
      pageSize: $scope.pageSize + '',
      pageNum: $scope.pageNum + ''
    }
    dsp.postFun("cujia-message/cj/notification/getInformList", getTopMesData, function (data) {
      layer.closeAll('loading');
      console.log(data);
      var data = data.data;
      var result = data.result;
      if (result.total == 0) {
        $scope.messageList = [];
        $scope.nodata = true;
        return;
      }
      $scope.messageList = result.list;

      $("#ld-pages").jqPaginator({
        // totalPages: 20,//分页的总页数
        totalCounts: result.total,
        pageSize: $scope.pageSize,
        visiblePages: 5,//显示多少页
        currentPage: $scope.pageNum,//当钱第几页
        activeClass: $scope.vip == '1' ? 'pageActiveVip' : 'active',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') return;
          $scope.pageNum = n;
          var getMesListData = {
            pageSize: $scope.pageSize + '',
            pageNum: $scope.pageNum + ''
          }
          dsp.postFun('cujia-message/cj/notification/getInformList', JSON.stringify(getMesListData), function (data) {
            layer.closeAll('loading');
            var data = data.data;
            if (data.statusCode == 200) {
              var result = data.result;
              $scope.messageList = result.list;
              if (result.total == 0) {
                $scope.messageList = [];
                $scope.nodata = true;
                return;
              }
            }

          }, err)
        }
      });
    }, err);
  }

  function getCommentList() {
    $scope.nodata = false;
    dsp.postFun('cj/appPush/getCJPushInfoListByUserId', { pageSize: $scope.pageSize, pageNum: $scope.pageNum }, function (data) {
      layer.closeAll('loading');
      console.log(data);
      var data = data.data;
      var result = data.result;
      console.log(result);
      if (result.count == 0 || result.total == 0) {
        $scope.messageList = [];
        $scope.nodata = true;
        return;
      }
      let isReadArr = []
      const list = result.list || []
      $scope.messageList = list.map(_ => {
        const arr = _.picurl.split(',')
        return {
          ..._, 
          img_url_one: arr.length > 0 ? arr[0] : _.picurl 
        }
      });
      $scope.messageList && $scope.messageList.forEach(con => {
        con.create_time = con.create_time.split('.')[0]
      })
      $scope.totalPage = result.total


      $("#ld-pages").jqPaginator({
        // totalPages: 20,//分页的总页数
        totalCounts: result.count ? result.count : result.total,
        pageSize: $scope.pageSize,
        visiblePages: 5,//显示多少页
        currentPage: $scope.pageNum,//当钱第几页
        activeClass: $scope.vip == '1' ? 'pageActiveVip' : 'active',
        prev: '<a class="prev" href="javascript:void(0);">&lt;<\/a>',
        next: '<a class="next" href="javascript:void(0);">&gt;<\/a>',
        page: '<a href="javascript:void(0);">{{page}}<\/a>',
        first: '<a class="prev" href="javascript:void(0);">&lt&lt;<\/a>',
        last: '<a class="prev" href="javascript:void(0);">&gt&gt;<\/a>',
        onPageChange: function (n, type) {
          if (type == 'init') return;
          $scope.pageNum = n;

          var getMesListData = {
            pageSize: $scope.pageSize,
            isread: '',
            start: $scope.pageNum
          }
          dsp.postFun('cj/appPush/getCJPushInfoListByUserId', { pageSize: $scope.pageSize, pageNum: $scope.pageNum }, function (data) {
            layer.closeAll('loading');
            var data = data.data;
            if (data.statusCode == 200) {
              var result = data.result;
              const list = result.list || []

              $scope.messageList = list.map(_ => {
                const arr = _.picurl.split(',')
                return {
                  ..._, 
                  img_url_one: arr.length > 0 ? arr[0] : _.picurl 
                }
              });
              if (result.count == 0 || result.total == 0) {
                $scope.messageList = [];
                $scope.nodata = true;
                return;
              }
              // $scope.messageList = result.list;
              $scope.messageList && $scope.messageList.forEach(con => {
                con.create_time = con.create_time.split('.')[0]
              })

            }

          }, err)
        }
      });
    }, err);
  }

  //获取信息数量
  function getCount() {
    dsp.postFun('cujia-message/cj/notification/selectIsNotRead', { isread: 0 }, function (data) {
      if (data.data.statusCode == 200) {
        result = data.data.result
        $scope.messageNum = result.count * 1;
        for (let i = 0; i < $scope.messageTab.length; i++) {
          $scope.messageTab[0].count = result.cjCount * 1
          $scope.messageTab[1].count = result.elitesCount * 1;
          $scope.messageTab[2].count = result.pushCount * 1
        }
      }
    })
  }
  if ($scope.hasLogin) {
    getCount()
  }

  function err(err) {
    layer.closeAll('loading');
    console.log(err);
  }

  function delgetReconed(dsp, $rootScope) {
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
}
