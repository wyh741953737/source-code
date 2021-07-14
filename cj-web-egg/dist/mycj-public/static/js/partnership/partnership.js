(function (angular) {
	const app = angular.module('partnership-app', ['service', 'home-service', 'CommonHeaderCom', 'CommonFooterCom', 'utils', 'custom-filter', 'cjCompnentModule', 'cjDotModule']);
	app.controller('partnershipController', ['$scope', '$timeout', '$window', 'dsp', '$window', '$sce', '$rootScope', '$location', '$anchorScroll', 'utils', function ($scope, $timeout, $watch, dsp, $window, $sce, $rootScope, $location, $anchorScroll, utils) {

      //partnership.js

      $scope.applicantName = '';//申请人姓名
      $scope.email = '';//邮箱
      $scope.partnerName = '';//合作平台名称
      $scope.partnerUrl = '';//平台官网链接
      $scope.partnerType = 1;//平台类型
      $scope.typeList = [];//平台类型数组

      $scope.description = '';//合作平台描述
      $scope.partnerIntention = '';//合作意向

      $scope.applicantNameErrorMsg = ''; //申请人错误提示
      $scope.applicantNameFlag = false; //申请人错误提示开关

      $scope.emailVerifyErrorMsg = ''; //邮箱错误提示
      $scope.emailFlag = false; //邮箱错误提示开关

      $scope.partnerNameVerifyErrorMsg = ''; //平台名称错误提示
      $scope.partnerNameFlag = false; //平台名称错误提示开关

      $scope.partnerUrlVerifyErrorMsg = ''; //申请链接错误提示
      $scope.partnerUrlFlag = false; //申请链接错误提示开关

      $scope.descriptionVerifyErrorMsg = ''; //描述错误提示
      $scope.descriptionFlag = false; //描述错误提示开关

      $scope.partnerTypeVerifyErrorMsg = ''; //平台类型错误提示
      $scope.partnerTypeFlag = false; //平台类型错误提示开关

      $scope.partnerLogoVerifyErrorMsg = ''; //平台logo错误提示
      $scope.partnerLogoFlag = false; //平台logo错错误提示开关

      $scope.selectFlag = false; //select开关
      $scope.partnerTypeName = 'E-Commerce Platforms';//select name

      $scope.selectedFlag = false; //select选中显示开关
      $scope.currentType = ''; //当前选中的type值

      $scope.uploadTxtFlag = false; //上传图片文字显示开关

      $scope.intentionsVerifyErrorMsg = ''; //平台合作意向错误提示
      $scope.intentionsFlag = false; //平台合作意向错误提示开关

      //li 选择当前type
      $scope.getPartnerType = ( typeObj ) => {
        $scope.selectFlag = false;
        // if(!typeObj){
        //   $scope.partnerType = '';
        //   $scope.partnerTypeName = (document.getElementsByClassName('partner')[0].childNodes[0] && document.getElementsByClassName('partner')[0].childNodes[0].innerText) ||typeObj.partnerTypeName;
        //   return
        // }
        $scope.partnerType = typeObj.partnerType;
        $scope.partnerTypeName = ((document.getElementsByClassName('partner')[typeObj.partnerType-1].childNodes[0] && document.getElementsByClassName('partner')[typeObj.partnerType-1].childNodes[0].innerText) || typeObj.partnerTypeName);
      }

      //打开选择 type
      $scope.openPartnerType = (event) => {
        event.stopPropagation();
        $scope.currentType = $scope.partnerType;
        $scope.selectFlag = true;
      }

      $scope.closePartnerType = (event) => {
        $scope.selectFlag = false;
      }
      

      $scope.handleSelected = (typeObj) => {
        if(!typeObj){
          $scope.currentType = '';
          return
        }
        $scope.currentType = typeObj.partnerType;
        
      }

      $scope.cancleSelected = () => {
        $scope.currentType = null;
      }
      
      
      //获取平台类型
      dsp.postFun('cj/partner/getPlatformType', { }, ({ data = {} }) => {
        const { result, statusCode } = data;
        if (statusCode != 200) {
          return
        } else {
          $scope.typeList = result;
        }
      }, err => {
        // resolve([]);
        layer.msg('net error');
      });


      $scope.applicantNameInput = () => {
        $scope.applicantName = $scope.applicantName && $scope.applicantName.trim();
        if(!$scope.applicantName) {
          // $scope.applicantNameErrorMsg = 'Please input Name.'
          // $scope.applicantNameFlag = true;
        }else{
          $scope.applicantNameErrorMsg = ''
          $scope.applicantNameFlag = false;
        }
      };
      $scope.emailInput = () => {
        $scope.email = $scope.email && $scope.email.trim();
        if(!$scope.email) {
          // $scope.emailVerifyErrorMsg = 'Please input email.'
          // $scope.emailFlag = true;
          // return
        }
        if(!dsp.isEmail($scope.email)){
          // $scope.emailVerifyErrorMsg = 'Please enter a correct email address.'
          // $scope.emailFlag = true;
          // layer.msg('Please enter a correct email address');
          // return
        }
        $scope.emailVerifyErrorMsg = ''
        $scope.emailFlag = false;
      };
      $scope.partnerNameInput = () => {
        $scope.partnerName = $scope.partnerName && $scope.partnerName.trim();
        if(!$scope.partnerName) {
          // $scope.partnerNameVerifyErrorMsg = 'Please input Website Name.'
          // $scope.partnerNameFlag = true;
        }else{
          $scope.partnerNameVerifyErrorMsg = ''
          $scope.partnerNameFlag = false;
        }
      };
      $scope.partnerUrlInput = () => {
        $scope.partnerUrl = $scope.partnerUrl && $scope.partnerUrl.trim();
        if(!$scope.partnerUrl) {
          // $scope.partnerUrlVerifyErrorMsg = 'Please input URL.'
          // $scope.partnerUrlFlag = true;
        }else{
          $scope.partnerUrlVerifyErrorMsg = ''
          $scope.partnerUrlFlag = false;
        }
      };

      $scope.descriptionInput = () => {
        $scope.description = $scope.description && $scope.description.trim();
        if(!$scope.description) {
          // $scope.descriptionVerifyErrorMsg = 'Please input Description.'
          // $scope.descriptionFlag = true;
        }else{
          $scope.descriptionVerifyErrorMsg = ''
          $scope.descriptionFlag = false;
        }
      };

      $scope.intentionsInput = () => {
        $scope.partnerIntention = $scope.partnerIntention && $scope.partnerIntention.trim();
        if(!$scope.partnerIntention) {
          // $scope.intentionsVerifyErrorMsg = 'Please input Description.'
          // $scope.intentionsFlag = true;
        }else{
          $scope.intentionsVerifyErrorMsg = ''
          $scope.intentionsFlag = false;
        }
      };

      $scope.showUploadTxt = () => {
        $scope.uploadTxtFlag = true;
      };

      $scope.hideUploadTxt = () => {
        $scope.uploadTxtFlag = false;
      };


      $scope.handleSubmit = (e) => {
        e.stopPropagation()
        // console.log('applicantName:'+$scope.applicantName+','+'email:'+$scope.email+','+'partnerName:'+$scope.partnerName+','+'partnerUrl:'+$scope.partnerUrl+','+'partnerType:'+$scope.partnerType+','+'description:'+$scope.description+','+'partnerIntention:'+$scope.partnerIntention);
        if(!$scope.applicantName) {
          $scope.applicantNameErrorMsg = 'Please enter name.'
          $scope.applicantNameFlag = true;
        }
        if(!$scope.email) {
          $scope.emailVerifyErrorMsg = 'Please enter email.'
          $scope.emailFlag = true;
        }
        if($scope.email && !dsp.isEmail($scope.email)){
          $scope.emailVerifyErrorMsg = 'Please enter a correct email address.'
          $scope.emailFlag = true;
          // layer.msg('Please enter a correct email address');
        }
        if(!$scope.partnerName) {
          $scope.partnerNameVerifyErrorMsg = 'Please enter website name.'
          $scope.partnerNameFlag = true;
        }
        if(!$scope.partnerUrl) {
          $scope.partnerUrlVerifyErrorMsg = 'Please enter URL.'
          $scope.partnerUrlFlag = true;
        }
        if($scope.partnerUrl && !dsp.isUrl($scope.partnerUrl)) {
          $scope.partnerUrlVerifyErrorMsg = 'Please enter a correct URL.'
          $scope.partnerUrlFlag = true;
        }
        if(!$scope.description) {
          $scope.descriptionVerifyErrorMsg = 'Please enter website description.'
          $scope.descriptionFlag = true;
        }
        // if(!$scope.partnerType) {
        //   $scope.partnerTypeVerifyErrorMsg = 'Please select Type.'
        //   $scope.partnerTypeFlag = true;
        // }
        if($scope.imgArr.length == 0) {
          $scope.partnerLogoVerifyErrorMsg = 'Please upload the logo.'
          $scope.partnerLogoFlag = true;
        }
        if(!$scope.partnerIntention) {
          $scope.intentionsVerifyErrorMsg = 'Please enter cooperation goals.'
          $scope.intentionsFlag = true;
        }
        if($scope.applicantName && $scope.email && $scope.email && dsp.isEmail($scope.email) && dsp.isUrl($scope.partnerUrl) && $scope.partnerName && $scope.partnerUrl && $scope.description && $scope.partnerType && $scope.imgArr.length > 0 && $scope.partnerIntention){
          $scope.comfirmPartnerPlatformApply();
        }
      }

      $scope.comfirmPartnerPlatformApply = () => {
        dsp.postFun('cj/partner/partnerPlatformApply', { 
          partnerName: $scope.partnerName,
          partnerType: $scope.partnerType,
          partnerLogo: $scope.imgArr[0],
          partnerUrl: $scope.partnerUrl,
          description	:$scope.description,	
          applicantName	:$scope.applicantName,	
          email: $scope.email,	
          partnerIntention: $scope.partnerIntention || ""
        }, ({ data = {} }) => {
          const { result, statusCode, message } = data;
          if (statusCode != 200) {
            return layer.msg(message||'Submit Failed');
          } else {
            $scope.partnerName = '';
            $scope.partnerType = 1;
            partnerTypeName = 'E-Commerce Platforms'; 
            $scope.imgArr = [];
            $scope.partnerUrl = '';
            $scope.description = '';
            $scope.applicantName = '';
            $scope.email = '';
            $scope.partnerIntention = '';
            $scope.partnerTypeName =  '';
            layer.msg('Submit Success');
            location.href = 'partnership-success.html';
          }
        }, err => {
          layer.msg('net error');
        });
      };

    

      $scope.handleTypeChange = () => {
        // console.log($scope.partnerType)
        if(!$scope.partnerType) {
          // $scope.partnerTypeVerifyErrorMsg = 'Please select Type.'
          // $scope.partnerTypeFlag = true;
        }
      };

      // submit form 上传图片 
      $scope.imgArr = [];
      let loadList = {
        img: ['png', 'jpg', 'jpeg', "PNG", "JPG", "JPEG"]
      };
      $scope.upLoadImg4 = function (files) {
        let validFileArr = [];
        $scope.imgArr = [];
        if (files) {
          if(($scope.imgArr.length + files.length) > 1) {
            layer.msg('Upload one images at most');
            return;
          }
          // if(files.size / 1024 / 1024 > 1) {
          //   layer.msg('Upload image size must be less than 1M');
          //   return;
          // }
          let fileType, fileName;
          for (let i = 0, len = files.length; i < len; i++) {
            fileName = files[i].name;
            fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
            // console.log(fileName, fileType)
            if (loadList.img.indexOf(fileType) != -1) {
              validFileArr.push(files[i])
            }
          }
        }
        // if (validFileArr.length < 1 && files.length > 0) {
        //   layer.msg('Images format error')
        //   return
        // }
        // if ($scope.imgArr.length >= 8) {
        //   layer.msg('Upload eight images at most');
        //   return;
        // }
        dsp.ossUploadFile(validFileArr, function (data) {
          if(validFileArr[0]&&(validFileArr[0].size / 1024 / 1024 > 1)) {
            layer.msg('Accept JPG/PNG/MPG images within 1M.');
            return;
          }
          if (data.code == 0) {
            layer.msg('Images Upload Failed');
            return;
          }
          let result = data.succssLinks;
          if (result && result.length > 0) {
            for (let j = 0; j < result.length; j++) {
              let srcList = result[j].split('.');
              let fileName = srcList[srcList.length - 1].toLowerCase();
              if (fileName == 'png' || fileName == 'jpg' || fileName == 'jpeg') {
                $scope.imgArr.push(data.succssLinks[j]);
                layer.msg('Upload Success');
                $scope.partnerLogoVerifyErrorMsg = ''
                $scope.partnerLogoFlag = false;
              }else {
                layer.msg('Upload JPG or PNG');
              }
            }
          } else {
            layer.msg('Images Upload Failed');
          }
          $('.upload_file').val('')
          $scope.$apply();
        })
      };

    
  }]);
  // 页面商品渲染完毕执行
  app.directive('repeatFinish', function() {
    return {
      link: function(scope, element, attr) {
        if (scope.$last) {
          scope.$eval(attr.repeatFinish);
        }
      }
    };
  });
})(angular)
