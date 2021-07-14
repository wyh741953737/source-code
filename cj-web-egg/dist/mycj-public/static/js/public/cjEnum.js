const serviceModule = angular.module("enum", []);

serviceModule.service("enumApp", [
  "$http",
  "$rootScope",
  "$q",
  function($http, $rootScope, $q) {
    this.status = {
            '14': { value: 'Pending', color: '#f1ca16', describtion: "We are reviewing your request and will get back to you in 2 working days."},
            '15': { value: 'Rejected', color: '#e44101', describtion: "Unfortunately, we are unable to shot video for this product. Sorry for your inconvenience. Please contact our agent for more information."},
            '16': { value: 'Quoted', color: '#cb7f00', describtion: "We will be able to shoot videos or pictures for this product per your request. Please click pay button below for payment. We will start to shoot it once the payment received."},
            '17': { value: 'Processing', color: '#2d7aa4', describtion: "Thanks for your payment. We're shooting the video/photos for you and will update the status once it's done."},
            '18': { value: 'Completed', color: '#04a452', describtion: 'Congratulation, We had finished the video production, please download it by click DOWNLOAD button below. If you have any questions please contact our agent. Thanks for your offer, we are glad to shot a video for you again in the future.'},
    };
  },
]);