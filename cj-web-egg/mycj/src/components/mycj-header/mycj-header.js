import { NAV_LIST } from '@src/pages/mycj/mycj.constant';
import { BUILD_TIMESTAMP } from '@root_egg/env';
import styles from './mycj-header.less';
import CJMsg from '../../../public/static/js/cjmsg/cjmsg';

export function mycjHeaderFactory(module) {
  module.component('mycjHeader', {
    templateUrl: `/components/mycj-header/mycj-header.html?v=${BUILD_TIMESTAMP}`,
    controller: [
      '$rootScope',
      '$scope',
      '$location',
      'dsp',
      '$element',
      'utils',
      mycjHeaderCtrl
    ],
  });
  module.directive('onFinish',['$timeout', function($timeout) {// 节点加载后执行
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        $timeout(function () {
          console.log('这里执行msgBarRendered');
          scope.$emit('msgBarRendered'); // 这里执行msgBarRendered
        });
      }
    }
  }])
}

function mycjHeaderCtrl($rootScope, $scope, $location, dsp, $element, utils) {
  const base64 = $rootScope.base64;
  const userInfo = $rootScope.userInfo;
  // 导航高亮
  matchActivatedNav($rootScope, $scope, $location);
  // 下架商品数量
  getSoldOutCount({ $rootScope, $scope, dsp, base64 });
  // 获取系统消息
  // getMessage();

  $element.addClass(['component-mycj-header', styles.mycjHeader]);
  $scope.vip = userInfo.vip;
  $scope.ElitesUrl = dsp.getElitesUrl();
  $scope.subAccountName = localStorage.getItem('subAccountName')
    ? base64.decode(localStorage.getItem('subAccountName')) : ''
  $scope.admin = $scope.subAccountName || `${userInfo.firstName}` || `${userInfo.loginName}`;
  $scope.avatar = `${userInfo.avatar}`;
  $scope.userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
  $scope.isMark = true;
  $scope.logout = () => logoutHandle({ base64, dsp });
  $scope.newUser = () => newUserHandle({ $location });
  $scope.showUserUp = false;

  dsp.postFun('cjEvaluation/getEvalSupplierCount' , {
  }, function(res) {
      if(res.status === 200 && res.data.code === 200) {
          $scope.evaluteCount = res.data.data.count;
      }
  })


  //弹出框
  $('.hi-user').on('mouseenter', function () {
    // $scope.showUserUp = true;
    $('.header-tip').stop().animate({
      height: 'show'
    },200);
  });
  $('.hi-user').mouseleave(function () {
    // $scope.showUserUp = false;
    $('.header-tip').stop().animate({
      height: 'hide'
    },400);
  });
  // 下拉菜单

  $('.header-help').on('mouseenter', function () {
    // $scope.showHelpUp = true;
    $('.hnj-xialamenu').stop().animate({
      height: 'show'
    },200);
  });
  // $('.hnj-xialamenu').on('mouseleave', function () {
  //   // $scope.showHelpUp = false;
  //   $('.hnj-xialamenu').stop().animate({
  //     height: 'hide'
  //   },300);
  // });
  $('.header-help').mouseleave(function () {
    $('.hnj-xialamenu').stop().animate({
      height: 'hide'
    });
  });

  //给系统消息添加显示隐藏
  // $('.message-img-flag').on('mouseenter', function () {
  //   $('.index-message-box').stop().animate({
  //     height: 'show'
  //   });
  // });
  // $('.message-img-flag').on('mouseleave', function () {
  //   $('.index-message-box').stop().animate({
  //     height: 'hide'
  //   });
  // });
  $('.mes-d-ul a').click(function () {
    location.href = '#/message-list';
  });

  // tab栏
  $scope.tabVal = '1'
  // $scope.MessageType = '1'
  // $scope.messagePre = []
  // $scope.messageTab = [
  //   { name: 'From CJ', val: "1", isActive: true },
  //   { name: 'ELITES', val: "2", isActive: false },
  //   { name: 'Recommendations', val: "3", isActive: false },
  // ]

  // //切换tab
  // $scope.checkMessage = function (item) {
  //   $scope.messageTab.forEach(tab => { tab.isActive = tab.name === item.name });
  //   $scope.MessageType = item.val;
  //   $scope.isMark = true;
  //   // console.log($scope.MessageType)
  //   $scope.messagePre = [];
  //   getMessage();
  // }

  // 去论坛
  $scope.toElites = item => toElitesHandle({ $scope, item, base64 });

  // const tabApi = {
  //   '1': { url: 'messageCenterCj/notification/updateRead' },
  //   '2': { url: 'app/notification/allRead' },
  //   '3': { url: 'cj/appPush/updateAppPushIsRead' },
  // };
  $scope.ticket = () => {
    location.href = "/myCJ.html#/ticketList"
  }
  
  // $scope.toMarkAll = function () {
  //   if ($scope.tabVal === '1') {
  //     dsp.postFun(tabApi[$scope.tabVal].url, { userId: $scope.userId }, ({ data }) => {
  //       +data.code === 200 && getMessage()
  //     })
  //   } else {
  //     dsp.postFun(tabApi[$scope.tabVal].url, {}, data => {
  //       if (data.data.statusCode == 200) {
  //         getMessage();
  //       }
  //     });
  //   }
  //   $rootScope.$emit("toMarkAll", {});
  // }

  $scope.toDetailPage = function (item) {
    if (item.url) {
      const params = {
        userId: $scope.userId,
        noticeId: item.notificationchId
      }
      dsp.postFun('messageCenterCj/notification/updateRead', params, ({ data }) => {
        const { code } = data
        if (+code === 200) getMessage();
      })
      window.open(item.url + '&href');
    } else {
      //  $location.path('/message-list/' + item.id);
      location.href = '/message-list/' + item.id
    }
  }

  // $scope.toCommentDetail = function (item) {
  //   location.href = 'list-detail.html?id=' + item.push_id
  // }

  // $scope.toAllMessage = function () {
  //   location.href = 'myCJ.html#/all-message/' + $scope.MessageType
  // };

  $scope.hasLogin = dsp.isInLoginState(); //是否登录

  $scope.$on('msgBarRendered', function(ev) { // 在节点加载后执行
    window.CJMsg = new CJMsg({ isLogin:$scope.hasLogin, getDomainByUrl: dsp.getDomainByUrl, checkVip: true })
  });

  // $rootScope.$on('updateNotReadMsg', (e, d) => {
  //   // getCount({ $scope, dsp })
  //   getMessage();
  // })

  // 获取系统消息
  // function getMessage() {
  //   getCount({ $scope, dsp })
  //   if ($scope.MessageType == '1') {
  //     getMessageCJ({ $scope, dsp, $rootScope, utils })
  //   } else if ($scope.MessageType == '2') {
  //     getMessageElites({ $scope, dsp, $rootScope })
  //   } else if ($scope.MessageType == '3') {
  //     getMessageComment({ $scope, dsp, $rootScope })
  //   }
  // }
  // getMessage();
  /** 2020-3-25 子账号-路由权限*/
  $scope.disposeHrefFn = (href, type) => { //Tutorial
    const allMenu = localStorage.getItem('AllPowerMenu') ? utils.JSONparse(base64.decode(localStorage.getItem('AllPowerMenu'))) : []
    const powerMenu = localStorage.getItem('PowerMenu') ? utils.JSONparse(base64.decode(localStorage.getItem('PowerMenu'))) : []
    const res = allMenu.includes(`#${type}`) && !powerMenu.includes(`#${type}`) ? 'myCJ.html#/noPower?powerType=1' : href
    return res
  }
  // 跳转订单管理
  $scope.goDropshipping = () => {
    const orderversion = localStorage.getItem('orderversion') ?? '2';
    const _href = orderversion == '2' ? 'newmycj/dropshipping/untreatedOrder' : 'myCJ.html#/direct-orders';
    location.href = _href;
  }
}



