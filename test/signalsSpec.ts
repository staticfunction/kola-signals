/**
 * Created by staticfunction on 8/17/14.
 */
import sinon = require('sinon');
import should = require('should');
import signals = require('../src/signals');

class Phone {

    displayMsg;
    smsSignalReceiver:signals.SignalListener<string>;

    constructor() {
        this.displayMsg = sinon.spy();
        this.smsSignalReceiver = new signals.SignalListener<string>(this.onReceiveMsg, this);
    }

    onReceiveMsg(msg:string):void {
        this.displayMsg(msg);
    }
}

describe("SignalDispatcher tests", () => {
    var smsDispatcher:signals.SignalDispatcher<string> = new signals.SignalDispatcher<string>();

    var phone1:Phone = new Phone();
    var phone2:Phone = new Phone();

    it("adds listeners", () => {
        smsDispatcher.addListener(phone1.smsSignalReceiver);
        smsDispatcher.addListener(phone2.smsSignalReceiver);
        should.equal(smsDispatcher.getListenersLength(), 2);
    });

    it("dispatches message to listeners", () => {
        smsDispatcher.dispatch("Hello World");
        should.ok(phone1.displayMsg.calledOnce, "Called more than once or never been called");
        should.ok(phone1.displayMsg.calledWith("Hello World"), "Phone not called with 'Hello World'");

        should.ok(phone2.displayMsg.calledOnce, "Called more than once or never been called");
        should.ok(phone2.displayMsg.calledWith("Hello World"), "Phone not called with 'Hello World'");
    });

    it("removes listeners", () => {
        phone1.displayMsg.reset();
        phone2.displayMsg.reset();

        smsDispatcher.removeListener(phone1.smsSignalReceiver);

        smsDispatcher.dispatch("Hello World 2");

        should.ok(phone1.displayMsg.notCalled, "Called when it shouldn't have been");
        should.ok(phone2.displayMsg.calledOnce, "Called more than once or never");
        should.ok(phone2.displayMsg.calledWith("Hello World 2"));

        should.equal(smsDispatcher.getListenersLength(), 1);
    });

    it("calls once", () => {
        var onceAFunction = sinon.spy();
        var onceAListener:signals.SignalListener<string> = new signals.SignalListener(onceAFunction, null, true);

        smsDispatcher.addListener(onceAListener);

        smsDispatcher.dispatch("Hello");
        smsDispatcher.dispatch("Hello");
        smsDispatcher.dispatch("Hello");

        should.ok(onceAFunction.calledOnce, "Should only be called once");
        should.ok(onceAFunction.calledWith, "Hello");
    })
});