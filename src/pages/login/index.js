import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login } from './slice';

function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const currentlogin = useSelector((state) => state.login.value);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentlogin)
    }, [isLogin])

    const handleLoginButton = () => {
        // dispatch(login(false))
        if (isLogin) {
            setIsLogin(false)
            dispatch(login(false))
        }
        else {
            setIsLogin(true)
            dispatch(login(true))
        }
    }

    return (
        <div>
            {/* <h2>status login = {isLogin}</h2> */}
            <Link to="/create-playlist">
                <button clasName="button" onClick={() => handleLoginButton()}>{isLogin ? 'Logout' : 'Login'}</button>
            </Link>
        </div>
    )

}

export default Login;