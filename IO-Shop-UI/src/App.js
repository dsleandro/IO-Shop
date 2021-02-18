import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import axios from "axios";
import './App.css';
import './Styles/categorizer.css';
import './Styles/aside-nav.css';
import PrivateRoute from './PrivateRoute';

import { LogedIn, useLogedIn } from "./context/LogIn";
import { AuthContext, useAuth } from "./context/Auth";
import { CartList, useCartList } from "./context/CartList";

import Signup from "./components/Signup"
import SellProduct from "./components/SellProduct";
import Product from "./components/Product";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Search from "./components/Search";
import Footer from "./components/Footer";

import { CartIcon, Bars, UserCircle, HeartIcon } from "./components/Icons";


function App() {

  const [products, setProducts] = useState();
  const [userLogedIn, setUserLogedIn] = useState({ logged: false, user: null });
  const [authTokens, setAuthTokens] = useState();
  const [cartListItem, setCartListItem] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("tokens") === "undefined") {
      //Do nothing

    } else if (localStorage.getItem("tokens") !== null) {
      let token = localStorage.getItem("tokens");
      let length = token.length;
      let tokens = token.substr(1, length - 2);
      setAuthTokens(tokens);

    }
    if (localStorage.getItem("userID") === "undefined") {
      //Do nothing
    } else if (localStorage.getItem("userID") !== null) {
      let user = JSON.parse(localStorage.getItem("userID"));
      setUserLogedIn(prevState => ({ ...prevState, logged: true, user: user }));
    }
  }, [authTokens]);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  const items = (item) => {
    let prev = cartListItem;
    prev.push(item);
    setCartListItem(prev);
  }

  let searcher = (dataSearch) => {
    setProducts(dataSearch);
  }

  return (
    <Router className="App">
      <LogedIn.Provider value={{ userLogedIn, setUserLogedIn }} >
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <CartList.Provider value={{ cartListItem, setCartListItem: items }}>
            <Navigation Searcher={searcher} />
            <section>
              <Route path="/search" component={() => <Search search={products} />} />
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={SignIn} />
              <PrivateRoute path="/sell" component={() => <SellProduct user={userLogedIn} />} />
              <Route path="/products/:id" exact component={Product} />
              <Route exact path="/product/cart" component={Cart} />
            </section>
            <Footer />
          </CartList.Provider>
        </AuthContext.Provider>
      </LogedIn.Provider>
    </Router>
  );
}

function Navigation(props) {

  const [search, setSearch] = useState("");
  const [isAside, setIsAside] = useState(false);

  const history = useHistory();
  const { userLogedIn, setUserLogedIn } = useLogedIn();
  const { authTokens, setAuthTokens } = useAuth();
  const { cartListItem } = useCartList();


  async function handleSubmit(e) {
    e.preventDefault();
    var url = new URL("http://localhost:8080/search"),
      params = { search: search };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await axios.get(url)
    props.Searcher(res.data);

    history.push({
      pathname: "/search",
      search: "?query=" + search,
      state: search,
    });
  }

  function handleChange(e) {
    const input = e.target
    const searchProduct = input.value.toLowerCase();
    setSearch(searchProduct);

  }
  async function handleButton() {
    await axios.get("http://localhost:8080/logout");
    history.push("/");
    setAuthTokens();
    setUserLogedIn(prevState => ({ ...prevState, logged: false, user: null }));
    localStorage.setItem('userID', undefined);
  }
  return (
    <nav>
      <div className="NavContainer">
        <button className=" btn btn-light btnCollapse" onClick={() => setIsAside(true)}><Bars /></button>
        <Link className="navbar-brand Brand ml-3" to="/">IO-Shop</Link>

        <form className="form-inline my-lg-0 contSearch" onSubmit={(e) => handleSubmit(e)}>
          <input id="searcher" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleChange(e)} />
          {/*   <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button> */}
        </form>

        <ul className="ulOfBtn">
          {
            authTokens !== undefined ?

              <li>
                <button className="btn btn-outline-light mx-4" onClick={() => handleButton()}>Log out</button>
              </li> :

              <React.Fragment>
                <li>
                  <Link className="btn btn-outline-warning mx-2" to={{ pathname: "/signin", state: { referer: props.location } }}>SIGN IN</Link>
                </li>

                <li>
                  <Link className="btn btn-outline-warning mx-2" to="/signup">SIGN UP</Link>
                </li>
              </React.Fragment>
          }

          <li>
            <Link className="btn btn-outline-light mx-3" to="/sell">SELL</Link>
          </li>
          <li>
            <Link className="navCart mx-2" to="/product/cart">CART<CartIcon /> {cartListItem.length}</Link>
          </li>
        </ul>
      </div>
      {isAside ?
        <div className="fakeModal">
          <aside className="asideNav">
            <button onClick={() => setIsAside(false)} id="closeAside">X</button>
            <div className="asideUser">
              <span id="userCircleIcon"><UserCircle /></span>
              {authTokens !== undefined ? <span className="userName">Hello, {userLogedIn.user.name}!</span> : <span className="userName">User guess</span>}
            </div>
            {authTokens !== undefined ? <button className="btn btn-light buttonsAside" onClick={() => handleButton()}>Log out</button> : <Link onClick={() => setIsAside(false)} className="btn  buttonsAside" to={{ pathname: "/signin", state: { referer: props.location } }} >SIGN IN</Link>}

            <div className="userOptions">
              <Link className="categoriesAside" to="/sell" onClick={() => setIsAside(false)}>Sell</Link>
              <Link className="categoriesAside" to="/product/cart" onClick={() => setIsAside(false)}>Shopping cart<CartIcon /></Link>
              <Link className="categoriesAside" to="/product/cart" onClick={() => setIsAside(false)}>Favorites<HeartIcon /></Link>
            </div>
            <h5 id="categoriesTitle" >Categories:</h5>
            <ul className="categoriesAsideUl">
              <li className="categoriesAside">Computers</li>
              <li className="categoriesAside">Electronics</li>
              <li className="categoriesAside">Home</li>
              <li className="categoriesAside">Kitchen</li>
            </ul>
          </aside>
        </div> : null
      }
    </nav>
  )
}

export default App;
