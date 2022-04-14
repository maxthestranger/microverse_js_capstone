// create likes
export const createLike = async ({ itemId, username, comment }, url) => {
    await fetch(`${url}/likes`, {
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
  };
  
  // getting Like
  export const getLike = async (url, id) => {
    let data = null;
    await fetch(`${url}/likes?item_id=${id}`)
      .then((res) => res.json())
      .then((d) => {
        data = d;
      });
  
    return data;
  };


  export const addLike = () => {
    let count = 0 ;
      count++;
      const likes = document.querySelector('.likeNumber');
      likes.innerHTML =`${count} like(s)!`;
  }
 
    