import { exec } from 'child_process';

import gulp from 'gulp';
import clean from 'gulp-clean';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import mergeStream from 'merge-stream';


import {TASKS, STREAMS, INSTALL_COMMAND} from './constants';
import PATHS from './paths';

gulp.task(TASKS.package.build, [TASKS.build.build], () => {
  const stream1 = gulp.src(PATHS.packageJson)
    .pipe(gulp.dest(PATHS.package))
    .on(STREAMS.event.end, () => {
      exec(INSTALL_COMMAND, {
        cwd: PATHS.package
      });
    });

  const stream2 = gulp.src(`${PATHS.lib}/${PATHS.recursive}`)
    .pipe(gulp.dest(PATHS.package));

  return mergeStream(stream1, stream2);
});

gulp.task(TASKS.package.zip, [TASKS.package.build], () =>
  gulp.src(`${PATHS.package}/${PATHS.recursive}`)
    .pipe(zip(PATHS.lambdaZip))
    .pipe(gulp.dest('.'))
);

gulp.task(TASKS.package.clean, () =>
  gulp.src(PATHS.package, {read: false})
    .pipe(clean())
);

gulp.task(TASKS.package.remove, () =>
  gulp.src(PATHS.lambdaZip, {read: false})
    .pipe(clean())
);

gulp.task(TASKS.package.package, (cb) => runSequence(TASKS.package.zip, TASKS.package.clean, cb));
