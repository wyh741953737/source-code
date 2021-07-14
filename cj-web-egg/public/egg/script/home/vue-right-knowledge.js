/**
 * 首页 You may want to know
 * @author zhoumiao
 * @since 2020/9/1
 */
new Vue({
  el: '#vue-right-knowledge',
  data: {
  },
  methods: {
    // 获取一些销售金额、钱包、订单信息之类的(接口返回一部分用户信息)
    contentClick(id) {
      CJ_.$axios.post('pojo/promotionContent/addClickCount', { 'id': id }).then(([err, data]) => {
        if(err){
          console.log(err)
        }
      });
    }
  },
});