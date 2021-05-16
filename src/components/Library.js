import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, AudioRef, isPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibrarySong 
                        song={song} 
                        setCurrentSong={setCurrentSong}
                        AudioRef={AudioRef}
                        isPlaying={isPlaying}
                        songs={songs}
                        setSongs={setSongs}
                        key={song.id}    
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;