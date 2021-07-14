export function load(layerLeft) {
  layer.load(2, {
    shade: [0.5, '#393D49'],
    content: 'Loading, please wait a moment!',
    success: function (layero) {
      const contentCss = {
        'width': '300px',
        'height': '60px',
        'text-align': 'center',
        'padding-top': '30px'
      }
      if (layerLeft) contentCss['left'] = '-150px';
      layero.find('.layui-layer-content').css(contentCss);
      layero.find('.layui-layer-loading').css({
        'transform': 'translate(-50%,-50%)!important'
      });
      layero.find('.layui-layer-loading2').css({
        'background-position': 'top center'
      });
    }
  });
}

export function loadPercent($dom, height, x, y, options) {
  var _options = options || { width: $dom.innerWidth() + 'px' }

  $dom.css({
    'position': 'relative',
    'min-height': height + x + 'px'
  });
  var picHeight = 260;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }

  var newDom = '<div class="cj-load-percent" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff; width: ' + _options.width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + ((picHeight + 50) / 2 + 15) + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/public-img/loading_percent.gif" alt="" /></div><p style="text-align: center; color: #f69829; font-size: 14px; line-height: 50px;">Loading, please wait a moment!</p></div></div>';
  if (_options.delay) {
    setTimeout(function () { $dom.append(newDom); }, _options.delay);
  } else {
    $dom.append(newDom);
  }
}

export function closeLoadPercent($dom, options) {
  var _options = options || { delay: 0 }

  if (_options.delay) {
    setTimeout(function () {
      $dom.find('.cj-load-percent').remove();
      $dom.css('min-height', 'auto');
    }, _options.delay);
  } else {
    $dom.find('.cj-load-percent').remove();
    $dom.css('min-height', 'auto');
  }
}

export function addNodataPic($dom, height, x, y,otherParam, ifDel) {
  if(ifDel) {
    if(angular.element('.cj-nodata-pic').length > 0) {
      angular.element('.cj-nodata-pic').remove()
    }
  }
  $dom.css({
    'position': 'relative',
    'min-height': height + 'px'
  });
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff;width:' + width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/public-img/no_search_data.png" alt="" /></div><p style="text-align: center; color: #87899C; font-size: 14px; line-height: 50px;">Sorry, we cannot find any data.</p></div></div>';
  $dom.append(newDom);
}

export function addNodataPicNewStyle($dom, vip, otherParam, ifDel) {
  if(ifDel) {
    if(angular.element('.cj-nodata-pic').length > 0) {
      angular.element('.cj-nodata-pic').remove()
    }
  }
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="min-height: 500px; background: #fff;width: 100%; height: 100%"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: 200px;" src="./static/image/public-img/' + (vip ? 'no_search_data_vip' : 'no_search_data') + '.png" alt="" /><p style="text-align: center; color: #87899C; font-size: 16px; margin-top: 20px;">Sorry, we cannot find any data.</p></div></div></div>';
  $dom.append(newDom);
}

export function beforeSearchPic($dom, height, x, y,otherParam) {
  $dom.css({
    'position': 'relative',
    'min-height': height + 'px'
  });
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff;width:' + width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/new-nodata/before-search.png" alt="" /></div><p style="text-align: center; color: #87899C; font-size: 14px; line-height: 50px;">Sorry, we cannot find any data.</p></div></div>';
  $dom.append(newDom);
}

export function afterSearchPic($dom, height, x, y,otherParam) {
  $dom.css({
    'position': 'relative',
    'min-height': height + 'px'
  });
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff;width:' + width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/new-nodata/after-search.png" alt="" /></div><p style="text-align: center; color: #87899C; font-size: 14px; line-height: 50px;">Sorry, we cannot find any data.</p></div></div>';
  $dom.append(newDom);
}

export function beforeSearchPicVIP($dom, height, x, y,otherParam) {
  $dom.css({
    'position': 'relative',
    'min-height': height + 'px'
  });
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff;width:' + width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/new-nodata/before-search-vip.png" alt="" /></div><p style="text-align: center; color: #87899C; font-size: 14px; line-height: 50px;">Sorry, we cannot find any data.</p></div></div>';
  $dom.append(newDom);
}

export function afterSearchPicVIP($dom, height, x, y,otherParam) {
  $dom.css({
    'position': 'relative',
    'min-height': height + 'px'
  });
  var picHeight = 267;
  if ($dom.innerWidth() < 600) {
    picHeight = 180;
  }
  let width=`${$dom.innerWidth()}px`;
  if(otherParam) width = otherParam.width ? otherParam.width : `${dom.innerWidth()}px`;
  var newDom = '<div class="cj-nodata-pic" style="position: absolute; top: ' + (x || 0) + 'px; left: ' + (y || 0) + 'px; background: #fff;width:' + width + '; height: ' + height + 'px"><div style="height: ' + (picHeight + 50) + 'px; width: 100%; position: absolute; top: 50%; margin-top: -' + (picHeight + 50) / 2 + 'px"><div style="height: ' + picHeight + 'px; text-align: center;"><img style="display: inline-block; height: ' + picHeight + 'px;" src="./static/image/new-nodata/after-search-vip.png" alt="" /></div><p style="text-align: center; color: #87899C; font-size: 14px; line-height: 50px;">Sorry, we cannot find any data.</p></div></div>';
  $dom.append(newDom);
}
