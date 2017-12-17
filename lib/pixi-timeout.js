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
      var elapsed = progress / (60 * pixi.ticker.shared.speed);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQyxVQUFTLElBQVQsQ0FBYyxJQUFkLEVBQ0Q7QUFDSSxNQUFJLENBQUMsSUFBTCxFQUNBO0FBQ0ksVUFBTSxJQUFJLEtBQUosQ0FBVSxvQkFBVixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDLEtBQUssTUFBTixJQUFnQixDQUFDLEtBQUssTUFBTCxDQUFZLE1BQWpDLEVBQ0E7QUFDSSxVQUFNLElBQUksS0FBSixDQUFVLDJCQUFWLENBQU47QUFDSDtBQUVEOzs7Ozs7Ozs7QUFPQSxXQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEIsRUFBMUIsRUFDQTtBQUNJLFFBQUksV0FBVyxDQUFmOztBQUVBLFFBQU0sU0FBVSxTQUFWLE1BQVUsQ0FBQyxLQUFELEVBQ2hCO0FBQ0ksa0JBQVksS0FBWjtBQUVBLFVBQU0sVUFBVSxZQUFZLEtBQUssS0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixLQUFwQyxDQUFoQjtBQUVBLFVBQUksVUFBVSxJQUFkLEVBQW9CLElBQUksSUFBSjtBQUN2QixLQVBEOztBQVNBLFFBQU0sTUFBTSxTQUFOLEdBQU0sQ0FBQyxJQUFELEVBQ1o7QUFDSSxXQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLE1BQW5CLENBQTBCLE1BQTFCO0FBRUEsVUFBSSxJQUFKLEVBQVU7QUFDYixLQUxEOztBQU9BLFFBQU0sUUFBUSxTQUFSLEtBQVEsR0FDZDtBQUNJLFVBQUksS0FBSjtBQUNILEtBSEQ7O0FBS0EsUUFBTSxTQUFTLFNBQVQsTUFBUyxHQUNmO0FBQ0ksVUFBSSxJQUFKO0FBQ0gsS0FIRCxDQXhCSixDQTZCSTs7O0FBQ0EsU0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixHQUFuQixDQUF1QixNQUF2QjtBQUVBLFdBQU87QUFBRSxrQkFBRjtBQUFTO0FBQVQsS0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxXQUFTLFlBQVQsQ0FBc0IsUUFBdEIsRUFDQTtBQUNJLGFBQVMsS0FBVDtBQUNIOztBQUVELE9BQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLE9BQUssWUFBTCxHQUFvQixZQUFwQixDQWpFSixDQW1FQTtBQUNDLENBckVBLEVBcUVDLElBckVELENBQUQiLCJmaWxlIjoicGl4aS10aW1lb3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBwaXhpLXRpbWVvdXQgaXMgYSBwbHVnaW4gd2hpY2ggcmVwbGljYXRlcyB0aGUgYmVoYXZpb3VyIG9mIHdpbmRvdy5zZXRUaW1vdXRcbiAqIGJ1dCB1c2VzIFBJWEkuVGlja2VyIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIGFzIHRoZSBtZXRob2Qgb2YgcHJvZ3Jlc3NpbmcgdGltZVxuICogVGhlIGJvbnVzIGlzIHRoYXQgYW55IHRpbWVvdXRzIHdpbGwgYmUgcGF1c2VkIGFuZCByZXN1bWVkIGF1dG9tYXRpY2FsbHkgd2hlblxuICogeW91IGNhbGwgUElYSS5BcHBsaWNhdGlvbi5zdG9wICYgUElYSS5BcHBsaWNhdGlvbi5zdGFydFxuICovXG4oZnVuY3Rpb24gaW5pdChwaXhpKVxue1xuICAgIGlmICghcGl4aSlcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBJWEkgd2FzIG5vdCBmb3VuZFwiKVxuICAgIH1cblxuICAgIGlmICghcGl4aS50aWNrZXIgfHwgIXBpeGkudGlja2VyLnNoYXJlZClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBJWEkudGlja2VyIHdhcyBub3QgZm91bmRcIilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdGltZW91dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge251bWJlcn0gICAgc2VjcyAgVGhlIHNlY29uZHNcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIGNiICAgIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGZpcmUgYWZ0ZXIgdGltZW91dFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gICAgVGltZXIgc3RhdGUgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0VGltZW91dChzZWNzLCBjYilcbiAgICB7XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IDBcblxuICAgICAgICBjb25zdCB0aWNrZXIgPSAoKGRlbHRhKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBwcm9ncmVzcyArPSBkZWx0YTtcblxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IHByb2dyZXNzIC8gKDYwICogcGl4aS50aWNrZXIuc2hhcmVkLnNwZWVkKTtcblxuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPiBzZWNzKSBlbmQodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVuZCA9IChmaXJlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBwaXhpLnRpY2tlci5zaGFyZWQucmVtb3ZlKHRpY2tlcik7XG5cbiAgICAgICAgICAgIGlmIChmaXJlKSBjYigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xlYXIgPSAoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBlbmQoZmFsc2UpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZmluaXNoID0gKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZW5kKHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN0YXJ0XG4gICAgICAgIHBpeGkudGlja2VyLnNoYXJlZC5hZGQodGlja2VyKTtcblxuICAgICAgICByZXR1cm4geyBjbGVhciwgZmluaXNoIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGEgdGltZW91dCwgcHJldmVudGluZyB0aGUgZnVuY3Rpb24gZnJvbSBiZWluZyBmaXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgdGltZXJPYmogIEEgdGltZXIgc3RhdGUgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xlYXJUaW1lb3V0KHRpbWVyT2JqKVxuICAgIHtcbiAgICAgICAgdGltZXJPYmouY2xlYXIoKVxuICAgIH1cblxuICAgIHBpeGkuc2V0VGltZW91dCA9IHNldFRpbWVvdXRcbiAgICBwaXhpLmNsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dFxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbn0oUElYSSkpO1xuIl19