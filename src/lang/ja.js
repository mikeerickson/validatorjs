module.exports = {
    accepted: ':attributeを確認してください。',
    alpha: ':attributeは英字のみで入力してください。',
    alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
    alpha_num: ':attributeは英数字のみで入力してください。',
    between: ':attributeは:min〜:max文字で入力してください。',
    confirmed: ':attributeは確認が一致しません。',
    email: ':attributeは正しいメールアドレスを入力してください。',
    date: ':attributeは正しい日付形式を入力してください',
    def: ':attributeは検証エラーが含まれています。',
    digits: ':attributeは:digitsの数字のみで入力してください。',
    different: ':attributeと:differentは同じであってはなりません。',
    'in': '選択された:attributeは無効です。',
    integer: ':attributeは整数で入力してください。',
    min        : {
        numeric : ":attributeは:min以上で入力してください。",
        string  : ":attributeは:min文字以上で入力してください。"
    },
    max : {
        numeric : ":attributeは:max以下で入力してください。",
        string  : ":attributeは:max文字以下で入力してください。"
    },
    not_in      : "選択された:attributeは無効です。",
    numeric     : ":attributeは数値で入力してください。",
    present: 'The :attribute field must be present (but can be empty).',
    required    : ":attributeは必須です。",
    required_if : ":otherは:valueになったら:attributeは必須です。",
    same        : ":attributeと:sameは同じでなければなりません。",
    size        : {
        numeric : ":attributeは:sizeを入力してください。",
        string  : ":attributeは:size文字で入力してください。"
    },
    url        : ":attributeは正しいURIを入力してください。",
    regex      : ":attributeの値 \":value\" はパターンにマッチする必要があります。",
    attributes : {}
};
