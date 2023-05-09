exports.pre_parse = function( request, state ){

	if( state.rtype == 'roll' && request.match(/n/) ){
		state.sort_result = false;
		return request.replace(/n/g, '');
	}

	return request;

}

exports.pre_output = function( response, locale, state, result, ){

	if( ! state.sort_result ){
		response.addMessage( locale.getMessage('sorting_off') )
	}
	if( state.rtype == 'help' ){
		response.extendMessage('repeater_help', locale.getMessage('nosort_help') );
	}
	
	return response;

}