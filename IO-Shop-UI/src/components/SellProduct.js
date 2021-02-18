import React, { Component } from "react";
/* import axios from "axios"; */

export default class SellProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*    Product: {
                   title: "",
                   description: "",
                   images: [],
                   price: 0, */
            user: this.props.user.user._id,
            files: "Choose files",
        }
    }

    /*
    Submiter = async (e) =>{
       const newProduct = {
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            price: this.state.price,
       }
       await axios.post("http://localhost:8080/sell", newProduct);
    }
    hadlerChange(e){
        if (e.target.name === "price"){
            this.setState({
                price: Number(e.target.value),
            });
        }else if (e.target.name === "images"){

            const files = e.target.files;         //when the user choose the images this get 
            var file = [];                       //name of each image and 
            var pre;                            // save it in an array
            for(var i=0; i < files.length; i++){ 

               pre = files[i].name;
               file.push(pre);
            }
           
            this.setState({
                images: file,
            });
        }else{
            this.setState({
                 [e.target.name]: e.target.value,
            });
        }
    } */
    handlerValue = (e) => {
        var FilesNum = Object.keys(e.target.files);
        this.setState({ files: FilesNum.length + " files selected" });
    }
    render() {
        return (
            <div className="sellProduct">
                <div className="imgSideSell">
                    <img src="https://i.pinimg.com/564x/15/de/c2/15dec26a1c2bdfa551d3d2cbf40b2c21.jpg" alt=""/>
                </div>
                <form className="formSell" action="http://localhost:8080/sell" method="POST" encType="multipart/form-data">
                   
                    <input type="hidden" name="user" value={this.state.user} />
                    <input className="form-control inputSell" autoFocus={true} type="text" name="title" placeholder="Title" maxLength="145" minLength="5" required/>

                    <textarea name="description" className="form-control" rows="6"
                        placeholder="Description" required></textarea>

                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" name="images" multiple onChange={(e) => this.handlerValue(e)} required
                                className="custom-file-input" id="inputGroupFile04" />
                            <label id="FILE" className="custom-file-label" htmlFor="inputGroupFile04">{this.state.files}</label>
                        </div>
                    </div>
                    <select name="category" className="form-control">
                        <optgroup>
                            <option defaultValue>-- SELECT CATEGORY --</option>
                            <option value="home">Home</option>
                            <option value="computer">Computer</option>
                            <option value="electronics">Electronics</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="tools">Tools</option>
                        </optgroup>
                    </select>
                    <input className="form-control inputSell" type="number" name="price" placeholder="Price"  min="0" step="any" required/>
                    <button className="btn btn-primary" type="submit">Sell product</button>
                </form>
            </div>
        )
    }
}
