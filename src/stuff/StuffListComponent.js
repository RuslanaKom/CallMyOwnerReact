import React, {Component} from "react";
import StuffList from "./StuffList"
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export default class StuffListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            allStuff: null,
        };
    }

    componentDidMount() {
       // console.log("component mount")
      //  if (sessionStorage.getItem("token")){
            console.log("sending request for stuff")
            this.sendAxiosRequestForStuff()
     //   }
    }

    sendAxiosRequestForStuff = () => {
        axios.get('/stuff')
            .then(response => this.setState({
                allStuff:response.data
            }));
    }

    render() {
        var stuffList = <p></p>;
        if(this.state.allStuff){
            stuffList = this.state.allStuff.map((stuff, ind) => {
                return (
                    <StuffList
                        number={++ind}
                        stuff={stuff}
                    />
                );
            });
        }
            return (      
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Message</th>
                    <th>Contact email</th>
                    <th> QR code</th>
                  </tr>
                </thead>
                <tbody>
                {stuffList}
                <tr>
                    <td>
                        <Link to={{
                            pathname:'/stuffDetails',
                            state: {
                                stuff: null
                                }
                            }}>
                            <h3>+</h3>
                        </Link>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
              </Table>
            );
        }  
}