import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import LinkItem from './LinkItem';
import Paging from './Paging';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
    handleRemoveLink,
    handleUpvoteLink,
    handleDownvoteLink,
    handleLoadLinks,
    handleOrderLinks,
    handleChangePage,
} from "../actions/links";
import { connect } from "react-redux";
import { orderTypes } from '../utils/api';
import { Toastr } from './Toastr';

class LinkList extends Component {
    state = {
        removebox: false,
        link: ''
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleLoadLinks())
            .then(() => { dispatch(handleChangePage(1)) })

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
        Toastr(`${this.state.link.name} REMOVED.`, 'error');
        this.setState({
            removebox: false,
        })
    }

    handleRemoveBox = (link) => {
        this.setState({
            removebox: true,
            link
        })
    }
    handleCancel = () => {
        this.setState({
            removebox: false,
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
                            <Button variant="secondary" onClick={() => { this.handleCancel() }}>CANCEL</Button>
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
                ))}


                <Paging />

            </div>

        );
    }

}
function mapStateToProps({ links, paging }) {
    const maxPageIndex = paging.activePage * 5
    return {
        links: Object.values(links).slice(maxPageIndex - 5, maxPageIndex)
    }
}
export default connect(mapStateToProps)(LinkList);
