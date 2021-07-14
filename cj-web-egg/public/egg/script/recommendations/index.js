import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})

if(document.querySelector('#vue-recommendations')) {
  new Vue({
    el: "#vue-recommendations",
    mixins: [addChatOrGuidJsMixin],
  });
}
