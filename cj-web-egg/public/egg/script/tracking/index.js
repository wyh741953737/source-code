
import JsTracking from '@cckj/js-tracking-report'
import RooterMapping from '@common/routerToPageId.json'
import axios from 'axios';
import { NODE_ENV } from '@root/env';

const testApiUrl = {
    apiUrl: 'http://master.cjburyingpointcenter.cj.com',
    applicationId: "1395630402659553280",
}
  
const prodApiUrl = {
    apiUrl: 'https://bpc.cjdropshipping.cn',
    applicationId: '1395630402659553280',
}

const envConfig = {
    development: prodApiUrl,
    test: testApiUrl,
    testnew: testApiUrl,
    production: prodApiUrl,
    "production-cn": prodApiUrl,
}

const { apiUrl, applicationId } = envConfig[NODE_ENV]

const BASE_URL = apiUrl + '/api/burying-point-center';
const SESSION_CVT_NAME = 'egg_conversation';

const ACTIONTYPE = {
    pageLoad: 'Pageview',
    elementClick: 'ElementClick',
    elementView: 'ElementView',
}

/** page load time */
let _pageLoadedTime = Date.now();
/** click time */
let _clickCount = 0;

function getTragetHref(dom) {
    let i = 0;
    let targetNode = dom;
    // targetText = targetNode.innerText
    while (i <= 2 && !targetNode?.href) {
        if(!targetNode?.parentNode) break
        targetNode = targetNode?.parentNode;
        i++
    }

    return targetNode?.href || "";
}


try {
    /** get page id */
    const _getPageId = (pageUrl) => {
        if (!pageUrl) return ""
        const mainPageUrl = `${location.origin}/`
        if (mainPageUrl === location.href || mainPageUrl === pageUrl) return "NCJ001"

        const router = RooterMapping.filter(route => {
            const hitRoute = route.routes.find(x => pageUrl.indexOf(x) !== -1)
            if (hitRoute) {
                return route
            }
        })

        return router.length ? router[router.length - 1].pageId : "";
    }

    /** refresh conversation id */
    function _refreshCSTId() {
        let lastTime = Date.now();

        const listenFun = () => {
            lastTime = Date.now();
        }
        document.addEventListener('mouseover', listenFun)
        const inter = setInterval(() => {
            if (Date.now() - lastTime > 5 * 60 * 1000) {
                clearInterval(inter);
                sessionStorage.removeItem(SESSION_CVT_NAME);
                document.removeEventListener('mouseover', listenFun)
            }

        }, 1000);
    }

    //get conversation id
    const _getConversationId = (_userToken) => {
        return new Promise(res => {
            try {
                let conversationId = sessionStorage.getItem(SESSION_CVT_NAME) || "";

                if (!conversationId) {
                    axios.get(
                        `${BASE_URL}/v1/application/event/conversation/id`, {
                        headers: {
                            "Authorization": _userToken ? _userToken : ""
                        }
                    }).then(result => {
                        const { data } = result;
                        if (data.success) {
                            conversationId = data.data
                            sessionStorage.setItem(SESSION_CVT_NAME, data.data);
                        }

                        _refreshCSTId();
                        res(conversationId)
                    })
                }
                else {
                    _refreshCSTId()
                    res(conversationId)
                }

            } catch (error) {
                res("")
            }
        })

    }

    /** main fun */
    const global_tracking = JsTracking({
        processData: (data, { eventType, element, ...arg }) => {
            return new Promise(res => {
                const { attrData } = data;
                _clickCount++
                const _userToken = data.cookie.token;
                const _currentPageId = _getPageId(data.page.url);

                const upTrackingData = {
                    actionType: attrData.actionType || ACTIONTYPE[eventType],
                    applicationVersion: "V2.43.74",
                    clickCount: _clickCount,
                    elementId: attrData.elementId || "",
                    pageId: _currentPageId,
                    timestamp: Date.now(),
                    token: _userToken,
                    list: attrData.list || []
                }

                if (attrData.elementId && attrData.elementId.indexOf('-') === -1) {
                    upTrackingData.elementId = `${_currentPageId}-${attrData.elementId}`
                }

                //page view
                if (upTrackingData.actionType === "Pageview") {
                    return _getConversationId(_userToken)
                        .then(_conversationId => {

                            const pushArr = [
                                {
                                    fieldValue: Date.now() - _pageLoadedTime,
                                    filedName: "eventDuration"
                                },
                                {
                                    fieldValue: _getPageId(data.page.referrer),
                                    filedName: "referrer"
                                },
                                {
                                    fieldValue: data.page.title,
                                    filedName: "title"
                                }
                            ]
                            upTrackingData.conversationId = _conversationId
                            upTrackingData.list = upTrackingData.list.concat(pushArr)
                            res(upTrackingData)
                        });
                }

                //page click
                if (upTrackingData.actionType === "ElementClick") {
                    const targetDom = document.querySelector(attrData.path);
                    const pushArr = [
                        {
                            fieldValue: attrData.text, //attrData.text,
                            filedName: "elementContent"
                        },
                        {
                            fieldValue: getTragetHref(targetDom),
                            filedName: "elementTargetUrl"
                        }
                    ]
                    upTrackingData.list = upTrackingData.list.concat(pushArr);
                    return res(upTrackingData)
                }
                //page custom event
                res(upTrackingData)
            })

        },
        elementViewConditions: element => {
            const innerHeight = window.innerHeight
            const y = element.getBoundingClientRect().y
            const height = element.getBoundingClientRect().height / 3 * 2

            return innerHeight - y >= height
        },
        submitConditions: dataList => {
            return dataList.length >= 3
        },
        submitData: dataList => {
            return new Promise(res => {
                const params = {
                    applicationId: applicationId,
                    list: dataList
                }
                const flag = navigator.sendBeacon(
                    `${BASE_URL}/v1/application/event/data/up`,
                    JSON.stringify(params)
                );
                res(flag);
            })
        },
        globalCommonListen: true,
        storeKeyName: 'cckj/data-tracking'
    })

    window.$global_tracking = global_tracking;

} catch (error) {
    window.$global_tracking = {
        pushData: (params) => null
    }
}
