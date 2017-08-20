import { combineReducers } from 'redux'

import {
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_POST,
  VOTE_COMMENT,
  ADD_CATEGORIES
} from '../actions'

const initialState = {
  categories: [
    {
      name: 'test',
      path: null
    },
    {
      name: 'test2',
      path: null
    } 
  ],
  posts: [
    {
      id: null,
      timestamp: null,
      title: null,
      body: null,
      author: null,
      category: null,
      voteScore: null,
      deleted: null
    }
  ],
  comments: [
    {
      id: null,
      parentId: null,
      timestamp: null,
      body: null,
      author: null,
      voteScore: null,
      deleted: null,
      parentDeleted: null
    }
  ]
}

function categories (state = initialState.categories, action) {
  const { categories } = action

  switch (action.type) {
    case ADD_CATEGORIES :
      return categories
    default :
      return state
  }  
}

function posts (state = initialState.posts, action) {
  switch (action.type) {
    case ADD_POST :
      return {}
    case EDIT_POST :
      return {}
    case VOTE_POST :
      return {}
    default :
      return state
  }
}

function comments (state = initialState.comments, action) {
  switch (action.type) {
    case ADD_COMMENT :
      return {}
    case EDIT_COMMENT :
      return {}
    case VOTE_COMMENT :
      return {}
    default :
      return state
  }  
}

export default combineReducers({
  categories,
  posts,
  comments
})