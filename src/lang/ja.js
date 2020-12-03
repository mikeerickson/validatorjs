module.exports = {
  accepted: ':attributeを確認してください。',
  after: ':attributeは:afterより後の日付を入力してください。',
  after_or_equal: ':attributeは:after_or_equal以降の日付を入力してください。',
  alpha: ':attributeは英字のみで入力してください。',
  alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
  alpha_num: ':attributeは英数字のみで入力してください。',
  before: ':attributeは:beforeより前の日付を入力してください。',
  before_or_equal: ':attributeは:before_or_equal以前の日付を入力してください。',
  between: {
    numeric: ':attributeは:min〜:maxの間で指定してください',
    string: ':attributeは:min〜:max文字を入力してください'
  },
  confirmed: ':attributeは確認が一致しません。',
  email: ':attributeは正しいメールアドレスを入力してください。',
  date: ':attributeは正しい日付形式を入力してください',
  def: ':attributeは検証エラーが含まれています。',
  digits: ':attributeは:digitsの数字のみで入力してください。',
  digits_between: ':attributeは、:min桁から:max桁にしてください。',
  different: ':attributeと:differentは同じであってはなりません。',
  in: '選択された:attributeは無効です。',
  integer: ':attributeは整数で入力してください。',
  hex: ':attributeは16進数で入力してください。',
  min: {
    numeric: ':attributeは:min以上で入力してください。',
    string: ':attributeは:min文字以上で入力してください。'
  },
  max: {
    numeric: ':attributeは:max以下で入力してください。',
    string: ':attributeは:max文字以下で入力してください。'
  },
  not_in: '選択された:attributeは無効です。',
  numeric: ':attributeは数値で入力してください。',
  present: ':attributeを入力してください（空欄も可能です）。',
  required: ':attributeは必須です。',
  required_if: ':otherは:valueになったら:attributeは必須です。',
  required_unless: ':otherが:valueでなければ:attributeは必須です。',
  required_with: ':fieldが空欄でなければ:attributeは必須です。',
  required_with_all: ':fieldsが空欄でなければ:attributeは必須です。',
  required_without: ':fieldが空欄なら:attributeは必須です。',
  required_without_all: ':fieldsが空欄なら:attributeは必須です。',
  same: ':attributeと:sameは同じでなければなりません。',
  size: {
    numeric: ':attributeは:sizeを入力してください。',
    string: ':attributeは:size文字で入力してください。'
  },
  string: ':attributeは文字のみで入力してください。',
  url: ':attributeは正しいURIを入力してください。',
  regex: ':attributeの値はパターンにマッチする必要があります。',
  attributes: {}
};
