import { throttle } from '@src/utils';


/**
 * DOM 观察者
 * @param {ELement} el 
 * @param {Function} fn 
 */
export function DOMobserver(
  el, fn = () => { }, options = { childList: true, subtree: true }) {
  let observe = new MutationObserver(ev => fn(ev));
  observe.observe(el, options);
  return observe;
}

/**
 * DOM 尺寸变化观察
 */
export function DOMResizeObserver(dom, cb, delay = 400) {
  let observe = null;
  if (typeof ResizeObserver === 'function') {
    observe = new ResizeObserver(throttle(function () {
      cb();
    }, delay));
    observe.observe(dom);
  }
  return observe;
}
