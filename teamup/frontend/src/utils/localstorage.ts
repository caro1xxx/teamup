export const getStorage = (item: string): any => {
  return localStorage.getItem(item);
};

export const setStorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const batchSetStorage = (data: any): boolean => {
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
