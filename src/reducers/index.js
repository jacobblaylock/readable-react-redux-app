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
  SELECT_CATEGORY
} from '../actions'

const initialCategoryState = []
const initialSelectedCategory = 'react'
const initialPostsState = []
const initialCommentsState = []


function categories (state = initialCategoryState, action) {
  const { categories } = action

  switch (action.type) {
    case GET_CATEGORIES :
      return categories
    case SELECT_CATEGORY :
      return selectedCategory
    default :
      return state
  }  
}

function selectedCategory (state = initialSelectedCategory, action) {
  const { selectedCategory } = action

  switch (action.type) {
    case SELECT_CATEGORY :
      return selectedCategory
    default :
      return state
  }  
}

function posts (state = initialPostsState, action) {
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

function comments (state = initialCommentsState, action) {
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


export default combineReducers({
  categories,
  posts,
  comments,
  selectedCategory
})