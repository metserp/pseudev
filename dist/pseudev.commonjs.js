var Pseudev,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Pseudev = (function() {
  function Pseudev() {
    this.remove = bind(this.remove, this);
    this.add = bind(this.add, this);
    this.to = bind(this.to, this);
  }

  Pseudev.prototype.calls = {};

  Pseudev.prototype.to = function(call, data) {
    var event, i, len, ref;
    if (typeof this.calls[call] === "object") {
      ref = this.calls[call];
      for (i = 0, len = ref.length; i < len; i++) {
        event = ref[i];
        event.func.call(event.owner, data);
      }
    }
    return true;
  };

  Pseudev.prototype.add = function(call, func, owner) {
    if (typeof owner === "undefined") {
      owner = this;
    }
    if (typeof this.calls[call] !== "object") {
      this.calls[call] = [];
    }
    this.calls[call].push({
      func: func,
      owner: owner
    });
    return true;
  };

  Pseudev.prototype.remove = function(call, owner) {
    var dels, index;
    if (typeof owner === "undefined") {
      owner = this;
    }
    if (typeof this.calls[call] === "object") {
      dels = [];
      for (index in this.calls[call]) {
        if (this.calls[call][index].owner === owner) {
          dels.push(index);
        }
      }
      for (index in dels) {
        this.calls[call].splice(dels[index] - index, 1);
      }
      if (this.calls[call].length === 0) {
        delete this.calls[call];
      }
    }
    return true;
  };

  return Pseudev;

})();

module.exports = Pseudev;
