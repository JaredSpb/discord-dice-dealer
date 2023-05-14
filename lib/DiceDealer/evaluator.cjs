const report_entry = require('./report_entry.cjs');

const upperindex = ['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];

const runner = {

	sanityCheck: function( edges, dices ){
		if( edges > 1000 || dices > 100 )
			throw 'Thats too much for me';
	},
	
	// Unified advatange/disadvantage rolls
	dd: function( edges, dices, flags, report, adv ){

		this.sanityCheck( edges, dices );

		let result = (adv ? 1 : edges);
		let rolls = [];

		if(dices == 1) dices = 2;

		let report_entry_object = new report_entry();
		report_entry_object.base = edges;

		Array(dices).fill('').forEach(function(){
			let roll = Math.ceil(Math.random() * edges);

			rolls.push( roll );
			if( adv && roll > result )
				result = roll;
			if( !adv && roll < result )
				result = roll;
		});

		// Notifiying response object that it contains
		// either max or min value
		if( adv ){
			if( Math.max(...rolls) === edges )
				report_entry_object.max = true;
			else if( Math.max(...rolls) === 1 )
				report_entry_object.min = true;
		} else{
			if( Math.min(...rolls) === 1 )
				report_entry_object.min = true;
			else if( Math.min(...rolls) === edges )
				report_entry_object.max = true;
		}


		let active_roll_marked = false
		for (let i = 0; i < rolls.length; i++) {
			if( rolls[i] != result || active_roll_marked )
				rolls[i] = String(rolls[i]).replace(/./g,function(m){ return upperindex[m] });
			if( rolls[i] == result && !active_roll_marked )
				active_roll_marked = true;
		}

		report_entry_object.updateReportString( `${dices}${adv?'ad':'da'}${edges} [ ${ rolls.join(", ") } ]` );

		report.push( report_entry_object );
		return result;

	},
	// Disadvantage rolls 
	da: function( edges, dices, flags, report ){
		return this.dd( edges, dices, flags, report, false );
	},
	// Advantage rolls 
	ad: function( edges, dices, flags, report ){
		return this.dd( edges, dices, flags, report, true );
	},
	// Regular rolls 
	d: function( edges, dices, flags, report ){

		this.sanityCheck( edges, dices );

		let result = 0;
		let rolls = [];

		let report_entry_object = new report_entry();
		report_entry_object.base = edges;

		Array( dices * (flags.c ? 2 : 1) ).fill('').forEach(function(){

			let roll = Math.ceil(Math.random() * edges);

			if( roll == 1 && flags.r  ){
				rolls.push( '¹' );
				roll = Math.ceil(Math.random() * edges);
			}

			if( roll == 1 )
				report_entry_object.min = true;
			if( roll == edges )
				report_entry_object.max = true;

			rolls.push( roll );

			result += roll;

		})

		report_entry_object.updateReportString( `${dices}d${edges} ${flags.c?'x2 ':''}[` + rolls.join(",") + ']' + (dices == 1 ? '' : `:${result}` ) );
		report.push( report_entry_object );

		return result;
	},
	'+': function( a, b, flags, report ){
		return a + b;
	},
	'-': function( a, b, flags, report ){
		return b - a;
	}
};


exports.evaluate = function( defs, amount ){

	let rolls = [];

	for( let i = 0; i < defs.repeat; i++ ){

		let roll = {
			result: 0,
			report: []
		};

		let stack = [];
		for (let j = 0; j < defs.formula.length; j++) {

			let token = defs.formula[j];

			if( runner.hasOwnProperty( token ) ){
				stack.push(
					runner[ token ]( 
						stack.pop(),
						stack.pop(),
						defs.flags, 
						roll.report 
					) 
				);
			}
			else{
				let value = parseInt(token);
				if( isNaN( value ) )
					throw "Cannot evaluate";

				stack.push( value );
			}
		}

		if( isNaN( stack[0] ) )
			throw "Cannot evaluate";

		roll.result = stack[0];
		rolls.push( roll );
	}

	return rolls;

}
