import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import * as types from '../constants/ActionTypes'
import axios from 'axios'

import { Item } from '../reducers/news';

export enum NewsType {
  New,
  Top,
  Best,
}

export interface NewsAction extends Action {
  newsType: NewsType
}

export interface NewsIdsAction extends NewsAction {
  newsIds: number[]
}

export interface NewsErrorAction extends NewsAction {
  error: Error
}

export interface NewsItemAction extends Action {
  newsId: number;
  item?: Item;
  error?: Error;
}

export function fetchNewsIds(type: NewsType) {
  return (dispatch: Dispatch<any>) => {
    let url = "https://hacker-news.firebaseio.com/v0/"
    switch (type) {
      case NewsType.New:
        url += "newstories.json";
        break;
      case NewsType.Top:
        url += "topstories.json";
        break;
      case NewsType.Best:
        url += "beststories.json"
        break;
    }

    dispatch(fetchNewsIdsStart(type))

    axios.get(url)
         .then(res => {
           dispatch(fetchNewsIdsSuccess(type, res.data))
         })
         .catch(err => {
           dispatch(fetchNewsIdsError(type, err))
         });
  };
}

function fetchNewsIdsStart(type: NewsType) : NewsAction {
  return {
    type: types.FETCH_NEWS_IDS,
    newsType: type,
  }
}

function fetchNewsIdsSuccess(type: NewsType, newsIds: number[]) : NewsIdsAction {
  return {
    type: types.FETCH_NEWS_IDS_SUCCESS,
    newsType: type,
    newsIds,
  }
}

function fetchNewsIdsError(type: NewsType, error: Error) : NewsErrorAction {
  return {
    type: types.FETCH_NEWS_IDS_ERROR,
    newsType: type,
    error,
  }
}

export function fetchNewsItem(id: number) {
  return (dispatch: Dispatch<any>) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

    dispatch(fetchNewsItemStart(id));

    axios.get(url)
         .then(res => {
           dispatch(fetchNewsItemSuccess(id, res.data));
         })
         .catch(err => {
           dispatch(fetchNewsItemError(id, err));
         });
  };
}

function fetchNewsItemStart(id: number) : NewsItemAction {
  return {
    type: types.FETCH_NEWS,
    newsId: id,
  };
}

function fetchNewsItemSuccess(id: number, item: Item) : NewsItemAction {
  return {
    type: types.FETCH_NEWS_SUCCESS,
    newsId: id,
    item,
  };
}

function fetchNewsItemError(id: number, error: Error) : NewsItemAction {
  return {
    type: types.FETCH_NEWS_ERROR,
    newsId: id,
    error,
  };
}
