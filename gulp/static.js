const { src } = require('gulp');
const browserSync = require('browser-sync');

const static = () => {
  return src(PATHS.static.entry)
    .on('end', browserSync.reload);
};

exports.static = static;
