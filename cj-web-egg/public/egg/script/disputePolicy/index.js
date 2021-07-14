import { login, saveDataAfterLogin } from '../home/commonLogin';
import { addChatBody } from '../global/utils';

// 底部二维码
new Vue({
  el: '#vue-qr-code',
  data: {
    logined: CJ_isLogin,
  },
  created() {
    // erp tocj
    const _that = this;
    const username = CJ_.getQueryVariable('username');
    const tempassword = CJ_.getQueryVariable('tempassword');
    if (username && tempassword) {
      login({
        name: decodeURIComponent(username),
        passwd: decodeURIComponent(tempassword),
        chatType: "0",
        platform: 'pc',
        isTOCJ: 'true'
      }, function (data) {
        if (data.statusCode != 200) {
          _that.$my_message.info(data.message);
        } else {
          // 保存登录信息
          CJ_.store.set('loginfromerp', '1'); // 标记从erp过来的模拟登录
          saveDataAfterLogin(data.result);
          location.href = 'home.html';
        }
      })
    } else {
      // 如果不是erp过来的登录，加载聊天
      !CJ_.store.get('loginfromerp') && addChatBody();
      // !CJ_.store.get('loginfromerp') && addGuidWindow();
    }

    // 其他应用通过token登陆cj
    let accessToken = CJ_.getQueryVariable('accessToken');
    if (accessToken) {
      accessToken = CJ_.$base64.decode(accessToken);
      const redirectUrl = decodeURI(CJ_.getQueryVariable('redirectUrl') ? CJ_.getQueryVariable('redirectUrl') : '') || '';
      const params = {
        headers: {
          token: accessToken
        },
        method: 'POST',
        url: 'app/platform/getAccountInfo',
        opts: {},
      }
      CJ_.$axios.httpNew(params)
        .then(([err, res]) => {
          if (err) {
            console.warn(err);
            return;
          }
          if (res.statusCode && res.statusCode == 200) {
            saveDataAfterLogin(res.result);
            let goUrl = redirectUrl || 'home.html';
            location.href = goUrl;
          }
        });
    }

  },
  methods: {
    subscribe() {
      console.log(arguments);
      window.postMessage({ flag: "openSubscribe", }, "*")
    }
  },
});


// 添加table 父元素样式
function setTableParent() {
  const tables = document.querySelectorAll('table')
  console.log(tables, 'tables')
  for (let i = 0; i < tables.length; i++) {
    const ele = tables[i]
    const wrap = document.createElement('div')
    wrap.className = 'table-container'
    ele.parentNode.replaceChild(wrap, ele)
    wrap.appendChild(ele)
  }
}
setTableParent()


// 给指定元素删除或者添加class名
function changeClass(obj, _className, arrowElm) {
  if(obj.className === ""){
    obj.className=_className;
  }else{
    compareClass(obj, _className);
    compareClass(arrowElm, "arrow-down");
  }
}

function compareClass(arrowObj, newName) {
  const arrClassName = arrowObj.className.split(" ");
  const _index = arrClassName.indexOf(newName); 
  if(_index === -1){  
    arrowObj.className+=" "+newName;
  } else {
    arrClassName.splice(_index, 1)
    arrowObj.className = arrClassName.join(" ")
  }
}


if(document) {
  // termsList点击事件
  const clickTermElem = document.getElementsByClassName("canClickTerm")
  for (let index = 0; index < clickTermElem.length; index++) {
    const element = clickTermElem[index];
    element.onclick = function(_event) {
      const _eleIndex = _event.target.getAttribute("clickIndex")
      const changeElem = document.getElementById(`clickTerm${_eleIndex}`)
      const arrowElm = document.getElementById(`trems-arrow${_eleIndex}`);
      if (changeElem) {
        changeClass(changeElem, "showMore", arrowElm)
      }
    }
  }

  // interList点击事件
  const clickInterElem = document.getElementsByClassName("canClickInter")
  for (let index = 0; index < clickInterElem.length; index++) {
    const element = clickInterElem[index];
    element.onclick = function(_event) {
      const _eleIndex = _event.target.getAttribute("clickIndex")
      const changeElem = document.getElementById(`clickInter${_eleIndex}`)
      const arrowElm = document.getElementById(`information-trems-arrow${_eleIndex}`);
      if (changeElem) {
        changeClass(changeElem, "showMore", arrowElm)
      }
    }
  }
}




