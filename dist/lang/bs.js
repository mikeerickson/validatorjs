require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/bs":[function(require,module,exports){
module.exports = {
  accepted: "Polje :attribute mora biti prihvaćeno.",
  active_url: "Polje :attribute nije validan URL.",
  after: "Polje :attribute mora biti datum poslije :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Polje :attribute može sadržati samo slova.",
  alpha_dash: "Polje :attribute može sadržati samo slova, brojeve i povlake.",
  alpha_num: "Polje :attribute može sadržati samo slova i brojeve.",
  attributes: {},
  array: "Polje :attribute mora biti niz.",
  before: "Polje :attribute mora biti datum prije :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Polje :attribute mora biti izmedju :min - :max.",
    file: "Fajl :attribute mora biti izmedju :min - :max kilobajta.",
    string: "Polje :attribute mora biti izmedju :min - :max karaktera.",
    array: "Polje :attribute mora biti između :min - :max karaktera."
  },
  boolean: "Polje :attribute mora biti tačno ili netačno",
  confirmed: "Potvrda polja :attribute se ne poklapa.",
  date: "Polje :attribute nema ispravan datum.",
  date_format: "Polje :attribute nema odgovarajući format :format.",
  different: "Polja :attribute i :other moraju biti različita.",
  digits: "Polje :attribute mora da sadži :digits brojeve.",
  digits_between: "Polje :attribute mora biti između :min i :max broja.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Format polja :attribute mora biti validan email.",
  exists: "Odabrano polje :attribute nije validno.",
  file: "The :attribute must be a file.",
  filled: "Polje :attribute je obavezno.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Polje :attribute mora biti slika.",
  in: "Odabrano polje :attribute nije validno.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Polje :attribute mora biti broj.",
  ip: "Polje :attribute mora biti validna IP adresa.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Polje :attribute mora biti manje od :max.",
    file: "Polje :attribute mora biti manje od :max kilobajta.",
    string: "Polje :attribute mora sadržati manje od :max karaktera.",
    array: "Polje :attribute mora sadržati manje od :max karaktera."
  },
  mimes: "Polje :attribute mora biti fajl tipa: :values.",
  mimetypes: "Polje :attribute mora biti fajl tipa: :values.",
  min: {
    numeric: "Polje :attribute mora biti najmanje :min.",
    file: "Fajl :attribute mora biti najmanje :min kilobajta.",
    string: "Polje :attribute mora sadržati najmanje :min karaktera.",
    array: "Polje :attribute mora sadržati najmanje :min karaktera."
  },
  not_in: "Odabrani element polja :attribute nije validan.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Polje :attribute mora biti broj.",
  present: "The :attribute field must be present.",
  regex: "Polje :attribute ima neispravan format.",
  required: "Polje :attribute je obavezno.",
  required_if: "Polje :attribute je obavezno kada :other je :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Polje :attribute je obavezno kada je :values prikazano.",
  required_with_all: "Polje :attribute je obavezno kada je :values prikazano.",
  required_without: "Polje :attribute je obavezno kada :values nije prikazano.",
  required_without_all: "Polje :attribute je obavezno kada nijedno :values nije prikazano.",
  same: "Polja :attribute i :other se moraju poklapati.",
  size: {
    numeric: "Polje :attribute mora biti :size.",
    file: "Fajl :attribute mora biti :size kilobajta.",
    string: "Polje :attribute mora biti :size karaktera.",
    array: "Polje :attribute mora biti :size karaktera."
  },
  string: "Polje :attribute mora sadrzavati slova.",
  timezone: "Polje :attribute mora biti ispravna vremenska zona.",
  unique: "Polje :attribute već postoji.",
  uploaded: "The :attribute failed to upload.",
  url: "Format polja :attribute nije validan."
};

},{}]},{},[]);
