import React, { Component } from 'react'

import SearchIcon from '@material-ui/icons/Search';

import utils from '../services/utils';

import office from '../unsplashdefaultdata/officequery';

export default class SplashMenu extends Component {

    state = {
        splashImagesUrls: office,
        filterByName: ''
    }

    inputChange = ev => {
        this.setState({ filterByName: ev.target.value });
    }

    onSave = async () => {
        try {
            const splashImages = await utils.getImagesFromUnsplash(this.state.filterByName)
            let splashImagesUrls = [];
            splashImages.forEach(image => {
                const UrlIndx = splashImagesUrls.findIndex(currUrl => currUrl === image.urls);
                if (UrlIndx >= 0) {
                    splashImagesUrls.splice(UrlIndx, 1)
                } else {
                    splashImagesUrls.push(image.urls);
                }
            })
            this.setState({ splashImagesUrls });
        } catch (err) {
            // res.status(401).send({ error: err });
        }
    }

    setBoardBackground = (imageUrl) => {
        const newBoard = { ...this.props.board }
        newBoard.boardBgImage = imageUrl.full;
        newBoard.boardBgThumbnail = imageUrl.small;
        const msg = `${this.props.user} changed background image`;
        const notificationType = 'success';
        this.props.isDarkBackground(newBoard.boardBgImage);
        this.props.updateBoard(newBoard, msg, notificationType);
    }

    stopPropagation = (ev) => {
        ev.stopPropagation()
    }

    render() {
        return <div className={"splash-menu flex column align-center" + (this.props.toggleSplashMenu ? ' translateLeft' : '')}
            onClick={(ev) => this.stopPropagation(ev)}>
            <div className="flex column fill-width filter-container">
                <div className="splash-menu-search-bar fill-width flex justify-center">
                    <input
                        type='text'
                        placeholder='Search by name...'
                        onChange={this.inputChange}
                    />
                    <button className="splash-menu-search-bar-save-btn" onClick={this.onSave}>
                        <SearchIcon />
                    </button>
                </div>
                <button className="splash-menu-search-bar-save-btn upload-btn capitalize">
                    <input style={{ display: "none" }} type="file" id="upload-img" onChange={this.props.onAddImg}></input>
                    <label htmlFor="upload-img">upload image</label>
                </button>
            </div>

            <div className="splash-images-container-wrapper">
                <div className="splash-images-container flex wrap fill-width" >
                    {this.state.splashImagesUrls.map(imageUrl => {
                        return <div key={imageUrl.small} className="splash-images-container-item flex wrap">
                            <img src={imageUrl.small} alt="oops.. didn't found it" onClick={() => this.setBoardBackground(imageUrl)}></img>
                        </div>
                    })
                    }
                </div>
            </div>
        </div>
    }
}