import styled from 'styled-components';

import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks/use-user-server';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titlelValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titlelValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	useLayoutEffect(() => {
		setTitleValue(title);
		setImageUrlValue(imageUrl);
	}, [imageUrl, title]);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titlelValue}
				className="last-input"
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>

			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin={'-20px 0 20px'}
				editButton={<Icon id="fa-floppy-o" size={'21px'} onClick={onSave} />}
			/>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& > Input:first-child {
		margin: 40px 0 5px 0;
	}

	& .last-input {
		margin: 0 0 50px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid #000;
	}
`;
