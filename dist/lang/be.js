require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/be":[function(require,module,exports){
module.exports = {
  accepted: "Вы павінны прыняць :attribute.",
  active_url: "Поле :attribute утрымлівае несапраўдны URL.",
  after: "У полі :attribute павінна быць дата пасля :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Поле :attribute можа мець толькі літары.",
  alpha_dash: "Поле :attribute можа мець толькі літары, лічбы і злучок.",
  alpha_num: "Поле :attribute можа мець толькі літары і лічбы.",
  array: "Поле :attribute павінна быць масівам.",
  before: "У полі :attribute павінна быць дата да :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Поле :attribute павінна быць паміж :min і :max.",
    file: "Памер файла ў поле :attribute павінен быць паміж :min і :max кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць паміж :min і :max.",
    array: "Колькасць элементаў у поле :attribute павінна быць паміж :min і :max."
  },
  boolean: "Поле :attribute павінна мець значэнне лагічнага тыпу.",
  confirmed: "Поле :attribute не супадае з пацвярджэннем.",
  date: "Поле :attribute не з'яўляецца датай.",
  date_format: "Поле :attribute не адпавядае фармату :format.",
  different: "Палі :attribute і :other павінны адрознівацца.",
  digits: "Даўжыня лічбавага поля :attribute павінна быць :digits.",
  digits_between: "Даўжыня лічбавага поля :attribute павінна быць паміж :min і :max.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Поле :attribute павінна быць сапраўдным электронным адрасам.",
  file: "The :attribute must be a file.",
  filled: "Поле :attribute абавязкова для запаўнення.",
  exists: "Выбранае значэнне для :attribute некарэктна.",
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
  image: "Поле :attribute павінна быць малюнкам.",
  in: "Выбранае значэнне для :attribute памылкова.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Поле :attribute павінна быць цэлым лікам.",
  ip: "Поле :attribute дпавінна быць сапраўдным IP-адрасам.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "Поле :attribute павінна быць JSON радком.",
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
    numeric: "Поле :attribute не можа быць больш :max.",
    file: "Памер файла ў поле :attribute не можа быць больш :max кілабайт).",
    string: "Колькасць сiмвалаў у поле :attribute не можа перавышаць :max.",
    array: "Колькасць элементаў у поле :attribute не можа перавышаць :max."
  },
  mimes: "Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.",
  mimetypes: "Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.",
  min: {
    numeric: "Поле :attribute павінна быць не менш :min.",
    file: "Памер файла ў полее :attribute павінен быць не менш :min кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць не менш :min.",
    array: "Колькасць элементаў у поле :attribute павінна быць не менш :min."
  },
  not_in: "Выбранае значэнне для :attribute памылкова.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Поле :attribute павінна быць лікам.",
  present: "The :attribute field must be present.",
  regex: "Поле :attribute мае памылковы фармат.",
  required: "Поле :attribute абавязкова для запаўнення.",
  required_if: "Поле :attribute абавязкова для запаўнення, калі :other раўняецца :value.",
  required_unless: "Поле :attribute абавязкова для запаўнення, калі :other не раўняецца :values.",
  required_with: "Поле :attribute абавязкова для запаўнення, калі :values ўказана.",
  required_with_all: "Поле :attribute абавязкова для запаўнення, калі :values ўказана.",
  required_without: "Поле :attribute абавязкова для запаўнення, калі :values не ўказана.",
  required_without_all: "Поле :attribute абавязкова для запаўнення, калі ні адно з :values не ўказана.",
  same: "Значэнне :attribute павінна супадаць з :other.",
  size: {
    numeric: "Поле :attribute павінна быць :size.",
    file: "Размер файла в поле :attribute павінен быць :size кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць :size.",
    array: "Колькасць элементаў у поле :attribute павінна быць :size."
  },
  string: "Поле :attribute павінна быць радком.",
  timezone: "Поле :attribute павінна быць сапраўдным гадзінным поясам.",
  unique: "Такое значэнне поля :attribute ўжо існуе.",
  uploaded: "The :attribute failed to upload.",
  url: "Поле :attribute мае памылковы фармат."
};

},{}]},{},[]);
