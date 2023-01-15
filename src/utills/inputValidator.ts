/**
 * use this function for input validation
 */

function validator(validate, value){

    if(!validate) return  ""

    if ("required" in validate) {
        if (!value) return validate["required"];
    }

    if ("number" in validate) {
        if (isNaN(Number(value))) return validate["number"];
    }

    if ("minLength" in validate) {
        if (value && typeof value === "string" && value.length < validate.minLength.value) return validate["minLength"].message;
    }

    if ("maxLength" in validate) {
        if (value && typeof value === "string" && value.length > validate.maxLength.value) return validate["maxLength"].message;
    }

    if ("length" in validate) {
        console.log(value)
        if (value && value.length !== validate.length.value) return validate["length"].message;
    }

    if ("min" in validate) {
        if (value && value < validate.min.value) return validate["min"].message;
    }
    if ("max" in validate) {
        if (value && value > validate.max.value) return validate["max"].message;
    }

    if("regex" in validate){
        if(value){
            return validate["regex"].value.test(value) ? "" : validate["regex"].message
        } else {
           return  validate["regex"].message
        }
    }
    return  ""
}

export default validator;
