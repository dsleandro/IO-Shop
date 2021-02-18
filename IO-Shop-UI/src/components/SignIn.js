import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { useLogedIn } from "../context/LogIn"
import { useAuth } from "../context/Auth";

export default function SignIn(props) {

    const [isError, setIsError] = useState(false);
    const { setUserLogedIn, userLogedIn } = useLogedIn();
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
    const [fields, setFields] = useState({ email: "", password: "" });

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post("http://localhost:8080/signin", fields).then(result => {
            if (result.status === 200) {
                setAuthTokens(result.data.token);
                setUserLogedIn(prevState => ({ ...prevState, logged: true, user: result.data.user }));
                localStorage.setItem('userID', JSON.stringify(result.data.user));
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });

    }
    if (userLogedIn.logged === true) {
        return <Redirect to={referer} />;
    }
    if (isError) {
        setTimeout(() => {
            setIsError(false);
        }, 4000);
    }

    function handleChange(e) {
        var field = e.target;
        setFields(prevState => ({ ...prevState, [field.name]: field.value }));
    }
    return (
        <div className="SignIn">
            <div className="imgSide">
                <img src="https://i.pinimg.com/564x/9b/ed/a5/9beda57712d032994954a89493fcfc92.jpg" alt="Buy from Home"/>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="formSide" autoComplete="On">
                <h3 className="welcome">Welcome!</h3>
                <input type="email" name="email" className="inputsForms"
                    autoComplete="on" placeholder="Email" required onChange={(e) => handleChange(e)} />
                <input type="password" placeholder="Password" name="password" className="inputsForms"
                autoComplete="current-password" minLength="8" required onChange={(e) => handleChange(e)} />

                <Link id="linkPassword" to={{ pathname: "/signin", state: { referer: props.location } }}>Forgot password?</Link>
                <button type="submit" className="btn btn-primary" id="btnLogin">Sign in</button>

                <span className="doNotAccount"><label className="haveAccount">Don't have an account?</label> <Link to="/signup">Sign Up</Link></span>

                {isError && <span id="warningError">Email or password incorrect!</span>}
            </form>

        </div>
    )
}