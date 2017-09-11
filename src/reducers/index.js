import { combineReducers } from 'redux'

import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_POST,
  VOTE_COMMENT,
  GET_CATEGORIES,
  SORT_METHOD
} from '../actions'

function categories (state = [], action) {
  const { categories } = action

  switch (action.type) {
    case GET_CATEGORIES :
      return categories
    default :
      return state
  }  
}

function posts (state = [], action) {
  const { posts } = action

  switch (action.type) {
    case GET_POSTS :
      return posts
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

function comments (state = [], action) {
  const { comments } = action
  switch (action.type) {
    case GET_COMMENTS :
      return comments
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

function sort (state = 0, action) {
  const { sorter } = action
  
  switch (action.type) {
    case SORT_METHOD :
      return sorter
    default :
      return state      
  }
}


export default combineReducers({
  categories,
  posts,
  comments,
  sort
})