import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { handleAddLink } from "../actions/links";
import { Toastr } from './Toastr';
class AddList extends Component {

    handleAdd = () => {
        const { dispatch } = this.props;
        dispatch(handleAddLink(this.state))
        Toastr(`${this.state.name} ADDED.`, 'success');
    }

    state = {
        name: '',
        link: '',
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        const { state } = this;

        this.setState({
            ...state,
            [name]: value
        });
    }

    render() {
        const { name, link } = this.state

        return (
            <div className='add-link'>
                <Link to="/">
                    <FaArrowLeft />
                    <span className='btn-back'> Return to List</span>
                </Link>
                <div className='add-header'>
                    <h1><strong>Add New Link</strong></h1>
                </div>

                <div>
                    <label>Link Name:</label>
                    <input
                        type="text"
                        name="name"
                        className='btn-input'
                        placeholder='e.g. Alphabet'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Link URL:</label>
                    <input
                        type="text"
                        name="link"
                        className='btn-input'
                        placeholder='e.g. http://abc.xyz'
                        value={this.state.link}
                        onChange={this.handleInputChange} />
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={name === '' || link === ''}
                        onClick={this.handleAdd}
                        className='btn-add'
                    >
                        ADD
					</button>
                </div>
            </div>
        );
    }

}

export default connect()(AddList);
