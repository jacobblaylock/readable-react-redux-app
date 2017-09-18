const headers = {headers: {Authorization:'blahblah'}} 

export function fetchCategories () {
  return fetch('http://localhost:5001/categories', headers)
  .then((res) => res.json())
}

export function fetchPosts () {
  return fetch('http://localhost:5001/posts', headers)
    .then((res) => res.json())
    .then(posts => {
      return Promise.all(posts.map(post => {
          return new Promise(resolve => resolve(
            fetchComments(post.id)
            .then(comments => {
              post.commentCount = comments.length
              return post
            })
          ))
        }))
    })
}

export function fetchComments (postId) {
  return fetch(`http://localhost:5001/posts/${postId}/comments`, headers)
  .then((res) => res.json())
}