import React, {FC} from "react";
import divStyles from  "./styles.module.scss"

interface DivProps{
  textAlign?: "center" | "start" | "end"
  className?: string
}


const Div: FC<DivProps> = (props)=>{
  const { textAlign, className } = props
  
  let classes = [divStyles.div, className]
  if (textAlign){
    classes.push(divStyles["t-center"])
  }
  
  return (
    <div
      className={classes.join(" ")} >
      {props.children}
    </div>
  )
  
}

export default Div


// import React from "react";
// import createStyles from "UI/styles"
//
// // import "./div.scss"
//
// const Div = (props)=>{
//   const {style, bg, size, block,
//     p,  pt, pb, pl, pr, py, px,
//     m, mt, mb, ml, mr, mx, my, radius, color, border, ...attributes
//   } = props
//
//   const styles = createStyles(style, {
//     bg, border, color, p, pt, pb, pl, pr, py, px,
//     m, mt, mb, ml, mr, mx, my, radius
//   })
//
//
//    return (
//      <div
//         style={styles}
//         {...attributes} >
//         {props.children}
//      </div>
//   )
//
// }
//
// export default Div