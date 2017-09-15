export const TASKS = {
  package: {
    package: 'package',
    build: 'package-build',
    zip: 'package-zip',
    clean: 'package-clean',
    remove: 'package-remove'
  },
  build: {
    build: 'build',
    babel: 'build-babel',
    assets: 'build-assets',
    clean: 'build-clean'
  },
  test: {
    test: 'test',
    watch: 'watch'
  }
};

export const STREAMS = {
  event: {
    end: 'end'
  }
};

export const INSTALL_COMMAND = 'npm install --production';
