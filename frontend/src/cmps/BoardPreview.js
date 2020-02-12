import React, { Component } from "react";
import FastAverageColor from 'fast-average-color';

export default class BoardPreview extends Component {

  state = {
    textColor: ''
  }

  componentDidMount() {
    this.isDarkBackground();
  }

  isDarkBackground = async () => {
    const fac = new FastAverageColor();
    let backgroundImage = new Image();
    backgroundImage.crossOrigin = 'anonymous';
    backgroundImage.src = this.props.board.boardBgThumbnail;
    try {
      const color = await fac.getColorAsync(backgroundImage, { algorithm: 'dominant' });
      (color.isDark) ? this.setState({ textColor: 'darkTitle' }) : this.setState({ textColor: 'lightTitle' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="board-preview card">
        <img src={this.props.board.boardBgThumbnail} alt="none" />
        <div className={`flex justify-center align-center title-container ${this.state.textColor}`}>
          <h2 className={`capitalize ${this.state.textColor}`}>{this.props.board.title}</h2>
        </div>
      </div>
    );
  }
}
