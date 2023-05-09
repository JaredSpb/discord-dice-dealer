module.exports = {
	repeater_help: function( state ){

		return `
			__Повторить бросок несколько раз__

			\`!5*8\`
			 ⤷ бросить \`1d${state.base} + 5\`... повторить 8 раз
			\`!8 * 2ad${state.base} + 5\`   
			 ⤷ бросить с преимуществом, добавить 5... повторить 8 раз
			\`!2ad${state.base} + 5 * 8\`   
			 ⤷ то же самое			 
		`;

	}

};


