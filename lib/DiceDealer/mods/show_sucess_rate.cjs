exports.pre_parse = function( request, state ){

	if( state.rtype == 'roll'){

		if( 
			( request.indexOf('!') == 0 && request.match(/\d/) )
			||
			( state.base == 100 && request.match(/^\d+$/) )
		){

			state.success_rate_base = Number(request.replace(/[^\d]/g,''));

			return request.replace(/[\d]/g,'');

		}

	} 

	return request;

}

exports.pre_output = function( response, locale, state, result, ){

	if( result && result.length == 1 && state.success_rate_base ){

		let degrees_diff = Math.floor( state.success_rate_base / 10 ) - Math.floor( result[0].result / 10 );
		let degrees = String(degrees_diff);
		if( degrees_diff == 0 ){
			if( state.success_rate_base < result[0].result ){
				degrees = '-0';
			} else if( state.success_rate_base > result[0].result ){
				degrees = '+0';
			}
		} else if( degrees_diff > 0 ){
			degrees = '+' + degrees;
		}

		response.extendMessage(
			'roll_result', 
			' ' + locale.getMessage('degrees_of_success', String(degrees) )
		);

	} else if( state.rtype == 'help' ){
		response.extendMessage( 'aim_help', locale.getMessage( 'show_sucess_rate_help', state ) );
	}

	return response;

}
