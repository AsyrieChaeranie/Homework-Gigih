import React from "react";
import './index.css'


function trackSong(props){
  return (

    <div className="Album-container">
      <div className='Album-item'>
          <img src={props.image} alt={props.title}/>
          <h1>{props.title}</h1>
          <p>Album : {props.album}</p>
          <h2>Artist : {props.artist}</h2>
          <button class="buttonPlaylist button1" type="button" onclick="alert('This song is added to your playlist!')">Select</button>
          </div>
    </div>
    
  );
  }
export default trackSong;