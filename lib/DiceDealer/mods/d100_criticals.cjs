exports.pre_output = function( response, locale, state, result, ){

	if( 
		result
		&& state.base == 100 
		&& result.length == 1 
		&& result[0].result % 11 == 0 
		&& state.hasOwnProperty('success_rate_base')
	){

		let message = 'critical_success';
		if( result[0].result > Number(state.success_rate_base) )
			message = 'critical_fail';

		response.addMessage(
			locale.getMessage( message )
		);

	}

	return response;

}

