import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import {Spotify} from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
  }

  addTrack(track) {
    let idArray = [];
    this.state.playlistTracks.forEach(track => {
      idArray.push(track.id);
    });
    if(!idArray.includes(track.id)) {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist});
    };
  }

  removeTrack(track) {
    let newPlaylist = [];
    this.state.playlistTracks.forEach(item => {
      if(item.id !== track.id) {
        newPlaylist.push(item);
      };
    });
    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({searchResults: results});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} onEnterPress={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;