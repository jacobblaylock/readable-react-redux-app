import { combineReducers } from 'redux'

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  GET_COMMENTS,
  GET_CATEGORIES,
  SORT_METHOD,
  VOTE_UP,
  VOTE_DOWN
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
  const { posts, postId } = action
  const i = state.findIndex(post => post.id === postId)

  switch (action.type) {
    case RECEIVE_POSTS :
      return posts
    case VOTE_UP :
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore + 1      
        },
        ...state.slice(i + 1)
      ]
    case VOTE_DOWN : 
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore - 1      
        },
        ...state.slice(i + 1)
      ]   
    default :
      return state
  }
}

function postsRequested (state = false, action) {
  const { requestingPosts } = action
  
  switch (action.type) {
    case REQUEST_POSTS :
      return requestingPosts
    default :
      return state
  }
}

function comments (state = [], action) {
  const { comments } = action
  switch (action.type) {
    case GET_COMMENTS :
      return comments
    default :
      return state
  }  
}

function sort (state = '', action) {
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
  postsRequested,
  posts,
  comments,
  sort
})