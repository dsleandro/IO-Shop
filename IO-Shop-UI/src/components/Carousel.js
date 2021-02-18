import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Carousel(props) {
    const [images, setImages] = useState([]);
    const id =  props.id;

    useEffect(() => {
        
        async function fetchData() {
            if (id) {
                const res = await axios.get("http://localhost:8080/products/" + id);
                setImages(res.data.images);
            } else {
                setImages(["imgs/Home-Slide/slide3.jpg","imgs/Home-Slide/slide2.jpg","imgs/Home-Slide/slide_1.jpg"]);
            }
        }
        fetchData();
    }, [id])

    return (
        <div id="carouselExampleIndicators" data-interval="false" className={ id? "carousel slide carouselImg": "carousel slide"} data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" className="active" data-slide-to="0"></li>
                {images.map((image, index) => (index === 0) ? null :
                    <li key={image} data-target="#carouselExampleIndicators" data-slide-to={'"' + index + '"'} ></li>
                )}

            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={"http://localhost:8080/" + images[0]} className="d-block" alt="Product" id={id? "ImgCarousel-product" : "imgSlide"}/>
                </div>
                {images.map((image, index) =>
                    (index === 0) ? null :
                        (<div key={image} className="carousel-item">

                            <img src={"http://localhost:8080/" + image} className="d-block" alt="Product" id={id? "ImgCarousel-product" : "imgSlide"}/>

                        </div>)
                )}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

