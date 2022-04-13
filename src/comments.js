// create comment
export const createComment = async ({ itemId, username, comment }, url) => {
  await fetch(`${url}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res.json());
};

// getting comment
export const getComment = async (url, id) => {
  let data = null;
  await fetch(`${url}/comments?item_id=${id}`)
    .then((res) => res.json())
    .then((d) => {
      data = d;
    });

  return data;
};
