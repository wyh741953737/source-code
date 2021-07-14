/**
 * excel文件下载
 * @param data：流文件，格式Blob
 * @param name：字符串
 */
export const exportData = (data: any, name: string) => {
  //设置下载文件类型为xlsx 不同的类型type也不一样，创建URL对象
  let url = window.URL.createObjectURL(data);
  console.log('url-----', url);
  // 创建A标签
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  // 触发点击方法
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * json转xlsx文件
 * @param excel_str: html结构字符串
 * @param name：下载文件名称
 *  */

export const jsonToxlsx = (excel_str: any, name: string) => {
  //Worksheet名
  let worksheet = 'Sheet1';
  let uri = 'data:application/vnd.ms-excel;base64,';
  //下载的表格模板数据
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:x="urn:schemas-microsoft-com:office:excel" 
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset='UTF-8'><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${excel_str}</table></body></html>`;

  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = uri + base64(template);
  // 触发点击方法
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.remove();

  //输出base64编码
  function base64(s: any) {
    return window.btoa(unescape(encodeURIComponent(s)));
  }
};
