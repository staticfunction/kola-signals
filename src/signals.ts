/**
 * Created by jcabresos on 2/15/14.
 */
export class Dispatcher<T> {

    listeners: Listener[];

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

    removeAllListeners():void {
        this.listeners = {};
        this.numListeners = 0;
    }

    getListenersLength():number {
        return this.numListeners;
    }

    dispatch(payload?: T):void {
        var listenersTmp: {[s: string]: SignalListener<T>} = {};

        for(var id in this.listeners) {
            var listener = this.listeners[id];
            if(listener) {
                listener.receiveSignal(payload);

                if(listener.callOnce) {
                    this.removeListener(listener);
                    continue;
                }

                listenersTmp[id] = this.listeners[id];
            }
        }

        this.listeners = listenersTmp;
    }
}

export class Listener<T> {

    callback: (payload?: T) => void;
    target: any;
    callOnce: boolean;

    id:number;

    constructor(callback:(payload?: T) => void, target?:any, callOnce?: boolean) {
        this.id = generateSignalId();
        this.callback = callback;
        this.target = target;
        this.callOnce = callOnce;
    }

    receiveSignal(payload?: T):void {
        this.callback.call(this.target, payload);
    }
}