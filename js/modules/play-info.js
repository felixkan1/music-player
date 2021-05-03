import {songsList} from '../data/songs.js'
import Playlist from './playlist.js';

const PlayInfo = (()=>{


  const state = {
    songsLength: songsList.length,
    isPlaying: false
  }

  //cache the DOM
  let playerCountEl = document.querySelector(".player__count");
  let playerTriggerEL = document.querySelector(".player__trigger");

  const init = () =>{
    render();
    listeners();
  }

  const setState = obj =>{
    state.songsLength = obj.songsLength;
    state.isPlaying = obj.isPlaying;
    render();
  }

  const listeners = () =>{
    playerTriggerEL.addEventListener("click", () =>{
      //change state
      state.isPlaying = state.isPlaying ? false : true;
      render();
      Playlist.flip();
    })
  }


  const render = () =>{
    playerCountEl.innerHTML = `${state.songsLength} Songs`;
    playerTriggerEL.innerHTML = state.isPlaying ? 'Pause' : 'Play'
  }

  return{
    init,
    setState
  }
})();

export default PlayInfo;