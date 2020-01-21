import React from 'react';


export default function ScreenFilter(props) {
    return (
        <div className="screen-filter flex align-center justify-center" onClick={props.toggleTaskDetails}></div>
    )
}