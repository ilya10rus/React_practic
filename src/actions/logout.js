import { ACTION_TYPE } from './type';
import { server } from '../bff';

export const logout = (session) => {
	server.logout(session);

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
