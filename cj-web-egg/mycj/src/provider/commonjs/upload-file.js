
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

export function ossUploadFile({ postFun, dsp }) {

  return function (fileData, scb, noload) {
    // fileData----$('#xxx')[0].files  xxx--input的id
    // scb-回调函数
    if (!noload) {
      layer.load(2, {
        shade: [0.3, '#393D49'],
        content: 'Uploading',
        success: function (layero) {
          layero.find('.layui-layer-content').css({
            'width': '300px',
            'padding-left': '36px',
            'margin-left': '-40px',
            'padding-top': '6px'
          });
        }
      });
    }
    postFun('app/oss/policy', {}, function (data) {
      if (data.data.code == 200) {
        var accessid = data.data.accessid;
        var expire = data.data.expire;
        var host = data.data.host;
        var policy = data.data.policy;
        var signature = data.data.signature;
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
            var timeStr = year + month + day;
            var randomNumArr = getRandomNumber(0, 2147483647, 2)
            var randomNum1 = randomNumArr[0] + 10;
            var randomNum2 = randomNumArr[1] + 1000;
            var randomFileName = Math.floor(time / randomNum1 * randomNum2);
            // formData.append('key', time + '-' + fileData[i].name);
            var fileArr = fileData[i].name.split('.')
            var fileTypeName = fileArr[fileArr.length - 1];
            formData.append('key', timeStr + '/' + randomFileName + '.' + fileTypeName);
            formData.append('policy', policy); //policy
            formData.append('OSSAccessKeyId', accessid); //accessKeyId
            formData.append('success_action_status', "200"); //成功后返回的操作码
            formData.append('Signature', signature); //签名
            formData.append('file', fileData[i]);
            $.ajax({
              url: host,
              type: 'POST',
              data: formData,
              async: true,
              cache: false,
              contentType: false,
              processData: false,
              success: function (returndata) {
                // ReturnUrl = host + '/' + time + '-' + fileData[i].name;
                ReturnUrl = host + '/' + timeStr + '/' + randomFileName + '.' + fileTypeName;
                succssLinks.push(ReturnUrl);
                succssByOrder[fileArr[0]] = ReturnUrl;
              },
              error: function (returndata) {
                failIndexs.push(i);
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
            if (!noload) {
              layer.closeAll("loading");
            }
          } else if (failIndexs.length == fileData.length) {
            scb({
              code: 0 // 全部上传失败
            });
            clearInterval(ossTimer);
            if (!noload) {
              layer.closeAll("loading");
            }
          } else if ((failIndexs.length + succssLinks.length) == fileData.length) {
            scb({
              code: 2, // 部分上传成功，返回成功链接和失败索引
              failIndexs: failIndexs,
              succssLinks: succssLinks,
              succssByOrder: succssByOrder
            });
            clearInterval(ossTimer);
            if (!noload) {
              layer.closeAll("loading");
            }
          }
        }, 10);

      } else {
        if (!noload) {
          layer.closeAll("loading");
        }
        dsp.cjMesFun(1);
        scb({
          code: 0 // 全部上传失败
        });
      }
    }, function () {
      if (!noload) {
        layer.closeAll("loading");
      }
      scb({
        code: 0 // 全部上传失败
      });
    });
  }
}

// 上传图片post（特殊请求头）
// 特殊情况用
export function upLoadImgPost({ $http, dsp, getDomainByUrl, token }) {

  return function (url, imgData, successCallback, errorCallback) {
    $http({
      method: 'post',
      url: getDomainByUrl(url),
      data: imgData,
      headers: { 'Content-Type': undefined, 'token': token },
      transformRequest: angular.identity
    }).then(function (data) {
      successCallback(data);
    }, function (backdata) {
      if ($('.cj-load-percent').length > 0) {
        $('.cj-load-percent').remove();
      }
      if (errorCallback) {
        errorCallback(backdata);
      } else {
        layer.closeAll('loading');
        dsp.cjMesFun(1);
      }
    });
  }
}
