import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import LinkItem from './LinkItem';
//import Paging from './Paging';
import RemoveLink from './RemoveLink';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    handleRemoveLink,
    handleUpvoteLink,
    handleDownvoteLink,
    handleLoadLinks,
    handleOrderLinks,
} from "../actions/links";
import { connect } from "react-redux";
import { orderTypes } from '../utils/api';
// import Toast from 'react-bootstrap/Toast';
// import ToastHeader from 'react-bootstrap/ToastHeader';
//import ToastBody from 'react-bootstrap/ToastBody';

class LinkList extends Component {
    state = {
        removebox: false,
        link: ''
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleLoadLinks())

    }
    handleChangeOrderByDesc = (e) => {
        const { dispatch } = this.props
        dispatch(handleOrderLinks(orderTypes.DESC))
    }
    handleChangeOrderByAsc = (e) => {
        const { dispatch } = this.props
        dispatch(handleOrderLinks(orderTypes.ASC))
    }

    handleRemove = (id) => {
        const { dispatch } = this.props;
        dispatch(handleRemoveLink(id))
    }

    handleRemoveBox = (link) => {
        this.setState({
            removebox: true,
            link
        })
    }

    handleVote = (id, vote) => {
        const { dispatch } = this.props;
        if (vote) {
            dispatch(handleUpvoteLink(id, vote))
        } else {
            dispatch(handleDownvoteLink(id, vote))
        }
    }

    render() {
        const { links } = this.props
        const { removebox } = this.state
        return (
            <div className='link-list'>
                {removebox ?
                    // <RemoveLink />
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Remove Link</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Do you want to remove:</p>
                            <h3>{this.state.link.name}</h3>
                        </Modal.Body>

                        <Modal.Footer>

                            <Button variant="primary" onClick={() => { this.handleRemove(this.state.link.id) }}>OK</Button>
                            <Button variant="secondary">CANCEL</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    : null
                }
                <div className='link-list-div'>
                    <Link to="/addList">
                        <div className='submit-box'>
                            <FaPlus />
                        </div>
                        <div className='submit-text'>
                            SUBMIT A LINK
                     </div>
                    </Link>
                    <hr className='hr-line' />
                </div>
                <DropdownButton id='link-list-dropd' title="Order By Link" variant="Secondary">
                    <Dropdown.Item as="button" onClick={this.handleChangeOrderByDesc}>Most Voted (Z → A)</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handleChangeOrderByAsc}>Most Voted (A → Z)</Dropdown.Item>
                </DropdownButton>
                {/* Her link LinkItem componenti ile olusturulur */}
                {Object.values(links).map(link => (
                    <LinkItem key={link.id} link={link} onRemove={() => { this.handleRemoveBox(link) }} onVote={(vote) => { this.handleVote(link.id, vote) }} />
                    //  onRemove={() => {this.handleRemove(link.id) }}
                ))}


            </div>

        );
    }

}
function mapStateToProps(state) {
    return {
        links: state.links
    }
}
export default connect(mapStateToProps)(LinkList);
