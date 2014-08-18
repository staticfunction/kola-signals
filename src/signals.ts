/**
 * Created by jcabresos on 2/15/14.
 */
var signalCount:number = 0;
function generateSignalId():number {
    var nextId:number = signalCount++;
    return nextId;
}

export class SignalDispatcher<T> {

    listeners:{[id: number]: SignalListener<T>};

    private numListeners:number;

    constructor() {
        this.listeners = {};
        this.numListeners = 0;
    }

    addListener(listener:SignalListener<T>):void {
        this.listeners[listener.id] = listener;
        this.numListeners++;
    }

    removeListener(listener:SignalListener<T>):void {
        this.listeners[listener.id] = undefined;
        this.numListeners--;
    }

    getListenersLength():number {
        return this.numListeners;
    }

    dispatch(payload:T):void {
        for(var id in this.listeners) {
            var listener = this.listeners[id];
            if(listener) {
                listener.receiveSignal(payload);
                if(listener.callOnce) {
                    this.removeListener(listener);
                }
            }
        }
    }
}

export class SignalListener<T> {

    callback: (payload:T) => void;
    target: any;
    callOnce: boolean;

    id:number;

    constructor(callback:(payload:T) => void, target?:any, callOnce?: boolean) {
        this.id = generateSignalId();
        this.callback = callback;
        this.target = target;
        this.callOnce = callOnce;
    }

    receiveSignal(payload:T):void {
        this.callback.call(this.target, payload);
    }
}