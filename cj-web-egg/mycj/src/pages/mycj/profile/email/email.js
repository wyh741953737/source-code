import template from './email.html';

export function profileEmailFactory(module) {
  module.component('profileEmail', {
    template,
    controller: ['$scope', '$element','dsp', function ($scope,$element, dsp) {
      this.$onInit = function () {
        controllerFn.call(this, $scope,$element, dsp);
      };
    }],
    bindings: {
    },
  });
}

function controllerFn($scope, $element,dsp) {
  dsp.domainData().then((res) => {
    // 请求成功的结果
    $scope.iscj = res.iscj;
    $scope.affModel = res.affModel;
    console.log($scope.iscj,$scope.affModel)
  })
  getEmailTypeList();
  function getEmailTypeList() {
    layer.load(2);
    dsp.postFun('app/userEmailState/list', {}, function (data) {
      layer.closeAll('loading');
      if (data.data.statusCode == '200') {
        var result = JSON.parse(data.data.result);
        $scope.emailTypeList = result;
      }
    }, function () {
      layer.closeAll('loading');
    });
  }
  //选择邮件接收
  $('.subscribed-email').on('click', '.radioGroup>.btnGroup', function () {
    var parent = $(this);
    var text = parent.parent().find('.tit').attr('lower');
    var id = parent.attr('data-id');
    var key = text;
    var data = {
      "id": id
    };
    if (parent.hasClass('closeact')) {
      var str = text + ' On';
      data[key] = '1';
      updateEmailType(data, str, parent, '1');
    } else {
      var str = text + ' Off';
      data[key] = '0';
      updateEmailType(data, str, parent, '0');
    }
  });

  function updateEmailType(updateData, text, ele, type) {
    layer.load(2);
    dsp.postFun('app/userEmailState/update', JSON.stringify(updateData), function (data) {
      layer.closeAll('loading');
      console.log(data);
      if (data.data.statusCode == '200') {
        if (type == '1') {
          ele.removeClass('closeact').find('span').html('On');
        } else if (type == '0') {
          ele.addClass('closeact').find('span').html('Off');
        }
        layer.msg(text);
      } else {
        layer.msg('Operation failure');
      }
    }, function () {
      layer.closeAll('loading');
    })
  }
}
