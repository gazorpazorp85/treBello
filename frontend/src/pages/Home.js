import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Fab from '@material-ui/core/Fab';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BoardsList from '../cmps/BoardsList';
import Login from '../cmps/Login';

import utils from '../services/utils';

import { loadBoards, loadBoard, createBoard } from '../actions/BoardActions'
import { logout, getLoggedInUser } from '../actions/UserActions'

class Home extends Component {

  state = {
    toggleLogin: false,
    board: {
      teamMembers: [],
      tasks: {},
      columns: {},
      columnOrder: [],
      style: {},
      boardBgImage: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExMTc0M30',
      history: [],
      boardBgThumbnail: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMTc0M30'
    }
  }

  componentDidMount() {
    this.props.loadBoards();
    this.props.getLoggedInUser();
  }

  toggleLogin = (ev) => {
    ev.stopPropagation();
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  createBoard = async () => {
    let board = this.state.board;
    board.createdBy = this.props.loggedInUser || { _id: 'guest', username: 'guest' };
    this.createdBoardMessage(board);
    const newBoard = await this.props.createBoard(board);
    this.props.history.push(`/board/${newBoard._id}`);
  }

  duplicateBoard = async (board) => {
    let duplicatedBoard = { ...board };
    delete duplicatedBoard._id;
    delete duplicatedBoard.boardBgThumbnailTitleStyle;
    duplicatedBoard.history = [];
    duplicatedBoard.teamMembers = [];
    duplicatedBoard.title = '';
    duplicatedBoard.isTemplate = false;
    duplicatedBoard.createdBy = this.props.loggedInUser || { _id: 'guest', username: 'guest' };
    for (const task in duplicatedBoard.tasks) {
      duplicatedBoard.tasks[task].taskTeamMembers = [];
      duplicatedBoard.tasks[task].createdAt = Date.now();
    }
    this.createdBoardMessage(duplicatedBoard);
    const newBoard = await this.props.createBoard(duplicatedBoard);
    this.props.history.push(`/board/${newBoard._id}`);
  }

  createdBoardMessage = (board) => {
    const username = (this.props.loggedInUser) ? this.props.loggedInUser.username : 'Guest';
    let msg = `The Board was created by ${username}`;
    board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
  }


  sendMail = (mail) => {
    window.open('mailto:' + mail)
  }

  render() {
    let button;
    if (this.props.loggedInUser) {
      button = <ExitToAppIcon className="login-btn" onClick={this.props.logout} />
    } else {
      button = <div className="login-btn cursor-pointer flex" onClick={this.toggleLogin}>
        <PersonOutlineIcon />
        <p>login</p>
      </div>
    }

    return (
      <div className="home-page">
        {(this.state.toggleLogin) && <div className="home-page screen" onClick={this.toggleLogin}></div>}
        <section className="home-page-header">
          <div className="home-page-login flex justify-end align-center">
            {(this.props.loggedInUser) &&
              <div className="flex">
                <div className="team-member-icon flex align-center">
                  <p>
                    {utils.createUserIcon(this.props.loggedInUser.firstName,
                      this.props.loggedInUser.lastName)}
                  </p>
                </div>
                <p className="flex column" style={{ paddingRight: 10 }}>
                  <small>welcome!</small>
                  {this.props.loggedInUser.username}
                </p>
              </div>
            }
            {button}
          </div>
          <CSSTransition
            in={this.state.toggleLogin}
            timeout={700}
            classNames="modal"
            unmountOnExit>
            <Login
              className="home-page-login"
              toggleLogin={this.toggleLogin} />
          </CSSTransition>
          <div className="home-page-header-container flex">
            <div className="header-image flex align-center justify-center fill-width fill-height">
              <div className="login-get-started-container flex align-center justify-center align-center">
                <div className="home-page-logo-get-started flex column align-center">
                  <div className="home-page-header-container-logo-img fill-width fill-height"></div>
                  <div className="text-center">
                    <h2>Manage your tasks in a fun and easy way</h2>
                  </div>
                  <div className="get-started-btn">
                    <Fab variant="extended">
                      <p className="uppercase" onClick={this.createBoard}>
                        get started
                    </p>
                    </Fab>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-page-boards-list flex wrap colum justify-center">
          <div className="home-page-boards-list-img fill-width flex justify-center">
            <h3>
              We, in Trebello, believe that simplicity and style must go together,
            that's why we made our brand simple and easy to use for everyone.<br /> <br />
              Maximize your team workflow and take them one step ahead.</h3>
          </div>
        </section>

        <BoardsList boards={this.props.boards} user={this.props.loggedInUser} duplicateBoard={this.duplicateBoard} />

        <section className="home-page-footer flex column align-center justify-center">
          <div className="fill-width">
            <h2 className="text-center uppercase"> about us  </h2>
          </div>
          <div className="home-page-footer-team-members-cards-container flex wrap justify-center">
            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img vlad"></div>
              <div className="info fill-width flex space-between">
                <p>Vlad Batalin</p>
                <div className="flex">
                  <a href="https://www.linkedin.com/in/vlad-batalin-647725180/" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                  <EmailIcon onClick={() => this.sendMail('batalinvlad@gmail.com')} className="mail" />
                </div>
              </div>
              <span className="text-center fill-width">Full-stack development</span>
            </div>

            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img margad"></div>
              <div className="info fill-width flex space-between">
                <p>Margad Taikhir</p>
                <div className="flex">
                  <a href="https://www.linkedin.com/in/paolo-groppi-6ba84117b" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                  <EmailIcon onClick={() => this.sendMail('mtaikhir@gmail.com')} className="mail" />
                </div>
              </div>
              <span className="text-center fill-width">Full-Stack development</span>
            </div>

            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img paolo"></div>
              <div className="info fill-width flex space-between">
                <p>Paolo Groppi</p>
                <div className="flex">
                  <a href="https://www.linkedin.com/in/paolo-groppi-6ba84117b" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                  <EmailIcon onClick={() => this.sendMail('paolo.groppi@gmail.com')} className="mail" />
                </div>
              </div>
              <span className="text-center fill-width">Full-Stack development</span>
            </div>

          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards.boards,
    board: state.boards.board,
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  loadBoards,
  loadBoard,
  createBoard,
  getLoggedInUser,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);