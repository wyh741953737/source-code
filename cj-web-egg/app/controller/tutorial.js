'use strict';

const BaseController = require('@root/app/core/baseController')
const { paramsToObject, objectToParams } = require('@root/common/utils');

class TutorialController extends BaseController {

	constructor(...args) {
		super(...args); // required
	}

	async home() {
		await this._createNav() // 顶部导航菜单
		this.createRelatedLinks() // 底部链接

		const queryObj = paramsToObject(this.ctx.search) // url参数对象
		const { navType = 'content', searchType = 'content', faqType = '1', pageNum = '1', categoryId, menuOpenIdx, menuActiveIdx, keyWord = '' } = queryObj
		let pageSize = queryObj.pageSize
		// faq列表
		let faqList = []
		const faqData = await this.service.tutorial.getQuestionListByPage({
			data: {
				type: faqType,
				page: pageNum,
				limit: navType === 'faq' ? 10 : 5,
				status: '1',
				search: ''
			}
		})
		if (faqData.statusCode === 'CODE_200') {
			faqList = faqData.result.list;
		}
		// Popular Tutorials
		const [popularListerr, popularList = []] = await this.service.tutorial.queryPopularContent({
			data: {
				count: 4
			}
		})
		if(navType === 'content') {
			pageSize = 8
			let articleTitle = '' // content文章列表面包屑
			// 类目列表
			const [err1, menuList = []] = await this.service.tutorial.queryCategoryList()
			// Latest Tutorials
			const [err3, latestList = []] = await this.service.tutorial.queryLatestContent({
				data: {
					count: 4
				}
			})

			// 通过类目id查询文章列表
			let articleList = []
			if (categoryId) {
				// 类目列表
				const article = await this.service.tutorial.queryContentByCategoryId({
					data: {
						pageNum,
						pageSize,
						categoryId
					}
				})
				articleList = article.data || []
				this.createListPageModule({ // 分页
					route:'/help-center',
					pageNum: pageNum,
					pageSize,
					totalNum: article.total,
					totalPage: Math.ceil(article.total / 8)
				})
			}

			menuList.forEach((item1) => {
				item1.list.forEach((item2) => {
					if(item2.id === categoryId) {
						articleTitle = item1.categoryName + ' > ' + item2.categoryName
					}
				})
			})

			this.PARAMS = {
				...this.PARAMS,
				articleTitle,
				menuList,
				articleList,
				latestList,
			}
		} else if(navType === 'faq') { // faq
			pageSize = 10
			this.createListPageModule({ // 分页
				route:'/help-center',
				pageNum: pageNum,
				pageSize,
				totalNum: faqData.result.count || 0,
				totalPage: Math.ceil(faqData.result.count / pageSize) || 0,
			})

			this.PARAMS = {
				...this.PARAMS,
				faqTabList: [
					{
						name: 'Products',
					},
					{
						name: 'Orders',
					},
					{
						name: 'Shipment',
					},
					{
						name: 'After Sales Service',
					},
					{
						name: 'Others',
					},
					{
						name: 'Solutions',
					},
				].map((item, idx) => {
					const index = idx+1
					return {
						...item,
						active: faqType == index,
						type: index
					}
				}),
			}
		} else if(navType === 'search') {
			pageSize = 5
			const searchData = await this.service.tutorial.getArticleSearch({
				data: {
					keyWord,
					'page': pageNum,
					'size': 10,
					'dataType': searchType === 'content' ? 1 : 2
				}
			})
			const searchContentList = searchData.data && searchData.data.content || []
			this.createListPageModule({ // 分页
				route:'/help-center',
				pageNum: searchData.data.pageNumber,
				pageSize: searchData.data.pageSize,
				totalNum: searchData.data.totalRecords,
				totalPage: searchData.data.totalPages,
			})
			this.PARAMS = {
				...this.PARAMS,
				searchType, // content,faq
				keyWord,
				searchContentList
			}
		}
		const seoInfo = {
			title:navType==='faq'?'CJ FAQ - How to Post a Sourcing Request on CJ?':'CJdropshipping Tutorials | How to Use CJdropshipping',
			keywords:navType==='faq'?'CJ FAQ, how to use CJ, CJdropshipping tutorials':'dropshipping sourcing agent, sourcing agent dropshipping, cjdropshipping, cj dropshipping, chinese dropshipping suppliers, aliexpress dropshipping center, aliexpress dropship center, dropshipping center aliexpress',
			description:navType==='faq'?'Frequently asked questions(FAQ) about how to use CJdropshipping/how CJdropshipping works.':'Step by step tutorials on how to use each feature of CJdropshipping(CJ App), FAQ, new features tutorials.',
		}
		this.PARAMS = {
			...this.PARAMS,
			menuOpenIdx,
			menuActiveIdx,
			popularList,
			navType, // content/FAQ/search
			seoInfo,
			faqList: faqList.map((item, idx) => {
				return {
					...item,
					idx: pageSize * (pageNum - 1) + (idx + 1)
				}
			}),
			menuUrl: `${this.ctx.url.split('?')[0]}?scrollToNum=400&navType=content`,
		}
		await this.ctx.render('tutorial/index.njk', this.PARAMS);
	}

	async articleDetails() {
		const queryObj = paramsToObject(this.ctx.search) // url参数对象
		const { categoryId, menuOpenIdx, menuActiveIdx, pageNum = '1', pageSize } = queryObj
		await this._createNav() // 顶部导航菜单
		this.createRelatedLinks() // 底部链接

		let articleTitle = '' // content文章列表面包屑
		// 类目列表
		const [err1, menuList = []] = await this.service.tutorial.queryCategoryList()
		menuList.forEach((item1) => {
			item1.list.forEach((item2) => {
				if(item2.id === categoryId) {
					articleTitle = item1.categoryName + ' > ' + item2.categoryName
				}
			})
		})

		// 通过类目id查询文章列表
		let articleList = []
		if (categoryId) {
			// 类目列表
			const article = await this.service.tutorial.queryContentByCategoryId({
				data: {
					pageNum,
					pageSize: pageSize || 8,
					categoryId
				}
			})
			articleList = article.data
			this.createListPageModule({ // 分页
				route:'/help-center',
				pageNum: pageNum,
				pageSize: pageSize || 8,
				totalNum: article.total,
				totalPage: Math.ceil(article.total / 8)
			})
		}
		// 文章详情
		const [err3, detailContext = []] = await this.service.tutorial.getContentDetail({
			data: {
				id: this.ctx.params.id
			}
		})
		// Popular Tutorials
		const [popularListerr, popularList = []] = await this.service.tutorial.queryPopularContent({
			data: {
				count: 4
			}
		})
		this.PARAMS = {
			...this.PARAMS,
			menuList,
			articleTitle,
			articleList,
			menuOpenIdx,
			menuActiveIdx,
			detailContext,
			popularList,
			menuUrl: `${this.ctx.url.split('?')[0]}?scrollToNum=0`
		}
		await this.ctx.render('tutorial/articleDetails.njk', this.PARAMS);
	}
}

module.exports = TutorialController;