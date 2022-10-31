function errorMessageCatch(ex){
	let message = ""
	
	if(ex.response && ex.response.data){
		
		if(ex.response.data.message){
			message = ex.response.data.message
		} else {
			message = ex.response.data
		}
	} else if (typeof ex === "object" && ex.message) {
		message = ex.message
	} else if (typeof ex === "string") {
        message = ex
    }
	
	return message
}

export default errorMessageCatch