// 获取下架商品数
function getSoldOutCount({ $rootScope, $scope, dsp, base64 }) {
  var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
  var d = {
    pageSize: 0,
    pageNum: 1,
    shopId: $scope.selectshopinfo ? $scope.selectshopinfo.ID : '',
    userId: userId,
    serachName: $scope.consearchinfo || ''
  }
  dsp.postFun('app/connection/conList', { "data": JSON.stringify(d) }, function (res) {
    // {message: "成功", result: "{"total":149,"outCount":2,"conList":[]}", statusCode: "200"}
    try {
      $rootScope.soldOutCount = JSON.parse(res.data['result'])['outCount']; // 下架商品数量
      console.log('下架商品数 ->', $rootScope.soldOutCount)
    } catch (e) {
      console.warn('解析下架商品数出错 ->', e);
    }
  });
}

// 消息中心 ---- CJ 系统消息
// function getMessageCJ({ $scope, dsp, $rootScope, utils }) {
//   const params = {
//     pageNum: 1,
//     pageSize: 5,
//     data: {
//       isread: "",
//       userId: $scope.userId
//     }
//   }
//   dsp.postFun("messageCenterCj/notification/queryGetCjnotification", params, ({data}) => {
//     const { code, data: result = {} } = data
//     if (+code === 200) {
//       const { list } = result
//       let isReadArr = []
//       $scope.messagePre = list.map(v => {
//         const ind = v.notificationType.indexOf('html:')
//         if ( ind > -1) {
//           v.url = v.notificationType.slice(ind + 5);
//           v.notificationType = v.notificationType.slice(0, ind)
//         }
//         isReadArr.push(v.isread)
//         return v
//       })
//       $scope.isMark = !isReadArr.includes('0')
//       //将未读的置顶
//       let idxs = [], tops = []
//       $scope.messagePre.forEach((v, i) => {
//         v.isread === '0' && idxs.unshift(i)
//       })
//       idxs.forEach(idx => tops = tops.concat($scope.messagePre.splice(idx, 1))) //把未读的元素全部拿出来
//       $scope.messagePre = tops.reverse().concat($scope.messagePre)
//       getTopMessageList($scope, dsp, utils)
//     }
//   })
// }

