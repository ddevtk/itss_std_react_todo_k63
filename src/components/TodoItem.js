/*
  【TodoItemコンポーネント】
 ・Todoアイテムを表示する
 ・チェックボックスにチェックが入っているか管理する
 ・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem({ item, func }) {
  return (
    <label className={`panel-block ${item.done ? 'has-text-grey-light' : ''}`} onClick={() => func(item)} >
      <input type="checkbox" />
      {item.text}
    </label>
  );
}

export default TodoItem;