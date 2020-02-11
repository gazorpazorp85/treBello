import React, { Component } from "react";
// import FastAverageColor from 'fast-average-color';

export default class BoardPreview extends Component {

  // state = {
  //   textColor: '',
  //   isMounted: true
  // }

  // componentDidMount() {
  //   this.isDarkBackground();
  // }

  // componentWillUnmount() {
  //   this.state.isMounted = false;
  // }

  // isDarkBackground = async () => {
  //   const fac = new FastAverageColor();
  //   let backgroundImage = new Image();
  //   backgroundImage.crossOrigin = 'anonymous';
  //   backgroundImage.src = this.props.board.boardBgThumbnail;
  //   try {
  //     const color = await fac.getColorAsync(backgroundImage, { algorithm: 'dominant' });
  //     this.state.isMounted && this.setState({ textColor: color.isDark ? 'darkTitle' : 'lightTitle' });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  render() {
    return (
      <div className="board-preview card">
        <img src={this.props.board.boardBgThumbnail} alt="none" />
        <div className={`flex justify-center align-center title-container`}>
          <h2 className={`capitalize }`}>{this.props.board.title}</h2>
        </div>
      </div>
    );
  }
}
