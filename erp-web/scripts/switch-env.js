const fs = require('fs')
const path = require('path')

// NODE_ENV === development | production | production-cn | test
const [ NODE_ENV, update ] = [...process.argv].splice(2)
const BUILD_VERSION = Date.now()

console.log('✈️ 开始环境切换 ->', NODE_ENV)
try {
  const directoryPath = path.join(__dirname, '../static/js/public')
  const dirs = fs.readdirSync(directoryPath)
  const commonjsFilename = dirs[dirs.findIndex(filename => filename.includes('common'))]
  const commonjsFilePath = path.join(directoryPath, commonjsFilename)
  let commonjs = fs.readFileSync(commonjsFilePath, 'UTF-8')

  commonjs = commonjs.replace(/environment(\s?)=(\s?)\'##(development|production(-cn)?|test(-new)?)##\'/, `environment = '##${NODE_ENV}##'`)

  console.log('---- 生成构建日期 ----');
  commonjs = commonjs.replace(/window\.BUILD_VERSION = null;/, `window.BUILD_VERSION = ${BUILD_VERSION};`);

  fs.writeFileSync(commonjsFilePath, commonjs)

  // 写入构建信息
  const buildInfo = `
// 构建时间戳
exports.BUILD_TIMESTAMP = '${BUILD_VERSION}';
// 构建环境
exports.NODE_ENV = '${NODE_ENV}';
`
  fs.writeFileSync(path.join(__dirname, '../env.js'), buildInfo)

  console.log('🚀🚀🚀🚀 环境切换成功 🚀🚀🚀🚀')

  if (update === 'update') require('./update-script')

} catch (e) {
  console.log('-------------------------------\n', e, '\n-------------------------------')
}
