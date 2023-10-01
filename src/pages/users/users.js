import { PrivatContent, H2 } from '../../components';
import { UserRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ROLE_ID } from '../../constans';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);
	useEffect(() => {
		if (!checkAccess([ROLE_ID.ADMIN], userRole)) {
			return;
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);
	}, [requestServer, shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE_ID.ADMIN], userRole)) {
			return;
		}
		requestServer('removeUser', userId).then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	return (
		<div className={className}>
			<PrivatContent access={[ROLE_ID.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="user-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							id={id}
							login={login}
							userRoleId={roleId}
							registeredAt={registeredAt}
							onUserRemove={() => onUserRemove(id)}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE_ID.GUEST,
							)}
						/>
					))}
				</div>
			</PrivatContent>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
`;
