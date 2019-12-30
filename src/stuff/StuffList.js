import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

import '../App.css';

const StuffList = (props) => {

    console.log(props)
    return (
        <tr>
        <td>{props.number}</td>
        <td>
            <Link to={{
                pathname:'/stuffDetails',
                state: {
                    stuff: props.stuff
                }
            }}>
                <p>{props.stuff.stuffName}</p>
            </Link></td>
        <td>{props.stuff.defaultMessage}</td>
        <td>{props.stuff.contactEmail}</td>
        <td>
            <Link to={{
                pathname:'/qr',
                state: {
                    stuff: props.stuff
                }
            }}>
                <p>Generate</p>
            </Link></td>
      </tr>
    );
    }
    export default StuffList;
