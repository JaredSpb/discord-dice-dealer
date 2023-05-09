let sources = 'йцукенгшщзхъфывапролджэячсмитьбю'.split('');
let targets = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.'.split('');

let tr = {};
for( let i = 0; i < sources.length; i++ ){
	tr[sources[i]] = targets[i];
}

const cyr_tr = new RegExp(`[${sources.join('')}]`, 'gs');

exports.pre_route = function( request ){

	return request.replace( cyr_tr ,function(m){
		return tr[m];
	});

}
