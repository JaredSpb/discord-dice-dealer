module.exports = class {

	messages = [];
	queue = [];

	addMessage( message, name ){

		for( let i = 0; i < this.queue.length; i++ ){
			if( this.queue[i].target == name ){
				message += this.queue[i].data;
				this.queue[i] = null;
			}
		}
		this.queue = this.queue.filter( (e) => e !== null );

		this.messages.push({
			data: message,
			name: name
		});
	};

	compile(){
		return this.messages.map( (e) => e.data ).join('');
	}

	extendMessage(name, extension){

		for( let msg of this.messages ){
			if( msg.name === name ){
				msg.data += extension;
				return;
			}
		}

		this.queue.push({
			target: name,
			data: extension
		});

	}



};