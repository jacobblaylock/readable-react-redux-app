const headers = {headers: {Authorization:'blahblah'}} 

export function fetchCategories () {
  return fetch('http://localhost:5001/categories', headers)
  .then((res) => res.json())
}

export function fetchPosts () {
  return fetch('http://localhost:5001/posts', headers)
    .then((res) => res.json())
}

export function fetchComments (postId) {
  console.log(`http://localhost:5001/posts/${postId}/comments`)
  return fetch(`http://localhost:5001/posts/${postId}/comments`, headers)
  .then((res) => res.json()) 
}