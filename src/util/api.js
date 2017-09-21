const headers = {headers: {Authorization:'blahblah'}} 

export function fetchCategories () {
  return fetch('http://localhost:5001/categories', headers)
  .then((res) => res.json())
}

export function fetchPosts (category) {
  let url = 'http://localhost:5001/posts' 
  url = category ? url + '/' + category : url
  return fetch(url, headers)
    .then((res) => res.json())
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

export function fetchComments (postId) {
  return fetch(`http://localhost:5001/posts/${postId}/comments`, headers)
  .then((res) => res.json())
}