require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/ca":[function(require,module,exports){
module.exports = {
  accepted: 'El camp :attribute pot ser aceptat.',
  after: 'El camp :attribute pot ser una data posterior a :after.',
  alpha: 'El camp :attribute només pot contenir lletras.',
  alpha_dash: 'El camp :attribute només pot contenir lletras, nombres y guions.',
  alpha_num: 'El camp :attribute només pot contenir lletras y nombres.',
  attributes: {},
  between: 'El camp :attribute té que estar entre :min - :max.',
  confirmed: 'La confirmació de :attribute no coincideix.',
  different: 'El camp :attribute y :other poden ser diferents.',
  digits: 'El camp :attribute pot tindre :digits dígitos.',
  digits_between: 'El camp  :attribute ha de tenir entre :min i :max dígits.',
  email: 'El camp :attribute no es un correu válido.',
  'in': 'El camp :attribute es invàlid.',
  integer: 'El camp :attribute pot ser un nombre enter.',
  hex: 'El camp :attribute hauria de tenir format hexadecimal',
  max: {
    numeric: 'El camp :attribute no pot ser mayor a :max.',
    string: 'El camp :attribute no pot ser mayor que :max caràcters.'
  },
  min: {
    numeric: 'La mida del camp :attribute pot ser de al menys :min.',
    string: 'El camp :attribute pot contenir al menys :min caràcters.'
  },
  not_in: 'El camp :attribute es invàlid.',
  numeric: 'El camp :attribute pot ser numéric.',
  present: 'El camp de :attribute pot estar present (però pot estar buit).',
  regex: 'El format del camp :attribute es invàlid.',
  required: 'El camp :attribute es obligatori.',
  required_if: 'El camp :attribute es obligatori quan :other es :value.',
  same: 'El camp :attribute y :other poden coincidir.',
  size: {
    numeric: 'La mida del camp :attribute pot ser :size.',
    string: 'El camp :attribute pot contenir :size caràcters.'
  },
  url: 'El format de :attribute es invàlid.'
};

},{}]},{},[]);
