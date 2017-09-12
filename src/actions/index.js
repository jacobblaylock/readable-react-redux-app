import * as API from '../util/api'

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const SORT_METHOD = 'SORT_METHOD'

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => (
  API
    .fetchPosts()
    .then(res => dispatch(getPosts(res)))
) 
 

// export const fetchCommentCount = (post) => dispatch => (
//     API
//       .fetchComments(post.id)
//       .then(res => {
//         post.comments = res.map(comment => comment.id)
//       })
// )

export function addPost({placeholder}) {
  return {
    type: ADD_POST
  }
}

export function editPost({placeholder}) {
  return {
    type: EDIT_POST
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addComment({placeholder}) {
  return {
    type: ADD_COMMENT
  }
}

export function editComment({placeholder}) {
  return {
    type: EDIT_COMMENT
  }
}

export function votePost({placeholder}) {
  return {
    type: VOTE_POST
  }
}

export function voteComment({placeholder}) {
  return {
    type: VOTE_COMMENT
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



