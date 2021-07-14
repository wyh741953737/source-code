(function () {
	var href = window.location.href;
	var $select;
	var productInfo;
	var podColor, canvasBasicColor, canvasChanColor;
	var podZone;
	var frontFontName, frontFontSize, frontFontColor, frontFontSizeShow;
	var backFontName, backFontSize, backFontColor, backFontSizeShow;

	var domain = document.domain;
	var shopName = domain.replace('.myshopify.com', '');
	// var shopName;
	// if (domain=='omeows.com.au') {
	// 	shopName = domain.split('.')[0];
	// } else {
	// 	shopName = domain.split('.').length == 3 ? domain.split('.')[1] : domain.split('.')[0];
	// }
	// 特殊店铺/特殊商品特殊处理
	if (shopName == 'custimoesp.com') return;

	var windowWidth = window.innerWidth;
	// 判断是否手机端
	function isPhone () {
      var isphone = false;
      var sUserAgent = navigator.userAgent;
      if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
          isphone = true;
      }
      return isphone;
  }
	var isPhoneEnd = isPhone();
	// if (!getQueryString('cjflag')) return;
	// ----------------------------------------------------
	// return
	// ----------------------------------------------------

	//  var script=document.createElement("script");
	// script.type="text/javascript";
	// script.src="https://app.cjdropshipping.com/static/js/public/jquery-3.0.0.min.js";
	// document.getElementsByTagName('head')[0].appendChild(script); 
	// script.onload = function () {
	// 	myFun()
	// 	// cjAlert('zzuiduoshua yisnx');
	// }
	// console.log($);
	if (typeof jQuery != 'undefined') {
		if (href.indexOf('/products/') > -1) {
			productsFun()
		}
		if (href.indexOf('/cart') > -1) {
			cartFun()
		}
	} else {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://app.cjdropshipping.com/static/js/public/jquery-3.0.0.min.js";
		document.getElementsByTagName('head')[0].appendChild(script);
		script.onload = function () {
			if (href.indexOf('/products/') > -1) {
				productsFun()
			}
			if (href.indexOf('/cart') > -1) {
				cartFun()
			}
		}
	}

	function cartFun() {
		$.getJSON(href + '.json', function (data) {
			console.log('cart', data);
			var cartPros = data.items;
			var temArr1 = [];
			for (var i = 0; i < cartPros.length; i++) {
				var temObj = cartPros[i].properties;
				var temObj2 = {};
				for (var k in temObj) {
					temObj2[k.replace(/'/g, '')] = temObj[k];
				}
				console.log(temObj2.cj_pod_zone_front);
				if (!temObj2.cj_pod_zone_front) continue;
				var podFront = JSON.parse(temObj2.cj_pod_zone_front);
				if (podFront.design_sketch) {
					temArr1.push({
						oriurl: cartPros[i].image,
						imgurl: podFront.design_sketch,
						key: cartPros[i].key,
						title: cartPros[i].product_title,
						podimgurl: podFront.podimage
					});
				}
				$('img').each(function (index, ele) {
					var cursrc = $(this).attr('src') || '';
					// console.log(cursrc);
					var oriImg = cartPros[i].image.split('?')[0].replace('.png', '').replace('.jpg', '').replace('https:', '');
					// console.log(oriImg);
					// console.log(cursrc.indexOf(oriImg))
					var oriImgB = oriImg.toUpperCase();
					// console.log(cursrc.indexOf(oriImgB))
					if (!$(this).attr('key') && (cursrc.indexOf(oriImg) != -1 || cursrc.indexOf(oriImgB) != -1)) {
						$(this).attr('key', cartPros[i].key);
						return false;
					}
				});
				$('a').each(function (index, ele) {
					// console.log('1a')
					// console.log(ele);
					var cursrc = $(this).css("backgroundImage").replace('url(','').replace(')','');
					// console.log(cursrc);
					var oriImg = cartPros[i].image.split('?')[0].replace('.png', '').replace('.jpg', '').replace('https:', '');
					// console.log(oriImg);
					// console.log(cursrc.indexOf(oriImg))
					if (!$(this).attr('key') && cursrc.indexOf(oriImg) != -1) {
						$(this).attr('key', cartPros[i].key);
						return false;
					}
				});
				$('a').each(function (index, ele) {
					// console.log('2a')
					// console.log(ele);
					if (!$(this).attr('key2') && $(this).text() && $(this).text().indexOf(cartPros[i].product_title) != -1) {
						console.log('18w293djlsm')
						console.log($(this))
						$(this).attr('key2', cartPros[i].key);
						// console.log(cartPros[i])
						// console.log(cartPros[i].properties)
						// console.log(cartPros[i].properties["'cj_pod_color'"])
						// console.log(cartPros[i].properties["'cj_pod_zone_front'"])
						$(this).attr('cj_pod_color', cartPros[i].properties["'cj_pod_color'"]);
						$(this).attr('cj_pod_zone_front', cartPros[i].properties["'cj_pod_zone_front'"]);
						$(this).attr('cj_pod_zone_back', cartPros[i].properties["'cj_pod_zone_back'"]);
						return false;
					}
				});
			}
			console.log(temArr1);
			console.log(temArr1.length);
			if (temArr1.length > 0) {
				console.log($('img'))
				$('img').each(function (index, ele) {
					var cursrc = $(this).attr('src');
					// console.log(cursrc);
					for (var k = 0; k < temArr1.length; k++) {
						var oriImg = temArr1[k].oriurl.split('?')[0].replace('.png', '').replace('.jpg', '').replace('https:', '');
						// console.log(oriImg);
						// console.log(cursrc.indexOf(oriImg))
						if ($(this).attr('key') == temArr1[k].key && cursrc.indexOf(oriImg) != -1) {
							$(this).attr('src', temArr1[k].imgurl.replace('design_sketch:', ''));
						}
					}
				})
				$('a').each(function (index, ele) {
					var cursrc = $(this).css("backgroundImage").replace('url(','').replace(')','');
					// console.log(cursrc);
					for (var k = 0; k < temArr1.length; k++) {
						// console.log(k)
						var oriImg = temArr1[k].oriurl.split('?')[0].replace('.png', '').replace('.jpg', '').replace('https:', '');
						// console.log(oriImg);
						// console.log(cursrc.indexOf(oriImg))
						if ($(this).attr('key') == temArr1[k].key && cursrc.indexOf(oriImg) != -1) {
							// console.log('1111111')
							$(this).css('background-image', "url(" + temArr1[k].imgurl.replace('design_sketch:', '') + ")");
						}
						if ($(this).attr('key2') == temArr1[k].key && $(this).html() && $(this).html().indexOf(temArr1[k].title) != -1) {
							var parentdiv = $(this).parent();
							if (parentdiv && parentdiv.html() && parentdiv.html().indexOf('cj_pod_zone_front') != -1) {
								// console.log(parentdiv.html())
								// console.log(temArr1[k].imgurl)
								// var html = parentdiv.html().replace(/\,/g,'').replace(/\{/g,'').replace(/\'/g,'').replace(/\"/g,'').replace(/}/g,'').replace(/\:/g,'').replace('cj_pod_zone_front','').replace('cj_pod_zone_front','').replace('design_sketch','Preview Image: ').replace('podimage','Custom Image: ').replace(/https/g,'https:').replace(temArr1[k].imgurl,'<a href="'+temArr1[k].imgurl+'" target="_blank">'+temArr1[k].imgurl+'</a><br />').replace(temArr1[k].podimgurl,'<a href="'+temArr1[k].podimgurl+'" target="_blank">'+temArr1[k].podimgurl+'</a>');
								var html = parentdiv.html().replace("'cj_pod_color':",'').replace($(this).attr('cj_pod_color'),'').replace("'cj_pod_zone_front':",'').replace($(this).attr('cj_pod_zone_front'),'').replace("'cj_pod_zone_back':",'').replace($(this).attr('cj_pod_zone_back'),'');
								// var htmlArr = html.split(',');
								// var newHtmlArr = [];
								// for (var x = 0; x < htmlArr.length; x++) {
								// 	if (htmlArr[x]) {
								// 		newHtmlArr.push(htmlArr[x]);
								// 	}
								// }
								// console.log(newHtmlArr);
								parentdiv.html(html);
							}
						}
					}
				})

				$('li').each(function (index, ele) {
					// console.log('2a')
					// console.log(ele);
					if ($(this).text() && $(this).text().indexOf('cj_pod_color') != -1) {
						$(this).css('word-break', 'break-all');
					}
					if ($(this).text() && $(this).text().indexOf('cj_pod_zone_front') != -1) {
						$(this).css('word-break', 'break-all');
					}
					if ($(this).text() && $(this).text().indexOf('cj_pod_zone_back') != -1) {
						$(this).css('word-break', 'break-all');
					}
				});
		
			}
		});
	}

	function getQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
  }

	function productsFun() {
		$.getJSON(href + '.json', function (data) {
			// console.log(222);
			console.log('product', data);
			productInfo = data.product;
			// 特殊店铺/特殊商品特殊处理
			// if (shopName == 'giftsbysouen' && productInfo.id == 2103021568064) return;
			// app/connection/getProductInfoByShopNameAndProductId
			console.log('ajax')
			// -------------------------------------------------------------------------------------------
			$.ajax({
				url: 'https://app1.cjdropshipping.com/cj/individuationProduct/getProductInfoByShopNameAndProductId',
				// url: 'https://app.cjdropshipping.com/app/connection/getProductInfoByShopNameAndProductId',
				type: 'POST',
				data: JSON.stringify({ pid: productInfo.id + '', shopName: shopName }),
				contentType: 'application/json',
				dataType: 'json',
				success: function (cjdata) {
					console.log(cjdata);
					if (cjdata.code != "CODE_200" || cjdata.list.length == 0) {
						console.log('获取cj详情失败');
						return;
					}
					var cjProInfo = cjdata.list[0];

					// var temObj = { "color": { "basic": "#eeeeee", "range": "150", "colors": [{ "nameCn": "黄色", "nameEn": "Yellow", "value": "#FFF68F" }, { "nameCn": "红色", "nameEn": "Red", "value": "#FF6347" }, { "nameCn": "绿色", "nameEn": "Green", "value": "#458B00" }] }, "zone": { "front": { "showimgurl": "https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180926/1201082410892.png", "editimgurl": "https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180926/5194378551661.png", "podtype": "pic" }, "back": { "showimgurl": "https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180926/1127475283188.png", "editimgurl": "https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180926/4919805420316.png", "podtype": "text" } } };
					// var customMessage = JSON.stringify(temObj);


					var customMessage = cjProInfo.customMessage;
					var customeDesign = cjProInfo.customeDesign;

					var colorSeleDom = [];
					var podZoneDom;
					if (customMessage && !customeDesign) {
						$('head').append('<link rel="stylesheet" href="https://app.cjdropshipping.com/static/shopify/pod/pod.css">')
						customMessage = JSON.parse(customMessage);
						console.log('customMessage', customMessage);
						podColor = customMessage.color;
						if (podColor) {
							canvasBasicColor = podColor.basic;
							canvasChanColor = podColor.colors[0].value;

							for (var i = 0; i < podColor.colors.length; i++) {
								colorSeleDom.push('<option value="' + podColor.colors[i].value + '">' + podColor.colors[i].nameEn + '</option>');
							}
							colorSeleDom = colorSeleDom.join('');
						}
						podZone = customMessage.zone;

						var fontList = ['Arial', 'Amrak', 'Antre', 'Azedo-Light', 'Bend-One', 'Hensa', 'BOMB', 'Cloud-Light', 'Didactic-Regular', 'Facile-Sans', 'GROTESKIA', 'JustinRoad', 'Legendary-ultra-light', 'Matematica-Regular', 'NavyQueenLT', 'NIKOLETA', 'octomorf', 'Panthony', 'QanelasSoftDEMO-UltraLight', 'Rabiola', 'Racer-med-100-font', 'Reef', 'SEANCo-Firefly-2015']
						var colorList = ['#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff']
						var fontSizeList = [
							{
								show: 'H1',
								size: '24px'
							},
							{
								show: 'H2',
								size: '22px'
							},
							{
								show: 'H3',
								size: '20px'
							},
							{
								show: 'H4',
								size: '18px'
							},
							{
								show: 'H5',
								size: '16px'
							},
							{
								show: 'H6',
								size: '14px'
							}
						]
						var fontListDom = [];
						frontFontName = fontList[0];
						backFontName = fontList[0];
						for (var j = 0; j < fontList.length; j++) {
							fontListDom.push('<li class="cj_font_name_item" style="font-family: ' + fontList[j] + ';" fontname="' + fontList[j] + '">' + fontList[j] + '</li>');
						}
						fontListDom = fontListDom.join('');
						var colorListDom = [];
						frontFontColor = colorList[0];
						backFontColor = colorList[0];
						for (var k = 0; k < colorList.length; k++) {
							colorListDom.push('<li class="cj_font_color_item" fontcolor="' + colorList[k] + '"><i class="cj-text-icon-pencil" style="color:' + colorList[k] + ';"></i></li>');
						}
						colorListDom = colorListDom.join('');
						var fontSizeListDom = [];
						frontFontSize = fontSizeList[4].size;
						frontFontSizeShow = fontSizeList[4].show;
						backFontSize = fontSizeList[4].size;
						backFontSizeShow = fontSizeList[4].show;
						for (var m = 0; m < fontSizeList.length; m++) {
							fontSizeListDom.push('<li class="cj_font_size_item" fontsize="' + fontSizeList[m].size + '" fontsizeshow="' + fontSizeList[m].show + '" style="font-size:' + fontSizeList[m].size + ';">' + fontSizeList[m].show + '</li>');
						}
						fontSizeListDom = fontSizeListDom.join('');

						var imgbtn = `<div class="cj_pod_img_box">
			                <a href="javascript:void(0);" class="cj_pod_add_pic_btn add-pic-btn">Add Picture</a>
			                <span class="img-data" style="display:none;">
			                    <img class="img_show" src="#" alt="">
			                    <b class="cj_pod_edit_img edit"><img src="https://app.cjdropshipping.com/static/image/public-img/edit_32x32.png" alt=""></b>
			                    <b class="cj_pod_delete_img delete"><img src="https://app.cjdropshipping.com/static/image/public-img/delete_32x32.png" alt=""></b>
			                </span>
			            </div>`;

						var textBox = `<div class="cj_pod_text_box">
			                <div class="title">
			                    <span style="margin-right: 20px;">Text</span>
			                    <div class="text-color">
			                        <i class="cj_pod_font_color cj-text-icon-pencil"></i>
			                        <div class="text-color-droplist">
			                            <ul>
			                                `+ colorListDom + `
			                            </ul>
			                        </div>
			                    </div>
			                    <div class="text-color text-font">
			                        <span class="cj_pod_font_size">`+ frontFontSizeShow + `</span>
			                        <div class="text-color-droplist" style="width: 50px;">
			                            <ul>
			                                `+ fontSizeListDom + `
			                            </ul>
			                        </div>
			                    </div>
			                </div>
			                <textarea class="cj_pod_text edit-text"></textarea>
			                <div class="font clearfix">
			                    <span class="left">Font:</span>
			                    <div class="font-list">
			                    		<div class="cj_pod_font_name">
				                    		<span class="font-name">Arial</span>
				                        <span class="caret"></span>
				                    	</div>
			                        <ul class="cj_pod_font_list font-list-ul">
			                            `+ fontListDom + `
			                        </ul>
			                    </div>
			                </div>
			            </div>`;
						var uploadImgLayerFront = `<div class="cj_pod_upload_layer cj_pod_upload_front">
								    <div class="asj-mycj-lyaer print-step-1 print-step-2">
								    		<p class="top-btns">
								            <span class="cj_pod_delete_img delete-icon" ng-click="deleteImg()"><img src="https://app.cjdropshipping.com/static/image/public-img/delete_32x32.png" alt=""></span>
								            <span class="cj_pod_check_img check-icon" ng-click="checkImg()"><img src="https://app.cjdropshipping.com/static/image/public-img/check_32x32.png" alt=""></span>
								        </p>
								        <div class="clearfix">
								            <div class="img-box">
								                <canvas class="print-pro" id="preview_cvs_front" width="400" height="400"></canvas>
								            </div>
								            <div class="detail-box">
								                <canvas id="cutimg_cvs_front" width="400" height="400"></canvas>
								                <div class="mark" id="cj_pod_mark_front">
								                    <div class="mark-inner" id="cj_pod_mark_inner_front"></div>
								                    <span class="resize resize-big" id="cj_pod_mark_resize_big_front">+</span>
								                    <span class="resize resize-small" id="cj_pod_mark_resize_small_front">-</span>
								                </div>
								            </div>
								        </div>
								    </div>
								</div>`;
						var uploadImgLayerBack = `<div class="cj_pod_upload_layer cj_pod_upload_back">
								    <div class="asj-mycj-lyaer print-step-1 print-step-2">
								    		<p class="top-btns">
								            <span class="cj_pod_delete_img delete-icon" ng-click="deleteImg()"><img src="https://app.cjdropshipping.com/static/image/public-img/delete_32x32.png" alt=""></span>
								            <span class="cj_pod_check_img check-icon" ng-click="checkImg()"><img src="https://app.cjdropshipping.com/static/image/public-img/check_32x32.png" alt=""></span>
								        </p>
								        <div class="clearfix">
								            <div class="img-box">
								                <canvas class="print-pro" id="preview_cvs_back" width="400" height="400"></canvas>
								            </div>
								            <div class="detail-box">
								                <canvas id="cutimg_cvs_back" width="400" height="400"></canvas>
								                <div class="mark" id="cj_pod_mark_back">
								                    <div class="mark-inner" id="cj_pod_mark_inner_back"></div>
								                    <span class="resize resize-big" id="cj_pod_mark_resize_big_back">+</span>
								                    <span class="resize resize-small" id="cj_pod_mark_resize_small_back">-</span>
								                </div>
								            </div>
								        </div>
								    </div>
								</div>`;

						var upimgResCanvasDomFront = `<canvas style="display: none;" id="cj_pod_upimg_res_front"></canvas>`;

						var colorResDom = `<input type="hidden" class="cj_pod_color_inp" name="properties['cj_pod_color']" />`;

						var zoneResDomFront = `<input type="hidden" class="cj_pod_zone_front_inp" name="properties['cj_pod_zone_front']" />`;
						// if (podZone.front.podtype == 'pic') {

						// }

						var podCanvasDomFront = `<div style="display: none;" id="cj_pod_canvas_front_wrap"><canvas id="cj_pod_canvas_front"></canvas></div>`;

						var upimgResCanvasDomBack, zoneResDomBack, podCanvasDomBack;
						if (podZone.back) {
							podZoneDom = '<select name="cj_pod_sele_face" class="cj_pod_sele_face" style="margin-right: 10px;"><option value="1">Front</option><option value="2">Back</option></select>';
							upimgResCanvasDomBack = `<canvas style="display: none;" id="cj_pod_upimg_res_back"></canvas>`;
							zoneResDomBack = `<input type="hidden" class="cj_pod_zone_back_inp" name="properties['cj_pod_zone_back']" />`;
							podCanvasDomBack = `<div style="display: none;" id="cj_pod_canvas_back_wrap"><canvas id="cj_pod_canvas_back"></canvas></div>`;
						}

					} else {
						return;
					}
					$('body').append(podCanvasDomFront);
					$('body').append(uploadImgLayerFront);
					$('.cj_pod_upload_front').hide();
					oMark = document.getElementById("cj_pod_mark_front");
					oMarkInner = document.getElementById("cj_pod_mark_inner_front");
					touchEvent(document.getElementById('cj_pod_mark_inner_front'));
					$('body').append(upimgResCanvasDomFront);
					upimgResFrontCvs = document.getElementById('cj_pod_upimg_res_front');
					upimgResFrontCxs = upimgResFrontCvs.getContext("2d");
					if (podZone.back) {
						$('body').append(podCanvasDomBack);
						$('body').append(uploadImgLayerBack);
						$('.cj_pod_upload_back').hide();
						oMarkBack = document.getElementById("cj_pod_mark_back");
						oMarkBackInner = document.getElementById("cj_pod_mark_inner_back");
						touchEventBack(document.getElementById('cj_pod_mark_inner_back'));
						$('body').append(upimgResCanvasDomBack);
						upimgResBackCvs = document.getElementById('cj_pod_upimg_res_back');
						upimgResBackCxs = upimgResBackCvs.getContext("2d");
					}

					$('form[action="/cart/add"]').each(function () {
						$(this).append(colorResDom);
						$(this).append(zoneResDomFront);
						if (zoneResDomBack) {
							$(this).append(zoneResDomBack);
						}
						// console.log($(this));
						var insertFlag;
						var $submit = $(this).find('button[name="add"]');
						if ($submit.length == 0) {
							$submit = $(this).find('button[type="submit"]');
						}
						if ($submit.length == 0) {
							$submit = $(this).find('input[type="submit"]');
						}
						// console.log($submit)
						$submit.each(function () {
							// console.log($(this).is(':visible'));
							if ($(this).is(':visible') && !insertFlag) {
								insertFlag = true;
								// $(this).before('<a class="cj-dropshipping" javascript="void(0);">Change Big Image</a>');
								if (podColor) {
									$(this).before('<select name="cj_pod_sele_color" class="cj_pod_sele_color" style="margin-right: 10px;">' + colorSeleDom + '</select>');
									$('.cj_pod_sele_color').val(canvasChanColor);
									$('.cj_pod_color_inp').val(canvasChanColor);
								}
								if (podZoneDom) {
									$(this).before(podZoneDom);
									$('.cj_pod_sele_face').val('1');
									if (podZone.back.podtype == 'picandtext') {
										$(this).before('<div class="cj_pod_back" style="margin-bottom: 15px; margin-top: 15px;">' + imgbtn + textBox + '</div>');
									} else if (podZone.back.podtype == 'pic') {
										$(this).before('<div class="cj_pod_back" style="margin-bottom: 15px; margin-top: 15px;">' + imgbtn + '</div>');
									} else if (podZone.back.podtype == 'text') {
										$(this).before('<div class="cj_pod_back" style="margin-bottom: 15px; margin-top: 15px;">' + textBox + '</div>');
									}
									$('.cj_pod_back').hide();
								}
								// console.log(podZone.front.podtype)
								if (podZone.front.podtype == 'picandtext') {
									$(this).before('<div class="cj_pod_front" style="margin-bottom: 15px; margin-top: 15px;">' + imgbtn + textBox + '</div>');
								} else if (podZone.front.podtype == 'pic') {
									console.log('------------sxsxsxss');
									$(this).before('<div class="cj_pod_front" style="margin-bottom: 15px; margin-top: 15px;">' + imgbtn + '</div>');
								} else if (podZone.front.podtype == 'text') {
									$(this).before('<div class="cj_pod_front" style="margin-bottom: 15px; margin-top: 15px;">' + textBox + '</div>');
								}

								// $(this).before('<a class="design_finish_btn" href="javascript:void(0);">Done</a>')
								var $variantdom = $(this).parents('form').find('select[name="id"]');
								if ($variantdom.length==0) {
									$variantdom = $(this).parents('form').find('input[name="id"]');
								}
								$variantdom.each(function () {
									if ($(this).is(':hidden') && $(this).attr('name') == 'id') {
										// console.log($(this));
										$select = $(this);
										console.log($select)
										getImgDom();
										// console.log(imgDom);
										creatCanvas();
										previewCvs = document.getElementById('preview_cvs_front');
										previewCvs.width = imgWidth;
										previewCvs.height = imgWidth;
										previewCtx = previewCvs.getContext("2d");
										if (podZone.back) {
											previewCvsBack = document.getElementById('preview_cvs_back');
											previewCvsBack.width = imgWidth;
											previewCvsBack.height = imgWidth;
											previewCtxBack = previewCvsBack.getContext("2d");
										}
										// previewCvs.style.width = imgWidth + 'px';
										// previewCvs.style.height = imgWidth + 'px';
										// previewCvsBack.style.width = imgWidth + 'px';
										// previewCvsBack.style.height = imgWidth + 'px';
										$('.cj_pod_upload_layer').each(function () {
											console.log(isPhoneEnd)
											if (isPhoneEnd) {
												$(this).find('.img-box').hide();
												$(this).find('.asj-mycj-lyaer').css({
													width: windowWidth,
													height: 50 + windowWidth,
												});
												$(this).find('.detail-box').css({
													width: windowWidth - 52,
													height: windowWidth - 52,
												});
												cutImgCvs = document.querySelector('#cutimg_cvs_front');
												cutImgCvs.width = windowWidth - 72;
												cutImgCvs.height = windowWidth - 72;
												cutImgCtx = cutImgCvs.getContext('2d');
												if (podZone.back) {
													cutImgCvsBack = document.querySelector('#cutimg_cvs_back');
													cutImgCvsBack.width = windowWidth - 72;
													cutImgCvsBack.height = windowWidth - 72;
													cutImgCtxBack = cutImgCvsBack.getContext('2d');
												}
											} else {
												$(this).find('.img-box').css({
													width: imgWidth + 20,
													height: imgWidth + 20,
												});
												$(this).find('.asj-mycj-lyaer').css({
													width: 900 + imgWidth - 400,
													height: 500 + imgWidth - 400,
												});
												cutImgCvs = document.querySelector('#cutimg_cvs_front');
												cutImgCtx = cutImgCvs.getContext('2d');
												if (podZone.back) {
													cutImgCvsBack = document.querySelector('#cutimg_cvs_back');
													cutImgCtxBack = cutImgCvsBack.getContext('2d');
												}
											}

										});
										getPixels('1', function () {
											getPosiInfo('1', function () {
												console.log('111');
												drawCanvasFront();
												if (podZone.back) {
													getPixels('2', function () {
														getPosiInfo('2', function () {
															console.log('222');
															drawCanvasBack();
														});
													});
												}
											});
										});
										// var script=document.createElement("script");
										// script.type="text/javascript";
										// script.src="https://app.cjdropshipping.com/static/js/public/canvas-to-blob.min.js";
										// document.getElementsByTagName('head')[0].appendChild(script); 
										// script.onload = function () {
										// 	console.log('canvas-to-blob.min.js加载完成');
										// }
									}

								})

							}

							// $(this).hide();

						})

						$submit.on('click', function (event) {
							event.preventDefault();
							if (podZone && podZone.front) {
								cjLoad();
								uploadImgs('1', function () {
									closeCjLoad();
									$('form[action="/cart/add"]').submit()
								})
							} else {
								$('form[action="/cart/add"]').submit();
							}
						});

						// $(this).find('button[type="submit"]').each(function () {
						// 	if ($(this).is(':visible')) {
						// 		$(this).before('<a class="cj-dropshipping" javascript="void(0);">Change Big Image</a>');
						// 	}
						// })
					});
				},
				error: function (err) {
					
				}
			})
			// -------------------------------------------------------------------------------------------
			
			// if ($('#ProductSelect').length == 1) {
				// 	$select = $('#ProductSelect')
				// } else if ($('#ProductSelect-product-template').length == 1) {
			// 	$select = $('#ProductSelect-product-template');
			// } else if ($('#productSelect').length == 1) {
				// 	$select = $('#productSelect');
			// } else if ($('.product__option-selector').length == 1) {
			// 	$select = $('.product__option-selector');
			// } else {
			// 	alert('安装个性化插件错误');
			// }
			// $('form[action="/cart/add"]').find('select').each(function (){
			// 	console.log($(this));
			// 	if ($(this).is(':hidden') && $(this).attr('name')=='id') {
			// 		$select = $(this);
			// 	}
			// });
			// console.log($select);
			// if ($select) {
			// 	$select.after('<a id="cjdrop-btn" javascript="void(0);">改变大图</a>');
			// }

			

		});

		$('body').on('click', '.cj_pod_font_name', function () {
			if ($(this).siblings('.cj_pod_font_list').is(':visible')) {
				$(this).siblings('.cj_pod_font_list').hide();
			} else {
				$(this).siblings('.cj_pod_font_list').show();
			}
		});

		$('body').on('click', '.cj_font_name_item', function () {
			$(this).parent().hide();
			if (podFace == '1') {
				frontFontName = $(this).attr('fontname');
				drawCanvasFront();
				writeFrontInfo();
			}
			if (podFace == '2') {
				backFontName = $(this).attr('fontname');
				drawCanvasBack();
				writeBackInfo();
			}
			$(this).parent().siblings('.cj_pod_font_name').find('.font-name').html($(this).attr('fontname'));
			// toggleCartBtn(0);
			// toggleDesignBtn(1);
		});
		$('body').on('click', '.cj_font_color_item', function () {
			// $(this).parent().hide();
			if (podFace == '1') {
				frontFontColor = $(this).attr('fontcolor');
				drawCanvasFront();
				writeFrontInfo();
			}
			if (podFace == '2') {
				backFontColor = $(this).attr('fontcolor');
				drawCanvasBack();
				writeBackInfo();
			}
			$(this).parent().parent().siblings('.cj_pod_font_color').css('color', $(this).attr('fontcolor'));
			// toggleCartBtn(0);
			// toggleDesignBtn(1);
		});
		$('body').on('click', '.cj_font_size_item', function () {
			// $(this).parent().hide();
			if (podFace == '1') {
				frontFontSize = $(this).attr('fontsize');
				frontFontSizeShow = $(this).attr('fontsizeshow');
				drawCanvasFront();
				writeFrontInfo();
			}
			if (podFace == '2') {
				backFontSize = $(this).attr('fontsize');
				backFontSizeShow = $(this).attr('fontsizeshow');
				drawCanvasBack();
				writeBackInfo();
			}
			$(this).parent().parent().siblings('.cj_pod_font_size').html($(this).attr('fontsizeshow'));
			// toggleCartBtn(0);
			// toggleDesignBtn(1);
		});
		$('body').on('input', '.cj_pod_text', function () {
			var printVal = $(this).val();
			printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
			var printArr = printVal.split('<br/>');
			// console.log(maxLineNumFront)
			if (printArr.length == 0) return;
			if (podFace == '1') {
				if (printArr.length > maxLineNumBack) {
					cjAlert(maxLineNumBack + ' rows allowed at most.');
				} else {
					drawCanvasFront();
					writeFrontInfo();
				}
			}
			if (podFace == '2') {
				if (printArr.length > maxLineNumFront) {
					cjAlert(maxLineNumFront + ' rows allowed at most.');
				} else {
					drawCanvasBack();
					writeBackInfo()
				}
			}
			// toggleCartBtn(0);
			// toggleDesignBtn(1);
		});
		$('body').on('change', '.cj_pod_sele_face', function () {
			podFace = $(this).val();
			if (podFace == '1') {
				$('.cj_pod_front').show();
				$('.cj_pod_back').hide();
				$('#cj_pod_canvas_front_wrap').show();
				$('#cj_pod_canvas_back_wrap').hide();
				drawCanvasFront();
			}
			if (podFace == '2') {
				$('.cj_pod_front').hide();
				$('.cj_pod_back').show();
				$('#cj_pod_canvas_front_wrap').hide();
				$('#cj_pod_canvas_back_wrap').show();
				drawCanvasBack();
			}
		});
		$('body').on('change', '.cj_pod_sele_color', function () {
			canvasChanColor = $(this).val();
			$('.cj_pod_color_inp').val(canvasChanColor);
			if (podFace == '1') {
				drawCanvasFront();
			}
			if (podFace == '2') {
				drawCanvasBack();
			}
			// toggleCartBtn(0);
			// toggleDesignBtn(1);
		});

		$('body').on('click', '.cj_pod_add_pic_btn', function () {
			doInput();
		});
		$('body').on('click', '.cj_pod_delete_img', function () {
			deleteImg();
		});
		$('body').on('click', '.cj_pod_check_img', function () {
			checkImg();
		});
		$('body').on('click', '.cj_pod_edit_img', function () {
			editImg();
		});


		// var oMark = document.getElementById("mark");
		//  var oMarkInner = document.getElementById("mark-inner");
		$('body').on('click', '#cj_pod_mark_resize_big_front', function () {
			var srcX = oMark.offsetLeft;
			var srcY = oMark.offsetTop;
			var sWidth = oMark.offsetWidth;
			var sHeight = oMark.offsetHeight;
			var temWidth = sWidth * 1.1;
			var temHeight = sHeight * 1.1;
			if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
				oMark.style.width = temWidth + "px";
				oMark.style.height = temHeight + "px";
				drawPic();
			}
		})
		$('body').on('click', '#cj_pod_mark_resize_small_front', function () {
			var srcX = oMark.offsetLeft;
			var srcY = oMark.offsetTop;
			var sWidth = oMark.offsetWidth;
			var sHeight = oMark.offsetHeight;
			var temWidth = sWidth * 0.9;
			var temHeight = sHeight * 0.9;
			console.log(temWidth, temHeight)
			if (temWidth >= 40 && temHeight >= 40) {
				oMark.style.width = temWidth + "px";
				oMark.style.height = temHeight + "px";
				drawPic();
			}
		})


		// var markMouse;
		// var pageXPhone, pageYPhone, srcXPhone, srcYPhone;
		if (!isPhoneEnd) {
			$('body').on('mousedown', '#cj_pod_mark_inner_front', function (event) {
				markMouse = true;
				var event = event || window.event;
				//获取鼠标在页面中的位置
				var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
				var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
				//获取鼠标在按下的那一瞬间在盒子中的位置
				var boxX = pageX - oMark.offsetLeft;
				var boxY = pageY - oMark.offsetTop;
				//鼠标在页面上移动 让mark跟着鼠标移动
				document.onmousemove = function (event) {
					var srcX = oMark.offsetLeft;
					var srcY = oMark.offsetTop;
					// var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMark.offsetWidth;
					var sHeight = oMark.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX >= criticalVal1 && srcX + sWidth <= criticalVal2 && srcY >= criticalVal3 && srcY + sHeight <= criticalVal4) {
						var event = event || window.event;
						//获取鼠标在页面上的位置
						var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
						var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
						// console.log(pageX,pageY)
						//让mark跟着鼠标移动
						oMark.style.left = pageX - boxX + "px";
						oMark.style.top = pageY - boxY + "px";
						//清除选中文字
					}

				};
				//鼠标弹起 盒子就不应该跟着了
				document.onmouseup = function () {
					document.onmousemove = null;
					var srcX = oMark.offsetLeft;
					var srcY = oMark.offsetTop;
					// var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMark.offsetWidth;
					var sHeight = oMark.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX < criticalVal1) {
						oMark.style.left = criticalVal1 + "px";
					}
					if (srcX + sWidth > criticalVal2) {
						oMark.style.left = criticalVal2 - sWidth + "px";
					}
					if (srcY < criticalVal3) {
						oMark.style.top = criticalVal3 + "px";
					}
					if (srcY + sHeight > criticalVal4) {
						oMark.style.top = criticalVal4 - sHeight + "px";
					}
					if (markMouse) {
						drawPic();
						markMouse = false;
					}
					document.onmouseup = null;
				};
			})
		}

		// var oMarkBack = document.getElementById("mark-back");
		// var oMarkBackInner = document.getElementById("mark-back-inner");
		$('body').on('click', '#cj_pod_mark_resize_big_back', function () {
			var srcX = oMarkBack.offsetLeft;
			var srcY = oMarkBack.offsetTop;
			var sWidth = oMarkBack.offsetWidth;
			var sHeight = oMarkBack.offsetHeight;
			var temWidth = sWidth * 1.1;
			var temHeight = sHeight * 1.1;
			if (srcX + temWidth <= criticalVal2 && srcY + temHeight <= criticalVal4) {
				oMarkBack.style.width = temWidth + "px";
				oMarkBack.style.height = temHeight + "px";
				drawPicBack();
			}
		})
		$('body').on('click', '#cj_pod_mark_resize_small_back', function () {
			var srcX = oMarkBack.offsetLeft;
			var srcY = oMarkBack.offsetTop;
			var sWidth = oMarkBack.offsetWidth;
			var sHeight = oMarkBack.offsetHeight;
			var temWidth = sWidth * 0.9;
			var temHeight = sHeight * 0.9;
			console.log(temWidth, temHeight)
			if (temWidth >= 40 && temHeight >= 40) {
				oMarkBack.style.width = temWidth + "px";
				oMarkBack.style.height = temHeight + "px";
				drawPicBack();
			}
		})

		if (!isPhoneEnd) {
			$('body').on('mousedown', '#cj_pod_mark_inner_back', function (event) {
				markMouse = true;
				var event = event || window.event;
				//获取鼠标在页面中的位置
				var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
				var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
				//获取鼠标在按下的那一瞬间在盒子中的位置
				var boxX = pageX - oMarkBack.offsetLeft;
				var boxY = pageY - oMarkBack.offsetTop;
				//鼠标在页面上移动 让mark跟着鼠标移动
				document.onmousemove = function (event) {
					var srcX = oMarkBack.offsetLeft;
					var srcY = oMarkBack.offsetTop;
					// var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMarkBack.offsetWidth;
					var sHeight = oMarkBack.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX >= criticalVal1Back && srcX + sWidth <= criticalVal2Back && srcY >= criticalVal3Back && srcY + sHeight <= criticalVal4Back) {
						var event = event || window.event;
						//获取鼠标在页面上的位置
						var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
						var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
						// console.log(pageX,pageY)
						//让mark跟着鼠标移动
						oMarkBack.style.left = pageX - boxX + "px";
						oMarkBack.style.top = pageY - boxY + "px";
						//清除选中文字
					}

				};
				//鼠标弹起 盒子就不应该跟着了
				document.onmouseup = function () {
					document.onmousemove = null;
					var srcX = oMarkBack.offsetLeft;
					var srcY = oMarkBack.offsetTop;
					// var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMarkBack.offsetWidth;
					var sHeight = oMarkBack.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX < criticalVal1Back) {
						oMarkBack.style.left = criticalVal1Back + "px";
					}
					if (srcX + sWidth > criticalVal2Back) {
						oMarkBack.style.left = criticalVal2Back - sWidth + "px";
					}
					if (srcY < criticalVal3Back) {
						oMarkBack.style.top = criticalVal3Back + "px";
					}
					if (srcY + sHeight > criticalVal4Back) {
						oMarkBack.style.top = criticalVal4Back - sHeight + "px";
					}
					if (markMouse) {
						drawPicBack();
						markMouse = false;
					}
					document.onmouseup = null;
				};
			})
		}

		$('body').on('click', '.design_finish_btn', function () {
			cjLoad();
			uploadImgs('1', function () {
				closeCjLoad();
				toggleDesignBtn(0);
				toggleCartBtn(1);
			})
		});

		// $('body').on('click', 'form[action="/cart/add"] button[type="submit"]', function (event) {
		// 	event.preventDefault();
		// 	if (podZone && podZone.front) {
		// 		cjLoad();
		// 		uploadImgs('1', function () {
		// 			closeCjLoad();
		// 			$('form[action="/cart/add"]').submit()
		// 		})
		// 	} else {
		// 		$('form[action="/cart/add"]').submit();
		// 	}
		// });
		

		// $('form[action="/cart/add"]').each(function () {
		// 	$(this).find('button[type="submit"]').each(function () {
		// 		if (flag) {
		// 			$(this).show();
		// 		} else {
		// 			$(this).hide();
		// 		}
		// 	})
		// 	$(this).find('input[type="submit"]').each(function () {
		// 		if (flag) {
		// 			$(this).show();
		// 		} else {
		// 			$(this).hide();
		// 		}
		// 	})
		// })

	}

	function touchEvent(ele) {
		var touch;
		ele.addEventListener(
			'touchstart',
			function (event) {
				markMouse = true;
				// var pageXPhone = event.originalEvent.changedTouches[0].pageX;
				// var pageYPhone = event.originalEvent.changedTouches[0].pageY;
				var srcXPhone = oMark.offsetLeft;
				var srcYPhone = oMark.offsetTop;
				touch = event.targetTouches[0];//取得第一个touch的坐标值
				var pageXPhone = touch.pageX;
				var pageYPhone = touch.pageY;
				ele.addEventListener('touchmove', function (event) {
					event.preventDefault();
					touch = event.targetTouches[0];//取得第一个touch的坐标值
					// var pageXPhoneEnd = event.originalEvent.changedTouches[0].pageX;
					// var pageYPhoneEnd = event.originalEvent.changedTouches[0].pageY;
					var pageXPhoneEnd = touch.pageX;
					var pageYPhoneEnd = touch.pageY;
					oMark.style.left = srcXPhone + pageXPhoneEnd - pageXPhone + "px";
					oMark.style.top = srcYPhone + pageYPhoneEnd - pageYPhone + "px";
				}, { passive: false });
				ele.addEventListener('touchend', function (event) {
					ele.addEventListener('touchmove', null);
					var srcX = oMark.offsetLeft;
					var srcY = oMark.offsetTop;
					// var srcY = oMark.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMark.offsetWidth;
					var sHeight = oMark.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX < criticalVal1) {
						oMark.style.left = criticalVal1 + "px";
					}
					if (srcX + sWidth > criticalVal2) {
						oMark.style.left = criticalVal2 - sWidth + "px";
					}
					if (srcY < criticalVal3) {
						oMark.style.top = criticalVal3 + "px";
					}
					if (srcY + sHeight > criticalVal4) {
						oMark.style.top = criticalVal4 - sHeight + "px";
					}
					if (markMouse) {
						drawPic();
						markMouse = false;
					}
					document.touchend = null;
				}, { passive: false });
			},
			{ passive: false }
		);
	}
	function touchEventBack(ele) {
		var touch;
		ele.addEventListener(
			'touchstart',
			function (event) {
				markMouse = true;
				// var pageXPhone = event.originalEvent.changedTouches[0].pageX;
				// var pageYPhone = event.originalEvent.changedTouches[0].pageY;
				var srcXPhone = oMarkBack.offsetLeft;
				var srcYPhone = oMarkBack.offsetTop;
				touch = event.targetTouches[0];//取得第一个touch的坐标值
				var pageXPhone = touch.pageX;
				var pageYPhone = touch.pageY;
				ele.addEventListener('touchmove', function (event) {
					event.preventDefault();
					touch = event.targetTouches[0];//取得第一个touch的坐标值
					// var pageXPhoneEnd = event.originalEvent.changedTouches[0].pageX;
					// var pageYPhoneEnd = event.originalEvent.changedTouches[0].pageY;
					var pageXPhoneEnd = touch.pageX;
					var pageYPhoneEnd = touch.pageY;
					oMarkBack.style.left = srcXPhone + pageXPhoneEnd - pageXPhone + "px";
					oMarkBack.style.top = srcYPhone + pageYPhoneEnd - pageYPhone + "px";
				}, { passive: false });
				ele.addEventListener('touchend', function (event) {
					ele.addEventListener('touchmove', null);
					var srcX = oMarkBack.offsetLeft;
					var srcY = oMarkBack.offsetTop;
					// var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
					var sWidth = oMarkBack.offsetWidth;
					var sHeight = oMarkBack.offsetHeight;
					// console.log(srcX,srcY,sWidth,sHeight)
					// console.log(criticalVal1,criticalVal2)
					if (srcX < criticalVal1Back) {
						oMarkBack.style.left = criticalVal1Back + "px";
					}
					if (srcX + sWidth > criticalVal2Back) {
						oMarkBack.style.left = criticalVal2Back - sWidth + "px";
					}
					if (srcY < criticalVal3Back) {
						oMarkBack.style.top = criticalVal3Back + "px";
					}
					if (srcY + sHeight > criticalVal4Back) {
						oMarkBack.style.top = criticalVal4Back - sHeight + "px";
					}
					if (markMouse) {
						drawPicBack();
						markMouse = false;
					}
					document.touchend = null;
				}, { passive: false });
			},
			{ passive: false }
		);
	}

	var podFace = '1';

	function toggleCartBtn(flag) {
		$('form[action="/cart/add"]').each(function () {
			$(this).find('button[type="submit"]').each(function () {
				if (flag) {
					$(this).show();
				} else {
					$(this).hide();
				}
			})
			$(this).find('input[type="submit"]').each(function () {
				if (flag) {
					$(this).show();
				} else {
					$(this).hide();
				}
			})
		})
	}
	function toggleDesignBtn(flag) {
		$('form[action="/cart/add"]').each(function () {
			$(this).find('.design_finish_btn').each(function () {
				if (flag) {
					$(this).show();
				} else {
					$(this).hide();
				}
			})
		})
	}

	function cjAlert(msg, time) {
		if ($('.cj-alert').length > 0) return;
		var width = $(window).width() + 'px';
		var height = $(window).height() + 'px';
		var alertDom = '<div class="cj-alert" style="width: ' + width + '; height: ' + height + '; background: rgba(0,0,0,0.1); position: fixed; top: 0; left: 0; z-index: 999; text-align: center;"><span style="display: block; width: 300px; height: 100px; transform: translate(-50%, -50%);position: absolute; top: 50%; left: 50%; padding:5px 10px; background: rgba(0,0,0,0.5); color: #fff; border-radius: 2px;">' + msg + '</span></div>';
		$('body').append(alertDom);
		setTimeout(function () {
			$('.cj-alert').remove();
		}, time || '4000');
	}
	function cjLoad() {
		if ($('.cj-load').length > 0) return;
		var width = $(window).width() + 'px';
		var height = $(window).height() + 'px';
		var alertDom = '<div class="cj-load" style="width: ' + width + '; height: ' + height + '; line-height: ' + height + '; background: rgba(0,0,0,0.1); position: fixed; top: 0; left: 0; z-index: 999; text-align: center;"><img src="https://app.cjdropshipping.com/static/image/public-img/loading-2.gif" alt="" /></div>';
		$('body').append(alertDom);
	}
	function closeCjLoad() {
		$('.cj-load').remove();
	}

	var imgDataUrlFront;
	var designSketchFront;
	function writeFrontInfo() {
		var printVal = $('.cj_pod_front').find('.cj_pod_text').val();
		if (printVal) {
			printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
		}
		// var temObj = {
		// 	image: imgDataUrlFront,
		// 	text: printVal,
		// 	design_sketch: designSketchFront
		// }
		// var val = '';
		// for (var k in temObj) {
		// 	if (k == 'image' && temObj[k]) {
		// 		val = val + 'podimage:' + temObj[k] + ',';
		// 	}
		// 	if (k == 'design_sketch' && temObj[k]) {
		// 		val = val + 'design_sketch:' + temObj[k] + ',';
		// 	}
		// 	if (k == 'text' && temObj[k]) {
		// 		val = val + 'podtext:' + printVal + ',fontfamily:' + frontFontName + ',fontcolor:' + frontFontColor + ',fontsize:' + frontFontSize + ',';
		// 	}
		// }
		// val = val.slice(0, val.length - 1);
		var temObj;
		if (printVal && imgDataUrlFront) {
			temObj = {
				design_sketch: designSketchFront,
				podimage: imgDataUrlFront,
				podtext: printVal,
				fontfamily: frontFontName,
				fontcolor: frontFontColor,
				fontsize: frontFontSize
			}
		} else if (imgDataUrlFront){
			temObj = {
				design_sketch: designSketchFront,
				podimage: imgDataUrlFront
			}
		} else if (printVal) {
			temObj = {
				design_sketch: designSketchFront,
				podtext: printVal,
				fontfamily: frontFontName,
				fontcolor: frontFontColor,
				fontsize: frontFontSize
			}
		}
		var val = JSON.stringify(temObj);
		console.log(val);
		$('.cj_pod_zone_front_inp').val(val);
		// if (imgDataUrlFront && printVal) {
		//  	$('.cj_pod_zone_front_inp').val('image:' + imgDataUrlFront + ',text:' + printVal + ',fontfamily:' + frontFontName + ',fontcolor:' + frontFontColor + ',fontsize:' + frontFontSize);
		//  } else if (imgDataUrlFront) {
		//  	$('.cj_pod_zone_front_inp').val('image:' + imgDataUrlFront);
		//  } else if (printVal) {
		//  	$('.cj_pod_zone_front_inp').val('text:' + printVal + ',fontfamily:' + frontFontName + ',fontcolor:' + frontFontColor + ',fontsize:' + frontFontSize);
		//  }
		// uploadImgs();
	}
	var imgDataUrlBack;
	var designSketchBack;
	function writeBackInfo() {
		var printVal = $('.cj_pod_back').find('.cj_pod_text').val();
		if (printVal) {
			printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
		}
		// var temObj = {
		// 	image: imgDataUrlBack,
		// 	text: printVal,
		// 	design_sketch: designSketchBack
		// }
		// var val = '';
		// for (var k in temObj) {
		// 	if (k == 'image' && temObj[k]) {
		// 		val = val + 'podimage:' + temObj[k] + ',';
		// 	}
		// 	if (k == 'design_sketch' && temObj[k]) {
		// 		val = val + 'design_sketch:' + temObj[k] + ',';
		// 	}
		// 	if (k == 'text' && temObj[k]) {
		// 		val = val + 'podtext:' + printVal + ',fontfamily:' + backFontName + ',fontcolor:' + backFontColor + ',fontsize:' + backFontSize + ',';
		// 	}
		// }
		// val = val.slice(0, val.length - 1);
		var temObj;
		if (printVal && imgDataUrlBack) {
			temObj = {
				podimage: imgDataUrlBack,
				podtext: printVal,
				design_sketch: designSketchBack,
				fontfamily: backFontName,
				fontcolor: backFontColor,
				fontsize: backFontSize
			}
		} else if (imgDataUrlBack) {
			temObj = {
				podimage: imgDataUrlBack,
				design_sketch: designSketchBack
			}
		} else if (printVal) {
			temObj = {
				podtext: printVal,
				design_sketch: designSketchBack,
				fontfamily: backFontName,
				fontcolor: backFontColor,
				fontsize: backFontSize
			}
		}
		
		var val = JSON.stringify(temObj);
		console.log(val);
		$('.cj_pod_zone_back_inp').val(val);
	}
	function uploadImgs(flag, scb) {
		// flag 1: front效果图和back效果图, 11: front上传图 ，22: back上传图
		// https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181112/165663728701.png
		// https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/277064904536.png
		// https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/2115242918718.png
		if (flag == '1') {
			// designSketchFront = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/277064904536.png';
			// writeFrontInfo();
			// designSketchBack = 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181113/2115242918718.png';
			// writeBackInfo();
			// if (scb) {
			//   		scb();
			//   	}
			//   	return
			var fileList = {};
			cjPodCvsFront.toBlob(
				function (blob) {
					var nowTime = new Date().getTime();
					blob.name = nowTime + '.png';
					fileList[0] = blob;
					fileList.length = 1;
					console.log(fileList);
					if (podZone.back) {
						var map = {};
						map.front = nowTime;
						cjPodCvsBack.toBlob(
							function (blob) {
								var nowTime = new Date().getTime();
								blob.name = nowTime + '.png';
								fileList[1] = blob;
								fileList.length = 2;
								console.log(fileList);
								map.back = nowTime;
								ossUploadFile(fileList, function (data) {
									console.log(data);
									if (data.code == 2 || data.code == 0) {
										console.log('上传失败');
										closeCjLoad();
									} else {
										for (var k in data.succssByOrder) {
											for (var k2 in map) {
												if (k2 == 'front' && k == map[k2]) {
													designSketchFront = data.succssByOrder[k];
													writeFrontInfo();
												}
												if (k2 == 'back' && k == map[k2]) {
													designSketchBack = data.succssByOrder[k];
													writeBackInfo();
												}
											}
										}
										if (scb) {
											scb();
										}
									}
								});
							},
							'image/png'
						);
					} else {
						ossUploadFile(fileList, function (data) {
							console.log(data);
							if (data.code == 2 || data.code == 0) {
								console.log('上传失败');
								closeCjLoad();
							} else {
								designSketchFront = data.succssLinks[0];
								writeFrontInfo();
								if (scb) {
									scb();
								}
							}
						});
					}
				},
				'image/png'
			);
		}
		if (flag == '11') {
			// imgDataUrlFront = "https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181112/7832329265339.png";
			// writeFrontInfo();
			// return;
			var fileList = {};
			upimgResFrontCvs.toBlob(
				function (blob) {
					blob.name = new Date().getTime() + '.png';
					fileList[0] = blob;
					fileList.length = 1;
					// console.log(11111,fileList);
					ossUploadFile(fileList, function (data) {
						console.log(data);
						if (data.code == 2 || data.code == 0) {
							console.log('上传失败');
							closeCjLoad();
						} else {
							imgDataUrlFront = data.succssLinks[0];
							writeFrontInfo();
							if (scb) {
								scb();
							}
						}
					});
				},
				'image/png'
			);
			// console.log('22222');
		}
		if (flag == '22') {
			// imgDataUrlBack = "https://cc-west-usa.oss-us-west-1.aliyuncs.com/shopify/20181114/4556134976347.png";
			// writeBackInfo();
			// return;
			var fileList = {};
			upimgResBackCvs.toBlob(
				function (blob) {
					blob.name = new Date().getTime() + '.png';
					fileList[0] = blob;
					fileList.length = 1;
					console.log(fileList);
					ossUploadFile(fileList, function (data) {
						console.log(data);
						if (data.code == 2 || data.code == 0) {
							console.log('上传失败');
						} else {
							imgDataUrlBack = data.succssLinks[0];
							writeBackInfo();
							if (scb) {
								scb();
							}
						}
					});
				},
				'image/png'
			);
		}

	}

	// oss上传文件
	function ossUploadFile(fileData, scb) {
		// fileData----$('#xxx')[0].files  xxx--input的id
		// scb-回调函数
		$.ajax({
			// url: 'http://192.168.5.104:8080/app/oss/policy',
			url: 'https://app.cjdropshipping.com/app/oss/policy',
			type: 'POST',
			data: JSON.stringify({ shop: shopName, accpid: productInfo.id }),
			contentType: 'application/json',
			dataType: 'json',
			success: function (data) {
				console.log(data);
				if (data.code == 200) {
					var accessid = data.accessid;
					var expire = data.expire;
					var host = data.host;
					var policy = data.policy;
					var signature = data.signature;
					var ReturnUrl = null;
					var succssLinks = [];
					var succssByOrder = {};
					var failIndexs = [];
					for (var i = 0; i < fileData.length; i++) {
						(function (i) {
							var formData = new FormData();
							var time = new Date().getTime();
							var year = new Date().getFullYear();
							var month = new Date().getMonth() + 1;
							var day = new Date().getDate();
							if (month < 10) {
								month = '0' + month
							}
							if (day < 10) {
								day = '0' + day
							}
							var timeStr = 'shopify/' + year + month + day;
							var randomNumArr = getRandomNumber(0, 2147483647, 2)
							var randomNum1 = randomNumArr[0] + 10;
							var randomNum2 = randomNumArr[1] + 1000;
							var randomFileName = Math.floor(time / randomNum1 * randomNum2);
							// console.log(timeStr)
							// console.log(randomFileName)
							// formData.append('key', time + '-' + fileData[i].name);
							var fileArr = fileData[i].name.split('.')
							var fileTypeName = fileArr[fileArr.length - 1];
							formData.append('key', timeStr + '/' + randomFileName + '.' + fileTypeName);
							formData.append('policy', policy);  //policy
							formData.append('OSSAccessKeyId', accessid);  //accessKeyId
							formData.append('success_action_status', "200");  //成功后返回的操作码
							formData.append('Signature', signature);   //签名
							formData.append('file', fileData[i]);
							$.ajax({
								url: host,
								type: 'POST',
								data: formData,
								// async: false,
								cache: false,
								contentType: false,
								processData: false,
								success: function (returndata) {
									// console.log('success上传成功');
									// ReturnUrl = host + '/' + time + '-' + fileData[i].name;
									ReturnUrl = host + '/' + timeStr + '/' + randomFileName + '.' + fileTypeName;
									// console.log(ReturnUrl);
									succssLinks.push(ReturnUrl);
									succssByOrder[fileArr[0]] = ReturnUrl;
								},
								error: function (returndata) {
									// console.log(returndata);
									failIndexs.push(i);
									// console.log('error上传失败');
								}
							});
						})(i)
					}
					var ossTimer = setInterval(function () {
						if (succssLinks.length == fileData.length) {
							scb({
								code: 1, // 全部上传成功，返回成功链接
								succssLinks: succssLinks,
								succssByOrder: succssByOrder
							});
							clearInterval(ossTimer);
						} else if (failIndexs.length == fileData.length) {
							scb({
								code: 0  // 全部上传失败
							});
							clearInterval(ossTimer);
						} else if ((failIndexs.length + succssLinks.length) == fileData.length) {
							scb({
								code: 2, // 部分上传成功，返回成功链接和失败索引
								failIndexs: failIndexs,
								succssLinks: succssLinks,
								succssByOrder: succssByOrder
							});
							clearInterval(ossTimer);
						}
					}, 10);

				} else {
					cjAlert('The server is busy now, please try again later.');
					scb({
						code: 0  // 全部上传失败
					});
				}
			},
			error: function (data) {
				console.log(data);
				scb({
					code: 0  // 全部上传失败
				});
			}
		});
	};
	function getRandomNumber(start, end, n) {
		var numArr = [];
		for (var i = 0; i < n; i++) {
			var number = Math.floor(Math.random() * (end - start + 1) + start);
			if (numArr.indexOf(number) < 0) {
				numArr.push(number);
			} else {
				i--;
			}
		}
		return numArr;
	}

	function getImgDom() {
		var imgUrl;
		var variantId = $select.val();
		console.log(variantId);
		// var domain = 'https://'+document.domain;
		// $.ajax('domain' + )
		var images = productInfo.images;
		// console.log(images)
		for (var i = 0; i < images.length; i++) {
			// console.log(images[i].variant_ids);
			for (var j = 0; j < images[i].variant_ids.length; j++) {
				// console.log(images[i].variant_ids[j]);
				if (images[i].variant_ids[j] == variantId) {
					// console.log(images[i].src);
					imgUrl = images[i].src;
					break;
				}
			}
		}
		if (!imgUrl) {
			imgUrl = productInfo.image.src;
		}
		imgUrl = imgUrl.split('?')[0];
		imgUrl = imgUrl.replace('https:', '').replace('.jpg', '').replace('.png', '');
		console.log(imgUrl);
		$('img').each(function () {
			if ($(this)[0].src.indexOf(imgUrl) != -1) {
				if (!imgDom) {
					if ($(this)[0].offsetWidth && $(this)[0].offsetWidth > 200) {
						imgDom = $(this)[0];
						console.log(imgDom);
					}
				}
				// console.log($(this));
				// $(this).attr('src', 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180815/1839929070674.jpg');
			}
		});
		if (!imgDom) {
			$('img').each(function () {
			if ($(this)[0].dataset && $(this)[0].dataset.srcset && $(this)[0].dataset.srcset.indexOf(imgUrl) != -1) {
					if (!imgDom) {
						// imgDom = $(this)[0];
						// return imgDom;
						// console.log(imgDom);
						if ($(this)[0].offsetWidth && $(this)[0].offsetWidth > 200) {
							imgDom = $(this)[0];
							console.log(imgDom);
						}
					}
					// console.log($(this));
					// $(this).attr('src', 'https://cc-west-usa.oss-us-west-1.aliyuncs.com/20180815/1839929070674.jpg');
				}
			});
		}
	}
	var imgDom;
	var imgWidth, imgHeight;
	var mobanWidth, mobanHeight;
	function creatCanvas() {
		imgWidth = imgDom.offsetWidth;
		imgHeight = imgDom.offsetHeight;
		var left = imgDom.getClientRects()[0].x;
		var top = imgDom.getClientRects()[0].y + document.documentElement.scrollTop;
		console.log(imgDom.getClientRects()[0].y);
		console.log(document.documentElement.scrollTop)
		console.log(imgWidth, imgHeight, left, top)
		// var canvas = document.createElement("canvas");
		// canvas.id = 'cj_pod_canvas_front';
		// canvas.width = imgWidth;
		// canvas.height = imgHeight;
		// canvas.style.position = 'absolute';
		// canvas.style.left = left + 'px';
		// canvas.style.top = top + 'px';
		// canvas.style.zIndex = 10;
		// canvas.style.background = '#fff';
		// $('body').append(canvas);
		$('#cj_pod_canvas_front_wrap').show().css({
			position: 'absolute',
			left: left + 'px',
			top: top + 'px',
			zIndex: 100,
			// background: '#fff',
			width: imgWidth + 'px',
			height: imgHeight + 'px'
		});
		cjPodCvsFront = document.getElementById('cj_pod_canvas_front');
		cjPodCvsFront.width = imgWidth;
		cjPodCvsFront.height = imgHeight;
		cjPodCtxFront = cjPodCvsFront.getContext("2d");
		if (podZone.back) {
			// var canvas = document.createElement("canvas");
			// canvas.id = 'cj_pod_canvas_back';
			// canvas.width = imgWidth;
			// canvas.height = imgHeight;
			// canvas.style.position = 'absolute';
			// canvas.style.left = left + 'px';
			// canvas.style.top = top + 'px';
			// canvas.style.zIndex = 10;
			// canvas.style.background = '#fff';
			// $('body').append(canvas);
			// $('#cj_pod_canvas_back').hide();
			$('#cj_pod_canvas_back_wrap').hide().css({
				position: 'absolute',
				left: left + 'px',
				top: top + 'px',
				zIndex: 100,
				// background: '#fff',
				width: imgWidth + 'px',
				height: imgHeight + 'px'
			});
			cjPodCvsBack = document.getElementById('cj_pod_canvas_back');
			cjPodCvsBack.width = imgWidth;
			cjPodCvsBack.height = imgHeight;
			cjPodCtxBack = cjPodCvsBack.getContext("2d");
		}
	}
	var temImg;
	var cjPodCvsFront, cjPodCtxFront;
	function drawCanvasFront() {
		cjPodCtxFront.clearRect(0, 0, mobanWidth, mobanHeight);
		if (podColor) {
			changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor), '1');
		}
		cjPodCtxFront.putImageData(imgDataResultFront, 0,0,0,0,cjPodCvsFront.width,cjPodCvsFront.height);
		if (temImg) {
			koutu('1');
			cjPodCtxFront.drawImage(temImg, posiArrFront[0], posiArrFront[1], posiArrFront[2], posiArrFront[3]);
		}
		if (currentImgB64) {
			var img;
			img = new Image();
			img.src = currentImgB64;
			// imgData = img2;
			img.onload = function () {
				cjPodCtxFront.drawImage(img, 0, 0, mobanWidth, mobanHeight);
				var printVal = $('.cj_pod_front').find('.cj_pod_text').val();
				if (printVal) {
					var posiX = posiArrFront[0] + (posiArrFront[2]) / 2;
					var posiY = posiArrFront[1] + (posiArrFront[3]) / 2;
					// console.log(posiY);
					var printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
					var printArr = printVal.split('<br/>');
					var len = printArr.length;
					for (var i = 0; i < len; i++) {
						cjPodCtxFront.font = 'normal ' + frontFontSize + ' ' + frontFontName;
						cjPodCtxFront.textAlign = 'center';
						cjPodCtxFront.textBaseline = 'middle';
						cjPodCtxFront.fillStyle = frontFontColor;
						cjPodCtxFront.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, posiArrFront[2]);
					}
				}
			}
		}
	}
	var temImgBack;
	var cjPodCvsBack, cjPodCtxBack;
	function drawCanvasBack() {
		cjPodCtxBack.clearRect(0, 0, mobanWidth, mobanHeight);
		if (podColor) {
			changeColor(hexToRGB(canvasBasicColor), hexToRGB(canvasChanColor), '2');
		}
		cjPodCtxBack.putImageData(imgDataResultBack, 0,0,0,0,cjPodCvsBack.width,cjPodCvsBack.height);
		if (temImgBack) {
			koutu('2');
			cjPodCtxBack.drawImage(temImgBack, posiArrBack[0], posiArrBack[1], posiArrBack[2], posiArrBack[3]);
		}
		if (currentImgB64Back) {
			var img;
			img = new Image();
			img.src = currentImgB64Back;
			// imgData = img2;
			img.onload = function () {
				cjPodCtxBack.drawImage(img, 0, 0, mobanWidth, mobanHeight);
				var printVal = $('.cj_pod_back').find('.cj_pod_text').val();
				if (printVal) {
					var posiX = posiArrBack[0] + (posiArrBack[2]) / 2;
					var posiY = posiArrBack[1] + (posiArrBack[3]) / 2;
					// console.log(posiY);
					var printVal = printVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
					var printArr = printVal.split('<br/>');
					var len = printArr.length;
					for (var i = 0; i < len; i++) {
						cjPodCtxBack.font = 'normal ' + backFontSize + ' ' + backFontName;
						cjPodCtxBack.textAlign = 'center';
						cjPodCtxBack.textBaseline = 'middle';
						cjPodCtxBack.fillStyle = backFontColor;
						cjPodCtxBack.fillText(printArr[i], posiX, posiY - (len - 1) * 12 + 24 * i, posiArrBack[2]);
					}
				}
			}
		}
	}
	function hexToRGB(hex) {
		var long = parseInt(hex.replace(/^#/, ""), 16);
		return {
			R: (long >>> 16) & 0xff,
			G: (long >>> 8) & 0xff,
			B: long & 0xff
		};
	}
	function changeColor(oricolor, newColor, flag) {
		// console.log(oricolor, newColor)
		var rgba = [];
		for (var k in oricolor) {
			rgba.push(oricolor[k]);
		}
		// 像素点色值
		// var rgba = rgbaPicker;
		// 容差大小
		var tolerance = podColor.range * 1;
		// console.log(tolerance)
		// var tolerance = eleTolerance.value;

		// var newColor = hexToRGB(eleNewColor.value);
		// console.log(newColor);
		var newColorArr = [];
		for (var k in newColor) {
			newColorArr.push(newColor[k]);
		}
		// console.log(newColorArr);
		if (flag == '1') {
			var canvasTem = document.createElement("canvas")
			var cxtTem = canvasTem.getContext("2d")
			canvasTem.width = mobanWidth;
			canvasTem.height = mobanHeight;
			actFrontChange = 1;
			for (var index = 0; index < imgDataOri.data.length; index += 4) {
				var r = imgDataOri.data[index];
				var g = imgDataOri.data[index + 1];
				var b = imgDataOri.data[index + 2];

				if (Math.sqrt(
					(r - rgba[0]) * (r - rgba[0]) +
					(g - rgba[1]) * (g - rgba[1]) +
					(b - rgba[2]) * (b - rgba[2])) <= tolerance
				) {
					imgDataResultFront.data[index] = (newColorArr[0] + r - rgba[0]);
					imgDataResultFront.data[index + 1] = (newColorArr[1] + g - rgba[1]);
					imgDataResultFront.data[index + 2] = (newColorArr[2] + b - rgba[2]);
					imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];

					imgDataResultFrontKou.data[index] = (newColorArr[0] + r - rgba[0]);
					imgDataResultFrontKou.data[index + 1] = (newColorArr[1] + g - rgba[1]);
					imgDataResultFrontKou.data[index + 2] = (newColorArr[2] + b - rgba[2]);
					imgDataResultFrontKou.data[index + 3] = imgDataOri.data[index + 3];
				} else {
					imgDataResultFront.data[index] = r;
					imgDataResultFront.data[index + 1] = g;
					imgDataResultFront.data[index + 2] = b;
					imgDataResultFront.data[index + 3] = imgDataOri.data[index + 3];

					imgDataResultFrontKou.data[index] = r;
					imgDataResultFrontKou.data[index + 1] = g;
					imgDataResultFrontKou.data[index + 2] = b;
					imgDataResultFrontKou.data[index + 3] = imgDataOri.data[index + 3];
				}
			}
			cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
			cxtTem.putImageData(imgDataResultFront, 0, 0, 0, 0, mobanWidth, mobanHeight);
			currentImgB64 = canvasTem.toDataURL("image/png");
		} else if (flag == '2') {
			var canvasTem = document.createElement("canvas")
			var cxtTem = canvasTem.getContext("2d")
			canvasTem.width = mobanWidth;
			canvasTem.height = mobanHeight;
			for (var index = 0; index < imgDataOriBack.data.length; index += 4) {
				var r = imgDataOriBack.data[index];
				var g = imgDataOriBack.data[index + 1];
				var b = imgDataOriBack.data[index + 2];

				if (Math.sqrt(
					(r - rgba[0]) * (r - rgba[0]) +
					(g - rgba[1]) * (g - rgba[1]) +
					(b - rgba[2]) * (b - rgba[2])) <= tolerance
				) {
					imgDataResultBack.data[index] = (newColorArr[0] + r - rgba[0]);
					imgDataResultBack.data[index + 1] = (newColorArr[1] + g - rgba[1]);
					imgDataResultBack.data[index + 2] = (newColorArr[2] + b - rgba[2]);
					imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];

					imgDataResultBackKou.data[index] = (newColorArr[0] + r - rgba[0]);
					imgDataResultBackKou.data[index + 1] = (newColorArr[1] + g - rgba[1]);
					imgDataResultBackKou.data[index + 2] = (newColorArr[2] + b - rgba[2]);
					imgDataResultBackKou.data[index + 3] = imgDataOriBack.data[index + 3];
				} else {
					imgDataResultBack.data[index] = r;
					imgDataResultBack.data[index + 1] = g;
					imgDataResultBack.data[index + 2] = b;
					imgDataResultBack.data[index + 3] = imgDataOriBack.data[index + 3];

					imgDataResultBackKou.data[index] = r;
					imgDataResultBackKou.data[index + 1] = g;
					imgDataResultBackKou.data[index + 2] = b;
					imgDataResultBackKou.data[index + 3] = imgDataOriBack.data[index + 3];
				}
			}
			cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
			cxtTem.putImageData(imgDataResultBack, 0, 0, 0, 0, mobanWidth, mobanHeight);
			currentImgB64Back = canvasTem.toDataURL("image/png");
		}
	}
	var imgDataOri, imgDataResultFront, currentImgB64;
	var imgDataOriBack, imgDataResultBack, currentImgB64Back;
	var imgDataResultFrontKou, imgDataResultBackKou;
	function getPixels(flag, callback) {
		if (flag == '1') {
			var canvasTem = document.createElement("canvas")
			var cxtTem = canvasTem.getContext("2d")
			// canvasTem.width = imgWidth;
			// canvasTem.height = imgHeight;
			var downloadedImg = new Image;
			// downloadedImg.crossOrigin = "Anonymous";
			downloadedImg.setAttribute('crossorigin', 'anonymous');
			downloadedImg.addEventListener("load", imageReceived, false);
			downloadedImg.src = podZone.front.showimgurl + '?time=' + new Date().getTime();
			function imageReceived() {
				if (this.width / this.height > 1) {
            mobanWidth = imgWidth;
            mobanHeight = Math.floor(this.height / this.width * mobanWidth);
        } else {
            mobanHeight = imgWidth;
            mobanWidth = Math.floor(this.width / this.height * mobanHeight);
        }
        cjPodCvsFront.width = mobanWidth;
				cjPodCvsFront.height = mobanHeight;
				if (cjPodCvsBack) {
					cjPodCvsBack.width = mobanWidth;
					cjPodCvsBack.height = mobanHeight;
				}
				canvasTem.width = mobanWidth;
				canvasTem.height = mobanHeight;
				// console.dir(this);
				// quseContext.clearRect(0, 0,250,250);
				// quseContext.drawImage(this, 0, 0,250,250);
				cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
				cxtTem.drawImage(this, 0, 0, mobanWidth, mobanHeight);
				// 获取像素信息数据
				// imgData = quseContext.getImageData(0, 0,300,300);
				imgDataOri = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				// console.log(imgDataOri)
				imgDataResultFront = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				imgDataResultFrontKou = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				currentImgB64 = canvasTem.toDataURL("image/png");
				if (callback) {
					callback();
				}
			}
		} else if (flag == '2') {
			var canvasTem = document.createElement("canvas")
			var cxtTem = canvasTem.getContext("2d")
			// canvasTem.width = imgWidth;
			// canvasTem.height = imgHeight;
			var downloadedImg = new Image;
			downloadedImg.crossOrigin = "Anonymous";
			downloadedImg.addEventListener("load", imageReceived, false);
			downloadedImg.src = podZone.back.showimgurl + '?time=' + new Date().getTime();
			function imageReceived() {
				if (this.width / this.height > 1) {
            mobanWidth = imgWidth;
            mobanHeight = Math.floor(this.height / this.width * mobanWidth);
        } else {
            mobanHeight = imgWidth;
            mobanWidth = Math.floor(this.width / this.height * mobanHeight);
        }
        cjPodCvsFront.width = mobanWidth;
				cjPodCvsFront.height = mobanHeight;
				if (cjPodCvsBack) {
					cjPodCvsBack.width = mobanWidth;
					cjPodCvsBack.height = mobanHeight;
				}
				canvasTem.width = mobanWidth;
				canvasTem.height = mobanHeight;
				// console.log(this);
				cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
				cxtTem.drawImage(this, 0, 0, mobanWidth, mobanHeight);
				// 获取像素信息数据
				// imgData = quseContext.getImageData(0, 0,300,300);
				imgDataOriBack = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				// console.log(imgDataOriBack)
				imgDataResultBack = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				imgDataResultBackKou = cxtTem.getImageData(0, 0, mobanWidth, mobanHeight);
				currentImgB64Back = canvasTem.toDataURL("image/png");
				if (callback) {
					callback();
				}
			}
		}
	}

	var posiArrFront = [];
	var posiArrBack = [];
	var emptyIndexArrFront, emptyIndexArrBack;
	var editWFront, editHFront, editZoneBiliFront, editWBack, editHBack, editZoneBiliBack;
	var maxLineNumFront, maxLineNumBack;
	function getPosiInfo(flag, callback) {
		var canvasPosi = document.createElement("canvas")
		var cxtPosi = canvasPosi.getContext("2d");
		// flag 1-正面 0-背面
		var r, g, b, a, xMax, xMin, yMax, yMin;
		var imgsrc, temXs, temCtx;
		var temPosiArr = [];
		var emptyIndexArr = [];
		if (flag == '1') {
			imgsrc = podZone.front.editimgurl;
			// temPosiArr = posiArrFront;
		} else if (flag == '2') {
			imgsrc = podZone.back.editimgurl;
			// temPosiArr = posiArrBack;
		}
		// canvasPosi.width = imgWidth;
		// canvasPosi.height = imgHeight;
		// temCtx = cxtPosi;
		// console.log(temCtx)
		var downloadedImg = new Image;
		downloadedImg.crossOrigin = "Anonymous";
		downloadedImg.addEventListener("load", imageReceived, false);
		downloadedImg.src = imgsrc + '?time=' + new Date().getTime();
		function imageReceived() {
			if (this.width / this.height > 1) {
          mobanWidth = imgWidth;
          mobanHeight = Math.floor(this.height / this.width * mobanWidth);
      } else {
          mobanHeight = imgWidth;
          mobanWidth = Math.floor(this.width / this.height * mobanHeight);
      }
      cjPodCvsFront.width = mobanWidth;
			cjPodCvsFront.height = mobanHeight;
			if (cjPodCvsBack) {
				cjPodCvsBack.width = mobanWidth;
				cjPodCvsBack.height = mobanHeight;
			}
			canvasPosi.width = mobanWidth;
			canvasPosi.height = mobanHeight;
			temCtx = cxtPosi;
			// console.log(this);
			temCtx.clearRect(0, 0, mobanWidth, mobanHeight);
			temCtx.drawImage(this, 0, 0, mobanWidth, mobanHeight);
			// 获取像素信息数据
			temXs = temCtx.getImageData(0, 0, mobanWidth, mobanHeight);
			// console.log(temXs);
			// emptyIndexArrFront = [];
			var xArr = [];
			var yArr = [];
			var realIndex;
			for (var index = 0; index < temXs.data.length; index += 4) {
				r = temXs.data[index];
				g = temXs.data[index + 1];
				b = temXs.data[index + 2];
				a = temXs.data[index + 3];
				if (r == 0 && g == 0 && b == 0 && a == 0) {
					realIndex = index / 4;
					emptyIndexArr.push(index);
					xArr.push(realIndex % mobanWidth)
					yArr.push(Math.floor(realIndex / mobanWidth))
				}
				// posiArr.push([r,g,b,a]);
			}
			function sortNumber(a, b) {
				return a - b
			}
			xArr.sort(sortNumber);
			yArr.sort(sortNumber);
			// console.log(xArr,yArr)
			xMax = xArr[xArr.length - 1] + 2;
			xMin = xArr[0] - 1;
			yMax = yArr[yArr.length - 1] + 2;
			yMin = yArr[0] - 1;
			temPosiArr = [xMin, yMin, xMax - xMin, yMax - yMin];
			console.log(temPosiArr);
			if (flag == '1') {
				posiArrFront = JSON.parse(JSON.stringify(temPosiArr));
				emptyIndexArrFront = JSON.parse(JSON.stringify(emptyIndexArr));
				editWFront = posiArrFront[2];
				editHFront = posiArrFront[3];
				editZoneBiliFront = (editWFront / editHFront).toFixed(2);
				maxLineNumFront = Math.floor(posiArrFront[3] / 24);
			} else if (flag == '2') {
				posiArrBack = JSON.parse(JSON.stringify(temPosiArr));
				emptyIndexArrBack = JSON.parse(JSON.stringify(emptyIndexArr));
				editWBack = posiArrBack[2];
				editHBack = posiArrBack[3];
				editZoneBiliBack = (editWBack / editHBack).toFixed(2);
				maxLineNumBack = Math.floor(posiArrBack[3] / 24);
			}
			// temCtx.fillStyle = "rgba(0,255,0,0.2)";
			// temCtx.fillRect(xMin, yMin, xMax-xMin, yMax-yMin);
			if (callback) {
				callback();
			}
			// put数据
			// contextResultBack.putImageData(imgDataResultBack, 0, 0);
		}
	}
	var canvasTem = document.createElement("canvas")
	var cxtTem = canvasTem.getContext("2d")
	function koutu(flag) {
		canvasTem.width = mobanWidth;
		canvasTem.height = mobanHeight;
		if (flag == '1') {
			if (emptyIndexArrFront && emptyIndexArrFront.length > 0) {
				for (var i = 0; i < emptyIndexArrFront.length; i++) {
					imgDataResultFrontKou.data[emptyIndexArrFront[i]] = 0;
					imgDataResultFrontKou.data[emptyIndexArrFront[i] + 1] = 0;
					imgDataResultFrontKou.data[emptyIndexArrFront[i] + 2] = 0;
					imgDataResultFrontKou.data[emptyIndexArrFront[i] + 3] = 0;
				}
			}
			cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
			cxtTem.putImageData(imgDataResultFrontKou, 0, 0, 0, 0, mobanWidth, mobanHeight);
			currentImgB64 = canvasTem.toDataURL("image/png");
		} else if (flag == '2') {
			if (emptyIndexArrBack && emptyIndexArrBack.length > 0) {
				for (var i = 0; i < emptyIndexArrBack.length; i++) {
					imgDataResultBackKou.data[emptyIndexArrBack[i]] = 0;
					imgDataResultBackKou.data[emptyIndexArrBack[i] + 1] = 0;
					imgDataResultBackKou.data[emptyIndexArrBack[i] + 2] = 0;
					imgDataResultBackKou.data[emptyIndexArrBack[i] + 3] = 0;
				}
			}
			cxtTem.clearRect(0, 0, mobanWidth, mobanHeight);
			cxtTem.putImageData(imgDataResultBackKou, 0, 0, 0, 0, mobanWidth, mobanHeight);
			currentImgB64Back = canvasTem.toDataURL("image/png");
		}
	}

	var inputObj2 = document.createElement('input');
	inputObj2.addEventListener('change', readFile2, false);
	inputObj2.type = 'file';
	inputObj2.accept = 'image/*';
	inputObj2.id = 'cj_pod_inp_file2';
	// inputObj2.click();
	function readFile2() {
		var file = this.files[0];//获取input输入的图片
		console.log(file);
		if (!/image\/\w+/.test(file.type)) {
			cjAlert("Please make sure the file type is an image.");
			inputObj2.value = '';
			return false;
		}//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
		var reader = new FileReader();
		reader.readAsDataURL(file);//转化成base64数据类型
		reader.onload = function (e) {
			var result = this.result;
			var image = new Image();
			image.onload = function () {
				var width = this.width;
				var height = this.height;
				if (width >= 1000 && height >= 1000) {
					$('.cj_pod_upload_back').show();
					inputObj2.value = '';
					drawToCanvasBack(result);
				} else {
					cjAlert('To ensure the high-quality print, please upload images size larger than 1000*1000.');
					inputObj2.value = '';
				}
			};
			image.src = this.result;
			// drawToCanvasBack(this.result);
		}
	}
	var inputObj1 = document.createElement('input');
	inputObj1.addEventListener('change', readFile1, false);
	inputObj1.type = 'file';
	inputObj1.accept = 'image/*';
	inputObj1.id = 'cj_pod_inp_file1';
	// inputObj1.click();
	function readFile1() {
		var file = this.files[0];//获取input输入的图片
		// console.log(file);
		// alert(file)
		// alert(file.type)
		if (!/image\/\w+/.test(file.type)) {
			cjAlert("Please make sure the file type is an image.");
			inputObj1.value = '';
			return false;
		}//判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
		// alert(FileReader)
		var reader = new FileReader();
		reader.readAsDataURL(file);//转化成base64数据类型
		reader.onload = function (e) {
			// console.log(this);
			var result = this.result;
			var image = new Image();
			image.onload = function () {
				var width = this.width;
				var height = this.height;
				if (width >= 1000 && height >= 1000) {
					$('.cj_pod_upload_front').show();
					inputObj1.value = '';
					drawToCanvas(result);
				} else {
					cjAlert('To ensure the high-quality print, please upload images size larger than 1000*1000.');
					inputObj1.value = '';
				}
			};
			image.src = this.result;
			// drawToCanvas(result);
		}
	}
	function doInput() {
		if (podFace == '2') {
			inputObj2.click();
		}
		if (podFace == '1') {
			inputObj1.click();
		}
	}

	function editImg() {
		if (podFace == '2') {
			$('.cj_pod_upload_back').show();
		}
		if (podFace == '1') {
			$('.cj_pod_upload_front').show();
		}
	}
	function deleteImg() {
		if (podFace == '2') {
			$('.cj_pod_upload_back').hide();
			imgDataBack = null;
			temImgBack = null;
			$('.cj_pod_back').find('.cj_pod_add_pic_btn').show();
			$('.cj_pod_back').find('.img-data').hide();
			$('.cj_pod_back').find('.img-data .img_show').attr('src', '#');
			drawCanvasBack();
		}
		if (podFace == '1') {
			$('.cj_pod_upload_front').hide();
			imgData = null;
			temImg = null;
			$('.cj_pod_front').find('.cj_pod_add_pic_btn').show();
			$('.cj_pod_front').find('.img-data').hide();
			$('.cj_pod_front').find('.img-data .img_show').attr('src', '#');
			drawCanvasFront();
		}
	}
	function checkImg() {
		// cjLoad();
		// console.log('222222')
		// return
		if (podFace == '2') {
			$('.cj_pod_upload_back').hide();
			$('.cj_pod_back').find('.cj_pod_add_pic_btn').hide();
			$('.cj_pod_back').find('.img-data').show();
			$('.cj_pod_back').find('.img-data .img_show').attr('src', imgDataBack);
			// koutu(imgDataResultBack, emptyIndexArrBack);
			drawCanvasBack();
			// writeBackInfo();
			cjLoad();
			uploadImgs('22', function () {
				console.log('22上传完成');
				closeCjLoad();
				// toggleCartBtn(0);
				// toggleDesignBtn(1);
			});
		}
		if (podFace == '1') {
			$('.cj_pod_upload_front').hide();
			$('.cj_pod_front').find('.cj_pod_add_pic_btn').hide();
			$('.cj_pod_front').find('.img-data').show();
			$('.cj_pod_front').find('.img-data .img_show').attr('src', imgData);
			// koutu(imgDataResultFront, emptyIndexArrFront);
			drawCanvasFront();
			// writeFrontInfo();
			cjLoad();
			uploadImgs('11', function () {
				console.log('11上传完成');
				closeCjLoad();
				// toggleCartBtn(0);
				// toggleDesignBtn(1);
			});
		}
	}

	var bigCvsArr = [];
	var criticalVal1, criticalVal2, criticalVal3, criticalVal4;
	var imgfinW, imgfinH;
	var imgW, imgH;
	var cutImgCvs, cutImgCtx;
	var bigCvs = document.createElement("canvas");
	var bigCxt = bigCvs.getContext("2d");
	function drawToCanvas(imgData) {
		// cutImgCvs = document.querySelector('#cutimg_cvs_front');
		// cutImgCtx = cutImgCvs.getContext('2d');
		// console.log(cutImgCvs)
		var img = new Image;
		img.src = imgData;
		img.onload = function () {//必须onload之后再画
			var cutWidth = cutImgCvs.width;
			// console.log(img);
			imgW = img.width;
			imgH = img.height;
			bigCvs.width = imgW;
			bigCvs.height = imgH;
			var bili, posiX, posiY;
			var markW, markH;
			if (imgW / imgH < 1) {
				if (imgH > cutWidth) {
					imgfinH = cutWidth;
				} else {
					imgfinH = imgH;
				}
				bili = imgfinH / imgH;
				imgfinW = imgW * bili;
				// markW = Math.floor(imgfinW * 0.8);
				// markH = Math.floor(editHFront / editWFront * markW);
				var bili2 = editHFront / editWFront;
				if (bili2 < 1) {
            if (imgfinW>400) {
                markW = 400;
            } else {
                markW = imgfinW;
            }
            markH = markW * bili2;
        } else {
            if (imgfinH>400) {
                markH = 400;
            } else {
                markH = imgfinH;
            }
            markW = markH * (1/bili2);
        }
				criticalVal1 = Math.floor((cutWidth + 20 - imgfinW) / 2); // left
				criticalVal2 = Math.floor((cutWidth + 20 - imgfinW) / 2 + imgfinW); // left+width
				criticalVal3 = 10; // top
				criticalVal4 = cutWidth + 10; // top+height
			} else {
				if (imgW > cutWidth) {
					imgfinW = cutWidth;
				} else {
					imgfinW = imgW;
				}
				bili = imgfinW / imgW;
				imgfinH = imgH * bili;
				// markH = Math.floor(imgfinH * 0.8);
				// markW = Math.floor(editWFront / editHFront * markH);
				var bili2 = editHFront / editWFront;
				if (bili2 < 1) {
            if (imgfinW>400) {
                markW = 400;
            } else {
                markW = imgfinW;
            }
            markH = markW * bili2;
        } else {
            if (imgfinH>400) {
                markH = 400;
            } else {
                markH = imgfinH;
            }
            markW = markH * (1/bili2);
        }
				criticalVal1 = 10; // left
				criticalVal2 = cutWidth + 10; // left+width
				criticalVal3 = Math.floor((cutWidth + 20 - imgfinH) / 2); // top
				criticalVal4 = Math.floor((cutWidth + 20 - imgfinH) / 2 + imgfinH); // top+height
			}
			posiX = (cutWidth - imgfinW) / 2;
			posiY = (cutWidth - imgfinH) / 2;
			cutImgCtx.clearRect(0, 0, cutWidth, cutWidth);
			cutImgCtx.drawImage(img, posiX, posiY, imgfinW, imgfinH);
			bigCxt.clearRect(0, 0, imgW, imgH);
			bigCxt.drawImage(img, 0, 0, imgW, imgH);
			oMark.style.width = markW + 'px';
			oMark.style.height = markH + 'px';
			oMark.style.left = Math.floor((cutWidth + 20 - markW) / 2) + 'px';
			oMark.style.top = Math.floor((cutWidth + 20 - markH) / 2) + 'px';
			drawPic();
			// strDataURI = cvs.toDataURL();//获取canvas base64数据
		}
	}

	var bigCvsArrBack = [];
	var criticalVal1Back, criticalVal2Back, criticalVal3Back, criticalVal4Back;
	var imgfinWBack, imgfinHBack;
	var imgWBack, imgHBack;
	var bigCvsBack = document.createElement("canvas");
	var bigCxtBack = bigCvsBack.getContext("2d");
	var cutImgCvsBack, cutImgCtxBack;
	function drawToCanvasBack(imgData) {
		// cutImgCvsBack = document.querySelector('#cutimg_cvs_back');
		// cutImgCtxBack = cutImgCvsBack.getContext('2d');
		var img = new Image;
		img.src = imgData;
		img.onload = function () {//必须onload之后再画
			var cutWidth = cutImgCvsBack.width;
			// console.log(img);
			imgWBack = img.width;
			imgHBack = img.height;
			bigCvsBack.width = imgWBack;
			bigCvsBack.height = imgHBack;
			var bili, posiX, posiY;
			var markW, markH;
			if (imgWBack / imgHBack < 1) {
				if (imgHBack > cutWidth) {
					imgfinHBack = cutWidth;
				} else {
					imgfinHBack = imgHBack;
				}
				bili = imgfinHBack / imgHBack;
				imgfinWBack = imgWBack * bili;
				// markW = Math.floor(imgfinWBack * 0.8);
				// markH = Math.floor(editHBack / editWBack * markW);
				var bili2 = editHBack / editWBack;
				if (bili2 < 1) {
            if (imgfinWBack>400) {
                markW = 400;
            } else {
                markW = imgfinWBack;
            }
            markH = markW * bili2;
        } else {
            if (imgfinHBack>400) {
                markH = 400;
            } else {
                markH = imgfinHBack;
            }
            markW = markH * (1/bili2);
        }
				criticalVal1Back = Math.floor((cutWidth + 20 - imgfinWBack) / 2); // left
				criticalVal2Back = Math.floor((cutWidth + 20 - imgfinWBack) / 2 + imgfinWBack); // left+width
				criticalVal3Back = 10; // top
				criticalVal4Back = cutWidth + 10; // top+height
			} else {
				if (imgWBack > cutWidth) {
					imgfinWBack = cutWidth;
				} else {
					imgfinWBack = imgWBack;
				}
				bili = imgfinWBack / imgWBack;
				imgfinHBack = imgHBack * bili;
				// markH = Math.floor(imgfinHBack * 0.8);
				// markW = Math.floor(editWBack / editHBack * markH);
				var bili2 = editHBack / editWBack;
				if (bili2 < 1) {
            if (imgfinWBack>400) {
                markW = 400;
            } else {
                markW = imgfinWBack;
            }
            markH = markW * bili2;
        } else {
            if (imgfinHBack>400) {
                markH = 400;
            } else {
                markH = imgfinHBack;
            }
            markW = markH * (1/bili2);
        }
				criticalVal1Back = 10; // left
				criticalVal2Back = cutWidth + 10; // left+width
				criticalVal3Back = Math.floor((cutWidth + 20 - imgfinHBack) / 2); // top
				criticalVal4Back = Math.floor((cutWidth + 20 - imgfinHBack) / 2 + imgfinHBack); // top+height
			}
			posiX = (cutWidth - imgfinWBack) / 2;
			posiY = (cutWidth - imgfinHBack) / 2;
			cutImgCtxBack.clearRect(0, 0, cutWidth, cutWidth);
			cutImgCtxBack.drawImage(img, posiX, posiY, imgfinWBack, imgfinHBack);
			bigCxtBack.clearRect(0, 0, imgWBack, imgWBack);
			bigCxtBack.drawImage(img, 0, 0, imgWBack, imgHBack);
			oMarkBack.style.width = markW + 'px';
			oMarkBack.style.height = markH + 'px';
			oMarkBack.style.left = Math.floor((cutWidth + 20 - markW) / 2) + 'px';
			oMarkBack.style.top = Math.floor((cutWidth + 20 - markH) / 2) + 'px';
			drawPicBack();
		}
	}


	var canvasTemCom = document.createElement("canvas");
	var cxtTemCom = canvasTemCom.getContext("2d");
	// var temImg, temImgBack;
	var imgData, imgDataBig;
	var upimgResFrontCvs, upimgResFrontCxs;
	var previewCvs, previewCtx;
	function drawPic() {
		// var upimgResFrontCvs = document.getElementById('upimg-res-front');
		// var upimgResFrontCxs = upimgResFrontCvs.getContext("2d");
		// var previewCvs = document.getElementById('preview-cvs');
		// var previewCtx = previewCvs.getContext("2d");
		var srcX = oMark.offsetLeft - 10;
		var srcY = oMark.offsetTop - 10;
		var sWidth = oMark.offsetWidth;
		var sHeight = oMark.offsetHeight;
		console.log(srcX, srcY, sWidth, sHeight)
		var dataImg = cutImgCtx.getImageData(srcX, srcY, sWidth, sHeight);
		console.log(dataImg);
		canvasTemCom.width = sWidth;
		canvasTemCom.height = sHeight;
		// console.log(canvasTemCom.width, canvasTemCom.height)
		cxtTemCom.clearRect(0, 0, canvasTemCom.width, canvasTemCom.height);
		cxtTemCom.putImageData(dataImg, 0, 0, 0, 0, canvasTemCom.width, canvasTemCom.height)
		var img2 = canvasTemCom.toDataURL("image/png");
		// console.log(img2);
		// cxt3.putImageData(dataImg,0,0,0,0,canvas3.width,canvas3.height)
		// previewCtx.putImageData(dataImg,0,0,posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3])
		temImg = new Image();
		temImg.src = img2;
		imgData = img2;
		bigCvsArr = [];
		var bigCvsBili = imgW / imgfinW;
		bigCvsArr.push(((oMark.offsetLeft - criticalVal1) * bigCvsBili).toFixed(0), ((oMark.offsetTop - criticalVal3) * bigCvsBili).toFixed(0), (sWidth * bigCvsBili).toFixed(0), (sHeight * bigCvsBili).toFixed(0));
		console.log(bigCvsArr);
		var dataImgBig = bigCxt.getImageData(bigCvsArr[0], bigCvsArr[1], bigCvsArr[2], bigCvsArr[3]);

		upimgResFrontCvs.width = bigCvsArr[2];
		upimgResFrontCvs.height = bigCvsArr[3];
		upimgResFrontCxs.clearRect(0, 0, upimgResFrontCvs.width, upimgResFrontCvs.height);
		upimgResFrontCxs.putImageData(dataImgBig, 0, 0, 0, 0, upimgResFrontCvs.width, upimgResFrontCvs.height)
		imgDataBig = upimgResFrontCvs.toDataURL("image/png");
		// writeFrontInfo();
		temImg.onload = function () {
			previewCtx.clearRect(0, 0, mobanWidth, mobanHeight);
			previewCtx.putImageData(imgDataResultFront, 0,0,0,0,previewCvs.width,previewCvs.height);
			previewCtx.drawImage(temImg, posiArrFront[0], posiArrFront[1], posiArrFront[2], posiArrFront[3])
			downloadedImg = new Image;
			downloadedImg.crossOrigin = "Anonymous";
			downloadedImg.addEventListener("load", imageReceived, false);
			koutu('1');
			downloadedImg.src = currentImgB64;
			// downloadedImg.src = currentImg;
			function imageReceived() {
				// console.log(this);
				previewCtx.drawImage(this, 0, 0, mobanWidth, mobanHeight);
				// frontCtx.fillStyle = "rgba(0,255,0,0.2)";
				// frontCtx.fillRect(posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3]);
			}
		}
	}
	var upimgResBackCvs, upimgResBackCxs;
	var previewCvsBack, previewCtxBack;
	var imgDataBack, imgDataBigBack;
	function drawPicBack() {
		// var upimgResBackCvs = document.getElementById('cj_pod_upimg_res_back');
		// var upimgResBackCxs = upimgResBackCvs.getContext("2d");
		// var previewCvsBack = document.getElementById('preview_cvs_back');
		// var previewCtxBack = previewCvsBack.getContext("2d");
		console.log(oMarkBack.offsetLeft, cutImgCvs.getBoundingClientRect().left)
		// var srcX = oMarkBack.offsetLeft-cutImgCvs.getBoundingClientRect().left;
		var srcX = oMarkBack.offsetLeft - 10;
		var srcY = oMarkBack.offsetTop - 10;
		// var srcY = oMarkBack.offsetTop-cutImgCvs.getBoundingClientRect().top;
		var sWidth = oMarkBack.offsetWidth;
		var sHeight = oMarkBack.offsetHeight;
		console.log(srcX, srcY, sWidth, sHeight)
		var dataImg = cutImgCtxBack.getImageData(srcX, srcY, sWidth, sHeight);
		console.log(dataImg);
		canvasTemCom.width = sWidth;
		canvasTemCom.height = sHeight;
		cxtTemCom.putImageData(dataImg, 0, 0, 0, 0, canvasTemCom.width, canvasTemCom.height)
		var img2 = canvasTemCom.toDataURL("image/png");
		// console.log(img2);
		// cxt3.putImageData(dataImg,0,0,0,0,canvas3.width,canvas3.height)
		// previewCtx.putImageData(dataImg,0,0,posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3])
		temImgBack = new Image();
		temImgBack.src = img2;
		imgDataBack = img2;
		bigCvsArrBack = [];
		var bigCvsBili = imgWBack / imgfinWBack;
		bigCvsArrBack.push(((oMarkBack.offsetLeft - criticalVal1Back) * bigCvsBili).toFixed(0), ((oMarkBack.offsetTop - criticalVal3Back) * bigCvsBili).toFixed(0), (sWidth * bigCvsBili).toFixed(0), (sHeight * bigCvsBili).toFixed(0));
		console.log(bigCvsArrBack);
		var dataImgBig = bigCxtBack.getImageData(bigCvsArrBack[0], bigCvsArrBack[1], bigCvsArrBack[2], bigCvsArrBack[3]);
		upimgResBackCvs.width = bigCvsArrBack[2];
		upimgResBackCvs.height = bigCvsArrBack[3];
		upimgResBackCxs.clearRect(0, 0, upimgResBackCvs.width, upimgResBackCvs.height);
		upimgResBackCxs.putImageData(dataImgBig, 0, 0, 0, 0, upimgResBackCvs.width, upimgResBackCvs.height)
		imgDataBigBack = upimgResBackCvs.toDataURL("image/png");
		// writeBackInfo();
		temImgBack.onload = function () {
			previewCtxBack.clearRect(0, 0, mobanWidth, mobanHeight);
			previewCtxBack.putImageData(imgDataResultFront, 0,0,0,0,previewCvsBack.width,previewCvsBack.height);
			previewCtxBack.drawImage(temImgBack, posiArrBack[0], posiArrBack[1], posiArrBack[2], posiArrBack[3])
			downloadedImg = new Image;
			downloadedImg.crossOrigin = "Anonymous";
			downloadedImg.addEventListener("load", imageReceived, false);
			koutu('2');
			downloadedImg.src = currentImgB64Back;
			// downloadedImg.src = currentImgBack;
			function imageReceived() {
				// console.log(this);
				previewCtxBack.drawImage(this, 0, 0, mobanWidth, mobanHeight);
				// frontCtx.fillStyle = "rgba(0,255,0,0.2)";
				// frontCtx.fillRect(posiInfo[0], posiInfo[1], posiInfo[2], posiInfo[3]);
			}
		}
	}

	var oMark, oMarkInner, oMarkBack, oMarkBackInner, markMouse;

})()