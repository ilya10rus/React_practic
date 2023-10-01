import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header, Footer, Modal, Error } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { ERROR } from './constans';
const Page = styled.div`
	padding: 120px 0 20px;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
`;

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currenrUserDataJSON = sessionStorage.getItem('userData');

		if (!currenrUserDataJSON) {
			return;
		}
		const currenrUserData = JSON.parse(currenrUserDataJSON);
		dispatch(
			setUser({
				...currenrUserData,
				roleId: Number(currenrUserData.roleId),
			}),
		);
	}, [dispatch]);
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="/post" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
