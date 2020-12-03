require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/hu":[function(require,module,exports){
module.exports = {
  accepted: "A(z) :attribute el kell legyen fogadva!",
  active_url: "A(z) :attribute nem érvényes url!",
  after: "A(z) :attribute :date utáni dátum kell, hogy legyen!",
  after_or_equal: "A(z) :attribute nem lehet korábbi dátum, mint :date!",
  alpha: "A(z) :attribute kizárólag betűket tartalmazhat!",
  alpha_dash: "A(z) :attribute kizárólag betűket, számokat és kötőjeleket tartalmazhat!",
  alpha_num: "A(z) :attribute kizárólag betűket és számokat tartalmazhat!",
  attributes: {},
  array: "A(z) :attribute egy tömb kell, hogy legyen!",
  before: "A(z) :attribute :date előtti dátum kell, hogy legyen!",
  before_or_equal: "A(z) :attribute nem lehet későbbi dátum, mint :date!",
  between: {
    numeric: "A(z) :attribute :min és :max közötti szám kell, hogy legyen!",
    file: "A(z) :attribute mérete :min és :max kilobájt között kell, hogy legyen!",
    string: "A(z) :attribute hossza :min és :max karakter között kell, hogy legyen!",
    array: "A(z) :attribute :min - :max közötti elemet kell, hogy tartalmazzon!"
  },
  boolean: "A(z) :attribute mező csak true vagy false értéket kaphat!",
  confirmed: "A(z) :attribute nem egyezik a megerősítéssel.",
  date: "A(z) :attribute nem érvényes dátum.",
  date_format: "A(z) :attribute nem egyezik az alábbi dátum formátummal :format!",
  different: "A(z) :attribute és :other értékei különbözőek kell, hogy legyenek!",
  digits: "A(z) :attribute :digits számjegyű kell, hogy legyen!",
  digits_between: "A(z) :attribute értéke :min és :max közötti számjegy lehet!",
  dimensions: "A(z) :attribute felbontása nem megfelelő.",
  distinct: "A(z) :attribute értékének egyedinek kell lennie!",
  email: "A(z) :attribute nem érvényes email formátum.",
  exists: "A(z) :attribute már létezik.",
  file: "A(z) :attribute fájl kell, hogy legyen!",
  filled: "A(z) :attribute megadása kötelező!",
  gt: {
    numeric: "A(z) :attribute nagyobb kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nagyobb kell, hogy legyen, mint :value kilobájt.",
    string: "A(z) :attribute hosszabb kell, hogy legyen, mint :value karakter.",
    array: "A(z) :attribute több, mint :value elemet kell, hogy tartalmazzon."
  },
  gte: {
    numeric: "A(z) :attribute nagyobb vagy egyenlő kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nem lehet kevesebb, mint :value kilobájt.",
    string: "A(z) :attribute hossza nem lehet kevesebb, mint :value karakter.",
    array: "A(z) :attribute legalább :value elemet kell, hogy tartalmazzon."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "A(z) :attribute képfájl kell, hogy legyen!",
  in: "A kiválasztott :attribute érvénytelen.",
  in_array: "A(z) :attribute értéke nem található a(z) :other értékek között.",
  integer: "A(z) :attribute értéke szám kell, hogy legyen!",
  ip: "A(z) :attribute érvényes IP cím kell, hogy legyen!",
  ipv4: "A(z) :attribute érvényes IPv4 cím kell, hogy legyen!",
  ipv6: "A(z) :attribute érvényes IPv6 cím kell, hogy legyen!",
  json: "A(z) :attribute érvényes JSON szöveg kell, hogy legyen!",
  lt: {
    numeric: "A(z) :attribute kisebb kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete kisebb kell, hogy legyen, mint :value kilobájt.",
    string: "A(z) :attribute rövidebb kell, hogy legyen, mint :value karakter.",
    array: "A(z) :attribute kevesebb, mint :value elemet kell, hogy tartalmazzon."
  },
  lte: {
    numeric: "A(z) :attribute kisebb vagy egyenlő kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nem lehet több, mint :value kilobájt.",
    string: "A(z) :attribute hossza nem lehet több, mint :value karakter.",
    array: "A(z) :attribute legfeljebb :value elemet kell, hogy tartalmazzon."
  },
  max: {
    numeric: "A(z) :attribute értéke nem lehet nagyobb, mint :max!",
    file: "A(z) :attribute mérete nem lehet több, mint :max kilobájt.",
    string: "A(z) :attribute hossza nem lehet több, mint :max karakter.",
    array: "A(z) :attribute legfeljebb :max elemet kell, hogy tartalmazzon."
  },
  mimes: "A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.",
  mimetypes: "A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.",
  min: {
    numeric: "A(z) :attribute értéke nem lehet kisebb, mint :min!",
    file: "A(z) :attribute mérete nem lehet kevesebb, mint :min kilobájt.",
    string: "A(z) :attribute hossza nem lehet kevesebb, mint :min karakter.",
    array: "A(z) :attribute legalább :min elemet kell, hogy tartalmazzon."
  },
  not_in: "A(z) :attribute értéke érvénytelen.",
  not_regex: "A(z) :attribute formátuma érvénytelen.",
  numeric: "A(z) :attribute szám kell, hogy legyen!",
  present: "A(z) :attribute mező nem található!",
  regex: "A(z) :attribute formátuma érvénytelen.",
  required: "A(z) :attribute megadása kötelező!",
  required_if: "A(z) :attribute megadása kötelező, ha a(z) :other értéke :value!",
  required_unless: "A(z) :attribute megadása kötelező, ha a(z) :other értéke nem :values!",
  required_with: "A(z) :attribute megadása kötelező, ha a(z) :values érték létezik.",
  required_with_all: "A(z) :attribute megadása kötelező, ha a(z) :values értékek léteznek.",
  required_without: "A(z) :attribute megadása kötelező, ha a(z) :values érték nem létezik.",
  required_without_all: "A(z) :attribute megadása kötelező, ha egyik :values érték sem létezik.",
  same: "A(z) :attribute és :other mezőknek egyezniük kell!",
  size: {
    numeric: "A(z) :attribute értéke :size kell, hogy legyen!",
    file: "A(z) :attribute mérete :size kilobájt kell, hogy legyen!",
    string: "A(z) :attribute hossza :size karakter kell, hogy legyen!",
    array: "A(z) :attribute :size elemet kell tartalmazzon!"
  },
  string: "A(z) :attribute szöveg kell, hogy legyen.",
  timezone: "A(z) :attribute nem létező időzona.",
  unique: "A(z) :attribute már foglalt.",
  uploaded: "A(z) :attribute feltöltése sikertelen.",
  url: "A(z) :attribute érvénytelen link."
};

},{}]},{},[]);
