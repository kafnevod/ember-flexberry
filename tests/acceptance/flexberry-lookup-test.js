import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | flexberry lookup');

test('visiting /flexberry-lookup', function(assert) {
  visit('/flexberry-lookup');

  andThen(function() {
    assert.equal(currentURL(), '/flexberry-lookup');
  });
});