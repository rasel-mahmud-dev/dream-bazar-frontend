
import * as React from 'react';
import { FC } from 'react';
import classNames from "classnames"

import "./container.scss"


interface ContainerProps {
  maxWidth?: 100 | 1688 | 1200,
  noGutter?: boolean
}

const Container: FC<ContainerProps> = (props) => {

  const {  children, maxWidth, noGutter=false } = props

  const classes = classNames(
      "container",
      maxWidth ? `container-${maxWidth}` : ``,
      noGutter && `container--no-gutter`
  )

  return (
      <div data-test="container" className={classes}>
        {children}
      </div>
  );
}

export default Container;