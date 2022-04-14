// create likes
export const createLike = async (itemId, url) => {
  await fetch(`${url}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// getting Like
export const getLike = async (url) => {
  const data = await fetch(`${url}/likes`).then((res) => res.json());

  return data;
};
