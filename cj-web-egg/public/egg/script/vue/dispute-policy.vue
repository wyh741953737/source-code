<template>
  <div class="content">
    <h3 class="title">Refund, Resend and Returns Policy</h3>
    <div class="description">
      <p>This refund policy is to be used as a resource by dropshippers who work with CJdropshipping.com (“CJ”).</p>
      <p>Please review the following policies carefully.</p>
    </div>
    <div class="summary">
      <p style="padding: 6px 0;">ALL DISPUTES SHALL BE OPENED ON CJ. OTHERWISE, CJ WILL BLOCK YOUR ACCOUNT PERMANENTLY. </p>
      <p style="padding: 6px 0;">CJ offers a quicker dispute solution and will appreciate it a lot if you provide:</p>
      <div class="some-items">
        <p>
          <span>a.&nbsp;</span>
          <span>Photos or videos of the damaged item to prove damage. If the photo cannot prove the products are damaged, please upload the video.</span>
        </p>
        <p>
          <span>b.&nbsp;</span>
          <span>Screenshot of the e-mail or dispute received including name, date and content. In other words, a customer has sent the complaint (Through PayPal Dispute or other Gateway, e-mail, etc.).</span>
        </p>
        <p>
          <span>c.&nbsp;</span>
          <span>The products need to be returned to CJ if our Dispute Team asks for a return on the AS Service Center.</span>
        </p>
      </div>
    </div>
    <div class="information">
      <p class="information-title">
        <span>Except</span>
        <span style="color: #333333;font-weight:600;">the important interpretation,</span>
        <span> CJ will make Refund, Resend, or Accept the Return for any of the following cases:</span>
      </p>

      <!-- termsList列表 -->
      <div class="terms-list-box" :class="{ 'top-border': index === 0 }" v-for="(item, index) in termsList">
        <h3 class="trems-list-title" v-on:click="handleShowItem(item)">
          <span>{{ item.TITLE }}</span>
          <img src="/static/image/arrow/arrow-down1.png" class="trems-arrow" :class="{ 'arrow-down': item.SHOWMORE }" alt="">
        </h3>
        <div class="terms-list-more" :id="'terms-list-more' + index" :class="{ showMore: item.SHOWMORE }">
          <div class="terms-list-description" :class="{ 'show-terms-list-description': item.SHOWMORE }">
            <p v-for="description in item.DESCRIPTION" v-html="description"></p>
          </div>
          <div class="terms-list-items" :class="{ 'show-terms-list-items': item.SHOWMORE }">
            <div v-for="ele in item.POINTS">
              <p class="step">
                <span>{{ ele.STEP }}</span>
                <span v-html="ele.CONTENT"></span>
              </p>
              <div v-if="ele.ITEMS" style="padding-left: 24px;">
                <p class="step" v-for="element in ele.ITEMS">
                  <span>{{ element.LABEL }}</span>
                  <span v-html="element.VALUE"></span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="item.NOTES.length > 0" style="margin-top: 6px;" class="notes-box" :class="{ 'show-terms-list-description': item.SHOWMORE }">
            <p class="trems-list-title terms-list-notes">Notes:</p>
            <p class="terms-list-notes step nopl" v-for="note in item.NOTES">
              <!-- {{note.STEP}} -->
              <span v-if="note.STEP">{{ note.STEP }}</span>
              <span v-html="note.CONTENT"></span>
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- interList -->
    <div class="inter-box information">
      <h3 class="inter-box-title">Important Interpretation</h3>
        <div class="terms-list-box" :class="{'top-border': index === 0}" v-for="(item, index) in interList">
          <h3 class="trems-list-title" v-on:click="handleShowItem(item)">
            <span>{{ item.TITLE }}</span>
            <img src="/static/image/arrow/arrow-down1.png" class="trems-arrow" :class="{'top-border': index === 0}" alt="">
          </h3>
          <div class="terms-list-more" :class="{showMore: item.SHOWMORE}">
            <div class="terms-list-description">
              <p v-for="description in item.DESCRIPTION" v-html="description"></p>
            </div>
            
            <div class="terms-list-items">
              <div v-for="ele in item.POINTS">
                <p class="step">
                  <span>{{ ele.STEP }}</span>
                  <span v-html="ele.CONTENT"></span>
                </p>
                <div v-if="ele.ITEMS" style="padding-left: 24px;">
                  <p class="step" v-for="element in ele.ITEMS">
                    <!-- {{element.LABEL}} -->
                    <span>{{ element.LABEL }}</span>
                    <!-- {{element.VALUE}} -->
                    <span v-html="element.VALUE"></span>
                  </p>
                </div>
              </div> 
            </div>
            <div v-if="item.NOTES.length > 0">
              <p class="trems-list-title terms-list-notes">Notes:</p>
              <p class="terms-list-notes step nopl" v-for="note in item.NOTES">
                <span v-if="note.STEP">{{ note.STEP }}</span>
                <span v-html="note.CONTENT"></span>
              </p>
            </div>
          </div>
        </div>

    </div>
    <p class="contact-us">CJ always try to offer the best service. If you have any other questions, please feel free to <a href="https://chat.cjdropshipping.com/#/newChat" target="_blank" class="link">contact us</a>.
    </p>
  </div>
</template>

<script>
const policyJson = require('../../../../mycj/public/static/json/disputePolicy.json')

export default {
  name: "dispute-policy",
  data() {
    return {
      termsList:policyJson.RefundCase,
      interList:policyJson.ImportantInterpretation,
    };
  },
  created() {
    
  },
  methods: {
    handleShowItem(item) {
      item.SHOWMORE = !item.SHOWMORE;
    },
  }
};
</script>