import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, H2, Input, AuthFormError } from '../../components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { setUser } from '../../actions';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';
import { request } from '../../utils/request';

const regFormShema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен логин. Минимум 6 символа')
		.max(30, 'Неверно заполнен логин. Максимум 30 символов'),
	passcheck: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Заполните поле повтора пароля'),
});

const RegistrationContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormShema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}
	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => {
							setServerError(null);
						},
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => {
							setServerError(null);
						},
					})}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passcheck', {
						onChange: () => {
							setServerError(null);
						},
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегестрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
