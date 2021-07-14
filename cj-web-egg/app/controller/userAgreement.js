'use strict';

const BaseController = require('@root/app/core/baseController')
const { paramsToObject, objectToParams } = require('@root/common/utils');

// 商品列表备份
class userAgreementController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    async index() {
        await this._createNav() // 顶部导航菜单
        this.createRelatedLinks() // 底部链接

        let userAgreementEnList = await this.service.userAgreement.getUserAgreementEnList();
        const userAgreementCNList = await this.service.userAgreement.getUserAgreementCNList();
        const type = this.ctx.params.type;
        let iconType = 'en';
        if(type == 'cn') {
            userAgreementEnList = userAgreementCNList;
            iconType = 'cn';
        }
        
        this.PARAMS = {
            ...this.PARAMS,
            userAgreementEnList,
            iconType
        }
        await this.ctx.render('user-agreement/index.njk', this.PARAMS);
    }
}

module.exports = userAgreementController;