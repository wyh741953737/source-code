(function (angular) {
  angular.module('cjCompnentModule')
      .component('swiperReply', {
          templateUrl: 'static/components/swiper_reply/swiper_reply.html',
          controller: ['$scope', 'dsp', function ($scope, dsp) {
            swiperReplyCtrl.call(this, $scope, dsp);
        }],
        bindings: {
          list:'<',
          index: '<',
          show: '<'
        }
      })

  function swiperReplyCtrl($scope) {
    console.log('this:::', this)
    $scope.replySlideshow = this.show;
    $scope.number = this.index;
    $scope.list = this.list;
    $scope.defaultImg = 'static/image/public-img/default.jpg';
    const widthStyle = {
      width: '100%',
      height: 'auto'
    }
    const heightStyle = {
      width: 'auto',
      height: '100%'
    }
    $scope.swiperImageList = [];
    
    const formatImage = () => {
      const img = new Image();
      const arr = [];
      $scope.list && $scope.list.map(item => {
        img.src = item;
        const  w = img.width;
        const h = img.height;
        const obj = {
          img: item,
          style: widthStyle
        }
        if((w < 500 && h > 500) || (w > 500 && h > 500 && w < h)) {
          obj.style = heightStyle;
        }
        arr.push(obj);
      })
      return arr;
    }
    $scope.swiperImageList = formatImage();
    
    const initSwiperReply = () => {
      const swiperReply = new Swiper('.reply-swiper-container',{
        initialSlide: $scope.number,
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
        slideToClickedSlide: true,
        grabCursor: true,
        nextButton: '.reply-swiper-button-next',
        prevButton: '.reply-swiper-button-prev',
        pagination: '.reply-swiper-pagination',
        paginationType : 'bullets',
        paginationClickable :true,
        uniqueNavElements: false,
        observer: true,
      });
    }
    initSwiperReply();
  }
})(angular);