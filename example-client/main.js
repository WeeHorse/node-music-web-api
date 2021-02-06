async function search(){
  let str = document.querySelector('#search').value
  let response = await fetch('http://localhost:3000/api/yt/search/' + str)
  let data = await response.json()
  document.querySelector('textarea').value = JSON.stringify(data, undefined, 4)
}

async function searchSongs(){
  let str = document.querySelector('#search-songs').value
  let response = await fetch('http://localhost:3000/api/yt/songs/' + str)
  let data = await response.json()
  document.querySelector('textarea').value = JSON.stringify(data, undefined, 4)
}

// global variable for yt player
let player

function playSong(){
  let id = document.querySelector('#song-id').value
  player.loadVideoById(id)
}


// gets called automatically when YouTube player loads
function onYouTubeIframeAPIReady() {
  // sets the size of the player to 0
  // because we don't want to watch the videos,
  // only to trigger music playback
  player = new YT.Player('yt-player', {
    height: '300',
    width: '400',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// this function triggers when we change song in player
// can be used to update things, like counters
function onPlayerStateChange(event) {
  if (event.data != YT.PlayerState.PLAYING) return
}