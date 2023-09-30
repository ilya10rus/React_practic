import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск по заголовкам..."
			/>
			<Icon id="fa-search" size="21px" inactive={true} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;
	& > input {
		padding: 10px 39px 10px 10px;
	}
	& > div {
		position: absolute;
		right: 9px;
		top: 4px;
	}
`;
