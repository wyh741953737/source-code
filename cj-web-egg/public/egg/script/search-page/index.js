/**
 * 分页组件 js
 */

new Vue({
  el: '#vue-search-page',
  data: {
    pageData: {
      pageNum: 1, // 当前页
      pageSize: 60
    }
  },
  created() {
    const query = CJ_.paramsToObject(window.location.search.substring(1))
    this.pageData = {
      pageNum: query.pageNum || 1,
      pageSize: query.pageSize || 60
    }
  },
  methods: {
    // 跳页
    changeFun: function (totalPage) {
      const pageNum = parseFloat(this.pageData.pageNum)
      if (pageNum > parseFloat(totalPage)) {
        this.pageData.pageNum = totalPage
      }
      if(!pageNum) {
        this.pageData.pageNum = 1
      }
      location.href = `${location.pathname}?${CJ_.objectToParams({
        ...CJ_.paramsToObject(location.search),
        ...this.pageData
      })}`
    },
    onInput(e) {
      this.pageData.pageNum = e.target.value.match(/^\d+$/g)?.[0];
    },
    // 分页size调整
    // changePageSize: function changePageSize() {
    //   const size = this.skipPageSize
    //   location.href = `${route}/1/${size}${location.search || ''}`
    // }
  }
})