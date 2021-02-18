import React, { useState, useEffect } from "react";
import axios from "axios";
/* import { useCartList } from "../context/CartList"; */
import { HeartIcon } from "./Icons";

export default function CardProduct(props) {
    const [product, setProduct] = useState([]);
    /* const { setCartListItem } = useCartList(); */
    const [over, setOver] = useState(null);
    let i = 0;
    useEffect(() => {
        axios.get("http://localhost:8080/").then((res) => {
            
            res.data.map(prod => {
                if ( i < 8) {
                    setProduct(product => [...product, prod]);
                    i++;
                }
                return null;
            })
        });
    }, [i]);

    function handlerClick(product) {
        props.history.push("/products/" + product._id);
    }
    function handleHeart(e, prod) {
        e.stopPropagation();
        e.target.style.color === "red" ? e.target.style.color = "#fff" :
            e.target.style.color = "red";
    }
    function handleOver(index) {
        setOver(index);
    }
    function handleLeave(prduct) {
        setOver(null);
    }

    if (product.length === 0) {
        return "Loading Products"
    } else {

        return (
            <div className="container CardsContainer">{
                product.map((product, index) =>
                    <div key={product._id} onClick={x => handlerClick(product)} className="cardContent" onMouseLeave={() => handleLeave(index)} onMouseOver={() => handleOver(index)}>
                        <div className="cardImg">
                            <img src={"http://localhost:8080/" + product.images[0]} alt="product"></img>
                        </div>
                        <div className="cardFooter">
                            {over === index ? <p>{product.title.length > 49 ? product.title.slice(0, 46) + '...' : product.title} </p> : null}
                            <div className="buyFooter">  <div>${product.price}</div> <span
                                onClick={(e) => handleHeart(e, product)}><HeartIcon /></span></div>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}