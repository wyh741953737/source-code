import JSZip from 'jszip';
import { saveAs } from 'file-saver';
/**
 * 新建 zip 文件夹
 * @param {*} data 传入数据
 * @param {*} callback 打包后下载的回调
 */
function CJ_createZip(data: any, callback: any) {
  let zip_instance = new JSZip();

  // 1. 生成文件夹，根据 areaName
  data.forEach((source: any) => {
    let folder = zip_instance.folder(source.areaName);

    // 2. 在文件夹中生成图片

    // 2.1 组装文件包
    // 2.2 添加效果图
    let img_source: Array<any> = [];
    source.links.forEach((linksSrc: string, index: number) => {
      img_source.push({
        src: linksSrc,
        name: '效果图' + (index + 1) + '.png',
      });
    });

    // 组装 下载文本
    source.layer
      .filter((layer: any) => layer.type === 'Text')
      .forEach((textLayer: any, index: any) => {
        _zipText(folder, index + 1, textLayer);
      });

    // 组装原图
    source.layer
      .filter((layer: any) => layer.type === 'Picture')
      .forEach((imgLayer: any, index: any) => {
        img_source.push({
          src: imgLayer.imgsrc,
          name: 'layer' + (index + 1) + '.png',
        });
      });

    // 下载图片
    img_source.forEach(item => {
      _zipImage(folder, item.name, item.src);
    });
  });

  /**
   * 传入图片链接，返回base64数据
   * @param {string} images 图片 src 地址
   * @param {function} callback 转成 base64 后的回调
   */
  function _getBase64Image(images: any, callback: any) {
    var img = new Image();
    img.src = images + '?time=' + Date.now();
    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function() {
      var canvas = document.createElement('canvas');
      var width = img.width; //确保canvas的尺寸和图片一样
      var height = img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);

      var dataURL = canvas.toDataURL(); //使用canvas获取图片的base64数据
      callback ? callback(dataURL) : null; //调用回调函数
    };
  }

  /**
   * 是否下载完成
   * @param {JSON} data 原目标数据
   * @returns {Number} currentZip 当前下载的 zip 内容
   */
  function isZipOver(data: any, currentZip: any) {
    let targetLen = 0;
    // 文件夹的数量
    targetLen += data.length;
    // 加原图数量 + links 预览图图片数量
    data.forEach((item: any) => {
      targetLen += item.links.length;
      targetLen += item.layer.length;
    });

    // 实际下载的数量
    var realLen = Object.values(currentZip.files).length;

    return targetLen === realLen;
  }

  /**
   * 插入文本
   * @private
   * @param {*} targetFolder 目标文件夹
   * @param {*} index 序号
   * @param {*} content 内容
   */
  function _zipText(targetFolder: any, index: number, content: any) {
    // 文本 info
    // 字号 fontSize
    // 字体 fontFamily

    let textArr = [
      `文本：${content.title}`,
      `字号：${content.fontSize}`,
      `字体：${content.fontFamily}`,
      `颜色：${content.fill}`,
    ];
    targetFolder.file('文件' + index + '.txt', textArr.join('\n'));
  }

  /**
   * 插入图片
   * @private
   * @param {*} targetFolder 目标文件夹
   * @param {*} name 名称
   * @param {*} content 内容
   */
  function _zipImage(targetFolder: any, name: string, content: any) {
    _getBase64Image(content, function(dataURL: string) {
      // 对获取的图片base64数据进行处理
      var img_arr = dataURL.split(',');

      //根据base64数据在压缩包中生成jpg数据
      targetFolder.file(name, img_arr[1], {
        base64: true,
      });

      // 如果全部的图片和文件夹都已经创建好，则开始打包
      if (isZipOver(data, zip_instance)) {
        //当所有图片都已经生成打包并保存zip
        zip_instance.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, 'data.zip');
          callback && callback();
        });
      }
    });
  }
}

export default CJ_createZip;
