import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})
if (document.querySelector('#vue-service-fee')) {
  new Vue({
    el: "#vue-service-fee",
    mixins: [addChatOrGuidJsMixin],
    data: {
      isClick: 'US'
    },
    methods: {
      handleChange(val, idx) {
        this.isClick = val;
        for (let i = 0; i < document.querySelectorAll('.sf_public').length; i++) {
          if (idx === i) {
            document.querySelectorAll('.sf_public')[i].style.display = 'block'
          } else {
            document.querySelectorAll('.sf_public')[i].style.display = 'none'
          }
        }
      }
    }
  });
}