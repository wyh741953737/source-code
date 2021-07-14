
/**
 * 自定义全局过滤器
 */

; (function () {
  var app = angular.module('cjDirectiveModule', []);
  /** 默认图片 */
  app.directive('errSrc', function () {
    return {
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          if (attrs.src != attrs.errSrc) {
            $(element).removeClass('sp-smallimg');
            attrs.$set('title', 'Image Doesn\'t Exsit');
            attrs.$set('src', attrs.errSrc);
          }
        });
        attrs.$observe('ngSrc', function(value) {
          if (!value && attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
  });

}());