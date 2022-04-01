import { Component, useEffect, useState } from "react";
import Albumcard from "../albumcard/Albumcard";
import Login from "../loginComponent/index";
import Recent from "../recentSearch/recent";
const axios = require('axios').default;
import './style.css'





const Search = () => {
    const [login, setLogin] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [tracks, setTracks] = useState([]);
    const [token, setToken] = useState([]);
    const [recent, setRecent] = useState([]);


    const handleInput = (e) => {
        setKeyword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: keyword,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            setRecent(tracks);
            setTracks(response.data.tracks.items);
        }
        catch (e) {
            alert("Kamu belum login")
            console.error(e)
        }

    }

    useEffect(() => {
        const url = localStorage.getItem("access_token");
        if (url !== null) {
            setToken(localStorage.getItem("access_token"));
            setLogin(true);
        }
        else {
            setLogin(false)
        }
    }, [])
    return (
        <>
            {(login)?
            <></>
            :
            <h5>Klik login untuk melakukan pencarian</h5>
            }
            <Login />
            <br />
            {(login) ? (
                <>
                    <input className="" type="text" onChange={handleInput} />
                    <button onClick={handleSubmit}>Cari</button>
                    <h1>Hasil pencarian : {keyword}</h1>
                    <br />
                    <div className="Album-container">

                        {
                            tracks.map((item) => (
                                <Albumcard
                                    key={item.id}
                                    albumName={item.album.name}
                                    songName={item.name}
                                    url={item.album.images[0].url}
                                    artistName={item.artists[0].name}
                                />
                            ))
                        }
                    </div>
                    <h1>Riwayat Pencarian Sebelumnya</h1>
                    <div className="Album-container">
                        {recent.map((item) => (
                            <Recent
                                key={item.id}
                                img={item.album.images[2].url}
                                title={item.name}
                                artist={item.artists[0].name}
                            />
                            )
                        )
                        }
                    </div>
                </>
            )
                :
            <></>
            }
        </>
    )
}

export default Search;