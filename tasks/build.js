import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';

import {TASKS} from './constants';
import PATHS from './paths.js';

gulp.task(TASKS.build.babel, () =>
  gulp.src(`${PATHS.src}/${PATHS.recursive}.js`)
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(gulp.dest(PATHS.lib))
);

gulp.task(TASKS.build.assets, () =>
  gulp.src([`${PATHS.src}/${PATHS.recursive}`, `!${PATHS.src}/${PATHS.recursive}.js`])
    .pipe(gulp.dest(PATHS.lib))
);

gulp.task(TASKS.build.clean, () =>
  gulp.src(PATHS.lib, {read: false})
    .pipe(clean())
);

gulp.task(TASKS.build.build, [TASKS.build.babel, TASKS.build.assets], () => {});
