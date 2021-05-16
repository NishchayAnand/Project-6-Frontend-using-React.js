import React, {useState, useRef} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {

  // Refs
  const AudioRef = useRef(null);

  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  // Used for displaying the current time and total duration
  // on the screen.
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Function to update the timer of the song
  // Triggers as soon as the the audio starts playing
  const timeUpdateHandler = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    
    //Calculate animation percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration); 
    const animationPercentage = Math.round((roundedCurrent/roundedDuration)*100);
    // use setSongInfo({...songInfo, currentTime: current, 
    // duration: songDuration}) if name of variables in useState
    // and storing the event values are not same
    setSongInfo({...songInfo, currentTime, duration, animationPercentage});
  };

  // Song Ending utility function
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex===songs.length-1 ? 0 : currentIndex+1)]);
    if(isPlaying) AudioRef.current.play();
  }


  // Layout to be displayed
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>

      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />

      <Player currentSong={currentSong} 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying} 
              AudioRef={AudioRef} 
              songInfo={songInfo}
              setSongInfo={setSongInfo}
              songs={songs}
              setCurrentSong={setCurrentSong}
              setSongs={setSongs}
      />

      <Library songs={songs} 
              setCurrentSong={setCurrentSong} 
              AudioRef={AudioRef} 
              isPlaying={isPlaying}
              setSongs={setSongs}
              libraryStatus={libraryStatus}
              />

      <audio 
        ref={AudioRef} 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        src={currentSong.audio}
        onEnded={songEndHandler}>
      </audio>
    
    </div>
  );
}

export default App;
