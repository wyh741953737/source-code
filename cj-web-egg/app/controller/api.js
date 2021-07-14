const { Controller } = require('egg');

module.exports = class Api extends Controller {
  // 记录请求报错日志
  async addRequestErrLog() {
    const ctx = this.ctx;
    const errorInfo = ctx.query;
    // console.log("2020error",errorInfo)
    ctx.logger.error(new Error(decodeURIComponent(JSON.stringify(errorInfo))));
    ctx.status = 200;
  }

  // 手动清缓存
  async manualSchedule(){
    console.log(this.ctx.params, this.ctx.query)
    const { name, password } = this.ctx.query
    if(name && password === 'a123456'){
      this.app.runSchedule(name)
      console.log('手动执行定时任务成功')
    }

    this.ctx.status = 200
  }
}
