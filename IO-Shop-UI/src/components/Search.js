import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HeartIcon, CartPlusIcon, CartIcon } from "./Icons";
import { useCartList } from "../context/CartList";
import axios from "axios";

export default function Search(props) {
    const [productFound, setProductFound] = useState(props.search)
    const [cart, setCart] = useState({ click: false, id: null });
    const [icon, setIcon] = useState(<CartPlusIcon />);
    const { setCartListItem } = useCartList();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!productFound) {
            var url = new URL("http://localhost:8080/search"),
                params = { search: location.state };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            axios.get(url).then((res) => setProductFound(res.data));
        }

    }, []);

    console.log(productFound);
    function handleHeart(e) {
        e.stopPropagation();
        if (e.target.id !== "span") {

            if (e.target.parentNode.className === "heartSearch") {
                e.target.parentNode.className = "heartSearchClick";
            } else {
                e.target.parentNode.className = "heartSearch";
            }
        }
    }
    function handleCart(e, i, prod) {
        e.stopPropagation();
        setCartListItem(prod);
        cart ? setCart({ click: false, id: i }) : setCart({ click: true, id: i });
    }
    function handleProductSearch(product) {
        history.push("/products/" + product._id);
    }

    function handleIcon(i) {
        if (cart.click === true && cart.id === i) {
            setIcon(<CartIcon />);
        } else if (cart.click === false && cart.id === i) {
            setIcon(<CartPlusIcon />);
        }
    }
    if (productFound === undefined) {
        return null;
    } else if (productFound.products.length === 0) {
        return <h1 id="noProductFound">Product not found</h1>;
    } else {

        return (
            <div className="found">
                {productFound.products.map((product, i) =>
                    <div key={product._id} className="productSearch" onClick={() => handleProductSearch(product)}>
                        <div className="imgSearch">
                            <img src={"http://localhost:8080/" + product.images[0]} alt="product" />
                        </div>

                        <div className="titleSearch">
                            {product.title}
                        </div>

                        <span className="starsSearch">{product.stars}</span>
                        <span className="priceSearch" >${product.price}</span>

                        <button className="btn buySearch">Buy Now</button>
                        <span id="span" className="heartSearch" onClick={(e) => handleHeart(e)}><HeartIcon /></span>
                        <span className="btn buttonCartSearch" onClick={(e) => handleCart(e, i, product)}>  {window.innerWidth <= 1140 ? null : "Add to cart "}  <span className="cartSearch" onLoad={() => handleIcon(i)}> {icon} </span>
                        </span>
                    </div>)

                }
            </div>
        )
    }
}