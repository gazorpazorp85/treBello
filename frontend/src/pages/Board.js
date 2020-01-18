import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import pageLoading  from '../cmps/LoadPage'

import { loadBoard, updateBoard } from '../actions/BoardActions';

import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'

class Board extends Component {

  state = {
    showAddColumn: true,
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
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
      showAddColumn: !prevState.showAddColumn
    }))
  }

  goBack = () => {
    this.props.history.push('/');
  }

  render() {

    if (!this.props.board.columns) return pageLoading();

    return (
      <div className="board-page fill-height flex column">
        <Button className="board-page-back-btn" variant="outlined" onClick={this.goBack} >
          <HomeIcon className="board-page-back-btn-icon" />
        </Button>

        <div className="board-page-nav-bar flex justify-center align-center">
          <div className="board-page-nav-bar-logo"> </div>
        </div>

        <div className="board-page-nav-bar-filters flex align-center">
          <h2> [USERsNAMEs] [SEARCHandFILTERS] [FEATURES]  </h2>
        </div>

        <div className="board-page-columns-container fill-height">
          <div>
            <div className="flex align-start">
              <BoardColumns board={this.props.board} updateBoard={this.props.updateBoard} />
              <div className="flex column align-center">
                {(this.state.showAddColumn) ?
                  <button className="board-page-add-another-column-btn" onClick={this.toggleAddForm}>
                    + Add another list..  </button> : ''
                }
                {(this.state.showForm) ? <ColumnAddForm board={this.props.board}
                  toggleAddForm={this.toggleAddForm} /> : ''}
              </div>
            </div>
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
  loadBoard,
  updateBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);