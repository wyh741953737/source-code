require('module-alias/register');
const Service = require('egg').Service;
const fs = require('fs');
const userAgreementEn = require('../const/userAgreementEn.json');
const userAgreementCN = require('../const/userAgreementCN.json');
module.exports = class userAgreementService extends Service {

  constructor(app) {
    super(app);
  }

  // 列表
  async getUserAgreementEnList() {
    return userAgreementEn;
  }
  async getUserAgreementCNList() {
    return userAgreementCN;
  }

}
