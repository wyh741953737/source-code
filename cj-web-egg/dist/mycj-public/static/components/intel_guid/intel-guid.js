
(function (angular) {
  angular.module('cjCompnentModule')
    .component('intelGuid', {
      templateUrl: './static/components/intel_guid/intel-guid.html',
      controller: IntelGuidCtrl
    });

    function IntelGuidCtrl($scope, dsp) {

      $scope.targetLng = dsp.targetLng

      $scope.guidList = dsp.getGuidList(dsp.i18next).map((v, i) => ({
        ...v,
        active: i === 0,
        itemFlag: i === 0 ? "active" : "next",
        children: v.children.map((_v, _i) => ({
          ..._v,
          active: i === 0 && _i === 0
        }))
      }))
      $scope.targetCls = 'gp-1'
      dsp.getTransWarehouse((cnName, gmName, idName) => {
        $scope.guidList = $scope.guidList.map(v => {
          if (v.key === 3) {
            v.children = v.children.map(_c => {
              if(_c.name === 'China Warehouse') _c.name = cnName
              if(_c.name === 'Germany Warehouse') _c.name = gmName
              if(_c.name === 'Indonesia Warehouse') _c.name = idName
              return _c
            })
          }
          return v
        })
      })
     

      //一级目录划入划出事件
      $scope.enterFirst = ikey => {
        const _key = ikey - 1;
        $scope.targetCls = `gp-${ikey}`;
        const precIdx = $scope.guidList.findIndex(_ => _.active) || 0; //查找上一个激活项索引
        $scope.guidList = $scope.guidList.map((v, i) => {
          v.active = i === _key;
          if (i === _key) v.itemFlag = "active";
          if (precIdx !== _key) {
            v.children = v.children.map((_v, _i) => ({
              ..._v,
              active: i === _key && _i === 0
            }));
            if(i === precIdx) v.itemFlag = precIdx > _key ? "next" : "prev";
          }
          return v;
        });
      }

      //二级目录划入划出事件
      $scope.enterNav = (idx, pidx) => {
        $scope.guidList = $scope.guidList.map((v, i) => {
          if (i === pidx)
            v.children = v.children.map((_v, _i) => {
              _v.active = _i === idx;
              // if(_i === idx) this.timage = _v.image
              return _v;
            });
          return v;
        });
      }

      //跳转页面
      $scope.jumpWeb = (item) => {
        const { url, isCJ } = item
        if(!url) return;

        if (isCJ && url.includes("myCJ.html") && !dsp.isInLoginState()) {
          location.href = "/login.html";
        } else {
          window.open(url);
        }
      }

    }

})(angular)