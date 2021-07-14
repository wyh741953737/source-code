/**
 * 分页组件 js
 */

/**
 * 获取路由
 */
function getRoute() {
  const currentPath = location.pathname
  const pathArr = currentPath.split('/')
  const len = pathArr.length
  let route = ''
  for (let i = 0; i < len; i++) {
    const item = pathArr[i]
    if (isNaN(item)) {
      route += '/' + item
    }
  }

  const pageNum = pathArr[len - 2] || 1
  let pageSize = pathArr[len - 1] || 10
  let showSize = true;
  if(location.pathname.indexOf('/productReport/list') !== -1) {
    pageSize = 8;
    showSize = false;
  }
  return {
    route,
    pageNum: isNaN(+pageNum) ? 1 : pageNum,
    pageSize: isNaN(+pageSize) ? 10 : pageSize,
    showSize: showSize
  }
}

const { route, pageNum, pageSize, showSize } = getRoute()

new Vue({
  el: '#vue-page',
  data: {
    skipPage: pageNum + '',
    skipPageSize: pageSize + '',
    showPageSize: showSize
  },
  methods: {
    handleInputPage: function() {
      const goBtn = document.getElementById('goBtn');
      if(Number(this.skipPage) > Number(egg_totalPageNumber)) {
        goBtn.style.cursor = 'no-drop';
        goBtn.style.pointerEvents = 'none';
        goBtn.style.color = '#e5e1da';
      } else {
        goBtn.style.cursor = 'pointer';
        goBtn.style.pointerEvents = 'initial';
        goBtn.style.color = '#f99429';
      }
    },
    // 跳页
    changeFun: function () {
      const page = this.skipPage
      if (!page) return
      location.href = `${route}/${page}/${pageSize}${location.search || ''}`
    },
    // 分页size调整
    changePageSize: function changePageSize() {
      const size = this.skipPageSize
      location.href = `${route}/1/${size}${location.search || ''}`
    }
  }
})
