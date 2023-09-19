import styled from 'styled-components';
import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE_ID } from '../../../../constans';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin:0 0 5px 0;
`;

const StyledIcon = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE_ID.GUEST ? (
					<Button>
						<Link to="login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon >
							<Icon 
								id="fa-sign-out" 
								margin="0 0 2px 10px" 
								onClick={() => dispatch(logout(session))}
							/>
						</StyledIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledIcon >
					<Icon 
						id="fa-backward" 
						margin="10px 0 0 0" 
						onClick={() => navigate(-1)}
					/>
				</StyledIcon>

				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 21px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 21px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
