import { getRoles } from '../api';
import { sessions } from '../sessions';
import { ROLE_ID } from '../constans';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE_ID.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
