// create comment
export const createComment = async ({ itemId, username, comment }, url) => {
  const data = await fetch(`${url}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return data;
};

// getting comment
export const getComment = async (url, id) => {
  const data = await fetch(`${url}/comments?item_id=${id}`).then((res) => res.json());

  return data;
};
