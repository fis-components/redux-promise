'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = promiseMiddleware;

var _fluxStandardAction = require('flux-standard-action');

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function promiseMiddleware(next) {
  return function (action) {
    if (!_fluxStandardAction.isFSA(action)) return action.then(next);

    return isPromise(action.body) ? action.body.then(function (result) {
      return next(_extends({}, action, { body: result, status: 'success' }));
    }, function (error) {
      return next(_extends({}, action, { body: error, status: 'error' }));
    }) : next(action);
  };
}

module.exports = exports['default'];