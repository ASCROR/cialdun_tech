import React from "react";


const PreviousItem = (props) => {


    return(

        <li key={props.index} onClick={props.onClick} value={props.value}>
            {props.value}
        </li>
    )
}

export default PreviousItem;