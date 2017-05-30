require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lang/es":[function(require,module,exports){
module.exports = {
  accepted: 'El campo :attribute debe ser aceptado.',
  after: 'El campo :attribute debe ser una fecha posterior a :after.',
  alpha: 'El campo :attribute solo debe contener letras.',
  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
  alpha_num: 'El campo :attribute solo debe contener letras y números.',
  attributes: {},
  between: 'El campo :attribute tiene que estar entre :min - :max.',
  confirmed: 'La confirmación de :attribute no coincide.',
  different: 'El campo :attribute y :other deben ser diferentes.',
  digits: 'El campo :attribute debe tener :digits dígitos.',
  email: 'El campo :attribute no es un correo válido.',
  'in': 'El campo :attribute es inválido.',
  integer: 'El campo :attribute debe ser un número entero.',
  max: {
    numeric: 'El campo :attribute no debe ser mayor a :max.',
    string: 'El campo :attribute no debe ser mayor que :max caracteres.'
  },
  min: {
    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
    string: 'El campo :attribute debe contener al menos :min caracteres.'
  },
  not_in: 'El campo :attribute es inválido.',
  numeric: 'El campo :attribute debe ser numérico.',
  present: 'El campo de :attribute debe estar presente (pero puede estar vacío).',
  regex: 'El formato del campo :attribute es inválido.',
  required: 'El campo :attribute es obligatorio.',
  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
  same: 'El campo :attribute y :other deben coincidir.',
  size: {
    numeric: 'El tamaño del campo :attribute debe ser :size.',
    string: 'El campo :attribute debe contener :size caracteres.'
  },
  url: 'El formato de :attribute es inválido.'
};

},{}]},{},[]);
