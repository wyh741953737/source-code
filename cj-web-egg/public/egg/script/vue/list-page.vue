<template>
  <div class="list-page">
    <!-- <div class="select-page-num">
      <select class="form-control notranslate" v-model="page.pageSize" v-on:change="changePageSize" v-html="pagesizeListHtml">
      </select>
      <span>per page</span>
    </div> -->
    <div class="total-num">
      {{ page.totalNum}}{{page.totalNum > 1 ? ' Records Found' : ' Record Found'}}
    </div>
    <div class="page-index notranslate" v-html="pageLinksHtml" v-on:click="pageChange($event)">
    </div>
    <div class="to-go">
      <span>Showing：</span>
      <input @input="onInput" type="text" v-model="quickJumperNum" class="form-control" placeholder="">
      <span>of {{ this.totalPage }}</span>
      <a class="btn btn-default" role="button" v-on:click="goPage()">Go</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-page",
  props: {
    page: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      quickJumperNum: this.page.pageNum
      // pageNum: parseInt(this.page.pageNum) || 1,
      // pageSize: parseInt(this.page.pageSize) || 60,
      // totalNum: parseInt(this.page.totalNum) || 0,
      // pagesizearr: this.page.pagesizearr || ['10', '20', '50'],
      // pageLinksHtml: '',
      // pagesizeListHtml: ''
    };
  },
  computed: {
    // pagesizeListHtml: function() {
    //   let pagesizeListHtml = ''
    //   this.page.pagesizearr.forEach((item, index) => {
    //     pagesizeListHtml += `<option value="${item}" ${item == this.page.pageSize ? 'selected' : ''}>${item}</option>`
    //   });
    //   return pagesizeListHtml
    // },
    totalPage: function () {
      return this.page.totalPages || 0
    },
    pageLinksHtml: function () {
      const pageNum = parseInt(this.page.pageNum)
      const pageSize = parseInt(this.page.pageSize)
      const totalNum = parseInt(this.page.totalNum)
      const totalPage = parseInt(this.page.totalPages)

      const prev = `${(pageNum - 1) < 1 ? 1 : pageNum - 1}`
      const next = `${pageNum + 1}`

      const nullLink = 'javascript:void(0)'

      const fristLink = `<a class="prev" href="${nullLink}" page-data="${pageNum == 1 ? null : 1}">&lt;&lt;</a>`
      const prevLink = `<a class="prev" href="${nullLink}" page-data="${pageNum == 1 ? null : prev}">&lt;</a>`
      const nextLink = `<a class="next" href="${nullLink}" page-data="${pageNum == totalPage ? null : next}">&gt;</a>`
      const lastLink = `<a class="next" href="${nullLink}" page-data="${pageNum == totalPage ? null : totalPage}">&gt;&gt;</a>`


      let headLinks = ''
      let headCount = pageNum - 5 < 0 ? ((pageNum - 1) > 2 ? 2 : pageNum - 1) : 2

      let endLinks = ''
      let endCount = pageNum + 5 > totalPage ? ((totalPage - pageNum) > 2 ? 2 : totalPage - pageNum) : 2

      if (endCount + headCount != 4) {
        if (endCount < 2) {
          const needCount = 2 - endCount
          headCount += (pageNum - needCount - headCount) >= 0 ? needCount : 0
        }
        if (headCount < 2) {
          const needCount = 2 - headCount
          endCount += (pageNum + needCount + endCount) <= totalPage ? needCount : 0
        }
      }

      for (let i = pageNum - 1; i > pageNum - pageSize; i--) {
        if (headCount == 0 || i <= 0) break
        headLinks = `<a href="${nullLink}" page-data="${i}">${i}</a>` + headLinks
        headCount--
      }

      let centerLinks = `<a href="${nullLink}" page-data="null" class="current">${pageNum}</a>`

      for (let i = pageNum + 1; i < pageNum + pageSize; i++) {
        if (endCount == 0) break
        endLinks += `<a href="${nullLink}"  page-data="${i}">${i}</a>`
        endCount--
      }

      const pageLinksHtml = fristLink + prevLink + headLinks + centerLinks + endLinks + nextLink + lastLink;
      return pageLinksHtml
    }
  },
  created() {
  },
  methods: {
    // 跳页
    pageChange: function (event) {
      const num = event.target.getAttribute('page-data')
      if(num && num != 'null') {
        this.$parent.pageChange(parseFloat(num))
      }
    },
    // 快速跳至某页
    goPage: function (event) {
      if (parseFloat(this.quickJumperNum) > parseFloat(this.totalPage)) {
        this.quickJumperNum = this.totalPage
      }
      if(parseFloat(this.quickJumperNum) === 0 || !this.quickJumperNum) {
        this.quickJumperNum = 1
      }
      this.$parent.pageChange(parseFloat(this.quickJumperNum))
    },
    onInput(e) {
      this.quickJumperNum = e.target.value.match(/^\d+$/g)?.[0];
    },
  }
}
</script>

<style lang="less" scoped>
// 样式文件使用额外的 list-page.less，可以 njk 和 vue 公用
</style>
