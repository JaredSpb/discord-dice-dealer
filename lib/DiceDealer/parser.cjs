const types = {
	numbers: [...Array(10).keys()].map((i) => String(i)),
	symbols: ['d','a'],
	operators: ['+','-'],
};
const tokens_priority = {
	da: 100,
	ad: 100,
	d: 100,
	'+': 50,
	'-': 50
};


exports.parse = function( str, base, parsed_callback ){

	let rolls_defs = {
		repeat: 1,
		flags: {r: false, c: false},
		formula: []
	};

	// Empty string means regular 1d20 roll
	if( str == '' )
		str = `1d${base}`;
	// Empty string means regular 1d20 roll
	if( str.match(/^[-+ 0-9]+$/s) ){
		if( str.indexOf('-') !== -1 ){
			str = `1d${base} ` + str.replace(/\h/,'');
		} else{
			str = `1d${base} + ` + str.replace(/[ +]/g,'');
		}
		
	}

	str = str.toLowerCase();

	// Fixing redunant rolls count
	// d20 -> 1d20
	str = str.replace(/(?<=(^|[^0-9]))(da|ad|(?<!a)d)/gs, "1$2");

	// Fixing redunant dice counts
	// 1d -> 1d20
	str = str.replace(/(da|d(?!a))(?![0-9])/gs, `$1${base}`);

	// Fixing nonsense 1da and 1ad
	// 1da -> 2da20
	str = str.replace(/1(da|ad)/gs, "2$1");

	// Removing anavailable symbols
	let re_available_symbols = new RegExp(`[^0-9ad${Object.keys( rolls_defs.flags ).join('')}+*-]`, 'gs');
	str = str.replaceAll(re_available_symbols,'');

	// Pretty much parsed alread
	if( parsed_callback )
		parsed_callback( str );

	// Getting repeat count
	// str = str.replace(/^\d+\*/,function( matches ){
	// 	rolls_defs.repeat = matches.replace(/[^\d]/g,'');
	// 	return '';
	// });
	// str = str.replace(/\*\d+$/,function( matches ){
	// 	rolls_defs.repeat = matches.replace(/[^\d]/g,'');
	// 	return '';
	// });

	// Getting flags
	let re_available_flags = new RegExp(`[${Object.keys( rolls_defs.flags ).join('')}]`, 'gs');
	str = str.replace(re_available_flags,function( matches ){
		let i = 0;

		while( i < matches.length ){
			rolls_defs.flags[ matches.charAt(i) ] = true;
			i++
		}
		return '';
	});


	// Tokenizing the roll
	let accumulator = {
		type: null,
		content: '',
		// Resets acc
		setType: function(type){
			this.type = type;
			this.content = ''
		},
		add: function(char){
			this.content += char;
		},
		get: function( type ){
			return this.content;
		}
	};
	let tokens = [];
	let i = 0;

	while( i < str.length ){

		let char = str.charAt(i);

		for(let type in types){

			if( types[type].includes( char ) ){
				// Type change
				// If acc had type, grab its content and reset
				if( accumulator.type != type ){
					if( accumulator.type ){
						tokens.push( accumulator.get() );
					}
					accumulator.setType( type )
				}

				// Adding the character
				accumulator.add(char);

				break;
			}
		}

		i++;
	}
	tokens.push( accumulator.get() );

	let stack = [];
	tokens.forEach(function(token){

		if( tokens_priority.hasOwnProperty( token ) ){
			while( stack.length && tokens_priority[ stack[ stack.length - 1 ] ] >= tokens_priority[ token ] ){
				rolls_defs.formula.push( stack.pop() );
			}

			stack.push( token );
		} else {
			rolls_defs.formula.push(token);
		}

	});

	while( stack.length )
		rolls_defs.formula.push( stack.pop() );

	return rolls_defs;
}
