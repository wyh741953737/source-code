(function(){
    var app = angular.module('features',['service', 'cjDotModule']);

    app.controller('featuresCtrl', ['$scope','dsp','$sce',function($scope,dsp,$sce){
        $scope.featureList = [
            {
                "name":"PRINT ON DEMAND",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"US WAREHOUSE",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"NO SETUP FEE",
                "one":true,
                "two":true,
                "three":true,
                "four":true
            },{
                "name":"FREE PRODUCT LISTING",
                "one":true,
                "two":true,
                "three":true,
                "four":true
            },{
                "name":"CONNECT WITH SHOPIFY",
                "one":true,
                "two":true,
                "three":true,
                "four":true
            },{
                "name":"FULLY AUTOMATIC ORDER IMPORTS",
                "one":true,
                "two":true,
                "three":true,
                "four":false
            },{
                "name":"QUALITY CONTROL",
                "one":true,
                "two":true,
                "three":true,
                "four":false
            },{
                "name":"AUTOMATIC POPULATE TRACKING NUMBERS",
                "one":true,
                "two":true,
                "three":true,
                "four":true
            },{
                "name":"NO MINIMUM ORDER",
                "one":true,
                "two":true,
                "three":true,
                "four":false
            },{
                "name":"PROFESSIONAL PRODUCT VIDEO",
                "one":true,
                "two":false,
                "three":true,
                "four":true
            },{
                "name":"CONNECT WITH WOOCOMMERCE",
                "one":true,
                "two":false,
                "three":true,
                "four":false
            },{
                "name":"SELF-SERVICE DISPUTE PLATFORM WITH SUPPLIERS",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"FREE UNLIMITED ORDER FULFILLMENT",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"NO MONTHLY FEE",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"FREE ORDER FULFILLMENT MONITORING",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"FREE PRODUCT SOURCING",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"CUSTOMIZE PRODUCT BRANDING PROMOTIONAL INSERTS, AND PACKAGING",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"PROFESSIONAL PRODUCT IMAGE",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"FREE CUSTOMER SUPPORT IN DIFFERENT LANGUAGES",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"FREE MULTIPLE STORES MANAGEMENT",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"NO STORAGE FEE",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            },{
                "name":"SAME DAY PROCESSING",
                "one":true,
                "two":false,
                "three":false,
                "four":false
            }
        ];

        var linkArr =[
            {
                "name":"FAQ ",
                "link":"https://cjdropshipping.com/faq/"
            },{
                "name":"CJ Offer ",
                "link":"https://cjdropshipping.com/our-offer/"
            },{
                "name":"Shipping Cost and Delivery Time",
                "link":"https://app.cjdropshipping.com/calculation.html"
            },{
                "name":"How to setup automatically dropshipping orders processing from CJ APP",
                "link":"https://cjdropshipping.com/2018/05/05/how-to-setup-automatically-drop-shipping-orders-processing-from-cj-app/"
            },{
                "name":"How to Post Sourcing Request on CJ",
                "link":"app.cjdropshipping.com:  https://cjdropshipping.com/2018/03/25/how-to-post-sourcing-request-on-app-cjdropshipping-com/"
            },{
                "name":"How to connect Shopify Shops to CJ",
                "link":"https://cjdropshipping.com/2018/03/26/how-to-connect-shopify-shops-to-app-cjdropshipping-com/"
            },{
                "name":"How to Connect WooCommerce Manually",
                "link":"https://cjdropshipping.com/2018/05/24/how-to-connect-woocommerce-manually/"
            },{
                "name":"How to List or Post CJ Products to Your Online Store",
                "link":"https://cjdropshipping.com/2018/08/07/how-to-list-or-post-cj-products-to-your-online-store/"
            },{
                "name":"Add-on service you may required",
                "link":"https://cjdropshipping.com/2018/05/25/add-on-service-you-may-required/"
            },{
                "name":"How to Import an Excel or CSV Order",
                "link":"https://cjdropshipping.com/2018/03/26/how-to-import-an-excel-or-csv-order/"
            },{
                "name":"Refund or Resend Policy",
                "link":"https://cjdropshipping.com/refund-or-resend-policy/"
            },{
                "name":"US Warehoue Inventory",
                "link":"https://app.cjdropshipping.com/home.html?from=us&fromType=all"
            }
        ];
        //var linkList =[];
        //$.each(linkArr,function(i,v){
        //    if(i%2==0){
        //        //ż��
        //        //console.log(i);
        //        var newArr = linkArr.slice(i,i+2);
        //        //console.log(newArr);
        //        linkList.push(newArr);
        //    }else{
        //        //����
        //    }
        //});
        //console.log(linkList);
        $scope.linkList = linkArr;
        dsp.domainData().then((res) => {
            // 请求成功的结果
            // 如果不是erp过来的登录，加载聊天
            if (!localStorage.getItem('loginfromerp')) {
                dsp.addChatWindow();
                dsp.addGuidWindow();
            }
        })
    }]);
})();
