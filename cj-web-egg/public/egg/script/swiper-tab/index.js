new Vue({
  el: '#vue-swiper-tab',
  data: {
    isPrev: false,
    isNext: true,
    rowNum: 5,
    pageNum: parseInt(CJ_.getQueryVariable('tabPageCur')) || 1,
    totalPage: 0,
    wrapperStyles: {},
    slideStyles: {
      width: '100%'
    },
  },
  created() {
    this.totalPage = Math.ceil(document.querySelectorAll('#vue-swiper-tab .swiper-slide').length / this.rowNum)
    this.slideStyles = {
      ...this.slideStyles,
      width: 100 / this.rowNum + '%',
    }
    if (this.totalPage===1) {
      this.isPrev = false;
      this.isNext = false;
    }
    if (this.pageNum > 1) {
      this.isPrev = true
    }
    if (this.pageNum === this.totalPage) {
      this.isNext = false;
    }
    this.$nextTick(function () {
      const transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1)
      this.wrapperStyles = {
        transform: `translate3d(-${transform}px, 0, 0)`,
        transition: 'none'
      }
    })
  },
  methods: {
    // tab翻页
    onPrev() {
      if (this.pageNum>1) {
        this.isNext = true;
        this.pageNum -=1
        const transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1)
        this.wrapperStyles = {
          transform: `translate3d(-${transform}px, 0, 0)`
        }
      }
      if(this.pageNum === 1) {
        this.isPrev = false;
        this.isNext = true;
      }
    },
    onNext() {
      const totalPage = this.totalPage
      if (this.pageNum<totalPage) {
        this.isPrev = true;
        this.pageNum +=1
        const transform = this.$refs.swiperContainerDom.clientWidth * (this.pageNum - 1)
        this.wrapperStyles = {
          transform: `translate3d(-${transform}px, 0, 0)`
        }
      }
      if(this.pageNum === totalPage) {
        this.isPrev = true;
        this.isNext = false;
      }
    }
  }
})