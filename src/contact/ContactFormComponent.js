import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);

export default class ContactFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: "",
            message: "",
            submitted: false,
            showAlertSuccess: false,
            showAlertFailure: false,
            erors: false
        };
    }

    componentDidMount() {
        const { stuffId } = this.props.match.params;
        this.setState({id: stuffId});
    }


    axiosSendMessage() {
        axios.get('/contact/sendmessage', {
            params: {
                id: this.state.id,
                message: this.state.message
        },
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })  
    .catch((error) => {
        this.setState({showAlertFailure: true, errors: true });
    })
        .then((response) => {
            if(!this.state.errors){
                this.setState({ submitted : true, showAlertSucess: true });
                this.renderRedirect();
            }
        });
      
}

handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
}

handleSubmit = event => {
    event.preventDefault();
    this.setState({ errors : false });
    this.axiosSendMessage();

}

renderRedirect = () => {
    if (this.state.submitted) {
        return (<Redirect to={{pathname: '/home'}}/>)
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
                     <SweetAlert
                show={this.state.showAlertSucess}
                    title='Message sent succesfully'
                    onConfirm={() => this.setState({ showAlertSuccess: false })}
                    />
                     <SweetAlert
                show={this.state.showAlertFailure}
                    title='Message was not sent'
                    onConfirm={() => this.setState({ showAlertFailure: false })}
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

