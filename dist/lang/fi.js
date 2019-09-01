require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./lang/fi":[function(require,module,exports){
module.exports = {
  accepted: ':attribute on oltava hyväksytty.',
  after: ':attribute on oltava :after jälkeen.',
  after_or_equal: ':attribute täytyy olla sama kuin :after_or_equal tai sen jälkeen.',
  alpha: ':attribute kenttä saa sisältää ainoastaan kirjaimia.',
  alpha_dash: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita, sekä pisteitä ja alaviivoja.',
  alpha_num: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita.',
  before: ':attribute on oltava ennen kuin :before.',
  before_or_equal: ':attribute on oltava sama tai ennen kuin :before_or_equal.',
  between: ':attribute on oltava :min ja :max väliltä.',
  confirmed: ':attribute vahvistus ei täsmää.',
  email: ':attribute on väärässä muodossa.',
  date: ':attribute ei ole päivämäärä.',
  def: ':attribute sisältää virheitä.',
  digits: ':attribute on oltava :digits numeroa pitkä.',
  digits_between: 'Kentän :attribute arvon tulee olla :min - :max numeroa.',
  different: ':attribute ei saa olla yhtä kuin :different.',
  in: 'Valittu :attribute ei kelpaa.',
  integer: ':attribute ei ole numero.',
  hex: ':attribute on oltava heksadesimaali.',
  min: {
    numeric: ':attribute on oltava vähintään :min.',
    string: ':attribute on oltava vähintään :min merkkiä pitkä.'
  },
  max: {
    numeric: ':attribute on oltava enintään :max.',
    string: ':attribute on oltava enintään :max merkkiä pitkä.'
  },
  not_in: 'Valittu :attribute ei kelpaa.',
  numeric: ':attribute on oltava numero.',
  present: ':attribute kenttä on oltava (mutta saa olla tyhjä).',
  required: ':attribute kenttä on pakollinen.',
  required_if: ':attribute kenttä on pakollinen, jos kenttä :other on :value.',
  required_unless: ':attribute kenttä on pakollinen, jos kenttä :other ei ole :value.',
  required_with: ':attribute kenttä on pakollinen, jos kenttä :field ei ole tyhjä.',
  required_with_all: ':attribute kenttä on pakollinen, jos kentät :fields eivät ole tyhjiä.',
  required_without: ':attribute kenttä on pakollinen, jos kenttä :field on tyhjä.',
  required_without_all: ':attribute kenttä on pakollinen, jos kentät :fields ovat tyhjiä.',
  same: ':attribute ja :same on oltava samat.',
  size: {
    numeric: ':attribute on oltava :size.',
    string: ':attribute on oltava :size merkkiä pitkä.'
  },
  string: ':attribute on oltava merkkijono.',
  url: ':attribute on väärässä muodossa.',
  regex: ':attribute on väärässä muodossa.',
  attributes: {}
};

},{}]},{},[]);
