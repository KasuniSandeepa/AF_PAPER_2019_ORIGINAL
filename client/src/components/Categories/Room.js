import axios from "axios";
import React, { Component }from "react";

class Room extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/category/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ rooms: response.data.data })
                console.log(response.data.data);
            })
            .catch(error => {
                alert(error.message)
            })
    }



    render(){
        return(
            <div className="container">
                <h1>Rooms for the selected Category</h1>
                {this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Code: {item.code}</h4>
                            <h5>Wing: {item.wing}</h5>
                            <h5>Amount: {item.amount}</h5>
                            <h5>Pax: {item.pax}</h5>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Room;