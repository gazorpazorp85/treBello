import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

import BoardsList from '../cmps/BoardsList';
import Login from '../cmps/Login';

import utils from '../services/utils';

import { loadBoards, loadBoard, createBoard } from '../actions/BoardActions'
import { logout } from '../actions/UserActions'

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
  }

  toggleLogin = (ev) => {
    if (ev) ev.stopPropagation();
    this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
  }

  closeLogin = (ev) => {
    ev.stopPropagation()
    this.setState({ toggleLogin: false })
  }

  createBoard = async () => {
    let board = this.state.board;
    const username = (this.props.loggedInUser) ? this.props.loggedInUser.username : 'Guest';
    let msg = `The Board was created by ${username}`;
    delete board._id;
    board.createdBy = this.props.loggedInUser;
    board.history.push({ id: utils.getRandomId(), msg: msg, time: Date.now() });
    const newBoard = await this.props.createBoard(board);
    this.props.history.push(`/board/${newBoard._id}`);
  }

  render() {
    let button;
    if (this.props.loggedInUser) {
      button = <Button className="home-page-login-btn"  onClick={this.props.logout}>
        <div>logout</div>
      </Button>
    } else {
      button = <Button className="home-page-login-btn" onClick={this.toggleLogin}>
        <div>login</div>
      </Button>
    }

    return (
      <div className="home-page" onClick={this.closeLogin}>
        <section className="home-page-header">
          <div className="home-page-login flex justify-end align-center">
            {(this.props.loggedInUser) &&
              <p className="flex column">
                <small>welcome!</small>
                {this.props.loggedInUser.username}
              </p>
            }
            {button}
          </div>
          <CSSTransition
            in={this.state.toggleLogin}
            timeout={700}
            classNames="modal"
            unmountOnExit
          >
            <Login
              className="home-page-login"
              toggleLogin={this.toggleLogin}
              toggleState={this.state.toggleLogin} />
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
          <div className="home-page-boards-list-img"></div>
          <p className="home-page-boards-list-start-new-board-right-text flex justify-center align-center">
            We, in Trebello, believe that simplicity and style must go together,
            that's why we made our brand simple and easy to use for everyone.<br /> <br />
            Organize your team and take them one step ahead.</p>
        </section>



        <BoardsList boards={this.props.boards} />

        <section className="home-page-footer flex column align-center justify-center">
          <h2> OUR TEAM </h2>
          <div className="home-pagge-footer-team-members-cards-container flex wrap justify-center">

            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img vlad"></div>
              <p>Vlad Batalin</p>
              <small>Design and overall technical support</small>
              <div className="flex">
                <LinkedInIcon className="linkedInIcon"></LinkedInIcon>
                <FacebookIcon className="faceBookIcon"></FacebookIcon>
              </div>
            </div>

            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img margad"></div>
              <p>Margad Taikhir</p>
              <small>High functionality backend support</small>
              <div className="flex">
                <LinkedInIcon className="linkedInIcon"></LinkedInIcon>
                <FacebookIcon className="faceBookIcon"></FacebookIcon>
              </div>
            </div>

            <div className="home-page-footer-team-member-card flex column align-center justify-center">
              <div className="home-page-footer-team-member-card-member-img paolo"></div>
              <p>Paolo Groppi</p>
              <small>High functionality and backend</small>
              <div className="flex">
                <a href="https://www.linkedin.com/in/paolo-groppi-6ba84117b" target="blank"><LinkedInIcon className="linkedInIcon"></LinkedInIcon></a>
                <a href="https://www.facebook.com/karma.tova" target="blank"><FacebookIcon className="faceBookIcon"></FacebookIcon></a>
              </div>
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
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
