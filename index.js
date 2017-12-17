/**
 * pixi-timeout is a plugin which replicates the behaviour of window.setTimout
 * but uses PIXI.Ticker (requestAnimationFrame) as the method of progressing time
 * The bonus is that any timeouts will be paused and resumed automatically when
 * you call PIXI.Application.stop & PIXI.Application.start
 */
(function init(pixi)
{
    if (!pixi)
    {
        throw new Error("PIXI was not found")
    }

    if (!pixi.ticker || !pixi.ticker.shared)
    {
        throw new Error("PIXI.ticker was not found")
    }

    /**
     * Sets a timeout.
     *
     * @param  {number}    secs  The seconds
     * @param  {Function}  cb    Callback function to fire after timeout
     * @return {object}    Timer state object
     */
    function setTimeout(secs, cb)
    {
        let progress = 0

        const ticker = ((delta) =>
        {
            progress += delta;

            const elapsed = progress / (60 * pixi.ticker.shared.speed);

            if (elapsed > secs) end(true);
        });

        const end = (fire) =>
        {
            pixi.ticker.shared.remove(ticker);

            if (fire) cb();
        }

        const clear = () =>
        {
            end(false)
        };

        const finish = () =>
        {
            end(true);
        };

        // start
        pixi.ticker.shared.add(ticker);

        return { clear, finish };
    }

    /**
     * Clears a timeout, preventing the function from being fired
     *
     * @param  {object}  timerObj  A timer state object
     */
    function clearTimeout(timerObj)
    {
        timerObj.clear()
    }

    pixi.setTimeout = setTimeout
    pixi.clearTimeout = clearTimeout

// eslint-disable-next-line
}(PIXI));
