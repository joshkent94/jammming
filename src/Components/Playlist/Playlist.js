import React from 'react';
import {TrackList} from '../Tracklist/Tracklist.js';
import './Playlist.css';

export class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
            <input defaultValue={'New Playlist'}/>
            {/* <Tracklist /> */}
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
};