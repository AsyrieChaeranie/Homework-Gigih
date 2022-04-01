import './Albumcard.css';
import { useState, useEffect } from 'react';

const Albumcard = ({url, albumName, songName, artistName}) => {
    const [selected, setSelected] = useState(false);
    const [urlSelected, setUrl] = useState("");
    
    const handleSelect = () =>{
        if(!selected){
            setSelected(true);
            setUrl(url);
        }
        else{
            setSelected(false);
            setUrl("");
        }
    }


    return (
        <div className='Album-wrapper'>
            <div className='Album-image'>
                <img src={url} alt=''></img>
            </div>
            <div className='Album-description'>
                <p className='Album-name'>{albumName}</p>
                <p className='Album-title'>{songName}</p>
                <p className='Album-artist'>{artistName}</p>
            </div>
            <div className='Album-button' onClick={handleSelect}>
                {
                    (!selected)? `Select` : `Deselect`
                }
            </div>
        </div>
    );
}

export default Albumcard;