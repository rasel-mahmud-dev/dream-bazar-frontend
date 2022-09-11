import React, {FC, HTMLAttributes} from "react"

import "./Spin.scss"


interface SpinProps extends HTMLAttributes<HTMLDivElement>{
  loaderClass?: string
  className?: string
}


const Spin: FC<SpinProps> = (props)=>{
  const {loaderClass, className, ...o} = props
  
  return (
    <div className={`spin ${className}`} {...o}>
      <span className={`loader_circle ${loaderClass}`} />
      <span className={`loader_circle ${loaderClass}`} />
      <span className={`loader_circle ${loaderClass}`} />
      <span className={`loader_circle ${loaderClass}`} />
    </div>
  )
}


export default Spin