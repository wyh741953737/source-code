
<template>
  <div class="vue-load-bounce" :class="{bg:isbg}">
    <slot />

    <div class="vue-bounce-box" v-show="loading">
      <div class="loading-ball" ref="loadingRef"></div>
      <!-- <span class="vue-bounce-item1"></span>
      <span class="vue-bounce-item2"></span> -->
    </div>
  </div>
</template>

<script>
import { cjMessage } from '../cjTool/cjMessage';
export default {
  name: 'load-bounce',
  props: ["loading", "isbg"],
  mounted() {
    const dom = this.$refs.loadingRef;
    this.msgLoaing = cjMessage.loading({ popupContainerDom: dom })
  },
  destroyed() {
    this.msgLoaing.hide()
  }
};
</script>

<style lang="less">
@keyframes sk-bounce {
  0%,
  to {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
.vue-load-bounce {
  height: 100%;
  position: relative;
  &.bg {
    position: relative;
    &::after {
      background-color: #fff;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
}
.vue-bounce-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  transform: translate(-50%, -50%);
  z-index: 1;
  .loading-ball {
    width: 64px;
    height: 64px;
  }
}
</style>
