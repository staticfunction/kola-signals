/**
 * Created by jcabresos on 2/15/14.
 */
export class Dispatcher<T> {

    listeners: Listener[];

    constructor() {
        this.listeners = [];
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
        this.listeners = [];
    }

    numListeners():number {
        return this.listeners.length;
    }

    dispatch(payload?: T):void {
        var newListeners: Listener[] = [];


        for(var i = 0; i < this.listeners.length; i++) {

            var listener = this.listeners[i];

            if(listener.receiveSignal(payload))
                newListeners.push(listener);
        }

        this.listeners = newListeners;
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