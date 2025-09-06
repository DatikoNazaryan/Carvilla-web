function addDataLocalStorage (key, value) {
    const data = JSON.parse(localStorage.getItem(key));
    
    localStorage.setItem(key, JSON.stringify([
        ...data,
        value
    ]));
}

export default addDataLocalStorage;