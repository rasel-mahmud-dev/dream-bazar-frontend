import classNames from  "classnames"
import * as React from "react"
import {CSSProperties, ReactNode} from "react";
import Col from  "../col/Col"
import "./style.scss"


type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;

export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};


type RowAligns = 'center' | 'top' | 'middle' | 'bottom' | 'stretch';
type RowJustify = 'start' | 'end' | 'center' | 'around' | 'between';
type RowDirection = 'row' | 'column';


export type Gutter = number | Partial<Record<Breakpoint, number>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: RowAligns;
  justify?: RowJustify;
  direction?: RowDirection;
  prefixCls?: string;
  wrap?: boolean;
}



const Row =  React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  
  const {
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap,
    direction,
    ...others
  } = props
  
  
  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });
  
  
  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);
  
  let rowClasses = classNames(
    "row",
    className,
    justify && `justify-${justify}`,
    align && `items-${align}`,
    direction && `flex-${direction}`
  )
  let rowStyle: CSSProperties = {...style}
  
  let isArray = Array.isArray(gutter)
  if(gutter){
    if(isArray){
      rowStyle.rowGap = gutter[1] + "px"
      rowStyle.marginLeft = -(gutter[0] / 2) + "px"
      rowStyle.marginRight = -(gutter[0] / 2) + "px"
    } else{
      rowStyle.rowGap = gutter + "px"
    }
  }
  
  function renderWithCol(){
    let copyCol = ""
    if(Array.isArray(children)) {
      return children && children.map((ch: any) => {
        let oldProps = {...ch.props}
        oldProps.style = {
          ...oldProps.style,
          paddingLeft: gutter[0] / 2 + "px",
          paddingRight: gutter[0] / 2 + "px",
        }
        return React.cloneElement(ch, oldProps)
      })
    } else {
      return  null
    }
  }
  
  
  
  return (
    <div className={rowClasses} style={rowStyle} onClick={props.onClick} >
      {isArray ? renderWithCol() : children }
    </div>
  );
  
})


Row.displayName = "Row"

export default  Row