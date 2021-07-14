(function (angular) {
  var app = angular.module('myCJSubmitForm', []);
  // app.controller('myCJSubmitFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

  app.controller('myCJSubmitFormCtrl', ['$scope','dsp','$routeParams',function($scope,dsp,$routeParams){  
    // console.log($routeParams);
    $('.mycj-home-box').css({
      'min-height': $(window).height() * 1 - 170 + 'px'
    });
      var vip=localStorage.getItem('vip')==undefined?"":localStorage.getItem('vip');
      if(vip=='1'){//vipFlag
          $('.header-nav').addClass('vipFlag');
          $('.mycj-right-wrap').css('background','#F0EDE7');
      }else{
          $('.header-nav').removeClass('vipFlag');
          $('.mycj-right-wrap').css('background','#f2f3f5');
      }

    $('form a').on('click',function (e) {
      e.preventDefault();
      var input = '<input type="file">';
      $('.file').append(input);
    })

   //   $scope.checkFile = function(){
   //      var aa = $('#document2').val().toLowerCase().split('.');
   //      if($('#document2').val()==""){
   //          alert('图片不能为空!');
   //          return false;
   //      }else{
   //            if(aa[aa.length-1]=='gif'||aa[aa.length-1]=='jpg'||aa[aa.length-1]=='bmp'||aa[aa.length-1]=='png'
   //              ||aa[aa.length-1]=='jpeg'){
   //             return true;
   //          } else{
   //                alert('请选择格式为*.jpg、*.gif、*.bmp、*.png、*.jpeg 的图片');
   //                return false;
   //            }
   //      }
   // }
    $scope.imgArr=[];
    $scope.upLoadImg4=function (files) {
            var data = new FormData();     //以下为向后台提交图片数据
            data.append('file', files[0]);
            data.append('index','1');
            dsp.upLoadImgPost('app/ajax/upload',data,con,err);
            function con(n){
                
                var obj=JSON.parse(n.data.result);
                var srcList = obj[0].split('.');
                var type = srcList[srcList.length-1];
                $scope.src='https://'+obj[0];
                console.log($scope.src);
                console.log(type);
                //判断上传类型
                if(type=='gif'||type=='jpg'||type=='bmp'||type=='png'||type=='jpeg'){
                       $scope.imgArr.push($scope.src);
                       console.log($scope.imgArr.length);
                       if($scope.imgArr.length>=10){
                          $scope.df=function($event){
                                $event.preventDefault();
                                alert('太多了');
                          }
                        }
                  } else{
                        alert('请选择格式为*.jpg、*.gif、*.bmp、*.png、*.jpeg 的图片');
                        return false;
                    }
                

                // console.log($scope.headimg);
                // dsp.postFun('app/account/updateimg  ',{"data": "{'id': '"+userId+"','img':'"+$scope.headimg+"'}"},function (n) {
                // // console.log(n.data);
                // },err);

            };
            function err(n){console.log(n)};
        }
        console.log($scope.imgArr);

        

        var param = $routeParams["id"];
        // console.log(param);

        switch (param) {
          case 'a':
            $scope.selected = 'App Issue';
            break;
          case 'b':
            $scope.selected = 'Order Issue';
            break;
          case 'c':
            $scope.selected = 'Payment Issue';
            break;
          case 'd':
            $scope.selected = 'Products Issue';
            break;
        }
        
    // 判断上传的图片
   
    
  }])
})(angular)