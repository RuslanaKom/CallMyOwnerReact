import React, {Component} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {Redirect} from 'react-router-dom';

export default class StuffDetails extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            submitted: false,
            stuffName: "",
            defaultMessage: "",
            contactEmail: "",
            id: null,
            userId: null

        };
    }

    componentDidMount() {
        const {stuff}= this.props.location.state;
        if(stuff){
            console.log(stuff)
            this.setState({
                stuffName: stuff.stuffName,
                defaultMessage: stuff.defaultMessage,
                contactEmail: stuff.contactEmail,
                id: stuff.id,
                userId: stuff.userId
                }
            );
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        var stuffDto = {
            id: this.state.id,
            userId: this.state.userId,
            stuffName: this.state.stuffName,
            defaultMessage: this.state.defaultMessage,
            contactEmail: this.state.contactEmail
        }
            this.postEditStuff(stuffDto);
    }

    postEditStuff = (stuffDto) => {
        axios({
            method: 'post',
            url: '/stuff',
            data: stuffDto,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(() => {
                this.setState({ submitted : true });
                this.renderRedirect();
            });
    }

    renderRedirect = () => {
        if (this.state.submitted) {
            return (<Redirect to={{pathname: '/stuff'}}/>)
        }
    }

    render() {
            return (   
                <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>   
                <Form>
                <Form.Group controlId="stuffName">
                  <Form.Label>Item name</Form.Label>
                  <Form.Control              
                    type="text"
                    name="stuffName"
                    value={this.state.stuffName}
                    onChange={this.handleChange}
                    required/>
                </Form.Group>
                <Form.Group controlId="defaultMessage">
                  <Form.Label>Default message </Form.Label>
                  <Form.Control                     
                    type="text"
                    name="defaultMessage"
                    value={this.state.defaultMessage}
                    onChange={this.handleChange}
                    required/>
                </Form.Group>
                <Form.Group controlId="contactEmail">
                  <Form.Label>Contact email</Form.Label>
                  <Form.Control                  
                    type="text"
                    name="contactEmail"
                    value={this.state.contactEmail}
                    onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              {this.renderRedirect()}
            </form> 
           
            </div>
            )
    };
}