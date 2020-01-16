import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import Button from '@material-ui/core/Button';

import { loadBoard } from '../actions/BoardActions';

import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'

class Board extends Component {

  state = {
    showForm: false
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.loadBoard(boardId);
    // SocketService.setup();
    // SocketService.emit('chat topic', this.state.topic);
    // SocketService.on('chat addMsg', this.addMsg);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id
      !== this.props.match.params.id) {
      const boardId = this.props.match.params.id;
      this.props.loadBoard(boardId);
    }
  }

  componentWillUnmount() {
    // SocketService.off('chat addMsg', this.addMsg);
    // SocketService.terminate();
  }

  toggleAddForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }))
  }

  goBack = () => {
    this.props.history.push('/');
  }

  render() {
    // const classes = useStyles();

    if (!this.props.board.columns) return <div>Loading...</div>

    return (
      <div className="board-page fill-height flex column">
        <Button className="board-page-back-btn" variant="outlined" onClick={this.goBack}>Back</Button>
        <div className="board-page-nav-bar flex justify-center align-center">
          <div className="board-page-nav-bar-logo"> </div>
        </div>
        <div>
          <div>
            <div className="flex">

              <button onClick={this.toggleAddForm}>Add</button>
              {(this.state.showForm) ? <ColumnAddForm board={this.props.board} toggleAddForm={this.toggleAddForm} /> : ''}

            </div>
            <BoardColumns columns={this.props.board.columns} onEdit={this.onEdit} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boards.board
  };
};

const mapDispatchToProps = {
  loadBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);