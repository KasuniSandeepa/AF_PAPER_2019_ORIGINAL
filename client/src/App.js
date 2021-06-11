import './App.css';
import React from 'react';
import Room from "./components/Categories/Room"
import Rooms from "./components/Rooms/Rooms";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function  App(){
    return(
        <div>
            <Router>
            <Navbar/>
                <section>
                    <Switch>
                        <Route path="/" component={Categories} exact/>
                        <Route path="/create-room" component={CreateRoom}/>
                        <Route path="/rooms" component={Rooms}/>
                        <Route path="/:id" component={Room}/>
                    </Switch>
                </section>
            </Router>

        </div>
    );
}

export default App;
