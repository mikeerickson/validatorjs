require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/da":[function(require,module,exports){
module.exports = {
  accepted: ':attribute skal accepteres.',
  after: ':attribute skal være en dato efter :after.',
  after_or_equal: ':attribute skal være en dato efter eller lig med :after_or_equal.',
  alpha: ':attribute må kun bestå af bogstaver.',
  alpha_dash: ':attribute må kun bestå af bogstaver, tal og bindestreger.',
  alpha_num: ':attribute må kun bestå af bogstaver og tal.',
  before: ':attribute skal være en dato før :before.',
  before_or_equal: ':attribute skal være en dato før eller lig med :before_or_equal.',
  between: ':attribute skal være mellem :min og :max.',
  confirmed: ':attribute er ikke det samme som bekræftelsesfeltet.',
  email: ':attribute skal være en gyldig email.',
  date: ':attribute er ikke en gyldig dato.',
  def: ':attribute attributen har fejl.',
  digits: ':attribute skal have :digits cifre.',
  digits_between: ':attribute skal have mellem :min og :max cifre.',
  different: ':attribute og :different skal være forskellige.',
  in: 'Det valgte :attribute er ugyldigt.',
  integer: ':attribute skal være et heltal.',
  hex: ':attribute skal have hexadecimalt format',
  min: {
    numeric: ':attribute skal være mindst :min.',
    string: ':attribute skal være mindst :min tegn.'
  },
  max: {
    numeric: ':attribute skal være højest :max.',
    string: ':attribute skal være højest :max tegn.'
  },
  not_in: 'Den valgte :attribute er ugyldig',
  numeric: ':attribute skal være et tal.',
  present: ':attribute skal være tilstede.',
  required: ':attribute skal udfyldes.',
  required_if: ':attribute skal udfyldes når :other er :value.',
  required_unless: ':attribute er påkrævet medmindre :other findes i :values.',
  required_with: ':attribute skal udfyldes når :field er udfyldt.',
  required_with_all: ':attribute skal udfyldes når :fields er udfyldt.',
  required_without: ':attribute skal udfyldes når :field ikke er udfyldt.',
  required_without_all: ':attribute skal udfyldes når ingen af :fields er udfyldt.',
  same: ':attribute og :same skal være ens.',
  size: {
    numeric: ':attribute skal være :size.',
    string: ':attribute skal være :size tegn lang.'
  },
  string: ':attribute skal være en streng.',
  url: ':attribute formatet er ugyldigt.',
  regex: ':attribute formatet er ugyldigt.',
  attributes: {}
};

},{}]},{},[]);
