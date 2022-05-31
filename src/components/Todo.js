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
import { getKey } from "../lib/util";

function Todo() {
  const [items, putItems] = React.useState([
    /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);

  const [input, setInput] = useState('')

  const active = (item) => {
    putItems(items.map(i => {
      if (i.text === item.text) {
        return { ...item, done: !item.done }
      }
      return i
    }))
  }

  const changeInputHandler = (e) => {
    setInput(e.target.value)
  }

  const submit = (e) => {
    console.log(e)
    console.log(e.target.value);
    if (e.key === 'Enter') {
      putItems([...items, { key: getKey(), text: input.trim(), done: false }])
      setInput('')
    }
  }

  console.log(items)


  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input className='input' onChange={changeInputHandler} value={input} onKeyUp={submit} type="text" placeholder='TODOを入力してください' />
      {items.map(item => (
        <label className="panel-block">
          <TodoItem key={item.key} func={active} item={item} />
        </label>
      ))}
      <div className="panel-block">
        {items.length} items
      </div>
    </div>
  );
}

export default Todo;