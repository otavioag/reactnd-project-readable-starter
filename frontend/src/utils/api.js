export function getCategories() {
  return fetch(
    "http://localhost:3001/categories",
    {headers: {"Authorization": "dummy"}}
  ).then((data) => data.json())
    .then(({ categories }) => categories);
}