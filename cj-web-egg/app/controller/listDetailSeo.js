'use strict';

const BaseController = require('@root/app/core/baseController')
const { $base64, paramsToObject, objectToParams, JSONparse } = require('@root/common/utils');

class ListDetailSeoController extends BaseController {

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
		const seoData = {
			"TH": {
				title: 'CJ Thailand Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'dropshipping, dropship, dropship thailand, shopee dropshipping, lazada dropshipping, หาเงินออนไลน์, ธุรกิจ ecom, dropshiper, reseller dropship',
				description: 'Source winning products from CJ Thailand warehouse, 3-7 days local shipping, free warehousing.',
			},
			"US": {
				title: 'CJ US Warehouses, 3-7 Days Delivery - CJdropshipping',
				keywords: 'usa wholesalers, usa wholesale, dropship suppliers in usa, drop shipping suppliers usa,dropshipping supplier usa, dropshipping suppliers in usa, us dropshipping suppliers, dropshipping from usa, wholesale suppliers usa, usa wholesale suppliers',
				description: 'Source winning products from CJ US warehouse, 3-7 days local shipping, free warehousing.',
			},
			"CN": {
				title: 'CJ China Warehouse, Fulfill Worldwide - CJdropshipping',
				keywords: 'china dropshipping,chinese dropshipping suppliers, chinabrands dropshipping, china brand dropshipping, dropshipping china',
				description: 'Source winning products from CJ China warehouse, fulfill worldwide, free warehousing.',
			},
			"DE": {
				title: 'CJ Germany Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'dropshipping, drop shipping, shopify dropshipping, ebay dropshipping',
				description: 'Source winning products from CJ Germany warehouse, 3-7 days local shipping, fulfill within Europe, free warehousing.',
			},
			"ID": {
				title: 'CJ Indonesia Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'dropshiper, reseller dropship, dropship aja, cara dropship di shopee, cara jadi dropship, bisnis dropship, daftar dropship,dropship terpercaya, what is print on demand',
				description: 'Source winning products from CJ Indonesia warehouse, 3-7 days local shipping, free warehousing.',
			},
			"AU": {
				title: 'CJ Australia Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'Australian wholesalers, australian wholesale, dropship suppliers in australia, drop shipping suppliers australia,dropshipping supplier australia, dropshipping suppliers in australia, australian dropshipping suppliers, dropshipping from australia, wholesale suppliers australia, australian wholesale suppliers',
				description: 'Source winning products from CJ Australia warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"JP": {
				title: 'CJ Japan Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'dropshipping Japan, drop shipping japan, dropship japan, japan dropshipping, dropshipping in japan',
				description: 'Source winning products from CJ Japan warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"CA": {
				title: 'CJ Canada Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'Canadian wholesalers, Canadian wholesale, dropship suppliers in Canada, drop shipping suppliers Canada,dropshipping supplier Canada, dropshipping suppliers in Canada, Canadian dropshipping suppliers, dropshipping from Canada, wholesale suppliers Canada, Canadian wholesale suppliers',
				description: 'Source winning products from CJ Canada warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"MX": {
				title: 'CJ Mexico Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'Canadian wholesalers, Canadian wholesale, dropship suppliers in Canada, drop shipping suppliers Canada,dropshipping supplier Canada, dropshipping suppliers in Canada, Canadian dropshipping suppliers, dropshipping from Canada, wholesale suppliers Canada, Canadian wholesale suppliers',
				description: 'Source winning products from CJ Mexico warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"GB": {
				title: 'CJ Britain Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords: 'dropshipping uk, uk dropshipping, spocket, dropshipping suppliers, uk dropshipping suppiers,uk wholesale, uk dropship, uk drop shipping, dropshipping supplier in uk',
				description: 'Source winning products from CJ Britain warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"MY": {
				title: 'CJ Malaysia Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords:"dropship malaysia, cjdropshipping, cj dropshipping, dropshipping, dropship shopee, dropship supplier malaysia, dropshipping suppliers",
				description: 'Source winning products from CJ Malaysia warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"FR": {
				title: 'CJ France Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords:"dropshipping, drop shipping, shopify dropshipping, ebay dropshipping, cdiscount dropshipping, dropshipping France, dropshipping français",
				description: 'Source winning products from CJ France warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"CZ": {
				title: 'CJ Czechia Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords:"dropshipping czechia, drop shipping czechia, dropship czechia, czechia dropshipping, dropshipping in Czech, drop shipping in Czech republic",
				description: 'Source winning products from CJ Czechia warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
			"PH": {
				title: 'CJ Philippine Warehouse, 3-7 Days Delivery - CJdropshipping',
				keywords:"COD dropshipping philippines, cash on delivery dropshipping, shopee dropshipping, lazada dropshipping, dropshipping",
				description: 'Source winning products from CJ Philippine warehouse, 3-7 days Free shipping, local delivery, free warehousing.',
			},
		};
		const queryObj = paramsToObject(this.ctx.search) || {} // url参数对象
		let kcType = [1] // 0：显示推荐关键词，1：显示面包屑类目
		let otherListType = ''
		let isOtherListType = false
		let countryCode
		let data =[] // 搜索列表数据
		let list
	 	let keywordData // 关键字列表
		let pageData = {}
		let trendSearchData
		let trendSearchList = []
		if (queryObj.otherListType) {
			isOtherListType = true
			otherListType = queryObj.otherListType; // 如果url有参数，就是首页view More点击进入
		}
		if(queryObj.from === 'all' || !queryObj.from) {
			countryCode = undefined
		} else {
			countryCode = queryObj.from
		}
		const seoInfo = seoData[countryCode]||{title:"Search on CJdropshipping",keywords:"Drop Shipping USA，Sourcing Drop Shipping，Print on Demand，Fulfillment，Drop Shipping Supplier",description:"Sourcing and Fulfilling for WED2C, Shopify, WooCommerce, eBay Dropshippers with High Quality Products and Faster Shipping."}
		console.log(countryCode,seoInfo,'sssssssssss')
 		// 类目列表
		const [err, category = []] = await this.service.listDetail.getCateGoryList({ // 请求商品列表数据
			headers: {
				language: this.getLng(this.lng)
			}
		})

		if (isOtherListType) {
			trendSearchData = await this.service.listDetail.getTrendSearch({
				data: {
					page: queryObj.pageNum || 1, // 当前页
					size: queryObj.pageSize || 60, // 当前条数
					categoryId: queryObj.id || undefined,
					productFlag: queryObj.otherListType || undefined
				}
			})

			if (trendSearchData && trendSearchData.content && trendSearchData.content.length) {
				trendSearchList = trendSearchData.content[0].productList.map(item => {
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
						flag: '1'
					}
				}) || []
			}
			pageData = trendSearchData
		} else {
			data = await this.service.listDetail.getCjList({ // 请求商品列表数据
				data: {
					page: queryObj.pageNum || 1, // 当前页
					size: queryObj.pageSize || 60, // 当前条数
					keyWord: queryObj.search || undefined, // 关键词
					categoryId: queryObj.id || undefined, // 分类id
					countryCode, // 仓库国家地区短码
					productType: queryObj.productType || undefined, // 商品类型 4-供应商商品  10-视频商品
					startSellPrice: queryObj.startSellPrice || undefined, // 售卖价格起始值
					endSellPrice: queryObj.endSellPrice || undefined, // 售卖价格结束值
					addMarkStatus: queryObj.addMarkStatus || undefined, // 0-不包邮 1-包邮
					sortByParam: { // {feildType: 0-最匹配 1-刊登  2-价格 3-最新的。isAsc：0-降序 1-升序}
						feildType: queryObj.feildType || 0,
						isAsc: queryObj.isAsc || 0
					},
				}
			})
	
			list = data && data.content && data.content[0].productList.map(item => {
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
					flag: '1'
				}
			}) || []
			keywordData = queryObj.cateArr ? (JSONparse($base64.decode(queryObj.cateArr))[1] || []) : (data && data.content && data.content[0].relatedCategoryList || [])
			if(keywordData.length > 0) {
				// 展示关键字
				kcType = [0];
			} else {
				// 展示三级类目
				kcType = [1];
			}
	
