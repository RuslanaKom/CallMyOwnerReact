import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import '../App.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            placeholder: this.props.placeholder,
            parameterName: this.props.parameterName,
            fetchUrl: this.props.fetchUrl,
            selectionMade: '',
            selections: []
        }
    }

    componentDidMount() {
        this.sendAxiosRequest();
        console.log(this.state.selections)
    }

    sendAxiosRequest = () => {
        axios.get(this.state.fetchUrl)
            .then(response => this.setState({
                selections: response.data,
            }));
    }

    handleChange(e) {
        this.setState({selectionMade: e.target.value});
        this.props.updateSearchParameter(e.target.value, this.state.parameterName);
    }

    render(props) {
        const options = this.state.selections.map((selection, index) => {
            return (
                <option value={selection} key={index}>{selection}</option>
            );
        });

        return (
            <div className="col-md-auto margin">
                <Form.Group controlId="formControlsSelect">
                    <Form.Control as="select"
                                  componentClass="select"
                                  type="text"
                                  value={this.state.selectionMade}
                                  onChange={this.handleChange}>
                        <option value="">{this.state.placeholder}</option>
                        {options}
                    </Form.Control>
                </Form.Group>
            </div>
        );
    }
}

export default Dropdown;