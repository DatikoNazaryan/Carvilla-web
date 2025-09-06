function fakeFetch(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //const randomNum = Math.random();
      //if (randomNum < 0.3) reject();

      const result = localStorage.getItem(key);

      if (!result) {
        localStorage.setItem(key, "[]");
        resolve([]);
      }

      resolve(JSON.parse(result));
    }, 2000);
  })
}

export default fakeFetch;
