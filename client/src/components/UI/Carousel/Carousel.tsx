import React from "react" 
import "./Carousel.scss"


const Carousel = (props) => {
  const {children,   renderPrevBtn, renderNextBtn} = props 
  const [isOpenId, setOpenId] = React.useState(0)
  const [offsetWidth, setOffsetWidth] = React.useState(0)
  const [translateX, setTranslateX] = React.useState(0)
  const [carouselWidth, setCarouselWidth] = React.useState(0)
  const carouselRef = React.useRef(null)
  
  
  function calCarouselWidth(){
    let cw = 0
    if(carouselRef.current && carouselRef.current.parentElement.offsetWidth){
      cw = carouselRef.current.parentElement.offsetWidth
    } else{
      cw = window.innerWidth
    }
    setCarouselWidth(cw)
    setOffsetWidth(cw * children.length )
  }
  
  function handleResize(){
    calCarouselWidth()
  }
  
  React.useEffect(()=>{
    calCarouselWidth()
    window.addEventListener("resize", handleResize)
    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  }, [carouselRef.current])
  
  function renderItem(){
    return children.map((ch, i)=>{
      return <div className={["carousel-item", i ===isOpenId ? "open" : "close"].join(" ")}>{ch.props.children}</div>
    })  
  }
  
  function handleChange(direction){
    if(direction === "next"){
      let t =  translateX + carouselWidth
      setTranslateX(t >= offsetWidth ? 0 : t )
    } else{
       let t =  translateX - carouselWidth
      setTranslateX(t <= 0 ? 0 : t )
    }
  }
  
  return(
    <div ref={carouselRef} className="carousel-root" style={{width: carouselWidth + "px"}}>
      {renderPrevBtn 
      ? <div onClick={()=>handleChange("prev")} {...renderPrevBtn().props} className={["carousel-prev-btn", renderPrevBtn().props.className].join(" ")}>{renderPrevBtn().props.children}</div> 
      : <button onClick={()=>handleChange("prev")} className="carousel-prev-btn">Prev</button>
      }
      <div 
        className="carousel" 
        style={{
          width: offsetWidth + "px",
          transform: `translateX(-${translateX}px)`
        }}>
        {renderItem()} 
      </div>
      { renderNextBtn ? <div onClick={()=>handleChange("next")} {...renderNextBtn().props} className={["carousel-next-btn", renderNextBtn().props.className].join(" ")}>{renderNextBtn().props.children}</div> 
      : <button onClick={()=>handleChange("next")} className="carousel-next-btn">Next</button>
      }
    </div>
  )
}

export default Carousel