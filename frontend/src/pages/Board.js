import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import pageLoading from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'
import Login from '../cmps/Login';

import { loadBoard, updateBoard } from '../actions/BoardActions';
import { logout } from '../actions/UserActions'
import TaskDetails from '../cmps/TaskDetails';

class Board extends Component {

  state = {
    showAddColumn: true,
    showForm: false,
    showTaskDetails: false,
    currTaskId: '',
    toggleUploadBgImg: false,
    isUploading: false,
    toggleLogin: false
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

  toggleLogin = () => {
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  toggleTaskDetails = (currTask) => {
    if (currTask === undefined) {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails }));
    } else if (this.state.showTaskDetails && currTask.id !== this.state.currTask.id) {
      this.setState({ currTask });
    } else {
      this.setState(prevState => ({ showTaskDetails: !prevState.showTaskDetails, currTask }));
    }
  }

  toggleUploadBgImg = () => {
    debugger
    this.setState(prevState => ({ toggleUploadBgImg: !prevState.toggleUploadBgImg }))
  }

  onAddImg = (ev) => {
    debugger
    const file = ev.target.files[0];
    // this.setState({ isUploading: true }, () => {
    // utils.uploadImg(file).then(res => {
    // const board = { ...this.props.board.columns }
    // const newBoard = {
    //     ...this.props.board,
    //     columns: {
    //         ...this.props.board.columns,

    //         [this.state.column.id]: this.state.column
    // .imgUrl = res we need to update the board
    //     }
    // };
    // const id = this.state.column.id;
    // const columnOrder = newBoard.columnOrder;
    // if (!columnOrder.includes(id)) columnOrder.push(id);
    // this.props.updateBoard(newBoard);

    // this.setState({ isUploading: false })
    // })
    // })
  }

  render() {

    if (!this.props.board.columns) return pageLoading();
    let button;
    if (this.props.loggedInUser) {
      button = <Button className="empty-board-login-btn">
        <div onClick={this.props.logout}>LOGOUT</div>
      </Button>
    } else {
      button = <button className="empty-board-login-btn">
        <div onClick={this.toggleLogin}>LOGIN</div>
      </button>
    }

    return (
      <div className="board-page fill-height flex column" onClick={this.closeLogin}>
        <Button className="board-page-back-btn" variant="outlined" onClick={this.goBack} >
          <HomeIcon className="board-page-back-btn-icon" />
        </Button>

        <div className="board-page-nav-bar flex justify-center">
          <div className="board-page-nav-bar-logo"> </div>
        </div>

        <div className="board-page-nav-bar-filters flex align-center">
        </div>
        {(this.state.toggleLogin) && <Login variant="outlined" className="home-page-login" toggleLogin={this.toggleLogin} />}
        <div className="board-page-columns-container fill-height">
          <div>
            <div className="flex align-start">
              <BoardColumns
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                toggleTaskDetails={this.toggleTaskDetails} />
              <div className="flex column align-center">
                {(this.state.showAddColumn) ?
                  <button className="board-page-add-another-column-btn" onClick={this.toggleAddForm}>
                    + Add another list..  </button> : ''
                }
                {(this.state.showForm) && <ColumnAddForm board={this.props.board} updateBoard={this.props.updateBoard}
                  toggleAddForm={this.toggleAddForm} />}
              </div>
            </div>
          </div>
        </div>
        {this.state.showTaskDetails && <TaskDetails
          taskId={this.state.currTask.id}
          board={this.props.board}
          column={this.state.currTask.column}
          updateBoard={this.props.updateBoard}
          toggleTaskDetails={this.toggleTaskDetails}
        />}

        {!this.state.toggleUploadBgImg ?
          <button className="add-bg-photo" onClick={this.toggleUploadBgImg}>ADD BG PHOTO</button>
          :
          <div className="upload-img-container">
            add image:<input type="file" id="upload-img" onChange={this.onAddImg}></input>
          </div>
        }


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
  updateBoard,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);