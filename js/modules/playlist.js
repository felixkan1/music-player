import {songsList} from '../data/songs.js'
import PlayInfo from './play-info.js'
import TrackBar from './track-bar.js'

const Playlist = (() =>{
  //data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;
  

  //cache the dom
  const playlistEL = document.querySelector(".playlist");
  const allSongsEL = document.getElementsByClassName("playlist__song");


  
  //helper functions

  const flip = () =>{
    togglePlayPause();
    render();
  }

  const init = () =>{
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    })
  }

  const changeAudiosrc = () =>{
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = () =>{
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }




  const mainPlay = (song, index) =>{ //song clicked, index clicked
    if(currentlyPlayingIndex === index){ //clicked on same song
      //toggle play or pause
      togglePlayPause();
     
      

    }else{ //clicked on a new song
      currentlyPlayingIndex = index;
      //change song
      changeAudiosrc();
      togglePlayPause();
    
    }

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    })


  }

  //listeners
  const listeners = () =>{
    Array.from(allSongsEL).forEach((song,index) => {
      song.addEventListener("click", ()=>{
        mainPlay(song,index);
        render();
      })
    })

  }
  currentSong.addEventListener("ended", () =>{
    if(currentlyPlayingIndex === songs.length - 1){
      mainPlay(undefined, 0);
      currentlyPlayingIndex = 0;
      render();

    }else{
      mainPlay(undefined, currentlyPlayingIndex + 1);
      render();
    }
  })




  currentSong.addEventListener("timeupdate", ()=>{
    TrackBar.setState(currentSong);
  })



  //render
  const render = () =>{
    let markup = '';

  const toggleIcon = itemIndex =>{
    if(currentlyPlayingIndex === itemIndex){
      return currentSong.paused? 'fa-play' : 'fa-pause'
    }else{
      return 'fa-play';
    }
  }
  
  songs.forEach((song, index) =>{
    markup += 
    `
    <li class="playlist__song ${index === currentlyPlayingIndex?'playlist__song--active': ""}">
      <div class="play-pause">
        <i class="fa ${toggleIcon(index)} pp-icon"></i>
      </div>
      <div class="playlist_song-details">
        <span class="playlist__song-name">
        ${song.title}</span>
        <br>
        <span class="playlist__song-artist">
        ${song.artist}</span>
      </div>
      <div class="playlist__song-duration">
      ${song.time}
      </div>
    </li>

    `
    })


    playlistEL.innerHTML = markup;
    listeners();

  }
  


  return{
    init,
    flip
  }

})();

export default Playlist;

