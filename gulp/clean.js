const del = require('del');

const clean = () => {
  return del(PATHS.clean)
};

exports.clean = clean;
