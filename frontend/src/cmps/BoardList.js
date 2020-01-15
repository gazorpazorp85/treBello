import React from "react";
import { withRouter } from "react-router";
import BoardPreview from "./BoardPreview";

import { Link } from 'react-router-dom';

function BoardList({ boards, history }) {
    return (
        <section>
            <div className="board-list-container grid-container">
                    {boards.map(board => (
                        <div  className="board-list-item grid-item" key={board.id}>
                            <Link to={`/board/${board.id}`}><BoardPreview board={board} /></Link>
                            {board.id}
                        </div>

                    ))}
            </div>
        </section>
    )
}

export default withRouter(BoardList)