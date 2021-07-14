import productCard from '../vue/product-card.vue';
import loadBounce from '../vue/load-bounce.vue';
import { login, saveDataAfterLogin } from '../home/commonLogin';
import { addChatBody, addGuidWindow } from '../global/utils';

new Vue({
    el: "#vue-activity-box",
    components: {
        productCard,
        loadBounce,
    },
    beforeCreate() {
        this.query = {
            id: CJ_.getQueryVariable('id') || '',
            type: CJ_.getQueryVariable('type') || 'prop'
        };
    },
    data: {
        loading: false,
        disable: false,
        list: [],
        imgSize: [179, 190],
        logined: CJ_isLogin
    },
    created() {
        // erp tocj
        const _that = this;
        const username = CJ_.getQueryVariable('username');
        const tempassword = CJ_.getQueryVariable('tempassword');
        const operateuser = CJ_.getQueryParam('operateuser');// 拿到的是经过base64加密的字符串
        if (username && tempassword) {
            login({
                name: decodeURIComponent(username),
                passwd: decodeURIComponent(tempassword),
                chatType: "0",
                platform: 'pc',
                isTOCJ: 'true'
            }, function (data) {
                if (data.statusCode != 200) {
                    _that.$my_message.info(data.message);
                } else {
                    // 保存登录信息
                    CJ_.store.set('loginfromerp', '1'); // 标记从erp过来的模拟登录
                    CJ_.store.set('erpoperateuser', operateuser) // 记录从erp过来的操作用户
                    let cookieObj = { expires: 3, domain: __root__domain }
                    CJ_.$cookie.set('loginfromerp', '1', cookieObj);
                    CJ_.$cookie.set('erpoperateuser', operateuser, cookieObj);
                    saveDataAfterLogin(data.result);
                    location.href = 'home.html';
                }
            })
        } else {
            // 如果不是erp过来的登录，加载聊天
            !CJ_.store.get('loginfromerp') && addChatBody();
            !CJ_.store.get('loginfromerp') && addGuidWindow();
        }

        const { id, type } = this.query
        console.log('this activityId', id)
        if (!id) return
        let url = 'cj/activity/getProductList'
        this.getList(url, { activityId: +id })
    },
    mounted() {

    },
    methods: {
        // 获取列表
        getList(url, params) {
            const listen = loading => this.loading = loading
            CJ_.$axios.post(url, params, listen)
                .then(([err, res]) => {
                    if (err) return console.warn(err)

                    const [e, d] = CJ_.statusCode200(res)
                    if (e) return console.warn(e)
                    if (Array.isArray(d)) {
                        this.list = d.map(({
                            id: productId,
                            sku,
                            isCollect,
                            listedCount: num,
                            nameEn: nameVal,
                            sellPrice: SELLPRICE,
                            authorityStatus,
                            bigImg,
                            islist
                        }) => ({
                            id: productId,
                            productId,
                            sku,
                            isCollect,
                            num,
                            nameEn: nameVal,
                            nameVal,
                            SELLPRICE,
                            authorityStatus,
                            bigImg,
                            flag: 1,
                            islist
                        })).filter((_, i) => i <= 39)
                    }
                })

        }
    }
});


// 登录后的一些操作
; !function loginedHandle() {
    if (!CJ_isLogin) {
        return;
    }

}();