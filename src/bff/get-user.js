export const getUser = async (getLogin) =>
	fetch(`http://localhost:3004/users?login=${getLogin}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([getLogin]) => getLogin);
