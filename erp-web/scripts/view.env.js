const fs = require('fs')
const path = require('path')


const directoryPath = path.join(__dirname, '../static/js/public')
const dirs = fs.readdirSync(directoryPath)
const commonjsFilename = dirs[dirs.findIndex(filename => filename.includes('common'))]
const commonjsFilePath = path.join(directoryPath, commonjsFilename)
let commonjs = fs.readFileSync(commonjsFilePath, 'UTF-8')
let evn = commonjs.match(/environment(\s?)=(\s?)\'##(development|production|test)##\'/)

console.log('🚀 当前环境 ->', evn ? evn[0] : '不知道 != =')
