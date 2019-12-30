import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import {Link} from 'react-router-dom';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            showAlert: false,
            username: '',
            password: '',
            user: '',
            redirect: false
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    axiosGetUserData() {
  //  axios.defaults.baseURL = "http://localhost:9999";
      //  axios.defaults.port = 9999;
      axios({
        method: 'post',
        //url: '/login',
        url: '/user/signin',
        params: {
            username: this.state.username,
            password: this.state.password
        },
        headers: {'Content-Type': 'application/json;charset=utf-8'}
})
            .then((response) => {
                console.log(response.status);
                if(response.status=='401'){
                    this.setState({user: null});
                }
                else {
                    this.setState({user: response.data});
                    sessionStorage.setItem('token', response.data);
                    this.setState({redirect: true})
                    console.log(this.state.user);
                }
            })
            .catch((error) => {
                //alert('your password or username is incorrect!');
                this.setState({showAlert: true});
                console.log(error);
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.axiosGetUserData();
    }

    renderRedirect = () => {
        if (this.state.redirect) {
           return (<Redirect to={{pathname: '/stuff'}}/>)
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="Login">
                            <form onSubmit={this.handleSubmit}>
                            <SweetAlert
                                        show={this.state.showAlert}
                                        title='Your password or username is incorrect'
                                        text=''
                                        onConfirm={() => this.setState({ showAlert: false })}
                                     />
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        placeholder="username"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" bsSize="large">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="password"
                                    />
                                </Form.Group>
                                <Button
                                    block
                                    className='btn btn-success'
                                    bsSize="large"
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    active
                                >
                                    Login
                                </Button>
                                <br />
                                <br />
                                <Link to={"/userregistration"}>
                                    <Button
                                        className='btn btn-info'
                                        block
                                        bsSize="large"
                                        active
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </form>
                            {this.renderRedirect()}
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
