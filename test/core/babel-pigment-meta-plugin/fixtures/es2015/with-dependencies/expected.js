'use strict';

function Dependency() {
  return null;
}

Dependency.__PIGMENT_META = {
  file: 'fixtures/es2015/with-dependencies/dependency.js',
  dependencies: ['fixtures/es2015/with-dependencies/sub-dependency.js']
};
