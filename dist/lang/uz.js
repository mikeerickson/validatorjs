
require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/uz":[function(require,module,exports){
module.exports = {
  accepted: 'Siz :attribute ni qabul qilishingiz kerak.',
  alpha: ':attribute maydoni faqat harflardan iborat bo`lishi mumkin.',
  alpha_dash: ':attribute maydoni faqat harflar, raqamlar, chiziqlar va pastki chiziqlardan iborat bo`lishi mumkin.',
  alpha_num: ':attribute maydoni faqat harflar va raqamlarni o`z ichiga olishi mumkin.',
  between: ':attribute maydoni :min va :max orasida bo`lishi kerak.',
  confirmed: ':attribute maydoni tasdiq bilan mos kelmaydi.',
  email: ':attribute maydoniga haqiqiy elektron pochta manzili kiritilishi kerak.',
  def: ':attribute maydonida xatolar mavjud.',
  digits: ':attribute maydonning uzunligi :digits bo`lishi kerak',
  digits_between: ':attribute maydonining uzunligi :min dan :max belgilargacha bo`lishi kerak.',
  different: ':attribute va :different maydonlar qiymatlari farqli bo`lishi kerak.',
  in: ':attribute uchun tanlangan qiymat noto`g`ri.',
  integer: ':attribute maydoni butun sonlardan bo`lishi kerak.',
  hex: ':attribute maydoni o`n oltilik formatda bo`lishi kerak',
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
