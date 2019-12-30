import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios/index";
import {Redirect} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

export default class UserRegistration extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            showAlert: false,
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            errors: '',
            submitted: false
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (this.state.password !== this.state.repeatPassword) {
            formIsValid = false;
            errors["password"] = "Password did not match!"
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit = event => {
        event.preventDefault();
        var userRegistrationDto = {
            username: this.state.username,
            password: this.state.password,
            defaultEmail: this.state.email
        }

        if (this.handleValidation()) {
            this.postNewAccount(userRegistrationDto);
            //this.state.submitted = true;
            console.log("posted")
        }
        else {
            console.log("Password did not match");
        }
    }

    renderRedirect = () => {
        if (this.state.submitted) {
            return (<Redirect to={{pathname: '/home'}}/>)
        }
    }

    postNewAccount = (userDto) => {
        axios({
            method: 'post',
            url: '/user',
            data: userDto,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(error => {
                console.log("Error from addNewUser: " + error.response.data.message);
                this.setState({ showAlert: true });
            })
            .then(() => {
                if(!this.state.showAlert){
                    console.log("shoe alert is " + this.state.showAlert)
                    this.setState({ submitted : true });
                    this.handleClose();
                    this.renderRedirect();
                }
            });
        
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
                        <Modal.Title>Naujo vartotojo registracija</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="Login">
                            <form onSubmit={this.handleSubmit}>
                                 <Form.Group controlId="username" bsSize="large">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        type="username"
                                        placeholder="Username"
                                        minLength="2"
                                        maxLength="40"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                        required
                                    />
                                    <SweetAlert
                                        show={this.state.showAlert}
                                        title='This user already exists!'
                                        text='Try another username'
                                        onConfirm={() => this.setState({ showAlert: false })}
                                     />
                                </Form.Group>
                                <Form.Group controlId="email" bsSize="large">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type="email"
                                        placeholder="example@example.com"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" bsSize="large">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="Password"
                                        minLength="8"
                                        maxLength="20"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                        title="Password must be 8-20 symbols length!"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="repeatPassword" bsSize="large">
                                    <Form.Label>Repeat password</Form.Label>
                                    <Form.Control
                                        value={this.state.repeatPassword}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="Repeat password"
                                        minLength="8"
                                        maxLength="20"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                        title="Password must be 8-20 symbols length!"
                                        required
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                                </Form.Group>
                                <br/>
                                <Button
                                    block
                                    className="btn btn-info"
                                    bsSize="large"
                                    type="submit"
                                    active
                                >
                                    Submit
                                </Button>
                            </form>
                            {this.renderRedirect()}
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
