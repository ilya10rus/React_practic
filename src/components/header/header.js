import { styled } from 'styled-components';

import { ControlPanel, Logo } from './components';

const Distription = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Distription>
				Веб-технологии
				<br />
				написание кода
				<br />
				Разбор ошибок
			</Distription>
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 -2px 17px #000;
	background-color: #fff;
`;
