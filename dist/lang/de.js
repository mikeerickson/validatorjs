require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lang/de":[function(require,module,exports){
module.exports = {
  accepted: 'Das :attribute Feld muss akzeptiert werden.',
  after: 'Das :attribute muss ein Datum nach dem :after sein.',
  after_or_equal: 'Das :attribute Datum muss kleiner oder gleich dem :after_or_equal sein.',
  alpha: 'Das :attribute Feld darf nur aus Buchstaben bestehen.',
  alpha_dash: 'Das :attribute Feld darf nur aus Buchstaben, Zahlen, Binde- und Unterstrichen bestehen.',
  alpha_num: 'Das :attribute Feld darf nur aus Buchstaben und Zahlen bestehen.',
  before: 'Das :attribute muss ein Datum vor dem :before sein.',
  before_or_equal: 'Das :attribute Datum muss größer oder gleich dem :before_or_equal sein.',
  between: 'Das :attribute Feld muss zwischen :min und :max liegen.',
  confirmed: 'Das :attribute Feld stimmt nicht mit der Bestätigung überein.',
  email: 'Das :attribute Format ist ungültig.',
  date: 'Das :attribute Feld muss ein gültiges Datum sein.',
  def: 'Das :attribute Feld hat Fehler.',
  digits: 'Das :attribute Feld muss :digits Stellen haben.',
  different: 'Die Felder :attribute und :different müssen sich unterscheiden.',
  'in': 'Der gewählte Wert für :attribute ist ungültig.',
  integer: 'Das :attribute Feld muss eine ganze Zahl sein.',
  min: {
    numeric: 'Das :attribute Feld muss mindestens :min sein.',
    string: 'Das :attribute Feld muss mindestens :min Zeichen lang sein.'
  },
  max: {
    numeric: 'Das :attribute Feld darf maximal :max sein.',
    string: 'Das :attribute Feld darf maximal :max Zeichen haben.'
  },
  not_in: 'Der gewählte Wert für :attribute ist ungültig.',
  numeric: 'Das :attribute Feld muss eine Zahl sein.',
  present: 'Das Feld :attribute muss vorhanden sein (kann aber leer sein).',
  required: 'Das :attribute Feld muss ausgefüllt sein.',
  required_if: 'Das :attribute Feld muss ausgefüllt sein, wenn :other :value ist.',
  same: 'Die Felder :attribute und :same müssen übereinstimmen.',
  size: {
    numeric: 'Das :attribute Feld muss gleich :size sein.',
    string: 'Das :attribute Feld muss :size Zeichen lang sein.'
  },
  string: 'Das :attribute Feld muss ein Satz sein.',
  url: 'Das Format von :attribute ist ungültig.',
  regex: 'Das :attribute Format ist ungültig.',
  attributes: {}
};

},{}]},{},[]);
