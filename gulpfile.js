const { watch, series, parallel } = require('gulp');
global.PATHS = {
  server: './app/static',
  clean: ['./app/static/**/*', '!./app/static/images', '!./app/static/fonts'],
  templates: {
    basedir: './app/pug',
    entry: './app/pug/*.pug',
    watch: './app/pug/**/*.pug',
    regex: /app\/pug\//,
    output: './app/static/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    watch: './app/sass/**/*.sass',
    output: './app/static/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    watch: './app/scripts/**/*.js',
    output: './app/static/scripts',
  },
  svg: {
    entry: './app/static/images/svg/*.svg',
    watch: './app/static/images/svg/*.svg',
    output: './app/static/images/svg/svg-sprite',
  },
  static: {
    entry: ['./app/static/images/**/*', './app/fonts/**/*'],
    watch: ['./app/static/images/**/*', './app/fonts/**/*'],
  }
};

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null
};

const taskClean = require('./gulp/clean').clean;
const taskServer = require('./gulp/server').server;
const taskTemplates = require('./gulp/templates').templates;
const taskStyles = require('./gulp/styles').styles;
const taskScripts = require('./gulp/scripts').scripts;
const taskSvg = require('./gulp/svg').svg;
const taskStatic = require('./gulp/static').static;

const taskWatch = () => {
  global.watch = true;
  watch(PATHS.templates.watch, series(taskTemplates))
    .on("all", (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });
  watch(PATHS.styles.watch, series(taskStyles))
  watch(PATHS.scripts.watch, series(taskScripts))
  watch(PATHS.svg.watch, series(taskSvg))
  watch(PATHS.static.watch, series(taskStatic))
};

exports.clean = taskClean;
exports.server = taskServer;
exports.templates = taskTemplates;
exports.styles = taskStyles;
exports.scripts = taskScripts;
exports.svg = taskSvg;
exports.static = taskStatic;
exports.default = series(
  taskClean,
  parallel(taskTemplates, taskStyles, taskScripts, taskStatic, taskSvg),
  taskServer,
  taskWatch,
);
