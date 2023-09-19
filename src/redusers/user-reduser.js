import { ACTION_TYPE } from '../actions';
import { ROLE_ID } from '../constans';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE_ID.GUEST,
	session: null,
};

export const userReduser = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};

		case ACTION_TYPE.LOGOUT:
			return initialUserState;

		default:
			return state;
	}
};
