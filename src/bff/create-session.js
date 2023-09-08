import { removeComment } from './session';
import { ROLE_ID } from '../constans';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE_ID.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE_ID.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE_ID.READER: {
			break;
		}
		default:
		//ничего не делать
	}

	return session;
};
