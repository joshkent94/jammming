const clientId = '66616a8587774a97bde8ff6a3934dd52';
const redirectUri = 'http://josh_playlist_project.surge.sh';
let accessToken;

export const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } else if(window.location.href.includes("access_token")) {
            let Url = window.location.href;
            accessToken = Url.slice(Url.indexOf("=") + 1, Url.indexOf("&"));
            let expiresIn = parseInt(Url.slice(Url.indexOf("expires_in=") + 11, Url.slice(Url.indexOf("expires_in=") + 11).slice(0, Url.slice(Url.indexOf("expires_in=") + 11).indexOf("&")))) * 1000;
            window.setTimeout(() => accessToken = '', expiresIn);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },

    async search(searchTerm) {
        const accessToken = this.getAccessToken();
        try {
            const urlToSend = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}&limit=50`;
            const response = await fetch(urlToSend, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                let tracks = jsonResponse.tracks.items.map(track => {
                    let trackInfo = {
                        'id': track.id,
                        'name': track.name,
                        'artist': track.artists[0].name,
                        'album': track.album.name,
                        'uri': track.uri
                    }
                    return trackInfo;
                });
                return tracks;
            };
            throw new Error('Did not work!');
        } catch(error) {}
    },

    async savePlaylist(playlistName, tracks) {
        if(!playlistName && !tracks) {
            return;
        };
        const accessToken = this.getAccessToken();
        let userId;
        let playlistId;
        try {
            const urlToSend = `https://api.spotify.com/v1/me`;
            const response = await fetch(urlToSend, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                userId = jsonResponse.id;
            };
            throw new Error('Did not work!');
        } catch(error) {};
        try {
            const urlToSend = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const response = await fetch(urlToSend, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    'name': playlistName
                })
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                playlistId = jsonResponse.id;
            };
            throw new Error('Did not work!');
        } catch(error) {};
        try {
            const urlToSend = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            await fetch(urlToSend, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'uris': tracks
                })
            });
            throw new Error('Did not work!');
        } catch(error) {};
    }
};