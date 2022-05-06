import qstring from "query-string" 


function qs(history: {location: {search: string}}){
  if(!history) return null
  return qstring.parse(history.location.search)  
}
export default qs