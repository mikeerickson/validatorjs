##Validator usage:
Include the validator.js script onto your page

Invoke Validator as shown below:
__The first arg are the rules and the second arg contains the data__

'''js
	var validation = new Validator({
		name: 'required|size:3'
		email: 'required'
	}, {
		email: 'dtang@usc.edu',
		name: 'David'
	});

	if (validation.passes()) {

	} else if(validation.fails()) {
		console.log(validation.errors);
	}
'''