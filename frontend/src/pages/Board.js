import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';
import FastAverageColor from 'fast-average-color';


import LoadPage from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns';
import BoardHistory from '../cmps/BoardHistory';
import BoardTeamMembers from '../cmps/BoardTeamMembers';
import ColumnAddForm from '../cmps/ColumnAddForm';
import Login from '../cmps/Login';
import Filter from '../cmps/Filter';
import Sort from '../cmps/Sort';
import SplashMenu from '../cmps/SplashMenu';
import TaskDetails from '../cmps/TaskDetails';
import DynamicMiniComponent from '../cmps/dynamics/DynamicMiniComponent';

import HomeIcon from '@material-ui/icons/Home';
// import AddIcon from '@material-ui/icons/Add';

import utils from '../services/utils';
import SocketService from '../services/SocketService';

import { loadBoard, updateBoard, setBoard } from '../actions/BoardActions';
import { logout, getLoggedInUser, getUsers } from '../actions/UserActions';

class Board extends Component {

  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  state = {
    showColAddForm: true,
    showTaskDetails: false,
    showMiniTaskDetails: false,
    toggleLogin: false,
    toggleSplashMenu: false,
    showHistory: false,
    toggleBoardTeamMembers: false,
    miniTaskDetails: {},
    filterBy: {
      title: '',
      teamMembers: ''
    },
    sortBy: '',
    sortOrder: '',
    showTopMenuOptions: true,
    showAddForm: false,
    currColumnId: '',
    isBoardLoaded: false,
    isDarkBackground: null
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;

    this.props.getUsers();
    this.props.getLoggedInUser();
    this.loadBoard();
    // this.isDarkBackground();

    SocketService.setup();
    SocketService.emit('boardId', boardId);
    SocketService.on('updateBoard', (board) => this.props.setBoard(board));
    SocketService.on('getNotification', (notification) => store.addNotification(notification));
  }

  componentDidUpdate() {
    const boardId = this.props.match.params.id;
    if (this.state.isBoardLoaded) {
      return
    } else if (boardId === this.props.board._id) {
      this.setState({ isBoardLoaded: true });
      this.isDarkBackground();
    };
  }


  componentWillUnmount() {
    SocketService.off('updateBoard');
    SocketService.off('getNotification');
    SocketService.terminate();
  }

  loadBoard = () => {
    const boardId = this.props.match.params.id;
    const filterBy = this.state.filterBy;
    const sortBy = this.state.sortBy;
    const sortOrder = this.state.sortOrder;
    this.props.loadBoard(boardId, filterBy, sortBy, sortOrder);
  }

  toggleAddColumn = () => {
    this.setState((prevState) => ({
      showColAddForm: !prevState.showColAddForm,
    }))
  }

  goBack = () => {
    this.props.history.push('/');
  }

  toggleLogin = (ev) => {
    ev.stopPropagation()
    this.setState((prevState) => ({
      toggleLogin: !prevState.toggleLogin,
      showHistory: false,
      toggleBoardTeamMembers: false,
      toggleSplashMenu: false
    }))
  }

