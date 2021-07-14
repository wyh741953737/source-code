'use strict';

const BaseController = require('@root/app/core/baseController')

// 商品列表备份
class serviceFeeController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    async index() {
        await this._createNav() // 顶部导航菜单
        this.createRelatedLinks() // 底部链接

        const allServiceFeeObject = await this.service.serviceFee.getList()
        this.PARAMS = {
            ...this.PARAMS,
            allServiceFeeObject,
            box_type: 'US'
        }
        await this.ctx.render('service-fee/index.njk', this.PARAMS);
    }
}

module.exports = serviceFeeController;