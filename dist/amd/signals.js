define(["require", "exports"], function (require, exports) {
    /**
     * Created by jcabresos on 2/15/14.
     */
    var Dispatcher = (function () {
        function Dispatcher() {
            this.listeners = [];
        }
        Dispatcher.prototype.listen = function (callback, target, callOnce) {
            var listener = new Listener(callback, target, callOnce);
            this.listeners.push(listener);
            return listener;
        };
        Dispatcher.prototype.removeAllListeners = function () {
            this.listeners = [];
        };
        Dispatcher.prototype.numListeners = function () {
            return this.listeners.length;
        };
        Dispatcher.prototype.dispatch = function (payload) {
            var newListeners = [];
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                if (listener.receiveSignal(payload))
                    newListeners.push(listener);
            }
            this.listeners = newListeners;
        };
        return Dispatcher;
    })();
    exports.Dispatcher = Dispatcher;
    var Listener = (function () {
        function Listener(callback, target, callOnce) {
            var _this = this;
            this.target = target;
            this.callOnce = callOnce;
            this.receiveSignal = function (payload) {
                callback.apply(target, [payload]);
                return _this.callOnce != true;
            };
        }
        Listener.prototype.unlisten = function () {
            this.receiveSignal = function (payload) {
                return false;
            };
        };
        return Listener;
    })();
    exports.Listener = Listener;
});
