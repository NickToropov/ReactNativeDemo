import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { LOAD, SAVE } from 'redux-storage';
import images from '@assets/images';

export const auth = (state = {}, action) => {
    switch (action.type) {
        case 'LOGGING': return {... state, isLogging: true};
        case 'LOGIN': return {... state, token: action.token, id: action.id, name: action.name, avatar_url: action.avatar_url, isLogging: false};
        case 'LOGOUT': return {};
        default: return state;
    }
}

function randomRepositoryAvatar() {
    const min = 0, max = images.demo.length;
    const index = Math.floor(Math.random() * (max - min)) + min;
    return images.demo[index];
}

export const repos = (state = {isLoading: false, items: [], error:{}}, action) => {
    switch (action.type) {
        case 'LOADING':
            return {... state, isLoading: false};
        case 'LOADED':
            return {
                isLoading: false,
                error: Object.assign({}, action.error),
                items: action.repos ? action.repos.map((r) => {
                    return {
                        id: r.id,
                        name: r.name,
                        description: r.description,
                        url: r.url,
                        avatar: randomRepositoryAvatar()};
                    }) : []
            };
        default:
            return state;
    }
}

export const store = (state = { loaded: false }, action) => {
    switch (action.type) {
        case LOAD:
            console.log('Loading state...');
            return { ...state, loaded: true };

        case SAVE:
            console.log('Something has changed and written to disk!');

        default:
            return state;
    }
}
