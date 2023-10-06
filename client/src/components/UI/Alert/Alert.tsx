import React, {FC, HTMLAttributes} from 'react';

import "./alert.scss"

interface AlertProps extends HTMLAttributes<HTMLElement> {
    message?: string
}


const Alert: FC<AlertProps> = (props) => {
    const {message, ...attr} = props

    return message ? (
        <div {...attr}>
            <div>{message}</div>
        </div>
    ) : null
};

export default Alert;