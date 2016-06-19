should = require('should')
Pseudev = require( '../dist/pseudev.commonjs' )

sender = new Pseudev()

describe 'Test basics', ->
  it 'should field calls', ->
    should(sender).have.property "calls"
    should(sender).have.property "add"
    should(sender).have.property "to"
    should(sender).have.property "remove"

describe 'Test create events', ->
  it 'should create new event listener', ->
    sender.add "Testing:ONE", -> return true
    length = 0
    length += 1 for call of sender.calls
    should(length).equal 1

  it 'should add function in old event listener', ->
    sender.add "Testing:ONE", -> return true
    length = 0
    length += 1 for call of sender.calls
    should(length).equal 1
    should(sender.calls["Testing:ONE"].length).equal 2

describe 'Test call all events', ->
  it 'should call all functions', ->
    calls = 0
    sender.add "Testing:TWO", ->
      calls += 1
      return true

    sender.add "Testing:TWO", ->
      calls +=1
      return true

    sender.to "Testing:TWO", undefined

    should(calls).equal 2

  it 'should call object-owner', ->
    owner = { send: true }
    called_object = undefined

    sender.add "Testing:THREE", (->
      called_object = @
      ), owner

    sender.to "Testing:THREE"

    should(called_object).be.a.Object()
    should(called_object is owner).be.true

describe 'Test remove events', ->
  it 'should remove only one callback', ->
    owner = { send: true }
    owner2 = {}

    sender.add "Testing:FOUR", (->), owner2
    sender.add "Testing:FOUR", ->
    sender.add "Testing:FOUR", ->
    sender.add "Testing:FOUR", ->
    sender.add "Testing:FOUR", (->
      ), owner

    sender.remove "Testing:FOUR", owner

    should.exists sender.calls["Testing:FOUR"]
    should(sender.calls["Testing:FOUR"].length).equal 4

    sender.remove "Testing:FOUR", owner2

    should.exists sender.calls["Testing:FOUR"]
    should(sender.calls["Testing:FOUR"].length).equal 3

    sender.remove "Testing:FOUR", undefined
    should.not.exists sender.calls["Testing:FOUR"]
