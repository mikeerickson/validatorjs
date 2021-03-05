module.exports = {
  accepted: '必須接受 :attribute。',
  after: ':attribute 必須在 :after 之後。',
  after_or_equal: ':attribute 必須跟 :after_or_equal 同一天或是在 :after_or_equal 之後。',
  alpha: ':attribute 只能包含字母。',
  alpha_dash: ':attribute 只能包含字母，連結號(-)和底線(_)。',
  alpha_num: ':attribute 只能包含字母和數字。',
  before: ':attribute 必須在 :before 之前。',
  before_or_equal: ':attribute 必須跟 :before_or_equal 同一天或是在 :before_or_equal 之後。',
  between: {
    numeric: ':attribute 的值只能在 :min 和 :max 之間。',
    string: ':attribute 的長度必須在 :min 和 :max 之間。',
  },
  confirmed: ':attribute 與確認輸入的值不一致。',
  email: ':attribute 的信箱格式錯誤。',
  date: ':attribute 的日期格式錯誤。',
  def: ':attribute 屬性錯誤。',
  digits: ':attribute 必須是 :digits 位的小數。',
  digits_between: ':attribute 必須介於 :min 至 :max 位數字。',
  different: ':attribute 和 :different 必須不同。',
  in: '選擇的 :attribute 無效',
  integer: ':attribute 必須是一個整數。',
  hex: ':attribute 必須是十六進位格式',
  min: {
    numeric: ':attribute 不能小於 :min。',
    string: ':attribute 的長度不能小於 :min.'
  },
  max: {
    numeric: ':attribute 不能大於 :max。',
    string: ':attribute 的長度不能大於 :max.'
  },
  not_in: '所選的 :attribute 無效。',
  numeric: ':attribute 必須是一個數字。',
  present: ':attribute 一定要有值 (可以是空值)。',
  required: ':attribute 不能空白。',
  required_if: '當 :other 是 :value 時, :attribute 不能空白。',
  required_unless: '當 :other 不是 :value 時 :attribute 不能為空。',
  required_with: '當 :other 有值時 :value 時 :attribute 不能為空。',
  required_with_all: '當 :fields 不是空白 :attribute 不能為空。',
  required_without: '當 :field 為空白時 :attribute 不能為空。',
  required_without_all: '當 :fields 為空白是 :attribute 不能為空。',
  same: ':attribute 和 :same 必須一致。',
  size: {
    numeric: ':attribute 的長度必須等於 :size。',
    string: ':attribute 的長度必須等於 :size.'
  },
  string: ':attribute 必須為字串。',
  url: ':attribute 不是正確的網址。',
  regex: ':attribute 格式不正確。',
  attributes: {}
};
