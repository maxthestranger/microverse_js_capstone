// create comment
export const createComment = async ({ itemId, username, comment }, url) => {
  await fetch(url, {
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
  await fetch(`${url}?item_id=${id}`).then((res) => res.json());
};
