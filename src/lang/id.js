module.exports = {
  accepted: ':attribute harus disetujui.',
  after: ':attribute harus setelah :after.',
  after_or_equal: ':attribute harus sama dengan atau setelah :after_or_equal.',
  alpha: ':attribute hanya boleh berisi huruf.',
  alpha_dash: ':attribute hanya boleh berisi huruf, - atau _.',
  alpha_num: ':attribute hanya boleh berisi huruf dan angka.',
  before: ':attribute harus sebelum :before.',
  before_or_equal: ':attribute harus sama dengan atau sebelum :before_or_equal.',
  between: ':attribute harus berisi antara :min dan :max.',
  confirmed: ':attribute konfirmasi tidak sama.',
  email: ':attribute harus berupa email.',
  date: ':attribute format tanggal tidak benar.',
  def: ':attribute attribute has errors.',
  digits: ':attribute harus :digits digit.',
  digits_between: 'Isian :attribute harus antara angka :min dan :max.',
  different: ':attribute dan :different harus berbeda.',
  in: ':attribute tidak benar.',
  integer: ':attribute harus berupa angka.',
  hex: ':attribute harus berformat heksadesimal',
  min: {
    numeric: ':attribute minimal :min.',
    string: ':attribute minimal :min karakter.'
  },
  max: {
    numeric: ':attribute harus lebih kecil :max.',
    string: ':attribute maksimal :max karakter.'
  },
  not_in: ':attribute tidak benar.',
  numeric: ':attribute harus berupa angka.',
  present: ':attribute harus ada (tapi boleh kosong).',
  required: ':attribute tidak boleh kosong.',
  required_if: ':attribute harus di isi jika :other berisi :value.',
  required_unless: ':attribute harus di isi jika :other tidak berisi :value.',
  required_with: ':attribute harus di isi jika :field tidak kosong.',
  required_with_all: ':attribute harus di isi jika :fields tidak kosong.',
  required_without: ':attribute harus di isi jika :field kosong.',
  required_without_all: ':attribute harus di isi jika :fields kosong.',
  same: ':attribute dan :same harus sama.',
  size: {
    numeric: ':attribute harus berisi :size.',
    string: ':attribute harus berisi :size karakter.'
  },
  string: ':attribute harus berupa string.',
  url: ':attribute harus berupa format url.',
  regex: ':attribute format tidak benar.',
  attributes: {}
};