			this.createSearchFilter({ // 搜索条件筛选
				route:'/list-detail',
				keywordData,
				category,
				warehouseData: [
					{
						areaEn: 'Ship from All Warehouses',
						countryCode: ''
					},
					...data && data.content && data.content[0].storeList || []
				],
				prodTypeData: [{ // 商品类型 4-供应商商品  10-视频商品
					name: 'Sort All Types',
					productType: ''
				},{
					name: 'Supplier Products',
					productType: 4
				},{
					name: 'Product Videos',
					productType: 10
				}],
				sortData: {
					feildType: queryObj.feildType ? queryObj.feildType : 0, // 0:bestMatch, 1:Lists, 2:price, 3:newest
					isAsc: queryObj.isAsc ? queryObj.isAsc : 0, // 0:降序, 1:升序
					BestMatch: {
						feildType: 0,
						isAsc: 0
					},
					Lists: {
						feildType: 1,
						isAsc: 0
					},
					Price: {
						feildType: 2,
						isAsc: queryObj.isAsc == 1 ? 0 : 1
					},
					Newest: {
						feildType: 3,
						isAsc: 0
					}
				}
			})
			pageData = data
		}

		this.createListPageModule({ // 分页
			route:'/list-detail',
			pageNum: pageData && pageData.pageNumber || 1,
			pageSize: pageData && pageData.pageSize || 60,
			totalNum: pageData && pageData.totalRecords || 0,
			totalPage: pageData && pageData.totalPages || 0,
		})
		
		this.PARAMS = {
			...this.PARAMS,
			list,
			trendSearchList,
			productParams,
			noDataType: 'searchNoData',
			keywordTitle: 'CATEGORIES',
			kcType,
			isSortby: true,
			isFilterWarehouse: true,
			isOtherListType,
			otherListType,
			countryCode,
			seoInfo,
			categoryTab: [
				{
          id: '',
          nameEn:"All Categories"
				},
				...category
			].map((item, idx) => {
				let isActive = false;
				if(!queryObj.id && idx === 0) {
					isActive = true
				} else {
					isActive = (queryObj.id === item.id)
				}
				return {
					isActive,
					nameEn: item.nameEn,
					url: `/list-detail?${objectToParams({
						...queryObj,
						pageNum: 1, // 当前页
						pageSize: 60, // 当前条数
						id: item.id || '',
						tabPageCur: Math.ceil((idx+1) / 5) || 1
					})}`,
				}
			}),
			otherListTitles: { // 0-趋势商品 1-最新商品 2-视频商品 3.滞销
				'0': 'Trending Products',
				'1': 'New Products',
				'2': 'Video Products',
				'3': 'Super Deals'
			},
		}
		// console.log(this.PARAMS,'***************')
		await this.ctx.render('list-detail/index-seo.njk', this.PARAMS);
	}
}

module.exports = ListDetailSeoController;