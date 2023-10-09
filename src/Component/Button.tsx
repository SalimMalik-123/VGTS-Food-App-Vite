import React from "react"

interface Props{
    label : string
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    className : string,
    minWidth? : number
}
const Button = (props:Props) => {

    return(
        <button 
            className={props.className}
             onClick={props.onClick}
             style={{minWidth:props.minWidth}}
             >{props.label}
             
             </button>
    )
}

export default React.memo(Button);