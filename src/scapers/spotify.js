const Spotify = require('spotifydl-x').default
const axios = require('axios');

const spotify = new Spotify({ clientId: '941540aaf96c456a9d1ad7ea26817da0', clientSecret: '07d4dd6ed5634187b525566b9e328517' })


async function getTrack(url) {
    try {
        const res = await spotify.getTrack(url);
        const result = {
            creator: 'xyzendev',
            status: 200,
            result: {
                title: res.name,
                thumbail: res.cover_url,
                artists: res.artists,
                album: res.album_name,
                uploadDate: res.release_date,
            }
        }
        return result
    } catch (err) {
        console.log(err)
    }
}

async function downloadTrack(url, file) {
    try {
        const name = file ? file : 'xyzendev.mp3'
        const res = await spotify.downloadTrack(url, name)
        return res
    } catch (err) {
        console.log(err)
    }
}

async function getArtist(url) {
    try {
        const res = await spotify.getArtist(url)
        const result = {
            creator: 'xyzendev',
            status: 200,
            result: {
                id: res.id,
                name: res.name,
                url: res.herf
            }
        }
        return result
    } catch (err) {
        console.log(err)
    }
}

async function getAlbum(url) {
    try {
        const res = await spotify.getAlbum(url);
        const result = {
            creator: 'xyzendev',
            status: 200,
            result: {
                title: res.name,
                tracks: res.tracks.map(tracks => (`https://open.spotify.com/track/${tracks}`))
            }
        }
        return result
    } catch (err) {
        console.log(err)
    }
}

async function getPlaylist(url) {
    try {
        const res = await spotify.getPlaylist(url);
        const result = {
            creator: 'xyzendev',
            status: 200,
            result: {
                title: res.name,
                total: res.tracks.length,
                data: res.tracks.map(track => (`https://open.spotify.com/track/${track}`))
            }
        }
        return result
    } catch (err) {
        console.log(err)
    }
}
async function downloadPlaylist(url) {
    try {
        const res = await spotify.downloadPlaylist(url);
        return res
    } catch (err) {
        console.log(err)
    }
}

async function searchSpotify(q) {
    try {
        const res = await axios.request({
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q,
                type: 'tracks',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
            },
            headers: {
                'X-RapidAPI-Key': '6a9259358bmshba34d148ba324e8p12ca27jsne16ce200ce10',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        })

        const result = [];
        for (let i = 0; i < res.data.tracks.items.length; i++) {
            let trackId = res.data.tracks.items[i].data.id;
            let trackUrl = `http://open.spotify.com/track/${trackId}`;
            let trackName = res.data.tracks.items[i].data.name;
            let trackDuration = res.data.tracks.items[0].data.duration.totalMilliseconds
            for (let a = 0; a < res.data.tracks.items[i].data.artists.items.length; a++) {
                let trackArtist = res.data.tracks.items[i].data.artists.items[a].profile.name
                result.push({ 
                    id: trackId, 
                    url: trackUrl,
                    name: trackName,
                    duration: trackDuration,
                    artists: trackArtist
                });
            }
        }

        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { 
    getTrack, 
    getArtist, 
    downloadTrack, 
    getPlaylist, 
    downloadPlaylist, 
    getAlbum,
    searchSpotify
}