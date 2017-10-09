import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  SORT_METHOD,
  LOAD_SCHEMA,

  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,

  VOTE_UP_POST,
  VOTE_DOWN_POST,
  VOTE_UP_COMMENT,
  VOTE_DOWN_COMMENT,
  
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
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
  const { posts = {}, post, postId, commentId, comment} = action
  let i, c

  switch (action.type) {
    case RECEIVE_POSTS :
      return posts.filter(post => !post.deleted)
    case ADD_POST :
      return [
        ...state,
        {
          ...post,
          voteScore: 1,
          comments: []
        }
      ]
    case DELETE_POST :
      i = state.findIndex(p => p.id === postId)
      return [
        ...state.slice(0,i),
        ...state.slice(i+1)
      ]
    case UPDATE_POST :
      i = state.findIndex(p => p.id === post.id)
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          timestamp: post.timestamp,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        },
        ...state.slice(i+1)
      ]
    case VOTE_UP_POST :
      i = state.findIndex(p => p.id === postId)
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore + 1      
        },
        ...state.slice(i + 1)
      ]
    case VOTE_DOWN_POST :
      i = state.findIndex(p => p.id === postId)
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          voteScore: state[i].voteScore - 1      
        },
        ...state.slice(i + 1)
      ]
    case VOTE_UP_COMMENT :
      i = state.findIndex(p => p.id === postId)
      c = state[i].comments.findIndex(comment => comment.id === commentId)
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
      i = state.findIndex(p => p.id === postId)
      c = state[i].comments.findIndex(comment => comment.id === commentId)
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
      i = state.findIndex(p => p.id === comment.parentId)
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          comments: [
            ...state[i].comments,
            {
              ...comment,
              voteScore: 1
            }
          ]
        },
        ...state.slice(i+1)
      ]
    case DELETE_COMMENT :
      i = state.findIndex(p => p.id === postId)
      return [
       ...state.slice(0,i),
       {
         ...state[i],
         comments: state[i].comments.filter(comment => comment.id !== commentId)
       },
       state.slice(i+1)
      ]
    case UPDATE_COMMENT :
      i = state.findIndex(p => p.id === comment.parentId)
      c = state[i].comments.findIndex(com => com.id === comment.id)
      return [
        ...state.slice(0,i),
        {
          ...state[i],
          comments: [
            ...state[i].comments.slice(0,c),
            {
              ...state[i].comments[c],
              body: comment.body,
              author: comment.author,
              timestamp: comment.timestamp

            },
            ...state[i].comments.slice(c + 1)                
          ]
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

function sort (state = '', action) {
  const { sorter } = action
  
  switch (action.type) {
    case SORT_METHOD :
      return sorter
    default :
      return state      
  }
}

function schema (state = {post: {schema: {title: {},	properties:{ categories:{}}	}, ui: {},}, comments: {schema: {}, ui: {}}}, action) {
  const { schema } = action
  switch (action.type) {
    case LOAD_SCHEMA :
      return schema
    default :
      return state
  }
}

export default combineReducers({
  categories,
  postsRequested,
  posts,
  sort,
  schema
})