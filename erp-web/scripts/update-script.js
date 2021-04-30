const fs = require('fs')
const path = require('path')
const config = require('./config')
// const { JSDOM } = require('jsdom')
const buildInfo = require('../env')


const arg0 = [...process.argv].splice(2)[0]
const timestamp = Date.now()
let isUpdateHtml = true
let isUpdateComponent = true

if (arg0) {
  if (
    /component/i.test(arg0)
    ||
    /html/i.test(arg0)
  ) {
    if (/component/i.test(arg0)) {
      isUpdateHtml = false
    }
    if (/html/i.test(arg0)) {
      isUpdateComponent = false
    }
  } else {
    console.error(`不能识别指令 ${arg0}`)
    console.log(`目前支持的指令 -> [component | html]`)
    return 0
  }
}


/** 更新 html 文件 [<script>|<likn>] */
~function () {
  if (!isUpdateHtml) return

  let now = 0
  let htmlFiles = []

  //# 读出所有html文件路径
  config.htmlPtah.forEach(relativePath => {
    let _path = path.join(__dirname, relativePath)
    let dirs = fs.readdirSync(_path)

    dirs.forEach(filename => {
      if (filename.endsWith('.html')) {
        htmlFiles.push(path.join(_path, filename))
      }
    })
  })

  console.log(`✈️ 开始更新 <script>|<likn> 共 [${htmlFiles.length}] 个文件`)
  replaceHtmlFn(htmlFiles[now])

  function replaceHtmlFn(fullFilepath) {
    let htmlText = fs.readFileSync(fullFilepath, 'UTF-8')
    /** JSDOM
     * 用jsdom会出现格式化问题，所以还得用正则
     let dom = new JSDOM(htmlText)
     let document = dom.window.document
     let scripts = document.querySelectorAll('script')
   
     scripts.forEach(script => {
       let tmp = script.src.split('/')
   
       if (config.replaceJs.includes(tmp[tmp.length - 1])) {
         script.src = `${script.src.replace(/(\?v=d+)?$/, '')}?v=${Date.now()}`
       }
     })
     */
    console.log('\n')

    config.replaceJs.forEach(script => {
      let _script = script.replace('.js', '')
      let reg = new RegExp(`${_script}\\.js(\\?v=\\d+)?`)
      let regRes = reg.exec(htmlText)

      if (regRes != null) {
        htmlText = htmlText.replace(regRes[0], `${_script}.js?v=${timestamp}`)
        console.log(`[${fullFilepath}] ->`, script)
      } else {
        console.log(`--------- ${fullFilepath} 未匹配到 ${script}`)
      }

      // ---- 20-01-09 utils 中国服务器 ----
      if (/-cn$/.test(buildInfo.NODE_ENV)) {
        htmlText = htmlText.replace('miandan.cjdropshipping.com', 'miandan.cjdropshipping.cn')
      } else {
        htmlText = htmlText.replace('miandan.cjdropshipping.cn', 'miandan.cjdropshipping.com')
      }
      // ---- 20-01-09 utils 中国服务器 ----
    })

    config.replaceCss.forEach(link => {
      let _link = link.replace('.css', '')
      let reg = new RegExp(`${_link}\\.css(\\?v=\\d+)?`)
      let regRes = reg.exec(htmlText)

      if (regRes != null) {
        htmlText = htmlText.replace(regRes[0], `${_link}.css?v=${timestamp}`)
        console.log(`[${fullFilepath}] ->`, link)
      } else {
        console.log(`--------- ${fullFilepath} 未匹配到 ${link}`)
      }
    })

    // 将替换后的文件写回磁盘
    fs.writeFileSync(fullFilepath, htmlText)

    // if (now === 0) return // 打断执行

    now++
    if (htmlFiles[now]) {
      replaceHtmlFn(htmlFiles[now])
    } else {
      console.log(`🍡 <script>|<likn> 更新完成\n`)
    }
  }
}();


