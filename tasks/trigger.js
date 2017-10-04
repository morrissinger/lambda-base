import path from 'path';

import gulp from 'gulp';
import {argv} from 'yargs';

import {TASKS, JSON_SETTINGS} from './constants';
import PATHS from './paths.js';


gulp.task(TASKS.trigger.trigger, [TASKS.build.build], () => {
  const eventString = argv.event || '{}';
  const contextString = argv.context || '{}';

  const event = JSON.parse(eventString);
  const context = JSON.parse(contextString);

  const lambda = require(path.join(__dirname, '..', PATHS.lib)).default;

  lambda(event, context, function () {
    console.log(JSON.stringify(Array.prototype.slice.call(arguments), null, JSON_SETTINGS.spaces));
  });


});
