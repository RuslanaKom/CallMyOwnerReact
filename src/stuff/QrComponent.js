import React, {Component} from "react";
import StuffList from "./StuffList"
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export default class QrComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stuffForQr: null
        };
    }

    componentDidMount() {
        const {stuff}= this.props.location.state;
        if(stuff){
            this.setState({
                stuffForQr: stuff
                }
            );
            this.sendAxiosRequestForQr(stuff)
        }   
    }

    sendAxiosRequestForQr = (stuff) => {
        axios({
            method: 'post',
            url: '/stuff/qr',
            data: stuff,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .then(response => this.setState({
                qr:response.data
            }));
    }

    
    render() {   
        if(this.state.qr){
         return (
            <img src="http://localhost:8080/QR.png" alt="Smiley face" height="500" width="500"/>
         )}
         else {
             return(<p></p>)
         }
    }
}