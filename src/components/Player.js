import React from "react";
// FontAwesomeIcon is like a type of component 
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying, AudioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {

    const playEventHandler = () => {
        if(isPlaying){
            AudioRef.current.pause();
        }
        else {
            AudioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const dragHandler = (event) => {
        AudioRef.current.currentTime = event.target.value;
        setSongInfo({...songInfo, currentTime: event.target.value});
    };

    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        );
    };

    // This function runs when you use the next and previous 
    // button to change the current playing button.
    const activeLibraryHandler = (nextPrevSong) => {
        // Code to add active state to the song currently playing
        // and deactive state to all the other songs
        const newSongs = songs.map((song) => {
            if(song.id===nextPrevSong.id){
                return {...song, active: true};
            } else {
                return {...song, active: false};
            }
        });
        setSongs(newSongs);
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward"){
            await setCurrentSong(songs[(currentIndex===songs.length-1 ? 0 : currentIndex+1)]);
            activeLibraryHandler(songs[(currentIndex===songs.length-1 ? 0 : currentIndex+1)]);
        }
        else {
            await setCurrentSong(songs[(currentIndex===0 ? songs.length-1 : currentIndex-1)]);
            activeLibraryHandler(songs[(currentIndex===0 ? songs.length-1 : currentIndex-1)]);
        }
        // play the next music on change if earlier the music was playing 
        // when performed change.
        if(isPlaying) AudioRef.current.play();
    };

    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">

            <div className="time-control">

                <p>{getTime(songInfo.currentTime)}</p>

                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">

                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler} 
                        type="range"/>

                    <div style={trackAnim} className="animate-track"></div>

                </div>
                
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>

            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playEventHandler} className="play" size="2x" icon={isPlaying ? faPause: faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>

        </div>
    );
}

export default Player;