import React, { Component } from 'react';
import { connect } from 'react-redux';

// import SocketService from '../services/SocketService';

import { loadBoard } from '../actions/BoardActions';

// import GridList from '@material-ui/core/GridList';

import BoardColumns from '../cmps/BoardColumns'
import ColumnAddForm from '../cmps/ColumnAddForm'

class Board extends Component {

  state = {
    showForm: false
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.loadBoard(boardId);
    // SocketService.setup();
    // SocketService.emit('chat topic', this.state.topic);
    // SocketService.on('chat addMsg', this.addMsg);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id
      !== this.props.match.params.id) {
      const boardId = this.props.match.params.id;
      this.props.loadBoard(boardId);
    }
  }

  componentWillUnmount() {
    // SocketService.off('chat addMsg', this.addMsg);
    // SocketService.terminate();
  }

  toggleAddForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }))
  }

  addColumn = () => {
    console.log();
  }

  goBack = () => {
    this.props.history.push('/');
  }

  render() {
    // const classes = useStyles();

    if (!this.props.board.columns) return <div>Loading...</div>

    return <div className="board-page fill-height flex column">
      <div className="board-page-nav-bar flex justify-center align-center">
        <div className="board-page-nav-bar-logo"> </div>
      </div>
      <div>
        <button onClick={this.goBack}>Back</button>
      </div>
      <div className="root">
        {/* <button onClick={this.toggleAddForm}>Add</button> */}
        {(this.state.showForm) ? <ColumnAddForm addColumn={this.state.addColumn} /> : ''}
        <BoardColumns columns={this.props.board.columns} onEdit={this.onEdit} />
      </div>
    </div>

  }
}

const mapStateToProps = state => {
  return {
    board: state.boards.board
  };
};

const mapDispatchToProps = {
  loadBoard,
  // addColumn
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);