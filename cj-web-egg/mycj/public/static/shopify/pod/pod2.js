; ~function () {
  if (window.cjPodFunction) {
    console.log('POD function already executed.');
    return;
  }

  window.cjPodFunction = true;

  // 取当前商品链接
  var href = window.location.href;
  var shopName = document.domain.replace('.myshopify.com', '');
  var ovariant=getQueryString('variant');
  var podVersion=1;
  var app1href = 'https://app1.cjdropshipping.com/cj/individuationProduct/getProductInfoByShopNameAndProductId';
  // var app1href = 'http://app1.test.com/cj/individuationProduct/getProductInfoByShopNameAndProductId';
  function getQueryString(name){//获取地址参数
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
  }
  
  if (href.indexOf('/products') != -1) {
    if (href.indexOf('?variant=') != -1) {
      href = href.split('?')[0];
    }
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // 判断是否手机端
    function isPhone() {
      var isphone = false;
      var sUserAgent = navigator.userAgent;
      if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
        isphone = true;
      }
      return isphone;
    }

    var iframe;
    var custom;
    function insertIframe() {
      iframe = document.createElement('iframe');
      iframe.id = 'cj_design_frame'
      iframe.width = windowWidth + 'px';
      iframe.height = windowHeight + 'px';
      iframe.style.border = '0';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.right = - windowWidth + 'px';
      iframe.style.transition = 'all .5s';
      iframe.style.zIndex = '9999';
      if (isPhone()) {
        if(podVersion==2){
          iframe.src = 'https://app.cjdropshipping.com/static/shopify/v2/phone.html' + '?fwidth=' + windowWidth + '&fheight=' + windowHeight;
        }else{
          iframe.src = 'https://app.cjdropshipping.com/static/shopify/v1/phone.html' + '?fwidth=' + windowWidth + '&fheight=' + windowHeight;
        }
        
      } else {
        if(podVersion==2){
          iframe.src = 'https://app.cjdropshipping.com/static/shopify/v2/pc.html';
        }else{
          iframe.src = 'https://app.cjdropshipping.com/static/shopify/v1/pc.html';
        }
      }
      document.querySelector('body').append(iframe);

      window.addEventListener('message', function (event) {
        var origin = event.origin || event.originalEvent.origin;
        var flag = event.data.flag;
        // console.log(flag)
        if (flag == 'closeFromCJ') {
          iframe.style.right = - windowWidth + 'px';
          document.body.removeEventListener('touchmove', bodyScroll, false);
          document.body.style.position = 'initial';
          document.body.style.height = 'auto';
          let ele = document.getElementsByClassName('PageTransition')
          if(ele.length){
            ele[0].style.setProperty('opacity', 0)
          }
        }
        if (flag == 'saveFromCJ') {
          var customArr = document.querySelectorAll('.cj_custom_inp');
          for (let i = 0; i < customArr.length; i++) {
            customArr[i].name = "properties[Custom_" + event.data.data.customId + "]";
            customArr[i].value = event.data.data.customeInfo;
          }
          // custom.name = "properties[Custom_" + event.data.data.customId + "]";
          // custom.value = event.data.data.customeInfo;
          iframe.style.right = - windowWidth + 'px';
          document.body.removeEventListener('touchmove', bodyScroll, false);
          document.body.style.position = 'initial';
          document.body.style.height = 'auto';
          if (designBtn2) {
            designBtn2.innerHTML = customMessage.language.previewRedesign;
          }
          let ele = document.getElementsByClassName('PageTransition')
          if(ele.length){
            ele[0].style.setProperty('opacity', 0)
          }
        }
      })

      document.addEventListener('click', function (e) {
        // console.log(e);
        if (
          e.target.className
          && e.target.className == 'cj-design-btn2'
        ) {
          iframe.style.right = 0;
          document.body.addEventListener('touchmove', bodyScroll, false);
          // document.body.style.position = 'fixed';
          document.body.style.height = '100%';

          //变量选择改变时重新获取商品信息
          let ovid = getQueryString('variant');
          app1Obj.vid=ovid?ovid:productInfo.variants[0].id +'';
          postFun(app1href, JSON.stringify(app1Obj), function (cjdata) {
            var cjdata = JSON.parse(cjdata);
            if (cjdata.code != "CODE_200" || cjdata.list.length == 0) {
              return;
            }
            var cjProInfo = cjdata.list[0];
            if (cjProInfo.customMessage && Array.isArray(JSON.parse(cjProInfo.customMessage))) {
              podVersion = 2;
              customMessage.areaList = getAreaList(cjProInfo.VARIANTKEY, JSON.parse(cjProInfo.customMessage));
            } 
            var customeDesign = cjProInfo.customeDesign;
            console.log(customMessage)
            if (!customeDesign) {
              // 是pod商品
              window['customMessage'] = customMessage;
              iframe.contentWindow.postMessage({
                flag: 'gotdata',
                data: customMessage
              }, '*');
            }
          })
        }
      })

    }

    function bodyScroll(event) {
      event.preventDefault();
    }

    document.addEventListener('mouseover', function (e) {
      if (
        e.target.className &&
        e.target.className == 'cj-design-btn2'
      ) {
        e.target.style.opacity = '0.7';
      }
    })
    document.addEventListener('mouseout', function (e) {
      if (
        e.target.className &&
        e.target.className == 'cj-design-btn2'
      ) {
        e.target.style.opacity = '1';
      }
    })

    function getFun(url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据   
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
          // 从服务器获得数据 
          fn.call(this, xhr.responseText);
        }

      };
      xhr.send();
    }

    function postFun(url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
    var productInfo;
    var customMessage;
    var designBtn2;
    productInfo = window.cjpod.product;
    if(!ovariant){
      ovariant = productInfo.variants?productInfo.variants[0].id:""
    }
    let app1Obj = {
      pid: productInfo.id + '', //productInfo.id3785817325621
      shopName: shopName,
      vid: ovariant?ovariant:''
    }
    //pod2根据颜色重置背景图片
    function getAreaList(color,list){
      let newList=[];
      for(let i=0;i<list.length;i++){
        let obj={};
        let backL = list[0].backImgList.length;
        if(color){
          for(let j=0;j<backL;j++){
            if(color.toLowerCase()==list[i].backImgList[j].color.toLowerCase()){
              for(let key in list[i]){
                if(key!='backImgList'){
                  obj[key]=list[i][key];
                }
              }
              obj.backImgList=[];
              obj.backImgList.push({
                imgsrc:list[i].backImgList[j].imgsrc,
                color:list[i].backImgList[j].color
              });
            }
          }
        }else{
          for(let key in list[i]){
            if(key!='backImgList'){
              obj[key]=list[i][key];
            }
          }
          obj.backImgList=[];
        }
        newList.push(obj);
      }
      return newList;
    }
    function getShopCutomdesignData() {
      // 特殊店铺/特殊商品特殊处理
      console.log('ajax')
      // -------------------------------------------------------------------------------------------
      
      // 获取cj商品详情productInfo.id
      postFun(app1href, JSON.stringify(app1Obj), function (cjdata) {
        // console.log(cjdata);
        var cjdata = JSON.parse(cjdata);
        if (cjdata.code != "CODE_200" || cjdata.list.length == 0) {
          // console.log('获取cj详情失败');
          return;
        }
        var cjProInfo = cjdata.list[0];
        let podSetting = cjProInfo.shopifyPodSettings?JSON.parse(cjProInfo.shopifyPodSettings):'';
        customMessage = {};

        cjProInfo.language = podSetting?podSetting.language:'English';
        language = podSetting?podSetting.language:'English';
        getFun('https://app.cjdropshipping.com/static/components/design_frame2/language.json?v=20190904', function (data) {
          var customMessage1 = {};
          if(cjProInfo.customMessage && Array.isArray(JSON.parse(cjProInfo.customMessage))){
            podVersion=2;
            customMessage.areaList = getAreaList(cjProInfo.VARIANTKEY,JSON.parse(cjProInfo.customMessage));
          }else if(cjProInfo.customMessage && !Array.isArray(JSON.parse(cjProInfo.customMessage))){
            podVersion=1;
            customMessage1 = cjProInfo.customMessage;
            customMessage = JSON.parse(customMessage1);
          }
          customMessage.language = JSON.parse(data)[cjProInfo.language];
          var customeDesign = cjProInfo.customeDesign;
          if (customMessage1 && !customeDesign) {
            // console.log('customMessage', customMessage);
            customMessage.title = productInfo.title;
            customMessage.shopPid = productInfo.id;
            customMessage.shopName = shopName;
            window['customMessage'] = customMessage;
            insertIframe();
            iframe.onload = function () {
              setTimeout(() => {
                iframe.contentWindow.postMessage({
                  flag: 'gotdata',
                  data: customMessage
                }, '*');
              }, 1000);
            }
            // custom = document.createElement('input');
            // custom.type = "hidden";
            // custom.className = "cj_custom_inp";
            // custom.name = "properties[Custom_]";
            var formArr = document.querySelectorAll('form[action="/cart/add"]');
            for (var i = 0; i < formArr.length; i++) {
              if (
                formArr[i].dataset
                && formArr[i].dataset.productid 
                && formArr[i].dataset.productid != productInfo.id
                // 处理多form情况
              ) continue;
              custom = document.createElement('input');
              custom.type = "hidden";
              custom.className = "cj_custom_inp";
              custom.name = "properties[Custom_]";
              formArr[i].append(custom);
              var submit = formArr[i].querySelectorAll('button[name="add"]')
              if (submit.length == 0) {
                submit = formArr[i].querySelectorAll('button[type="submit"]');
              }
              if (submit.length == 0) {
                submit = formArr[i].querySelectorAll('input[type="submit"]');
              }
              if (submit.length == 0) {
                submit = formArr[i].querySelectorAll('button[title="Add to Cart"]');
              }
              if (submit.length == 0) {
                submit = formArr[i].querySelectorAll('button[id="add-to-cart"]');
              }
              if (submit.length == 0) {
                submit = formArr[i].querySelectorAll('button.btn-addtocart');
              }
              for (var j = 0; j < submit.length; j++) {
                if (submit[j].disabled || submit[j].style.display == 'none' || submit[j].style.visibility == 'hidden') continue;
                let podSetting = cjProInfo.shopifyPodSettings?JSON.parse(cjProInfo.shopifyPodSettings):'';
                designBtn2 = document.createElement('a');
                designBtn2.className = 'cj-design-btn2';
                designBtn2.href = 'javascript:void(0);'
                designBtn2.innerHTML = customMessage.language.desgin;
                if(podSetting) {
                  designBtn2.style = 'height:'+podSetting.height+'px;line-height:'+(podSetting.height-podSetting.frameSize*2)+'px;width:'+podSetting.width+'%;background-color:'+podSetting.backColor+';color:'+podSetting.textColor+';font-size:'+podSetting.textSize+'px;border-width:'+podSetting.frameSize+'px;border-color:'+podSetting.frameColor+';border-radius:'+podSetting.fillet+podSetting.filletUnit+';margin:'+(podSetting.margin?podSetting.margin:'10 auto')+';display: block;border-style: solid;text-align: center;transition: all .3s; clear: both;box-sizing:border-box;';
                }else{
                  designBtn2.style = 'display: block; height: 50px; line-height: 50px; border: 1px solid #ff7d3b; margin: 10px 0; width: 100%; text-align: center; border-radius: 25px; color: #ff7d3b; font-size: 16px; transition: all .3s; clear: both;'
                }
                var node = submit[j];
                function getForm() {
                  if (node.parentNode.nodeName == 'FORM') {
                    return node;
                  } else {
                    node = node.parentNode;
                    getForm();
                  }
                }
                getForm()
                if (formArr[i].querySelector('.cj-design-btn2')) {
                  console.log('.cj-design-btn2 aleary exists.');
                } else {
                  formArr[i].insertBefore(designBtn2, node);
                }
              }
            }
          }
        })
        
      })
    }
    getShopCutomdesignData();
  }

}();
