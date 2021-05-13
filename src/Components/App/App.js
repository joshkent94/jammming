import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'Your Power',
          artist: 'Billie Eilish',
          album: 'Your Power',
          uri: 1
        },
        {
          id: 2,
          name: 'Bunny',
          artist: 'Tourist',
          album: 'Wild',
          uri: 2
        },
        {
          id: 4,
          name: 'Keep Moving',
          artist: 'Jungle',
          album: 'Keep Moving',
          uri: 4
        }],
      playlistName: 'Chill',
      playlistTracks: [
        {
          id: 1,
          name: 'Your Power',
          artist: 'Billie Eilish',
          album: 'Your Power',
          uri: 1
        },
        {
          id: 2,
          name: 'Bunny',
          artist: 'Tourist',
          album: 'Wild',
          uri: 2
        },
        {
          id: 3,
          name: 'Chemicals',
          artist: 'SG Lewis',
          album: 'Times',
          uri: 3
        }]
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
    return trackURIs;
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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