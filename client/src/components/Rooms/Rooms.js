import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import React, { Component }from "react";

class Rooms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            selectedRooms: [],
            options: [],
            totalAmount: ''
        }
        this.onRoomSelect = this.onRoomSelect.bind(this);
        this.calculateCost = this.calculateCost.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8087/room/')
            .then(response => {
                this.setState({ rooms: response.data.data })
                console.log(response.data.data)
                let data = [];
                this.state.rooms.map((item, index) => {
                    let room = {
                        value: item.amount,
                        label: item.code
                    }
                    data.push(room)
                });
                this.setState({options: data})
                console.log(this.state.options)
            })



            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })


    }

    onRoomSelect(e) {
        this.setState({ selectedRooms: e ? e.map(item => item.value) : [] })
    }

    calculateCost(e) {
       console.log("I am Here");

        let cost = {
            selectedRooms: this.state.selectedRooms
        };

        axios.post('http://localhost:8087/room/calculate',cost)
            .then(response => {
                this.setState({ totalAmount: response.data.totalAmount })

                Swal.fire({

                    title: "Rs."+this.state.totalAmount+"/=",
                    text: 'Total Cost Calculated',
                })
            })
            .catch(error => {
                console.log(error.message)

                Swal.fire({
                    icon: 'warning',
                    title: 'Data Inserted Not Successful',
                    text: error.message,
                })
            })



        console.log(cost.selectedRooms);
    }

    render(){
        return(
            <div className="container">
                <h1>All Rooms</h1>

                <Select
                    options={ this.state.options }
                    onChange={this.onRoomSelect}
                    className="basic-multi-select"
                    isMulti
                />
                <button type="button" className="btn btn-primary" onClick={e => this.calculateCost(e)}>Calculate</button>

                {this.state.rooms.length > 0 && this.state.rooms.map((item,index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Room Code: {item.code}</h4>
                            <h5>Wing: {item.wing}</h5>
                            <h6>Amount: {item.amount}</h6>
                            <h6>Pax: {item.pax}</h6>
                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

export default Rooms;