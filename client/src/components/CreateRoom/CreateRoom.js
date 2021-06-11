import axios from "axios";
import Select from "react-select";
import React, { Component }from "react";
import Swal from "sweetalert2";

const initialState = {
    code: '',
    wing: '',
    amount: 0,
    pax: 0,
    categories: [],
    options: [],
    selectedCategories: []
}

class CreateRoom extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8087/category')
            .then(response => {
                this.setState({ categories: response.data.data },() => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({options: data})
                })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();
        let room = {
            code: this.state.code,
            wing: this.state.wing,
            amount: this.state.amount,
            pax: this.state.pax,
            selectedCategories: this.state.selectedCategories
        };
        console.log("Data to Send ",room);
       axios.post('http://localhost:8087/room/create',room)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Inserted Successfully',
                    text: 'New Room was Added!',
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


    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] })
    }


    render(){
        return(
            <div className="container">
                <h1>Create Room</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Code" className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Wing" className="form-label">Wing</label>
                        <input
                            type="text"
                            className="form-control"
                            id="wing"
                            name="wing"
                            value={this.state.wing}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Amount" className="form-label">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Pax" className="form-label">Pax</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pax"
                            name="pax"
                            value={this.state.pax}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Select the Categories" className="form-label">Select the Categories</label>

                        <Select
                            options={ this.state.options }
                            onChange={this.onCategorySelect}
                            className="basic-multi-select"
                            isMulti
                        />

                    </div>




                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateRoom;