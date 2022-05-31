import React, { useState } from 'react';

/*
  【Todoのデータ構成】
 ・key：Todoを特定するID（String）
 ・text：Todoの内容（String）
 ・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import { getKey } from '../lib/util';

function Todo() {
  const [items, putItems] = React.useState([
    /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);

  const [status, setStatus] = useState({
    すべて: true,
    未完了: false,
    完了済み: false,
  });

  const [input, setInput] = useState('');

  /**
   * Hàm dùng để toggle class 'has-text-grey-light' khi ckeck input
   * @param {*} item item trong mảng items
   */
  const active = (item) => {
    putItems(
      items.map((i) => {
        if (i.text === item.text) {
          return { ...item, done: !item.done };
        }
        return i;
      })
    );
  };

  /**
   * thay đổi giá trị ô input
   * @param {*} e
   */
  const changeInputHandler = (e) => {
    setInput(e.target.value);
  };

  /**
   * thêm item vào mảng items khi press enter key
   * @param {*} e
   */
  const submit = (e) => {
    if (e.key === 'Enter') {
      putItems([...items, { key: getKey(), text: input.trim(), done: false }]);
      setInput('');
    }
  };

  return (
    <div className='panel'>
      <div className='panel-heading'>ITSS ToDoアプリ</div>
      <input
        className='input'
        onChange={changeInputHandler}
        value={input}
        onKeyUp={submit}
        type='text'
        placeholder='TODOを入力してください'
      />
      <Filter status={status} setStatus={setStatus} />

      {items
        .filter((item) => {
          if (status['完了済み']) {
            return item.done === status['完了済み'];
          }
          if (status['未完了']) {
            return !item.done === status['未完了'];
          }
          return item;
        })
        .map((item) => (
          <label key={item.key} className='panel-block'>
            <TodoItem func={active} item={item} />
          </label>
        ))}
      <div className='panel-block'>
        {status['すべて'] && `${items.length} items`}
        {status['未完了'] &&
          `${items.filter((item) => !item.done).length} items`}
        {status['完了済み'] &&
          `${items.filter((item) => item.done).length} items`}
      </div>
    </div>
  );
}

export default Todo;
