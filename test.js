var thermometer = require('thermometer');
var test = require('tape');
var component = require('./component');
var dispatchEvent = require('dispatch-event');
var Animations = require('./');

test('sample component works', function (t) {
  thermometer.createComponent(component, null, function (state, dom, done) {
    dispatchEvent(dom, 'click', {
      button: 2
    });

    var previousValue = 0;
    state.position(function (data) {
      t.assert(data.x >= previousValue, 'value is increasing');
      t.assert(data.x < 100, 'value is less than 100');
      previousValue = data.x;
    });
    setTimeout(end, 100);

    Animations.init();
    function end (err) {
      done();
      Animations.stop();
      t.end(err);
    }
  });
});
