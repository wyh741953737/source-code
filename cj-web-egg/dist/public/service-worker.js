const self = this;
// 统计页面的所有请求是从缓存取还是从新取
const counter = {fromCache: new Set(), newRequest: new Set()};
// 不走缓存的路由
const excludeUrls = [
    "www.googletagmanager.com",
    "bat.bing.com",
    "www.google.com",
    "www.facebook.com",
    "alb.reddit.com",
    "www.googleadservices.com",
    "www.google-analytics.com",
    "secure.quantserve.com",
    "rules.quantcount.com",
    "googleads.g.doubleclick.net",
    "sc-static.net",
    "www.clarity.ms",
    "pixel.quantserve.com",
    "www.dwin1.com",
    "www.clarity.ms",
    "www.clarity.ms",
    "tr.snapchat.com",
    "cc-west-usa.oss-accelerate.aliyuncs.com"
];
/**
 * 不需要缓存的本域名文件，相对根路由路径
 * @type {string[]}
 */
const excludeLocalPaths = [
    "/serverWork.js"
];
// 匹配路由地址
const matchHttp = function(hosts, url){
    const reg = new RegExp("^http(s?)://(" + hosts.join('|') + ")");
    return reg.test(url);
};
// 匹配本域名地址
const matchLocalPath = function(paths, url){
    const reg = new RegExp(`^${self.location.origin}(${paths.join("|")})`);
    return reg.test(url);
};

// 走本地缓存的类型
const fromCacheTypes = ["image", "script", "style", "font"];

// service worker安装事件
self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        self.caches.open("other").then(function (cache) {
            return cache.addAll(["/", "/404.html"]);
        })
    );
});
// service worker激活事件
self.addEventListener("activate", function(){
    self.caches.delete("v1");
});
// service worker监听拦截所有请求
self.addEventListener("fetch", function (event) {
    if(matchHttp(excludeUrls, event.request.url) || (~event.request.url.indexOf("cc-west-usa.oss-accelerate.aliyuncs.com") && event.request.destination == "image")) {
        return;
    }
    // 过滤掉post请求
    if(event.request.method === "GET"){
        event.respondWith(
            self.caches
                .match(event.request)
                .then(function (resp) {
                    if(fromCacheTypes.includes(event.request.destination) && !matchLocalPath(excludeLocalPaths, event.request.url) && resp){
                        counter.fromCache.add(event.request.url);
                        return resp;
                    }
                    return fetch(event.request)
                        .then(function (response) {
                            counter.newRequest.add(event.request.url);
                            return self.caches.open(event.request.destination || 'other').then(function (cache) {
                                if(response.status === 200) {
                                    cache.put(event.request, response.clone()).catch(()=>{});
                                }
                                return response;
                            });
                        })
                        .catch(() => Promise.reject(resp));
                })
                .catch(function (e) {
                    return e || self.caches.match("/404.html");
                })
        );
    }
});
// 收到google云推送消息，没有用到推送的可以不用写这个方法
self.addEventListener("push", function (event) {
    console.log("[Service Worker] Push Received.", event.data.text());
    const notificationData = event.data.json();
    const title = notificationData.title;
    // 弹消息框
    event.waitUntil(self.registration.showNotification(title, notificationData));
});
// 收到google云推送消息点击事件，没有用到推送的可以不用写这个方法
self.addEventListener("notificationclick", function (event) {
    console.log("[Service Worker] Notification click Received.", event.notification);
    const notification = event.notification;
    notification.close();
    event.waitUntil(self.clients.openWindow(notification.data.url));
});

