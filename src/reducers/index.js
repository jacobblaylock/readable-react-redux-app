import { combineReducers } from 'redux'

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  GET_CATEGORIES,
  SORT_METHOD,
  VOTE_UP_POST,
  VOTE_DOWN_POST,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT
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
  const { posts = {}, postId, commentId, comment} = action
  let i, c
  if(postId) {
    i = state.findIndex(post => post.id === postId)
  }else if(comment) {
    i = state.findIndex(post => post.id === comment.parentId)
  }
  if(i > -1 && commentId) c = state[i].comments.findIndex(comment => comment.id === commentId)

  switch (action.type) {
    case RECEIVE_POSTS :
      return posts
    case VOTE_UP_POST :
      
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore + 1      
        },
        ...state.slice(i + 1)
      ]
    case VOTE_DOWN_POST :
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore - 1      
        },
        ...state.slice(i + 1)
      ]
    case VOTE_UP_COMMENT :
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          comments: [
            ...state[i].comments.slice(0,c),
            {
              ...state[i].comments[c],
              voteScore: state[i].comments[c].voteScore + 1
  
            },
            ...state[i].comments.slice(c + 1)                
          ]
        },
        ...state.slice(i + 1)
      ]
    case VOTE_DOWN_COMMENT :
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          comments: [
            ...state[i].comments.slice(0,c),
            {
              ...state[i].comments[c],
              voteScore: state[i].comments[c].voteScore - 1

            },
            ...state[i].comments.slice(c + 1)                
          ]
        },
        ...state.slice(i + 1)
      ]  
    case ADD_COMMENT :
      return[
        ...state.slice(0,i),
        {
          ...state[i],
          comments: [
            ...state[i].comments,
            comment
          ]
        },
        ...state.slice(i+1)
      ]
    case DELETE_COMMENT :
      return [
       ...state.slice(0,i),
       {
         ...state[i],
         comments: state[i].comments.filter(comment => comment.id !== commentId)
       },
       state.slice(i+1)
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
  sort
})