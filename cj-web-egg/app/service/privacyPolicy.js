require('module-alias/register');
const Service = require('egg').Service;
const privacyPolicy = require('../const/privacyPolicy.json');
module.exports = class userAgreementService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getPrivacyPolicyList() {
    return privacyPolicy;
  }

}
