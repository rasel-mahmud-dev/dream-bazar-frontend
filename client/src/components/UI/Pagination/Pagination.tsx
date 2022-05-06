import React, {FC} from "react";

import "./Pagination.scss"

interface PaginationPropsType {
  totalItem: number
  perPage: number
  currentPage: number
  onChange?: (e: any)=>void
  className?: string
}

const Pagination: FC<PaginationPropsType> = (props)=>{
  
  const { 
    totalItem,
    perPage, 
    currentPage=1, 
    onChange, 
    className, 
    ...attributes
  } = props
  
  const [activePage, setActivePage] = React.useState(props.currentPage)
  
  React.useEffect(()=>{
    setActivePage(currentPage)
  }, [currentPage])

    function getTotalPage(){ 
      return Math.ceil(totalItem / perPage)
    }
    
  
    function arr(){
      let arrR : any[] = []
      for(let i=1; i<=getTotalPage(); i++){
        arrR.push(i)
      }
      return arrR
    }
    
    function handlePageChange(page){  
     let p = typeof page !== "number"
        ? (page === "prev" ? activePage - 1 : activePage + 1)
        : page
        
        let len = getTotalPage()
        p = typeof page !== "number" && 
            p > len ? 1 : p === 0 ? len : p 
    
      setActivePage(p)
      onChange && onChange(p)
    }
    
    return (
      <div className="pagination"> 
      
      <div 
        onClick={()=>handlePageChange("prev")} 
        className={"pagination_item"}>
          <i className="fa fa-angle-left" />
        </div>  
      
      {
        arr().map((page)=>(
          <div onClick={()=>handlePageChange(page)} 
          className={[
            "pagination_item",
            activePage === page && "active_item"
          ].join(" ")}>{page}</div>    
        
        ))
      } 
      <div 
        onClick={()=>handlePageChange("next")} 
        className={"pagination_item"}>
          <i className="fa fa-angle-right" />
        </div>  
      
      </div>
    )
}

export default Pagination