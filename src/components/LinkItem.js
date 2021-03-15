import React, { Component } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
//import { connect } from 'react-redux';

class LinkItem extends Component {


    render() {
        const { link, onRemove, onVote } = this.props
        return (
            <div className='link-list-item'>
                <div className='submit-box points-box'>
                    <div className='point-number-text'>{link.points}</div>
                    <div className='point-text'>POINTS</div>
                </div>
                <div className='link-item-left'>
                    <div className='link-name'>{link.name}</div>
                    <div className='link-url'>({link.link})</div>
                    <span className='btn-vote btn-up-vote' onClick={() => onVote(true)}><FaArrowUp /> Up Vote</span>
                    <span className='btn-vote btn-down-vote' onClick={() => onVote(false)}><FaArrowDown /> Down Vote</span>

                </div>
                <div className="remove-button" onClick={onRemove}>
                    -
                </div>
            </div>
        );
    }

}

export default LinkItem
