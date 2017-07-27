require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lang/fr":[function(require,module,exports){
module.exports = {
  accepted: 'Le champs :attribute doit être accepté.',
  alpha: 'Le champs :attribute ne peut contenir que des caractères alphabétiques.',
  alpha_dash: 'Le champs :attribute ne peut contenir que des caractères alphanumériques, des tirets et underscores.',
  alpha_num: 'Le champs :attribute doit être alphanumérique.',
  between: 'Le champs :attribute doit être compris entre :min and :max.',
  confirmed: 'Le champs :attribute ne correspond pas.',
  email: 'Le champs :attribute contient un format invalide.',
  def: 'Le champs :attribute contient un attribut erroné.',
  digits: 'Le champs :attribute doit être de :digits chiffres.',
  different: 'Le champs :attribute et :different doivent être differents.',
  'in': 'Le champs :attribute est invalide.',
  integer: 'Le champs :attribute doit être un entier.',
  min: {
    numeric: 'Le champs :attribute doit être contenir au moins :min.',
    string: 'Le champs :attribute doit être contenir au moins :min caractères.'
  },
  max: {
    numeric: 'Le champs :attribute ne doit être supérieur à :max.',
    string: 'Le champs :attribute ne doit être plus de :max characters.'
  },
  not_in: 'Le champs :attribute est invalide.',
  numeric: 'Le champs :attribute doit être un numéro.',
  present: 'Le champ :attribute doit être présent (mais peut être vide).',
  required: 'Le champs :attribute est obligatoire.',
  required_if: 'Le champs :attribute est obligatoire quand :other est :value.',
  same: 'Le champs :attribute et :same doivent correspondre.',
  size: {
    numeric: 'La taille du champs :attribute doit être :size.',
    string: 'La taille du champs :attribute doit être de :size caractères.'
  },
  url: 'Le format du champs :attribute est invalide.',
  regex: 'Le format du champs :attribute est invalide.',
  attributes: {}
};

},{}]},{},[]);
