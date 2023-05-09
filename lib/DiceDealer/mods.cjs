// The DiceDealer mods provide some extras that affect the parsing and the output

let mods = [];
for( let name of ['transliterator', 'nosort', 'repeater', 'show_sucess_rate', 'aim', 'd100_criticals', 'd20_criticals' ] ){
	let mod = require(`./mods/${name}.cjs`);
	mods.push( mod );
}


exports.pre_parse = function( request, state ){

	for( let mod of mods ){
		if( mod.pre_parse ){
			request = mod.pre_parse( request, state );
		}
	}

	return request;

}

exports.pre_output = function( content, locale, state, result ){

	for( let mod of mods ){
		if( mod.pre_output ){
			content = mod.pre_output( content, locale, state, result );
		}
	}

	return content;

}

exports.post_roll = function( response, locale, state, result ){

	for( let mod of mods ){
		if( mod.post_roll ){
			result = mod.post_roll( response, locale, state, result );
		}
	}

	return result;

}


exports.pre_route = function( content ){

	for( let mod of mods ){
		if( mod.pre_route ){
			content = mod.pre_route( content );
		}
	}

	return content;

}