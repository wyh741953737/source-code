export function apikeyFactory(angular) {
  const app = angular.module('apikey.module', ['service']);

  app.controller('apikey.ctrl', ['$scope', 'dsp',
    function ($scope, dsp) {
      console.log($('.header-nav'));
      //页面加载获取秘钥
      $('.api-content').css('min-height', $(window).height() * 1 - 171 + 'px')
      getSecret();
      function getSecret() {
        dsp.postFun('app/shop/getSecret', {}, function (data) {
          //console.log(data);
          var result = data.data;
          var secret = result.secret;
          var id = result.id;
          $('.api-middle>p>span').attr('data-id', id);
          console.log(secret);
          $('.api-middle>p>span').html(secret);
        }, function (data) {
          layer.msg('Failed to get the secret key');
        });
      }
      var vip = localStorage.getItem('vip') == undefined ? "" : localStorage.getItem('vip');
      if (vip == '1') {//vipFlag
        $('.header-nav').addClass('vipFlag');
        $('.mycj-left-bar').addClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#F0EDE7').addClass('vip');
      } else {
        $('.header-nav').removeClass('vipFlag');
        $('.mycj-left-bar').removeClass('vipFlag');
        $('.mycj-right-wrap').css('background', '#f2f3f5').removeClass('vip');
      }
      $('.header-nav li').eq(4).addClass('active');


      //获取
      $('#generateBtn').click(function () {
        var id = $('.api-middle>p>span').attr('data-id');
        var data = {};
        if (id == null || id == '' || id == undefined) {
          data.id = '';
        } else {
          data.id = id;
        }
        dsp.postFun('app/shop/refreshSecret', JSON.stringify(data), function (data) {
          var result = data.data;
          var secret = result.secret;
          var id = result.id;
          $('.api-middle>p>span').attr('data-id', id);
          console.log(secret);
          $('.api-middle>p>span').html(secret);
        }, function (data) {
          layer.msg('Failed to get the secret key');
        });
      });
      //删除
      $('#deleteBtn').click(function () {
        var id = $('.api-middle>p>span').attr('data-id');
        var token = $('.api-middle>p>span').html();
        console.log(token);
        if (id == null || id == '' || id == undefined) {
          layer.msg('You have not obtained the secret key.');
        } else {
          var data = {
            "id": id,
            "token": token
          };
          dsp.postFun('app/shop/deleteSecret', JSON.stringify(data), function (data) {
            console.log(data.data);
            if (data.data.result == true) {
              // layer.msg('successfully delete');
              layer.msg('Deleted Successfully');
              $('.api-middle>p>span').html('');
            }
          }, function (data) { });
          console.log(data);
        }
        //$('.api-middle>p>span').html('');
      });
      //复制
      $('#copyBtn').click(function () {
        var link = $('.api-middle>p>span').html();
        if (link == null || link == '' || link == undefined) {
          // layer.msg('Please get data');
          layer.msg('Please generate a key first.');
        } else {
          console.log(link);
          var Url1;
          Url1 = document.createElement('input');
          Url1.setAttribute('readonly', 'readonly');
          Url1.setAttribute('value', link);
          document.body.appendChild(Url1);
          //console.log(Url1.value);
          Url1.select(); //
          document.execCommand("Copy");
          var tag = document.execCommand("Copy"); //ִ
          if (tag) {
            layer.msg('Copied Successfully');
          }
          document.body.removeChild(Url1);
        }

      });
      //跳转到api
      $('#docBtn').click(function () {
        window.open('https://developers.cjdropshipping.com');
      });

    }]);

  return app;

}
