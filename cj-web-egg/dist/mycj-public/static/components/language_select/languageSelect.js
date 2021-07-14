(function (angular) {
    angular.module('loginLanguageSelect', ['service'])
        .component('languageSelect', {
            templateUrl: 'static/components/language_select/languageSelect.html',
            controller: languageSelectCtrl,
            bindings: {
            }
        })

    function languageSelectCtrl($scope, dsp) {
        $scope.defaultLanguage = { opt: "en|en", name: 'English', flag: 'US' };
        $scope.visibleLang = false;
        $scope.i18next = dsp.i18next

        $scope.flagList = [
            { opt: "en|en", name: $scope.i18next.t('language-english'), flag: 'US' },
            { opt: "en|af", name: $scope.i18next.t('language-afrikaans'), flag: 'ZA' },
            { opt: "en|sq", name: $scope.i18next.t('language-albanian'), flag: 'AL' },
            { opt: "en|ar", name: $scope.i18next.t('language-arabic'), flag: 'SA' },
            { opt: "en|hy", name: $scope.i18next.t('language-armenian'), flag: 'AM' },
            { opt: "en|az", name: $scope.i18next.t('language-azerbaijani') },
            { opt: "en|be", name: $scope.i18next.t('language-belarusian'), flag: 'BY' },
            { opt: "en|bg", name: $scope.i18next.t('language-bulgarian') },
            { opt: "en|zh-CN", name: $scope.i18next.t('language-chinese-simplified'), flag: 'CN' },
            { opt: "en|zh-TW", name: $scope.i18next.t('language-chinese-traditional'), flag: 'CN' },
            { opt: "en|hr", name: $scope.i18next.t('language-croatian') },
            { opt: "en|cs", name: $scope.i18next.t('language-czech'), flag: 'CZ' },
            { opt: "en|da", name: $scope.i18next.t('language-danish'), flag: 'DK' },
            { opt: "en|nl", name: $scope.i18next.t('language-dutch') },
            { opt: "en|et", name: $scope.i18next.t('language-estonian'), flag: 'EE' },
            { opt: "en|tl", name: $scope.i18next.t('language-filipino'), flag: 'PH' },
            { opt: "en|fi", name: $scope.i18next.t('language-finnish') },
            { opt: "en|fr", name: $scope.i18next.t('language-french') },
            { opt: "en|ka", name: $scope.i18next.t('language-georgian'), flag: 'GE' },
            { opt: "en|de", name: $scope.i18next.t('language-german') },
            { opt: "en|el", name: $scope.i18next.t('language-greek'), flag: 'GR' },
            { opt: "en|hi", name: $scope.i18next.t('language-hindi'), flag: 'HT' },
            { opt: "en|hu", name: $scope.i18next.t('language-hungarian') },
            { opt: "en|is", name: $scope.i18next.t('language-icelandic') },
            { opt: "en|id", name: $scope.i18next.t('language-indonesian') },
            { opt: "en|ga", name: $scope.i18next.t('language-irish'), flag: 'IE' },
            { opt: "en|it", name: $scope.i18next.t('language-italian') },
            { opt: "en|ja", name: $scope.i18next.t('language-japanese'), flag: 'JP' },
            { opt: "en|ko", name: $scope.i18next.t('language-korean'), flag: 'KR' },
            { opt: "en|lv", name: $scope.i18next.t('language-latvian') },
            { opt: "en|lt", name: $scope.i18next.t('language-lithuanian') },
            { opt: "en|mk", name: $scope.i18next.t('language-macedonian') },
            { opt: "en|ms", name: $scope.i18next.t('language-malay'), flag: 'MY' },
            { opt: "en|mt", name: $scope.i18next.t('language-maltese') },
            { opt: "en|no", name: $scope.i18next.t('language-norwegian') },
            { opt: "en|pl", name: $scope.i18next.t('language-polish') },
            { opt: "en|pt", name: $scope.i18next.t('language-portuguese') },
            { opt: "en|ro", name: $scope.i18next.t('language-romanian') },
            { opt: "en|ru", name: $scope.i18next.t('language-russian') },
            { opt: "en|sr", name: $scope.i18next.t('language-serbian'), flag: 'RS' },
            { opt: "en|sk", name: $scope.i18next.t('language-slovak') },
            { opt: "en|sl", name: $scope.i18next.t('language-slovenian'), flag: 'SI' },
            { opt: "en|es", name: $scope.i18next.t('language-spanish') },
            { opt: "en|sw", name: $scope.i18next.t('language-swahili'), flag: 'SJ' },
            { opt: "en|sv", name: $scope.i18next.t('language-swedish'), flag: 'SE' },
            { opt: "en|th", name: $scope.i18next.t('language-thai') },
            { opt: "en|tr", name: $scope.i18next.t('language-turkish') },
            { opt: "en|uk", name: $scope.i18next.t('language-ukrainian'), flag: 'UA' },
            { opt: "en|ur", name: $scope.i18next.t('language-urdu'), flag: 'PK' },
            { opt: "en|vi", name: $scope.i18next.t('language-vietnamese'), flag: 'VN' },
            { opt: "en|cy", name: $scope.i18next.t('language-welsh'), flag: 'WELSH' },
            { opt: "en|yi", name: $scope.i18next.t('language-yiddish'), flag: 'YIDDISH' },
        ]

        const currencyLanguage = $scope.flagList.filter(item => item.opt == (localStorage.getItem('language') || "en|en"));
        $scope.defaultLanguage = currencyLanguage[0];

        $scope.flagSrc = (item = $scope.defaultLanguage) => {
            const tmp = item?.flag || item?.opt.split('|')[1].toUpperCase();
            return `/egg/image/home/flag/${tmp}.png`
        }; 

        $scope.clickFlag = function (item) {
            this.language = item;
            localStorage.setItem('language', item.opt)
            window.doGTranslate && window.doGTranslate(item.opt); // gtranslate 翻译
            // 设置语言到cookie, 并刷新页面
            var raw_lng = item.opt.split('|')[1];
            var _lng = /zh-CN/.test(raw_lng) ? 'zh' : raw_lng;
            document.cookie = `lng=${_lng}; path=/; expires=Fri, 31 Dec 2030 23:59:59 GMT; domain=${__root__domain}`;

            $scope.defaultLanguage = item;
            $scope.visibleLang = false;
        }

        const elementContains = (parent, child) => parent !== child && parent.contains(child);
       
        const languageBox = document.querySelector("#language-suspence")
        document.addEventListener('click', (e) => {
            if (!elementContains(languageBox, e.target)) {
                $scope.$apply(()=>{
                    $scope.visibleLang = false;
                })
            }
        })

    }
})(angular);
