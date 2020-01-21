import React from 'react';


export default function ScreenFilter(props) {
    return (
        <div className="screen-filter" onClick={props.onToggleScreenFilter}></div>
    )
}