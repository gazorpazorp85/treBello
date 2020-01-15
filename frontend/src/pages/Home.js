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
        <div className="home img">
          <div>
            <p>
              login
            </p>
          </div>
          TREBELLO
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, laborum!</p>
          <Link to='/board'>Start</Link>
          <BoardList boards={this.props.boards} />
        </div>
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
