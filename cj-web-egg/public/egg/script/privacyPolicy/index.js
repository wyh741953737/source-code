import { addChatOrGuidJs } from "../vue/mixin";
let addChatOrGuidJsMixin = new addChatOrGuidJs({})
if (document.querySelector('#privacyPolicy')) {
  new Vue({
    el: "#privacyPolicy",
    mixins: [addChatOrGuidJsMixin],
    data: {
      showMore: false,
      openIndex: null,
      lastDom: null,
      userAgreementEnList: {}
    },
    created() {
    },
    methods: {
      handleShowMore($event) {
        this.showMore = !this.showMore;
        const e = $event.currentTarget;
        const i = e.getAttribute("i");
        const classList = e.nextElementSibling.classList;
        if (classList.contains('item-content-open')) {
          this.openIndex = null
          e.lastElementChild.classList.remove('arrow-down');
          e.nextElementSibling.classList.remove('item-content-open');
          e.nextElementSibling.style.height = '0px'
          return
        }
        if (this.openIndex == i) {
          this.openIndex = null
          e.lastElementChild.classList.remove('arrow-down');
          e.nextElementSibling.classList.remove('item-content-open');
          e.nextElementSibling.style.height = '0px'
          return
        }
        e.lastElementChild.classList.add('arrow-down');
        e.nextElementSibling.style.height = e.nextElementSibling.scrollHeight + 20 + 'px';
        e.nextElementSibling.classList.add('item-content-open');
        this.openIndex = i;
        this.lastDom = e;
      }
    }
  });
}