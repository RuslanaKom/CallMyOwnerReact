import React from 'react';
import {footer} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../App.css';

const Footer = (props) => {

    return (
        <div className="fixed-bottom">
        <Navbar className="mynav" variant="dark">
            <div className="col-md-4 offset-4">
                <Nav>
                <Nav.Link>© 2019 Copyright: Ruslana Komaristova</Nav.Link>
            </Nav>
            </div>
        </Navbar>
        </div>
    )}

export default Footer;
