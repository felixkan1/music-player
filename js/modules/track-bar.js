import playlist from './playlist.js'

const TrackBar = (()=>{

  //cache the DOM
  
  const trackBarFill = document.querySelector(".track-bar__fill");
 
  //state
  const state = {
    currentTrackTime: 0,
    trackDuration: 0,
    fillWidth: 0
  }


  const setState = (currentSong) =>{
    state.currentTrackTime = currentSong.currentTime;
    state.trackDuration = currentSong.duration;
    state.fillWidth = (state.currentTrackTime / state.trackDuration) * 100;
    render();
  }

  const render = () =>{
    trackBarFill.style.width = `${state.fillWidth}%`
  }

  const init = () => {
   render();
  }

  return{
    init,
    setState
  }
})();

export default TrackBar;