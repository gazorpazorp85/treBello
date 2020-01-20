import React from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


import BoardPreview from "./BoardPreview";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 750,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));



function BoardsList({ boards }) {

    const classes = useStyles();
    const newBoards = boards.filter(board => board._id !== '5e2581b51c9d44000081af2a');

    return (
        <section className="boards-grid-list-main-container">
            <div className={classes.root}>
                <div className="boards-grid-list-inner-container">
                    <GridList cellHeight={300} spacing={13} className={classes.gridList} >
                        {newBoards.map(board => (
                            <GridListTile key={board._id} cols={board.featured ? 2 : 1} rows={board.featured ? 2 : 1}>

                                <Link to={`/board/${board._id}`}>
                                    <BoardPreview key={board._id} board={board} />
                                </Link>

                                <GridListTileBar
                                    title="add-title"
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton aria-label={`star ${"add-title"}`} className={classes.icon}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    className={classes.titleBar}
                                />
                            </GridListTile>

                        ))}
                    </GridList>
                </div>
            </div>
        </section>
    )
}

export default withRouter(BoardsList)