# pseudev
Delivery module for event data

[![build status](https://projects.filipov.ws/filipov_a/pseudev/badges/master/build.svg)](https://projects.filipov.ws/filipov_a/pseudev/commits/master)

# Use

    var psdv = new Pseudev();

    psdv.add "Some event", callback, object_owner

    psdv.to "Some event", data //Only one variable

    psdv.remove "Some event", object_owner

# Development & test

    npm install -g mocha gulp
    npm install

    npm test
