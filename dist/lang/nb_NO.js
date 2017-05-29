require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lang/nb_NO":[function(require,module,exports){
module.exports = {
  accepted: ':attribute må være akseptert.',
  alpha: ':attribute feltet kan kun inneholde alfabetiske tegn.',
  alpha_dash: ':attribute feltet kan kun inneholde alfanumeriske tegn, i tillegg til bindestreker og understreker.',
  alpha_num: ':attribute feltet må være alfanumerisk.',
  between: ':attribute feltet må være mellom :min og :max.',
  confirmed: ':attribute feltet stemmer ikke overens med bekreftelsen.',
  email: ':attribute formatet er ugyldig.',
  date: ':attribute er et ugyldig datoformat.',
  def: ':attribute attributtet har feil.',
  digits: ':attribute må være på :digits siffer.',
  different: ':attribute og :different må være forskjellige.',
  'in': 'Den oppgitte verdien for :attribute er ugyldig.',
  integer: ':attribute må være et heltall.',
  min: {
    numeric: ':attribute må minst være :min.',
    string: ':attribute må være på minst :min tegn.'
  },
  max: {
    numeric: ':attribute kan ikke være større enn :max.',
    string: ':attribute kan maks ha :max tegn.'
  },
  'not_in': 'Den oppgitte verdien for :attribute er ugyldig.',
  numeric: ':attribute må være et tall.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute feltet er påkrevd.',
  required_if: ':attribute er påkrevd når :other er :value.',
  same: ':attribute og :same må være like.',
  size: {
    numeric: ':attribute må ha størrelsen :size.',
    string: ':attribute må ha :size tegn.'
  },
  string: ':attribute må være tekst.',
  url: ':attribute formatet er ugyldig.',
  regex: ':attribute formatet er ugyldig.',
  attributes: {}
};

},{}]},{},[]);
