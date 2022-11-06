import React from "react";


import './ResultItem.css'

const ResultItem = props => {
    return(
    <li id={props.index} key={props.index} >
        <a href={props.url} >
            <h3>{props.title}</h3>
        </a>
    </li>
    )
}

export default ResultItem;