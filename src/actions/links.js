import {
    ADD_LINK,
    REMOVE_LINK,
    UP_VOTE_LINK,
    DOWN_VOTE_LINK,
    LOAD_LINKS,
    ORDER_LINKS
} from './types';
import { get, add,remove,vote,orderTypes } from '../utils/api'


const addLink = (link) => ({
    type: ADD_LINK,
    link,
});

const removeLink = (id) => ({
    type: REMOVE_LINK,
    id,
});

const upvoteLink = (id) => ({
    type: UP_VOTE_LINK,
    id,
});

const downvoteLink = (id) => ({
    type: DOWN_VOTE_LINK,
    id,
});

const loadLinks = (links) => ({
    type: LOAD_LINKS,
    links,
});

const orderLinks = (links) => ({
    type: ORDER_LINKS,
    links,
});
export const handleOrderLinks = (orderBy) => (dispatch) =>
    get().then((links) => {
        let compareValue = 1;
        if (orderBy === orderTypes.ASC) compareValue = -1;
        else if (orderBy === orderTypes.DESC) compareValue = 1;

        links.reverse().sort((a, b) => {
            if (b.points > a.points) return 1 * compareValue;
            else if (b.points < a.points) return -1 * compareValue;
            else {
                let dateB = new Date(b.lastUpdate);
                let dateA = new Date(a.lastUpdate);
                if (dateB > dateA) return 1;
                else if (dateB < dateA) return -1;

                return 0;
            }
        });

        dispatch(orderLinks(links));
    });

export const handleLoadLinks = () => (dispatch) =>
       get().then((links) => {
        console.log("links action", links)
        dispatch(loadLinks(links.reverse()));
    });

export const handleAddLink = (link) => (dispatch) =>
    add(link).then((newLink) => {
        dispatch(addLink(newLink));
    });

export const handleRemoveLink = (id) => (dispatch) =>
    remove(id).then(() => {
        dispatch(removeLink(id));
    });

export const handleUpvoteLink = (id) => (dispatch) =>
    vote(id, true).then(() => {
        dispatch(upvoteLink(id));
    });

export const handleDownvoteLink = (id) => (dispatch) =>
    vote(id, false).then(() => {
        dispatch(downvoteLink(id));
    });
