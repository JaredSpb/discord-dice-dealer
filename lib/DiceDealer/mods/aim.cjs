exports.pre_parse = function( request, state ){

	if( state.rtype == 'roll' && request.indexOf('!') == 0 ){
		state.aim = true;
		state.base = 100;
		return request.substr(1);
	}

	return request;

}

exports.pre_output = function( response, locale, state, result, ){
	if( state.aim && state.repeat == 1 ){

		// Reversing result
		let target = Number(String(result[0].result).padStart(2, '0').split('').reverse().join(''));

		let extra = locale.getMessage("\nAiming ");

		if( target <= 9 )
			extra += locale.getMessage('`Head`');
		else if( target <= 24 )
			extra += locale.getMessage('`Left/Secondary Arm`');
		else if( target <= 44 )
			extra += locale.getMessage('`Right/Primary Arm`');
		else if( target <= 79 )
			extra += locale.getMessage('`Torso`');
		else if( target <= 89 )
			extra += locale.getMessage('`Left leg`');
		else
			extra += locale.getMessage('`Right leg`');

		response.addMessage(extra);
		return response

	}

	if( state.rtype == 'help' ){
		response.addMessage(locale.getMessage( 'aim_help', state ), 'aim_help');
	}
	
	return response;

}
