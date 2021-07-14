import template from './copy.html';

export function copyOrdFactory(module) {
    module.component('copyOrdnum', {
        template,
        controller: ['$scope', '$element', function ($scope, dsp) {
            this.$onInit = function () {
                controllerFn.call(this, $scope, dsp);
            };
        }],
        bindings: {
            parmas: "=",
            ordnum: '=',
            stuindex: '=',
            leftindex: "="
        },
    });
}

function controllerFn($scope) {
    $scope.item = this.parmas;
    $scope.ordNum = this.ordnum;
    let stuindex = this.stuindex;//定位当前是哪个文件
    let leftindex = this.leftindex;//定位是哪个模块
    $scope.hrefLinkFun = function (item) {
        console.log(stuindex, leftindex)
        // wait pay
        let id = item.ID;
        let istrackFlag;
        let isafter = $scope.item.STATUS=='13'?$scope.item.STATUS:3;//3:AS service center;13:已关闭订单
        if (stuindex == '0') {
            istrackFlag = 1;
        } else if (stuindex == 4) {
            istrackFlag = 2;
        } else {
            if (item.TRACKINGNUMBER) {
                istrackFlag = 2;
            } else {
                istrackFlag = 1;
            }
        }
        if (leftindex == 2) {//AS service center
            let newStr = id.indexOf("ZF");
            if (newStr == 0) {
                // console.log("字符串是以ZF开头的！")
                location.href = "#/order-detail/" + id + '/' + istrackFlag + '/' + isafter + '/' + 'DIRECT';
            }
            if (newStr == -1) {
                // console.log("字符串不是以ZF开头的！")
                location.href = "#/order-detail/" + id + '/' + istrackFlag + '/' + isafter;
            }
        } else if (leftindex == 3) {//Undelivered orders
            let cjorderNo = item.cjorderNo;
            if (item.trackingNumber) {
                istrackFlag = 2;
            } else {
                istrackFlag = 1;
            }
            let newStr = cjorderNo.indexOf("ZF");
            if (newStr == 0) {
                // console.log("字符串是以ZF开头的！")
                location.href = "#/order-detail/" + cjorderNo + '/' + istrackFlag + '/' + isafter + '/' + 'DIRECT';
            }
            if (newStr == -1) {
                // console.log("字符串不是以ZF开头的！")
                location.href = "#/order-detail/" + cjorderNo + '/' + istrackFlag + '/' + isafter;
            }
        } else {
            let ostatus = $scope.item.STATUS=='13'?'13':'';
            location.href = `#/order-detail/${id}/${istrackFlag}/${ostatus}`;
        }
    }
    $scope.copyFun = function (word) {
        var Url1;
        Url1 = document.createElement('input');
        Url1.setAttribute('readonly', 'readonly');
        Url1.setAttribute('value', word);
        document.body.appendChild(Url1);
        Url1.select(); //选择对象
        document.execCommand("Copy");
        var tag = document.execCommand("Copy"); //执行浏览器复制命令
        if (tag) {
            layer.msg('Copy Success');
        }
        document.body.removeChild(Url1);
    }
}
