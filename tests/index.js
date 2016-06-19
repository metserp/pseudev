var Pseudev, sender, should;

should = require('should');

Pseudev = require('../dist/pseudev.commonjs');

sender = new Pseudev();

describe('Test basics', function() {
  return it('should field calls', function() {
    should(sender).have.property("calls");
    should(sender).have.property("add");
    should(sender).have.property("to");
    return should(sender).have.property("remove");
  });
});

describe('Test create events', function() {
  it('should create new event listener', function() {
    var call, length;
    sender.add("Testing:ONE", function() {
      return true;
    });
    length = 0;
    for (call in sender.calls) {
      length += 1;
    }
    return should(length).equal(1);
  });
  return it('should add function in old event listener', function() {
    var call, length;
    sender.add("Testing:ONE", function() {
      return true;
    });
    length = 0;
    for (call in sender.calls) {
      length += 1;
    }
    should(length).equal(1);
    return should(sender.calls["Testing:ONE"].length).equal(2);
  });
});

describe('Test call all events', function() {
  it('should call all functions', function() {
    var calls;
    calls = 0;
    sender.add("Testing:TWO", function() {
      calls += 1;
      return true;
    });
    sender.add("Testing:TWO", function() {
      calls += 1;
      return true;
    });
    sender.to("Testing:TWO", void 0);
    return should(calls).equal(2);
  });
  return it('should call object-owner', function() {
    var called_object, owner;
    owner = {
      send: true
    };
    called_object = void 0;
    sender.add("Testing:THREE", (function() {
      return called_object = this;
    }), owner);
    sender.to("Testing:THREE");
    should(called_object).be.a.Object();
    return should(called_object === owner).be["true"];
  });
});

describe('Test remove events', function() {
  return it('should remove only one callback', function() {
    var owner, owner2;
    owner = {
      send: true
    };
    owner2 = {};
    sender.add("Testing:FOUR", (function() {}), owner2);
    sender.add("Testing:FOUR", function() {});
    sender.add("Testing:FOUR", function() {});
    sender.add("Testing:FOUR", function() {});
    sender.add("Testing:FOUR", (function() {}), owner);
    sender.remove("Testing:FOUR", owner);
    should.exists(sender.calls["Testing:FOUR"]);
    should(sender.calls["Testing:FOUR"].length).equal(4);
    sender.remove("Testing:FOUR", owner2);
    should.exists(sender.calls["Testing:FOUR"]);
    should(sender.calls["Testing:FOUR"].length).equal(3);
    sender.remove("Testing:FOUR", void 0);
    return should.not.exists(sender.calls["Testing:FOUR"]);
  });
});
