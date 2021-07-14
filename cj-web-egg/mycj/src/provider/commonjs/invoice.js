
/** 无发票提示 */
function noInvoiceTip() {
  // <a href="javascript:void(0);" class="re-submit">Cancel</a>
  layer.open({
    title: 'Consignee not found, unble to generate invoice.',
    type: 1,
    area: ['480px', '300px'],
    skin: 'no-invoice-tip',
    closeBtn: 1,
    content: '<div class="NIT-con"><img class="invoice-icon" src="./static/image/public-img/ticket_invoice.png" alt="" /><a  class="go-set">Setup Now</a></div>',
    btn: ['Cancel'],
    success: function (layero, index) {
      $(layero).find('.go-set').click(function () {
        layer.close(index);
        window.open('myCJ.html#/profile/invoice');
      });
    },
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function (index, layero) {
      layer.close(index);
    }
  });
}

/** 是否弹窗去设置发票抬头 */
export function isinvoiceDialog(postFun) {
  return function (id, type) {
    const msgLoading = cjMessage.loading({ isFixed: true })
    if (type == 'VIDEOPAY') {
      postFun('tool/invoiceBill/getInvoiceBillByVideoDownloadId', {
        'orderId': id,
        'flag': type
      }, function (res) {
        msgLoading.hide()
        if (res.data.statusCode == 901) {
          noInvoiceTip();
          // isHref = 2;
        } else {
          location.href = 'invoice.html?id=' + id + '&type=' + type;
          // isHref = 1;
        }
      }, function (res) {
        msgLoading.hide()
      });
    } else {
      postFun('tool/invoiceBill/getInvoiceBillByOrderId', {
        'orderId': id,
        'flag': type
      }, function (res) {
        msgLoading.hide()
        if (res.data.statusCode == 901) {
          noInvoiceTip();
          // isHref = 2;
        } else {
          location.href = 'invoice.html?id=' + id + '&type=' + type;
          // isHref = 1;
        }
      }, function (res) {
        msgLoading.hide()
      });
    }
  }
}

/** wall-invoice */
export function iswallInvoiceDialog(postFun) {
  return function (startTime, endTime, exportType) {
    layer.load(2);
    postFun('tool/invoiceBill/getInvoiceBillTitalList', {}, function (res) {
      layer.closeAll('loading');
      if (res.data.result.length > 0) {
        location.href = 'wallet-invoice.html?startTime=' + startTime + '&endTime=' + endTime + '&exportType=' + exportType;
      } else {
        noInvoiceTip();
      }
    }, function (res) {
      layer.closeAll('loading');
    });
  }
}
