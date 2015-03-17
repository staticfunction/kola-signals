# Kola Signals

Statically-Typed For U implementation of signals. Use with Typescript but you can also use it for Javascript/Coffeescript.

## Install via:

```shell
    npm install kola-signals --save
```

## Quick guide

```typescript

import signals = require('kola-signals');

var messenger:signals.Dispatcher<string> = new signals.Dispatcher<string>();

var receiver = (msg: string) => {
    console.log("message received!", msg);
}

messenger.listen(receiver);

messenger.dispatch("Hello Awesomeness!");

```

## Use it in classes

```typescript
import signals = require('kola-signals');

var smsService = new signals.Dispatcher<string>();

class Phone {

    msgs: string[];

    constructor() {
        this.msgs = [];
    }

    onReceiveMsg(msg:string):void {
        console.log("Message received!", msg);
        this.msgs.push(msg);
    }
}

var phone: Phone = new Phone();

smsService.listen(phone.onReceiveMsg, phone);

smsService.dispatch("Hi there!");
```
NOTE: In this example, we pass in the 'phone' as second argument for listen(). It allows the onReceiveMsg() to be called with 'this' as the 'phone' instance.


## Call once
```typescript
import signals = require('kola-signals');

smsDispatcher.listen(onceAFunction, null, true);
```

## Unlisten
The listen() method of signals.Dispatcher returns an instance of signals.Listener. You can use this instance to call unlisten() like so:

```typescript

var listener = smsService.listen(onReceiveMsg);

...

listener.unlisten();

```