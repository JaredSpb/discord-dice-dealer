module.exports = {
	repeater_help: function( state ){

		return `
			__Repeat roll several times__

			\`!5*8\`             
			 ⤷ roll \`1d${state.base} + 5\`... repeat 8 times
			\`!8 * 2ad${state.base} + 5\`   
			 ⤷ roll with advantage, add 5... repeat 8 times
			\`!2ad${state.base} + 5 * 8\`   
			 ⤷ just the same
		`;


	}

};


