import React, {FC} from 'react';

const tags = [ , "h1", "h2", "h3", "h4", "h5", "h6"]

import styles  from "./styles.module.scss"
// import divStyles from "UI/div/styles.module.scss";

interface PropsType {
  code?: boolean,
  copyable?: boolean,
  delete?: boolean
  disabled?: boolean
  editable?: boolean
  ellipsis?: boolean
  level?: 1 | 2 | 3 | 4 | 5 | 6
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  mark?: boolean
  onClick?: any
  italic?: boolean
  color?: boolean
  underline?: boolean,
  textAlign?: "center" | "start" | "end"
  className?: string
  children?: any
  	// Code style	boolean	false
  	// Whether to be copyable, customize it via setting an object	boolean | copyable	false	copyable
  	// Deleted line style	boolean	false
  	// Disabled content	boolean	false
  	// If editable. Can control edit state when is object	boolean | editable	false	editable
  	// Display ellipsis when text overflows, can configure rows and expandable by using object	boolean | ellipsis	false	ellipsis
  	// Set content importance. Match with h1, h2, h3, h4, h5	number: 1, 2, 3, 4, 5	1	5: 4.6.0
  	// Marked style	boolean	false
  	// Set the handler to handle click event	(event) => void	-
  	// Italic style	boolean	false	4.16.0
  	// Content type	secondary | success | warning | danger	-	success: 4.6.0
  	// Underlined style	boolean	false
}


const Title: FC<PropsType> = (props) => {
  
  const {
    code,
    copyable,
    disabled,
    editable,
    ellipsis,
    level,
    mark,
    onClick,
    italic,
    color,
    underline,
    weight,
    className,
    textAlign,
    
    ...attributes
} = props
  
  let Tag: React.ElementType | any = "h1"
  let classes = [ styles["title-text"], className]
  if(level){
    Tag = tags[level]
  }
  if(weight){
    classes.push(styles[`fw-${weight}`])
  }
  
  if (textAlign){
    classes.push(styles[`t-${textAlign}`])
  }
  
  
  
  return (
    <Tag className={classes.join(" ")} {...attributes}>
      {props.children}
    </Tag>
  );
};


Title.defaultProps = {
  weight: 400,
  level: 1
}

export default Title;