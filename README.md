## Weakmap Animation
Managed tweening of observable values in a weak map

## Usage
```js
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
```

# API
#### `Animation.init()`
Starts the `raf` loop for tweening animations. If the loop is already running, does nothing.

#### `Animation.stop()`
Stops the `raf` loop for tweening animations. If the loop is not already running, does nothing.

#### `Animation()` -> `animation`
Create a new animation weakmap.

#### `animation.start(state, to, duration, ease)`
Start a new animation tweening data on the observable state. Automatically finishes any previously running animation.


**state**

Type: `observable`

Mutable state object to modify. The animation will call `.set` on the state during animation frames.


**to**

Type: `object`

The destination data of the animation.


**duration**

Type: `int`

Time in milliseconds for the animation to last.


**ease**

Type: `ease`

An easing from `require('micro-tween/ease/...')` to use for the animation.


#### `animation.finish(state)`
Completes the currently running animation.


**state**

Type: `observable`

Used to look up the running animation in the weak map.


# License
MIT
