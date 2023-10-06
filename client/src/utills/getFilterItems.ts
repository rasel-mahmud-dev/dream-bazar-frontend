

interface filterItemType{
  attribute_name?: string
}


function getFilterItems(filterItems: filterItemType[] = [], attribute_names: any){
  let out : any[] = []
  filterItems.forEach((filterItem: filterItemType) => {
    
    if (attribute_names.indexOf(filterItem.attribute_name) !== -1) {
      out.push(filterItem)
    }
  })
  return out
}
export default getFilterItems