import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 32px;
	border: 1px #000 solid;
	border-radius: 5px;
	background-color: #eee;
`;
const StyledDiv = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledDiv onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledDiv>

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
