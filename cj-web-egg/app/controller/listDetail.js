'use strict';

const BaseController = require('@root/app/core/baseController')

class ListDetailController extends BaseController {

	constructor(...args) {
		super(...args); // required
	}

	/**
	 * 搜索进入
	 */
	async list() {
		const { i18next } = this.PARAMS;
		await this._createNav() // 顶部导航菜单
		
		const productParams = {
			'Lists': i18next.t('product-card-lists'),
			'View Inventory': i18next.t('product-card-view-inventory'),
			'List': i18next.t('product-card-list'),
			'Add to Queue': i18next.t('product-card-add-to-queue'),
			'Source': i18next.t('product-card-source'),
			'View More': i18next.t('common-view-more')
		}
		// 商品列表
		const data = await this.service.listDetail.getCjList({
			data: {
				page: 1, // 当前页
				size: 60, // 当前条数
			}
		})
		const query = this.ctx.url.split('?')[1] && this.ctx.url.split('?')[1].split('&') || []
		let isOtherListType = false
		query.forEach(item => {
			let pair = item.split("=");
			if (pair[0] == 'otherListType') {
				isOtherListType = true;
			}
		})
		this.createListPageModule({
      route:'/list-detail',
      totalNum: data && data.totalRecords || 0
    })
		const list = data && data.content && data.content[0].productList.map(item => {
			return {
				...item,
				id: item.id,
				bigImg: item.bigImage,
				productId: item.id,
				isCollect: item.isCollect,
				num: item.listedNum,
				nameVal: item.nameEn,
				nameEn: item.nameEn,
				sellPrice: item.sellPrice,
			}
		}) || []
		this.PARAMS = {
			...this.PARAMS,
			list,
			productParams,
			isOtherListType,
			noDataType: 'searchNoData',
		}
		await this.ctx.render('list-detail/index.njk', this.PARAMS);
	}
}

module.exports = ListDetailController;