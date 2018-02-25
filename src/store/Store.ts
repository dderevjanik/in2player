import { createStore } from 'redux';
import { message } from 'antd';
import { Action } from './Actions';
import { Video } from '../types/Video';
const staticState = require('../../public/VIDEOS.json') as State;

export type State = {
  videos: Video[];
  lastVideoId: number;
};

export type InternalState = {
  selectedId: number;
  route: 'intro' | 'videos' | 'video';
  hasLocalStorage: boolean;
};

const storeState = (state: State) => {
  localStorage.setItem('STATE', JSON.stringify(state));
};

const initialState: State & InternalState = {
  selectedId: -1,
  videos: [],
  lastVideoId: 0,
  route: 'intro',
  hasLocalStorage: false
};

const storeReducer = (state: State & InternalState = initialState, action: Action): State & InternalState => {
  switch (action.type) {
    case 'HAS_LOCAL_STORAGE': {
      return {
        ...state,
        hasLocalStorage: true
      };
    }
    case 'ROUTE_TO': {
      return {
        ...state,
        route: action.route
      };
    }
    case 'STATE_LOAD_FROM_FILE': {
      storeState({
        lastVideoId: staticState.lastVideoId,
        videos: staticState.videos
      });
      return {
        ...state,
        ...staticState,
        hasLocalStorage: true,
        route: 'videos'
      };
    }
    case 'STATE_LOAD_FROM_STORAGE': {
      const storedState = localStorage.getItem('STATE') as State | undefined | null;
      if (state === undefined) {
        message.error('Cannot read from localstorage, because it is undefined or null');
        return state;
      }
      return {
        ...state,
        ...(JSON.parse(storedState as any) as State),
        route: 'videos'
      };
    }
    case 'VIDEO_ADD': {
      const name = action.url.split('/').pop();
      const video: Video = {
        url: action.url,
        name: name ? name : '',
        id: state.lastVideoId,
        sequences: [[0, 1, name ? name : '']],
        date: new Date()
      };
      message.success(`Video '${name}' added to library`, 1);
      storeState({
        videos: [...state.videos, video],
        lastVideoId: state.lastVideoId + 1
      });
      return {
        ...state,
        videos: [...state.videos, video],
        lastVideoId: state.lastVideoId + 1
      };
    }
    case 'VIDEO_DELETE': {
      // TODO: finish
      return state;
    }
    case 'VIDEO_SELECT': {
      return {
        ...state,
        selectedId: action.id,
        route: 'video'
      };
    }
    case 'VIDEO_EDIT': {
      // TODO: finish
      return state;
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(storeReducer, initialState);

export const dispatch = (action: Action) => store.dispatch<Action>(action);
