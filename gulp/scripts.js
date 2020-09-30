const { src, dest } = require('gulp');
const rollup = require('gulp-better-rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');

const scripts = () => {
  return src(PATHS.scripts.entry)
    .pipe(plumber())
    .pipe(rollup({
      plugins: [nodeResolve()],
      context: 'this'
    }, {
      format: 'cjs',
    }))
    .pipe(dest(PATHS.scripts.output))
    .on('end', browserSync.reload);
};

exports.scripts = scripts;
