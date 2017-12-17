/**
 * pixi-timeout is a plugin which replicates the behaviour of window.setTimout
 * but uses PIXI.Ticker (requestAnimationFrame) as the method of progressing time
 * The bonus is that any timeouts will be paused and resumed automatically when
 * you call PIXI.Application.stop & PIXI.Application.start
 */
(function init(pixi) {
  if (!pixi) {
    throw new Error("PIXI was not found");
  }

  if (!pixi.ticker || !pixi.ticker.shared) {
    throw new Error("PIXI.ticker was not found");
  }
  /**
   * Sets a timeout.
   *
   * @param  {number}    secs  The seconds
   * @param  {Function}  cb    Callback function to fire after timeout
   * @return {object}    Timer state object
   */


  function setTimeout(secs, cb) {
    var progress = 0;

    var ticker = function ticker(delta) {
      progress += delta;
      var elapsed = progress / 60;
      if (elapsed > secs) end(true);
    };

    var end = function end(fire) {
      pixi.ticker.shared.remove(ticker);
      if (fire) cb();
    };

    var clear = function clear() {
      end(false);
    };

    var finish = function finish() {
      end(true);
    }; // start


    pixi.ticker.shared.add(ticker);
    return {
      clear: clear,
      finish: finish
    };
  }
  /**
   * Clears a timeout, preventing the function from being fired
   *
   * @param  {object}  timerObj  A timer state object
   */


  function clearTimeout(timerObj) {
    timerObj.clear();
  }

  pixi.setTimeout = setTimeout;
  pixi.clearTimeout = clearTimeout; // eslint-disable-next-line
})(PIXI);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQyxVQUFTLElBQVQsQ0FBYyxJQUFkLEVBQ0Q7QUFDSSxNQUFJLENBQUMsSUFBTCxFQUNBO0FBQ0ksVUFBTSxJQUFJLEtBQUosQ0FBVSxvQkFBVixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDLEtBQUssTUFBTixJQUFnQixDQUFDLEtBQUssTUFBTCxDQUFZLE1BQWpDLEVBQ0E7QUFDSSxVQUFNLElBQUksS0FBSixDQUFVLDJCQUFWLENBQU47QUFDSDtBQUVEOzs7Ozs7Ozs7QUFPQSxXQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEIsRUFBMUIsRUFDQTtBQUNJLFFBQUksV0FBVyxDQUFmOztBQUVBLFFBQU0sU0FBVSxTQUFWLE1BQVUsQ0FBQyxLQUFELEVBQ2hCO0FBQ0ksa0JBQVksS0FBWjtBQUVBLFVBQU0sVUFBVSxXQUFXLEVBQTNCO0FBRUEsVUFBSSxVQUFVLElBQWQsRUFBb0IsSUFBSSxJQUFKO0FBQ3ZCLEtBUEQ7O0FBU0EsUUFBTSxNQUFNLFNBQU4sR0FBTSxDQUFDLElBQUQsRUFDWjtBQUNJLFdBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsTUFBbkIsQ0FBMEIsTUFBMUI7QUFFQSxVQUFJLElBQUosRUFBVTtBQUNiLEtBTEQ7O0FBT0EsUUFBTSxRQUFRLFNBQVIsS0FBUSxHQUNkO0FBQ0ksVUFBSSxLQUFKO0FBQ0gsS0FIRDs7QUFLQSxRQUFNLFNBQVMsU0FBVCxNQUFTLEdBQ2Y7QUFDSSxVQUFJLElBQUo7QUFDSCxLQUhELENBeEJKLENBNkJJOzs7QUFDQSxTQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLEdBQW5CLENBQXVCLE1BQXZCO0FBRUEsV0FBTztBQUFFLGtCQUFGO0FBQVM7QUFBVCxLQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLFdBQVMsWUFBVCxDQUFzQixRQUF0QixFQUNBO0FBQ0ksYUFBUyxLQUFUO0FBQ0g7O0FBRUQsT0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0EsT0FBSyxZQUFMLEdBQW9CLFlBQXBCLENBakVKLENBbUVBO0FBQ0MsQ0FyRUEsRUFxRUMsSUFyRUQsQ0FBRCIsImZpbGUiOiJwaXhpLXNldHRpbWVvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHBpeGktdGltZW91dCBpcyBhIHBsdWdpbiB3aGljaCByZXBsaWNhdGVzIHRoZSBiZWhhdmlvdXIgb2Ygd2luZG93LnNldFRpbW91dFxuICogYnV0IHVzZXMgUElYSS5UaWNrZXIgKHJlcXVlc3RBbmltYXRpb25GcmFtZSkgYXMgdGhlIG1ldGhvZCBvZiBwcm9ncmVzc2luZyB0aW1lXG4gKiBUaGUgYm9udXMgaXMgdGhhdCBhbnkgdGltZW91dHMgd2lsbCBiZSBwYXVzZWQgYW5kIHJlc3VtZWQgYXV0b21hdGljYWxseSB3aGVuXG4gKiB5b3UgY2FsbCBQSVhJLkFwcGxpY2F0aW9uLnN0b3AgJiBQSVhJLkFwcGxpY2F0aW9uLnN0YXJ0XG4gKi9cbihmdW5jdGlvbiBpbml0KHBpeGkpXG57XG4gICAgaWYgKCFwaXhpKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUElYSSB3YXMgbm90IGZvdW5kXCIpXG4gICAgfVxuXG4gICAgaWYgKCFwaXhpLnRpY2tlciB8fCAhcGl4aS50aWNrZXIuc2hhcmVkKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUElYSS50aWNrZXIgd2FzIG5vdCBmb3VuZFwiKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSB0aW1lb3V0LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSAgICBzZWNzICBUaGUgc2Vjb25kc1xuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgY2IgICAgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gZmlyZSBhZnRlciB0aW1lb3V0XG4gICAgICogQHJldHVybiB7b2JqZWN0fSAgICBUaW1lciBzdGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRUaW1lb3V0KHNlY3MsIGNiKVxuICAgIHtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gMFxuXG4gICAgICAgIGNvbnN0IHRpY2tlciA9ICgoZGVsdGEpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb2dyZXNzICs9IGRlbHRhO1xuXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gcHJvZ3Jlc3MgLyA2MDtcblxuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPiBzZWNzKSBlbmQodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVuZCA9IChmaXJlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBwaXhpLnRpY2tlci5zaGFyZWQucmVtb3ZlKHRpY2tlcik7XG5cbiAgICAgICAgICAgIGlmIChmaXJlKSBjYigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBlbmQoZmFsc2UpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZmluaXNoID0gKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZW5kKHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN0YXJ0XG4gICAgICAgIHBpeGkudGlja2VyLnNoYXJlZC5hZGQodGlja2VyKTtcblxuICAgICAgICByZXR1cm4geyBjbGVhciwgZmluaXNoIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGEgdGltZW91dCwgcHJldmVudGluZyB0aGUgZnVuY3Rpb24gZnJvbSBiZWluZyBmaXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgdGltZXJPYmogIEEgdGltZXIgc3RhdGUgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xlYXJUaW1lb3V0KHRpbWVyT2JqKVxuICAgIHtcbiAgICAgICAgdGltZXJPYmouY2xlYXIoKVxuICAgIH1cblxuICAgIHBpeGkuc2V0VGltZW91dCA9IHNldFRpbWVvdXRcbiAgICBwaXhpLmNsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dFxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbn0oUElYSSkpO1xuIl19