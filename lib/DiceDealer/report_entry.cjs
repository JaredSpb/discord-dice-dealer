module.exports = class {

	report_string = '';
	has_min = false;
	has_max = false;
	base = 0;

	updateReportString( str ){
		this.report_string += str;
	};

	set max( v ){
		this.has_max = true;
	}
	get max(){
		return this.has_max;
	}

	set min( v ){
		this.has_min = true;
	}
	get min(){
		return this.has_min;
	}

	set base( base ){
		this.base = base;
	}
	get base(){
		return this.base;
	}

	toString(){
		return this.report_string;
	}

};
