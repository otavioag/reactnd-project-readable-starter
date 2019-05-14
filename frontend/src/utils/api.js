export function getCategories() {
  return fetch(
    "http://localhost:3001/categories",
    {headers: {"Authorization": "dummy"}}
  ).then((data) => data.json())
    .then(({ categories }) => categories);
}

export function getPosts() {
  return fetch(
    "http://localhost:3001/posts",
    {headers: {"Authorization": "dummy"}}
  ).then((data) => data.json());
}

export function getComments(id) {
  return fetch(
    "http://localhost:3001/posts/"+id+"/comments",
    {headers: {"Authorization": "dummy"}}
  ).then((data) => data.json());
}