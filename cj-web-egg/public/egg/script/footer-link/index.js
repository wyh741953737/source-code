const i18next = require('i18next')
const { relatedLinks } = require('@root/app/const/relatedLinks');

//底部链接
new Vue({
  el: '#vue-related-links',
  beforeCreate() {
  },
  data: {
    relatedLinksList: relatedLinks(i18next) || []
  },
  created() {
    console.log(this.relatedLinksList)
  },
  filters:{
    getTitleHref: (href) => {
      let authHref = href.includes('myCJ.html') ? CJ_.authLoginUrl(href) : href;
      return authHref
    }
  },
});