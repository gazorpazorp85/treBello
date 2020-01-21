import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';


import BoardPreview from "./BoardPreview";

function BoardsList({ boards }) {

    const newBoards = boards.filter(board => board._id !== '5e2581b51c9d44000081af2a');

    return (
        <section className="boards-list">
            <div className="boards-list-main-container flex justify-center">
                <div className="boards-list-main-inner-container flex">
                    {newBoards.map(board => (
                        <Link className="boards-list-main-inner-container-item" key={board._id} to={`/board/${board._id}`}>
                            <BoardPreview board={board} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default withRouter(BoardsList)