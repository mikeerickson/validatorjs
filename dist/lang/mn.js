require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/mn":[function(require,module,exports){
module.exports = {
  accepted: ':Attribute баталсан байх шаардлагатай.',
  active_url: ':Attribute талбарт зөв URL хаяг оруулна уу.',
  after: ':Attribute талбарт :date-с хойш огноо оруулна уу.',
  after_or_equal: ':Attribute талбарт :date эсвэл түүнээс хойш огноо оруулна уу.',
  alpha: ':Attribute талбарт латин үсэг оруулна уу.',
  alpha_dash: ':Attribute талбарт латин үсэг, тоо болон зураас оруулах боломжтой.',
  alpha_num: ':Attribute талбарт латин үсэг болон тоо оруулах боломжтой.',
  attributes: {},
  array: ':Attribute талбар массив байх шаардлагатай.',
  before: ':Attribute талбарт :date-с өмнөх огноо оруулна уу.',
  before_or_equal: ':attribute талбарт :date эсвэл түүнээс өмнөх огноо оруулна уу.',
  between: {
    numeric: ':Attribute талбарт :min-:max хооронд тоо оруулна уу.',
    file: ':Attribute талбарт :min-:max килобайт хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min-:max урттай текст оруулна уу.',
    array: ':Attribute массивт :min-:max элемэнт байх шаардлагатай.'
  },
  boolean: ':Attribute талбарын утга үнэн эсвэл худал байх шаардлагатай.',
  confirmed: ':Attribute талбарын баталагажуулалт тохирохгүй байна.',
  date: ':Attribute талбарт оруулсан огноо буруу байна.',
  date_format: ':Attribute талбарт :format хэлбэртэй огноо оруулна уу.',
  different: ':Attribute талбарт :other -с өөр утга оруулах шаардлагатай.',
  digits: ':Attribute талбарт дараах цифрүүдээс оруулах боломжтой. :digits.',
  digits_between: ':Attribute талбарт :min-:max хоорондох цифр оруулах боломжтой.',
  dimensions: ':Attribute талбарийн зургийн хэмжээс буруу байна.',
  distinct: ':Attribute талбарт ялгаатай утга оруулах шаардлагатай.',
  email: ':Attribute талбарт зөв и-мэйл хаяг оруулах шаардлагатай.',
  exists: 'Сонгогдсон :attribute буруу байна.',
  file: ':Attribute талбарт файл оруулах шаардлагатай.',
  filled: ':Attribute талбар шаардлагатай.',
  gt: {
    numeric: 'The :attribute must be greater than :value.',
    file: 'The :attribute must be greater than :value kilobytes.',
    string: 'The :attribute must be greater than :value characters.',
    array: 'The :attribute must have more than :value items.'
  },
  gte: {
    numeric: 'The :attribute must be greater than or equal :value.',
    file: 'The :attribute must be greater than or equal :value kilobytes.',
    string: 'The :attribute must be greater than or equal :value characters.',
    array: 'The :attribute must have :value items or more.'
  },
  image: ':Attribute талбарт зураг оруулна уу.',
  in: 'Сонгогдсон :attribute буруу байна.',
  in_array: ':Attribute талбарт оруулсан утга :other -д байхгүй байна.',
  integer: ':Attribute талбарт бүхэл тоо оруулах шаардлагатай.',
  ip: ':Attribute талбарт зөв IP хаяг оруулах шаардлагатай.',
  ipv4: 'The :attribute must be a valid IPv4 address.',
  ipv6: 'The :attribute must be a valid IPv6 address.',
  json: ':Attribute талбарт зөв JSON тэмдэгт мөр оруулах шаардлагатай.',
  lt: {
    numeric: 'The :attribute must be less than :value.',
    file: 'The :attribute must be less than :value kilobytes.',
    string: 'The :attribute must be less than :value characters.',
    array: 'The :attribute must have less than :value items.'
  },
  lte: {
    numeric: 'The :attribute must be less than or equal :value.',
    file: 'The :attribute must be less than or equal :value kilobytes.',
    string: 'The :attribute must be less than or equal :value characters.',
    array: 'The :attribute must not have more than :value items.'
  },
  max: {
    numeric: ':Attribute талбарт :max буюу түүнээс бага утга оруулна уу.',
    file: ':Attribute талбарт :max килобайтаас бага хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :max-с бага урттай текст оруулна уу.',
    array: ':Attribute талбарт хамгийн ихдээ :max элемэнт оруулах боломжтой.'
  },
  mimes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  mimetypes: ':Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.',
  min: {
    numeric: ':Attribute талбарт :min буюу түүнээс их тоо оруулна уу.',
    file: ':Attribute талбарт :min килобайтаас их хэмжээтэй файл оруулна уу.',
    string: ':Attribute талбарт :min буюу түүнээс их үсэг бүхий текст оруулна уу.',
    array: ':Attribute талбарт хамгийн багадаа :min элемэнт оруулах боломжтой.'
  },
  not_in: 'Буруу :attribute сонгогдсон байна.',
  not_regex: 'The :attribute format is invalid.',
  numeric: ':Attribute талбарт тоон утга оруулна уу.',
  present: ':Attribute талбар байх шаардлагатай.',
  regex: ':Attribute талбарт оруулсан утга буруу байна.',
  required: ':Attribute талбар шаардлагатай.',
  required_if: 'Хэрэв :other :value бол :attribute табларт утга оруулах шаардлагатай.',
  required_unless: ':other :values дотор байхгүй бол :attribute талбарт утга оруулах шаардлагатай.',
  required_with: ':values утгуудийн аль нэг байвал :attribute талбар шаардлагатай.',
  required_with_all: ':values утгууд байвал :attribute талбар шаардлагатай.',
  required_without: 'The :attribute field is required when :values is not present.',
  required_without_all: 'The :attribute field is required when none of :values are present.',
  same: 'The :attribute and :other must match.',
  size: {
    numeric: ':Attribute :size хэмжээтэй байх шаардлагатай.',
    file: ':Attribute :size килобайт хэмжээтэй байх шаардлагатай.',
    string: ':Attribute :size тэмдэгтийн урттай байх шаардлагатай.',
    array: ':Attribute :size элемэнттэй байх шаардлагатай.'
  },
  string: ':Attribute талбарт текст оруулна уу.',
  timezone: ':Attribute талбарт зөв цагийн бүс оруулна уу.',
  unique: 'Оруулсан :attribute аль хэдий нь бүртгэгдсэн байна.',
  uploaded: ':Attribute талбарт оруулсан файлыг хуулхад алдаа гарлаа.',
  url: ':Attribute зөв url хаяг оруулна уу.'
};

},{}]},{},[]);
