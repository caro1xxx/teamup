export const getStorage = (item) => {
  return localStorage.getItem(item);
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const batchSetStorage = (data) => {
  try {
    for (let i in data) {
      localStorage.setItem(i, data[i]);
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const clearStorage = () => {
  localStorage.clear();
};
