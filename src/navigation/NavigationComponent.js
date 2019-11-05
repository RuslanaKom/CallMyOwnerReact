import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from "axios/index";

class NavigationComponent extends React.Component {
    handleClick = () => {
         axios({
            method:'get',
            url:'/logout',
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
        return sessionStorage.clear();
    }

    render(){
        var manoBilietaiLink = <p/>
        var loginlogout = "";
        if(!sessionStorage.getItem("user")) {
            loginlogout =   <Nav className="ml-auto">
                    <Link to="/login" className="ml-auto">Login</Link>
                </Nav>
        }
        else {
            loginlogout =   <Nav className="ml-auto">
                <Link to='/logout' onClick={this.handleClick} className="ml-auto">Atsijungti</Link>
            </Nav>;

            manoBilietaiLink=<Link to="/tickets">Mano bilietai</Link>
        }

    return (
            <Navbar className="mynav" variant="dark">
                <Nav className="mr-auto">
                    <Link to="/">Home</Link>
                </Nav>
                <Nav className="mr-auto">
                {manoBilietaiLink}
                </Nav>
                {loginlogout}
            </Navbar>
        );
    }
}
export default NavigationComponent;
