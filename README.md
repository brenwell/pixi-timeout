# pixi-timeout

**Pixi-timeout** is a plugin which replicates the behaviour of window.setTimout but uses PIXI.Ticker (requestAnimationFrame) as the method for progressing time. The bonus is that any timeouts will be paused and resumed automatically when you call `PIXI.Application.stop` & `PIXI.Application.start`


## Install

```shell
npm i pixi-timeout
```

## Usage

### Importing

#### common.js

```js
require('pixi.js')
require('pixi-timeout')
```

#### es6 modules

```js
import pixi from 'pixi.js'
import pixiTimeout from 'pixi-timeout'
```

### Basic usage.

Simply supply the time to wait in seconds and the function to call upon completion

```js
PIXI.setTimeout(
    2,          // delay in seconds
    callback    // completion handler
)
```

### Clear

There are 2 ways to clear a timeout. First the traditional way

```js
const timer = PIXI.setTimeout(2,callback)
PIXI.clearTimeout(timer)
```

or more conviniently

```js
const timer = PIXI.setTimeout(2,callback)
timer.clear()
```

### Finish

You can finish a timer immediately, which will simply cancel the timer and fire the callback.

```js
timer.finish()
```
### Pause & Resume

If you are using PIXI.Application for instantiation then all current timers are automatically paused and resumed when `PIXI.Application.stop` & `PIXI.Application.start` are called. Which is great for keeping audio, tweens and timeouts synchronised.

```js
import pix from ‘pixi,js’
import pixiTimeout from 'pixi-timeout'

const myApp = new PIXI.Application()

myApp.stop() // pause
myApp.start() //resume
```

## FPS, Speed & Time

**pixi-timeout** calculates time based on the [PIXI.ticker](http://pixijs.download/release/docs/PIXI.ticker.Ticker.html) settings. It assumes *60fps* is the desired rate and uses the `deltaTime` value from last frame to this frame to determine the correct time progression. Additionally it uses the `speed` value from the `PIXI.ticker`, so if you wish to adjust the optimal *fps* you can do so by changing the PIXI.ticker value and pixi-timeout will adjust accordingly

[PIXI.ticker docs](http://pixijs.download/release/docs/PIXI.ticker.Ticker.html)
