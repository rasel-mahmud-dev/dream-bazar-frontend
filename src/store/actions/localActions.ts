import {PaginationType} from "reducers/productSlice";


export const getPagination =(paginations:PaginationType[] = [], where: any): (undefined | PaginationType)=>{
  let pagination = paginations.find(p=>p.where === where)
  return  pagination
}
