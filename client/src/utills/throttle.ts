
function throttle(fn, delay: number){
	let time = Date.now()
	let id;

	return function (){

		clearTimeout(id);

		if((time + delay) < Date.now()){
			fn();
			time = Date.now();
		}
		
		id = setTimeout(()=>{
			fn()
		}, delay)
		
	}
}

export default throttle