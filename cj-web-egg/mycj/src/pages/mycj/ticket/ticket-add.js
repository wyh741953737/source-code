export function ticketAddFactory(angular) {
  const app = angular.module('ticket-add.module', []);

  app.controller('ticket-add.ctrl', ['$scope', 'dsp',
    function ($scope, dsp, ) {
      console.log('ticket-add.ctrl')

      // back
      $scope.toBack = function () {
        location.href = '/myCJ.html#/ticketList'
      }

      // 类型列表
      $scope.selected = "Products Issue"
      $scope.typeList = [
        { name: 'App Issue', val: 'App', checked: 'true' },
        { name: 'Order Issue', val: 'Order', checked: 'false' },
        { name: 'Payment Issue', val: 'Payment', checked: 'false' },
        { name: 'Product Issue', val: 'Products', checked: 'false' },
      ]
      $scope.checkedVal = function (e) {
        console.log(e.target)
        $scope.selected = e.target.value;

        for (let i = 0; i < $scope.typeList.length; i++) {
          $scope.typeList[i].checked = false
        }
        e.target.checked = 'true'
        console.log($scope.selected)
      }
      // submit form 上传图片 
      $scope.imgArr = [];
      $scope.imgArrType = [];
      $scope.upLoadImg4 = function (files) {
        const isUpload = true
        const filesdata = Array.from(files)
        filesdata.forEach(item => {
          if (item.size > 2097152) {
            // 图片限制2M
            layer.msg('The image size should be within 2M.')
            isUpload = false
          }
        });
        if (!isUpload) {
          return
        }
        if (($scope.imgArr.length + filesdata.length) > 10) {
          layer.msg('You can upload 10 images at most.')
          return
        }
        dsp.ossUploadFile(files, function (data) {
          console.log(data);
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          if (data.code == 2) {
            layer.msg('Images Upload Incomplete');
          }
          $("#workorder-file").val('');
          var obj = data.succssLinks;
          for (var j = 0; j < obj.length; j++) {
            // $scope.imgArr.push('https://'+obj[j]);
            var srcList = obj[j].split('.');
            //$scope.imgArrType.push(srcList[srcList.length - 1]);
            //$scope.imgArr.push(obj[j]);
            console.log($scope.imgArr)
            //  if(srcList[srcList.length - 1] =='png' || srcList[srcList.length - 1] =='jpg' || srcList[srcList.length - 1]=='jpeg' || srcList[srcList.length - 1]=='gif'){
            if (srcList[srcList.length - 1].toUpperCase() == 'PNG' || srcList[srcList.length - 1].toUpperCase() == 'JPG' || srcList[srcList.length - 1].toUpperCase() == 'JPEG') {
              $scope.imgArr.push(obj[j]);
              if ($scope.imgArr.length > 10) {
                $scope.imgArr.slice(10);
                setTimeout(function () {
                  $('.img > ul > li').slice(10).hide();
                }, 300);
                $scope.submitTipMessage = 'You can only upload up to 10 images.';
                $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                $scope.okFun = function () {
                  $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                }
                $scope.df = function ($event) {
                  $event.preventDefault();
                }
              }
            } else {
              layer.msg('Invalid format.');
              $('.gderr-loadsrc').show(); //判断如果不是图片的弹框  显示
              $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
              $scope.submitTipMessage = 'Please upload the correct format.';
              $scope.okFun = function () {
                $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
              }
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
  
      // 图片预览和删除
      $scope.dpreviewImg = function ($event) {
        // var imgPT=($('.img-preview-wrap').height()-$('.img-preview-wrap img').height())/2
        var previewSrc = $($event.target).attr('src');
        console.log(previewSrc);
        $('.img-preview-wrap').css({ 'display': 'block' });
        // $('.img-preview-wrap img').css({ 'marginTop': '10%' });
        $scope.previewSrc = previewSrc;

        $scope.previewWrapFun = function () {
          $('.img-preview-wrap').css({ 'display': 'none' });
        }
      }

      $scope.deleteImg = function (idx) {
        $scope.imgArr.splice(idx, 1);
        console.log($scope.imgArr)
      }


      $scope.ticket = function () {
        // var marginL = -$('.hnj-SupportCenterWrap').width() / 2;
        // $('.hnj-SupportCenterWrap').stop().animate({
        //     left: '50%',
        //     marginLeft: marginL
        // }, 500);

        $scope.inputStr = $('#inputstr').val();
        // 列表数据
        dsp.postFun('pojo/issue/getIssueCj', { "inputStr": $scope.inputStr }, con, err)

        function con(res) {
          // console.log(res);
          // console.log(res.data.statusCode);
          var obj = JSON.parse(res.data.result);
          //  console.log(obj);

          $scope.noDataBox = obj[0].totle == '0';
          $scope.subticketImg = obj[0].totle == '0';
          // $scope.subticketImg=true;

          var listArr = obj[0].issues;
          $scope.listArr = listArr;
          // console.log($scope.listArr);

          // 若为取消状态 字体变灰
          // console.log('')


          setTimeout(function () {

            $scope.listViewTicket = function () {
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
                    $scope.ywyName = $scope.detailData[i].OPERATOREN.slice(0, 1).toUpperCase();
                  }
                  if ($scope.detailData[i].ATTACHMENT) {
                    $scope.detailData[i].ATTACHMENT = $scope.detailData[i].ATTACHMENT.split(',');
                  }
                }

              };

              function err(res) {

              }

              $scope.replyUlHide = $scope.nowStatus == '0' || $scope.nowStatus == '3' || $scope.nowStatus == '5';
              $scope.replyBtnShow = $scope.nowStatus == '2' || $scope.nowStatus == '1';
              $scope.CancelBtnShow = $scope.nowStatus == '1' || $scope.nowStatus == '2' || $scope.nowStatus == '4';
              $scope.EndBtnShow = $scope.nowStatus == '1' || $scope.nowStatus == '2';
              // $scope.addmessageShow=$scope.nowStatus=='1'

              // 客户回复
              $scope.replyFun = function () {
                $scope.newimgArr = $scope.imgArr.toString();
                console.log($scope.newimgArr)

                $scope.kreplyMessage = $('#kmessage').val();
                if ($scope.kreplyMessage) {
                  dsp.postFun('pojo/issue/cjReply', { "id": $scope.hideID, "message": $scope.kreplyMessage, "attachment": $scope.newimgArr }, con, err)

                  function con(res) {
                    console.log(res.data.result);
                    if (res.data.statusCode == 200) {
                      $scope.isDetail = false
                      layer.msg('Replied Successfully!');
                      setTimeout(function () {
                        $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                        $scope.ticket();
                      }, 500);
                      $('#kmessage').val('');
                      $scope.imgArr = []; //清空要发送的图片
                      $('#documentupload2').val('')
                    } else {
                      layer.msg('Server error!');
                    }


                  };

                  function err(res) {

                  }
                } else {
                  // $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
                  $scope.replyTip = true;
                  $scope.otherTip = false;
                  $scope.closeWord = '';
                  layer.msg("Please enter the message.")
                  $scope.replyTipFun = function () {
                    $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
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
                  $scope.ticket();
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
                $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
              }
              $scope.endYesFun = function () {
                dsp.getFun('pojo/issue/complete?id=' + $scope.hideID, con, err)

                function con(res) {
                  console.log(res);
                  $scope.isDetail = false
                  $scope.isClose = false
                  $('#documentupload2').val('')
                  // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                  // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                  $scope.ticket();
                };

                function err(res) {

                }
              }
              $scope.endNoFun = function () {
                // $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                $scope.isClose = false
              }


            }

          }, 1000)
        };

        function err(res) {
          $scope.noDataBox = true;
          $scope.noDataImg = true;
          // $scope.noDataImg=false;
          // $scope.subticketImg=true;
        }
      }

      //清空数据
      $scope.emptyFormData = function () {
        $scope.subject = $('#subject').val('');
        $scope.message = $('#message').val('');
        $scope.type = $('#type').val('');
        // $('.img > ul > li').slice(10).hide();
        $scope.imgArr.splice(0, $scope.imgArr.length);

      }
      $scope.subform = function () {
        $scope.subject = $('#subject').val();
        $scope.message = $('#message').val();
        // $scope.type=$('#type').val();
        if ($scope.subject == '') {
          layer.msg("Please enter the subject.");
        } else if($scope.message == '') {
          layer.msg("Please write your message.")
        } else {
          console.log($scope.imgArr);
          console.log($scope.selected);
          $scope.newimgArr = $scope.imgArr.toString();
          layer.load();
          dsp.postFun('pojo/issue/add', { "subject": $scope.subject, "message": $scope.message, "type": $scope.selected, "attachment": $scope.newimgArr }, con, err)

          function con(res) {
            console.log(res);
            console.log(res.data.statusCode);
            layer.closeAll("loading");
            if (res.data.statusCode == 200) {
              layer.msg('Submitted Successfully');
              setTimeout(function () {
                // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                $scope.toBack()
                $scope.ticket();
              }, 500);
              $scope.emptyFormData();
            } else {
              layer.msg('Server error!');
              // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
            }


          };

          function err(res) {
            debugger
            layer.closeAll("loading");
          }
        }
      }
      $scope.cancel = function () {
        // $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
        $scope.emptyFormData()
        $scope.ticket();
      }

      // 提交 submit form 表单
      $scope.subjectBlur = function () {
        $scope.subject = $('#subject').val();
        if ($scope.subject == '') {
          $scope.stipShow = true;
          $scope.subjectTip = 'Please enter the message.';
        } else {
          $scope.stipShow = false;
        }
      }
      $scope.messageBlur = function () {
        $scope.message = $('#message').val();
        if ($scope.message == '') {
          $scope.mtipShow = true;
          $scope.messageTip = 'Please enter the message.';
        } else {
          $scope.mtipShow = false;
        }
      }
    }]);

  return app;

}