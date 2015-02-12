!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),(o.kola||(o.kola={})).signals=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by jcabresos on 2/15/14.
 */
var signalCount = 0;
function generateSignalId() {
    var nextId = signalCount++;
    return nextId;
}
var SignalDispatcher = (function () {
    function SignalDispatcher() {
        this.listeners = {};
        this.numListeners = 0;
    }
    SignalDispatcher.prototype.addListener = function (listener) {
        this.listeners[listener.id] = listener;
        this.numListeners++;
    };
    SignalDispatcher.prototype.removeListener = function (listener) {
        this.listeners[listener.id] = undefined;
        this.numListeners--;
    };
    SignalDispatcher.prototype.removeAllListeners = function () {
        this.listeners = {};
        this.numListeners = 0;
    };
    SignalDispatcher.prototype.getListenersLength = function () {
        return this.numListeners;
    };
    SignalDispatcher.prototype.dispatch = function (payload) {
        var listenersTmp = {};
        for (var id in this.listeners) {
            var listener = this.listeners[id];
            if (listener) {
                listener.receiveSignal(payload);
                if (listener.callOnce) {
                    this.removeListener(listener);
                    continue;
                }
                listenersTmp[id] = this.listeners[id];
            }
        }
        this.listeners = listenersTmp;
    };
    return SignalDispatcher;
})();
exports.SignalDispatcher = SignalDispatcher;
var SignalListener = (function () {
    function SignalListener(callback, target, callOnce) {
        this.id = generateSignalId();
        this.callback = callback;
        this.target = target;
        this.callOnce = callOnce;
    }
    SignalListener.prototype.receiveSignal = function (payload) {
        this.callback.call(this.target, payload);
    };
    return SignalListener;
})();
exports.SignalListener = SignalListener;

},{}]},{},[1])(1)
});