let vsprintf = require('sprintf-js').vsprintf

let messages = {};
messages['en-US'] = require('./i18n/en-US.cjs');
messages['ru-RU'] = require('./i18n/ru-RU.cjs');


let generic_locale = {
	locale: null,
	setLocale: function( locale ){
		this.locale = locale;
	}, 

	getMessage: function( message, args ){

		let out = null;

		if( messages[ this.locale ] && messages[ this.locale ][message] )
			out = messages[ this.locale ][message];
		else
			out = message;

		if( out instanceof Function ){

			out = out( args );
			

		} else if( args && args.length ){
			out = vsprintf(out, args);
		}

		return out.replace(/\n\t+/g,"\n");		

	}


};

exports.get = function(locale){

	let lobject = Object.assign({}, generic_locale);
	lobject.setLocale( locale );

	return lobject;

}