//消息中心 - cj 系统消息 获取置顶消息列表
// function getTopMessageList($scope, dsp, utils) {
//   dsp.postFun('messageCenterCj/notification/queryNoticeUpperApex', { userId: $scope.userId }, ({ data }) => {
//     const { code, data: result = {} } = data
//     if (+code !== 200 ) return;
//     const { list } = result
//     const noReadList = list.filter(v => v.isread === '0').reverse()
//     const arr = utils.uniqueArr([...noReadList, ...$scope.messagePre], 'id')
//     $scope.messagePre = arr.filter((v, i) => i < 5)
//     noReadList.length > 0 && $('.index-message-box').stop().animate({
//       height: 'show'
//     });
//   })
// }

// 消息中心 ---- 论坛消息
// function getMessageElites({ $scope, dsp }) {
//   var getTopMesData = {
//     "pageNum": "1",
//     "pageSize": "5"
//   }
//   var url = 'app/notification/getInformList'
//   dsp.postFun(url, getTopMesData, function (data) {
//     console.log(data.data)
//     var data = data.data;
//     if (data.statusCode == 200) {
//       var result = JSON.parse(data.result);
//       console.log(result)
//       $scope.messagePre = result.list;
//       let isReadArr = []
//       for (let i = 0; i < $scope.messagePre.length; i++) {
//         isReadArr.push($scope.messagePre[i].read_status)
//         if (isReadArr.includes(2)) {
//           $scope.isMark = false
//         }
//       }
//     }
//   });
// }

// 消息中心 ---- 推荐商品
// function getMessageComment({ $scope, dsp }) {
//   var getTopMesData = {
//     "pageNum": "1",
//     "pageSize": "5"
//   }
//   dsp.postFun('cj/appPush/getCJPushInfoListByUserId', getTopMesData, function (data) {
//     console.log(data.data)
//     var data = data.data;
//     if (data.statusCode == 200) {
//       var result = data.result;
//       console.log(result)

//       const list = result.list || []
//       $scope.messagePre = list.map(_ => {
//         const arr = _.picurl.split(',')
//         return {
//           ..._, 
//           img_url_one: arr.length > 0 ? arr[0] : _.picurl 
//         }
//       });
//       let isReadArr = []
//       for (let i = 0; i < $scope.messagePre.length; i++) {
//         isReadArr.push($scope.messagePre[i].is_read)
//         if (isReadArr.includes(2)) {
//           $scope.isMark = false
//         }
//       }
//     }
//   });
// }

// 判断是否显示顶部菜单
function showTopMenu(meun, $scope) {
  const highLight = ['/myCJWallet','/profile', '/accountManage','/addTicket', '/warning_set']
  if(String(meun).indexOf('/relevant-packaging') == -1) {
    $('.header-nav li').eq(2).removeClass('productActive');
  }
  if(highLight.includes(meun) || String(meun).indexOf('/message-list') !== -1 || String(meun).indexOf('/relevant-packaging') !== -1 || String(meun).indexOf('/ticketList') !== -1 || String(meun).indexOf('/all-message') !== -1 || String(meun).indexOf('/order-detail') !== -1) {
    $scope.showTopMenu = true
  } else {
    $scope.showTopMenu = false
  }
}

