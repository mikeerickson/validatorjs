module.exports = {
  accepted: ':attribute måste vara accepterat.',
  after: ':attribute måste vara efter :after.',
  after_or_equal: ':attribute måste vara samtidigt eller efter :after_or_equal.',
  alpha: ':attribute får bara bestå av bokstäver.',
  alpha_dash: ':attribute får bara bestå av alfanumeriska tecken, bindestreck och understreck.',
  alpha_num: ':attribute får bara bestå av alfanumeriska tecken',
  before: ':attribute måste vara före :before.',
  before_or_equal: ':attribute måste vara samtidigt eller före :before_or_equal.',
  between: ':attribute måste vara mellan :min och :max.',
  confirmed: ':attribute stämmer inte överens med bekräftelsefältet.',
  email: 'Felaktigt format för :attribute.',
  date: ':attribute är inte ett giltigt datum.',
  def: 'Attributet :attribute innehåller fel.',
  digits: ':attribute ska innehålla :digits siffror.',
  different: ':attribute och :different måste vara olika.',
  in: 'Det valda :attribute är ogiltigt.',
  integer: ':attribute måste vara ett heltal.',
  hex: ':attribute måste vara i hexadecimalt format',
  min: {
    numeric: ':attribute måste vara minst :min.',
    string: ':attribute måste vara minst :min tecken.'
  },
  max: {
    numeric: ':attribute får inte vara högre än :max.',
    string: ':attribute får inte innehålla fler än :max tecken.'
  },
  not_in: 'Det valda attributet :attribute är ogiltigt',
  numeric: ':attribute måste vara en siffra.',
  present: ':attribute måste vara tillgängligt.',
  required: ':attribute måste vara ifyllt.',
  required_if: ':attribute måste vara ifyllt när :other är :value.',
  required_unless: ':attribute måste vara ifyllt när :other inte är :value.',
  required_with: ':attribute måste vara ifyllt när :field är ifyllt.',
  required_with_all: ':attribute måste vara ifyllt när :fields är ifyllda.',
  required_without: ':attribute måste vara ifyllt när :field inte är ifyllt.',
  required_without_all: ':attribute måste vara ifyllt när ingen av :fields är ifyllda.',
  same: ':attribute och :same måste matcha.',
  size: {
    numeric: ':attribute måste vara :size.',
    string: ':attribute måste vara :size tecken lång.'
  },
  string: ':attribute måste vara en sträng.',
  url: ':attribute formatet är ogiltigt.',
  regex: ':attribute formatet är ogiltigt.',
  attributes: {}
};
