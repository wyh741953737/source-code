const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const merge = require('webpack-merge');
const compileLess = require('../script/compile-less');
const { PAHT, DIRECTORY: DIR } = require('./config');

function getStyleLoader() {
  const styleLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        // 自定义模块化生 class 成规则
        getLocalIdent(context, _, className) {
          const rootPath = context.resourcePath.replace(`${context.rootContext}/`, '');
          const projectPath = path.join(__dirname, '..');
          const cssPaths = rootPath.replace(projectPath + path.sep, '').replace('.less', '');
          return `${cssPaths.split(path.sep).join('_')}__${className}`; // eg: class="src_pages_mycj_mcyj__className"
        }
      },
    },
  };
  return styleLoader;
}

function transform(content, path) {
  if (/\.less$/.test(path)) {
    return compileLess(Buffer.from(content).toString(), path);
  }
  return content;
}

function transformPath(targetPath, absolutePath) {
  return targetPath.replace('.less', '.css'); // .less -> .css
}

module.exports = function (env) {
  const isDev = env === 'development';
  const filename = isDev ? `${DIR.js}/[name].js` : `${DIR.js}/[name].[contenthash:9].js`;
  const filename_config = 'static/js/public/config.js';
  const filename_common = 'static/js/public/common.js';
  const chunkFilename = isDev ? `${DIR.js}/async.[name].js` : `${DIR.js}/async.[name].[contenthash:9].js`;

  const config = {
    entry: {
      mycj: path.join(PAHT.ABS.pages, 'mycj/mycj.module.js'),
      config: path.join(PAHT.ABS.public, 'static/js/public/config.js'), // 老的配置文件
      common: path.join(PAHT.ABS.public, 'static/js/public/common.js'), // 老的dsp文件
    },
    output: {
      path: PAHT.ABS.dist,
      filename: chunkData => {
        let name = filename;
        if (chunkData.chunk.name === 'config') {
          name = filename_config; // 老的配置文件
        } else if (chunkData.chunk.name === 'common') {
          name = filename_common; // 老的dsp文件
        }
        return name;
      },
      chunkFilename,
    },
    // NODE API 模式下无效
    stats: { // log 信息控制
      assets: false, // 能关闭 pulibc 搬运的 log
      children: false, // 能关闭 mini-css-extract-plugin log
    },
    resolve: {
      alias: {
        '@src': PAHT.ABS.src,
        '@root': PAHT.ABS.root,
        '@root_egg': PAHT.ABS.root_egg,
      },
      extensions: ['.js', '.json'], // optional
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", {
                  "modules": false,
                  "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                  }
                }],
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          // 提取 css 到外部文件件
          use: [MiniCssExtractPlugin.loader, getStyleLoader(), 'less-loader'],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 1024 * 9, // 9KB 以下图片将被编码成base64格式
              name: isDev
                ? `${DIR.static}/[name].[ext]`
                : `${DIR.static}/[name].[content:9].[ext]`,
            },
          }],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(PAHT.ABS.public, 'myCJ.html'), // mycj模板
        filename: 'myCJ.html',
        hash: isDev, // 开发模式用 ?hash，线上环境用 [contenthash:9]
        chunks: ['mycj'], // 只保留 entry 中的 mycj
      }),
      new CopyWebpackPlugin([
        // myjc 原文件
        { from: PAHT.ABS.public, to: PAHT.ABS.dist },
        // 组件
        {
          from: path.join(PAHT.ABS.src, 'components'),
          to: path.join(PAHT.ABS.dist, 'components'),
          ignore: ['*.js'],
          transform,
          transformPath,
        },
        // 模板文件、样式文件
        {
          from: path.join(PAHT.ABS.src, 'pages'),
          to: path.join(PAHT.ABS.dist, 'pages'),
          ignore: ['*.js'],
          transform,
          transformPath,
        },
      ]),
      // 提取 css 到外部文件件
      new MiniCssExtractPlugin({
        filename: isDev
          ? `${DIR.css}/[name].css`
          : `${DIR.css}/[name].[contenthash:9].css`,
      }),
    ],
  };

  const config_prod = {
    mode: 'production',
    devtool: '#cheap-module-source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          angularjs: {
            // angular.js
            test: /[\\/]node_modules[\\/](angular)[\\/]/
          },
          "ui-router~lazy-load": {
            // 路由、懒加载
            test: /[\\/]node_modules[\\/](@uirouter\/angularjs|oclazyload)[\\/]/
          },
        }
      }
    },
    plugins: [
      // 自动清理打包目标文件夹
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['*.html', 'mycj', 'static'],
      }),
      // 生成打包资源清单
      new StatsWriterPlugin({
        filename: 'asset-stats.json'
      }),
    ]
  };

  const config_dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    /* 采用 NODE API 形式启动 webpack，devServer 需要额外适配
    devServer: {
      contentBase: resolve('../dist'), // 静态文件服务器地址
      historyApiFallback: {
        rewrites: [
          { from: /\s*$/, to: '/home.html' }, // 跟路径定向到 home.html
        ],
      },
      hot: true,
      proxy: {
        '/api/users': {
          target: 'https://api.github.com/users',
          pathRewrite: { '^/api/users': '' }
        },
      },
    }, */
  };

  return merge(config, isDev ? config_dev : config_prod);
};
