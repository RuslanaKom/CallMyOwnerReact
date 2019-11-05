import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios/index";
//import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class UserRegistration extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        }

        if (this.handleValidation()) {
            this.postNewAccount(userRegistrationDto);
            this.state.submitted = true;
            console.log("posted")
        }
        else {
            console.log("Password did not match");
        }
    }

    renderRedirect = () => {
        if (this.state.submitted) {
            return (<Redirect to={{pathname: '/'}}/>)
        }
    }

    postNewAccount = (userDto) => {
        axios({
            method: 'post',
            url: '/users/register',
            data: userDto,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(error => {
                console.log("Error from addNewUser: " + error.response.data.message);
                // Swal.fire({
                //     title: 'This user already exists!',
                //     //text: '',
                //     type: 'error',
                //     confirmButtonText: 'Try Again'
                // })
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
                                <Form.Group controlId="firstname" bsSize="large">
                                    <Form.Label>Vardas</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                        placeholder="įveskite vardą"
                                        minLength="2"
                                        maxLength="50"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z]+['-]?)+$"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="lastname" bsSize="large">
                                    <Form.Label>Pavardė</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleChange}
                                        placeholder="įveskite pavardę"
                                        minLength="2"
                                        maxLength="50"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z]+['-]?)+$"
                                        title="asdasdasd"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email" bsSize="large">
                                    <Form.Label>El.paštas</Form.Label>
                                    <Form.Control
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type="email"
                                        placeholder="example@example.com"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="phone" bsSize="large">
                                    <Form.Label>Telefonas</Form.Label>
                                    <Form.Control
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        type="phone"
                                        placeholder="įveskite telefono numerį"
                                        minLength="9"
                                        maxLength="12"
                                        pattern="^([0-9,+]?)+$"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="username" bsSize="large">
                                    <Form.Label>Vartotojo vardas</Form.Label>
                                    <Form.Control
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        type="username"
                                        placeholder="įveskite vartotojo vardą"
                                        minLength="2"
                                        maxLength="40"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" bsSize="large">
                                    <Form.Label>Slaptažodis</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="įveskite slaptažodį"
                                        minLength="8"
                                        maxLength="20"
                                        pattern="^([a-zA-ąĄčČęĘėĖįĮšŠųŪžŽ]+[,.]?|[A-Za-z0-9]+['-]?)+$"
                                        title="Password must be 8-20 symbols length!"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="repeatPassword" bsSize="large">
                                    <Form.Label>Pakartoti slaptažodį</Form.Label>
                                    <Form.Control
                                        value={this.state.repeatPassword}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="pakartokite slaptažodį"
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
                                    Registruotis
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
