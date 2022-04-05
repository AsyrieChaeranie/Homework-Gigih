import { useEffect, useState } from "react";

const Login = ()=>{

    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const handleLogin = ()=>{
        window.location = ` https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`
        ;
    }
    
    const handleLogout = ()=>{
        setLogin(false);
        setToken("");
        localStorage.clear()
        window.location = REDIRECT_URI;
    }


    useEffect(()=> {
            let url = window.location.hash;
            if(url.length > 0 ){
                url = url.substring(1).split("&")[0].split("=")[1];
                setToken(url);
                setLogin(true);
                
                localStorage.setItem("access_token", url);
            }
        }, []
    )
    return(
        <>
        {
            (!login)?
            <div className="selectButton" onClick={handleLogin} >Login </div>
            :
            <div className="selectButton" onClick={handleLogout} >Logout</div>
        }
        </>
    );

}

export default Login;