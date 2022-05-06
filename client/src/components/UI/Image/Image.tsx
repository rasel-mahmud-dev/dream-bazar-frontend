import React from 'react'
import imageClasses from "./styles.module.scss"

type MaxWidthProps = 10 | 20 | 25 | 30| 50 | 60 | 80 | 100 | 120 | 150 | 180 | 200 | "avatar"

interface ImageProps {
  maxWidth: MaxWidthProps,
  src: string,
  alt?: string,
  srcSet?: string,
  children?: string | number | React.ReactElement,
  className?: string
}


export default function Image(props: ImageProps) {
  let { maxWidth,  src, alt, srcSet, className, children } = props
  
  let imgClass = [imageClasses.image, className]
  
  if(maxWidth === "avatar"){
    imgClass.push(imageClasses[`w-20`])
    imgClass.push(imageClasses["radius-circle"])
  } else {
    imgClass.push(imageClasses[`w-${maxWidth}`])
  }
  return (
    <div className={imgClass.join(" ")}>
      <img src={src} alt={alt} srcSet={srcSet} />
      { children }
    </div>
  )
}
