'use strict';

const BaseController = require('@root/app/core/baseController')

// 商品列表备份
let hallowProsCache = {}
class HalloweenController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    /**
     * 活动页面
     */
    async index() {
        const { i18next } = this.PARAMS;
        const { type = "prop", id = '', refresh = '0' } = this.ctx.query;

        // 顶部导航菜单
        await this._createNav()

        // 万圣节样式
        const halloween = true

        // type prop 道具  decorate 装饰  clothing 服装
        const activityType = type

        const productParams = {
            'Lists': i18next.t('product-card-lists'),
            'View Inventory': i18next.t('product-card-view-inventory'),
            'List': i18next.t('product-card-list'),
            'Add to Queue': i18next.t('product-card-add-to-queue'),
            'Source': i18next.t('product-card-source'),
            'View More': i18next.t('common-view-more')
        }

        // 商品列表
        let err_list, res_list = []
        if (id && (!hallowProsCache[id] || refresh === '1')) {
            [err_list, res_list = []] = await this.service.halloween.getActivityProList({
                data: {
                    activityId: +id
                }
            })

            hallowProsCache[id] = res_list
        } else {
            res_list = hallowProsCache[id]
        }

        const list = res_list.map(({
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


        this.PARAMS = {
            ...this.PARAMS,
            ...{
                halloween,
                activityType,
                productParams,
                list
            }
        }
        await this.ctx.render('halloween/index.njk', this.PARAMS);
    }
}

module.exports = HalloweenController;