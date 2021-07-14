'use strict';

const BaseController = require('@root/app/core/baseController')

// 商品列表备份
class PrintonDemandController extends BaseController {

	constructor(...args) {
		super(...args); // required
	}

	/**
	 * 全球仓
	 */
	async index() {
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
		// 商品列表, 仓库接口太慢，先不考虑seo,等下次换搜索接口在调整回来
		// const [err, data = []] = await this.service.globalWarehouse.getCjList({
		// 	data: {
		// 		pageNum: "1",
		// 		pageSize: "60",
		// 		categoryCount: 10,
		// 		firstSearch: false,
		// 		getCategories: false,
		// 		categoryId: "",
		// 		startPrice: "",
		// 		endPrice: "",
		// 		inputStr: "",
		// 		nationType: "all",
		// 		productType: "all",
		// 	}
		// })
		const data = null
		const query = this.ctx.url.split('?')[1] && this.ctx.url.split('?')[1].split('&') || []
		let isOtherListType = false
		query.forEach(item => {
			let pair = item.split("=");
			if (pair[0] == 'otherListType') {
				isOtherListType = true;
			}
		})
		const list = data && data.list && data.list.map(item => {
			return {
				...item,
				productId: item.id,
				nameVal: item.nameEn,
				flag: '1'
			}
		}) || []

		// 获取banner
		const [err_list, banner_list = []] = await this.service.globalWarehouse.getBannerList()
		this.PARAMS = {
			...this.PARAMS,
			list,
			productParams,
			isOtherListType,
			banner_list: banner_list.map(item => {
				return {
					...item,
					linkUrl: item.linkUrl || 'javascript:void(0);'
				}
			}),
			noDataType: 'gwNoData',
		}
		await this.ctx.render('globalWarehouse/index.njk', this.PARAMS);
	}
}

module.exports = PrintonDemandController;