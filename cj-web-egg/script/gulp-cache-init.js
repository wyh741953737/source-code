const { src, dest } = require('gulp');

exports.cjCacheInit = function() {
  return src('../cj-cache-init/**/*')
    .pipe(dest('../cj-cache'));
}
