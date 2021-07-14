require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class tutorialService extends Service {

  constructor(app) {
    super(app);
  }

  // 类目列表
  async queryCategoryList(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/contentCategory/queryCategoryList',
      data: opt.data || {},
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 通过类目id查询文章列表
  async queryContentByCategoryId(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/contentInfo/queryContentByCategoryId',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : data;
  }

  // 获取Popular Tutorials列表
  async queryPopularContent(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/contentInfo/queryPopularContent',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取Latest Tutorials列表
  async queryLatestContent(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/contentInfo/queryLatestContent',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 获取fqa列表
  async getQuestionListByPage(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'app/message/getQuestionListByPage',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : data;
  }

  // 获取文章详情
  async getContentDetail(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'cj/contentInfo/getContentDetail',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : utils.statusCode200(data);
  }

  // 文章搜索
  async getArticleSearch(opt = {}) {
    const { headers = {}, lng } = opt;
    // 即时拉取
    const [err, data] = await this.app.$ajax({
      method: 'post',
      url: 'elastic-api/article/search',
      data: opt.data,
      headers: { ...headers },
    })
    return err ? [err] : data;
  }
}
