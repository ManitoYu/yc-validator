# yc-validate
Composable, scalable, functional schema validator.

## API

### validator(func, err)
The function is base. You can use it alone.

```js
validator(v => !! v, 'should not be empty')('') // [false, 'should not be empty']
validator(v => !! v, 'should not be empty')('value') // [true, '']
```

### validators(...funcs)
The function can combine some validators into single validator.

### validate(checker, data)
The function will start to check the fields which defined in checker.

## Examples

```js
let validate = require('yc-validate').validate
let validator = require('yc-validate').validator
let validators = require('yc-validate').validators

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

console.log(result) // { name: 'name length should be 1 to 10', age: 'age length should be 1 to 3' }
```
