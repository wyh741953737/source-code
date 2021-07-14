<template>
  <div class="swiper-tab" id="swiper-tab">
    <div class="swiper-container" ref="swiperContainerDom">
      <div class="swiper-wrapper" :style='wrapperStyles'>
        <div class="swiper-slide" :style='slideStyles' :class="{ active:idx == tabCur}" :key="idx" v-for="(item, idx) of tabList" v-on:click="onTab(item, idx)">
          <div class="main">
            {{item.nameEn}}
          </div>
        </div>
      </div>
    </div>
    <span class="swiper-button-prev iconfont iconleft2" v-on:click="onPrev($event)" v-show="isPrev"></span>
    <span class="swiper-button-next iconfont iconright2" v-on:click="onNext($event)" v-show="isNext"></span>
  </div>
</template>

<script>
export default {
  name: "swiper-tab",
  props: {
    data: {
      type: Object,
      default: () => ({
        pageNum: 0,
        rowNum: 0,
        tabList: []
      })
    },
  },
  data() {
    return {
      tabCur: 0,
      isPrev: false,
      isNext: true,
      rowNum: this?.data?.rowNum || 5,
      pageNum: this?.data?.pageNum || 1,
      wrapperStyles: {},
      slideStyles: {
        width: '100%'
      },
    };
  },
  computed: {
    tabList: function() {
      return this?.data?.tabList || []
    },
  },
  created() {
    this.slideStyles = {
      ...this.slideStyles,
      width: 100 / this.rowNum + '%',
    }
    if (this.tabList.length<=this.rowNum) {
      this.isPrev = false;
      this.isNext = false;
    }
  },
  methods: {
    onTab(item, idx) {
      this.tabCur = idx
      this.$parent.onTab(item)
    },
    // tab翻页
    onPrev($event) {
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
    onNext($event) {
      const totalPage = Math.ceil(this.tabList.length / this.rowNum)
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
}
</script>

<style lang="less" scoped>
.swiper-tab {
  position: relative;
  .swiper-container {
    width: 100%;
    overflow: hidden;
    border-bottom: 6px solid #FF7700;
    .swiper-wrapper {
      transition: all 300ms ease 0s;
      display: flex;
      .swiper-slide{
        cursor: pointer;
        padding: 0px 10px;
        flex-shrink: 0;
        width: 20%;
        height: 34px;
        line-height: 34px;
        .main {
          background: #FFFFFF;
          border-radius: 4px 4px 0px 0px;
          font-size: 14px;
          color: #333333;
          text-align: center;
          height: 100%;
        }
        &.active {
          .main {
            background: #FF7700;
            color: #fff;
          }
        }
      }
    }
  }
  .swiper-button-prev, .swiper-button-next {
    position: absolute;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #FF7700;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    color: #fff;
    top: 5px;
    cursor: pointer;
  }
  .swiper-button-prev {
    left: -50px;
  }
  .swiper-button-next {
    right: -50px;
  }
}
</style>
