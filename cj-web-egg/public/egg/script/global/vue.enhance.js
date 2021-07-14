import filters from '@common/filter';
import dot from '@common/dot';
import Message from '../vue/message';

/**
 * 定制下全局 Vue
 */
; ~function (Vue) {
  //给首页添加埋点
  dot.init(Vue)
  window.Vue = function (options) {
    if (options && options.el) {
      if (!options.el.startsWith('#vue-')) {
        console.error('请示用 vue-xxxx 的形式命名 id:', options.el);
      }
    }
    
    Vue.use(Message);

    return new Vue(Object.assign({
      // 修改 Vue 定界符与 es6 保持统一。{{}} 与 njk 冲突
      delimiters: ['${', '}'],
      filters: Object.assign(filters, options.filters),
      methods: Object.assign(filters, options.methods),
    }, options));
  }
}(Vue);
