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
