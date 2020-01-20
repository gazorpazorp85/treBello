import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import BoardsList from '../cmps/BoardsList';
import Login from '../cmps/Login';

import { loadBoards } from '../actions/BoardActions'
import { logout } from '../actions/UserActions'

class Home extends Component {

  state = {
    toggleLogin: false,
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

  render() {
    let button;
    let styleForLogin = {
      right: "0px"
    }

    if (this.props.loggedInUser) {
      button = <Button variant="outlined" className="home-page-login-btn">
        <div onClick={this.props.logout}>LOGOUT</div>
      </Button>
    } else {
      button = <Button variant="outlined" className="home-page-login-btn">
        <div onClick={this.toggleLogin}>LOGIN</div>
      </Button>
    }

    return <div className="home-page" onClick={this.closeLogin}>

      <section className="home-page-header">

        <div variant="outlined" className="home-page-login flex justify-end align-center">
          {(this.props.loggedInUser) &&
            <p className="flex column">
              <small>welcome!</small>
              {this.props.loggedInUser.username}
            </p>
          }
          {button}
        </div>
        
          <Login style={styleForLogin}
            variant="outlined"
            className="home-page-login"
            toggleLogin={this.toggleLogin}
            toggleState={this.state.toggleLogin} />

        <div className="home-page-header-container">
          <div className="fill-height flex column align-center justify-center">
            <div className="home-page-header-container-logo">
              <div className="home-page-header-container-logo-img fill-width fill-height">
              </div>
            </div>
            <div className="fill-width flex justify-center get-started-btn">
              <Link to={'/board/getstarted'}>
              <Fab variant="extended">
                <p>GET STARTED</p>
              </Fab>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-boards-list">
        <div className="home-page-boards-list-inspiration text-center flex column align-center justify-center">
          <h2 >GET SOME INSPIRATION</h2>
          <ArrowDropDownCircleIcon className="home-page-list-inspiration-go-down-btn" />
        </div>
        <BoardsList boards={this.props.boards} />
      </section>

      <section className="home-page-footer flex column align-center justify-center">
        <h2> OUR TEAM </h2>
        <div className="home-pagge-footer-team-members-cards-container flex justify-center">

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
            <p>Margad T.</p>
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
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards.boards,
    // users: state.user.users,
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  loadBoards,
  logout
  //   loadUsers,
  //   addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
