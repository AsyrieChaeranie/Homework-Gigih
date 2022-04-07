// import data from './data/data';
import { useState, useEffect } from 'react';
import Track from '../../components/track/index';
import Playlist from '../../components/playlist/index';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { tokenAuth } from './slice';
// import { wait } from '@testing-library/user-event/dist/utils';

function CreatePlaylist() {
    const [token, setToken] = useState('');
    const [tracks, setTrack] = useState([]);
    const [isIdExist, setIsIdExist] = useState([]);
    const currentToken = useSelector((state) => state.token.value);
    const dispatch = useDispatch();



    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = {}
        // split digunakan untuk memisahkan url nya berdasarkan pemisah dengan tanda &
        hash.split('&').map(hk => {
            // lalu setelah dipisah dan di map, langkah selanjutnya di pisah lagi berdasarkan =
            let temp = hk.split('=');
            // kan setelah dipisah kelihatan tuh, array[0] isinya key sedangkan array[1] isinya value
            params[temp[0]] = temp[1]
        });
        setToken(params.access_token);
        dispatch(tokenAuth(token));
    }, [token]);

    const AUTHORIZE = 'https://accounts.spotify.com/authorize'
    const redirect_uri = "http://localhost:3000";
    // jika file env undefined cobalah restart, atau ganti nama depan variable dengan REACT_APP_Your_Variable
    const client_id = process.env.REACT_APP_CLIENT_ID;
    // const state = generateRandomString(16)

    const requestAuthorization = () => {
        let url = AUTHORIZE;
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent('playlist-modify-private');
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        // url += '&state=' + encodeURIComponent(state);
        window.location.href = url;
        // console.log(url)
    }

    const addTrack = async (id, playlist) => {
        const res = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            data: {
                uris: [...id],
                position: 0
            }
        })
        console.log('ini response add track to playlist', res)
    }

    // this function can be used for deleting track, but we havent used this yet
    // const deleteTrack = async (id) => {
    //   const res = await axios({
    //     method: 'delete',
    //     url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer " + token
    //     },
    //     data: {
    //       tracks: [{ uri: id }]
    //     }
    //   })
    //   console.log('ini response delete track to playlist', res)
    // }

    const getUri = (uri, btnSelect) => {
        console.log(uri)

        if (btnSelect === true) {
            setIsIdExist(isIdExist => [...isIdExist, uri])
            // console.log('worked', isIdExist)
            // addTrack(uri)
        }
        else {
            setIsIdExist(isIdExist.filter((data) => data !== uri))
            // deleteTrack(uri)
        }
    }

    const getArtists = async (search) => {
        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
            const res = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track&include_external=audio`, options)
            // console.log(res.data.tracks.items)
            // const dataTrack = [...filterData, ...res.data.tracks.items]
            const dataTrack = res.data.tracks.items
            setTrack(dataTrack)
            // console.log('ini isi state tracks', tracks)
        } catch (e) {
            console.log("ERROR!", e)
        }
    }

    const handelSearchTrack = async (a) => {
        // preventDefault() ini diguanakan agar form tidak reload atau behaviornya si form
        // atau bahasa simplenya untuk prevent behaviro pada element yang punya defalut event
        a.preventDefault();
        // console.log(a.target[0].value)
        const inputValue = a.target[0].value;
        await getArtists(inputValue);
    }

    const createPlaylist = async (title, description) => {
        try {

            const userOptions = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
            // console.log('hallo ini mulai fetching')
            const userRes = await axios.get(`https://api.spotify.com/v1/me`, userOptions)
            const userId = userRes.data.id
            // console.log('ini isi userid', userId)
            // console.log(`ini judulnya: ${title}, ini descriptionnya: ${description}`)
            const res = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${userId}/playlists`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                data: {
                    name: title,
                    description: description,
                    public: false,
                    collaborative: false
                }
            })
            // console.log('ini isi responese playlist', res.data.id)
            const id = res.data.id
            // setPlaylistId(id)
            await addTrack(isIdExist, id)
        } catch (e) {
            console.log("ERROR!", e)
        }
    }

    const handleCreatePlaylist = async (a) => {
        a.preventDefault();
        console.log(a)
        const title = a.target[0].value;
        const description = a.target[1].value;
        if (title.length <= 10) {
            window.alert('minimum 10 characters for title')
        }
        else {
            await createPlaylist(title, description);
            window.location.reload();
        }
    }

    const trackSong = tracks.map((data) => {
        return (
            <Track
                image={data.album.images[1].url}
                title={data.name}
                artist={data.album.artists[0].name}
                uri={data.uri}
                savetUri={getUri}
                isUriExist={isIdExist}
                key={data.uri}
            />
        )
    });

    return (
        <div className="App">
            <h4>this is Token Access from redux: {currentToken}</h4>
            <Playlist getPlaylist={handleCreatePlaylist} />
            <div className='btn-auth'>
                <button onClick={requestAuthorization}>Spotify Auth</button>
            </div>
            <div className='search-container'>
                <form onSubmit={(event) => { handelSearchTrack(event) }}>
                    <input type="text" />
                    <input type="submit" value="Submit" id="submitButton" />
                </form>
            </div>
            <div className="tracks">
                <h2>New Release</h2>
                <div className="tracks-container" id="track-container">
                    {trackSong}
                </div>
            </div>
        </div>
    );
}

export default CreatePlaylist;