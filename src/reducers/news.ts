import { Action } from 'redux';
import * as types from '../constants/ActionTypes';
import {
  NewsType,
  NewsAction,
  NewsIdsAction,
  NewsErrorAction,
  NewsItemAction,
} from '../actions/news';

export class Item {
  title: string;
  by: string;
  url: string;
  score: number;
  time: number;
}

export interface NewsState {
  Ids: NewsIdsState;
  Items: NewsItemsState;
}

export interface NewsIdsState {
  NewStories: NewsStatePayload;
  TopStories: NewsStatePayload;
  BestStories: NewsStatePayload;
}

export interface NewsItemsState {
  map: Map<number, Item>;
}

export interface NewsStatePayload {
  ids: number[];
  isLoading: boolean;
  err?: Error;
}

const initialState: NewsState = {
  Ids: {
    NewStories: {
      ids: [],
      isLoading: false,
      err: null,
    },
    TopStories: {
      ids: [],
      isLoading: false,
      err: null,
    },
    BestStories: {
      ids: [],
      isLoading: false,
      err: null,
    },
  },

  Items: {
    map: new Map<number, Item>(),
  },
};

export default function newsReducer(state = initialState, action: Action) {
  return {
    Ids: newsIdsReducer(state.Ids, <NewsAction>action),
    Items: newsItemReducer(state.Items, <NewsItemAction>action),
  };
}

function newsIdsReducer(state: NewsIdsState, action: NewsAction) {
  switch (action.type) {
    case types.FETCH_NEWS_IDS: {
      let payload = extractPayload(state, action.newsType)
      payload.err = null;
      payload.isLoading = true;
      return applyPayload(state, action.newsType, payload)
    }

    case types.FETCH_NEWS_IDS_SUCCESS: {
      let payload = extractPayload(state, action.newsType)
      payload.isLoading = false;
      payload.ids = []
      for (let i = 0; i < 20; i++) { /* limit for performance */
        payload.ids.push((<NewsIdsAction>action).newsIds[i]);
      }
      return applyPayload(state, action.newsType, payload)
    }

    case types.FETCH_NEWS_IDS_ERROR: {
      let payload = extractPayload(state, action.newsType)
      payload.isLoading = false;
      payload.err = (<NewsErrorAction>action).error;
      return applyPayload(state, action.newsType, payload)
    }
  }
  return state;
}

function extractPayload(state: NewsIdsState, type: NewsType) : NewsStatePayload {
  switch (type) {
    case NewsType.Best:
      return Object.assign({}, state.BestStories);
    case NewsType.New:
      return Object.assign({}, state.NewStories);
    case NewsType.Top:
      return Object.assign({}, state.TopStories);
  }
}

function applyPayload(state: NewsIdsState, type: NewsType, payload: NewsStatePayload) : NewsIdsState {
  switch (type) {
    case NewsType.New:
      return Object.assign({}, state, {
        NewStories: payload,
      });
    case NewsType.Top:
      return Object.assign({}, state, {
        TopStories: payload,
      });
    case NewsType.Best:
      return Object.assign({}, state, {
        BestStories: payload,
      });
  }
  return state;
}

function newsItemReducer(state: NewsItemsState, action: NewsItemAction) {
  switch (action.type) {
    case types.FETCH_NEWS_SUCCESS: {
      let newState = Object.assign({}, state);
      newState.map.set(action.newsId, action.item);
      return newState;
    }
  }

  return state;
}
