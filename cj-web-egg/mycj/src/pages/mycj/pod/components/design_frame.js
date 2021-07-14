import template from './design_frame.html';

/**
 * 暂时没有用到
 */
export function designFrameComponent(module) {

  module.component('designFrame', {
    template,
    controller: ['$scope', 'dsp', function ($scope, dsp) {
      this.$onInit = function () {
        if (typeof wangEditor === 'undefined') {
          window.addEventListener('load-script', ev => {
            if (ev.detail.name === 'wangEditor.min.js') {
              designFrameCtrl.call(this, $scope, dsp);
            }
          })
        } else {
          designFrameCtrl.call(this, $scope, dsp);
        }
      };
    }],
    bindings: {
      parentctrl: '=',
      onLog: '&'
    },
  });

  function designFrameCtrl($scope, dsp) {
    var that = this;
    var editor = new wangEditor('editor-desc');
    editor.config.menus = [
      // '|',     // '|' 是菜单组的分割线
      'fontsize',
      'bold',
      'italic',
      'underline',
      'alignleft',
      'aligncenter',
      'alignright',
      'forecolor',
      'link',
    ];
    editor.config.lang = wangEditor.langs['en'];
    editor.create();

    var currentMerch;
    $scope.$on('showdesignframe', function (d, data) {
      console.log(data);         //子级能得到值  
      $scope.printProFlag = true;
      if (that.parentctrl == 'designlist') {//mycjdesign进入
        if (!Array.isArray(JSON.parse(data.customMessage))) {
          dataInit(data);
        }
      } else {
        dsp.postFun('cj/locProduct/huoQuShangPinXiangQing', JSON.stringify({
          // item.id
          id: data,
          token: ''
        }), function (data) {
          currentMerch = data.data.result;
          dataInit(currentMerch);
        });
      }

    });
    function dataInit(currentMerch) {
      //获取物流方式
      var getWayData = {}
      getWayData.weight = currentMerch.PACKWEIGHT;
      getWayData.lcharacter = currentMerch.PROPERTYKEY;
      dsp.postFun2('getWayBy.json', JSON.stringify(getWayData), function (n) {
        $scope.wuliulist = n.data;
        getWuliuRes = 'success';
      }, function (error) {
        console.log('物流error', error);
        getWuliuRes = 'error';
      });
      $scope.printItemName = currentMerch.NAMEEN;
      $scope.stanProducts = currentMerch.stanProducts;
      $scope.varientArr = [];
      $scope.varientKeys = [];
      if (currentMerch.VARIANTKEYEN != '') {
        $scope.varientKeys = currentMerch.VARIANTKEYEN.split('-');
        for (var i = 0; i < $scope.varientKeys.length; i++) {
          $scope.varientArr.push({
            name: $scope.varientKeys[i],
            key: [],
            checkAll: false
          });
        }
        for (var i = 0; i < $scope.stanProducts.length; i++) {
          if ($scope.stanProducts[i].VARIANTKEY != null) {
            var curVarientVal = $scope.stanProducts[i].VARIANTKEY.split('-');
            for (var j = 0; j < curVarientVal.length; j++) {
              $scope.varientArr[j].key.push({
                val: curVarientVal[j],
                check: false
              });
            }
          }
          oriSkuMap[$scope.stanProducts[i].VARIANTKEY] = $scope.stanProducts[i];
        }
        console.log(oriSkuMap);
        for (var i = 0; i < $scope.varientArr.length; i++) {
          var temArr = []
          for (var j = 0; j < $scope.varientArr[i].key.length; j++) {
            console.log($scope.varientArr[i].key[j].val)
            if (temArr.indexOf($scope.varientArr[i].key[j].val) == -1) {
              temArr.push($scope.varientArr[i].key[j].val);
            }
          }
          console.log(temArr);
          $scope.varientArr[i].key = [];
          for (var k = 0; k < temArr.length; k++) {
            $scope.varientArr[i].key.push({
              val: temArr[k],
              check: false
            });
          }
        }
      } else {
        $scope.varientArr = [];
        oriSkuMap[$scope.stanProducts[0].VARIANTKEY] = $scope.stanProducts[0];
        console.log(oriSkuMap);
      }
      if ($scope.varientArr.length == 1 && $scope.varientArr[0].key.length == 0) {
        $scope.varientArr = [];
      }
      console.log($scope.varientArr);
      $scope.varientKeysInner = [];
      for (var i = 0; i < $scope.stanProducts.length; i++) {
        $scope.varientKeysInner.push($scope.stanProducts[i].VARIANTKEY);
        if ($scope.stanProducts[i].sellDiscount != null && $scope.stanProducts[i].sellDiscount < 100) {
          $scope.stanProducts[i].SELLPRICEDIS = ($scope.stanProducts[i].SELLPRICE * $scope.stanProducts[i].sellDiscount / 100).toFixed(2);
        } else {
          $scope.stanProducts[i].SELLPRICEDIS = $scope.stanProducts[i].SELLPRICE;
        }
      }
      console.log($scope.varientKeysInner);
      var customMessage = currentMerch.customMessage;
      // 删除
      if (customMessage) {
        $scope.podProduct = true;
        customMessage = JSON.parse(customMessage);
        console.log('customMessage', customMessage);
        $scope.podColor = customMessage.color;
        $scope.canvasImgSrc = $scope.stanProducts[0].IMG;
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
          $scope.podColorVal = $scope.podColor.colors[0].value;
        }
        $scope.podZone = customMessage.zone;
      }
      $scope.currentImg = $scope.podZone.front.showimgurl;
      $scope.frontShowImgSrc = $scope.podZone.front.showimgurl;
      if ($scope.podZone.back) {
        $scope.currentImgBack = $scope.podZone.back.showimgurl;
        $scope.backShowImgSrc = $scope.podZone.back.showimgurl;
      }


      $scope.frontPodType = $scope.podZone.front.podtype;

      if ($scope.backShowImgSrc) {
        $scope.editBack = true;
        $scope.backPodType = $scope.podZone.back.podtype;
      }
      layer.load(2, {
        shade: 0
      });
      if ($scope.podZone.front.showimgurl) {
        getPixels2(1, function () {
          getPosiInfo(1, function () {
            drawFront();
            if ($scope.editBack) {
              if ($scope.backShowImgSrc) {
                getPixels2(0, function () {
                  getPosiInfo(0, function () {
                    drawBack();
                    layer.closeAll('loading');
                  });
                });
              } else {
                getPosiInfo(0, function () {
                  drawBack();
                  layer.closeAll('loading');
                });
              }
            } else {
              layer.closeAll('loading');
            }
          });
        })
      } else {
        getPosiInfo(1, function () {
          drawFront();
          if ($scope.editBack) {
            if ($scope.backShowImgSrc) {
              getPixels2(0, function () {
                getPosiInfo(0, function () {
                  drawBack();
                  layer.closeAll('loading');
                });
              });
            } else {
              getPosiInfo(0, function () {
                drawBack();
                layer.closeAll('loading');
              });
            }
          } else {
            layer.closeAll('loading');
          }
        });
      }

      // 初始化编辑器的内容
      editor.$txt.html(currentMerch.DESCRIPTION || '');
    }


    var mobanWidth = 400;
    var mobanHeight = 400;

    // $scope.printItemName = 'Men’s Cotton Crew Tee';
    $scope.saveProName = function (event) {
      if (event.keyCode == 13) {
        $scope.editProName = false;
      }
    }

    var currentColorXs;
    // var needChanColor;
    $scope.chanPodColor = function () {
      canvasChanColor = $scope.podColorVal;
      // changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor));
      // changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor));
      // if (temImg) {
      //   koutu(imgDataResultFront, emptyIndexArrFront);
      // }
      drawFront();
      if ($scope.editBack) {
        drawBack();
      }

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
            // imgDataResultFront.data[index] = 0;
            // imgDataResultFront.data[index + 1] = 0;
            // imgDataResultFront.data[index + 2] = 0;
            // imgDataResultFront.data[index + 3] = 0;
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

    var imgDataOri, imgDataOriBack, imgDataResultFront, imgDataResultBack;
    var imgDataResultFrontKou, imgDataResultBackKou;
    function getPixels2(flag, callback) {
      if (flag) {
        var canvasTem = document.createElement("canvas")
        var cxtTem = canvasTem.getContext("2d")
        downloadedImg = new Image;
        // downloadedImg.crossOrigin = "Anonymous";
        downloadedImg.setAttribute('crossorigin', 'anonymous');
        downloadedImg.addEventListener("load", imageReceived, false);
        downloadedImg.src = $scope.frontShowImgSrc + '?time=' + new Date().getTime();
        function imageReceived() {
          if (this.width / this.height > 1) {
            mobanWidth = 500;
            mobanHeight = Math.floor(this.height / this.width * mobanWidth);
          } else {
            mobanHeight = 500;
            mobanWidth = Math.floor(this.width / this.height * mobanHeight);
          }
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
          $('.img-cvs-wrap').height(mobanHeight);
          // console.dir(this);
          // quseContext.clearRect(0, 0,250,250);
          // quseContext.drawImage(this, 0, 0,250,250);
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
        downloadedImg.src = $scope.backShowImgSrc + '?time=' + new Date().getTime();
        function imageReceived() {
          if (this.width / this.height > 1) {
            mobanWidth = 500;
            mobanHeight = Math.floor(this.height / this.width * mobanWidth);
          } else {
            mobanHeight = 500;
            mobanWidth = Math.floor(this.width / this.height * mobanHeight);
          }
          // canvasTem.width = mobanWidth;
          // canvasTem.height = mobanHeight;
          // previewCvs.width = mobanWidth;
          // previewCvs.height = mobanHeight;
          // previewCvsBack.width = mobanWidth;
          // previewCvsBack.height = mobanHeight;
          // frontCvs.width = mobanWidth;
          // frontCvs.height = mobanHeight;
          // backCvs.width = mobanWidth;
          // backCvs.height = mobanHeight;
          // console.log(this);
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

    // $scope.chanVariant = function (val,index) {
    //     console.log(val)
    //     var filterKeysOne = [];
    //     for (var i = 0; i < $scope.varientKeysInner.length; i++) {
    //         var curVarKey = $scope.varientKeysInner[i].split('-');
    //         if (curVarKey[index] == val) {
    //             filterKeysOne.push(curVarKey);
    //         }
    //     }
    //     for (var i = 0; i < $scope.varientArr.length; i++) {
    //         if (i == index) continue;
    //         var canbeTwo = [];
    //         for (var j = 0; j < filterKeysOne.length; j++) {
    //             canbeTwo.push(filterKeysOne[j][i]);
    //         }
    //         var OtherSel1 = $scope.varientArr[i].val;
    //         var isInTwo = $.inArray(OtherSel1, canbeTwo);
    //         if (isInTwo == -1) {
    //             $scope.varientArr[i].val = canbeTwo[0];
    //         }
    //         var filterKeysTwo = [];
    //         var curValTwo = $scope.varientArr[i].val;
    //         for (var k = 0; k < filterKeysOne.length; k++) {
    //             if (filterKeysOne[k][i] == curValTwo) {
    //                 filterKeysTwo.push(filterKeysOne[k]);
    //             }
    //         }
    //         filterKeysOne = filterKeysTwo;
    //     }
    //     getTheVitem();
    // }
    // function getTheVitem () {
    //     if ($scope.varientArr.length == 0) {
    //         $scope.variantItem = $scope.stanProducts[0];
    //     } else {
    //         var curVarKeyArr = [];
    //         for (var i = 0; i < $scope.varientArr.length; i++) {
    //             curVarKeyArr.push($scope.varientArr[i].val);
    //         }
    //         $scope.curVarientKey = curVarKeyArr.join('-');
    //         var curVarientIndex = dsp.findIndexByKey($scope.stanProducts, 'VARIANTKEY',$scope.curVarientKey);
    //         $scope.variantItem = $scope.stanProducts[curVarientIndex];
    //     }
    //     // currentMerch = $scope.variantItem;
    //     console.log($scope.variantItem);
    // }

    var canvasBasicColor, canvasChanColor;
    var colorSubmit;
    var currentMerch;
    var oriSkuMap = {};
    var dssignIndex;
    //切换物流方式
    var getWuliuRes;
    $scope.getwuliuway = function () {
      $scope.remark = $scope.wuliuway ? $scope.wuliuway.remark : '';
    }

    $scope.choseVariant = function () {
      $scope.printProFlag = false;
      $scope.choseVariantFlag = true;
    }

    $scope.checkAll = function (index) {
      for (var i = 0; i < $scope.varientArr[index].key.length; i++) {
        $scope.varientArr[index].key[i].check = $scope.varientArr[index].checkAll;
      }
    }
    $scope.checkOne = function (item2, index) {
      console.log(item2)
      if (item2.check) {
        var num = 0;
        for (var i = 0; i < $scope.varientArr[index].key.length; i++) {
          if ($scope.varientArr[index].key[i].check) {
            num++;
          }
        }
        console.log(num)
        if (num == $scope.varientArr[index].key.length) {
          $scope.varientArr[index].checkAll = true;
        }
      } else {
        $scope.varientArr[index].checkAll = false;
      }
    }

    $scope.checkColor = function (flag, item) {
      if (flag == 'all') {
        for (var i = 0; i < $scope.podColor.colors.length; i++) {
          $scope.podColor.colors[i].check = $scope.checkAllColor;
        }
      }
      if (flag == 'one') {
        if (item.check) {
          var num = 0;
          for (var i = 0; i < $scope.podColor.colors.length; i++) {
            if ($scope.podColor.colors[i].check) {
              num++;
            }
          }
          console.log(num)
          if (num == $scope.podColor.colors.length) {
            $scope.checkAllColor = true;
          }
        } else {
          $scope.checkAllColor = false;
        }
      }
    }


    $scope.posiArrFront = [];
    $scope.posiArrBack = [];
    var canvasPosi = document.createElement("canvas")
    var cxtPosi = canvasPosi.getContext("2d");
    var emptyIndexArrFront, emptyIndexArrBack;
    var editWFront, editHFront, editZoneBiliFront, editWBack, editHBack, editZoneBiliBack;
    var maxLineNumFront, maxLineNumBack;
    function getPosiInfo(flag1, callback) {
      // flag 1-正面 0-背面
      var r, g, b, a, xMax, xMin, yMax, yMin;
      var imgsrc, temXs, temCtx;
      var temPosiArr = [];
      var emptyIndexArr = [];
      if (flag1) {
        imgsrc = $scope.podZone.front.editimgurl;
        // temPosiArr = posiArrFront;
      } else {
        imgsrc = $scope.podZone.back.editimgurl;
        // temPosiArr = posiArrBack;
      }
      temCtx = cxtPosi;
      // console.log(temCtx)
      downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = imgsrc + '?time=' + new Date().getTime();
      function imageReceived() {
        // console.log(this);
        if (this.width / this.height > 1) {
          mobanWidth = 500;
          mobanHeight = Math.floor(this.height / this.width * mobanWidth);
        } else {
          mobanHeight = 500;
          mobanWidth = Math.floor(this.width / this.height * mobanHeight);
        }
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
        console.log(temPosiArr);
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
        //     layer.msg(maxLineNumBack + ' rows allowed at most.');
        //     // e.preventDefault();
        //     return
        // }
        drawBack();
      } else {
        var printVal = $scope.printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
        // var printArr = printVal.split('<br/>');
        // var len = printArr.length;
        // if (len > maxLineNumFront) {
        //     layer.msg(maxLineNumFront + ' rows allowed at most.');
        //     e.preventDefault();
        //     return
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
      if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
        oMark.style.width = temWidth + "px";
        oMark.style.height = temHeight + "px";
        drawPic();
      }
    }
    document.getElementById("mark-resize-small").onclick = function () {
      var srcX = oMark.offsetLeft;
      var srcY = oMark.offsetTop;
      var sWidth = oMark.offsetWidth;
      var sHeight = oMark.offsetHeight;
      var temWidth = sWidth * 0.9;
      var temHeight = sHeight * 0.9;
      console.log(temWidth, temHeight)
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
          if (srcX >= criticalVal1 && srcX + sWidth <= criticalVal2 && srcY >= criticalVal3 && srcY + sHeight <= criticalVal4) {
            var event = event || window.event;
            //获取鼠标在页面上的位置
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
            // console.log(pageX,pageY)
            //让mark跟着鼠标移动
            oMark.style.left = pageX - boxX + "px";
            oMark.style.top = pageY - boxY + "px";
            //清除选中文字
          }

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
          if (srcX < criticalVal1) {
            oMark.style.left = criticalVal1 + "px";
          }
          if (srcX + sWidth > criticalVal2) {
            oMark.style.left = criticalVal2 - sWidth + "px";
          }
          if (srcY < criticalVal3) {
            oMark.style.top = criticalVal3 + "px";
          }
          if (srcY + sHeight > criticalVal4) {
            oMark.style.top = criticalVal4 - sHeight + "px";
          }
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
      if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
        oMarkBack.style.width = temWidth + "px";
        oMarkBack.style.height = temHeight + "px";
        drawPicBack();
      }
    }
    document.getElementById("mark-back-resize-small").onclick = function () {
      var srcX = oMarkBack.offsetLeft;
      var srcY = oMarkBack.offsetTop;
      var sWidth = oMarkBack.offsetWidth;
      var sHeight = oMarkBack.offsetHeight;
      var temWidth = sWidth * 0.9;
      var temHeight = sHeight * 0.9;
      console.log(temWidth, temHeight)
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
          if (srcX >= criticalVal1Back && srcX + sWidth <= criticalVal2Back && srcY >= criticalVal3Back && srcY + sHeight <= criticalVal4Back) {
            var event = event || window.event;
            //获取鼠标在页面上的位置
            var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
            var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
            //让oMarkBack跟着鼠标移动
            oMarkBack.style.left = pageX - boxX + "px";
            oMarkBack.style.top = pageY - boxY + "px";
            //清除选中文字
          }

        };
        //鼠标弹起 盒子就不应该跟着了
        document.onmouseup = function () {
          var srcX = oMarkBack.offsetLeft;
          var srcY = oMarkBack.offsetTop;
          // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
          var sWidth = oMarkBack.offsetWidth;
          var sHeight = oMarkBack.offsetHeight;
          if (srcX < criticalVal1Back) {
            oMarkBack.style.left = criticalVal1Back + "px";
          }
          if (srcX + sWidth > criticalVal2Back) {
            oMarkBack.style.left = criticalVal2Back - sWidth + "px";
          }
          if (srcY < criticalVal3Back) {
            oMarkBack.style.top = criticalVal3Back + "px";
          }
          if (srcY + sHeight > criticalVal4Back) {
            oMarkBack.style.top = criticalVal4Back - sHeight + "px";
          }
          document.onmousemove = null;
          if (markMouse) {
            drawPicBack();
            markMouse = false;
          }
          document.onmouseup = null;
        };
      };
    }


    // $('#asj-design-cart').height(rightBarHeight+60);
    var frontCvs = document.getElementById('preview-front-cvs');
    var frontCtx = frontCvs.getContext("2d");

    var backCvs = document.getElementById('preview-back-cvs');
    var backCtx = backCvs.getContext("2d");

    var downloadedImg;


    var inputObj2 = document.createElement('input');
    inputObj2.addEventListener('input', readFile2, false);
    inputObj2.type = 'file';
    inputObj2.accept = 'image/*';
    inputObj2.id = 'inp-pic2';
    // inputObj2.click();
    function readFile2() {
      var file = this.files[0];//获取input输入的图片
      console.log(file);
      if (!/image\/\w+/.test(file.type)) {
        layer.msg("Please make sure the file type is an image.");
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
            $scope.$apply();
            drawToCanvasBack(result);
          } else {
            layer.msg('To ensure the high-quality print, please upload images size larger than 1000*1000.', {
              time: 4000 //2秒关闭（如果不配置，默认是3秒）
            });
            inputObj2.value = '';
          }
        };
        image.src = this.result;
        // drawToCanvasBack(this.result);
      }
    }
    var inputObj1 = document.createElement('input');
    inputObj1.addEventListener('change', readFile1, false);
    inputObj1.type = 'file';
    inputObj1.accept = 'image/*';
    inputObj1.id = 'inp-pic1';
    function readFile1() {
      var file = this.files[0];//获取input输入的图片
      console.log('读取文件 ->', file);
      if (!/image\/\w+/.test(file.type)) {
        layer.msg("Please make sure the file type is an image.");
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
            $scope.$apply();
            drawToCanvas(result);
          } else {
            layer.msg('To ensure the high-quality print, please upload images size larger than 1000*1000.', {
              time: 4000 //2秒关闭（如果不配置，默认是3秒）
            });
            inputObj1.value = '';
          }
        };
        image.src = this.result; // 显示上传图片
        // drawToCanvas(result);
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
    function drawToCanvas(imgData) {
      var img = new Image;
      img.src = imgData;
      $scope.$apply();
      img.onload = function () {//必须onload之后再画
        // console.log(img);
        imgW = img.width;
        imgH = img.height;
        bigCvs.width = imgW;
        bigCvs.height = imgH;
        var bili, posiX, posiY;
        var markW, markH;
        if (imgW / imgH < 1) {
          if (imgH > 400) {
            imgfinH = 400;
          } else {
            imgfinH = imgH;
          }
          bili = imgfinH / imgH;
          imgfinW = imgW * bili;
          // markW = Math.floor(imgfinW * 0.8);
          var bili2 = editHFront / editWFront;
          if (bili2 < 1) {
            if (imgfinW > 400) {
              markW = 400;
            } else {
              markW = imgfinW;
            }
            markH = markW * bili2;
          } else {
            if (imgfinH > 400) {
              markH = 400;
            } else {
              markH = imgfinH;
            }
            markW = markH * (1 / bili2);
          }
          // markH = Math.floor(editHFront / editWFront * markW);
          criticalVal1 = Math.floor((420 - imgfinW) / 2); // left
          criticalVal2 = Math.floor((420 - imgfinW) / 2 + imgfinW); // left+width
          criticalVal3 = 10; // top
          criticalVal4 = 410; // top+height
        } else {
          if (imgW > 400) {
            imgfinW = 400;
          } else {
            imgfinW = imgW;
          }
          bili = imgfinW / imgW;
          imgfinH = imgH * bili;
          // markH = Math.floor(imgfinH * 0.8);
          // markW = Math.floor(editWFront / editHFront * markH);
          var bili2 = editHFront / editWFront;
          if (bili2 < 1) {
            if (imgfinW > 400) {
              markW = 400;
            } else {
              markW = imgfinW;
            }
            markH = markW * bili2;
          } else {
            if (imgfinH > 400) {
              markH = 400;
            } else {
              markH = imgfinH;
            }
            markW = markH * (1 / bili2);
          }
          criticalVal1 = 10; // left
          criticalVal2 = 410; // left+width
          criticalVal3 = Math.floor((420 - imgfinH) / 2); // top
          criticalVal4 = Math.floor((420 - imgfinH) / 2 + imgfinH); // top+height
        }
        posiX = (400 - imgfinW) / 2;
        posiY = (400 - imgfinH) / 2;
        cutImgCtx.clearRect(0, 0, 400, 400);
        cutImgCtx.drawImage(img, posiX, posiY, imgfinW, imgfinH);
        bigCxt.clearRect(0, 0, imgW, imgH);
        bigCxt.drawImage(img, 0, 0, imgW, imgH);
        // oMark.style.width = $scope.posiArrFront[2] * 2+'px';
        // oMark.style.height = $scope.posiArrFront[3] * 2+'px';
        // oMark.style.left = Math.floor((400-$scope.posiArrFront[2])/2)+'px';
        // oMark.style.top = Math.floor((400-$scope.posiArrFront[3])/2)+'px';
        oMark.style.width = markW + 'px';
        oMark.style.height = markH + 'px';
        oMark.style.left = Math.floor((420 - markW) / 2) + 'px';
        oMark.style.top = Math.floor((420 - markH) / 2) + 'px';
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
          if (imgHBack > 400) {
            imgfinHBack = 400;
          } else {
            imgfinHBack = imgHBack;
          }
          bili = imgfinHBack / imgHBack;
          imgfinWBack = imgWBack * bili;
          // markW = Math.floor(imgfinWBack * 0.8);
          // markH = Math.floor(editHBack / editWBack * markW);
          var bili2 = editHBack / editWBack;
          if (bili2 < 1) {
            if (imgfinWBack > 400) {
              markW = 400;
            } else {
              markW = imgfinWBack;
            }
            markH = markW * bili2;
          } else {
            if (imgfinHBack > 400) {
              markH = 400;
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
          if (imgWBack > 400) {
            imgfinWBack = 400;
          } else {
            imgfinWBack = imgWBack;
          }
          bili = imgfinWBack / imgWBack;
          imgfinHBack = imgHBack * bili;
          // markH = Math.floor(imgfinHBack * 0.8);
          // markW = Math.floor(editWBack / editHBack * markH);
          var bili2 = editHBack / editWBack;
          if (bili2 < 1) {
            if (imgfinWBack > 400) {
              markW = 400;
            } else {
              markW = imgfinWBack;
            }
            markH = markW * bili2;
          } else {
            if (imgfinHBack > 400) {
              markH = 400;
            } else {
              markH = imgfinHBack;
            }
            markW = markH * (1 / bili2);
          }
          criticalVal1Back = 10; // left
          criticalVal2Back = 410; // left+width
          criticalVal3Back = Math.floor((420 - imgfinHBack) / 2); // top
          criticalVal4Back = Math.floor((420 - imgfinHBack) / 2 + imgfinHBack); // top+height
        }
        posiX = (400 - imgfinWBack) / 2;
        posiY = (400 - imgfinHBack) / 2;
        cutImgCtxBack.clearRect(0, 0, 400, 400);
        cutImgCtxBack.drawImage(img, posiX, posiY, imgfinWBack, imgfinHBack);
        bigCxtBack.clearRect(0, 0, imgWBack, imgWBack);
        bigCxtBack.drawImage(img, 0, 0, imgWBack, imgHBack);
        oMarkBack.style.width = markW + 'px';
        oMarkBack.style.height = markH + 'px';
        oMarkBack.style.left = Math.floor((420 - markW) / 2) + 'px';
        oMarkBack.style.top = Math.floor((420 - markH) / 2) + 'px';
        drawPicBack();
      }
    }

    // var cxt3=canvas3.getContext("2d")

    var upimgResFrontCvs = document.getElementById('upimg-res-front');
    var upimgResFrontCxs = upimgResFrontCvs.getContext("2d");

    var previewCvs = document.getElementById('preview-cvs');
    var previewCtx = previewCvs.getContext("2d");
    var previewCvsBack = document.getElementById('preview-cvs-back');
    var previewCtxBack = previewCvsBack.getContext("2d");

    var canvas2 = document.createElement("canvas")
    var cxt2 = canvas2.getContext("2d")
    var temImg, temImgBack;
    function drawPic() {
      console.log(oMark.offsetLeft, cutImgCvs.getBoundingClientRect().left)
      // var srcX = oMark.offsetLeft-cutImgCvs.getBoundingClientRect().left;
      var srcX = oMark.offsetLeft - 10;
      var srcY = oMark.offsetTop - 10;
      // var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
      var sWidth = oMark.offsetWidth;
      var sHeight = oMark.offsetHeight;
      console.log(srcX, srcY, sWidth, sHeight)
      var dataImg = cutImgCtx.getImageData(srcX, srcY, sWidth, sHeight);
      console.log(dataImg);
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
      console.log(oMarkBack.offsetLeft, cutImgCvs.getBoundingClientRect().left)
      // var srcX = oMarkBack.offsetLeft-cutImgCvs.getBoundingClientRect().left;
      var srcX = oMarkBack.offsetLeft - 10;
      var srcY = oMarkBack.offsetTop - 10;
      // var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
      var sWidth = oMarkBack.offsetWidth;
      var sHeight = oMarkBack.offsetHeight;
      console.log(srcX, srcY, sWidth, sHeight)
      var dataImg = cutImgCtxBack.getImageData(srcX, srcY, sWidth, sHeight);
      console.log(dataImg);
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
      console.log(bigCvsArrBack);
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
          console.log(this);
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
        drawBack();
      } else {
        $scope.upLoadImg = false;
        $scope.imgData = null;
        temImg = null;
        $scope.imgDataBig = null;
        drawFront();
      }
    }
    $scope.checkImg = function () {
      if ($scope.showBack) {
        $scope.upLoadImgBack = false;
        // koutu(imgDataResultBack, emptyIndexArrBack);
        drawBack();
      } else {
        $scope.upLoadImg = false;
        // koutu(imgDataResultFront, emptyIndexArrFront);
        drawFront();
      }
    }

    // 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180912/7859708552621.png'
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
            console.log($scope.posiArrBack[0], $scope.posiArrBack[1], $scope.posiArrBack[2])
            backCtx.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, $scope.posiArrBack[2]);
            console.log(i, posiY - (len - 1) * 12 + 24 * i)
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
            frontCtx.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, $scope.posiArrFront[2]);
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

    function turnBase64ToUrl(canvas, scb) {
      console.log(canvas)
      console.log(canvas.toBlob)
      if (canvas.toBlob) {
        canvas.toBlob(
          function (blob) {
            // Do something with the blob object,
            // e.g. creating a multipart form for file uploads:
            var formData = new FormData();
            formData.append('file', blob);
            blob.name = new Date().getTime() + '.png';
            console.log(blob);
            console.log(formData)
            var fileList = {};
            fileList.length = 1;
            fileList[0] = blob;
            dsp.ossUploadFile(fileList, function (data) {
              console.log(data);
              scb(data);
            })
            /* ... */
          },
          'image/png'
        );
      }
    }

    var finalCvsFront = document.getElementById('final-front');
    var finalCxtFront = finalCvsFront.getContext("2d");

    var finalCvsBack = document.getElementById('final-back');
    var finalCxtBack = finalCvsBack.getContext("2d");

    var loadLayer;
    $scope.submit = function () {
      if ($scope.podColor) {
        var checkColorArr = getCheckColors();
        if (checkColorArr.length == 0) {
          layer.msg('Please select at least one color!');
          return;
        }
      }
      if (!$scope.wuliuway) {
        layer.msg('Please select the shipping method.');
        return;
      }
      if ($scope.varientArr.length > 0) {
        var checkItemArr = getCheckItems();
        if (checkItemArr.length == 0) {
          layer.msg('Please select at least one variant!');
          return;
        }
      }

      // turnBase64ToUrl(upimgResFrontCvs, function (data) {
      //     console.log(data);
      // });
      // return
      // layer.load(2);
      loadLayer = layer.open({
        area: ['320px', '150px'],
        // time:1000,
        title: null,
        closeBtn: 0,
        btn: [],
        shadeClose: false,
        skin: 'loader-layer',
        shade: [0.01, '#000'],
        content: '<div><img style="display: block; margin: 0 auto;" src="./static/image/public-img/loading-2.gif" alt="" /><p style="text-align: center; font-size: 12px; margin-top: 10px;">Please wait patiently as this may take a little while.</p></div>'
      });
      getFrontImgs(1);
      var timer1 = setInterval(function () {
        if (fileListF.length == colorSubmit.length) {
          clearInterval(timer1);
          console.log(111);
          $scope.$apply();
          console.log(imgMap);
          if ($scope.editBack) {
            getFrontImgs(0);
            var timer2 = setInterval(function () {
              if (fileListB.length == colorSubmit.length) {
                clearInterval(timer2);
                console.log(222);
                $scope.$apply();
                upImgs();
              }
            }, 1000)
          } else {
            upImgs();
          }
        }
      }, 1000);
    }

    function upImgs() {
      var newArr = fileListB.concat(fileListF);
      var fileList = {};
      fileList.length = newArr.length;
      for (var i = 0; i < newArr.length; i++) {
        fileList[i] = newArr[i];
      }
      if (temImg && ($scope.frontPodType == 'pic' || $scope.frontPodType == 'picandtext')) {
        upimgResFrontCvs.toBlob(
          function (blob) {
            if (temImgBack && ($scope.backPodType == 'pic' || $scope.backPodType == 'picandtext')) {
              var nowTime = new Date().getTime();
              blob.name = nowTime + '.png';
              // console.log(blob);
              imgMap[nowTime] = 'asjupimg_front';
              fileList[fileList.length] = blob;
              fileList.length = fileList.length + 1;
              upimgResBackCvs.toBlob(
                function (blob) {
                  var nowTime = new Date().getTime();
                  blob.name = nowTime + '.png';
                  // console.log(blob);
                  imgMap[nowTime] = 'asjupimg_back';
                  fileList[fileList.length] = blob;
                  fileList.length = fileList.length + 1;
                  console.log(imgMap);
                  console.log(fileList);
                  console.log($scope.imgTest);
                  // 书签
                  // layer.close(loadLayer);
                  // return
                  uploadImgs(fileList);
                },
                'image/png'
              );
            } else {
              var nowTime = new Date().getTime();
              blob.name = nowTime + '.png';
              // console.log(blob);
              imgMap[nowTime] = 'asjupimg_front';
              fileList[fileList.length] = blob;
              fileList.length = fileList.length + 1;
              console.log(imgMap);
              console.log(fileList);
              console.log($scope.imgTest);
              // 书签
              // layer.close(loadLayer);
              // return
              uploadImgs(fileList);
            }
          },
          'image/png'
        );
      } else {
        console.log(imgMap);
        console.log(fileList);
        console.log($scope.imgTest);
        // 书签
        // layer.close(loadLayer);
        // return
        uploadImgs(fileList);
      }
      // layer.closeAll('loading');
      // getSubmitData();
    }
    function uploadImgs(fileList) {
      // theFinalImgUrlMap = {
      //     // Green_back: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202902/325484345766.png",
      //     // Green_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202902/1507206894219.png",
      //     Red_back: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202906/541481593055.png",
      //     Red_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202906/1825287256309.png",
      //     Yellow_back: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202906/982351715177.png",
      //     Yellow_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202906/974867379829.png",
      //     asjupimg_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/202906/5754184315231.png"
      // }
      // theFinalImgUrlMap = {
      //     asjdefault_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/2048/1223843460041.png",
      //     asjupimg_front: "https://cc-west-usa.oss-us-west-1.aliyuncs.com/2048/1571657088809.png"
      // }
      // goSubmitData();
      // return;
      dsp.ossUploadFile(fileList, function (data) {
        console.log(data);
        if (data.code == 2 || data.code == 0) {
          layer.close(loadLayer);
          layer.msg('Submit failed');
        } else {
          // succssLinks: succssLinks,
          // succssByOrder: succssByOrder
          var succssByOrder = data.succssByOrder;
          theFinalImgUrlMap = {};
          for (var k in imgMap) {
            theFinalImgUrlMap[imgMap[k]] = succssByOrder[k];
          }
          console.log(theFinalImgUrlMap);
          goSubmitData();
        }
      }, 'noload');
    }
    var theFinalImgUrlMap;
    // $scope.addDesignFail = true;
    var sendData = {};
    function goSubmitData() {
      // {
      //     originalPid: 原始商品id,
      //     nameEn: pro name,
      //     sku: 新生成的商品sku,
      //     variantKeyEn: Size-Color,
      //     variantKey: 尺寸-颜色,
      //     img: 'imgurl1, imgurl2, imgurl3...',
      //     customeDesign: json,
      //     variants: [
      //         {
      //             originalVid: 原始变体id,
      //             childsku: 新生成的变体sku,
      //             img: 'imgurl'
      //         }
      //     ]
      // }
      // {
      //    originalPid:  currentMerch.ID,
      //    nameEn: $scope.printItemName,
      //    sku: currentMerch.newSku,
      //    variantKeyEn: variantKeyEn,
      //    variantKey: variantKey,
      //    img: currentMerch.BIGIMG + ',' + currentMerch.IMG + ',' + 
      //    variants: variants
      // }
      sendData.originalPid = currentMerch.ID;
      sendData.nameEn = $scope.printItemName;
      // sendData.sku = currentMerch.newSku;
      sendData.cid = currentMerch.CATEGORYID;
      var variantKeyEn, variantKey;
      if ($scope.podColor) {
        if (currentMerch.VARIANTKEYEN) {
          variantKeyEn = 'Color-' + currentMerch.VARIANTKEYEN;
          variantKey = '颜色-' + currentMerch.VARIANTKEY;
        } else {
          variantKeyEn = 'Color';
          variantKey = '颜色';
        }
      } else {
        variantKeyEn = currentMerch.VARIANTKEYEN;
        variantKey = currentMerch.VARIANTKEY;
      }
      sendData.variantKey = variantKey;
      sendData.variantKeyEn = variantKeyEn;

      var customeDesign = {};
      customeDesign.front = {};
      customeDesign.front.podType = $scope.frontPodType;
      if ($scope.printVal) {
        customeDesign.front.text = $scope.printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
        customeDesign.front.fontsize = $scope.frontFontItem.size;
        customeDesign.front.fontcolor = $scope.frontColorValue;
        customeDesign.front.fontfamily = $scope.fontName;
      }
      if ($scope.editBack) {
        customeDesign.back = {};
        customeDesign.back.podType = $scope.backPodType;
        if ($scope.printValBack) {
          customeDesign.back.text = $scope.printValBack.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
          customeDesign.back.fontsize = $scope.backFontItem.size;
          customeDesign.back.fontcolor = $scope.backColorValue;
          customeDesign.back.fontfamily = $scope.fontNameBack;
        }
      }
      var imgArr = [];
      var bigImg;
      for (var k in theFinalImgUrlMap) {
        if (k == 'asjupimg_front') {
          customeDesign.front.imgUrl = theFinalImgUrlMap[k];
        } else if (k == 'asjupimg_back') {
          customeDesign.back.imgUrl = theFinalImgUrlMap[k];
        } else {
          imgArr.push(theFinalImgUrlMap[k]);
          if (k.indexOf('front') > -1 && !bigImg) {
            bigImg = theFinalImgUrlMap[k];
          }
        }
      }
      // sendData.img = imgArr.join(',') + ',' + currentMerch.IMG;
      sendData.img = imgArr.join(',');
      sendData.bigImg = bigImg;
      sendData.customeDesign = customeDesign;

      var checkColorArr = [];
      var checkItemArr = getCheckItems();
      var finalVitems = [];
      if ($scope.podColor) {
        checkColorArr = getCheckColors();
        for (var m = 0; m < checkColorArr.length; m++) {
          if (checkItemArr.length == 0) {
            finalVitems.push({
              cItem: checkColorArr[m].nameEn,
              vItem: 'default',
              variantKey: checkColorArr[m].nameEn
            });
          } else {
            for (var n = 0; n < checkItemArr.length; n++) {
              finalVitems.push({
                cItem: checkColorArr[m].nameEn,
                vItem: checkItemArr[n],
                variantKey: checkColorArr[m].nameEn + '-' + checkItemArr[n]
              });
            }
          }
        }
      } else {
        if (checkItemArr.length == 0) {
          finalVitems.push({
            cItem: colorSubmit[0].nameEn,
            vItem: 'default',
            variantKey: 'default'
          });
        } else {
          for (var n = 0; n < checkItemArr.length; n++) {
            finalVitems.push({
              cItem: colorSubmit[0].nameEn,
              vItem: checkItemArr[n],
              variantKey: checkItemArr[n]
            });
          }
        }
      }

      console.log(finalVitems);
      var variants = [];
      for (var i = 0; i < finalVitems.length; i++) {
        variants.push({
          originalVid: oriSkuMap[finalVitems[i].vItem].ID,
          childsku: finalVitems[i].variantKey,
          // childsku: currentMerch.newSku + '-' + finalVitems[i].variantKey,
          img: theFinalImgUrlMap[finalVitems[i].cItem + '_front'],
          variantKey: finalVitems[i].variantKey,
          nameEn: $scope.printItemName + ' ' + finalVitems[i].variantKey.replace(/-/g, ' ')
        });
      }
      sendData.variants = variants;
      console.log(sendData);
      sendData.shopMethod = $scope.wuliuway.enName;
      sendData.type = '1'; // 表示design代发商品
      // endData.shopMethod.productId = ''
      // endData.shopMethod.autAccId = {}
      sendData.description = editor.$txt.html();
      sendData = JSON.stringify(sendData);
      console.log(sendData);
      realSubmit();
    }

    $scope.Resubmit = function () {
      $scope.addDesignFail = false;
      layer.load(2);
      realSubmit();
    }

    function realSubmit() {
      dsp.postFun('product-api/app/locProduct/addIndividualization', sendData, function (data) {
        sendData = {}
        layer.close(loadLayer);
        layer.closeAll('loading');
        console.log(data);
        if (data.data.statusCode == 200) {
          if (that.parentctrl == 'productdetail') {
            $scope.designSuccLayer = 1;
          }
          if (that.parentctrl == 'designlist') {
            layer.msg('Submit successfully');
          }
          $scope.$emit('todesignlist', 'deleteone');
          // $scope.designList.splice(dssignIndex, 1);
          // localStorage.setItem('cj_desingn_list', JSON.stringify($scope.designList));
          // $scope.showDesignCart = false;
          // $scope.pagenum = '1';
          // getProList();
          frontCtx.clearRect(0, 0, mobanWidth, mobanHeight);
          backCtx.clearRect(0, 0, mobanWidth, mobanHeight);
          $scope.podColor = null;
          $scope.printItemName = null;
          $scope.varientArr = null;
          $scope.choseVariantFlag = false;
          $scope.upLoadImg = false;
          $scope.imgData = null;
          temImg = null;
          $scope.upLoadImgBack = false;
          $scope.imgDataBack = null;
          temImgBack = null;
        } else {
          // layer.msg('Submit failed');
          $scope.addDesignFail = true;
        }
      });
    }

    $scope.cancelPrint = function () {
      $scope.printProFlag = false;
      frontCtx.clearRect(0, 0, mobanWidth, mobanHeight);
      backCtx.clearRect(0, 0, mobanWidth, mobanHeight);
      $scope.podColor = null;
      $scope.printItemName = null;
      $scope.varientArr = null;
      $scope.choseVariantFlag = false;
      $scope.upLoadImg = false;
      $scope.imgData = null;
      temImg = null;
      $scope.upLoadImgBack = false;
      $scope.imgDataBack = null;
      temImgBack = null;
    }

    function getCheckColors() {
      var checkColorArr = [];
      for (var i = 0; i < $scope.podColor.colors.length; i++) {
        if ($scope.podColor.colors[i].check) {
          checkColorArr.push({
            nameEn: $scope.podColor.colors[i].nameEn,
            value: $scope.podColor.colors[i].value
          });
        }
      }
      console.log(checkColorArr);
      return checkColorArr;
    }

    function getCheckItems() {
      var checkItemArr = [];
      if ($scope.varientArr.length == 1) {
        for (var i = 0; i < $scope.varientArr[0].key.length; i++) {
          if ($scope.varientArr[0].key[i].check) {
            checkItemArr.push($scope.varientArr[0].key[i].val);
          }
        }
      }
      if ($scope.varientArr.length == 2) {
        var arr1 = [];
        for (var j = 0; j < $scope.varientArr[0].key.length; j++) {
          if ($scope.varientArr[0].key[j].check) {
            arr1.push($scope.varientArr[0].key[j].val);
          }
        }
        var arr2 = [];
        for (var k = 0; k < $scope.varientArr[1].key.length; k++) {
          if ($scope.varientArr[1].key[k].check) {
            arr2.push($scope.varientArr[1].key[k].val);
          }
        }
        for (var m = 0; m < arr1.length; m++) {
          for (var n = 0; n < arr2.length; n++) {
            checkItemArr.push(arr1[m] + '-' + arr2[n]);
          }
        }
      }
      console.log(checkItemArr);
      return checkItemArr;
    }

    $scope.imgTest = [];

    var fileListF = [];
    // var fileListF = {};
    // fileListF.length = 0;
    var fileListB = [];
    // var fileListB = {};
    // fileListB.length = 0;
    var imgMap = {};
    var posiArrS;
    var imgDataS;
    var printValS;
    var showImgS;
    var oroPosiArr;
    var editImgS;
    var imgDataOriS, imgDataResultFrontS, imgDataResultFrontSKou;
    var getImgCvsS, getImgCxtS;
    var fontsizeS, fontcolorS, fontfamilyS;
    function getFrontImgs(flag) {
      if (flag) {
        imgDataS = $scope.imgDataBig;
        printValS = $scope.printVal;
        showImgS = $scope.frontShowImgSrc;
        editImgS = $scope.podZone.front.editimgurl;
        oroPosiArr = $scope.posiArrFront;
        getImgCvsS = finalCvsFront;
        getImgCxtS = finalCxtFront;
        fontsizeS = $scope.frontFontItem.size;
        fontcolorS = $scope.frontColorValue;
        fontfamilyS = $scope.fontName;
        fileListF = [];
      } else {
        imgDataS = $scope.imgDataBigBack;
        printValS = $scope.printValBack;
        showImgS = $scope.backShowImgSrc;
        editImgS = $scope.podZone.back.editimgurl;
        oroPosiArr = $scope.posiArrBack;
        getImgCvsS = finalCvsBack;
        getImgCxtS = finalCxtBack;
        fontsizeS = $scope.backFontItem.size;
        fontcolorS = $scope.backColorValue;
        fontfamilyS = $scope.fontNameBack;
        fileListB = [];
      }
      if ($scope.podColor) {
        colorSubmit = getCheckColors();
      }
      // 获取展示像素
      downloadedImg = new Image;
      downloadedImg.setAttribute('crossorigin', 'anonymous');
      downloadedImg.addEventListener("load", imageReceived, false);
      downloadedImg.src = showImgS + '?time=' + new Date().getTime();
      function imageReceived() {
        console.dir(this);
        getImgCvsS.width = this.width;
        getImgCvsS.height = this.height;
        var bili = this.width / mobanWidth;
        posiArrS = [Math.floor(oroPosiArr[0] * bili), Math.floor(oroPosiArr[1] * bili), Math.floor(oroPosiArr[2] * bili), Math.floor(oroPosiArr[3] * bili)];
        getImgCxtS.clearRect(0, 0, getImgCvsS.width, getImgCvsS.height);
        getImgCxtS.drawImage(this, 0, 0, getImgCvsS.width, getImgCvsS.height);
        imgDataOriS = getImgCxtS.getImageData(0, 0, getImgCvsS.width, getImgCvsS.height);
        imgDataResultFrontS = getImgCxtS.getImageData(0, 0, getImgCvsS.width, getImgCvsS.height);
        imgDataResultFrontSKou = getImgCxtS.getImageData(0, 0, getImgCvsS.width, getImgCvsS.height);
        // 绘制上传图片
        var emptyIndexArr = [];
        if (imgDataS) {
          var img = new Image();
          img.src = imgDataS;
          img.onload = function () {
            getImgCxtS.drawImage(img, posiArrS[0], posiArrS[1], posiArrS[2], posiArrS[3]);

            // var temPosiArr = [];

            downloadedImg = new Image;
            downloadedImg.crossOrigin = "Anonymous";
            downloadedImg.addEventListener("load", imageReceived, false);
            downloadedImg.src = editImgS + '?time=' + new Date().getTime();
            function imageReceived() {
              // 获取空白像素
              var temCvs = document.createElement('canvas');
              var temCtx = temCvs.getContext("2d")
              temCvs.width = this.width;
              temCvs.height = this.height;
              temCtx.clearRect(0, 0, temCvs.width, temCvs.height);
              temCtx.drawImage(this, 0, 0, temCvs.width, temCvs.height);
              // 获取像素信息数据
              var temXs = temCtx.getImageData(0, 0, temCvs.width, temCvs.height);
              var r, g, b, a;
              for (var index = 0; index < temXs.data.length; index += 4) {
                r = temXs.data[index];
                g = temXs.data[index + 1];
                b = temXs.data[index + 2];
                a = temXs.data[index + 3];
                if (r == 0 && g == 0 && b == 0 && a == 0) {
                  emptyIndexArr.push(index);
                }
              }
              // console.log(emptyIndexArr)
              imgfun(flag, {
                canvasBasicColor: canvasBasicColor,
                imgDataOriS: imgDataOriS,
                imgDataResultFrontS: imgDataResultFrontS,
                imgDataResultFrontSKou: imgDataResultFrontSKou,
                emptyIndexArr: emptyIndexArr,
                getImgCvsS: getImgCvsS,
                getImgCxtS: getImgCxtS,
                $scope: $scope,
                fileListF: fileListF,
                fileListB: fileListB,
                posiArrS: posiArrS,
                imgDataS: imgDataS,
                fontsizeS: fontsizeS,
                fontcolorS: fontcolorS,
                fontfamilyS: fontfamilyS,
                printValS: printValS,
                imgMap: imgMap,
                colorSubmit: colorSubmit
              });

            }

          }
          return
        }
        emptyIndexArr = [];
        imgfun(flag, {
          canvasBasicColor: canvasBasicColor,
          imgDataOriS: imgDataOriS,
          imgDataResultFrontS: imgDataResultFrontS,
          imgDataResultFrontSKou: imgDataResultFrontSKou,
          emptyIndexArr: emptyIndexArr,
          getImgCvsS: getImgCvsS,
          getImgCxtS: getImgCxtS,
          $scope: $scope,
          fileListF: fileListF,
          fileListB: fileListB,
          posiArrS: posiArrS,
          imgDataS: imgDataS,
          fontsizeS: fontsizeS,
          fontcolorS: fontcolorS,
          fontfamilyS: fontfamilyS,
          printValS: printValS,
          imgMap: imgMap,
          colorSubmit: colorSubmit
        });
      }
    }

    function imgfun(flag, options) {
      // 绘制不同颜色图

      for (var i = 0; i < colorSubmit.length; i++) {
        // console.log(i, canvasBasicColor, imgDataOriS, imgDataResultFrontS, emptyIndexArr, getImgCxtS, $scope, fileListF, fileListB, posiArrS, flag);
        // console.log('1111111')
        // console.log(options.imgDataResultFrontSKou);
        (function (i, flag, options) {
          var getImgCvsS = document.createElement('canvas');
          getImgCvsS.width = options.getImgCvsS.width;
          getImgCvsS.height = options.getImgCvsS.height;
          var getImgCxtS = getImgCvsS.getContext("2d");
          // console.log('ksbckncjsxbn',i)
          var imgDataResultS = options.imgDataResultFrontS;
          var imgDataResultFrontSKou = options.imgDataResultFrontSKou;
          if (colorSubmit[i].value != 'asjdefault') {
            var oricolor = hexToRGB(options.canvasBasicColor);
            var rgba = [];
            for (var k in oricolor) {
              rgba.push(oricolor[k]);
            }
            // 容差大小
            var tolerance = options.$scope.podColor.range * 1;
            var newColor = hexToRGB(colorSubmit[i].value);
            // console.log(newColor);
            var newColorArr = [];
            for (var k2 in newColor) {
              newColorArr.push(newColor[k2]);
            }
            // console.log(newColorArr);
            for (var index = 0; index < options.imgDataOriS.data.length; index += 4) {
              var r = options.imgDataOriS.data[index];
              var g = options.imgDataOriS.data[index + 1];
              var b = options.imgDataOriS.data[index + 2];

              if (Math.sqrt(
                (r - rgba[0]) * (r - rgba[0]) +
                (g - rgba[1]) * (g - rgba[1]) +
                (b - rgba[2]) * (b - rgba[2])) <= tolerance
              ) {
                imgDataResultS.data[index] = (newColorArr[0] + r - rgba[0]);
                imgDataResultS.data[index + 1] = (newColorArr[1] + g - rgba[1]);
                imgDataResultS.data[index + 2] = (newColorArr[2] + b - rgba[2]);
                imgDataResultS.data[index + 3] = options.imgDataOriS.data[index + 3];

                imgDataResultFrontSKou.data[index] = (newColorArr[0] + r - rgba[0]);
                imgDataResultFrontSKou.data[index + 1] = (newColorArr[1] + g - rgba[1]);
                imgDataResultFrontSKou.data[index + 2] = (newColorArr[2] + b - rgba[2]);
                imgDataResultFrontSKou.data[index + 3] = options.imgDataOriS.data[index + 3];
              } else {
                imgDataResultS.data[index] = r;
                imgDataResultS.data[index + 1] = g;
                imgDataResultS.data[index + 2] = b;
                imgDataResultS.data[index + 3] = options.imgDataOriS.data[index + 3];

                imgDataResultFrontSKou.data[index] = r;
                imgDataResultFrontSKou.data[index + 1] = g;
                imgDataResultFrontSKou.data[index + 2] = b;
                imgDataResultFrontSKou.data[index + 3] = options.imgDataOriS.data[index + 3];
              }
            }
            // put数据
            // console.log(options.imgDataResultFrontS)
          }
          getImgCxtS.clearRect(0, 0, getImgCvsS.width, getImgCvsS.height);
          getImgCxtS.putImageData(imgDataResultS, 0, 0, 0, 0, getImgCvsS.width, getImgCvsS.height);
          imgDataResultS = null;
          if (options.imgDataS && options.emptyIndexArr.length > 0) {
            // console.log(1111);
            var img = new Image();
            img.src = options.imgDataS;
            getImgCxtS.drawImage(img, options.posiArrS[0], options.posiArrS[1], options.posiArrS[2], options.posiArrS[3]);
            for (var index2 = 0; index2 < options.emptyIndexArr.length; index2++) {
              imgDataResultFrontSKou.data[options.emptyIndexArr[index2]] = 0;
              imgDataResultFrontSKou.data[options.emptyIndexArr[index2] + 1] = 0;
              imgDataResultFrontSKou.data[options.emptyIndexArr[index2] + 2] = 0;
              imgDataResultFrontSKou.data[options.emptyIndexArr[index2] + 3] = 0;
            }

          }
          // console.log(options.emptyIndexArr.length)
          var temCvs = document.createElement('canvas');
          var temCtx = temCvs.getContext("2d")
          temCvs.width = options.getImgCvsS.width;
          temCvs.height = options.getImgCvsS.height;
          temCtx.clearRect(0, 0, temCvs.width, temCvs.height);
          temCtx.putImageData(imgDataResultFrontSKou, 0, 0, 0, 0, temCvs.width, temCvs.height);
          imgDataResultFrontSKou = null;
          // console.log(temCvs.toDataURL("image/png"))
          var img = new Image();
          img.src = temCvs.toDataURL("image/png");
          img.onload = function () {
            // 直接put不可以！！！
            // console.log(this);
            // $scope.imgTest = img.src;
            // if (options.imgDataS) {
            // var img = new Image();
            // img.src = options.imgDataS;
            // options.getImgCxtS.drawImage(img, options.posiArrS[0], options.posiArrS[1], options.posiArrS[2], options.posiArrS[3]);
            // }
            // options.getImgCxtS.putImageData(imgDataResultFrontSKou, 0, 0, 0, 0, options.getImgCvsS.width, options.getImgCvsS.height);
            getImgCxtS.drawImage(this, 0, 0, getImgCvsS.width, getImgCvsS.height);
            if (options.printValS) {
              var posiX = options.posiArrS[0] + (options.posiArrS[2]) / 2;
              var posiY = options.posiArrS[1] + (options.posiArrS[3]) / 2;
              // console.log(posiY);
              var printVal = options.printValS.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
              var printArr = printVal.split('<br/>');
              var len = printArr.length;
              for (var index3 = 0; index3 < len; index3++) {
                getImgCxtS.font = 'normal ' + options.fontsizeS + ' ' + options.fontfamilyS;
                getImgCxtS.textAlign = 'center';
                getImgCxtS.textBaseline = 'middle';
                getImgCxtS.fillStyle = options.fontcolorS;
                getImgCxtS.fillText(printArr[index3], posiX, posiY - (len - 1) * 12 + 24 * index3, options.posiArrS[2]);
              }
              getImgCvsS.toBlob(
                function (blob) {
                  // Do something with the blob object,
                  // e.g. creating a multipart form for file uploads:
                  var formData = new FormData();
                  formData.append('file', blob);
                  var nowTime = new Date().getTime();
                  blob.name = nowTime + '.png';
                  console.log(blob);
                  console.log(formData)
                  // var fileListF = {};
                  if (flag) {
                    // options.fileListF.length = options.fileListF.length + 1;
                    console.log(i);
                    // options.fileListF[i] = blob;
                    options.fileListF.push(blob);
                    console.log('options.fileListF', options.fileListF);
                    imgMap[nowTime] = options.colorSubmit[i].nameEn + '_front';
                  } else {
                    // options.fileListB.length = options.fileListB.length + 1;
                    console.log(i);
                    // options.fileListB[i] = blob;
                    options.fileListB.push(blob);
                    console.log('options.fileListB', options.fileListB);
                    imgMap[nowTime] = options.colorSubmit[i].nameEn + '_back';
                  }
                },
                'image/png'
              );
              $scope.imgTest.push(getImgCvsS.toDataURL("image/png"));
              return;
            }
            getImgCvsS.toBlob(
              function (blob) {
                // Do something with the blob object,
                // e.g. creating a multipart form for file uploads:
                var formData = new FormData();
                formData.append('file', blob);
                var nowTime = new Date().getTime();
                blob.name = nowTime + '.png';
                console.log(blob);
                console.log(formData)
                if (flag) {
                  // options.fileListF.length = options.fileListF.length + 1;
                  console.log(i);
                  // options.fileListF[i] = blob;
                  options.fileListF.push(blob);
                  console.log('options.fileListF', options.fileListF);
                  imgMap[nowTime] = options.colorSubmit[i].nameEn + '_front';
                } else {
                  // options.fileListB.length = options.fileListB.length + 1;
                  console.log(i);
                  // options.fileListB[i] = blob;
                  options.fileListB.push(blob);
                  console.log('options.fileListB', options.fileListB);
                  imgMap[nowTime] = options.colorSubmit[i].nameEn + '_back';
                }
                // $scope.imgTest.push(options.getImgCvsS.toDataURL("image/png"));
              },
              'image/png'
            );
            // console.log(options.fileListF);
            $scope.imgTest.push(getImgCvsS.toDataURL("image/png"));
            // console.log($scope.imgTest);
          }
        })(i, flag, options)
      }
    }

  }

}
