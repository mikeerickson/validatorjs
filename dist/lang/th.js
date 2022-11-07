require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/th":[function(require,module,exports){
module.exports = {
  accepted: 'ต้องกดยอมรับ :attribute',
  after: ':attribute ต้องตามหลัง :after.',
  after_or_equal: ':attribute ต้องมากกว่าหรือเท่ากับ :after_or_equal.',
  alpha: ':attribute ต้องประกอบด้วยตัวอักษรเท่านั้น',
  alpha_dash: ':attribute ต้องประกอบด้วยตัวอักษร, ตัวเลข, - และ _ เท่านั้น',
  alpha_num: ':attribute ต้องประกอบด้วยสัญลักษณ์ต่างๆ ตัวอักษร หรือตัวเลขเท่านั้น',
  before: ':attribute ต้องอยู่ก่อนหน้า :before.',
  before_or_equal: ':attribute ต้องอยู่ก่อนหรือเท่ากับ :before_or_equal.',
  between: {
    numeric: ':attribute ต้องอยู่ระหว่าง :min และ :max.',
    string: ':attribute ต้องอยู่ระหว่าง :min และ :max ตัวอักษร'
  },
  confirmed: ':attribute ไม่ตรงกัน',
  email: 'รูปแบบ :attribute ไม่ถูกต้อง',
  date: ':attribute รูปแบบวันที่ไม่ถูกต้อง',
  def: ':attribute คุณลักษณะแอตทริบิวต์มีข้อผิดพลาด',
  digits: ':attribute ต้องมี :digits ตัวเลข',
  digits_between: ':attribute ต้องอยู่ระหว่างเลข :min และเลข :max ',
  different: ':attribute และ :different ต้องแตกต่างกัน',
  in: ':attribute ที่เลือกไม่ถูกต้อง.',
  integer: ':attribute ต้องเป็นเลขจำนวนเต็ม',
  hex: ':attribute ต้องอยู่ในรูปแบบ hexadecimal',
  min: {
    numeric: ':attribute ต้องมีค่ามากกว่า :min.',
    string: ':attribute ต้องมีอย่างน้อย :min ตัวอักษร'
  },
  max: {
    numeric: ':attribute ต้องน้อยกว่า :max.',
    string: ':attribute ต้องมีไม่เกิน :max ตัวอักษร'
  },
  not_in: ':attribute ที่เลือกไม่ถูกต้อง',
  numeric: ':attribute ต้องเป็นเลข',
  present: 'ต้องใส่ค่า :attribute (แต่สามารถเว้นว่างได้)',
  required: 'ต้องกรอก :attribute',
  required_if: 'ต้องกรอก :attribute ถ้า :other มีค่า :value.',
  required_unless: 'ต้องกรอก :attribute ถ้า :other ไม่เท่ากับ :value.',
  required_with: 'ต้องกรอก :attribute เมื่อมี :field',
  required_with_all: 'ต้องกรอก :attribute เมื่อ :fields ไม่ว่างเปล่า',
  required_without: 'ต้องกรอก :attribute เมื่อไม่มีค่า :field',
  required_without_all: 'ต้องกรอก :attribute เมื่อ :fields ว่างเปล่า',
  same: ':attribute และ :same ต้องเหมือนกัน',
  size: {
    numeric: ':attribute ต้องเท่ากับ :size.',
    string: ':attribute ต้องเท่ากับ :size ตัวอักษร'
  },
  string: ':attribute ต้องเป็น string',
  url: 'รูปแบบ :attribute ไม่ถูกต้อง',
  regex: 'รูปแบบ :attribute ไม่ถูกต้อง',
  attributes: {}
};
  
},{}]},{},[]);
