import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import BoardsList from '../cmps/BoardsList';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import { loadBoards } from '../actions/BoardActions'
class Home extends Component {

  componentDidMount() {
    this.props.loadBoards();
  }

  render() {
    return <div className="home-page">

      <section className="home-page-header">
        <div className="home-page-header-container">
          <Button variant="outlined" className="home-page-login">
            <p>LOGIN</p>
          </Button>
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
        <h2 className="text-center">GET SOME INSPIRATION</h2>
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
