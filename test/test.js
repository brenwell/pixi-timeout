const sinon = require('sinon')
const assert = require('chai').assert

// mock the window & canvas
require('jsdom-global')()
require('canvas-prebuilt')

require('pixi.js')
require('../lib/pixi-timeout.js')


describe('Creation', () => {

    it('PIXI.setTimeout should exist', () => {
        assert.exists(PIXI.setTimeout)
        assert.isFunction(PIXI.setTimeout)
    });

    it('PIXI.clearTimeout should exist', () => {
        assert.exists(PIXI.clearTimeout)
        assert.isFunction(PIXI.clearTimeout)
    });

});

describe('Timer Object', () => {

    it('PIXI.setTimeout should return timerObject', () => {
        const callback = sinon.spy()
        const timer = PIXI.setTimeout(2,callback)
        assert.property(timer, 'clear', 'finish');
        assert.isFunction(timer.clear)
        assert.isFunction(timer.finish)
    });

});
