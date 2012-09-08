##Validator usage:

Include the script onto your page
<script src="validator.js"></script>

Invoke Validator as shown below. The first arg are the rules and the second arg contains the data
<script>
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

</script>