export const loadData = (key, fallback) => {
  try {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
      return fallback;
    }

    return JSON.parse(savedData);
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return fallback;
  }
};

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};
