process.chdir(__dirname);
const path = require('path');

const __js = 'mycj/js';
const __css = 'mycj/css';
const __static = 'mycj/static';
const __dist = 'dist/mycj-public'

exports.DIRECTORY = {
  js: __js,
  css: __css,
  static: __static,
};

exports.PAHT = {
  src: '../src',
  pages: '../src/pages',
  components: '../src/components',
  public: '../public',
  dist: `../../${__dist}`,
  ABS: {
    /** 指向 mycj 文件夹 */
    root: path.join(__dirname, '../'),
    src: path.join(__dirname, '../src'),
    pages: path.join(__dirname, '../src/pages'),
    comps: path.join(__dirname, '../src/components'),
    public: path.join(__dirname, '../public'),
    dist: path.join(__dirname, `../../${__dist}`),
    dist_js: path.join(__dirname, __js),
    dist_css: path.join(__dirname, __css),
    dist_static: path.join(__dirname, __static),
    root_egg: path.join(__dirname, '../../'),
  }
};
