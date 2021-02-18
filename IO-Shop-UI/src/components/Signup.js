import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const [isError, setIsError] = useState(false);
    const [checked, setChecked] = useState(false);
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    function handlerChange(e) {
        var field = e.target;
        setFields(prevState => ({ ...prevState, [field.name]: field.value }));
    }
    function handlerCheck(e) {
        if (e.target.checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }
    if (isError) {
        setTimeout(() => {
            setIsError(false);
        }, 3000);
    }
    function handlerSubmit(e) {
        e.preventDefault();
        if (fields.confirmPass  === fields.password) {
              axios.post("http://localhost:8080/signup", fields);
              return <Redirect to="http://localhost:3000/signin" />;
        } else {
            setIsError(true);
        }

    }

    return (
        <div className="SignUp">
            <div className="imgSide">
               <img src="https://i.pinimg.com/564x/1b/60/22/1b602231a05c7a50fec7ebe8979035ae.jpg" alt="buy in home"/>
                </div>

            <form className="formSideSignUp"
                autoComplete="on" onSubmit={(e) => handlerSubmit(e)}>
                <h3 id="createAccount">Create account</h3>

                <input type="text" name="name" className="inputsForms"
                    autoComplete="on" required placeholder="Name" onChange={(e) => handlerChange(e)} maxLength="40"/>

                <input type="text" name="lastName" className="inputsForms"
                    autoComplete="on" maxLength="40" required placeholder="Last name" onChange={(e) => handlerChange(e)} />
    

                <input type="email" className="inputsForms"
                    name="email"
                    autoComplete="on"
                    required placeholder="Email" onChange={(e) => handlerChange(e)} />

                <input type="password" className="inputsForms" name="password"
                    autoComplete="new-password" minLength="8"
                    required placeholder="Password" onChange={(e) => handlerChange(e)} />

                <input type="password" className="inputsForms" name="confirmPass"
                    autoComplete="new-password" minLength="8"
                    required placeholder="Confirm password" onChange={(e) => handlerChange(e)} />
                <div>
                    <input type="checkbox" id="checkTerms" name="Terms" onChange={(e) => handlerCheck(e)} /> <label htmlFor="Terms" id="textCheck">I agree with <Link to="#">Terms & Conditions</Link> </label>
                </div>
                {checked ?
                    <button className="btn btn-primary" id="btnLogin" type="submit"
                    >Sign Up</button> : <button className="btn btn-primary" disabled id="btnLogin" type="reset" tabIndex="-1"
                    >Sign Up</button>}

                {isError && <span id="warningError">Password don't match</span>}
            </form>
        </div>
    )
}