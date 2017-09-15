import test from 'ava';
import {spy} from 'sinon';

import lambda from '../src/index';

test.before(() => {
  /**
  * Set up any rewiring of imports or other objects available at the top
  * namespace in the lambda file. For example:
  *
  * lambda.__set__('myImport', {
  *   // Some attributes
  * });
  *
  */
})

test.after(() => {
  /**
   * Reset rewiring after completing tests. For example:
   *
   * lambda.__ResetDependency__('myImport');
   */
});

test('callback is called', t => {
  const event = 'test';
  const context = {type: 'test-event'};

  const callback = spy();

  lambda(event, context, callback);

  t.true(callback.called);
});
