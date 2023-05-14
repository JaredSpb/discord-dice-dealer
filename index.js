const eris = require('eris');
const fs = require('fs');
const path = require('path');

const parser = require('./lib/DiceDealer/parser.cjs');
const evaluator = require('./lib/DiceDealer/evaluator.cjs');
const formatter = require('./lib/DiceDealer/formatter.cjs');
const localisator = require('./lib/DiceDealer/localisator.cjs');
const mods = require('./lib/DiceDealer/mods.cjs');
const Response = require('./lib/DiceDealer/response.cjs');

// Grabbing Discord API key
let api_key_locations = [__dirname + '/key.txt'];
if( process.argv[2] )
	api_key_locations.unshift( 
		process.argv[2].indexOf('/') === 0
		? process.argv[2]
		: path.resolve(__dirname + '/', process.argv[2]) 
	);

let api_key;

for( let filepath of api_key_locations ){
	
	try{

		let stat = fs.statSync( filepath );
		if( stat.isFile() && stat.size ){
			fs.accessSync(filepath, fs.constants.R_OK );
			api_key = fs.readFileSync( filepath, 'utf8').trim();
		}				

	} catch( err ){}
}

if( !api_key ){
	console.error("\nNo API key provided! Please check key file location and readability.\n");
	console.log(`Usage:
		node index.js [path/to/api_key.txt]
		
			If no explicit API key file provided, the 'key.txt' will be searched in the current dir.
	`.replace(/^\t{2}/gm,''))
	process.exit(1);
}

// Create a Client instance with our bot token.
const bot = new eris.Client(api_key);

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});


let default_settings = {
	base: 20,
};
let channel_settings = {};

// Listening to the messages
bot.on('messageCreate', async (msg) => {

	let content = msg.content;
	let now = (new Date()).getTime();

	// Not a bot related request
	if( content.indexOf('!') !== 0 )
		return;

	// Cleanup channel settings older than 1 day
	for( let id in channel_settings){
		if( now - channel_settings[id].updated > 86400*1000 ){
			delete( channel_settings[id] );
		}
	}

	// Update the latest channel access timstamp
	if( channel_settings[msg.channel.id] )
		channel_settings[msg.channel.id].updated = now;

	// Init the request and its state
	let reciever = msg.member.nick ? msg.member.nick : msg.member.user.username;
	let result = null;
	let state = {
		locale: reciever.match(/[а-я]/i) ? 'ru-RU' : 'en-US',
		rtype: 'roll',
		sort_result: true
	}
	state.base = (
		channel_settings[msg.channel.id] 
			? channel_settings[msg.channel.id].base
			: default_settings.base
	);

	let locale = localisator.get( state.locale );

	let response = new Response();

	content = mods.pre_route( content );

	if( content == '!help' ){

		state.rtype = 'help';

		response.addMessage( locale.getMessage( 'help', state ) );

	} else if( 
		content.indexOf('!base') === 0 
		||
		content.indexOf('!mode') === 0 
	){

		state.rtype = 'base';

		let new_base = default_settings.base;
		if( content.match(/\d/) ){
			new_base = Number( content.replace(/[^0-9]/g,'') );
		}

		if( new_base == default_settings.base ){
			delete(channel_settings[msg.channel.id]);
		}
		else{
			channel_settings[msg.channel.id] = { base: new_base, updated: now };
		}

		response.addMessage( locale.getMessage('Setting default dice to d%s', [new_base]) );

	} else{

		let roll_request = content.substr(1);

		roll_request = mods.pre_parse( roll_request, state );

		let rolls = parser.parse( 
			roll_request
			, state.base
			, function( parsed ){


				response.addMessage( locale.getMessage('`%s` rolls `%s`', [reciever, parsed]) );

				if( state.repeat > 1 ){
					response.addMessage( locale.getMessage(' repeated `%s` times', [state.repeat]) );
				}

				response.addMessage( "\n" );
			}
		);

		rolls.repeat = state.repeat;

		try{

			if( rolls.repeat > 50 )
				throw "Too many repeats";


			result = evaluator.evaluate( rolls );

			if( state.sort_result ){
				result = result.sort(function(a,b){
					return b.result - a.result;
				});
			}

			result = mods.post_roll(		
				response,
				locale,
				state,
				result
			);


			response.addMessage( 
				result
					.map(function( row ){
						return formatter.format( row, result.length );
					})
					.join("\n"),
				'roll_result'
			);


			if( result.length > 1 ){

				response.addMessage(
					locale.getMessage("\nSumm: **`%s`**", [result.reduce(  (carry, r) => carry + r.result, 0)])
				);

			}

		} catch (err) {

			console.log(err);
			response.addMessage( "\n> Cannot do anything with this input, sorry.", 'ERROR');

		}

	}

	response = mods.pre_output(
		response,
		locale,
		state,
		result,
	);

	try {

		await msg.channel.createMessage( { content: response.compile() } );

	} catch (err) {

		// Catcing Eris message errors
		console.warn('Failed to respond to mention.');
		console.warn(err);

	}


});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();