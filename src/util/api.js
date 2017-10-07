const headers = {
  headers: {
    Authorization:'blahblah',
    'Content-Type': 'application/json'
  }
} 

export function fetchCategories () {
  return fetch('http://localhost:5001/categories', headers)
  .then((res) => res.json())
}

export function fetchPosts (category) {
  let url = 'http://localhost:5001/' 
  url = category ? `${url}${category}/posts` : `${url}posts`
  return fetch(url, headers)
    .then(res => res.json())
    .then(posts => {
      return Promise.all(posts.map(post => {
          return new Promise(resolve => resolve(
            fetchComments(post.id)
            .then(comments => {
              post.comments = comments
              return post
            })
          ))
        }))
    })
}

export function fetchPostDetail (postId) {
  let url = `http://localhost:5001/posts/${postId}` 

    return fetch(url, headers)
    .then(res => res.json())
    .then(post => {
      return new Promise(resolve => resolve(
        fetchComments(post.id)
        .then(comments => {
          post.comments = comments
          return [post]
        })
      ))
    })

}

export function fetchComments (postId) {
  return fetch(`http://localhost:5001/posts/${postId}/comments`, headers)
  .then((res) => res.json())
}

export function fetchPostVote (postId, vote) {
  let url = `http://localhost:5001/posts/${postId}`
  let options = {
    headers: headers.headers,
    method: 'POST',
    body: JSON.stringify({
      option: vote
    })
  }

   return fetch(url, options)
    .then(res => res.json())
}

export function fetchCommentVote (commentId, vote) {
  let url = `http://localhost:5001/comments/${commentId}`
  let options = {
    headers: headers.headers,
    method: 'POST',
    body: JSON.stringify({
      option: vote
    })
  }

   return fetch(url, options)
    .then(res => res.json())
}

export function fetchPostComment (comment) {
  let url = `http://localhost:5001/comments/`
  let options = {
    headers: headers.headers,
    method: 'POST',
    body: JSON.stringify({
      ...comment
    })
  }
  
  return fetch(url, options)
    .then(res => res.json())
}

export function fetchDeleteComment (commentId) {
  let url = `http://localhost:5001/comments/${commentId}`
  let options = {
    headers: headers.headers,
    method: 'DELETE',
  }
  
  return fetch(url, options)
    .then(res => res.json())
}