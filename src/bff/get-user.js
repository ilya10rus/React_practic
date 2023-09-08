import { getUsers } from './get-users';

export const getUser = async (getLogin) => {
	const users = await getUsers();

	return users.find(({ login }) => login === getLogin);
};
