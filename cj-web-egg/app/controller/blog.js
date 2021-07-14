'use strict';

const BaseController = require('@root/app/core/baseController')

/**删除标签且保留300字符 */
const delHtmlTag = str => {
  if (typeof str != 'string') return '';
  if (str.length <= 0) return '';
  return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').substr(0, 300) + '...'; //去掉所有的html标记
};

/**
 * 含有http转成https
 * @param {string} url 图片url
 */
const imgHttp2Https = url => {
  if (!url) return url
  if (url.startsWith('http:')) {
    return url.replace('http:', 'https:')
  }
  return url
}

/**返回自定义文件格式 */
const getFileList = (value) => {
  if (!value) return []
  return value.split(',').map(_ => {

    const urlSplit = _.split('/')
    let name = urlSplit[urlSplit.length - 1]
    name = name.replace(/^[0-9]{13}_/, '');
    const uid = name.split('.')[0]

    return {
      url: _,
      status: 'done',
      name,
      uid
    }
  })
}

class BlogController extends BaseController {

  constructor(...args) {
    super(...args); // required
  }

  /**
   * 文章列表
   */
  async list() {
    const ctx = this.ctx;
    const test = {};

    const pageObj = {
      pageNum: +ctx.params.pageNum || 1,
      pageSize: +ctx.params.pageSize || 10
    }
    const searchParams = {
      title: ctx.query.title || '',
      type: 0
    }

    const host = `${ctx.protocol}://${ctx.host}` // http://127.0.0.1:7000  相当于当前页面的host

    test.params = ctx.params;
    test.detailUrl = '?fromUrl=' + encodeURIComponent(`${host}/blog/list/${pageObj.pageNum}/${pageObj.pageSize}${ctx.search}`)

    const [err, data_info] = await this.service.blog.getBlogList({ data: { ...pageObj, data: searchParams } })
    const data_list = {
      ...data_info,
      ...pageObj,
      ...searchParams
    }

    this.createPageModule({
      route:'/blog/list',
      totalNum: (data_info && data_info.total) || 0
    })

    test.blog = data_list || {}
    test.blog.list = test.blog.list.map(_ => ({ ..._, coverUrl: imgHttp2Https(_.coverUrl), desc: delHtmlTag(_.description ? _.description : _.content) }))
    test.blog.totalNum = Math.ceil(test.blog.total / test.blog.pageSize)

    const pagesizeList = ['10', '20', '50']
    pagesizeList.forEach((item, index) => {
      test.pagesizeList += `<option value="${item}" ${item == pageObj.pageSize ? 'selected' : ''}>${item}</option>`
    })

    this.createRelatedLinks()
    await this._createNav()

    this.PARAMS = {
      ...this.PARAMS,
      ...test
    }

    await this.ctx.render('blog/list.njk', this.PARAMS);
  }

  /**
   * 文章详情
   */
  async detail() {
    const ctx = this.ctx;
    const test = {};
    const id = ctx.params.id;
    let fromUrl = decodeURIComponent(ctx.query.fromUrl || '/blog/list')
    let openFrom = ctx.query.openFrom || "normal"
    const isCom = ctx.host.indexOf('.com') === -1;

    test.id = id;
    test.openFrom = openFrom;

    if(isCom){
      // 强制返回参数fromUrl为com链接
      fromUrl = fromUrl.replace('.cn', '.com')
    }
    test.fromUrl = fromUrl

    test.url = isCom
      ? '//m.cjdropshipping.cn/blog/list'
      : '//m.cjdropshipping.com/blog/list';

    const [err, data_info] = await this.service.blog.getBlogById({ data: { id: encodeURIComponent(id) } })
    test.detail = !err ? data_info : {}
    test.detail.downloadFiles = getFileList(test.detail.fileUrl || '')
    this.createRelatedLinks()
    await this._createNav()

    this.PARAMS = {
      ...this.PARAMS,
      ...test
    }

    await this.ctx.render('blog/detail.njk', this.PARAMS);
  }
}

module.exports = BlogController;