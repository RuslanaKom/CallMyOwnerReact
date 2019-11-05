import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import {Link} from 'react-router-dom';

export default class ContactFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: "",
            message: ""

        };
    }

    componentDidMount() {
        const { stuffId } = this.props.match.params;
        console.log(stuffId);
        this.setState({id: stuffId});
        console.log(this.state.id);
    }


    axiosSendMessage() {
        axios.get('/contact/sendmessage', {
            params: {
                id: this.state.id,
                message: this.state.message
        },
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    //     axios({
    //               //baseURL: 'http://localhost:9999',
    //               method: 'get',
    //               url: '/sendmessage',
    //               params: {
    //                   id: this.state.id,
    //                   message: this.state.message
    //               },
    //     headers: {'Content-Type': 'application/json;charset=utf-8'}
    // })
        .then((response) => {
            console.log(response.status);
        })
        .catch((error) => {
            alert('your message was not sent');
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
    this.axiosSendMessage();
}

renderRedirect = () => {
    if (this.state.redirect) {
        return (<Redirect to={{pathname: '/events'}}/>)
    }
}


    render() {
        return (
            <Col xs={3}>
            <div className="mb-3">
            <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="message">
                    <Form.Label>Write a message to an owner:</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows="3" 
                        autoFocus
                        type="message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        placeholder="How owner can contact you?"
                    />
                </Form.Group>
                <Button
                    block
                    className='btn btn-success'
                    disabled={false}
                    type="submit"
                    active
                >
                    Send message
                </Button>
                <br />
            </form>
            {this.renderRedirect()}
        </div>
        </Col>
        );
    }
}

