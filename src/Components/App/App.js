import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'Your Power',
          artist: 'Billie Eilish',
          album: 'Your Power'
        },
        {
          id: 2,
          name: 'Bunny',
          artist: 'Tourist',
          album: 'Wild'
        },
        {
          id: 3,
          name: 'Chemicals',
          artist: 'SG Lewis',
          album: 'Times'
        }],
      playlistName: 'Chill',
      playlistTracks: [
        {
          id: 1,
          name: 'Your Power',
          artist: 'Billie Eilish',
          album: 'Your Power'
        },
        {
          id: 2,
          name: 'Bunny',
          artist: 'Tourist',
          album: 'Wild'
        },
        {
          id: 3,
          name: 'Chemicals',
          artist: 'SG Lewis',
          album: 'Times'
        }]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;