exports.post_roll = function( response, locale, state, result ){

	if( state.rtype == 'roll' && state.base == 20 ){

		for( let entry of result ){

			for( let report_object of entry.report ){

				if( report_object.base == state.base){
					if( report_object.max )
						report_object.updateReportString(' 🤩');
					else if( report_object.min )
						report_object.updateReportString(' 🤢');
				} 
			}

		}


	}

	return result;

}

