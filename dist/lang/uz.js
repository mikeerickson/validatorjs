
require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/uz":[function(require,module,exports){
module.exports = {
  accepted: 'Вы должны принять :attribute.',
  alpha: 'Поле :attribute может содержать только буквы.',
  alpha_dash: 'Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
  alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
  between: 'Поле :attribute должно быть между :min и :max.',
  confirmed: 'Поле :attribute не совпадает с подтверждением.',
  email: 'Поле :attribute должно быть действительным электронным адресом.',
  def: 'Поле :attribute содержит ошибки.',
  digits: 'Длина цифрового поля :attribute должна быть :digits.',
  digits_between: 'Длинна цифрового поля :attribute должна быть от :min до :max знаков.',
  different: 'Поля :attribute и :different должны различаться.',
  in: 'Выбранное значение для :attribute ошибочно.',
  integer: 'Поле :attribute должно быть целым числом.',
  hex: 'Поле :attribute должно иметь шестнадцатеричный формат',
  min: {
    numeric: ':attribute maydonining qiymati :min dan katta yoki unga teng bo`lishi kerak.',
    string: ':attribute maydonidagi belgilar soni kamida :min bo`lishi kerak.'
  },
  max: {
    numeric: ':attribute maydonining qiymati :max dan kam yoki unga teng bo`lishi kerak.',
    string: ':attribute maydonidagi belgilar soni :max dan oshmasligi kerak.'
  },
  not_in: ':attribute uchun tanlangan qiymat xato.',
  numeric: ':attribute maydoni raqamlardan iborat bo`lishi kerak.',
  present: ':attribute maydoni mavjud bo`lishi kerak (lekin bo`sh bo`lishi mumkin).',
  required: ':attribute maydoni to`ldirilishi talab qilinadi.',
  required_if: 'Поле :attribute требуется когда значения поля :other равно :value. :attribute maydoni :other maydonining qiymati :value bo`lganida talab qilinadi.',
  same: ':atribute qiymati :same bilan mos kelishi kerak.',
  size: {
    numeric: ':attribute maydonining qiymati :size o`lchamiga teng bo`lishi kerak.',
    string: ':attribute maydonidagi belgilar soni :size ta bo`lishi kerak.'
  },
  url: ':attribute maydonida to`g`ri URL manzili kiritilishi kerak.',
  regex: ':attribute maydon formati noto`g`ri.',
  attributes: {}
};

},{}]},{},[]);
