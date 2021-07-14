const shopifyPluginImgUrlProcess = tempUrl => {
  // shopify getuploadkit插件链接判断处理
  if (
    tempUrl.startsWith(
      'https://cdn.shopify.com/s/files/1/0033/4807/0511/files/download.html?',
    )
  ) {
    var urlParams = new URLSearchParams(
        tempUrl.substr(tempUrl.indexOf('?', 0)).replace(/&amp;/g, '&'),
      ),
      id = urlParams.get('id'),
      uuid = urlParams.get('uu'),
      modifiers = urlParams.get('mo'),
      filename = urlParams.get('fi'),
      isImage = urlParams.get('image'),
      decodedFilename = filename > '' ? atob(filename) : '';
    return (
      'https://files.getuploadkit.com/' +
      id +
      '/' +
      uuid +
      '/' +
      decodedFilename +
      '?dl=1'
    );
  } else {
    return tempUrl;
  }
};

export default (properties: any, properType: string, spItemObj: any) => {
  if (properType == 'order') {
    let gxhOrdFlag = true;
    console.log(properties);
    var dzList = properties;
    let newCusDesignArr = [];
    let type0Arr = [];
    let type1Arr = [];
    let type2Arr = [];
    let typeCommon = [];
    let ordTableTit, orderColspanNum, maxIndex;
    for (var i = 0, len = dzList.length; i < len; i++) {
      if (dzList[i].cj_custom) {
        typeCommon.push(dzList[i]);
      } else if (dzList[i].type == 0) {
        type0Arr.push(dzList[i]);
      } else if (dzList[i].type == 1) {
        type1Arr.push(dzList[i]);
      } else if (dzList[i].type == 2) {
        type2Arr.push(dzList[i]);
      } else if (dzList[i].type == 3 || dzList[i].type == 4) {
        if (dzList[i].customPodDesign) {
          for (
            let j = 0, jLen = dzList[i].customPodDesign.length;
            j < jLen;
            j++
          ) {
            dzList[i].customPodDesign[j]['img'] =
              dzList[i].customPodDesign[j].links[0];
            newCusDesignArr.push(dzList[i].customPodDesign[j]);
          }
        } else if (dzList[i].customDesign) {
          for (let j = 0, jLen = dzList[i].customDesign.length; j < jLen; j++) {
            dzList[i].customDesign[j]['img'] =
              dzList[i].customDesign[j].links[0];
            newCusDesignArr.push(dzList[i].customDesign[j]);
          }
        } else if (dzList[i].customeDesign) {
          for (
            let j = 0, jLen = dzList[i].customeDesign.length;
            j < jLen;
            j++
          ) {
            dzList[i].customeDesign[j]['img'] =
              dzList[i].customeDesign[j].links[0];
            newCusDesignArr.push(dzList[i].customeDesign[j]);
          }
        }
      }
      if (
        (!dzList[i].type || dzList[i].type == 4) &&
        (dzList[i].image || dzList[i].text)
      ) {
        type2Arr.push(dzList[i]);
      }
    }
    console.log(type0Arr, type1Arr, type2Arr);

    if (typeCommon.length > 0) {
      // 最大列数计算
      orderColspanNum = 1;
      maxIndex = 0;
      let cjContentArr = [];
      for (i = 0; i < typeCommon.length; i++) {
        const temp = Object.keys(typeCommon[i].cj_content[0]).length;
        if (temp >= orderColspanNum) {
          orderColspanNum = temp;
          maxIndex = i;
        }
        cjContentArr.push(typeCommon[i].cj_content);
      }
      ordTableTit = typeCommon[maxIndex].cj_custom;
      let temp = cjContentArr.flat();
      temp.forEach(function(item) {
        for (var tempItem in item) {
          item[tempItem] = shopifyPluginImgUrlProcess(item[tempItem]);
        }
      });
      typeCommon = temp;
    }
    return {
      dzList,
      newCusDesignArr,
      type0Arr,
      type1Arr,
      type2Arr,
      typeCommon,
      properties,
      gxhOrdFlag,
    };
  } else if (properType == 'product') {
    let sku, colspanNum, newCusDesignArr, gxhProductFlag, dzList;

    console.log(
      Object.prototype.toString.call(properties) == '[object String]',
    );
    if (properties.type) gxhProductFlag = true;
    console.log(spItemObj);
    if (spItemObj) {
      sku = spItemObj.sku;
    }
    console.log(properties);
    console.log(typeof properties === 'string');
    if (typeof properties === 'string') {
      properties = JSON.parse(properties);
    } else {
      if (properties.cj_content) {
        const content = properties.cj_content;
        if (Array.isArray(content)) {
          content.forEach(_i => {
            for (let tempItem in _i) {
              _i[tempItem] = shopifyPluginImgUrlProcess(_i[tempItem]);
            }
          });
        } else {
          for (var item in content) {
            item = content[item];
            for (var tempItem in item) {
              item[tempItem] = shopifyPluginImgUrlProcess(item[tempItem]);
            }
          }
        }
      }
      properties = properties;
    }
    if (properties.thirdPardMessage) {
      if (typeof properties.thirdPardMessage == 'string') {
        try {
          properties.thirdPardMessage = JSON.parse(properties.thirdPardMessage);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (properties.cj_custom) {
      colspanNum = Object.keys(properties.cj_content[0]).length;
      console.log('====' + colspanNum);
    }
    //var data= JSON.parse(properties);
    newCusDesignArr = [];
    var arr = [];
    arr.push(properties);
    dzList = arr;
    try {
      if (typeof properties === 'string') {
        properties = JSON.parse(properties);
      }
      if (properties.type == 3 || properties.type == 4) {
        console.log(properties.customMessgae);
        if (properties.customPodDesign) {
          for (
            let i = 0, len = properties.customPodDesign.length;
            i < len;
            i++
          ) {
            properties.customPodDesign[i]['img'] =
              properties.customPodDesign[i].links[0];
            newCusDesignArr.push(properties.customPodDesign[i]);
          }
        } else if (properties.customDesign) {
          for (let i = 0, len = properties.customDesign.length; i < len; i++) {
            properties.customDesign[i]['img'] =
              properties.customDesign[i].links[0];
            newCusDesignArr.push(properties.customDesign[i]);
          }
        } else if (properties.customMessgae) {
          for (let i = 0, len = properties.customMessgae.length; i < len; i++) {
            properties.customMessgae[i]['img'] =
              properties.customMessgae[i].backImgList[0].imgsrc;
            newCusDesignArr.push(properties.customMessgae[i]);
          }
        } else if (properties.customeDesign) {
          for (let i = 0, len = properties.customeDesign.length; i < len; i++) {
            properties.customeDesign[i]['img'] =
              properties.customeDesign[i].links[0];
            newCusDesignArr.push(properties.customeDesign[i]);
          }
        } else if (properties.customMessage) {
          for (let i = 0, len = properties.customMessage.length; i < len; i++) {
            properties.customMessage[i]['img'] =
              properties.customMessage[i].backImgList[0].imgsrc;
            newCusDesignArr.push(properties.customMessage[i]);
          }
        }
      } else {
        // GXSD200226637530149941
        console.log(properties);
      }
    } catch (error) {
      console.log(error);
    }
    return {
      sku,
      newCusDesignArr,
      dzList,
      properties,
      gxhProductFlag,
    };
  }
};
