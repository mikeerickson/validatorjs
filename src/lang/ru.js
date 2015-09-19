module.exports = {
	accepted: 'Вы должны принять :attribute.',
	alpha: 'Поле :attribute может содержать только буквы.',
	alpha_dash: '"Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
	alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
	between: 'Поле :attribute должно быть между :min :max и.',
	confirmed: 'Поле :attribute не совпадает с подтверждением.',
	email: 'Поле :attribute должно быть действительным электронным адресом.',
	def: 'Поле :attribute содержит ошибки.',
	digits: 'Длина цифрового поля :attribute должна быть :digits.',
	different: 'Поля :attribute и :different должны различаться.',
	'in': 'Выбранное значение для :attribute ошибочно.',
	integer: 'Поле :attribute должно быть целым числом.',
	min: {
		numeric: 'Поле :attribute должно быть не менее :min.',
		string: 'Количество символов в поле :attribute должно быть не менее :min.'
	},
	max: {
		numeric: 'Поле :attribute не может быть более :max.',
		string: 'Количество символов в поле :attribute не может превышать :max.'
	},
	not_in: 'Выбранное значение для :attribute ошибочно.',
	numeric: 'Поле :attribute должно быть числом.',
	required: 'Поле :attribute обязательно для заполнения.',
	required_if: 'Поле :attribute требуется при :attribute :other является.',
	same: 'Значение :attribute должно совпадать с :same.',
	size: {
		numeric: 'Поле :attribute должно быть равным :size.',
		string: 'Количество символов в поле :attribute должно быть равным :size.'
	},
	url: 'Поле :attribute имеет ошибочный формат.',
	regex: 'Поле :attribute имеет ошибочный формат.',
	attributes: {}
};