
import template from './bounce.html';
import styles from './bounce.less';

const BOUNCE_ANIMATE = `@keyframes loading-bounce {
  0%, to { transform: scale(0); opacity: .94; }
  50% { transform: scale(1); opacity: .49; }
}`;

/**
 * bounce loading
 * @param {Boolean} load 动画开启、关闭
 */
class LoadingBounce {
  static $inject = ['$scope', '$element', '$transclude'];

  constructor($scope, $element, $transclude) {
    this.$scope = $scope;
    this.$element = $element; // <loading-bounce> 自身
    this.$transclude = $transclude; // <ng-transclude>
    this.$scope.loadingId = Date.now();
    this.$element.addClass(['component-loading-bounce', styles.wrap]);
    this.styleTag = document.createElement('style');
    // this.styleTag.innerHTML = BOUNCE_ANIMATE;
    document.head.appendChild(this.styleTag); // 插入动画样式
    const self = this;

    this.$scope.$on('msgBarRendered', function(ev) { // 在节点加载后执行
      const dom = document.getElementById(self.$scope.loadingId)
      console.log(dom.children, '30');
      if (!(dom && dom.children && dom.children.length)) {
        cjMessage.loading({ popupContainerDom: dom });
      }
    });
  }

  // $onInit() { }

  $onChanges() {
    this.$scope.load = this.load;
  }

  $onDestroy() {
    document.head.removeChild(this.styleTag); // 移除动画样式
  }

  /* handleAppend() { // 插入模式
    this.$transclude((elements, ctrl) => {
      Array.from(elements).reverse().forEach((ele, idx, arr) => {
        this.$element.after(ele); // 把元素全部推到外面
        if (idx === arr.length - 1) {
          
        }
      });
    });
  } */
}

export function loadingBounceFactory(module) {
  module.component('loadingBounce', {
    template,
    controller: LoadingBounce,
    transclude: true,
    bindings: {
      load: '<',  // 加载
    }
  });
  module.directive('onFinishRender', ['$timeout', '$parse', function($timeout, $parse){
    return {
      restrict:'A',
      link: function(scope, element, attr){
          $timeout(function(){
              scope.$emit('msgBarRendered'); // 这里执行msgBarRendered
          })
      }
    }
  }])
}
