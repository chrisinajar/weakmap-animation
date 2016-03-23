var h = require('virtual-dom/h');
var Animation = require('./');
var Dover = require('dover');
var Struct = require('observ-struct');
var Observ = require('observ');
var ease = require('micro-tween/ease/cubicInOut');
var clickEvent = require('value-event/click');

module.exports = Component;

Animation.init();

function Component (data) {
  var state = Dover({
    position: Struct({
      x: Observ(0),
      y: Observ(0)
    }),
    channels: {
      animateIn: animateIn,
      animateOut: animateOut
    }
  });

  return state;
}

var rollInOut = Animation();

function animateIn (state, value) {
  rollInOut.start(state.position, { x: 100 }, 100, ease);
}
function animateOut (state) {
  rollInOut.start(state.position, { x: 0 }, 100, ease);
}

Component.render = function (state) {
  var style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '20px',
    height: '20px',
    'background-color': 'blue',
    display: 'flex',
    flex: 1,
    transform: 'translate3d(' + state.position.x + 'px ,' + state.position.y + 'px ,0)'
  };

  return h('div', {
    style: style,
    'ev-click': clickEvent(state.channels.animateIn, true)
  });
};