// 匹配高亮路由
function matchActivatedNav($rootScope, $scope, $location) {
  // 显示顶部导航的路由
  showTopMenu($location.url(), $scope)
  $rootScope.$on('on-url-changed', (_, data) => {
    let type = data.type || ''
    showTopMenu($location.url(), $scope)
    if(!type || $location.$$search.powerType) {
      Object.entries(NAV_LIST).forEach(([k, v]) => {
        $scope[`${k}_active`] = data.nav === v;
      })
    }

  });
  $rootScope.$on('old-url-change', (_, data) => {
    showTopMenu($location.url(), $scope)
    if ($location.url() !== '/noPower') {
      Object.entries(NAV_LIST).forEach(([k, v]) => {
        $scope[`${k}_active`] = data.nav === v;
      });
    }
  })
}

// 退出登录
function logoutHandle({ base64, dsp }) {
  const token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
  dsp.postFun('app/platform/quitLogin', { "token": token }, function (n) {
    localStorage.removeItem('token');
    localStorage.removeItem('noEncodeToken');
    // 退出登录清除cookie中的email
    console.log('退出在这儿，src/components/mycj-header/mycj-header.js');
    localStorage.removeItem('emailVerifyStatus');
    localStorage.removeItem('utmSource');
    document.cookie = `emailVerifyStatus=0; domain=${__root__domain}`;
    localStorage.getItem('loginfromerp') && localStorage.removeItem('loginfromerp');
    dsp.delCookie('cjLoginName');
    dsp.delCookie('cjLoginToken');
    dsp.delAwcCookie('awc');
    location.href = "home.html"; // 去首页
  })
}

// 新用户
function newUserHandle({ $location }) {
  const isFirstLogin = localStorage.getItem('isFirstLogin');
  const isEmpower = localStorage.getItem('isEmpower');
  if (isFirstLogin == '0') {
  } else if (isFirstLogin == '1' && isEmpower == '0') {
    //已登录未授权 第一步
    location.href = 'home.html';
    localStorage.setItem('isFirstLogin', '0');
  } else if (isFirstLogin == '1' && isEmpower == '2') {
    //已授权 第二步
    const path = $location.path();
    if (path == '/myCJAssociatedStore') {
      console.log('就在当前页');
      localStorage.setItem('closeFlag', '');
      localStorage.setItem('isEmpower', '1');
      const li = $('.header-nav>ul>li:nth-child(3)');
      const left = getElementLeft(li[0]) - 18;
      const top = getElementTop(li[0]) - 8;
      // console.log(left, top);
      $('.online-wrap3').css({
        "top": top + 'px',
        "left": left + 'px'
      });
      $('.zzc3').show();
    } else {
      localStorage.setItem('closeFlag', '');
      location.href = 'myCJ.html#/myCJAssociatedStore';
      localStorage.setItem('isEmpower', '1');
    }
  }

  function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  }

  function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }
}

// 去论坛
function toElitesHandle({ $scope, item, base64 }) {
  if ($scope.MessageType == '2') {
    $scope.UrlId = item.detail_id
    const token = base64.decode(localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token'));
    const baseUrl = 'https://elites.cjdropshipping.com';
    const otime = Date.now();
    console.log(token)
    if (item.operation_type == '1') {
      window.open(`${baseUrl}/cross?token=${token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`)           //关注
    }
    if (item.operation_type == '4' || item.operation_type == '6' || item.operation_type == '9' || item.operation_type == '10') {
      window.open(`${baseUrl}/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`)           //问题
    }
    if (item.operation_type == '3' || item.operation_type == '7') {
      window.open(`${baseUrl}/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.question_id}`)           //问题
    }
    if (item.operation_type == '2' || item.operation_type == '5' || item.operation_type == '8') {
      window.open(`${baseUrl}/cross?token=${token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`)   //文章详情
    }
  } else if ($scope.MessageType == '3') {
    location.href = 'list-detail.html?id=' + item.push_id + '&fromType=CommentList'
  }
}

// 消息未读数量
// function getCount({ $scope, dsp }){
//   dsp.postFun('app/notification/selectIsNotRead',{isread :0},function(data){
//     if(data.data.statusCode ==200){
//       const { elitesCount, pushCount } = JSON.parse(data.data.result)
//       dsp.postFun('messageCenterCj/notification/queryCjInformMap', { userId: $scope.userId }, ({data}) => {
//         const { code, data: result = {}} = data
//         if (+code !== 200) return;
//         const { cjInformNum } = result
//         $scope.messageNum = cjInformNum - -elitesCount - -pushCount
//         $scope.messageTab = $scope.messageTab.map((v, i) => {
//           if (i === 0) v.count = cjInformNum;
//           if (i === 1) v.count = elitesCount * 1;
//           if (i === 2) v.count = pushCount * 1;
//           return v
//         })
//       })
//     }
//   })
// }

