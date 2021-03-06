import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';
import FastAverageColor from 'fast-average-color';
import { CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import LoadPage from '../cmps/LoadPage';
import BoardColumns from '../cmps/BoardColumns';
import BoardHistory from '../cmps/BoardHistory';
import BoardTeamMembers from '../cmps/BoardTeamMembers';
import ColumnAddForm from '../cmps/ColumnAddForm';
import Login from '../cmps/Login';
import Filter from '../cmps/Filter';
// import Sort from '../cmps/Sort';
import SplashMenu from '../cmps/SplashMenu';
import TaskDetails from '../cmps/TaskDetails';
import DynamicMiniComponent from '../cmps/dynamics/DynamicMiniComponent';

import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import utils from '../services/utils';
import SocketService from '../services/SocketService';

import { loadBoard, updateBoard, setBoard } from '../actions/BoardActions';
import { logout, getLoggedInUser, getUsers } from '../actions/UserActions';

class Board extends Component {
  state = {
    filteredBoard: null,
    showColAddForm: true,
    showTaskDetails: false,
    showMiniTaskDetails: false,
    toggleLogin: false,
    toggleSplashMenu: false,
    showHistory: false,
    toggleBoardTeamMembers: false,
    miniTaskDetails: {},
    filterBy: null,
    sortBy: null,
    sortOrder: null,
    showTopMenuOptions: true,
    showAddForm: false,
    currColumnId: '',
    isBoardLoaded: false,
    isDarkBackground: null,
    filterIconMod: false,
    mobileMod: false
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;

    this.props.getUsers();
    this.props.getLoggedInUser();
    this.props.loadBoard(boardId);
    this.resize();
    window.addEventListener('resize', this.resize);

    SocketService.setup();
    SocketService.emit('boardId', boardId);
    SocketService.on('updateBoard', (board) => this.props.setBoard(board));
    SocketService.on('getNotification', (notification) => store.addNotification(notification));
  }

  componentDidUpdate(prevProps) {
    const boardId = this.props.match.params.id;
    if (this.state.isBoardLoaded) {
      if (prevProps.board.boardBgImage !== this.props.board.boardBgImage) {
        this.isDarkBackground();
      };
    } else if (boardId === this.props.board._id) {
      this.setState({ isBoardLoaded: true });
      this.isDarkBackground();
    };
    if (prevProps.board !== this.props.board && this.state.filterBy) {
      this.filterBoard(this.state.filterBy);
    }
    if (prevProps.board !== this.props.board && this.state.sortOrder) {
      this.sortBoard();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    SocketService.off('updateBoard');
    SocketService.off('getNotification');
    SocketService.terminate();
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
    if (!currTask) {
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
      newBoard.boardBgThumbnail = res
      const msg = `${this.props.user} changed background image`;
      const notificationType = 'success';
      this.props.updateBoard(newBoard, msg, notificationType);
    })
  }

  onSort = (sortBy, sortOrder) => {
    this.setState({ sortBy, sortOrder }, this.sortBoard);
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

  closeAddForm = () => {
    this.setState({ showAddForm: false });
  }

  openEditColumn = (colId) => {
    this.setState({ showTopMenuOptions: true, currColumnId: colId }, this.closeAddForm());
  }

  closeEditColumn = () => {
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

  filterBoard = (filterBy) => {
    if (!filterBy.title && !filterBy.teamMembers) return this.setState({ filteredBoard: null });
    this.setState({ filterBy });
    const clonedBoard = _.cloneDeep(this.props.board);
    const tasks = clonedBoard.tasks;
    const columns = { ...clonedBoard.columns };
    const matchedIds = [];
    const unmatchedIds = [];

    for (const taskKey in tasks) {

      let task = tasks[taskKey];
      let filterTitle = filterBy.title.toLowerCase();
      let title = task.title.toLowerCase();

      (title.includes(filterTitle)) ? matchedIds.push(taskKey) : unmatchedIds.push(taskKey);
    }
    if (filterBy.teamMembers) {
      for (const id of matchedIds) {
        let task = tasks[id];
        let teamMember = filterBy.teamMembers;
        let taskTeamMembers = task.taskTeamMembers;
        if (taskTeamMembers.length === 0) {
          unmatchedIds.push(id);
        } else {
          if (taskTeamMembers.every((taskTeamMember) => (taskTeamMember.username !== teamMember))) unmatchedIds.push(id);
        }
      }
    }

    for (const column in columns) {
      for (const unmatchedId of unmatchedIds) {
        if (columns[column].taskIds.includes(unmatchedId))
          columns[column].taskIds = columns[column].taskIds.filter(id => id !== unmatchedId);
      }
    }
    this.setState({ filteredBoard: clonedBoard });
  }

  // sortBoard = () => {
  //   if (!this.state.sortOrder) return this.setState({ filteredBoard: null });
  //   const board = this.state.filterBy ? this.state.filteredBoard : _.cloneDeep(this.props.board);
  //   const { sortBy, sortOrder } = this.state;
  //   let tasks = board.tasks;
  //   let keys = Object.keys(tasks);
  //   const tasksArray = Object.values(tasks);

  //   if (sortBy === 'createdAt') {
  //     tasksArray.sort((a, b) => a.createdAt - b.createdAt);
  //     tasks = tasksArray.reduce((acc, task) => {
  //       return { ...acc, [task.id]: task };
  //     }, {});
  //   }

  //   for (const column in board.columns) {
  //     let sortedTasks = [];
  //     for (const key of keys) {
  //       if (board.columns[column].taskIds.includes(key))
  //         sortedTasks.push(key);
  //     }
  //     if (sortedTasks.length === 0) {
  //       board.columns[column].taskIds = sortedTasks;
  //     } else {
  //       sortedTasks = ((sortOrder === 'asc') ? sortedTasks : sortedTasks.reverse());
  //       board.columns[column].taskIds = sortedTasks;
  //     };
  //   }
  //   this.setState({ filteredBoard: board });
  // }

  resize = () => {
    this.setState({
      filterIconMod: window.innerWidth < 1075 ? true : false,
      mobileMod: window.innerWidth < 550 ? true : false
    });
  }

  render() {
    if (!this.state.isBoardLoaded) return <LoadPage />
    let button;
    if (this.props.loggedInUser) {
      button = <ExitToAppIcon onClick={this.props.logout} />
    } else {
      button = <div className="login-btn flex"
        onClick={ev => this.toggleLogin(ev)}>
        <PersonOutlineIcon />
        <p>login</p>
      </div>
    }
    const boardToShow = (this.state.filteredBoard) ? this.state.filteredBoard : this.props.board;
    return (
      <div className="screen" onClick={this.closeAllTabs}>
        <div className="board-page fill-height flex column" style={{ backgroundImage: 'url(' + this.props.board.boardBgImage + ')', backgroundAttachment: 'fixed' }}>

          <div className="board-page-nav-bar flex align-center space-between">
            <div className="board-page-nav-bar-logo" onClick={this.goBack}> </div>
            <div className="flex align-center">
              {this.props.loggedInUser &&
                <div className="flex">
                  <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: 'rgba(223, 225, 230, 0.8)', color: '#172b4d' }} >
                    <div className="team-member-icon">
                      <p>
                        {utils.createUserIcon(this.props.loggedInUser.firstName,
                          this.props.loggedInUser.lastName)}
                      </p>
                    </div>
                  </div>

                  {!this.state.mobileMod ?
                    <div className="logged-in-user flex column">
                      <small>Logged as:</small>
                      <p> {this.props.loggedInUser.username}</p>
                    </div> : ''}
                </div>
              }
              {button}
            </div>
          </div>

          <div className="board-page-nav-bar-filters flex wrap align-center space-between">
            <div className="left-section flex align-center wrap" style={{ marginTop: 2 }}>
              <div className="left-section-mobile-mode flex align-center">
                <button
                  className={`board-page-nav-bar-filters nav-btn flex 
                ${(this.state.isDarkBackground) ? 'dark' : 'light'}`}
                  onClick={this.goBack} >
                  <HomeIcon />
                </button>


                <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

                {/* <Sort onSort={this.onSort} isDarkBackground={this.state.isDarkBackground} />
                {window.innerWidth < 489 ? '' :
                  <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>
                } */}

              </div>

              <Filter filterBoard={this.filterBoard}
                teamMembers={this.props.board.teamMembers}
                isDarkBackground={this.state.isDarkBackground} />



              {!this.state.mobileMod ?
                <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>
                : ''
              }
            </div>


            <div className="right-section flex align-center" style={{ marginTop: 2 }}>
              <div className="board-page-nav-bar-filters-item fill-height">
                <button
                  className={`nav-btn fill-height capitalize
                  ${(this.state.isDarkBackground) ? 'dark' : 'light'}`}
                  onClick={this.toggleBoardTeamMembers}>
                  {!this.state.filterIconMod ? <Typography component="p" className="flex align-center p-reset">
                    <GroupAddOutlinedIcon style={{ marginRight: 5 }} />
                    add members
                    </Typography> : <GroupAddOutlinedIcon />}
                </button>
              </div>

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <div className="board-page-nav-bar-filters-item fill-height">
                <button
                  className={`nav-btn fill-height capitalize
                  ${(this.state.isDarkBackground) ? 'dark' : 'light'}`}
                  onClick={(ev) => this.toggleSplashMenu(ev)}>
                  {!this.state.filterIconMod ? <Typography component="p" className="flex align-center p-reset">
                    <ImageSearchOutlinedIcon style={{ marginRight: 5 }} />
                    change background
                  </Typography> : <ImageSearchOutlinedIcon />}
                </button>
              </div>

              <div style={{ background: (this.state.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

              <div className="board-page-nav-bar-filters-item flex fill-height">
                <button
                  className={`nav-btn fill-height capitalize 
                  ${(this.state.isDarkBackground) ? 'dark' : 'light'}`}
                  onClick={this.toggleBoardHistory}>
                  {!this.state.filterIconMod ? <Typography component="p" className="flex align-center p-reset">
                    <HistoryOutlinedIcon style={{ marginRight: 5 }} />
                    show history
                  </Typography> : <HistoryOutlinedIcon />}
                </button>
              </div>
            </div>
          </div>


          <CSSTransition
            in={this.state.toggleSplashMenu}
            timeout={700}
            classNames="modal"
            unmountOnExit
          >
            <SplashMenu
              board={this.props.board}
              updateBoard={this.props.updateBoard}
              closeAllTabs={this.closeAllTabs}
              onAddImg={this.onAddImg}
              showUploadBgImg={this.state.closeAllTabs}
              isDarkBackground={this.isDarkBackground}
              user={this.props.loggedInUser ? this.props.loggedInUser.username : 'Guest'}
            />
          </CSSTransition>

          <div className="board-page-columns-container">
            <div className="flex align-start fill-height">
              <CSSTransition
                in={this.state.toggleLogin}
                timeout={700}
                classNames="modal"
                unmountOnExit
              >
                <Login
                  variant="outlined"
                  className="home-page-login"
                  toggleLogin={this.toggleLogin}
                  toggleState={this.state.toggleLogin} />
              </CSSTransition>
              <BoardColumns
                board={this.props.board}
                boardToShow={boardToShow}
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
                  <button className={`board-page-add-another-column-btn
                  ${(this.state.isDarkBackground) ? 'dark' : 'light'}`}
                    onClick={this.toggleAddColumn}>
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
          <CSSTransition
            in={this.state.showHistory}
            timeout={700}
            classNames="modal"
            unmountOnExit
          >
            <BoardHistory variant="outlined"
              className="home-page-login" history={this.props.board.history} />
          </CSSTransition>
          <CSSTransition
            in={this.state.toggleBoardTeamMembers}
            timeout={700}
            classNames="modal"
            unmountOnExit
          >
            <BoardTeamMembers board={this.props.board}
              users={this.props.users}
              updateBoard={this.props.updateBoard} />
          </CSSTransition>
        </div>
      </div>
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
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);