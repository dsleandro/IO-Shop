import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCartList } from "../context/CartList";

import { HeartIcon, CartPlusIcon, LeftIcon, RightIcon, Spinner } from "./Icons";

export default function CategoryCard(props) {
    const [product, setProduct] = useState([]);
    const [over, setOver] = useState({ class: "categoryItem" });
    const history = useHistory();
    const { setCartListItem } = useCartList();
    const [isOverContainer, setIsOverContainer] = useState(false);
    let x = 0;
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:8080/");

                res.data.map((prod) => {     //Set products order by category
                    let category = prod.category.toLowerCase();
                    if (category === props.Category.toLowerCase()) {
                        if (x < 12) {    //set max 12 products by "categorizer"
                            setProduct(prevState => ([...prevState, prod]));
                            x++;
                        }
                        return null;
                    }
                    return null;
                });

            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
    }, [x, props.Category]);
    function handleCart(e, prod) {
        e.stopPropagation();
        setCartListItem(prod);
    }
    function handleHeart(e) {
        e.stopPropagation();
        history.push("/product/heart");
    }

    function handleClick(prod) {
        history.push("/products/" + prod._id);
    }
    function handleOver(prod, index) {
        setOver({ class: index });
    }
    function handleLeave(prod) {
        setOver({ class: "categoryItem" });

    }
    function handleRight(e) {
        const categorizer = e.target.parentNode.parentNode;
        var i = 0;
        var timer = setInterval(smoothScroll, 10);
        function smoothScroll() {
            if (i === 35) {
                clearInterval(timer);
            } else {
                i++;
                categorizer.scrollLeft += 15;
            }
        }
    }
    function handleLeft(e) {
        const categorizer = e.target.parentNode.parentNode;
        var i = 0;
        var timer = setInterval(smoothScroll, 10);
        function smoothScroll() {
            if (i === 35) {
                clearInterval(timer);
            } else {
                i++;
                categorizer.scrollLeft -= 15;
            }
        }
    }

    if (product.length === 0) {
        return <Spinner />
    } else {

        return (
            <div className="container-Cat" onMouseOver={() => setIsOverContainer(true)} onMouseLeave={() => setIsOverContainer(false)}>

                <div className="Category">{props.Category}</div>
                <div id="categorizer" className="categorizer" style={{ marginLeft: 0 + "px" }}>
                    {isOverContainer ? (<>
                        <span className="left" onClick={(e) => handleLeft(e)}> <LeftIcon /> </span>
                        <span className="right" onClick={(e) => handleRight(e)}> <RightIcon /> </span>
                    </>
                    )
                        : null
                    }
                    {product.map((prod, index) =>

                        <div key={prod._id} className={over.class === index ? "categoryItemOver" : "categoryItem"} onClick={() => handleClick(prod)}
                            onMouseLeave={() => handleLeave(prod)} onMouseOver={() => handleOver(prod, index)}>
                            <div className="categoryImg">
                                <img src={"http://localhost:8080/" + prod.images[0]} alt="product"></img>
                            </div>
                            {over.class === index ? <div className="categoryFooter">
                                <p>{prod.title.length > 60 ? prod.title.slice(0, 57) + '...' : prod.title} </p>
                                <div className="buyCatFooter">  <div>${prod.price}</div>
                                    <span>
                                        <span onClick={(e) => handleHeart(e)}><HeartIcon /></span>&nbsp;&nbsp;<span onClick={(e) => handleCart(e, prod)}><CartPlusIcon />
                                        </span></span>
                                </div>
                            </div> : null
                            }
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
} 