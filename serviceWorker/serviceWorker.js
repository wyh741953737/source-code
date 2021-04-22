import axios from 'axios';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)

function register(config) {
    if('serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href); 
        if(publicUrl.origin !== window.location.origin) {
            return;
        }
        window.addEventListener('load', () => { // 等页面图片和其他资源都加载完
            const swUrl =  `${process.env.PUBLIC_URL}`;
            if(isLocalhost) { 
                checkValidateServiceWorker(swUrl, config);
                navigator.serviceWorker.ready.then(() => {});
            } else {// 如果不是本地环境就·注册serviceworker
                registerValidSW(swUrl, config);
            }
        })
    } 
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        window.test_reg = registration
        if (window.PushManager) {
          registration.pushManager.getSubscription().then(subscription => {
            subscribeUser(registration)
          })
        }
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                if (config && config.onUpdate) {
                  config.onUpdate(registration)
                }
              } else {
                console.log("Content is cached for offline use.")
                if (config && config.onSuccess) {
                  config.onSuccess(registration)
                }
              }
            }
          }
        }
      })
      .catch(error => {
        console.error("Error during service worker registration:", error)
      })
  }

  function checkValidServiceWorker(swUrl, config) { // 校验serviceWorker是否合法
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
      headers: { "Service-Worker": "script" },
    })
      .then(response => {
        // Ensure service worker exists, and that we really are getting a JS file.
        const contentType = response.headers.get("content-type")
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf("javascript") === -1)
        ) {
          // No service worker found. Probably a different app. Reload the page.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload()
            })
          })
        } else {
          // Service worker found. Proceed as normal.
          registerValidSW(swUrl, config)
        }
      })
      .catch(() => {
        console.log("No internet connection found. App is running in offline mode.")
      })
  }
  
  export function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister()
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }

  // 注册google的推送对象到自己的服务器，如果没有需要的可以不需要调用此方法。
function subscribeUser(swRegistration) {
    const applicationServerPublicKey =
      "BJ3VZdhuXTM2VDHD8QN_48drusn_eAW5GVPViTT2s-y3V4TkbNfw1mH9mr5UmXWTa0Rb26fqe6durpJh2vxmlRQ"
    const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey)
    window.applicationServerKey = applicationServerKey
    swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      // 用户同意
      .then(function (subscription) {
        console.log("User is subscribed:", JSON.stringify(subscription))
        return axios.post("/subscription/add", {
          subscription: JSON.stringify(subscription),
        })
      })
      // 用户不同意或者生成失败
      .catch(function (err) {
        console.log("Failed to subscribe the user: ", err)
      })
  }

  
// 工具函数|
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }