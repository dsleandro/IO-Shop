import React, { Component } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import Coments from "./Coments";
import { HeartIcon,/*  CartPlusIcon, CartIcon, */ Spinner } from "./Icons";


export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: "",
            stars: 0,
            price: 0,
            id: "",
            date: "",
        }
    }
    async componentDidMount() {
        const res = await axios.get("http://localhost:8080/products/" + this.props.match.params.id);
        this.setState({
            title: res.data.title,
            description: res.data.description,
            stars: res.data.stars,
            price: res.data.price,
            id: res.data._id,
            date: res.data.date,
        });
        document.getElementById('root').style.backgroundColor = "#fff";
    }
    componentWillUnmount(){
        document.getElementById('root').style.backgroundColor = "#eeecf6";
    }
     handleHeart = (e) => {
        e.stopPropagation();
        if (e.target.id !== "span") {

            if (e.target.parentNode.className === "heartProduct") {
                e.target.parentNode.className = "heartProductClick";
            } else {
                e.target.parentNode.className = "heartProduct";
            }
        }
    }

    render() {
        if (this.state.title === null) {
            return <div className="iconSpinner"><Spinner /></div>
        }
        return (

            <div className="Product container">
                <Carousel id={this.props.match.params.id} />

                <div className="titleProduct" >
                    <h2>{this.state.title}</h2> <span id="span" className="heartProduct" onClick={(e) => this.handleHeart(e)}><HeartIcon /></span>
                </div>
                <div className="container">
                    <h3>Description:</h3>
                    <pre id="descriptionProduct">{this.state.description}</pre>
                </div>
                <div className="comentsProduct container">
                    <h3 id="questionTitle">Questions:</h3>
                    <Coments id={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}