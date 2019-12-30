import React, { Component } from 'react';

export default class StuffListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            allStuff: null,
        };
    }
    render() {
        return (
            <div align="center">
            <h2>Making your stuff find a way home</h2> 
            <img src="http://localhost:8080/lostandfound.jpeg" alt="loststuff" height="200" width="200"/>
    
            
            </div>
            )
        }
}