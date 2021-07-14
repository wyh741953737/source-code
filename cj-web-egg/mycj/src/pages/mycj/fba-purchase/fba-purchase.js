export function FBA_purchaseFactory(angular) {
  const app = angular.module('fba-purchase.module', []);

  app.controller('fba-purchase.ctrl', ['$scope', 'dsp',
    function ($scope, dsp) {
      console.log('fba-purchase.ctrl');
      var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
      if (vip == '1') {//vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#F0EDE7');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#f2f3f5');
      }
      $('.header-nav li').eq(0).addClass('active');
      dsp.setRightMinHeight();
      var base64 = new Base64();
      var userId = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('userId'));
      var email = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('email'));
      var phone = base64.decode(localStorage.getItem('userId') == undefined ? "" : localStorage.getItem('phone'));
      $scope.type = 0;
      $scope.SingleResult = [];

      //获取国家列表
      getCountryList();

      function getCountryList() {
        dsp.getFun('app/account/countrylist', function (n) {
          $scope.countrylist = JSON.parse(n.data.result);
          console.log($scope.countrylist);
          // $scope.country = $scope.countrylist[236];
        }, function (n) {
          console.log(n);
        });
      }

      //获取购物车商品
      getCarProducts();

      function getCarProducts() {
        dsp.postFun('app/buyOrder/getShoppingCart', {}, function (data) {
          console.log(data);
          if (data.data.code == 200) {
            if (data.data.shoppingCart) {
              $scope.buylist = data.data.shoppingCart.productList || [];
            } else {
              $scope.buylist = [];
            }
            //$scope.buylist = data.data.shoppingCart.productList || [];
            console.log($scope.buylist);
            var list = $scope.buylist;
            var totalPrice = 0;
            $.each(list, function (i, v) {
              var price = v.SELLPRICE * v.itemcount;
              //console.log(price);
              totalPrice += price;
            });
            $scope.totalPrice = parseFloat(totalPrice.toFixed(2));

            //getWuliuPrice();
          }
        }, function (data) {

        });
      }

      //获取收货地址
      getAddressList();

      function getAddressList() {
        var data = { "data": '{"userId":"' + userId + '"}' };
        dsp.postFun('cj/cjreceiveaddress/getAddress', JSON.stringify(data), function (data) {
          //console.log(data);
          if (data.data.statusCode == '200') {
            var result = data.data.result;
            console.log(result);
            $scope.addressList = result;
          }
        }, function () {
        });
      }

      //新增地址  修改
      $scope.addAddressFun = function () {
        var countrystr = $('#selectCountry').val();
        var city = $('#city').val();
        var province = $('#province').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        if (countrystr == '' || countrystr == null || countrystr == undefined) {
          layer.msg('Please select country');
        } else if (city == '' || city == null || city == undefined) {
          layer.msg('Please fill in the city name');
        } else if (province == null || province == '' || province == undefined) {
          layer.msg('Please fill in the province name');
        } else if (phone == '' || phone == null || phone == undefined) {
          layer.msg('Please fill in the phone number');
        } else if (address == '' || address == null || address == undefined) {
          layer.msg('Please fill in the receiving address');
        } else {
          var country = countrystr.split('#')[0];
          var countryCode = countrystr.split('#')[1];
          var data = {
            "country": country,
            "countrycode": countryCode,
            "city": city,
            "province": province,
            "phone": phone,
            "address": address
          };
          if ($('.defaultIcon').hasClass('act')) {
            data.isDefault = '1';
          } else {
            data.isDefault = '0';
          }
          data.userId = userId;
          var id = $('.addressSaveBtn').attr('data-id');
          if (id == null || id == '' || id == undefined) {
            //新增操作
            //console.log('add');
            console.log(data);
            dsp.load();
            dsp.postFun('cj/cjreceiveaddress/addAddress', JSON.stringify(data), function (data) {
              dsp.closeLoad();
              console.log(data);
              if (data.data.statusCode == '200') {
                layer.msg('Successfully added');
                $('.ad1').hide();
                $('.ad2').show();
                getAddressList();
              }
            }, function () {
              dsp.closeLoad();
            });
          } else {
            //修改
            data.ID = id;
            console.log(data);
            dsp.load();
            dsp.postFun('cj/cjreceiveaddress/updateAddress', JSON.stringify(data), function (data) {
              dsp.closeLoad();
              console.log(data);
              if (data.data.statusCode == '200') {
                layer.msg('Modify successfully');
                $('.ad1').hide();
                $('.ad2').show();
                getAddressList();
              }
            }, function () {
              dsp.closeLoad();
            });
          }

        }
      };

      //删除地址
      $scope.deleteFun = function (id) {
        //console.log(id);
        var data = {
          "ID": id
        };
        layer.confirm('Are you sure you want to delete it？', {
          title: 'Information',
          btn: ['Confirm', 'Cancel']//按钮
        }, function (index) {
          layer.close(index);
          //此处请求后台程序，下方是成功后的前台处理……
          console.log(data);
          dsp.load();
          dsp.postFun('cj/cjreceiveaddress/delAddress', JSON.stringify(data), function (data) {
            dsp.closeLoad();
            if (data.data.statusCode == '200') {
              layer.msg('Successfully delete');
              getAddressList();
            }
          }, function () {
            dsp.closeLoad();
          })
        });
      };

      $scope.ckarr = [];
      //新增仓库
      $scope.addckFun = function () {
        var arr = $scope.ckarr;
        var ckName = '';
        if (arr.length == 0) {
          ckName = 'order-1'
        } else {
          var last = arr[arr.length - 1].name;
          var index = last.split('-')[1];
          var index2 = parseInt(index) + 1;
          ckName = 'order-' + index2;
        }
        var data = {
          "name": ckName,
          "productList": []
        };
        var addr = $scope.addressList;
        $.each(addr, function (i, v) {
          if (v.isDefault == '1') {
            data.warehouse = v
          }
        });
        arr.push(data);
        $scope.ckarr = arr;
        console.log($scope.ckarr);
      };

      //选择商品进入不同的仓库
      $scope.checkFun = function (item) {
        var ele = $('.wrap-right').find('.wr-con.active');
        item.pcount = 1;
        if (ele.length == 0) {
          layer.msg('Please select the address to be entered');
        } else {
          var index = ele.index();
          var productList = $scope.ckarr[index].productList;
          var flag = false;
          $.each(productList, function (i, v) {
            if (v.ID == item.ID) {
              flag = true;
              return;
            }
          });
          if (flag == true) {
            layer.msg('The address already exists for this Product');
          } else {
            var a = {};
            $.extend(true, a, item);
            $scope.ckarr[index].productList.push(a);
            console.log($scope.ckarr);
          }
        }
      };

      //确定拆分
      $scope.saveFun = function () {
        var arr = $scope.ckarr;
        console.log(arr);
        var flag = true;
        $.each(arr, function (i, v) {
          var productList = v.productList;
          if (productList.length == 0) {
            flag = false;
          }
        });
        if (flag) {
          $.each(arr, function (i, v) {
            var target = v;
            var productList = target.productList;
            var totalProductPrice = 0;
            var sendJson = {};
            sendJson.countryCode = target.warehouse.countrycode;
            sendJson.productList = [];
            $.each(productList, function (i, v) {
              var price = parseFloat(v.SELLPRICE) * v.pcount;
              totalProductPrice += price;
              var data = {
                "ID": v.ID,
                "itemcount": v.pcount
              };
              sendJson.productList.push(data);
            });
            sendJson.productList = JSON.stringify(sendJson.productList);
            sendJson = JSON.stringify(sendJson);
            //console.log(sendJson);
            //var priceList = getWuliuPrice(sendJson);
            dsp.postFun('app/buyOrder/getLogisticList', sendJson, function (data) {
              //console.log(data);
              if (data.data.code == 200) {
                //console.log(data.data);
                var priceList = data.data.logisticList;
                //$scope.wuliuway = $scope.wuliulist[3];
                if (priceList.length == 0) {
                  layer.msg('There is no shipping method to this country currently.');
                  // $scope.country = $scope.countrylist[236];
                  // getShipMethods();
                }
                target.wuliuList = priceList;
                target.wuliuPrice = 0;
                target.wuliufs = '';

              } else if (data.data.code == 111) {
                $scope.islogistic = true;
              } else {
                layer.msg('Get shipping methods err. ');
              }
            }, function (n) {
              console.log(n);
            });
            //console.log(priceList);
            target.totalProductPrice = parseFloat(totalProductPrice.toFixed(2));
          });
          console.log(arr);
          $scope.SingleResult = arr;
          $('.zzc1').hide();
        } else {
          layer.msg('The item sent to this address cannot be empty');
        }
      };
      //选择物流
      $('.cjWrap').on('change', '.selectWuliu', function () {
        var target = $(this);
        //console.log(target.val());
        var val = target.val();
        var wp = val.split('#')[1];
        var wf = val.split('#')[0];
        var index = target.parent().parent().parent().index() - 1;
        //console.log(index);
        $scope.SingleResult[index].wuliuPrice = parseFloat(wp);
        $scope.SingleResult[index].wuliufs = wf;
        console.log($scope.SingleResult);
        $scope.$apply();
      });
      //打开拆分
      $scope.openzzc1 = function () {
        $('.zzc1').show();
        $scope.ckarr = [];
      };
      $scope.closezzc1 = function () {
        $('.zzc1').hide();
        $scope.ckarr = [];
      }
      //打开新增地址
      $scope.newAddressFun = function () {
        $('.ad2').hide();
        $('.ad1').show();
        $('.addressSaveBtn').addClass('addAction').removeClass('editAction').attr('data-id', '');
        $('#selectCountry').val('');
        $('#city').val('');
        $('#province').val('');
        $('#phone').val('');
        $('#address').val('');
      };
      $scope.closeAdd = function () {
        $('.ad1').hide();
        $('.ad2').show();
      }
      //进入编辑
      $scope.openEidtFun = function (item) {
        $('.ad2').hide();
        $('.ad1').show();
        var countrystr = item.country + '#' + item.countrycode;
        var city = item.city;
        var province = item.province;
        var phone = item.phone;
        var address = item.address;
        $('#selectCountry').val(countrystr);
        $('#city').val(city);
        $('#province').val(province);
        $('#phone').val(phone);
        $('#address').val(address);
        $('.addressSaveBtn').addClass('editAction').removeClass('addAction').attr('data-id', item.ID);
        if (item.isDefault == '1') {
          $('.defaultIcon').addClass('act');
        } else {
          $('.defaultIcon').removeClass('act');
        }
      }

      //选择仓库
      $('.wrap-right').on('click', '.selectDrapCon', function () {
        var target = $(this);
        var index = target.parent().parent().parent().index();
        $('.zzc2').show().attr('data-id', index);
      });
      $scope.closezzc2 = function () {
        $('.zzc2').hide();
      }
      //收起展开仓库
      $('.wrap-right').on('click', '.shouqi', function (event) {
        event.stopPropagation();
        var target = $(this);
        var next = target.parent().parent().next();
        console.log(next);
        if (target.hasClass('icon-up_circle')) {
          //收起操作
          target.removeClass('icon-up_circle').addClass('icon-down_circle');
          next.hide();
        } else if (target.hasClass('icon-down_circle')) {
          //展开操作
          target.removeClass('icon-down_circle').addClass('icon-up_circle');
          next.show();
        }
      });

      //右侧按钮划入划出
      $('.wrap-left').on('mouseover', '.lp-3>span', function () {
        var target = $(this);
        target.removeClass('icon-right_default').addClass('icon-right_hover');
      })
      $('.wrap-left').on('mouseout', '.lp-3>span', function () {
        var target = $(this);
        target.removeClass('icon-right_hover').addClass('icon-right_default');
      })

      //选择不同仓库
      $('.wrap-right').on('click', '.wr-con', function () {
        var target = $(this);
        //var ele = target.parent();
        target.addClass('active').siblings('.active').removeClass('active');
      });
      //选择仓库
      $('.table-tbody').on('click', '.table-tr', function () {
        var index = $(this).index();
        var adr = $scope.addressList[index];
        var index2 = $('.zzc2').attr('data-id');
        $scope.ckarr[index2].warehouse = adr;
        console.log($scope.ckarr);
        $('.zzc2').hide();
        $scope.$apply();
      });

      //增加数量
      $scope.addCount = function (index1, index2) {
        $scope.ckarr[index1].productList[index2].pcount += 1;
        console.log($scope.ckarr);
      };
      //减少数量
      $scope.subtractCount = function (index1, index2) {
        if ($scope.ckarr[index1].productList[index2].pcount - 1 < 1) {
          layer.msg('The quantity of goods should not be less than one');
        } else {
          $scope.ckarr[index1].productList[index2].pcount -= 1;
        }
      }

      //删除仓库
      $scope.deleteCk = function (index, $event) {
        $event.stopPropagation();
        $scope.ckarr.splice(index, 1);
        //if($scope.ckarr.length>0){
        //    var count=1;
        //    $.each($scope.ckarr,function(i,v){
        //        var name = v.name;
        //        var c = name.split('-')[1];
        //        c = count;
        //        v.name = name.split('-')[0]+'-'+c;
        //        count++;
        //    });
        //}
        var ele = $('.wrap-right').find('.wr-con.active');
        var eleIndex = ele.index();
        if (index < eleIndex) {
          var i = eleIndex - 1;
          $('.wrap-right').find('.wr-con').eq(i).addClass('active').siblings('.active').removeClass('active');
        }
        console.log($scope.ckarr);

      };
      //删除仓库里的商品
      $scope.deletePro = function (index1, index2, $event) {
        $event.stopPropagation();
        console.log(index1, index2);
        $scope.ckarr[index1].productList.splice(index2, 1);
      }

      $('.uploadBtn').on('click', 'span', function () {
        var fileInput = $(this).prev('input[type="file"]');
        fileInput.trigger('click');
      });
      //设置为默认按钮
      $('.defaultIcon').click(function () {
        if ($(this).hasClass('act')) {
          $(this).removeClass('act');
        } else {
          $(this).addClass('act');
        }
      });

      $scope.fileArr = [];
      $scope.fileArr2 = [];
      //上传文件
      $('.uploadBtn input').change(function () {
        var target = $(this);
        var id = target.attr('id');
        console.log(target[0].files);
        var nameArr = [];
        $.each(target[0].files, function (i, v) {
          var name = v.name;
          var nameList = name.split('.');
          var fileName = nameList[nameList.length - 1].toLowerCase();
          if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif' || fileName == 'pdf' || fileName == 'doc' || fileName == 'docx' || fileName == 'txt') {
            nameArr.push(v.name);
          }
        });
        //console.log(nameArr);
        dsp.ossUploadFile(target[0].files, function (data) {
          console.log(data);
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          if (data.code == 2) {
            layer.msg('Images Upload Incomplete');
          }
          var result = data.succssLinks;
          console.log(result);
          //var filArr = [];
          for (var j = 0; j < result.length; j++) {
            var srcList = result[j].split('.');
            var fileName = srcList[srcList.length - 1].toLowerCase();
            console.log(fileName);
            if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg' || fileName == 'gif' || fileName == 'pdf' || fileName == 'doc' || fileName == 'docx' || fileName == 'txt') {
              var link = {
                "href": result[j],
                "name": nameArr[j]
              };
              if (id == 'uploadInputFile1') {
                $scope.fileArr.push(link);
              } else if (id == 'uploadInputFile2') {
                $scope.fileArr2.push(link);
              }

            }
          }
          target.val('');
          // $scope.imgArr = filArr;
          console.log($scope.fileArr);
          $scope.$apply();
        })
      });

      //删除文件
      $('.uploadUl').on('click', 'li>span.deleteBtn', function () {
        var target = $(this);
        var index = target.parent().index();
        var id = target.parent().parent().parent().attr('id');
        console.log(index);
        if (id == 'uploadUl1') {
          $scope.fileArr.splice(index, 1);
        } else if (id == 'uploadUl2') {
          $scope.fileArr2.splice(index, 1);
        }
        $scope.$apply();
        2

      });

      $scope.classWuliu = function (wuliuList) {
        var price = 0;
        if (wuliuList == '' || wuliuList == null || wuliuList == undefined) {
          price = 0;
        } else {
          price = wuliuList.price;
        }
        return price;
      };
      $scope.fixedTwo = function (price) {
        return parseFloat(price.toFixed(2));
      };
      $scope.pathType = '//fba';
      //提交
      $scope.submitFun = function () {
        // 是否验证邮件处理
        if (dsp.isVerifyEmail()) return
        console.log($scope.SingleResult);
        var arr = [];
        var flag = false;
        let sendData = {
          "product": [],
          "amazonFile": [],
          "type": '1'
        }

        $.each($scope.SingleResult, function (i, v) {
          var productList = v.productList;
          $.each(productList, function (i, v) {
            v.itemcount = v.pcount;
          });
          if (v.wuliufs == '') {
            flag = true;
          }
          var data = {
            "productList": JSON.stringify(productList),
            "totalPrice": '' + v.totalProductPrice,
            "logisticName": v.wuliufs,
            "addressId": v.warehouse.ID
          };
          arr.push(data);
        });

        sendData.product = arr
        if ($scope.fileArr.length > 0) {
          sendData.amazonFile.push({
            val: 'fileArr',
            filArr: $scope.fileArr
          })
        }
        if ($scope.fileArr2.length > 0) {
          sendData.amazonFile.push({
            val: 'fileArr2',
            filArr: $scope.fileArr2
          })
        }

        if (flag) {
          layer.msg('Please select logistics');
        } else {
          console.log(sendData);
          console.log(JSON.stringify(sendData));//app/buyOrder/createOrder
          dsp.load();
          dsp.postFun('app/buyOrder/createOrder', JSON.stringify(sendData), function (data) {
            dsp.closeLoad();
            console.log(data);
            if (data.data.code == '200') {
              console.log(data.data);
              //location.href='myCJ.html#/myCJ-FBA';
              layer.msg('submit successfully', { shift: -1, time: 1000 }, function () {
                location.href = 'myCJ.html?route=payment#/payment/' + base64.encode(data.data.orderId) + '/' + base64.encode(data.data.price + '') + $scope.pathType;
              });
            } else if (data.data.code == '1001') {
              layer.msg('The order cannot be delivered by DHL');
            } else {
              layer.msg('Submit failed');
            }
          }, function () {
            dsp.closeLoad();
          });
        }
      }
    }]);

  return app;
}
