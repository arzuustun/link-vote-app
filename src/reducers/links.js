import {
    ADD_LINK,
    REMOVE_LINK,
    UP_VOTE_LINK,
    DOWN_VOTE_LINK,
    LOAD_LINKS,
    ORDER_LINKS
} from '../actions/types';

export default function links(state = [], action) {
	switch (action.type) {
		case ADD_LINK:
			return state.concat([action.link]);
		case REMOVE_LINK:
			return state.filter((link) => link.id !== action.id);
		case UP_VOTE_LINK:
			return state.map((link) => ({
				...link,
				points: link.points + (link.id === action.id ? 1 : 0),
			}));
		case DOWN_VOTE_LINK:
			return state.map((link) => ({
				...link,
				points: link.points + (link.id === action.id ? -1 : 0),
			}));

		case ORDER_LINKS:
		case LOAD_LINKS:
			return [...action.links];
		default:
			return state;
	}
}
