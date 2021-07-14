/**
 * google一键登录后 处理新老用户登录
 */
import utils from "@common/utils";
import { login, saveDataAfterLogin } from "../home/commonLogin";

const $post = utils.axiosEnhance(new utils.Axios({ method: "POST" }));
const { statusCode200, $base64 } = utils;

const facebookLogin = "app/account/facebookLoginCs";
const facebookReg = "app/account/facebookRegCs";
const googleLogin = "app/account/googleLoginCs";
const GoogleReg = "app/account/googleRegCs";
const httpApi = {
  facebook: {
    login: facebookLogin,
    reg: facebookReg,
  },
  google: {
    login: googleLogin,
    reg: GoogleReg,
  },
};

function successfn(resv) {
  //这个方法需要老用户账号和密码
  // const _that = this;
  // const username = CJ_.getQueryVariable("username");
  // const tempassword = CJ_.getQueryVariable("tempassword");
  // if (username && tempassword) {
  //   login(
  //     {
  //       name: decodeURIComponent(username),
  //       passwd: decodeURIComponent(tempassword),
  //       chatType: "0",
  //       platform: "pc",
  //       isTOCJ: "true",
  //     },
  //     function(data) {
  //       if (data.statusCode != 200) {
  //         _that.$my_message.info(data.message);
  //       } else {
  //         // 保存登录信息
  //         CJ_.store.set("loginfromerp", "1"); // 标记从erp过来的模拟登录
  //         let cookieObj = { expires: 3, domain: __root__domain };
  //         CJ_.$cookie.set("loginfromerp", "1", cookieObj);
  //         saveDataAfterLogin(data.result);
  //         // location.href = "home.html";
  //       }
  //     }
  //   );
  // } else {
  //   // 如果不是erp过来的登录，加载聊天
  //   !CJ_.store.get("loginfromerp") && addChatBody();
  //   !CJ_.store.get("loginfromerp") && addGuidWindow();
  // }

  //登录成功后的操作 (沿用 之前的SignInWith.js 代码)
  let userInfo = resv;
  console.log(userInfo);
  saveDataAfterLogin(userInfo);

  // 检测是否有tarket查询字符串
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  var target = getQueryString("target");
  if (target) target = $base64.decode(target);
  console.log(target);
  var fromUrlArr = document.referrer.split("/");
  console.log(fromUrlArr);
  var fromPage = fromUrlArr[fromUrlArr.length - 1];
  const keysArr = [
    "id",
    "loginName",
    "token",
    "name",
    "firstName",
    "lastName",
    "status",
    "avatar",
    "contactID",
    "country",
    "address",
    "email",
    "phone",
    "storeLink",
    "relateSalesman",
    "salesmanId",
  ];
  if (keysArr.some((key) => userInfo[key] === undefined)) {
    // 缺少参数提示
    console.log("err  --->   缺少后台回传参数    undefined 引起 编码报错");
  }
  localStorage.setItem("userId", $base64.encode(userInfo.id));
  localStorage.setItem("loginName", $base64.encode(userInfo.loginName));
  localStorage.setItem("token", $base64.encode(userInfo.token));
  localStorage.setItem("noEncodeToken", userInfo.token);
  localStorage.setItem("name", $base64.encode(userInfo.name));
  localStorage.setItem("firstName", $base64.encode(userInfo.firstName));
  localStorage.setItem("lastName", $base64.encode(userInfo.lastName));
  localStorage.setItem("avatar", $base64.encode(userInfo.avatar || ""));
  if (userInfo.lastAccess) {
    localStorage.setItem(
      "lastLoginTime",
      $base64.encode(userInfo.lastAccess.loginDate)
    );
  }
  localStorage.setItem("contactID", $base64.encode(userInfo.contactID));
  localStorage.setItem("country", $base64.encode(userInfo.country));
  localStorage.setItem("address", $base64.encode(userInfo.address));
  localStorage.setItem("email", $base64.encode(userInfo.email));
  localStorage.setItem("phone", $base64.encode(userInfo.phone));
  localStorage.setItem("storeLink", $base64.encode(userInfo.storeLink));
  localStorage.setItem(
    "relateSalesman",
    $base64.encode(userInfo.relateSalesman)
  );
  localStorage.setItem("salesmanId", $base64.encode(userInfo.salesmanId));
  localStorage.setItem("loginTime", new Date().getTime());
  console.log("成功登录  即将跳转 主页");
  if (target) {
    location.href = target;
    return;
  }
  if (
    fromPage.indexOf("list-detail.html") != -1 ||
    fromPage.indexOf("reptail-detail.html") != -1 ||
    fromPage.indexOf("product-detail.html") != -1
  ) {
    location.href = fromPage;
    return;
  }
  location.href = "home.html";
}

export function loginByAuth(network, params) {
  $post(httpApi[network].login, params).then(([e, res]) => {
    if (e) {
      console.warn(e);
      return;
    }
    const [err, resv] = statusCode200(res);
    if (err) {
      console.warn(err);
      return;
    }

    console.log(" login_type == 1  新用户---> ", resv); // login_type === 1 新用户 没有则为老用户
    //新用户 不做处理 直接跳转到注册页面 进行注册
    if (resv.login_type == 1) {
      location.href = "login.html";
      localStorage.setItem("regLoginShow", true); //新用户 注册弹窗开关
    } else {
      //老用户 直接跳转页面
      successfn(resv); // 执行 旧版 登录功能  依赖
    }
  });
}
