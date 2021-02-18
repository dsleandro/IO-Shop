import React from "react";
import { CreditCard, HomeIcon, HeadsetIcon } from "./Icons";

export default function Payments(props) {
    return (
        <div className="promotions">
            <div className="promotionsItem"><span id="creditCard"><CreditCard /></span>
                <span id="payments">Up to 6 interest-free payments <br /> with associated banks</span>
            </div>
            <div className="promotionsItem"><span id="creditCard"><HomeIcon /></span>
                <span id="buyHome">Buy without leaving home</span>
            </div>
            <div className="promotionsItem"><span id="creditCard"><HeadsetIcon /></span>
                <span id="buyHome">You have support at any time</span>
            </div>
        </div>
    )
}

export function Recomendations(props) {
    return (
        <div>
            <h3>{props.title}</h3> <img src={props.img} alt=""/>
        </div>
    )
}
