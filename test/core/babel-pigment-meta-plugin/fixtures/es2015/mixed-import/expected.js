'use strict';

function Default() {
  return null;
}

Default.__PIGMENT_META = {
  file: 'fixtures/es2015/mixed-import/dependency.js',
  dependencies: []
};

function Named() {
  return null;
}

Named.__PIGMENT_META = {
  file: 'fixtures/es2015/mixed-import/dependency.js',
  dependencies: []
};
Named.displayName = 'dependency.Named';
