import * as React from 'react';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


const Playlist = ({ hanldeAddPlaylist, handleAddSubmit, addPlaylistData }) => {
    return (
        <div className="playlistform">
            <h2>Create Playlist</h2>
            <form onSubmit={handleAddSubmit}>
                <label>Name</label><br />
                <input id="title" type="text" value={addPlaylistData.title} onChange={hanldeAddPlaylist} name="title" />
                <br />
                <br></br>
                <label> Description </label><br />
                <textarea id="description" type="text" value={addPlaylistData.description} onChange={hanldeAddPlaylist} name="description" />
                <br />
                <Button type="submit" value="Submit" variant="contained" color="primary" startIcon={<SaveAltIcon />}> Save </Button>
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

export default Playlist;