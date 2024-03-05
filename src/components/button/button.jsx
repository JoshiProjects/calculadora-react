import React from "react";
import './button.css';

export default props => {

    let className = 'button ';

    className += props.operation ? 'operation' : '';
    className += props.double ? 'double' : '';
    className += props.triple ? 'triple' : '';
    return (
    
        <button className={className}
            onClick={e => props.click(props.label)}>
            {props.label}
        </button>
    )
}

    
