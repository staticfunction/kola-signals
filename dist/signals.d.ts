declare module "kola-signals" {
/**
 * Created by jcabresos on 2/15/14.
 */
export class Dispatcher<T> {
    listeners: Listener<T>[];
    constructor();
    listen(callback: (payload?: T) => any, target?: any, callOnce?: boolean): Listener<T>;
    removeAllListeners(): void;
    numListeners(): number;
    dispatch(payload?: T): void;
}
export class Listener<T> {
    target: any;
    callOnce: boolean;
    receiveSignal: (payload?: T) => boolean;
    constructor(callback: (payload?: T) => any, target?: any, callOnce?: boolean);
    unlisten(): void;
}

}