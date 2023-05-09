exports.pre_parse = function( request, state ){

	state.repeat = 1;

	request = request.replace( /\*(\d+)$/ ,function(m){
		state.repeat = Number(m.replace(/[^0-9]/g,''));
		return '';
	});

	request = request.replace( /^(\d+)\*/ ,function(m){
		state.repeat = Number(m.replace(/[^0-9]/g,''));
		return '';
	});

	return request;

}


exports.pre_output = function( response, locale, state, result ){

	if( state.rtype == 'help' ){
		response.addMessage( locale.getMessage( 'repeater_help', state ), 'repeater_help' );
	}
	
	return response;
}