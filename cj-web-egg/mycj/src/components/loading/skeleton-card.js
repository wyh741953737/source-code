import template from './skeleton-card.html';
import styles from './skeleton-card.less';

const SKELETON_ANIMATE = `@keyframes skeleton-animate {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}`;

export function skeletonCardFactory(module) {
  module.component('skeletonCard', {
    template,
    controller: SkeletonCard,
    bindings: { },
  });
}

class SkeletonCard {
  static $inject = ['$scope', '$element'];

  styleTag = document.createElement('style');

  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }

  $onInit() {
    this.styleTag.innerHTML = SKELETON_ANIMATE;
    document.head.appendChild(this.styleTag);
    this.$element.addClass(['component-skeleton-card', styles.skeleton]);
  }

  $onDestroy() {
    document.head.removeChild(this.styleTag);
    // console.log(';;;;;;;;;;;;;;;;;;;;;;;')
  }

}
