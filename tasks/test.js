import gulp from 'gulp';
import ava from 'gulp-ava';


import {TASKS} from './constants';
import PATHS from './paths.js';

const config = {
	verbose: true
};

gulp.task(TASKS.test.test, () =>
	gulp.src(`${PATHS.test}/${PATHS.recursive}.spec.js`)
		.pipe(ava(config))
	);

gulp.task(TASKS.test.watch, () =>
	gulp.watch(`${PATHS.src}/${PATHS.recursive}.js`, [TASKS.test.test]));
