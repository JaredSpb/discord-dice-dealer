const fs = require('fs');

let messages = {
	'Setting default dice to d%s': 'Кость по-умолчанию теперь d%s',

	'`%s` rolls `%s`': '`%s` бросает `%s`',
	' repeated `%s` times': ' вот столько раз подряд: `%s`',
	"\nSumm: **`%s`**": "\nСумма: **`%s`**",
	"\n> Cannot do anything with this input, sorry. Mayby wrong mode? Current is %s.": "\n> Не понимаю, что с этим делать, простите. Может не в том режиме? Текущий: %s.",

	help: function(state){ 
		return `
			__Как бросать:__

			\`!1d${state.base}\`            
			 ⤷ бросить \`1d${state.base}\` (\`d${state.base}\`, \`1d\` или просто \`d\` тоже сработает)
			\`!\`                
			 ⤷ то же самое; да, просто знак \`!\`

			\`!1d${state.base} + 5\`        
			 ⤷ бросить \`1d${state.base}\` и добавить 5 (\`d${state.base} + 5\`, \`1d + 5\`, просто \`d + 5\` тоже сработает)
			\`!5\`               
			 ⤷ то же самое

			\`!1d${state.base} + 1d4 + 5 \`
			⤷ бросить \`1d${state.base}\` плюс \`1d4\`, добавить 5

			\`!2ad${state.base}\`           
			 ⤷ бросить с преимуществом (\`ad${state.base}\`, \`ad\`, ага, сработает)
			\`!2da${state.base}\`           
			 ⤷ бросить с помехой (\`da${state.base}\`, \`da\` - и снова сработает)

			\`!2d6 + 6 r\`       
			 ⤷ перебросить единички
			\`!2d6 + 6 с\`       
			 ⤷ критическое попадание, бросить кубы в двойном количестве
			\`!2d6 rc + 6\`      
			 ⤷ оба флага сразу, позиции флагов \`r\` и \`c\` неважны

			Пробелы неважны.

			Максимально возможный бросок: 100d1000

			__Сменить кость по-умолчанию:__

			!base ${state.base == 20 ? '100' : '20'}
			!mode ${state.base == 20 ? '100' : '20'}
			 ⤷ выставить кость по умолчанию d${state.base == 20 ? '100' : '20'}, пробелы неважны
		`
	},

}

for( let k of fs.readdirSync( __dirname + '/ru-RU' ) ){

	let mod = require( __dirname + '/ru-RU/' + k );

	for( let msg in mod ){
		messages[ msg ] = mod[msg];
	}

}

module.exports = messages;
