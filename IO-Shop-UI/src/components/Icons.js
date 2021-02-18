import React from "react";

function HeadsetIcon(props) {
    return (
        <i className="fas fa-headset"></i>
    )
}
function HomeIcon(props) {
    return (
        <i className="fas fa-home"></i>
    )
}
function CreditCard(props) {
    return (
        <i className="far fa-credit-card"></i>
    )
}
function UserCircle(props) {
    return (
        <i role="img" aria-label="User icon" className="fas fa-user-circle"></i>
    )
}
function Bars(props) {
    return (
        <i role="img" aria-label="bars" className="fas fa-bars"></i>
    )
}
function HeartIcon(props) {
    return (
        <i role="img" aria-label="Heart" className="fas fa-heart iconCategory"></i>
    )
}
function CartPlusIcon(props) {
    return (
    <i role="img" aria-label="Cart" className="fas fa-cart-plus iconCategory"></i>
    )
}
function CartIcon(props) {
    return (
    <i role="img" aria-label="Cart" className="fas fa-shopping-cart iconCategory"></i>
    )
}
function RightIcon(props) {
    return(
    <i role="img" aria-label="Right" className="fas fa-angle-right iconRight"></i>
    )
}
function LeftIcon(props) {
    return(
    <i role="img" aria-label="Left" className="fas fa-angle-left iconLeft"></i>
    )
}
function Spinner(props) {
    return(
    <i role="img" aria-hidden="true" className="fas fa-spinner fa-spin"></i>
    )
}

export { HeartIcon, CartPlusIcon, RightIcon, LeftIcon, CartIcon, Spinner, Bars,UserCircle,CreditCard, HomeIcon, HeadsetIcon };
/* style = {{ fontSize: 1.6 + "em",  }} */