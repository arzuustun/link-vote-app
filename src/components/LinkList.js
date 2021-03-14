import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import LinkItem from './LinkItem';
import Paging from './Paging';
import { Link } from 'react-router-dom';
import {
    handleRemoveLink,
    handleUpvoteLink,
    handleDownvoteLink,
    handleLoadLinks,
    handleOrderLinks,
} from "../actions/links";
import { connect} from "react-redux";
import Toast from 'react-bootstrap/Toast';
// import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
class LinkList extends Component {
    state = {
        orderBy: 'lastAdded'
    }
    componentDidMount() {
        const { dispatch } = this.props

        try {
                dispatch(handleLoadLinks())
        } catch (e) {
            <Toast>
                <Toast.Body>Oops, An error occured.</Toast.Body>
            </Toast>
        }
    }
    handleChangeOrderBy = (e) => {
        const { dispatch } = this.props
        const orderByType = e.value

        try {
            // Dropdown'dan secilen siralama tipine gore link listesi tekrar siralanir
            dispatch(handleOrderLinks(orderByType))

            this.setState({
                orderBy: orderByType
            })
        } catch (e) {
            <Toast>
            <Toast.Body>Oops, An error occured.</Toast.Body>
        </Toast>
        }
    }
    handleRemove=(id)=>{
        const { dispatch } = this.props;
        dispatch(handleRemoveLink( id ))
    }

    handleVote=(id, vote)=>{
        const { dispatch } = this.props;
        if(vote) {
            dispatch(handleUpvoteLink( id, vote ))
        } else {
            dispatch(handleDownvoteLink( id, vote ))
        }
    }
    render() {
        const { links } = this.props
        console.log(links);
        const { orderBy } = this.state
        return (
            <div className='link-list'>
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
                <DropdownButton id='link-list-dropd' title="Order By Link" variant="Secondary"   onChange={this.handleChangeOrderBy} >
                    <Dropdown.ItemText>Most Voted (Z → A)</Dropdown.ItemText>
                    <Dropdown.ItemText>Most Voted (A → Z)</Dropdown.ItemText>
                </DropdownButton>
                        {/* Her link LinkItem componenti ile olusturulur */}
                        {Object.values(links).map(link => (
                         <LinkItem key={link.id} link={link} onRemove={() => {this.handleRemove(link.id) }} onVote={(vote) => {this.handleVote(link.id, vote)}} />
                        ))}
                {/* <LinkItem /> */}
                {/* <Paging /> */}

            </div>
        );
    }

}
function mapStateToProps (state) {
    // Mevcut sayfa icerisinde olmasi gereken liste elemanlari belirlenir
   // const maxPageIndex = paging.activePage * 5
    console.log("connect", state);
    return {
        links: state.links
    }
}
export default  connect(mapStateToProps)(LinkList);
