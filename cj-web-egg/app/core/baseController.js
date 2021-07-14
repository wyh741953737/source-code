/**
 * @description 基础类 Controller 处理
 * @author zhengwenjian
 */

const { Controller } = require('egg')
const i18next = require('i18next')
const { languages } = require('@root/common/config');
const { relatedLinks } = require('@root/app/const/relatedLinks');
const { pageModule, searchPageModule } = require('@root/app/const/pageModule')
const { searchFilter } = require('@root/app/const/searchFilter')
const { topNavList } = require('../const/topNavList');
const serialize = require('serialize-javascript');
const { NODE_ENV } = require('@root/env');

class BaseController extends Controller {

    constructor(...args) {
        super(...args)
        this.lng = i18next.language;
        this.PARAMS = {
            i18next,
            LNG: this.lng,
            translation: serialize(this.ctx.translation || '{}'),
        };
        this.service.home.getCategoryList(true, { sync: false, lng: this.getLng(this.lng) })
            .then(data => {
                const [ err, dataList ] = data;
                let cacheList = dataList || '[]';
                this.PARAMS.categoryList = serialize(cacheList)
            })
    }
    /**
     * 获取语言
     */
    getLng(lng) {
        return languages.includes(lng) ? lng : 'en'
    }

    /**
     * 判断是否本地翻译
     */
    isLocalLng(lng) {
      if(this.ctx.isGoogleTrans) return false
      return languages.includes(lng)
    }

    /**
     * 获取顶部仓库列表
     */
    async _createNav() {
        const podUrl = [
            '/printonDemand/home',
            '/printonDemand/help'
        ]
        let navList = topNavList(i18next);
        if (podUrl.includes(this.ctx.url)) {
            // 如果是pod页面
            navList = navList.map(item => {
                if (item.key === 'pod') {
                    return {
                        ...item,
                        active: true
                    }
                }
                return item
            })
        }
        this.PARAMS.topNavList = navList;
        const [err_warehouse, data_warehouse] = await this.service.home.getWarehouseList(true, { sync: false, lng: this.getLng(this.lng) });
        const warehouse_href = [];
        if (!err_warehouse) {
            // const ctx = this.ctx;
            // console.log(NODE_ENV,ctx.host,"sssssssssss");
            // NODE_ENV是环境变量 production-cn和 production 是线上环境,其他的都走测试环境
            data_warehouse.forEach(item => {
                let url = `http://${item.countryCode.toLowerCase()}.test.com`;
                // if(NODE_ENV==="production-cn"){
                //     url = `https://${item.countryCode.toLowerCase()}.cjdropshipping.cn`;
                // }
                if(NODE_ENV==="production"||NODE_ENV==="production-cn") {
                    url = `https://${item.countryCode.toLowerCase()}.cjdropshipping.com`;
                }
                warehouse_href.push({
                    name: item.areaVal,
                    href: url
                });
            });
            this.PARAMS.topNavList[2].child = warehouse_href;
        }
    }

    /**
     * 底部链接生成
     */
    createRelatedLinks() {
        this.PARAMS.relatedLinks = relatedLinks(i18next)
    }

    /**
     * 生成pageModule属性
     * @param {*} param0 route 当前不带参数路由url  totalNum 当前列表返回的总数
     */
    createPageModule({ route = '', totalNum = 0 }) {
        const ctx = this.ctx;
        const host = `${ctx.protocol}://${ctx.host}` // http://127.0.0.1:7000  相当于当前页面的host
        const search = ctx.search
        const pageNum = +ctx.params.pageNum || 1;
        let pageSize = +ctx.params.pageSize || 10;

        if(route.indexOf('/productReport/list') !== -1) {
            pageSize = 8;
        }

        this.PARAMS.pageModule = pageModule({
            host,
            pageNum,
            pageSize,
            search,
            route,
            totalNum
        })
    }
    createListPageModule({ route = '', pageNum = 1, pageSize = 60, totalNum = 0, totalPage = 0 }) {
        const ctx = this.ctx;
        const host = `${ctx.protocol}://${ctx.host}` // http://127.0.0.1:7000  相当于当前页面的host
        const search = ctx.search
        this.PARAMS.pageModule = searchPageModule({
            host,
            search,
            route,
            pagenum: pageNum,
            pagesize: pageSize,
            totalnum: totalNum,
            totalpage: totalPage
        })
    }
    createSearchFilter({ route = '', keywordData = [], category = [], warehouseData = [], prodTypeData = [], sortData = {}}) {
        const ctx = this.ctx;
        const search = ctx.search
        this.PARAMS.searchFilter = searchFilter({
            search,
            route,
            keywordData,
            category,
            warehouseData,
            prodTypeData,
            sortData
        })
    }
}

module.exports = BaseController