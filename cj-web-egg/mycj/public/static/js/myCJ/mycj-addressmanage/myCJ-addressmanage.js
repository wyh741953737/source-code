(function () {
    // 1.店铺授权模块

    var app = angular.module('myCJAddressmanage', []);

    app.controller('myCJAddressmanageCtrl', ['$scope','dsp', function($scope,dsp) {
        alert(32469867)
        console.log('myCJAddressmanageCtrl')
        var base64 = new Base64();
        var userId = base64.decode(localStorage.getItem('userId')==undefined?"":localStorage.getItem('token'));
        $scope.addresstanchuang=false;
        $scope.edit=function (item) {
            console.log(item)
            $scope.addresstanchuang=true;
            $scope.edititem=item;
            $scope.firstname=item.firstname
                $scope.lastname=item.lastname
                $scope.city=item.city
                $scope.country=item.country
                $scope.phone=item.phone
        }

        $scope.query=function () {
            $scope.addresstanchuang=false;
           console.log($scope.firstname,$scope.lastname,$scope.city,$scope.country,$scope.phone)
            dsp.postFun('app/info/modifyAddress ',{"data": "{'userId': '"+userId+"','id': '"+ $scope.edititem.ID+"','firstname': '"+$scope.firstname+"','lastname': '"+$scope.lastname+"','country': '"+$scope.country+"','city': '"+$scope.city+"','phone': '"+$scope.phone+"','address': '"+$scope.edititem.address+"','isDefault': '"+$scope.edititem.isDefault+"'}"},con,err)
            function  con(n) {
                console.log(n.data)
            }
        }
        function err(n) {
            console.log(n)
        }
        function clo(n) {

            var obj=JSON.parse(n.data.result);
            $scope.address=obj;
            console.log(obj)
        }
        dsp.postFun('app/info/useraddress ',{"data": "{'userId': '"+userId+"'}"},clo,err)

        $scope.add=function () {
            dsp.postFun('app/info/adByAddress',{"data": "{'userId': '"+userId+"','firstname': '"+$scope.addfirstname+"','lastname': '"+$scope.addlastname+"','country': '"+$scope.addcountry+"','city': '"+$scope.addcity+"','phone': '"+$scope.addphone+"','address': '"+$scope.addaddress+"','isDefault': '0'}"},con,err)
            function  con(n) {
                console.log(n.data)
            }
        }
        $scope.defaultaddress=function (item) {
            dsp.postFun('app/info/modifydefault',{"data": "{'userId': '"+item.userId+"','id':'"+item.ID+"'}"},con,err)
            function  con(n) {
                console.log(n.data)
            }
        }
    }])
})()