const { Controller } = require('egg');

module.exports = class NotFound extends Controller {
  async index() {
    // this.ctx.body = '404 Not Found.';
    this.ctx.redirect('/404.html');
  }
}
