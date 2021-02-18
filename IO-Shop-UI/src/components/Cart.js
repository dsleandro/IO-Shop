import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCartList } from "../context/CartList";

export default function Cart(props) {

    const history = useHistory();
    const [cartItem, setCartItem] = useState([]);
    const { cartListItem } = useCartList();

    useEffect(()=> {
        setCartItem(cartListItem);
    }, [cartListItem]);
    function handleProduct(product) {
        history.push("/products/" + product._id);
    }
    function handleTotal() {
        var total = 0;
        cartListItem.map((prod) => {
            total += prod.price;
            return total;
        });
        return total.toFixed(2);
    }
    /* function handleRepeat(product) {
       let times = cartItem.Search(product);
       console.log(times);
       return times;
    } */
    return (
        <>
            <div className="cart">
                {cartItem.map((product, i) =>
                    
                    <div key={i} className="productSearch" onClick={() => handleProduct(product)}>
                        <div className="imgSearch">
                            <img src={"http://localhost:8080/" + product.images[0]} alt="product" />
                        </div>

                        <div className="titleSearch">
                            {product.title}
                        </div>

                        <span className="starsSearch">{product.stars}</span>
                        <span className="priceSearch" >${product.price}</span>
                    </div>
                )
                }
                {cartListItem.length !== 0 ? <div className="buyCart"><span className="total">Total: ${handleTotal()}</span> <button className="btn btn-light">Buy all</button></div> :
                
                    <span className="emptyCart">add products to cart and you will see them here!</span>}

            </div>
        </>
    )
} 