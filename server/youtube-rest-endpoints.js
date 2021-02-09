// YouTubeMusicApi
// https://github.com/emresenyuva/youtube-music-api
const YoutubeMusicApi = require('youtube-music-api')
const api = new YoutubeMusicApi()
api.initalize()

async function ytmCached(req, res, db, methodName, argsToUse){
  // attempt to get from cached (notice that an empty response body will always pass through to fetch new)
  let data = await db.pool.request()
    .input('request_url', db.VarChar, req.originalUrl)
    .query("SELECT * FROM ytm_cache WHERE request_url = @request_url")
  data = data.recordset[0]
  if(data && data.response_body){
    res.set('x-from-cache', true)
    data = JSON.parse(data.response_body)
  }else{
    // fetch new
    data = await api[methodName](...argsToUse)
    // and respond
    res.set('x-from-cache', false)
    // then cache
    try {
      await db.pool.request()
        .input('request_url', db.VarChar, req.originalUrl)
        .input('response_body', db.NVarChar(db.MAX), JSON.stringify(data))
        .query("INSERT INTO ytm_cache (request_url, response_body) VALUES (@request_url, @response_body)")
    }catch(error){
      console.trace(error)
      res.status(500)
    }
  }
  return data
}

module.exports = (app, db) => {

  // general search (useful for getting a mixed search result with songs, albums, playlists, videos, artists..)
  app.get('/api/yt/search/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString])
    res.json(data)
  })

  // search suggestions (for autocomplete)
  app.get('/api/yt/suggestions/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'getSearchSuggestions', [req.params.searchString])
    res.json(data)
  })

  // search for songs
  app.get('/api/yt/songs/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString, "song"])
    res.json(data)
  })

  // there is no get song by id because you are supposed to do it direclty in the client

  // search for artists
  app.get('/api/yt/artists/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString, "artist"])
    res.json(data)
  })

  // get artist by id
  app.get('/api/yt/artist/:browseId', async (req, res) => {
    let data = await ytmCached(req, res, db, 'getArtist', [req.params.browseId])
    res.json(data)
  })

  // search for albums
  app.get('/api/yt/albums/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString, "album"])
    res.json(data)
  })

  // get album by id
  app.get('/api/yt/album/:browseId', async (req, res) => {
    let data = await ytmCached(req, res, db, 'getAlbum', [req.params.browseId])
    res.json(data)
  })

  // search for videos
  app.get('/api/yt/videos/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString, "video"])
    res.json(data)
  })

  // there is no get video by id because you are supposed to do it direclty in the client

  // search for playlists
  app.get('/api/yt/playlists/:searchString', async (req, res) => {
    let data = await ytmCached(req, res, db, 'search', [req.params.searchString, "playlist"])
    res.json(data)
  })

  // get playlist by id
  app.get('/api/yt/playlist/:browseId', async (req, res) => {
    let data = await ytmCached(req, res, db, 'getPlaylist', [req.params.browseId])
    res.json(data)
  })

  // yt api 404 for any remaining requests on all methods
  app.all('/api/yt/*', async (req, res) => {
    res.status(404)
    res.end()
  })

}

