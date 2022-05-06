import {PaginationType} from "reducers/productReducer";


export const getPagination =(paginations:PaginationType[] = [], where: any): (undefined | PaginationType)=>{
  let pagination = paginations.find(p=>p.where === where)
  return  pagination
}
