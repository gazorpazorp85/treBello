import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import BoardPreview from './BoardPreview';

function BoardsList({ boards, user, duplicateBoard }) {
    const templateBoards = boards.filter(board => board.isTemplate);
    const myBoards = (user) ? boards.filter(board => board.createdBy._id === user._id) : '';
    const myCollaboratedBoards = (user) ? boards.filter(board => {
        return board.teamMembers.find(teamMember => user._id === teamMember._id && user._id !== board.createdBy._id);
    }) : '';

    return (
        <section className="boards-list column">
            <div className="boards-list-main-inner-container-wrapper">
                <div className="boards-list-main-inner-container">
                    <h3 className="capitalize"> check our premade templates</h3>
                    <div className="boards-list-main-inner-container-grid flex justify-center column">
                        {templateBoards.map(board => (
                            <div className="boards-list-main-inner-container-grid-item pointer" key={board._id} onClick={() => duplicateBoard(board)}>
                                <BoardPreview board={board} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {user &&
                <div>
                    {(myBoards.length === 0) ?
                        <div className="capitalize flex justify-center noboards">
                            you haven't created a board yet! click on get started or try one of our premade templates!
                    </div> :
                        <div className="boards-list-main-inner-container-wrapper">
                            <div className="boards-list-main-inner-container">
                                <h3 className="capitalize">created boards</h3>
                                <div className="boards-list-main-inner-container-grid flex justify-center column">
                                    {myBoards.map(myBoard => (
                                        <NavLink className="boards-list-main-inner-container-grid-item" key={myBoard._id} to={`/board/${myBoard._id}`}>
                                            <BoardPreview board={myBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {(myCollaboratedBoards.length === 0) ?
                        <div className="capitalize flex justify-center noboards">
                            you're not collaborating on any boards yet
                    </div> :
                        <div className="boards-list-main-inner-container-wrapper">
                            <div className="boards-list-main-inner-container">
                                <h3 className="capitalize"> boards you collaborate on </h3>
                                <div className="boards-list-main-inner-container-grid flex justify-center column">
                                    {myCollaboratedBoards.map(myCollaboratedBoard => (
                                        <NavLink className="boards-list-main-inner-container-grid-item" key={myCollaboratedBoard._id} to={`/board/${myCollaboratedBoard._id}`}>
                                            <BoardPreview board={myCollaboratedBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>}
        </section>
    )
}

export default withRouter(BoardsList)