## Weakmap Animation
Managed tweening of observable values in a weak map

## Usage
```
var Animation = require('weakmap-animation');
var State = require('dover');
var Struct = require('observ-struct');
var ease = require('micro-tween/ease/cubicInOut');

function Component (data) {
  var state = State({
    position: Struct({
      x: Observ(0),
      y: Observ(0)
    }),
    channels: {
      animateIn: animateIn,
      animateOut: animateOut
    }
  })
}

var rollInOut = Animation();

function animateIn (state) {
  rollIn.start(state.position, { x: 100 }, 350, ease);
}
function animateOut (state) {
  rollIn.start(state.position, { x: 0 }, 350, ease);
}

Component.render = function (state) {
  var style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    transform: 'translate3d(' + state.position.x + ',' + state.position.y + ',0)'
  }

  return h('div', {
    style: style
  })
}
```js
