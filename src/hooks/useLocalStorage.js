import { useState, useEffect } from "react";

export default function useLocalStorage(initialValue, key) {
  const [data, setData] = useState(function () {
    const localStorageValue = JSON.parse(localStorage.getItem(key));
    return localStorageValue ? localStorageValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return { data, setData };
}
