import React from 'react';


export default function ScreenFilter(props) {
    return (
        <div className="screen-filter-cmp" onClick={_ => props.onToggle()}></div>
    )
}