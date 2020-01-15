import React from "react";

export default function BoardPreview({ board }) {
    return (
        <section>
            <h5>{board.id} title: {board.columns[0].title}</h5>
        </section>  
    )
}