
function createPositionStyle(style, otherStyles, cssEl, styleCssName){
  if(otherStyles[cssEl]){ 
    if(typeof otherStyles[cssEl] === "string" || typeof otherStyles[cssEl] === "number"){
      style[styleCssName] = otherStyles[cssEl] + "px"
    }
  } 
  
  if(otherStyles[`${cssEl}t`]) style[`${styleCssName}-top`] = otherStyles[`${cssEl}t`] + "px"
  if(otherStyles[`${cssEl}b`]) style[`${styleCssName}-bottom`] = otherStyles[`${cssEl}b`] + "px"
  if(otherStyles[`${cssEl}l`]) style[`${styleCssName}-left`] = otherStyles[`${cssEl}l`] + "px"
  if(otherStyles[`${cssEl}r`]) style[`${styleCssName}-right`] = otherStyles[`${cssEl}r`] + "px"
  if(otherStyles[`${cssEl}x`]){
    style[`${styleCssName}-left`] = otherStyles[`${cssEl}x`] + "px"
    style[`${styleCssName}-right`] = otherStyles[`${cssEl}x`] + "px"
  }
  if(otherStyles[`${cssEl}y`]){
    style[`${styleCssName}-top`] = otherStyles[`${cssEl}y`] + "px"
    style[`${styleCssName}-bottom`] = otherStyles[`${cssEl}y`] + "px"
  }
  
  
  return style
}
  // if(otherStyles.pb) style["padding-bottom"] = otherStyles.pb + "px"
  // if(otherStyles.p){ 
  //   if(typeof otherStyles.p === "string" || typeof otherStyles.p === "number"){
  //     style["padding"] = otherStyles.p + "px"
  //   }
  // }

function createStyles(initialStyle={}, otherStyles){
  let style = {...initialStyle} 

  if(otherStyles.bg){
    style["background"] = otherStyles.bg
  } 
  if(otherStyles.border){
    style["border"] = otherStyles.border
  } 
  if(otherStyles.color){
    style["color"] = otherStyles.color
  }
  if(otherStyles.radius){
    style["border-radius"] = otherStyles.radius
  }
  style = {...style, ...createPositionStyle(style, otherStyles, "p", "padding")}
  style = {...style, ...createPositionStyle(style, otherStyles, "m", "margin")}
  
  return style
}

export default createStyles