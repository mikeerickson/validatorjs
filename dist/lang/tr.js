require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lang/tr":[function(require,module,exports){
module.exports = {
  accepted: ':attribute kabul edilmeli.',
  alpha: ':attribute alanı sadece harflerden oluşabilir.',
  alpha_dash: ':attribute alanı sadece alfa-nümerik, tire ve alt çizgi karakterlerden oluşabilir.',
  alpha_num: ':attribute alanı alfa-nümerik olmalıdır.',
  between: ':attribute alanı :min ile :max arasında olabilir.',
  confirmed: ':attribute uyuşmuyor.',
  email: ':attribute formatı geçersiz.',
  date: ':attribute geöerli bir tarih alanı değil.',
  def: ':attribute hatalar içeriyor.',
  digits: ':attribute sadece rakamlardan oluşabilir.',
  different: ':attribute ve :different farklı olmalı.',
  'in': 'Seçilen :attribute geçerli değil.',
  integer: ':attribute tam sayı olmalı.',
  min: {
    numeric: ':attribute en az :min olmalı.',
    string: ':attribute en az :min karakter uzunluğunda olmalı.'
  },
  max: {
    numeric: ':attribute en çok :max olabilir.',
    string: ':attribute uzunluğu en çok :max karakter uzunluğunda olabilir.'
  },
  not_in: 'Seçilen :attribute geçerli değil.',
  numeric: ':attribute sayı olmalı.',
  present: ':attribute alanı bulunmalıdır (ancak boş olabilir).',
  required: ':attribute alanı gerekli.',
  required_if: ':attribute alanı :other alanı :value olduğunda gerekli.',
  same: ':attribute ve :same aynı olmalı.',
  size: {
    numeric: ':attribute :size olmalı.',
    string: ':attribute :size karakter uzunluğunda olmalı.'
  },
  string: ':attribute alfa-numerik olmalı.',
  url: ':attribute formatı geçersiz.',
  regex: ':attribute formatı geçersiz.',
  attributes: {}
};

},{}]},{},[]);
