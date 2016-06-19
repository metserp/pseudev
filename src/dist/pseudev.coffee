class Pseudev

  calls: {}

  to: (call, data)=>
    if typeof @calls[call] is "object"
      for event in @calls[call]
        event.func.call event.owner, data
    return true

  add: (call, func, owner)=>
    owner = @ if typeof owner is "undefined"
    @calls[call] = [] if typeof @calls[call] isnt "object"
    @calls[call].push {func: func, owner: owner}
    return true

  remove: (call, owner)=>
    owner = @ if typeof owner is "undefined"
    if typeof @calls[call] is "object"
      dels = []
      for index of @calls[call]
        dels.push( index ) if @calls[call][index].owner is owner

      for index of dels
        @calls[call].splice( dels[index] - index, 1 )

      delete @calls[call] if @calls[call].length is 0
    return true
