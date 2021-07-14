(function(angular) {

    angular.module('cjCompnentModule')
        .component('workOrders', {
            templateUrl: 'static/components/work_orders/workOrders.html',
            controller: workOrdersCtrl,
            bindings: {
                vinfo: '=',
                onLog: '&',
                showWorkOrder: '&'
            }
        });

    function workOrdersCtrl($scope, dsp) {
        // console.log(dsp.getQueryString())
        // $scope.text = '';
        // var ctrl = this;

        $scope.onLog = function() {
            ctrl.onLog({ text: $scope.text });
        }

        $('.promptImg').hover(function(){
            var n = $(this).next('.notice-1');
            n.show();
        },function(){
            var n = $(this).next('.notice-1');
            n.hide();
        });
        // $scope.ticket = function() {
        // var marginL = -$('.hnj-SupportCenterWrap').width() / 2;
        // $('.hnj-SupportCenterWrap').stop().animate({
        //     left: '50%',
        //     marginLeft: marginL
        // }, 500);

        // $scope.inputStr = $('#inputstr').val();
        // Support Center 划出Ticket
        $scope.ticket = function() {
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


                setTimeout(function() {

                    $scope.listViewTicket = function() {
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
                        $scope.replyFun = function() {
                            $scope.newimgArr = $scope.imgArr.toString();
                            console.log($scope.newimgArr)

                            $scope.kreplyMessage = $('#kmessage').val();
                            if ($scope.kreplyMessage) {
                                dsp.postFun('pojo/issue/cjReply', { "id": $scope.hideID, "message": $scope.kreplyMessage, "attachment": $scope.newimgArr }, con, err)

                                function con(res) {
                                    console.log(res.data.result);
                                    if (res.data.statusCode == 200) {
                                        layer.msg('Replied Successfully!');
                                        setTimeout(function() {
                                            $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                                            $scope.ticket();
                                        }, 500);
                                        $('#kmessage').val('');
                                        $scope.imgArr = []; //清空要发送的图片
                                    } else {
                                        layer.msg('Server error!');
                                    }


                                };

                                function err(res) {

                                }
                            } else {
                                $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
                                $scope.replyTip = true;
                                $scope.otherTip = false;
                                $scope.closeWord = '';
                                $scope.replyTipFun = function() {
                                    $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                                }
                            }

                        }
                        // 取消工单
                        $scope.cancelFun = function() {
                            var str = 'close';
                            $scope.closeWord = str;
                            $scope.replyTip = false;
                            $scope.otherTip = true;
                            $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
                        }
                        $scope.cancelYesFun = function() {
                            dsp.getFun('pojo/issue/cancel?id=' + $scope.hideID, con, err)

                            function con(res) {
                                console.log(res);
                                $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                                $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                                $scope.ticket();
                            };

                            function err(res) {

                            }
                        }
                        $scope.cancelNoFun = function() {
                            $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                        }
                        // 完成工单
                        $scope.endFun = function() {
                            // $scope.closeWord=complete;
                            var str = 'Finished';
                            $scope.closeWord = str;
                            $scope.replyTip = false;
                            $scope.otherTip = true;
                            $('.hnj-detail .hnj-tankuang').css({ 'display': 'block' });
                        }
                        $scope.endYesFun = function() {
                            dsp.getFun('pojo/issue/complete?id=' + $scope.hideID, con, err)

                            function con(res) {
                                console.log(res);
                                $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
                                $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                                $scope.ticket();
                            };

                            function err(res) {

                            }
                        }
                        $scope.endNoFun = function() {
                            $('.hnj-detail .hnj-tankuang').css({ 'display': 'none' });
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
        // console.log('工单组件', dsp.isInLoginState());
        if (dsp.isInLoginState()) {
            $scope.ticket();
        }
        
        // 关闭ticket    
        $scope.closeTicket = function() {
            $('.hnj-SupportCenterWrap-wrap').stop().animate({
                left: '110%',
                marginLeft: 0
            }, 100)
        }
        // 列表搜索
        $scope.listSearch = function() {
            // $scope.ticket();
            $scope.inputStr = $('#inputstr').val();
            dsp.postFun('pojo/issue/getIssueCj', { "inputStr": $scope.inputStr }, con, err)

            function con(res) {
                console.log(res);
                console.log(res.data.statusCode);
                var obj = JSON.parse(res.data.result);
                console.log(obj);

                // $scope.noDataBox=obj[0].totle=='0';
                if (obj[0].totle == '0') {
                    // $scope.noDataBox=true;
                    // $scope.noDataImg=true;
                    $scope.subticketImg = false;
                    $scope.listArr = [];
                    layer.msg('Sorry, No Data Found!');
                } else {
                    var listArr = obj[0].issues;
                    $scope.listArr = listArr;
                }
                // $scope.subticketImg=true;


                console.log($scope.listArr);
            };

            function err() {

            }

        }
        // 控制support center划出内容
        $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();

        $scope.listShow = function() {
            $scope.imgArr = []; //清空要上传的图片
            $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
        }
        $scope.typeShow = function() {

            $('.hnj-SupportCenterWrap > ul > li').eq(1).show().siblings('li').hide();

        }
        $scope.submitShow = function() {
            $('.hnj-SupportCenterWrap > ul > li').eq(2).show().siblings('li').hide();
            // var b = document.getElementsByClassName('nn').scrollIntoView(true);
            // b.scrollIntoView(true);
        }
        $scope.detailShow = function() {
            $('.hnj-SupportCenterWrap > ul > li').eq(3).show().siblings('li').hide();
            console.log($scope.hideID);
            dsp.getFun('pojo/issue/getIssueMessageCj?id=' + $scope.hideID, con, err)

            function con(res) {
                var obj = JSON.parse(res.data.result);
                $scope.detailMessage = obj[0].MESSAGE;
                console.log(obj);
            };

            function err(res) {

            }
        }

        $scope.typeClick1 = function() {
            $scope.submitShow();
            $scope.selected = 'App Issue';
        }
        $scope.typeClick2 = function() {
            $scope.submitShow();
            $scope.selected = 'Order Issue';
        }
        $scope.typeClick3 = function() {
            $scope.submitShow();
            $scope.selected = 'Payment Issue';
        }
        $scope.typeClick4 = function() {
            $scope.submitShow();
            $scope.selected = 'Products Issue';
        }

        // submit form 上传图片 
        $scope.imgArr = [];
        $scope.imgArrType = [];
        $scope.upLoadImg4 = function(files) {
            dsp.ossUploadFile(files, function (data) {
                // console.log(data);
                if (data.code==0) {
                    layer.msg('Images Upload Failed');
                    return;
                }
                if (data.code==2) {
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
                    if(srcList[srcList.length - 1] =='png' || srcList[srcList.length - 1] =='jpg' || srcList[srcList.length - 1]=='jpeg' || srcList[srcList.length - 1]=='gif'){
                        $scope.imgArr.push(obj[j]);
                        if ($scope.imgArr.length > 10) {
                            $scope.imgArr.slice(10);
                            setTimeout(function() {
                                $('.img > ul > li').slice(10).hide();
                            }, 300);
                            $scope.submitTipMessage = 'You can only upload up to 10 images.';
                            $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                            $scope.okFun = function() {
                                $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                            }
                            $scope.df = function($event) {
                                $event.preventDefault();
                            }
                        }
                    }else{
                        $('.gderr-loadsrc').show(); //判断如果不是图片的弹框  显示
                        $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                        $scope.submitTipMessage = 'Please upload the correct format.';
                        $scope.okFun = function() {
                            $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                        }
                    }
                    //for (var k = 0; k < $scope.imgArrType.length; k++) { //判断格式
                    //    if ($scope.imgArrType[k] == 'png' || $scope.imgArrType[k] == 'jpg' || $scope.imgArrType[k] == 'jpeg' || $scope.imgArrType[k] == 'gif') {
                    //        // $scope.imgArr.push('https://'+obj[j]);
                    //        if ($scope.imgArr.length > 10) {
                    //            $scope.imgArr.slice(10);
                    //            setTimeout(function() {
                    //                $('.img > ul > li').slice(10).hide();
                    //
                    //            }, 300);
                    //            $scope.submitTipMessage = 'You can only upload up to 10 images.';
                    //            $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                    //            $scope.okFun = function() {
                    //                $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                    //            }
                    //            $scope.df = function($event) {
                    //                $event.preventDefault();
                    //            }
                    //        }
                    //    } else {
                    //        //console.log($scope.imgArr);
                    //        $scope.imgArr.splice(k,1);
                    //        $scope.imgArrType.splice(k,1);
                    //        // layer.msg('Incorrect File Extension')
                    //        $('.gderr-loadsrc').show(); //判断如果不是图片的弹框  显示
                    //        $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                    //        $scope.submitTipMessage = 'Please upload the correct format.';
                    //        $scope.okFun = function() {
                    //            $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                    //        }
                    //    }
                    //}

                }
                $scope.$apply();
                // console.log($scope.imgArr);
            })
            return;
        }
        $('.gderr-btn').click(function() {
            $('.gderr-loadsrc').hide(); //判断如果不是图片的弹框  隐藏
        })
        // 图片预览和删除
        $scope.dpreviewImg = function($event) {
            // var imgPT=($('.img-preview-wrap').height()-$('.img-preview-wrap img').height())/2
            var previewSrc = $($event.target).attr('src');
            console.log(previewSrc);
            $('.img-preview-wrap').css({ 'display': 'block' });
            $('.img-preview-wrap img').css({ 'marginTop': '10%' });
            $scope.previewSrc = previewSrc;

            $scope.previewWrapFun = function() {
                $('.img-preview-wrap').css({ 'display': 'none' });
            }
        }

        $scope.previewImg = function($event) {
            // var imgPT=($('.img-preview-wrap').height()-$('.img-preview-wrap img').height())/2
            var previewSrc = $($event.target).parent().parent().children('img').attr('src');
            console.log(previewSrc);
            $('.img-preview-wrap').css({ 'display': 'block' });
            $('.img-preview-wrap img').css({ 'marginTop': '10%' });
            $scope.previewSrc = previewSrc;

            $scope.previewWrapFun = function() {
                $('.img-preview-wrap').css({ 'display': 'none' });
            }
        }

        $scope.deleteImg = function(idx) {
            $scope.imgArr.splice(idx, 1);
        }

        // 提交 submit form 表单

        $scope.subjectBlur = function() {
            $scope.subject = $('#subject').val();
            if ($scope.subject == '') {
                $scope.stipShow = true;
                $scope.subjectTip = 'Please input some information.';
            } else {
                $scope.stipShow = false;
            }
        }
        $scope.messageBlur = function() {
            $scope.message = $('#message').val();
            if ($scope.message == '') {
                $scope.mtipShow = true;
                $scope.messageTip = 'Please input some information.';
            } else {
                $scope.mtipShow = false;
            }
        }

        //清空数据
        $scope.emptyFormData = function() {
            $scope.subject = $('#subject').val('');
            $scope.message = $('#message').val('');
            $scope.type = $('#type').val('');
            $('.img > ul > li').slice(10).hide();
            $scope.imgArr.splice(0, $scope.imgArr.length);

        }
        $scope.subform = function() {
            $scope.subject = $('#subject').val();
            $scope.message = $('#message').val();
            // $scope.type=$('#type').val();
            if ($scope.subject == '' || $scope.message == '') {
                // alert('Please input some information.');
                $('.hnj-form .hnj-tankuang').css({ 'display': 'block' });
                $scope.submitTipMessage = 'Please input some information.';
                $scope.okFun = function() {
                    $('.hnj-form .hnj-tankuang').css({ 'display': 'none' });
                }
            } else {
                console.log($scope.imgArr);
                console.log($scope.selected);
                $scope.newimgArr = $scope.imgArr.toString();
                dsp.postFun('pojo/issue/add', { "subject": $scope.subject, "message": $scope.message, "type": $scope.selected, "attachment": $scope.newimgArr }, con, err)

                function con(res) {
                    console.log(res);
                    console.log(res.data.statusCode);
                    if (res.data.statusCode == 200) {
                        layer.msg('Submit Successfully!');
                        setTimeout(function() {
                            $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                            $scope.ticket();
                        }, 500);
                        $scope.emptyFormData();
                    } else {
                        layer.msg('Server error!');
                        $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
                    }


                };

                function err(res) {

                }
            }
        }
        $scope.cancel = function() {
            $('.hnj-SupportCenterWrap > ul > li').eq(0).show().siblings('li').hide();
            $scope.ticket();
        }

    }

})(angular);