import LoginIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

const Login = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID;
    const redirectURI = 'http://localhost:3000/';
    const scope = 'playlist-modify-private';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectURI);

    return (
        <>
            <a href={url}><Button  size="large" variant="contained" color="primary" startIcon={<LoginIcon />}> LOGIN </Button></a>
        </>
    )
}

export default Login;