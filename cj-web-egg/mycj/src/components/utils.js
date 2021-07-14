/**
 * @typedef TargetDom { dom: Element, rect: DOMRect, styles: CSSStyleDeclaration }
 * 
 * 配合loading、not found等组件获取定位目标元素dom，默认到路由出口dom
 * @param {String} targetDom 目标元素
 * @returns TargetDom
 */
export function getTargetDom(targetDom) {
  const viewRoute = document.querySelector('#router-outlet-wrap');
  const coverDom = typeof (targetDom) === 'string'
    ? document.querySelector(targetDom) : null;
  const dom = coverDom || viewRoute;
  const rect = dom.getBoundingClientRect();
  const styles = getComputedStyle(dom);

  return { dom, rect, styles };
}
