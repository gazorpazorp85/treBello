import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListBoard from '@material-ui/core/GridListTile';

import BoardPreview from "./BoardPreview";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 600,
    },
}));

function BoardsList({ boards }) {

    const classes = useStyles();

    return (
        <section className="boards-grid-list-main-container">
            <div className={classes.root}>
                <div className="boards-grid-list-inner-container">
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {boards.map(board => (
                            <GridListBoard
                                key={board.id}
                                cols={board.cols || 1}>
                                <Link to={`/board/${board.id}`}>
                                    <BoardPreview board={board} />
                                </Link>
                            </GridListBoard>
                        ))}
                    </GridList>
                </div>
            </div>
        </section>
    )
}

export default withRouter(BoardsList)