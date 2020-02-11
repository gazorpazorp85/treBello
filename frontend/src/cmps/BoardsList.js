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
            <h2 className="text-center uppercase"> check our premade templates</h2>
            <div className="boards-list-main-inner-container">
                {templateBoards.map(board => (
                    <div className="boards-list-main-inner-container-item pointer" key={board._id} onClick={() => duplicateBoard(board)}>
                        <BoardPreview board={board} />
                    </div>
                ))}
            </div>
            {user &&
                <div>
                    <h2 className="text-center uppercase"> {`${user.username}'s`} boards</h2>
                    {(myBoards.length === 0) ?
                        <div className="capitalize flex justify-center noboards">
                            you haven't created a board yet! click on get started or try one of our premade templates!
                    </div> :
                        <div className="boards-list-main-inner-container">
                            {myBoards.map(myBoard => (
                                <NavLink className="boards-list-main-inner-container-item" key={myBoard._id} to={`/board/${myBoard._id}`}>
                                    <BoardPreview board={myBoard} />
                                </NavLink>
                            ))}
                        </div>
                    }
                    <h2 className="text-center uppercase"> {`${user.username}`} is also a member of these boards</h2>
                    {(myCollaboratedBoards.length === 0) ?
                        <div className="capitalize flex justify-center noboards">
                            you are not a member of other boards
                    </div> :
                        <div>
                            <div className="boards-list-main-inner-container">
                                {myCollaboratedBoards.map(myCollaboratedBoard => (
                                    <NavLink className="boards-list-main-inner-container-item" key={myCollaboratedBoard._id} to={`/board/${myCollaboratedBoard._id}`}>
                                        <BoardPreview board={myCollaboratedBoard} />
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    }
                </div>}
        </section>
    )
}

export default withRouter(BoardsList)