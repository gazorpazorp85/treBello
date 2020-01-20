import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import pageLoading from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'
import Login from '../cmps/Login';

import { loadBoard, createBoard, updateBoardOffline } from '../actions/BoardActions';
import { logout } from '../actions/UserActions'

class EmptyBoard extends Component {

  state = {
    showAddColumn: true,
    showForm: false,
    isTaskDetailsOccupied: false,
    toggleLogin: false
  }

  componentDidMount() {
    let sessionBoard = JSON.parse(sessionStorage.getItem('board'));
    if (sessionBoard) {
      delete sessionBoard._id;
      this.props.updateBoardOffline(sessionBoard);
    } else {
      const boardId = '5e2581b51c9d44000081af2a';
      this.props.loadBoard(boardId);
    }
    // SocketService.setup();
    // SocketService.emit('chat topic', this.state.topic);
    // SocketService.on('chat addMsg', this.addMsg);
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

  toggleLogin = (ev) => {
    if (ev) ev.stopPropagation();
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  closeLogin = (ev) => {
    ev.stopPropagation()
    this.setState({ toggleLogin: false })
  }

  toggleTaskDetails = (currTask) => {
    if (!(currTask === undefined)) {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails, currTask }));
    } else {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails }));
    }
  }

  saveBoard = async () => {
    let board = this.props.board;
    delete board._id;
    board.createdBy = this.props.loggedInUser;
    const newBoard = await this.props.createBoard(board);
    this.props.history.push(`/board/${newBoard._id}`);
  }

  render() {

    if (!this.props.board.columns) return pageLoading();
    let loginButton, saveBoardButton;
    if (this.props.loggedInUser) {
      loginButton = <button className="empty-board-login-btn">
        <div onClick={this.toggleLogin}>LOGOUT</div>
      </button>
      saveBoardButton = <span onClick={this.saveBoard}>SAVE BOARD</span>
    } else {
      loginButton = <button className="empty-board-login-btn">
        <div onClick={this.toggleLogin}>LOGIN</div>
      </button>
    }

    return (
      <div className="board-page fill-height flex column" onClick={this.closeLogin}>
        <Button className="board-page-back-btn" variant="outlined" onClick={this.goBack} >
          <HomeIcon className="board-page-back-btn-icon" />
        </Button>

        <div className="board-page-nav-bar flex justify-center align-center">
          <div className="board-page-nav-bar-logo"> </div>
        </div>

        <div className="board-page-nav-bar-filters flex align-center">
          {this.props.loggedInUser && this.props.loggedInUser.username}
          <div>
            {loginButton}
            {saveBoardButton}
          </div>
        </div>
        {(this.state.toggleLogin) && <Login variant="outlined" className="home-page-login" toggleLogin={this.toggleLogin} />}
        <div className="board-page-columns-container fill-height">
          <div>
            <div className="flex align-start">
              <Login
                variant="outlined"
                className="home-page-login"
                toggleLogin={this.toggleLogin}
                toggleState={this.state.toggleLogin} />
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
  createBoard,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyBoard);