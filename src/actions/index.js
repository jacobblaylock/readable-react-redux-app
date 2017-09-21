import * as API from '../util/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SORT_METHOD = 'SORT_METHOD'

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

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

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

export function sortMethod(sorter) {
  return {
    type: SORT_METHOD,
    sorter
  }
}



