exports.pre_parse = function( request, state ){

	if( state.rtype == 'roll'){

		if( 
			( request.indexOf('!') == 0 && request.match(/\d/) )
			||
			( state.base == 100 && request.match(/^\d+$/) )
		){
			state.success_rate_base = request.replace(/[^\d]/g,'');
			return '!';
		}

	} 

	return request;

}

exports.pre_output = function( response, locale, state, result, ){

	if( result && result.length == 1 && state.success_rate_base ){

		let degrees_diff = Math.floor( state.success_rate_base / 10 ) - Math.floor( result[0].result / 10 );
		let degrees = String(degrees_diff);
		if( degrees_diff == 0 ){
			if( state.success_rate_base < result[0].result )
				degrees = '+0';
			else if( state.success_rate_base < result[0].result )
				degrees = '-0';
		}

		response.extendMessage(
			'roll_result', 
			' ' + locale.getMessage('degrees_of_success', String(degrees) )
		);

	}

	return response;

}


// TODO:: дубли - удача/неудача
