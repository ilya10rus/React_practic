import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux';

import thunk from 'redux-thunk';
import { userReduser, usersReduser, postReduser, postsReduser, appReduser } from './redusers';

const reduser = combineReducers({
	app: appReduser,
	user: userReduser,
	users: usersReduser,
	post: postReduser,
	posts: postsReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reduser, composeEnhancers(applyMiddleware(thunk)));
