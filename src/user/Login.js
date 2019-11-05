import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
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
            axios({
                      method: 'post',
                      url: '/login',
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
                    sessionStorage.setItem('user', JSON.stringify(this.state.user.id));
                    this.setState({redirect: true})
                    console.log(this.state.user);
                }
            })
            .catch((error) => {
                alert('your password or username is incorrect!');
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
            return (<Redirect to={{pathname: '/events'}}/>)
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
                        <Modal.Title>Prisijungimas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="Login">
                            <form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Vartotojo vardas</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        placeholder="vartotojo vardas"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" bsSize="large">
                                    <Form.Label>Slaptažodis</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder="slaptažodis"
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
                                    Prisijungti
                                </Button>
                                <br />
                                <div className="col-md-7 offset-3">------------arba------------</div>
                                <br />
                                <Link to={"/userregistration"}>
                                    <Button
                                        className='btn btn-info'
                                        block
                                        bsSize="large"
                                        active
                                    >
                                        Registruotis
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
