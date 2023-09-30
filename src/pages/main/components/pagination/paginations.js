import { Button } from '../../../../components';
import styled from 'styled-components';

const PaginationContainer = ({ className, setPage, lastPage, page }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)} margin={'0 5px'}>
				{' '}
				В начало{' '}
			</Button>
			<Button
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
				margin={'0 5px'}
			>
				Предыдущая
			</Button>
			<div className="current-page"> Страница: {page} </div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
				margin={'0 5px'}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
				margin={'0 5px'}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	position: absolute;
	bottom: 145px;
	width: 100%;
	padding: 0 35px;

	& .current-page {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		width: 100%;
		font-weight: bold;
		height: 32px;
		border: 1px #000 solid;
		cursor: default;
		margin: 0 5px;
	}
`;
