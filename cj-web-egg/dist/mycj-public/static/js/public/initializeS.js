var code = getQueryString('code');
var state = getQueryString('state');
var shop = getQueryString('shop');
var shopToken = getQueryString('shopToken');


function initializeFun(){
    console.log('先执行');
    if(state && shop){
        var AppBridge = window['app-bridge'];
        var createApp = AppBridge.default;
        var app = createApp({
            apiKey: '6092673ffae7ca48ab9cb01736bae7fa',
            shopOrigin: shop
        });
    }
}
initializeFun();
function getQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.self.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}