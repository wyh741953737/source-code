/**
 * localStorage 数据中转
 * @param {*} module 
 */
export function orderInfoFactory(module) {
  module.factory('order_info', function () {
    var myData = {};
    function _getter() {
      console.log(myData.hasOwnProperty('obj'));
      if (!myData.hasOwnProperty('obj')) {
        myData.obj = JSON.parse(localStorage.getItem('order_info'));
      }
      return myData;
    }
    function _setter(obj) {
      localStorage.setItem('order_info', JSON.stringify(obj));
      myData = {
        obj: obj
      };
    }
    return {
      getter: _getter,
      setter: _setter
    };
  });
}
