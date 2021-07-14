require('module-alias/register');
const policyJson = require('../../mycj/public/static/json/disputePolicy.json')
const Service = require('egg').Service;

module.exports = class DisputePolicyService extends Service {

  constructor(app) {
    super(app);
  }

  // 类目信息
  async getDisputePolicy(opt = {}) {
    return policyJson
  }

}
