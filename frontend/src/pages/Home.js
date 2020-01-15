import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import BoardList from '../cmps/BoardList';

import { loadBoards } from '../actions/BoardActions'
class Home extends Component {

  componentDidMount() {
    this.props.loadBoards();
  }

  render() {
    return <div className="home">
      <section>
        <div className="home-header-container">
          <p className="home-login">LOGIN</p>
          <div className=" flex align-center justify-center">
            <div className="home-header-container-logo">
            </div>
          </div>
          <div className="fill flex justify-center">
            <Link to='/board'><button>GET STARTED</button></Link>
          </div>
        </div>
        <BoardList boards={this.props.boards} />
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
