# pixi-timeout

pixi-timeout is a plugin which replicates the behaviour of window.setTimout but uses PIXI.Ticker (requestAnimationFrame) as the method of progressing time. The bonus is that any timeouts will be paused and resumed automatically when you call `PIXI.Application.stop` & `PIXI.Application.start`


# Intall

```shell
npm i pixi-timeout
```

# Usage

Basic usage. Simply supply the time to wait in seconds and the function to call upon completion

```js
require('pixi.js')
require('pixi-timeout.js')
PIXI.setTimeout(
    2,          // delay in seconds
    callback    // completion handler
)
```

## Clear

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

## Finish

You can finish a timer immediately, which will simply cancel the timer and fire the callback.

```js
timer.finish()
```
