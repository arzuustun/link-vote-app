import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
 import { connect} from "react-redux";
import { handleAddLink} from "../actions/links";
class AddList extends Component {
    
     handleAdd = () => {
        const { dispatch } = this.props;
        console.log(this.state);
        dispatch(handleAddLink(this.state))
    }
    state={
        name:'',
        link: '',
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;

        const {state} = this;

        this.setState({
            ...state,
            [name]: value
        });
    }

    render() {
 
        // const { dispatch } = this.props;
       
        return (
            <div className='add-link'>
                <Link to="/">
                <FaArrowLeft />
                <span className='btn-back'> Return to List</span>
                </Link>
                <div className='add-header'>
                    <h1><strong>Add Link List</strong></h1>
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
                        onChange={this.handleInputChange}/>
                </div>
                <div>
                    <button
                        type='submit'
                        //disabled={linkName === '' || linkURL === ''}
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
// statedeki değişikliği componente gösterir stateden veri almanı saglıyor
