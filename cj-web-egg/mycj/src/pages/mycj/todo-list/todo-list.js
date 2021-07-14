export function todoListFactory(angular) {
  const app = angular.module('todo-list.module', ['service', 'home-service']);

  app.controller('todo-list.ctrl', ['$scope', 'dsp', '$location', '$stateParams',
    function ($scope, dsp, $location, $stateParams) {
      console.log('todo-list.ctrl');
      dsp.setRightMinHeight();
      if (!localStorage.getItem('token')) {
        window.location.assign('login.html')
      }
      $scope.hasLogin = dsp.isInLoginState();
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');

      $scope.vip = vip;
      $scope.admin = base64.decode(localStorage.getItem('name') ? localStorage.getItem('name') : localStorage.getItem('loginName'));
      var width = $(".block-title").width();
      if (vip == '1') { //vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.mycj-right-bar').addClass('vip');
        $('.mycj-right-wrap').css('background', '#F0EDE7');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.mycj-right-bar').removeClass('vip');
        $('.mycj-right-wrap').css('background', '#f2f3f5');
      }
      $('.header-nav li').eq(0).addClass('active');

      const todoTypeObj = {
        'zombie': { val: '1', txt: '僵尸订单' },
        'synErr': { val: '2', txt: '同步失败' },
      }

      $scope.todoType = $stateParams.type; //待办事项种类    1。僵尸订单  2.同步失败

      $scope.pageNum = '1'; //分页当前页码
      $scope.pageSize = '20'; //分页每页展示条数
      $scope.options1 = { //僵尸订单 操作明细
        // 1：全额退款，2：部分退款，3：部分已配齐的发货，未配齐的继续等待，4：继续等待
        '1': { val: '1', ch: '退款', en: 'Refund' },
        '2': { val: '2', ch: '继续等待', en: 'Keep waiting' },
        '3': { val: '3', ch: '拆分订单发货', en: 'Split order shipment' }
      };
      $scope.isShowPaging = true //是否展示分页
      $scope.synErrAllChecked = false //同步失败订单全选flag

      /** 根据 todoType 加载不同数据 */
      switchAjaxByTodoType()

      function switchAjaxByTodoType() {
        switch ($scope.todoType) {
          case todoTypeObj.zombie.val:
            queryOrderobserver()
            break
          case todoTypeObj.synErr.val:
            fulfillmentFaild()
            break
          default:
            break
        }
      }
      // tab 选择
      $scope.toduTabClick = function (todoType) {
        $scope.todoType = todoType
        $scope.pageNum = '1'
        $scope.pageSize = '20'

        switchAjaxByTodoType()
      }
      /** goback */
      $scope.goback = function () {
        window.history.back();
      }

      /** 僵尸订单 开始 */
      // queryOrderobserver();
      function queryOrderobserver() { //僵尸订单 列表
        var sendData = {
          userId: userId,
          sousuo: '1',
          sku: '1',
          pageNum: ($scope.pageNum - 1) * ($scope.pageSize - 0),
          pageSize: $scope.pageSize
        }
        dsp.loadPercent($('.todolistWrap'), $(window).height() - 171, 47, 0);
        dsp.postFun('erp/observer/queryOrderobserver', JSON.stringify(sendData), function (data) {
          console.log(data.data);
          dsp.closeLoadPercent($('.todolistWrap'));
          if (data.data.statusCode == '200') {
            $scope.zombieList = data.data.result;
            $.each($scope.zombieList, function (i, v) {
              v.isSelect = false;
              // v.decisionMaking = '';
              v.decisionMaking2 = '';
              v.isShowRemark = false;
              var arr = typeof v.decisionMaking === 'string' ? v.decisionMaking.split(',') : [];
              var newArr = [];
              $.each(arr, function (i, v) {
                var obj = $scope.options1[v];
                newArr.push(obj);
              })
              v.decisionMaking = newArr;
            })
            console.log($scope.zombieList);

            $scope.zombieList.length === 0 ? $scope.isShowPaging = false : $scope.isShowPaging = true

            queryBycount();

          }
        }, function () { dsp.closeLoadPercent($('.todolistWrap')) }, { layer: true })
      }

      function queryBycount() { //僵尸订单 总条数
        var sendData = {
          userId: userId
        }
        dsp.postFun('erp/observer/queryBycount', JSON.stringify(sendData), function (data) {
          console.log(data.data);
          $scope.totalCounts = data.data.result[0].num * 1;
          importFun();
        }, function () { })
      }
      $scope.openSelect = function (item) { //僵尸订单  分单代开关闭
        if (item.isSelect) {
          item.isSelect = false;
        } else {
          item.isSelect = true;
        }
      }
      $scope.checkSelect = function (val, item) {
        item.decisionMaking2 = val;
      }
      //保存
      $scope.confirmFun = function () {
        console.log($scope.zombieList);
        var arr = [];
        $.each($scope.zombieList, function (i, v) {
          if (!(v.decisionMaking2 == '')) {
            var data = {
              orderId: v.orderId,
              orderProductId: v.orderProductId,
              decisionMaking: v.decisionMaking2,
              sku: v.sku,
              quehuo: v.quehuo
            }
            arr.push(data);
          }
        })
        if (arr.length == 0) {
          layer.msg('Please operate a piece of data first');
          return;
        }
        console.log(arr);
        var sendData = {
          account: '0',
          userId: userId,
          data: JSON.stringify(arr)
        }
        // layer.load(2)
        dsp.load()
        dsp.postFun('erp/observer/updateAccountOrderob', JSON.stringify(sendData), function (data) {
          dsp.closeLoad()
          layer.msg(data.data.message);
          queryOrderobserver();
        }, function () { dsp.closeLoad() }, { layer: true })
      }
      $scope.openRemark = function (item, boolen) {
        item.isShowRemark = boolen;
      }
      $scope.navToDetail = function (id, isRead) {//查看订单详情
        if (id) {
          const navUrl = `/order-detail/${id}/1`;
          if (!isRead) {
            layer.load(2)
            dsp.mypost('cj/fbaOrder/readfulfillmentFail', { ids: id + '' }).then(res => { console.log('navToDetail res => ', res) })
          }
          $location.path(navUrl);
        } else layer.msg('id is not found')
      }
      $scope.msgboxShow = false;
      $scope.clearAllconfirm = function () {
        // console.log('clearAllconfirm')
        $scope.ignoreIds = $scope.synErrList && $scope.synErrList.map(({ ID }) => ID).join(',');
        $scope.msgboxShow = true;
      }
      $scope.clearAll = function () {
        $scope.msgboxShow = false;
        const ids = $scope.ignoreIds
        if (ids) {
          layer.load(2)
          dsp.mypost('cj/fbaOrder/removefulfillmentFail', { ids }).then(res => {
            console.log('clearAll res => ', res)
            // layer.msg('success')
            switchAjaxByTodoType()//重新获取数据
          }).catch(() => {
            layer.msg('Ignore Failed')
          })
        }
      }
      /** 僵尸订单结束 */

      /** 同步失败订单 开始*/
      function fulfillmentFaild() {   //获取同步失败订单
        let sendData = {
          offset: $scope.pageNum,
          count: $scope.pageSize
        }
        dsp.loadPercent($('.todolistWrap'), $(window).height() - 171, 47, 0);
        dsp.postFun('cj/fbaOrder/fulfillmentFaild', JSON.stringify(sendData), function (res) {
          console.log(res.data);
          dsp.closeLoadPercent($('.todolistWrap'));

          if (res.data.statusCode === '200') {
            $scope.synErrList = res.data.result.list.map(item => {
              item.isChecked = false
              return item
            })
            $scope.notRead = $scope.synErrList.filter(({ isRead }) => isRead == 0).length;
            $scope.totalCounts = res.data.result.total
            $scope.synErrList.length === 0 ? $scope.isShowPaging = false : $scope.isShowPaging = true
            importFun();
            console.log($scope.synErrList)
          }
        }, function () { dsp.closeLoadPercent($('.todolistWrap')) }, { layer: true })
      }
      $scope.timeFormat = function (timestamp, option = {}) {
        if (!timestamp) return '';
        var time = new Date(timestamp);
        function fix(t) {
          t += '';
          return t.length === 1 ? '0' + t : t;
        }
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = fix(time.getHours());
        var minutes = fix(time.getMinutes());
        var seconds = fix(time.getSeconds());
        const { type } = option;
        if (!type) return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
      }
      //全选
      $scope.clickAllChecked = () => {
        $scope.synErrAllChecked = !$scope.synErrAllChecked
        $scope.synErrList = $scope.synErrList.map(item => {
          item.isChecked = $scope.synErrAllChecked
          return item
        })
      }
      //单击checkbox
      $scope.clickOneChecked = ({ ID }) => {
        $scope.synErrList = $scope.synErrList.map(item => {
          if(item.ID === ID) item.isChecked = !item.isChecked
          return item
        })
        const checkedLen = $scope.synErrList.filter(item => item.isChecked).length
        $scope.synErrAllChecked = checkedLen === $scope.synErrList.length
      }
      //ignore选中订单
      $scope.ignoreOrder = () => {
        const list = $scope.synErrList && $scope.synErrList.filter(item => item.isChecked) || []
        if (list.length < 1) {
          layer.msg('Please checked orders')
        } else {
          $scope.ignoreIds = list.map(({ ID }) => ID).join(',');
          $scope.msgboxShow = true;
        }
      }
      
      /** 同步失败订单 结束 */

      function importFun() {
        $(".pagination-demo1").jqPaginator({
          totalCounts: $scope.totalCounts || 1, //设置分页的总条目数
          pageSize: $scope.pageSize - 0, //设置每一页的条目数
          visiblePages: 5,
          currentPage: $scope.pageNum * 1,
          activeClass: 'active',
          first: '<li class="first"><a class="prev" href="javascript:void(0);">&lt&lt;<\/a><\/li>',
          prev: '<li class="prev"><a class="prev" href="javascript:void(0);">&lt;<\/a><\/li>',
          next: '<li class="next"><a class="next" href="javascript:void(0);">&gt;<\/a><\/li>',
          last: '<li class="last"><a class="prev" href="javascript:void(0);">&gt&gt;<\/a><\/li>',
          page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
          onPageChange: function (n, type) {
            // console.log(n)
            // console.log(type)
            if (type == 'init') {
              return;
            }
            $scope.pageNum = n + '';
            $scope.zombieList = [];
            switchAjaxByTodoType();
            // $scope.ordersList = [];
            // ;

          }
        });
      }
      $scope.pagechange = function () {
        $scope.pageNum = '1';
        switchAjaxByTodoType();
      }

      $scope.gotoPage = function () {
        var pagenum = Number($scope.pageNum);
        console.log(pagenum);
        var totalpage = Math.ceil($scope.totalCounts / $scope.pageSize);
        if (pagenum > totalpage) {
          layer.msg('Error page');
          $scope.pageNum = '1';
        } else {
          switchAjaxByTodoType();
        }
      }

    }]);

  return app;

}