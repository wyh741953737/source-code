const self = this
// 安装service-worker，并预先缓存指定资源
this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      // 预缓存指定的资源
      return cache.addAll(["/", "/index.html"])
    })
  )
})
// 底层拦截所有的请求
this.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (resp) {
        return fetch(event.request)
          .then(function (response) {
            return caches.open("v1").then(function (cache) {
              // 仅缓存get方式请求，post忽略
              if (event.request.method === "GET") {
                cache.put(event.request, response.clone()).catch()
              }
              return response
            })
          })
          .catch(() => Promise.resolve(resp)) // 如果请求错误那么就取用缓存
      })
      .catch(function (e) {
        // 报错的话返回
        return e || caches.match("/")
      })
  )
})
// 收到google云推送消息，没有用到推送的可以不用写这个方法
this.addEventListener("push", function (event) {
  debugger
  console.log("[Service Worker] Push Received.")
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)
  let notificationData = event.data.json()
  const title = notificationData.title
  // 可以发个消息通知页面
  //util.postMessage(notificationData);
  // 弹消息框
  event.waitUntil(self.registration.showNotification(title, notificationData))
})
// 收到google云推送消息点击事件，没有用到推送的可以不用写这个方法
this.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.")
  let notification = event.notification
  console.log("notification:", notification)
  notification.close()
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(notification.data.url))
})