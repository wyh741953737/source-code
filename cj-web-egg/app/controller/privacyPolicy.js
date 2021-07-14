'use strict';

const BaseController = require('@root/app/core/baseController')

// 商品列表备份
class privacyPolicyController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    async index() {
        await this._createNav() // 顶部导航菜单
        this.createRelatedLinks() // 底部链接

        let privacyPolicyList = await this.service.privacyPolicy.getPrivacyPolicyList();
        
        this.PARAMS = {
            ...this.PARAMS,
            privacyPolicyList
        }
        await this.ctx.render('privacyPolicy/index.njk', this.PARAMS);
    }
}

module.exports = privacyPolicyController;