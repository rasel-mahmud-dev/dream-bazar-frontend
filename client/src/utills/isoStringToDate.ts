export default function isoStringToDate(dateString: string){
    let result: string = ""
    if (dateString){
        let date  = new Date(dateString)
        result = date.toDateString() + "  " + date.toLocaleTimeString()
    }
    
    return result
}
