import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";


export default function Navigation(props) {

    const user = useContext(UserSignedIn);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
  
    const history = useHistory();
  
    const { setAuthTokens } = useAuth();
  
    useEffect(() => {
      async function fetchData() {
        const res = await axios.get("http://localhost:8080/");
        setProducts(res.data);
      }
      fetchData();
    }, [])
  
    function handleSubmit(e) {
      e.preventDefault();
      var arr = [];
      products.forEach(product => {
        let name = product.title.toLowerCase();
        /* let category = product.category.toLowerCase(); */
        if (name.indexOf(search) !== -1 /* || category.indexOf(search) !== -1 */) {
          arr.push(product);
        }
      });
  
      props.Searcher(arr);
      history.push("/search");
    }
  
    function handleChange(e) {
      const input = e.target
      const searchProduct = input.value.toLowerCase();
      setSearch(searchProduct);
  
    }
    async function handleButton() {
      await axios.get("http://localhost:8080/logout");
      setAuthTokens();
      props.logOut();
      history.push("/");
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark nav">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">IO-Shop</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
              </li>
              {/*  <li className="nav-item active">
                                <Link className="nav-link" to="#" tabIndex="-1">Disabled</Link>
                            </li> */}
            </ul>
          </div>
          <form className="form-inline my-2 my-lg-0" onSubmit={(e) => handleSubmit(e)}>
            <input id="searcher" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleChange(e)} />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form>
          <div className="collapse navbar-collapse ml-5" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {user ?
  
                <li className="nav-item active">
                  <button className="btn btn-outline-warning" onClick={() => handleButton()}>Log out</button>
                </li> :
                <React.Fragment>
                  <li className="nav-item active">
                    <Link className="btn  btn-outline-warning" to="/signin">Sign In <span className="sr-only">(current)</span></Link>
                  </li>
  
                  <li className="nav-item active">
                    <Link className="btn btn-outline-warning mx-4" to="/signup">Sign Up</Link>
                  </li>
                </React.Fragment>}
  
  
              <li className="nav-item active">
                <Link className="btn btn-outline-warning mx-4" to="/sell">Sell product</Link>
              </li>
              <li className="nav-item active">
                <Link className="btn" to="/product/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  