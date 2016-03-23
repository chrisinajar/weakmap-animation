var Tween = require('micro-tween');
var Store = require('weakmap-shim/create-store');
var raf = require('raf');

module.exports = Animation;

Animation.init = init;
Animation.stop = stop;

function Animation () {
  var Animations = Store();

  return {
    start: start,
    finish: finish
  };

  function start (state, to, duration, ease) {
    if (!state) {
      throwError('You must pass an observable to start');
    }

    var animation = Tween(state())
      .to(to)
      .ease(ease);

    startAnimation(state, animation, duration);
  }

  function finish (state) {
    if (!state) {
      throwError('You must pass an observable to finish');
    }

    var animation = Animations(state).data;
    if (!animation) {
      return;
    }
    var duration = Animations(state).duration;

    animation.update(Date.now() + duration);
    Animations(state).data = null;
  }

  function startAnimation (state, animation, duration) {
    Animations(state).duration = duration;
    Animations(state).data =
      animation
        .duration(duration)
        .onStart(state.set)
        .onUpdate(state.set)
        .start();
  }
}

var isStopped = true;
function stop () {
  isStopped = true;
}

function init () {
  if (!isStopped) {
    return;
  }
  isStopped = false;
  return tick();

  function tick () {
    if (isStopped) {
      return;
    }

    Tween.update();
    raf(tick);
  }
}

function throwError (msg) {
  var err = Error();
  err.message = msg;
  throw err;
}
