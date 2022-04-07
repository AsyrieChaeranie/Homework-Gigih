// import { useState, useEffect } from 'react';

function Playlist(props) {
    return (
        <div className="top">
            <h1>Create Playlist</h1>
            <form onSubmit={(event) => props.getPlaylist(event)}>
                <div>
                    <p>Title</p>
                    <input type="text" id="playlist-name" />
                </div>
                <div>
                    <p>Description</p>
                    <textarea name="" id="playlist-description" cols="30" rows="10"></textarea>
                </div>
                <button id="createButton" type='submit'>Create Playlist</button>
            </form>
        </div >
    )
}

export default Playlist;