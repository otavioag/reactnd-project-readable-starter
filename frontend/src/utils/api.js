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

export function updatePost(id, title, body) {
  return fetch(
    "http://localhost:3001/posts/"+id,
    {
      method: "PUT",
      headers: {
        "Authorization": "dummy",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    }
  );
}

export function updateComment(id, body) {
  return fetch(
    "http://localhost:3001/comments/"+id,
    {
      method: "PUT",
      headers: {
        "Authorization": "dummy",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: body
      })
    }
  );
}