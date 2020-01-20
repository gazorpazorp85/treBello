import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import pageLoading from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'
import Login from '../cmps/Login';

import { loadBoard, updateBoardOffline } from '../actions/BoardActions';
import { logout } from '../actions/UserActions'

class EmptyBoard extends Component {

  state = {
    showAddColumn: true,
    showForm: false,
    isTaskDetailsOccupied: false
  }

  componentDidMount() {
    let sessionBoard = JSON.parse(sessionStorage.getItem('board'));
    if (sessionBoard) {
      this.props.updateBoardOffline(sessionBoard);
    } else {
      const boardId = '5e24d21b1c9d440000023b90';
      this.props.loadBoard(boardId);
    }
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

  toggleLogin = () => {
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  toggleTaskDetails = (currTask) => {
    if (!(currTask === undefined)) {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails, currTask }));
    } else {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails }));
    }
  }

  render() {

    if (!this.props.board.columns) return pageLoading();
    let button;
    if (this.props.loggedInUser) {
      button = <span onClick={this.props.logout}>LOGOUT</span>

    } else {
      button = <span onClick={this.toggleLogin}>LOGIN</span>
    }

    return (
      <div className="board-page fill-height flex column">
        <Button className="board-page-back-btn" variant="outlined" onClick={this.goBack} >
          <HomeIcon className="board-page-back-btn-icon" />
        </Button>

        <div className="board-page-nav-bar flex justify-center align-center">
          <div className="board-page-nav-bar-logo"> </div>
        </div>

        <div className="board-page-nav-bar-filters flex align-center">
          <h2> {this.props.loggedInUser && this.props.loggedInUser.username} {button}[SEARCHandFILTERS] [FEATURES]  </h2>
        </div>
        {(this.state.toggleLogin) && <Login variant="outlined" className="home-page-login" toggleLogin={this.toggleLogin} />}
        <div className="board-page-columns-container fill-height">
          <div>
            <div className="flex align-start">
              <BoardColumns
                board={this.props.board}
                updateBoard={this.props.updateBoardOffline}
                toggleTaskDetails={this.toggleTaskDetails}
              />
              <div className="flex column align-center">
                {(this.state.showAddColumn) ?
                  <button className="board-page-add-another-column-btn" onClick={this.toggleAddForm}>
                    + Add another list..  </button> : ''
                }
                {(this.state.showForm) && <ColumnAddForm board={this.props.board} updateBoard={this.props.updateBoardOffline}
                  toggleAddForm={this.toggleAddForm} />}
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
    board: state.boards.board,
    loggedInUser: state.user.loggedInUser
  };
};

const mapDispatchToProps = {
  loadBoard,
  updateBoardOffline,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyBoard);