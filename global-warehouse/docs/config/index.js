const fs = require('fs');
const path = require('path');
const marked = require('marked');

const mdFiles =
  fs.readdirSync(`${path.resolve(__dirname, '..')}/markdown`) || [];
const fileName = process.argv.slice(2)[0];
const htmlTemplate = `<!DOCTYPE html>
  <html>
    <head>
    <meta charset="utf-8" >
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>/title/</title>
    <link rel="stylesheet" type="text/css" href="./config/markdown.css"/>
    <style>
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }
      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }
    </style>
    </head>
    <body>
      <article class="markdown-body">
        /sjb/
      </article>  
    </body>
  </html>`;

// html文件创建并监听md文件改动
const createHtmlFile = (content = '', mdFilePath, htmlFilePath, fileName) => {
  fs.writeFile(htmlFilePath, content, 'utf-8', (err) => {
    if (err) {
      throw err;
    }
    watchMdFile(mdFilePath, htmlFilePath, fileName);
  });
};

// md文件内容转化html
const mdFileToHtml = async (mdFilePath, htmlFilePath, fileName) => {
  // 先检查md文件是否存在
  fs.access(mdFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 不存在md文件创建md文件和html文件
      fs.writeFile(mdFilePath, '', 'utf-8', (err) => {
        if (err) {
          throw err;
        }
        let htmlStr = htmlTemplate;
        htmlStr = htmlStr.replace('/title/', fileName);
        createHtmlFile(htmlStr, mdFilePath, htmlFilePath, fileName);
      });
      return;
    }
    // 获取md文件内容转化html
    fs.readFile(mdFilePath, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      let htmlStr = htmlTemplate;
      htmlStr = htmlStr.replace('/title/', fileName);
      htmlStr = htmlStr.replace('/sjb/', marked(data));
      createHtmlFile(htmlStr, mdFilePath, htmlFilePath, fileName);
    });
  });
};

// 监听md文件改动
const watchMdFile = async (mdFilePath, htmlFilePath, fileName) => {
  fs.watchFile(
    mdFilePath,
    { persistent: true, interval: 200 },
    (curr, prev) => {
      if (curr.mtime === prev.mtime) {
        return false;
      }
      mdFileToHtml(mdFilePath, htmlFilePath, fileName);
    },
  );
};

const start = () => {
  if (fileName) {
    const mdFilePath = `${path.resolve(
      __dirname,
      '..',
    )}/markdown/${fileName}.md`;
    const htmlFilePath = `${path.resolve(__dirname, '..')}/${fileName}.html`;

    mdFileToHtml(mdFilePath, htmlFilePath, fileName);
  } else {
    mdFiles.forEach(async (item) => {
      const mdFilePath = `${path.resolve(__dirname, '..')}/markdown/${item}`;
      const htmlName = item.substring(0, item.lastIndexOf('.'));
      const htmlFilePath = `${path.resolve(__dirname, '..')}/${htmlName}.html`;

      await mdFileToHtml(mdFilePath, htmlFilePath, htmlName);
    });
  }
};

start();
