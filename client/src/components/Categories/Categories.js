import axios from "axios";
import useStyles from './styles';
import React, { Component }from "react";
import image from './hotels.jpg';
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
               <center><h1>Categories</h1></center>
                <br/>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <div key={index} className="card mb-3" style={{margin: "10px" , backgroundColor:"#e3f2fd"}}>
                        <div className="p-3" onClick={e => this.navigateRoomPage(e, item._id)}>
                            <h4>Category: {item.name}</h4>
                            <h5>Description: {item.description}</h5>
                        </div>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                    </div>

                ))}

                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                <div key={index} className="card text-black " style={{width: "18rem" , flex: "1" , margin: "10px" , backgroundColor:"#e3f2fd"}}>

                        <div  className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <h6>Category: {item.name}</h6>
                            <h6>Description: {item.description}</h6>
                            <a href="#" className="btn btn-primary" onClick={e => this.navigateRoomPage(e, item._id)}>Go somewhere</a>
                        </div>

                    <br />
                </div>

                ))}

                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                <div className="card" style={{width: "18rem" ,  margin: "10px"}}>
                    <img src={image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <a href="#" className="btn btn-primary" onClick={e => this.navigateRoomPage(e, item._id)}>Show the allocated Rooms</a>
                        </div>
                </div>
                    ))}
                </div>

                <table className="table table-hover">
                    <thead>
                    <th>Category</th>
                    <th>Description</th>
                    </thead>
                    <tbody>
                    {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                    <tr>
                        <td> {item.name}</td>
                        <td> {item.description}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Categories;