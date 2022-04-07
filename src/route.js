import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import Login from "./pages/login/index";
import { useSelector, useDispatch } from "react-redux";
import './App.css';

function AppRouter() {
    const currentlogin = useSelector((state) => state.login.value);
    // console.log(currentlogin)
    return (
        <Router>
            <div>
                <Login />

                <hr />
                <Switch>
                    <Route path="/create-playlist">
                        {currentlogin ? (
                            <div className="h1" >You are in create-playlist</div>
                        ) : (
                            <Redirect exact from="/create-playlist" to="/" />
                        )}
                    </Route>
                    <Route path="/">
                        <div className="h1">You are in home</div>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;