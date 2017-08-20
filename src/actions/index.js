export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

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

export function addCategories({categories}) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}