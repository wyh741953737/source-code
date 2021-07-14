(function () {
	const isphone = isPhone()

	if (isphone) window.location.href = 'https://app.cjdropshipping.com/cj_apk'
	
	function isPhone() {//判断是否为手机端
		let isphone = false
			, sUserAgent = navigator.userAgent

		if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
			isphone = true;
		}
		return isphone;
	}
})()