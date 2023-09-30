import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: 1px #000 solid;
	border-radius: 5px;
	background-color: #eee;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	margin: ${({ margin }) => margin};
`;
