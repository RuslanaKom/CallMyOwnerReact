import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import '../App.css';

class SearchWindow extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            parameterName: this.props.parameterName,
            parameter: ''
        }
    }

    handleChange(e) {
        this.setState({parameter: e.target.value});
        if (e.target.value.toString().length > 3 || e.target.value.toString().length == 0) {
            this.props.updateSearchParameter(e.target.value, this.state.parameterName);
        }
    }

    render(props) {
        return (
            <div className="col-md-auto margin">
                <Form.Group controlId="formControlsSearh">
                    <Form.Control autoFocus
                            value={this.state.parameter}
                            onChange={this.handleChange}
                            placeholder="Renginio pavadinimas">
                    </Form.Control>
                </Form.Group>
            </div>
        );
    }
}

export default SearchWindow;