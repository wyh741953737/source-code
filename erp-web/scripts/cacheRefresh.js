const fs = require('fs')
const path = require('path')
const root = process.cwd()
const template = './manage.html'
let HTML = fs.readFileSync(template, { encoding: 'UTF-8' })

const temp = new Date().getTime()

const cacheJsTemp = `js?v=${temp}">`
HTML = HTML.replace(/js">/g, cacheJsTemp)
HTML = HTML.replace(/js'>/g, cacheJsTemp)
// script cache

const cacheCssTemp = `css?v=${temp}">`
HTML = HTML.replace(/css">/g, cacheCssTemp)
HTML = HTML.replace(/css'>/g, cacheCssTemp)
// css cache

// console.log(HTML, path.resolve(root, './dist'))
fs.writeFileSync(path.resolve(root, './manage.html'), HTML, { encoding: 'UTF-8' })
console.log('[DONE] manage.html js和css时间戳')
