import React from "react";
import { withRouter } from "react-router";
import BoardPreview from "./BoardPreview";

import { Link } from 'react-router-dom';

function BoardsList({boards}) {
    return (
        <section>
            <h1>boards</h1>
            <ul>
                {boards.map(board => (
                    <li key={board.id}>
                        <Link to={`/board/${board.id}`}><BoardPreview board={board} /></Link>
                        {board.id}
                    </li>

                ))}
            </ul>

        </section>
    )
}

export default withRouter(BoardsList)