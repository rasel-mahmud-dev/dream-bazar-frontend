class Validator {

    protected fields: any = {}
    result: string  | {} = {}
    protected options = {
        abortEarly: false
    }

    constructor({...obj}, options?: { abortEarly: boolean }) {
        this.fields = obj;
        if (options?.abortEarly) {
            this.options.abortEarly = options?.abortEarly
        }
    }

    checkType(type: string, value: any, key: string) {
        let errorMessage: string | undefined

        if (type === "text") {
            errorMessage = typeof value !== "string" ? `${key} is not text` : ""
        } else if (type === "number") {
            errorMessage = isNaN(value) ? `${key} is not a number` : ""
        } else if (type === "object") {
            errorMessage = typeof value !== "object" ? `${key} is not a object` : ""
        } else if (type === "email") {
            let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            errorMessage = !value.match(mailFormat) ? `${key} is not a valid email.` : ""
        }
        return errorMessage
    }

    isEmpty(key: string, value: any) {
        if (!value) {
            return key + " required"
        } else {
            return value === "" ? key + " required" : ""
        }
    }

    checkLength(type: "min" | "max", length: number, value: any, key: string) {
        let errorMessage: string | undefined;
        if (type === "min") {
            if (value.length < length) {
                errorMessage = typeof value !== "object"
                    ? `${key} must be greater than ${length} character`
                    : `${key} value must be greater than ${length}`
            }
        } else {
            if (value.length >= length) {
                errorMessage = typeof value !== "object"
                    ? `${key} must be lower than ${length} character`
                    : `${key} value must be lower than ${length}`
            }
        }
        return errorMessage
    }

    setErrorMessage(key: string, message: string) {
        if (this.options.abortEarly) {
            this.result = message

        } else {
            this.result[key]  = message
        }
    }

    validate(obj: any) {
        for (let key in obj) {
            for (let validateKey in this.fields[key]) {

                if (obj[key]) {
                    if (validateKey === "required") {
                        let message = this.isEmpty(key, obj[key])
                        let customErrorMessage = this.fields[key].errorMessage
                        if (message && customErrorMessage) {
                            this.setErrorMessage(key, customErrorMessage)
                        }
                        if (message && !customErrorMessage) {
                            this.setErrorMessage(key, message)
                        }

                    } else if (validateKey === "min") {
                        let message = this.checkLength("min", this.fields[key][validateKey], obj[key], key)
                        let customErrorMessage = this.fields[key].errorMessage
                        if (message && customErrorMessage) {
                            this.setErrorMessage(key, customErrorMessage)
                        }
                        if (message && !customErrorMessage) {
                            this.setErrorMessage(key, message)
                        }

                    } else if (validateKey === "max") {
                        let message = this.checkLength("max", this.fields[key][validateKey], obj[key], key)
                        let customErrorMessage = this.fields[key].errorMessage
                        if (message && customErrorMessage) {
                            this.setErrorMessage(key, customErrorMessage)
                        }
                        if (message && !customErrorMessage) {
                            this.setErrorMessage(key, message)
                        }

                    } else if (validateKey === "type") {

                        let message = this.checkType(this.fields[key][validateKey], obj[key], key)
                        let customErrorMessage = this.fields[key].errorMessage
                        if (message && customErrorMessage) {
                            this.setErrorMessage(key, customErrorMessage)
                        }
                        if (message && !customErrorMessage) {
                            this.setErrorMessage(key, message)
                        }
                    }
                } else {
                    if (this.fields[key]["required"]) {
                        let message = this.isEmpty(key, obj[key])
                        let customErrorMessage = this.fields[key].errorMessage
                        if (message && customErrorMessage) {
                            this.setErrorMessage(key, customErrorMessage)
                        }
                        if (message && !customErrorMessage) {
                            this.setErrorMessage(key, message)
                        }

                    }
                }
            }
        }
        let errorObj = Object.keys(this.result)
        return errorObj && errorObj.length > 0 && this.result
    }
}

export default Validator