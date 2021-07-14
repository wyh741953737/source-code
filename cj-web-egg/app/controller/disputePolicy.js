'use strict';

const BaseController = require('@root/app/core/baseController')

module.exports = class disputePolicyController extends BaseController {

  constructor(...args) {
    super(...args); // required
  }

  async index() {
    this.createRelatedLinks()
    await this._createNav()
    const disputePolicyJson = await this.service.disputePolicy.getDisputePolicy()
    const {
      RefundCase,
      ImportantInterpretation
    } = disputePolicyJson

    const termsList = RefundCase;
    const interList = ImportantInterpretation;

    this.PARAMS = {
      ...this.PARAMS,
      termsList,
      interList,
    }
    await this.ctx.render('disputePolicy', this.PARAMS);

  }
}