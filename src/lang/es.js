module.exports = {
  accepted: 'El campo :attribute debe ser aceptado.',
  after: 'El campo :attribute debe ser una fecha posterior a :after.',
  after_or_equal: 'El campo :attribute debe ser una fecha igual o posterior a :after_or_equal.',
  alpha: 'El campo :attribute solo debe contener letras.',
  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
  alpha_num: 'El campo :attribute solo debe contener letras y números.',
  before: 'El campo :attribute debe ser una fecha anterior a :before.',
  before_or_equal: 'El campo :attribute debe ser una fecha igual o  anterior a :before_or_equal.',
  between: {
    numeric: 'El campo :attribute tiene que estar entre :min - :max.',
    string: 'El campo :attribute tiene que estar entre :min - :max caracteres.',
  },
  confirmed: 'La confirmación de :attribute no coincide.',
  email: 'El campo :attribute no es una dirección de correo válida.',
  date: 'El campo :attribute no es una fecha válida.',
  def: 'El campo :attribute tiene errores.',
  digits: 'El campo :attribute debe tener :digits dígitos.',
  digits_between: 'El campo :attribute debe tener entre :min y :max dígitos.',
  different: 'El campo :attribute y :different deben ser diferentes.',
  in: 'El campo seleccionado :attribute es inválido.',
  integer: 'El campo :attribute debe ser un número entero.',
  hex: 'El campo :attribute debe tener formato hexadecimal.',
  min: {
    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
    string: 'El campo :attribute debe contener al menos :min caracteres.'
  },
  max: {
    numeric: 'El campo :attribute no puede ser mayor a :max.',
    string: 'El campo :attribute no puede ser mayor que :max caracteres.'
  },
  not_in: 'El campo :attribute es inválido.',
  numeric: 'El campo :attribute debe ser numérico.',
  present: 'El campo de :attribute debe estar presente (pero puede estar vacío).',
  required: 'El campo :attribute es obligatorio.',
  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
  required_unless: 'El campo :attribute es obligatorio cuando :other no es :value.',
  required_with: 'El campo :attribute es obligatorio cuando :field no esta vacio.',
  required_with_all: 'El campo :attribute es obligatorio cuando :fields no estan vacios.',
  required_without: 'El campo :attribute es obligatorio cuando :field esta vacio.',
  required_without_all: 'El campo :attribute es obligatorio cuando :fields estan vacios.',
  same: 'El campo :attribute y :same deben coincidir.',
  size: {
    numeric: 'El tamaño del campo :attribute debe ser :size.',
    string: 'El campo :attribute debe contener :size caracteres.'
  },
  string: 'El campo :attribute debe ser de tipo texto.',
  url: 'El formato de :attribute es inválido.',
  regex: 'El formato del campo :attribute es inválido.',
  attributes: {}
};
