declare module "kola-signals" {
    export class SignalDispatcher<T> {
        listeners: {
            [id: number]: SignalListener<T>;
        };
        private numListeners;
        constructor();
        addListener(listener: SignalListener<T>): void;
        removeListener(listener: SignalListener<T>): void;
        removeAllListeners(): void;
        getListenersLength(): number;
        dispatch(payload?: T): void;
    }
    export class SignalListener<T> {
        callback: (payload?: T) => void;
        target: any;
        callOnce: boolean;
        id: number;
        constructor(callback: (payload?: T) => void, target?: any, callOnce?: boolean);
        receiveSignal(payload?: T): void;
    }
}