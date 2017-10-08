import * as API from '../util/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SORT_METHOD = 'SORT_METHOD'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const VOTE_UP_POST = 'VOTE_UP_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

// SORT
export function sortMethod(sorter) {
  return {
    type: SORT_METHOD,
    sorter
  }
}

// CATEGORIES
export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
      .then(res => dispatch(getCategories(res)))
)

// POSTS
export function requestPosts(requestingPosts) {
  return {
    type: REQUEST_POSTS,
    requestingPosts
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const fetchPosts = (category) => (dispatch, getState) => {
  dispatch(requestPosts(true))
  API
  .fetchPosts(category)
  .then(posts => {
    dispatch(receivePosts(posts))
    dispatch(requestPosts(false))
  })
}

export const fetchPostDetail = (postId) => (dispatch, getState) => {
  dispatch(requestPosts(true))
  API
  .fetchPostDetail(postId)
  .then(post => {
    dispatch(receivePosts(post))
    dispatch(requestPosts(false))
  })
}

export function addPost(post) {
  return {
    type: ADD_POST,
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
    type: DELETE_POST,
    postId
  }
}

export const fetchDeletePost = (postId) => dispatch => {
  return API
    .fetchDeletePost(postId)
      .then(res => dispatch(deletePost(postId)))
}

// VOTE
export function voteUpPost(postId) {
  return {
    type: VOTE_UP_POST,
    postId
  }
}

export function voteDownPost(postId) {
  return {
    type: VOTE_DOWN_POST,
    postId
  }
}

export function voteUpComment(postId, commentId) {
  return {
    type: VOTE_UP_COMMENT,
    postId,
    commentId
  }
}

export function voteDownComment(postId, commentId) {
  return {
    type: VOTE_DOWN_COMMENT,
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
    type: ADD_COMMENT,
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
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

export const fetchDeleteComment = (postId, commentId) => dispatch => {
  return API
    .fetchDeleteComment(commentId)
      .then(res => dispatch(deleteComment(postId, commentId)))
}



