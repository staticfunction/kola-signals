export declare class SignalDispatcher<T> {
    public listeners: {
        [id: number]: SignalListener<T>;
    };
    private numListeners;
    constructor();
    public addListener(listener: SignalListener<T>): void;
    public removeListener(listener: SignalListener<T>): void;
    public getListenersLength(): number;
    public dispatch(payload: T): void;
}
export declare class SignalListener<T> {
    public callback: (payload: T) => void;
    public target: any;
    public callOnce: boolean;
    public id: number;
    constructor(callback: (payload: T) => void, target?: any, callOnce?: boolean);
    public receiveSignal(payload: T): void;
}
