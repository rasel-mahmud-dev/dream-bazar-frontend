export default function isoStringToDate(dateString: string){
    let result: string = ""
    if (dateString){
        result = new Date(dateString).toDateString();
    }
    
    return result
}
