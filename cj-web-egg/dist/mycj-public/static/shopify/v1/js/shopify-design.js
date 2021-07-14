var app = angular.module('app', ['service']);

// 注意：书签删除

// 判断是否手机端
function isPhone() {
  var isphone = false;
  var sUserAgent = navigator.userAgent;
  if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
    isphone = true;
  }
  return isphone;
}

// window.addEventListener('message', function (event) {
//   console.log('mes')
// })

app.controller('shpifyDesign', function ($scope, $window, dsp) {

  var href = window.location.href;
  // var windowWidth = window.screen.width;
  // var windowHeight = window.screen.height;
  var windowWidth;
  var windowHeight;
  if (href.indexOf('?fwidth=') != -1){
    windowWidth = href.split('?')[1].split('&')[0].replace('fwidth=','') * 1;
    windowHeight = href.split('?')[1].split('&')[1].replace('fheight=', '') * 1;
  }

  $scope.phone = isPhone();

  // console.log(data);         //子级能得到值 
  // '8349CBA2-BD4A-4626-851D-9E63195D67C9' //定制文字 
  // '3B7CBB9C-71F2-4F46-A7D6-98EE02DC5C7D' // 定制图片
  $scope.printProFlag = true;

  function postFun(url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    // 添加http头，发送信息至服务器时内容编码类型
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, xhr.responseText);
      }
    };
    xhr.send(data);
  }

  // var currentMerch;
  //   dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({
  //     // item.id
  //     id: '8349CBA2-BD4A-4626-851D-9E63195D67C9',
  //     token: ''
  //   }), function (data) {
  //     // currentMerch = JSON.parse(data.data.result);
  //     currentMerch = data.data.result;
  //     console.log(currentMerch);
  // $scope.printItemName = currentMerch.NAMEEN;

  // getTheVitem();
  var customMessage;
  var mobanWidth = 400;
  var mobanHeight = 400;
  $window.addEventListener('message', function (event) {
    var flag = event.data.flag;
    // alert(flag)
    if (flag == 'gotdata') {
      customMessage = event.data.data;
      $scope.language = event.data.data.language;
      $scope.printItemName = customMessage.title;
      // var customMessage = currentMerch.customMessage;
      // var customMessage = JSON.stringify(temObj);
      // 删除
      if (customMessage) {
        // $scope.podProduct = true;
        // customMessage = JSON.parse(customMessage);
        // $scope.customMessage = customMessage;
        // console.log('customMessage', customMessage);
        $scope.podColor = customMessage.color;
        console.log($scope.customMessage)
        // $scope.canvasImgSrc = $scope.stanProducts[0].IMG;
        if (!$scope.podColor) {
          colorSubmit = [];
          colorSubmit.push({
            value: 'asjdefault',
            nameEn: 'asjdefault'
          });
        } else {
          // colorSubmit = $scope.podColor.colors;
          canvasBasicColor = $scope.podColor.basic;
          canvasChanColor = $scope.podColor.colors[0].value;
          $scope.podColorVal = $scope.podColor.colors[0];
          // window.parent.postMessage({
          //   flag: 'freshColorFromCJ',
          //   data: $scope.podColorVal.value
          // }, "*");
        }
        $scope.podZone = customMessage.zone;
      }
      $scope.currentImg = $scope.podZone.front.showimgurl;
      $scope.frontShowImgSrc = $scope.podZone.front.showimgurl;
      document.querySelector('#front_img_ori').src = $scope.frontShowImgSrc;
      // alert($scope.frontShowImgSrc)
      touchEvent(document.getElementById('mark'));
      if ($scope.podZone.back) {
        $scope.currentImgBack = $scope.podZone.back.showimgurl;
        $scope.backShowImgSrc = $scope.podZone.back.showimgurl;
        touchEventBack(document.getElementById('mark-back'));
      }

      $scope.frontPodType = $scope.podZone.front.podtype;

      if ($scope.backShowImgSrc) {
        $scope.editBack = true;
        $scope.backPodType = $scope.podZone.back.podtype;
      }
      // 获取宽高之后，绘制原始canvas
      getWidthAndHeight(function () {
        if ($scope.podZone.front.showimgurl) {
          layer.load(2,{
            shade: 0
          });
          getPixels2(1, function () {
            getPosiInfo(1, function () {
              layer.closeAll('loading');
              drawFront();
              $scope.gotFrontData = 1;
              $scope.$apply();
              if ($scope.editBack) {
                if ($scope.backShowImgSrc) {
                  layer.load(2, {
                    shade: 0
                  });
                  getPixels2(0, function () {
                    getPosiInfo(0, function () {
                      layer.closeAll('loading');
                      drawBack();
                      $scope.gotBackData = 1;
                      $scope.$apply();
                      // layer.closeAll('loading');
                    });
                  });
                }
                // else {
                //   getPosiInfo(0, function () {
                //     drawBack();
                //     // layer.closeAll('loading');
                //   });
                // }
              }
            });
          })
        }
      })
    }
  })

  // var mobanWidth = 400;
  // var mobanHeight = 400;

  // $scope.printItemName = 'Men’s Cotton Crew Tee';
  $scope.saveProName = function (event) {
    if (event.keyCode == 13) {
      $scope.editProName = false;
    }
  }
  // 切换pod颜色
  $scope.chanPodColor = function () {
    canvasChanColor = $scope.podColorVal.value;
    // changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor));
    // changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor));
    // if (temImg) {
    //   koutu(imgDataResultFront, emptyIndexArrFront);
    // }
    drawFront();
    if ($scope.editBack) {
      drawBack();
    }
    // window.parent.postMessage({
    //   flag: 'freshColorFromCJ',
    //   data: $scope.podColorVal.value
    // }, "*");
  }
  function hexToRGB(hex) {
    var long = parseInt(hex.replace(/^#/, ""), 16);
    return {
      R: (long >>> 16) & 0xff,
      G: (long >>> 8) & 0xff,
      B: long & 0xff
    };
  }

  var imgDataResultBack, imgDataResultFront;
  function changeColor(oricolor, newColor, flag) {
    // console.log(oricolor, newColor)
    var rgba = [];
    for (var k in oricolor) {
      rgba.push(oricolor[k]);
    }
    // 像素点色值
    // var rgba = rgbaPicker;
    // 容差大小
    var tolerance = $scope.podColor.range * 1;
    // console.log(tolerance)
    // var tolerance = eleTolerance.value;

    // var newColor = hexToRGB(eleNewColor.value);
    // console.log(newColor);
    var newColorArr = [];
    for (var k in newColor) {
      newColorArr.push(newColor[k]);
    }
    // console.log(newColorArr);
    if (flag) {
      var canvasTem = document.createElement("canvas")
      var cxtTem = canvasTem.getContext("2d")
      canvasTem.width = mobanWidth;
      canvasTem.height = mobanHeight;
      actFrontChange = 1;
      for (var index = 0; index < imgDataOri.data.length; index += 4) {
        var r = imgDataOri.data[index];
        var g = imgDataOri.data[index + 1];
        var b = imgDataOri.data[index + 2];

        if (Math.sqrt(
          (r - rgba[0]) * (r - rgba[0]) +
          (g - rgba[1]) * (g - rgba[1]) +
          (b - rgba[2]) * (b - rgba[2])) <= tolerance
        ) {
          imgDataResultFront.data[index] = (newColorArr[0] + r - rgba[0]);
          imgDataResultFront.data[index + 1] = (newColorArr[1] + g - rgba[1]);
          imgDataResultFront.data[index + 2] = (newColorArr[2] + b - rgba[2]);
          imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];
          imgDataResultFrontKou.data[index] = (newColorArr[0] + r - rgba[0]);
          imgDataResultFrontKou.data[index + 1] = (newColorArr[1] + g - rgba[1]);
          imgDataResultFrontKou.data[index + 2] = (newColorArr[2] + b - rgba[2]);
          imgDataResultFrontKou.data[index + 3] = imgDataOri.data[index + 3];
        } else {
          imgDataResultFront.data[index] = r;
          imgDataResultFront.data[index + 1] = g;
          imgDataResultFront.data[index + 2] = b;
          imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];

          imgDataResultFrontKou.data[index] = r;
          imgDataResultFrontKou.data[index + 1] = g;
          imgDataResultFrontKou.data[index + 2] = b;
          imgDataResultFrontKou.data[index + 3] = imgDataOri.data[index + 3];
        }
      }
      // put数据
      // console.log(imgDataResultFront)
      // contextResultFront.clearRect(0, 0,534,534);
      // contextResultFront.putImageData(imgDataResultFront, 0, 0);
      cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
      cxtTem.putImageData(imgDataResultFront, 0, 0, 0, 0, mobanWidth, mobanHeight);
      $scope.currentImgB64 = canvasTem.toDataURL("image/png");
      // return imgDataResultFront;
    } else {
      var canvasTem = document.createElement("canvas")
      var cxtTem = canvasTem.getContext("2d")
      canvasTem.width = mobanWidth;
      canvasTem.height = mobanHeight;
      actBackChange = 1;
      for (var index = 0; index < imgDataOriBack.data.length; index += 4) {
        var r = imgDataOriBack.data[index];
        var g = imgDataOriBack.data[index + 1];
        var b = imgDataOriBack.data[index + 2];

        if (Math.sqrt(
          (r - rgba[0]) * (r - rgba[0]) +
          (g - rgba[1]) * (g - rgba[1]) +
          (b - rgba[2]) * (b - rgba[2])) <= tolerance
        ) {
          imgDataResultBack.data[index] = (newColorArr[0] + r - rgba[0]);
          imgDataResultBack.data[index + 1] = (newColorArr[1] + g - rgba[1]);
          imgDataResultBack.data[index + 2] = (newColorArr[2] + b - rgba[2]);
          imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];

          imgDataResultBackKou.data[index] = (newColorArr[0] + r - rgba[0]);
          imgDataResultBackKou.data[index + 1] = (newColorArr[1] + g - rgba[1]);
          imgDataResultBackKou.data[index + 2] = (newColorArr[2] + b - rgba[2]);
          imgDataResultBackKou.data[index + 3] = imgDataOriBack.data[index + 3];
        } else {
          imgDataResultBack.data[index] = r;
          imgDataResultBack.data[index + 1] = g;
          imgDataResultBack.data[index + 2] = b;
          imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];

          imgDataResultBackKou.data[index] = r;
          imgDataResultBackKou.data[index + 1] = g;
          imgDataResultBackKou.data[index + 2] = b;
          imgDataResultBackKou.data[index + 3] = imgDataOriBack.data[index + 3];
        }
      }
      // put数据
      // contextResultBack.putImageData(imgDataResultBack, 0, 0);
      // return imgDataResultBack;
      cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
      cxtTem.putImageData(imgDataResultBack, 0, 0, 0, 0, mobanWidth, mobanHeight);
      $scope.currentImgB64Back = canvasTem.toDataURL("image/png");
    }

  }
  var canvasTem = document.createElement("canvas")
  var cxtTem = canvasTem.getContext("2d")
  function koutu(kouTuXs, emptyIndexArr) {
    var kouTuXs = imgDataResultFrontKou;
    canvasTem.width = mobanWidth;
    canvasTem.height = mobanHeight;
    if (emptyIndexArr.length > 0) {
      for (var i = 0; i < emptyIndexArr.length; i++) {
        kouTuXs.data[emptyIndexArr[i]] = 0;
        kouTuXs.data[emptyIndexArr[i] + 1] = 0;
        kouTuXs.data[emptyIndexArr[i] + 2] = 0;
        kouTuXs.data[emptyIndexArr[i] + 3] = 0;
      }
    }
    // return kouTuXs;
    cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
    cxtTem.putImageData(kouTuXs, 0, 0, 0, 0, mobanWidth, mobanHeight);
    $scope.currentImgB64 = canvasTem.toDataURL("image/png");
  }
  function koutuBack(kouTuXs, emptyIndexArr) {
    var kouTuXs = imgDataResultBackKou;
    canvasTem.width = mobanWidth;
    canvasTem.height = mobanHeight;
    if (emptyIndexArr.length > 0) {
      for (var i = 0; i < emptyIndexArr.length; i++) {
        kouTuXs.data[emptyIndexArr[i]] = 0;
        kouTuXs.data[emptyIndexArr[i] + 1] = 0;
        kouTuXs.data[emptyIndexArr[i] + 2] = 0;
        kouTuXs.data[emptyIndexArr[i] + 3] = 0;
      }
    }
    // return kouTuXs;
    cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
    cxtTem.putImageData(kouTuXs, 0, 0, 0, 0, mobanWidth, mobanHeight);
    $scope.currentImgB64Back = canvasTem.toDataURL("image/png");
  }

  var widthBiaozhun;
  // alert(windowWidth)
  if ($scope.phone) {
    widthBiaozhun = windowWidth;
  } else {
    widthBiaozhun = 500;
  }

  function getWidthAndHeight(callback) {
    var getWHtimer;
    clearInterval(getWHtimer);
    var i = 0;
    getWHtimer = setInterval(() => {
      var width = document.querySelector('#front_img_ori').width;
      var height = document.querySelector('#front_img_ori').height;
      if (width * 1 > 0 && height * 1 > 0) {
        if (width / height > 1) {
          mobanWidth = widthBiaozhun;
          mobanHeight = Math.floor(height / width * mobanWidth);
        } else {
          mobanHeight = widthBiaozhun;
          mobanWidth = Math.floor(width / height * mobanHeight);
        }
        clearInterval(getWHtimer);
        // console.log('got', mobanWidth, mobanWidth);
        callback();
      }
    }, 100);
  }

  var imgDataOri, imgDataOriBack, imgDataResultFront, imgDataResultBack;
  var imgDataResultFrontKou, imgDataResultBackKou;
  // 获取显示图像素
  function getPixels2(flag, callback) {
    if (flag) {
      var canvasTem = document.createElement("canvas")
      var cxtTem = canvasTem.getContext("2d")
      downloadedImg = new Image;
      // downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.setAttribute('crossorigin', 'anonymous');
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = $scope.frontShowImgSrc + '?x-oss-process=image/resize,m_fill,h_' + mobanHeight + '&time=' + new Date().getTime();
      function imageReceived() {
        canvasTem.width = mobanWidth;
        canvasTem.height = mobanHeight;
        previewCvs.width = mobanWidth;
        previewCvs.height = mobanHeight;
        previewCvsBack.width = mobanWidth;
        previewCvsBack.height = mobanHeight;
        frontCvs.width = mobanWidth;
        frontCvs.height = mobanHeight;
        backCvs.width = mobanWidth;
        backCvs.height = mobanHeight;
        $scope.imgHeight = mobanHeight;
        // $scope.detailHeight = windowHeight - 100 - $scope.imgHeight - 33 -16;
        cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
        cxtTem.drawImage(this, 0, 0, mobanWidth, mobanHeight);
        // 获取像素信息数据
        // imgData = quseContext.getImageData(0, 0,300,300);
        imgDataOri = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        // console.log(imgDataOri)
        imgDataResultFront = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        imgDataResultFrontKou = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        $scope.currentImgB64 = canvasTem.toDataURL("image/png");
        if (callback) {
          callback();
        }
      }
    } else {
      var canvasTem = document.createElement("canvas")
      var cxtTem = canvasTem.getContext("2d")
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = $scope.backShowImgSrc + '?x-oss-process=image/resize,m_fill,h_' + mobanHeight + '&time=' + new Date().getTime();
      function imageReceived() {
        canvasTem.width = mobanWidth;
        canvasTem.height = mobanHeight;
        cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
        cxtTem.drawImage(this, 0, 0, mobanWidth, mobanHeight);
        // 获取像素信息数据
        // imgData = quseContext.getImageData(0, 0,300,300);
        imgDataOriBack = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        // console.log(imgDataOriBack)
        imgDataResultBack = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        imgDataResultBackKou = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
        $scope.currentImgB64Back = canvasTem.toDataURL("image/png");
        if (callback) {
          callback();
        }
      }
    }
  }

  var canvasBasicColor, canvasChanColor;
  var colorSubmit;

  var customColor;
  var customFront;
  var customBack;
  $scope.save = function () {
    // window.parent.postMessage({
    //   flag: 'savetest',
    //   data: ''
    // }, "*");
    uploadImgs('1', function () {
      // 存储定制信息到cj，取到custom id
      var customInfoSubmit = {
        cj_pod_color: $scope.podColorVal ? $scope.podColorVal.value : '',
        cj_pod_zone_front: customFront,
        cj_pod_zone_back: customBack
      }
      console.log(JSON.stringify(customInfoSubmit))
      var orderHttp = 'http://192.168.5.119:8084/order/oldOrder/addPodPropertiesInfo';
      orderHttp = 'https://order.cjdropshipping.com/order/oldOrder/addPodPropertiesInfo'
      postFun(orderHttp, JSON.stringify({
        Custom_id: JSON.stringify(customInfoSubmit)
      }), function (data) {
        console.log(data);
          var data = JSON.parse(data);
          if (data.statusCode == 200) {
            layer.msg($scope.language.saveSucc);

            var temArr = [$scope.printVal, $scope.printValBack, frontpodimagename, backpodimagename]
            var customInfoShow = temArr.filter(function (val) {
              return val;
            })
            console.log(customInfoShow)
            window.parent.postMessage({
              flag: 'saveFromCJ',
              data: {
                customId: data.result,
                customeInfo: customInfoShow.join(', ')
              }
            }, "*");
          } else {
            layer.msg($scope.language.saveFail);
          }
      });
      // layer.msg('Save successfully');

      // var temArr = [$scope.printVal, $scope.printValBack, frontpodimagename, backpodimagename]
      // var customInfoShow = temArr.filter(function (val) {
      //   return val;
      // })
      // console.log(customInfoShow)
      // window.parent.postMessage({
      //   flag: 'savetest',
      //   data: {
      //     customId: '888',
      //     customeInfo: customInfoShow.join(', ')
      //   }
      // }, "*");
      // layer.msg('Save successfully');
      // window.parent.postMessage({
      //   flag: 'saveFromCJ',
      //   data: ''
      // }, "*");
    })
  }

  // 上传图片
  function uploadImgs(flag, scb) {
    // flag 1: front效果图和back效果图, 11: front上传图 ，22: back上传图
    // https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181112/165663728701.png
    // https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/277064904536.png
    // https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/2115242918718.png
    // layer.load(2)
    layer.load(2, {
      shade: 0
    });
    if (flag == '1') {
      // 书签start
      // layer.closeAll('loading');
      // designSketchFront = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/277064904536.png';
      // writeFrontInfo();
      // designSketchBack = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/2115242918718.png';
      // writeBackInfo();
      // return;
      // 书签end
      var fileList = {};
      frontCvs.toBlob(
        function (blob) {
          var nowTime = new Date().getTime();
          blob.name = nowTime + '.png';
          // blob.nameo = frontpodimagename;
          fileList[0] = blob;
          fileList.length = 1;
          // console.log(fileList);
          if (customMessage.zone && customMessage.zone.back) {
            var map = {};
            map.front = nowTime;
            backCvs.toBlob(
              function (blob) {
                var nowTime = new Date().getTime();
                blob.name = nowTime + '.png';
                // blob.nameo = backpodimagename;
                fileList[1] = blob;
                fileList.length = 2;
                // console.log(fileList);
                map.back = nowTime;
                ossUploadFile(fileList, function (data) {
                  // console.log(data);
                  layer.closeAll('loading');
                  if (data.code == 2 || data.code == 0) {
                    // console.log('上传失败');
                    layer.msg($scope.language.networkError);
                  } else {
                    for (var k in data.succssByOrder) {
                      for (var k2 in map) {
                        if (k2 == 'front' && k == map[k2]) {
                          designSketchFront = data.succssByOrder[k];
                          writeFrontInfo();
                        }
                        if (k2 == 'back' && k == map[k2]) {
                          designSketchBack = data.succssByOrder[k];
                          writeBackInfo();
                        }
                      }
                    }
                    if (scb) {
                      scb();
                    }
                  }
                });
              },
              'image/png'
            );
          } else {
            ossUploadFile(fileList, function (data) {
              layer.closeAll('loading');
              // console.log(data);
              if (data.code == 2 || data.code == 0) {
                layer.msg($scope.language.networkError);
              } else {
                designSketchFront = data.succssLinks[0];
                writeFrontInfo();
                if (scb) {
                  scb();
                }
              }
            });
          }
        },
        'image/png'
      );
    }
    if (flag == '11') {
      // imgDataUrlFront = "https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181112/7832329265339.png";
      // writeFrontInfo();
      // return;
      var fileList = {};
      upimgResFrontCvs.toBlob(
        function (blob) {
          blob.name = new Date().getTime() + '.png';
          // blob.nameo = frontpodimagename;
          fileList[0] = blob;
          fileList.length = 1;
          // console.log(11111,fileList);
          ossUploadFile(fileList, function (data) {
            layer.closeAll('loading');
            // console.log(data);
            if (data.code == 2 || data.code == 0) {
              layer.msg($scope.language.networkError);
            } else {
              imgDataUrlFront = data.succssLinks[0];
              // writeFrontInfo();
              if (scb) {
                scb();
              }
            }
          });
        },
        'image/png'
      );
      // console.log('22222');
    }
    if (flag == '22') {
      // imgDataUrlBack = "https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181114/4556134976347.png";
      // writeBackInfo();
      // return;
      var fileList = {};
      upimgResBackCvs.toBlob(
        function (blob) {
          blob.name = new Date().getTime() + '.png';
          // blob.nameo = backpodimagename;
          fileList[0] = blob;
          fileList.length = 1;
          // console.log(fileList);
          ossUploadFile(fileList, function (data) {
            layer.closeAll('loading');
            // console.log(data);
            if (data.code == 2 || data.code == 0) {
              layer.msg($scope.language.networkError);
            } else {
              imgDataUrlBack = data.succssLinks[0];
              // writeBackInfo();
              if (scb) {
                scb();
              }
            }
          });
        },
        'image/png'
      );
    }
  }
  // oss上传文件
  function ossUploadFile(fileData, scb) {
    // fileData----$('#xxx')[0].files  xxx--input的id
    // scb-回调函数
    $.ajax({
      // url: 'http://192.168.5.104:8080/app/oss/policy',
      url: 'https://app.cjdropshipping.com/app/oss/policy',
      type: 'POST',
      data: JSON.stringify({ shop: customMessage.shopName, accpid: customMessage.shopPid }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        if (data.code == 200) {
          var accessid = data.accessid;
          var expire = data.expire;
          var host = data.host;
          var policy = data.policy;
          var signature = data.signature;
          var ReturnUrl = null;
          var succssLinks = [];
          var succssByOrder = {};
          var failIndexs = [];
          for (var i = 0; i < fileData.length; i++) {
            (function (i) {
              var formData = new FormData();
              var time = new Date().getTime();
              var year = new Date().getFullYear();
              var month = new Date().getMonth() + 1;
              var day = new Date().getDate();
              if (month < 10) {
                month = '0' + month
              }
              if (day < 10) {
                day = '0' + day
              }
              var timeStr = 'shopify/' + year + month + day;
              var randomNumArr = getRandomNumber(0, 2147483647, 2)
              var randomNum1 = randomNumArr[0] + 10;
              var randomNum2 = randomNumArr[1] + 1000;
              var randomFileName = Math.floor(time / randomNum1 * randomNum2);
              // console.log(timeStr)
              // console.log(randomFileName)
              // formData.append('key', time + '-' + fileData[i].name);
              var fileArr = fileData[i].name.split('.')
              var fileTypeName = fileArr[fileArr.length - 1];
              // var imgLink = 'shopify/' + year + month + day + '/' + (fileData[i].nameo ? fileData[i].nameo + '_' : '') + randomFileName + '.' + fileTypeName;
              formData.append('key', timeStr + '/' + randomFileName + '.' + fileTypeName);
              // formData.append('key', imgLink);
              formData.append('policy', policy);  //policy
              formData.append('OSSAccessKeyId', accessid);  //accessKeyId
              formData.append('success_action_status', "200");  //成功后返回的操作码
              formData.append('Signature', signature);   //签名
              formData.append('file', fileData[i]);
              $.ajax({
                url: host,
                type: 'POST',
                data: formData,
                // async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                  // console.log('success上传成功');
                  // ReturnUrl = host + '/' + time + '-' + fileData[i].name;
                  ReturnUrl = host + '/' + timeStr + '/' + randomFileName + '.' + fileTypeName;
                  // ReturnUrl = host + '/' + imgLink;
                  // console.log(ReturnUrl);
                  succssLinks.push(ReturnUrl);
                  succssByOrder[fileArr[0]] = ReturnUrl;
                },
                error: function (returndata) {
                  // console.log(returndata);
                  failIndexs.push(i);
                  // console.log('error上传失败');
                }
              });
            })(i)
          }
          var ossTimer = setInterval(function () {
            if (succssLinks.length == fileData.length) {
              scb({
                code: 1, // 全部上传成功，返回成功链接
                succssLinks: succssLinks,
                succssByOrder: succssByOrder
              });
              clearInterval(ossTimer);
            } else if (failIndexs.length == fileData.length) {
              scb({
                code: 0  // 全部上传失败
              });
              clearInterval(ossTimer);
            } else if ((failIndexs.length + succssLinks.length) == fileData.length) {
              scb({
                code: 2, // 部分上传成功，返回成功链接和失败索引
                failIndexs: failIndexs,
                succssLinks: succssLinks,
                succssByOrder: succssByOrder
              });
              clearInterval(ossTimer);
            }
          }, 10);

        } else {
          layer.msg($scope.language.internalServerError);
          scb({
            code: 0  // 全部上传失败
          });
        }
      },
      error: function (data) {
        // console.log(data);
        scb({
          code: 0  // 全部上传失败
        });
      }
    });
  };
  function getRandomNumber(start, end, n) {
    var numArr = [];
    for (var i = 0; i < n; i++) {
      var number = Math.floor(Math.random() * (end - start + 1) + start);
      if (numArr.indexOf(number) < 0) {
        numArr.push(number);
      } else {
        i--;
      }
    }
    return numArr;
  }
  var imgDataUrlFront;
  var designSketchFront;
  function writeFrontInfo() {
    var printVal = $scope.printVal;
    if (printVal) {
      printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
    }
    var temObj;
    if (printVal && imgDataUrlFront) {
      temObj = {
        design_sketch: designSketchFront,
        podimage: imgDataUrlFront,
        podtext: printVal,
        // fontfamily: $scope.fontName,
        // fontcolor: $scope.frontColorValue,
        // fontsize: $scope.frontFontItem.size
      }
    } else if (imgDataUrlFront) {
      temObj = {
        design_sketch: designSketchFront,
        podimage: imgDataUrlFront
      }
    } else if (printVal) {
      temObj = {
        design_sketch: designSketchFront,
        podtext: printVal,
        // fontfamily: $scope.fontName,
        // fontcolor: $scope.frontColorValue,
        // fontsize: $scope.frontFontItem.size
      }
    }
    var val = temObj ? JSON.stringify(temObj) : '';
    // console.log(val);
    // $('.cj_pod_zone_front_inp').val(val);
    // 告诉父页面：更新信息
    // window.parent.postMessage({
    //   flag: 'freshFrontFromCJ',
    //   data: val
    // }, "*");
    customFront = val;
  }
  var imgDataUrlBack;
  var designSketchBack;
  function writeBackInfo() {
    var printVal = $scope.printValBack;
    if (printVal) {
      printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
    }
    var temObj;
    if (printVal && imgDataUrlBack) {
      temObj = {
        podimage: imgDataUrlBack,
        podtext: printVal,
        design_sketch: designSketchBack,
        // fontfamily: $scope.fontNameBack,
        // fontcolor: $scope.backColorValue,
        // fontsize: $scope.backFontItem.size
      }
    } else if (imgDataUrlBack) {
      temObj = {
        podimage: imgDataUrlBack,
        design_sketch: designSketchBack
      }
    } else if (printVal) {
      temObj = {
        podtext: printVal,
        design_sketch: designSketchBack,
        // fontfamily: $scope.fontNameBack,
        // fontcolor: $scope.backColorValue,
        // fontsize: $scope.backFontItem.size
      }
    }
    var val = temObj ? JSON.stringify(temObj) : '';
    // console.log(val);
    // $('.cj_pod_zone_back_inp').val(val);
    // 告诉父页面：更新信息
    // window.parent.postMessage({
    //   flag: 'freshBackFromCJ',
    //   data: val
    // }, "*");
    customBack = val;
  }

  $scope.posiArrFront = [];
  $scope.posiArrBack = [];
  var canvasPosi = document.createElement("canvas")
  var cxtPosi = canvasPosi.getContext("2d");
  var emptyIndexArrFront, emptyIndexArrBack;
  var editWFront, editHFront, editZoneBiliFront, editWBack, editHBack, editZoneBiliBack;
  var maxLineNumFront, maxLineNumBack;
  // 获取编辑图像素
  function getPosiInfo(flag1, callback) {
    // flag 1-正面 0-背面
    var r, g, b, a, xMax, xMin, yMax, yMin;
    var imgsrc, temXs, temCtx;
    var temPosiArr = [];
    var emptyIndexArr = [];
    if (flag1) {
      imgsrc = $scope.podZone.front.editimgurl;
    } else {
      imgsrc = $scope.podZone.back.editimgurl;
    }
    temCtx = cxtPosi;
    // console.log(temCtx)
    downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = imgsrc + '?x-oss-process=image/resize,m_fill,h_' + mobanHeight + '&time=' + new Date().getTime();
    function imageReceived() {
      canvasPosi.width = mobanWidth;
      canvasPosi.height = mobanHeight;
      temCtx.clearRect(0, 0, mobanWidth, mobanHeight);
      temCtx.drawImage(this, 0, 0, mobanWidth, mobanHeight);
      // 获取像素信息数据
      temXs = temCtx.getImageData(0, 0, mobanWidth, mobanHeight);
      // console.log(temXs);
      // emptyIndexArrFront = [];
      var xArr = [];
      var yArr = [];
      var realIndex;
      for (var index = 0; index < temXs.data.length; index += 4) {
        r = temXs.data[index];
        g = temXs.data[index + 1];
        b = temXs.data[index + 2];
        a = temXs.data[index + 3];
        if (r == 0 && g == 0 && b == 0 && a == 0) {
          realIndex = index / 4;
          emptyIndexArr.push(index);
          xArr.push(realIndex % mobanWidth)
          yArr.push(Math.floor(realIndex / mobanWidth))
        }
        // posiArr.push([r,g,b,a]);
      }
      function sortNumber(a, b) {
        return a - b
      }
      xArr.sort(sortNumber);
      yArr.sort(sortNumber);
      // console.log(xArr,yArr)
      xMax = xArr[xArr.length - 1] + 2;
      xMin = xArr[0] - 1;
      yMax = yArr[yArr.length - 1] + 2;
      yMin = yArr[0] - 1;
      temPosiArr = [xMin, yMin, xMax - xMin, yMax - yMin];
      // console.log(temPosiArr);
      if (flag1) {
        $scope.posiArrFront = temPosiArr;
        emptyIndexArrFront = emptyIndexArr;
        editWFront = $scope.posiArrFront[2];
        editHFront = $scope.posiArrFront[3];
        editZoneBiliFront = (editWFront / editHFront).toFixed(2);
        maxLineNumFront = Math.floor($scope.posiArrFront[3] / 24);
        if (maxLineNumFront == 0) {
          maxLineNumFront = 1;
        }
      } else {
        $scope.posiArrBack = temPosiArr;
        emptyIndexArrBack = emptyIndexArr;
        editWBack = $scope.posiArrBack[2];
        editHBack = $scope.posiArrBack[3];
        editZoneBiliBack = (editWBack / editHBack).toFixed(2);
        maxLineNumBack = Math.floor($scope.posiArrBack[3] / 24);
        if (maxLineNumBack == 0) {
          maxLineNumBack = 1;
        }
      }
      // temCtx.fillStyle = "rgba(0,255,0,0.2)";
      temCtx.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);
      if (callback) {
        callback();
      }
      // put数据
      // contextResultBack.putImageData(imgDataResultBack, 0, 0);
    }
  }

  // var posiInfo = [29, 170, 192, 175];

  $scope.fontList = ['Arial', 'Amrak', 'Antre', 'Azedo-Light', 'Bend-One', 'Hensa', 'BOMB', 'Cloud-Light', 'Didactic-Regular', 'Facile-Sans', 'GROTESKIA', 'JustinRoad', 'Legendary-ultra-light', 'Matematica-Regular', 'NavyQueenLT', 'NIKOLETA', 'octomorf', 'Panthony', 'QanelasSoftDEMO-UltraLight', 'Rabiola', 'Racer-med-100-font', 'Reef', 'SEANCo-Firefly-2015']
  $scope.colorList = ['#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff']
  $scope.fontSizeList = [
    {
      show: 'H1',
      size: '24px'
    },
    {
      show: 'H2',
      size: '22px'
    },
    {
      show: 'H3',
      size: '20px'
    },
    {
      show: 'H4',
      size: '18px'
    },
    {
      show: 'H5',
      size: '16px'
    },
    {
      show: 'H6',
      size: '14px'
    }
  ]

  /* 定制文字 */
  $scope.printText = function () {
    if ($scope.showBack) {
      var printVal = $scope.printValBack.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
      // var printArr = printVal.split('<br/>');
      // var len = printArr.length;
      // if (len > maxLineNumBack) {
      //   layer.msg(maxLineNumBack + ' rows allowed at most.');
      //   // alert(maxLineNumBack + ' rows allowed at most.');
      //   // e.preventDefault();
      //   return
      // }
      drawBack();
    } else {
      var printVal = $scope.printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
      // var printArr = printVal.split('<br/>');
      // var len = printArr.length;
      // if (len > maxLineNumFront) {
      //   layer.msg(maxLineNumFront + ' rows allowed at most.');
      //   // alert(maxLineNumFront + ' rows allowed at most.');
      //   e.preventDefault();
      //   return
      // }
      drawFront();
    }
  }
  $scope.fontName = 'Arial';
  $scope.fontNameBack = 'Arial';
  $scope.chageFont = function (font) {
    if ($scope.showBack) {
      $scope.fontNameBack = font;
      $scope.showFontListBack = false;
      if (!$scope.printValBack) return;
      drawBack();
    } else {
      $scope.fontName = font;
      $scope.showFontList = false;
      if (!$scope.printVal) return;
      drawFront();
    }
  }

  $scope.backColorValue = '#000000';
  $scope.frontColorValue = '#000000';
  $scope.chanTextColor = function (color) {
    if ($scope.showBack) {
      if (!$scope.printValBack) return;
      $scope.backColorValue = color;
      drawBack();
    } else {
      if (!$scope.printVal) return;
      $scope.frontColorValue = color;
      drawFront();
    }
  }

  $scope.frontFontItem = {
    show: 'H5',
    size: '16px'
  }
  $scope.backFontItem = {
    show: 'H5',
    size: '16px'
  }
  $scope.chanFontSize = function (item) {
    if ($scope.showBack) {
      if (!$scope.printValBack) return;
      $scope.backFontItem = item;
      drawBack();
    } else {
      if (!$scope.printVal) return;
      $scope.frontFontItem = item;
      drawFront();
    }
  }

  // var mark = document.getElementById("mark");//拖动条
  var oMark = document.getElementById("mark");
  var oMarkInner = document.getElementById("mark-inner");
  document.getElementById("mark-resize-big").onclick = function () {
    var srcX = oMark.offsetLeft;
    var srcY = oMark.offsetTop;
    var sWidth = oMark.offsetWidth;
    var sHeight = oMark.offsetHeight;
    var temWidth = sWidth * 1.1;
    var temHeight = sHeight * 1.1;
    // if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
      oMark.style.width = temWidth + "px";
      oMark.style.height = temHeight + "px";
      drawPic();
    // }
  }
  document.getElementById("mark-resize-small").onclick = function () {
    var srcX = oMark.offsetLeft;
    var srcY = oMark.offsetTop;
    var sWidth = oMark.offsetWidth;
    var sHeight = oMark.offsetHeight;
    var temWidth = sWidth * 0.9;
    var temHeight = sHeight * 0.9;
    // console.log(temWidth, temHeight)
    if (temWidth >= 40 && temHeight >= 40) {
      oMark.style.width = temWidth + "px";
      oMark.style.height = temHeight + "px";
      drawPic();
    }
  }

  if (oMark) {
    var markMouse;
    oMarkInner.onmousedown = function (event) {
      markMouse = true;
      var event = event || window.event;
      //获取鼠标在页面中的位置
      var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
      var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
      //获取鼠标在按下的那一瞬间在盒子中的位置
      var boxX = pageX - oMark.offsetLeft;
      var boxY = pageY - oMark.offsetTop;
      //鼠标在页面上移动 让mark跟着鼠标移动
      document.onmousemove = function (event) {
        var srcX = oMark.offsetLeft;
        var srcY = oMark.offsetTop;
        // var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
        var sWidth = oMark.offsetWidth;
        var sHeight = oMark.offsetHeight;
        // console.log(srcX,srcY,sWidth,sHeight)
        // console.log(criticalVal1,criticalVal2)
        // if (srcX >= criticalVal1 && srcX + sWidth <= criticalVal2 && srcY >= criticalVal3 && srcY + sHeight <= criticalVal4) {
          var event = event || window.event;
          //获取鼠标在页面上的位置
          var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
          var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
          // console.log(pageX,pageY)
          //让mark跟着鼠标移动
          oMark.style.left = pageX - boxX + "px";
          oMark.style.top = pageY - boxY + "px";
          //清除选中文字
        // }

      };
      //鼠标弹起 盒子就不应该跟着了
      document.onmouseup = function () {
        document.onmousemove = null;
        var srcX = oMark.offsetLeft;
        var srcY = oMark.offsetTop;
        // var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
        var sWidth = oMark.offsetWidth;
        var sHeight = oMark.offsetHeight;
        // console.log(srcX,srcY,sWidth,sHeight)
        // console.log(criticalVal1,criticalVal2)
        // if (srcX < criticalVal1) {
        //   oMark.style.left = criticalVal1 + "px";
        // }
        // if (srcX + sWidth > criticalVal2) {
        //   oMark.style.left = criticalVal2 - sWidth + "px";
        // }
        // if (srcY < criticalVal3) {
        //   oMark.style.top = criticalVal3 + "px";
        // }
        // if (srcY + sHeight > criticalVal4) {
        //   oMark.style.top = criticalVal4 - sHeight + "px";
        // }
        if (markMouse) {
          drawPic();
          markMouse = false;
        }
        document.onmouseup = null;
      };
    };
  }
  var oMarkBack = document.getElementById("mark-back");
  var oMarkBackInner = document.getElementById("mark-back-inner");
  document.getElementById("mark-back-resize-big").onclick = function () {
    var srcX = oMarkBack.offsetLeft;
    var srcY = oMarkBack.offsetTop;
    var sWidth = oMarkBack.offsetWidth;
    var sHeight = oMarkBack.offsetHeight;
    var temWidth = sWidth * 1.1;
    var temHeight = sHeight * 1.1;
    // if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
      oMarkBack.style.width = temWidth + "px";
      oMarkBack.style.height = temHeight + "px";
      drawPicBack();
    // }
  }
  document.getElementById("mark-back-resize-small").onclick = function () {
    var srcX = oMarkBack.offsetLeft;
    var srcY = oMarkBack.offsetTop;
    var sWidth = oMarkBack.offsetWidth;
    var sHeight = oMarkBack.offsetHeight;
    var temWidth = sWidth * 0.9;
    var temHeight = sHeight * 0.9;
    // console.log(temWidth, temHeight)
    if (temWidth >= 40 && temHeight >= 40) {
      oMarkBack.style.width = temWidth + "px";
      oMarkBack.style.height = temHeight + "px";
      drawPicBack();
    }
  }
  if (oMarkBack) {
    // oMarkBack.style.width = $scope.posiArrBack[2]+'px';
    // oMarkBack.style.height = $scope.posiArrBack[3]+'px';
    // oMarkBack.style.left = Math.floor((360-$scope.posiArrBack[2])/2)+'px';
    // oMarkBack.style.top = Math.floor((360-$scope.posiArrBack[3])/2)+'px';
    var markMouse;
    oMarkBackInner.onmousedown = function (event) {
      markMouse = true;
      var event = event || window.event;
      //获取鼠标在页面中的位置
      var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
      var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
      //获取鼠标在按下的那一瞬间在盒子中的位置
      var boxX = pageX - oMarkBack.offsetLeft;
      var boxY = pageY - oMarkBack.offsetTop;
      //鼠标在页面上移动 让oMarkBack跟着鼠标移动
      document.onmousemove = function (event) {
        var srcX = oMarkBack.offsetLeft;
        var srcY = oMarkBack.offsetTop;
        // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
        var sWidth = oMarkBack.offsetWidth;
        var sHeight = oMarkBack.offsetHeight;
        // if (srcX >= criticalVal1Back && srcX + sWidth <= criticalVal2Back && srcY >= criticalVal3Back && srcY + sHeight <= criticalVal4Back) {
          var event = event || window.event;
          //获取鼠标在页面上的位置
          var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
          var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
          //让oMarkBack跟着鼠标移动
          oMarkBack.style.left = pageX - boxX + "px";
          oMarkBack.style.top = pageY - boxY + "px";
          //清除选中文字
        // }

      };
      //鼠标弹起 盒子就不应该跟着了
      document.onmouseup = function () {
        var srcX = oMarkBack.offsetLeft;
        var srcY = oMarkBack.offsetTop;
        // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
        var sWidth = oMarkBack.offsetWidth;
        var sHeight = oMarkBack.offsetHeight;
        // if (srcX < criticalVal1Back) {
        //   oMarkBack.style.left = criticalVal1Back + "px";
        // }
        // if (srcX + sWidth > criticalVal2Back) {
        //   oMarkBack.style.left = criticalVal2Back - sWidth + "px";
        // }
        // if (srcY < criticalVal3Back) {
        //   oMarkBack.style.top = criticalVal3Back + "px";
        // }
        // if (srcY + sHeight > criticalVal4Back) {
        //   oMarkBack.style.top = criticalVal4Back - sHeight + "px";
        // }
        document.onmousemove = null;
        if (markMouse) {
          drawPicBack();
          markMouse = false;
        }
        document.onmouseup = null;
      };
    };
  }

  function touchEvent(ele) {
    var touch;
    ele.addEventListener(
      'touchstart',
      function (event) {
        markMouse = true;
        // var pageXPhone = event.originalEvent.changedTouches[0].pageX;
        // var pageYPhone = event.originalEvent.changedTouches[0].pageY;
        var srcXPhone = oMark.offsetLeft;
        var srcYPhone = oMark.offsetTop;
        touch = event.targetTouches[0];//取得第一个touch的坐标值
        var pageXPhone = touch.pageX;
        var pageYPhone = touch.pageY;
        ele.addEventListener('touchmove', function (event) {
          event.preventDefault();
          touch = event.targetTouches[0];//取得第一个touch的坐标值
          // var pageXPhoneEnd = event.originalEvent.changedTouches[0].pageX;
          // var pageYPhoneEnd = event.originalEvent.changedTouches[0].pageY;
          var pageXPhoneEnd = touch.pageX;
          var pageYPhoneEnd = touch.pageY;
          oMark.style.left = srcXPhone + pageXPhoneEnd - pageXPhone + "px";
          oMark.style.top = srcYPhone + pageYPhoneEnd - pageYPhone + "px";
        }, { passive: false });
        ele.addEventListener('touchend', function (event) {
          ele.addEventListener('touchmove', null);
          var srcX = oMark.offsetLeft;
          var srcY = oMark.offsetTop;
          // var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
          var sWidth = oMark.offsetWidth;
          var sHeight = oMark.offsetHeight;
          // console.log(srcX,srcY,sWidth,sHeight)
          // console.log(criticalVal1,criticalVal2)
          // if (srcX < criticalVal1) {
          //   oMark.style.left = criticalVal1 + "px";
          // }
          // if (srcX + sWidth > criticalVal2) {
          //   oMark.style.left = criticalVal2 - sWidth + "px";
          // }
          // if (srcY < criticalVal3) {
          //   oMark.style.top = criticalVal3 + "px";
          // }
          // if (srcY + sHeight > criticalVal4) {
          //   oMark.style.top = criticalVal4 - sHeight + "px";
          // }
          if (markMouse) {
            drawPic();
            markMouse = false;
          }
          document.touchend = null;
        }, { passive: false });
      },
      { passive: false }
    );
  }
  function touchEventBack(ele) {
    var touch;
    ele.addEventListener(
      'touchstart',
      function (event) {
        markMouse = true;
        // var pageXPhone = event.originalEvent.changedTouches[0].pageX;
        // var pageYPhone = event.originalEvent.changedTouches[0].pageY;
        var srcXPhone = oMarkBack.offsetLeft;
        var srcYPhone = oMarkBack.offsetTop;
        touch = event.targetTouches[0];//取得第一个touch的坐标值
        var pageXPhone = touch.pageX;
        var pageYPhone = touch.pageY;
        ele.addEventListener('touchmove', function (event) {
          event.preventDefault();
          touch = event.targetTouches[0];//取得第一个touch的坐标值
          // var pageXPhoneEnd = event.originalEvent.changedTouches[0].pageX;
          // var pageYPhoneEnd = event.originalEvent.changedTouches[0].pageY;
          var pageXPhoneEnd = touch.pageX;
          var pageYPhoneEnd = touch.pageY;
          oMarkBack.style.left = srcXPhone + pageXPhoneEnd - pageXPhone + "px";
          oMarkBack.style.top = srcYPhone + pageYPhoneEnd - pageYPhone + "px";
        }, { passive: false });
        ele.addEventListener('touchend', function (event) {
          ele.addEventListener('touchmove', null);
          var srcX = oMarkBack.offsetLeft;
          var srcY = oMarkBack.offsetTop;
          // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
          var sWidth = oMarkBack.offsetWidth;
          var sHeight = oMarkBack.offsetHeight;
          // console.log(srcX,srcY,sWidth,sHeight)
          // console.log(criticalVal1,criticalVal2)
          // if (srcX < criticalVal1Back) {
          //   oMarkBack.style.left = criticalVal1Back + "px";
          // }
          // if (srcX + sWidth > criticalVal2Back) {
          //   oMarkBack.style.left = criticalVal2Back - sWidth + "px";
          // }
          // if (srcY < criticalVal3Back) {
          //   oMarkBack.style.top = criticalVal3Back + "px";
          // }
          // if (srcY + sHeight > criticalVal4Back) {
          //   oMarkBack.style.top = criticalVal4Back - sHeight + "px";
          // }
          if (markMouse) {
            drawPicBack();
            markMouse = false;
          }
          document.touchend = null;
        }, { passive: false });
      },
      { passive: false }
    );
  }


  // $('#asj-design-cart').height(rightBarHeight+60);
  var frontCvs = document.getElementById('preview-front-cvs');
  var frontCtx = frontCvs.getContext("2d");

  var backCvs = document.getElementById('preview-back-cvs');
  var backCtx = backCvs.getContext("2d");

  var downloadedImg;

  var backpodimagename;
  var inputObj2 = document.createElement('input');
  inputObj2.addEventListener('input', readFile2, false);
  inputObj2.type = 'file';
  inputObj2.accept = 'image/*';
  inputObj2.id = 'inp-pic2';
  // inputObj2.click();
  function readFile2() {
    var file = this.files[0];//获取input输入的图片
    // console.log(file);
    if (!/image\/\w+/.test(file.type)) {
      layer.msg($scope.language.fileOnlyImage);
      // alert("Please make sure the file type is an image.");
      inputObj2.value = '';
      return false;
    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
    var reader = new FileReader();
    reader.readAsDataURL(file);//转化成base64数据类型
    reader.onload = function (e) {
      var result = this.result;
      var image = new Image();
      image.onload = function () {
        var width = this.width;
        var height = this.height;
        if (width >= 1000 && height >= 1000) {
          $scope.upLoadImgBack = true;
          inputObj2.value = '';
          backpodimagename = file.name;
          $scope.$apply();
          drawToCanvasBack(result);
        } else {
          layer.msg($scope.language.highQualityPrint, {
            time: 4000 //2秒关闭（如果不配置，默认是3秒）
          });
          // alert('To ensure the high-quality print, please upload images size larger than 1000*1000.');
          inputObj2.value = '';
        }
      };
      image.src = this.result;
      // drawToCanvasBack(this.result);
    }
  }
  var frontpodimagename;
  var inputObj1 = document.createElement('input');
  inputObj1.addEventListener('change', readFile1, false);
  inputObj1.type = 'file';
  inputObj1.accept = 'image/*';
  inputObj1.id = 'inp-pic1';
  function readFile1() {
    var file = this.files[0];//获取input输入的图片
    // console.log('读取文件 ->', file);
    if (!/image\/\w+/.test(file.type)) {
      layer.msg($scope.language.fileOnlyImage);
      // alert("Please make sure the file type is an image.");
      inputObj1.value = '';
      return false;
    }//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断

    var reader = new FileReader();
    reader.readAsDataURL(file);//转化成base64数据类型
    reader.onload = function (e) {
      var result = this.result;
      var image = new Image();
      image.onload = function () {
        var width = this.width;
        var height = this.height;
        if (width >= 1000 && height >= 1000) {
          $scope.upLoadImg = true;
          inputObj1.value = '';
          frontpodimagename = file.name;
          $scope.$apply();
          drawToCanvas(result);
        } else {
          layer.msg($scope.language.highQualityPrint, {
            time: 4000 //2秒关闭（如果不配置，默认是3秒）
          });
          // alert('To ensure the high-quality print, please upload images size larger than 1000*1000.')
          inputObj1.value = '';
        }
      };
      image.src = this.result; // 显示上传图片
    }
  }

  $scope.doInput = function () {
    if ($scope.showBack) {
      inputObj2.click();
    } else {
      inputObj1.click();
    }
  }

  var cutImgCvs = document.querySelector('#cut-img-cvs');
  var cutImgCtx = cutImgCvs.getContext('2d');
  var bigCvs = document.createElement("canvas");
  var bigCxt = bigCvs.getContext("2d");
  
  var bigCvsArr = [];
  var criticalVal1, criticalVal2, criticalVal3, criticalVal4;
  var imgfinW, imgfinH;
  var imgW, imgH;
  var number400;
  if ($scope.phone) {
    $scope.windowWidth = windowWidth;
    number400 = windowWidth - 20;
    cutImgCvs.width = number400;
    cutImgCvs.height = number400;
  } else {
    number400 = 400;
  }
  // 把上传图放到canvas
  function drawToCanvas(imgData) {
    var img = new Image;
    img.src = imgData;
    $scope.$apply();
    img.onload = function () {//必须onload之后再画
      console.log(img);
      imgW = img.width;
      imgH = img.height;
      bigCvs.width = imgW;
      bigCvs.height = imgH;
      var bili, posiX, posiY;
      var markW, markH;
      if (imgW / imgH < 1) {
        if (imgH > number400) {
          imgfinH = number400;
        } else {
          imgfinH = imgH;
        }
        bili = imgfinH / imgH;
        imgfinW = imgW * bili;
        // markW = Math.floor(imgfinW * 0.8);
        var bili2 = editHFront / editWFront;
        if (bili2 < 1) {
          if (imgfinW > number400) {
            markW = number400;
          } else {
            markW = imgfinW;
          }
          markH = markW * bili2;
        } else {
          if (imgfinH > number400) {
            markH = number400;
          } else {
            markH = imgfinH;
          }
          markW = markH * (1 / bili2);
        }
        // markH = Math.floor(editHFront / editWFront * markW);
        criticalVal3 = 10; // top
        criticalVal4 = number400 + criticalVal3; // top+height
        criticalVal1 = Math.floor((number400 + criticalVal3 - imgfinW) / 2); // left
        criticalVal2 = Math.floor((number400 + criticalVal3 - imgfinW) / 2 + imgfinW); // left+width
      } else {
        if (imgW > number400) {
          imgfinW = number400;
        } else {
          imgfinW = imgW;
        }
        bili = imgfinW / imgW;
        imgfinH = imgH * bili;
        // markH = Math.floor(imgfinH * 0.8);
        // markW = Math.floor(editWFront / editHFront * markH);
        var bili2 = editHFront / editWFront;
        if (bili2 < 1) {
          if (imgfinW > number400) {
            markW = number400;
          } else {
            markW = imgfinW;
          }
          markH = markW * bili2;
        } else {
          if (imgfinH > number400) {
            markH = number400;
          } else {
            markH = imgfinH;
          }
          markW = markH * (1 / bili2);
        }
        criticalVal1 = 10; // left
        criticalVal2 = number400 + criticalVal1; // left+width
        criticalVal3 = Math.floor((number400 + criticalVal1 * 2 - imgfinH) / 2); // top
        criticalVal4 = Math.floor((number400 + criticalVal1 * 2 - imgfinH) / 2 + imgfinH); // top+height
      }
      posiX = (number400 - imgfinW) / 2;
      posiY = (number400 - imgfinH) / 2;
      cutImgCtx.clearRect(0, 0, number400, number400);
      cutImgCtx.drawImage(img, posiX, posiY, imgfinW, imgfinH);
      bigCxt.clearRect(0, 0, imgW, imgH);
      bigCxt.drawImage(img, 0, 0, imgW, imgH);
      // oMark.style.width = $scope.posiArrFront[2] * 2+'px';
      // oMark.style.height = $scope.posiArrFront[3] * 2+'px';
      // oMark.style.left = Math.floor((number400-$scope.posiArrFront[2])/2)+'px';
      // oMark.style.top = Math.floor((number400-$scope.posiArrFront[3])/2)+'px';
      oMark.style.width = markW + 'px';
      oMark.style.height = markH + 'px';
      console.log(number400, criticalVal1, markW)
      oMark.style.left = Math.floor((number400 + 10 * 2  - markW) / 2) + 'px';
      oMark.style.top = Math.floor((number400 + 10 * 2  - markH) / 2) + 'px';
      drawPic();
      // strDataURI = cvs.toDataURL();//获取canvas base64数据
    }
  }
  var cutImgCvsBack = document.querySelector('#cut-img-cvs-back');
  var cutImgCtxBack = cutImgCvsBack.getContext('2d');
  var bigCvsBack = document.createElement("canvas");
  var bigCxtBack = bigCvsBack.getContext("2d");
  var bigCvsArrBack = [];
  var criticalVal1Back, criticalVal2Back, criticalVal3Back, criticalVal4Back;
  var imgfinWBack, imgfinHBack;
  var imgWBack, imgHBack;
  function drawToCanvasBack(imgData) {
    var img = new Image;
    img.src = imgData;
    $scope.$apply();
    img.onload = function () {//必须onload之后再画
      // console.log(img);
      imgWBack = img.width;
      imgHBack = img.height;
      bigCvsBack.width = imgWBack;
      bigCvsBack.height = imgHBack;
      var bili, posiX, posiY;
      var markW, markH;
      if (imgWBack / imgHBack < 1) {
        if (imgHBack > number400) {
          imgfinHBack = number400;
        } else {
          imgfinHBack = imgHBack;
        }
        bili = imgfinHBack / imgHBack;
        imgfinWBack = imgWBack * bili;
        // markW = Math.floor(imgfinWBack * 0.8);
        // markH = Math.floor(editHBack / editWBack * markW);
        var bili2 = editHBack / editWBack;
        if (bili2 < 1) {
          if (imgfinWBack > number400) {
            markW = number400;
          } else {
            markW = imgfinWBack;
          }
          markH = markW * bili2;
        } else {
          if (imgfinHBack > number400) {
            markH = number400;
          } else {
            markH = imgfinHBack;
          }
          markW = markH * (1 / bili2);
        }
        criticalVal1Back = Math.floor((420 - imgfinWBack) / 2); // left
        criticalVal2Back = Math.floor((420 - imgfinWBack) / 2 + imgfinWBack); // left+width
        criticalVal3Back = 10; // top
        criticalVal4Back = 410; // top+height
      } else {
        if (imgWBack > number400) {
          imgfinWBack = number400;
        } else {
          imgfinWBack = imgWBack;
        }
        bili = imgfinWBack / imgWBack;
        imgfinHBack = imgHBack * bili;
        // markH = Math.floor(imgfinHBack * 0.8);
        // markW = Math.floor(editWBack / editHBack * markH);
        var bili2 = editHBack / editWBack;
        if (bili2 < 1) {
          if (imgfinWBack > number400) {
            markW = number400;
          } else {
            markW = imgfinWBack;
          }
          markH = markW * bili2;
        } else {
          if (imgfinHBack > number400) {
            markH = number400;
          } else {
            markH = imgfinHBack;
          }
          markW = markH * (1 / bili2);
        }
        criticalVal1Back = 10; // left
        criticalVal2Back = number400 + criticalVal1Back; // left+width
        criticalVal3Back = Math.floor((number400 + 10 * 2 - imgfinHBack) / 2); // top
        criticalVal4Back = Math.floor((number400 + 10 * 2 - imgfinHBack) / 2 + imgfinHBack); // top+height
      }
      posiX = (number400 - imgfinWBack) / 2;
      posiY = (number400 - imgfinHBack) / 2;
      cutImgCtxBack.clearRect(0, 0, number400, number400);
      cutImgCtxBack.drawImage(img, posiX, posiY, imgfinWBack, imgfinHBack);
      bigCxtBack.clearRect(0, 0, imgWBack, imgWBack);
      bigCxtBack.drawImage(img, 0, 0, imgWBack, imgHBack);
      oMarkBack.style.width = markW + 'px';
      oMarkBack.style.height = markH + 'px';
      oMarkBack.style.left = Math.floor((number400 + criticalVal1Back * 2 - markW) / 2) + 'px';
      oMarkBack.style.top = Math.floor((number400 + criticalVal1Back * 2 - markH) / 2) + 'px';
      drawPicBack();
    }
  }

  // var cxt3=canvas3.getContext("2d")

  var upimgResFrontCvs = document.getElementById('upimg-res-front');
  var upimgResFrontCxs = upimgResFrontCvs.getContext("2d");

  var previewCvs = document.getElementById('preview-cvs');
  if (previewCvs) {
    var previewCtx = previewCvs.getContext("2d");
  }
  var previewCvsBack = document.getElementById('preview-cvs-back');
  if (previewCvsBack) {
    var previewCtxBack = previewCvsBack.getContext("2d");
  }

  var canvas2 = document.createElement("canvas")
  var cxt2 = canvas2.getContext("2d")
  var temImg, temImgBack;
  // 实时预览上传图效果
  function drawPic() {
    // console.log(oMark.offsetLeft, cutImgCvs.getBoundingClientRect().left)
    // var srcX = oMark.offsetLeft-cutImgCvs.getBoundingClientRect().left;
    var srcX = oMark.offsetLeft - 10;
    var srcY = oMark.offsetTop - 10;
    // var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
    var sWidth = oMark.offsetWidth;
    var sHeight = oMark.offsetHeight;
    // console.log(srcX, srcY, sWidth, sHeight)
    var dataImg = cutImgCtx.getImageData(srcX, srcY, sWidth, sHeight);
    // console.log(dataImg);
    canvas2.width = sWidth;
    canvas2.height = sHeight;
    // console.log(canvas2.width, canvas2.height)
    cxt2.clearRect(0, 0, canvas2.width, canvas2.height);
    cxt2.putImageData(dataImg, 0, 0, 0, 0, canvas2.width, canvas2.height)
    var img2 = canvas2.toDataURL("image/png");
    // console.log(img2);
    // cxt3.putImageData(dataImg,0,0,0,0,canvas3.width,canvas3.height)
    // previewCtx.putImageData(dataImg,0,0,posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3])
    temImg = new Image();
    temImg.src = img2;
    $scope.imgData = img2;
    bigCvsArr = [];
    var bigCvsBili = imgW / imgfinW;
    bigCvsArr.push(((oMark.offsetLeft - criticalVal1) * bigCvsBili).toFixed(0), ((oMark.offsetTop - criticalVal3) * bigCvsBili).toFixed(0), (sWidth * bigCvsBili).toFixed(0), (sHeight * bigCvsBili).toFixed(0));
    console.log(bigCvsArr);
    var dataImgBig = bigCxt.getImageData(bigCvsArr[0], bigCvsArr[1], bigCvsArr[2], bigCvsArr[3]);

    upimgResFrontCvs.width = bigCvsArr[2];
    upimgResFrontCvs.height = bigCvsArr[3];
    upimgResFrontCxs.clearRect(0, 0, upimgResFrontCvs.width, upimgResFrontCvs.height);
    upimgResFrontCxs.putImageData(dataImgBig, 0, 0, 0, 0, upimgResFrontCvs.width, upimgResFrontCvs.height)
    $scope.imgDataBig = upimgResFrontCvs.toDataURL("image/png");

    temImg.onload = function () {
      previewCtx.clearRect(0, 0, mobanWidth, mobanHeight);
      previewCtx.putImageData(imgDataResultFront, 0, 0, 0, 0, previewCvs.width, previewCvs.height);
      // return
      previewCtx.drawImage(temImg, $scope.posiArrFront[0], $scope.posiArrFront[1], $scope.posiArrFront[2], $scope.posiArrFront[3])
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      koutu(imgDataResultFrontKou, emptyIndexArrFront);
      downloadedImg.src = $scope.currentImgB64;
      // if ($scope.podColor) {
      //     koutu(imgDataResultFront, emptyIndexArrFront);
      //     downloadedImg.src = $scope.currentImgB64; 
      // } else {
      //     downloadedImg.src = $scope.podZone.front.editimgurl + '?time=' + new Date().getTime(); 
      // }
      // downloadedImg.src = $scope.currentImg;
      function imageReceived() {
        // console.log(this);
        previewCtx.drawImage(this, 0, 0, mobanWidth, mobanHeight);
        // frontCtx.fillStyle = "rgba(0,255,0,0.2)";
        // frontCtx.fillRect(posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3]);
      }
    }
  }
  var upimgResBackCvs = document.getElementById('upimg-res-back');
  var upimgResBackCxs = upimgResBackCvs.getContext("2d");
  function drawPicBack() {
    // console.log(oMarkBack.offsetLeft, cutImgCvs.getBoundingClientRect().left)
    // var srcX = oMarkBack.offsetLeft-cutImgCvs.getBoundingClientRect().left;
    var srcX = oMarkBack.offsetLeft - 10;
    var srcY = oMarkBack.offsetTop - 10;
    // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
    var sWidth = oMarkBack.offsetWidth;
    var sHeight = oMarkBack.offsetHeight;
    // console.log(srcX, srcY, sWidth, sHeight)
    var dataImg = cutImgCtxBack.getImageData(srcX, srcY, sWidth, sHeight);
    // console.log(dataImg);
    canvas2.width = sWidth;
    canvas2.height = sHeight;
    cxt2.putImageData(dataImg, 0, 0, 0, 0, canvas2.width, canvas2.height)
    var img2 = canvas2.toDataURL("image/png");
    // console.log(img2);
    // cxt3.putImageData(dataImg,0,0,0,0,canvas3.width,canvas3.height)
    // previewCtx.putImageData(dataImg,0,0,posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3])
    temImgBack = new Image();
    temImgBack.src = img2;
    $scope.imgDataBack = img2;
    bigCvsArrBack = [];
    var bigCvsBili = imgWBack / imgfinWBack;
    bigCvsArrBack.push(((oMarkBack.offsetLeft - criticalVal1Back) * bigCvsBili).toFixed(0), ((oMarkBack.offsetTop - criticalVal3Back) * bigCvsBili).toFixed(0), (sWidth * bigCvsBili).toFixed(0), (sHeight * bigCvsBili).toFixed(0));
    // console.log(bigCvsArrBack);
    var dataImgBig = bigCxtBack.getImageData(bigCvsArrBack[0], bigCvsArrBack[1], bigCvsArrBack[2], bigCvsArrBack[3]);
    upimgResBackCvs.width = bigCvsArrBack[2];
    upimgResBackCvs.height = bigCvsArrBack[3];
    upimgResBackCxs.clearRect(0, 0, upimgResBackCvs.width, upimgResBackCvs.height);
    upimgResBackCxs.putImageData(dataImgBig, 0, 0, 0, 0, upimgResBackCvs.width, upimgResBackCvs.height)
    $scope.imgDataBigBack = upimgResBackCvs.toDataURL("image/png");
    temImgBack.onload = function () {
      previewCtxBack.clearRect(0, 0, mobanWidth, mobanHeight);
      previewCtxBack.putImageData(imgDataResultBack, 0, 0, 0, 0, previewCvsBack.width, previewCvsBack.height);
      previewCtxBack.drawImage(temImgBack, $scope.posiArrBack[0], $scope.posiArrBack[1], $scope.posiArrBack[2], $scope.posiArrBack[3])
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      koutuBack(imgDataResultBackKou, emptyIndexArrBack);
      downloadedImg.src = $scope.currentImgB64Back;
      // if ($scope.podColor) {
      //     koutuBack(imgDataResultBack, emptyIndexArrBack);
      //     downloadedImg.src = $scope.currentImgB64Back;
      // } else {
      //     downloadedImg.src = $scope.podZone.back.editimgurl + '?time=' + new Date().getTime(); 
      // }
      // downloadedImg.src = $scope.currentImgBack;
      function imageReceived() {
        // console.log(this);
        previewCtxBack.drawImage(this, 0, 0, mobanWidth, mobanHeight);
        // frontCtx.fillStyle = "rgba(0,255,0,0.2)";
        // frontCtx.fillRect(posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3]);
      }
    }
  }

  // var d_box = document.getElementById("d_box");//盒子

  //需求：鼠标在拖动条上按下 可以拖拽 鼠标移动的时候 让d_box跟着鼠标移动


  $scope.editImg = function () {
    if ($scope.showBack) {
      $scope.upLoadImgBack = true;
    } else {
      $scope.upLoadImg = true;
    }
  }
  $scope.deleteImg = function () {
    if ($scope.showBack) {
      $scope.upLoadImgBack = false;
      $scope.imgDataBack = null;
      temImgBack = null;
      $scope.imgDataBigBack = null;
      backpodimagename = null;
      drawBack();
    } else {
      $scope.upLoadImg = false;
      $scope.imgData = null;
      temImg = null;
      $scope.imgDataBig = null;
      frontpodimagename = null;
      drawFront();
    }
  }
  $scope.checkImg = function () {
    if ($scope.showBack) {
      $scope.upLoadImgBack = false;
      // koutu(imgDataResultBack, emptyIndexArrBack);
      drawBack();
      uploadImgs('22');
    } else {
      $scope.upLoadImg = false;
      // koutu(imgDataResultFront, emptyIndexArrFront);
      drawFront();
      // 书签start 0
      // imgDataUrlFront = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20190425/108816719965.png';
      // writeFrontInfo();
      // return
      // 书签end 0
      uploadImgs('11'); 
    }
  }

  // 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180912/7859708552621.png'
  // 绘制最终效果图
  function drawBack() {
    backCtx.clearRect(0, 0, mobanWidth, mobanHeight);
    if ($scope.podColor) {
      changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor), 0);
    }
    backCtx.putImageData(imgDataResultBack, 0, 0, 0, 0, backCvs.width, backCvs.height);
    if (temImgBack) {
      koutuBack(imgDataResultBackKou, emptyIndexArrBack);
      backCtx.drawImage(temImgBack, $scope.posiArrBack[0], $scope.posiArrBack[1], $scope.posiArrBack[2], $scope.posiArrBack[3]);
    }
    downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = $scope.currentImgB64Back;
    // if ($scope.podColor) {
    //    downloadedImg.src = $scope.currentImgB64Back; 
    // } else {
    //     downloadedImg.src = $scope.podZone.back.editimgurl + '?time=' + new Date().getTime(); 
    // }
    function imageReceived() {
      // console.log(this);
      backCtx.drawImage(this, 0, 0, mobanWidth, mobanHeight);
      // console.log($scope.printValBack);
      if ($scope.printValBack) {
        var posiX = $scope.posiArrBack[0] + ($scope.posiArrBack[2]) / 2;
        var posiY = $scope.posiArrBack[1] + ($scope.posiArrBack[3]) / 2;
        var printVal = $scope.printValBack.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
        var printArr = printVal.split('<br/>');
        var len = printArr.length;
        for (var i = 0; i < len; i++) {
          backCtx.font = 'normal ' + $scope.backFontItem.size + ' ' + $scope.fontNameBack;
          backCtx.textAlign = 'center';
          backCtx.textBaseline = 'middle';
          backCtx.fillStyle = $scope.backColorValue;
          // backCtx.strokeText("Hello Canvas", 150, 100);
          // backCtx.fillText('', posiArrBack[0], posiArrBack[1],posiArrBack[2]);
          // console.log($scope.posiArrBack[0], $scope.posiArrBack[1], $scope.posiArrBack[2])
          backCtx.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, $scope.posiArrBack[2]);
          // console.log(i, posiY - (len - 1) * 12 + 24 * i)
        }
      }
      // backCtx.fillStyle = "rgba(0,255,0,0.2)";
      // backCtx.fillRect(posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3]);
      // put数据
      // contextResultBack.putImageData(imgDataResultBack, 0, 0);
    }
  }
  function drawFront() {
    frontCtx.clearRect(0, 0, mobanWidth, mobanHeight);
    if ($scope.podColor) {
      changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor), 1);
    }
    frontCtx.putImageData(imgDataResultFront, 0, 0, 0, 0, frontCvs.width, frontCvs.height);
    if (temImg) {
      koutu(imgDataResultFrontKou, emptyIndexArrFront);
      frontCtx.drawImage(temImg, $scope.posiArrFront[0], $scope.posiArrFront[1], $scope.posiArrFront[2], $scope.posiArrFront[3]);
    }
    // console.log($scope.currentImgB64)

    var img;
    img = new Image();
    img.src = $scope.currentImgB64;
    // if ($scope.podColor) {
    //     img.src = $scope.currentImgB64;
    // } else {
    //     img.src = $scope.podZone.front.editimgurl + '?time=' + new Date().getTime();
    // }

    // $scope.imgData = img2;
    img.onload = function () {
      frontCtx.drawImage(img, 0, 0, mobanWidth, mobanHeight);
      if ($scope.printVal) {
        var posiX = $scope.posiArrFront[0] + ($scope.posiArrFront[2]) / 2;
        var posiY = $scope.posiArrFront[1] + ($scope.posiArrFront[3]) / 2;
        // console.log(posiY);
        var printVal = $scope.printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
        var printArr = printVal.split('<br/>');
        var len = printArr.length;
        for (var i = 0; i < len; i++) {
          frontCtx.font = 'normal ' + $scope.frontFontItem.size + ' ' + $scope.fontName;
          frontCtx.textAlign = 'center';
          frontCtx.textBaseline = 'middle';
          frontCtx.fillStyle = $scope.frontColorValue;
          // frontCtx.strokeText("Hello Canvas", 150, 100);
          // frontCtx.fillText('', posiArrFront[0], posiArrFront[1],posiArrFront[2]);
          // console.log($scope.posiArrFront[0], $scope.posiArrFront[1],$scope.posiArrFront[2])
          if ($scope.phone) {
            frontCtx.fillText(printArr[i], posiX, posiY - (len - 1) * 8 + 16 * i, $scope.posiArrFront[2]);
          } else {
            frontCtx.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, $scope.posiArrFront[2]);
          }
          // console.log(i, posiY-(len-1)*12+24*i)
        }
      }
    }
  }

  // turnBase64ToUrl(upimgResFrontCvs, function (data) {
  //     console.log(data);
  // });

  // turnBase64ToUrl(upimgResBackCvs, function (data) {
  //     console.log(data);
  // });


  $scope.cancel = function () {
    console.log('cancle')
    // $scope.printProFlag = false;
    // frontCtx.clearRect(0, 0, mobanWidth, mobanHeight);
    // backCtx.clearRect(0, 0, mobanWidth, mobanHeight);
    // $scope.podColor = null;
    // $scope.printItemName = null;
    // $scope.varientArr = null;
    // $scope.choseVariantFlag = false;
    // $scope.upLoadImg = false;
    // $scope.imgData = null;
    // temImg = null;
    // $scope.upLoadImgBack = false;
    // $scope.imgDataBack = null;
    // temImgBack = null;
    window.parent.postMessage({
      flag: 'closeFromCJ',
      data: ''
    }, "*");
  }

  $scope.imgTest = [];


});
