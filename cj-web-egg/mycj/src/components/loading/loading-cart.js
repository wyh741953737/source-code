import { DOMResizeObserver } from '@src/utils/dom';
import { getTargetDom } from '../utils';
import template from './loading-cart.html';
import styles from './loading-cart.less';
import cartImage from './loading-cart.gif';

export function loadingCartFactory(module) {
  module.component('loadingCart', {
    template,
    controller: ['$scope', '$element', function ($scope, $element) {
      $element.addClass([styles.loadingCartBox, 'component-loading-cart']);
      $scope.cartImage = cartImage;
      this.$onInit = () => setTimeout(() => init.call(this, $scope, $element), 40);
      this.$onDestroy = () => {
        this.observe && this.observe.disconnect();
      }
    }],
    bindings: {
      el: '=', // 可接收class、id，获取不到dom取ui-view

      // 四方向偏移量，传入number为偏移量，传入dom选择器为目标
      top: '=',
      right: '=',
      bottom: '=',
      left: '=',

      background: '=', // 自定义背景色，默认白色
    }
  });
}

function init($scope, $element) {
  const { dom, _ } = getTargetDom(this.el);
  const setStyle = () => {
    const { top, right, bottom, left } = offsetProcessor.call(this);
    $element.css({
      top, right, bottom, left,
      background: typeof (this.background) === 'string'
        ? this.background : '#fff',
    });
  }
  if (dom) {
    setStyle();
    this.observe = DOMResizeObserver(dom, () => setStyle(), 20); // 跟踪变化调整大小
  }
}

function offsetProcessor() {
  const { _, rect } = getTargetDom(this.el);
  let top = rect.top;
  let right = window.innerWidth - rect.right;
  let bottom = Math.max(0, window.innerHeight - rect.bottom); // 不要跑屏幕下面去
  let left = rect.left;

  if (typeof this.top === 'number') {
    top += this.top;
  } else if (typeof this.top === 'string') {
    const { top: t } = getRect(this.top);
    top = t !== undefined ? t : top;
  }
  if (typeof this.right === 'number') {
    right += this.right;
  } else if (typeof this.right === 'string') {
    const { right: r } = getRect(this.right);
    right = r !== undefined ? window.innerWidth - r : right;
  }
  if (typeof this.bottom === 'number') {
    bottom += this.bottom;
  } else if (typeof this.bottom === 'string') {
    const { bottom: b } = getRect(this.bottom);
    bottom = b !== undefined ? Math.max(0, window.innerHeight - b) : bottom;
  }
  if (typeof this.left === 'number') {
    left += this.left;
  } else if (typeof this.left === 'string') {
    const { left: l } = getRect(this.left);
    left = l !== undefined ? l : left;
  }

  return { top, right, bottom, left };
}

function getRect(el) {
  const dom = document.querySelector(el);
  return dom ? dom.getBoundingClientRect() : {};
}
