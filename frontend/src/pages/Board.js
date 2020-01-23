import React, { Component } from 'react';
import { connect } from 'react-redux';

import pageLoading from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'
import Login from '../cmps/Login';
import Filter from '../cmps/Filter';
import Sort from '../cmps/Sort';
import TaskDetails from '../cmps/TaskDetails';
import DynamicMiniComponent from '../cmps/dynamics/DynamicMiniComponent';

import HomeIcon from '@material-ui/icons/Home';

import SocketService from '../services/SocketService';

import { loadBoard, updateBoard } from '../actions/BoardActions';
import { logout, getLoggedInUser } from '../actions/UserActions';


class Board extends Component {

  state = {
    showAddColumn: true,
    showForm: false,
    showTaskDetails: false,
    showMiniTaskDetails: false,
    currTaskId: '',
    toggleUploadBgImg: false,
    isUploading: false,
    toggleLogin: false,
    miniTaskDetails: {},
    filterBy: {
      title: ''
    },
    sortBy: '',
    sortOrder: ''
  }

  componentDidMount() {
    this.props.getLoggedInUser();
    this.loadBoard();
    const boardId = this.props.match.params.id;
    const filterBy = this.state.filterBy;
    const sortBy = this.state.sortBy;
    const sortOrder = this.state.sortOrder;
    SocketService.setup();
    SocketService.emit('boardId', boardId);
    SocketService.on('updateBoard', (board) => this.props.loadBoard(board._id, filterBy, sortBy, sortOrder));
  }

  componentWillUnmount() {
    SocketService.off('updateBoard');
    SocketService.terminate();
  }

  loadBoard = () => {
    const boardId = this.props.match.params.id;
    const filterBy = this.state.filterBy;
    const sortBy = this.state.sortBy;
    const sortOrder = this.state.sortOrder;
    this.props.loadBoard(boardId, filterBy, sortBy, sortOrder);
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
    ev.stopPropagation()
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  closeLogin = (ev) => {
    ev.stopPropagation()
    this.setState({ toggleLogin: false })
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

  // toggleUploadBgImg = () => {
  //   debugger
  //   this.setState(prevState => ({ toggleUploadBgImg: !prevState.toggleUploadBgImg }))
  // }

  // onAddImg = (ev) => {
  //   debugger
  //   const file = ev.target.files[0];
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
  // }

  onFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBoard);
  }

  onSort = (sortBy, sortOrder) => {
    this.setState({ sortBy, sortOrder }, this.loadBoard);
  }

  toggleMiniDetails = miniTask => {
    if (miniTask) {
      return this.setState(prevState => ({ showMiniTaskDetails: !prevState.showMiniTaskDetails, miniTaskDetails: miniTask }));
    }
    this.setState(prevState => ({ showMiniTaskDetails: !prevState.showMiniTaskDetails }));
  }


  render() {

    if (!this.props.board.columns) return pageLoading();
    let button;
    if (this.props.loggedInUser) {
      button = <button className="board-page-nav-bar nav-btn"
        onClick={this.props.logout}>
        logout
      </button>
    } else {
      button = <button className="board-page-nav-bar nav-btn"
        onClick={this.toggleLogin}>
        login
      </button>
    }

    return (
      <div className="screen" onClick={this.closeLogin}>
        <div className="board-page fill-height flex column">


          <div className="board-page-nav-bar flex space-between">
            <div className="board-page-nav-bar-logo" onClick={this.goBack}> </div>
            <div>
              <span className="plaster"> 
                {this.props.loggedInUser && `Logged in as: ${this.props.loggedInUser.username}`}
              </span>
              {button}
            </div>
          </div>

          <div className="board-page-nav-bar-filters flex align-center ">
            <div className="board-page-nav-bar-filters-item fill-height">
              <button className="board-page-nav-bar-filters nav-btn flex">
                <HomeIcon onClick={this.goBack} />
              </button>
            </div>
            <Filter onFilter={this.onFilter} />
            <Sort onSort={this.onSort} />
          </div>



          {(this.state.toggleLogin) && <Login variant="outlined" className="home-page-login" toggleLogin={this.toggleLogin} />}
          <div className="board-page-columns-container">

            <div className="flex align-start fill-height">
              <Login
                variant="outlined"
                className="home-page-login"
                toggleLogin={this.toggleLogin}
                toggleState={this.state.toggleLogin} />
              <BoardColumns
                board={this.props.board}
                updateBoard={this.props.updateBoard}
                toggleTaskDetails={this.toggleTaskDetails}
                toggleMiniDetails={this.toggleMiniDetails} />
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

          {this.state.showTaskDetails && <TaskDetails
            taskId={this.state.currTask.id}
            board={this.props.board}
            column={this.state.currTask.column}
            updateBoard={this.props.updateBoard}
            toggleTaskDetails={this.toggleTaskDetails} />}
          {this.state.showMiniTaskDetails && <DynamicMiniComponent
            miniTask={this.state.miniTaskDetails}
            updateBoard={this.props.updateBoard}
            onToggle={this.toggleMiniDetails}
            board={this.props.board}
          />}

          {!this.state.toggleUploadBgImg ?
            <button className="add-bg-photo" onClick={this.toggleUploadBgImg}>ADD BG PHOTO</button>
            :
            <div className="upload-img-container">
              add image:<input type="file" id="upload-img" onChange={this.onAddImg}></input>
            </div>
          }

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
  updateBoard,
  logout,
  getLoggedInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);