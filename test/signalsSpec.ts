/**
 * Created by staticfunction on 8/17/14.
 */
import sinon = require('sinon');
import should = require('should');
import signals = require('../src/signals');

class Phone {

    displayMsg;

    constructor() {
        this.displayMsg = sinon.spy();
    }

    onReceiveMsg(msg:string):void {
        this.displayMsg(msg);
    }
}

describe("Dispatcher tests", () => {
    var smsDispatcher:signals.Dispatcher<string> = new signals.Dispatcher<string>();

    var phone1:Phone = new Phone();
    var phone2:Phone = new Phone();
    var phone1Listener: signals.Listener<string>;
    var phone2Listener: signals.Listener<string>;

    it("adds listeners", () => {
        phone1Listener = smsDispatcher.listen(phone1.onReceiveMsg, phone1);
        phone2Listener = smsDispatcher.listen(phone2.onReceiveMsg, phone2);
        should.equal(smsDispatcher.numListeners(), 2);
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

        phone1Listener.unlisten();

        smsDispatcher.dispatch("Hello World 2");

        should.ok(phone1.displayMsg.notCalled, "Called when it shouldn't have been");
        should.ok(phone2.displayMsg.calledOnce, "Called more than once or never");
        should.ok(phone2.displayMsg.calledWith("Hello World 2"));

        should.equal(smsDispatcher.numListeners(), 1);
    });

    it("removes all listeners", () => {
        phone1.displayMsg.reset();
        phone2.displayMsg.reset();

        smsDispatcher.listen(phone1.displayMsg);
        smsDispatcher.listen(phone2.displayMsg);


        smsDispatcher.removeAllListeners();


        should.ok(phone1.displayMsg.notCalled, "Called when it shouldn't have been");
        should.ok(phone2.displayMsg.notCalled, "Called when it shouldn't have been");

        should.equal(smsDispatcher.numListeners(), 0);
    });

    it("calls once", () => {
        var onceAFunction = sinon.spy();
        smsDispatcher.listen(onceAFunction, null, true);

        smsDispatcher.dispatch("Hello");
        smsDispatcher.dispatch("Hello");
        smsDispatcher.dispatch("Hello");

        should.ok(onceAFunction.calledOnce, "Should only be called once");
        should.ok(onceAFunction.calledWith, "Hello");
    })
});