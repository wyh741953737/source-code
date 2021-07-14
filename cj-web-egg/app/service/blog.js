require('module-alias/register');
const Service = require('egg').Service;
const utils = require('@root/common/utils');

module.exports = class BlogService extends Service {

  constructor(app) {
    super(app);
  }

  // 类目信息
  async getBlogList(opt = {}) {
    const { headers = {}, data = {} } = opt;
    console.log('list data', data)
    const [err, res] = await this.app.$ajax('cj/dbPostsPages/getPostsOrPages', {
      method: 'POST',
      headers: { ...headers },
      data
    })

    return err ? [err] : utils.statusCode200(res);
  }

  // 文章详情
  async getBlogById(opt = {}) {
    const { headers = {}, data = {} } = opt
    const [err, res] = await this.app.$ajax('cj/dbPostsPages/getPostsOrPagesDetail', {
      method: 'POST',
      headers: { ...headers },
      data
    })
    return err ? [err] : utils.statusCode200(res)
  }

}
