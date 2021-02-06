// YouTubeMusicApi
// https://github.com/emresenyuva/youtube-music-api
const YoutubeMusicApi = require('youtube-music-api')
const api = new YoutubeMusicApi()
api.initalize()

module.exports = (app, mysql) => {

  // general youtube api search (optionally within category, useful for getting a mixed search result)
  app.get('/api/yt/search/:searchString/:category?', async (req, res) => {
    let data = await api.search(req.params.searchString, req.params.category)
    res.json(data)
  })

  // search suggestions (for autocomplete)
  app.get('/api/yt/suggestions/:searchString', async (req, res) => {
    let data = await api.getSearchSuggestions(req.params.searchString)
    res.json(data)
  })

  // search for songs
  app.get('/api/yt/songs/:searchString', async (req, res) => {
    let data = await api.search(req.params.searchString, "song")
    res.json(data)
  })

  // there is no get song by id because you are supposed to do it direclty in the client

  // search for artists
  app.get('/api/yt/artists/:searchString', async (req, res) => {
    let data = await api.search(req.params.searchString, "artist")
    res.json(data)
  })

  // get artist by id
  app.get('/api/yt/artist/:browseId', async (req, res) => {
    let data = await api.getArtist(req.params.browseId)
    res.json(data)
  })

  // search for albums
  app.get('/api/yt/albums/:searchString', async (req, res) => {
    let data = await api.search(req.params.searchString, "album")
    res.json(data)
  })

  // get album by id
  app.get('/api/yt/album/:browseId', async (req, res) => {
    let data = await api.getAlbum(req.params.browseId)
    res.json(data)
  })

  // search for videos
  app.get('/api/yt/videos/:searchString', async (req, res) => {
    let data = await api.search(req.params.searchString, "video")
    res.json(data)
  })

  // there is no get video by id because you are supposed to do it direclty in the client

  // search for playlists
  app.get('/api/yt/playlists/:searchString', async (req, res) => {
    let data = await api.search(req.params.searchString, "playlist")
    res.json(data)
  })

  // get playlist by id
  app.get('/api/yt/playlist/:browseId', async (req, res) => {
    let data = await api.getPlaylist(req.params.browseId)
    res.json(data)
  })

  // yt api 404 for any remaining requests on all methods
  app.all('/api/yt/*', async (req, res) => {
    res.status(404)
    res.end()
  })

}

