'use strict'

;((name, context, factory) => {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    context[name] = factory()
  }
})('yc-validate', this, () => {
  const isPlainObject = obj => {
    if (obj == undefined) return false
    if (obj.toString() != '[object Object]') return false
    return true
  }

  const values = obj => {
    let arr = []
    if (! isPlainObject(obj)) return arr
    for (let k in obj) arr.push(obj[k])
    return arr
  }

  const set = (obj, key, value) => {
    if (! isPlainObject(obj)) return obj
    obj[key] = value
    return obj
  }

  const isUndefined = obj => obj === undefined

  const identity = obj => obj

  const reduce = (obj, fn, initial) => {
    for (let k in obj) {
      initial = fn(initial, obj[k], k, obj)
    }
    return initial
  }

  const validator = (func, err) => val => func(val) ? [true, ''] : [false, err]

  const validators = function () {
    let funcs = [].slice.call(arguments)
    return val => reduce(funcs, (a, f) => a[0] ? f(val) : a, [true, ''])
  }

  const validate = (checker, data) => {
    let errors = reduce(checker, (a, v, k) =>
      ! isUndefined(data[k]) ? set(a, k, v(data[k])[1]) : a, {})
    if (values(errors).some(identity)) return errors
  }

  return {
    validate,
    validators,
    validator
  }
})
