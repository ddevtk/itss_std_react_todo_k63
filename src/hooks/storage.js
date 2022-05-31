import { useState, useEffect } from 'react';

/*
  【Storageフック】
 ・TodoをlocalStorageを使って保存する
 ・以下機能をサポートする
   - localstrageに保存されているすべてのTodoの読み出し機能
   - Todoをlocalstrageに保存する
   - localstrageにあるTodoを削除する
*/

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([]);

  /* 副作用を使う */
  useEffect(() => {
    const arrOfItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
    console.log(arrOfItems);
    if (arrOfItems) {
      setItems(arrOfItems)
    }
  }, []);

  const putItems = item => {
    console.log(item);
    if (item.length > 0) {
      setItems([...item])
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...item]))
    } else {
      setItems([...items, item])
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...items, item]))
    }
  };

  const clearItems = () => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY)
  };

  return [items, putItems, clearItems];
}

export default useStorage;