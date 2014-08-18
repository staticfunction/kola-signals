# STFU! Signals

Statically-Typed For U implmentation of signals. Use with Typescript but you can also use it for Javascript/Coffeescript.

## Install via:

```shell
    npm install stfu-signals --save
```

## Quick guide

```typescript

import signals = require('stfu-signals');

var messenger:signals.SignalDispatcher<string> = new signals.SignalDispatcher<string>();

var receiver = (msg: string) => {
    console.log("message received!", msg);
}

messenger.addListener(receiver);

messenger.dispatch("Hello Awesomeness!");

```

## Use it in classes

```typescript
import signals = require('stfu-signals');

var smsService = new signals.SignalDispatcher<string>();

class Phone {

    smsSignalReceiver:signals.SignalListener<string>;

    constructor() {
        this.smsSignalReceiver = new signals.SignalListener<string>(this.onReceiveMsg, this);
    }

    onReceiveMsg(msg:string):void {
        console.log("Message received!", msg);
    }
}

var phone: Phone = new Phone();

smsService.addListener(phone.smsSignalReceiver);

smsService.dispatch("Hi there!");
```

## Call once
```typescript



```