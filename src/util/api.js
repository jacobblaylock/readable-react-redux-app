export function fetchCategories () {
  var headers = {headers: {Authorization:'blahblah'}}
  return fetch('http://localhost:5001/categories', headers)
    .then((res) => {
      return res.json()
    })
}