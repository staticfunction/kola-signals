/**
 * Created by jcabresos on 2/15/14.
 */
export class Dispatcher<T> {

    listeners: Listener[];

    constructor() {
        this.listeners = [];
    }

    listen(callback: (payload?: T) => any, target?: any, callOnce?: boolean): Listener<T> {
        var listener = new Listener(callback, target, callOnce);
        this.listeners.push(listener);
        return listener;
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

    target: any;
    callOnce: boolean;
    receiveSignal: (payload?: T) => boolean;

    constructor(callback:(payload?: T) => void, target?:any, callOnce?: boolean) {
        this.target = target;
        this.callOnce = callOnce;

        this.receiveSignal = (payload?: T) => {
            callback.apply(this.target, payload);
            return this.callOnce != true;
        }
    }

    unlisten(): void {
        this.receiveSignal = (payload?: T) => {
            return false;
        }
    }
}