import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import BoardsList from '../cmps/BoardsList';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import { loadBoards } from '../actions/BoardActions'
class Home extends Component {

  componentDidMount() {
    this.props.loadBoards();
  }

  render() {
    return <div className="home-page">
      <Button variant="outlined" className="home-page-login">
        <p>LOGIN</p>
      </Button>

      <section className="home-page-header">
        <div className="home-page-header-container">
          <div className="fill-height flex column align-center justify-center">
            <div className="home-page-header-container-logo">
              <div className="home-page-header-container-logo-img fill-width fill-height">
              </div>
            </div>
            <div className="fill-width flex justify-center get-started-btn">
              {/* <Link to='/board'> */}
              <Fab variant="extended">
                <p>GET STARTED</p>
              </Fab>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-boards-list">
        <div className="home-page-boards-list-inspiration text-center flex column align-center justify-center">
          <h2 >GET SOME INSPIRATION</h2>
            <ArrowDropDownCircleIcon />
        </div>
        <BoardsList boards={this.props.boards} />
      </section>

      <section className="home-page-footer">
      </section>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards.boards,
    //     users: state.user.users,
    //     loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  loadBoards
  //   loadUsers,
  //   addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
