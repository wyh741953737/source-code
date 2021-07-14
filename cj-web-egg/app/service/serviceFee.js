require('module-alias/register');
const Service = require('egg').Service;
const fs = require('fs');

module.exports = class serviceFeeService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getList() {
    const list = fs.readFileSync('./app/const/serviceFee.json').toString();
    return JSON.parse(list);
  }

}
