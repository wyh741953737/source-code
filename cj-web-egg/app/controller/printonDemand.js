'use strict';

const BaseController = require('@root/app/core/baseController')

// 商品列表备份
class PrintonDemandController extends BaseController {

    constructor(...args) {
        super(...args); // required
    }

    /**
     * pod主页
     */
    async home() {
        const { i18next } = this.PARAMS;
        // 顶部导航菜单
        await this._createNav()
        // 商品列表
        const productParams = {
            'Lists': i18next.t('product-card-lists'),
            'View Inventory': i18next.t('product-card-view-inventory'),
            'List': i18next.t('product-card-list'),
            'Add to Queue': i18next.t('product-card-add-to-queue'),
            'Source': i18next.t('product-card-source'),
            'View More': i18next.t('common-view-more')
        }
        const [err_list, res_list = []] = await this.service.printonDemand.getActivityProList()
        const list = res_list.map(item => {
            return {
                id: item.id,
                productId: item.productId,
                isCollect: 0,
                num: item.num,
                nameVal: item.nameEn,
                nameEn: item.nameEn,
                sellPrice: item.sellPrice,
                authorityStatus: item.authorityStatus,
                bigImg: item.bigImg,
                flag: 1,
                isPersonalized: 1
            }
        })
        // uploadType-> 1:文章，2：视频，3：政策
        const [err_video, video_list = []] = await this.service.printonDemand.getBottomHelpInfo({
            data: {
                'uploadType': '2',
            }
        });
        const [err, data = []] = await this.service.printonDemand.getIndividuationProductList()
        const trendingList = data.map(item => {
            return {
                id: item.id,
                productId: item.id,
                isCollect: item.isCollect,
                num: item.num,
                nameVal: item.nameEn,
                nameEn: item.nameEn,
                sellPrice: item.SELLPRICE,
                authorityStatus: item.authorityStatus,
                bigImg: item.bigImg,
                flag: item.flag,
                isPersonalized: item.isPersonalized
            }
        })
        this.PARAMS = {
            ...this.PARAMS,
            swiperList: res_list.filter((item,i) => {
                if (i < 3 && item.productId) {
                    return item
                }
            }),
            productList: list.filter((item,i) => {
                if(i > 2 && i<=11 && item.productId) {
                    return item
                }
            }),
            video_list: video_list.sort((a,b)=>{
                return  new Date(b.createAt).getTime() -new Date(a.createAt).getTime()
            }),
            trendingList,
            productParams
        }
        await this.ctx.render('printonDemand/home.njk', this.PARAMS);
    }

    /**
     * pod帮助页
     */
    async help() {
        // 顶部导航菜单
        await this._createNav()
        // uploadType-> 1:文章，2：视频，3：政策
        const [err_text, text_list = []] = await this.service.printonDemand.getBottomHelpInfo({
            data: {
                'uploadType': '1',
            }
        });
        const [err_policy, policy_list = []] = await this.service.printonDemand.getBottomHelpInfo({
            data: {
                'uploadType': '3',
            }
        });
        const [err_video, video_list = []] = await this.service.printonDemand.getBottomHelpInfo({
            data: {
                'uploadType': '2',
            }
        });
        this.PARAMS = {
            ...this.PARAMS,
            text_list: text_list.sort((a,b)=>{
                return  new Date(b.createAt).getTime() -new Date(a.createAt).getTime()
            }),
            video_list: video_list.sort((a,b)=>{
                return  new Date(b.createAt).getTime() -new Date(a.createAt).getTime()
            }),
            policy_list: policy_list.sort((a,b)=>{
                return  new Date(b.createAt).getTime() -new Date(a.createAt).getTime()
            })
        }
        await this.ctx.render('printonDemand/help.njk', this.PARAMS);
    }
}

module.exports = PrintonDemandController;