import React from "react";

const LibrarySong = ({song, setCurrentSong, AudioRef, isPlaying, songs, setSongs}) => {

    const clickEventHander = async () => {

        await setCurrentSong(song);

        // Code to add active state to the song currently playing
        // and deactive state to all the other songs
        const newSongs = songs.map((s) => {
            if(s.id===song.id){
                return {...s, active: true};
            } else {
                return {...s, active: false};
            }
        });
        setSongs(newSongs);

        // play the next music on change if earlier the music was playing 
        // when performed change.
        if(isPlaying) AudioRef.current.play();
    };

    return (
        <div onClick={clickEventHander} className= {`library-song ${song.active ? "selected" : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div> 
        </div>
    );
};

export default LibrarySong;