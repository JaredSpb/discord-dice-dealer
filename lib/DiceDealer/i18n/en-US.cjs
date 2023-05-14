const fs = require('fs');

let messages = {
	help: function( state ){
		return `
			__How to roll:__

			\`!1d${state.base}\`
			 ⤷ roll \`1d${state.base}\` (\`d${state.base}\`, \`1d\` or just \`d\` will work too)
			\`!\`                
			 ⤷ same as above, yes just \`!\` mark

			\`!1d${state.base} + 5\`        
			 ⤷ roll \`1d${state.base}\` and add 5 (\`d${state.base} + 5\`, \`1d + 5\`, just \`d + 5\` will work too)
			\`!5\`
			 ⤷ same as above

			\`!1d${state.base} + 1d4 + 5 \`
			⤷ roll \`1d${state.base}\` plus \`1d4\`, add 5

			\`!2ad${state.base}\`
			 ⤷ roll with advantage (\`ad${state.base}\`, \`ad\`, yeah, works aswell)
			\`!2da${state.base}\`
			 ⤷ roll with disadvantage (\`da${state.base}\`, \`da\` - works again)

			\`!2d6 + 6 r\`       
			 ⤷ reroll one's
			\`!2d6 + 6 с\`       
			 ⤷ critical hit, roll dices twice
			\`!2d6 rc + 6\`      
			 ⤷ both the aboves, \`r\` and \`c\` flags position don't matter

			Spaces don't matter.

			Max dices to roll: 100d1000

			__Set default dice:__

			!base ${state.base == 20 ? '100' : '20'}
			!mode ${state.base == 20 ? '100' : '20'}
			 ⤷ set default dice to d${state.base == 20 ? '100' : '20'}, spaces still dont't matter

		`;

	},
}

for( let k of fs.readdirSync( __dirname + '/en-US' ) ){

	let mod = require( __dirname + '/en-US/' + k );

	for( let msg in mod ){
		messages[ msg ] = mod[msg];
	}

}

module.exports = messages;