  closeAllTabs = (ev) => {
    ev.stopPropagation()
    this.setState({
      toggleLogin: false,
      toggleSplashMenu: false,
      showHistory: false,
      toggleBoardTeamMembers: false,
      showTopMenuOptions: false,
      showAddForm: false,
    });
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

  onAddImg = (ev) => {
    const file = ev.target.files[0];
    utils.uploadImg(file).then(res => {
      const newBoard = { ...this.props.board }
      newBoard.boardBgImage = res
      const msg = `${this.props.user} changed background image`;
      const notificationType = 'success';
      this.props.updateBoard(newBoard, msg, notificationType);
    })
  }

  onFilter = (filterBy) => {
    this.setState(prevState => ({ filterBy: { ...prevState.filterBy, ...filterBy } }), this.loadBoard);
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

  toggleSplashMenu = (ev) => {
    ev.stopPropagation();
    this.setState(prevState => ({
      toggleSplashMenu: !prevState.toggleSplashMenu,
      showHistory: false,
      toggleBoardTeamMembers: false,
      toggleLogin: false
    }));
  }

  toggleBoardHistory = (ev) => {
    ev.stopPropagation();
    this.setState(prevState => ({
      showHistory: !prevState.showHistory,
      toggleSplashMenu: false,
      toggleBoardTeamMembers: false,
      toggleLogin: false
    }));
  }

  toggleBoardTeamMembers = (ev) => {
    ev.stopPropagation();
    this.setState(prevState => ({
      toggleBoardTeamMembers: !prevState.toggleBoardTeamMembers,
      showHistory: false,
      toggleSplashMenu: false,
      toggleLogin: false
    }))
  }

  openAddForm = colId => {
    this.setState({ showAddForm: true, currColumnId: colId }, this.closeEditColumn);
  }

  closeAddForm = _ => {
    this.setState({ showAddForm: false });
  }

  openEditColumn = (colId) => {
    this.setState({ showTopMenuOptions: true, currColumnId: colId }, this.closeAddForm());
  }

  closeEditColumn = _ => {
    this.setState({ showTopMenuOptions: false });
  }

  isDarkBackground = async (img) => {
    const fac = new FastAverageColor();
    let backgroundImage = new Image();
    backgroundImage.crossOrigin = 'anonymous';
    backgroundImage.src = img || this.props.board.boardBgImage;
    try {
      const color = await fac.getColorAsync(backgroundImage, { algorithm: 'dominant' });
      (color.isDark) ? this.setState({ isDarkBackground: true }) : this.setState({ isDarkBackground: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    // if (!this.props.board.columns || this.props.match.params.id !== this.props.board._id) return <LoadPage />
    if (!this.state.isBoardLoaded) return <LoadPage />
    let button;
    if (this.props.loggedInUser) {
      button = <button className="board-page-nav-bar nav-btn"
        onClick={this.props.logout}>
        logout
      </button>
    } else {
      button = <button className="board-page-nav-bar nav-btn"
        onClick={ev => this.toggleLogin(ev)}>
        login
      </button>
    }

    return (
      <div className="screen" onClick={this.closeAllTabs}>
        <div className="board-page fill-height flex column" style={{ backgroundImage: 'url(' + this.props.board.boardBgImage + ')', backgroundAttachment: 'fixed' }}>

          <div className="board-page-nav-bar flex space-between">
            <div className="board-page-nav-bar-logo" onClick={this.goBack}> </div>
            <div className="flex align-center">
              {this.props.loggedInUser && <p className="logged-in-user">Logged in as: {this.props.loggedInUser.username}</p>}
              {button}
            </div>
          </div>

          <div className="board-page-nav-bar-filters flex align-center space-between">
            <div className="board-page-nav-bar-filters-item flex align-center">
              <button
                style={{
                  color: (this.state.isDarkBackground) ? 'white' : 'black',
                  background: (this.state.isDarkBackground) ? '#00000094' : '#ffffff4f'
                }}
                className="board-page-nav-bar-filters nav-btn flex"
                onClick={this.goBack} >
                <HomeIcon />
              </button>

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <Filter onFilter={this.onFilter}
                teamMembers={this.props.board.teamMembers}
                isDarkBackground={this.state.isDarkBackground} />

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <Sort onSort={this.onSort} isDarkBackground={this.state.isDarkBackground} />
            </div>

            <div className="flex">
              <div className="board-page-nav-bar-filters-item fill-height">
                <button
                  style={{
                    color: (this.state.isDarkBackground) ? 'white' : 'black',
                    background: (this.state.isDarkBackground) ? '#00000094' : '#ffffff4f'
                  }}
                  className="nav-btn fill-height capitalize"
                  onClick={this.toggleBoardTeamMembers}>add members</button>
              </div>

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <div className="board-page-nav-bar-filters-item fill-height">
                <button
                  style={{
                    color: (this.state.isDarkBackground) ? 'white' : 'black',
                    background: (this.state.isDarkBackground) ? '#00000094' : '#ffffff4f'
                  }}
                  className="nav-btn fill-height capitalize"
                  onClick={(ev) => this.toggleSplashMenu(ev)}>change background</button>
              </div>

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <div className="board-page-nav-bar-filters-item flex fill-height">
                <button
                  style={{
                    color: (this.state.isDarkBackground) ? 'white' : 'black',
                    background: (this.state.isDarkBackground) ? '#00000094' : '#ffffff4f'
                  }}
                  className="board-page-nav-bar-filters nav-btn capitalize"
                  onClick={this.toggleBoardHistory}>show history</button>
              </div>
            </div>
          </div>


          <SplashMenu
            toggleSplashMenu={this.state.toggleSplashMenu}
            board={this.props.board}
            updateBoard={this.props.updateBoard}
            closeAllTabs={this.closeAllTabs}
            onAddImg={this.onAddImg}
            showUploadBgImg={this.state.closeAllTabs}
            isDarkBackground={this.isDarkBackground}
            user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'}
          />

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
                toggleMiniDetails={this.toggleMiniDetails}
                user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'}
                currColumnId={this.state.currColumnId}
                openAddForm={this.openAddForm}
                closeAddForm={this.closeAddForm}
                openEditColumn={this.openEditColumn}
                closeEditColumn={this.closeEditColumn}
                showTopMenuOptions={this.state.showTopMenuOptions}
                showAddForm={this.state.showAddForm}
              />
              <div className="flex column align-center">
                {this.state.showColAddForm ?
                  <button style={{
                    color: (this.state.isDarkBackground) ? 'white' : 'black',
                    background: (this.state.isDarkBackground) ? '#00000094' : '#ffffff4f'
                  }} className="board-page-add-another-column-btn" onClick={this.toggleAddColumn}>
                    <span className="add-icon">+</span>Add another list</button> : ''}
                {!this.state.showColAddForm && <ColumnAddForm board={this.props.board} updateBoard={this.props.updateBoard}
                  toggleAddForm={this.toggleAddColumn} user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'} />}
              </div>
            </div>
          </div>

          {this.state.showTaskDetails && <TaskDetails
            taskId={this.state.currTask.id}
            board={this.props.board}
            column={this.state.currTask.column}
            updateBoard={this.props.updateBoard}
            toggleTaskDetails={this.toggleTaskDetails}
            user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'} />}
          {this.state.showMiniTaskDetails && <DynamicMiniComponent
            miniTask={this.state.miniTaskDetails}
            updateBoard={this.props.updateBoard}
            onToggle={this.toggleMiniDetails}
            board={this.props.board}
            user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'}
          />}

          <BoardHistory variant="outlined"
            className="home-page-login" history={this.props.board.history} showHistory={this.state.showHistory}
            toggleBoardHistory={this.toggleBoardHistory} />

          <BoardTeamMembers board={this.props.board}
            users={this.props.users} toggleBoardTeamMembers={this.state.toggleBoardTeamMembers}
            updateBoard={this.props.updateBoard} />
        </div>

      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boards.board,
    loggedInUser: state.user.loggedInUser,
    users: state.user.users
  };
};

const mapDispatchToProps = {
  loadBoard,
  updateBoard,
  logout,
  getLoggedInUser,
  setBoard,
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);