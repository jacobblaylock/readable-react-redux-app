import * as API from '../util/api'
import { formSchema } from '../util/schema'
import * as actionTypes from './types'

// SORT
export function sortMethod(sorter) {
  return {
    type: actionTypes.SORT_METHOD,
    sorter
  }
}

// SCHEMA
export function loadSchema(schema) {
  return{
    type: actionTypes.LOAD_SCHEMA,
    schema
  }
}

export const fetchSchema = (categories) => dispatch => {
  const schema = formSchema(categories.categories.map(category => category.name))
  dispatch(loadSchema(schema))
}

// CATEGORIES
export function getCategories({ categories }) {
  return {
    type: actionTypes.GET_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
    .then(categories => {
      dispatch(getCategories(categories))
      dispatch(fetchSchema(categories))
    })
)

// POSTS
export function requestPosts(requestingPosts) {
  return {
    type: actionTypes.REQUEST_POSTS,
    requestingPosts
  }
}

export function loadPosts(posts) {
  return {
    type: actionTypes.LOAD_POSTS,
    posts
  }
}

export function receivedPosts(receivedPosts) {
  return {
    type: actionTypes.RECEIVED_POSTS,
    receivedPosts
  }
}

export function requestedPostCategory(category) {
  return {
    type: actionTypes.REQUESTED_POST_CATEGORY,
    category
  }
}

export const fetchPosts = (category = '') => (dispatch, getState) => {
  dispatch(requestPosts(true))
  API
  .fetchPosts(category)
  .then(posts => {
    dispatch(requestedPostCategory(category))
    dispatch(loadPosts(posts))
    dispatch(requestPosts(false))
    dispatch(receivedPosts(true))
  })
}

export const fetchPostDetail = (postId) => (dispatch, getState) => {
  dispatch(requestPosts(true))
  API
  .fetchPostDetail(postId)
  .then(res => API.handleErrors(res))
  .then(post => {
    dispatch(loadPosts(post))
    dispatch(requestPosts(false))
    dispatch(receivedPosts(true))      
    if(getState().categories.length < 1) dispatch(fetchCategories())
  })
  .catch(res => console.log(`Error fetching post details for id ${postId}`))
}

export function addPost(post) {
  return {
    type: actionTypes.ADD_POST,
    post
  }
}

export const fetchAddPost = (post) => dispatch => {
  return API
    .fetchPostPost(post)
      .then(res => dispatch(addPost(post)))
}

export function deletePost(postId) {
  return {
    type: actionTypes.DELETE_POST,
    postId
  }
}

export const fetchDeletePost = (postId) => dispatch => {
  return API
    .fetchDeletePost(postId)
      .then(res => dispatch(deletePost(postId)))
}

export function updatePost(post) {
  return {
    type: actionTypes.UPDATE_POST,
    post
  }
}

export const fetchPutPost = (post) => dispatch => {
  return API
    .fetchPutPost(post)
      .then(res => dispatch(updatePost(post)))
}

// VOTE
export function voteUpPost(postId) {
  return {
    type: actionTypes.VOTE_UP_POST,
    postId
  }
}

export function voteDownPost(postId) {
  return {
    type: actionTypes.VOTE_DOWN_POST,
    postId
  }
}

export function voteUpComment(postId, commentId) {
  return {
    type: actionTypes.VOTE_UP_COMMENT,
    postId,
    commentId
  }
}

export function voteDownComment(postId, commentId) {
  return {
    type: actionTypes.VOTE_DOWN_COMMENT,
    postId,
    commentId
  }
}

export const fetchVote = (postId, commentId, vote) => dispatch => {
  if(!commentId) {
     return API
      .fetchPostVote(postId, vote)
        .then(res => {
          if(vote === 'upVote'){
            dispatch(voteUpPost(postId))
          }else if(vote === 'downVote') {
            dispatch(voteDownPost(postId))
          }
        })
  }else{
    return API
    .fetchCommentVote(commentId, vote)
      .then(res => {
        if(vote === 'upVote'){
          dispatch(voteUpComment(postId, commentId))
        }else if(vote === 'downVote') {
          dispatch(voteDownComment(postId, commentId))
        }
      })
  }
}

// COMMENTS
export function addComment(comment) {
  return {
    type: actionTypes.ADD_COMMENT,
    comment
  }
}

export const fetchAddComment = (comment) => dispatch => {
  return API
    .fetchPostComment(comment)
      .then(res => dispatch(addComment(comment)))
}

export function deleteComment(postId, commentId) {
  return {
    type: actionTypes.DELETE_COMMENT,
    postId,
    commentId
  }
}

export const fetchDeleteComment = (postId, commentId) => dispatch => {
  return API
    .fetchDeleteComment(commentId)
      .then(res => dispatch(deleteComment(postId, commentId)))
}

export function updateComment(comment) {
  return {
    type: actionTypes.UPDATE_COMMENT,
    comment
  }
}

export const fetchPutComment = (comment) => dispatch => {
  return API
    .fetchPutComment(comment)
      .then(res => dispatch(updateComment(comment)))
}

