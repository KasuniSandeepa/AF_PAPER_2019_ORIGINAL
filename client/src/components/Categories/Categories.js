import axios from "axios";
import useStyles from './styles';
import React, { Component }from "react";
import {Button, Card, CardMedia, Typography} from "@material-ui/core";

class Categories extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.navigateRoomPage = this.navigateRoomPage.bind(this);

    }


    componentDidMount() {
        axios.get('http://localhost:8087/category')
            .then(response => {
                this.setState({ categories: response.data.data })
                console.log(response.data.data)

            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    navigateRoomPage(e, categoryId) {
        window.location = `/${categoryId}`
    }


    render(){
        return(
            <div className="container">
                <h1>Categories</h1>

                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateRoomPage(e, item._id)}>
                            <h4>Category: {item.name}</h4>
                            <h5>Description: {item.description}</h5>
                        </div>

                    </div>
                ))}
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                <div key={index} className="card text-white bg-info" style={{width: "18rem"}}>

                        <div  className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <h6>Category: {item.name}</h6>
                            <h6>Description: {item.description}</h6>
                            <a href="#" className="btn btn-primary" onClick={e => this.navigateRoomPage(e, item._id)}>Go somewhere</a>
                        </div>


                </div>

                ))}

                </div>


            </div>
        )
    }
}

export default Categories;