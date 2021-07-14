export function ticketListFactory(angular) {
  const app = angular.module('ticket-list.module', []);
  const noDataHeight = 520;
  
  app.controller('ticket-list.ctrl', ['$scope', '$rootScope', 'dsp',
    function ($scope, $rootScope, dsp) {
      
      $scope.inputStr = ''
      $scope.listArr = []
      $scope.detailData = []
      $scope.isDetail = false
      $scope.isClose = false
      $scope.pageNum = '1';
      $scope.pageSize = '10';
      dsp.beforeSearchPic($('.no-data'), noDataHeight)
      
      
      $scope.listViewTicket = function (item) {
        console.log(item)
        $scope.valuateItem = item;
        $scope.evaluateId = item.ID;
        $scope.status = item.STATUS;
        $scope.type = item.TYPE;
        $scope.ticketNum = item.SERIAL;
        $scope.subject = item.SUBJECT;
        $scope.isDetail = true;
        $scope.replyBtnShow = $scope.nowStatus === '2' || $scope.nowStatus === '1' || $scope.nowStatus === "4";
        $scope.estimateDate = item.estimateDate;
        $scope.estimate = item.estimate;
        $scope.estimateExplain = item.estimateExplain;
        $scope.showType = item.TYPE;
        $scope.isVip = item.vip;
        // 工单类型  businessType=5 是搜品工单
        $scope.businessType = item.businessType;
        // 以erp发起的主动搜品工单
        $scope.isErpCall = item.isErpCall;
        
        
        $scope.titleshow = false;
        $('.hnj-SupportCenterWrap > ul > li').eq(3).show().siblings('li').hide();
        $scope.hideID = $(this)[0].item.ID;
        $scope.nowStatus = $(this)[0].item.STATUS;
        $scope.nowType = $(this)[0].item.TYPE;
        $scope.nowNum = $(this)[0].item.SERIAL;
        
        
        // 详情数据
        dsp.getFun('pojo/issue/getIssueMessageCj?id=' + $scope.hideID, con, err)
        
        function con(res) {
          var detailData = JSON.parse(res.data.result);
          console.log(detailData);
          // console.log(detailData[0].ATTACHMENT);//数组
          // console.log(attachmentstr);
          $scope.detailData = detailData;
          // $scope.detailData.imgName="";
          $scope.imgName = $scope.detailData[0].OPERATOREN.slice(0, 1).toUpperCase();
          console.log($scope.imgName);
          $scope.tdetailDate = detailData[0].MESSAGEDATE.time;
          console.log($scope.detailData);
          for (var i = 0; i < $scope.detailData.length; i++) {
            if ($scope.detailData[i].STATUS == '1') {
              $scope.ywyName = $scope.detailData[i].OPERATOREN ? $scope.detailData[i].OPERATOREN.slice(0, 1).toUpperCase() : null;
            }
            if ($scope.detailData[i].ATTACHMENT) {
              $scope.detailData[i].ATTACHMENT = $scope.detailData[i].ATTACHMENT.split(',');
            }
            // if($scope.detailData[i].STATUS)
          }
        };
        
        function err(res) {
        
        }
        
        $scope.replyUlHide = $scope.nowStatus == '0' || $scope.nowStatus == '3' || $scope.nowStatus == '5';
        $scope.replyBtnShow = $scope.nowStatus == '2' || $scope.nowStatus == '1'||$scope.nowStatus == '4';
        $scope.CancelBtnShow = $scope.nowStatus == '1' || $scope.nowStatus == '2' || $scope.nowStatus == '4';
        $scope.EndBtnShow = $scope.nowStatus == '1' || $scope.nowStatus == '2';
        // $scope.addmessageShow=$scope.nowStatus=='1'
        // 客户回复
        $scope.replyFun = function () {
          $scope.newimgArr = $scope.imgArr.toString();
          console.log($scope.newimgArr)
          
          $scope.kreplyMessage = $('#kmessage').val();
          if($scope.kreplyMessage.length<5){
            return layer.msg('Please enter 5 characters at least.')
          }
          layer.load();
          if ($scope.kreplyMessage) {
            dsp.postFun('cujia-message/issue/cjReply', {
              "id": $scope.hideID,
              "message": $scope.kreplyMessage,
              "attachment": $scope.newimgArr
            }, con, err)
            
            function con(res) {
              console.log(res.data.result);
              if (res.data.statusCode == 200) {
                $scope.isDetail = false;
                layer.closeAll('loading');
                layer.msg('Replied Successfully!');
                setTimeout(function () {
                  $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                  //$scope.ticket();
                  getData()
                }, 500);
                $('#kmessage').val('');
                $scope.imgArr = []; //清空要发送的图片
                $('#documentupload2').val('')
              } else {
                layer.msg('Server error!');
              }
              
              
            };
            
            function err(res) {
              layer.closeAll('loading');
            }
          } else {
            // $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
            $scope.replyTip = true;
            $scope.otherTip = false;
            $scope.closeWord = '';
            layer.msg("Please input some information.")
            $scope.replyTipFun = function () {
              $('.hnj-detail .hnj-tankuang').css({'display': 'none'});
            }
          }
        }
        // 取消工单
        $scope.cancelFun = function () {
          var str = 'close';
          $scope.closeWord = str;
          $scope.replyTip = false;
          $scope.otherTip = true;
          // $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
          $scope.isClose = true
        }
        $scope.cancelYesFun = function () {
          dsp.getFun('pojo/issue/cancel?id=' + $scope.hideID, con, err)
          
          function con(res) {
            console.log(res);
            // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
            // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
            $scope.isDetail = false
            $scope.isClose = false
            $('#documentupload2').val('')
            getData()
            //$scope.ticket();
          };
          
          function err(res) {
          
          }
        }
        $scope.cancelNoFun = function () {
          // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
          $scope.isClose = false
        }
        // 完成工单
        $scope.endFun = function () {
          // $scope.closeWord=complete;
          var str = 'Finished';
          $scope.closeWord = str;
          $scope.replyTip = false;
          $scope.otherTip = true;
          $scope.isClose = true
        }
        
        function evaluate(item) {
          $scope.evaluateId = item.ID
          dsp.getFun('pojo/issue/getIssueMessageCj?id=' + $scope.evaluateId, function (res) {
            var detailData = JSON.parse(res.data.result);
            $scope.detailData = detailData;
            $scope.imgName = $scope.detailData[0].OPERATOREN.slice(0, 1).toUpperCase();
            $scope.tdetailDate = detailData[0].MESSAGEDATE.time;
            $scope.cjStatus = []
            for (var i = 0; i < $scope.detailData.length; i++) {
              $scope.cjStatus.push($scope.detailData[i].STATUS)
              if ($scope.detailData[i].STATUS == '1') {
                $scope.ywyName = $scope.detailData[i].OPERATOREN ? $scope.detailData[i].OPERATOREN.slice(0, 1).toUpperCase() : null;
              }
              if ($scope.detailData[i].ATTACHMENT) {
                $scope.detailData[i].ATTACHMENT = $scope.detailData[i].ATTACHMENT.split(',');
              }
            }
            console.log($scope.cjStatus)
            if ($scope.cjStatus.includes('1')) {
              $scope.isEvaluate = true
            }
          }, function () {
          })
        }
        
        $scope.endYesFun = function () {
          
          dsp.getFun('pojo/issue/complete?id=' + $scope.hideID, con, err)
          
          function con(res) {
            console.log(res);
            $scope.isDetail = false
            $scope.isClose = false
            evaluate($scope.valuateItem)
            $('#documentupload2').val('')
            getData()
            // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
            // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
            //$scope.ticket();
          };
          
          function err(res) {
          
          }
        }
        $scope.endNoFun = function () {
          // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
          $scope.isClose = false
        }
        
        
      }
      
      //搜索
      $scope.listSearch = function () {
        $scope.pageNum = '1'
        getData('search')
      }
      $scope.textString = '';
      $scope.textAreaChange =(data)=>{
        // console.log(data.target.value,data.target.value.replace(/(^\s*)|(\s*$)/g, ''),"FFFFF")
        data.target.value = data.target.value.replace(/(^\s*)|(\s*$)/g, '')
      };
      
      function getData(type) {
        const params = {
          pageNum: $scope.pageNum,
          pageSize: $scope.pageSize,
          inputStr: $scope.inputStr
        }
        layer.load(2)
        dsp.postFun('cujia-message/issue/getIssueCj', params, ({data}) => {
          layer.closeAll('loading')
          if (data.statusCode === 200) {
            dsp.removeNodataPic($('.no-data'));
            const temp = JSON.parse(data.result)[0].issues || []
            // 根据回复的时间 和是否vip 算出是否要展示提示icon
            $scope.listArr = temp
            if ($scope.listArr.length == 0) {
              if (type == 'search') {
                dsp.afterSearchPic($('.no-data'), noDataHeight);
              } else {
                dsp.beforeSearchPic($('.no-data'), noDataHeight)
              }
            }
            $scope.totalNum = JSON.parse(data.result)[0].totle;
            $scope.totalPageNum = Math.ceil($scope.totalNum / $scope.pageSize);
            $scope.$broadcast('page-data', {
              pageNum: $scope.pageNum,
              totalNum: $scope.totalPageNum,
              totalCounts: $scope.totalNum,
              pageSize: $scope.pageSize
            });
          }
        }, err => {
          console.log(err);
        })
      }
      
      getData()
      
      $scope.$on('pagedata-fa', function (d, data) {
        $scope.pageNum = data.pageNum;
        $scope.pageSize = data.pageSize;
        getData()
      })
      
      
      //Submit Ticket
      $scope.status = ''
      $scope.type = ''
      $scope.ticketNum = ''
      // $scope.typeShow = function (item) {
      //   console.log(item)
      //   $scope.status = item.STATUS
      //   $scope.type = item.TYPE
      //   $scope.ticketNum = item.SERIAL
      //   $scope.subject = item.SUBJECT
      //   $scope.isDetail = true
      //   $scope.replyBtnShow = $scope.nowStatus == '2' || $scope.nowStatus == '1';
      // }
      
      $scope.typeShow1 = function () {
        location.href = '/myCJ.html#/addTicket'
      }
      
      // submit form 上传图片
      $scope.imgArr = [];
      $scope.imgArrType = [];
      $scope.upLoadImg4 = function (files) {
        dsp.ossUploadFile(files, function (data) {
          console.log(data, files, "&&&&&&&&");
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
            layer.msg('5M a file at most');
          }
          for (var j = 0; j < obj.length; j++) {
            var srcList = obj[j].split('.');
            var type = srcList[srcList.length - 1].toUpperCase()
            var typeList = ['PNG', 'JPG', 'JPEG', 'GIF']
            // if(srcList[srcList.length - 1] =='png' || srcList[srcList.length - 1] =='jpg' || srcList[srcList.length - 1]=='jpeg' || srcList[srcList.length - 1]=='gif'){
            if (typeList.indexOf(type) !== -1) {
              if($scope.imgArr.length < 10){
                $scope.imgArr.push(obj[j]);
              }else {
                layer.msg("You can only upload up to 10 images.");
              }
              $('#file').val("");
            } else {
              // $('.gderr-loadsrc').show(); //判断如果不是图片的弹框  显示
              // $('.hnj-form .hnj-tankuang').css({'display': 'block'});
              // $scope.submitTipMessage = 'Please upload the correct format.';
              // $scope.okFun = function () {
              //   $('.hnj-form .hnj-tankuang').css({'display': 'none'});
              // }
              layer.msg('Please upload the correct format.');
            }
          }
          $scope.$apply();
          // console.log($scope.imgArr);
        })
        return;
      }
      $('.gderr-btn').click(function () {
        $('.gderr-loadsrc').hide(); //判断如果不是图片的弹框  隐藏
      })
      // 关闭工单详情弹窗
      $scope.closeTicket=()=>{
        $scope.isDetail = false;
        $scope.imgArr = [];
        $("#kmessage").val("");
        $scope.kreplyMessage="";
      }
      // 图片预览和删除
      $scope.dpreviewImg = function ($event) {
        // var imgPT=($('.img-preview-wrap').height()-$('.img-preview-wrap img').height())/2
        var previewSrc = $($event.target).attr('src');
        console.log(previewSrc);
        $('.img-preview-wrap').css({'display': 'block'});
        // $('.img-preview-wrap img').css({ 'marginTop': '10%' });
        $scope.previewSrc = previewSrc;
        
        $scope.previewWrapFun = function () {
          $('.img-preview-wrap').css({'display': 'none'});
        }
      }
      
      $scope.deleteImg = function (idx) {
        $scope.imgArr.splice(idx, 1);
        // console.log($scope.imgArr)
      }
      
      // 下载图片
      $scope.downloadImgs = function (img) {
        window.open(img)
      }
      
      // 评价
      $scope.elvaluateMes = ''
      $scope.evaluateStatus = ''
      $scope.evaluateId = ''
      $scope.lineStatus = false
      $scope.evaluateTab = [
        {
          name: 'Good',
          url: './static/image/ticket-list/Good.png',
          actUrl: 'static/image/ticket-list/GoodActive.png',
          active: false,
          status: '非常好',
          icon: "iconfont status-icon iconmanyi"
        },
        {
          name: 'Average',
          url: './static/image/ticket-list/Average.png',
          actUrl: 'static/image/ticket-list/AverageActive.png',
          active: false,
          status: '一般',
          icon: "iconfont status-icon iconyiban"
        },
        {
          name: 'Poor',
          url: './static/image/ticket-list/Poor.png',
          actUrl: 'static/image/ticket-list/PoorActive.png',
          active: false,
          status: '不好',
          icon: "iconfont status-icon iconchaping"
        },
      ]
      $scope.Evaluate = function (item) {
        console.log(item)
        $scope.evaluateId = item.ID
        dsp.getFun('pojo/issue/getIssueMessageCj?id=' + $scope.evaluateId, function (res) {
          var detailData = JSON.parse(res.data.result);
          $scope.detailData = detailData;
          $scope.imgName = $scope.detailData[0].OPERATOREN.slice(0, 1).toUpperCase();
          $scope.tdetailDate = detailData[0].MESSAGEDATE.time;
          $scope.cjStatus = []
          for (var i = 0; i < $scope.detailData.length; i++) {
            $scope.cjStatus.push($scope.detailData[i].STATUS)
            if ($scope.detailData[i].STATUS == '1') {
              $scope.ywyName = $scope.detailData[i].OPERATOREN ? $scope.detailData[i].OPERATOREN.slice(0, 1).toUpperCase() : null;
            }
            if ($scope.detailData[i].ATTACHMENT) {
              $scope.detailData[i].ATTACHMENT = $scope.detailData[i].ATTACHMENT.split(',');
            }
          }
          console.log($scope.cjStatus)
          if (!$scope.cjStatus.includes('1')) {
            layer.msg("Sorry, you can't review a ticket without CJ's response.")
            // $scope.isEvaluate = true
          } else {
            $scope.isEvaluate = true
          }
        }, function () {
        })
      }
      $scope.choseEvaluate = function (item) {
        for (let i = 0; i < $scope.evaluateTab.length; i++) {
          $scope.evaluateTab[i].active = false;
        }
        item.active = true
        $scope.evaluateStatus = item.status
        $scope.lineStatus = true
      }
      //
      $scope.confirmEvaluate = function () {
        if ($scope.evaluateStatus) {
          dsp.postFun('pojo/issue/addIssueEvaluate', {
            "id": $scope.evaluateId,
            "estimate": $scope.evaluateStatus,
            "estimateExplain": $scope.elvaluateMes
          }, function (res) {
            console.log(res)
            if (res.data.statusCode == 200) {
              layer.msg('Submit Successfully')
              $scope.cancelEvaluate()
              getData()
              //$scope.ticket()
            } else if (res.data.statusCode == 5001) {
              layer.msg('The ticket cannot be reviewed for more than 7 days.')
            }
          }, function () {
          })
        }
      }
      
      // 评价返回
      $scope.cancelEvaluate = function () {
        $scope.isEvaluate = false
        $scope.elvaluateMes = ''
        $scope.evaluateStatus = ''
        for (let i = 0; i < $scope.evaluateTab.length; i++) {
          $scope.evaluateTab[i].active = false;
        }
        $scope.lineStatus = false
      }
      $scope.judgeTime = function (time, time2) {
        var strTime = time.replace("/-/g", "/");//时间转换
        var strTime2 = time2.replace("/-/g", "/");//时间转换
        var date1 = new Date(strTime);
        var date2 = new Date(strTime2);
        if (date2 - date1 > 7) {
          return false
        } else {
          return true
        }
        // return date1<date2?true:false;
      }
      
      
    }]);
  
  return app;
  
}
