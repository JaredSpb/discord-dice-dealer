module.exports = {
	'degrees_of_success': ':: degrees of success: `%s`',
	'show_sucess_rate_help': function( state ){

		return `
			__Show degrees of success for d100 rolls__

			Bot will auto calculate the degrees of success if the number to compare with is provided. This is triggered on regular roll only when the default dice is d100:

			\`!mode100\`
			⤷ switch default dice to d100
			\`!42\`
			 ⤷ roll \`1d100\` and print result with degrees of success relative to \`42\`

			\`!!42\`   
			 ⤷ will do the same no matter what the default dice is set to 
		`;


	}
};
