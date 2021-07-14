import { pageFunWithParams } from '../mycj-common';
import { paymentType } from './wallet-payment.config';

export function newWalletFactory(angular) {
	const app = angular.module('mycj-new-wallet.module', ['service', 'utils']);
	const NETERROR = 'The server is busy now, please try again later.';
	app.controller('mycj-new-wallet.ctrl', ['$scope', '$rootScope', 'dsp', '$interval', '$timeout', 'utils', '$stateParams','$q',
		function ($scope, $rootScope, dsp, $interval, $timeout, utils, $stateParams,$q) {
			const bannerAPI ={
				getBannerList: "cj/banner/getWebHomeBannerInfo",	// 获取banner列表
				countClick:"cj/banner/checkBanner",	// 统计点击次数
			}
			let deferred = $q.defer();
			$scope.defaultSymbol = '---'//缺省符号
			$scope.noMoney = false;
			$scope.nextAshFlag = true; // payoneer 的next按钮 置灰开关
			console.log('stateparams', $stateParams);
			/** modal */
			$scope.chargeModal = {  //charge content 类型
				charge: { key: 1, en: 'Charge', name: '充值' },
				billing: { key: 2, en: 'billing History', name: '历史账单' }
			}
			$scope.cashModal = {    //cash 提现 类型
				cash: { key: 1, en: 'Cash', name: '提现' },
				history: { key: 2, en: 'History', name: '提现历史' }
			}
			$scope.chargeList = [   //充值 快捷金额列表
				{ key: 1, money: 2000, isMr: true, active: false },
				{ key: 2, money: 3000, isMr: true, active: false },
				{ key: 3, money: 5000, isMr: true, active: false },
				{ key: 4, money: 8000, isMr: false, active: true },
				{ key: 5, money: 10000, isMr: true, active: false },
				{ key: 6, money: 20000, isMr: true, active: false },
				{ key: 7, money: 50000, isMr: true, active: false },
				{ key: 8, money: 100000, isMr: false, active: false },
			]
			$scope.chargeGrads = [    //充值梯度列表
				{ key: 1, amount: '$0-4999.99', euAmount: '€1-4500.00', benefits: '0.5%' },
				{ key: 2, amount: '$5000.00-9999.99', euAmount: '€4500.01-9000.00', benefits: '0.8%' },
				{ key: 3, amount: '$10000.00-49999.99', euAmount: '€9000.01-45000.00', benefits: '1%' },
				{ key: 4, amount: '$50000.00 and more', euAmount: '€45000.01 and more', benefits: '2%' },
			]
			const paymentCardList = [  //充值提现方式卡片数组
				{ key: 1, name: 'payoneer', cn: '派安盈', isCharge: true, isCash: true },
				{ key: 2, name: 'transfer', cn: '信用卡转账', isCharge: true, isCash: false },
				{ key: 3, name: 'paypal', cn: 'PayPal', isCharge: false, isCash: true },
				{ key: 4, name: 'stripe', cn: 'Stripe', isCharge: false, isCash: true },
			]
			$scope.exportTypeList = [
				{ key: 1, name: 'All', value: '' },
				{ key: 2, name: 'Dropshipping Orders', value: 'CJ' },
				{ key: 3, name: 'Bulk Purchase Orders', value: 'ZF' },
			]
			/** 参数 */
			const base64 = $rootScope.base64;
			$scope.chargeFlag = $scope.chargeModal.charge.key                        //充值模块 - tab高亮状态
			$scope.cashFlag = $scope.cashModal.cash.key                              //提现模块 - tab高亮状态
			$scope.chargeCardList = paymentCardList.filter(_ => _.isCharge)          //充值模块 - 支付方式卡片数组
			$scope.cashCardList = paymentCardList.filter(_ => _.isCash)              //提现模块 - 支付方式卡片数组
			$scope.currentChargeCard = 'payoneer'                                    //充值模块 - 当前选中的支付方式
			//$scope.currentCashCard = 'paypal'                                        //提现模块 - 当前选中的支付方式
			$scope.showFlag = false                                                  //充值模块 - 银行卡充值弹窗flag
			$scope.billPageNum = '1'                                                 //充值模块 - 账单记录表 - 分页 - 当前页
			$scope.billPageSize = '5'                                                //充值模块 - 账单记录表 - 分页 - 每页最大条数
			$scope.withdrawPageNum = '1'                                             //提现模块 - 提现记录表 - 分页 - 当前页
			$scope.withdrawPageSize = '5'                                            //提现模块 - 提现记录表 - 分页 - 每页最大条数
			$scope.exportType = 0                                                    //充值模块 - 生成发票 - 导出类型选择
			let pre = new Date().getTime() - 1000*3600*24*30; // 开始时间默认一个月前
			console.log()
			// pre.setFullYear(pre.getFullYear() - 1);
			$scope.startTime = utils.parseTime(new Date(pre), "yyyy-MM-dd hh:mm:ss")           //充值模块 - 生成发票 - 导出开始时间
			$scope.endTime = utils.parseTime(new Date(), "yyyy-MM-dd hh:mm:ss")      //充值模块 - 生成发票 - 结束开始时间
			$scope.ordmoney = 8000                                                   //充值模块 - 充值金额
			$scope.ordmoneyInput = undefined                                         //充值模块 - 输入框输入的充值金额
			$scope.withdrawMoney = undefined                                         //提现模块 - 提现金额
			$scope.withdrawEmail = ''                                                //提现模块 - 提现邮箱地址
			$scope.verify_code_timer1;                                               //提现模块 - 发送验证码的定时器
			$scope.verify_code = '';                                                 //提现模块 - 验证码
			$scope.verify_code_txt = 'Send Verification Code';                       //提现模块 - 发送验证码的按钮文案（包括定时器倒计时）
			$scope.verify_code_disable = false;                                      //提现模块 - 防抖
      $scope.withdrawEmailArr = [] // 账户邮箱
      
      $scope.bankInfoData = {}
      function getBankInfoData() {
        layer.load(2)
        dsp.postFun('app/wallet/getBankInfo', {}, (res) => {
          layer.closeAll();
          const infoData = res.data
					const {westernUnion, wireTrans} = infoData.data
          $scope.bankInfoData = {
            westernUnion: {
              eur: westernUnion.EUR.split('%').map(item=> {
								return {
									key: item.split(': ')[0],
									value: item.split(': ')[1],
								}
							}),
              usd: westernUnion.USD.split('%').map(item=> {
								return {
									key: item.split(': ')[0],
									value: item.split(': ')[1],
								}
							}),
            },
            wireTrans: {
              eur: wireTrans.EUR.split('%').map(item=> {
								return {
									key: item.split(': ')[0],
									value: item.split(': ')[1],
								}
							}),
              usd: wireTrans.USD.split('%').map(item=> {
								return {
									key: item.split(': ')[0],
									value: item.split(': ')[1],
								}
							}),
            }
          }
        }, (err) => {
          layer.closeAll();
        });
      }
      getBankInfoData()
      
			$scope.chargeItem = {
				currency: 'USD',
				ammount: null,
				imgArr: [],
				rechargeRemark: ''
			}
			/** 方法 */
			getAccountInfo()
			function getAccountInfo() {  //获取钱包信息
				dsp.postFun('app/wallet/getWalletInfo', {}, function (data) {
					$scope.accountInfo = data.data.data;
				});
				dsp.getFun('app/wallet/accounts', function ({ data }) {
          if (data.code === 200) {
            $scope.accountData = data.data
            $scope.cashCardList = $scope.accountData.channel.length > 0 ? $scope.cashCardList.filter(o => $scope.accountData.channel.includes(o.name)) : $scope.cashCardList;
            $scope.currentCashCard = $scope.cashCardList[0].name || 'paypal'
            $scope.withdrawEmailArr = $scope.accountData[$scope.currentCashCard].length > 0 ? $scope.accountData[$scope.currentCashCard] : [];
            $scope.withdrawEmail = $scope.withdrawEmailArr.length > 0 ? $scope.withdrawEmailArr[0] || '' : '';
          }
          
        });
			}

			/* payonner活动的相关方法 */
			$scope.payoneerImglist = []
			$scope.handleBanner = handleClickPayoneer
			
			getBannerList()

			// 点击payonner活动bannner处理方法
			function handleClickPayoneer(item) {
				if(item.skipType == '2'){
					countClickBanner(item.id)
					window.open(item.urlOrSku)
				}	
			} 
			
			// 获取banner图
			function getBannerList() {
				const url = bannerAPI.getBannerList
				const param = {
					platformType: 1,
					activityLocation: 1
				}
				dsp.postFun(url, param, function (res) {
					const data = res.data
					if(data.statusCode == 200){
						$scope.payoneerImglist = data.result
					}
					swiperFun()
				},err => {
					console.log(err);
				});
			}

			// 统计点击bannner图的方法
			function countClickBanner(bannerId) {
				const url = bannerAPI.countClick
				const params = {
					bannerId
				}
				dsp.postFun(url, params, function (data) {
				},err => {
					console.log(err);
				});
			}
			
			// 初始化swiper
			function swiperFun() {
				$timeout(function () {
					let swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						autoplay: true,
						slidesPerView: 1,
						paginationClickable: true,
						autoplayDisableOnInteraction: true,
						speed:4000,
						loop: $scope.payoneerImglist.length>1?true:false,
					});
				}, 1000);
			}
			

			/* payoneer End */ 

			// 返回两位小数
			$scope.returnFloat = val => {
				if(!val) {
					return '0.00';
				}
				let value = Math.round(parseFloat(val) * 100) / 100;
				let xsd = value.toString().split('.');
				if (xsd.length == 1) {
					return value.toString() + '.00';
				}
				if (xsd.length > 1) {
					if (xsd[1].length < 2) {
						value = value.toString() + '0';
					}
					return value;
				}
			}

			/** charge 充值模块 */
			$scope.changeCharge = key => {  //修改 charge content的tab
				$scope.chargeFlag = key
				console.log(key)
				key === $scope.chargeModal.billing.key && getBillList()
			}

			// 输入订单后回车查询
			$scope.cjOrderIdKeyup = function(bool){
				console.log(event.keyCode)
				if(event.keyCode == 13 || bool){
					$scope.billPageNum = '1'
					getBillList()
				}
			}

			function getBillList(flag) {  //获取账单记录列表
				dsp.postFun('app/wallet/getCustomerWatercourse', {
					page: $scope.billPageNum,
					limit: $scope.billPageSize,
					cjOrderId: $scope.cjOrderId || '',
					type: '1,2,4,6,7,8,5,9,17'
				}, ({ status, data }) => {
					if (status === 200) {
						$scope.billTotalPage = data.count;
						$scope.billList = data.list.map(item => {
							item.paymentType = paymentType[item.paymentType] || ''
							if (item.image){
								item.image = item.image.replace('https://','')
								if(item.image.includes('.pdf')){
									item.pdf = item.image
									item.image = ''
								} else {
									item.pdf =null
								}
							}
							return item
						})
						$scope.billNoDataFlag = $scope.billList.length === 0
						!flag && pageFunWithParams($('.bill-page'), $scope.billTotalPage, $scope.billPageSize, $scope.billPageNum, page => {
							$scope.billPageNum = page.toString()
							getBillList(true)
						})
					}
				})
			}
			$scope.checkMoneyTag = money => { //点击快捷金额 选择充值金额
				$scope.chargeList = $scope.chargeList.map(item => ({
					...item,
					active: item.money === money
				}))
				$scope.ordmoney = +money
				$scope.ordmoneyInput = undefined
				$scope.noMoney = false
				getReward()
			}
			// 提现输入内容校验
			$scope.inputwithdrawMoneyFn = () => {
				let str = $scope.withdrawMoney
				const reg = new RegExp(/[^0-9\.]/g) // 限制必须为数字和小数点
				str = str.replace(reg, '')
				str = str.replace(/^[\.]/, '0.');
				// 限制最后一位不能输入小数点
				if (str.length == 12) {
					str = str.replace(/[\.]$/, '');
				}
				if (str.indexOf('.') !== -1) { //小数点存在，保留两位小数，限制12位
					if (str.length > 12) {
						str = str.substring(0, 12);
					}
					str = str.substring(0, str.indexOf(".")+3);
					let idx = str.indexOf('.');
					let right = str.substring(0, idx);
					let left = str.substring(idx, idx+3);
					left = left.replace(/[\.]{1,3}/g, '.');
					if (left.lastIndexOf('.') !== 0) {
						let _idx = left.lastIndexOf('.')
						left = left.substring(0, _idx);
					}
					str = right + left
				} else { //小数点不存在
					if (str.length > 12) {
						str = str.substring(0, 12);
					}
				}
				$scope.withdrawMoney = str;
			}
			// 输入内容校验
			$scope.inputOrdMoneyFn = () => {
				if (!$scope.ordmoneyInput || $scope.ordmoneyInput == 0) {
					if(deferred.resolve) {
						deferred.resolve();
					}
					$scope.rewardAmount = '0.00';
					$scope.ordmoney = $scope.ordmoneyInput || 0;
					// 清空时可能最后一次接口还没走完,最后接口返回时rewardAmount又变化了,改成清空后直接进行nodata的显示
					$scope.noMoney = true
				} else {
					$scope.noMoney = false
				}
				let str = $scope.ordmoneyInput
				const reg = new RegExp(/[^0-9\.]/g) // 限制必须为数字和小数点
				str = str.replace(reg, '')
				str = str.replace(/^[\.]/, '');
				if (str.indexOf('.') !== -1) { //小数点存在，保留两位小数，整数部分保留10位
					str = str.substring(0, str.indexOf(".")+3);
					let idx = str.indexOf('.');
					let right = str.substring(0, idx);
					let left = str.substring(idx, idx+3);
					left = left.replace(/[\.]{1,3}/g, '.');
					if (left.lastIndexOf('.') !== 0) {
						let _idx = left.lastIndexOf('.')
						left = left.substring(0, _idx);
					}
					if (right.length > 10) {
						right = right.substring(0,10);
					}
					str = right + left
				} else { //小数点不存在
					if (str.length > 10) {
						str = str.substring(0, 10);
					}
				}
				$scope.ordmoneyInput = str;
				$scope.chargeList = $scope.chargeList.map(item => ({
					...item,
					active: false
				}))
			}
			// 监听ordmoneyInput变化并进行防抖
			$scope.$watch('ordmoneyInput', utils.debounce(function () {
				$scope.ordmoney = $scope.ordmoneyInput || $scope.ordmoney
				if ($scope.ordmoney < 2000) $scope.currentChargeCard = 'payoneer'
				getReward();
			}, 500));
			// 获取充值奖励金
			function getReward(){
				// 没有值或者最后一位是小数点时不走接口
				if (!$scope.ordmoney || $scope.ordmoney == 0) return
				if (/\.$/.test($scope.ordmoney)) return
				let params = {
					amount: $scope.ordmoney,
					currencyType: $scope.chargeItem.currency === 'USD' ? 0 : 1, // 0 美元 1 欧元
					paymentType: $scope.currentChargeCard === 'transfer' ? 'wire_transfer' : 'payoneer' // wire_transfer 信用卡 payoneer 派安盈
				};
				console.log(dsp)
				if(deferred.resolve) {
					deferred.resolve();
				  }
				dsp.postCancel('app/wallet/getRechargeAmount', params, function (data) {
					let res = data.data;
					if (res.code == 200) {
						$scope.rewardAmount = res.data.totalAmount
						$scope.benefitsMoney = res.data.benefitsMoney;
						$scope.dollarAmount = res.data.dollarAmount;
					} else {
						$scope.benefitsMoney = null;
						$scope.dollarAmount = null;
					}
				},null, deferred=$q.defer())
			}
			$scope.selectChargeCard = name => { //选择充值所需要的银行卡
				console.log('$scope.ordmoney', $scope.ordmoney)
				if (name !== 'transfer' || $scope.ordmoney >= 2000) $scope.currentChargeCard = name
			}
			$scope.gotoCharge = () => { //去充值
				if ($scope.currentChargeCard === 'transfer') {  //信用卡充值， 打开信用卡
					$scope.showFlag = true
					const { currency } = $scope.chargeItem
					currency === 'USD' ? $scope.chargeItem.ammount = $scope.ordmoney : getExchangeRate('EUR')
					$scope.chargeItem.realAmmount = $scope.ordmoney
					if(currency == 'EUR'){
						getRechargeAmountFun()
					}
				} else if ($scope.currentChargeCard === 'payoneer') {  //派安盈 支付
					console.log('chargeitem', $scope.chargeItem);
					$scope.payoneerPayNew()
				}
			}
			function getRechargeAmountFun(){
				let params = {};
				params.amount = $scope.ordmoney;
				params.currencyType = 1
				params.paymentType = 'wire_transfer';
				if(deferred.resolve) {
					deferred.resolve();
				  }
				dsp.postCancel('app/wallet/getRechargeAmount', params, function (data) {
					console.log(data);
					let resResult = data.data;
					if (resResult.code == 200) {
						$scope.benefitsMoney = resResult.data.benefitsMoney;
						$scope.dollarAmount = resResult.data.dollarAmount;
					} else {
						layer.msg(resResult.msg)
						$scope.benefitsMoney = null;
						$scope.dollarAmount = null;
					}
				},null, deferred=$q.defer())
			}
			$scope.selectCurrency = (currency) => {  //更改币种后获取最新汇率修改ammount
				$scope.chargeItem.currency = currency
				getExchangeRate(currency)
				getReward()
			}
			$scope.upLoadImg4 = function (files) {  //上传图片
				if (files.length === 0) return;
				dsp.ossUploadFile(files, data => {
					if (data.code == 0) {
						layer.msg('Images Upload Failed')
						return
					}
					if (data.code == 2) {
						layer.msg('Images Upload Incomplete')
					}
					$("#document2").val('')
					data.succssLinks.forEach(_ => {
						const srcList = _.split('.')
						const imgArrType = srcList[srcList.length - 1]
						if (['png', 'jpg', 'jpeg', 'gif', 'pdf'].includes(imgArrType)) $scope.chargeItem.imgArr.push(_.replace('https://', ''))
					})
					$scope.$apply()
				})
			}
			let imgTimeouter
			$scope.deleteOnePic = idx => {  //删除图片
				const old = $scope.chargeItem.imgArr
				$scope.chargeItem.imgArr = []
				if (imgTimeouter) $timeout.cancel(imgTimeouter)
				imgTimeouter = $timeout(function () {
					$scope.chargeItem.imgArr = old.filter((_, index) => index !== idx)
				}, 100)
			}
			// 20-02-11 阻止重复提交
			const confirmUrl = 'app/wallet/reCharge';
			$scope.confirmClicked = false;
			$rootScope.$on(confirmUrl, (_, bool) => {
				bool ? layer.load(2) : layer.closeAll('loading');
				$scope.confirmClicked = bool;
			})
			$scope.confirmBtnFun = () => {  //点击confirm 进行信用卡充值
				if ($scope.chargeItem.imgArr.length == 0) {
					layer.msg('Please upload the transfer slip!');
					return;
				}
				const { ammount, imgArr, rechargeRemark, realAmmount,currency } = $scope.chargeItem
				let currencyType = currency == 'USD' ? 0 : 1
				const params = {
					money: realAmmount,
					image: imgArr.join(','),
					message: rechargeRemark ? rechargeRemark.replace(/\n/g, '_@').replace(/\r/g, '_@') : '',
					code: 1,
					paymentType: 'wire_transfer',
					currencyType: currencyType,
					businessFlag: "1"
				}
				dsp.postFun(confirmUrl, JSON.stringify(params), function (data) {
					console.log(data);
					if (data.data.code == 200) {
						layer.msg("Submitted successfully. We're reviewing the transfer.");
						$scope.showFlag = false;
						$scope.chargeItem = {
							currency: 'USD',
							ammount: null,
							imgArr: [],
							rechargeRemark: ''
						}
						getAccountInfo();
					} else {
						layer.msg(data.data.msg)
					}
				});
			}
			$scope.selectExport = idx => { //选择生成发票的类型
				$scope.exportType = +idx
			}
			$scope.generateInvoice = () => { //生成发票
				!$scope.startTime || !$scope.endTime
					? layer.msg('Please select starting time and ending time.')
					: dsp.iswallInvoiceDialog(base64.encode($scope.startTime), base64.encode($scope.endTime), $scope.exportTypeList[$scope.exportType].value)
			}
			function getExchangeRate(currencyCode) { //根据币种获取汇率
				dsp.postFun('cj/homePage/exchangeRate', { toCode: currencyCode }, ({ data }) => {
					const { statusCode, result } = data
					if (statusCode === '200') {
						$scope.currencyRate = result;
						$scope.chargeItem.ammount = (+$scope.ordmoney * +result).toFixed(2)
					} else console.warn('Failed to obtain exchange rate', res);
				})
			}
			/** 充值模块结束 */

			/** cash 提现模块 */
			$scope.changeCash = key => {    //修改 cash 的tab
				$scope.cashFlag = key
				key === $scope.cashModal.history.key && getWithdrawList()
			}
			function getWithdrawList(flag) {  //获取提现西路列表
				dsp.postFun('app/wallet/getCustomerWatercourse', {
					page: $scope.withdrawPageNum,
					limit: $scope.withdrawPageSize,
					type: '3'
				}, ({ status, data }) => {
					if (status === 200) {
						$scope.withdrawTotalPage = data.count;
						$scope.withdrawList = data.list;
						$scope.withdrawNoDataFlag = $scope.withdrawList.length === 0
						!flag && pageFunWithParams($('.withdraw-page'), $scope.withdrawTotalPage, $scope.withdrawPageSize, $scope.withdrawPageNum, page => {
							$scope.withdrawPageNum = page.toString()
							getWithdrawList(true)
						})
					}
				})
			}
			$scope.selectCashCard = name => {  //点击提现卡片 选择提现的银行卡
				$scope.currentCashCard = name
        $scope.withdrawEmailArr = $scope.accountData[$scope.currentCashCard].length > 0 ? $scope.accountData[$scope.currentCashCard] : [];
        $scope.withdrawEmail = $scope.withdrawEmailArr.length > 0 ? $scope.withdrawEmailArr[0] || '' : '';
        console.log($scope.withdrawEmailArr);
        console.log($scope.withdrawEmail);
			}
			$scope.verifyCode = function (code) {  //发送验证码
				if ($scope.verify_code_timer1) $timeout.cancel($scope.verify_code_timer1);
				$scope.verify_code_timer1 = $timeout(function () {
					if ($scope.verify_code_disable) return // 阻止多次提交[防抖动]
					if($scope.currentCashCard === 'payoneer' && $scope.withdrawMoney * 1 < 50) {
						layer.msg('Please enter $50 at least.');
						return;
					}
					if (!$scope.withdrawMoney || isNaN($scope.withdrawMoney * 1) || $scope.withdrawMoney * 1 < 0) {
						layer.msg('Please enter a correct amount.');
						return;
					}
					if ($scope.withdrawMoney * 1 > $scope.accountInfo.balance) {
						// layer.msg('Please enter a amount less than ' + $scope.accountInfo.balance + '.');
						layer.msg('Insufficient Balance. Please check it and try again.')
						return;
					}
					// 小数点存在,且末尾为小数点时，将小数点去掉
					let wiMoney = $scope.withdrawMoney.indexOf('.') !== -1 && $scope.withdrawMoney.indexOf('.') == $scope.withdrawMoney.length - 1
					? $scope.withdrawMoney.substring(0, $scope.withdrawMoney.length - 1)
					: $scope.withdrawMoney;
					// 小数点存在且以0开头 ，去除用户输入的多余0
					if (wiMoney.indexOf('.') !== -1 && wiMoney.match(/^[0]/g)) {
						wiMoney = wiMoney.substring(0, wiMoney.indexOf(".")+3);
						let idx = wiMoney.indexOf('.');
						let left = wiMoney.substring(idx-1, idx)
						let right = wiMoney.substring(idx, idx+3);
						wiMoney = left + right
					}
					$scope.withdrawMoney = +wiMoney + ''
					console.log($scope.withdrawMoney, code)
					sendVerifyInterlude()
					dsp.postFun('app/modelEmail/sendVerificationCode', JSON.stringify({
						money: $scope.withdrawMoney,
						verificationCode: code
					}), function (data) {
						console.log('返回验证码', JSON.stringify(data)) // {"code":"200"}
						if ('200' == data.data.code) layer.msg('Send success');
						else layer.msg('Send failed');
					});
				}, 300);
			}
			$scope.confirmWithdraw = function () {  //确认提现
				if (!$scope.withdrawMoney || isNaN($scope.withdrawMoney * 1) || $scope.withdrawMoney * 1 < 0) {
					layer.msg('Please enter a correct amount.');
					return;
				}
				if($scope.currentCashCard === 'payoneer' && $scope.withdrawMoney * 1 < 50) {
					layer.msg('Please enter $50 at least.');
					return;
				}
				if ($scope.withdrawMoney * 1 > $scope.accountInfo.balance) {
					// layer.msg('Please enter a amount less than ' + $scope.accountInfo.balance + '.');
					layer.msg('Insufficient Balance. Please check it and try again.')
					return;
				}
				if (!$scope.withdrawEmail) {
					layer.msg('Please enter your account.');
					return;
				}
				if (!dsp.isEmail($scope.withdrawEmail)) {
					layer.msg('Please enter a correct account.');
					return;
				}
				if (!$scope.verify_code) {
					layer.msg('Please enter a verification code.');
					return;
				}
				// 小数点存在,且末尾为小数点时，将小数点去掉
				let wiMoney = $scope.withdrawMoney.indexOf('.') !== -1 && $scope.withdrawMoney.indexOf('.') == $scope.withdrawMoney.length - 1
					? $scope.withdrawMoney.substring(0, $scope.withdrawMoney.length - 1)
					: $scope.withdrawMoney;
				// 小数点存在且以0开头 ，去除用户输入的多余0
				if (wiMoney.indexOf('.') !== -1 && wiMoney.match(/^[0]/g)) {
					wiMoney = wiMoney.substring(0, wiMoney.indexOf(".")+3);
					let idx = wiMoney.indexOf('.');
					let left = wiMoney.substring(idx-1, idx)
					let right = wiMoney.substring(idx, idx+3);
					wiMoney = left + right
				}
				$scope.withdrawMoney = +wiMoney + ''
				layer.load(2);
				dsp.postFun('app/wallet/withdraw', JSON.stringify({
					money: $scope.withdrawMoney,
					email: $scope.withdrawEmail,
					verificationCode: $scope.verify_code,
					paymentType: $scope.currentCashCard,
				}), function (data) {
					layer.closeAll('loading');
					console.log(data);
					if (data.data.code == 200) {
						// layer.msg('Submitted success');
						layer.msg('Confirmed Successfully.');
						$scope.withdrawMoney = undefined;
						$scope.withdrawEmail = '';
						getAccountInfo();
						resetSendVerify();
					}else if (data.data.code == 997) {
						// layer.msg('Verification code error')
						layer.msg('Wrong verification code. Please try again.')
          }else { layer.msg('Submit failed') }
				});
			}
			function sendVerifyInterlude(fn) {  //发送验证码后60s倒计时
				var i = 60;
				$scope.verify_code_timer2;
				$scope.verify_code_disable = true;
				$scope.verify_code_txt = 'Again After ' + i + ' Seconds';
				$scope.verify_code_timer2 = $interval(function () {
					if (1 === i) {
						$interval.cancel($scope.verify_code_timer2);
						$scope.verify_code_disable = false;
						$scope.verify_code_txt = 'Send Again';
						fn && fn();
					} else {
						i--
						$scope.verify_code_txt = 'Again After ' + i + ' Seconds';
					}
				}, 1000);
			}
			function resetSendVerify() {   //重置提现验证
				$interval.cancel($scope.verify_code_timer2);
				$scope.verify_code_disable = false;
				$scope.verify_code_txt = 'Send Verification Code';
				$scope.verify_code = '';
			}
			// 选择提现账户
      $scope.handleSelectWithdrawEmail = val => {
        console.log(val);
        if (val) $scope.withdrawEmail = val
      }
			/** 提现模块结束 */

			/*
      *
      * payoneer 支付
      * */
			$scope.isAuthorize = null; //  1 选择账户 2 未授权登录注册 3 已授权付款
			$scope.isShowPaynnerDia = false; // 是否打开弹窗
			$scope.isGetCode = false; // 是否再次获取验证码
			$scope.num = 60; // 获取验证码倒计时
			$scope.currencyType = null;// 账户类型  0 美元 1 欧元

			$scope.payoneerRecharge = () => {
				// $scope.isShowPaynnerDia = true;
				$scope.isAuthorize = 1;
				$scope.currencyType = null;
				$scope.payoneerEmail = '';
			};
			//返回
			$scope.payonnerBack = () => {
				$scope.isAuthorize = 1;
			}
			//选择账户
			$scope.selectAccount = (t) => {//选择币种
				clearInterval(timer);
				$scope.num = 60;
				$scope.isGetCode = false;
				$scope.currencyType = t;
				isAuth()
			};

			//是否授权
			function isAuth() {
				let parms = {
					currencyType: $scope.currencyType
				}
				layer.load(2)
				dsp.postFun('cj/payoneer/isAuth', parms, (res) => {
					layer.closeAll('loading');
					if (res.data.statusCode == '200') {
						$scope.isShowPaynnerDia = true;
						$scope.isAuthorize = res.data.result.isAuth ? 3 : 2;
						$scope.payoneerEmail = res.data.result.email;
						$scope.rate = res.data.result.rate;
						$scope.payAmount = $scope.currencyType === 0 ? 'Pay US$' + $scope.ordmoney.toFixed(2) : 'Pay EUR€' + $scope.ordmoney.toFixed(2);
					}
				}, (err) => {
					layer.closeAll('loading');
				})
			}
			$scope.signInOrRegister = (linkType) => {
				let parms = {
					currencyType: $scope.currencyType,
					linkType: linkType,
					redirectUrl: location.href
				};
				layer.load(2)
				dsp.postFun('cj/payoneer/getLink', parms, (res) => {
					layer.closeAll('loading');
					if (res.data.statusCode == '200') {
						location.href = res.data.result
					} else {
						layer.msg('The server is busy now, please try again later.')
					}
				}, (err) => {
					layer.closeAll('loading');
				})
			}
			//获取验证码
			let timer;
			$scope.getCode = () => {
				if ($scope.isGetCode) {
					return;
				}
				let parms = {
					currencyType: $scope.currencyType,
					money: $scope.ordmoney,
				};
				layer.load(2)
				dsp.postFun('cj/payoneer/getMailCode', parms, (res) => {
					layer.closeAll('loading');
					if (res.data.statusCode == '200') {
						$scope.isGetCode = true;
						layer.msg('Verification code sent to email.')
						timer = setInterval(() => {
							$scope.num--;
							if ($scope.num == 0) {
								clearInterval(timer);
								$scope.num = 60;
								$scope.isGetCode = false;
							}
							$scope.$apply()
						}, 1000)
					}
				}, (err) => {
					clearInterval(timer);
					$scope.num = 60;
					$scope.isGetCode = false;
					layer.closeAll('loading');
				})
			}
			//解绑
			$scope.unbind = () => {
				let parms = {
					currencyType: $scope.currencyType,
				};
				layer.load(2)
				dsp.postFun('cj/payoneer/removeAuth', parms, (res) => {
					layer.closeAll('loading');
					if (res.data.statusCode == '200') {
						layer.msg('Unbound successfully');
						isAuth()
					}
				}, (err) => {
					layer.closeAll('loading');
				})
			}
			//支付
			$scope.payoneer_Pay = () => {
				if (!$scope.verificationCode) {
					layer.msg('Please enter verification code');
					return;
				}
				let parms = {
					money: $scope.ordmoney,
					code: 4,
					mailCode: $scope.verificationCode,
					paymentType: 'payoneer',
					payPrice: $scope.ordmoney,
					currencyType: $scope.currencyType,
					businessFlag: "1"
				};
				layer.load(2)
				dsp.postFun('app/wallet/reCharge', JSON.stringify(parms), function (res) {
					layer.closeAll('loading');
					if (res.data.code == 200) {
						getAccountInfo();
						$scope.isShowPaynnerDia = false;
						layer.msg("Submitted successfully. We're reviewing the transfer.");
					} else {
						layer.msg(res.data.msg);
					}
				}, function (err) {
					layer.closeAll('loading');
					console.log(err)
				})
			}
			// 更新账户信息
			$scope.updateAccount = () => {
				layer.load(2)
				dsp.getFun('cj/payoneer/updateAuth?currencyType=' + $scope.currencyType, (res) => {
					layer.closeAll('loading');
					if (res.data.statusCode == '200') {
						layer.msg('Update successfully')
					}
				}, (err) => { })
			}

			/** 公共方法 */
			$scope.showMes = function (mes, event) {
				var that = event.target;
				layer.tips(mes, that,
					{
						tips: [1, '#4A90E2'],
						time: 4000,
						area: ['auto', 'auto']//这个属性可以设置宽高  auto 表示自动
					}
				);
			}

			//鼠标移入展示tooltip信息	
			$scope.showMessage = function (mes, index) {
				$scope.showMesIndex = index
				$scope.showMessageName = mes
			}
			// 鼠标移出清除tooltip信息
			$scope.clearMessage = function () {
				$scope.showMesIndex = -1
			}

			//鼠标移入提款tooltip信息	
			$scope.showWithDrawalMessage = function (mes, index) {
				$scope.showWithDrawalIndex = index
				$scope.WithDrawalMes = mes
			}
			// 鼠标移出清除提款tooltip信息
			$scope.clearWithDrawalMessage = function () {
				$scope.showWithDrawalIndex = -1
			}			

      // 派安盈支付-新 --用户正常点击流程
      // 获取欧元汇率
      function getEurRate() {
        dsp.postFun('cj/homePage/exchangeRate', { toCode: 'EUR' }, res => {
          const { data: { result } } = res;
          if (!result) return;
          $scope.payoneerEurRate = result*1;
        })
      }
      // 预先获取欧元汇率
      getEurRate();
      $scope.payoneerData = {
				chargeCurrency: '',						// 充值原币种
				chargeMoney: '',							// 充值原金额
        authUrl: '',
        usdPayMoney: $scope.ordmoney,
        eurPayMoney: '',
			};
			function getTag() {
				// 使用金额和币种作为returnid在base64转义后因特殊符号问题，在派安盈那边报错。使用时间戳来做rreturnid
				return base64.encode(`${$scope.payoneerData.chargeCurrency}-${$scope.payoneerData.chargeMoney}`);
			}
			// 单例模式
			$scope._returnId = ''
			function getReturnId () {
				if (!$scope._returnId) {
					return $scope._returnId = Date.now()
				} else {
					return $scope._returnId
				}
			}
      // 点击授权
      $scope.authClick = () => {
				// 接下来用户就要去授权了，在这之前保存当前地址作为中间页跳转回来地址
        localStorage.setItem(`_p_${getReturnId()}`, JSON.stringify({ href: `/myCJ.html#/myCJWallet/${getTag()}/${getReturnId()}`, isAuth: true, isCharge: true }))
				// 跳转授权地址
        location.href = $scope.payoneerData.authUrl;
      }
      $scope.payoneerPayNew = () => {
        // 是否须授权   postFun没有返回值，用不了 async 啊啊
				layer.load(2);
				// 更新金额／币种
				$scope.payoneerData.chargeMoney = ($scope.ordmoney*1).toFixed(2);
				$scope.payoneerData.chargeCurrency = $scope.chargeItem.currency;
				console.log('支付金额：', $scope.payoneerData);
        dsp.postFun('app/payoneer/authorize', {}, res => {
          layer.closeAll('loading')
          // authFlag 为false需要授权
          const _data = (res.data || {}).data || {};
          let { authFlag, balanceList = [] } = _data
          console.log('authFlag', authFlag);
          if (!authFlag) {
            /* 没有授权，获取授权地址，显示授权引导 */
            $scope.payoneerOrder = false;   // 已授权
            const _params = { returnId: `${getReturnId()}`,  redirectUrl: `${location.origin}/payoneer-auth.html`  }  // 参数类型：currency_money		币种—金额 作为一次	前端重定向页面
            dsp.postFun('app/payoneer/authorizeLink', _params, _res => {
              const _data = (_res.data || {}).data || {};
              const { authorizeUrl } = _data
              if (!authorizeUrl) {
                layer.msg(NETERROR)
              } else {
                // 显示授权引导
                $scope.payoneerData.authUrl = authorizeUrl;
                $scope.isShowNewPaynnerDia = true;    // 基础弹窗
                $scope.payoneerAuth = true;           // 授权引导
              }
            }, err => {
              console.log('err', err)
              layer.msg(NETERROR)
            })
          } else {
            /* 授权成功，显示已授权 */
            $scope.isShowNewPaynnerDia = true;    // 基础弹窗
            $scope.payoneerOrder = true;   // 已授权
						// 判断钱包余额是否够用- 这里在判断一下汇率有没拿到，没拿到不让用欧元支付
						// 新的判断逻辑：用户选择充值什么币种，钱包就用什么币种。注释代码是用户选择币种与钱包币种不同的逻辑，要不要删你决定
            /* let _rate = {
              0: 1,
              1: $scope.payoneerEurRate || 0,
						} */
						// 账户余额校验
						/* const _refer = $scope.payoneerData.chargeCurrency === 'USD'
							? $scope.payoneerData.chargeMoney
								: $scope.payoneerData.chargeMoney/$scope.payoneerEurRate;

            balanceList.forEach(v => {
              // 钱包及账单金额都转成美元进行比较
              v.afterRateMoney = _rate[v.currencyType] ? v.balanceAmount / _rate[v.currencyType] : 0;
              v.disabled = v.afterRateMoney < _refer;
						}) */
						// 判断当前payoneer可支付的币种是否存在===balanceList是null或空数组
						if(!balanceList || balanceList.length === 0) {
							$scope.nextAshFlag = true; // 置灰next按钮
							// layer.msg('You need to activate your Payoneer USD or EUR account to process the transaction.')
						} else {
							// 新的判断逻辑
							// 筛选钱包
							balanceList = balanceList.filter(v => v.currency === $scope.payoneerData.chargeCurrency);
							// 余额充足，即默认选中
							balanceList.forEach(v => {
								v.disabled = (v.balanceAmount || 0)*1 < ($scope.payoneerData.chargeMoney || 0)*1;
								if (!v.disabled) {
									v.selected = true;
									$scope.nextAshFlag = false; // 置灰next按钮
									$scope.payoneerPayCurrency = v.currency;
									$scope.payoneerPayBalance = v;
								}
							})
						}
						
            // 数据绑定
						console.log('payoneerData', $scope.payoneerAuthData);
						_data.balanceList = balanceList;
            $scope.payoneerAuthData = _data;
          }
        }, err => {
          layer.msg(NETERROR);
        })
      }
      // 切换授权账号
      $scope.switchPayoneerAuth = () => {
        /* 没有授权，获取授权地址，显示授权引导 */
				const _params = { returnId: `${getReturnId()}`,  redirectUrl: `${location.origin}/payoneer-auth.html` }  // 参数类型：currency_money		币种—金额 作为一次	redirectUrl: 前端重定向页面
        layer.load(2);
        dsp.postFun('app/payoneer/authorizeLink', _params, _res => {
          const _data = (_res.data || {}).data || {};
          const { authorizeUrl } = _data
          if (!authorizeUrl) {
            layer.msg(NETERROR)
          } else {
            $scope.payoneerData.authUrl = authorizeUrl;
            $scope.authClick()
          }
          layer.closeAll('loading')
        }, err => {
          console.log('err', err)
          layer.msg(NETERROR)
        })
      }
      // 选择支付账户-单选
      $scope.payoneerBalanceClick = (item) => {
				if (item.disabled) return;
				// 检查是否获取到欧元汇率，获取不到不给选。 item  => currencyType- 0/美元  1/欧元
        if(!$scope.payoneerEurRate && item.currencyType === 1) {
          getEurRate();
          return;
        }
        ($scope.payoneerAuthData.balanceList || []).forEach(v => v.selected = false)
        item.selected = true;
		$scope.nextAshFlag = false; // 选择币种后取消置灰
        if (item.selected) {
          // 设置付款货币类型
          $scope.payoneerPayCurrency = item.currency;
          $scope.payoneerPayBalance = item;
        }
        console.log('item', $scope.payoneerPayBalance)
      }
      // 订单确认
      $scope.payoneerConfirmClick = () => {
		// 当next按钮置灰，则不进行后面的代码
		if ($scope.nextAshFlag) {
			return
		}
        if (!$scope.payoneerPayCurrency) {
          layer.msg('Please select the currency first.');
          return
				}
				// 货币转换
				let _currency = $scope.payoneerData.chargeCurrency,
						_money = $scope.payoneerData.chargeMoney;
				if ($scope.payoneerPayBalance.currencyType === 0) {				// 美元钱包 转 美元
					$scope.payoneerData.usdPayMoney = parseFloat( _currency === 'USD' ? _money : _money / $scope.payoneerEurRate ).toFixed(2);
				} else {																								  // 欧元钱包	转 欧元
					$scope.payoneerData.eurPayMoney = parseFloat( _currency === 'EUR' ? _money : _money * $scope.payoneerEurRate ).toFixed(2);
				}
        $scope.payoneerOrder = false;   // 已授权
        $scope.payoneerConfirm = true;  // 确认支付
      }
      // 订单取消
      $scope.payoneerOrderCancel = () => {
        $scope.isShowNewPaynnerDia = false;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = false;   // 已授权
				$scope.payoneerConfirm = false;  // 确认支付
				$scope.payoneerPayCurrency = '';	// 置空已选钱包
      }
      // 确认支付
      $scope.payoneerConfirmPayClick = () => {
        if ($scope.payoneerPaying) {
          return;
        }
        // 要付款了
				const params = {
					money: $scope.ordmoney,								// 原金额
					code: 4,
					paymentType: 'payoneer',
					payPrice: $scope.ordmoney,    // 实际金额
					currencyType: $scope.payoneerData.chargeCurrency === 'USD' ? 0 : 1,		// 货币类型
					businessFlag: "1",										// ...
					balanceId: $scope.payoneerPayBalance.balanceId,   // 钱包id 余额
					redirectUrl: `${location.origin}/payoneer-auth.html`,												// 前端重定向页面
				}
        layer.load(2);
        $scope.payoneerPaying = true;
        dsp.postFun('app/wallet/reCharge', params, res => {
					const { data: { data ,code} } = res;
					const { result, message, payUrl, returnId } = data || {};
					console.log('pay__', payUrl, returnId);
          if (result ||code==200) {
            layer.msg('Payment Successful!')
            // 先都返回待支付页
            setTimeout(() => { location.href = `/newmycj/dropshipping/orderManage`; }, 2)
          } else if (payUrl) {
            // 挑战模式认证前，存储returnid,没有returnid即便授权也回不来了。
            if(!returnId) {
              layer.msg(NETERROR);
              $scope.payoneerPaying = false;
              layer.closeAll('loading')
              return
            }
            localStorage.setItem(`_p_${returnId}`, JSON.stringify({ href: `/myCJ.html#/myCJWallet/${getTag()}`, isPay: true, isCharge: true, successHref: '/myCJ.html#/myCJWallet' }))
						// 挑战模式，继续认证
            location.href = payUrl;
          } else {
            layer.msg(message || NETERROR)
          }
          $scope.payoneerPaying = false;
          layer.closeAll('loading')
        }, err => {
          $scope.payoneerPaying = false;
          layer.msg(NETERROR)
        })
      }
      // 取消支付-返回上一步
      $scope.payoneerPayCancel = () => {
        $scope.isShowNewPaynnerDia = true;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = true;   // 已授权
        $scope.payoneerConfirm = false;  // 确认支付
      }
      // 关闭弹窗
      $scope.closeShowNewPaynnerDia = () => {
        $scope.isShowNewPaynnerDia = false;
        $scope.isShowNewPaynnerDia = false;    // 基础弹窗
        $scope.payoneerAuth = false;    // 授权
        $scope.payoneerOrder = true;   // 已授权
				$scope.payoneerConfirm = false;  // 确认支付
				$scope.payoneerPayCurrency = '';	// 置空已选钱包
      }
      // 授权回调回来逻辑
      function fromAuthRedirect() {
        // 每次进入页面都检查
				// 充值的检查逻辑是检查url
				const id = base64.decode($stateParams.id);
				const tag = $stateParams.tag;
				const [currency, money] = id.split('-');
				const _tag = tag;
				const isAuth = localStorage.getItem(`_r_charge_auth_${_tag}`) === 'true';
				console.log('检查授权回调', currency, money);
				if (!id || !isAuth) return;
				$scope.chargeList = $scope.chargeList.map(item => ({
					...item,
					active: false
				}))
				$('.payment-input .wallet-input').val(money)
				$scope.ordmoney = money;
				$scope.chargeItem.currency = currency;
				// 重走一遍验证流程
				$scope.payoneerPayNew();
				// 清空标识
				localStorage.removeItem(`_r_charge_auth_${_tag}`)
				localStorage.removeItem(`_p_${_tag}`)
			}
			setTimeout(() => {
				fromAuthRedirect();
			}, 1000)
      // 派安盈支付-新 结束

			// 充值卡模块

			// 校验充值卡号
			function verifyGiftCardNumber() {
				dsp.postFun('operationCenterApi/checkRecharge/checkCard', {
					cardNumber: $scope.giftCardNumber
				}, res => {
					const { data: { data, code } } = res;
					if(+code === 200) {
						$scope.rechargeAmount = data && data.amount // 充值卡金额
					} else {
						$scope.rechargeAmount = ''
						$scope.giftCardErrorText = 'Invalid gift card number.'
					}
        }, err => {
          console.log('err', err)
          layer.msg(NETERROR)
        })
			}

			// 确认充值卡充值
			function comfirmRechargeBalance() {
				dsp.postFun('wallet/refillCard/balanceRecharge', {
					cardNo: $scope.giftCardNumber.trim(),
					verifyCode: $scope.redeemCode.trim(),
				}, res => {
					const { data: { code, message } } = res;
					if(+code === 200) {
						layer.msg('Top-up Successful')
						$scope.rechargeFlag = false // 关闭充值卡弹窗
						getAccountInfo()
					} else {
						layer.msg(message)
					}
				
				}, err => {
					console.log('err', err)
					layer.msg(NETERROR)
				})
			}

			// 显示充值卡弹窗
			$scope.showRechargeModal = () => {
				$scope.rechargeFlag = true
				// 还原初始状态
				$scope.giftCardNumber = '' // 充值卡号
				$scope.redeemCode = '' // 兑换码
				$scope.giftCardErrorText = '' // 充值卡号错误提示
				$scope.redeemCodeErrorText = '' // 兑换码错误提示
				$scope.rechargeAmount = '' // 充值卡金额
				$scope.rechargeNoteList = [
					'1. Gift cards are for CJ wallet top-up only. Credit from gift cards can only be used for order payment and cannot be withdrawn.',
					'2. Each gift card can only be used once.',
					'3. Credit cannot be redeemed after the date of expiry.',
					'4. Credit from gift card will not be included in the top-up bonus plan.'
				] // note 提示文案
			}
			
			// 充值卡卡号change事件
			$scope.giftCardNumberChange = (e) => {
				if(!$scope.giftCardNumber) {
					return 	$scope.giftCardErrorText = 'Please enter the number.'
				}
				let value = e.target.value
				// 过滤空格
				let filterValue = value && value.replace(/\s+/g, "")
				// 限制输入16位数字
				let sliceValue = filterValue && filterValue.replace(/[^\d+]/g, "")
				$scope.giftCardNumber = sliceValue && sliceValue.slice(0,16)

				if($scope.giftCardNumber) {
					return 	$scope.giftCardErrorText = ''
				}
			}

			// 充值卡兑换码change事件
			$scope.redeemCodeChange = (e) => {
				if(!$scope.redeemCode) {
					return 	$scope.redeemCodeErrorText = 'Please enter the code.'
				}
				// 限制输入数字
				let value = e.target.value
				$scope.redeemCode = value && value.replace(/[^\d+]/g, "")
				if($scope.redeemCode) {
					return 	$scope.redeemCodeErrorText = ''
				}
			}

			// 充值卡卡号失去焦点事件
			$scope.giftCardNumberBlur = () => {
				if(!$scope.giftCardNumber) {
					return 	$scope.giftCardErrorText = 'Please enter the number.'
				}
				// 校验充值卡号
				verifyGiftCardNumber();
			}

			// 兑换码失去焦点事件
			$scope.redeemCodeBlur = () => {
				if(!$scope.redeemCode) {
					return 	$scope.redeemCodeErrorText = 'Please enter the code.'
				}
			}

			// 确认提交充值卡充值
			$scope.rechargeBtnFun = () => {
				if(!$scope.giftCardNumber) {
					$scope.giftCardErrorText = 'Please enter the number.'
				}
				if(!$scope.redeemCode) {
					return 	$scope.redeemCodeErrorText = 'Please enter the code.'
				}
				// 卡号和兑换码,错误提示不存在时 可提交
				if($scope.giftCardNumber && $scope.redeemCode && !$scope.giftCardErrorText && !$scope.redeemCodeErrorText) {
					comfirmRechargeBalance()
				}
			}
			
		}])

	return app;
}
