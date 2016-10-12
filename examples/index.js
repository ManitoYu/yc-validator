'use strict'

let validate = require('../index').validate
let validator = require('../index').validator
let validators = require('../index').validators

let checker = {
  name: validators(
    validator(v => !! v, 'name should not be empty'),
    validator(v => /^.{1,10}$/.test(v), 'name length should be 1 to 10')
  ),
  age: validators(
    validator(v => /^\d{1,3}$/.test(v), 'age length should be 1 to 3')
  )
}

let result = validate(checker, {
  name: 'yucongyucong',
  age: 10000
})

console.log(result)
