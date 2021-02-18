import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLogedIn } from "../context/LogIn";
import { useAuth } from "../context/Auth";


export default function Coments(props) {
    const [input, setInput] = useState("");
    const [coments, setComents] = useState([]);
    const { userLogedIn } = useLogedIn();
    const { authTokens } = useAuth();

    async function handlerSubmit(e) {
        e.preventDefault();
        if (authTokens) {
            if (input !== "") {
                await axios.put("http://localhost:8080/products/" + props.id, {coment: input, user: `${userLogedIn.user.name} ${userLogedIn.user.lastName}`, userID: userLogedIn.user._id});
                setInput("");
            }
        }
    }

    function handlerChange(e) {
        setInput(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get("http://localhost:8080/products/" + props.id);
            setComents(req.data.coments);
        }
        fetchData();
    }, [props.id, input]);
    return (
        <div className="coments">
            <div className="chat">
                {coments.map(question =>
                    <div key={question.userID} className="question">
                        <span className="questionUserName">{question.user}</span>
                       <p className="questionComent">{question.coment}</p>
                    </div>
                )}

            </div>
            <div className="insertComent">
                <form onSubmit={(e) => handlerSubmit(e)} className="form-group">
                    <textarea name="comment" value={input} className="form-control" placeholder="Ask a question..." onChange={(e) => handlerChange(e)}></textarea>

                    {authTokens ? <button type="submit" className="btn btn-primary">Coment</button>
                        :
                        <Link className="btn btn-primary" to={{ pathname: "/signin", state: { referer: props.location } }}>Coment</Link>}

                </form>
            </div>
        </div>
    )

}