/** 更新 js 文件 [component] */
~function () {
  if (!isUpdateComponent) return

  const { routerjs, componentjs } = config
  let now = 0
  let components = []

  //# myCj.js 中的 router 中的 tmplateUrl
  routerjs.forEach(router => {
    console.log(`🚀 开始更新 myCj.js->router->tmplateUrl\n`)
    try {
      const routerPath = path.join(__dirname, router)
      let routerFile = fs.readFileSync(routerPath, 'UTF-8')
      const res = routerFile.match(config.routerjsRegExp)

      if (res) {
        res.forEach(tplUrl => {
          const arr1 = (tplUrl.split('.html'))
          const firstStr = arr1[0].replace('.', '\.')                  // 转义 .
          const lastSymbolStr = arr1[1].charAt(arr1[1].length - 1)     // 字符串可能用的 " | ' | `
          const reg = new RegExp(`${firstStr}\\.html(\\?v=\\d+)?${lastSymbolStr}`)
          // console.log(tplUrl.match(reg), reg)
          routerFile = routerFile.replace(reg, `${tplUrl.split('.html')[0]}.html?v=${timestamp}${lastSymbolStr}`)
          console.log(`[${router}] ->`, `${tplUrl.split('.html')[0]}.html?v=${timestamp}${lastSymbolStr}`)
        })

        // --------- 替换语言包 --------s-
        routerFile = routerFile.replace(config.languageRegExp, `suffix: '.json?v=${timestamp}'`);
        // --------- 替换语言包 --------e-

        fs.writeFileSync(routerPath, routerFile)
        console.log(`🍡 myCj.js->router 更新完成\n`)
      }
    } catch (e) {
      console.log('××××××××× 更新 myCj.js->router 报错 ×××××××××\n', e)
    }
  })

  //# 读出所有 componentjs 文件路径 -s-
  componentjs.forEach(comp => {
    const commponetPath = path.join(__dirname, comp)
    const dirs = fs.readdirSync(commponetPath)

    dirs.forEach(dir => readDirectory(commponetPath, dir))
  })

  function readDirectory(parentPath, crrentPath) {
    const _path = path.join(parentPath, crrentPath)

    try {
      const isDirectory = fs.lstatSync(_path).isDirectory()

      if (isDirectory) {
        const dirs = fs.readdirSync(_path)

        dirs.forEach(dir => readDirectory(_path, dir))
      } else {
        //# 递归出口
        _path.endsWith('.js') && components.push(_path) // 提取 js 文件
      }
    } catch (e) {
      console.log('××××××××× 读取 components 目录报错 ×××××××××\n', e)
    }
  }
  //# 读出所有 componentjs 文件路径 -e-

  console.log(`🚀 开始更新 components 共 [${components.length}] 个文件\n`)
  updatecomponent(components[now])

  function updatecomponent(compFilepath) {
    try {
      let compJs = fs.readFileSync(compFilepath, 'UTF-8')
      const res = compJs.match(config.componentjsRegExp)

      if (res) {
        //# 暂时不考虑一个文件中多个 templateUrl 的情况
        compJs = compJs.replace(config.componentjsRegExp, res[0].replace(/\.html(\?v=\d+)?/g, `.html?v=${timestamp}`))
        fs.writeFileSync(compFilepath, compJs) // 将更新后的文件写回磁盘
        console.log(`[${compFilepath}]`)
        console.log('->', res[0], '\n')
      } else {
        console.log(`--------- ${compFilepath} 未匹配到 templateUrl`)
      }

    } catch (e) {
      console.log('××××××××× 更新 component 报错 ×××××××××\n', e)
    }

    // if (now === 0) return // 打断执行

    now++
    if (components[now]) {
      updatecomponent(components[now])
    } else {
      console.log(`🍡 components 更新完成\n`)
    }
  }

}();

console.log(`🍺 你是最棒哒 ^_^ 🍺\n`)
