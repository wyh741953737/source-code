
import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs()
if (document.querySelector('#vue-link')) {
  new Vue({
    el: '#vue-link',
    data: {
      logined: CJ_isLogin,
    },
  });
}

if (document.querySelector('#vue-addChatOrGuidJs')) {
  new Vue({
    el: '#vue-addChatOrGuidJs',
    mixins: [addChatOrGuidJsMixin],
  });
}

if (document.querySelectorAll('.layout-box .layout-row .img-box img').length > 0) {
  document.querySelectorAll('.layout-box .layout-row .img-box img').forEach(element => {
    element.setAttribute('data-scroll-reveal', 'enter bottom over 0.7s and move 100px')
  });
}
if (document.querySelectorAll('.layout-box .layout-row .warp-title h2').length > 0) {
  document.querySelectorAll('.layout-box .layout-row .warp-title h2').forEach(element => {
    element.setAttribute('data-scroll-reveal', 'enter bottom over 0.9s and move 100px')
  });
}
if (document.querySelectorAll('.layout-box .layout-row .warp-title p').length > 0) {
  document.querySelectorAll('.layout-box .layout-row .warp-title p').forEach(element => {
    element.setAttribute('data-scroll-reveal', 'enter bottom over 1.1s and move 100px')
  });
}
if (document.querySelectorAll('.layout-box .layout-row .warp-title .footer-page-btn').length > 0) {
  document.querySelectorAll('.layout-box .layout-row .warp-title .footer-page-btn').forEach(element => {
    element.setAttribute('data-scroll-reveal', 'enter bottom over 1.1s and move 100px')
  });
}
if (document.querySelectorAll('.cla-animated').length > 0) {
  document.querySelectorAll('.cla-animated').forEach(element => {
    element.setAttribute('data-scroll-reveal', 'enter bottom over 1s and move 100px')
  });
}

//监听滚动条
let currentVal = 0;
let scrollVal = 0;
let reset = true;
let isResetBool = reset;
window.sr = new scrollReveal({
  reset,
});
window.addEventListener('scroll', () => {
  currentVal = scrollVal;
  scrollVal = window.pageYOffset;
  if (currentVal < scrollVal) {
    //滚动条下滑
    reset = true
  } else {
    //滚动条上滑
    reset = false
  }
  if (reset == isResetBool) {
    if (currentVal < scrollVal) {
      //滚动条下滑
      window.sr.elems.forEach(element => {
        element.classList.remove("noAnimated")
      });
    } else {
      //滚动条上滑
      window.sr.elems.forEach(element => {
        element.classList.add("noAnimated")
      });
    }
    isResetBool = !reset
  }
})