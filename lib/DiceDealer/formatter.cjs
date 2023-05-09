exports.format = function( row, result_length ){

	let quote = '';
	let main = '';
	if(result_length == 1){
		quote = "\t\t";
		// main = "**```asciidoc\n= " + row.result + " ```**";
		// main = "**```coffeescript\n= " + row.result + " ```**";
		// main = "**```cs\n= " + row.result + " ```**";
		main = "=** " + row.result + "**";
		
	} else{
		quote = "\t\t";
		main = "=** " + row.result + "**";
	}
	quote += '`' + row.report.join('; ') + '`'

	return main + quote;
}