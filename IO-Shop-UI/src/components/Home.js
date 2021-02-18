import React from "react";
import Carousel from "./Carousel";
import CardProduct from "./CardProduct";
import CategoryCard from "./CategoryCard";
import { useHistory} from "react-router-dom";
import CreditCard from "./Promotions";

export default function Home(props) {
    const history = useHistory();
    return (
        <div>
            <Carousel/>
            <CreditCard/>
            <CategoryCard Category="Home" />
            <CardProduct history = {history}/>
            <CategoryCard Category="Electronics"/>
             <CategoryCard Category="Computer"/>
            {/*<CategoryCard Category="Autos"/> */}
        </div>
    )
}