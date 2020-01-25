import React, { Component } from 'react'
import utils from '../services/utils'
import SearchIcon from '@material-ui/icons/Search';

export default class Sort extends Component {

    state = {
        splashImagesUrls: [],
        filterByName: ''
    }

    inputChange = ev => {
        this.setState({ filterByName: ev.target.value + " wallpaper"});
    }

    onSave = async () => {
        try {
            const splashImages = await utils.getImagesFromUnsplash(this.state.filterByName)
            let splashImagesUrls = []
            splashImages.forEach(image => {
                const UrlIndx = splashImagesUrls.findIndex(currUrl => currUrl === image.urls.full);
                if (UrlIndx >= 0) {
                    splashImagesUrls.splice(UrlIndx, 1)
                } else {
                    splashImagesUrls.push(image.urls.full);
                }
            })
            this.setState({ splashImagesUrls })
        } catch (err) {
            // res.status(401).send({ error: err })
        }
    }

    setBoardBackground = (ev) => {
        const newBoard = { ...this.props.board }
        newBoard.boardBgImage = ev.target.src;
        this.props.updateBoard(newBoard);
    }

    stopPropagation = (ev) => {
        ev.stopPropagation()
    }


    render() {
        return <div className={"splash-menu flex column align-center" + (this.props.toggleSplashMenu ? ' translateRight' : '')} 
        onClick={(ev) => this.stopPropagation(ev)}>

            <div className="flex column fill-width">
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
                <button className="splash-menu-search-bar-save-btn upload-btn">
                    <input style={{ display: "none" }} type="file" id="upload-img" onChange={this.props.onAddImg}></input>
                    <label htmlFor="upload-img">upload image</label>
                </button>
            </div>

            <div className="splash-images-container-wrapper">
                <div className="splash-images-container flex wrap fill-width" >
                    {this.state.splashImagesUrls.map(imageUrl => {
                        return <div key={imageUrl} className="splash-images-container-item flex wrap">
                            <img src={imageUrl} alt="oops.. didn't found it" onClick={(ev) => this.setBoardBackground(ev)}></img>
                        </div>
                    })
                    }
                </div>
            </div>
        </div>
    }
}